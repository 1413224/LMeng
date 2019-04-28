<template>
    <div class="checkbox-area">
        <div 
            v-for="item in areaData"
            :key="item.id"
            class="area-item">
            <el-popover
                placement="bottom-start"
                width="580"
                trigger="hover"
                :popper-options="{ 'style': 'margin: 0px;'}"
                :visible-arrow="false"
                popper-class="popper-area">
                <div style="line-height: 30px;">
                    <el-checkbox-group v-model="item.pick">
                        <el-checkbox
                            v-for="sub in item.subAreas"
                            :key="sub.id"
                            :label="sub.id"
                            @change="handleCheckedCitiesChange(item)"
                            style="width: 180px; margin-left: 10px;"
                            :disabled="!!sub.disabled">
                            {{sub.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
                <div slot="reference" class="item-view">
                    <el-checkbox
                        :indeterminate="item.pick.length>0 && item.pick.length < item.subAreas.length"
                        v-model="item.checkAll"
                        @change="handleCheckAllChange(item)"
                        :disabled="!!item.disabled">
                        {{item.name}}
                    </el-checkbox>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            areaData: [],
            srcAreaData: ''
        }
    },
    // created () {
    //     this.getSubAreaListById()
    // },
    methods: {
        handleCheckAllChange (item) {
            if (item.checkAll) {
                item.pick = item.subAreas.map(obj => obj.id)
            } else {
                item.pick = []
            }
        },
        handleCheckedCitiesChange (item) {
            if (item.pick.length === item.subAreas.length) {
                item.checkAll = true
            } else {
                item.checkAll = false
            }
        },
        setData (val = [], disableData = []) {
            let vm = this
            if (!vm.srcAreaData) {
                vm.getSubAreaListById(val, disableData)
                return
            }
            vm.areaData = JSON.parse(vm.srcAreaData) // 初始化空值
            vm.areaData = vm.areaData.map(obj => {
                obj.subAreas.map(sub => {
                    if(val.includes(sub.id)) {
                        obj.pick.push(sub.id)
                    }
                    if(disableData.includes(sub.id)) {
                        sub.disabled = true
                    }
                    return sub
                })
                if(disableData.includes(obj.id)) {
                    obj.disabled = true
                }
                if (obj.pick.length === obj.subAreas.length) {
                    obj.checkAll = true
                }
                return obj
            })
        },
        getData () {
            let vm = this
            let temp = {
                ids: [],
                names: []
            }
            vm.areaData.forEach(obj => {
                if (obj.pick.length > 0) {
                    temp.ids.push(obj.id)
                    temp.ids = temp.ids.concat(obj.pick)
                    let arr = obj.pick.map(id => {
                        return obj.subAreas.find(sub => sub.id === id).name
                    })
                    temp.names = temp.names.concat(arr)
                }
            })
            return temp
        },
        getSubAreaListById (val = [], disableData = []) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                id: '1',
                level: 2
            }
            vm.$get(vm.$api.share.getSubAreaListById, param).then(resp => {
                vm.areaData = resp.list.map(obj => {
                    obj.checkAll = false
                    obj.pick = []
                    return obj
                })
                vm.srcAreaData = JSON.stringify(vm.areaData)
                vm.setData(val, disableData)
            })
        }
    }
}
</script>

<style lang="less">
.checkbox-area {
    .area-item {
        float: left;
        .item-view {
            width: 200px;
            height: 40px;
            line-height: 40px;
            padding-left: 23px;
            &:hover {
                background-color: #ebeef5;
            }
        }
    }
}
.popper-area {
    margin: 0 !important;
}
</style>

