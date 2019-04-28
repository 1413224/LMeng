<template>
    <!-- 待审核管理 -->
	<div class="income">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的审核失败商品总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>审核失败</h2>
		</div>
        <el-card class="box-card">
			<!-- 表格数据 -->
            <el-table :data="goodsData" @selection-change="handleSelectionChange" style="width: 100%">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
				<el-table-column prop="displayOrder" label="商品排序" min-width="80">
                </el-table-column>
				<el-table-column label="宣传图" min-width="70">
                    <template slot-scope="scope">
                        <img v-if="scope.row.img && scope.row.img.original" :src="scope.row.img.original" alt="" class="image">
                    </template>
                </el-table-column>
				<el-table-column prop="goodsName" label="商品名称" min-width="160">
                </el-table-column>
				<el-table-column label="商品价格" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.minPrice == scope.row.maxPrice">{{scope.row.minPrice}}</span>
                        <span v-else>{{scope.row.minPrice}} - {{scope.row.maxPrice}}</span>
                    </template>
                </el-table-column>
				<el-table-column prop="salesRealNum" label="销量" min-width="100">
                    <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            trigger="hover">
                            <div style="line-height: 30px;">
                            <p>虚拟销量: 
                                <span>{{scope.row.salesNum}}</span>
                            </p>
                            <p>实际销量: 
                                <span>{{scope.row.salesRealNum}}</span>
                            </p>
                            </div>
                            <div slot="reference">{{scope.row.salesRealNum}}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="70">
                    <template slot-scope="scope">
                        <el-tag size="mini" type="danger">不通过</el-tag>
                    </template>
                </el-table-column>
				<el-table-column prop="total" label="总库存" min-width="80"></el-table-column>
				<el-table-column prop="returnDeadline" label="服务费率/退货期" min-width="135">
                    <template slot-scope="scope">
                        <p>{{scope.row.serviceRate}}</p>
                        <span>{{scope.row.returnDeadline | formatSecs}}</span>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="90" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip v-if="scope.row.type == 2" class="item" effect="dark" content="更改详情" v-has="'shop-auditing-contrast'" placement="top">
                            <el-button
                            size="mini"
                            type="info"
                            icon="el-icon-document"
                            plain
                            @click="goDetail(scope.row.goodsId, scope.row.type)"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else class="item" effect="dark" content="编辑" v-has="'fail-shop-auditing-edit'" placement="top">
                            <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit-outline"
                            plain
                            @click="goDetail(scope.row.goodsId, scope.row.type)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" v-has="'del-auditing-fail'" placement="top">
                            <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="openConfirm(scope.row.goodsId, '是否将此商品删除?', delCheckGoodsById)"></el-button>
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
			goodsData: [],
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			enState: false,
            props: {
                label: 'name',
                value: 'categoryId'
            },
            tempName: '',
            goodsIds: ''
		}
    },
    beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getGoodsList()
        })
    },
	methods: {
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
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				status: 6,
				curPage: vm.curPage,
				pageSize: vm.pageSize
			}
			vm.$get(vm.$api.shop.getGoodsCheckList, param).then(resp => {
				vm.goodsData = resp.list
                vm.totalNums = resp.totalNums
                vm.pages = resp.pages || 1
			})
        },
		goDetail (id, type) {
            let path = type == 2 ? 'shop-auditing-contrast' : 'shop-auditing-edit'
			this.$router.push({ path: path, query: { gid: id }})
        },
        openConfirm(id, text, callback) {
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
        delCheckGoodsById (id) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: id
			}
			vm.$post(vm.$api.shop.delCheckGoodsById, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getGoodsList()
			})
        },
	}
}
</script>

<style lang="less">	
.income {
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
