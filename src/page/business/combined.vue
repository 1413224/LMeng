<template>
	<div class="combined">
		<div class="nub-top" style="height: 80px;">
			<h2>联合运营商</h2>
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>基本信息</span>
			</div>
			<el-row class="base-cont">
				
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.logo">
								<img v-if="info.logo" :src="info.logo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{info.name}}</p>
						</div>
					</div>
				</el-col>
				<!--<el-col :span="8"><span>企业编号：</span>{{info.number}}</el-col>-->
				<el-col :span="8"><span>企业名称：</span>{{info.name}}</el-col>
				<el-col :span="8"><span>企业简称：</span>{{info.enterpriseName}}</el-col>
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.blocLogo">
								<img v-if="info.blocLogo" :src="info.blocLogo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{info.blocName}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card" v-if="info.remark">
			<div slot="header" class="clearfix">
				<span>企业备注</span>
			</div>
			<div v-html="info.remark"></div>
		</el-card>
		<el-card class="box-card" v-if="info.directorName">
			<div slot="header" class="clearfix">
				<span>负责人信息</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.directorAvtar">
								<img v-if="info.directorAvtar" :src="info.directorAvtar.original" alt="" class="image">
							</div>
							<p style="font-size: 22px;font-weight: 700;">{{info.directorName}}</p>
							<p>{{info.directorMobile}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>企业联系方式</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="24"><span>企业电话：</span>{{info.tel}}</el-col>
				<el-col :span="24"><span>邮箱：</span>{{info.email}}</el-col>
				<el-col :span="24"><span>传真：</span>{{info.fax}}</el-col>
				<el-col :span="24"><span>官网：</span>{{info.website}}</el-col>
				<el-col :span="24">
					<span>所属区域：</span>{{info.countryName}}<i v-if="info.provinceName"> - </i>{{info.provinceName}}<i v-if="info.cityName"> - </i>{{info.cityName}}<i v-if="info.areaName"> - </i>{{info.areaName}}
					<i v-if="info.townName"> - {{info.townName}}</i>
					<i v-if="info.streetName"> - {{info.streetName}}</i>
				</el-col>
				<el-col :span="24"><span>经纬度：</span>({{info.lng}},{{info.lat}})</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			info: {}
		}
	},
	methods: {
		getAllianceInfo() {
			let vm = this
			let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']]
			}
			vm.$get(vm.$api.business.getAllianceInfo, param).then(resp => {
				vm.info = resp
			})
		}
	},
	created() {
		this.getAllianceInfo()
	}
}
</script>

<style lang="less">
.image{
	font-size: 18px;font-weight: 600;height: 80px;
}
.combined {
	.box-card {
		margin: 20px;
	}
	.base-cont {
		line-height: 40px;
		margin-left: 40px;
		span {
			display: inline-block;
			float: left;
			margin-right: 20px;
		}
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.img_flex {
		.image-div {
			width: 60px;
			height: 60px;
			float: left;
			margin-right: 40px;
			margin-bottom: 20px;
			vertical-align: middle;
			.image {
				width: 60px;
				height: 60px;
				float: left;
				vertical-align: middle;
			}
		}
	}
	.el-form--label-left .el-form-item__label {
		text-align: right;
		padding-right: 25px;
	}
	.gray {
		color: #595959;
	}
}
</style>