<template>
    <div class="income-detail">
        <div class="nub-top">
			<h2>收益详情</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>消费信息</span>
            </div>
            <el-row class="income-cont">
                <el-col :span="8"><span>会员姓名：</span>{{info.realName}}</el-col>
                <el-col :span="8"><span>手机号：</span>{{info.mobile}}</el-col>
                <el-col :span="8"><span>消费时间：</span>{{info.createTime | formatDate}}</el-col>
                <el-col :span="8"><span>消费金额：</span>{{info.orderMoney}}</el-col>
                <el-col :span="8"><span>消费类型：</span>{{info.sourcetType==1?'本店消费':'他店消费'}}</el-col>
                <el-col :span="8"><span>消费企业：</span>{{info.shopName}}</el-col>
                <el-col :span="24"><span>消费区域：</span>{{info.countryName}}/{{info.provinceName}}/{{info.cityName}}/{{info.areaName}}</el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>收益信息</span>
            </div>
            <el-row class="income-cont">
                <el-col :span="8"><span>收益金额:</span>{{info.profitList[0].profit}}</el-col>
                <el-col :span="8">
                    <span>收益状态:</span>
						<el-tag
                            v-if="info.profitList[0].status" 
                            type="success"
                            disable-transitions
                            style="width: 46px;">可用</el-tag>
                        <el-tag 
                            v-else
                            type="danger"
                            disable-transitions
                            style="width: 46px;">冻结</el-tag>
                        
                </el-col>
                <el-col :span="8"><span>收益时间:</span>{{info.profitList[0].profitTime | formatDate}}</el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pid: '',
            detailData: [{name: 11}],
            info: {
                profitList: [{}]
            }
        }
    },
    methods: {
        getDetailById () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				profitId: vm.pid,
			}
			vm.$get(vm.$api.income.getDetailById, param).then(resp => {
				vm.info = resp
			})
        }
    },
    created () {
        this.pid = this.$route.query.pid
        if (this.pid) {
            this.getDetailById(this.pid)
        } else {
            this.$message({
                type: 'error',
                message: '错误的访问'
            })
        }
    }
}
</script>

<style lang="less">
.income-detail {
    font-size: 16px;
    .box-card {
        margin: 20px;
    }
    .income-cont {
        line-height: 40px;
        span {
            display: inline-block;
            width: 120px;
        }
    }
}
</style>

