<template>
    <!-- 会员通用卡 -->
	<div class="card-member">
		<div class="nub-top">
			<div class="right-div">
				<p>符合搜索条件的会员通用卡总数</p>
				<p class="r-num">{{ totalNums }}</p>
			</div>
			<div class="right-div">
				<p>符合的充值总额总数</p>
				<p class="r-num">{{ totalRecharge }}</p>
			</div>
			<div class="right-div" style="border-left: none;">
				<p>剩余余额</p>
				<p class="r-num">{{ remainBalance }}</p>
			</div>
			<h2>会员通用卡</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="100px" label-position="left">
					<el-col :span="8">
						<el-form-item label="手机号: ">
							<el-input v-model="mobile" placeholder="请输入完整的手机号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="企业通用卡: " style="padding-left: 10px;">
							<el-select v-model="cardId" clearable placeholder="请选择" style="width: 100%;">
								<el-option
								  v-for="item in cardOptions"
								  :key="item.cardId"
								  :label="item.name"
								  :value="item.cardId">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<!-- 表格数据 -->
			<div class="border">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="thumb" label="会员头像" min-width="80">
						<template slot-scope="scope">
							<div>
								<img v-if="scope.row.thumb && scope.row.thumb.original" :src="scope.row.thumb.original" class="thumb-img">
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="mobile" label="会员手机" min-width="120">
						<template slot-scope="scope">
	                        <el-popover
	                            placement="top-start"
	                            trigger="hover">
	                            <div style="line-height: 30px;">
	                                <p>会员昵称: 
	                                    <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                    	<span v-else style="color: #ccc">未设置</span>
	                                </p>
	                                <p>会员姓名: 
	                                    <span v-if="scope.row.realName">{{scope.row.realName}}</span>
	                                    <span v-else style="color: #ccc">未设置</span>
	                                </p>
	                            </div>
	                            <div slot="reference">
	                                <!--<img v-if="scope.row.thumb && scope.row.thumb.original" :src="scope.row.thumb.original" alt="" class="thumb-img">-->
	                                <span style="vertical-align: middle; display: inline-block; line-height: 50px;">{{scope.row.mobile}}</span>
	                            </div>
	                        </el-popover>
	                    </template>
					</el-table-column>
					<el-table-column prop="name" label="通用卡名称/编号" min-width="130">
						<template slot-scope="scope">
							<p>{{scope.row.name}}</p>
							<p>{{scope.row.cardNo}}</p>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="cardNo" label="通用卡编号" min-width="120"></el-table-column> -->
					<el-table-column prop="availableNums" label="支持门店数" min-width="100">
						<template slot-scope="scope">
							<div id="card-store" class="cursor-pointer" @click="goStore(scope.row.cardId)" v-has.apply="'card-store'">
								<!--<p>支持门店(家)</p>-->
								<span class="item-span">{{scope.row.availableNums}}</span>
							</div>
							<div class="cursor-pointer" v-if="cardStore">
								<!--<p>支持门店(家)</p>-->
								<span class="item-span">{{scope.row.availableNums}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="balance" label="可用余额" min-width="120"></el-table-column>
					<el-table-column prop="totalConsume" label="累计消费" min-width="120"></el-table-column>
					<el-table-column prop="totalRecharge" label="累计充值" min-width="120"></el-table-column>
					<el-table-column prop="status" label="状态" min-width="60">
						<template slot-scope="scope">
							<el-tag size="mini" id="cursor-pointer" class="cursor-pointer" v-has.apply="'up-card-member'" :type="scope.row.status ? 'success' : 'danger'" disable-transitions @click.native="changeUserCardStatus(scope.row.userCardId, +!scope.row.status)">{{scope.row.status ? '启用' : '禁用'}}</el-tag>
							<el-tag size="mini" v-if="cursorPointer" :type="scope.row.status ? 'success' : 'danger'" disable-transitions>{{scope.row.status ? '启用' : '禁用'}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="加入时间" min-width="110">
						<template slot-scope="scope">
							<div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="155" fixed="right">
						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="充值" v-has.apply="'recharge-card-member'" placement="top">
								<el-button
								size="mini"
								type="primary"
								plain
								:disabled="!scope.row.status"
								@click="recharge(scope.row.userCardId)">充值</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="日志" v-has.apply="'card-member-log'" placement="top">
								<el-button
								size="mini"
								type="success"
								plain
								@click="goLog(scope.row.userCardId)">日志</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" v-has.apply="'del-card-member'" placement="top">
								<el-button
								size="mini"
								type="danger"
								icon="el-icon-delete"
								plain
								@click="openConfirm(scope.row.userCardId)"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page.sync="curPage"
				:page-sizes="[10, 20, 30, 50, 100]"
				:page-size="pageSize"
				layout="sizes, prev, slot, next"
        		prev-text="上一页"
				next-text="下一页"
				:total="totalNums"
				class="flex_center">
        			<span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
		<el-dialog
			title="充值"
			:visible.sync="dialogVisible"
			width="500px"
			>
			<span style="line-height: 30px;display: inline-block;padding-bottom: 15px;vertical-align: middle;">请输入需要变动的金额</span>
			<el-form :model="info" :rules="rules" ref="info" label-width="100px" >
				<el-form-item label="变更类型:" prop="directType">
					<el-select v-model="info.directType" placeholder="请选择变更类型" style="width: 100%;">
						<el-option
							v-for="item in typeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<template v-if="info.directType == 1">
					<el-form-item label="支付金额:" prop="rechargePrice">
						<el-input v-model="info.rechargePrice" placeholder="支付金额"></el-input>
					</el-form-item>
					<el-form-item label="到账金额:" prop="balance">
						<el-input v-model="info.balance" placeholder="到账金额"></el-input>
					</el-form-item>
				</template>
				<el-form-item v-else label="减少金额:" prop="balance">
					<el-input v-model="info.balance" placeholder="减少金额"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="changeUserCardBalanceById">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {validateMoney} from '@/assets/js/elValidate.js'

export default {
	data () {
		return {
			balance: '',
			remindVisible:false,
			showCurrentAmount:false,
			info: {
				balance: '',
				directType: 1,
				rechargePrice: ''
			},
			cardId: '',
			mobile: '',
			tableData: [],
			curPage: 1,
			pages: 1,
			pageSize: 10,
			totalNums: 0,
			totalRecharge: 0,
			remainBalance: 0,
			search: {
				cardId: '',
				mobile: '',
			},
			cardOptions: [],
			dialogVisible: false,
			typeOptions: [{
				label:'增加余额',
				value:1
			},{
				label:'减少余额',
				value:2
			}],
			userCardId: '',
			cursorPointer: false,
			cardStore: false,
			rules: {
				balance: [{ required: true, validator: validateMoney, trigger: 'blur' }],
				directType: [{ required: true, message: '请选择变更类型', trigger: 'change' }],
				rechargePrice: [{ required: true, validator: validateMoney, trigger: 'blur' }],
			},
		}
	},
	updated () {
		this.cursorPointer = !document.querySelector('#cursor-pointer')
		this.cardStore = !document.querySelector('#card-store')
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
			if (vm.$route.query.cid) {
				vm.cardId = vm.$route.query.cid
				vm.search.cardId = vm.cardId
			}
			vm.getUserEnterpriseCard()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.cardId = ''
			vm.mobile = ''
			vm.search = {
				cardId: '',
				mobile: ''
			}
			vm.curPage = 1
      		vm.$refs.paging.lastEmittedPage = 1
			vm.getUserEnterpriseCard()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				cardId: vm.cardId,
				mobile: vm.mobile
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getUserEnterpriseCard()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getUserEnterpriseCard()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getUserEnterpriseCard()
		},
		getUserEnterpriseCard () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.card.getUserEnterpriseCard, param).then(resp => {
				vm.tableData = resp.list
				vm.totalNums = resp.totalNums 
				vm.totalRecharge = resp.totalRecharge
				vm.remainBalance = resp.remainBalance
				vm.pages = Math.ceil(resp.totalNums/vm.pageSize) || 1
			}).catch(err => {
				vm.tableData = []
				vm.totalNums = 0
				vm.pages = 1
			})
		},
		delUserCard (id) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				userCardId: id,
			}
			vm.$post(vm.$api.card.delUserCard, param).then(resp => {
				vm.getUserEnterpriseCard()
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			})
		},
		openConfirm(id) {
			this.$confirm('是否删除该会员?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delUserCard(id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		getEnterpriseCard () {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				infoType: 0,
				curPage: 1,
				pageSize: 1000
			}
			vm.$get(vm.$api.card.getEnterpriseCard, param).then(resp => {
				vm.cardOptions = resp.list
				let temp = {
					name:'全部'
				}
				vm.cardOptions.unshift(temp)
			})
		},
		changeUserCardStatus (id, status) {
			let vm = this
			vm.$confirm(`是否改为${status?'启用':'禁用'}状态`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					userCardId: id,
					status:status
				}
				vm.$post(vm.$api.card.changeUserCardStatus,param).then(resp => {
					this.$message({
						type: 'success',
						message: '操作成功'
					}); 
					vm.getUserEnterpriseCard()
				})
			}).catch(() => {
				vm.$message({
					type: 'info',
					message: '已取消修改'
				});          
			});
		},
		recharge (id) {
			this.userCardId = id
			this.info = {
				balance: '',
				directType: 1,
				rechargePrice: ''
			}
			this.dialogVisible = true
//			this.$refs.balance.resetFields()
		},
		changeUserCardBalanceById(){
			let vm = this
			vm.$refs['info'].validate((valid) => {
				if (valid) {
					vm.info.balance = Number(vm.info.balance)
					vm.info.rechargePrice = Number(vm.info.rechargePrice)
					let txt = `是否确认为扣除该用户余额${vm.info.balance}元`
					if (vm.info.directType == 1) {
						let temp = vm.info.balance-vm.info.rechargePrice>0 ? `，并赠送${vm.info.balance-vm.info.rechargePrice}元金额` : ''
						txt = `是否确认为该用户充值${vm.info.rechargePrice}元${temp}`
					}
					vm.$confirm(txt, '充值提醒', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						let param = {
							accountId: localStorage['userId'+sessionStorage['roleTypeId']],
							userCardId: vm.userCardId,
							balance: vm.info.balance,
							rechargePrice: vm.info.rechargePrice ? vm.info.rechargePrice : 0,
							directType: vm.info.directType
						}
						vm.$post(vm.$api.card.changeUserCardBalanceById,param).then(resp => {
							vm.$alert(`该用户当前余额：${resp.balance}元`,'充值成功', {
								confirmButtonText: '确定',
								callback: action => {
									vm.getUserEnterpriseCard()
									vm.dialogVisible = false
								}
							});
						})
					}).catch(() => {     
					})
				} else {
					return false
				}
			})
		},
		goLog (id) {
			this.$router.push({
				path: 'card-member-log',
				query: {
					uid: id
				}
			})
		},
		goStore(id) {
			this.$router.push({
				path: 'card-store',
				query: {
					cid: id
				}
			})
		}
	},
	created () {
		this.getEnterpriseCard()
	}
}
</script>

<style lang="less">	
.card-member {
	.form-flex {
		display: flex;
		justify-content: flex-end;
		padding-top: 10px;
	}
	.box-card {
		margin: 20px;
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.thumb-img {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.border {
		border-top: 2px solid #ebeef5
	}
	.cursor-pointer {
		 cursor: pointer;
	}
	i.fa {
        margin: 0 3px;
        width: auto;
        text-align: center;
        font-size: 12px;
        vertical-align: middle;
	}
	.nub-top {
		background-color: #fff;
		padding: 10px 30px 50px;
		.right-div {
			float: right;
			color: rgba(0, 0, 0, 0.45);
			text-align: center;
			padding: 0 20px;
			margin: 10px;
			border-left: 1px solid #ccc;
			.r-num {
				font-size: 32px;
				color: #000;
			}
		}
	}
}
</style>
