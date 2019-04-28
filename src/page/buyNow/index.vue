<template>
    <!-- 自助购商品管理 -->
	<div class="income">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的自助购物商品总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>自助购物</h2>
			<!-- <div class="btn_top" @click="openQrcodeVisible">
				<i class="fa fa-qrcode" style="font-size: 56px;padding-right: 20px;"></i>
				<div class="clerk-link">
					点击查看自助购物二维码
				</div>
			</div> -->
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
					<el-col :span="8">
                        <el-form-item label="商品分类 : " style="padding-left:10px;">
                            <c-goods-class v-model="cateIds"></c-goods-class>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关键字 : ">
                            <el-input v-model="keyword" placeholder="商品条形码或商品名称"></el-input>
                        </el-form-item>
					</el-col>
                    <template v-if="enState">
						<el-col :span="8">
                            <el-form-item label="销量区间 : ">
                                <div class="input-half">
                                    <el-col :span="11">
                                        <el-input v-model="minSalesNum" @keyup.native="minSalesNum=formatInt(minSalesNum)" placeholder="最小"></el-input>
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
                                        <el-input v-model="minOriginPrice" placeholder="最小" @keyup.native="minOriginPrice=formatDouble(minOriginPrice)"></el-input>
                                    </el-col>
                                    <el-col :span="2" style="text-align: center;">-</el-col>
                                    <el-col :span="11">
                                        <el-input v-model="maxOriginPrice" placeholder="最大" @keyup.native="maxPrice=formatDouble(maxOriginPrice)"></el-input>
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
                <template v-if="type==4">
                    <el-button type="success" size="small" @click="openConfirm(goodsIds, '是否将选中商品恢复?', recoveryGoodsByIds)" :disabled="!goodsIds">批量恢复</el-button>
                    <el-button type="danger" size="small" @click="openConfirm(goodsIds, '是否将选中商品彻底删除?', physicalDelGoodsByIds)" :disabled="!goodsIds">批量删除</el-button>
                </template>
                <el-button v-else type="danger" size="small" @click="openConfirm(goodsIds, '是否将选中商品删除?', delGoodsByIds)" :disabled="!goodsIds">批量删除</el-button>
                <router-link to="buy-now-add" v-if="type == 1">
                    <el-button type="primary" size="small">新增商品</el-button>
                </router-link>
            </div>
			<el-table :data="goodsData" @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="displayOrder" label="商品排序" min-width="80">
                    <template slot-scope="scope">
                        <div>{{scope.row.displayOrder}}</div>
                    </template>
                </el-table-column>
				<el-table-column label="宣传图" min-width="70">
                    <template slot-scope="scope">
                        <img v-if="scope.row.img && scope.row.img.original" :src="scope.row.img.original" alt="" class="image">
                    </template>
                </el-table-column>
				<el-table-column prop="goodsName" label="商品名称" min-width="160">
                    <template slot-scope="scope">
                        <div>{{scope.row.goodsName}}</div>
                    </template>
                </el-table-column>
				<el-table-column label="商品价格" min-width="100">
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
                        <el-tag v-if="type==4" size="mini" type="danger">回收站</el-tag>
                        <el-tag v-else-if="type==3" size="mini" type="warning">已售罄</el-tag>
                        <el-tag v-else-if="type==1" size="mini" class="mouse-hand" type="success" @click.native="openConfirm(scope.row.goodsId, '是否将此商品下架?', changeGoodsStatusById,0)">上架中</el-tag>
                        <el-tag v-else-if="type==2" size="mini" class="mouse-hand" type="info" @click.native="openConfirm(scope.row.goodsId, '是否将此商品上架?', changeGoodsStatusById,1)">下架中</el-tag>
                    </template>
                </el-table-column>
				<el-table-column prop="total" label="总库存" min-width="80"></el-table-column>
				<el-table-column prop="returnDeadline" label="服务费率" min-width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.serviceRate}}</p>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="125" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" v-has.apply="'buy-now-detail'" placement="top">
                            <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit-outline"
                            plain
                            @click="goDetail(scope.row.goodsId)"></el-button>
                        </el-tooltip>
                        <template v-if="type==4">
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
                        <el-tooltip v-else class="item" effect="dark" content="删除" v-has.apply="'del-buy-now'" placement="top">
                            <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="openConfirm(scope.row.goodsId, '是否将此商品删除?', delGoodsByIds)"></el-button>
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
		<!-- <el-dialog title="扫码进入自助购物" :visible.sync="qrcodeVisible" width="280px">
			<div id="qrcode" class="label" ref="qrcode"></div>
		</el-dialog> -->
	</div>
</template>

<script>
import cArea from '@/components/base/cArea'
import cGoodsClass from '@/components/base/cGoodsClass'
// import QRCode from 'qrcodejs2'
export default {
	data () {
		return {
			allianceId: '',
			// qrcodeVisible:false,
			goodsData: [],
            cateIds: [],
            optionsCate: [],
            keyword: '',
            minSalesNum: '',
            maxSalesNum: '',
            minOriginPrice: '',
            maxOriginPrice: '',
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
                minOriginPrice: '',
                maxOriginPrice: ''
			},
            props: {
                label: 'name',
                value: 'categoryId'
            },
            tempName: '',
            goodsIds: '',
            type: '',
            cgcPayCode: ''
		}
	},
	components:{
        cArea,
        cGoodsClass,
        // QRCode
	},
    beforeRouteEnter (to, from, next){
        next(vm => {
            if (vm.type !== to.meta.type) {
                vm.type = to.meta.type
                vm.resetting()
            } else {
                vm.getGoodsList()
            }
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.cateIds = []
			vm.keyword = ''
			vm.minSalesNum = ''
            vm.maxSalesNum = ''
            vm.minOriginPrice = ''
			vm.maxOriginPrice = ''
			vm.search = {
				cateIds: '',
				keyword: '',
                minSalesNum: '',
                maxSalesNum: '',
                minOriginPrice: '',
                maxOriginPrice: ''
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
                minOriginPrice: vm.minOriginPrice,
                maxOriginPrice: vm.maxOriginPrice
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
				status: vm.type,
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.buy.getGoodsList, param).then(resp => {
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
			this.$router.push({ path: 'buy-now-detail'+this.type, query: { gid: id }})
        },
        openEdit (index, name, openField) {
            this.goodsData[index][openField] = true
            this.goodsData = JSON.parse(JSON.stringify(this.goodsData))
            this.tempName = name
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
        openConfirm(id, text, callback,status) {
            console.log(status)
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback(id,status)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        changeGoodsStatusById (id,status) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: id,
                status: status
			}
			vm.$post(vm.$api.buy.changeGoodsStatusById, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getGoodsList()
			})
        },
        delGoodsByIds (ids) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsIds: ids
			}
			vm.$post(vm.$api.buy.delGoodsByIds, param).then(resp => {
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
        },
        recoveryGoodsByIds (ids) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsIds: ids,
			}
			vm.$post(vm.$api.buy.recoveryGoodsByIds, param).then(resp => {
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
			vm.$post(vm.$api.buy.physicalDelGoodsByIds, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getGoodsList()
			})
        },
        // qrcode(qrcodeUrl){
		// 	let qrcode = new QRCode('qrcode', {  
		// 		width: 240,  // 设置宽度 
		// 		height: 240, // 设置高度
		// 		text: qrcodeUrl
		//     })  
		// },
		// openQrcodeVisible () {
		// 	let vm = this
		// 	let urlTemp = ''
		// 	vm.qrcodeVisible = true
		// 	let param = {
	    //    		accountId: localStorage['userId' + sessionStorage['roleTypeId']]
	    //     }
	    //     vm.$get(vm.$api.buy.getPayCode, param).then(resp => {
				
	    //     });
		// 	if (window.location.host == 'www.cgc999.com'){
		// 		 urlTemp = 'http://' + window.location.host + '/webcate/#/meal?no=' + vm.cgcPayCode
		// 	}else {
		// 		 urlTemp = 'https://' + window.location.host + '/web/webcate/#/meal?no=' + vm.cgcPayCode
		// 	}
		// 	vm.$nextTick(() => {
		// 		vm.qrcode(urlTemp)
		// 	})
		// 	vm.openQrcodeVisible = () => {
		// 		vm.qrcodeVisible = true
		// 	}
		// }
	}
}
</script>

<style lang="less">	
.income {
	.btn_top {
		display: block;
		width: 160px;
		float: right;
		margin-top: -40px;
		margin-right: 20px;
		font-size: 18px;
		text-align: center;
		line-height: 30px;
		// z-index: 9999;
		&:hover {
			cursor:pointer;			
		}
	}
	.clerk-link {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.45);
	}
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
        .mouse-hand {
            &:hover {
                cursor: pointer;
            }
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
    .input-half {
        div {
            padding: 0!important;
            margin: 0;
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
