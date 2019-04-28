<template>
	<div class="page-setup-configure">
		<el-form ref="form" :model="form" :rules="formRules" label-width="100px">
			<el-form-item prop="title" label="页面标题：">
				<el-input v-model="form.title" placeholder="请输入页面标题" @input="change"></el-input>
			</el-form-item>
			<el-form-item prop="name" label="页面名称：">
				<el-input v-model="form.name" placeholder="请输入页面名称"></el-input>
			</el-form-item>
			<p class="tip">( 页面名称是便于后台查找，页面标题是手机端标题 )</p>
			<!--<el-form-item label="关键字：">
				<el-input v-model="form.keyword" placeholder="请输入页面关键字"></el-input>
			</el-form-item>
			<el-form-item label="页面介绍：">
				<el-input type="textarea" v-model="form.introduce" placeholder="请输入页面介绍"></el-input>
			</el-form-item>
			<el-form-item label="封面图：">
				<el-upload :limit="1" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="thumb" list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</el-form-item>-->
			<el-form-item label="背景颜色：">
				<el-color-picker v-model="form.backgroundColor" size="small" @active-change="bcChange"></el-color-picker>
			</el-form-item>
			<el-form-item class="border-b" label="底部菜单：">
				<el-radio-group v-model="form.tabType" @change="mChange">
					<el-radio label="0">不显示</el-radio>
					<el-radio label="1">系统默认</el-radio>
					<el-radio label="2">自定义</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<p class="tip" v-if="form.tabType == '2'">
			<el-button type="success" size="mini" @click="showMenu = true">{{form.menuItem.title != '' ? '已选菜单：' + form.menuItem.title : '点击选择'}}</el-button>
		</p>
		<el-dialog title="选择菜单" :visible.sync="showMenu" width="800">
			<div class="custom-list">
				<el-card>
					<el-form label-width="80px" label-position="left">
						<el-row :gutter="40">
							<el-col :span="8">
								<el-form-item label="状态">
									<el-select v-model="status" style="width: 100%;">
										<el-option v-for="item in statusOptions" :key="item.value" :label="item.key" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="关键字">
									<el-input clearable v-model="keyword" placeholder="搜索关键字"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-button type="primary" @click="onSearch">查询</el-button>
								<el-button @click="resetting">重置</el-button>
							</el-col>
						</el-row>
					</el-form>
					<el-table highlight-current-row @current-change="menuChange" :data="settingList" style="width: 100%">
						<el-table-column type="index" width="50">
						</el-table-column>
						<el-table-column prop="title" label="菜单标题" min-width="170"></el-table-column>
						<el-table-column min-width="170" label="时间">
							<template slot-scope="scope">
								<p>创建时间：{{scope.row.createTime | formatDate('')}}</p>
								<p>修改时间：{{scope.row.updateTime | formatDate('')}}</p>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="80">
							<template slot-scope="scope">
								<el-tag :type="scope.row.status == 1 ? 'success' : 'info'">{{scope.row.status == 1 ? '可用' : '不可用'}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="80">
							<template slot-scope="scope">
								<el-button type="success" size="mini">选择</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页" :total="totalNums" class="flex_center">
						<span style="text-align: center;">{{curPage}}/{{pages}}</span>
					</el-pagination>
				</el-card>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			activeId: String,
			data: Object
		},
		data() {
			return {
				form: {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					name: '',
					keyword: '',
					introduce: '',
					title: '',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					tabType: '1',
					thumb: '',
					imgId: '',
					menuItem: {
						menuId: '',
						title: ''
					},
					menuData: ''
				},
				formRules: {
					title: [{
						required: true,
						message: '请输入页面标题',
						trigger: ['blur', 'change'],
					}],
					name: [{
						required: true,
						message: '请输入页面名称',
						trigger: ['blur', 'change'],
					}],
				},
				thumb: [],
				showMenu: false,
				settingList: [],
				totalNums: 0,
				statusOptions: [{
						key: '全部',
						value: -1
					},
					{
						key: '可用',
						value: 1
					},
					{
						key: '不可用',
						value: 2
					}
				],
				typeOptions: [{
						key: '全部',
						value: -1
					},
					{
						key: '店铺首页',
						value: 1
					},
					{
						key: '专题页',
						value: 2
					}
				],
				keyword: '',
				status: -1,
				type: -1,
				curPage: 1,
				pageSize: 10,

				isSearch: false,
				pages: 1
			}
		},
		watch: {
			showMenu() {
				if(this.showMenu) {
					this.getMenuSettingList()
				}
			},
			'form.tabType' () {
				if(this.form.tabType == '2') {
					sessionStorage.setItem('isMenu', true)
					this.change()
				} else {
					this.form.menuItem = {
						menuId: '',
						title: ''
					}
				}
			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
				//
				if(JSON.stringify(this.data) != "{}" && this.data.thumb != '') {
					this.thumb.push({
						url: this.data.thumb
					})
				}

				this.$emit('setData', this.form)
			}
		},
		methods: {
			//查询
			onSearch() {
				this.isSearch = true
				this.curPage = 1
				this.getMenuSettingList()
			},
			//重置
			resetting() {
				this.isSearch = false
				this.keyword = ''
				this.status = -1
				this.curPage = 1
				this.pageSize = 10
				this.getMenuSettingList()
			},
			menuChange(val) {
				let vm = this
				if(val) {
					vm.form.menuItem = val
					sessionStorage.setItem('isMenu', true)
					vm.change()
					vm.showMenu = false
				}
			},
			//获取底部菜单
			getMenuSettingList() {
				let vm = this

				if(vm.isSearch) {
					var params = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						status: vm.status,
						keyword: vm.keyword,
						curPage: vm.curPage,
						pageSize: vm.pageSize
					}
				} else {
					var params = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						status: -1,
						keyword: '',
						curPage: vm.curPage,
						pageSize: vm.pageSize
					}
				}

				vm.$get(vm.$api.custom.getMenuSettingList, params).then(resp => {
					vm.settingList = resp.list
					vm.totalNums = resp.totalNums
					vm.pages = resp.pages || 1
				})
			},
			//背景色改变
			bcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgba(255, 255, 255, 1)'
					}
					this.form.backgroundColor = val
					this.change()
					sessionStorage.setItem('isMenu', false)
				}
			},
			mChange() {
				this.change()
				sessionStorage.setItem('isMenu', true)
			},
			//返回实时改变的数据
			change() {
				this.$emit('setData', this.form)
			},
			imgRequestArr(obj) { // 图册上传
				let vm = this
				let temp = {
					file: obj.file,
					type: 'common',
					name: 'more-upload'
				}
				this.$post(vm.$api.share.upImage, temp).then(resp => {
					let item = {
						name: resp.fileId,
						url: resp.fileUrl
					}
					vm.thumb.push(item)
					vm.form.thumb = resp.fileUrl
					vm.form.imgId = resp.fileId
				})

				vm.change()
			},
			onRemove(file, fileList) {
				let vm = this
				vm.thumb = []
				vm.form.thumb = ''
				vm.form.imgId = ''
				vm.change()
			},
			beforeUpload(file) { // 基于elementUi图片上传拦截过滤器
				const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
				const isLt10M = file.size / 1024 / 1024 < 10
				if(!isIMG) {
					this.$message.error('上传图片只能jpg、jpeg、gif、png')
				}
				if(!isLt10M) {
					this.$message.error('上传图片不能大小超过10M！')
				}
				return isIMG && isLt10M
			},
			handleSizeChange(val) {
				let vm = this
				vm.pageSize = val
				vm.getMenuSettingList()
			},
			handleCurrentChange(val) {
				let vm = this
				vm.curPage = val
				vm.getMenuSettingList()
			},
		},

	}
</script>

<style lang="less">
	.page-setup-configure {
		.el-form-item {
			/*margin-bottom: 10px;*/
		}
		.el-form-item__label {
			text-align: left;
		}
		.tip {
			margin-bottom: 20px;
			font-size: 12px;
			color: #909399;
			margin-left: 100px;
		}
		.el-card__body {
			padding: 10px 20px;
		}
		.el-dialog__body {
			padding: 20px 20px;
		}
		.page {
			text-align: center;
			margin: 10px auto 0;
		}
		.flex_center {
			padding-top: 20px;
			display: flex;
			justify-content: center;
		}
	}
</style>