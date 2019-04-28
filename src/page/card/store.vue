<template>
	<div class="card-store">
		<div class="nub-top">
			<div class="right-div">
				<p>符合搜索条件的企业总数</p>
				<p class="r-num">{{ totalNums }}</p>
			</div>
			<h2>通用卡可用的联盟企业</h2>
		</div>
		<div class="store-cont">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="allianceName" label="联盟企业名称" min-width="120"></el-table-column>
				<el-table-column prop="allianceShortName" label="联盟企业简称" min-width="120"></el-table-column>
				<el-table-column prop="logo" label="联盟企业LOGO" min-width="120">
					<template slot-scope="scope">
						<div class="image-div">
							<img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" class="image">
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" min-width="140">
					<template slot-scope="scope">
						{{scope.row.createTime | formatDate}}
					</template>
				</el-table-column>
			</el-table>
			<el-pagination ref="paging" 
				@size-change="handleSize" 
				@current-change="handleCurrent" 
				:current-page.sync="curPage" 
				:page-sizes="[10, 20, 30, 50, 100]"
				:page-size="pageSize" layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页" 
				:total="totalNums" class="flex_center">
				<span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				curPage: 1,
				pages: 1,
				pageSize: 10,
				totalNums: 1,
				allianceId:'',
				allianceName:'',
				allianceShortName:'',
				cid: ''
			}
		},
		methods: {
			handleSize (sizeVal) {
				this.pageSize = sizeVal
				this.curPage = 1
				this.$refs.paging.lastEmittedPage = 1
				this.getAvailableAllianceList()
			},
			handleCurrent (currentVal) {
				this.curPage = currentVal
				this.getAvailableAllianceList()
			},
			getAvailableAllianceList () {
				let vm = this
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					cardId: vm.cid,
					curPage: vm.curPage,
					pageSize: vm.pageSize
				}
				vm.$get(vm.$api.card.getAvailableAllianceList, param).then(resp => {
					vm.tableData = resp.list
					vm.totalNums = resp.totalNums
					vm.pages = resp.pages || 1
				})
			}
		},
		created (){
			this.cid = this.$route.query.cid
			this.getAvailableAllianceList()
		}
	}
</script>

<style lang="less">
.card-store {
	.store-cont {
		margin: 20px;
		padding: 20px;
		background-color: #fff;
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.image-div {
		width: 80px;
		height: 40px;
		background-color: #F5F6FA;
		display: flex;
		justify-content: center;
		align-items: center;
		.image {
			width:auto;
			height:auto;
			max-width:100%;
			max-height:100%;
		}
	}
	.nub-top {
		background-color: #fff;
		padding: 10px 30px 50px;
		.right-div {
			float: right;
			color: rgba(0, 0, 0, 0.45);
			text-align: center;
			padding: 0 20px;
			margin: 10px;
			border-left: 1px solid #ccc;
			.r-num {
				font-size: 32px;
				color: #000;
			}
		}
	}
}
</style>
