<template>
    <!-- 收银员管理 -->
	<div class="member">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合搜索条件的收银员总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>收银员管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="16" :xl="8">
						<el-form-item label="时间筛选 : " style="padding-left:10px;">
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
					<el-col :span="8" style="width: 300px;">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<div style="padding: 10px">
                <el-alert 
                    title="时间筛选为收银员该时间内新注册会员数，订单总数及订单总额"
                    type="info"
                    show-icon>
                </el-alert>
            </div>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="memberData" style="width: 100%">
					<el-table-column prop="name" label="收银员"></el-table-column>
					<el-table-column prop="gender" label="性别">
						<template slot-scope="scope">
							<span>{{!scope.row.gender ? '未知' : scope.row.gender == 1 ? '男' : '女' }}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<el-tag
							:type="scope.row.status ? 'success' : 'danger'"
							disable-transitions>{{scope.row.status ? '可用' : '禁用'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="memberNums" label="会员数"></el-table-column>
					<el-table-column prop="orderNums" label="订单总数"></el-table-column>
					<el-table-column prop="totalOrder" label="订单总额"></el-table-column>
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
export default {
	data () {
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
			search: {
				startTime: '',
                endTime: ''
			}
		}
	},
	components:{
		
	},
	methods: {
		resetting () {
			let vm = this
			vm.timeSlot = []
			vm.search = {
				startTime: '',
				endTime: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getEmployeeList()
		},
		onSearch () {
			let vm = this
			try {
				vm.search = { // 进行搜索条件缓存
					startTime: parseInt(Date.parse(vm.timeSlot[0])/1000) || '',
					endTime: parseInt(Date.parse(vm.timeSlot[1])/1000) + 86399 || ''
				}
			} catch (error) {
				vm.search = {
					startTime: '',
					endTime: ''
				}
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getEmployeeList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getEmployeeList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getEmployeeList()
		},
		getEmployeeList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				type: 0,
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.pos.getEmployeeList, param).then(resp => {
				vm.memberData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
		}
	},
	created () {
		this.getEmployeeList()
	}
}
</script>

<style lang="less">	
.member {
	// .nub {
	// 	font-size: 16px;
	// 	padding-top: 10px;
	// 	display: block;
	// 	color: rgba(0,0,0,.65);
	// }
	.box-card {
		margin: 20px;
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.el-alert--info {
        color: #909399;
        background-color: rgb(239, 242, 255);
	}
	.el-alert__icon {
		color: #4B74FF;
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
