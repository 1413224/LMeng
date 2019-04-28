<template>
	<div class="button-config-box">
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
			<el-form-item label="按钮形状：">
				<el-radio-group v-model="form.borderRadius" @change="change">
					<el-radio label="0">正方形</el-radio>
					<el-radio label="1">圆角</el-radio>
					<el-radio label="2">圆形</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="显示方式：">
				<el-radio-group v-model="form.isPaging" @change="change">
					<el-radio label="0">单页显示</el-radio>
					<el-radio label="1">多页滑动显示</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="每行数量：">
				<el-radio-group v-model="form.lineNumber" @change="change">
					<el-radio label="3">3个</el-radio>
					<el-radio label="4">4个</el-radio>
					<el-radio label="5">5个</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="每页行数：" v-if="form.isPaging == '1'">
				<el-slider v-model="form.line" :min="1" :max="4" show-input @change="change"></el-slider>
			</el-form-item>
			<p class="tip">（超出设定数量自动分页）</p>
			<el-form-item label="显示分页：" v-if="form.isPaging == '1'">
				<el-radio-group v-model="form.showPaging" @change="change">
					<el-radio label="0">隐藏</el-radio>
					<el-radio label="1">显示</el-radio>
					<p class="el-radio tip" v-if="form.isPaging == '1'">（仅移动端有效）</p>
				</el-radio-group>
			</el-form-item>
			<draggable class="button-list" v-model="form.buttonList" :options="{animation:300}">
				<div class="li clearfix" v-for="(item,index) in form.buttonList" :key="index">
					<div class="left" @click="addImg(index)">
						<el-upload :show-file-list="false" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="thumb" list-type="picture">
							<img v-if="item.imgUrl" :src="item.imgUrl" class="avatar" :style="iStyle">
							<i v-else class="el-icon-circle-plus avatar-uploader-icon" :style="iStyle"></i>
							<p class="upload-tip" v-if="item.imgUrl">选择图片</p>
						</el-upload>
					</div>
					<div class="left ml14">
						<div class="pr-box">
							<el-input clearable="true" v-model="item.text" placeholder="按钮文字" @input="change">
								<template slot="prepend">文字</template>
							</el-input>
							<span @click="buttonIndex = index">
								<el-color-picker v-model="item.color" size="small" show-alpha @active-change="tcChange"></el-color-picker>
							</span>
						</div>
						<div>
							<el-input disabled clearable="true" v-model="item.url.title" placeholder="请选择链接或输入链接地址" @input="change">
								<template slot="append" class="select-url-btn"><span @click="selectLink(index,item.url)">选择链接</span></template>
							</el-input>
						</div>
					</div>
					<i class="el-icon-remove del-button-btn" @click="delButton(index)" title="删除该按钮"></i>
				</div>
			</draggable>
			<el-button icon="el-icon-plus" size="mini" class="add-btn" @click="addButton">添加一个</el-button>
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
					isInheritBackgroundColor: '2',
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					borderRadius: '2',
					isPaging: '0',
					lineNumber: '5',
					line: 1,
					showPaging: '1',
					imgId: '',
					buttonList: [{
							imgUrl: './static/icon/icon1.png',
							text: '',
							color: '',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: './static/icon/icon2.png',
							text: '',
							color: '',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: './static/icon/icon3.png',
							text: '',
							color: '',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: './static/icon/icon4.png',
							text: '',
							color: '',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
						{
							imgUrl: './static/icon/icon5.png',
							text: '',
							color: '',
							url: {
								title: '',
								code: ''
							},
							imgId: ''
						},
					],
				},

				imgIndex: 0,
				buttonIndex: 0,
				linkIndex: 0,
				linkUrl: {}
			}
		},
		computed: {
			iStyle() {
				if(this.form.borderRadius == '0') {
					return {
						borderRadius: '0px'
					}
				} else if(this.form.borderRadius == '1') {
					return {
						borderRadius: '10px'
					}
				} else {
					return {
						borderRadius: '50%'
					}
				}
			}
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
				this.showLink = false
				this.form.buttonList[this.linkIndex].url = link
			},
			//添加按钮
			addButton() {
				this.form.buttonList.push({
					imgUrl: './static/icon/jia.png',
					text: '',
					color: '',
					url: {
						title: '',
						code: ''
					},
					imgId: ''
				})
			},
			//删除按钮
			delButton(index) {
				this.form.buttonList.splice(index, 1)
				this.change()
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
			//文字颜色改变
			tcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(26, 38, 66)'
					}
					this.form.buttonList[this.buttonIndex].color = val
					this.change()
				}
			},
			//实时修改
			change() {
				let vm = this
				vm.form.imgId = ''
				vm.form.buttonList.forEach((value) => {
					if(value.imgId != '') {
						vm.form.imgId += value.imgId + ','
					}
				})
				this.$emit('setData', this.form)
			},
			//按钮上传图片
			addImg(index) {
				this.imgIndex = index
				console.log(index)
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
					vm.form.buttonList[vm.imgIndex].imgUrl = resp.fileUrl
					vm.form.buttonList[vm.imgIndex].imgId = resp.fileId
					vm.change()
				})
			},
			onRemove(file, fileList) {
				let vm = this
				let name = file.name
				vm.form.buttonList[vm.imgIndex].imgUrl = ''
				vm.form.buttonList[vm.imgIndex].imgId = ''
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
	.button-config-box {
		.el-form-item {
			margin-bottom: 0px;
		}
		.tip {
			color: #c0c4cc;
			text-align: right;
			padding-right: 5px;
			font-size: 12px;
		}
		.add-btn {
			width: 100%;
			margin-top: 5px;
		}
		.button-list {
			margin-top: 15px;
			.li {
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
						.el-input-group {
							width: 88%;
						}
						.el-color-picker {
							position: absolute;
							right: 0;
						}
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
						width: 68px;
						height: 68px;
						display: block;
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
		}
	}
</style>