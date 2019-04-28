<template>
    <div>
        <el-cascader
            :options="optionsCate"
            @change="getCategoryList"
            v-model="cateIds"
            change-on-select
            :props="cateprops"
            style="width: 100%;"
        ></el-cascader>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'cateIds',
        event: 'getCateIds'
    },
    props: {
        initval: {
            type: [Boolean, Array],
            default: false
        },
        cateIds: {
            type: Array,
            default: function () {
                return []
            }
        },
    },
    data () {
        return {
            optionsCate: [],
            cateprops: {
                label: 'name',
                value: 'cateId'
            },
        }
    },
    methods: {
        getCategoryList (arr, initArr) {
            let vm = this  
            vm.$emit('getCateIds', arr)
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                type: 3,
                cateId: arr[arr.length - 1],
                loading: true
            }
            let index,temp = []
            temp[0] = vm.optionsCate
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0;j < temp[i].length; j++) {
                    if (temp[i][j].cateId == arr[i]) {
                        temp[i+1] = temp[i][j].children
                        index = temp[i][j]
                    }
                }
            }
			vm.$get(vm.$api.buy.getCategoryList, param).then(resp => {
                if (resp < 1) {
                    delete index.children
                    vm.optionsCate = JSON.parse(JSON.stringify(vm.optionsCate))
                } else {
                    index.children = resp.map(item => {
                        item.children = []
                        return item
                    })
                }
                if (initArr && initArr.length && arr.length != initArr.length) {
                    arr.push(initArr[arr.length])
                    vm.getCategoryList(arr, initArr)
                }
			})
        },
        getCategoryListOne (initArr) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                type: 3,
                status: 1,
                loading: true
			}
			vm.$get(vm.$api.buy.getCategoryList, param).then(resp => {
                vm.optionsCate = resp.map(item => {
                    item.children = []
                    return item
                })
                if (initArr&&initArr.length>0) {
                    vm.getCategoryList([initArr[0]], initArr)
                }
			})
        },
    },
    created() {
        if (!this.initval) {
            this.getCategoryListOne()
        }
    },
    watch: {
        initval (val) {
            if (val instanceof Array) {
                this.getCategoryListOne(val)
            }
        }
    }
}
</script>

