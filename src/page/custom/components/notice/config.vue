<template>
	<div class="notice-configure">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="背景颜色：">
				<el-radio-group v-model="form.isInheritBackgroundColor" @change="change">
					<el-radio label="1">自定义</el-radio>
					<el-radio label="2">使用页面背景色</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.isInheritBackgroundColor == '1'" v-model="form.diyBackgroundColor" size="small" show-alpha @active-change="bcChange"></el-color-picker>
				</div>
			</el-form-item>
			<el-form-item label="公告颜色：">
				<el-color-picker v-model="form.color" size="small" show-alpha @active-change="tcChange"></el-color-picker>
			</el-form-item>
			<el-form-item label="公告图片：">
				<!--<el-upload :limit="1" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="thumb" list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>-->
				<el-upload class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequestArr">
					<img v-if="form.icon != ''" :src="form.icon" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon avatar-icon1"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="滚动速度(s)：">
				<el-slider v-model="form.speed" :min="1" :max="10" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="公告内容：">
				<el-radio-group v-model="form.contentType" @change="change">
					<el-radio label="0">商城公告</el-radio>
					<el-radio label="1">手动填写</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="读取数量：" v-if="form.contentType == '0'">
				<el-radio-group v-model="form.total">
					<el-radio label="0">5条</el-radio>
					<el-radio label="1">10条</el-radio>
					<el-radio label="2">20条</el-radio>
				</el-radio-group>
			</el-form-item>
			<slot v-if="form.contentType == '1'">
				<draggable v-model="form.noticeList" :move="moveData" @update="datadragEnd" :options="{animation:300}">
					<div class="notice-list clearfix" v-for="(item,index) in form.noticeList" :key="item.url">
						<div class="left avatar">
							<p>可拖动</p>
							<p>排序</p>
						</div>
						<div class="left ml14">
							<div class="pr-box">
								<el-input clearable="true" v-model="item.text" placeholder='请输入公告标题' @input="change">
									<template slot="prepend">标题</template>
								</el-input>
								</span>
							</div>
							<div>
								<el-input disabled clearable="true" v-model="item.url" placeholder="请输入链接地址(http://开头)" @input="change">
									<template  slot="append" class="select-url-btn"><span @click="selectLink(index)">选择链接</span></template>
								</el-input>
							</div>
						</div>
						<i class="el-icon-remove del-button-btn" @click="delNotice(index)"></i>
					</div>
				</draggable>
				<el-button icon="el-icon-plus" size="mini" class="add-btn" @click="addNotice">添加一个</el-button>
			</slot>
		</el-form>
		<el-dialog title="选择链接" :visible.sync="showLink" width="900px">
			<links v-if="showLink" @setData="linkSelect"></links>
		</el-dialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import links from '../../components/link/index' //链接组件
	export default {
		components: {
			draggable,
			links
		},
		props: {
			activeId: String,
			data: Object
		},
		data() {
			return {
				form: {
					isInheritBackgroundColor: '2',
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					color: '#1a2642',
					icon: '',
					imgId: '',
					speed: 1,
					contentType: '0',
					total: '0',
					noticeList: [{
						text: '这里是第1条商城公告',
						url: ''
					}, {
						text: '这里是第2条商城公告',
						url: ''
					}, {
						text: '这里是第3条商城公告',
						url: ''
					}],
				},
				thumb: [],
				showLink: false,
				noticeIndex: 0,
			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form

				//
				if(JSON.stringify(this.data) != "{}" && this.data.icon != '') {
					this.thumb.push({
						url: this.data.icon
					})
				}

				this.$emit('setData', this.form)
			}
		},
		watch: {
			'form.contentType' () {
				if(this.form.contentType == '0') { //商城公告
					this.form.noticeList = [{
						text: '这里是第1条商城公告',
						url: ''
					}, {
						text: '这里是第2条商城公告',
						url: ''
					}, {
						text: '这里是第3条商城公告',
						url: ''
					}]
				} else if(this.form.contentType == '1') { //手动填写公告
					this.form.noticeList = [{
						text: '这里是第1条自定义公告',
						url: ''
					}, {
						text: '这里是第2条自定义公告',
						url: ''
					}, {
						text: '这里是第3条自定义公告',
						url: ''
					}]
				}
			},
			'form.isInheritBackgroundColor' () {
				if(this.form.isInheritBackgroundColor == '2') {
					this.form.backgroundColor = this.form.allBackgroundColor
				} else if(this.form.isInheritBackgroundColor == '1') {
					this.form.backgroundColor = this.form.diyBackgroundColor
				}
			},
			'form.allBackgroundColor' () {
				if(this.form.isInheritBackgroundColor == '2') {
					this.form.backgroundColor = this.form.allBackgroundColor
				} else if(this.form.isInheritBackgroundColor == '1') {
					this.form.backgroundColor = this.form.diyBackgroundColor
				}
			}
		},
		methods: {
			//背景色改变
			bcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgba(255, 255, 255, 1)'
					}
					this.form.diyBackgroundColor = val
					this.form.backgroundColor = val
					this.change()
				}
			},
			//文字颜色改变
			tcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = '#1a2642'
					}
					this.form.color = val
					this.change()
				}
			},
			//实时修改的数据
			change(val) {
				this.$emit('setData', this.form)
			},
			//改变公告排序
			moveData(e) {

			},
			datadragEnd(e) {

			},
			//添加公告
			addNotice() {
				this.form.noticeList.push({
					text: '这里是自定义公告的标题',
					url: ''
				})
			},
			//删除公告
			delNotice(index) {
				this.form.noticeList.splice(index, 1)
			},
			//选择公告链接
			selectLink(index) {
				this.showLink = true
				this.noticeIndex = index
			},
			linkSelect(link) {
				this.showLink = false
				this.form.noticeList[this.noticeIndex].url = link
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
					vm.form.icon = resp.fileUrl
					vm.form.imgId = resp.fileId
				})
			},
			onRemove(file, fileList) {
				let vm = this
				vm.form.icon = ''
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
		},

	}
</script>

<style lang="less">
	.notice-configure {
		.el-form-item {
			margin-bottom: 10px;
		}
		.add-btn {
			width: 100%;
			margin-top: 5px;
		}
		.avatar {
			width: 100px;
			height: auto;
		}
		.avatar-icon1 {
			font-size: 20px;
			background-color: #ebeef5;
			padding: 15px;
			border-radius: 3px;
		}
		.notice-list {
			margin-top: 15px;
			padding: 20px;
			border: 1px solid #edf1ff;
			border-radius: 4px;
			margin-bottom: 5px;
			position: relative;
			cursor: move;
			.del-button-btn {
				position: absolute;
				top: 3px;
				right: 3px;
				font-size: 15px;
				color: #82848a;
				cursor: pointer;
			}
			.del-button-btn:hover {
				color: #dd6161;
			}
			.ml14 {
				margin-left: 14px;
				.pr-box {
					width: 282px;
					position: relative;
					margin-bottom: 5px;
				}
			}
			.el-input-group__append {
				cursor: pointer;
				padding: 0;
				span {
					display: inline-block;
					padding: 0 20px;
				}
			}
			.el-input-group__append:hover,
			.el-input-group__append:active {
				background: #4b74ff;
				color: white;
				border-radius: 0px;
				box-sizing: border-box;
			}
			.el-input__inner {
				height: 32px;
				font-size: 12px;
			}
			.avatar {
				width: 68px;
				height: 68px;
				padding-top: 18px;
				box-sizing: border-box;
				text-align: center;
				font-size: 12px;
				color: #82848a;
				background: #e4e7ed;
			}
			.upload-tip {
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 12px;
				background: rgba(0, 0, 0, 0.2);
				width: 100%;
				color: white;
			}
		}
	}
</style>