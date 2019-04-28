<template>
    <div>
        <el-tree
            lazy
            :load="loadNode"
            show-checkbox
            node-key="groupId" 
            ref="tree"
            :props="defaultProps" 
            @check="checkChange" 
            :check-strictly="true">
        </el-tree>
    </div>
</template>

<script>
export default {
    props: {
        initarr: {
            type: Array,
            default: function () {
                return []
            } 
        }
    },
    data () {
        return {
            defaultProps: {
                children: 'zones',
                label: 'groupName'
            },
            arr: [],
            count: 1
        }
    },
    methods: {
        loadNode(node, resolve) {
            let vm = this
            if (node.level === 0) {
                vm.getGroupList().then(resp => {
                    return resolve(resp)
                })
            } else {
                vm.getGroupList(node.data.groupId).then(resp => {
                    return resolve(resp)
                })
            }
        },
        checkChange (obj) {
            let vm = this
            let gid = obj.groupId
            let index = vm.arr.indexOf(gid)
            let curNode = vm.$refs.tree.getNode(obj)
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                roleType: sessionStorage['roleTypeId'],
                groupId: gid
            }
            vm.$get(vm.$api.power.getGroupChildList, param).then(resp => {
                if (index === -1) {
                    for (let item of resp) {
                        let tempIndex = vm.arr.indexOf(item.groupId)
                        if (tempIndex === -1) {
                            vm.arr.push(item.groupId)
                        }
                    }
                    vm.selectAdd(curNode)
                } else {
                    for (let item of resp) {
                        let tempIndex = vm.arr.indexOf(item.groupId)
                        if (tempIndex > -1) {
                            vm.arr.splice(tempIndex, 1)
                        }
                    }
                    vm.selectDel(curNode)
                }
                vm.$refs.tree.setCheckedKeys(vm.arr)
                vm.$emit('returnArr', vm.arr)
            })
        },
        selectDel (curNode) { // 取消父节点选中
            let vm = this
            if (curNode.level == 1) return
            let temp = curNode.parent
            for (let item of temp.childNodes) {
                if (item.checked) {
                    return
                }
            }
            temp.checked = false
            let tempIndex = vm.arr.indexOf(temp.data.groupId)
            if (tempIndex > -1) {
                vm.arr.splice(tempIndex, 1)
            }
            vm.selectDel(temp)
        },
        selectAdd (curNode) { // 选中父节点
            let vm = this
            if (curNode.level == 1) return
            let temp = curNode.parent
            let tempIndex = vm.arr.indexOf(temp.data.groupId)
            if (tempIndex === -1) {
                vm.arr.push(temp.data.groupId)
            }
            vm.selectAdd(temp)
        },
        getGroupList (id = '') {
            let vm = this
            return new Promise ((resolve, reject) => {
                let param = {
                    accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                    roleType: sessionStorage['roleTypeId'],
                    parentId: id
                }
                vm.$get(vm.$api.power.getGroupList, param).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    watch: {
        initarr: function (val) {
            this.arr = val
            this.$refs.tree.setCheckedKeys(val)
        }
    }
}
</script>

