<template>
    <div class="auditing-contrast">
        <div class="nub-top">
			<h2>审核信息</h2>
		</div>
        <el-card class="box-card">
            <el-table
            :data="changeList"
            border
            style="width: 100%">
                <el-table-column
                    prop="filedName"
                    label="修改内容"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="oldValue"
                    label="修改前">
                    <template slot-scope="scope">
                        <div v-html="scope.row.oldValue"></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="newValue"
                    label="修改后">
                    <template slot-scope="scope">
                        <div v-html="scope.row.newValue"></div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="shop-footer">
            <el-button type="primary" size="small" class="footer-btn" @click="goEdit(gid)">详情编辑</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            gid: '',
            changeList: []
        }
    },
    methods: {
        findGoodsChanges (id) {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: id
            }
            vm.$get(vm.$api.shop.findGoodsChanges, param).then(resp => {
                vm.changeList = resp.changeList.filter(obj => {
                    return obj
                })
            })
        },
        goEdit (id) {
            this.$router.push({ path: 'shop-auditing-edit', query: { gid: id }})
        }
    },
    created () {
        this.gid = this.$route.query.gid
        if (this.gid) {
            this.findGoodsChanges(this.gid)
        }
    }
}
</script>


<style lang="less" scoped>
.auditing-contrast {
    .box-card {
        margin: 20px;
    }
    .shop-footer{
        height: 60px; 
        width: 100%;
        z-index: 2019;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        box-shadow: 0px -2px 10px 0px rgba(115,134,173,0.2);
        .footer-btn {
            float: right;
            margin: 14px 30px 0 0;
        }
    }
}
</style>
