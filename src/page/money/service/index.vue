<template>
    <!-- 供应链云商城 -->
	<div class="service">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的服务总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>供应链服务</h2>
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
							  		<el-option label="综合排序" :value="0"></el-option>
							  		<el-option label="时间排序" :value="1"></el-option>
							  		<el-option label="销量排序" :value="2"></el-option>
							  		<el-option label="价格由高到低" :value="3"></el-option>
							  		<el-option label="价格由低到高" :value="4"></el-option>
                    <el-option label="预计收入由高到低" :value="5"></el-option>
							  		<el-option label="预计收入由低到高" :value="6"></el-option>
							  	</el-select>
							  </el-form-item>
						  </el-col>
						  <!-- <el-col :span="8">
						  	<el-form-item label="有无库存 : ">
						  		<el-select v-model="total" placeholder="全部" style="width: 100%;">
						  			<el-option label="全部" :value="0"></el-option>
						  			<el-option label="有库存" :value="1"></el-option>
						  		</el-select>
						  	</el-form-item>
						  </el-col> -->
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
                <el-form-item label="距离 :">
									<el-select v-model="distance" placeholder="全部" style="width: 100%;">
							  		<el-option label="2km以内" :value="2"></el-option>
							  		<el-option label="5km以内" :value="5"></el-option>
							  		<el-option label="10km以内" :value="10"></el-option>
							  		<el-option label="20km以内" :value="20"></el-option>
							  		<el-option label="50km以内" :value="50"></el-option>
							  	</el-select>
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
				<div class="card-info" v-for="(item) in items" :key="item.goodsId">
					<div id="supply-shop" v-has="'supply-detail'" @click="goDetail(item.goodsId)">
						<div class="info-top">
							<img v-if="item.logo&&item.logo.original" v-lazy="item.logo.original" alt="" class="info-images"/>
						<img v-else src="../../../assets/images/goods_default.png" alt="" class="info-images">
						</div>
						<div class="info-footer">
							<div class="info-cont">{{item.goodsName}}</div>
							<div class="info-title">
								<span class="title-left">
									<span v-if="items.cateName">{{item.cateName}}</span>
								</span>
							</div>
							<div style="font-weight: 700;color: #ff343d;padding:10px 0px;">
								<span v-if="item.minPrice == item.maxPrice" style="font-size: 14px;">{{item.minServiceTime | formatSecs('小时', '分钟')}}/{{item.minPrice}}元</span>
								<span v-else style="font-size: 14px;">{{item.minServiceTime | formatSecs('小时', '分钟')}}/{{item.minPrice}} - {{item.maxIncome}}元</span>
							</div>
							<div class="list-item">
								<p>预计收入:
									<span v-if="item.minIncome == item.maxIncome" style="font-size: 14px;">￥{{item.minIncome}}</span>
									<span v-else style="font-size: 14px;">￥{{item.minIncome}}-{{item.maxIncome}}</span>
								</p>
							</div>
							<p style="text-align: right;padding-bottom: 10px;color: #A0A0A0;font-size: 12px;">销量：{{item.salesRealNum}}</p>
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
      minPrice:'',
      maxPrice:'',
      sortBy: 0,
      // total: 0,
      distance:'',
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
        minPrice:'',
        maxPrice:'',
				sortBy: 0,
        // total: 0,
        distance:""
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
      vm.getSupplyServiceList()
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
      // vm.total = 0
      vm.distance = ''
      vm.minPrice = '',
      vm.maxPrice = '',
			vm.search = {
        cateIds: '',
        keyword: '',
        minSalesNum: '',
        maxSalesNum: '',
        minOriginPrice: '',
        maxOriginPrice: '',
        minPoints: '',
        maxPoints: '',
        minPrice:'',
        maxPrice:'',
				sortBy: 0,
        // total:0,
        distance:''
			}
			vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
			vm.getSupplyServiceList()
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
        minPrice:vm.minPrice,
        maxPrice:vm. maxPrice,
				sortBy: vm.sortBy,
				distance:vm.distance,
				// total:vm.total
			}
			vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
			vm.getSupplyServiceList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
      this.$refs.paging.lastEmittedPage = 1
			this.getSupplyServiceList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getSupplyServiceList()
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
		getSupplyServiceList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.money.getSupplyServiceList, param).then(resp => {
				vm.items = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = Math.ceil(resp.totalNums/resp.pageSize) || 1
			})
    },
    getAreaArr (arr) {
      this.areaArr = arr
		},
		goDetail (id) {
			this.$router.push({ path: 'service-details', query: { gid: id }})
		},
		openConfirm() {
	    this.$confirm('该账户没有查看该商品详情的权限!', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    }).catch(() => {       
	    });
	  }
	},
	created () {
		this.getGoodsCategoryOne()
	}
}
</script>

<style lang="less">	
.service {
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
		// height: 470px;
		float: left;
		margin-right: 20px;
		margin-bottom: 20px;
		border: 1px solid #ededed;
		cursor:pointer;
		space-around: 10px;
		.info-top {
			width: 296px;
			margin: 1px auto;
			height: 298px;
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
					/*color: #FE0136;*/
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
				height: 25px;
				line-height: 25px;
				font-weight: 700;
    		color: #ff343d;
				display: -webkit-box;
				padding-bottom: 10px;
			}
			.member-image {
				width: 60px;
				height: 18px;
			}
			.footer-btn-div {
				color: #A0A0A0;
				font-size: 12px;
				padding-top: 20px;
				float: right;
			}
		}
	}
	.card-info:hover {
		border: 1px solid #4173f9;
	}
}
</style>
