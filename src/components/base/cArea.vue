<template>
    <div>
        <el-cascader 
            :options="areaItem"
            v-model="areaArr" 
            @change="handleAreaItem(areaArr)"
            placeholder="所属区域" 
            change-on-select
            clearable
            style="width: 100%;">
        </el-cascader>
    </div>
</template>

<script>
import IndexedDB from '@/utils/indexedDB'
export default {
    model: {
      prop: 'areaArr',
      event: 'getAreaArr'
    },
    props: {
        initval: {
            type: [Boolean, Array],
            default: false
        },
        empty: {
            type: Boolean,
            default: false
        },
        areaArr: {
            type: Array,
            default: function () {
                return []
            }
        },
    },
    data () {
        return {
            // areaArr: [],
            areaItem: [],
            first: true
        }
    },
    methods: {
        handleAreaItem (arr, initArr) { // 区域动态加载数据
            this.$emit('getAreaArr', arr)
            if (arr.length > 3 || arr.length < 1) { // 只有4级,超过3级不再加载数据
                return
            }
            let vm = this
            let temp = []
            let tempSrc = '' // 保存运行的js代码字符串
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    for (let j in vm.areaItem) {
                        if (vm.areaItem[j].value === arr[0]) {
                            if (arr.length == 1 && vm.areaItem[j].children.length > 0) { // 已确认加载过数据,不再加载数据
                                return
                            }
                            temp[0] = j
                            tempSrc = `vm.areaItem[${j}]`
                            break
                        }
                    }
                } else if (i === 1) {
                    for (let j in vm.areaItem[temp[0]].children) {
                        if (vm.areaItem[temp[0]].children[j].value === arr[1]) {
                            if (arr.length == 2 && vm.areaItem[temp[0]].children[j].children.length > 0) { // 已确认加载过数据,不再加载数据
                                return
                            }
                            temp[1] = j
                            tempSrc += `.children[${j}]`
                            break
                        }
                    }
                } else if (i === 2) {
                    for (let j in vm.areaItem[temp[0]].children[temp[1]].children) {
                        if (vm.areaItem[temp[0]].children[temp[1]].children[j].value === arr[2]) {
                            if (arr.length == 3 && vm.areaItem[temp[0]].children[temp[1]].children[j].children.length > 0) { // 已确认加载过数据,不再加载数据
                                return
                            }
                            temp[2] = j
                            tempSrc += `.children[${j}]`
                            break
                        }
                    }
                }
            }
            let param = {
                'parentId': arr[arr.length-1],
                'status': 1,
                'loading': true
            }
            vm.$get(vm.$api.share.getArea, param).then(resp => {
                if (resp.length < 1) {
                    eval(tempSrc).children.push({
                        value: 'unll',
                        label: '已无下级分类',
                        disabled: true
                    })
                    resolve()
                    return
                } 
                let tempArr = resp.map(obj => {
                    if (arr.length >= 3) {
                        return {
                            value: obj.areaId,
                            label: obj.name
                        }
                    }
                    return {
                        value: obj.areaId,
                        label: obj.name,
                        children: []
                    }
                })
                eval(tempSrc).children = tempArr
                if (initArr && initArr.length && arr.length != initArr.length) {
                    arr.push(initArr[arr.length])
                    vm.handleAreaItem(arr, initArr)
                }
            })
        },
        areaItemOne (initArr) { // 区域第一级数据
            let vm = this
            let baseDB = new IndexedDB('enregion', 'getArea', 1, () => {
                baseDB.get('0', res => {
                    let indata = res
                    if (indata) {
                        vm.areaItem = JSON.parse(indata)
                        if (initArr&&initArr.length>0) {
                            vm.handleAreaItem([initArr[0]], initArr)
                        }
                        baseDB.close()
                        return
                    }
                    let param = {
                        'parentId': '0',
                        'status': 1,
                    }
                    vm.$get(vm.$api.share.getArea, param).then(resp => {
                        vm.areaItem = resp.map(obj => {
                            return {
                                value: obj.areaId,
                                label: obj.name,
                                children: []
                            }
                        })
                        if (initArr&&initArr.length>0) {
                            vm.handleAreaItem([initArr[0]], initArr)
                        }
                        baseDB.set(JSON.stringify(vm.areaItem), '0')
                        baseDB.close()
                    })
                })
            })
        }
    },
    created () {
        if (!this.initval) {
            this.areaItemOne()
        }
    },
    watch: {
        empty (val) {
            this.areaArr = []
        },
        initval (val) {
            if (val instanceof Array) {
                this.areaItemOne(val)
            }
        }
    }
}
</script>

