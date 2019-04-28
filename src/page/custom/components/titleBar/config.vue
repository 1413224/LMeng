<template>
	<div class="title-bar-configure">
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
			<el-form-item label="文字颜色：">
				<el-color-picker v-model="form.color" size="small" show-alpha @active-change="tcChange"></el-color-picker>
			</el-form-item>
			<el-form-item label="标题文字：">
				<el-input v-model="form.text" placeholder="请输入标题文字" @input="change">
					<template slot="append">
						<el-button type="primary" @click="showIcon = true">选择图标</el-button>
					</template>
				</el-input>
				<p v-if="form.icon != ''" class="qc-btn" @click="delIcon">清除图标</p>
			</el-form-item>
			<el-form-item label="标题链接：">
				<el-input disabled v-model="form.url.title" placeholder="请输入标题链接" @input="change">
					<template slot="append">
						<el-button type="primary" @click="selectLink(form.url)">选择链接</el-button>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="文字对齐：">
				<el-radio-group v-model="form.textAlign" @change="change">
					<el-radio label="left">居左</el-radio>
					<el-radio label="center">居中</el-radio>
					<el-radio label="right">居右</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="字体粗细：">
				<el-radio-group v-model="form.fontWeight" @change="change">
					<el-radio label="normal">默认</el-radio>
					<el-radio label="bold">粗体</el-radio>
					<!--<el-radio label="bolder">更粗体</el-radio>-->
				</el-radio-group>
			</el-form-item>
			<el-form-item label="文字大小(像素)：">
				<el-slider v-model="form.fontSize" :max="40" :min="12" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="上下边距(像素)：">
				<el-slider v-model="form.paddingVertical" :max="30" :min="5" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="左右边距(像素)：">
				<el-slider v-model="form.paddingHorizontal" :max="30" :min="5" show-input @change="change"></el-slider>
			</el-form-item>
		</el-form>
		<el-dialog title="选择图标" :visible.sync="showIcon" width="800px">
			<icons @setData="iconSelect"></icons>
		</el-dialog>
		<el-dialog title="选择链接" :visible.sync="showLink" width="900px">
			<links @setData="linkSelect" :data="linkUrl"></links>
		</el-dialog>
	</div>
</template>

<script>
	import icons from '../../components/icon/index' //搜索框
	import links from '../../components/link/index' //链接组件
	export default {
		components: {
			icons,
			links
		},
		props: {
			activeId: String,
			data: Object
		},
		data() {
			return {
				showIcon: false,
				showLink: false,
				form: {
					isInheritBackgroundColor: '2',
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					color: 'rgb(26, 38, 66)',
					text: '',
					url: {
						title: '',
						code: ''
					},
					textAlign: 'center',
					fontSize: 13,
					paddingVertical: 5,
					paddingHorizontal: 5,
					icon: '',
					fontWeight: 'normal'
				},
				thumb: [],
				linkIndex: '',
				linkUrl: {}
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
			tcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(26, 38, 66)'
					}
					this.form.color = val
					this.change()
				}
			},
			//返回实时改变的数据
			change(val) {
				this.$emit('setData', this.form)
			},
			//选中的图标
			iconSelect(icon) {
				this.showIcon = false
				this.form.icon = icon
				this.$emit('setData', this.form)
			},
			//链接展示
			selectLink(url) {
				this.showLink = true
				this.linkUrl = url
			},
			//选择链接
			linkSelect(link) {
				this.showLink = false
				this.form.url = link
			},
			//删除选中的图片
			delIcon() {
				this.form.icon = ''
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
					vm.form.thumb = vm.thumb
				}).catch(err => {
					vm.thumb = JSON.parse(JSON.stringify(vm.thumb)) // 上传失败时清除本地的图片缓存
				})
			},
			onRemove(file, fileList) {
				let vm = this
				let name = file.name
				for(let i in vm.thumb) {
					if(vm.thumb[i].name === name) {
						vm.thumb.splice(i, 1)
						return
					}
				}
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
	.title-bar-configure {
		.el-form-item {
			margin-bottom: 10px;
		}
		.el-form-item__label {
			text-align: left;
		}
		.tip {
			margin-top: 5px;
			margin-bottom: 10px;
			font-size: 12px;
			color: #909399;
		}
	}
	
	.qc-btn {
		color: #f56c6c;
		cursor: pointer;
		text-align: right;
		line-height: 25px;
		padding-right: 5px;
	}
</style>