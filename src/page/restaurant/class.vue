<template>
	<div class="class">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的餐品分类数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>餐品分类</h2>
		</div>
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
				        <el-form-item label="搜索 : ">
	                		<el-input v-model="keyword" placeholder="搜索关键字，餐品分类名称"></el-input>
	              		</el-form-item>
			        </el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<div class="border">
				<el-table :data="classData" style="width: 100%">
					<el-table-column prop="name" label="餐品分类名称" min-width="80"></el-table-column>
					<el-table-column prop="number" label="餐品数量" min-width="120"></el-table-column>
					<el-table-column prop="status" label="状态" min-width="80">
						<template slot-scope="scope">
	            <el-tag
	                :type="scope.row.status ? 'success' : 'danger'"
	                disable-transitions
	                style="cursor: pointer;"
	                @click.native="openConfirm(scope.row.sellerId,scope.row.status, '是否改变店员状态?', modifySellerStatus)">
	                {{scope.row.status == 1 ? '可用' : '禁用'}}
	            </el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" min-width="110">
						<template slot-scope="scope">
			              <div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
			          	</template>
					</el-table-column>
					<el-table-column label="操作" min-width="60" fixed="right">
						<template slot-scope="scope">
				            <el-tooltip class="item" effect="dark" content="查看分类下的餐品" placement="top">
				                <el-button
				                size="mini"
				                type="primary"
				                plain
				                @click="goDetail(scope.row.cateId)">查看分类下的餐品</el-button>
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
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			keyword: '',
			classData: [],
			search: {
			    keyword: ''
			},  
		}
	},
	methods: {
	    resetting() {
	      let vm = this
	      vm.keyword = ''
	      vm.search = {
	        keyword: ''
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getCategoryList()
	    },
	    onSearch() {
	      let vm = this
	      vm.search = {
	        // 进行搜索条件缓存
	        keyword: vm.keyword
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getCategoryList()
	    },
	    handleSize(sizeVal) {
	      this.pageSize = sizeVal
	      this.curPage = 1
	      this.$refs.paging.lastEmittedPage = 1
	      this.getCategoryList()
	    },
	    handleCurrent(currentVal) {
	      this.curPage = currentVal
	      this.getCategoryList()
	    },
	    getCategoryList() {
	      let vm = this
	      let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		        curPage: vm.curPage,
		        pageSize: vm.pageSize
	      })
	      vm.$get(vm.$api.restaurant.getCategoryList, param).then(resp => {
		        vm.classData = resp.list
		        vm.totalNums = resp.totalNums
		        vm.pages = resp.pages || 1
	      })
	    },
	    goDetail (id) {
			this.$router.push({ path: 'restaurant', query: { cid: id }})
        },
//	    openConfirm(id,status, text, callback) {
//          this.$confirm(text, '提示', {
//              confirmButtonText: '确定',
//              cancelButtonText: '取消',
//              type: 'warning'
//          }).then(() => {
//              callback(id,status)
//          }).catch(() => {
//              this.$message({
//                  type: 'info',
//                  message: '已取消操作'
//              });          
//          });
//      },
//      modifySellerStatus (id,status) {
//          let vm = this
//			let param = {
//				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
//              sellerId: id,
//              status: +!status
//			}
//			vm.$post(vm.$api.clerk.modifySellerStatus, param).then(resp => {
//              vm.$message({
//                  type: 'success',
//                  message: '操作成功!'
//              })
//              vm.getSellerList()
//			})
//      },
//      modifySeller (id, type) {
//          let vm = this
//			let param = {
//				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
//              sellerId: id,
//              type: type == 1 ? '2':'1'
//			}
//			vm.$post(vm.$api.clerk.modifySeller, param).then(resp => {
//              vm.$message({
//                  type: 'success',
//                  message: '操作成功!'
//              })
//              vm.getSellerList()
//			})
//      },
//      delSeller (id, status) {
//          let vm = this
//			let param = {
//				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
//              sellerId: id
//			}
//			vm.$post(vm.$api.clerk.delSeller, param).then(resp => {
//              vm.$message({
//                  type: 'success',
//                  message: '操作成功!'
//              })
//              vm.getSellerList()
//			})
//      },
	  },
	  created() {
	    this.getCategoryList()
	  }
}
</script>

<style lang="less">
.class {
	.box-card {
	    margin: 20px;
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
	.flex_center {
	    padding-top: 20px;
	    display: flex;
	    justify-content: center;
	}
	/*.logo-img {
		margin: 0 auto;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}*/
}
</style>