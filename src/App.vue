<template>
	<div id="app" class="fillcontain">
		<transition>
			<router-view/>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			window.$router = this.$router
		}
	}
</script>

<style lang="less">
	@import './style/common';
	@import '//at.alicdn.com/t/font_912483_lcojf3qe8m.css';
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		visibility: hidden;
		clear: both;
	}
</style>