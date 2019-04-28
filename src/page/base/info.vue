<template>
  <div class="base-info">
    <div class="nub-top">
      <h2>账户信息</h2>
    </div>
    <el-card class="box-card">
      <div style="max-width: 850px; margin: 0 auto; padding-right: 100px;">
        <div class="main">
          <el-form label-width="160px">
            <el-form-item label="手机号" class="rela">
              <div class="pos-rel">
                <span>
                  {{info.mobile}}
                </span>
                <el-button @click="dialogVisible = true" type="text" icon="el-icon-edit-outline" style="font-size: 20px; padding-left: 10px;"></el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="main">
          <el-form :model="info" :rules="rules" ref="info" label-width="160px">
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="info.realname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="idcard">
              <el-input v-model="info.idcard" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="info.gender" :label="1" border size="medium">男</el-radio>
              <el-radio v-model="info.gender" :label="2" border size="medium">女</el-radio>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="info.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="logo">
              <el-upload id="logo-upload" class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequest">
                <div v-if="imageUrl" class="avatar">
                  <img :src="imageUrl" class="image">
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="info.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="QQ号" prop="qq">
              <el-input v-model="info.qq" placeholder="请输入QQ号"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat">
              <el-input v-model="info.wechat" placeholder="请输入微信号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-dialog title="设置手机号" :visible.sync="dialogVisible" width="460px">
      <el-form :model="mobile" :rules="mobRules" ref="mobile" class="visible">
        <el-form-item prop="newMobile">
          <el-input v-model="mobile.newMobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="smsVerificationCode" class="rela">
          <el-input v-model="mobile.smsVerificationCode" placeholder="验证码"></el-input>
          <el-button type="text" size="small" @click="getVerificationCode(mobile.newMobile, 103)" class="sms-pos" :disabled="codeState">{{codebtn}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeMobile" class="width100">确 认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  validateIdcard,
  validatePhone,
  validateQQ
} from '@/assets/js/elValidate.js'
import vCode from '@/mixins/vCode'
import { mapMutations } from 'vuex'
export default {
  mixins: [vCode],
  data() {
    return {
      info: {
        mobile: '',
        realname: '',
        idcard: '',
        gender: 1,
        nickname: '',
        email: '',
        qq: '',
        wechat: '',
        logo: ''
      },
      imageUrl: '',
      mobile: {
        newMobile: '',
        smsVerificationCode: ''
      },
      rules: {
        realname: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        logo: [{ required: true, message: '请上传logo', trigger: 'change' }],
        idcard: [
          { required: true, validator: validateIdcard, trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        nickname: [{ required: true, message: '昵称', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        qq: [{ required: true, validator: validateQQ, trigger: 'blur' }],
        wechat: [{ required: true, message: '请输入微信', trigger: 'blur' }]
      },
      mobRules: {
        newMobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        smsVerificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations('base', ['setAvarar']),
    imgRequest(obj) {
      // 图片上传
      let vm = this
      let temp = {
        file: obj.file,
        type: 'common',
        name: 'logo-upload'
      }
      this.$post(vm.$api.share.upImage, temp).then(resp => {
        vm.imageUrl = URL.createObjectURL(obj.file)
        vm.info.logo = resp.fileId
      })
    },
    getInfo() {
      let vm = this
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']]
      }
      vm.$get(vm.$api.users.getInfo, param).then(resp => {
        vm.imageUrl = resp.logo && resp.logo.original ? resp.logo.original : ''
        vm.info = resp
        vm.info.logo = resp.logo && resp.logo.imageId ? resp.logo.imageId : ''
      })
    },
    changeInfo() {
      let vm = this
      vm.$refs['info'].validate(valid => {
        if (valid) {
          let param = Object.assign({}, vm.info, {
            accountId: localStorage['userId' + sessionStorage['roleTypeId']]
          })
          vm.$post(vm.$api.users.changeInfo, param).then(resp => {
            localStorage['avatar' + sessionStorage['roleTypeId']] = vm.imageUrl
            vm.setAvarar(vm.imageUrl)
            vm.$message.success('保存成功')
          })
        } else {
          vm.$message('输入内容格式不对,请校正后再保存')
          return false
        }
      })
    },
    changeMobile() {
      let vm = this
      vm.$refs['mobile'].validate(valid => {
        if (valid) {
          let param = Object.assign({}, vm.mobile, {
            roleType: sessionStorage['roleType'],
            mobile: vm.info.mobile,
            accountId: localStorage['userId' + sessionStorage['roleTypeId']]
          })
          vm.$post(vm.$api.users.changeMobile, param).then(resp => {
            vm.$message.success('修改成功')
            vm.getInfo()
            vm.dialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    beforeUpload(file) {
      // 基于elementUi图片上传拦截过滤器
      const isIMG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isIMG) {
        this.$message.error('上传图片只能jpg、jpeg、gif、png')
      }
      if (!isLt10M) {
        this.$message.error('上传图片不能大小超过10M！')
      }
      return isIMG && isLt10M
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style lang="less">
.base-info {
  .box-card {
    margin: 20px;
  }
  .rela {
    position: relative;
    .sms-pos {
      position: absolute;
      top: 2px;
      right: 10px;
    }
  }
  .pos-rel {
    position: relative;
    top: -5px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    background-color: #f5f6fa;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>