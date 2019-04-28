<template>
	<div class="login-body">
		<div class="cont">
			<div class="login-img">
				<div class="login-title">
					<h2>CGC全球智慧产业联盟</h2>
					<h1>联盟企业管理系统</h1>
					<p>INTELLIGENT MANAGEMENT SYSTEM</p>
				</div>
				<img src="../assets/images/cgc-logo.png" alt="" class="login-logo">
			</div>
			<div class="main">
				<h2>您好！</h2>
				<p class="describe">欢迎来到CGC联盟企业管理系统，在使用过程中如有疑问请咨询成高成官方客服。</p>
				<el-form label-position="top" :model="account" :rules="rules" ref="account" class="login-form" @keyup.enter.native="login">
					<el-form-item prop="name" label="账号">
						<el-input prefix-icon="fa fa-user-o" autofocus v-model="account.name" placeholder="账号" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item prop="passwd" label="密码">
						<el-input prefix-icon="fa fa-unlock-alt" type="password" v-model="account.passwd" placeholder="密码" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-col :span="12">
							<el-checkbox v-model="remember">记住密码</el-checkbox>
						</el-col>
						<el-col :span="12">
							<router-link to="/re-password">
								<el-button type="text" class="forget">忘记密码</el-button>
							</router-link>
						</el-col>
					</el-form-item>
					<el-form-item>
						<el-button @click="login" class="btn-login">登录</el-button>
					</el-form-item>
				</el-form>
				<div class="bottom">联系电话：400-8866805</div>
			</div>
		</div>
		<div class="footer">
			<p>广东成高成网络技术有限公司</p>
			<p>© CopyRight 2017-{{(new Date()).getFullYear()}} 粤ICP备17041809号-1</p>
		</div>
	</div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data() {
    return {
      remember: true,
      account: {
        name: '',
        passwd: ''
      },
      rules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      let vm = this
      vm.$refs['account'].validate(valid => {
        if (valid) {
          let param = Object.assign({}, vm.account)
          param.roleType = sessionStorage['roleType']
          if (
            param.passwd !==
            localStorage['passwd' + sessionStorage['roleTypeId']]
          ) {
            param.passwd = md5(param.passwd)
          }
          vm.$post(vm.$api.users.login, param).then(resp => {
            // 登录时，清空之前的权限，避免权限重复
            this.$store.commit('users/setRole', [])
            this.$router.options.routes[0].children = []
            this.$router.addRoutes(this.$router.options.routes)
            // 权限管理,加上首页权限
            localStorage['accountType' + sessionStorage['roleTypeId']] =
              resp.accountType
            localStorage['roles' + sessionStorage['roleTypeId']] = resp.rightGroupCodes + ',' + resp.applicationGroupCodes
            localStorage['userId' + sessionStorage['roleTypeId']] = resp.id
            localStorage['avatar' + sessionStorage['roleTypeId']] = resp.avatar || ''
            localStorage['token' + sessionStorage['roleTypeId']] = resp.token
            localStorage['time' + sessionStorage['roleTypeId']] = resp.timestamp
            localStorage['randomAccessCode' + sessionStorage['roleTypeId']] =
              resp.randomAccessCode
            localStorage['account' + sessionStorage['roleTypeId']] =
              resp.account
            if (vm.remember) {
              localStorage['name' + sessionStorage['roleTypeId']] = param.name
              localStorage['passwd' + sessionStorage['roleTypeId']] =
                param.passwd
            } else {
              localStorage['name' + sessionStorage['roleTypeId']] = ''
              localStorage['passwd' + sessionStorage['roleTypeId']] = ''
            }
            vm.$router.push('/manage')
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    let vm = this
    if (
      localStorage['name' + sessionStorage['roleTypeId']] &&
      localStorage['passwd' + sessionStorage['roleTypeId']]
    ) {
      this.account.name = localStorage['name' + sessionStorage['roleTypeId']]
      this.account.passwd =
        localStorage['passwd' + sessionStorage['roleTypeId']]
    }
  }
}
</script>

<style lang="less">
.login-body {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login_bg.jpg');
  background-size: 100% 100%;
  position: relative;
  .cont {
    width: 940px;
    height: 580px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
    border-radius: 4px;
    .login-img {
      width: 502px;
      height: 100%;
      float: left;
      background-image: url('../assets/images/login_img.jpg');
      background-size: 100% 100%;
      color: #fff;
      position: relative;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      .login-title {
        padding: 34px 0 0 36px;
        h1 {
          font-size: 36px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 70px;
        }
        h2 {
          font-size: 24px;
        }
      }
      .login-logo {
        height: 30px;
        position: absolute;
        left: 44px;
        bottom: 46px;
      }
    }
    .main {
      width: 338px;
      height: calc(~'100% - 94px');
      float: left;
      padding: 62px 50px 32px;
      position: relative;
      .describe {
        font-size: 12px;
        color: rgba(159, 169, 179, 1);
        line-height: 20px;
      }
      .login-form {
        padding-top: 20px;
        .el-form-item.is-required .el-form-item__label:before {
          display: none;
        }
        .el-form--label-top .el-form-item__label {
          padding: 0;
        }
        .btn-login {
          width: 100%;
          height: 48px;
          color: #fff;
          background: linear-gradient(
            315deg,
            rgba(12, 74, 234, 0.99) 0%,
            rgba(57, 115, 255, 0.9) 100%
          );
        }
        .forget {
          float: right;
        }
      }
      .bottom {
        width: 338px;
        font-size: 12px;
        color: rgba(160, 170, 180, 1);
        text-align: center;
        position: absolute;
        bottom: 32px;
      }
    }
  }
  .footer {
    position: absolute;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    line-height: 20px;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
