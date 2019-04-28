<template>
	<div class="goods">
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
						<el-form-item label="文章类型">
							<el-select v-model="type" style="width: 100%;">
								<el-option v-for="item in typeOptions" :key="item.value" :label="item.key" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="关键词 : ">
							<el-input v-model="keyword" placeholder="文章标题"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="list" maxHeight="404" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
					<el-table-column label="宣传图">
						<template slot-scope="scope">
							<img style="width: 50px;height: auto;" v-if="scope.row.thumb" :src="scope.row.thumb[0].original"/>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="文章标题"></el-table-column>
					<el-table-column prop="pv" label="文章点击量"></el-table-column>
					<el-table-column label="操作" width="60" fixed="right">
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
				type: 2,
				typeOptions: [{
						key: '所有',
						value: -1
					},
					{
						key: '快讯',
						value: 1
					},
					{
						key: '推广助手',
						value: 2
					},
				],
				list: [],
				curPage: 1,
				pageSize: 10,
				totalNums: 1,
				saleNums: 0,
				pages: 1,
				search: {
					keyword: '',
					type: 2,
				},
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.$emit('getArticle', val)
			},
			resetting() {
				this.keyword = ''
				this.type = 2
				this.search = {
					keyword: '',
					type: 2,
				}
				this.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				this.getList()
			},
			onSearch() {
				let vm = this
				vm.search = { // 进行搜索条件缓存
					keyword: vm.keyword,
					type:vm.type,
				}
				vm.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				vm.getList()
			},
			handleSize(sizeVal) {
				this.pageSize = sizeVal
				this.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				this.getList()
			},
			handleCurrent(currentVal) {
				this.curPage = currentVal
				this.getList()
			},
			getList() {
				let vm = this
				let param = Object.assign({}, vm.search, {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					curPage: vm.curPage,
					pageSize: vm.pageSize
				})
				vm.$get(vm.$api.custom.getList, param).then(resp => {
					vm.list = resp.list
					vm.totalNums = resp.totalNums
					vm.pages = resp.pages || 1
					vm.saleNums = resp.saleNums
				})
			}
		},
		created() {
			this.getList()
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
			border-top: 2px solid #ebeef5
		}
	}
</style>