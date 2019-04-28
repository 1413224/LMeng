<template>
    <div class="page-container">
        <div class="page-cont">
            <img src="../assets/images/not_404.png" alt="" style="width: 100%;">
            <p class="mgn-top">抱歉，你访问的页面不存在</p>
            <router-link to="/manage">
                <el-button class="mgn-top" type="primary" size="small" round>返回首页</el-button>
            </router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
.page-container {
    // font-size: 50px;
    // text-align: center;
    // color: rgb(192, 204, 218);
    // padding-top: 300px;
    width: 400px;
    margin: 0 auto;
    .page-cont {
        padding-top: 300px;
        font-size: 18px;
        text-align: center;
        color: rgba(0,0,0,.45);
        .mgn-top {
            margin-top: 20px;
        }
    }
}
</style>