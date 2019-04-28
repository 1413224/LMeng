<template>
	<div class="region-menu">
		<el-checkbox-group 
		    v-model="checkedCities1">
		    <el-checkbox v-for="city in province" :label="city" :key="city">{{city}}
		    </el-checkbox>
		</el-checkbox-group>
		<div class="region-list1">
	    	<el-checkbox-group
	    		class="region-list"
			    v-model="checkedCities2">
			    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			</el-checkbox-group>
	    </div>
	</div>
</template>

<script>
const cityOptions1 = ['北京市', '天津市', '河北省', '山西省','内蒙古自治区', '山西省','河北省', '山西省','河北省', '山西省','河北省', '山西省', '河北省', '山西省','河北省', '山西省','河北省', '山西省','河北省', '山西省','河北省', '山西省', '河北省', '山西省','河北省', '山西省','河北省', '山西省','河北省', '山西省','河北省', '山西省'];
const cityOptions2 = ['北京市', '天津市', '河北省', '山西省','内蒙古自治区', '山西省','河北省'];
export default {
    data () {
		return {
			checkedCities1: [],
        	province: cityOptions1,
        	checkedCities2: [],
        	cities: cityOptions2
		}
	},
	computed: {
	},
	components: {
	},
	methods: {
		
	},
	created(){
//		this.getCauseList()
	}
}
</script>

<style lang="less">
.region-menu {
	position:relative;
	.el-checkbox {
		width: 20%;
		height: 40px;
	    line-height: 40px;
	}
	.el-checkbox:first-child {
		margin-left: 30px;
	}
	.region-list {
		display: none;
		background: #d0e6f7;
	}
	.el-checkbox:hover {
		display: block;
		position: absolute;
		background: #d0e6f7;
		height: 100px;
	}
}
</style>