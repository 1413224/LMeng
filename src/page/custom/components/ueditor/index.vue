<template>
	<div class="ueditor" v-html="configData.contnet">
		123
	</div>
</template>

<script>
	export default {
		props: {
			configData: Object,
		},
		data() {
			return {}
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		methods: {

		},

	}
</script>

<style lang="less" scoped>
	.ueditor {
		img {
			width: 100%;
			height: auto;
		}
	}
</style>