<template>
	<div class="banner-box" ref="bannerBox">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="按钮形状：">
				<el-radio-group v-model="form.borderRadius" @change="change">
					<el-radio label="0">长方形</el-radio>
					<el-radio label="1">正方形</el-radio>
					<el-radio label="2">圆形</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="按钮位置：">
				<el-radio-group v-model="form.position" @change="change">
					<el-radio label="0">居左</el-radio>
					<el-radio label="1">居中</el-radio>
					<el-radio label="2">居右</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="按钮颜色：">
				<el-color-picker v-model="form.buttonBackgroundColor" size="small" show-alpha @active-change="bcChange"></el-color-picker>
			</el-form-item>
			<el-form-item label="按钮左右边距：">
				<el-slider v-model="form.marginHorizontal" :max="50" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="按钮底部边距：">
				<el-slider v-model="form.marginBottom" :max="10" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="按钮透明度：">
				<el-slider v-model="form.buttonOpacity" :format-tooltip="formatTooltip" @change="change"></el-slider>
			</el-form-item>
			<draggable class="img-list" v-model="form.imgList" :options="{animation:300}">
				<div class="li clearfix" v-for="(item,index) in form.imgList" :key="index">
					<div class="left">
						<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="thumb" list-type="picture">
							<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" class="avatar" @click="selectImg(index)">
						</el-upload>
					</div>
					<div class="left ml14">
						<div class="mb5">
							<el-input clearable="true" v-model="item.imgUrl" placeholder="请选择图片" @input="change" @clear="delImg(index)">
								<template slot="append" class="select-url-btn">
									<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="thumb" list-type="picture">
										<span @click="selectImg(index)">选择图片</span>
									</el-upload>
								</template>
							</el-input>
						</div>
						<div>
							<el-input disabled clearable="true" v-model="item.url.title" placeholder="请选择链接或输入链接地址" @input="change">
								<template slot="append" class="select-url-btn"><span @click="selectLink(index,item.url)">选择链接</span></template>
							</el-input>
						</div>
					</div>
					<i v-if="form.imgList.length > 1" class="el-icon-remove del-button-btn" title="删除该张图片" @click="delImgItemIndex(index)"></i>
				</div>
			</draggable>
			<el-button icon="el-icon-plus" size="mini" class="add-btn" @click="addImage">添加一个</el-button>
		</el-form>
		<el-dialog title="选择链接" :visible.sync="showLink" width="900px">
			<links v-if="showLink" @setData="linkSelect" :data="linkUrl"></links>
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
			data: Object,
			activeId: String
		},
		data() {
			return {
				linkUrl: {},
				showLink: false,
				linkIndex: '',
				form: {
					borderRadius: '0',
					position: '1',
					buttonBackgroundColor: 'rgb(255, 255, 255)',
					marginHorizontal: 0,
					marginBottom: 0,
					buttonOpacity: '',
					imgId: '',
					imgList: [{
							imgUrl: 'http://www.cgc999.com/new/static/index/index_banner1.png',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: 'http://www.cgc999.com/new/static/index/index_banner2.png',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: 'http://www.cgc999.com/new/static/index/index_banner3.png',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						}
					],
				},
				imgIndex: 0,
			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
				this.form.activeId = this.activeId
				this.$emit('setData', this.form)
			}
		},
		mounted() {

		},
		methods: {
			//透明度
			formatTooltip(val) {
				return val / 100;
			},
			//实时修改的数据
			change(val) {
				let vm = this

				vm.form.imgId = ''
				vm.form.imgList.forEach((value) => {
					if(value.imgId != '') {
						vm.form.imgId += value.imgId + ','
					}
				})

				this.$emit('setData', this.form)
			},
			//背景色改变
			bcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgba(255, 255, 255, 1)'
					}
					this.form.buttonBackgroundColor = val
					this.change()
				}
			},
			//添加图组
			addImage() {
				this.form.imgList.push({
					imgUrl: 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png',
					url: {
						title: '',
						code: ''
					},
					imgId: ''
				})
				this.change()
			},
			//删除图组
			delImgItemIndex(index) {
				if(this.form.imgList.length > 1) {
					this.form.imgList.splice(index, 1)
				} else {
					this.$message.warning('至少保留一个喔！')
				}

				this.change()
			},
			//删除图片
			delImg(index) {
				let vm = this
				vm.form.imgList[index].imgUrl = ''
				vm.form.imgList[index].imgId = ''
				vm.change()
			},
			//链接展示
			selectLink(index, url) {
				this.showLink = true
				this.linkIndex = index
				this.linkUrl = url
			},
			//选择链接
			linkSelect(link) {
				this.showLink = false
				this.form.imgList[this.linkIndex].url = link
			},
			//上传图片
			selectImg(index) {
				this.imgIndex = index
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
					vm.form.imgList[vm.imgIndex].imgUrl = resp.fileUrl
					vm.form.imgList[vm.imgIndex].imgId = resp.fileId
					vm.change()
				})
			},
			onRemove(file, fileList) {
				let vm = this
				let name = file.name
				vm.form.imgList[vm.imgIndex].imgUrl = ''
				vm.form.imgList[vm.imgIndex].imgId = ''
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
	/*.custom-container .show-box .gn-box {
		width: 600px!important;
		.el-form-item__content {
			margin-left: 155px!important;
		}
	}*/
	
	.banner-box {
		.el-form-item {
			margin-bottom: 10px;
		}
		.add-btn {
			width: 100%;
			margin-top: 5px;
		}
		.img-list {
			margin-top: 15px;
			.li {
				padding: 10px;
				border: 1px solid #edf1ff;
				border-radius: 4px;
				margin-bottom: 10px;
				position: relative;
				cursor: move;
				.del-button-btn {
					position: absolute;
					top: 3px;
					right: 1px;
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
						width: 68px;
						height: 68px;
						line-height: 68px;
						text-align: center;
						background-color: white;
					}
					.avatar {
						width: 98px;
						height: 68px;
						display: block;
						background: #e4e7ed;
					}
				}
			}
		}
	}
</style>