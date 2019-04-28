<template>
    <!-- 权限管理 -->
	<div class="power">
		<!-- <div class="nub-top">
			<h2>操作员管理</h2>
		</div> -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的操作员总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>操作员管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="50px" label-position="left">
					<el-col :span="8">
						<el-form-item label="状态 : " style="padding-left: 10px;">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="2" label="全部" :value="2"></el-option>
								<el-option :key="1" label="可用" :value="1"></el-option>
								<el-option :key="0" label="禁用" :value="0"></el-option>
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
					<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="editPower()" v-has="'@edit-power'">新增操作员</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="powerData" style="width: 100%">
					<el-table-column prop="account" label="账户名" min-width="120"></el-table-column>
					<el-table-column prop="createAccount" label="创建人" min-width="120"></el-table-column>
					<el-table-column prop="mobile" label="手机号码" min-width="120"></el-table-column>
					<el-table-column prop="status" label="状态" min-width="60">
						<template slot-scope="scope">
							<el-tag
							size="mini"
							:type="scope.row.status ? 'success' : 'danger'"
							disable-transitions>{{scope.row.status ? '可用' : '禁用'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="最后登录时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.lastTime | formatDate}}</div>
						</template>
	                </el-table-column>
					<el-table-column label="最后登录IP" min-width="120">
						<template slot-scope="scope">
	                        <span v-if="scope.row.lastIp">{{scope.row.lastIp}}</span>
	                        <span v-else>/</span>
	                    </template>
					</el-table-column>
					<el-table-column label="注册时间" width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
	                </el-table-column>
					<el-table-column label="操作" min-width="90" fixed="right">
	                    <template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="编辑" v-has="'edit-power'" placement="top">
								<el-button
								size="mini"
								type="primary"
								icon="el-icon-edit-outline"
								plain
								@click="editPower(scope.row.accountId)"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" v-has="'del-power'" placement="top">
								<el-button
								size="mini"
								type="danger"
								icon="el-icon-delete"
								plain
								@click="openConfirm(scope.row.accountId)"></el-button>
							</el-tooltip>
	                    </template>
	                </el-table-column>
				</el-table>
			</div>
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
			status: 2,
			keyword: '',
			powerData: [],
			curPage: 1,
			pages: 1,
			pageSize: 10,
			totalNums: 1,
			search: {
				status: 2,
				keyword: ''
			}
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getMyChildren()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.status = 2
			vm.keyword = ''
			vm.search = {
				status: 2,
				keyword: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getMyChildren()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				status: vm.status,
				keyword: vm.keyword
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getMyChildren()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getMyChildren()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getMyChildren()
		},
		getMyChildren () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize,
			})
			vm.$get(vm.$api.power.getMyChildren, param).then(resp => {
				vm.powerData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
		},
		editPower (id) {
			this.$router.push({ path: 'edit-power', query: { aid: id }})
		},
		delAccount (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                childAccountId: id,
            }
            vm.$post(vm.$api.power.delAccount, param).then(resp => {
                vm.getMyChildren()
                vm.$message({
					type: 'success',
					message: '成功删除'
				})
            })
        },
		openConfirm(id) {
			this.$confirm('是否删除该操作员？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delAccount(id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
	}
}
</script>

<style lang="less">	
.power {
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
