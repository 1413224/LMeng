<template>
	<div class="card-index">
		<div class="nub-top">
			<h2>通用卡</h2>
		</div>
		<div class="notdata" v-if="cardLists.length<1">暂无数据</div>
		<div class="card-item" v-for="(item, index) in cardLists" :key="index">
			<div class="right">
				<div class="r_top">
					<span class="item-name"> {{item.name}}</span>
					<div class="tag">
						<div style="float: left;"><img src="../../assets/images/tag.png" /> </div>
						<div class="tag-r"><span class="num">{{item.cardNo}}</span></div>
					</div>
					<span class="item-time">{{item.createTime | formatDate}}</span>
					<!-- <el-button @click="editCard(index,item)" type="text" icon="el-icon-edit-outline" style="font-size: 14px; color: #fff; padding-left: 10px;float: right;padding-right: 100px;">
						编辑
					</el-button> -->
				</div>
				<div class="r_bottem">
					<el-row class="item-cont">
						<el-col id="card-membe" :span="4" class="border-right-1 but-div" @click.native="goMember(item.cardId)" v-has.apply="'@card-membe'">
							<p>会员数(人)</p>
							<span class="item-span">{{item.memberNums}}</span>
						</el-col>
						<el-col :span="4" class="border-right-1" v-if="cardMembe">
							<p>会员数(人)</p>
							<span class="item-span">{{item.memberNums}}</span>
						</el-col>
						<el-col :span="4" class="border-right-1">
							<p>会员可用总额(元)</p>
							<span class="item-span">{{item.memberBalance}}</span>
						</el-col>
						<el-col id="card-store" :span="4" class="border-right-1 but-div" @click.native="goStore(item.cardId)" v-has.apply="'card-store'">
							<p>支持门店(家)</p>
							<span class="item-span">{{item.availableNums}}</span>
						</el-col>
						<el-col :span="4" class="border-right-1" v-if="cardStore">
							<p>支持门店(家)</p>
							<span class="item-span">{{item.availableNums}}</span>
						</el-col>
						<el-col :span="4" class="border-right-1">
							<p>样式</p>
							<img v-if="item.logo && item.logo.original" :src="item.logo.original" class="item-button">
						</el-col>
						<el-col :span="4" class="border-right-1">
							<p>推荐奖励比例</p>
							<span class="item-span">{{item.recommendRate}}</span>
						</el-col>
						<el-col :span="4">
							<p>状态</p>
							<el-button class="btn-right" :type="item.status ? 'success' : 'danger'" size="mini" round>
								{{item.status ? '启用中' : '未启用'}}
							</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<!--编辑弹窗-->
		<el-dialog class="edit-card-box" title="编辑企业通用卡" :visible.sync="isEdit" width="700px" close-on-press-escape>
			<el-form label-width="120px" :inline="true" ref="editForm" :model="editForm" :rules="editFormRules">
				<div>
					<el-form-item label="通用卡编号：" prop="number">
						<el-input v-model="editForm.number"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="通用卡名称：" prop="name">
						<el-input v-model="editForm.name"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="奖项图片 ：">
						<div class="radio-box">
							<el-radio v-model="editForm.isDefault" label="1">默认</el-radio>
							<el-radio v-model="editForm.isDefault" label="2">自定义</el-radio>
						</div>
						<el-upload list-type="picture-card" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="editForm.imageList">
							<i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="奖项信息 ：">
						<el-input type="textarea" :rows="3" maxlength="200" autosize v-model="editForm.awardInformation" placeholder="领奖信息200字"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="奖项图片 ：">
						<el-radio v-model="editForm.isAvailable" label="1">可用</el-radio>
						<el-radio v-model="editForm.isAvailable" label="2">不可用</el-radio>
					</el-form-item>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button class="cancel-btn" @click="isEdit = false">取 消</el-button>
			    <el-button class="confirm-btn" type="primary" @click="isEdit = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cardLists: [],
				isEdit: false,
				editForm: {
					number: '',
					name: '',
					imageList: [],
					isDefault: '1',
					awardInformation: '',
					isAvailable: '1'
				},
				editFormRules: {

				},
				cardMembe: false,
				cardStore: false
			}
		},
		updated () {
			this.cardMembe = !document.querySelector('#card-membe')
			this.cardStore = !document.querySelector('#card-store')
		},
		methods: {
			getEnterpriseCard() {
				let vm = this
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					infoType: 1,
					curPage: 1,
					pageSize: 1000
				}
				vm.$get(vm.$api.card.getEnterpriseCard, param).then(resp => {
					vm.cardLists = resp.list
				})
			},
			goMember(id) {
				this.$router.push({
					path: 'card-member',
					query: {
						cid: id
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
			},
			editCard(index, item) {
				console.log(item)
				this.editForm.number = item.cardNo
				this.editForm.name = item.name
				this.editForm.awardInformation = item.remark
				this.isEdit = true
			},
			imgRequestArr(obj) { // 图册上传

			},
			onRemove(file, fileList) {

			},
			beforeUpload(file) { // 基于elementUi图片上传拦截过滤器
				const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
				const isLt10M = file.size / 1024 / 1024 < 10
				if(!isIMG) {
					this.$message.error('上传图片只能jpg、jpeg、gif、png')
				}
				if(!isLt10M) {
					this.$message.error('上传图片不能大小超过10M！')
				}
				return isIMG && isLt10M
			},
		},
		created() {
			this.getEnterpriseCard()
		}
	}
</script>

<style lang="less">
	.card-index {
		.notdata {
			height: 140px;
			margin: 20px;
			background: #fff;
			font-size: 36px;
			color: #666666;
			line-height: 140px;
			text-align: center;
		}
		.card-item {
			margin: 20px;
			height: 140px;
			background-color: #FFFFFF;
			box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.11);
			.left {
				width: 100px;
				height: 100%;
				float: left;
				background: rgba(75, 116, 255, 1);
				color: rgba(255, 255, 255, 1);
				.number {
					width: 100%;
					height: 20px;
					font-size: 14px;
					font-weight: 400;
					line-height: 20px;
					margin-top: 15px;
					text-align: center;
					display: inline-block;
				}
				.num {
					width: 100%;
					font-size: 24px;
					text-align: center;
					padding-top: 20px;
					display: inline-block;
					color: #4B74FF;
				}
			}
			.right {
				float: left;
				width: 100%;
				.r_top {
					height: 40px;
					background: #4B74FF;
					.item-name {
						width: 300px;
						font-size: 18px;
						font-weight: 600;
						color: #fff;
						line-height: 40px;
						padding-left: 24px;
					}
					.tag {
						height: 24px;
						display: inline-block;
						padding-left: 20px;
						position: relative;
						top: 5px;
						.tag-r {
							background: #fff;
							height: 24px;
							float: left;
							font-size: 14px;
							color: #4B74FF;
							line-height: 24px;
							padding: 0 10px;
							border-top-right-radius: 4px;
							border-bottom-right-radius: 4px;
						}
					}
					.item-time {
						font-size: 14px;
						font-weight: 400;
						color: #fff;
						line-height: 40px;
						padding-left: 65px;
					}
				}
				.r_bottem {
					height: 80px;
					margin: 10px 0;
					background: #fff;
					text-align: center;
					.item-cont {
						height: 80px;
						.border-right-1 {
							border-right: 1px dashed #D8DFF0;
						}
						div {
							height: 100%;
						}
						.btn-right {
							width: 80px;
							margin-top: 6px;
						}
						.but-div:hover {
							cursor: pointer;
						}
					}
					p {
						font-size: 14px;
						padding-top: 10px;
						font-weight: 600;
						color: #666666;
						line-height: 22px;
					}
					.item-span {
						font-size: 24px;
						font-weight: 600;
						color: rgba(75, 116, 255, 1);
						line-height: 22px;
						padding-top: 12px;
						display: inline-block;
					}
					.item-button {
						width: 56px;
						height: 31px;
						border-radius: 2px;
						padding: 0;
						margin-top: 7px;
						display: inline-block;
					}
				}
			}
		}
		.edit-card-box {
			.el-dialog__title {
				font-size: 18px;
				font-family: PingFangSC-Medium;
				font-weight: bold;
				color: #000;
			}
			.el-form-item__label {
				font-size: 14px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #000;
			}
			.el-input {
				width: 435px;
				input {
					height: 32px;
					background: rgba(255, 255, 255, 1);
					border-radius: 4px;
				}
			}
			.el-textarea {
				width: 435px;
				textarea {
					background: rgba(255, 255, 255, 1);
					border-radius: 4px;
				}
			}
			.el-dialog__body {
				padding: 30px 50px;
			}
			.radio-box {
				margin-bottom: 18px;
			}
			.el-upload--picture-card {
				background-color: #fbfdff;
				border: 1px dashed #c0ccda;
				border-radius: 6px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 100px;
				height: 100px;
				line-height: 100px;
				vertical-align: top;
			}
			.el-upload-list--picture-card .el-upload-list__item {
				overflow: hidden;
				background-color: #fff;
				border: 1px solid #c0ccda;
				border-radius: 6px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 100px;
				height: 100px;
				margin: 0 8px 8px 0;
				display: inline-block;
			}
			.el-button {
				font-size: 14px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(76, 52, 4, 0.65);
			}
			.cancel-btn {
				width: 80px;
				height: 32px;
				line-height: 1px;
				background: rgba(255, 255, 255, 1);
				border-radius: 4px;
				border: 1px solid rgba(217, 217, 217, 1);
			}
			.confirm-btn {
				width: 80px;
				height: 32px;
				line-height: 1px;
				border-radius: 4px;
				color: #fff;
			}
		}
	}
</style>