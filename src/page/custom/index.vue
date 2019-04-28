<template>
	<el-card class="custom-container clearfix">
		<p>功能选择</p>
		<ul class="component-list clearfix">
			<li v-for="(item,index) in componentList" :key="index" @click="addComponent(item)">{{item.label}}</li>
		</ul>
		<div class="show-box">
			<div class="phone-show">
				<div class="bg-white" :class="{'pb100':pageSetupConfigureData.tabType == '2' && showMenu}">
					<div class="item1" v-if="index == 0" :class="{'active':activeId == item.id}" v-for="(item,index) in showList" :key="item.id" @mouseenter="componentMouseenter(item,index)" @mouseleave="componentMouseleave(item,index)">
						<!--组件-->
						<div class="pr-box" @click="componentActive(item,index)">
							<page-setup-index class="undraggable" v-if="item.type == 0" :data="item.data"></page-setup-index>
						</div>

						<div class="edit-btn-box">
							<span class="component-name" @click="componentActive(item,index)" v-if="item.show">{{item.label}}</span>
							<span @click="componentActive(item,index)" :class="item.type != 0 ? 'edit-btn':'del-btn'" v-if="item.show && activeId != item.id">编辑</span>
							<span class="del-btn" @click="delComponent(item,index)" v-if="(item.show || activeId == item.id) && item.type != 0">删除</span>
						</div>
					</div>
					<draggable class="ov-box" v-model="showList" :style="{backgroundColor:pageSetupConfigureData.backgroundColor}" :options="draggableOption" :move="moveData" @update="datadragEnd">
						<div class="item" v-if="index != 0" :class="[{'active':activeId == item.id},'showItem'+index]" v-for="(item,index) in showList" :key="item.id" @mouseenter="componentMouseenter(item,index)" @mouseleave="componentMouseleave(item,index)">
							<!--组件-->
							<div class="pr-box" @click="componentActive(item,index)">
								<goods-index v-if="item.type == 1" :configData="item.data"></goods-index>
								<!--<search-index v-if="item.type == 2" :data="item.data"></search-index>-->
								<notice-index v-if="item.type == 4" :configData="item.data"></notice-index>
								<title-bar-index v-if="item.type == 5" :configData="item.data"></title-bar-index>
								<blank-index v-if="item.type == 6" :configData="item.data"></blank-index>
								<button-index v-if="item.type == 7" :configData="item.data"></button-index>
								<ueditor-index v-if="item.type == 8" :configData="item.data"></ueditor-index>
								<banner-index v-if="item.type == 9" :configData="item.data"></banner-index>
								<picture-showcase-index v-if="item.type == 10" :configData="item.data"></picture-showcase-index>
								<single-images-index v-if="item.type == 11" :configData="item.data"></single-images-index>
								<video-index v-if="item.type == 15" :configData="item.data"></video-index>
							</div>

							<div class="edit-btn-box">
								<span class="component-name" @click="componentActive(item,index)" v-if="item.show">{{item.label}}</span>
								<span @click="componentActive(item,index)" :class="item.type != 0 ? 'edit-btn':'del-btn'" v-if="item.show && activeId != item.id">编辑</span>
								<span class="del-btn" @click="delComponent(item,index)" v-if="(item.show || activeId == item.id) && item.type != 0">删除</span>
							</div>
						</div>
					</draggable>

					<div class="clearfix" v-if="pageSetupConfigureData.tabType == '2' && showMenu">
						<menu-index :data="menuData"></menu-index>
					</div>
				</div>
			</div>
			<div class="gn-box">
				<div class="bg-white">
					<!--组件对应配置-->
					<div v-for="(item,index) in showList" :key="item.id">
						<page-setup-config @setData="getData" :activeId="activeType == 0 ? activeId : ''" :data="activeType == 0 ? item.data : ''" v-if="activeType == 0 && item.id == activeId"></page-setup-config>
						<goods-config @setData="getData" :activeId="activeType == 1 ? activeId : ''" :data="activeType == 1 ? item.data : ''" v-if="activeType == 1 && item.id == activeId"></goods-config>
						<!--<search-config @setData="getData" :activeId="activeType == 2 ? activeId : ''" :data="activeType == 2 ? item.data : ''" v-if="activeType == 2 && item.id == activeId"></search-config>-->
						<notice-config @setData="getData" :activeId="activeType == 4 ? activeId : ''" :data="activeType == 4 ? item.data : ''" v-if="activeType == 4 && item.id == activeId"></notice-config>
						<title-bar-config @setData="getData" :activeId="activeType == 5 ? activeId : ''" :data="activeType == 5 ? item.data : ''" v-if="activeType == 5 && item.id == activeId"></title-bar-config>
						<blank-config @setData="getData" :activeId="activeType == 6 ? activeId : ''" :data="activeType == 6 ? item.data : ''" v-if="activeType == 6 && item.id == activeId"></blank-config>
						<button-config @setData="getData" :activeId="activeType == 7 ? activeId : ''" :data="activeType == 7 ? item.data : ''" v-if="activeType == 7 && item.id == activeId"></button-config>
						<ueditor-config @setData="getData" :activeId="activeType == 8 ? activeId : ''" :data="activeType == 8 ? item.data : ''" v-if="activeType == 8 && item.id == activeId"></ueditor-config>
						<banner-config @setData="getData" :activeId="activeType ==  9 ? activeId : ''" :data="activeType == 9 ? item.data : ''" v-if="activeType == 9 && item.id == activeId"></banner-config>
						<picture-showcase-config @setData="getData" :activeId="activeType ==  10 ? activeId : ''" :data="activeType == 10 ? item.data : ''" v-if="activeType == 10 && item.id == activeId"></picture-showcase-config>
						<single-images-config @setData="getData" :activeId="activeType == 11 ? activeId : ''" :data="activeType == 11 ? item.data : ''" v-if="activeType == 11 && item.id == activeId"></single-images-config>
						<video-config @setData="getData" :activeId="activeType == 15 ? activeId : ''" :data="activeType == 15 ? item.data : ''" v-if="activeType == 15 && item.id == activeId"></video-config>
					</div>
				</div>
				<p class="component-name">{{componentName}}</p>
			</div>
		</div>

		<div class="submit-btn-box">
			<div id="qrcode" ref="qrcode"></div>
			<div class="btn btn1" @click="addPageSetting">保存页面</div>
			<div class="btn btn2" @click="submit">保存并预览</div>
		</div>
		<el-dialog :visible.sync="isTurl" width="700px" close-on-press-escape>
			即将打开新窗口
			<span slot="footer" class="dialog-footer">
				<a :href="Turl" target="_blank" class="a-btn" @click="isTurl = false">确定</a>
			</span>
		</el-dialog>
	</el-card>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import draggable from 'vuedraggable'
	import searchIndex from './components/search/index' //搜索框
	import searchConfig from './components/search/config' //搜索框
	import pageSetupIndex from './components/pageSetup/index' //页面设置
	import pageSetupConfig from './components/pageSetup/config' //页面设置
	import titleBarIndex from './components/titleBar/index' //标题栏
	import titleBarConfig from './components/titleBar/config' //标题栏
	import buttonIndex from './components/button/index' //按钮组
	import buttonConfig from './components/button/config' //按钮组
	import singleImagesIndex from './components/singleImages/index' //单图组
	import singleImagesConfig from './components/singleImages/config' //单图组
	import blankIndex from './components/blank/index' //辅助空白
	import blankConfig from './components/blank/config' //辅助空白
	import noticeIndex from './components/notice/index' //公告
	import noticeConfig from './components/notice/config' //公告
	import bannerIndex from './components/banner/index' //图片轮播
	import bannerConfig from './components/banner/config' //图片轮播
	import ueditorIndex from './components/ueditor/index' //百度富文本
	import ueditorConfig from './components/ueditor/config' //百度富文本
	import pictureShowcaseIndex from './components/pictureShowcase/index' //图片橱窗
	import pictureShowcaseConfig from './components/pictureShowcase/config' //图片橱窗
	import goodsIndex from './components/goods/index' //商品组
	import goodsConfig from './components/goods/config' //商品组
	import videoIndex from './components/video/index' //商品组
	import videoConfig from './components/video/config' //商品组

	import menuIndex from '../../page/menu/index'
	export default {
		components: {
			QRCode,
			draggable,
			searchIndex,
			searchConfig,
			pageSetupIndex,
			pageSetupConfig,
			titleBarIndex,
			titleBarConfig,
			buttonIndex,
			buttonConfig,
			singleImagesIndex,
			singleImagesConfig,
			blankIndex,
			blankConfig,
			noticeIndex,
			noticeConfig,
			bannerIndex,
			bannerConfig,
			ueditorIndex,
			ueditorConfig,
			pictureShowcaseIndex,
			pictureShowcaseConfig,
			menuIndex,
			goodsIndex,
			goodsConfig,
			videoIndex,
			videoConfig
		},
		data() {
			return {
				draggableOption: {
					filter: '.undraggable',
					sort: true
				},
				activeType: 0,
				activeId: 0,
				move: false,
				componentList: [{
						label: '商品组',
						type: 1,
						show: false,
						id: '',
						data: {}
					},
					//					{
					//						label: '搜索框',
					//						type: 2,
					//						show: false,
					//						id: '',
					//						data: {}
					//					},
					//					{
					//						label: '固定搜索框',
					//						type: 3,
					//						show: false,
					//						id: '',
					//						data: {}
					//					},
					{
						label: '公告',
						type: 4,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '标题栏',
						type: 5,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '辅助空白',
						type: 6,
						show: false,
						id: '',
						data: {}
					},

					{
						label: '按钮组',
						type: 7,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '富文本',
						type: 8,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '图片轮播',
						type: 9,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '图片橱窗',
						type: 10,
						show: false,
						id: '',
						data: {}
					},
					{
						label: '单图组',
						type: 11,
						show: false,
						id: '',
						data: {}
					},
					//					{
					//						label: '优惠券组',
					//						type: 12,
					//						show: false,
					//						id: '',
					//						data: {}
					//					},
					//					{
					//						label: '选项组',
					//						type: 13,
					//						show: false,
					//						id: '',
					//						data: {}
					//					},
					//					{
					//						label: '顶部tab栏',
					//						type: 14,
					//						show: false,
					//						id: '',
					//						data: {}
					//					}
					{
						label: '视频组',
						type: 15,
						show: false,
						id: '',
						data: {}
					}
				],
				showList: [],
				pageSetupConfigureData: {},
				componentName: '页面设置',
				isF: false,
				menuData: '',
				showMenu: false,
				Turl: '',
				isTurl: false,
				status: 1,
			}
		},
		created() {
			if(this.$route.query.diyPageId) {
				this.getPageSettingDetail()
			} else {
				this.showList.push({
					label: '页面设置',
					type: 0,
					show: false,
					id: 0,
					data: {}
				})
			}
			sessionStorage.setItem('activeId', 0)
		},
		mounted() {
			//专题页编辑显示对应二维码
			this.$nextTick(() => {
				if(this.$route.query.type == 2 && this.$route.query.diyPageId) {
					if(location.host == this.$api.custom.url) {
						var qrcodeUrl = 'https://health.cgc999.com/web/new/index.html#/custom?id=' + this.$route.query.diyPageId
					} else {
						var qrcodeUrl = 'http://www.cgc999.com/new/index.html#/custom?id=' + this.$route.query.diyPageId
					}

					let qrcode = new QRCode('qrcode', {
						width: 150, // 设置宽度 
						height: 150, // 设置高度
						text: qrcodeUrl
					})
				}
			})
		},
		methods: {
			//获取详情
			getPageSettingDetail() {
				let vm = this
				vm.$get(vm.$api.custom.getPageSettingDetail, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					diyPageId: vm.$route.query.diyPageId
				}).then(resp => {
					vm.showList = JSON.parse(resp.content)

					this.$nextTick(function() {
						vm.showList.forEach((value, index) => {
							//设置全部背景色
							if(value.data.isInheritBackgroundColor == '2') {
								value.data.allBackgroundColor = vm.showList[0].data.backgroundColor
							}
							//设置图片轮播默认配置值
							if(value.type == 9) {
								document.querySelectorAll('.showItem' + index + ' .banner .el-carousel__button').forEach(val => {
									val.style.backgroundColor = value.data.buttonBackgroundColor
									val.style.opacity = value.data.buttonOpacity / 100
								})
								document.querySelectorAll('.showItem' + index + ' .banner .is-active .el-carousel__button').forEach(val => {
									val.style.opacity = value.data.buttonOpacity / 10
								})

								document.querySelectorAll('.showItem' + index + ' .banner .el-carousel__indicators')[0].style.marginBottom = value.data.marginBottom / 2 + 'px'

								if(value.data.position == '0') {
									document.querySelectorAll('.showItem' + index + ' .banner .el-carousel__indicators')[0].style.left = '30%'
								} else if(value.data.position == '1') {
									document.querySelectorAll('.showItem' + index + ' .banner .el-carousel__indicators')[0].style.left = '50%'
								} else {
									document.querySelectorAll('.showItem' + index + ' .banner .el-carousel__indicators')[0].style.left = '67%'
								}
							}
						})
					})

					vm.status = resp.status
				})
			},
			//保存
			addPageSetting() {
				let vm = this
				let url = vm.$route.query.diyPageId ? vm.$api.custom.editPageSetting : vm.$api.custom.addPageSetting
				let imgId = ''

				vm.showList.forEach((value) => {
					if(value.data.imgId != '' && value.data.imgId != undefined && value.data.imgId != null) {
						imgId += ',' + value.data.imgId
					}
				})

				vm.$post(url, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					diyPageId: vm.$route.query.diyPageId || null,
					imgIds: imgId,
					type: vm.$route.query.type,
					menuType: vm.showList[0].data.tabType,
					menuId: vm.showList[0].data.tabType == '2' ? vm.showList[0].data.menuItem.menuId : null,
					title: vm.showList[0].data.name,
					content: JSON.stringify(vm.showList),
					status: vm.status,
				}).then(resp => {
					if(!vm.isF) {
						vm.showArea = false
						vm.$message({
							message: vm.$route.query.diyPageId ? '修改成功' : '添加成功',
							type: 'success'
						})
						vm.$router.push({
							path: vm.$route.query.type == 1 ? '/custom-list' : '/custom-list2'
						})
					}
				})
			},
			//保存预览
			submit() {
				console.log(this.showList)

				let vm = this

				let url = vm.$route.query.diyPageId ? vm.$api.custom.editPageSetting : vm.$api.custom.addPageSetting
				let imgId = ''

				vm.showList.forEach((value) => {
					if(value.data.imgId != '' && value.data.imgId != undefined && value.data.imgId != null) {
						imgId += ',' + value.data.imgId
					}
				})

				vm.$post(url, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					diyPageId: vm.$route.query.diyPageId || null,
					imgId: imgId,
					type: 2,
					menuType: vm.showList[0].data.tabType,
					menuId: vm.showList[0].data.tabType == '2' ? vm.showList[0].data.menuItem.menuId : null,
					title: vm.showList[0].data.title,
					content: JSON.stringify(vm.showList),
					status: vm.status,
				}).then(resp => {
					vm.showArea = false
					vm.$message({
						message: vm.$route.query.diyPageId ? '修改成功' : '添加成功',
						type: 'success'
					})
					//					vm.$router.push({
					//						path: '/custom-list'
					//					})
					if(location.host == vm.$api.custom.url) {
						this.Turl = 'https://health.cgc999.com/web/new/index.html#/custom?id=' + resp
					} else {
						this.Turl = 'http://www.cgc999.com/new/index.html#/custom?id=' + resp
					}

					this.isTurl = true
				})
			},
			//获取组件实时修改的数据
			getData(data) {
				let vm = this
				//console.log(data)
				vm.showList.forEach((value, index) => {

					//设置全部背景色
					if(value.data.isInheritBackgroundColor == '2') {
						value.data.allBackgroundColor = vm.showList[0].data.backgroundColor
						value.data.backgroundColor = vm.showList[0].data.backgroundColor
					}

					if(value.id == vm.activeId) {
						value.data = data
						//页面设置
						if(value.type == 0) {
							vm.pageSetupConfigureData = value.data
							if(value.data.tabType == '2' && value.data.menuItem.menuId != '' && sessionStorage['isMenu'] == 'true') {
								vm.showMenu = true
								vm.getDiyMenu(value.data.menuItem.menuId)
							} else {
								vm.showMenu = false
							}
						}
					}

					if(value.type == 15) {
						value.data.videoList.forEach((val, index) => {
							val.options = {
								autoplay: false, //自动播放
								theme: '#FADFA3', //主体颜色
								loop: false, //循环播放
								lang: 'zh-cn', //语言
								screenshot: false, //视频截图
								hotkey: false, //启动热键
								volume: 0.7, //音量
								mutex: true, //多个视频同时播放
								video: {
									url: val.videoUrl,
									pic: val.imgUrl
								}
							}
							value.data.num = Math.random() * 10 + Date.parse(new Date())
						})
					}
				})
			},
			//获取是否有底部菜单
			getDiyMenu(menuId) {
				let vm = this
				vm.$get(vm.$api.custom.getDiyMenu, {
					menuId: menuId
				}).then(resp => {
					vm.menuData = resp.content
				}).catch(resp => {
					vm.showList[0].data.tabType = '1'
					vm.showList[0].data.menuItem = {
						menuId: '',
						title: ''
					}
					vm.showMenu = false
					vm.addPageSetting()
					vm.isF = true
				})
			},
			//拖动数据变化触发
			moveData(e) {
				let vm = this
				vm.move = true
				vm.showList.forEach((value, index) => {
					if(value.show) {
						vm.activeId = value.id
						vm.activeType = value.type
						sessionStorage.setItem('activeId', value.id)
						vm.componentName = value.label
					}
				})
			},
			//拖动数据结束触发
			datadragEnd(e) {
				let vm = this
				vm.move = false
				vm.showList.forEach((value, index) => {
					value.show = false
				})
			},
			//随机生成不重复ID
			createRandom(length) {
				if(length > 0) {
					var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
					var nums = "";
					for(var i = 0; i < length; i++) {
						var r = parseInt(Math.random() * 61);
						nums += data[r];
					}
					return nums;
				} else {
					return false;
				}
			},
			//添加组件
			addComponent(item) {
				let vm = this
				var item = JSON.parse(JSON.stringify(item))
				vm.showList = JSON.parse(JSON.stringify(vm.showList))
				item.id = vm.createRandom(15)
				for(var i = 0; i < vm.showList.length; i++) {
					if(vm.showList[i].id == sessionStorage['activeId']) {
						vm.showList.splice(Number(i + 1), 0, item)
						vm.activeType = item.type
						vm.activeId = item.id
						sessionStorage.setItem('activeId', item.id)
						vm.componentName = item.label
						break;
					}
				}
			},
			//删除组件
			delComponent(item, index) {
				let vm = this
				var item = JSON.parse(JSON.stringify(item))

				vm.$confirm('确定删除该组件吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(({
					value
				}) => {
					if(item.type != 0) {
						vm.showList.splice(index, 1)
						var i = index - 1;
						vm.activeType = vm.showList[i].type
						vm.activeId = vm.showList[i].id
						sessionStorage.setItem('activeId', vm.showList[i].id)
						vm.componentName = vm.showList[i].label
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					})
				})
			},
			//点击组件
			componentActive(item, index) {
				let vm = this
				if(!vm.isDel) {
					vm.activeId = item.id
					vm.activeType = item.type
					sessionStorage.setItem('activeId', item.id)
					vm.componentName = item.label
				}
			},
			//鼠标移入组件
			componentMouseenter(item, index) {
				let vm = this
				if(!vm.move) {
					vm.showList[index].show = true
				}
			},
			//鼠标移出组件
			componentMouseleave(item, index) {
				let vm = this
				if(!vm.move) {
					vm.showList[index].show = false
				}
			}
		},

	}
</script>
<style lang="less">
	.el-input-number__decrease,
	.el-input-number__increase {
		width: 32px!important;
		height: auto!important;
		margin: 0!important;
		line-height: 30px!important;
	}
	
	.el-input-number__decrease {
		border-right: 1px solid #dcdfe6!important;
		border-radius: 4px 0 0 4px!important;
	}
	
	.el-input-number__increase {
		border-radius: 0px 4px 4px 0px!important;
		border-left: 1px solid #dcdfe6!important;
	}
</style>
<style lang="less">
	.custom-container {
		background-color: #fff;
		margin: 20px;
		.a-btn {
			display: inline-block;
			border: 1px solid #dcdfe6;
			padding: 7px 15px;
			font-size: 12px;
			border-radius: 3px;
		}
		.submit-btn-box {
			position: fixed;
			right: 5%;
			bottom: 8%;
			z-index: 1115;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			align-items: center;
			#qrcode {
				margin-bottom: 25px;
			}
			.btn {
				width: 120px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: rgba(255, 255, 255, 0.6);
				border-radius: 4px;
				border: 1px solid rgba(225, 225, 225, 1);
			}
			.btn1 {
				margin-bottom: 10px;
				background-color: white;
			}
			.btn2 {
				background-color: #336FFF;
				color: white;
			}
		}
		.component-list {
			margin-top: 15px;
			margin-bottom: 15px;
			li {
				float: left;
				padding: 0 10px;
				height: 33px;
				line-height: 31px;
				text-align: center;
				box-sizing: border-box;
				background: rgba(255, 255, 255, 0.6);
				border-radius: 4px;
				border: 1px solid rgba(225, 225, 225, 1);
				font-size: 14px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(53, 53, 53, 1);
				margin-right: 8px;
				margin-bottom: 8px;
				cursor: pointer;
			}
			li:hover,
			li:active {
				background: #4b74ff;
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
				img {
					max-width: 100%!important;
				}
				.pb100 {
					padding-bottom: 100px!important;
				}
				.bg-white {
					background-color: white;
					width: 100%;
					height: 100%;
					overflow: hidden;
					padding-bottom: 45px;
					box-sizing: border-box;
					position: relative;
					.item1 {
						position: relative;
						cursor: pointer;
						z-index: 15;
						.edit-btn-box {
							position: absolute;
							right: 0px;
							bottom: 0px;
							z-index: 15;
							span {
								font-size: 12px;
								display: inline-block;
								cursor: pointer;
							}
							.component-name {
								color: #dd6161;
							}
							.del-btn {
								width: 40px;
								height: 20px;
								line-height: 20px;
								text-align: center;
								border-radius: 2px;
								background: rgba(0, 0, 0, .4);
								color: white;
							}
							.edit-btn {
								width: 40px;
								height: 20px;
								line-height: 20px;
								text-align: center;
								border-radius: 3px;
								color: white;
								background: rgba(0, 0, 0, .4);
							}
							.del-btn:hover,
							.del-btn:active {
								background-color: #dd6161;
							}
							.edit-btn:hover,
							.edit-btn:active {
								background-color: #4B74FF;
							}
						}
						.pr-box {
							position: relative;
							min-height: 20px;
							z-index: 11;
						}
					}
					.item1:hover {
						/*background-color: #4468e6;*/
						border: 1px dashed #4468e6;
						.name {
							display: block;
						}
					}
					.active {
						/*background-color: #4468e6;*/
						border: 1px dashed #4468e6;
					}
					.ov-box::-webkit-scrollbar {
						display: none;
					}
					.ov-box {
						height: 100%;
						overflow-y: scroll;
						.item1:hover {
							cursor: pointer!important;
						}
						.item {
							position: relative;
							cursor: move;
							z-index: 15;
							.edit-btn-box {
								position: absolute;
								right: 0px;
								bottom: 0px;
								z-index: 15;
								span {
									font-size: 12px;
									display: inline-block;
									cursor: pointer;
								}
								.component-name {
									color: #dd6161;
								}
								.del-btn {
									width: 40px;
									height: 20px;
									line-height: 20px;
									text-align: center;
									border-radius: 2px;
									background: rgba(0, 0, 0, .4);
									color: white;
								}
								.edit-btn {
									width: 40px;
									height: 20px;
									line-height: 20px;
									text-align: center;
									border-radius: 3px;
									color: white;
									background: rgba(0, 0, 0, .4);
								}
								.del-btn:hover,
								.del-btn:active {
									background-color: #dd6161;
								}
								.edit-btn:hover,
								.edit-btn:active {
									background-color: #4B74FF;
								}
							}
							.pr-box {
								position: relative;
								min-height: 20px;
								z-index: 11;
							}
							.minh10 {
								min-height: 10px!important;
							}
							.minh10~.edit-btn-box {
								position: absolute;
								right: 0px;
								bottom: -20px!important;
								z-index: 15;
							}
						}
						.item:hover {
							/*background-color: #4468e6;*/
							border: 1px dashed #4468e6;
							.name {
								display: block;
							}
						}
						.active {
							/*background-color: #4468e6;*/
							border: 1px dashed #4468e6;
						}
					}
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