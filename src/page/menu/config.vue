<template>
	<div class="foot-menu-config-box">
		<el-form ref="form" :model="form">
			<el-form-item style="margin-bottom: 5px;" label="菜单名称：">
				<el-input style="width: 70%;" v-model="form.title" placeholder="请输入菜单名称" @input="change"></el-input>
			</el-form-item>
			<p class="tip">(菜单名称是便于后台查找)</p>
			<el-form-item style="display: inline-block;margin-left: 100px;" label="背景颜色：">
				<el-color-picker v-model="form.backgroundColor" size="small" @active-change="bcChange"></el-color-picker>
			</el-form-item>
			<el-form-item style="display: inline-block;" label="边框颜色：">
				<el-color-picker v-model="form.borderColor" size="small" @active-change="brChange"></el-color-picker>
			</el-form-item>
			<el-form-item label="图标样式：">
				<el-radio-group v-model="form.iconType" @change="change">
					<el-radio label="1">图标+文字</el-radio>
					<el-radio label="2">图片</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="form.iconType == '1'" style="margin-bottom: 5px;" label="图标位置：">
				<el-radio-group v-model="form.iconPosition" @change="change">
					<el-radio label="1">上方</el-radio>
					<el-radio label="2">左侧</el-radio>
				</el-radio-group>
			</el-form-item>
			<slot v-if="form.iconType == '1'">
				<el-form-item label="第一级：">
					<el-form-item style="display: inline-block;" label="图标颜色：">
						<el-color-picker v-model="form.icon.iconColor" size="small" @active-change="iChange"></el-color-picker>
					</el-form-item>
					<el-form-item style="display: inline-block;" label="文字颜色：">
						<el-color-picker v-model="form.icon.textColor" size="small" @active-change="tChange"></el-color-picker>
					</el-form-item>
				</el-form-item>
				<el-form-item label="子级：">
					<el-form-item style="display: inline-block;" label="背景颜色：">
						<el-color-picker v-model="form.icon.childColor.backgroundColor" size="small" @active-change="cbChange"></el-color-picker>
					</el-form-item>
					<el-form-item style="display: inline-block;" label="文字颜色：">
						<el-color-picker v-model="form.icon.childColor.textColor" size="small" @active-change="ctChange"></el-color-picker>
					</el-form-item>
					<el-form-item style="display: inline-block;" label="边框颜色：">
						<el-color-picker v-model="form.icon.childColor.borderColor" size="small" @active-change="cbrChange"></el-color-picker>
					</el-form-item>
				</el-form-item>
				<draggable class="icon-list2" v-model="form.icon.iconList">
					<div class="icon-pr" v-for="(item,index) in form.icon.iconList" :key="index">
						<p class="tip2" style="margin-bottom: 5px;">一级菜单</p>
						<div class="icon-item">
							<div class="clearfix">
								<div class="left avatar" @click="selectIcon(index)">
									<img v-if="item.icon == ''" :src="'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'">
									<i v-else :class="'icon iconfont ' + item.icon"></i>
									<p class="upload-tip">选择图标</p>
								</div>
								<div class="left ml14">
									<div class="mb5">
										<el-input clearable="true" v-model="item.text" placeholder="留空则不显示文字" @input="change">
											<template slot="append" class="select-url-btn"><span>文字</span></template>
										</el-input>
									</div>
									<div>
										<el-form-item :prop="'icon.iconList.'+ index + '.url.title'" :rules="item.childList.length == 0 ? [{required: true, message:'请选择链接', trigger:'blur' }] : []">
											<el-input disabled clearable="true" v-model="item.url.title" placeholder="请选择链接或输入链接地址" @input="change">
												<template slot="append" class="select-url-btn"><span @click="selectLink(index,item.url)">选择链接</span></template>
											</el-input>
										</el-form-item>
									</div>
								</div>
							</div>
							<p class="tip2">二级菜单(已添加{{item.childList.length}}个) 添加二级菜单后一级菜单链接将失效</p>
							<draggable v-model="item.childList">
								<div v-for="(i,j) in item.childList" :key="index">
									<div class="clearfix icon-item">
										<div class="left">
											<div class="left avatar2">
												<p>可拖动</p>
												<p>排序</p>
											</div>
										</div>
										<div class="left ml14">
											<div class="mb5">
												<el-input clearable="true" v-model="i.text" placeholder="留空则不显示文字" @input="change">
													<template slot="append" class="select-url-btn"><span>文字</span></template>
												</el-input>
											</div>
											<div>
												<el-form-item :prop="'icon.iconList.'+index+'.childList.' + j + '.url.title'" :rules="[{required: true, message:'请选择链接', trigger:'blur' }]">
													<el-input disabled clearable="true" v-model="i.url.title" placeholder="请选择链接" @input="change">
														<template slot="append" class="select-url-btn"><span @click="selectChildLink(index,j,i.url)">选择链接</span></template>
													</el-input>
												</el-form-item>
											</div>
										</div>
										<i class="el-icon-remove del-button-btn" title="删除该张图片" @click="delChildIcon(index,j)"></i>
									</div>
								</div>
							</draggable>
							<el-button v-if="item.childList.length < 5" icon="el-icon-plus" size="mini" class="add-btn" @click="addChildIcon(index)">添加一个</el-button>
						</div>
						<i v-if="form.icon.iconList.length > 1" class="el-icon-remove del-button-btn" title="删除该张图片" @click="delIcon(index)"></i>
					</div>
					<el-button v-if="form.icon.iconList.length < 5" icon="el-icon-plus" size="mini" class="add-btn" @click="addIcon">添加一个</el-button>
				</draggable>
			</slot>
			<slot v-if="form.iconType == '2'">
				<draggable class="img-list" v-model="form.image.imgList">
					<div class="clearfix img-item" v-for="(item,index) in form.image.imgList" :key="index">
						<div class="left">
							<div class="avatar avatar3 mb5">
								<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" list-type="picture">
									<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" @click="selectImg(index,1)">
								</el-upload>
								<p class="upload-tip">默认图片</p>
							</div>
							<div class="avatar avatar3">
								<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" list-type="picture">
									<img :src="item.activeImgUrl != '' ? item.activeImgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" @click="selectImg(index,2)">
								</el-upload>
								<p class="upload-tip">点中图片</p>
							</div>
						</div>
						<div class="left ml14">
							<div class="mb5">
								<el-input clearable="true" v-model="item.imgUrl" placeholder="请选择图片" @input="change" @clear="delImg(index,1)">
									<template slot="append" class="select-url-btn">
										<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" list-type="picture">
											<span @click="selectImg(index,1)">默认图片</span>
										</el-upload>
									</template>
								</el-input>
							</div>
							<div class="mb5">
								<el-input clearable="true" v-model="item.activeImgUrl" placeholder="请选择图片" @input="change" @clear="delImg(index,2)">
									<template slot="append" class="select-url-btn">
										<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" list-type="picture">
											<span @click="selectImg(index,2)">点中图片</span>
										</el-upload>
									</template>
								</el-input>
							</div>
							<div>
								<el-form-item :prop="'image.imgList.'+ index +'.url.title'" :rules="[{required: true, message:'请选择链接', trigger:'blur' }]">
									<el-input disabled clearable="true" v-model="item.url.title" placeholder="请选择链接" @input="change">
										<template slot="append" class="select-url-btn"><span @click="selectLink(index,item.url)">选择链接</span></template>
									</el-input>
								</el-form-item>
							</div>
						</div>
						<i v-if="form.image.imgList.length > 1" class="el-icon-remove del-button-btn" title="删除该张图片" @click="delImgListIndex(index)"></i>
					</div>
				</draggable>
				<el-button v-if="form.image.imgList.length < 5" icon="el-icon-plus" size="mini" class="add-btn" @click="addImage">添加一个</el-button>

			</slot>
		</el-form>
		<el-dialog title="选择图标" :visible.sync="showIcon" width="800px">
			<icons @setData="iconSelect"></icons>
		</el-dialog>
		<el-dialog title="选择链接" :visible.sync="showLink" width="800px">
			<links @setData="linkSelect" :data="linkUrl"></links>
		</el-dialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import links from '../custom/components/link/index' //链接组件
	import icons from '../custom/components/icon/index' //链接组件
	export default {
		props: {
			data: Object
		},
		components: {
			links,
			icons,
			draggable
		},
		data() {
			return {
				showIcon: false,
				showLink: false,
				linkUrl: {},
				form: {
					title: '',
					iconType: '1',
					iconPosition: '1',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					borderColor: 'rgba(255, 255, 255, 1)',
					icon: {
						iconColor: 'rgb(144, 162, 199)',
						textColor: 'rgb(144, 162, 199)',
						childColor: {
							backgroundColor: 'rgb(144, 162, 199)',
							textColor: 'rgb(94, 94, 98)',
							borderColor: 'rgba(255, 255, 255, 1)'
						},
						iconList: [{
							text: '菜单',
							icon: 'icon iconfont icon iconfont icon-add',
							show: false,
							url: {
								title: '',
								code: ''
							},
							childList: []
						}, {
							text: '菜单',
							icon: 'icon iconfont icon iconfont icon-add',
							show: false,
							url: {
								title: '',
								code: ''
							},
							childList: []
						}, {
							text: '菜单',
							icon: 'icon iconfont icon iconfont icon-add',
							show: false,
							url: {
								title: '',
								code: ''
							},
							childList: []
						}, {
							text: '菜单',
							icon: 'icon iconfont icon iconfont icon-add',
							show: false,
							url: {
								title: '',
								code: ''
							},
							childList: []
						}, {
							text: '菜单',
							icon: 'icon iconfont icon iconfont icon-add',
							show: false,
							url: {
								title: '',
								code: ''
							},
							childList: []
						}]
					},
					image: {
						imgList: [{
							imgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png',
							activeImgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png',
							imgId: '',
							activeimgId: '',
							url: {
								title: '',
								code: ''
							}
						}]
					}
				},
				iconIndex: '',
				linkIndex: '',
				linkChildIndex: '',
				isLinkChild: false,
				imgIndex: 0,
				imgType: '',
			}
		},
		created() {
			this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
			this.$emit('setData', this.form)
		},
		methods: {
			//验证
			validateForm(formName) {
				let vm = this

				if(this.form.iconType == '2') {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.$emit('valid', true)
						} else {
							this.$emit('valid', true)
						}
					})
				} else {

					this.form.icon.iconList.forEach((value) => {
						value.show = false
					})

					this.$refs[formName].validate((valid) => {
						if(valid) {
							this.$emit('valid', true)
						} else {
							this.$emit('valid', true)
						}
					})
				}
			},
			//选择icon
			selectIcon(index) {
				this.showIcon = true
				this.iconIndex = index
			},
			//选中icon
			iconSelect(icon) {
				this.showIcon = false
				this.form.icon.iconList[this.iconIndex].icon = icon
			},
			//选择链接
			selectLink(index, url) {
				this.showLink = true
				this.linkUrl = url
				if(this.form.iconType == '1') {
					this.isLinkChild = false
					this.linkIndex = index
				} else {
					this.imgIndex = index
				}
			},
			//选择二级链接
			selectChildLink(index, j, url) {
				this.showLink = true
				this.isLinkChild = true
				this.linkIndex = index
				this.linkChildIndex = j
				this.linkUrl = url
			},
			//选择链接
			linkSelect(link) {
				this.showLink = false
				if(this.form.iconType == '1') {
					if(this.isLinkChild) {
						this.form.icon.iconList[this.linkIndex].childList[this.linkChildIndex].url = link
					} else {
						this.form.icon.iconList[this.linkIndex].url = link
					}
				} else {
					this.form.image.imgList[this.imgIndex].url = link
				}
			},

			//添加图片+文字
			addIcon() {
				this.form.icon.iconList.push({
					text: '菜单',
					icon: 'icon iconfont icon iconfont icon-add',
					show: false,
					url: {
						title: '',
						code: ''
					},
					childList: []
				})
				this.change()
			},
			//删除图片+文字
			delIcon(index) {
				this.form.icon.iconList.splice(index, 1)
				this.change()
			},
			//添加第二级图片+文字
			addChildIcon(index) {
				this.form.icon.iconList[index].childList.push({
					text: '二级菜单',
					url: {
						title: '',
						code: ''
					}
				})
			},
			//删除第二级图片+文字
			delChildIcon(index, j) {
				this.form.icon.iconList[index].childList.splice(j, 1)
				this.change()
			},
			//实时改变的数据
			change() {
				this.$emit('setData', this.form)
			},
			//背景色改变
			bcChange(val) {
				if(val == 'transparent') {
					val = 'rgba(255, 255, 255, 1)'
				}
				this.form.backgroundColor = val
				this.change()
			},
			//边框色改变
			brChange(val) {
				if(val == 'transparent') {
					val = 'rgba(255, 255, 255, 1)'
				}
				this.form.borderColor = val
				this.change()
			},
			//图标色改变
			iChange(val) {
				if(val == 'transparent') {
					val = 'rgb(144, 162, 199)'
				}
				this.form.icon.iconColor = val
				this.change()
			},
			//文字色改变
			tChange(val) {
				if(val == 'transparent') {
					val = 'rgb(144, 162, 199)'
				}
				this.form.icon.textColor = val
				this.change()
			},
			//子级边框色改变
			cbrChange(val) {
				if(val == 'transparent') {
					val = 'rgba(255, 255, 255, 1)'
				}
				this.form.icon.childColor.borderColor = val
				this.change()
			},
			//子级背景色改变
			cbChange(val) {
				if(val == 'transparent') {
					val = 'rgb(144, 162, 199)'
				}
				this.form.icon.childColor.backgroundColor = val
				this.change()
			},
			//子级文字色改变
			ctChange(val) {
				if(val == 'transparent') {
					val = 'rgb(94, 94, 98)'
				}
				this.form.icon.childColor.textColor = val
				this.change()
			},
			//添加图组
			addImage() {
				this.form.image.imgList.push({
					imgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png',
					activeImgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png',
					imgId: '',
					activeimgId: '',
					url: {
						title: '',
						code: ''
					},
				})
				this.change()
			},
			//删除图组
			delImgListIndex(index) {
				if(this.form.image.imgList.length > 1) {
					this.form.image.imgList.splice(index, 1)
				} else {
					this.$message.warning('至少保留一个喔！')
				}
				this.change()
			},
			//上传图片
			selectImg(index, type) {
				this.imgIndex = index
				//区分上传选择默认还是点中图片
				this.imgType = type
			},
			//删除图片
			delImg(index, type) {
				let vm = this
				vm.imgIndex = index
				//区分删除选择默认还是点中图片
				vm.imgType = type
				if(vm.imgType == 1) {
					vm.form.image.imgList[vm.imgIndex].imgUrl = ''
					vm.form.image.imgList[vm.imgIndex].imgId = ''
				} else if(vm.imgType == 2) {
					vm.form.image.imgList[vm.imgIndex].activeImgUrl = ''
					vm.form.image.imgList[vm.imgIndex].activeimgId = ''
				}
				console.log(vm.form.image.imgList)
				vm.change()
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
					if(vm.imgType == 1) {
						vm.form.image.imgList[vm.imgIndex].imgUrl = resp.fileUrl
						vm.form.image.imgList[vm.imgIndex].imgId = resp.fileId
					} else if(vm.imgType == 2) {
						vm.form.image.imgList[vm.imgIndex].activeImgUrl = resp.fileUrl
						vm.form.image.imgList[vm.imgIndex].activeimgId = resp.fileId
					}
					vm.change()
					vm.$forceUpdate()
				})
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
	.foot-menu-config-box {
		.tip {
			margin-bottom: 10px;
			font-size: 12px;
			color: #909399;
			margin-left: 100px;
		}
		.tip2 {
			margin-top: 10px;
			margin-bottom: 10px;
			font-size: 12px;
			color: #909399;
		}
		.el-color-picker--small {
			margin-top: 5px;
		}
		.el-form-item {
			/*margin-bottom: 10px;*/
		}
		.add-btn {
			width: 100%;
			margin-top: 5px;
		}
		.avatar {
			width: 70px;
			height: 70px;
			display: block;
			background: #e4e7ed;
			cursor: pointer;
			position: relative;
			text-align: center;
			i {
				font-size: 35px;
				margin-top: 12px;
				display: inline-block;
			}
			img {
				width: 100%;
				height: auto;
			}
			.upload-tip {
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 12px;
				background: rgba(0, 0, 0, 0.2);
				width: 100%;
				color: white;
				text-align: center;
			}
		}
		.avatar3 {
			div:nth-child(1) {
				height: 100%;
				.el-upload {
					height: 100%;
				}
			}
		}
		.img-list {
			margin-top: 15px;
			.img-item {
				padding: 10px;
				border: 1px solid #edf1ff;
				border-radius: 4px;
				margin-bottom: 10px;
				position: relative;
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
					width: 70%;
				}
				.mb5 {
					margin-bottom: 5px;
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
				.el-upload {
					position: relative;
					.avatar-uploader-icon {
						font-size: 68px;
						color: #cdcdcd;
						width: 70px;
						height: 70px;
						line-height: 70px;
						text-align: center;
						background-color: white;
					}
				}
				.avatar {
					width: 53px;
					height: 53px;
				}
			}
		}
		.icon-list2 {
			margin-top: 15px;
			.icon-pr {
				cursor: move;
				.del-button-btn {
					position: absolute;
					top: 30px;
					right: 4px;
					font-size: 15px;
					color: #82848a;
					cursor: pointer;
				}
				.del-button-btn:hover {
					color: #dd6161;
				}
				position: relative;
			}
			.icon-item {
				padding: 10px;
				border: 1px solid #edf1ff;
				border-radius: 4px;
				margin-bottom: 10px;
				position: relative;
				cursor: move;
				.add-btn {
					width: 96%;
					margin-top: 5px;
				}
				.del-button-btn {
					position: absolute;
					top: 3px;
					right: 2px;
					font-size: 15px;
					color: #82848a;
					cursor: pointer;
				}
				.del-button-btn:hover {
					color: #dd6161;
				}
				.ml14 {
					margin-left: 14px;
					width: 75%;
				}
				.mb5 {
					margin-bottom: 5px;
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
				.avatar2 {
					width: 70px;
					height: 70px;
					padding-top: 18px;
					box-sizing: border-box;
					text-align: center;
					font-size: 12px;
					color: #82848a;
					background: #e4e7ed;
				}
			}
		}
	}
</style>