import axios from 'axios'
// import Qs from 'qs'
import md5 from 'js-md5'
import { Message, Loading } from 'element-ui'

axios.defaults.timeout = 5000

axios.defaults.baseURL = window.winConst.baseURL
    // if (location.host == "health.cgc999.com") {
    //     axios.defaults.baseURL = '//health.cgc999.com/apigw' // 演示环境
    // } else if (location.host == "www.cgc999.com") {
    //     axios.defaults.baseURL = '//domain.cgc999.com/apigw' // 测试环境
    // } else if (location.host == "cgc.cgc999.com") {
    //     axios.defaults.baseURL = '//cgc.cgc999.com/apigw' // 线上环境
    // } else {
    //     axios.defaults.baseURL = '//domain.cgc999.com/apigw' // 测试环境
    // }


axios.defaults.retry = 3 // 请求超时,重新请求次数
axios.defaults.retryDelay = 1000 // 请求超时,重新请求间隔时间

var loadingSun = 0 // 并发请求的时候,解决Loading闪动问题
var load = false
var loadingInstance

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (loadingSun === 0 && !load) {
            loadingInstance = Loading.service({
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, 0.6)'
            })
        }
        loadingSun += 1
        let sign, token
        let timestamp = Math.round(new Date().getTime() / 1000)
        let type = 'application/json; charset=utf-8'
        let { 2: temp } = config.url.split('/')
        if (temp === 'public') { // public网口 的签名头设置,如: /*****/public/******
            sign = md5(config.url + timestamp)
            config.headers = {
                'Content-Type': type,
                'timestamp': timestamp,
                'sign': sign
            }
            return config
        } else {
            sign = md5(config.url + timestamp + localStorage['userId' + sessionStorage['roleTypeId']] + sessionStorage['roleType'] + localStorage['randomAccessCode' + sessionStorage['roleTypeId']])
            if (config.url == '/datacenter/v1/fileupload/image') { // 自定义图片上传
                type = 'Content-Type: multipart/form-data'
                let form = new FormData()
                for (let key in config.data) {
                    form.append(key, config.data[key])
                }
                config.url = config.url + '?type=' + config.data.type + '&name=' + config.data.name
                config.data = form
            }
            if (config.params && config.params.responseType === 'blob') { // 导出文件
                type = 'Content-Type: application/vnd.ms-excel'
                config.responseType = 'blob'
                delete config.params.responseType
            }
            token = localStorage['token' + sessionStorage['roleTypeId']]
            config.headers = {
                'Content-Type': type,
                'timestamp': timestamp,
                'sign': sign,
                'token': token
            }
            return config
        }
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        loadingSun -= 1
        if (loadingSun === 0) {
            if (loadingInstance) {
                loadingInstance.close()
            }
            load = false
        }
        if (response && !response.data.status) { // 下载流
            return response;
        }
        if (response.data.status == '40000') {
            $router.push('/overdue')
            return
        }
        if (response.data.status == '00000000') {
            return response.data;
        } else if (response.data.status == 'AREA-0013' || response.data.status == 'AREA-0017') {
            return Promise.reject('err')
        } else if (response.data.status.startsWith('apigw') || response.data.status.startsWith('utils') || response.data.status === '401') {
            Message({
                showClose: true,
                message: '您的登录信息已过期,请重新登录',
                type: 'error'
            })
            $router.push({ name: 'Login', params: { back: true } })
            return Promise.reject(response.data)
        } else {
            Message.warning(response.data.message)
            return Promise.reject('err')
        }
    },
    error => {
        loadingSun -= 1
        if (loadingSun === 0) {
            loadingInstance.close()
            load = false
        }
        let config = error.config;
        if (error.code == 'ECONNABORTED') { // 请求超时管理
            // If config does not exist or the retry option is not set, reject
            if (!config || !config.retry) return Promise.reject(error);
            // Set the variable for keeping track of the retry count
            config.__retryCount = config.__retryCount || 0;
            // Check if we've maxed out the total number of retries
            if (config.__retryCount >= config.retry) {
                // Reject with the error
                Message.error('请求超时')
                return Promise.reject(error);
            }
            // Increase the retry count
            config.__retryCount += 1;
            // Create new promise to handle exponential backoff
            let backoff = new Promise(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, config.retryDelay || 1);
            });
            // Return the promise in which recalls axios to retry the request
            return backoff.then(function() {
                config.url = config.url.substr(25) // 如果改了基本路由，这里也要改  目的：去除config.url的基本路由，保持sign的正确性
                return axios(config);
            });
        } else {
            let errMessage = ''
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        errMessage = '错误请求'
                        break;
                    case 401:
                        errMessage = '未授权，请重新登录'
                        break;
                    case 403:
                        errMessage = '拒绝访问'
                        break;
                    case 404:
                        errMessage = '请求错误,未找到该资源'
                        break;
                    case 405:
                        errMessage = '请求方法未允许'
                        break;
                    case 408:
                        errMessage = '请求超时'
                        break;
                    case 500:
                        errMessage = '服务器端出错'
                        break;
                    case 501:
                        errMessage = '网络未实现'
                        break;
                    case 502:
                        errMessage = '网络错误'
                        break;
                    case 503:
                        errMessage = '服务不可用'
                        break;
                    case 504:
                        errMessage = '网络超时'
                        break;
                    case 505:
                        errMessage = 'http版本不支持该请求'
                        break;
                    default:
                        errMessage = `连接错误${err.response.status}`
                }
            } else {
                errMessage = "连接到服务器失败"
            }
            Message.error(errMessage)
            return Promise.reject(error)
        }
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    load = params.loading ? params.loading : false
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    load = data.loading ? data.loading : false
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function patch(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.patch(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}