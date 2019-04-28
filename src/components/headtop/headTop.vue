<template>
	<div class="head_top">
		
		<el-row class="header_container">
			<el-col :span="24" class="btn-g">
				<span class="top-title">智慧商业营销决策管理系统</span>
				<div class="btn_top" @click="openQrcodeVisible">
					<i class="fa fa-qrcode"></i>
				</div>
				
				<!--<el-popover
					placement="bottom"
					width="300"
					trigger="click">
					<el-tabs style="width: 100%; border: 1px solid #dcdfe6;">
						<el-tab-pane>
							<div slot="label" style="width: 130px; text-align: center;">通知()</div>
							<div style="overflow: auto; height: 250px">
								<el-col v-for="o in 10" :key="o" style="padding: 10px; border-top: 1px solid #F2F6FC;">
									通知{{o}}
								</el-col>
							</div>
						</el-tab-pane>
						<el-tab-pane>
							<div slot="label" style="width: 130px; text-align: center;">消息()</div>
							<div style="overflow: auto; height: 250px">
								<el-col v-for="o in 5" :key="o" style="padding: 10px; border-top: 1px solid #F2F6FC;">
									消息{{o}}
								</el-col>
							</div>
						</el-tab-pane>
					</el-tabs>
					<el-button @click="routeNews" style="width: 100%;">通知管理</el-button>						
					<i slot="reference" class="btn_top el-icon-bell"></i>
				</el-popover>-->
				<div class="portrait">
					<img v-if="avatar" :src="avatar" alt="" >
					<img v-else src="../../assets/images/def_img.png" alt="">
				</div>
				<el-dropdown trigger="click" style="height: 65px; line-height: 65px;">
					<span class="el-dropdown-link">
						<span style="padding: 0 16px;">{{name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="routePust('/base-info')">账户信息</el-dropdown-item>
						<el-dropdown-item @click.native="routePust('/password')">修改密码</el-dropdown-item> 
						<el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<el-dialog title="扫码进入线上店铺" :visible.sync="qrcodeVisible" width="280px">
			<div id="qrcode" class="label" ref="qrcode"></div>
		</el-dialog>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { mapGetters, mapMutations } from 'vuex'
	
export default {
	data () {
		return {
			activeName: 'first',
			name: 'CGC',
			qrcodeVisible:false
		}
	},
	components: {
        QRCode
	},
	computed: {
		...mapGetters('base', {
			avatar: 'avatar'
		})
	},
	methods: {
		...mapMutations('base', [
			'setAvarar'
		]),
		routePust (val) {
			this.$router.push(val)
		},
		logout () {
			let vm = this 
			vm.$confirm('是否确认退出登录', '提示', {
				confirmButtonText: '退出',
				cancelButtonText: '取消'
			}).then(() => {
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					roleType: sessionStorage['roleType']
				}
				vm.$post(vm.$api.users.logout, param).then(resp => {
					vm.$router.push('/login')
				})
			})
			setTimeout(function(){ // 获取焦点位置,令焦点失去聚焦
				document.activeElement.blur()
			}, 0)
		},
		routeNews () {
			this.$router.push('/news')
		},
		scavenging (){
      let vm = this 
      let param = {
       	accountId: localStorage['userId' + sessionStorage['roleTypeId']]
      }
      vm.$get(vm.$api.setting.getShopUrl, param).then(resp => {
				vm.qrcode(resp.url)
        });
      },
      qrcode(qrcodeUrl){
			let qrcode = new QRCode('qrcode', {  
				width: 240,  // 设置宽度 
				height: 240, // 设置高度
				text: qrcodeUrl
		  })  
		},
		openQrcodeVisible () {
			let vm = this
			vm.qrcodeVisible = true
			vm.scavenging()
			vm.openQrcodeVisible = () => {
				vm.qrcodeVisible = true
			}
		}
	},
	created () {
		this.name = localStorage['account'+sessionStorage['roleTypeId']];
		this.setAvarar(localStorage['avatar' + sessionStorage['roleTypeId']])
	}
}
</script>



<style lang="less">
	@import '../../style/mixin';
	.head_top {
		.btn_top {
			display: block;
			height: 65px;
			width: 64px;
			font-size: 18px;
			text-align: center;
			line-height: 65px;
			// z-index: 9999;
			&:hover {
				cursor:pointer;
				background-color: rgba(22, 82, 141, 0.1);			
			}
		}
	}
	.portrait {
		width: 32px;
		height: 32px;
		margin: 16px 0 16px 16px;
		border-radius: 50%;
		background-color: #f0f2f5;
		font-size: 18px;
		line-height: 32px;
		text-align: center;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	
	.hea {
		height: 65px;
		background: #000;
	}
	.top-title {
	    line-height: 64px;
	    font-size: 18px;
		padding-left: 70px;
		font-weight: 400;
	    flex: 1;
	}
	.header_container{
		background-color: #fff;
		height: 65px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		box-shadow:0 2px 4px rgba(0,21,41,.08);
	    /*.top-title {
			height: 65px;
		    line-height: 65px;
		    font-size: 32px;
		    float: left;
		    padding-left: 75px;
		}*/
		.btn-g{
			display: flex;
			justify-content: flex-end;
			padding-right: 20px;
		}
		
		.col-back {
			padding: 10px;
			border-bottom: 1px solid #97a8be;
		}
	}
	.crumb {
		margin-top: 6px;
		padding: 20px 30px;
		.el-breadcrumb__inner.is-link{
			color:#48576a;
			font-weight: normal;
			transition:color .15s linear;
		}
		.el-breadcrumb__inner{
			color:#97a8be !important;
		}
		.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
			font-weight: normal;
			text-decoration: none;
			-webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
			transition: color .2s cubic-bezier(.645,.045,.355,1);
			color: #48576a;
		}
		a:hover {
			color: #409EFF;
		}
		.el-breadcrumb__item:last-child .el-breadcrumb__inner a{
			color:#97a8be !important;
		}
	}
</style>
