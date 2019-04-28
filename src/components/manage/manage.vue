<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="3" style="height: 100%;" class="menu" :class="isCollapse ? 'menu-collapsed' : 'menu-expanded'">
				<div class="title">
					<div class="img-div">
						<img src="../../assets/images/logo_2.png" alt="cgc" style="width: 80%; padding-top: 12px;"/>
					</div>
					<div v-show="!isCollapse" style="padding-left: 10px; font-size: 18px;">联盟企业</div>
				</div>
				<el-menu :collapse="isCollapse"
					class="el-menu--dark menu-overf"
					:default-active="defaultActive"
					text-color="rgba(255,255,255,.8)"
					background-color="#333333"
					router
					:collapse-transition="true"
					style="z-index: 2020;"
					unique-opened>
					 <!-- 最多为三级 -->
					<template v-for="item in menuList">
						<!-- 1级 -->
						<template v-if="item.type === 'title'"> <!-- 标题项 -->
							<el-menu-item :index="item.index" :key="item.index"><i v-if="item.icon" :class="item.icon"></i><span slot="title" v-text="item.label"></span></el-menu-item>
						</template>
						<template v-if="item.type === 'submenu'"> <!-- 下拉标题 -->
							<el-submenu :index="item.index" :key="item.index">
								<template slot="title"><i v-if="item.icon" :class="item.icon"></i><span v-text="item.label"></span></template>
								<!-- 2级 -->
								<template v-if="item.children" v-for="citem in item.children">
									<template v-if="citem.type === 'menu'">  <!-- 项 -->
										<el-menu-item :index="citem.index" :key="citem.index"><span v-text="citem.label"></span></el-menu-item>
									</template>
									<template v-if="citem.type === 'submenu'">
										<el-submenu :index="citem.index" :key="citem.index">
											<template slot="title"><span v-text="citem.label"></span></template>
											<!-- 3级 --> <!-- 只能为项  {index, label}  -->
											<template v-if="citem.children" v-for="titem in citem.children">
												<el-menu-item :index="titem.index" :key="titem.index"><span v-text="titem.label"></span></el-menu-item>
											</template>
										</el-submenu>
									</template>
								</template>
							</el-submenu>
						</template>
					</template>
				</el-menu>
			</el-col>
			<el-col :span="21" style="height: 100%; position: relative;" :class="isCollapse ? 'view-collapsed' : 'view-expanded'">
					<i class="fa menu_on" :class="isCollapse ? 'fa-indent' : 'fa-dedent'" @click="isCollapse=!isCollapse"></i>
					<head-top style="height: 65px;"></head-top>
					<div class="router_view">
						<div class="view_cont">
							<crumbs></crumbs>
							<keep-alive>
								<router-view v-if="$route.meta.keepAlive"></router-view>
							</keep-alive>
							<router-view v-if="!$route.meta.keepAlive"></router-view>
						</div>
						<div class="footer">© CopyRight 2017-{{currentTime.getFullYear()}} CGC999.COM 粤ICP备17041809号-1</div>
					</div>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
import headTop from '@/components/headtop/headTop'
import Crumbs from '@/components/headtop/crumbs'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			isCollapse:false,
			currentTime: new Date()
		}
	},
	computed: {
		crumbsData () {
            let  vm = this
            if (vm.$route.meta instanceof Array) {
                return vm.$route.meta
            }
            if (vm.$route.meta.crumbs) {
                return vm.$route.meta.crumbs
            }
            return []
        },
		defaultActive: function(){
			let val = ''
			for(let item of this.crumbsData) {
				if (item.path) {
					val = item.path
				}
			}
			if (!val) {
				val = this.$route.path
			}
			return val.replace('/', '');
		},
		...mapGetters('users', {
			menuList: 'menu'
		})
	},
	components: {
		headTop,
		Crumbs
	}
}
</script>


<style lang="less">
	/*@import '../../style/mixin';*/
	
	.fillcontain{
		height: 100%;
		width: 100%;
	}
	.el-menu{
		border: none;
		width: 100%;
	}
	.manage_page{
		.title{
			color: #fff;
			text-align: center;
			background: #4B74FF;
			width: 100%;
			height: 65px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			.img-div {
				height: 40px;
				width: 40px;
				background-color: #fff;
				border-radius: 50%;
			}
		}
		.menu{
			background-color:#333333;
			/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
			::-webkit-scrollbar  
			{  
				width: 6px;  
				height: 6px;  
				background-color: rgba(0,0,0,0);  
			}  
			
			/*定义滚动条轨道 内阴影+圆角*/  
			::-webkit-scrollbar-track  
			{  
				-webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);  
				border-radius: 1px;  
				background-color: rgba(0,0,0,0);  
			}  
			
			/*定义滑块 内阴影+圆角*/  
			::-webkit-scrollbar-thumb  
			{  
				border-radius: 3px;  
				-webkit-box-shadow: inset 0 0 3px rgba(255,255,255,.3);  
				background-color: rgba(255,255,255,.3);  
			} 
		}
		.el-submenu__title,.el-menu-item{
			i{
				color: rgba(255,255,255,.7);
			}
			&:hover{
				i {
					color: #fff!important;
				}
				color: #fff!important;
				background-color: #333!important;
			}
		}
		.el-submenu .el-menu-item {
			background-color: #202020!important;
		}
		.el-menu .el-menu--inline {
			background-color: #202020!important;
			.el-submenu .el-submenu__title {
				background-color: #202020!important;
			}
			.el-submenu .el-menu-item {
				background-color: #000!important;
			}
			.el-menu-item.is-active {
				color: #fff;
				background-color: #4B74FF!important;
			}
		}
		/*隐藏列表的时候的展示样式*/
		.menu-collapsed{
			width: 64px;
			overflow: hidden;
			.el-menu--collapse{
				.el-menu-item{
					.el-icon-menu{
						padding-right: 22px;
					}
				}
				.el-submenu{
					i{
						padding-right: 22px;
					}
				}
			}
		}
		.menu-expanded {
			width: 210px;
			overflow: hidden;
		}
		.view-collapsed{
			width: calc(~'100% - 64px');
		}
		.view-expanded{
			width: calc(~'100% - 210px');
		}
		.router_view {
			height: calc(~'100% - 65px');
			overflow: auto;
			background-color: #f0f2f5;
			.view_cont {
				min-height: calc(~'100% - 85px');
			}
			.footer {
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: 14px;
				width: 100%;
				color: rgba(0,0,0,.45);
				background-color: #f0f2f5;
			}
		}
		.el-menu-item.is-active {
			color: #fff;
			background-color: #4B74FF!important;
		}
		i.fa {
			margin-right: 5px;
			width: 24px;
			text-align: center;
			font-size: 18px;
			vertical-align: middle;
		}
		i.menu_on {
			position: absolute;
			left: 0;
			top: 0;
			display: block;
			height: 65px;
			width: 64px;
			font-size: 18px;
			text-align: center;
			line-height: 65px;
			z-index: 999;
			&:hover {
				cursor:pointer;
				background-color: rgba(64,158,255, .2);
			}
		}
	}
	.menu-overf {
		height: calc(~'100% - 75px');
		overflow: auto;
	}
</style>
