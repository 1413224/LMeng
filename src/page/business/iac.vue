<template>
	<div class="iac">
        <div class="nub-top" style="height: 80px;">
			<h2>工商信息</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>工商信息</span>
            </div>
            <el-row class="iac-cont">
                <el-col :span="24"><span>登记机关：</span>{{info.office}}</el-col>
                <el-col :span="24"><span>注册资本：</span>{{info.capital}}</el-col>
                <el-col :span="24"><span>注册地址：</span>{{info.address}}</el-col>
                <el-col :span="24"><span>工商注册号：</span>{{info.registrationNo}}</el-col>
                <el-col :span="24"><span>组织机构代码：</span>{{info.code}}</el-col>
                <el-col :span="24"><span>成立日期：</span>{{info.runDate | formatDate}}</el-col>
                <el-col :span="24"><span>营业期限：</span>{{info.deadline | formatDate}}</el-col>
                <el-col :span="24"><span>核准日期：</span>{{info.authorizedDate | formatDate}}</el-col>
                <el-col :span="24"><span>经营范围：</span>{{info.scope}}</el-col>
                <el-col :span="24"><span>营业执照编码：</span>{{info.businessLicense}}</el-col>
                <el-col :span="24">
                	<div class="iac-row">
	                    <div class="img_flex">
	                        <span>营业执照图片:</span>
	                        <div class="image-div" v-if="info.licenseImage">
	                            <img v-if="info.licenseImage.original" :src="info.licenseImage.original" alt="" class="image">
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
    	getIacInfo () {
    		let vm = this
    		let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']]
			}
			vm.$get(vm.$api.business.getIacInfo, param).then(resp => {
                vm.info = resp  
			})
    	}
    },
    created () {
    	this.getIacInfo()
    }
}
</script>

<style lang="less">
.iac {
    .box-card {
        margin: 20px;
    }
    .iac-cont {
        line-height: 40px;
        margin-left: 40px;
        span {
            display: inline-block;
            width: 120px;
            float: left;
        }
    }
    .flex_center {
	    padding-top: 20px;
	    display: flex;
	    justify-content: center;
	}
	.image {
		width: 60px;
		height: 60px;
		float: left;
		vertical-align: middle;
	}
}
</style>