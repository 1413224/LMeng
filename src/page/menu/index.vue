<template>
	<div>
		<el-card class="custom-container clearfix" v-if="!isShow">
			<div class="show-box">
				<div class="phone-show">
					<div class="bg-white">
						<ul class="icon-box2 clearfix" v-if="formData.iconType == '1'">
							<li class="li" @click="activeLi(index)" :class="{'lineH50':formData.iconPosition == '2' || item.text == ''}" v-for="(item,index) in formData.icon.iconList" :key="index" :style="iconStyle">
								<i :class="'icon iconfont ' + item.icon" :style="iStyle"></i>
								<p v-if="formData.iconPosition == '1' && item.text != ''" :style="tStyle">{{item.text}}</p>
								<span v-if="formData.iconPosition == '2' && item.text != ''" :style="tStyle">{{item.text}}</span>
								<div class="child-box" v-if="item.childList.length > 0 && item.show">
									<div class="pr-div" :style="childUlStyle">
										<ul>
											<li v-for="(childItem,j) in item.childList" :key="index" :style="childLlStyle">
												{{childItem.text}}
											</li>
										</ul>
										<div class="sjx" :style="sjxStyle"></div>
									</div>
								</div>
							</li>
						</ul>
						<ul v-if="formData.iconType == '2'" class="img-foot-box">
							<li v-for="(item,index) in formData.image.imgList" :key="index" :style="imgStyle">
								<img :src="item.imgUrl" />
							</li>
						</ul>
					</div>
				</div>
				<div class="gn-box">
					<div class="bg-white">
						<!--组件对应配置-->
						<div>
							<menu-config ref="menuConfig" v-if="isDetail" @setData="getData" @valid="getValid" :data="formData"></menu-config>
						</div>
					</div>
					<p class="component-name">{{componentName}}</p>
				</div>
			</div>
			<div class="submit-btn-box">
				<div @click="addMenuSetting">保存菜单</div>
				<!--<div @click="submit">保存并预览</div>-->
			</div>
		</el-card>
		<div class="show" v-else>
			<ul class="icon-box2 clearfix" v-if="formData.iconType == '1'">
				<li class="li" @click="activeLi(index)" :class="{'lineH50':formData.iconPosition == '2' || item.text == ''}" v-for="(item,index) in formData.icon.iconList" :key="index" :style="iconStyle">
					<i :class="'icon iconfont ' + item.icon" :style="iStyle"></i>
					<p v-if="formData.iconPosition == '1' && item.text != ''" :style="tStyle">{{item.text}}</p>
					<span v-if="formData.iconPosition == '2' && item.text != ''" :style="tStyle">{{item.text}}</span>
					<div class="child-box" v-if="item.childList.length > 0 && item.show">
						<div class="pr-div" :style="childUlStyle">
							<ul>
								<li v-for="(childItem,j) in item.childList" :key="index" :style="childLlStyle">
									{{childItem.text}}
								</li>
							</ul>
							<div class="sjx" :style="sjxStyle"></div>
						</div>
					</div>
				</li>
			</ul>
			<ul v-if="formData.iconType == '2'" class="img-foot-box">
				<li v-for="(item,index) in formData.image.imgList" :key="index" :style="imgStyle">
					<img :src="item.imgUrl" />
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
	import menuConfig from '../menu/config'
	export default {
		props: {
			data: Object
		},
		components: {
			menuConfig
		},
		watch: {
			data() {
				this.formData = JSON.parse(this.data) != "{}" ? JSON.parse(this.data) : this.formData
				this.isShow = JSON.parse(this.data) != "{}" ? true : false
			}
		},
		data() {
			return {
				formData: {},
				isDetail: true,
				valid: false,
				isShow: true
			}
		},
		created() {
			if(this.$route.query.menuId) {
				this.isDetail = false
				this.isShow = false
				this.getMenuSettingDetail()
			} else {
				if(this.data) {
					this.formData = JSON.parse(this.data) != "{}" ? JSON.parse(this.data) : this.formData
					this.isShow = true
				} else {
					this.isShow = false
				}
			}
		},
		computed: {
			iconStyle() {
				return {
					width: 100 / this.formData.icon.iconList.length + '%',
					backgroundColor: this.formData.backgroundColor,
					borderTopColor: this.formData.borderColor,
					borderRightColor: this.formData.borderColor,
				}
			},
			imgStyle() {
				return {
					width: 100 / this.formData.image.imgList.length + '%',
					backgroundColor: this.formData.backgroundColor,
					borderTopColor: this.formData.borderColor,
					borderRightColor: this.formData.borderColor,
				}
			},
			iStyle() {
				return {
					color: this.formData.icon.iconColor
				}
			},
			tStyle() {
				return {
					color: this.formData.icon.textColor
				}
			},
			childUlStyle() {
				return {
					backgroundColor: this.formData.icon.childColor.backgroundColor
				}
			},
			sjxStyle() {
				return {
					borderColor: this.formData.icon.childColor.backgroundColor + 'transparent transparent transparent',
				}
			},
			childLlStyle() {
				return {
					color: this.formData.icon.childColor.textColor,
					borderBottomColor: this.formData.icon.childColor.borderColor
				}
			},
		},
		methods: {
			getValid(val) {
				this.valid = val
			},
			//保存
			addMenuSetting() {
				let vm = this
				vm.$refs.menuConfig.validateForm('form')

				if(this.valid) {
					let url = vm.$route.query.menuId ? vm.$api.custom.editMenuSetting : vm.$api.custom.addMenuSetting
					let imgId = ''

					vm.formData.image.imgList.forEach((value) => {
						if((value.imgId != '' && value.imgId != undefined && value.imgId != null) || (value.activeimgId != '' && value.activeimgId != undefined && value.activeimgId != null)) {
							imgId += ',' + value.imgId + value.activeimgId

						}
					})

					console.log(imgId)

					vm.$post(url, {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						menuId: vm.$route.query.menuId || null,
						imgId: imgId,
						title: vm.formData.title,
						content: JSON.stringify(vm.formData),
						status: 1,
					}).then(resp => {
						vm.showArea = false
						vm.$message({
							message: vm.$route.query.menuId ? '修改成功' : '添加成功',
							type: 'success'
						})
						vm.$router.push({
							path: '/menu-list'
						})
					})
				}
			},
			//保存预览
			submit() {
				let vm = this
				vm.$refs.menuConfig.validateForm('form')

				if(this.valid) {
					let url = vm.$route.query.menuId ? vm.$api.custom.editMenuSetting : vm.$api.custom.addMenuSetting
					let imgId = ''

					vm.formData.image.imgList.forEach((value) => {
						if((value.imgId != '' && value.imgId != undefined && value.imgId != null) || (value.activeimgId != '' && value.activeimgId != undefined && value.activeimgId != null)) {
							imgId += ',' + value.imgId + value.activeimgId

						}
					})
					console.log(imgId)

					vm.$post(url, {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						menuId: vm.$route.query.menuId || null,
						imgId: imgId,
						title: vm.formData.title,
						content: JSON.stringify(vm.formData),
						status: 1,
					}).then(resp => {
						vm.showArea = false
						vm.$message({
							message: vm.$route.query.menuId ? '修改成功' : '添加成功',
							type: 'success'
						})
						vm.$router.push({
							path: '/menu-list'
						})

						window.open('http://www.cgc999.com/new/index.html#/custom?id=' + resp)
					})
				}
			},
			//获取详情
			getMenuSettingDetail() {
				let vm = this
				vm.$get(vm.$api.custom.getMenuSettingDetail, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					menuId: vm.$route.query.menuId
				}).then(resp => {
					vm.formData = JSON.parse(resp.content)
					vm.isDetail = true
				})
			},
			//点击导航
			activeLi(i) {
				let vm = this
				vm.formData.icon.iconList.forEach((value, index) => {
					if(i != index) {
						vm.formData.icon.iconList[index].show = false
					}
					vm.formData.icon.iconList[i].show = !vm.formData.icon.iconList[i].show
				})
			},
			getData(data) {
				this.formData = data
				//console.log(this.formData)
			}
		},

	}
</script>

<style lang="less" scoped>
	.img-foot-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		box-shadow: 2px 0px 20px #d9dff0;
		li {
			float: left;
			text-align: center;
			height: 50px;
			font-size: 18px;
			font-family: PingFangSC-Regular;
			box-sizing: border-box;
			border-top: 1px solid white;
			cursor: pointer;
			position: relative;
			text-align: center;
			padding: 5px 0px;
			img {
				width: auto;
				height: 100%;
				max-width: 100%;
			}
		}
		li:not(:last-child) {
			border-right: 1px solid white;
		}
	}
	
	.icon-box2 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		box-shadow: 2px 0px 20px #d9dff0;
		.li {
			float: left;
			text-align: center;
			height: 50px;
			font-size: 22px;
			font-family: PingFangSC-Regular;
			box-sizing: border-box;
			border-top: 1px solid white;
			cursor: pointer;
			position: relative;
			.child-box {
				position: absolute;
				bottom: 100%;
				left: 50%;
				transform: translate(-50%, 0%);
				width: 90%;
				text-align: center;
				background-color: #f4f4f4;
				margin-bottom: 12px;
				z-index: 15;
				li:not(:last-child) {
					border-bottom: 1px solid #e4e7ed;
				}
				.pr-div {
					position: relative;
					width: 100%;
					height: 100%;
					padding: 5px;
					box-sizing: border-box;
					border-radius: 3px;
					li {
						font-size: 12px;
						padding: 5px 0;
						line-height: 15px;
					}
					.sjx {
						position: absolute;
						left: 50%;
						bottom: 0;
						width: 0;
						height: 0;
						border: 7px solid;
						border-color: #f4f4f4 transparent transparent transparent;
						transform: translate(-50%, 100%);
					}
				}
			}
			i {
				font-size: 20px;
			}
			p {
				font-size: 12px;
			}
			span {
				font-size: 12px;
			}
		}
		.lineH50 {
			line-height: 50px;
		}
		.li:not(:last-child) {
			border-right: 1px solid white;
		}
	}
	
	.custom-container {
		background-color: #fff;
		margin: 20px;
		.submit-btn-box {
			position: fixed;
			right: 5%;
			bottom: 8%;
			z-index: 1115;
			cursor: pointer;
			div {
				width: 120px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: rgba(255, 255, 255, 0.6);
				border-radius: 4px;
				border: 1px solid rgba(225, 225, 225, 1);
			}
			div:nth-child(1) {
				margin-bottom: 10px;
				background-color: white;
			}
			div:nth-child(2) {
				background-color: #336FFF;
				color: white;
			}
		}
		.show-box {
			height: 1136px;
			min-width: 1200px;
			background: rgb(216, 221, 250);
			padding: 50px;
			box-sizing: border-box;
			.phone-show {
				float: left;
				width: 416px;
				height: 859px;
				background: url(../../assets/images/phone.png) no-repeat;
				background-size: 100% 100%;
				padding: 96px 20.5px;
				box-sizing: border-box;
				.bg-white {
					background-color: white;
					width: 100%;
					height: 100%;
					overflow: hidden;
					position: relative;
				}
			}
			.gn-box {
				float: left;
				width: 520px;
				height: 900px;
				padding: 140px 17px;
				box-sizing: border-box;
				margin-left: 20px;
				position: relative;
				.component-name {
					position: absolute;
					top: 8%;
					left: 50%;
					transform: translate(-50%, -8%);
					font-size: 20px;
					font-weight: bold;
					color: #4b74ff;
				}
				.bg-white {
					background-color: white;
					width: 100%;
					height: 100%;
					min-height: 100%;
					padding: 30px;
					border-radius: 3px;
					box-sizing: border-box;
					overflow-y: scroll;
				}
			}
		}
	}
</style>