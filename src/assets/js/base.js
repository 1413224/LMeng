if (location.host == "health.cgc999.com") {
    window.winConst = {
        baseURL: '//health.cgc999.com/apigw', // 演示环境
        exceURL: 'https://health.cgc999.com/apigw/datacenter/param/v1/alliance/lottery/exportLotteryInfoById?accountId='
    }
} else if (location.host == "www.cgc999.com") {
    window.winConst = {
        baseURL: '//domain.cgc999.com/apigw', // 测试环境
        exceURL: 'http://domain.cgc999.com/apigw/datacenter/param/v1/alliance/lottery/exportLotteryInfoById?accountId='
    }
} else if (location.host == "cgc.cgc999.com") {
    window.winConst = {
        baseURL: '//cgc.cgc999.com/apigw', // 线上环境
        exceURL: 'https://cgc.cgc999.com/apigw/datacenter/param/v1/alliance/lottery/exportLotteryInfoById?accountId='
    }
} else {
    window.winConst = {
        baseURL: '//domain.cgc999.com/apigw', // 测试环境
        exceURL: 'http://domain.cgc999.com/apigw/datacenter/param/v1/alliance/lottery/exportLotteryInfoById?accountId='
    }
}