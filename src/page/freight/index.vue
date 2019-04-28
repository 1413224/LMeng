<template>
	<!-- 运费模板-->
	<div class="freight">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的运费模板总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>运费模板</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
			    	<el-col :span="8">
						<el-form-item label="状态">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="-1" label="所有" :value="-1"></el-option>
                                <el-option :key="0" label="禁用" :value="0"></el-option>
                                <el-option :key="1" label="启用" :value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关键字 : ">
                            <el-input v-model="keyword" placeholder="运费模板名称"></el-input>
                        </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
			    </el-row>
			</el-form>
			<!-- 表格数据 -->
            <div style="padding: 10px;">
            	<router-link to="freight-add">
                    <el-button type="primary" size="small">新增运费模板</el-button>
                </router-link>
            </div>
            <el-table :data="freeData" @selection-change="handleSelectionChange" style="width: 100%">
				<el-table-column prop="displayOrder" label="排序" min-width="70"></el-table-column>
                <el-table-column prop="name" label="运费模板名称" min-width="160">
                </el-table-column>
                <el-table-column prop="expressName" label="快递公司名称" min-width="120">
                </el-table-column>
                <el-table-column prop="type" label="计费方式" min-width="100">
					<template slot-scope="scope">
						{{ scope.row.type==0 ? '按重量计费' : '按件计费' }}
					</template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==0" size="mini" class="mouse-hand" type="info" @click.native="openConfirm(scope.row.id, '是否将此运费模板启用?', 1, modifyTemplateStatus)">禁用</el-tag>
						<el-tag v-else size="mini" class="mouse-hand" type="success" @click.native="openConfirm(scope.row.id, '是否将此运费模板禁用?', 0, modifyTemplateStatus)">启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="默认" min-width="60">
					<template slot-scope="scope">
						<el-tag size="mini" class="mouse-hand"
						:type="scope.row.isDefault == 1 ? 'success' : 'danger'"
						disable-transitions>{{scope.row.isDefault == 1 ? '是' : '否'}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" min-width="110">
					<template slot-scope="scope">
						<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
					</template>
				</el-table-column>
				<el-table-column label="更新时间" min-width="110">
					<template slot-scope="scope">
						<div style="width: 90px;">{{scope.row.updateTime | formatDate}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="100" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑"  placement="top">
                            <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit-outline"
                            plain
                            @click="goDetail(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="deleteCommodity(scope.row.id, '是否将此运费模板删除?', delTemplate)"></el-button>
                        </el-tooltip>
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
			status: -1,
      		keyword: '',
			freeData: [],
			curPage: 1,
		    pages: 1,
		    pageSize: 10,
		    totalNums: 0,
		    search: {
		        keyword: ''
		    }
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getTemplateList()
        })
    },
	methods: {
		resetting() {
	      let vm = this
		  vm.status = -1
		  vm.freeData = []
	      vm.keyword = ''
	      vm.search = {
	        keyword: ''
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getTemplateList()
	    },
	    onSearch() {
	      let vm = this
	      vm.freeData = []
	      vm.totalNums = 0
	      vm.search = {
	        keyword: vm.keyword
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getTemplateList()
	    },
	    handleSize(sizeVal) {
	      this.pageSize = sizeVal
	      this.curPage = 1
	      this.$refs.paging.lastEmittedPage = 1
	      this.getTemplateList()
	    },
	    handleCurrent(currentVal) {
	      this.curPage = currentVal
	      this.getTemplateList()
	    },
	    getTemplateList() {
	      let vm = this
	      let param = Object.assign({}, vm.search, {
	        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
	        curPage: vm.curPage,
			pageSize: vm.pageSize,
			status:vm.status
	      })
	      vm.$get(vm.$api.freight.getTemplateList, param).then(resp => {
	        vm.freeData = resp.list
	        vm.totalNums = resp.totalNums
			vm.pages = resp.pages || 1
			vm.pageSize = resp.pageSize
	      })
	    },
	    goDetail (id) {
			this.$router.push({ path: 'freight-detail', query: { gid: id }})
        },
        deleteCommodity(id, text, callback) {
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
		},
		openConfirm(id,text,value,callback){
			this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback(id,value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
		},
        modifyTemplateStatus (id,value) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                id: id,
                status: value
			}
			vm.$post(vm.$api.freight.modifyTemplateStatus, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getTemplateList()
			})
        },
        delTemplate (ids) {
			console.log(ids)
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                id: ids
			}
			vm.$post(vm.$api.freight.delTemplate, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getTemplateList()
			})
        },
	}
}
</script>

<style lang="less">	
.freight {
    .box-card {
        margin: 20px;
        .image {
            width: 40px;
            height: 40px;
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
		.mouse-hand{
			cursor:pointer;
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
    i.fa {
        margin-right: 0;
        width: auto;
        text-align: center;
        font-size: 12px;
        vertical-align: middle;
    }
}
</style>
