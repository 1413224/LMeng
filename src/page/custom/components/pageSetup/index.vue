<template>
	<div class="page-setup clearfix">
		<div class="back-btn"><i class="el-icon-arrow-left"></i>返回</div>
		{{data.title ? data.title : '页面标题'}}
		<i class="el-icon-more more-btn"></i>
	</div>
</template>

<script>
	export default {
		props: {
			data: Object,
		},
		data() {
			return {

			}
		},
		watch: {
			data() {
				//console.log(this.data)
			}
		},
		created() {

		},
		methods: {

		},

	}
</script>

<style lang="less" scoped>
	.page-setup {
		text-align: center;
		height: 45px;
		line-height: 45px;
		font-size: 13px;
		position: relative;
		color: white;
		background-color: black;
		.back-btn {
			position: absolute;
			font-size: 20px;
			top: 50%;
			left: 0px;
			transform: translate(5px, -50%);
			font-size: 13px;
		}
		.more-btn {
			position: absolute;
			font-size: 20px;
			top: 50%;
			right: 0px;
			transform: translate(-5px, -50%);
		}
	}
</style>