<template>
    <div class="platform">
        <div class="nub-top">
			<h2>平台信息</h2>
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <div v-text="info.name"></div>
			</div>
           <div v-html="info.contact"></div>
        </el-card>
    </div>
</template>

<script>
export default {
	data () {
		return {
			info: {
				name: '',
				contact: ''
			}
		}
	},
	methods: {
		getContactInfo () {
			let vm = this
			let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$get(vm.$api.setting.getContactInfo, param).then(resp => {
                vm.info = resp
            })
		}
	},
	created () {
		this.getContactInfo()
	}
}

</script>

<style lang="less">
.platform {
    .box-card {
        margin: 20px;
    }
}
</style>