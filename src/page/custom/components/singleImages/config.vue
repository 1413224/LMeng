<template>
	<div class="single-images-box">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="上下边距(像素)：">
				<el-slider v-model="form.paddingVertical" :max="50" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="左右边距(像素)：">
				<el-slider v-model="form.paddingHorizontal" :max="50" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="背景颜色：">
				<el-radio-group v-model="form.isInheritBackgroundColor" @change="change">
					<el-radio label="1">自定义</el-radio>
					<el-radio label="2">使用页面背景色</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.isInheritBackgroundColor == '1'" v-model="form.diyBackgroundColor" size="small" show-alpha @active-change="bcChange"></el-color-picker>
				</div>
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
				showLink: false,
				form: {
					paddingVertical: 0,
					paddingHorizontal: 0,
					isInheritBackgroundColor: '2',
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					imgId: '',
					imgList: [{
							imgUrl: 'http://www.cgc999.com/addons/ewei_shopv2/plugin/diypage/static/images/default/banner-1.jpg',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						}
					],
				},
				imgIndex: 0,
				linkIndex: '',
				linkUrl: {}
			}
		},
		computed: {

		},
		watch: {
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
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
				this.$emit('setData', this.form)
			}
		},
		methods: {
			//链接展示
			selectLink(index, url) {
				this.showLink = true
				this.linkIndex = index
				this.linkUrl = url
			},
			//选择链接
			linkSelect(link) {
				console.log(link)
				this.showLink = false
				this.form.imgList[this.linkIndex].url = link
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
					this.form.diyBackgroundColor = val
					this.form.backgroundColor = val
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
	.single-images-box {
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