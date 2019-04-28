<template>
    <!-- 重置密码 -->
	<div class="re_password">
        <div class="pd-div">
            <el-card class="box-card">
                <el-row>
                    <el-col>
                        <h2 style="padding: 20px 50px;">重置密码</h2>
                        <el-form :model="info" :rules="rules" ref="info" label-width="120px" label-position="right" class="cen-from">
                            <el-form-item label="手机号" prop="mobile">
                                <el-input v-model="info.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="短信验证码" prop="smsVerificationCode">
                                <el-input v-model="info.smsVerificationCode" placeholder="请输入短信验证码">
                                    <template slot="append">
                                        <el-button type="primary" class="sms-btn" size="small" @click="getPublicVerificationCode(info.mobile, 2)" :disabled="codeState">{{codebtn}}</el-button>
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
                                <el-button @click="goLogin()">返回登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-card>
        </div>
	</div>
</template>

<script>
import MixinsVCode from '@/mixins/vCode'
import md5 from 'js-md5'
import {validatePhone} from '@/assets/js/elValidate.js'

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
                checkPass: '',
                roleType: ''
            },
            rules: {
                mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
                smsVerificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                checkPass: [{ required: true, validator: validatePass, trigger: 'blur' }]
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
                        mobile: vm.info.mobile,
                        smsVerificationCode: vm.info.smsVerificationCode,
                        newPassword: md5(vm.info.newPassword),
                        roleType: sessionStorage['roleType']
                    }
                    vm.$post(vm.$api.users.forgetPassword, param).then(resp => {
                        vm.$message.success('密码已重置')
                        vm.goLogin()
                    })
                } else {
                    return false
                }
            })
        },
        goLogin () {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
.re_password {
    width: 100%;
    height: 100%;
    background-color: rgb(14,22,46);
    // background-image: url('../../assets/images/suspension.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    .pd-div {
        padding-top: 200px;
        padding-left: 100px;
    }
    .box-card {
        width: 700px;
        margin: 0 auto; 
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
