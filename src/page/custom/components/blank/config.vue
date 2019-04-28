<template>
	<div class="blank-configure">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="背景颜色：">
				<el-radio-group v-model="form.isInheritBackgroundColor" @change="change">
					<el-radio label="1">自定义</el-radio>
					<el-radio label="2">使用页面背景色</el-radio>
				</el-radio-group>
				<div>
					<el-color-picker v-if="form.isInheritBackgroundColor == '1'" v-model="form.diyBackgroundColor" size="small" show-alpha @active-change="bcChange"></el-color-picker>
				</div>
			</el-form-item>
			<el-form-item label="元素高度(像素)：">
				<el-slider v-model="form.height" :max="200" :min="10" show-input @change="change"></el-slider>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			activeId: String,
			data: Object
		},
		data() {
			return {
				form: {
					isInheritBackgroundColor: '2',
					allBackgroundColor: '',
					diyBackgroundColor: 'rgba(255, 255, 255, 1)',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					height: '10',
				}
			}
		},
		watch:{
			'form.isInheritBackgroundColor' () {
				if(this.form.isInheritBackgroundColor == '2') {
					this.form.backgroundColor = this.form.allBackgroundColor
				} else if(this.form.isInheritBackgroundColor == '1') {
					this.form.backgroundColor = this.form.diyBackgroundColor
				}
			},
			'form.allBackgroundColor' () {
				if(this.form.isInheritBackgroundColor == '2') {
					this.form.backgroundColor = this.form.allBackgroundColor
				} else if(this.form.isInheritBackgroundColor == '1') {
					this.form.backgroundColor = this.form.diyBackgroundColor
				}
			}
		},
		created() {
			if(this.activeId == sessionStorage['activeId']) {
				this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
				this.$emit('setData', this.form)
			}
		},
		methods: {
			//背景色改变
			bcChange(val) {
				if(this.activeId == sessionStorage['activeId']) {
					if(val == 'transparent') {
						val = 'rgba(255, 255, 255, 1)'
					}
					this.form.diyBackgroundColor = val
					this.form.backgroundColor = val
					this.change()
				}
			},
			//返回实时改变的数据
			change(val) {
				this.$emit('setData', this.form)
			},
		},

	}
</script>

<style lang="less">
	.blank-configure {}
</style>