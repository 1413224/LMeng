<template>
	<ul class="single-images-box">
		<li v-for="(item,index) in configData.imgList" :key="index" :style="styleObject">
			<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'"  />
		</li>
	</ul>
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
			styleObject() {
				return {
					backgroundColor: this.configData.backgroundColor,
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px'
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
	.single-images-box {
		img{
			width: 100%;
			height: auto;
			display: block;
		}
	}
</style>