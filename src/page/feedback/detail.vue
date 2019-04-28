<template>
	<div class="feedback-detail">
		<div class="nub-top">
			<h2>反馈详情</h2>
		</div>
		<el-card class="detail-card">
			<div slot="header" class="clearfix">
				<span>反馈中心的反馈详情</span>
			</div>
			<el-row class="goods-row">
				<el-col :span="8">
					<p>反馈名称:</p>{{info.name}}
				</el-col>
				<el-col :span="8">
					<p>管理员:</p>{{info.accountName}}
				</el-col>
				<el-col :span="8">
					<p>状态:</p>
						<el-tag
							:type="info.status | filterType"
							disable-transitions>{{ info.status | filterStatus}}
						</el-tag>
					<!--{{info.status | filterStatus}}-->
				</el-col>
				<el-col :span="8">
					<p>创建时间:</p>{{info.createTime | formatDate}}
				</el-col>
				<el-col :span="16">
					<p>受理人审核备注:</p>{{info.remark}}
				</el-col>
				<el-col :span="24">
					<p>反馈内容:</p>{{info.content}}
				</el-col>
				<el-col :span="24" class="img_flex">
					<p>反馈图片:</p>
						<div class="image-div" v-for="(item, index) in info.thumb" :key="index">
                            <img v-if="item.original" :src="item.original" alt="" class="image">
                        </div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					feedbackId: '',
					name: '',
					content: '',
					thumb: [],
					accountId: '',
					accountName: '',
					remark: '',
					status: -1,
					createTime: 0
				},
			}
		},
		methods: {
			getInfoById(id) {
				let vm = this
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					feedbackId: id,
				}
				vm.$get(vm.$api.feedback.getInfoById, param).then(resp => {
					vm.info = resp
				})
			},
		},
		filters: {
		filterType (val) {
			switch (val) {
				case 0:
					return ''
				case 1:
					return 'success'
				case 2:
					return 'info'
				case 3:
					return 'danger'
				default:
					return ''
			}
		},
		filterStatus (val) {
			switch (val) {
				case 0:
					return '未查看'
				case 1:
					return '已查看'
				case 2:
					return '已处理'
				case 3:
					return '已关闭'
				default:
					return '/'
				}
		}
	},
		created() {
			this.getInfoById(this.$route.query.fid)
		}
	}
</script>

<style lang="less">
	.feedback-detail {
		.detail-card {
			margin: 20px;
			padding: 20px;
			background: #fff;
		}
		.goods-row {
			font-size: 16px;
			line-height: 40px;
			p {
				display: inline-block;
				width: 120px;
			}
			.img_flex {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				.image-div {
					width: 100px;
					height: 50px;
					background-color: #F5F6FA;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 10px;
					.image {
						width: auto;
						height: auto;
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}
		.avatar {
			width: 100px;
			height: 100px;
			background-color: #F5F6FA;
			display: flex;
			justify-content: center;
			align-items: center;
			.image {
				width: auto;
				height: auto;
				max-width: 100%;
				max-height: 100%;
			}
		}
		.return {
			float: right;
			padding-right: 80px;
		}
	}
</style>