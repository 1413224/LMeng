<template>
	<div class="clerk">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的店员总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>店员管理</h2>
			<div class="btn_top" @click="openQrcodeVisible">
				<i class="fa fa-qrcode" style="font-size: 56px;padding-right: 20px;"></i>
				<div class="clerk-link">
					点击查看绑定店员二维码
				</div>
			</div>
		</div>
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8" style="height: 60px;">
						<el-form-item label="绑定时间 : " style="padding-left: 10px;">
				            <el-date-picker
				                v-model="timeSlot"
				                type="datetimerange"
				                :picker-options="pickerOptions"
				                range-separator="至"
				                start-placeholder="开始日期"
				                end-placeholder="结束日期"
				                :default-time="['00:00:00', '23:59:59']"
				                style="width: 100%;">
				            </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8" style="height: 60px;">
						<el-form-item label="状态 : ">
							<el-select v-model="status" style="width: 100%;">
								<el-option :value="-1" label="所有"></el-option>
								<el-option :value="0" label="不可用"></el-option>
								<el-option :value="1" label="可用"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<template v-if="enState">
						<el-col :span="8" style="height: 60px;">
							<el-form-item label="关键字 : ">
								<el-input v-model="keyword" placeholder="搜索手机号、姓名、昵称"></el-input>
							</el-form-item>
						</el-col>
					</template>
					<el-col :span="8" style="height: 60px;">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
						<el-button type="text" v-if="!enState" @click="enState=!enState">展开 <i class="el-icon-arrow-down"></i></el-button>
						<el-button type="text" v-else  @click="enState=!enState">收起 <i class="el-icon-arrow-up"></i></el-button>
					</el-col>
				</el-form>
			</el-row>
			<div class="border">
				<el-table :data="sellerData" style="width: 100%">
					<el-table-column prop="logo" label="店员头像" min-width="80">
						<template slot-scope="scope">
							<div>
								<img v-if="scope.row.logo && scope.row.logo.original" :src="scope.row.logo.original" class="logo-img">
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="mobile" label="手机号" min-width="120">
						<template slot-scope="scope">
							<el-popover
								placement="top-start"
								trigger="hover">
								<div style="line-height: 30px;">
									<p>昵称: 
										<span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
									<p>姓名: 
										<span v-if="scope.row.realName">{{scope.row.realName}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
								</div>
								<div slot="reference">{{scope.row.mobile}}</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="类型" min-width="80">
						<template slot-scope="scope">
	                        <el-tag
	                        	v-if="scope.row.type == 1"
	                            :type="scope.row.type == 1 ? 'success' : 'info'"
	                            disable-transitions
	                            style="cursor: pointer;"
	                            @click.native="openConfirm(scope.row.sellerId, scope.row.type, '是否是否修改为店员?', modifySeller)">
	                            {{scope.row.type == 1 ? '店长' : '店员'}}
	                        </el-tag>
	                        <el-tag
	                        	v-if="scope.row.type == 2"
	                            :type="scope.row.type == 1 ? 'success' : 'info'"
	                            disable-transitions
	                            style="cursor: pointer;"
	                            @click.native="openConfirm(scope.row.sellerId, scope.row.type, '是否修改为店长?', modifySeller)">
	                            {{scope.row.type == 1 ? '店长' : '店员'}}
	                        </el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="recommendNum" label="粉丝数" min-width="60"></el-table-column>
					<el-table-column prop="allianceRecommendNum" label="联盟会员" min-width="60"></el-table-column>
					<el-table-column label="注册时间" min-width="110">
						<template slot-scope="scope">
					        <div style="width: 90px;">{{scope.row.registerTime | formatDate}}</div>
					    </template>
					</el-table-column>
			        <el-table-column label="绑定时间" min-width="110">
						<template slot-scope="scope">
			              <div style="width: 90px;">{{scope.row.createTime | formatDate}}</div>
			          	</template>
					</el-table-column>
					<el-table-column label="更新时间" min-width="110">
						<template slot-scope="scope">
			              <div style="width: 90px;">{{scope.row.updateTime | formatDate}}</div>
			          	</template>
					</el-table-column>
					<el-table-column prop="status" label="状态" min-width="80">
						<template slot-scope="scope">
	                        <el-tag
	                            :type="scope.row.status ? 'success' : 'danger'"
	                            disable-transitions
	                            style="cursor: pointer;"
	                            @click.native="openConfirm(scope.row.sellerId,scope.row.status, '是否改变店员状态?', modifySellerStatus)">
	                            {{scope.row.status == 1 ? '可用' : '禁用'}}
	                        </el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="60" fixed="right">
						<template slot-scope="scope">
				            <el-tooltip class="item" effect="dark" content="删除" placement="top">
				                <el-button
				                size="mini"
				                type="danger"
				                icon="el-icon-delete"
				                plain
				                @click="openConfirm(scope.row.sellerId, scope.row.status, '是否将此店员解绑?', delSeller)"></el-button>
				            </el-tooltip>
				        </template>
					</el-table-column>
				</el-table>
			</div>
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
		<el-dialog title="扫码进入线上店铺" :visible.sync="qrcodeVisible" width="280px">
			<div id="qrcode" class="label" ref="qrcode"></div>
		</el-dialog>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
	data () {
		return {
		  qrcodeVisible:false,
		  timeSlot: [],
		  curPage: 1,
		  pageSize: 10,
		  pages: 1,
		  totalNums: 0,
		  pickerOptions: {
	      shortcuts: [
					{
	      	  text: '最近一周',
	      	  onClick(picker) {
	      	    const end = new Date()
	      	    const start = new Date()
	      	    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
	      	    picker.$emit('pick', [start, end])
	      	  }
	      	},
	      	{
	      	  text: '最近一个月',
	      	  onClick(picker) {
	      	    const end = new Date()
	      	    const start = new Date()
	      	    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
	      	    picker.$emit('pick', [start, end])
	      	  }
	      	},
	      	{
	      	  text: '最近三个月',
	      	  onClick(picker) {
	      	    const end = new Date()
	      	    const start = new Date()
	      	    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
	      	    picker.$emit('pick', [start, end])
	      	  }
					}
				]
	    },
		  search: {
		  	status: -1,
		    startTime: '',
		    keyword: '',
		    endTime: '',
		  },
		  status: -1,
		  keyword: '',
		  enState: false,
		  sellerId: '',
		  sellerData: [],
		  allianceId: ''
		}
	},
	components: {
        QRCode
	},
	beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getSellerList()
        })
    },
	methods: {
	    resetting() {
	      let vm = this
	      vm.status = -1;
	      vm.timeSlot = []
	      vm.keyword = ''
	      vm.search = {
	      	status: -1,
	        startTime: '',
	        keyword: '',
	        endTime: '',
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getSellerList()
	    },
	    onSearch() {
	      let vm = this
	      vm.search = {
	        // 进行搜索条件缓存
	        status: vm.status,
	        startTime: parseInt(Date.parse(vm.timeSlot[0]) / 1000) || '',
	        endTime: parseInt(Date.parse(vm.timeSlot[1]) / 1000) + 86399 || '',
	        keyword: vm.keyword,
	      }
	      vm.curPage = 1
	      vm.$refs.paging.lastEmittedPage = 1
	      vm.getSellerList()
	    },
	    handleSize(sizeVal) {
	      this.pageSize = sizeVal
	      this.curPage = 1
	      this.$refs.paging.lastEmittedPage = 1
	      this.getSellerList()
	    },
	    handleCurrent(currentVal) {
	      this.curPage = currentVal
	      this.getSellerList()
	    },
	    getSellerList() {
	      let vm = this
	      let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		        curPage: vm.curPage,
		        pageSize: vm.pageSize
	      })
	      vm.$get(vm.$api.clerk.getSellerList, param).then(resp => {
		        vm.sellerData = resp.pageBean.list
		        vm.allianceId = resp.allianceId
		        vm.totalNums = resp.pageBean.totalNums
		        vm.pages = resp.pageBean.pages || 1
	      })
	    },
	    openConfirm(id,status, text, callback) {
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                callback(id,status)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        modifySellerStatus (id,status) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                sellerId: id,
                status: +!status
			}
			vm.$post(vm.$api.clerk.modifySellerStatus, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getSellerList()
			})
        },
        modifySeller (id, type) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                sellerId: id,
                type: type == 1 ? '2':'1'
			}
			vm.$post(vm.$api.clerk.modifySeller, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getSellerList()
			})
        },
        delSeller (id, status) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                sellerId: id
			}
			vm.$post(vm.$api.clerk.delSeller, param).then(resp => {
                vm.$message({
                    type: 'success',
                    message: '操作成功!'
                })
                vm.getSellerList()
			})
        },
//		scavenging (){
//		    let vm = this 
//		    let param = {
//		       	accountId: localStorage['userId' + sessionStorage['roleTypeId']]
//		    }
//	        vm.$get(vm.$api.setting.getShopUrl, param).then(resp => {
//				vm.qrcode(resp.url)
//	        });
//	    },
	    qrcode(qrcodeUrl){
			let qrcode = new QRCode('qrcode', {  
				width: 240,  // 设置宽度 
				height: 240, // 设置高度
				text: qrcodeUrl
		    })  
		},
		openQrcodeVisible () {
			let vm = this
			let urlTemp = ''
			vm.qrcodeVisible = true
			if (window.location.host == 'www.cgc999.com'){
				 urlTemp = 'http://' + window.location.host + '/new/index.html#/user_seller/index?allianceId=' + vm.allianceId
			}else {
				 urlTemp = 'https://' + window.location.host + '/web/new/index.html#/user_seller/index?allianceId=' + vm.allianceId
			}
			vm.$nextTick(() => {
				vm.qrcode(urlTemp)
			})
			vm.openQrcodeVisible = () => {
				vm.qrcodeVisible = true
			}
		}
	  }
}
</script>

<style lang="less">
.clerk {
	.box-card {
        margin: 20px;
    }
    .btn_top {
		display: block;
		width: 160px;
		float: right;
		margin-top: -40px;
		margin-right: 20px;
		font-size: 18px;
		text-align: center;
		line-height: 30px;
		// z-index: 9999;
		&:hover {
			cursor:pointer;			
		}
	}
	.clerk-link {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.45);
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
    .flex_center {
	    padding-top: 20px;
	    display: flex;
	    justify-content: center;
	}
	.logo-img {
		margin: 0 auto;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
</style>