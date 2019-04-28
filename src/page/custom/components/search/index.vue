<template>
	<div class="search-box">
		<el-input style="padding:5px;box-sizing: border-box;" placeholder="请输入关键字进行搜索">
			<i slot="prefix" class="el-input__icon el-icon-search"></i>
		</el-input>
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
		watch:{
			data(){
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
	.search-box {
		li {
			width: 100%;
			cursor: move;
		}
	}
</style>