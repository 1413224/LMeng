<template>
    <!-- 待审核管理 -->
	<div class="income">
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>会员通用卡消费日志总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>会员通用卡消费日志</h2>
		</div>
        <el-card class="box-card">
			<!-- 表格数据 -->
            <el-table :data="cardBalanceLog" @selection-change="handleSelectionChange" style="width: 100%">
				<el-table-column prop="name" label="企业通用卡" min-width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}({{scope.row.cardNo}})</span>
                    </template>
                </el-table-column>
				<el-table-column prop="mobile" label="会员信息" min-width="160">
                    <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            trigger="hover">
                            <div style="line-height: 30px;">
                                <p>会员昵称: 
                                    <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
                                    <span v-else style="color: #ccc">未设置</span>
                                </p>
                                <p>会员姓名: 
                                    <span v-if="scope.row.realname">{{scope.row.realname}}</span>
                                    <span v-else style="color: #ccc">未设置</span>
                                </p>
                            </div>
                            <div slot="reference">
                                <img v-if="scope.row.thumb && scope.row.thumb.original" :src="scope.row.thumb.original" alt="" class="image">
                                <span style="vertical-align: middle; display: inline-block; line-height: 50px;">{{scope.row.mobile}}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
				<el-table-column label="余额方向" min-width="80">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.directType == 1" type="danger">增加余额</el-tag>
                        <el-tag size="mini" v-else type="success">减少余额</el-tag>
                    </template>
                </el-table-column>
				<el-table-column prop="balance" label="变更余额" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.directType == 1" style="color: #F56C6C; font-weight: 600;">+ {{scope.row.balance}}</span>
                        <span v-else style="color: #67C23A;">- {{scope.row.balance}}</span>
                    </template>
                </el-table-column>
				<el-table-column prop="remainBalance" label="变更后余额" min-width="100"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="70">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.status" type="success">可用</el-tag>
                        <el-tag size="mini" v-else type="danger">已冻结</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="变更时间" min-width="110">
                    <template slot-scope="scope">
                        <div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
			</el-table>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page="curPage"
				:page-sizes="[10, 20, 30, 50, 100]"
				:page-size="pageSize"
				layout="sizes, prev, slot, next"
                prev-text="上一页"
				next-text="下一页"
				:total="totalNums"
				class="flex_center">
                <span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			cardBalanceLog: [],
			curPage: 1,
			pageSize: 10,
			pages: 1,
            totalNums: 0,
            uid: ''
		}
	},
	methods: {
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getUserCardBalanceLog()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getUserCardBalanceLog()
        },
		getUserCardBalanceLog () {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				userCardId: vm.uid,
				curPage: vm.curPage,
				pageSize: vm.pageSize
			}
			vm.$get(vm.$api.card.getUserCardBalanceLog, param).then(resp => {
				vm.cardBalanceLog = resp.list
                vm.totalNums = resp.totalNums
                vm.pages = resp.pages || 1
			})
        }
	},
	created () {
        this.uid = this.$route.query.uid
        this.getUserCardBalanceLog()
	}
}
</script>

<style lang="less">	
.income {
    .box-card {
        margin: 20px;
        .image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            display: inline-block;
        }
        .flex_space_between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover {
                cursor: pointer;
                &::after{
                    content: '\E616';
                    font-family: 'element-icons' !important;
                    speak: none;
                    font-style: normal;
                    font-weight: normal;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    vertical-align: baseline;
                    display: inline-block;
                    -webkit-font-smoothing: antialiased;
                }
            }
        }
        .input-edit {
            width: 100%;
            border: 1px solid #4B74FF;
        }
    }
    .flex_center {
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }
    .right-div {
		float: right;
		color: rgba(0, 0, 0, 0.45);
		text-align: center;
		padding: 0 20px;
		margin: 10px;
		border-left: 1px solid #ccc;
		.num {
			font-size: 32px;
			color: #000;
		}
	}
}
</style>
