<template>
    <!-- 待审核管理 -->
	<div class="income">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>会员通用卡变更日志总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>会员通用卡变更日志</h2>
		</div>
        <el-card class="box-card">
        	<el-row :gutter="40">
				<el-form label-width="100px" label-position="left">
					<el-col :span="8">
						<el-form-item label="变更时间 : " style="padding-left: 10px;">
			              <el-date-picker
			                v-model="timeSlot"
			                type="datetimerange"
			                :picker-options="pickerOptions"
			                range-separator="至"
			                start-placeholder="开始日期"
			                end-placeholder="结束日期"
			                :default-time="['00:00:00', '23:59:59']"
			                style="width: 100%;">
			              </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号: ">
							<el-input v-model="mobile" placeholder="请输入完整的手机号"></el-input>
						</el-form-item>
					</el-col>
			        <template v-if="enState">
			        	<el-col :span="8">
			              <el-form-item label="变更类型 : ">
			                <el-select v-model="type" style="width: 100%;">
			                  <el-option :value="0" label="全部"></el-option>
			                  <el-option :value="1" label="消费 "></el-option>
			                  <el-option :value="2" label="用户充值"></el-option>
			                  <el-option :value="3" label="后台充值"></el-option>
			                  <el-option :value="10" label="取消退还"></el-option>
			                  <el-option :value="12" label="推荐奖励"></el-option>
			                </el-select>
			              </el-form-item>
			            </el-col>
			        	<el-col :span="8">
							<el-form-item label="企业通用卡: " style="padding-left: 10px;">
								<el-select v-model="cardId" clearable placeholder="请选择" style="width: 100%;">
									<el-option
									  v-for="item in cardOptions"
									  :key="item.cardId"
									  :label="item.name"
									  :value="item.cardId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
			        </template>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
						<!-- <el-button @click="resetting">导出</el-button> -->
			            <el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
			            <el-button type="text" v-else  @click="enState=!enState" style="margin-bottom: 20px;">收起 <i class="el-icon-arrow-up"></i></el-button>
					</el-col>
				</el-form>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div class="data-header">
				数据汇总
			</div>
			<div class="">
				<!-- <div class="data-div">
					<p class="data-title">累计金额(元)</p>
					<span class="data-item" v-if="info.totalBalance">{{info.totalBalance}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div> -->
				<div class="data-div" v-if="type == 0 || type == 2 || type == 3">
					<p class="data-title">累计充值(元)</p>
					<span class="data-item" v-if="info.totalRecharge">{{info.totalRecharge}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div>
				<div class="data-div" v-if="type == 0 || type == 2 || type == 3">
					<p class="data-title">累计赠送(元)</p>
					<span class="data-item" v-if="info.totalRechargeBonus">{{info.totalRechargeBonus}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div>
				<div class="data-div" v-if="type == 0 || type == 2 || type == 3 || type == 12">
					<p class="data-title">累计推荐奖励(元)</p>
					<span class="data-item" v-if="info.totalRecommendBonus">{{info.totalRecommendBonus}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div>
				<div class="data-div" v-if="type == 0 || type == 1">
					<p class="data-title">累计消费(元)</p>
					<span class="data-item" v-if="info.totalConsume">{{info.totalConsume}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div>
				<div class="data-div" v-if="type == 0 || type == 10">
					<p class="data-title">累计退还(元)</p>
					<span class="data-item" v-if="info.totaRestitution">{{info.totaRestitution}}</span>
					<span v-else style="color: #ccc">未设置</span>
				</div>
			</div>
		</el-card>
			<!-- 表格数据 -->
		<el-card class="box-card">
			<el-table :data="cardBalanceLog" @selection-change="handleSelectionChange" style="width: 100%">
				<el-table-column prop="name" label="企业通用卡" min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}({{scope.row.cardNo}})</span>
                    </template>
                </el-table-column>
				<el-table-column prop="mobile" label="会员信息" min-width="120">
                    <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            trigger="hover">
                            <div style="line-height: 30px;">
                                <p>会员昵称: 
                                    <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                    <span v-else style="color: #ccc">未设置</span>
                                </p>
                                <p>会员姓名: 
                                    <span v-if="scope.row.realname">{{scope.row.realname}}</span>
                                    <span v-else style="color: #ccc">未设置</span>
                                </p>
                            </div>
                            <div slot="reference">
                                <img v-if="scope.row.thumb && scope.row.thumb.original" :src="scope.row.thumb.original" alt="" class="image">
                                <span style="vertical-align: middle; display: inline-block; line-height: 50px;">{{scope.row.mobile}}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
				<el-table-column label="余额方向" min-width="100">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.directType == 1" type="danger">增加余额</el-tag>
                        <el-tag size="mini" v-else type="success">减少余额</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="beforeBalance" label="变更前余额" min-width="100"></el-table-column>
				<el-table-column prop="balance" label="变更余额" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.directType == 1" style="color: #F56C6C; font-weight: 600;">+{{scope.row.balance}}</span>
                        <span v-else style="color: #67C23A;">-{{scope.row.balance}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="giveBalance" label="赠送金额" min-width="100"></el-table-column>
				<el-table-column prop="remainBalance" label="变更后余额" min-width="100"></el-table-column>
				<el-table-column prop="type" label="变更类型" min-width="100">
					<template slot-scope="scope">
                        <el-tag size="mini" type="success">{{scope.row.type |filterType}}</el-tag>
                    </template>
				</el-table-column>
                <!--<el-table-column prop="status" label="状态" min-width="70">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.status" type="success">可用</el-tag>
                        <el-tag size="mini" v-else type="danger">已冻结</el-tag>
                    </template>
                </el-table-column>-->
                <el-table-column label="变更时间" min-width="110">
                    <template slot-scope="scope">
                        <div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
			</el-table>
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
	</div>
</template>

<script>
export default {
	data () {
		return {
			info: [],
			cardBalanceLog: [],
			cardOptions:[],
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
		    timeSlot: [],
	      	pickerOptions: {
		        shortcuts: [
		          {
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date()
		              const start = new Date()
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
		              picker.$emit('pick', [start, end])
		            }
		          },
		          {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date()
		              const start = new Date()
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
		              picker.$emit('pick', [start, end])
		            }
		          },
		          {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date()
		              const start = new Date()
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
		              picker.$emit('pick', [start, end])
		            }
		          }
		        ]
	        },
		    cardId: '',
			mobile: '',
			type: 0,
		    search: {
		        startTime: '',
		        endTime: '',
		        type: 0,
		        cardId: '',
				mobile: '',
		    },
		    enState: false,
		    orderMoney: 0
	    }
	},
	methods: {
		resetting() {
	      let vm = this
	      vm.timeSlot = []
	      vm.type = 0
	      vm.cardId = ''
		  vm.mobile = ''
	      vm.search = {
	        startTime: '',
	        endTime: '',
	        type: 0,
	        cardId: '',
			mobile: '',
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getUserCardAlterLog()
	    },
	    onSearch() {
	      let vm = this
	      vm.search = {
	        // 进行搜索条件缓存
	        startTime: parseInt(Date.parse(vm.timeSlot[0]) / 1000) || '',
	        endTime: parseInt(Date.parse(vm.timeSlot[1]) / 1000) + 86399 || '',
	        type: vm.type,
	        cardId: vm.cardId,
			mobile: vm.mobile
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getUserCardAlterLog()
	    },
	    handleSize(sizeVal) {
	      this.pageSize = sizeVal
	      this.curPage = 1
	      this.$refs.paging.lastEmittedPage = 1
	      this.getUserCardAlterLog()
	    },
	    handleCurrent(currentVal) {
	      this.curPage = currentVal
	      this.getUserCardAlterLog()
	    },
	    getUserCardAlterLog() {
	      let vm = this
	      let param = Object.assign({}, vm.search, {
	        accountId: localStorage['userId'+sessionStorage['roleTypeId']],
	        curPage: vm.curPage,
	        pageSize: vm.pageSize
	      })
	      vm.$get(vm.$api.card.getUserCardAlterLog, param).then(resp => {
			console.log(resp)
	        vm.cardBalanceLog = resp.pageBean.list
	        vm.info = resp
            vm.totalNums = resp.pageBean.totalNums
            vm.pages = resp.pageBean.pages || 1
	      })
		},
		getEnterpriseCard () {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				infoType: 0,
				curPage: 1,
				pageSize: 1000
			}
			vm.$get(vm.$api.card.getEnterpriseCard, param).then(resp => {
				vm.cardOptions = resp.list
				let temp = {
					name:'全部'
				}
				vm.cardOptions.unshift(temp)
			})
		},
	},
	filters: {
		filterType(val) {
			switch(val) {
				case 1:
					return '消费'
				case 2:
					return '用户充值'
				case 3:
					return '后台充值'
				case 10:
					return '取消退还'
				case 11:
					return '取消退还'
				case 12:
					return '推荐奖励'
				default:
					return '/'
			}
		}
	},
	created () {
		this.getUserCardAlterLog()
		this.getEnterpriseCard()
	}
}
</script>

<style lang="less">	
.income {
    .box-card {
		margin: 20px;
		.el-form-item__content{
			line-height: 39px;
		}
        .image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            display: inline-block;
        }
        .flex_space_between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover {
                cursor: pointer;
                &::after{
                    content: '\E616';
                    font-family: 'element-icons' !important;
                    speak: none;
                    font-style: normal;
                    font-weight: normal;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    vertical-align: baseline;
                    display: inline-block;
                    -webkit-font-smoothing: antialiased;
                }
            }
        }
        .input-edit {
            width: 100%;
            border: 1px solid #4B74FF;
        }
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
	.data-header {
		width: 100%;
		padding-bottom: 20px;
		margin-bottom: 25px;
		border-bottom: 1px solid #eaeaec;
	}
	.data-div {
		width: 23%;
		height: 100px;
		text-align: center;
		background: #e9eff3;
		margin-right: 20px;
		margin-bottom: 20px;
		float: left;
		.data-title {
			padding-top: 20px;
			padding-bottom: 20px;
		}
	}
}
</style>
