<template>
    <div>
        <el-cascader
            :options="optionsCate"
            @change="getGoodsCategory"
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
                value: 'categoryId'
            },
        }
    },
    methods: {
        getGoodsCategory (arr, initArr) {
            let vm = this  
            vm.$emit('getCateIds', arr)
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
                if (initArr && initArr.length && arr.length != initArr.length) {
                    arr.push(initArr[arr.length])
                    vm.getGoodsCategory(arr, initArr)
                }
			})
        },
        getGoodsCategoryOne (initArr) {
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
                if (initArr&&initArr.length>0) {
                    vm.getGoodsCategory([initArr[0]], initArr)
                }
			})
        },
    },
    created() {
        if (!this.initval) {
            this.getGoodsCategoryOne()
        }
    },
    watch: {
        initval (val) {
            if (val instanceof Array) {
                this.getGoodsCategoryOne(val)
            }
        }
    }
}
</script>

