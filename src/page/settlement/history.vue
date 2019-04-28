<template>
    <div class="income">
		<!-- <div class="nub-top">
			<h2>历史结算</h2>
		</div> -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的历史结算总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>历史结算</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
					<el-col :span="8">
						<el-form-item label="结算时间 : " style="padding-left:10px;">
							<el-date-picker
								v-model="timeSlot"
								type="daterange"
								align="right"
								unlink-panels
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								:picker-options="pickerOptions"
								style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="状态 : " style="padding-left: 10px;">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="-1" label="全部" :value="-1"></el-option>
								<el-option :key="0" label="待确认" :value="0"></el-option>
								<el-option :key="10" label="企业已确认" :value="10"></el-option>
								<el-option :key="20" label="待处理" :value="20"></el-option>
								<el-option :key="30" label="处理中" :value="30"></el-option>
								<el-option :key="40" label="待划款" :value="40"></el-option>
								<el-option :key="50" label="企业已划款" :value="50"></el-option>
								<el-option :key="60" label="结算成功" :value="60"></el-option>
								<el-option :key="70" label="结算失败" :value="70"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
                    <template v-if="enState">
                    </template>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
                        <!--<el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
                        <el-button type="text" v-else  @click="enState=!enState">收起 <i class="el-icon-arrow-up"></i></el-button>-->
					</el-col>
			    </el-row>
			</el-form>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="historyData" style="width: 100%">
					<el-table-column prop="settleNo" label="结算单号" min-width="120"></el-table-column>
					<el-table-column prop="incomeTotal" label="收入" min-width="120"></el-table-column>
					<el-table-column prop="expendTotal" label="支出" min-width="80"></el-table-column>
					<el-table-column prop="status" label="状态" min-width="80">
						<template slot-scope="scope">
							<el-tag
							size="mini"
							disable-transitions>{{ scope.row.status | filterStatus}}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="toSettleNo" label="平台结算单号" min-width="80"></el-table-column>
					<el-table-column label="结算时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.endTime | formatDate}}</div>
						</template>
					</el-table-column>
					<!--<el-table-column label="操作" min-width="80">
	                    <template slot-scope="scope">
	                        <el-button
	                        size="mini"
	                        type="primary"
	                        @click="goDetail(scope.row.profitId)">详情</el-button>
	                    </template>
	                </el-table-column>-->
				</el-table>
			</div>
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
import cArea from '@/components/base/cArea'
export default {
	data () {
		return {
			status: -1,
			historyData: [],
            timeSlot: [],
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
					}
				}]
            },
			enState: false,
			empty: false,
			search: {
				status: -1,
				startTime: '',
                endTime: ''
			},
		}
	},
	components:{
		cArea
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getMyRecord()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.timeSlot = []
			vm.status = -1
			vm.search = {
				startTime: '',
                endTime: '',
                status: -1
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getMyRecord()
		},
		onSearch () {
			let vm = this
			vm.timeSlot = vm.timeSlot || [] // 给默认值，当清空数据是计算不会出错
			vm.search = { // 进行搜索条件缓存
				startTime: parseInt(Date.parse(vm.timeSlot[0])/1000) || '',
                endTime: parseInt(Date.parse(vm.timeSlot[1])/1000) + 86399 || '',
                status: vm.status
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getMyRecord()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getMyRecord()
		},
		handleCurrent (currentVal) {
			let vm = this
			vm.curPage = currentVal
			this.getMyRecord()
		},
		getMyRecord () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.settlement.getMyRecord, param).then(resp => {
				vm.historyData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
		}
	},
	filters: {
		filterStatus (val) {
			switch (val) {
				case 0:
					return '待确认'
				case 1:
					return '企业已确认'
				case 2:
					return '待处理'
				case 3:
					return '处理中'
				case 4:
					return '待划款'
				case 5:
					return '企业已划款'
				case 6:
					return '结算成功'
				case 7:
					return '结算失败'
				default:
					return '/'
			}
		}
	}
}
</script>

<style lang="less">	
.income {
    // .nub {
    //     font-size: 16px;
    //     padding-top: 10px;
    //     display: block;
    //     color: rgba(0,0,0,.65);
    // }
    .box-card {
        margin: 20px;
    }
    .flex_center {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }
    .top-row {
        padding: 20px;
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        .num {
            font-size: 32px;
            color: #000;
		}
		.corr-p {
			padding-left: 20px;
			i {
				color: #409EFF;
				top: -3px;
    			position: relative;
			}
		}
    }
    .border {
		border-top: 2px solid #ebeef5
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
}
</style>