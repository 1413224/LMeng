<template>
  <div class="service_details">
    <div class="nub-top">
			<h2>供应链服务详情</h2>
		</div>
    <el-card class="goods-card">
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="goods-row">
						<div class="tit-image">
							<img v-if="info.logo" :src="info.logo.original" alt="" class="image">
              <img v-else src="../../../assets/images/goods_default.png" alt="" class="image">
							<div class="tit">
								 <!-- <el-popover
								    placement="right-start"
								    title="商品详细信息："
								    width="200"
								    trigger="hover"
								    >
								    <div style="line-height: 30px;"> -->
								    	<!-- <i v-if="info.shortName">商品短标题：云南精品装 无籽红提<br/></i>
								    	<i v-if="info.englishName">英文名称：aa<br/></i>
								    	<i v-if="info.keyword">商品关键字：无籽红提<br/></i>
								    	<i v-if="info.content">商品的副标题：红提<br/></i>
								    	<i v-if="info.content">商品类型：12<br/></i> -->
                      <!-- <i>商品短标题：云南精品装 无籽红提<br/></i>
								    	<i>英文名称：aa<br/></i>
								    	<i>商品关键字：无籽红提<br/></i>
								    	<i>商品的副标题：红提<br/></i>
								    	<i>商品类型：12<br/></i>
								    </div> -->
								    <p class="tit_goodsname" slot="reference">{{info.goodsName}}</p>
								  <!-- </el-popover> -->
								<p style="font-size:18px;font-weight: 700;color: #303133">{{info.brandName}}</p>
                <!-- formatSecs -->
                <p class="tit_price">{{info.minServiceTime | formatSecs('小时', '分钟')}} / {{info.minPrice}}元</p>
                <div class="list-item">
								  <p v-if="info.minIncome==info.maxIncome">预计收入:<span style="font-size: 14px;">￥{{info.minIncome}}</span></p>
								  <p v-else>预计收入:<span style="font-size: 14px;">￥{{info.minIncome}}-{{info.maxIncome}}</span></p>
							  </div>
							</div>
							<div class="tit_concern" >
								累计销量<br/>
								<span>{{info.salesRealNum}}</span>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
    <el-card class="goods-card">
      <div class="meal-title">
        <h3>设备套餐</h3>
      </div>
      <div class="meal-conent">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" v-for="itme in info.skuList" :key="itme.skuId">
            <div class="meal-details">
              <img v-if="info.logo && info.logo.original" style="width:200px;padding:8px;border:1px solid #e1e7f5;" :src="info.logo.original" alt="">
              <div>
                <p>{{itme.skuName}}</p>
                <p>{{itme.serviceTime | formatSecs('小时', '分钟')}}/{{itme.price}}元</p>
                <p>预计收入：￥{{itme.income}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
		</el-card>
    <el-card class="goods-card">
			<el-col :span="24">
        <h3>提供该服务企业</h3>
        <el-table :data="tableData" style="width: 100%;margin-top:20px;">
          <el-table-column label="企业图片" min-width="150">
            <template slot-scope="scope">
              <img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" alt="" style="width:80px;height:80px;">
              <img v-else src="../../../assets/images/goods_default.png" alt="" style="width:80px;height:80px;">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="企业名称" min-width="150"></el-table-column>
          <el-table-column label="所属区域" min-width="200">
            <template slot-scope="scope">
              <span>{{scope.row.country}}</span><span v-if="scope.row.province">/</span><span>{{scope.row.province}}</span><span v-if="scope.row.city">/</span><span>{{scope.row.city}}</span><span v-if="scope.row.area">/</span><span>{{scope.row.area}}</span>
            </template>
          </el-table-column>
          <el-table-column label="领域分类" min-width="260">
            <template slot-scope="scope">
              <span>{{scope.row.domainCateName1}}</span><span v-if="scope.row.domainCateName2">/</span><span>{{scope.row.domainCateName2}}</span><span v-if="scope.row.domainCateName3">/</span><span>{{scope.row.domainCateName3}}</span><span v-if="scope.row.domainCateName4">/</span><span>{{scope.row.domainCateName4}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="orderDetail(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
			</el-col>
      <el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page="curPage"
				:page-sizes="[10, 20, 30, 50, 100]"
				:page-size="pageSize"
				layout="sizes, prev, slot, next"
        prev-text="上一页"
				next-text="下一页"
				:total="totalNums"
				class="flex_center">
        <span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
    <el-card class="goods-card">
      <div class="atlas">
        <p class="atlas-title">商品图册</p>
        <div class="atlas-img"  v-if="thumb">
          <!-- thumb -->
          <img v-if="itme && itme.original" style="width:100px;height:100px;border: 1px solid #e1e7f5;" v-for="itme in thumb" :key="itme.imageId" src="itme.original" alt="">
        </div>
      </div>
    </el-card>
    <el-card class="goods-card">
      <div class="introduce">
        <p class="introduce-title">商品详情</p>
        <div class="introduce-img">
          <div v-if="info.detail" v-html="info.detail" style="text-align: center;max-width: 800px;margin: 0 auto;"></div>
			    <div v-else style="margin-left:50px;color:#909399;">暂无商品详情</div>
        </div>
      </div>
    </el-card>
    <!--  -->
    <el-dialog :visible.sync="imageVisible" width="1150px">
      <div class="enterprise-info">
        <p class="enterprise-info-title">企业基本信息</p>
        <div class="enterprise-info-content">
          <el-row>
            <el-col :span="24">
              <div>
                <img v-if="detailedData.logo && detailedData.logo.original" style="width:80px;height:80px;border: 1px solid #e1e7f5;" :src="detailedData.logo.original" alt="">
                <h3 style="margin-left:30px;">{{detailedData.name}}</h3>
              </div>
              </el-col>
            <el-col :span="8">企业名称：{{detailedData.enterpriseName}}</el-col>
            <el-col :span="8">营业时间：{{detailedData.businessHours | formatDate}}</el-col>
            <el-col :span="8">领域分类：<span>{{detailedData.domainCateName1}}</span><span v-if="detailedData.domainCateName2">/</span><span>{{detailedData.domainCateName2}}</span><span v-if="detailedData.domainCateName3">/</span><span>{{detailedData.domainCateName3}}</span><span v-if="detailedData.domainCateName4">/</span><span>{{detailedData.domainCateName4}}</span></el-col>
            <el-col :span="8">所属区域：<span>{{detailedData.country}}</span><span v-if="detailedData.province">/</span><span>{{detailedData.province}}</span><span v-if="detailedData.city">/</span><span>{{detailedData.city}}</span><span v-if="detailedData.area">/</span><span>{{detailedData.area}}</span></el-col>
            <el-col :span="8">详细地址：{{detailedData.address}}</el-col>
            <el-col :span="8">距离：{{detailedData.distance | browsingVolume}}km</el-col>
          </el-row>
        </div>
      </div>
		</el-dialog>
  </div>
</template>
<script>
import cArea from '@/components/base/cArea'
// import cGoodsClass from '@/components/base/cGoodsClass'
// import cSpec from '@/components/base/specifications'

export default {
  data(){
    return{
      info:[],
      curPage: 1,
			pageSize: 10,
      pages: 1,
      totalNums:0,
      imageVisible: false,
      tableData: [],
      detailedData:{}
      // spec: {
			// 	skuAttribute: [],
			// 	skuList: [],
			// },
    }
  },
  components: {
		cArea,
		// cGoodsClass,
		// cSpec
	},
  methods: {
    handleSize (val) {
			this.pageSize = val
			this.curPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.getSupplyServiceEnterpriseList()
    },
    handleCurrent (currentVal) {
      this.curPage = currentVal
      this.getSupplyServiceEnterpriseList()
    },
    // 弹出框
    orderDetail(data){
      this.detailedData = data
      this.imageVisible = true
    },
    getSupplyServiceDetail() {
			let vm = this
			let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']],
				goodsId: vm.gid,
				skuId:vm.skuId
			}
			vm.$get(vm.$api.money.getSupplyServiceDetail, param).then(resp => {
        vm.info = resp
				// vm.spec = {
				// 	skuAttribute: resp.skuAttribute,
				// 	skuList: resp.skuList,
				// }
			})
    },
    getSupplyServiceEnterpriseList(){
      let vm = this
      let param ={
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        goodsId: vm.gid,
        pageSize: vm.pageSize,
        curPage: vm.curPage,
      }
      vm.$get(vm.$api.money.getSupplyServiceEnterpriseList, param).then(resp => {
        vm.tableData = resp.list
        vm.totalNums = resp.totalNums
				vm.pages = Math.ceil(resp.totalNums/resp.pageSize) || 1
			})
    }
  },
	created() {
		this.gid = this.$route.query.gid
		if(this.gid) {
      this.getSupplyServiceDetail(this.gid,this.skuId)
      this.getSupplyServiceEnterpriseList(this.gid)
		} else {
			this.$message({
				type: 'error',
				message: '错误的访问'
			})
		}
  },
  filters:{
    browsingVolume:function(value){
      value = Number(value);
      return value.toFixed(2);
    }
  },
}
</script>
<style lang="scss" scoped>
.service_details{
  .goods-card {
		margin: 20px;
    .base-cont {
			line-height: 40px;
			margin-left: 40px;
      .goods-row{
        .tit-image {
        .image {
          width: 220px;
          height: 220px;
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
            padding: 20px 0px;
            font-size: 22px;
            font-weight: 700;
            color: #F56C6C;
          }
          .list-item {
            font-weight: 700;
            color: rgb(255, 52, 61);
            display: -webkit-box;
            padding: 10px 0px;
          }
        }
        .tit_concern{
          float: right;
          line-height: 25px;
          font-size: 16px;
          margin-right: 40px;
          text-align: center;
          font-weight: 700;
          }
        }
      }
		}
    .flex_center {
      padding-top: 20px;
      display: flex;
      justify-content: center;
    }
	}
  .atlas{
    .atlas-title{
      font-size:18px;
      padding: 20px 0px;
      border-bottom: 2px solid #e1e7f5; 
    }
    .atlas-img{
      padding: 30px 50px;
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
  .introduce{
    .introduce-title{
      font-size: 18px;
      padding: 20px 0px;
      border-bottom: 2px solid #e1e7f5; 
    }
    .introduce-img{
      min-width: 800px;
      margin: auto;
      padding-top:20px;
    }
  }
  .meal-conent{
    margin-top: 20px;
    .meal-details{
      margin-top: 20px;
      display: flex;
      height: 200px;
      >div{
        width: 100%;
        padding-left: 20px;
        font-weight: 700;
        p:nth-child(1){
          font-size: 22px;
          padding-top: 8px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        p:nth-child(2){
          padding-top: 30px;
        }
        p:nth-child(3){
          color: #F56C6C;
          padding-top: 30px;
        }
        p:nth-child(4){
          color: #ff343d;
          font-size: 14px;
          padding-top: 30px;
        }
      }
    }
  }
}
</style>