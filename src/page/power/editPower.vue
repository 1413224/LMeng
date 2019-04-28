<template>
    <div class="edit_quick">
        <div class="nub-top">
			<h2>编辑操作员</h2>
		</div>
        <el-card class="box-card">
            <el-form :model="info" :rules="rules" ref="info" label-width="160px" style="max-width: 850px; margin: 0 auto; padding-right: 100px;">
                <h3 class="ed_title">账户信息</h3>
                <el-form-item label="手机号码" :prop="aid ? '' : 'mobile'" >
                    <el-input v-model="info.mobile" placeholder="请输入手机号码" :disabled="!!aid"></el-input>
                </el-form-item>
                <el-form-item v-if="!aid" label="验证码" prop="smsVerificationCode" class="rela">
                    <el-input v-model="info.smsVerificationCode" placeholder="验证码"></el-input>
                    <el-button type="text" size="small" @click="valiMobile(info.mobile)" class="sms-pos" :disabled="codeState">{{codebtn}}</el-button>
                </el-form-item>
                <el-form-item label="账户名" :prop="aid ? '' : 'account'">
                    <el-input v-model="info.account" placeholder="请输入账户名" :disabled="!!aid" type="text"></el-input>
                </el-form-item>
                <el-form-item v-if="!aid" label="密码" prop="password">
                    <el-input v-model="info.password" placeholder="请输入密码" :type="info.password ? 'password' : 'text'"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="info.status" :label="1" border size="medium">启用</el-radio>
                    <el-radio v-model="info.status" :label="0" border size="medium">禁用</el-radio>
                </el-form-item>
                <h3 class="ed_title">账户权限</h3>
                <el-form-item label="快捷权限">
                    <el-select v-model="permsQuick" placeholder="请选择" @change="getPermsQuickDetail(permsQuick)">
                        <el-option
                            v-for="item in quickOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="groups" ref="groups">
                    <c-tree @returnArr="returnArr" :initarr="initarr"></c-tree>
                </el-form-item>
                <h3 class="ed_title">基本信息</h3>
                <el-form-item label="真实姓名">
                    <el-input v-model="info.realname" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idcard">
                    <el-input v-model="info.idcard" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="info.gender" :label="1" border size="medium">男</el-radio>
                    <el-radio v-model="info.gender" :label="2" border size="medium">女</el-radio>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="info.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="info.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="qq">
                    <el-input v-model="info.qq" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item label="微信号">
                    <el-input v-model="info.wechat" placeholder="请输入微信号"></el-input>
                </el-form-item>  
                <el-form-item label="身份证照">
                    <div class="flex-start rela">
                        <el-form-item ref="frontId" class="pad-bor">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
                                :show-file-list="false"
                                :data="{'type': 'frontId'}"
                                :before-upload="beforeUpload"
                                :http-request="imgRequest">
                                <img v-if="imageUrl.frontId" :src="imageUrl.frontId" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item ref="backId" class="pad-bor">                    
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
                                :show-file-list="false"
                                :data="{'type': 'backId'}"
                                :before-upload="beforeUpload"
                                :http-request="imgRequest">
                                <img v-if="imageUrl.backId" :src="imageUrl.backId" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <div class="pad-top">仅支持png、jpg等格式</div>
                        <span class="pos-a">上传正面</span>
                        <span class="pos-b">上传反面</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-top: 30px;" type="primary" @click="onSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>    
</template>

<script>
import cTree from '@/components/base/cTree'
import { validatePhone, validateIdcardNon, validateQQNon, validateUser } from '@/assets/js/elValidate'
import md5 from 'js-md5'
import vCode from '@/mixins/vCode'

export default {
    mixins: [vCode],
    data () {
        return {
            info: {
                account: '',
                password: '',
                status: 1,
                mobile: '',
                realname: '',
                idcard: '',
                gender: 1,
                nickname: '',
                email: '',
                qq: '',
                wechat: '',
                groups: '',
                smsVerificationCode: '',
                frontId: '',
                backId: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账户名', trigger: 'blur' },
                    { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                status: [{ required: true, message: '请选择状态', trigger: 'change' }],
                mobile: [
                    { required: true, validator: validatePhone, trigger: 'blur' },
                    { validator: validateUser, trigger: 'blur' }
                ],
                groups: [{ required: true, message: '请选择权限', trigger: 'blur' }],
                idcard: [{ validator: validateIdcardNon, trigger: 'blur' }],
                email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
                qq: [{ validator: validateQQNon, trigger: 'blur' }],
                smsVerificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            permsQuick: '',
            quickOptions: [],
            initarr: [],
            groups: [],
            aid: '',
            imageUrl: {
                frontId: '',
                backId: ''
            }
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
                    let param = Object.assign({}, vm.info, {accountId: localStorage['userId'+sessionStorage['roleTypeId']]})
                    if (vm.aid) {
                        param.childAccountId = vm.aid
                        Promise.all([
                            vm.$post(vm.$api.power.editChildrenInfo, param), 
                            vm.$post(vm.$api.power.changeAccountRights, param)
                        ]).then(resp => {
                            vm.$message.success('保存成功')
                            vm.$router.push({ path: 'power'})
                        })
                    } else {
                        param.password = md5(param.password)
                        vm.$post(vm.$api.power.addAccount, param).then(resp => {
                            vm.$message.success('保存成功')
                            vm.$router.push({ path: 'power'})
                        })
                    }
                } else {
                    vm.$nextTick(() => {
                        vm.$goScrollTop('el-form-item__error', -150)
                    })
                    return false
                }
            })
        },
        returnArr (arr) {
            this.groups = arr
            this.permsQuick = ''
            this.$refs["groups"].clearValidate()
        },
        getPermsQuickList () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                keyword: '',
                curPage: 1,
                pageSize: 1000
            }
            vm.$get(vm.$api.power.getPermsQuickList, param).then(resp => {
                vm.quickOptions = resp.list
            })
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
                vm.$refs["groups"].clearValidate()
            })
        },
        getChildrenInfo (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                childAccountId: id
            }
            vm.$get(vm.$api.power.getChildrenInfo, param).then(resp => {
                vm.info = Object.assign({}, vm.info, resp)
            })
        },
        getAccountRights (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                childAccountId: id
            }
            vm.$get(vm.$api.power.getAccountRights, param).then(resp => {
                vm.initarr = resp
                vm.groups = resp
            })
        },
        changeAccountStatus (status) {
            let vm = this   
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                childAccountId: vm.aid,
                status: status
            }
            vm.$post(vm.$api.power.changeAccountStatus, param).then(resp => {
                console.log(resp)
            })
        },
        valiMobile (value) {
            let vm = this
            let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
            if (!regPhone.test(value)) {
                return
            }
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']], 
                account: value, 
                roleType: sessionStorage['roleTypeId'], 
                loading: true
            }
            vm.$post(vm.$api.power.checkAccountIsset, param).then(resp => {
                if (!resp.status) {
                    vm.getVerificationCode(value, 104)
                }
            })
        },
        beforeUpload (file) { // 基于elementUi图片上传拦截过滤器
            const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isIMG) {
                this.$message.error('上传图片只能jpg、jpeg、gif、png')
            }
            if (!isLt10M) {
                this.$message.error('上传图片不能大小超过10M！')
            }
            return isIMG && isLt10M
        },
        imgRequest (obj) { // 图片上传
            let vm = this
            let temp = {
                file: obj.file,
                type: 'user',
                name: 'user_image'
            }
            this.$post(vm.$api.share.upImage, temp).then(resp => {
                vm.imageUrl[obj.data.type] = URL.createObjectURL(obj.file)
                vm.info[obj.data.type] = resp.fileId
                // vm.$refs[obj.data.type].clearValidate() // 手动清除验证
            }).catch(err => {
                console.log(err)
            })
        },
    },
    created () {
        this.getPermsQuickList()
        this.aid = this.$route.query.aid
        if (this.aid) {
            this.getChildrenInfo(this.aid)
            this.getAccountRights(this.aid)
        }
    },
    watch: {
        'info.status': function (val) {
            if (this.aid) {
                this.changeAccountStatus(val)
            } else {
                return
            }
        }
    }
}
</script>

<style lang="less">	
.edit_quick {
    .box-card {
        margin: 20px;
    }
    .ed_title {
        text-align: center;
        padding-bottom: 34px;
    }
    .rela {
        position: relative;
        .sms-pos {
            position: absolute;
            top: 2px;
            right: 10px;
        }
    }
    .pad-bor {
        padding: 5px;
    }
    .pos-a {
        font-size:14px;
        color: #90A2C7;
        position: absolute;
        left: 76px;
        top: 112px;
    }
    .pos-b {
        font-size:14px;
        color: #90A2C7;
        position: absolute;
        left: 290px;
        top: 112px;
    }
    .pad-top {
        padding-left: 9px;
        padding-top: 45px;
        font-size: 12px;
        line-height: 16px;
        color: #90a2c7;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 200px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width:auto;
        height:auto;
        max-width:100%;
        max-height:100%;
    }
    .flex-start {
        display: flex;
        justify-content: flex-start;
    }
}
</style>

