<template>
    <!-- 修改密码 -->
	<div class="base_password">
        <div class="nub-top">
            <h2>修改密码</h2>
        </div>
		<!--   -->
		<el-card class="box-card">
            <el-row>
                <el-col>
                    <el-form :model="info" :rules="rules" ref="info" label-width="120px" label-position="right" class="cen-from">
                        <el-form-item label="手机号">
                            <div>{{info.mobile}}</div>
                        </el-form-item>
                        <el-form-item label="短信验证码" prop="smsVerificationCode">
                            <el-input v-model="info.smsVerificationCode" placeholder="请输入短信验证码">
                                <template slot="append">
                                    <el-button type="primary" class="sms-btn" size="small" @click="getVerificationCode(info.mobile, 101)" :disabled="codeState">{{codebtn}}</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="新密码:" prop="newPassword">
                            <el-input type="password" v-model="info.newPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码:" prop="checkPass">
                            <el-input type="password" v-model="info.checkPass"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit()">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
	</div>
</template>

<script>
import MixinsVCode from '@/mixins/vCode'
import md5 from 'js-md5'

export default {
    mixins: [MixinsVCode],
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.info.newPassword) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            info: {
                mobile: '',
                smsVerificationCode: '',
                newPassword: '',
                checkPass: ''
            },
            rules: {
                smsVerificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                checkPass: [{ validator: validatePass, trigger: 'blur' }]
            }
        }
    },
    components:{
        
    },
    methods: {
        onSubmit () {
            let vm = this
            vm.$refs['info'].validate((valid) => {
                if (valid) {
                    let param = {
                        accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                        mobile: vm.info.mobile,
                        smsVerificationCode: vm.info.smsVerificationCode,
                        newPassword: md5(vm.info.newPassword),
                        roleType: sessionStorage['roleType']
                    }
                    vm.$post(vm.$api.users.changePassword, param).then(resp => {
                        vm.$message.success('密码已修改')
                    })
                } else {
                    return false
                }
            })
        },
        getInfo () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$get(vm.$api.users.getInfo, param).then(resp => {
                vm.info.mobile = resp.mobile
            })
        },
    },
    created () {
        this.getInfo()
    }
}
</script>

<style lang="less">
.base_password {
    .box-card {
        margin: 20px;
    }
    .base-col {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #eee;        
    }
    .sms-btn {
        width: 85px;
    }
    .cen-from {
        max-width: 600px;
        margin: 0 auto;
    }
}
</style>
