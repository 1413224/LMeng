// 基于elmentUi 的form表单验证
import {post} from '../../utils/http'

// 联系方式验证
export var validateTel = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入联系方式'))
    } else {
        let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
        let regTel = /^0\d{2,3}-\d{7,8}$/
        if (regPhone.test(value) || regTel.test(value)) {
            callback()
        } else {
            callback(new Error('联系方式格式不对,请输入正确的手机号或者区号+电话,如:010-88888888'))
        }
    }
}

// 手机验证
export var validatePhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入手机号码'))
    } else {
        let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
        if (regPhone.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的手机号码'))
        }
    }
}

// 身份证验证
export var validateIdcard = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入身份证号码'))
    } else {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('身份证输入格式错误'))
        }
    }
}

// 银行卡号验证
export var validateBankcard = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入银行账户'))
    } else {
        let reg = /^([1-9]{1})([0-9]{14,18})$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('银行卡号输入格式错误'))
        }
    }
} 

// QQ号验证
export var validateQQ = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入QQ号'))
    } else {
        let reg = /^[1-9][0-9]{4,11}$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('QQ号输入格式错误'))
        }
    }
}

// 身份证验证 | 非必填
export var validateIdcardNon = (rule, value, callback) => {
    if (value === '') {
        callback()
    } else {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('身份证输入格式错误'))
        }
    }
}

// QQ号验证 | 非必填
export var validateQQNon = (rule, value, callback) => {
    if (value === '') {
        callback()
    } else {
        let reg = /^[1-9][0-9]{4,11}$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('QQ号输入格式错误'))
        }
    }
}

// 手机验证 | 非必填
export var validatePhoneNon = (rule, value, callback) => {
    if (value === '') {
        callback()
    } else {
        let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/
        if (regPhone.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的手机号码'))
        }
    }
}

// 金额 0.00
export var validateMoney = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入金额'))
    } else {
        let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('金额输入格式错误'))
        }
    }
}

// 正整数
export var validatePositiveInteger = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入数值'))
    } else {
        let reg = /^[1-9]\d*$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正整数'))
        }
    }
}

// 整数 > 0
export var validatePositiveIntegerZero = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入数值'))
    } else {
        let reg = /^[1-9]\d*$/
        if (reg.test(value) || value === 0 || value === '0') {
            callback()
        } else {
            callback(new Error('请输入整数'))
        }
    }
}

// 用户是否已注册验证
export var validateUser = (rule, value, callback) => {
    if (value === '') {
        callback()
    } else {
        let param = {
            accountId: localStorage['userId' + sessionStorage['roleTypeId']], 
            account: value, 
            roleType: sessionStorage['roleTypeId'], 
            loading: true
        }
        post('/datacenter/body/v1/common/setting/checkAccountIsset', param).then(resp => {
            if (resp.status) {
                callback(new Error('该账号已经注册过'))
            } else {
                callback()
            }
        })
    }
}