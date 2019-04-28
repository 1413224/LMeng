<template>
	<div class="line-box clearfix">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane :label="link.label" :name="link.name" v-for="(link,index) in linkList" :key="index">
				<!--选择-->
				<ul class="class-list clearfix" v-for="(item,index) in link.classList">
					<li class="class-name" v-if="item.class"><i class="fa fa-folder-o" aria-hidden="true"></i>{{item.class}}</li>
					<li class="url-name" v-for="(i,j) in item.url" @click="linkActive(i)">
						{{i.title}}
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
		<!--手动输入-->
		<div v-if="showName">
			<el-form ref="form1" :model="form1" :rules="formRules1" label-width="90px">
				<el-form-item prop="url" label="链接地址：">
					<el-input clearable="true" v-model="form1.url" placeholder="请输入链接地址">
						<template slot="append" class="select-url-btn"><span @click="inputSure('form1')">确定</span></template>
					</el-input>
				</el-form-item>
			</el-form>
		</div>
		<!--商品列表-->
		<div v-if="isShowGoods">
			<v-goods v-if="isShowGoods" :goodsSource="goodsSource" @getGoods="getGoods"></v-goods>
		</div>
		<!--文章列表-->
		<div v-if="showArticle">
			<v-article v-if="showArticle" @getArticle="getArticle"></v-article>
		</div>
	</div>
</template>

<script>
	import vGoods from './components/goods'
	import vArticle from './components/article'
	export default {
		components: {
			vGoods,
			vArticle
		},
		props: {
			data: Object
		},
		data() {
			var vm = this
			return {
				activeName: '1',
				showName: false,
				showArticle: false,
				isShowGoods: false,
				form1: {
					url: '',
				},
				formRules1: {
					url: [{
						pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
						required: false,
						message: '请输入以http://或https://开头的链接地址',
						trigger: ['blur', 'change'],
					}],
				},
				linkList: [{
					label: '系统链接',
					name: '1',
					classList: [{
						class: 'CGC联盟',
						url: [{
							code: 1,
							title: '首页'
						}, {
							code: 2,
							title: '购物车'
						}, {
							code: 3,
							title: '个人中心'
						}, {
							code: 4,
							title: '共享设备首页'
						}, {
							code: 7,
							title: '产业联盟列表'
						}, {
							code: 8,
							title: '推广助手首页'
						}, {
							code: 10001,
							title: '快讯列表'
						}, {
							code: 12,
							title: '幸运大抽奖'
						}, {
							code: 16,
							title: '企业云商城首页'
						}, {
							code: 17,
							title: '供应链云商城'
						}, {
							code: 27,
							title: '积分充值'
						}]
					}, {
						class: '个人中心',
						url: [{
							code: 29,
							title: '个人资料'
						}, {
							code: 24,
							title: '收货地址'
						}, {
							code: 5,
							title: '会员码'
						}, {
							code: 6,
							title: '推广码'
						}, {
							code: 13,
							title: '我的粉丝'
						}, {
							code: 31,
							title: '企业通用积分'
						}, {
							code: 14,
							title: '通用积分'
						}, {
							code: 15,
							title: '信用积分'
						}, {
							code: 30,
							title: '收货地址'
						}, {
							code: 11,
							title: '我的资产'
						}, {
							code: 9,
							title: '我的优惠券'
						}, {
							code: 10,
							title: '我的关注'
						}, {
							code: 25,
							title: '发票管理'
						}, {
							code: 28,
							title: '用户充值'
						}]
					}, {
						class: '订单中心',
						url: [{
							code: 18,
							title: '我的订单'
						}, {
							code: 19,
							title: '待处理的订单'
						}, {
							code: 20,
							title: '进行中的订单'
						}, {
							code: 21,
							title: '待评价的订单'
						}, {
							code: 22,
							title: '评价中心'
						}, {
							code: 23,
							title: '退款/售后'
						}]
					}, {
						class: '系统专题',
						url: [{
							code: 26,
							title: '会员权益'
						}]
					}]
				}, {
					label: '店铺链接',
					name: '2',
					classList: [{
						url: [{
							title: '店铺首页',
							code: 30001
						}, {
							title: '店铺商品',
							code: 30002
						}, {
							title: '店铺有货商品',
							code: 30003
						}, {
							title: '店铺服务',
							code: 30004
						}, {
							title: '店铺简介',
							code: 30005
						}, {
							title: '店铺图册页',
							code: 30006
						}, {
							title: '店铺二维码页',
							code: 30007
						}]
					}]
				}, {
					label: '店铺商品选择',
					name: '3',
					type: '20001'
				}, {
					label: '供应链商品选择',
					name: '4',
					type: '20001'
				}, {
					label: '文章营销',
					name: '10002'
				}, {
					label: '自定义链接',
					name: '50000'
				}],
				goodsSource: 1,
				enterpriseId:''
			}
		},
		created() {
			if(this.data.code == '50000') {
				this.activeName = '50000'
				this.form1.url = this.data.url
			}
			this.getInfo()
		},
		watch: {
			activeName() {
				var _this = this
				this.isShowGoods = false
				this.showName = false
				this.showArticle = false
				if(this.activeName == 3 || this.activeName == 4) {
					setTimeout(function() {
						_this.isShowGoods = true
					}, 100)
				} else if(this.activeName == '50000') {
					this.showName = true
				} else if(this.activeName == '10002') {
					this.showArticle = true
				}
			}
		},
		methods: {
			//手动输入
			inputSure(form) {
				this.$nextTick(function() {
					this.$refs[form].validate((valid) => {
						if(valid) {
							var link = {
								code: 50000,
								title: this.form1.url,
								url: this.form1.url
							}
							this.$emit('setData', link)
						}
					})
				})
			},
			//选中链接
			linkActive(item) {
				if(this.activeName == 2){
					item.id = this.enterpriseId
				}
				this.$emit('setData', item)
			},
			getGoods(val) {
				var item = {
					title: val.goodsName,
					code: '20001',
					id: val.goodsId
				}
				this.$emit('setData', item)
			},
			getArticle(val) {
				var item = {
					title: val.title,
					code: this.activeName,
					id: val.articleId
				}
				this.$emit('setData', item)
			},
			handleClick(tab, event) {
				if(tab.name == '3') {
					this.goodsSource = 1
				} else if(tab.name == '4') {
					this.goodsSource = 2
				}
			},
			close() {
				this.$emit('setData', {})
			},
			getInfo() {
				var vm = this
				vm.$get(vm.$api.custom.getInfo, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']]
				}).then(resp => {
					vm.enterpriseId = resp.enterpriseId
				})
			}
		},

	}
</script>

<style lang="less">
	.line-box {
		.class-list {
			font-family: 微软雅黑;
			.class-name {
				margin-bottom: 5px;
				font-weight: bold;
				i {
					font-size: 15px;
				}
			}
			.url-name {
				float: left;
				padding: 0px 15px;
				border: 1px solid #e7eaec;
				margin-right: 10px;
				margin-bottom: 10px;
				color: #666;
				font-size: 12px;
				border-radius: 2px;
			}
			.url-name:hover,
			.url-name:active {
				cursor: pointer;
				border-color: #6f90ff;
				color: #6f90ff;
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
	}
</style>