<template>
	<div>
		<font-class @setData="getData"></font-class>
		<!--<ul class="icon-box clearfix">
			<li v-for="(icon,index) in icons" @click="iconActive(icon)">
				<i :class="icon"></i>
				<i :class="'icon iconfont ' + icon"></i>
			</li>
		</ul>-->
	</div>
</template>

<script>
	import fontClass from '@/assets/css/iconfont/fontclass'
	export default {
		components: {
			fontClass
		},
		data() {
			return {
				icons1: [
					'el-icon-info', 'el-icon-error', 'el-icon-success', 'el-icon-warning', 'el-icon-question', 'el-icon-back',
					'el-icon-arrow-left', 'el-icon-arrow-down', 'el-icon-arrow-right', 'el-icon-arrow-up', 'el-icon-caret-left', 'el-icon-caret-bottom',
					'el-icon-caret-top', 'el-icon-caret-right', 'el-icon-d-arrow-left', 'el-icon-d-arrow-right', 'el-icon-minus', 'el-icon-plus',
					'el-icon-remove', 'el-icon-circle-plus', 'el-icon-remove-outline', 'el-icon-circle-plus-outline', 'el-icon-close', 'el-icon-check',
					'el-icon-circle-close', 'el-icon-circle-check', 'el-icon-circle-close-outline', 'el-icon-circle-check-outline', 'el-icon-zoom-out', 'el-icon-zoom-in',
					'el-icon-d-caret', 'el-icon-sort', 'el-icon-sort-down', 'el-icon-sort-up', 'el-icon-tickets', 'el-icon-document',
					'el-icon-goods', 'el-icon-sold-out', 'el-icon-news', 'el-icon-message', 'el-icon-date', 'el-icon-printer',
					'el-icon-time', 'el-icon-bell', 'el-icon-mobile-phone', 'el-icon-service', 'el-icon-view', 'el-icon-menu',
					'el-icon-more', 'el-icon-more-outline', 'el-icon-star-on', 'el-icon-star-off', 'el-icon-location', 'el-icon-location-outline',
					'el-icon-phone', 'el-icon-phone-outline', 'el-icon-picture', 'el-icon-picture-outline', 'el-icon-delete', 'el-icon-search',
					'el-icon-edit', 'el-icon-edit-outline', 'el-icon-rank', 'el-icon-refresh', 'el-icon-share', 'el-icon-setting',
					'el-icon-upload', 'el-icon-upload2', 'el-icon-download', 'el-icon-loading'
				]
			}
		},
		methods: {
			//选中的图标
			iconActive(icon) {
				this.$emit('setData', 'icon iconfont ' + icon)
			},
			getData(icon) {
				this.$emit('setData', icon)
			}
		},

	}
</script>

<style lang="less">
	.icon-box {
		border: 1px solid #eee;
		border-bottom: none;
		li {
			float: left;
			width: 16.666666666666668%;
			text-align: center;
			color: #666;
			font-size: 13px;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
			padding: 10px 0;
			i {
				font-size: 20px;
			}
		}
		li:hover,
		li:active {
			background-color: #4B74FF;
			cursor: pointer;
			color: white;
		}
		li:nth-child(6n) {
			border-right: none;
		}
	}
</style>