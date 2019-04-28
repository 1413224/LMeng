<template>
	<div class="supply-detail">
		<div class="nub-top">
			<h2>供应链积分商品详情</h2>
		</div>
		<el-card class="goods-card">

			<el-row class="base-cont">
				<el-col :span="24">
					<div class="goods-row">
						<div class="tit-image">
							<img v-if="info.logo" :src="info.logo.original" alt="" class="image">
							<div class="tit">
								 <el-popover
								    placement="right-start"
								    title="商品详细信息："
								    width="200"
								    trigger="hover"
								    >
								    <div style="line-height: 30px;">
								    	<i v-if="info.shortName">商品短标题：{{info.shortName}}<br/></i>
								    	<i v-if="info.englishName">英文名称：{{info.englishName}}<br/></i>
								    	<i v-if="info.keyword">商品关键字：{{info.keyword}}<br/></i>
								    	<i v-if="info.content">商品的副标题：{{info.content}}<br/></i>
								    	<i v-if="info.content">商品类型：{{info.goodsType |filterType}}<br/></i>
								    </div>
								    <p class="tit_goodsname" slot="reference">{{info.goodsName}}</p>
								  </el-popover>

								
								<p class="tit_price">
									<span>销售价：</span>
									￥{{info.minPrice}}<i v-if="info.minPrice!=info.maxPrice">-{{info.maxPrice}}</i>
									<i v-if="info.unit" style="font-size: 14px;">/{{info.unit}}</i>
									<span style="text-decoration: line-through;margin-left: 15px;color: #909399;font-size: 14px;font-weight: 400;">
										￥{{info.minOriginPrice}}<i v-if="info.minOriginPrice!=info.maxOriginPrice">-{{info.maxOriginPrice}}</i>
									</span>
								</p>
								<p v-if="info.cateInfo">商品分类: <spam v-for="(item,index) in info.cateInfo" :key='item.cateId'>{{index ? '/': ''}}{{item.cateName}}</spam></p>
								<p v-if="info.brandName">商品品牌: {{info.brandName}}</p>
								<p v-if="info.originAreaInfo">原产地: <spam v-for="(item,index) in info.originAreaInfo" :key='item.areaId'>{{index ? '/': ''}}{{item.areaName}}</spam></p>
								<p>
									<el-tag size="mini" v-if="info.isInvoice==1" type="danger">支持发票</el-tag>
									<el-tag size="mini" v-if="info.isCod==1" type="success">支持货到付款</el-tag>
									<el-tag size="mini" v-if="info.isHirePurchase==1" type="warning">支持分期</el-tag>
									<el-tag size="mini" v-if="info.isWholesale==1" type="danger">支持批发</el-tag>
									<el-tag size="mini" v-if="info.isVerify==1" type="info">支持自提</el-tag>
									<el-tag size="mini" v-if="info.isAreaDispatch==1" type="success">支持同城配送</el-tag>
								</p>
							</div>
							<div class="tit_concern" v-if="info.concern">
								累计关注<br/>
								<span style="color: #F23030;">+ {{info.concern}}</span>
							</div>
							<div class="tit_concern" v-if="info.showSale">
								累计销量<br/>
								<span style="color: #336FFF;">{{info.salesNum}}</span>
							</div>
							<div class="tit_concern" v-if="info.total">
								商品库存<br/>
								<span style="color: #00DB83;">{{info.total}}</span>
							</div>
						</div>
					</div>
				</el-col>
				
			</el-row>
		</el-card>
		<el-card class="goods-card" v-if="info.thumb">
			<div slot="header" class="clearfix">
				<span>商品图册</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="img_flex">
						<div class="img_flex" >
							<div class="image-div" v-for="(item, index) in info.thumb" :key="index">
								<img v-if="item" :src="item.original" alt="" class="image">
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		
		<el-card class="goods-card" v-if="info.attribute.length>0">
			<div slot="header" class="clearfix">
				<span>商品参数</span>
			</div>
			<el-row>
                <table class="table-set" border="1px" bordercolor="#DCDFE6" cellspacing="0px">
	                <tr v-for="item in info.attribute" :key="item.attributeId">
	                	<td width="25%">{{item.attributeName}}</td>
	                	<td width="60%">{{item.attributeValue}}</td>
	                </tr>
	            </table>
			</el-row>
		</el-card>
		<el-card class="goods-card">
			<div slot="header" class="clearfix">
				<span>商品规格</span>
			</div>
			<el-row>
				<el-table :data="info.skuList" style="width: 100%">
                    <el-table-column prop="skuName" label="规格名称" min-width="160"></el-table-column>
                    <el-table-column prop="stock" label="库存" min-width="100"></el-table-column>
                    <el-table-column prop="weight" label="重量" min-width="100"></el-table-column>
                    <el-table-column prop="price" label="售价" min-width="100"></el-table-column>
                    <el-table-column prop="points" label="信用积分" min-width="130"></el-table-column>
                    <el-table-column prop="barcode" label="条形码" min-width="140"></el-table-column>
                    <el-table-column prop="code" label="商家编码" min-width="140"></el-table-column>
                </el-table>
			</el-row>
		</el-card>
		<el-card class="goods-card" v-if="info.returnDeadline || info.taxRate">
			<div slot="header" class="clearfix">
				<span>更多信息</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="8" v-if="info.returnDeadline"><span>退货时间：</span>{{info.returnDeadline |formatSecs}}</el-col>
				<el-col :span="8" v-if="info.taxRate"><span>税率：</span>{{info.taxRate}}</el-col>
			</el-row>
		</el-card>
		<el-card class="goods-card" v-if="info.detail">
			<div slot="header" class="clearfix">
				<span>商品详情</span>
			</div>
			<div v-html="info.detail" style="text-align: center;max-width: 1200px;margin: 0 auto;"></div>
		</el-card>
		<div class="shop-footer">
            <el-button  size="small" class="footer-btn" @click="goList(gid)">返回列表</el-button>
        </div>
	</div>
</template>

<script>
	import cArea from '@/components/base/cArea'
	import cGoodsClass from '@/components/base/cGoodsClass'
	import cSpec from '@/components/base/specifications'
	import { validatePositiveIntegerZero, validateMoney } from '@/assets/js/elValidate'
	// import UeditorConfig from '../custom/components/ueditor/config'
	import cUeditor from '@/components/base/cUeditor'

	export default {
		data() {
			return {
				visible: false,
				draArray: [],
				tableTh: [],
				tableData: [],
				info: {
					skuList: [],
					skuAttribute: [],
					attribute: [],
					originAreaInfo: []
				},
				spec: {
					skuAttribute: [],
					skuList: [],
				},
			}
		},
		computed: {
			thWidth() {
				let sum = this.tableTh.length + this.valueData.length
				return {
					width: 100 / sum + '%'

				}
			}
		},
		components: {
			cUeditor,
			cArea,
			cGoodsClass,
			cSpec
		},
		methods: {
			getGoodsInfoById() {
				let vm = this
				let param = {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					goodsId: vm.gid,
				}
				vm.$get(vm.$api.supply.getGoodsInfoById, param).then(resp => {
					vm.info = resp
					vm.spec = {
						skuAttribute: resp.skuAttribute,
						skuList: resp.skuList,
					}
				})
			},
			goList (id) {
	            this.$router.push({ path: 'supply', query: { gid: id }})
	        }
		},
		filters: {
			filterType(val) {
				switch(val) {
					case 1:
						return '线下门店商品'
					case 2:
						return '线上实物商品'
					case 3:
						return '共享服务'
					case 4:
						return '餐饮'
					case 5:
						return '酒店'
					case 6:
						return '门票'
					case 7:
						return '游戏'
					case 8:
						return '手机充值 '
					case 9:
						return '电影票 '
					case 10:
						return '演出票 '
					case 11:
						return '加油卡 '
					case 12:
						return '收钱吧商品 '
					default:
						return '/'
				}
			}
		},
		created() {
			this.gid = this.$route.query.gid
			if(this.gid) {
				this.getGoodsInfoById(this.gid)
			} else {
				this.$message({
					type: 'error',
					message: '错误的访问'
				})
			}
		}
	}
</script>

<style lang="less">
	.supply-detail {
		font-size: 18px;
		.goods-card {
			margin: 20px;
		}
		.img_flex {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.image-div {
				width: 125px;
				height: 111px;
				border: solid 1px #e6e8ea;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 10px;
				.image {
					width: 125px;
					height: auto;
					max-width: 100%;
					max-height: 100%;
					
				}
			}
		}
		.flex-center {
			text-align: center;
			padding-bottom: 30px;
		}
		
		.base-cont {
			line-height: 40px;
			margin-left: 40px;
		}
		.span {
			width: 120px;
			display: inline-block;
			float: left;
			margin-right: 20px;
		}
		.tit-image {
			.image {
				width: 240px;
				height: 240px;
				vertical-align: middle;
				border: 1px solid #e1e7f5;
			}
			.tit {
				vertical-align: top;
				display: inline-block;
				line-height: 30px;
				font-size: 16px;
				font-weight: 400;
				margin-left: 20px;
				color: #909399;
				.tit_goodsname{
					line-height: 60px;
					font-size: 22px;
					font-weight: 700;
					color: #303133;
				}
				.tit_price{
					line-height: 50px;
					font-size: 22px;
					font-weight: 700;
					color: #F56C6C;
				}
				
			}
			.tit_concern{
					float: right;
					line-height: 25px;
					font-size: 16px;
					margin-right: 20px;
					padding-left: 20px;
					border-left: 1px solid #C0C4CC;
					text-align: center;
				}
		}
		.table-set {
			width: 85%;
			line-height: 20px;
			td {
				padding: 20px 50px;
			}
		}
		.shop-footer{
	        height: 60px; 
	        width: 100%;
	        z-index: 2019;
	        background-color: #fff;
	        position: fixed;
	        bottom: 0;
	        right: 0;
	        box-shadow: 0px -2px 10px 0px rgba(115,134,173,0.2);
	        .footer-btn {
	            float: right;
	            margin: 14px 30px 0 0;
	        }
	    }
	}
</style>