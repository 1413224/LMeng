import Vue from 'vue'

Vue.filter("formatDate", function(value, relu) { //全局方法 Vue.filter()注册过滤器, 1*10 => 2018-01-01 09:01:01
    if (!value) return relu != undefined ? relu : '/'
    let timeStamp = +(value + '0000000000000').slice(0, 13)
    let date = new Date(timeStamp)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
});

Vue.filter("formatSecs", function(value, tUnit = '时', mUnit = '分') { //全局方法 Vue.filter()注册过滤器, 1*10 => 天时分
    if (!value || value < 1) return '未设置'
    let D = Math.floor(value / 3600 / 24)
    let h = Math.floor(value / 3600) % 24
    let m = Math.floor(value / 60) % 60
    let t = ''
    if (D) {
        t = D + ' 天 '
    }
    if (h) {
        t = t + h + ' ' + tUnit + ' '
    }
    if (m) {
        t = t + m + ' ' + mUnit + ' '
    }
    if (!t) {
        t = value + ' 秒 '
    }
    return t
})

Vue.directive("focus", {
    inserted:   function (el, option) {
        var  defClass  =  'el-input',
             defTag  =  'input';
        var  value  =  option.value  ||  true;
        if  (typeof  value  ===  'boolean')
            value  = {  cls:  defClass,  tag:  defTag };
        else
            value  = {  cls:  value.cls  ||  defClass,  tag:  value.tag  ||  defTag };
        if  (el.classList.contains(value.cls))
            el.getElementsByTagName(value.tag)[0].focus();
    }
})

Vue.prototype.formatDouble = function(value) {
    if (!value && value !== 0) return ''
    value = value.toString().replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
    value = value.toString().replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    value = value.toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    if (value.indexOf(".") < 0 && value != '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        value = parseFloat(value);
    }
    return value
}

Vue.prototype.formatInt = function(value) {
    if (!value && value !== 0) return ''
    value = value.toString().replace(/[^\d]/g, '')
    return value
}

Vue.prototype.formatDoublePlus = function(value, relu) {
    if (!value && value !== 0) return ''
    value = value.toString().replace(/[^-?\d.]/g, ""); //清除“数字”和“.”以外的字符   
    value = value.toString().replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    value = value.toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    let temp = 1
    if (value.indexOf("-") > -1) {
        temp = 2
    }
    if (value.indexOf(".") < 0 && value.toString().length > temp) { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        value = parseFloat(value);
    }
    if (parseFloat(value) + parseFloat(relu) < 0) {
        value = -relu
    }
    return value
}


Vue.prototype.formatDoubleRange = function(value, min = null, max = null) {
    if (!value && value !== 0) return ''
    value = value.toString().replace(/[^-?\d.]/g, ""); //清除“数字”和“.”以外的字符   
    value = value.toString().replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    value = value.toString().replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    let temp = 1
    if (value.indexOf("-") > -1) {
        temp = 2
    }
    if (value.indexOf(".") < 0 && value.toString().length > temp) { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        value = parseFloat(value);
    }
    if (min !==null && value < min) {
        value = min
    }
    if (max !==null && value > max) {
        value = max
    }
    return value
}

// 获取节点位置，进行滚动条定位
Vue.prototype.$goScrollTop = function (value, off, type = 'class') {
    let t
    (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollTop == 'number' ? t : document.body)
    let st = t.scrollTop
    let y = 0
    if (type === 'class') {
        y = document.getElementsByClassName(value)[0].getBoundingClientRect().y
    }
    let top = y + st + off
    console.log(top)
    try {
        document.body.scrollTop = top  // chrome  
    } catch (error) {}
    try {
        document.documentElement.scrollTop = top  // firefox
    } catch (error) {}
}