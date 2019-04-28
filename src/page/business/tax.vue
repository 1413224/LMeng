<template>
	<div class="tax">
        <div class="nub-top" style="height: 80px;">
			<h2>税务信息</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>税务信息</span>
            </div>
            <el-row class="tax-cont">
                <el-col :span="24"><span>开票企业名称：</span>{{info.name}}</el-col>
                <el-col :span="24"><span>纳税识别号：</span>{{info.code}}</el-col>
                <el-col :span="24"><span>开户银行：</span>{{info.bank}}</el-col>
                <el-col :span="24"><span>银行卡号：</span>{{info.bankcard}}</el-col>
                <el-col :span="24"><span>开户银行支行信息：</span>{{info.subbranch}}</el-col>
                <el-col :span="24"><span>企业地址：</span>{{info.address}}</el-col>
                <el-col :span="24"><span>企业电话：</span>{{info.tel}}</el-col>
                <el-col :span="24">
                	<div class="goods-row">
	                    <div class="img_flex">
	                        <span>开票信息公章图:</span>
	                        <div class="image-div" v-if="info.img">
	                            <img v-if="info.img.original" :src="info.img.original" alt="" class="image">
	                        </div>    
	                    </div>
	                </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import {validateIdcard,validatePhone,validateQQ} from '@/assets/js/elValidate.js'
import vCode from '@/mixins/vCode'
export default {
    mixins: [vCode],
    data () {
        return {
        	info: {}
        }
    },
    methods: {
    	getTax () {
    		let vm = this
    		let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']]
			}
			vm.$get(vm.$api.business.getTax, param).then(resp => {
                vm.info = resp  
			})
    	}
    },
    created () {
    	this.getTax()
    }
}
</script>

<style lang="less">
.tax {
    .box-card {
        margin: 20px;
    }
    .tax-cont {
        line-height: 40px;
        margin-left: 40px;
        span {
            display: inline-block;
            width: 150px;
            float: left;
        }
    }
	.flex_center {
	    padding-top: 20px;
	    display: flex;
	    justify-content: center;
	}
	.right-div {
		float: right;
		color: rgba(0, 0, 0, 0.45);
		text-align: center;
		padding: 0 20px;
		margin: 10px;
		border-left: 1px solid #ccc;
		.num {
			font-size: 32px;
			color: #000;
		}
	}
	.img_flex {
		.image-div {
			float: left;
			.image {
				width: 60px;
				height: 60px;
				float: left;
			}
		}
	}
	
}
</style>