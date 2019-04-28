<template>
	<div class="lower-detail">
		<div class="nub-top">
			<h2>产业联盟线下商品详情</h2>
		</div>
		<el-card class="goods-card">
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="goods-row">
						<div class="tit-image">
							<img v-if="info.logo" :src="info.logo.original" alt="" class="image">
              <img v-else src="../../../assets/images/goods_default.png" alt="" class="image">
							<div class="tit">
										<p class="tit_goodsname" slot="reference">{{info.goodsName}}</p>
								<p class="tit_price">
									<span>销售价：</span>
									￥{{info.minPrice}}<i v-if="info.minPrice!=info.maxPrice">-{{info.maxPrice}}</i>
									<i v-if="info.unit" style="font-size: 14px;">/{{info.unit}}</i>
									<span style="text-decoration: line-through;margin-left: 15px;color: #909399;font-size: 14px;font-weight: 400;">
										￥{{info.minOriginPrice}}<i v-if="info.minOriginPrice!=info.maxOriginPrice">-{{info.maxOriginPrice}}</i>
									</span>
								</p>
								<p v-if="info.minIncome==info.maxIncome" style="color: #ff343d;font-weight: 700;">预计收益：￥{{info.minIncome}}</p>
                <p v-else style="color: #ff343d;font-weight: 700;">预计收益：￥{{info.minIncome}} - {{info.maxIncome}}</p>
								<p v-if="info.cateInfo">商品分类: <spam v-for="(item,index) in info.cateInfo" :key='item.cateId'>{{index ? '/': ''}}{{item.cateName}}</spam></p>
								<p>商品品牌: {{info.brandName}}</p>
								<!-- <p v-if="info.originAreaInfo.length!==0">原产地: <spam v-for="(item,index) in info.originAreaInfo" :key='item.areaId'>{{index ? '/': ''}}{{item.areaName}}</spam></p> -->
								<p >原产地: <spam v-for="(item,index) in info.originAreaInfo" :key='item.areaId'>{{index ? '/': ''}}{{item.areaName}}</spam></p>
							</div>
							<div class="tit_concern">
								累计关注<br/>
								<span style="color: #00DB83;">+ {{info.concern}}</span>
							</div>
							<div class="tit_concern" >
								累计销量<br/>
								<span style="color: #336FFF;">{{info.salesRealNum}}</span>
							</div>
							<div class="tit_concern" >
								商品库存<br/>
								<span style="color: #F23030;">{{info.total}}</span>
							</div>
							<!--<div class="right-button">
								<div class="qr-code">
									<el-button style="width: 120px;" type="primary" @click="openQrcodeVisible">商品二维码</el-button>
								</div>
								<div style="margin-top:8px;" >
									<el-button style="width: 120px;" type="primary" @click="JumpRouting">商品链接</el-button>
								</div>
							</div>-->
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="goods-card">
			<div class="enterprise-info">
    	    <p class="enterprise-info-title">企业基本信息</p>
    	    <div class="enterprise-info-content" v-if="info.enterpriseInfo">
    	      <el-row>
    	        <el-col :span="24">
    	          <div>
    	            <img v-if="info.enterpriseInfo.logo" style="width:80px;height:80px;border: 1px solid #e1e7f5;" :src="info.enterpriseInfo.logo.original" alt="">
                  <img v-else style="width:80px;height:80px;border: 1px solid #e1e7f5;" src="../../../assets/images/goods_default.png" alt="">
    	            <h3 style="margin-left:30px;">{{info.enterpriseInfo.name}}</h3>
    	          </div>
    	        </el-col>
    	        <el-col :span="8"><span style="font-size:14px;color: #606266;">企业简称：{{info.enterpriseInfo.enterpriseName}}</span> </el-col>
    	        <el-col :span="8"><span style="font-size:14px;color: #606266;">营业时间：{{info.enterpriseInfo.businessHours | formatDate }}</span></el-col>
    	        <el-col :span="8">
                <span style="font-size:14px;color: #606266;">领域分类：
                  <span>{{info.enterpriseInfo.domainCateId1Name}}</span><span v-if="info.enterpriseInfo.domainCateId2Name">/</span><span>{{info.enterpriseInfo.domainCateId2Name}}</span><span v-if="info.enterpriseInfo.domainCateId3Name">/</span><span>{{info.enterpriseInfo.domainCateId3Name}}</span><span v-if="info.enterpriseInfo.domainCateId4Name">/</span><span>{{info.enterpriseInfo.domainCateId4Name}}</span>
                </span>
              </el-col>
    	        <el-col :span="8">
                <span style="font-size:14px;color: #606266;">所属区域：
                  <span>{{info.enterpriseInfo.countryName}}</span><span v-if="info.enterpriseInfo.provinceName">/</span><span>{{info.enterpriseInfo.provinceName}}</span><span v-if="info.enterpriseInfo.cityName"></span><span>{{info.enterpriseInfo.cityName}}</span><span v-if="info.enterpriseInfo.areaName">/</span><span>{{info.enterpriseInfo.areaName}}</span>
                </span>
              </el-col>
    	        <el-col :span="8"><span style="font-size:14px;color: #606266;">详细地址：{{info.enterpriseInfo.address}}</span></el-col>
    	        <el-col :span="8"><span style="font-size:14px;color: #606266;">距离：{{info.enterpriseInfo.distance}}公里</span></el-col>
    	      </el-row>
    	    </div>
    	</div>
		</el-card>
		<el-card class="goods-card" >
			<div slot="header" class="clearfix">
				<span>商品图册</span>
			</div>
			<el-row class="base-cont" v-if="info.thumb">
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
          <el-table-column prop="barcode" label="条形码" min-width="140"></el-table-column>
          <el-table-column prop="code" label="商家编码" min-width="140"></el-table-column>
        </el-table>
			</el-row>
		</el-card>
		<el-card class="goods-card">
			<div slot="header" class="clearfix">
				<span>商品详情</span>
			</div>
			<div v-if="info.detail" v-html="info.detail" style="text-align: center;max-width: 800px;margin: 0 auto;"></div>
			<div v-else>暂无商品详情</div>
		</el-card>
		<el-dialog :visible.sync="qrcodeVisible" width="280px">
			<div id="qrcode" class="label" ref="qrcode"></div>
		</el-dialog>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import cArea from '@/components/base/cArea'
	import cGoodsClass from '@/components/base/cGoodsClass'
	import cSpec from '@/components/base/specifications'

	export default {
		data() {
			return {
				visible: false,
				qrcodeVisible: false,
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
			cArea,
			cGoodsClass,
			cSpec,
			QRCode
		},
		methods: {
			getPosGoodsDetail() {
				let vm = this
				let param = {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					goodsId: vm.gid,
				}
				vm.$get(vm.$api.money.getPosGoodsDetail, param).then(resp => {
          vm.info = resp
					vm.spec = {
						skuAttribute: resp.skuAttribute,
						skuList: resp.skuList,
					}
				})
			},
			qrcode(qrcodeUrl){
			let qrcode = new QRCode('qrcode', {  
				width: 240,  // 设置宽度 
				height: 240, // 设置高度
				text: qrcodeUrl
		    })  
			},
			// 二维码
			openQrcodeVisible () {
				let vm = this
				let urlTemp = ''
				vm.qrcodeVisible = true
				if (window.location.host == 'www.cgc999.com'){
					urlTemp = 'http://' + window.location.host + '/new/index.html#/multi_user_mall/commodity_details?goodsId=' + vm.gid
				}else {
					urlTemp = 'https://' + window.location.host + '/web/new/index.html#/multi_user_mall/commodity_details?goodsId=' + vm.gid
				}
				vm.$nextTick(() => {
					vm.qrcode(urlTemp)
				})
				vm.openQrcodeVisible = () => {
					vm.qrcodeVisible = true
				}
			},
			// 跳转商品链接  health
			JumpRouting(){
				if (window.location.host == 'www.cgc999.com'){
					window.open('http://' + window.location.host + '/new/index.html#/multi_user_mall/commodity_details?goodsId=' + this.gid)
				} else if(window.location.host == 'health.cgc999.com'){
					window.open('https://' + window.location.host + '/web/new/index.html#/multi_user_mall/commodity_details?goodsId=' + this.gid)
				}else if(window.location.host == 'cgc.cgc999.com'){
					window.open('https://' + window.location.host + '/web/new/index.html#/multi_user_mall/commodity_details?goodsId=' + this.gid)	
				}else{
					window.open('http://www.cgc999.com/new/index.html#/multi_user_mall/commodity_details?goodsId=' + this.gid)	
				}
			},
		},
		created() {
			this.gid = this.$route.query.gid
			if(this.gid) {
				this.getPosGoodsDetail(this.gid)
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
	.lower-detail {
		font-size: 18px;
		.goods-card {
			margin: 20px;
		}
		.img_flex {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.image-div {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 10px;
				.image {
          width: 125px;
					max-width: 100%;
					max-height: 100%;
          border: solid 1px #e6e8ea;
          margin-right: 8px;
				}
			}
		}
		.flex-center {
			text-align: center;
			padding-bottom: 30px;
		}
		
		.base-cont {
			line-height: 40px;
		}
		.span {
			width: 120px;
			display: inline-block;
			float: left;
			margin-right: 20px;
		}
		.tit-image {
			position: relative;
			.right-button{
				position: absolute;
				top: 90px;
				right: 0px;
				.qr-code{
					position: relative;
					// >div{
					// 	display: none;
					// 	width: 240px;
					// 	height: 200px;
					// 	position: absolute;
					// 	top: -30px;
					// 	right: 130px;
					// 	z-index: 9999;
					// }
				}
				// .qr-code:hover{
				// 	>div{
				// 		display: block;
				// 	}
				// }
			}
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
		.enterprise-info{
  	  .enterprise-info-title{
  	    font-size: 18px;
  	    padding: 20px 0px;
  	    border-bottom: 2px solid #e1e7f5; 
  	  }
  	  .enterprise-info-content{
  	    .el-col-24{
  	      padding: 20px 0px;
  	      >div{
  	        display: flex;
  	        align-items: center;
  	      }
  	    }
  	   .el-col-8{
  	     padding: 10px 0px;
  	   }
  	  }
  	}
	}
</style>