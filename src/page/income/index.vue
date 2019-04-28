<template>
    <!-- 收益管理 -->
	<div class="income">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的收益总数</p>
				<p class="num">{{ totalCharges }}</p>
			</div>
			<h2>收益管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
					<el-col :span="8">
						<el-form-item label="收益时间 : " style="padding-left:10px;">
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
						<el-form-item label="消费来源 : ">
							<el-select v-model="sourceType" clearable placeholder="全部" style="width: 100%;">
								<el-option label="本店消费" :value="1"></el-option>
								<el-option label="他店消费" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
                    <template v-if="enState">
						<el-col :span="8">
							<el-form-item label="所属区域 : ">
								<c-area @getAreaArr="getAreaArr" :empty="empty"></c-area>
							</el-form-item>
						</el-col>
                        <el-col :span="24"></el-col>
                        <el-col :span="8">
                            <el-form-item label="收益区间 : " style="padding-left:10px;">
								<div class="input-half">
                                    <el-col :span="11">
                                		<el-input v-model="minCharges" placeholder="最小" @keyup.native="minCharges=formatDouble(minCharges)"></el-input>
                                    </el-col>
                                    <el-col :span="2" style="text-align: center;">-</el-col>
                                    <el-col :span="11">
                                		<el-input v-model="maxCharges" placeholder="最大" @keyup.native="maxCharges=formatDouble(maxCharges)"></el-input>
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
			<div class="border">
				<el-table :data="incomeData" style="width: 100%">
					<el-table-column prop="mobile" label="手机号码" min-width="120">
						<template slot-scope="scope">
							<el-popover
								placement="top-start"
								trigger="hover">
								<div style="line-height: 30px;">
									<p>会员昵称: 
										<span v-if="scope.row.nickName">{{scope.row.nickName}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
									<p>会员姓名: 
										<span v-if="scope.row.realName">{{scope.row.realName}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
								</div>
								<div slot="reference">{{scope.row.mobile}}</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="消费区域" min-width="120">
						<template slot-scope="scope">
							<el-popover
								placement="top-start"
								trigger="hover">
								<p>消费区域: 
									{{scope.row.countryName}}/{{scope.row.provinceName}}/{{scope.row.cityName}}/{{scope.row.areaName}}
								</p>
								<div slot="reference">
									<span style="white-space: nowrap;">
										{{scope.row.countryName}}/{{scope.row.provinceName}}<br/>{{scope.row.cityName}}/{{scope.row.areaName}}
									</span>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="shopName" label="消费企业" min-width="120"></el-table-column>
					<el-table-column label="消费来源" min-width="80">
						<template slot-scope="scope">
							<el-tag
								size="mini"
								:type="scope.row.sourceType==1 ? '' : 'warning'"
								disable-transitions>{{scope.row.sourceType==1 ? '本店' : '他店'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="消费时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="orderMoney" label="消费金额" min-width="100"></el-table-column>
					<el-table-column prop="charges" label="收益" min-width="80">
						<template slot-scope="scope">
							<span style="color: #F56C6C; font-weight: 600;">{{scope.row.charges}}</span>
						</template>
					</el-table-column>
					<el-table-column label="收益时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.profitTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="50" fixed="right">
						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="详情" v-has="'income-detail'" placement="top">
								<el-button
								size="mini"
								type="primary"
								icon="el-icon-document"
								plain
								@click="goDetail(scope.row.profitId)"></el-button>
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
			incomeData: [],
            timeSlot: [],
            areaArr: [],
            sourceType: '',
            minCharges: '',
            maxCharges: '',
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
				startTime: '',
                endTime: '',
                areaParentIds: '',
				sourceType: '',
				minCharges: '',
				maxCharges: '',
			},
			totalCharges: 0,
			totalProfit: 0
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getList()
        })
    },
	components:{
		cArea
	},
	methods: {
		resetting () {
			let vm = this
			vm.timeSlot = []
			vm.empty = !vm.empty
			vm.areaArr = []
			vm.sourceType = ''
			vm.minCharges = ''
			vm.maxCharges = ''
			vm.search = {
				startTime: '',
                endTime: '',
                areaParentIds: '',
				sourceType: '',
				minCharges: '',
				maxCharges: '',
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getList()
		},
		onSearch () {
			let vm = this
			vm.timeSlot = vm.timeSlot || [] // 给默认值，当清空数据是计算不会出错
			vm.search = { // 进行搜索条件缓存
				startTime: Date.parse(vm.timeSlot[0]) || '',
                endTime: Date.parse(vm.timeSlot[1]) + 86399000 || '',
                areaParentIds: vm.areaArr.join(','),
				sourceType: vm.sourceType,
				minCharges: vm.minCharges,
				maxCharges: vm.maxCharges,
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getList()
		},
		handleCurrent (currentVal) {
			let vm = this
			let pageType = vm.curPage < currentVal ? 1 : 2
			let lastProfitTime = ''
			try {
				lastProfitTime = vm.curPage < currentVal ? vm.incomeData[vm.incomeData.length - 1].profitTime : vm.incomeData[0].profitTime
			} catch (err) {
				lastProfitTime = ''
			}
			vm.getList(lastProfitTime, pageType)
			vm.curPage = currentVal
		},
		getList (lastProfitTime='', pageType=1) {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				lastProfitTime: lastProfitTime,
				pageType: pageType,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.income.getList, param).then(resp => {
				vm.incomeData = resp.lists
				vm.totalNums = resp.totalNums
				vm.pages = Math.ceil(resp.totalNums/resp.pageSize) || 1
				vm.totalCharges = resp.totalCharges
				vm.totalProfit = resp.totalProfit
			})
        },
        getAreaArr (arr) {
			console.log(arr)
            this.areaArr = arr
		},
		goDetail (id) {
			this.$router.push({ path: 'income-detail', query: { pid: id }})
		}
	}
}
</script>

<style lang="less">	
.income {
	.nub-top {
		height: 50px;
		.top-left {
			float: left;
		}
		.top-right {
			width: 400px;
			float: right;
			color: rgba(0, 0, 0, 0.45);
			text-align: center;
			.num {
	            font-size: 16px;
	            color: #000;
	            padding-top: 10px;
	        }
		}
	}
    .nub {
        font-size: 16px;
        padding-top: 10px;
        display: block;
        color: rgba(0,0,0,.65);
    }
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
	.input-half {
        div {
            padding: 0!important;
            margin: 0;
        }
	}
}
</style>
