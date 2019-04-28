<template>
    <div class="food-detail">
        <div class="nub-top">
			<h2>商品管理详情</h2>
		</div>
		 <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="good-info" label="商品信息" name="first">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
		                <span>商品信息</span>
		            </div>
		            <div class="card-header">
		            	<img v-if="info.logo" :src="info.logo.original" alt="" class="header-image"/>
		            	<div class="header-middle">
		            		<p class="goods-name">餐品名称：{{info.goodsName}}</p>
		            		<p>￥ {{info.minPrice}}  元  / 例</p>
		            		<p class="goods-number">销量：{{info.salesRealNum}}</p>
		            	</div>
		            	<div class="header-right">
		            		<el-button type="primary" size="small">{{info.status == 1 ? '上架中' : '已下架'}}</el-button>
		            		<p class="attribute-name">所属分类：{{info.cateName}}</p>
		            	</div>
		            </div>
		            <div class="card-table">
		                <p class="table-header">商品规格</p>
		                <table border="1px" bordercolor="#ebeef5" cellspacing="0" class="table-set"> 
		                	<tr>
		                		<th v-for="(hItem, hIndex) in valueData"  :key="hIndex" :style="thWidth">{{hItem.label}}</th>
		                	</tr>
		                	<tr v-for="(rItem, rIndex) in skuDate" :key="rIndex">
		                		<template v-for="(dItem, dIndex) in rItem.skuName">
		                			<td v-if="dItem.row" :key="dIndex" :rowspan="dItem.row">{{dItem.name}}</td>
		                		</template>
		                		<td v-if='rItem.skuName.length==1'>/</td>
								<td>{{rItem.stock}}</td>
								<td>{{rItem.price}}</td>
								<td>{{rItem.originPrice}}</td>
								<td>{{rItem.barcode}}</td>
								<td>{{rItem.weight}}</td>
		                	</tr>
		                </table>
		            </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="更多信息" name="second" class="good-info">
                <el-card class="goods-card">
					<div slot="header" class="clearfix">
		                <span>更多信息</span>
		            </div>
		            <el-row>
		                <el-form label-width="140px" :model="ruleForm" :rules="rules" ref="ruleForm">
		                    <el-form-item label="服务费率方式 :" prop="serviceRateType">
		                        <el-radio v-model="ruleForm.serviceRateType" :label="0">和企业一致</el-radio>
		                        <el-radio v-model="ruleForm.serviceRateType" :label="1">自定义设置</el-radio>
		                    </el-form-item>
		                    <el-form-item label="服务费率 :" prop="serviceRate">
		                        <span v-if="!ruleForm.serviceRateType">{{info.serviceRate}}</span>
		                        <el-input v-else v-model="ruleForm.serviceRate" placeholder="服务费率比例，0-1之间,如：0.05" class="cy-input"></el-input>
		                    </el-form-item>
				            <!--<span style="padding-left: 40px;font-size: 18px;">商品参数</span>-->
		                    <el-form-item v-for="(item, index) in goodsParam" :key="index">
                                <el-col :span="8">
                                    <el-input v-model="item.name" placeholder="参数名"></el-input>
                                </el-col>
                                <el-col :span="2" class="font-center">-</el-col>
                                <el-col :span="14" class="goods-param">
                                    </el-badge>
                                    <el-input v-model="item.value[0]" placeholder="参数值"></el-input>
                                </el-col>
                            </el-form-item>
		                    <div class="flex-center">
		                    	<el-button type="primary" size="small" class="footer-btn" @click="showVisible('ruleForm',)">提交审核</el-button>
		                    </div>
		                </el-form>
		            </el-row>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
		  title="编辑"
		  :visible.sync="infoVisible"
		  width="700px"
		  :before-close="handleClose">
		  	<el-form :model="auditing" ref="auditingForm">
		  		<el-form-item label="本次修改内容需要进行审核，请选择审核期间和审核通过的操作">
		  			<template v-if="info.status == 1">
                        <el-col :offset="2">
                            <el-radio v-model="auditing.type" :label="1">继续销售，审核通过后自动变更为新的设置</el-radio>
                        </el-col>
                        <el-col :offset="2">
                            <el-radio v-model="auditing.type" :label="2">审核期间下架该商品，审核通过后立即上架</el-radio>
                        </el-col>
                        <el-col :offset="2">
                            <el-radio v-model="auditing.type" :label="3">审核期间下架该商品，审核通过后需手动上架</el-radio>
                        </el-col>
                    </template>
                    <template v-else>
                        <el-col :offset="2">
                        <el-radio v-model="auditing.type" :label="2">审核通过后立即上架</el-radio>
                        </el-col>
                        <el-col v-model="auditing.type" :offset="2">
                            <el-radio :label="3">审核通过后需手动上架</el-radio>
                        </el-col>
                    </template>
		  		</el-form-item>
		  	</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="infoVisible = false">取 消</el-button>
		    <el-button type="primary" @click="modifyCheckDishInfoById ('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>
    </div>
</template>

<script>
import cUeditor from '@/components/base/cUeditor'
export default {
    data () {
    	var validateServiceRate = (rule, value, callback) => {
            if (this.ruleForm.serviceRateType) {
                if (value === '') {
                    callback(new Error('请输入服务费率'))
                } else {
                    if(0 < (+value) && (+value) < 1) {
                        callback()
                    } else {
                        callback(new Error('格式有误，请输入0-1之间,如：0.05'))
                    }
                }
            } else {
                callback()
            }
        };
        return {
        	info: {},
        	gid: '',
        	activeName: 'first',
        	tabPosition: 'top',
            tableData: [],
            tdData: [],
            valueData: [
                {
                    label: '例牌',
                    name: '',
                    value: '',
                    rule: 'int'
                },{
                    label: '做法',
                    name: '',
                    value: '',
                    rule: 'double'
                },{
                    label: '库存',
                    name: 'stock',
                    value: '',
                    rule: 'int'
                },{
                    label: '结算价',
                    name: 'price',
                    value: ''
                },{
                    label: '原价',
                    name: 'originPrice',
                    value: ''
                },{
                    label: '条码',
                    name: 'barcode',
                    value: ''
                },{
                    label: '重量(克)',
                    name: 'weight',
                    value: '',
                    rule: 'double'
                }
            ],
            skuDate: [],
            goodsParam: [],
            type: 1,
            ruleForm: {
	          serviceRateType: 0,
	          serviceRate: ''
	        },
	        rules : {
	        	serviceRateType: [{ required: true, message: '请选择服务费率方式', trigger: 'change' }],
	        	serviceRate: [{ required: true, validator: validateServiceRate, trigger: 'blur' }],
	        },
	        auditingVisible: false,
	        infoVisible: false,
	        auditing: {
                type: 1
            },
        }
    },
    components: {
        cUeditor
    },
    methods: {
    	handleRow (index) { // 令最近的row！=0 的skuName 的 row+1
    		let vm = this
    		for (let i = vm.skuDate.length - 1; i > -1; i--) {
    			if(vm.skuDate[i].skuName[index].row) {
    				vm.skuDate[i].skuName[index].row += 1
    				return
    			}
    		}
    	},
        getCheckDishInfoById (id) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				goodsId: id,
			}
			vm.$get(vm.$api.restaurant.getCheckDishInfoById, param).then(resp => {
                vm.info = resp
                let skuList = resp.skuList
                let temp = []
                skuList.forEach((item, index) => { // 构建skuDate
                	let skuName = item.skuName.split(',')
                	item.skuName = skuName.map(val => {
                		return {
                			name: val,
                			row: 1
                		}
                	})
                	temp.forEach((val, i) => { // 当当前的skuName等于上一次的skuName时，令当前row -1,
                		if (val === skuName[i]) {
                			vm.handleRow(i)
                			item.skuName[i].row = 0
                		} else {
                			return
                		}
                	})
                	temp = JSON.parse(JSON.stringify(skuName)) // 保存上一对象的skuName
                	vm.skuDate.push(item)
                }),
                vm.goodsParam = resp.attribute.map(obj => {
                    return {
                        name: obj.attributeName,
                        value: [obj.attributeValue]
                    }
                })
			})
        },
        showVisible (ruleForm) {
	       	let vm = this
	       	this.$refs[ruleForm].validate((valid) => {
				if (valid) {
					vm.infoVisible = true
		       	} else {
                vm.$message('输入内容格式不对,请校正后再保存')
                return false
	            }
			})
        },
        modifyCheckDishInfoById(){
        	let vm = this
        	let serviceRateType = vm.ruleForm.serviceRateType
        	if (serviceRateType == 0 ) {
        		console.log(vm.ruleForm.serviceRateType)
	        	let param = {
		       		accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		       		goodsId: vm.gid,
					serviceRateType: vm.ruleForm.serviceRateType,
					type: vm.type,
					serviceRate: vm.info.serviceRate,
		        }
	        	vm.$post(vm.$api.restaurant.modifyCheckDishInfoById, param).then(resp => {
	//		                vm.info = resp
	                vm.$message({
	                    message: '保存成功',
	                    type: 'success'
	                })
	                vm.$router.go(-1)
				})
			} else {
				let param = {
		       		accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		       		goodsId: vm.gid,
					serviceRateType: vm.ruleForm.serviceRateType,
					type: vm.type,
					serviceRate: vm.ruleForm.serviceRate,
		        }
	        	vm.$post(vm.$api.restaurant.modifyCheckDishInfoById, param).then(resp => {
	                vm.$message({
	                        message: '保存成功',
	                        type: 'success'
	                    })
	                vm.$router.go(-1)
				})
	        }
      	},
        correcting () {
            let vm = this
            vm.$refs['auditingForm'].validate((valid) => {
                if (valid) {
                    if (vm.alliance.serviceRateType==vm.info.serviceRateType&&vm.alliance.serviceRate==vm.info.serviceRate) {
                        if (vm.info.status == 1) {
                            vm.auditing.type = 1
                        } else {
                            vm.auditing.type = 2
                        }
                        vm.auditingVisible = false
                    } else {
                        vm.auditingVisible = true
                    }
                } else {
                    vm.activeName = 'first'
                    vm.$message({
                        message: '请完善基本信息',
                        type: 'info'
                    })
                    return false
                }
            })
        },
    },
    created () {
//      this.getGroupList()
        this.gid = this.$route.query.gid
//      if (this.gid) {
            this.getCheckDishInfoById(this.gid)
//      } else {
//          this.$message({
//              type: 'error',
//              message: '错误的访问'
//          })
//      }
    }
}
</script>

<style lang="less">
.food-detail {
	.goods-card {
        margin: 20px;
        padding-bottom: 100px;
    }
    .el-tabs__header {
    	margin: 0;
    }
    .el-tabs__header {
    	width: 100%;
    	padding-left: 30px;
    	background: #fff;
    }
    .card-header  {
    	width: 800px;
    	height: 200px;
    	/*background: #1483D8;*/
    }
    .header-image {
    	width: 150px;
    	height: 150px;
    	float: left;
    	background-size: cover;
    	/*border-radius: 50%;*/
    	padding-left: 20px;
    }
    .header-middle {
    	width: 220px;
    	float: left;
    	padding-top: 5px;
    	margin-left: 30px;
    	margin-right: 20px;
    }
    .goods-name {
    	font-size: 24px;
    	padding-bottom: 30px;
    }
    .goods-number {
    	padding-top: 25px;
    }
    .attribute-name {
    	margin-top: 75px;
    }
    .card-table {
    	.table-header {
    		width: 100%;
    		height: 35px;
    		margin-bottom: 20px;
    		border-bottom: 1px solid #e6e7e8;
    	}
    }
    .table-set {
	    width: 100%;
	    margin-top: 20px;
	    border-collapse: collapse;
	    line-height: 20px;
	    th {
			padding: 20px 50px;
		}
		td {
			padding: 20px 50px;
		}
    }
    .cy-input {
        max-width: 350px;
    }
    .text-div {
    	margin-bottom: 50px;
    }
    .flex-center {
    	text-align: center;
    }
    .shop-footer{
        height: 60px; 
        width: 100%;
        z-index: 2019;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        box-shadow: 0px -2px 10px 0px rgba(115,134,173,0.2);
        .footer-btn {
            float: right;
            margin: 14px 30px 0 0;
        }
    }
}
</style>
