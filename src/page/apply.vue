<template>
	<div class="apply">
		<div class="nub-top">
			<h2>应用</h2>
		</div>
		<div class="clear">
			<div v-for="(item, index) in applyList" :key="index" @click="clickCard(item)" class="box-card">
				<img :src="item.img" alt="" class="img-card">
				<div class="back-card">
					<span>{{ item.label }}</span>
					<p class="depict">{{ item.depict }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters('users', {
			applyList: 'apply',
			menuList: 'menu'
		})
	},
	methods: {
		clickCard (item) {
			let vm = this
			let index
			for (let i = 0; i < vm.menuList.length; i++) {
				if (vm.menuList[i].index == item.index) { // 判断是否已经存在菜单
					if (item.children) {
						if (item.children[0].type==='submenu') {
							vm.$router.push('/'+item.children[0].children[0].index)
						} else {
							vm.$router.push('/'+item.children[0].index)
						}
					} else {
						vm.$router.push('/'+item.index)
					}
					return
				}
				if (vm.menuList[i].index == 'apply') {
					index = i + 1
				}
			}
			// 插入新菜单
			vm.$store.commit('users/insertDirectory', { index: index })
			if (item.children) {
				if (item.children[0].type==='submenu') {
					vm.$router.push('/'+item.children[0].children[0].index)
				} else {
					vm.$router.push('/'+item.children[0].index)
				}
			} else {
				vm.$router.push('/'+item.index)
			}
			return
			return
		}
	}
}
</script>

<style lang="less" scoped>
.apply {
	.box-card {
		margin: 20px 0 0 20px;
		float: left;
		border-radius: 4px;
		width: 320px;
		height: 300px;
		background-color: #fff;
		color: #000;
		font-size: 16px;
		&:hover {
			cursor: pointer;
			color: #4B74FF;
		}
		.img-card {
			width: 100%;
			height: 200px;
		}
		.back-card {
			padding: 12px 20px;
			line-height: 22px;
			.depict {
				color: rgba(0,0,0,.45);
				margin-top: 5px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				font-size: 14px;
			}
		}
	}
}
</style>