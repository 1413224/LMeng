<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><router-link to="/home">首页</router-link></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in crumbsData" :key="index">
                <router-link v-if="item.path" :to="item.path">{{item.label}}</router-link>
                <span v-else>{{item.label}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    computed: {
        crumbsData () {
            let  vm = this
            if (vm.$route.meta instanceof Array) {
                return vm.$route.meta
            }
            if (vm.$route.meta.crumbs) {
                return vm.$route.meta.crumbs
            }
            return []
        }
    }
}
</script>


<style lang="less">
.crumbs {
    background-color: #fff;
    padding: 26px 30px 20px;
    .el-breadcrumb__inner.is-link{
        color:#97a8be;
        font-weight: normal;
        transition:color .15s linear;
    }
    .el-breadcrumb__inner{
        color:#48576a !important;
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        font-weight: normal;
        text-decoration: none;
        -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
        transition: color .2s cubic-bezier(.645,.045,.355,1);
        color: #97a8be;
    }
    a:hover {
        color: #409EFF;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a{
        color:#48576a !important;
    }
}
</style>
