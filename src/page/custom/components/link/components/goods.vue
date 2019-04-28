<template>
	<div class="goods">
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="10">
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
			<div class="border">
				<el-table :data="goodsData" maxHeight="404" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
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
							<el-tooltip class="item" effect="dark" content="选择" placement="top">
								<el-button size="mini" type="primary" icon="el-icon-edit-outline" plain></el-button>
							</el-tooltip>
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
		props: {
			goodsSource: ''
		},
		data() {
			return {
				keyword: '',
				optionsCate: [],
				goodsData: [],
				curPage: 1,
				pageSize: 10,
				totalNums: 1,
				saleNums: 0,
				pages: 1,
				search: {
					keyword: ''
				},
				props: {
					label: 'name',
					value: 'categoryId'
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.$emit('getGoods', val)
			},
			resetting() {
				this.keyword = ''
				this.search = {
					keyword: ''
				}
				this.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				this.getGoodsList()
			},
			onSearch() {
				let vm = this
				vm.search = { // 进行搜索条件缓存
					keyword: vm.keyword
				}
				vm.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				vm.getGoodsList()
			},
			handleSize(sizeVal) {
				this.pageSize = sizeVal
				this.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				this.getGoodsList()
			},
			handleCurrent(currentVal) {
				this.curPage = currentVal
				this.getGoodsList()
			},
			getGoodsList() {
				let vm = this
				let param = Object.assign({}, vm.search, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					curPage: vm.curPage,
					pageSize: vm.pageSize,
					hasShopGoods: vm.goodsSource == 1 ? 1 : 0,
					hasSupplyGoods: vm.goodsSource == 2 ? 1 : 0,
				})
				vm.$get(vm.$api.custom.getGoodsList, param).then(resp => {
					vm.goodsData = resp.list
					vm.totalNums = resp.totalNums
					vm.pages = resp.pages || 1
					vm.saleNums = resp.saleNums
				})
			}
		},
		created() {
			this.getGoodsList()
		}
	}
</script>

<style lang="less">
	.goods {
		.input-half {
			div {
				padding: 0!important;
				margin: 0;
			}
		}
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
			border-top: 2px solid #ebeef5;
			margin-top: 20px;
		}
	}
</style>