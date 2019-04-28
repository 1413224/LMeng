<template>
	<div class="picture-box">
		<el-carousel arrow="never" :autoplay="false" :height="height" :indicator-position="showLine > 1 ? 'outside' : 'none'" :style="elStyle">
			<el-carousel-item v-for="i in showLine" :key="i">
				<ul :class="{'img-list-index1':configData.layoutMode == '1'}" v-if="configData.imgList.length > (configData.layoutMode * configData.line) && configData.isPaging == '1'" class="img-list-index clearfix" ref="list">
					<li :class="{'w50':index == configData.imgList.length -1 && configData.imgList.length == 4*(Math.ceil(configData.imgList.length/4)) - 1}" v-if="index >= (configData.layoutMode * configData.line * (i-1)) && index < (configData.layoutMode * configData.line * i)" v-for="(item,index) in configData.imgList" :key="index" :style="configData.layoutMode != '1' ? styleObject : styleObject2">
						<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" />
					</li>
				</ul>
				<ul :class="{'img-list-index1':configData.layoutMode == '1'}" v-else class="img-list-index clearfix" ref="list" :style="elStyle">
					<li :class="[{'w50':index == configData.imgList.length -1 && configData.imgList.length == 4*(Math.ceil(configData.imgList.length/4)) - 1},{'w100':index == configData.imgList.length - 1 && configData.imgList.length == 4*(Math.ceil(configData.imgList.length/4)) - 3}]" v-for="(item,index) in configData.imgList" :key="index" :style="[configData.layoutMode != '1' ? styleObject : styleObject2,configData.layoutMode == '1' && (index%4 == 3) ? one : '',configData.layoutMode == '1' && (index%4 == 2) ? two : '',configData.layoutMode == '1' && (index%4 == 1) ? three : '',configData.layoutMode == '1' && (index%4 == 0) ? four : '']">
						<img :src="item.imgUrl != '' ? item.imgUrl : 'http://domain.cgc999.com:8080/group1/M00/00/61/rBL0CVvRiCaAGrC6AAAnDE1dMrY128.png'" />
					</li>
				</ul>
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
				height: '',
				showLine: 1,
			}
		},
		watch: {
			'configData.layoutMode' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line))
					} else {
						this.showLine = 1
					}
					this.$forceUpdate()
				})
			},
			'configData.imgList' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line))
					} else {
						this.showLine = 1
					}
				})
			},
			'configData.line' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line))
					} else {
						this.showLine = 1
					}

					if(this.configData.imgList.length < (this.configData.layoutMode * this.configData.line)) {
						this.$message.warning('注意：图片数量不足')
					}
				})
			},
			'configData.isPaging' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line))
					} else {
						this.showLine = 1
					}
				})
			},
			'configData.height' () {
				this.$nextTick(function() {
					if(this.configData.layoutMode != '1') {
						if(this.configData.isPaging == '0') {
							this.height = this.configData.height * Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line)) + 'px'
						} else {
							this.height = this.configData.height + 'px'
						}
					} else {
						this.height = this.configData.height + 'px'
					}
				})
			}
		},
		computed: {
			styleObject() {
				return {
					width: 100 / this.configData.layoutMode + '%',
					backgroundColor: this.configData.backgroundColor,
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px',
					height: this.configData.height + 'px'
				}
			},
			styleObject2() {
				return {
					backgroundColor: this.configData.backgroundColor,
					paddingTop: this.configData.paddingVertical + 'px',
					paddingBottom: this.configData.paddingVertical + 'px',
					paddingLeft: this.configData.paddingHorizontal + 'px',
					paddingRight: this.configData.paddingHorizontal + 'px'
				}
			},
			elStyle() {
				return {
					backgroundColor: this.configData.backgroundColor,
					//height: this.configData.height > 0 ? this.configData.height + 'px' : this.height
				}
			},
			one() {
				return {
					height: this.configData.height / (2 * Math.ceil(this.configData.imgList.length / 4)) + 'px'
				}
			},
			two() {
				return {
					height: this.configData.height / (2 * Math.ceil(this.configData.imgList.length / 4)) + 'px'
				}
			},
			three() {
				return {
					height: this.configData.height / (2 * Math.ceil(this.configData.imgList.length / 4)) + 'px'
				}
			},
			four() {
				return {
					height: this.configData.height / Math.ceil(this.configData.imgList.length / 4) + 'px'
				}
			},
		},
		mounted() {
			this.$nextTick(function() {
				this.height = this.$refs.list[0].offsetHeight + 'px'
				if(this.configData.isPaging == '1') {
					this.showLine = Math.ceil(this.configData.imgList.length / (this.configData.layoutMode * this.configData.line))
				} else {
					this.showLine = 1
				}
			})
		},
		methods: {

		},

	}
</script>

<style lang="less" scoped>
	.picture-box {
		li {
			box-sizing: border-box;
		}
		.img-list-index1 {
			li {
				overflow: hidden;
			}
			img {
				width: 100%;
				height: 100%;
				display: block;
			}
			li:nth-child(1),
			li:nth-child(4n+1) {
				float: left;
				width: 50%;
				height: 90px;
			}
			li:nth-child(2),
			li:nth-child(4n+2) {
				float: left;
				width: 50%;
				height: 45px;
			}
			li:nth-child(3),
			li:nth-child(4n+3) {
				float: left;
				width: 50%;
			}
			li:nth-child(3),
			li:nth-child(4),
			li:nth-child(4n+3),
			li:nth-child(4n+4) {
				float: left;
				width: 25%;
				height: 45px;
			}
			.w50 {
				width: 50%!important;
			}
			.h100 {
				height: 90px!important;
			}
			.w100 {
				width: 100%!important;
			}
		}
		.img-list-index {
			li {
				float: left;
				height: 90px;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
		.el-carousel__button {
			background-color: #4b74ff;
		}
	}
</style>