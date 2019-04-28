<template>
	<div class="blank" :style="styleObject"></div>
</template>

<script>
	export default {
		props: {
			configData: Object,
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
		computed: {
			styleObject() {
				return {
					height: this.configData.height + 'px',
					backgroundColor: this.configData.backgroundColor
				}
			}
		},
		created() {

		},
		methods: {

		},

	}
</script>

<style lang="less">
	
</style>