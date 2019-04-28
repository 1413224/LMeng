<template>
	<div class="banner">
		<el-carousel arrow="never" :autoplay="false" height="176px" :class="[{'radius1':configData.borderRadius == '1'},{'radius2':configData.borderRadius == '2'}]">
			<el-carousel-item v-for="(item,index) in configData.imgList" :key="index">
				<img v-if="item.imgUrl != ''" :src="item.imgUrl" />
				<img v-else src="http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		props: {
			configData: Object,
		},
		data() {
			return {
				activeIndex: ''
			}
		},
		watch: {
			'configData.buttonBackgroundColor' () {
				document.querySelectorAll('.active .banner .el-carousel__button').forEach((value, index) => {
					document.querySelectorAll('.active .banner .el-carousel__button')[index].style.backgroundColor = this.configData.buttonBackgroundColor
				})
			},
			'configData.buttonOpacity' () {
				document.querySelectorAll('.active .banner .el-carousel__button').forEach((value, index) => {
					document.querySelectorAll('.active .banner .el-carousel__button')[index].style.opacity = this.configData.buttonOpacity / 100
					document.querySelector('.active .banner .is-active .el-carousel__button').style.opacity = this.configData.buttonOpacity / 10

				})
			},
			'configData.position' () {
				if(this.configData.activeId == sessionStorage['activeId']) {
					if(this.configData.position == '0') {
						document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.left = '30%'
					} else if(this.configData.position == '1') {
						document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.left = '50%'
					} else {
						document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.left = '67%'
					}
				}
			},
			'configData.marginHorizontal' () {
				if(this.configData.position == '0') {
					document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.paddingLeft = this.configData.marginHorizontal / 2 + 'px'
				} else if(this.configData.position == '2')(
					document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.paddingRight = this.configData.marginHorizontal / 2 + 'px'
				)
			},
			'configData.marginBottom' () {
				document.querySelectorAll('.active .banner .el-carousel__indicators')[0].style.marginBottom = this.configData.marginBottom / 2 + 'px'
			},
		},
		computed: {
			styleObject() {
				return {

				}
			}
		},
		mounted() {

		},
		methods: {

		},

	}
</script>

<style lang="less">
	.banner {
		img {
			width: 100%;
			height: auto;
			display: block;
		}
		.el-carousel__button {
			height: 3px;
			width: 8px;
		}
		.radius1 .el-carousel__button {
			height: 8px;
			width: 8px;
		}
		.radius2 .el-carousel__button {
			height: 8px;
			width: 8px;
			border-radius: 50%;
		}
	}
</style>