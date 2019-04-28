<template>
    <!-- 反馈中心 -->
	<div class="feedback">
		<!-- <div class="nub-top">
			<h2>反馈中心</h2>
		</div> -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的反馈信息总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>反馈中心</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="50px" label-position="left">
					<el-col :span="8">
						<el-form-item label="状态 : " style="padding-left: 10px;">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="-1" label="全部" :value="-1"></el-option>
								<el-option :key="0" label="未查看" :value="0"></el-option>
								<el-option :key="1" label="已查看" :value="1"></el-option>
                                <el-option :key="2" label="已处理" :value="2"></el-option>
								<el-option :key="3" label="已关闭" :value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="搜索 : ">
							<el-input v-model="keyword" placeholder="搜索"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<el-row>
				<el-col style="padding: 0 10px 10px;">
					<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="editfeedback()" v-has="'feedback-add'">新增反馈信息</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->
			<el-table :data="feedbackData" style="width: 100%">
				<el-table-column prop="name" label="反馈名称" min-width="120"></el-table-column>
				<el-table-column prop="accountName" label="管理员" min-width="120"></el-table-column>
				<el-table-column prop="status" label="状态" min-width="70">
					<template slot-scope="scope">
						<el-tag
						size="mini"
						:type="scope.row.status | filterType"
						disable-transitions>{{ scope.row.status | filterStatus}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="受理人审核备注" min-width="120"></el-table-column>
				<el-table-column label="创建时间" min-width="110">
					<template slot-scope="scope">
						<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
					</template>
                </el-table-column>
				<el-table-column label="操作" min-width="90" fixed="right">
                    <template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="详情" v-has="'feedback-detail'" placement="top">
							<el-button
							size="mini"
							type="primary"
							icon="el-icon-document"
							plain
							@click="goDetail(scope.row.feedbackId)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" v-has="'del-feedback'" placement="top">
							<el-button
								size="mini"
								type="danger"
								icon="el-icon-delete"
								plain
								@click="openConfirm(scope.row.feedbackId)"></el-button>
						</el-tooltip>
					</template>
                </el-table-column>
			</el-table>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page.sync="curPage"
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
			status: -1,
			keyword: '',
			feedbackData: [],
			curPage: 1,
			pages: 1,
			pageSize: 10,
			totalNums: 0,
			name: '',
			accountName: '',
			remark: '',
			createTime: '',
			search: {
				status: -1,
				keyword: ''
			}
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getList()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.status = -1
			vm.keyword = ''
			vm.search = {
				status: -1,
				keyword: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getList()
		},
		delAccount (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                childAccountId: id,
            }
            vm.$post(vm.$api.power.delAccount, param).then(resp => {
                vm.getMyChildren()
                this.$message({
					type: 'success',
					message: '删除成功!'
				})
            })
      },
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				status: vm.status,
				keyword: vm.keyword
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
			this.curPage = currentVal
			this.getList()
		},
		editfeedback (id) {
			this.$router.push({ path: 'edit-feedback', query: { aid: id }})
			this.$router.push({ path: 'feedback-add', query: { aid: id }})
	 	},
		getList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.feedback.getList, param).then(resp => {
				vm.feedbackData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
		},
		delFeedbackById (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                feedbackId: id,
            }
            vm.$post(vm.$api.feedback.delFeedbackById, param).then(resp => {
                vm.getList()
                this.$message({
					type: 'success',
					message: '删除成功!'
				})
            })
        },
        goDetail (id) {
			this.$router.push({ path: 'feedback-detail', query: { fid: id }})
		},
		openConfirm(id) {
			this.$confirm('此操作将永久删除该反馈信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delFeedbackById(id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
	},
	filters: {
		filterType (val) {
			switch (val) {
				case 0:
					return ''
				case 1:
					return 'success'
				case 2:
					return 'info'
				case 3:
					return 'danger'
				default:
					return ''
			}
		},
		filterStatus (val) {
			switch (val) {
				case 0:
					return '未查看'
				case 1:
					return '已查看'
				case 2:
					return '已处理'
				case 3:
					return '已关闭'
				default:
					return '/'
				}
		}
	}
}
	
</script>

<style lang="less">	
.feedback {
	.form-flex {
		display: flex;
		justify-content: flex-end;
		padding-top: 10px;
	}
	.box-card {
		margin: 20px;
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
}
</style>
