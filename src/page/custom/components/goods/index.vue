<template>
	<div class="goods" :style="{backgroundColor: configData.backgroundColor}">
		<div v-if="configData.layout == 1">
			<ul class="layout1 clearfix" v-if="configData.goodsList">
				<li v-for="(goods,index) in configData.goodsList" :key="index" :style="liStyle">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
					<p v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
						<span :style="{textDecorationLine: configData.isLineThrough == 1 ? 'line-through' : 'none'}">¥ {{goods.goodsOriginalPrice}}</span>
						<span v-if="configData.originalPriceText != ''">（{{configData.originalPriceText}}）</span>
					</p>
					<p class="goods-sj" :style="{color: configData.priceColor}">
						<span v-if="configData.showPrice">¥ {{goods.goodsPrice}}</span>
						<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
					</p>
					<p class="goods-xl" v-if="configData.showSalesNum" :style="{color: configData.salesNumColor}">
						<span>{{configData.salesNumText != '' ? configData.salesNumText : '销量'}}：{{goods.salesNum}}</span>
					</p>
				</li>
			</ul>
		</div>
		<div v-if="configData.layout == 2">
			<ul class="layout2">
				<li v-for="(goods,index) in configData.goodsList" :key="index" :style="liStyle">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<div class="warp-box">
						<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
						<div class="red-box clearfix">
							<div v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
								<p><span>原价：</span>¥ {{goods.goodsOriginalPrice}}</p>
							</div>
							<div class="goods-sj" :style="{color: configData.priceColor}">
								<span v-if="configData.showPrice">会员价：¥ {{goods.goodsPrice}}</span>
								<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="configData.layout == 3">
			<ul class="layout3">
				<li v-for="(goods,index) in configData.goodsList" :key="index" :style="liStyle">
					<div class="img-box">
						<img :src="goods.imgUrl" />
					</div>
					<div class="warp-box">
						<p v-if="configData.showGoodsName" class="goods-name" :style="{color: configData.goodsNameColor}">{{goods.goodsTitle}}</p>
						<div class="red-box clearfix">
							<p v-if="configData.showOriginalPrice" class="goods-price" :style="{color: configData.originalPriceColor}">
								<span :style="{textDecorationLine: configData.isLineThrough == 1 ? 'line-through' : 'none'}">¥ {{goods.goodsOriginalPrice}}</span>
								<span v-if="configData.originalPriceText != ''">（{{configData.originalPriceText}}）</span>
							</p>
							<p class="goods-sj" :style="{color: configData.priceColor}">
								<span v-if="configData.showPrice">¥ {{goods.goodsPrice}}</span>
								<span v-if="configData.goodsSource == 2"> + {{goods.integral}}信用积分</span>
							</p>
							<p class="goods-xl" v-if="configData.showSalesNum" :style="{color: configData.salesNumColor}">
								<span>{{configData.salesNumText != '' ? configData.salesNumText : '销量'}}：{{goods.salesNum}}</span>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			configData: Object,
		},
		data() {
			return {

			}
		},
		computed: {
			liStyle() {
				return {
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px',
				}
			}
		},
		methods: {

		},

	}
</script>

<style lang="less">
	.goods {
		.layout3 {
			padding: 0 5px;
			box-sizing: border-box;
			li {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #999999;
				div {
					padding: 8px 0 5px;
				}
				.img-box {
					margin-right: 15px;
					img {
						width: 140px;
						height: auto;
					}
				}
			}
		}
		.layout2 {
			padding: 0 2px;
			li {
				margin-bottom: 2px;
				box-sizing: border-box;
				background-color: white;
				.img-box {
					img {
						width: 100%;
						height: auto;
					}
				}
				.warp-box {
					padding: 10px;
					.goods-name {
						font-size: 14px;
						color: #343434;
						font-weight: bold;
					}
					.red-box {
						padding: 5px;
						background-color: red;
						border-radius: 3px;
						margin-top: 5px;
						display: flex;
						align-items: center;
						.goods-price {
							font-size: 12px;
							padding: 4px 0px;
						}
						.goods-sj {
							color: rgb(242, 48, 48);
							background-color: white;
							margin-left: 10px;
							font-size: 12px;
							padding: 4px 28px;
							text-align: left;
							flex: 1;
						}
					}
				}
			}
		}
		.layout1 {
			padding: 0 2px;
			li {
				float: left;
				width: 49.7%;
				margin-bottom: 2px;
				padding: 0 4px;
				box-sizing: border-box;
				background-color: white;
				.img-box {
					height: 180px;
					line-height: 180px;
					overflow: hidden;
					img {
						width: 100%;
						height: auto;
					}
				}
				.goods-name {
					height: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 16px;
					line-height: 20px;
					margin: 10px 0;
					padding: 0 10px;
					box-sizing: border-box;
				}
				.goods-price {
					font-size: 15px;
					padding: 5px 10px;
					box-sizing: border-box;
				}
				.goods-sj {
					font-size: 14px;
					padding: 5px 10px;
					box-sizing: border-box;
					color: #f23030;
					font-weight: bold;
				}
				.goods-xl {
					font-size: 13px;
					padding: 0 10px 5px;
					box-sizing: border-box;
					color: rgb(102, 102, 102);
				}
			}
			li:nth-child(2n) {
				float: right;
				margin-left: 2px;
			}
		}
	}
</style>