
<template>
    <!-- 回收站管理 -->
	<div class="income">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的回收站商品总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>回收站的商品</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
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
						<el-form-item label="关键字 : ">
                            <el-input v-model="keyword" placeholder="商品条形码或商品名称"></el-input>
                        </el-form-item>
					</el-col>
                    <template v-if="enState">
						<el-col :span="8">
                            <el-form-item label="销售区间 : ">
                                <div class="input-half">
                                    <el-col :span="11">
                                        <el-input v-model="minSalesNum" placeholder="最小" @keyup.native="minSalesNum=formatInt(minSalesNum)"></el-input>
                                    </el-col>
                                    <el-col :span="2" style="text-align: center;">-</el-col>
                                    <el-col :span="11">
                                        <el-input v-model="maxSalesNum" placeholder="最大" @keyup.native="maxSalesNum=formatInt(maxSalesNum)"></el-input>
                                    </el-col>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销价区间 : " style="padding-left:10px;">
                                <div class="input-half">
                                    <el-col :span="11">
                                        <el-input v-model="minPrice" placeholder="最小" @keyup.native="minPrice=formatDouble(minPrice)"></el-input>
                                    </el-col>
                                    <el-col :span="2" style="text-align: center;">-</el-col>
                                    <el-col :span="11">
                                        <el-input v-model="maxPrice" placeholder="最大" @keyup.native="maxPrice=formatDouble(maxPrice)"></el-input>
                                    </el-col>
                                </div>
                            </el-form-item>
                        </el-col>
                    </template>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
                        <el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
                        <el-button type="text" v-else  @click="enState=!enState">收起 <i class="el-icon-arrow-up"></i></el-button>
					</el-col>
			    </el-row>
			</el-form>
			<!-- 表格数据 -->
            <div style="padding: 10px;">
                <el-button type="success" size="small" @click="openConfirm(goodsIds, '是否将选中商品恢复?', recoveryGoodsByIds)" v-has="'re-recycle'" :disabled="!goodsIds">批量恢复</el-button>
                <el-button type="danger" size="small" @click="openConfirm(goodsIds, '是否将选中商品彻底删除?', physicalDelGoodsByIds)" v-has="'del-recycle'" :disabled="!goodsIds">批量删除</el-button>
            </div>
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
				<el-table-column prop="total" label="总库存" min-width="80"></el-table-column>
				<el-table-column prop="returnDeadline" label="服务费率/退货期" min-width="135">
                    <template slot-scope="scope">
                        <p>{{scope.row.serviceRate}}</p>
                        <span>{{scope.row.returnDeadline | formatSecs}}</span>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="125" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑"  v-has="'recycle-detail'" placement="top">
                            <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit-outline"
                            plain
                            @click="goDetail(scope.row.goodsId)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="恢复" v-has="'re-recycle'" placement="top">
                            <el-button
                            size="mini"
                            type="success"
                            icon="fa fa-reply"
                            plain
                            @click="openConfirm(scope.row.goodsId, '是否将此商品恢复?', recoveryGoodsByIds)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="彻底删除" v-has="'del-recycle'" placement="top">
                            <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="openConfirm(scope.row.goodsId, '是否将此商品彻底删除?', physicalDelGoodsByIds)"></el-button>
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
import cArea from '@/components/base/cArea'
export default {
	data () {
		return {
			goodsData: [],
            cateIds: [],
            optionsCate: [],
            keyword: '',
            minSalesNum: '',
            maxSalesNum: '',
            minPrice: '',
            maxPrice: '',
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			enState: false,
			search: {
                cateIds: '',
				keyword: '',
                minSalesNum: '',
                maxSalesNum: '',
                minPrice: '',
                maxPrice: ''
			},
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
	components:{
		cArea
	},
	methods: {
		resetting () {
			let vm = this
			vm.cateIds = []
			vm.keyword = ''
			vm.minSalesNum = ''
            vm.maxSalesNum = ''
            vm.minPrice = ''
			vm.maxPrice = ''
			vm.search = {
				cateIds: '',
				keyword: '',
                minSalesNum: '',
                maxSalesNum: '',
                minPrice: '',
                maxPrice: ''
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getGoodsList()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				cateIds: vm.cateIds.join(','),
				keyword: vm.keyword,
                minSalesNum: vm.minSalesNum,
                maxSalesNum: vm.maxSalesNum,
                minPrice: vm.minPrice,
                maxPrice: vm.maxPrice
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
				status: 4,
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
        getAreaArr (arr) {
            this.areaArr = arr
		},
		goDetail (id) {
			this.$router.push({ path: 'recycle-detail', query: { gid: id }})
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
        },
        openEdit (index, name, openField) {
            this.goodsData[index][openField] = true
            this.goodsData = JSON.parse(JSON.stringify(this.goodsData))
            this.tempName = name
            setTimeout(() => {
                this.$refs['editInput'].focus()
            },0)
        },
        inputBlur (index, id, name, openField, callback) {
            let vm= this
            vm.goodsData[index][openField] = false
            vm.goodsData = JSON.parse(JSON.stringify(vm.goodsData))
            if (vm.tempName != name) {
                callback(id, name)
            } 
        },
        focus(event) {
            event.currentTarget.select()
        },
        changeGoodsNameById (id, name) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: id,
                goodsName: name
			}
			vm.$post(vm.$api.shop.changeGoodsNameById, param).then(resp => {
                console.log(resp)
			}).catch(err => {
                this.getGoodsList()
            })
        },
        changeGoodsDisplayOrderById (id, name) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: id,
                displayOrder: name
			}
			vm.$post(vm.$api.shop.changeGoodsDisplayOrderById, param).then(resp => {
                console.log(resp)
			}).catch(err => {
                this.getGoodsList()
            })
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
        recoveryGoodsByIds (ids) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsIds: ids,
			}
			vm.$post(vm.$api.shop.recoveryGoodsByIds, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getGoodsList()
			})
        },
        physicalDelGoodsByIds (ids) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsIds: ids
			}
			vm.$post(vm.$api.shop.physicalDelGoodsByIds, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getGoodsList()
			})
        },
        handleSelectionChange (val) {
            let temp = val.map(obj => {
                return obj.goodsId
            })
            this.goodsIds = temp.join(',')
        }
	},
	created () {
		this.getGoodsCategoryOne()
	}
}
</script>

<style lang="less">	
.income {
    // .nub {
    //     font-size: 16px;
    //     padding-top: 10px;
    //     display: block;
    //     color: rgba(0,0,0,.65);
    // }
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
    i.fa {
        margin-right: 0;
        width: auto;
        text-align: center;
        font-size: 12px;
        vertical-align: middle;
    }
}
</style>
