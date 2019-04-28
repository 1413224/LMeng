<template>
    <!-- 供应链云商城 -->
	<div class="supply">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的商品总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>供应链商品</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
			    	<el-col :span="8">
             <el-form-item label="商品分类 : ">
              <el-cascader
                v-model="cateIds"
                :options="optionsCate"
                @change="getGoodsCategory"
                change-on-select
                clearable
                :props="props"
                style="width: 100%;">
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关键字 : ">
              <el-input v-model="keyword" placeholder="商品条形码或商品名称"></el-input>
            </el-form-item>
					</el-col>
          <template v-if="enState">
            <el-col :span="8">
							<el-form-item label="排序方法 : ">
								<el-select v-model="sortBy" placeholder="综合排序" style="width: 100%;">
							  		<el-option key=0 label="综合排序" :value="0"></el-option>
							  		<el-option key=1 label="时间排序" :value="1"></el-option>
							  		<el-option key=2 label="销量排序" :value="2"></el-option>
							  		<el-option key=3 label="价格由高到低" :value="3"></el-option>
							  		<el-option key=4 label="价格由低到高" :value="4"></el-option>
                    <el-option key=5 label="预计收入由高到低" :value="5"></el-option>
							  		<el-option key=6 label="预计收入由低到高" :value="6"></el-option>
							  	</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="价格区间 : ">
								<div class="input-half">
									<el-col :span="11">
										<el-input v-model="minPrice" placeholder="最小" @keyup.native="minCharges=formatDouble(minPrice)"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-input v-model="maxPrice" placeholder="最大" @keyup.native="maxCharges=formatDouble(maxPrice)"></el-input>
									</el-col>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="销量区间 : ">
								<div class="input-half">
									<el-col :span="11">
										<el-input v-model="minSalesNum" @keyup.native="minSalesNum=formatInt(minSalesNum)" placeholder="最小"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-input v-model="maxSalesNum" placeholder="最大" @keyup.native="maxSalesNum=formatInt(maxSalesNum)"></el-input>
									</el-col>
									</div>
							</el-form-item>
						</el-col>
            <el-col :span="8">
              <el-form-item label="销价区间 : ">
                <div class="input-half">
                  <el-col :span="11">
                    <el-input v-model="minOriginPrice" placeholder="最小" @keyup.native="minOriginPrice=formatDouble(minOriginPrice)"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="maxOriginPrice" placeholder="最大" @keyup.native="maxOriginPrice=formatDouble(maxOriginPrice)"></el-input>
                  </el-col>
                </div>
              </el-form-item>
            </el-col>
						<el-col :span="8">
							<el-form-item label="库存 : ">
								<el-select v-model="total" placeholder="全部" style="width: 100%;">
									<el-option label="全部" :value="0"></el-option>
									<el-option label="有库存" :value="1"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
            <el-col :span="8">
              <el-form-item label="积分区间 : ">
                <div class="input-half">
                  <el-col :span="11">
                    <el-input v-model="minPoints" placeholder="最小" @keyup.native="minPoints=formatDouble(minPoints)"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">-</el-col>
                  <el-col :span="11">
                    <el-input v-model="maxPoints" placeholder="最大" @keyup.native="maxPoints=formatDouble(maxPoints)"></el-input>
                  </el-col>
                </div>
              </el-form-item>
            </el-col>
          </template>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
            <el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
            <el-button type="text" v-else  @click="enState=!enState">收起 <i class="el-icon-arrow-up"></i></el-button>
					</el-col>
			  </el-row>
			</el-form>
			<!-- 表格数据 -->
			<div class="clear">
				<div class="card-info" v-for="item in items" :key="item.skuId">
					<div id="supply-shop" v-has="'supply-detail'" @click="goDetail(item.goodsId,item.skuId)">
						<div class="info-top">
							<img v-if="item.logo &&item.logo.original" :src="item.logo.original" alt="" class="info-images"/>
							<img v-else src="../../../assets/images/goods_default.png" alt="" class="info-images">
						</div>
						<div class="info-footer">
							<div class="info-cont">{{item.goodsName}}</div>
							<div class="info-title">
								<span class="title-left">
									<span style="float: left;">¥ {{item.price}}</span>
									<span class="info-cut">
										<span>原价： ¥ {{item.originPrice}}</span>
									</span>
								</span>
							</div>
							<div class="list-item">
								<span style="font-size: 20px;">¥ {{returnFloat(item.price - item.points)}}</span> + <span style="font-size: 20px;"> {{item.points}}</span><span style="font-size: 14px;"> 信用积分</span>
							</div>
							<div class="income-item">
								<p style="font-size: 16px;color: #ff343d;font-weight: 700;">预计收入:
									<span  style="font-size: 14px;">￥{{item.income}}</span>
								</p>
								<p>销量：{{item.salesRealNum}}</p>
							</div>
						</div>
					</div>
				</div>
				<div v-if="items.length===0" style="text-align:center; color:#909399;">
					暂无数据
				</div>
			</div>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page="curPage"
				:page-sizes="[10, 30, 50, 100]"
				:page-size="pageSize"
				layout="sizes, prev, slot, next"
        prev-text="上一页"
				next-text="下一页"
				:total="totalNums"
				class="flex_center">
        <span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
import cArea from '@/components/base/cArea'
export default {
	data () {
		return {
			data: {},
			items: [],
			cateIds: [],
			optionsCate: [],
			keyword: '',
		    minSalesNum: '',
		    maxSalesNum: '',
		    minOriginPrice: '',
		    maxOriginPrice: '',
		    minPoints: '',
			maxPoints: '',
			maxPrice:'',
			minPrice:'',
      		sortBy: 0,
			total: 0,
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			enState: false,
			search: {
				cateIds: '',
				keyword: '',
		        minSalesNum: '',
		        maxSalesNum: '',
		        minOriginPrice: '',
				maxOriginPrice: '',
				maxPrice:'',
				minPrice:'',
				sortBy: 0,
				total: 0,
				minPoints: '',
				maxPoints: '',
			},
			props: {
	        label: 'name',
	        value: 'categoryId'
      },
			totalCharges: 0,
			supplyShop: false
		}
	},
	components:{
		cArea
	},
	updated () {
		this.supplyShop = !document.querySelector('#supply-shop')
	},
	beforeRouteEnter (to, from, next){
    next(vm => {
      vm.getSupplyGoodsList()
    })
  },
	methods: {
		resetting () {
			let vm = this
			vm.cateIds = []
			vm.items = []
			vm.keyword = ''
			vm.minSalesNum = ''
		    vm.maxSalesNum = ''
		    vm.minOriginPrice = ''
			vm.maxOriginPrice = ''
			vm.minPoints = ''
			vm.maxPoints = ''
			vm.sortBy = 0
			vm.maxPrice = '',
			vm.minPrice = '',
			vm.total = 0
			vm.search = {
	        cateIds: '',
	        keyword: '',
	        minSalesNum: '',
	        maxSalesNum: '',
	        minOriginPrice: '',
	        maxOriginPrice: '',
	        minPoints: '',
			maxPoints: '',
			sortBy: 0,
			total: 0,
			maxPrice:'',
			minPrice:'',
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getSupplyGoodsList()
		},
		onSearch () {
			let vm = this
			vm.items = []
			vm.search = { // 进行搜索条件缓存
	        cateIds: vm.cateIds.join(','),
	        keyword: vm.keyword,
	        minSalesNum: vm.minSalesNum,
	        maxSalesNum: vm.maxSalesNum,
	        minOriginPrice: vm.minOriginPrice,
	        maxOriginPrice: vm.maxOriginPrice,
	        minPoints: vm.minPoints,
	        maxPoints: vm.maxPoints,
			sortBy: vm.sortBy,
			total: vm.total,
			maxPrice:vm.maxPrice,
			minPrice:vm.minPrice,
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getSupplyGoodsList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getSupplyGoodsList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getSupplyGoodsList()
		},
		getGoodsCategory (arr) {
        let vm = this  
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
        parentId: arr[arr.length - 1],
				curPage: 1,
        pageSize: 100,
        loading: true
      }
      let index,temp = []
      temp[0] = vm.optionsCate
      for (let i = 0; i < arr.length; i++) {
         for (let j = 0;j < temp[i].length; j++) {
            if (temp[i][j].categoryId == arr[i]) {
              temp[i+1] = temp[i][j].children
              index = temp[i][j]
            }
         }
      }
			vm.$get(vm.$api.pos.getGoodsCategory, param).then(resp => {
        if (resp.list < 1) {
          delete index.children
          vm.optionsCate = JSON.parse(JSON.stringify(vm.optionsCate))
        } else {
          index.children = resp.list.map(item => {
            item.children = []
            return item
          })
        }
			})
    },
    getGoodsCategoryOne () {
      let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
        parentId: 0,
				curPage: 1,
        pageSize: 100,
        loading: true
			}
			vm.$get(vm.$api.pos.getGoodsCategory, param).then(resp => {
        vm.optionsCate = resp.list.map(item => {
          item.children = []
          return item
        })
			})
  	},
		getSupplyGoodsList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.money.getSupplyGoodsList, param).then(resp => {
				vm.items = resp.list
				console.log(vm.items)
				console.log(vm.items.length)
				vm.totalNums = resp.totalNums
				vm.pages = Math.ceil(resp.totalNums/resp.pageSize) || 1
			})
    },
    getAreaArr (arr) {
      this.areaArr = arr
		},
		goDetail (id,skuId) {
			this.$router.push({ path: 'commodity-details', query: { gid: id, skuId : skuId }})
		},
		returnFloat(value){
			value = Math.round(parseFloat(value)*100)/100
			let xsd = value.toString().split(".")
			if(xsd.length==1){
				value = value.toString()+".00"
				return value
			}
			if(xsd.length>1){
				if(xsd[1].length<2){
					value = value.toString()+"0"
				}
				return value
			}
		}
	},
	created () {
		this.getGoodsCategoryOne()
	}
}
</script>

<style lang="less">	
.supply {
	.nub-top {
		height: 50px;
		.top-left {
			float: left;
		}
	}
    .box-card {
        margin: 20px;
        /*margin-right: 0;*/
    }
    .flex_center {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }
	.right-div {
		float: right;
		color: rgba(0, 0, 0, 0.45);
		text-align: center;
		padding: 0 20px;
		margin: 10px;
		border-left: 1px solid #ccc;
		.num {
			font-size: 32px;
			color: #000;
		}
	}
	.input-half {
        div {
            padding: 0!important;
            margin: 0;
        }
	}
	.card-info {
		width: 300px;
		float: left;
		margin-right: 20px;
		margin-bottom: 20px;
		border: 1px solid #ededed;
		cursor:pointer;
		space-around: 10px;
		.info-top {
			width: 296px;
			margin: 1px auto;
			.info-images {
				width: 100%;
				height: 300px;
				background-size: cover;
			}
		}
		.info-footer {
			margin: 10px;
			.info-cont {
				font-size: 18px;
				margin-top: 5px;
				flex: 1;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.info-title {
				padding-top: 5px;
				padding-bottom: 5px;
				height: 30px;
				line-height: 30px;
				.title-left {
					float: left;
					font-size: 20px;
					.info-cut {
						margin-left: 20px;
						text-decoration: line-through;
					    font-size: 14px;
						color: #A0A0A0;
					}
				}
				.title-right {
					font-size: 14px;
					float: right;
					color: #888;
				}
			}
			.list-item {
				width: 100%;
				height: 25px;
				line-height: 25px;
				font-size: 12px;
				color: #FE0136;
			}
			.income-item{
				width: 100%;
				height: 25px;
				line-height: 25px;
				font-size: 12px;
				overflow: hidden;
				p:nth-child(1){
					float: left;
				}
				p:nth-child(2){
					float: right;
				}
			}
			.member-image {
				width: 60px;
				// height: 18px;
			}
			.footer-btn-div {
				color: #A0A0A0;
				font-size: 12px;
				margin-bottom:10px;
				float: right;
			}
		}
	}
	.card-info:hover {
		border: 1px solid #4173f9;
	}
}
</style>
