<template>
	<div class="look">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的待审核餐品总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>待审核的餐品</h2>
		</div>
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
				        <el-form-item label="关键字 : ">
			                <el-input v-model="keyword" placeholder="搜索手机号、姓名、昵称"></el-input>
			            </el-form-item>
				    </el-col>
				    <el-col :span="8">
						<el-form-item label="状态 : ">
					        <el-select v-model="checkStatus" style="width: 100%;">
					          	<el-option :value="0" label="待审核"></el-option>
					            <el-option :value="2" label="审核中"></el-option>
					            <el-option :value="3" label="审核失败"></el-option>
					        </el-select>
					   </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<div class="border">
				<el-table :data="foodData" style="width: 100%">
					<el-table-column prop="displayOrder" label="商品排序" min-width="80"></el-table-column>
					<el-table-column prop="logo" label="餐品图片" min-width="80">
						<template slot-scope="scope">
							<div>
								<img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" class="logo-img">
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="goodsName" label="餐品名称" min-width="80"></el-table-column>
					<el-table-column prop="minPrice" label="商品最低价格" min-width="120"></el-table-column>
					<el-table-column prop="maxPrice" label="商品最高价格" min-width="80"></el-table-column>
					
					<el-table-column prop="salesRealNum" label="商品真实销量" min-width="80"></el-table-column>
					<el-table-column prop="cateName" label="餐品分类名称" min-width="120"></el-table-column>
					<el-table-column prop="total" label="商品的总库存" min-width="80"></el-table-column>
					<el-table-column prop="status" label="状态" min-width="80">
						<template slot-scope="scope">
	                        <el-tag
	                            :type="scope.row.checkStatus == 0 ? 'success' : 'info'"
	                            disable-transitions>
	                            {{scope.row.checkStatus == 0 ? '待审核' : '已下架'}}
	                        </el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="serviceRate" label="商品的服务费率" min-width="60"></el-table-column>
					<el-table-column label="创建时间" min-width="110">
						<template slot-scope="scope">
					        <div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
					    </template>
					</el-table-column>
					<el-table-column label="操作" min-width="60" fixed="right">
						<template slot-scope="scope">
	                        <el-tooltip class="item" effect="dark" content="详情" placement="top">
	                            <el-button
	                            size="mini"
	                            type="primary"
	                            icon="el-icon-edit-outline"
	                            plain
	                            @click="goDetail(scope.row.goodsId)"></el-button>
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
			enState: false,
            optionsCate: [],
            checkStatus: 0,
			keyword: '',
			foodData: [],
			search: {
				checkStatus: 0,
			    keyword: ''
			}, 
		}
    },
	methods: {
		resetting() {
		    let vm = this
		    vm.checkStatus = 0
		    vm.keyword = ''
	        vm.search = {
		      	checkStatus: 0,
		        keyword: '',
		    }
		    vm.curPage = 1
		    vm.$refs.paging.lastEmittedPage = 1
		    vm.getDishList()
	    },
	    onSearch() {
	        let vm = this
	        vm.search = {
		        // 进行搜索条件缓存
		        checkStatus: vm.checkStatus,
		        keyword: vm.keyword,
		    }
	        vm.curPage = 1
	        vm.$refs.paging.lastEmittedPage = 1
	        vm.getDishList()
	    },
	    handleSize(sizeVal) {
	        this.pageSize = sizeVal
	        this.curPage = 1
	        this.$refs.paging.lastEmittedPage = 1
	        this.getDishList()
	    },
	    handleCurrent(currentVal) {
	        this.curPage = currentVal
	        this.getDishList()
	    },
	    getCheckDishList() {
	        let vm = this
	        let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		        curPage: vm.curPage,
		        pageSize: vm.pageSize
	        })
	        vm.$get(vm.$api.restaurant.getCheckDishList, param).then(resp => {
		        vm.foodData = resp.list
		        vm.totalNums = resp.totalNums
		        vm.pages = resp.pages || 1
	       })
	    },
	    goDetail (id) {
			this.$router.push({ path: 'look-detail', query: { gid: id }})
        },
	},
	created () {
		this.getCheckDishList()
	}
}
</script>

<style lang="less">
.look {
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
	.logo-img {
		margin: 0 auto;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
</style>