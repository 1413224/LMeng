<template>
	<div class="custom-list">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的页面总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>自定义店铺{{type==1?'首页':'专题页'}}列表</h2>
		</div>
		<el-card class="box-card">
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
				<el-row>
					<el-col>
						<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="toCustomIndex()" v-has="'@custom,@custom2'">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
			<el-table :data="settingList" style="width: 100%">
				<!--<el-table-column width="250" label="底部菜单展示">
					<template slot-scope="scope">
						<p v-if="scope.row.menuType == 0">不展示</p>
						<p v-if="scope.row.menuType == 1">适用系统设置</p>
						<p v-if="scope.row.menuType == 2">自定义</p>
					</template>
				</el-table-column>
				<el-table-column width="150" prop="menuTitle" label="自定义菜单标题"></el-table-column>-->

				<el-table-column prop="title" label="页面标题" min-width="200"></el-table-column>
				<el-table-column label="创建时间" min-width="170">
					<template slot-scope="scope">
						<p>{{scope.row.createTime | formatDate('')}}</p>
					</template>
				</el-table-column>
				<el-table-column label="修改时间" min-width="170">
					<template slot-scope="scope">
						<p>{{scope.row.updateTime | formatDate('')}}</p>
					</template>
				</el-table-column>
				<el-table-column label="二维码链接" min-width="100">
					<template slot-scope="scope">
						<el-popover placement="left" trigger="hover" v-if="isQrcode">
							<div :id="scope.row.title"></div>
							<div slot="reference" :id="scope.row.diyPageId"></div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="状态" min-width="80">
					<template slot-scope="scope">
						<el-button id="up-custom" title="点击可修改状态" :type="scope.row.status == 1 ? 'success' : 'info'" size="mini" v-has="'up-custom-list,up-custom-list2'" @click="editDiypageSettingStatus(scope.row.diyPageId,scope.row.status)">
							{{scope.row.status == 1 ? '可用' : '不可用'}}
						</el-button>
						<el-button v-if="upCustom" title="点击可修改状态" :type="scope.row.status == 1 ? 'success' : 'info'" size="mini" style="cursor:default;">{{scope.row.status == 1 ? '可用' : '不可用'}}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="130">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="预览" v-has="'see-custom-list,see-custom-list2'" placement="top">
							<el-button size="mini" type="success" icon="el-icon-view" plain @click="toLook(scope.row.diyPageId)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="修改" v-has="'custom,custom2'" placement="top">
							<el-button size="mini" type="primary" icon="el-icon-edit-outline" plain @click="toEdit(scope.row.diyPageId)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" v-has="'del-custom-list,del-custom-list2'" placement="top">
							<el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delPageSetting(scope.row.diyPageId)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页" :total="totalNums" class="flex_center">
				<span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
		components: {
			QRCode
		},
		data() {
			return {
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
				pages: 1,
				upCustom: false,
				lUrl: location.host,
				isQrcode: false
			}
		},
		updated() {
			this.upCustom = !document.querySelector('#up-custom')
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.$nextTick(function() {
					vm.isQrcode = false
					if(vm.type == Number(vm.$route.meta.crumbs[0].type)) {
						vm.getDiypageSettingList()
					} else {
						vm.type = Number(vm.$route.meta.crumbs[0].type)
						vm.keyword = ''
						vm.status = -1
						vm.curPage = 1
						vm.pageSize = 10
						vm.getDiypageSettingList()
					}
				})
			})
		},
		methods: {
			//查询
			onSearch() {
				this.isQrcode = false
				this.isSearch = true
				this.curPage = 1
				this.getDiypageSettingList()
			},
			//重置
			resetting() {
				this.isQrcode = false
				this.isSearch = false
				this.keyword = ''
				this.status = -1
				// this.type = -1
				this.curPage = 1
				this.pageSize = 10
				this.getDiypageSettingList()
			},
			//预览
			toLook(diyPageId) {
				if(location.host == this.$api.custom.url) {
					window.open('https://health.cgc999.com/web/new/index.html#/custom?id=' + diyPageId)
				} else {
					window.open('http://www.cgc999.com/new/index.html#/custom?id=' + diyPageId)
				}
			},
			//修改状态
			editDiypageSettingStatus(diyPageId, status) {
				let vm = this
				this.$confirm(`是否修改为${status == 1 ? '不可用' : '可用'}的状态`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					vm.isQrcode = false
					vm.$post(vm.$api.custom.editDiypageSettingStatus, {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						diyPageId: diyPageId,
						status: status == 1 ? 2 : 1
					}).then(resp => {
						vm.$message({
							message: '修改成功',
							type: 'success'
						})
						vm.getDiypageSettingList()
					})
				}).catch(() => {
					vm.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//删除
			delPageSetting(diyPageId) {
				let vm = this
				vm.$confirm('确定删除该自定义页面吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(({
					value
				}) => {
					vm.isQrcode = false
					vm.$post(vm.$api.custom.delPageSetting, {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						diyPageId: diyPageId
					}).then(resp => {
						vm.$message({
							message: '该自定义页面已删除',
							type: 'success'
						})
						vm.getDiypageSettingList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					})
				})
			},
			//修改
			toEdit(diyPageId) {
				let path = this.type == 1 ? '/custom' : '/custom2'
				this.$router.push({
					path: path,
					query: {
						'diyPageId': diyPageId,
						'type': this.type
					}
				})
			},
			//添加自定义页面设置列表
			toCustomIndex() {
				let path = this.type == 1 ? '/custom' : '/custom2'
				this.$router.push({
					path: path,
					query: {
						'type': this.type
					}
				})
			},
			//获取自定义页面设置列表
			getDiypageSettingList() {
				let vm = this
				if(vm.isSearch) {
					var params = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						status: vm.status,
						type: vm.type,
						keyword: vm.keyword,
						curPage: vm.curPage,
						pageSize: vm.pageSize
					}
				} else {
					var params = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						status: -1,
						type: vm.type,
						keyword: '',
						curPage: vm.curPage,
						pageSize: vm.pageSize
					}
				}

				vm.$get(vm.$api.custom.getDiypageSettingList, params).then(resp => {
					vm.settingList = resp.list
					vm.totalNums = resp.totalNums
					vm.pages = resp.pages || 1
					//生成二维码
					vm.isQrcode = true
					setTimeout(function() {
						vm.settingList.forEach((value, index) => {
							var qrcodeUrl = ''
							if(vm.lUrl == vm.$api.custom.url) {
								qrcodeUrl = 'https://health.cgc999.com/web/new/index.html#/custom?id=' + value.diyPageId
							} else {
								qrcodeUrl = 'http://www.cgc999.com/new/index.html#/custom?id=' + value.diyPageId
							}
							let qrcode = new QRCode(value.diyPageId, {
								width: 50, // 设置宽度 
								height: 50, // 设置高度
								text: qrcodeUrl
							})
							let qrcode2 = new QRCode(value.title, {
								width: 250, // 设置宽度 
								height: 250, // 设置高度
								text: qrcodeUrl
							})
						})
					}, 100)
				})
			},
			handleSizeChange(val) {
				let vm = this
				vm.isQrcode = false
				vm.pageSize = val
				vm.getDiypageSettingList()
			},
			handleCurrentChange(val) {
				let vm = this
				vm.isQrcode = false
				vm.curPage = val
				vm.getDiypageSettingList()
			},
		}
	}
</script>

<style lang="less">
	.custom-list {
		.add-btn {
			width: 100%;
			height: 32px;
			line-height: 1px;
			font-size: 14px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(76, 52, 4, 0.65);
			box-sizing: border-box;
			border: 1px dashed #4b74ff;
			margin-bottom: 20px;
		}
		.page {
			text-align: center;
			margin: 10px auto 0;
		}
		.right-div {
			float: right;
			color: rgba(0, 0, 0, 0.45);
			text-align: center;
			padding: 0 20px;
			margin: 10px;
			border-left: 1px solid #ccc;
			.num {
				font-size: 32px;
				color: #000;
			}
		}
		.box-card {
			margin: 20px;
		}
		.flex_center {
			padding-top: 20px;
			display: flex;
			justify-content: center;
		}
	}
</style>