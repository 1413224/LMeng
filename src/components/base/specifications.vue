<template>
  <div class="c-spec-ifi">
    <template>
      <table class="table-set" border="1px" bordercolor="#ebeef5" cellspacing="0px">
        <tr>
          <th v-for="(hItem, hIndex) in tableTh" :key="hIndex" :style="thWidth">{{hItem.name}}</th>
          <th v-for="(vhItem, vhIndex) in valueData" :key="vhIndex" :style="thWidth">
            <div>
              <span>{{vhItem.label}}</span>
            </div>
          </th>
        </tr>
        <tr v-for="(rItem, rIndex) in tableData" :key="rIndex" style="text-align: center;">
          <td v-for="(dItem, dIndex) in rItem.tdData" :key="dIndex" :rowspan="dItem.rowspan || 1">{{dItem.value}}</td>
          <td v-for="(vItem, vIndex) in rItem.valueData" :key="vIndex">
            <p>{{vItem.value}}</p>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {
  validatePositiveIntegerZero,
  validateMoney
} from '@/assets/js/elValidate'
export default {
  props: {
    upDeta: {
      type: Object,
      default: function() {
        return {
          skuAttribute: [],
          skuList: []
        }
      }
    },
    obtain: Boolean,
    goodsId: String
  },
  data() {
    return {
      draArray: [],
      tableTh: [],
      tableData: [],
      valueData: [
      	{
          label: '规格名称',
          name: 'skuName',
          value: '',
          rule: ''
        },
        {
          label: '库存',
          name: 'stock',
          value: '',
          rule: 'int'
        },
        {
          label: '原价',
          name: 'originPrice',
          value: '',
          rule: 'double'
        },
        {
          label: '条码',
          name: 'barcode',
          value: ''
        },
        {
          label: '重量(克)',
          name: 'weight',
          value: '',
          rule: 'double'
        },
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
        stock: [
          {
            required: true,
            validator: validatePositiveIntegerZero,
            trigger: 'blur'
          }
        ]
      },
      suspend: false // 监控必填提示
    }
  },
  computed: {
    thWidth() {
      let sum = this.tableTh.length + this.valueData.length + 1
      return {
        width: 100 / sum + '%'
      }
    }
  },
  components: {
    draggable
  },
  methods: {
    refreshTable(arr, ininData) {
      let vm = this
      vm.menuArr = []
      arr.forEach(obj => {
        let tempItem = [...new Set(obj.value)]
        tempItem = tempItem.filter(item => item)
        if (obj.name && tempItem.length > 0) {
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
        vm.tableTh.push({ name: obj.name })
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
        for (let i = 0; i < height.length; i++) {
          temp *= height[i]
          if (index % (row / temp) == 0) {
            tableDataItem.tdData.push({
              rowspan: row / temp,
              value:
                vm.menuArr[i].value[parseInt(index / (row / temp)) % height[i]]
            })
          }
          idArr.push(
            vm.menuArr[i].value[parseInt(index / (row / temp)) % height[i]]
          )
        }
        tableDataItem.id = idArr.join(',')
        if (ininData && ininData[tableDataItem.id]) {
          tableDataItem.valueData = ininData[tableDataItem.id]
        }
        vm.tableData.push(tableDataItem)
      }
    }
  },
  watch: {
    upDeta(val) {
      if (val.skuAttribute && val.skuAttribute.length > 0) {
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
      	let tempItem = {
          id: '',
          tdData: [],
          valueData: [
		        {
		          label: '库存',
		          name: 'stock',
		          value: val.skuList[0].stock,
		        },
		        {
		          label: '原价',
		          name: 'originPrice',
		          value: val.skuList[0].originPrice,
		        },
		        {
		          label: '条码',
		          name: 'barcode',
		          value: val.skuList[0].barcode
		        },
		        {
		          label: '重量(克)',
		          name: 'weight',
		          value: val.skuList[0].weight,
		        },
		      ]
        }
      	this.tableData = [tempItem]
      }
    },
  }
}
</script>

<style lang="less">
.c-spec-ifi {
  .top-margin {
    margin-top: 20px;
  }
  .left-margin {
    margin-left: 10px;
  }
  .div-flex {
    display: flex;
    justify-content: flex-start;
  }
  .wrap {
    flex-wrap: wrap;
  }
  .back-width {
    width: 300px;
  }
  .spec-back {
    border: 1px dashed #dcdfe6;
    padding: 20px;
  }
  .table-set {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    line-height: 40px;
  }
  .red-border {
    .el-input__inner {
      border: 1px solid #f56c6c;
    }
  }
}
</style>
