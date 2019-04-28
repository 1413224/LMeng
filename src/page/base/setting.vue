<template>
	<!-- 通用设置 -->
	<div class="base-setting">
		<div class="nub-top">
			<h2>通用设置</h2>
		</div>
		<div class="cont clear">
			<div class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon1.png"/>
					</div>
					<div class="right">
						<p class="card-title">商品退货时间</p>
						<p class="subtitle">通用退货时间</p>
						<p class="label">{{info.returnDeadline | formatSecs}}</p>
					</div>
				</div>
				<el-button @click="timeVisible = true" type="text" icon="el-icon-edit" class="card-btn" v-has="'time-setting'">设置</el-button>
			</div>
			<div class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon3.png"/>
					</div>
					<div class="right">
						<p class="card-title">企业税率</p>
						<p class="subtitle">通用企业税率</p>
						<p class="label">{{info.taxRate}}</p>
					</div>
				</div>
				<el-button @click="taxVisible = true" type="text" icon="el-icon-edit" class="card-btn" v-has="'rate-setting'">设置</el-button>
			</div>
			<div class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon5.png"/>
					</div>
					<div class="right">
						<p class="card-title">企业服务费</p>
						<p class="subtitle">通用服务费率</p>
						<p class="label">{{info.serviceRate}}</p>
					</div>
				</div>
				<el-button type="text" icon="el-icon-edit" class="card-btn disable" disabled>不可编辑</el-button>
			</div>
			<div v-if="info.especialChain" class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon6.png"/>
					</div>
					<div class="right">
						<p class="card-title">优惠政策</p>
						<p class="subtitle">新店优惠政策</p>
					</div>
				</div>
				<el-button type="text" icon="el-icon-search" @click="goDetail(baseId)" class="card-btn" v-has="'base-separate'">查看详情</el-button>
			</div>
			<div v-if="info.isDisplay ==1 || info.isDisplay ==2" class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon2.png"/>
					</div>
					<div class="right">
						<p class="card-title">产业联盟</p>
						<!--<p class="subtitle">已签约</p>-->
						<p class="label">{{info.isDisplay==1 ? '显示' : '不显示'}}</p>
					</div>
				</div>
				<div class="switch-btn card-btn">
					<el-switch
					  @change="openConfirm(info.isDisplay, changeAllianceDisplayStatus)"
					  v-has="'alliance-setting'"
					  v-model="info.isDisplay"
					  :active-value="1"
					  :inactive-value="2"
					  active-text="显示">
					</el-switch>
				</div>
				
				<!--<template>
				  <el-button type="text" @click="openConfirm(info.isDisplay, changeAllianceDisplayStatus)" icon="el-icon-edit" class="card-btn">切换签约状态</el-button>
				</template>-->
			</div>
			<div v-if="info.isChainsDisplay ==1 || info.isChainsDisplay ==2" class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/setting-icon4.png"/>
					</div>
					<div class="right">
						<p class="card-title">联营企业</p>
						<!--<p class="subtitle">已签约</p>-->
						<p class="label">{{info.isChainsDisplay==1 ? '显示' : '不显示'}}</p>
					</div>
				</div>
				<div class="switch-btn card-btn">
					<el-switch
					  @change="openConfirm(info.isChainsDisplay, changeAllianceChainsDisplayStatus)"
					  v-has="'chains-setting'"
					  v-model="info.isChainsDisplay"
					  :active-value="1"
					  :inactive-value="2"
					  active-text="显示">
					</el-switch>
				</div>
				<!--<template>
				  <el-button type="text" @click="openConfirm(info.isChainsDisplay, changeAllianceChainsDisplayStatus)" icon="el-icon-edit" class="card-btn">切换签约状态</el-button>
				</template>-->
			</div>
			 <div class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/exchange-goods.png"/>
					</div>
					<div class="right">
						<p class="card-title">商品换货时间</p>
						<p class="subtitle">商品换货时间</p>
						<p class="label">{{info.barterDeadline | formatSecs}}</p>
					</div>
				</div>
				<el-button @click="barterVisible = true" type="text" icon="el-icon-edit" class="card-btn" v-has="'time-setting'">设置</el-button>
			</div>
			<div class="card">
				<div class="top">
					<div class="card-icon">
						<img src="../../assets/images/icon/repair-icon.png"/>
					</div>
					<div class="right">
						<p class="card-title">商品维修时间</p>
						<p class="subtitle">商品维修时间</p>
						<p class="label">{{info.warrantyDeadline | formatSecs}}</p>
					</div>
				</div>
				<el-button @click="warrantyVisible = true" type="text" icon="el-icon-edit" class="card-btn" v-has="'time-setting'">设置</el-button>
			</div> 
		</div>
		<el-dialog title="设置退货时间" :visible.sync="timeVisible" width="460px">
			<el-form>
				<el-form-item>
					<el-input v-model="day" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="day=day.toString().replace(/[^\d]/g,'')">
						<template slot="append">天</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="yes" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="yes=yes.toString().replace(/[^\d]/g,'')">
						<template slot="append">时</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="min" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="min=min.toString().replace(/[^\d]/g,'')">
						<template slot="append">分</template>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeReturnDeadline">确 认</el-button>
				<el-button @click="timeVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="设置商品换货时间" :visible.sync="barterVisible" width="460px">
			<el-form>
				<el-form-item>
					<el-input v-model="day" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="day=day.toString().replace(/[^\d]/g,'')">
						<template slot="append">天</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="yes" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="yes=yes.toString().replace(/[^\d]/g,'')">
						<template slot="append">时</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="min" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="min=min.toString().replace(/[^\d]/g,'')">
						<template slot="append">分</template>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeBarterDeadline">确 认</el-button>
				<el-button @click="barterVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="设置维修时间" :visible.sync="warrantyVisible" width="460px">
			<el-form>
				<el-form-item>
					<el-input v-model="day" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="day=day.toString().replace(/[^\d]/g,'')">
						<template slot="append">天</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="yes" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="yes=yes.toString().replace(/[^\d]/g,'')">
						<template slot="append">时</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="min" placeholder="请输入0-9字符组成的数值" @focus="focus($event)" @keyup.native="min=min.toString().replace(/[^\d]/g,'')">
						<template slot="append">分</template>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeWarrantyDeadline">确 认</el-button>
				<el-button @click="warrantyVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="设置通用税率" :visible.sync="taxVisible" width="460px">
			<el-form>
				<el-form-item>
					<el-input v-model="tax" placeholder="通用税率范围: 0.00~0.99" @focus="focus($event)"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeTaxRate">确 认</el-button>
				<el-button @click="taxVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="扫码进入线上店铺" :visible.sync="qrcodeVisible" width="460px">
			<div id="maxqrcode" class="label" ref="maxqrcode"></div>
		</el-dialog>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2'
	
export default {
    data() {
        return {
        	Alliance: true,
        	chains: true,
            info: {
                returnDeadline: "",
                serviceRate: "",
                taxRate: "",
                isDisplay: "",
                isChainsDisplay: "",
                barterDeadline: "",
                warrantyDeadline: "",
            },
            timeVisible: false,
            barterVisible: false,
            warrantyVisible: false,
            day: 0,
            yes: 0,
            min: 0,
            taxVisible: false,
            tax: "",
            statusVisible:false,
            qrcodeVisible:false,
            qrcodeUrl:'',
        };
    },
    components: {
        QRCode
    },
    methods: {
        getCommonSetting() {
            let vm = this;
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']]
            };
            vm.$get(vm.$api.setting.getCommonSetting, param).then(resp => {
            	vm.info = resp;
            });
        },
        //	修改联盟企业通用退货时间
        changeReturnDeadline() {
            let vm = this;
            let time = vm.day * 3600 * 24 + vm.yes * 3600 + vm.min * 60;
            if (isNaN(time) || time < 0) {
                this.$message({
                    type: "info",
                    message: "请输入正确的数值"
                });
                return;
            }
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
                returnDeadline: time
            };
            vm.$post(vm.$api.setting.changeReturnDeadline, param).then(resp => {
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
                vm.getCommonSetting();
                vm.timeVisible = false;
            });
        },
        //	修改联盟企业通用换货时间
        changeBarterDeadline() {
            let vm = this;
            let time = vm.day * 3600 * 24 + vm.yes * 3600 + vm.min * 60;
            if (isNaN(time) || time < 0) {
                this.$message({
                    type: "info",
                    message: "请输入正确的数值"
                });
                return;
            }
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
                barterDeadline: time
            };
            vm.$post(vm.$api.setting.changeBarterDeadline, param).then(resp => {
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
                vm.getCommonSetting();
                vm.barterVisible = false;
            });
        },
        //	修改维修时间
        changeWarrantyDeadline() {
            let vm = this;
            let time = vm.day * 3600 * 24 + vm.yes * 3600 + vm.min * 60;
            if (isNaN(time) || time < 0) {
                this.$message({
                    type: "info",
                    message: "请输入正确的数值"
                });
                return;
            }
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
                warrantyDeadline: time
            };
            vm.$post(vm.$api.setting.changeWarrantyDeadline, param).then(resp => {
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
                vm.getCommonSetting();
                vm.warrantyVisible = false;
            });
        },
        //	修改企业税率
        changeTaxRate() {
            let vm = this;
            if (0 > vm.tax || vm.tax >= 1) {
        		this.$message({
          			type: 'info',
          			message: '请输入正确的税率范围|如: 0.00 ~ 0.99'
        		})
        	return false
      		} else {
		        let param = {
		          accountId: localStorage['userId' + sessionStorage['roleTypeId']],
		          taxRate: vm.tax
		        }
	            vm.$post(vm.$api.setting.changeTaxRate, param).then(resp => {
	                this.$message({
	                    type: "success",
	                    message: "修改成功"
	                });
	                vm.getCommonSetting();
	                vm.taxVisible = false;
	            });
	       }
        },
        focus(event) {
            event.currentTarget.select();
        },
        goDetail (id) {
			this.$router.push({ path: '/base-separate', query: { pid: id }})
		},
		openConfirm(status, callback) {
			let vm = this
			let conftext = '是否修改为不显示的状态?'
			if (status == 1) {
				conftext = '是否修改为显示的状态?'
			}
	        vm.$confirm(conftext, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
			  callback(status)
	        }).catch(() => {
				callback(status, true)
				vm.$message({
					type: 'info',
					message: '已取消切换签约状态'
				});          
	        });
	    },
	    changeAllianceDisplayStatus(status, cancel) {
			let vm = this;
			if(cancel) {
				vm.info.isDisplay = status == 1 ? 2 : 1
				return
			}
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
                status: status
            };
            vm.$post(vm.$api.setting.changeAllianceDisplayStatus, param).then(resp => {
				vm.getCommonSetting()
				vm.$message({
					type: 'success',
					message: '签约状态切换成功!'
				});
            });
        },
        changeAllianceChainsDisplayStatus(status, cancel) {
			let vm = this;
			if(cancel) {
				vm.info.isChainsDisplay = status == 1 ? 2 : 1
				return
			}
            let param = {
                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
                status: status
            };
            vm.$post(vm.$api.setting.changeAllianceChainsDisplayStatus, param).then(resp => {
				vm.getCommonSetting()
				vm.$message({
					type: 'success',
					message: '签约状态切换成功!'
				});
            });
        },
    },
    created() {
        this.getCommonSetting();
    }
};
</script>

<style lang="less">
.base-setting {
	.cont {
		margin: 10px;
		.card {
			width: 266px;
			height: 174px;
			float: left;
			box-shadow:0px 2px 8px 1px rgba(0,0,0,0.09);
			border-radius:2px;
			border:1px solid rgba(232,232,232,1);
			background-color: #fff;
			margin: 10px;
			.top {
				height: 110px;
				line-height: 24px;
				padding: 24px 0 0 24px;
				border-bottom: 1px solid #E8E8E8;
				.card-icon {
					width: 24px;
					height: 24px;
					float: left;
					margin-right: 20px;
					img {
						width: 24px;
						height: 24px;
						background-size: cover;
						border-radius: 50%;
					}
				}
				.icon {
					color: #fff;
					width: 24px;
					height: 24px;
					line-height: 24px;
					text-align: center;
					background-color: #FFBF00;
					border-radius: 50%;
					margin-right: 16px;
					float: left;
				}
				.green {
					background-color: #5BD171;
				}
				.blue {
					background-color: #3991FB;
				}
				.right {
					float: left;
					.card-title {
						font-size: 16px;
						font-weight: 500;
						color: rgba(0, 0, 0, 0.85);
						padding-bottom: 12px;
					}
					.subtitle {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.45);
						padding-bottom: 8px;
					}
					.label {
						font-size: 20px;
						color: rgba(0, 0, 0, 0.65);
					}
					.code {
						height: 40px;
						width: 40px;
						margin: 0px auto;
					}
				}
			}
			.switch-btn {
				height: 40px;
				line-height: 40px;
				/*text-align: center;*/
			}
			.card-btn {
				width: 100%;
				color: #595959;
				background: rgba(247, 249, 250, 1);
			}
			.disable {
				color: rgba(0,0,0,0.45);;
			}
		}
	}
	.el-switch {
		padding-left: 24px;
	}
}
</style>



