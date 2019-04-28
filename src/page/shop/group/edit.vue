<template>
    <div class="edit_quick">
        <div class="nub-top">
			<h2>编辑商品组</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-form :model="info" :rules="rules" ref="info" label-width="160px" style="max-width: 850px; padding-right: 100px;">
                <el-form-item label="商品组名称" prop="groupName">
                    <el-input v-model="info.groupName" placeholder="请输入商品组名称"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="info.enabled" :label="1" border size="medium">启用</el-radio>
                    <el-radio v-model="info.enabled" :label="0" border size="medium">禁用</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="info.remark" type="textarea" autosize placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card" v-if="gid">
            <div slot="header" class="clearfix">
                <span>组内商品信息</span>
            </div>
            <div>
                <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="openConfirm('是否将选中商品移出该商品组?', delGroupGoods, removeData)"
                    :disabled="!removeData">选中移除</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="shopVisible=true">移入商品</el-button>
                <el-table :data="goodsData" @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
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
                    <el-table-column prop="salesRealNum" label="销量/实际" min-width="100">
                        <template slot-scope="scope">
                            <p>{{scope.row.salesNum}}</p>
                            <span>{{scope.row.salesRealNum}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" min-width="70">
                        <template slot-scope="scope">
                            <el-tag
                                v-if="scope.row.isDel"
                                type="danger"
                                size="mini"
                                disable-transitions>
                                回收站
                            </el-tag>
                            <el-tag
                                v-else-if="scope.row.status==1"
                                type="success"
                                size="mini"
                                disable-transitions>
                                上架中
                            </el-tag>
                            <el-tag
                                v-else
                                type="warning"
                                size="mini"
                                disable-transitions>
                                已下架
                            </el-tag>
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
                            <el-tooltip class="item" effect="dark" content="编辑" v-has="'reHas(scope.row.isDel, scope.row.status)'" placement="top">
                                <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit-outline"
                                plain
                                @click="goDetail(scope.row.goodsId, scope.row.isDel, scope.row.status)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="移除" placement="top">
                                <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                plain
                                @click="openConfirm('是否将该商品移出该商品组?', delGroupGoods, scope.row.goodsId)"></el-button>
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
            </div>
        </el-card>
        <el-dialog
            title="商品列表"
            :visible.sync="shopVisible"
            width="90%">
            <div> 
                <add-group-shop :gid="gid"></add-group-shop>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="allianceVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="shopVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>
import addGroupShop from './addGroupShop'
export default {
    data () {
        return {
            info: {
                groupName: '',
                enabled: 1,
                remark: ''
            },
            goodsIds: [],
            rules: {
                groupName: [{ required: true, message: '请输入商品组名称', trigger: 'blur' }]
            },
            gid: '',
            loading: false,
            goodsData: [],
            removeData: '',
            curPage: 1,
			pages: 1,
			pageSize: 10,
            totalNums: 1,
            shopVisible: false
        }
    },
    components: {
        addGroupShop
    },
    methods: {
        onSubmit () {
            let vm = this
            vm.$refs['info'].validate((valid) => {
                if (valid) {
                    vm.editGroup(vm.gid)
                } else {
                    return false
                }
            })
        },
        getGroupDetail (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: id
            }
            vm.$get(vm.$api.shop.getGroupDetail, param).then(resp => {
                vm.info.groupName = resp.groupName
                vm.info.enabled = resp.enabled
                vm.info.remark = resp.remark
            })
        },
        handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getGroupGoodsInfo()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getGroupGoodsInfo()
		},
        getGoodsList (query) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				status: 0,
				curPage: 1,
                pageSize: 100,
                keyword: query
			}
			vm.$get(vm.$api.shop.getGoodsList, param).then(resp => {
                vm.loading = false
			})
        },
        getGroupGoodsInfo () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: vm.gid,
                curPage: vm.curPage,
				pageSize: vm.pageSize
            }
            vm.$get(vm.$api.shop.getGroupGoodsInfo, param).then(resp => {
                vm.goodsData = resp.list
                vm.totalNums = resp.totalNums || 1
                vm.pages = resp.pages || 1
            })
        },
        editGroup (id) {
            let vm = this
            let param = Object.assign({}, vm.info, {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: id
            })
            let url = id ? vm.$api.shop.modifyGroupInfo : vm.$api.shop.addGroup
            vm.$post(url, param).then(resp => {
                vm.gid = resp
            })
        },
        handleSelectionChange(val) {
            let temp = val.map(obj => obj.goodsId)
            this.removeData = temp.join(',')
        },
        delGroupGoods (ids) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                groupId: vm.gid,
                type: 0,
                goodsIds: ids
            }
            vm.$post(vm.$api.shop.delGroupGoods, param).then(resp => {
                vm.getGroupGoodsInfo()
            })
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
        goDetail (id, isDel, status) {
            let path = 'recycle-detail'
            if (!isDel) {
                path = status == 1 ? 'shop-detail' : 'warehouse-detail'
            }
            this.$router.push({ path: path, query: { gid: id }})
        },
        reHas (isDel, status) {
         	let path = 'recycle-detail'
            if (!isDel) {
                path = status == 1 ? 'shop-detail' : 'warehouse-detail'
            }
            return path
         }
    },
    created () {
        this.getGoodsList()
        this.gid = this.$route.query.gid
        if (this.gid) {
            this.getGroupDetail(this.gid)
            this.getGroupGoodsInfo()
        }
    },
    watch: {
        shopVisible (val) {
            if (!val) {
                this.getGroupGoodsInfo()
            }
        }
    }
}
</script>

<style lang="less">	
.edit_quick {
    .box-card {
        margin: 20px;
    }
    .ed_title {
        text-align: center;
        padding-bottom: 34px;
    }
    .image {
        width: 40px;
        height: 40px;
    }
    .flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
}
</style>

