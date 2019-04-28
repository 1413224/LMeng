<template>
	<div class="food-detail">
		<div class="nub-top">
			<h2>餐品管理详情</h2>
		</div>
		<el-tabs  :tab-position="tabPosition" class="tabs-div" style="padding-left: 30px;">
		    <el-tab-pane label="商品信息"></el-tab-pane>
		    <el-tab-pane label="更多信息"></el-tab-pane>
		</el-tabs>
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
						<!--<td v-for="(tdItem, tdIndex) in skuDate" :key="tdIndex">{{tdItem.stock}}</td>-->
						<td>{{rItem.stock}}</td>
						<td>{{rItem.price}}</td>
						<td>{{rItem.originPrice}}</td>
						<td>{{rItem.barcode}}</td>
						<td>{{rItem.weight}}</td>
                	</tr>
                </table>
            </div>
		</el-card>
		<el-card class="goods-card">
			<div slot="header" class="clearfix">
                <span>更多信息</span>
            </div>
            <el-row>
                <el-form label-width="140px" :model="ruleForm" :rules="rules">
                    <el-form-item label="服务费率方式 :" prop="serviceRateType">
                        <el-radio v-model="ruleForm.serviceRateType" :label="0">和企业一致</el-radio>
                        <el-radio v-model="ruleForm.serviceRateType" :label="1">自定义设置</el-radio>
                    </el-form-item>
                    <el-form-item label="服务费率 :" prop="serviceRate">
                        <span v-if="!ruleForm.serviceRateType">{{info.serviceRate}}</span>
                        <el-input v-else v-model="ruleForm.serviceRate" placeholder="服务费率比例，0-1之间,如：0.05" class="cy-input"></el-input>
                    </el-form-item>
                    <div v-html="info.detail" style="text-align: center;max-width: 1200px;margin: 0 auto;"></div>
                    <div class="flex-center">
                        <el-button type="primary" @click="allianceVisible = true">保 存</el-button>
                    </div>
                </el-form>
            </el-row>
		</el-card>
	</div>
</template>

<script>
import cUeditor from '@/components/base/cUeditor'
export default {
    data () {
    	var validateServiceRate = (rule, value, callback) => {
            if (_this.ruleForm.serviceRateType) {
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
            tdData: [
            	{
                    value: '大份',
            	},{
                    value: '中份',
            	},{
                    value: '小份',
            	}
            ],
            valueData: [
                {
                    label: '例牌',
                    name: 'stock',
                    value: '',
                    rule: 'int'
                },{
                    label: '做法',
                    name: 'price',
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
            ruleForm: {
	          serviceRateType: 0,
	          serviceRate: ''
	        },
	        rules : {
	        	serviceRateType: [{ required: true, message: '请选择服务费率方式', trigger: 'change' }],
	        	serviceRate: [{ required: true, validator: validateServiceRate, trigger: 'blur' }],
	        }
        }
    },
    computed: {
        
    },
    components: {
    	
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
        getDishDetail (id) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				goodsId: id,
			}
			vm.$get(vm.$api.restaurant.getDishDetail, param).then(resp => {
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
                })
                console.log(vm.skuDate)
			})
        },
//      imgRequest (obj) { // 图片上传
//          let vm = this
//          let temp = {
//              file: obj.file,
//              type: 'goods',
//              name: 'logo-upload'
//          }
//          this.$post(vm.$api.share.upImage, temp).then(resp => {
//              vm.imageUrl = URL.createObjectURL(obj.file)
//              vm.base.logoImgId = resp.fileId
//          })
//      },
//      imgRequestArr (obj) { // 图册上传
//          let vm = this
//          let temp = {
//              file: obj.file,
//              type: 'goods',
//              name: 'more-upload'
//          }
//          this.$post(vm.$api.share.upImage, temp).then(resp => {
//              let item = {
//                  name: resp.fileId,
//                  url: resp.fileUrl
//              }
//              vm.base.thumbImgIds.push(item)
//          }).catch(err => {
//              vm.base.thumbImgIds = JSON.parse(JSON.stringify(vm.base.thumbImgIds)) // 上传失败时清除本地的图片缓存
//          })
//      },
//      onRemove (file, fileList) {
//          let vm = this
//          let name = file.name
//          for (let i in vm.base.thumbImgIds) {
//              if (vm.base.thumbImgIds[i].name === name) {
//                  vm.base.thumbImgIds.splice(i, 1)
//                  return
//              }
//          }
//      },
//      beforeUpload (file) { // 基于elementUi图片上传拦截过滤器
//          const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
//          const isLt10M = file.size / 1024 / 1024 < 10
//          if (!isIMG) {
//              this.$message.error('上传图片只能jpg、jpeg、gif、png')
//          }
//          if (!isLt10M) {
//              this.$message.error('上传图片不能大小超过10M！')
//          }
//          return isIMG && isLt10M
//      },
    },
    created () {
//      this.getGroupList()
        this.gid = this.$route.query.gid
//      if (this.gid) {
            this.getDishDetail(this.gid)
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
    }
    .el-tabs__header {
    	margin: 0;
    }
    .tabs-div {
    	width: 100%;
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
}
</style>