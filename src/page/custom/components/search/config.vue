<template>
	<div class="edit-box">
		<el-form ref="searchForm" :model="searchForm" label-width="120px">
			<el-form-item class="border-b" label="搜索类型：">
				<el-radio-group v-model="searchForm.type">
					<el-radio label="1">商城商品</el-radio>
					<el-radio label="2">积分商城商品</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="背景颜色：">
				<el-color-picker v-model="searchForm.backgroundColor" size="mini" @change="change"></el-color-picker>
			</el-form-item>
			<el-form-item label="输入框背景：">
				<el-color-picker v-model="searchForm.inputBackgroundColor" size="mini" @change="change"></el-color-picker>
			</el-form-item>
			<el-form-item label="文字颜色：">
				<el-color-picker v-model="searchForm.textColor" size="mini"></el-color-picker>
			</el-form-item>
			<el-form-item label="图标颜色：">
				<el-color-picker v-model="searchForm.iconColor" size="mini"></el-color-picker>
			</el-form-item>
			<el-form-item label="提示文字：">
				<el-input class="ss" v-model="searchForm.placeholder" placeholder="请输入关键字进行搜索"></el-input>
			</el-form-item>
			<el-form-item label="上下边距(像素)：">
				<el-slider v-model="searchForm.paddingVertical" show-input></el-slider>
			</el-form-item>
			<el-form-item label="左右边距(像素)：">
				<el-slider v-model="searchForm.paddingHorizontal" show-input></el-slider>
			</el-form-item>
			<el-form-item label="搜索框样式：">
				<el-radio-group v-model="searchForm.class">
					<el-radio label="1">方形</el-radio>
					<el-radio label="2">圆角</el-radio>
					<el-radio label="2">圆弧</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="文字对齐：">
				<el-radio-group v-model="searchForm.textAlign">
					<el-radio label="1">居左</el-radio>
					<el-radio label="2">居中</el-radio>
					<el-radio label="2">居右</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			activeId:String
		},
		data() {
			return {
				searchForm: {
					type: '1',
					backgroundColor: '',
					inputBackgroundColor: '',
					textColor: '',
					iconColor: '',
					placeholder: '',
					paddingVertical: 0,
					paddingHorizontal: 0,
					class: '1',
					textAlign: '1',
				}
			}
		},
		watch: {
			data() {

			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']){
				console.log(2)
				this.$emit('setData', this.searchForm)
			}
		},
		methods: {
			//返回实时改变的数据
			change() {
				this.$emit('setData', this.searchForm)
			}
		},

	}
</script>

<style lang="less">
	.edit-box {
		.el-form-item {
			margin-bottom: 0px;
		}
		.border-b {
			border-bottom: 1px dashed #c0c4cc;
			margin-bottom: 10px;
		}
		.ss .el-input__inner {
			height: 30px;
			font-size: 13px;
		}
	}
</style>