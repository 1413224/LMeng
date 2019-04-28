<template>
	<!-- 会员管理 -->
	<div class="member">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合搜索条件的会员总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<div class="right-div" style="border: none;">
				<p>符合搜索条件的会员订单总额</p>
				<p class="num">{{ orderMoney }}</p>
			</div>
			<h2>会员管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
						<el-form-item label="注册时间 : " style="padding-left: 10px;">
							<el-date-picker v-model="timeSlot" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="排序类型 : ">
							<el-select v-model="sortType" style="width: 100%;">
								<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<template v-if="enState">
						<el-col :span="8">
							<el-form-item label="排序方式 : ">
								<el-select v-model="sortValue" style="width: 100%;">
									<el-option :value="0" label="倒序"></el-option>
									<el-option :value="1" label="正序"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</template>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
						<el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
						<el-button type="text" v-else @click="enState=!enState" style="margin-bottom: 20px;">收起 <i class="el-icon-arrow-up"></i></el-button>
					</el-col>
				</el-form>
			</el-row>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="memberData" style="width: 100%">
					<el-table-column prop="mobile" label="手机号" min-width="120">
						<template slot-scope="scope">
							<el-popover placement="top-start" trigger="hover">
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
					<el-table-column prop="balance" label="通用积分" min-width="120"></el-table-column>
					<el-table-column prop="availablePoints" label="信用积分" min-width="120"></el-table-column>
					<el-table-column prop="orderNums" label="订单数目" min-width="100"></el-table-column>
					<el-table-column prop="totalOrder" label="订单金额" min-width="120"></el-table-column>
					<el-table-column prop="totalOrder" label="中奖信息" min-width="100">
						<template slot-scope="scope">
							<el-popover placement="top-start" trigger="hover">
								<div style="line-height: 30px;">
									<p>中奖金额:
										<span>{{scope.row.lotteryBonus}}</span>
									</p>
									<p>中奖次数:
										<span>{{scope.row.lotteryNums}}</span>
									</p>
								</div>
								<div slot="reference">{{scope.row.lotteryBonus}}</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="注册时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column label="最后消费时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.lastBuyTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column label="状态" min-width="60" fixed="right">
						<template slot-scope="scope">
							<el-tag size="mini" :type="scope.row.isBlack ? 'danger' : 'success'" disable-transitions>{{scope.row.isBlack ? '禁用' : '可用'}}</el-tag>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination ref="paging" @size-change="handleSize" @current-change="handleCurrent" :current-page.sync="curPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页" :total="totalNums" class="flex_center">
				<span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			memberData: [],
			timeSlot: [],
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			pickerOptions: {
				shortcuts: [{
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
			search: {
				startTime: '',
				endTime: '',
				sortType: 1,
				sortValue: 0
			},
			sortType: 1,
			sortValue: 0,
			typeOptions: [{
					value: 1,
					label: '注册时间'
				},
				{
					value: 2,
					label: '通用积分'
				},
				{
					value: 3,
					label: '信用积分'
				},
				{
					value: 4,
					label: '订单数目'
				},
				{
					value: 5,
					label: '订单金额'
				},
				{
					value: 6,
					label: '中奖金额'
				},
				{
					value: 7,
					label: '中奖次数'
				},
				{
					value: 8,
					label: '消费时间'
				}
			],
			enState: false,
			orderMoney: 0
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.getMemberList()
		})
	},
	methods: {
		resetting() {
			let vm = this
			vm.timeSlot = []
			vm.sortType = 1
			vm.sortValue = 0
			vm.search = {
				startTime: '',
				endTime: '',
				sortType: 1,
				sortValue: 0
			}
			vm.curPage = 1
			vm.$refs.paging.lastEmittedPage = 1
			vm.getMemberList()
		},
		onSearch() {
			let vm = this
			vm.search = {
				// 进行搜索条件缓存
				startTime: parseInt(Date.parse(vm.timeSlot[0]) / 1000) || '',
				endTime: parseInt(Date.parse(vm.timeSlot[1]) / 1000) + 86399 || '',
				sortType: vm.sortType,
				sortValue: vm.sortValue
			}
			vm.curPage = 1
			vm.$refs.paging.lastEmittedPage = 1
			vm.getMemberList()
		},
		handleSize(sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
			this.$refs.paging.lastEmittedPage = 1
			this.getMemberList()
		},
		handleCurrent(currentVal) {
			this.curPage = currentVal
			this.getMemberList()
		},
		getMemberList() {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.member.getMemberList, param).then(resp => {
				vm.memberData = resp.pageBean.list
				vm.totalNums = resp.pageBean.totalNums
				vm.pages = resp.pageBean.pages || 1
				vm.orderMoney = resp.orderMoney
			})
		}
	}
}
</script>

<style lang="less">
.member {
	.nub-top {
		background-color: #fff;
		padding: 10px 30px 20px;
	}
	.nub {
		font-size: 16px;
		padding-top: 10px;
		display: block;
		color: rgba(0, 0, 0, .65);
	}
	.box-card {
		margin: 20px;
		.el-form-item__content {
			line-height: 39px;
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
	.border {
		border-top: 2px solid #ebeef5;
	}
}
</style>