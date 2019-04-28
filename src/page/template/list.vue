<template>
	<div class="template-list">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的页面总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>模板列表</h2>
		</div>
		<el-card class="box-card">
			<div>
				<p>分类选择</p>
				<ul class="class-list clearfix">
					<li v-for="(item,index) in classList" :key="index" :class="{'active':classIndex == index}" @click="classIndex = index">{{item}}</li>
				</ul>
				<ul class="list clearfix">
					<li v-for="(item,index) in list" :key="index">
						<div class="top">

						</div>
						<div class="middle">
							<p>家具行业移动端模板</p>
							<p>是的，这是一段简介</p>
						</div>
						<div class="bottom clearfix">
							<span class="left">免费</span>
							<div class="right">
								<span>预览模板</span>
								<span>立即使用</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				totalNums: 0,
				classList: ['全部', '家居装修/室内设计', '门窗/卫浴/照明', '信息IT/互联网/科技'],
				classIndex: 0,
				list:20
			}
		},
		created() {

		},
		methods: {}

	}
</script>

<style lang="less" scoped>
	.template-list {
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
		.box-card {
			margin: 20px;
			.class-list {
				margin-top: 10px;
				li {
					padding: 0 15px;
					height: 36px;
					line-height: 36px;
					text-align: center;
					background: rgba(255, 255, 255, 0.6);
					border-radius: 4px;
					border: 1px solid rgba(225, 225, 225, 1);
					margin-right: 10px;
					float: left;
					font-size: 14px;
					font-family: PingFangSC-Regular;
					color: rgba(53, 53, 53, 1);
					cursor: pointer;
					transition: all 0.1s linear;
				}
				.active {
					background-color: #256fff;
					border: 1px solid #256fff;
					color: white;
				}
			}
			.list {
				margin-top: 30px;
				li {
					width: 288px;
					height: 513px;
					border-radius: 4px;
					float: left;
					background-color: #f1f3f9;
					margin-right: 10px;
					margin-bottom: 10px;
					.top {
						height: 303px;
						background-color: #D8DFF0;
					}
					.middle {
						height: 153px;
						padding: 20px 15px;
						box-sizing: border-box;
						p:nth-child(1) {
							font-size: 18px;
							font-family: PingFangSC-Medium;
							font-weight: bold;
							color: rgba(53, 53, 53, 1);
							line-height: 25px;
						}
						p:nth-child(2) {
							font-size: 14px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(53, 53, 53, 1);
							margin-top: 10px;
						}
					}
					.bottom {
						height: 55px;
						line-height: 55px;
						padding: 0px 15px;
						box-sizing: border-box;
						border-top: 1px solid #E1E1E1;
						.left {
							float: left;
							font-size: 18px;
							font-family: PingFangSC-Medium;
							font-weight: 500;
							color: rgba(51, 111, 255, 1);
						}
						.right {
							float: right;
							margin-top: 11px;
							span {
								float: left;
								width: 82px;
								height: 33px;
								line-height: 33px;
								text-align: center;
								border-radius: 4px;
								font-size: 14px;
								font-family: PingFangSC-Regular;
								font-weight: 400;
							}
							span:nth-child(1) {
								border: 1px solid rgba(222, 229, 231, 1);
								color: rgba(53, 53, 53, 1);
								box-sizing: border-box;
							}
							span:nth-child(2) {
								background: rgba(51, 111, 255, 1);
								color: white;
								margin-left: 10px;
							}
						}
					}
				}
			}
		}
	}
</style>