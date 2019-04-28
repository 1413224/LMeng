<template>
	<div class="button-box">
		<el-carousel arrow="never" :autoplay="false" :height="height" :indicator-position="showLine > 1? 'outside' : 'none'" :style="{backgroundColor:configData.backgroundColor}">
			<el-carousel-item v-for="i in showLine" :key="i">
				<ul v-if="configData.buttonList.length > (configData.lineNumber * configData.line) && configData.isPaging == '1'" class="button-list-index clearfix" ref="list">
					<li v-if="index >= (configData.lineNumber * configData.line * (i-1)) && index < (configData.lineNumber * configData.line * i)" v-for="(item,index) in configData.buttonList" :key="index" :style="styleObject">
						<img v-if="item.imgUrl" :src="item.imgUrl" :style="imgStyle" />
						<img v-else :src="'./static/icon/jia.png'" :style="imgStyle" />
						<div :style="{color:item.color}">{{item.text != '' ? item.text : '按钮文字'}}</div>
					</li>
				</ul>
				<ul v-else class="button-list-index clearfix" ref="list" :style="{backgroundColor:configData.backgroundColor}">
					<li v-for="(item,index) in configData.buttonList" :key="index" :style="styleObject">
						<img v-if="item.imgUrl" :src="item.imgUrl" :style="imgStyle" />
						<img v-else :src="'./static/icon/jia.png'" :style="imgStyle" />
						<div :style="{color:item.color}">{{item.text != '' ? item.text : '按钮文字'}}</div>
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
			'configData.lineNumber' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.buttonList.length / (this.configData.lineNumber * this.configData.line))
					} else {
						this.showLine = 1
					}
				})
			},
			'configData.buttonList' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.buttonList.length / (this.configData.lineNumber * this.configData.line))
					} else {
						this.showLine = 1
					}
				})
			},
			'configData.line' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.buttonList.length / (this.configData.lineNumber * this.configData.line))
					} else {
						this.showLine = 1
					}

					if(this.configData.buttonList.length < (this.configData.lineNumber * this.configData.line)) {
						this.$message.warning('注意：按钮数量不足')
					}
				})
			},
			'configData.isPaging' () {
				this.$nextTick(function() {
					this.height = this.$refs.list[0].offsetHeight + 'px'
					if(this.configData.isPaging == '1') {
						this.showLine = Math.ceil(this.configData.buttonList.length / (this.configData.lineNumber * this.configData.line))
					} else {
						this.showLine = 1
					}
				})
			}
		},
		computed: {
			styleObject() {
				return {
					width: 100 / this.configData.lineNumber + '%',
				}
			},
			imgStyle() {
				if(this.configData.borderRadius == '0') {
					return {
						borderRadius: '0px'
					}
				} else if(this.configData.borderRadius == '1') {
					return {
						borderRadius: '10px'
					}
				} else {
					return {
						borderRadius: '50%'
					}
				}
			}
		},
		created() {
			this.$nextTick(function() {
				this.height = this.$refs.list[0].offsetHeight + 'px'
				if(this.configData.isPaging == '1') {
					this.showLine = Math.ceil(this.configData.buttonList.length / (this.configData.lineNumber * this.configData.line))
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
	.button-box {
		.button-list-index {
			li {
				float: left;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				padding: 10px 0;
				font-size: 13px;
				box-sizing: border-box;
				img {
					width: 44px;
					height: 44px;
					margin-bottom: 5px;
				}
			}
		}
		.el-carousel__button {
			background-color: #4b74ff;
		}
	}
</style>