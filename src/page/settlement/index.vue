<template>
    <!-- 收益管理 -->
	<div class="settlement">
		<div class="nub-top" style="height: 40px;">
			<div class="left-div">
				<h2>结算管理</h2>
			</div>
			<div class="right-div">
				<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="openConfirm()" v-has="'apply-settlement'">结算申请</el-button>
			</div>
		</div>
		<div class="settlement-card">
			<el-row>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="box-div">
						<div class="box-top">
							<div class="top-icon">
								<img src="../../assets/images/home-icon1.png" />
							</div>
							<p>预计结算</p>
						</div>
						<div class="box-cont">
							<div class="left">
								<span>总收入</span>
								<p class="box-num">￥ {{info.preSettle.income}}</p>
							</div>
							<div class="right">
								<span>总支出</span>
								<p class="box-num font_large">{{info.preSettle.expenditure}}</p>
							</div>	
						</div>
					</div>
					<div class="back-card">
						<span class="footer-name">{{info.preSettle.balance >= 0 ? '总收益' : '总支出'}} </span> 
						<p class="footer-num">￥ {{info.preSettle.balance >= 0 ? info.preSettle.balance : -info.preSettle.balance}}</p>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="box-div">
						<div class="box-top">
							<div class="top-icon">
								<img src="../../assets/images/home-icon2.png" />
							</div>
							<p>未结算汇总</p>
						</div>
						<div class="box-cont">
							<div class="left">
								<span>总收入</span>
								<p class="box-num">￥ {{info.unSettled.income}}</p>
							</div>
							<div class="right">
								<span>总支出</span>
								<p class="box-num font_large">{{info.unSettled.expenditure}}</p>
							</div>	
						</div>
					</div>
					<div class="back-card">
						<span class="footer-name">{{info.unSettled.balance >= 0 ? '总收益' : '总支出'}} </span> 
						<p class="footer-num">￥ {{info.unSettled.balance >= 0 ? info.unSettled.balance : -info.unSettled.balance}}</p>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="box-div">
						<div class="box-top">
							<div class="top-icon">
								<img src="../../assets/images/home-icon3.png" />
							</div>
							<p>结算中总计</p>
						</div>
						<div class="box-cont">
							<div class="left">
								<span>总收入</span>
								<p class="box-num">￥ {{info.inSettlement.income}}</p>
							</div>
							<div class="right">
								<span>总支出</span>
								<p class="box-num font_large">{{info.inSettlement.expenditure}}</p>
							</div>	
						</div>
					</div>
					<div class="back-card">
						<span class="footer-name">{{info.inSettlement.balance >= 0 ? '总收益' : '总支出'}} </span> 
						<p class="footer-num">￥ {{info.inSettlement.balance >= 0 ? info.inSettlement.balance : -info.inSettlement.balance}}</p>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="box-div">
						<div class="box-top">
							<div class="top-icon">
								<img src="../../assets/images/home-icon4.png" />
							</div>
							<p>已结算总计</p>
						</div>
						<div class="box-cont">
							<div class="left">
								<span>总收入</span>
								<p class="box-num">￥ {{info.alreadySettled.income}}</p>
							</div>
							<div class="right">
								<span>总支出</span>
								<p class="box-num font_large">{{info.alreadySettled.expenditure}}</p>
							</div>	
						</div>
					</div>
					<div class="back-card">
						<span class="footer-name">{{info.alreadySettled.balance >= 0 ? '总收益' : '总支出'}} </span> 
						<p class="footer-num">￥ {{info.alreadySettled.balance >= 0 ? info.alreadySettled.balance : -info.alreadySettled.balance}}</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
					<el-col :span="8">
						<el-form-item label="结算状态 : " style="padding-left: 10px;">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="0" label="预计结算" :value="0"></el-option>
								<el-option :key="1" label="未结算" :value="1"></el-option>
								<el-option :key="2" label="结算中" :value="2"></el-option>
								<el-option :key="3" label="已结算" :value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
			    </el-row>
			</el-form>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="settlementData" style="width: 100%">
					<el-table-column prop="orderSn" label="订单号" min-width="170"></el-table-column>
					<el-table-column prop="userMobile" label="手机号码" min-width="120"></el-table-column>
					<el-table-column prop="actualPrice" label="订单应付总金额" min-width="120"></el-table-column>
					<el-table-column prop="orderType" label="订单类型" min-width="80">
						<template slot-scope="scope">
							<el-tag
								size="mini"
								disable-transitions>{{ scope.row.orderType | filterType}}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="income" label="总收入" min-width="80"></el-table-column>
					<el-table-column prop="expenditure" label="总支出" min-width="80"></el-table-column>
					<el-table-column label="创建时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="50" fixed="right">
	                    <template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="详情" v-has="'settlement-detail'" placement="top">
								<el-button
								size="mini"
								type="primary"
								icon="el-icon-document"
								plain
								@click="goDetail(scope.row.orderSn)"></el-button>
							</el-tooltip>
	                    </template>
	                </el-table-column>
				</el-table>
			</div>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page="curPage"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="pageSize"
				layout="sizes, prev, slot, next"
                prev-text="上一页"
				next-text="下一页"
				:total="totalNums"
				class="flex_center">
                <span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
		<!--<el-dialog title="行业平台发起结算申请" :visible.sync="settlementVisible" width="460px">-->
			<!--<el-card class="box-card">-->
            <!--<div slot="header" class="clearfix">
                <span>收益信息</span>
            </div>-->
            <!--<el-row class="income-cont">
                <el-col :span="24"><span>结算单号：</span>{{info.settleNo}}</el-col>
                <el-col :span="24"><span>收入：</span>{{info.incomeTotal}}</el-col>
                <el-col :span="24"><span>支出：</span>{{info.expendTotal}}</el-col>
                <el-col :span="24"><span>平台与之对应的结算单号：</span>{{info.toSettleNo}}</el-col>
                <el-col :span="24"><span>结算时间：</span>{{info.endTime |formatDate}}</el-col>
                <el-col :span="24"><span>状态：</span>{{info.status}}</el-col>
            </el-row>-->
          <!-- </el-card>-->
			<!--<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeReturnDeadline">确 认</el-button>
				<el-button @click="settlementVisible = false">取 消</el-button>	
			</span>
		</el-dialog>-->
	</div>
</template>

<script>
import cArea from '@/components/base/cArea'
export default {
	data () {
		return {
			info: {
				preSettle: {},
                unSettled: {},
                inSettlement: {},
                alreadySettled: {}   
            },
            settlementVisible: false,
			settlementData: [],
			status: 0,
			settleNo: [],
			incomeTotal: [],
			expendTotal: [],
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			search: {
                status: 0
			},
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.viewRecord()
			vm.overview()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.status = 0
			vm.search = {
				status: 0
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.viewRecord()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				status: vm.status
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.viewRecord()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.viewRecord()
		},
		handleCurrent (currentVal) {
			let vm = this
			vm.curPage = currentVal
			this.viewRecord()
		},
		viewRecord () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.settlement.viewRecord, param).then(resp => {
				vm.settlementData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
        },
        overview () {
        	let vm = this
        	let param = {
        		accountId: localStorage['userId'+sessionStorage['roleTypeId']],
        	}
        	vm.$get(vm.$api.settlement.overview, param).then(resp => {
				vm.info = resp
			})
        },
		goDetail (id) {
			this.$router.push({ path: 'settlement-detail', query: { orderSn: id }})
		},
		applySettle (){
        	let vm = this 
        	let param = {
        	 	accountId: localStorage['userId' + sessionStorage['roleTypeId']]
            }
            vm.$post(vm.$api.settlement.applySettle, param).then(resp => {
				vm.info = resp
            });
        },
		openConfirm() {
	        this.$confirm('每个月的最后一天方可进行结算', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '申请结算成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消结算'
	          });          
	        });
	    }
	},
	filters: {
		filterType (val) {
			switch (val) {
				case 1:
					return '线下门店'
				case 2:
					return '实物商品'
				case 3:
					return '共享服务'
				case 4:
					return '点餐'
				case 5:
					return '酒店'
				case 6:
					return '门票'
				case 7:
					return '游戏 '
				case 8:
					return '手机充值 '
				case 9:
					return '电影票 '
				case 10:
					return '演出票 '
				case 11:
					return '加油卡 '
				case 12:
					return '收钱吧 '
				case 13:
					return '线下餐饮 '
				case 14:
					return '即时消费 '
				case 15:
					return '线上点餐'
				default:
					return '/'
			}
		}
	}
}
</script>

<style lang="less">	
.settlement {
    .nub {
        font-size: 16px;
        padding-top: 10px;
        display: block;
        color: rgba(0,0,0,.65);
    }
    .left-div {
    	float: left;
    	display: block;
    }
    .settlement-card {
    	margin-left: 20px;
    	.card-box {
    		padding-right: 20px;
    		margin-top: 20px;
    		.box-div {
    			background: #fff;
    			height: 135px;
    			.box-top {
    				padding: 20px;
    			}
    			.top-icon {
    				width: 24px;
    				height: 24px;
    				float: left;
					margin-right: 15px;
					background-size: cover;
    				img {
    					width: 24px;
    					height: 24px;
    				}
    			}
    			.box-cont {
    				font-size: 14px;
    				color: rgba(0,0,0,0.45);
    				padding-left: 30px;
    				padding-right: 30px;
    				.left {
    					float: left;
    				}
    				.box-num {
    					font-size: 24px;
    					color: #000;
    				}
    				.font_large {
    					font-size: 16px;
    					padding-top: 10px;
    				}
    				.right {
    					float: right;
    				}
    			}
    		}
    		.back-card {
    			height: 40px;
    			line-height: 40px;
    			color: #565657;
    			padding-left: 25px;
    			background: rgba(247,249,250,1);
    			border-top: 2px solid #F0F2F5;
    			.footer-name {
    				float: left;
    			}
    			.footer-num {
    				float: left;
    				display: block;
    				padding-left: 10px;
    			}
    		}
    	}
    }
    .backg {
    	background-color: #F0F2F5;
    	padding-bottom: 0;
    	margin-bottom: 0;
    }
    .right-div {
		float: right;
		color: rgba(0, 0, 0, 0.45);
		text-align: center;
		padding: 0 20px;
		.num {
			font-size: 32px;
			color: #000;
		}
	}
	.box-card {
        margin: 20px;
        margin-bottom: 0;
    }
    .flex_center {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }
    .border {
		border-top: 2px solid #ebeef5
	}
}
</style>