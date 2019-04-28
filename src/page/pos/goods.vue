<template>
    <div class="goods">
        <div class="nub-top">
        	<div class="top-left">
        		<h2>商品管理</h2>
        	</div>
    		<el-row class="top-right">
	            <el-col :span="12" style="border-right: 1px solid #ccc;">
	                <p>符合条件的商品总数</p>
	                <p class="num">{{totalNums}}</p>
	            </el-col>
	            <el-col :span="12">
	                <p>符合条件的商品总销量</p>
	                <p class="num">{{saleNums}}</p>
	            </el-col>
	      </el-row>
		</div>
        <el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
                    <el-col :span="8">
                        <el-form-item label="商品分类 : " style="padding-left:10px;">
                            <el-cascader
                                v-model="cateIds"
                                :options="optionsCate"
                                @change="getGoodsCategory"
                                change-on-select
                                clearable
                                :props="props"
                                style="width: 100%;"
                            ></el-cascader>
						</el-form-item>
                    </el-col>
					<el-col :span="8">
						<el-form-item label="关键词 : ">
							<el-input v-model="keyword" placeholder="商品名称 / 商品条形码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<!-- 表格数据 -->
            <div style="padding: 10px">
                <el-alert 
                    title="商品每天会自动进行同步pos收银系统的商品数据，因此数据可能会有一定时间的延迟"
                    type="info"
                    show-icon>
                </el-alert>
            </div>
            <div class="border">
            	<el-table :data="goodsData" style="width: 100%">
					<el-table-column prop="displayOrder" label="排序" min-width="60"></el-table-column>
					<el-table-column prop="goodsName" label="商品名称" min-width="120"></el-table-column>
					<el-table-column label="商品价格" min-width="120">
	                    <template slot-scope="scope">
	                        <span v-if="scope.row.minPrice == scope.row.maxPrice">{{scope.row.minPrice}}</span>
	                        <span v-else>{{scope.row.minPrice}} - {{scope.row.maxPrice}}</span>
	                    </template>
	                </el-table-column>
					<el-table-column prop="salesRealNum" label="销量" min-width="80"></el-table-column>
					<!-- <el-table-column prop="serviceRate" label="服务费率" min-width="80"></el-table-column> -->
					<el-table-column label="服务费率/退货期" min-width="140">
	                    <template slot-scope="scope">
							<p>{{scope.row.serviceRate}}</p>
	                        <span>{{scope.row.returnDeadline | formatSecs}}</span>
	                    </template>
	                </el-table-column>
					<el-table-column label="创建时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
	                </el-table-column>
					<el-table-column label="操作" min-width="60" fixed="right">
	                    <template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="编辑" v-has="'goods-detail'" placement="top">
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
            keyword: '',
            cateIds: [],
            optionsCate: [],
			goodsData: [],
			curPage: 1,
			pageSize: 10,
            totalNums: 1,
            saleNums: 0,
            pages: 1,
            search: {
                keyword: '',
                cateIds: ''
            },
            props: {
                label: 'name',
                value: 'categoryId'
            }
        }
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getGoodsList()
        })
    },
    methods: {
		resetting () {
            this.keyword = ''
            this.cateIds = []
            this.search = {
                keyword: '',
                cateIds: ''
            }
            this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
            this.getGoodsList()
        },
        onSearch () {
			let vm = this
            vm.search = { // 进行搜索条件缓存
                keyword: vm.keyword,
                cateIds: vm.cateIds.join(',')
            }
			vm.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			vm.getGoodsList()
		},
		handleSize (sizeVal) {
            this.pageSize = sizeVal
            this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getGoodsList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getGoodsList()
        },
		getGoodsList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.pos.getGoodsList, param).then(resp => {
				vm.goodsData = resp.pageBean.list
                vm.totalNums = resp.pageBean.totalNums
                vm.pages = resp.pageBean.pages || 1
                vm.saleNums = resp.saleNums
			})
		},
		goDetail (id) {
			this.$router.push({ path: 'goods-detail', query: { gid: id }})
		},
        getGoodsCategory (arr) {
            let vm = this  
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                parentId: arr[arr.length - 1],
				curPage: 1,
                pageSize: 100,
                loading: true
            }
            let index,temp = []
            temp[0] = vm.optionsCate
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0;j < temp[i].length; j++) {
                    if (temp[i][j].categoryId == arr[i]) {
                        temp[i+1] = temp[i][j].children
                        index = temp[i][j]
                    }
                }
            }
			vm.$get(vm.$api.pos.getGoodsCategory, param).then(resp => {
                if (resp.list < 1) {
                    delete index.children
                    vm.optionsCate = JSON.parse(JSON.stringify(vm.optionsCate))
                } else {
                    index.children = resp.list.map(item => {
                        item.children = []
                        return item
                    })
                }
			})
        },
        getGoodsCategoryOne () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                parentId: 0,
				curPage: 1,
                pageSize: 100,
                loading: true
			}
			vm.$get(vm.$api.pos.getGoodsCategory, param).then(resp => {
                vm.optionsCate = resp.list.map(item => {
                    item.children = []
                    return item
                })
			})
        }
	},
	created () {
        this.getGoodsCategoryOne()
	}
}
</script>

<style lang="less">
.goods {
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
}
</style>


