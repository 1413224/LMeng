<template>
    <div class="edit_quick">
        <div class="nub-top">
			<h2>编辑快捷权限组</h2>
		</div>
        <el-card class="box-card">
            <el-form :model="info" :rules="rules" ref="info" label-width="160px" style="max-width: 850px; margin: 0 auto; padding-right: 100px;">
                <el-form-item label="排序">
                    <el-input-number :min="0" v-model="info.displayOrder"></el-input-number>
                </el-form-item>
                <el-form-item label="组名" prop="name">
                    <el-input v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="info.remark"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="groups" ref="groups">
                    <c-tree @returnArr="returnArr" :initarr="initarr"></c-tree>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>    
</template>

<script>
import cTree from '@/components/base/cTree'

export default {
    data () {
        return {
            info: {
                displayOrder: 1,
                name: '',
                remark: '',
                groups: ''
            },
            rules: {
                name: [{ required: true, message: '请输入组名', trigger: 'blur' }],
                groups: [{ required: true, message: '请选择权限' }],
            },
            groups: [],
            initarr: [],
            gid: ''
        }
    },
    components: {
        cTree
    },
    methods: {
        onSubmit () {
            let vm = this
            vm.info.groups = vm.groups.join(',')
            vm.$refs['info'].validate((valid) => {
                if (valid) {
                    let param = {
                        accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                        displayOrder: vm.info.displayOrder,
                        name: vm.info.name,
                        remark: vm.info.remark,
                        groups: vm.info.groups,
                        rightsQuickId: vm.gid
                    }
                    let url = vm.gid ? vm.$api.power.editPermsQuick : vm.$api.power.addPermsQuick
                    vm.$post(url, param).then(resp => {
                        vm.$message.success('保存成功')
                        vm.$router.push({ path: 'quick'})
                    })
                } else {
                    return false
                }
            })
        },
        returnArr (arr) {
            this.groups = arr
            this.$refs["groups"].clearValidate()
        },
        getPermsQuickDetail (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                rightsQuickId: id
            }
            vm.$get(vm.$api.power.getPermsQuickDetail, param).then(resp => {
                vm.initarr = resp.groups
                vm.groups = resp.groups
                vm.info = {
                    displayOrder: resp.displayOrder,
                    name: resp.name,
                    remark: resp.remark
                }
            })
        }
    },
    created () {
        this.gid = this.$route.query.gid
        if (this.gid) {
            this.getPermsQuickDetail(this.gid)
        }
    }
}
</script>

<style lang="less">	
.edit_quick {
    .box-card {
        margin: 20px;
    }
}
</style>

