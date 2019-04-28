<template>
	<div class="notice">
		<!-- <div class="nub-top">
			<h2>通知管理</h2>
		</div> -->
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的通知人总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>通知人管理</h2>
		</div>
		<!-- 搜索表单 -->
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="50px" label-position="left">
					<el-col :span="8">
						<el-form-item label="状态 : " style="padding-left: 10px;">
							<el-select v-model="status" placeholder="请选择" style="width: 100%;">
								<el-option :key="2" label="全部" :value="2"></el-option>
								<el-option :key="1" label="可用" :value="1"></el-option>
								<el-option :key="0" label="禁用" :value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<el-row>
				<el-col style="padding: 0 10px 10px;">
					<el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="editNotice()" v-has="'@edit-notice'">新增角色通知人</el-button>
				</el-col>
			</el-row>
			<!-- 表格数据 -->
			<el-table :data="noticeData" style="width: 100%">
				<el-table-column prop="mobile" label="通知人手机" min-width="120"></el-table-column>
				<el-table-column prop="avatar" label="通知人头像" min-width="120">
					<template slot-scope="scope">
						<div>
							<img v-if="scope.row.avatar && scope.row.avatar.original" :src="scope.row.avatar.original" class="avatar-img">
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="realName" label="通知人姓名" min-width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.realName">{{ scope.row.realName }}</span>
						<span v-else style="color: #ccc">未设置</span>
					</template>
				</el-table-column>
				<el-table-column prop="nickname" label="通知人昵称" min-width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.nickname">{{ scope.row.nickname }}</span>
						<span v-else style="color: #ccc">未设置</span>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" min-width="80">
					<template slot-scope="scope">
						<el-tag
						:type="scope.row.status ? 'success' : 'danger'"
						disable-transitions>{{scope.row.status ? '可用' : '禁用'}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | formatDate}}</span>
                    </template>
                </el-table-column>
				<el-table-column label="操作" min-width="120" fixed="right">
                    <template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="编辑" v-has="'edit-notice'" placement="top">
                            <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit-outline"
                            plain
                            @click="editNotice(scope.row.notificationId)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" v-has="'de-notice'" placement="top">
                            <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            plain
                            @click="openConfirm(scope.row.notificationId)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="扫二维码" placement="top" v-if="btnQrcode">
                            <div class="btn_top" @click="openQrcodeVisible(scope.row.notificationId)">
								<i class="fa fa-qrcode" style="font-size: 24px;"></i>
							</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
			</el-table>
			<el-dialog title="" :visible.sync="qrcodeVisible" width="280px">
				<div id="qrcode" class="label" ref="qrcode"></div>
			</el-dialog>
			<el-pagination
				ref="paging"
				@size-change="handleSize"
				@current-change="handleCurrent"
				:current-page.sync="curPage"
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
import QRCode from 'qrcodejs2'
export default {
	data () {
		return {
			noticeData: [],
			curPage: 1,
			pages: 1,
			pageSize: 10,
			totalNums: 0,
			search: {
				status: 2
			},
			status: 2,
			qrcodeVisible:false,
			lUrl: location.host,
			isQrcode: false
		}
	},
	components: {
        QRCode
	},
	computed: {
		btnQrcode () {
			return window.winConst.baseURL !== '//cgc.cgc999.com/apigw'
		}
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
			vm.getNotificationList()
        })
    },
	methods: {
		resetting () {
			let vm = this
			vm.status = 2
			vm.search = {
				status: 2
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getNotificationList()
		},
		onSearch () {
			let vm = this
			vm.search = { // 进行搜索条件缓存
				status: vm.status
			}
			vm.curPage = 1
            vm.$refs.paging.lastEmittedPage = 1
			vm.getNotificationList()
		},
		handleSize (sizeVal) {
			this.pageSize = sizeVal
			this.curPage = 1
            this.$refs.paging.lastEmittedPage = 1
			this.getNotificationList()
		},
		handleCurrent (currentVal) {
			this.curPage = currentVal
			this.getNotificationList()
		},
		getNotificationList () {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				curPage: vm.curPage,
				pageSize: vm.pageSize
			})
			vm.$get(vm.$api.notice.getNotificationList, param).then(resp => {
				vm.noticeData = resp.list
				vm.totalNums = resp.totalNums
				vm.pages = resp.pages || 1
			})
		},
		editNotice (id) {
			this.$router.push({ path: 'edit-notice', query: { nid: id }})
		},
		openConfirm(id) {
			this.$confirm('是否删除该通知人', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteNotification(id)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		deleteNotification (id) {
			let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                notificationId: id,
            }
            vm.$post(vm.$api.notice.deleteNotification, param).then(resp => {
                vm.getNotificationList()
                vm.$message({
					type: 'success',
					message: '删除成功!'
				})
            })
		},
		qrcode(qrcodeUrl){
			let qrcode = new QRCode('qrcode', {  
				  width: 240,  // 设置宽度 
				  height: 240, // 设置高度
				  text: qrcodeUrl
		  	})  
		},
		openQrcodeVisible (id) {
			let vm = this
			let urlTemp = ''
			if (document.getElementById("qrcode")) {
				document.getElementById("qrcode").innerHTML = ''
			}
			vm.qrcodeVisible = true
			if (window.location.host == 'www.cgc999.com'){
				 urlTemp = 'http://' + window.location.host + '/new/index.html#/notification/index?accountId='+localStorage['userId'+sessionStorage['roleTypeId']]+'&notificationId=' + id
			}else {
				 urlTemp = 'https://' + window.location.host + '/web/new/index.html#/notification/index?accountId='+localStorage['userId'+sessionStorage['roleTypeId']]+'&notificationId=' + id
			}
			console.log(urlTemp)
			vm.$nextTick(() => {
				vm.qrcode(urlTemp)
//				vm.qrcodeVisible = false
			})
//			vm.openQrcodeVisible = () => {
//				vm.qrcodeVisible = true
//			}
		}
	}
}

</script>

<style lang="less">
.notice {
	.form-flex {
		display: flex;
		justify-content: flex-end;
		padding-top: 10px;
	}
	.box-card {
		margin: 20px;
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.avatar-img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
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
	.btn_top {
		float: left;
	}
}
</style>