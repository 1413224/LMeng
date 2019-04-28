<template>
	<div class="tableData">
		<table class="table-set" border="1px" bordercolor="#ebeef5" cellspacing="0px">
	        <tr>
	            <th v-for="(hItem, hIndex) in tableTh" :key="hIndex" :style="thWidth">{{hItem.name}}</th>
	            <th v-for="(vhItem, vhIndex) in valueData" :key="vhIndex" :style="thWidth">
	                <div>
	                    <span>{{vhItem.label}}</span>
	                    <el-input v-model="vhItem.value" @keyup.native="clearNoNum(vhItem)">
	                        <el-button slot="append" icon="el-icon-sort" @click="refreshTable(draArray)"></el-button>
	                    </el-input>
	                </div>
	            </th>
	        </tr>
	        <tr v-for="(rItem, rIndex) in tableData" :key="rIndex">
	            <td v-for="(dItem, dIndex) in rItem.tdData" :key="dIndex" :rowspan="dItem.rowspan || 1">{{dItem.value}}</td>
	            <td v-for="(vItem, vIndex) in rItem.valueData" :key="vIndex">
	                <el-input v-if="vItem.name=='stock'||vItem.name=='price'" v-model="vItem.value" @keyup.native="clearNoNum(vItem)" :class="vItem.value===''&&suspend?'red-border':''"></el-input>
	                <el-input v-else v-model="vItem.value" @keyup.native="clearNoNum(vItem)"></el-input>
	            </td>
	        </tr>
	    </table>
	    <el-form v-else :model="info" :rules="infoRules" ref="infoForm" label-width="100px" style="max-width: 600px; margin-top: 20px;">
	        <el-form-item label="编码">
	            <el-input v-model="info.code" placeholder="请输入商品编码"></el-input>
	        </el-form-item>
	        <el-form-item label="条码">
	            <el-input v-model="info.barcode" placeholder="请输入商品条码"></el-input>
	        </el-form-item>
	        <el-form-item label="原价">
	            <el-input v-model="info.originPrice" placeholder="请输入商品原件"></el-input>
	        </el-form-item>
	        <el-form-item label="售价" prop="price">
	            <el-input v-model="info.price" placeholder="请输入商品售价"></el-input>
	        </el-form-item>
	        <el-form-item label="重量">
	            <el-input v-model="info.weight" placeholder="请输入商品重量">
	                <el-button slot="append">克</el-button>
	            </el-input>
	        </el-form-item>
	        <el-form-item label="库存" prop="stock">
	            <el-input v-model="info.stock" placeholder="请输入商品库存"></el-input>
	        </el-form-item>
	    </el-form>
	</div>
</template>

<script>
import {validatePositiveIntegerZero,validateMoney} from '@/assets/js/elValidate'
export default {
    props: {
        upDeta: {
            type: Object,
            default: function () {
                return {
                    skuAttribute: [],
                    skuList: []
                }
            }
        },
        obtain: Boolean
    },
    data () {
        return {
            draArray: [],
            tableTh: [],
            tableData: [],
            valueData: [
                {
                    label: '库存',
                    name: 'stock',
                    value: '',
                    rule: 'int'
                },{
                    label: '售价',
                    name: 'price',
                    value: '',
                    rule: 'double'
                },{
                    label: '原价',
                    name: 'originPrice',
                    value: '',
                    rule: 'double'
                },{
                    label: '编码',
                    name: 'code',
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
            menuArr: [], // 保存有效的目录
            checked: false,
            info: {
                code: '',
                barcode: '',
                weight: '',
                stock: '',
                originPrice: '',
                price: ''
            },
            infoRules: {
                price: [{ required: true, validator: validateMoney, trigger: 'blur' }],
                stock: [{ required: true, validator: validatePositiveIntegerZero, trigger: 'blur' }],
            },
            suspend: false, // 监控必填提示
        }
    },
    computed: {
        thWidth () {
            let sum = this.tableTh.length + this.valueData.length
            return {
                width: 100/sum + '%'
            }
        }
    },
    components: {
        draggable
    },
    methods: {
        addDraArray () {
            this.draArray.push({
                name: '',
                value: []
            })
        },
        delDraArray (index) {
            this.draArray.splice(index, 1)
        },
        addDraArrayItem (index) {
            this.draArray[index].value.push('')
        },
        delDraArrayItem (index, sIndex) {
            this.draArray[index].value.splice(sIndex, 1)
        },
        refreshTable (arr, ininData) {
            let vm = this
            vm.menuArr = []
            arr.forEach(obj => {
                let tempItem = [...new Set(obj.value)]
                tempItem = tempItem.filter(item => item)
                if (obj.name && tempItem.length>0) {
                    vm.menuArr.push({
                        name: obj.name,
                        value: tempItem
                    })
                }
            })
            let row = 1
            let height = []
            vm.tableTh = []
            vm.tableData = []
            vm.menuArr.forEach(obj => {
                vm.tableTh.push({name: obj.name})
                height.push(obj.value.length)
                row *= obj.value.length
            })
            for (let index = 0; index < row; index++) {
                let tableDataItem = {
                    id: '',
                    tdData: [],
                    valueData: JSON.parse(JSON.stringify(vm.valueData))
                }
                let temp = 1
                let idArr = []
                for(let i = 0; i < height.length; i++) {
                    temp *= height[i]
                    if (index%(row/temp) == 0) {
                        tableDataItem.tdData.push({
                            rowspan: row/temp,
                            value: vm.menuArr[i].value[parseInt(index/(row/temp))%height[i]],
                        })
                    }
                    idArr.push(vm.menuArr[i].value[parseInt(index/(row/temp))%height[i]])
                }
                tableDataItem.id = idArr.join(',')
                if (ininData && ininData[tableDataItem.id]) {
                    tableDataItem.valueData = ininData[tableDataItem.id]
                }
                vm.tableData.push(tableDataItem)
            }
        },
        editGoodsSkuInfoById (menuArr, dataArr) {
            let vm = this
            if (vm.checked) {
                let skuAttribute = menuArr.map((obj, index) => {
                    obj.displayOrder = index
                    return obj
                })
                vm.suspend = false
                let zero = false
                let skuList = dataArr.map(obj => {
                    let temp = {}
                    temp.skuName = obj.id
                    obj.valueData.forEach(item => {
                        temp[item.name] = item.value
                    })
                    if (temp.stock === '' || temp.price === '') {
                       vm.suspend = true
                    }
                    if (Number(temp.price) === 0) {
                        zero = true
                    }
                    return temp
                })
                if (vm.suspend) {
                    vm.$emit('getSkuData', false)
                    vm.$message({
                        message: '请完善库存和售价',
                        type: 'info'
                    })
                    return
                }
                if (zero) { // 售价0提示
                    vm.$emit('getSkuData', 0)
                    vm.$nextTick(() => {
                        vm.$emit('getSkuData', {
                            skuAttribute: JSON.stringify(skuAttribute),
                            skuList: JSON.stringify(skuList)
                        })
                    })
                    return
                }
                vm.$emit('getSkuData', {
                    skuAttribute: JSON.stringify(skuAttribute),
                    skuList: JSON.stringify(skuList)
                })
            } else {
                vm.$refs['infoForm'].validate((valid) => {
                    if (valid) {
                        if (Number(vm.info.price) === 0) {
                            vm.$emit('getSkuData', 0)
                            vm.$nextTick(() => {
                                vm.$emit('getSkuData', {
                                    skuAttribute: '[]',
                                    skuList: JSON.stringify([vm.info])
                                })
                            })
                            return
                        }
                        vm.$emit('getSkuData', {
                            skuAttribute: '[]',
                            skuList: JSON.stringify([vm.info])
                        })
                    } else {
                        vm.$emit('getSkuData', false)
                    }
                })
            }
        },
        clearNoNum (obj) {
            if (obj.rule == 'int') {
                obj.value = obj.value.toString().replace(/[^\d]/g,"");
            } else if (obj.rule == 'double') {
                obj.value = obj.value.toString().replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
                obj.value = obj.value.toString().replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
                obj.value = obj.value.toString().replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
                obj.value = obj.value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
                if(obj.value.indexOf(".")< 0 && obj.value !=""){ // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                    obj.value= parseFloat(obj.value);
                }
            }
        }
    },
	watch: {
		upDeta (val) {
            if (val.skuAttribute&&val.skuAttribute.length>0) {
                this.checked = true
                this.draArray = val.skuAttribute.map(obj => {
                    return {
                        name: obj.attributeName,
                        value: obj.skuValue.map(item => item.valueName)
                    }
                })
                let temp = {}
                val.skuList.forEach(obj => {
                    temp[obj.skuName] = JSON.parse(JSON.stringify(this.valueData))
                    temp[obj.skuName].map(item => {
                        item.value = obj[item.name] === 0 ? '0' : obj[item.name]
                        return item
                    })
                })
                this.refreshTable(this.draArray, temp)
            } else {
                this.checked = false
                let skuVal = val.skuList[0] || {}
                this.info = Object.assign({}, this.info, skuVal)
            }
        },
        obtain (val) { // 控制返回数据
            this.editGoodsSkuInfoById(this.menuArr, this.tableData)
        }
	}
}
</script>

<style lang="less">
.tableData {
	
}
</style>