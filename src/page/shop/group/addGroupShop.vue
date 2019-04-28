<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="状态 : ">
                <el-select v-model="status" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类 : ">
                <c-goods-class v-model="cateIds"></c-goods-class>
            </el-form-item>
            <el-form-item label="关键字 : ">
                <el-input v-model="keyword" placeholder="商品条形码或商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="resetting">重置</el-button>
            </el-form-item>
        </el-form>
        <el-button
            size="mini"
            type="primary"
            plain
            @click="openConfirm('是否将选中商品移入该商品组?', addGroupGoods, shiftIn)"
            :disabled="!shiftIn">选中移入</el-button>
        <el-table :data="goodsData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column label="宣传图" min-width="80">
                <template slot-scope="scope">
                    <img v-if="scope.row.img && scope.row.img.original" :src="scope.row.img.original" alt="" class="image">
                </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" min-width="160"></el-table-column>
            <el-table-column label="价格" min-width="140">
                <template slot-scope="scope">
                    {{scope.row.minPrice == scope.row.maxPrice ? scope.row.minPrice : scope.row.minPrice+' - '+scope.row.maxPrice}}
                </template>
            </el-table-column>
            <el-table-column prop="enabled" label="状态" min-width="80">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.status==1"
                        type="success"
                        disable-transitions>
                        上架中
                    </el-tag>
                    <el-tag
                        v-else
                        type="warning"
                        disable-transitions>
                        已下架
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="total" label="总库存" min-width="80"></el-table-column>
            <el-table-column prop="serviceRate" label="服务费率" min-width="80"></el-table-column>
            <el-table-column prop="returnDeadline" label="退货期" min-width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.returnDeadline | formatSecs}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="openConfirm('是否将该商品移入该商品组?', addGroupGoods, scope.row.goodsId)">移入商品</el-button>
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
    </div>
</template>

<script>
import cGoodsClass from '@/components/base/cGoodsClass'
export default {
    props: {
        gid: String
    },
    data () {
        return {
            goodsData: [],
            status: 0,
            cateIds: [],
            keyword: '',
            options: [
                {
                    label: '全部',
                    value: 0
                },{
                    label: '上架中',
                    value: 1
                },{
                    label: '仓库中',
                    value: 2
                },{
                    label: '已售罄',
                    value: 3
                },{
                    label: '回收站',
                    value: 4
                }
            ],
            shiftIn: '',
            curPage: 1,
            pages: 1,
            pageSize: 10,
            totalNums: 1,
            search: {
                status: 0,
				cateIds: '',
				keyword: ''
			}
        }
    },
    components: {
        cGoodsClass
    },
    methods: {
        resetting () {
            let vm = this
            vm.status = 0
			vm.cateIds = []
			vm.keyword = ''
			vm.search = {
                status: 0,
				cateIds: '',
				keyword: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getGoodsList()
		},
		onSearch () {
			let vm = this
            vm.search = { // 进行搜索条件缓存
                status: vm.status,
				cateIds: vm.cateIds.join(','),
				keyword: vm.keyword,
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
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
			vm.$get(vm.$api.shop.getGoodsList, param).then(resp => {
				vm.goodsData = resp.pageBean.list
                vm.totalNums = resp.pageBean.totalNums
                vm.pages = resp.pageBean.pages || 1
                vm.saleNums = resp.saleNums
			})
        },
        handleSelectionChange(val) {
            let temp = val.map(obj => obj.goodsId)
            this.shiftIn = temp.join(',')
        },
        openConfirm(text, callback, id) {
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
        addGroupGoods (ids) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: vm.gid,
                goodsIds: ids
            }
            vm.$post(vm.$api.shop.addGroupGoods, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '成功移入商品'
                }); 
            })
        }
    },
    created () {
        this.getGoodsList()
    }
}
</script>


