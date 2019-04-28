<template>
	<div class="card-recharge">
		<div class="nub-top">
			<h2>会员充值</h2>
		</div>
		<div class="recharge-cont">
			<div class="from-cont">
				<el-form :model="user" :rules="userRules" ref="user" label-width="160px">
					<el-form-item label="可用通用卡:" prop="cardId">
						<el-select v-model="user.cardId" clearable placeholder="请选择" style="width: 100%;">
							<el-option
								v-for="item in cardOptions"
								:key="item.cardId"
								:label="item.name"
								:value="item.cardId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="充值会员手机:" prop="mobile">
						<el-input v-model="user.mobile" placeholder="充值会员手机">
							<template slot="append">
								<el-button @click="onTesting">检测</el-button>
							</template>
						</el-input>
					</el-form-item>
					<template v-if="testingInfo">
						<template v-if="testingInfo.status === 0">
							<p class="new-user">该用户状态为禁用，应先启用该卡</p>
							<el-form-item>
								<el-popover
									placement="top-start"
									trigger="hover">
									<div style="line-height: 30px;">
										<p>备注: 
											<span v-if="testingInfo.remark">{{testingInfo.remark}}</span>
											<span v-else style="color: #ccc">未设置</span>
										</p>
									</div>
									<div slot="reference">
										<img v-if="testingInfo.logo && testingInfo.logo.original" :src="testingInfo.logo.original" alt="" class="card-image">
										<div class="card-info">
											<p>{{testingInfo.nickname}}</p>
											<p>当前余额：{{testingInfo.totalBalance}}元</p>
											<p>{{testingInfo.createTime | formatDate}}</p>
											<el-button style="margin-top:20px;" type="primary" size="mini" @click="changeUserCardStatus">启用该卡</el-button>
										</div>
									</div>
								</el-popover>
							</el-form-item>
							
						</template>
						<template v-else-if="testingInfo.status === 1">
							<el-form-item>
								<el-popover
									placement="top-start"
									trigger="hover">
									<div style="line-height: 30px;">
										<p>备注: 
											<span v-if="testingInfo.remark">{{testingInfo.remark}}</span>
											<span v-else style="color: #ccc">未设置</span>
										</p>
									</div>
									<div slot="reference">
										<img v-if="testingInfo.logo && testingInfo.logo.original" :src="testingInfo.logo.original" alt="" class="card-image">
										<div class="card-info">
											<p>{{testingInfo.nickname}}</p>
											<p>当前余额：{{testingInfo.balance}}元</p>
											<p>{{testingInfo.createTime | formatDate}}</p>
										</div>
									</div>
								</el-popover>
							</el-form-item>
						</template>
						<template v-else-if="testingInfo.status === 2">
							<p class="new-user">该手机还未注册会员, 请让用户自行注册后, 再进行开通会员卡</p>
						</template>
						<template v-else>
							<p class="new-user">会员首次开通该会员卡</p>
							<el-form-item label="开卡备注:">
								<el-input
									type="textarea"
									:autosize="{ minRows: 2 }"
									placeholder="请输入内容"
									v-model="user.remark">
								</el-input>
							</el-form-item>
							<el-form-item label="推荐人手机:" prop="recommendMobile">
								<el-input v-model="user.recommendMobile" placeholder="推荐人手机号">
									<template slot="append">
										<el-button @click="onTestingRecommend()">检测</el-button>
									</template>
								</el-input>
							</el-form-item>
							<template v-if="recommendInfo">
								<template v-if="recommendInfo.status == 1">
									<el-form-item>
										<el-popover
											placement="top-start"
											trigger="hover">
											<div style="line-height: 30px;">
												<p>备注: 
													<span v-if="recommendInfo.remark">{{recommendInfo.remark}}</span>
													<span v-else style="color: #ccc">未设置</span>
												</p>
											</div>
											<div slot="reference">
												<img v-if="recommendInfo.logo && recommendInfo.logo.original" :src="recommendInfo.logo.original" alt="" class="card-image">
												<div class="card-info">
													<p>{{recommendInfo.nickname}}</p>
													<!--<p>当前余额：{{testingInfo.balance}}元</p>-->
													<p>{{recommendInfo.createTime | formatDate}}</p>
												</div>
											</div>
										</el-popover>
									</el-form-item>
								</template>
								<template v-else>
									<el-form-item label="">
										<span>该推荐人仍未拥有该会员卡资格，无法推荐！</span>
									</el-form-item>
								</template>
							</template>
							
						</template>
					</template>
				</el-form>
				<el-form :model="info" :rules="rules" ref="info" label-width="160px">
					<el-form-item label="支付金额:" prop="rechargePrice">
						<el-input v-model="info.rechargePrice" placeholder="请输入支付金额"></el-input>
					</el-form-item>
					<el-form-item label="到账金额:" prop="balance">
						<el-input v-model="info.balance" placeholder="请输入变更金额"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit" :disabled="testingInfo && !testingInfo.status">立即{{testingInfo && testingInfo.status === 2 ? '开卡' : '充值'}}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import {validatePhone, validateMoney, validatePhoneNon} from '@/assets/js/elValidate.js'

export default {
	data () {
		return {
			info: {
				balance: '',
				rechargePrice: '',
				directType: '1'
			},
			rules: {
				rechargePrice: [{ required: true, validator: validateMoney, trigger: 'blur' }],
				balance: [{ required: true, validator: validateMoney, trigger: 'blur' }],
			},
			cardOptions: [],
			user: {
				cardId: '',
				mobile: '',
				recommendMobile: '',
				remark: ''
			},
			userRules: {
				cardId: [{ required: true, message: '请选择可用通用卡', trigger: 'change' }],
				mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
				recommendMobile: [{ validator: validatePhoneNon, trigger: 'blur' }],
			},
			testingInfo: null,
			recommendInfo: null,
			userCardId: '',
			cardId: '',
		}
	},
	watch: {
		'user.mobile': function () {
			this.testingInfo = null
		},
		'user.recommendMobile': function () {
			this.recommendInfo = null
		},
		'user.cardId': function () {
			if (this.user.mobile) {
				this.onTesting()
				if (this.user.recommendMobile) {
					this.onTestingRecommend()
				}
			}
		},
	},
	methods: {
		getEnterpriseCard() {
			let vm = this
			let param ={
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				infoType: 0,
				curPage: 1,
				pageSize: 1000
			}
			vm.$get(vm.$api.card.getEnterpriseCard, param).then(resp => {
				vm.cardOptions = resp.list
			})
		},
		changeUserCardBalance() {
			let vm = this
			let parm = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				infoType: 0,
				curPage: 1,
				pageSize: 1000
			}
			vm.$post(vm.$api.card.changeUserCardBalance, param).then(resp => {
				vm.cardOptions = resp.list
			})
		},
		onSubmit () {
			let vm = this
			vm.$refs['user'].validate((valid) => {
				if (valid) {
					if (vm.user.mobile && !vm.testingInfo) {
						let param = {
							accountId: localStorage['userId'+sessionStorage['roleTypeId']],
							mobile: vm.user.mobile,
							cardId: vm.user.cardId
						}
						vm.$get(vm.$api.card.getUserEnterpriseCardInfo, param).then(resp => {
							vm.testingInfo = resp
							if(vm.testingInfo.status === 1) {
								vm.changeUserCardBalanceByMobile()
							} else if (vm.testingInfo.status === 2 || vm.testingInfo.status === 0) {
								return
							} else {
								this.$confirm('该会员首次开通该会员卡，是否需要设置推荐人？', '提示', {
									confirmButtonText: '设置推荐人',
									cancelButtonText: '不设置推荐人，直接开通'
								}).then(() => {
									return
								}).catch(() => { 
									vm.changeUserCardBalanceByMobile()
								});
							}
						})
					} else {
						vm.changeUserCardBalanceByMobile()
					}
				} else {
					return false
				}
			})
		},
		changeUserCardBalanceByMobile(){
			let vm = this
			if (vm.testingInfo.status == 2) {
				this.$alert('该手机还未注册会员, 请让用户自行注册后, 再进行开通会员卡', '提示', {
					confirmButtonText: '确定'
				})
				return
			}
			vm.$refs['user'].validate((valid) => {
				if (valid) {
					if (vm.user.recommendMobile && (!vm.recommendInfo || !vm.recommendInfo.userId)) {
						let param = {
							accountId: localStorage['userId'+sessionStorage['roleTypeId']],
							mobile: vm.user.recommendMobile,
							cardId: vm.user.cardId
						}
						vm.$get(vm.$api.card.getUserEnterpriseCardInfo, param).then(resp => {
							vm.recommendInfo = resp
							if (vm.recommendInfo.status == 1) {
								vm.changeUserCardBalanceByMobile()
							} else {
								this.$alert('设置的推荐人仍未拥有该会员卡资格，无法推荐！', '提示', {
									confirmButtonText: '重新设置'
								})
							}
						})
						return
					} else {
						vm.$refs['info'].validate((valid) => {
							if (valid) {
								vm.info.balance = Number(vm.info.balance)
								vm.info.rechargePrice = Number(vm.info.rechargePrice)
								let txt = vm.info.balance-vm.info.rechargePrice>0 ? `，并赠送${vm.info.balance-vm.info.rechargePrice}元金额` : ''
								vm.$confirm(`是否确认为该用户充值${vm.info.rechargePrice}元${txt}`, '充值提醒', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
								}).then(() => {
									let param = Object.assign({}, vm.info, {
										accountId: localStorage['userId'+sessionStorage['roleTypeId']],
										mobile: vm.user.mobile,
										cardId: vm.user.cardId,
										recommendUserId: vm.recommendInfo ? vm.recommendInfo.userId : '',
										remark: vm.user.remark
									})
									vm.$post(vm.$api.card.changeUserCardBalanceByMobile, param).then(resp => {
										vm.$alert(`该用户当前余额：${resp.balance}元`,'充值成功', {
											confirmButtonText: '确定',
											callback: action => {
												vm.user = {
													cardId: '',
													mobile: '',
													recommendMobile: '',
													remark: ''
												}
												vm.info = {
													balance: '',
													rechargePrice: '',
													directType: '1'
												}
												vm.testingInfo = null,
												vm.recommendInfo = null
											}
										});
									})
								}).catch(() => {     
								})
							} else {
								return false
							}
						});
					}
				} else {
					return false;
				}
			})
		},
		onTesting () {
			let vm = this
			vm.$refs['user'].validate((valid) => {
				if (valid) {
					let param = {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						mobile: vm.user.mobile,
						cardId: vm.user.cardId
					}
					vm.$get(vm.$api.card.getUserEnterpriseCardInfo, param).then(resp => {
						vm.testingInfo = resp
					})
				} else {
					return false;
				}
			});
		},
		onTestingRecommend () {
			let vm = this
			vm.$refs['user'].validate((valid) => {
				if (valid) {
					let param = {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						mobile: vm.user.recommendMobile,
						cardId: vm.user.cardId
					}
					vm.$get(vm.$api.card.getUserEnterpriseCardInfo, param).then(resp => {
						vm.recommendInfo = resp
					})
				} else {
					return false;
				}
			});
		},
		changeUserCardStatus () {
			console.log(status)
			let vm = this
			vm.$confirm(`是否改为启用状态`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					userCardId: vm.testingInfo.userCardId,
					status:1
				}
				vm.$post(vm.$api.card.changeUserCardStatus,param).then(resp => {
					vm.testingInfo.status = 1
					this.$message({
						type: 'success',
						message: '操作成功'
					}); 
				})
			}).catch(() => {
				vm.$message({
					type: 'info',
					message: '已取消修改'
				});          
			});
		}
	},
	created () {
		this.getEnterpriseCard()
	}
}
</script>

<style lang="less">
.card-recharge {
	.recharge-cont {
		margin: 20px;
		background-color: #FFFFFF;
		.from-cont {
			width: 550px;
			margin: 0 auto;
			padding: 20px 100px 20px 0;
		}
	}
	.card-image {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		float: left;
		margin: 0 10px;
	}
	.card-info {
		float: left;
		line-height: 25px;
	}
	.new-user {
		color: #F56C6C;
		font-size: 12px;
		padding-left: 160px;
		position: relative;
		top: -16px;
	}
	.open-but {
		float: right;
	}
}
</style>