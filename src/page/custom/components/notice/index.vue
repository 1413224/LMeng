<template>
	<ul class="notice" :style="styleObject">
		<li class="clearfix">
			<div class="left img-left">
				<img :src="configData.icon != '' ? configData.icon :'http://www.cgc999.com/new/static/index/index_notice.png'" />
			</div>
			<div class="left ov-box">
				<transition name="notice-classes-transition" enter-active-class="animatedIn" leave-active-class="animatedOut">
					<div class="text-right" v-for="(item,index) in configData.noticeList" :key="index" v-if="noticeIndex == index">
						{{item.text}}
					</div>
				</transition>
			</div>
		</li>

	</ul>
</template>

<script>
	export default {
		props: {
			configData: Object,
		},
		data() {
			return {
				noticeIndex: 0,
				speed: 1000
			}
		},
		computed: {
			styleObject() {
				return {
					backgroundColor: this.configData.backgroundColor,
					color: this.configData.color,
					noticeSetInterval: '',
				}
			}
		},
		watch: {
			'configData.speed' () {
				let vm = this
				vm.speed = Number(vm.configData.speed) * 1000
				vm.gun()
			}
		},
		mounted() {
			this.speed = Number(this.configData.speed) * 1000
			this.gun()
		},
		methods: {
			gun() {
				let vm = this
				clearInterval(vm.noticeSetInterval)
				vm.noticeSetInterval = setInterval(function() {
					if(vm.noticeIndex < (vm.configData.noticeList.length - 1)) {
						vm.noticeIndex++;
					} else {
						vm.noticeIndex = 0
					}
				}, vm.speed)
			}
		},

	}
</script>

<style lang="less" scoped>
	.notice {
		li {
			height: 40px;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
			.img-left {
				height: 100%;
				padding-right: 10px;
				border-right: 1px solid #E1E1E1;
				img {
					height: 100%;
					width: auto;
					max-width: 40px;
				}
			}
			.ov-box {
				overflow: hidden;
				height: 100%;
			}
			.text-right {
				padding: 0 10px;
				width: 300px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				box-sizing: border-box;
				font-size: 14px;
				line-height: 20px;
			}
			.animatedIn {
				animation: in 0.3s linear;
			}
			.animatedOut {
				animation: out 0.3s linear;
			}
			@keyframes in {
				from {
					transform: translateY(0px);
				}
				to {
					transform: translateY(-20px);
				}
			}
			@keyframes out {
				from {
					transform: translateY(0px);
				}
				to {
					transform: translateY(-40px);
				}
			}
		}
	}
</style>