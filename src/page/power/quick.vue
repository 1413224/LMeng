<template>
    <!-- 快捷权限 -->
	<div class="quick">	
        <!-- <div class="nub-top">
			<h2>快捷权限管理</h2>
		</div>  -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的快捷权限总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>快捷权限管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
            <el-row :gutter="40">
				<el-form label-width="50px" label-position="left">
					<el-col :span="8">
						<el-form-item label="搜索 : " style="padding-left: 10px;">
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
					<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="editQuick()" v-has="'@edit-quick'">新增快捷权限组</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="quickData" style="width: 100%">
					<el-table-column prop="displayOrder" label="序号" min-width="60"></el-table-column>
					<el-table-column prop="name" label="组名" min-width="120"></el-table-column>
	                <el-table-column label="创建时间" min-width="180">
	                    <template slot-scope="scope">
	                        <span>{{scope.row.createTime | formatDate}}</span>
	                    </template>
	                </el-table-column>
	                <el-table-column label="最后修改时间" min-width="180">
	                    <template slot-scope="scope">
	                        <span>{{scope.row.lastTime | formatDate}}</span>
	                    </template>
	                </el-table-column>
	                <el-table-column label="操作" min-width="90" fixed="right">
	                    <template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="编辑"  v-has="'edit-quick'" placement="top">
								<el-button
								size="mini"
								type="primary"
								icon="el-icon-edit-outline"
								plain
								@click="editQuick(scope.row.id)"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" v-has="'del-quick'" placement="top">
								<el-button
								size="mini"
								type="danger"
								icon="el-icon-delete"
								plain
								@click="openConfirm(scope.row.id)"></el-button>
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
            keyword: '',
            quickData: [],
            curPage: 1,
            pageSize: 10,
            pages: 1,
            totalNums: 0,
            search: {
				keyword: ''
			}
        }
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getPermsQuickList()
        })
    },
    methods: {
        resetting () {
			let vm = this
			vm.keyword = ''
			vm.search = {
				keyword: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getPermsQuickList()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				keyword: vm.keyword
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getPermsQuickList()
		},
        handleSize (sizeVal) {
            this.pageSize = sizeVal
            this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
            this.getPermsQuickList()
        },
        handleCurrent (currentVal) {
            this.curPage = currentVal
            this.getPermsQuickList()
        },
        getPermsQuickList () {
            let vm = this
            let param = Object.assign({}, vm.search, {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                curPage: vm.curPage,
                pageSize: vm.pageSize
            })
            vm.$get(vm.$api.power.getPermsQuickList, param).then(resp => {
                vm.quickData = resp.list
                vm.totalNums = resp.totalNums
                vm.pages = resp.pages || 1
            })
        },
        editQuick (id) {
            this.$router.push({ path: 'edit-quick', query: { gid: id }})
        },
        delPermsQuick (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                rightsQuickId: id,
            }
            vm.$post(vm.$api.power.delPermsQuick, param).then(resp => {
                vm.getPermsQuickList()
                this.$message({
					type: 'success',
					message: '删除成功!'
				})
            })
        },
		openConfirm(id) {
			this.$confirm('此操作将永久删除该快捷权限组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                this.delPermsQuick(id)
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
.quick {
    position: relative;
    .add-btn {
        position: absolute;
        top: 30px;
        left: 35px;
    }
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
