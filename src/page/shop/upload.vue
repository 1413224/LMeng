<template>
    <div class="shop-upload">
        <div class="nub-top">
			<h2>商品上传</h2>
		</div>
        <div class="upload-card">
            <div class="upload-cont">
                <div class="cont-back" @click="isChecked=1">
                    <img v-if="isChecked == 1" src="../../assets/images/shop_upload_1_on.png" alt="" class="image">
                    <img v-else src="../../assets/images/shop_upload_1.png" alt="" class="image">
                    <div class="descr">
                        <p>商品名称上传</p>
                        <p class="level">通过商品名称上传方式进行商品上传</p>
                    </div>
                </div>
                <div class="cont-back" @click="isChecked=2">
                    <img v-if="isChecked == 2" src="../../assets/images/shop_upload_2_on.png" alt="" class="image">
                    <img v-else src="../../assets/images/shop_upload_2.png" alt="" class="image">
                    <div class="descr">
                        <p>条形码上传</p>
                        <p class="level">通过条形码上传方式进行商品上传</p>
                    </div>
                </div>
                <div class="cont-back" @click="isChecked=3">
                    <img v-if="isChecked == 3" src="../../assets/images/shop_upload_3_on.png" alt="" class="image">
                    <img v-else src="../../assets/images/shop_upload_3.png" alt="" class="image">
                    <div class="descr">
                        <p>手动上传</p>
                        <p class="level">通过手动上传方式进行商品上传</p>
                    </div>
                </div>
                <el-button class="margin-center" type="primary" @click="nextStep(isChecked)" v-has="'go-shop-upload'">下一步</el-button>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="shopVisible"
            width="1000px">
            <div>
                <el-form :inline="true">
                    <el-form-item label="商品名称:">
                        <el-input v-model="keyword" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getStdGoodsBasicInfoByKeyword">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="shopData" style="width: 100%">
                    <el-table-column label="宣传图" min-width="80">
                        <template slot-scope="scope">
                            <img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" alt="" class="shop-image">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" min-width="160"></el-table-column>
                    <el-table-column prop="brandName" label="品牌" min-width="140"></el-table-column>
                    <el-table-column prop="cateInfo" label="分类" min-width="180">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in scope.row.cateInfo" :key="index">
                                {{index ? '/' : ''}}{{item.cateName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="openAdd(scope.row)">添加商品</el-button>
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
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="barCodeVisible"
            width="1000px">
            <div>
                <el-form :inline="true" ref="ruleBarcode">
                    <el-form-item 
                    label="商品条形码:">
                        <el-input v-model="barcode" placeholder="商品条形码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getStdGoodsBasicInfoByBarcode">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="codeDate" style="width: 100%">
                    <el-table-column label="宣传图" min-width="80">
                        <template slot-scope="scope">
                            <img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" alt="" class="shop-image">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" min-width="160"></el-table-column>
                    <el-table-column prop="brandName" label="品牌" min-width="140"></el-table-column>
                    <el-table-column prop="cateInfo" label="分类" min-width="180">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in scope.row.cateInfo" :key="index">
                                {{index ? '/' : ''}}{{item.cateName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="openAdd(scope.row)">添加商品</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        var checkBarcode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('商品条形码不能为空'));
            } else {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value.toString().length !== 13) {
                        callback(new Error('请输入正确商品条形码'));
                    } else {
                        callback();
                    }
                }
            }
        };
        return {
            isChecked: 1,
            shopVisible: false,
            keyword: '',
            curPage: 1,
            pages: 1,
            pageSize: 10,
            totalNums: 1,
            barCodeVisible: false,
            barcode: '',
            codeDate: [],
            shopData: []
        }
    },
    methods: {
        nextStep (isChecked) {
            if (isChecked == 1) {
                this.shopVisible = true
            } else if (isChecked == 2) {
                this.barCodeVisible = true
            } else {
                this.$router.push('shop-add')
            }
        },
        handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getStdGoodsBasicInfoByKeyword()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getStdGoodsBasicInfoByKeyword()
        },
        getStdGoodsBasicInfoByKeyword () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                keyword: vm.keyword,
                curPage: vm.curPage,
                pageSize: vm.pageSize
            }
            vm.$get(vm.$api.shop.getStdGoodsBasicInfoByKeyword, param).then(resp => {
                vm.shopData = resp.list
                vm.totalNums = resp.totalNums
                vm.pages = resp.pages || 1
            })
        },
        getStdGoodsBasicInfoByBarcode () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                barcode: vm.barcode
            }
            vm.$get(vm.$api.shop.getStdGoodsBasicInfoByBarcode, param).then(resp => {
                vm.codeDate = [resp]
            })
        },
        openAdd (item) {
            this.$router.push({ name: 'ShopAdd', params: item})
        }
    }
}
</script>

<style lang="less" scoped>
.shop-upload {
    .upload-card {
        margin: 20px;
        background-color: #fff;
        padding: 20px;
        .upload-cont {
            width: 500px;
            margin: 20px auto;
            .cont-back {
                height: 72px;
                margin: 20px;
                .image {
                    width: 112px;
                    height: 72px;
                    float: left;
                }
                .descr {
                    float: left;
                    padding: 5px 20px;
                    line-height: 26px;
                    .level {
                        color: #909399;
                    }
                }
            }
            .margin-center {
                display: block;
                margin: 40px auto;
            }
        }
    }
    .shop-image {
        width: 60px;
        height: 60px;
    }
    .flex_center {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>
