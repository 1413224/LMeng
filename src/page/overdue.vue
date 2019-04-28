<template>
    <div class="page-overdue">
        <div class="top">
            <img src="../assets/images/cgc-logo.png" alt="" class="image">
        </div>
        <div>
            <div class="page-cont">   
                <img src="../assets/images/overdue.png" alt="" style="width: 100%;">
                <h2>签约信息失效</h2>
                <p class="mgn-top">您的加盟信息已失效或被冻结，请联系签约的平台工作人员</p>
                <router-link to="/login">
                    <el-button class="mgn-top" type="info" size="small">返回登录</el-button>
                </router-link>
                <el-button class="mgn-top" type="primary" size="small" @click="openAlert">联系平台</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openAlert() {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$get(vm.$api.setting.getContactInfo, param).then(resp => {
                resp = resp || {}
                let temp = {
                    contact: resp.contact || '暂无信息',
                    name: resp.name || '暂无信息'
                }
                vm.$alert(temp.contact, temp.name, {
                    dangerouslyUseHTMLString: true
                });
            })
        }
    }
}
</script>


<style lang="less" scoped>
.page-overdue {
    background-color: #F0F2F5;
    height: 100%;
    .top {
        height: 64px;
        background-color: #fff;
        .image {
            margin: 21px 66px;
            height: 22px;
        }
    }
    .page-cont {
        width: 400px;
        padding-top: 200px;
        font-size: 18px;
        text-align: center;
        color: rgba(0,0,0,.45);
        margin: auto;
        .mgn-top {
            margin-top: 20px;
        }
    }
    .row-height {
        line-height: 30px;
    }
    // width: 400px;
    // margin: 0 auto;
}
</style>