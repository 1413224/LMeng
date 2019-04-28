<template>
    <div class="settlement-detail">
        <div class="nub-top">
			<h2>结算详情</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>结算信息</span>
            </div>
            <el-row class="settlement-cont">
                <el-col :span="8"><span>订单货款：</span>{{info.income.orderPrice}}</el-col>
                <el-col :span="8"><span>分润：</span>{{info.income.profit}}</el-col>
                <el-col :span="8"><span>减免服务费：</span>{{info.income.reduceServerFee}}</el-col>
                <el-col :span="8"><span>服务费：</span>{{info.expenditure.serverFee}}</el-col>
                <el-col :span="8"><span>线上支付手续费：</span>{{info.expenditure.payTransactionFee}}</el-col>
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
            	income: [],
            	expenditure: []
            },
            orderSn: ''
        }
    },
    methods: {
        recordDetail () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				orderSn: vm.orderSn,
			}
			vm.$get(vm.$api.settlement.recordDetail, param).then(resp => {
				vm.info = resp
			})
        }
    },
    created () {
    	this.orderSn = this.$route.query.orderSn
    	this.recordDetail ()
//      if (this.pid) {
//          this.getDetailById(this.pid)
//      } else {
//          this.$message({
//              type: 'error',
//              message: '错误的访问'
//          })
//      }
    }
}
</script>

<style lang="less">
.settlement-detail {
    font-size: 16px;
    .box-card {
        margin: 20px;
    }
    .settlement-cont {
        line-height: 40px;
        span {
            display: inline-block;
            width: 150px;
        }
    }
}
</style>

