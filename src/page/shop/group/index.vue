<template>
    <!-- 商品组管理 -->
	<div class="shop-group">
		<!-- <div class="nub-top">
			<h2>商品组管理</h2>
		</div> -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的商品组总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>商品组管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="50px" label-position="left">
					<el-col :span="8">
						<el-form-item label="状态 : " style="padding-left: 10px;">
							<el-select v-model="enabled" placeholder="请选择" style="width: 100%;">
								<el-option :key="-1" label="全部" :value="-1"></el-option>
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
					<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="editShopGroup()" v-has="'@shop-group-edit'">新增商品组</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="groupName" label="商品组名称" min-width="140"></el-table-column>
				<el-table-column prop="goodsNums" label="商品数量" min-width="100"></el-table-column>
				<el-table-column prop="enabled" label="状态" v-has="'up-shop-group'" min-width="80">
					<template slot-scope="scope">
                        <el-tag
                        	id="up-shop"
                        	v-has="'up-shop-group'"
                            :type="scope.row.enabled ? 'success' : 'danger'"
                            disable-transitions
                            style="cursor: pointer;"
                            @click.native="openConfirm(`是否改为${scope.row.enabled ? '禁用' : '可用'}状态`, modifyGroupStatus, {id: scope.row.groupId, enabled: +!scope.row.enabled})">
                            	{{scope.row.enabled ? '可用' : '禁用'}}
                        </el-tag>
                        <el-tag
                        	v-if="upShop"
                            :type="scope.row.enabled ? 'success' : 'danger'"
                            disable-transitions>
                            	{{scope.row.enabled ? '可用' : '禁用'}}
                       </el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="描述" min-width="180"></el-table-column>
				<el-table-column label="创建时间" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | formatDate}}</span>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="110" fixed="right">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="编辑" v-has="'shop-group-edit'" placement="top">
							<el-button
							size="mini"
							type="primary"
							icon="el-icon-edit-outline"
							plain
							@click="editShopGroup(scope.row.groupId)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" v-has="'del-shop-group'" placement="top">
							<el-button
							size="mini"
							type="danger"
							icon="el-icon-delete"
							plain
							@click="openConfirm('此操作将永久删除该商品组, 是否继续?', delGroup, scope.row.groupId)"></el-button>
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
			enabled: -1,
			keyword: '',
			tableData: [],
			curPage: 1,
			pages: 1,
			pageSize: 10,
			totalNums: 1,
			search: {
				enabled: -1,
				keyword: ''
			},
			upShop: false
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getGroupList()
        })
    },
	updated () {
		this.upShop = !document.querySelector('#up-shop')
	},
	methods: {
		resetting () {
			let vm = this
			vm.enabled = -1
			vm.keyword = ''
			vm.search = {
				enabled: -1,
				keyword: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getGroupList()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				enabled: vm.enabled,
				keyword: vm.keyword
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getGroupList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getGroupList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getGroupList()
		},
		getGroupList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.shop.getGroupList, param).then(resp => {
                if (resp) {
                    vm.tableData = resp.list
                    vm.totalNums = resp.totalNums
                    vm.pages = resp.pages || 1
                } else {
                    vm.tableData = []
                    vm.totalNums = 1
                    vm.pages = 1
                }
			})
		},
		editShopGroup (id) {
			this.$router.push({ path: 'shop-group-edit', query: { gid: id }})
		},
		delGroup (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: id,
            }
            vm.$post(vm.$api.shop.delGroup, param).then(resp => {
                vm.getGroupList()
                vm.$message({
					type: 'success',
					message: '成功删除'
				})
            })
        },
        modifyGroupStatus ({id, enabled}) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: id,
                enabled: enabled
            }
            vm.$post(vm.$api.shop.modifyGroupStatus, param).then(resp => {
                vm.getGroupList()
                vm.$message({
					type: 'success',
					message: '操作成功'
				})
            })
        },
        openConfirm(text, callback, param) {
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback(param)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
	}
}
</script>

<style lang="less">	
.shop-group {
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
