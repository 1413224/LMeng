<template>
	<div class="title-bar" :style="styleObject">
		<i v-if="configData.icon != ''" :class="configData.icon"></i> {{configData.text != ''? configData.text :'请输入标题内容'}}
	</div>
</template>

<script>
	export default {
		props: {
			configData: Object,
		},
		data() {
			return {
				textAlign: '',
			}
		}, 
		computed: {
			styleObject() {
				return {
					color: this.configData.color,
					fontSize: Number(this.configData.fontSize) / 2 + 'px',
					backgroundColor: this.configData.backgroundColor,
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px',
					textAlign: this.configData.textAlign,
					fontWeight: this.configData.fontWeight
				}
			}
		},
		created() {

		},
		methods: {

		},

	}
</script>

<style lang="less" scoped>
	.title-bar {
		box-sizing: border-box;
		position: relative;
		i {
			vertical-align: middle;
		}
	}
</style>