<template>
	<div class="goods-box">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="上下边距(像素)：">
				<el-slider v-model="form.paddingVertical" :max="50" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="左右边距(像素)：" v-if="form.layout == 1">
				<el-slider v-model="form.paddingHorizontal" :max="50" show-input @change="change"></el-slider>
			</el-form-item>
			<el-form-item label="背景颜色：">
				<el-radio-group v-model="form.isInheritBackgroundColor" @change="change">
					<el-radio :label="1">自定义</el-radio>
					<el-radio :label="2">使用页面背景色</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.isInheritBackgroundColor == 1" v-model="form.diyBackgroundColor" size="small" show-alpha @active-change="bcChange"></el-color-picker>
				</div>
			</el-form-item>
			<el-form-item label="布局方式：">
				<el-radio-group v-model="form.layout" @change="change">
					<el-radio :label="1">样式一</el-radio>
					<el-radio :label="2">样式二</el-radio>
					<el-radio :label="3">样式三</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="商品名称：">
				<el-radio-group v-model="form.showGoodsName" @change="change">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.showGoodsName == 1" v-model="form.goodsNameColor" size="small" show-alpha @active-change="gncChange"></el-color-picker>
				</div>
			</el-form-item>
			<el-form-item label="商品售价：">
				<el-radio-group v-model="form.showPrice" @change="change">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.showPrice == 1" v-model="form.priceColor" size="small" show-alpha @active-change="pcChange"></el-color-picker>
				</div>
			</el-form-item>
			<el-form-item label="商品原价：">
				<el-radio-group v-model="form.showOriginalPrice" @change="change">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
				<div class="flex-box" v-if="form.showOriginalPrice == 1">
					<el-color-picker class="mr10" v-model="form.originalPriceColor" size="small" show-alpha @active-change="opcChange"></el-color-picker>
					<el-input clearable="true" v-model="form.originalPriceText" placeholder="原价描述（建议3个字以内）" @input="change"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="原价删除线：" v-if="form.showOriginalPrice == 1">
				<el-radio-group v-model="form.isLineThrough" @change="change">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="商品销量：">
				<el-radio-group v-model="form.showSalesNum" @change="change">
					<el-radio :label="1">显示</el-radio>
					<el-radio :label="0">隐藏</el-radio>
				</el-radio-group>
				<div class="flex-box" v-if="form.showSalesNum == 1">
					<el-color-picker class="mr10" v-model="form.salesNumColor" size="small" show-alpha @active-change="sncChange"></el-color-picker>
					<el-input clearable="true" v-model="form.salesNumText" placeholder="销量描述（建议3个字以内）" @input="change"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="商品来源：">
				<el-checkbox-group v-model="form.goodsSource" :min="1">
					<el-checkbox label="hasShopGoods">店铺商品</el-checkbox>
					<el-checkbox label="hasSupplyGoods">供应链商品</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="选择商品：">
				<el-radio-group v-model="form.goodsChoice" @change="change">
					<el-radio :label="1">手动选择</el-radio>
					<el-radio :label="2" v-if="form.goodsSource == 'hasShopGoods'">选择分组</el-radio>
					<el-radio :label="3">智能推荐</el-radio>
				</el-radio-group>
			</el-form-item>
			<div v-if="form.goodsChoice != 1">
				<el-form-item label="推荐类型：" v-if="form.goodsChoice == 3">
					<el-radio-group v-model="form.rcType" @change="change">
						<el-radio :label="1">热销商品</el-radio>
						<el-radio :label="2">特色商品</el-radio>
						<el-radio :label="3">猜您喜欢</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择分组：" v-if="form.goodsChoice == 2 && form.goodsSource == 'hasShopGoods'">
					<el-input disabled clearable="true" v-model="form.groupName" placeholder="选择分组" @input="change">
						<template slot="append" class="select-url-btn"><span @click="isChoiceGroup = true">选择分组</span></template>
					</el-input>
				</el-form-item>
				<el-form-item style="margin-bottom: 0;" label="商品排序方式：">
					<el-radio-group v-model="form.numType" @change="change">
						<el-radio :label="1" v-if="form.goodsChoice != 3">随机</el-radio>
						<el-radio :label="2">自定义排序</el-radio>
						<el-radio :label="3">销量排序</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item class="r13" label=" ">
					<el-radio-group v-model="form.numType" @change="change">
						<el-radio :label="4">价格升序</el-radio>
						<el-radio :label="5">价格降序</el-radio>
						<el-radio :label="6">上架时间降序</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品数量类型：">
					<el-radio-group v-model="form.sortType" @change="change">
						<el-radio :label="1">不限定数量</el-radio>
						<el-radio :label="2">限定数量</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="显示数量：" v-if="form.sortType == 2">
					<el-slider v-model="form.showNum" :max="50" show-input @change="change"></el-slider>
				</el-form-item>
			</div>
			<div v-else>
				<draggable class="goods-list" v-model="form.goodsList" :options="{animation:300}">
					<div class="li clearfix" v-for="(item,index) in form.goodsList" :key="index">
						<div class="left">
							<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" class="avatar">
						</div>
						<div class="left ml14">
							<div class="mb5">
								<el-input disabled v-model="item.goodsTitle" placeholder="商品名称" @input="change"></el-input>
							</div>
							<div>
								<el-input disabled v-model="item.goodsPrice" placeholder="商品价格" @input="change"></el-input>
							</div>
						</div>
						<i v-if="form.goodsList.length > 1" class="el-icon-remove del-button-btn" title="删除该商品" @click="delgoods(index)"></i>
					</div>
				</draggable>
				<el-button icon="el-icon-plus" size="mini" class="add-btn" @click="addGoods">添加一个</el-button>
			</div>
		</el-form>
		<!--商品分组-->
		<el-dialog title="选择商品分组" :visible.sync="isChoiceGroup" width="900px">
			<v-goods-group :isChoiceGroup="isChoiceGroup" @getGoodsGroup="getGoodsGroup"></v-goods-group>
		</el-dialog>
		<!--商品列表-->
		<el-dialog title="选择商品" :visible.sync="isShowGoods" width="900px">
			<v-goods-list ref="goodsBox" v-if="isShowGoods" :goodsSource="form.goodsSource" @getGoodsList="getGoodsList"></v-goods-list>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowGoods = false">取 消</el-button>
				<el-button type="primary" @click="getList">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import links from '../../components/link/index' //链接组件
	import vGoodsList from './goodsList'
	import vGoodsGroup from './goodsGroup'
	export default {
		components: {
			draggable,
			links,
			vGoodsList,
			vGoodsGroup
		},
		props: {
			data: Object,
			activeId: String
		},
		data() {
			return {
				isShowGoods: false,
				isChoiceGroup: false,
				form: {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					allGoods: 0,
					paddingVertical: 0,
					paddingHorizontal: 0,
					isInheritBackgroundColor: 2,
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					layout: 1,
					showGoodsName: 1,
					goodsNameColor: 'rgb(34, 34, 34)',
					showPrice: 1,
					priceColor: 'rgb(242, 48, 48)',
					showOriginalPrice: 1,
					originalPriceColor: 'rgb(66, 66, 66)',
					originalPriceText: '',
					isLineThrough: 1,
					showSalesNum: 1,
					salesNumColor: 'rgb(102, 102, 102)',
					salesNumText: '',
					goodsSource: ['hasShopGoods', 'hasSupplyGoods'],
					goodsChoice: 3,
					rcType: 1,
					groupName: '',
					groupId: '',
					numType: 1,
					sortType: 2,
					showNum: 20,
					goodsList: [{
							imgUrl: 'http://cgc.cgc999.com:8080/group1/M00/00/07/rBL0Dlvrx4eAepveAAHl6-aRUEU546.jpg',
							goodsTitle: '商品名称',
							goodsPrice: '商品售价',
							goodsOriginalPrice: '商品原价',
							salesNum: 0,
							integral: 0
						},
						{
							imgUrl: 'http://cgc.cgc999.com:8080/group1/M00/00/08/rBL0Dlvr0sWAcHajAADCCrB592w942.jpg',
							goodsTitle: '商品名称',
							goodsPrice: '商品售价',
							goodsOriginalPrice: '商品原价',
							salesNum: 0,
							integral: 0
						}
					]
				},
				dp: {
					sdList: [],
					groupList: []
				},
				gyl: {
					sdList: [],
					groupList: []
				},
				allList: [],
				goodsList: [{
						imgUrl: 'http://cgc.cgc999.com:8080/group1/M00/00/07/rBL0Dlvrx4eAepveAAHl6-aRUEU546.jpg',
						goodsTitle: '商品名称',
						goodsPrice: '商品售价',
						goodsOriginalPrice: '商品原价',
						salesNum: 0,
						integral: 0
					},
					{
						imgUrl: 'http://cgc.cgc999.com:8080/group1/M00/00/08/rBL0Dlvr0sWAcHajAADCCrB592w942.jpg',
						goodsTitle: '商品名称',
						goodsPrice: '商品售价',
						goodsOriginalPrice: '商品原价',
						salesNum: 0,
						integral: 0
					}
				]
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
			},
			'form.layout' () {
				this.form.originalPriceColor = this.form.layout == 1 ? 'rgb(66, 66, 66)' : 'rgb(255, 255, 255)'
			},
			'form.showNum' () {
				this.setList()
			},
			'form.goodsSource' () {
				console.log(this.form.goodsSource)
				if(this.form.goodsSource == 'hasShopGoods') {
					if(this.form.goodsChoice == 1) {
						this.form.goodsList = this.dp.sdList
					} else if(this.form.goodsChoice == 2) {
						this.form.goodsList = this.dp.groupList
					} else if(this.form.goodsChoice == 3) {
						this.form.goodsList = this.goodsList
					}
				} else if(this.form.goodsSource == 'hasSupplyGoods') {
					if(this.form.goodsChoice == 1) {
						this.form.goodsList = this.gyl.sdList
					} else {
						this.form.goodsChoice = 3
						this.form.goodsList = this.goodsList
					}
				} else {
					this.allList = this.goodsList
					this.form.goodsList = this.allList
				}
			},
			'form.goodsChoice' () {
				if(this.form.goodsSource == 'hasShopGoods') {
					if(this.form.goodsChoice == 1) {
						this.form.goodsList = this.dp.sdList
					} else if(this.form.goodsChoice == 2) {
						this.form.goodsList = this.dp.groupList
					} else if(this.form.goodsChoice == 3) {
						this.form.goodsList = this.goodsList
					}
				} else if(this.form.goodsSource == 'hasSupplyGoods') {
					if(this.form.goodsChoice == 1) {
						this.form.goodsList = this.gyl.sdList
					} else {
						this.form.goodsList = this.goodsList
					}
				} else {
					this.allList = this.goodsList
					this.form.goodsList = this.allList
				}
			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
				this.form.allGoods = 0
				if(JSON.stringify(this.data) != "{}") {
					if(this.form.goodsSource == 'hasShopGoods') {
						if(this.form.goodsChoice == 1) {
							this.dp.sdList = this.form.goodsList
						} else if(this.form.goodsChoice == 2) {
							this.dp.groupList = this.form.goodsList
						} else if(this.form.goodsChoice == 3) {
							this.goodsList = this.form.goodsList
						}
					} else if(this.form.goodsSource == 'hasSupplyGoods') {
						if(this.form.goodsChoice == 1) {
							this.gyl.sdList = this.form.goodsList
						} else {
							this.goodsList = this.form.goodsList
						}
					} else {
						this.allList = this.form.goodsList
					}
				}
				this.$emit('setData', this.form)
			}
		},
		methods: {
			change() {
				this.$emit('setData', this.form)
			},
			//选择商品分组
			getGoodsGroup(val) {
				var vm = this
				vm.form.groupName = val.groupName
				vm.form.groupId = val.groupId
				vm.isChoiceGroup = false
				vm.form.goodsSource = ['hasShopGoods']
				vm.$get(vm.$api.custom.getGoodsList, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					groupId: val.groupId,
					curPage: 1,
					pageSize: 2000,
					hasShopGoods: 1
				}).then(resp => {
					if(resp.list.length == 0) {
						vm.$message.warning('该商品组暂无商品喔！')
						return false;
					}
					vm.form.goodsList = resp.list
					vm.setList()
				})
			},
			setList() {
				var vm = this
				var list = []
				for(var i = 0; i < vm.form.goodsList.length; i++) {
					list.push({
						imgUrl: vm.form.goodsList[i].img.original,
						goodsTitle: vm.form.goodsList[i].goodsName,
						goodsPrice: vm.form.goodsList[i].price,
						goodsId: vm.form.goodsList[i].goodsId,
						goodsOriginalPrice: vm.form.goodsList[i].originPrice,
						salesNum: vm.form.goodsList[i].salesNum
					})
				}
				vm.dp.groupList = list
				vm.form.goodsList = list
				vm.change()
			},
			//删除商品
			delgoods(index) {
				var vm = this
				if(vm.form.goodsSource == 'hasShopGoods') {
					vm.dp.sdList.splice(index, 1)
					vm.form.goodsList = vm.dp.sdList
				} else if(vm.form.goodsSource == 'hasSupplyGoods') {
					vm.gyl.sdList.splice(index, 1)
					vm.form.goodsList = vm.gyl.sdList
				} else {
					vm.allList.splice(index, 1)
					vm.form.goodsList = vm.allList
				}
				vm.change()
			},
			//添加商品
			addGoods() {
				var vm = this
				vm.$get(vm.$api.pos.getGoodsList, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					status: 1,
					curPage: 1,
					pageSize: 20,
				}).then(resp => {
					vm.isShowGoods = true
				})
			},
			getList() {
				this.$refs.goodsBox.setList()
			},
			getGoodsList(val) {
				var vm = this
				vm.isShowGoods = false
				if(vm.form.goodsSource == 'hasShopGoods') {
					val.forEach((value) => {
						vm.dp.sdList.push({
							imgUrl: value.img.original,
							goodsTitle: value.goodsName,
							goodsPrice: value.price,
							goodsId: value.goodsId,
							goodsOriginalPrice: value.originPrice,
							salesNum: value.salesNum
						})
					})
				} else if(vm.form.goodsSource == 'hasSupplyGoods') {
					val.forEach((value) => {
						vm.gyl.sdList.push({
							imgUrl: value.img.original,
							goodsTitle: value.goodsName,
							goodsPrice: value.price,
							goodsId: value.goodsId,
							goodsOriginalPrice: value.originPrice,
							salesNum: value.salesNum
						})
					})
				} else {
					val.forEach((value) => {
						vm.allList.push({
							imgUrl: value.img.original,
							goodsTitle: value.goodsName,
							goodsPrice: value.price,
							goodsOriginalPrice: value.originPrice,
							salesNum: value.salesNum
						})
					})
				}
			},
			//销量色改变
			sncChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(102, 102, 102)'
					}
					this.form.salesNumColor = val
					this.change()
				}
			},
			//原价色改变
			opcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(66, 66, 66)'
					}
					this.form.originalPriceColor = val
					this.change()
				}
			},
			//售价色改变
			pcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(242, 48, 48)'
					}
					this.form.priceColor = val
					this.change()
				}
			},
			//商品名称色改变
			gncChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgb(34, 34, 34)'
					}
					this.form.goodsNameColor = val
					this.change()
				}
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
			}
		},

	}
</script>

<style lang="less">
	.goods-box {
		.mr10 {
			margin-right: 10px;
		}
		.el-form-item {
			margin-bottom: 10px;
		}
		.el-input__inner {
			height: 32px;
			font-size: 12px;
		}
		.el-input-group__append:hover,
		.el-input-group__append:active {
			background: #4b74ff;
			color: white;
			border-radius: 0px;
			box-sizing: border-box;
			cursor: pointer;
		}
		.flex-box {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.r13 {
			.el-radio {
				margin-left: 8px!important;
			}
		}
		.add-btn {
			width: 100%;
			margin-top: 5px;
		}
		.goods-list {
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
					width: 68%;
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
				.avatar {
					width: 98px;
					height: 68px;
					display: block;
					background: #e4e7ed;
				}
			}
		}
	}
</style>