<script>
export default {
    data () {
        return {
            codeState: false,
            codebtn: '发送短信'
        }
    },
    methods: {
        getVerificationCode (mobile, type) { // 发送短信验证码
            let vm = this
            let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
            if (!regPhone.test(mobile)) {
                return
            }
            let param = {
                type: type,
                roleType: sessionStorage['roleType'],
                mobile: mobile,
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$post(vm.$api.users.getVerificationCode, param).then(resp => {
                vm.codeState = true
                vm.codebtn = 60
                let inter = setInterval(() => {
                    vm.codebtn -= 1
                    if (vm.codebtn === 0) {
                        clearInterval(inter)
                        vm.codebtn = '发送短信'
                        vm.codeState = false
                    }
                }, 1000)
            })
        },
        getPublicVerificationCode (mobile, type) { // 发送通用短信验证码
            let vm = this
            let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
            if (!regPhone.test(mobile)) {
                return
            }
            let param = {
                type: type,
                roleType: sessionStorage['roleType'],
                mobile: mobile
            }
            vm.$post(vm.$api.users.getPublicVerificationCode, param).then(resp => {
                vm.codeState = true
                vm.codebtn = 60
                let inter = setInterval(() => {
                    vm.codebtn -= 1
                    if (vm.codebtn === 0) {
                        clearInterval(inter)
                        vm.codebtn = '发送短信'
                        vm.codeState = false
                    }
                }, 1000)
            })
        }
    }
}
</script>
