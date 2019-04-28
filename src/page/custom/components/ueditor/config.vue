<template>
	<div class="ueditor-box" v-if="show">
		<c-ueditor ref="editor" v-model="form.contnet"></c-ueditor>
	</div>
</template>

<script>
	import cUeditor from '@/components/base/cUeditor'
	export default {
		components: {
			cUeditor
		},
		model: {
			prop: 'form',
			event: 'setData'
		},
		props: {
			data: {
				type: Object,
				default: function() {
					return {}
				}
			},
			activeId: String,
			form: {
				type: Object,
				default: function() {
					return {
						contnet: '',
						imgId: ''
					}
				}
			}
		},
		data() {
			let vm = this
			return {
				show: false
			}
		},
		watch: {
			'form.contnet' () {
				let vm = this
				if(vm.show) {
					vm.$nextTick(() => {
						vm.form.imgId = sessionStorage['ueditorImgId']
						vm.$emit('setData', vm.form)
					})
				}
			}
		},
		mounted() {
			if(this.activeId == sessionStorage['activeId']) {
				this.show = true
				this.$nextTick(function() {
					this.form = JSON.stringify(this.data) != "{}" ? this.data : this.form
					this.$emit('setData', this.form)
				})
			}
		},
		methods: {}
	}
</script>

<style lang="less">
	.ueditor-box {}
</style>