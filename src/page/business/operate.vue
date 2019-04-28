<template>
	<div class="operate">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>拥有的运营商数量</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>运营商信息</h2>
		</div>
        <el-card class="box-card" v-for="(item, index) in items" :key="item.info">
            <div slot="header" class="clearfix">
                <span>{{ item.type | filterType}}管理中心信息</span>
            </div>
            <el-row class="operate-cont">
            	<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="item.logo">
								<img v-if="item.logo" :src="item.logo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{item.name}}</p>
						</div>
					</div>
				</el-col>
                <el-col :span="24"><span>管辖区域：</span><i v-if="item.countryName"></i>{{item.countryName}}<i v-if="item.provinceName"> - </i>{{item.provinceName}}<i v-if="item.cityName"> - </i>{{item.cityName}}<i v-if="item.areaName"> - </i>{{item.areaName}}</el-col>
                <el-col :span="24"><span>联系电话：</span>{{item.tel}}</el-col>
                <el-col :span="24"><span>详细地址：</span>{{item.address}}</el-col>
                <el-col :span="24"><span>邮箱：</span>{{item.email}}</el-col>
                <el-col :span="24"><span>官网：</span>{{item.website}}</el-col>
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
        	info: {},
        	items: [],
        	totalNums: 0,
        }
    },
    methods: {
    	getOperatorInfo () {
    		let vm = this
    		let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']]
			}
			vm.$get(vm.$api.business.getOperatorInfo, param).then(resp => {
                vm.items = resp.list
                vm.totalNums = resp.totalNums
			})
    	}
    },
    filters: {
		filterType (val) {
			switch (val) {
				case 1:
					return '国家级'
				case 2:
					return '省级'
				case 3:
					return '市级'
				case 4:
					return '区级'
				default:
					return '/'
			}
		}
	},
    created () {
    	this.getOperatorInfo()
    }
}
</script>

<style lang="less">
.operate {
    .box-card {
        margin: 20px;
    }
    .operate-cont {
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
	.image {
		width: 60px;
		height: 60px;
		float: left;
		margin-right: 25px;
		vertical-align: middle;
	}
}
</style>