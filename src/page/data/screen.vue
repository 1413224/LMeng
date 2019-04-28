<template>
	<div class="screen">
		<div class="nub-top" style="height: 80px;">
			<h2>数据大屏</h2>
		</div>
		<el-card class="box-card">
			<div class="screen-header">
				<div class="header-left">
					<img src="../../assets/images/logo1.png" class="logo-image"/>
				</div>
				<div class="header-right">
					<h2>CGC全球智慧产业联盟共享经济平台实时交易结算数据中心</h2>
					<div class="list-div">
						<el-cow>
							<el-col :span="8">今日新增会员数:8170(人)</el-col>
							<el-col :span="8">今日交易额:￥27150099.00</el-col>
							<el-col :span="8">总会员数:5363340(人)</el-col>
						</el-cow>
					</div>
				</div>
			</div>
			<div class="table-container">
				<el-table ref="configurationTable" :data="dataTable" :header-cell-style="getRowClass" :height="height" v-loading="isLoading" :class="['configurationTable', {afterRenderClass: showAfterRenderClass}]">
					<el-table-column prop="date" label="时间" width="160"></el-table-column>
					<el-table-column prop="mobile" label="手机号" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="消费金额 (元)" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="消费门店 (家)" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="即时奖励" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="奖金池" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="账户余额" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="投资商" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="联营企业" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="联盟企业" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="联合运营商" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="区域运营商" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="省级管理" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="成高成" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="平台公司" min-width="80"></el-table-column>
				</el-table>
				<!--<el-table :data="dataTable" :header-cell-style="getRowClass" style="width: 100%">
					<el-table-column label="时间" width="65">
						<template slot-scope="scope">
							<div class="back-list" :style="scope.$index<3?'background-color:#4B74FF;':'color:rgba(0,0,0,0.65);background-color:#D8DFF0;'">
								{{scope.$index+1}}
							</div> 
			            </template>
					</el-table-column>
					<el-table-column prop="mobile" label="手机号" min-width="100"></el-table-column>
					<el-table-column prop="allianceOrderPrice" label="消费金额 (元)" min-width="120"></el-table-column>
					<el-table-column prop="orderPrice" label="消费门店 (家)" min-width="120"></el-table-column>
					<el-table-column prop="allianceOrderNum" label="即时奖励" min-width="120"></el-table-column>
					<el-table-column prop="orderNum" label="奖金池" min-width="120"></el-table-column>
					<el-table-column prop="lottery" label="账户余额" min-width="80"></el-table-column>
					<el-table-column prop="lotteryNum" label="投资商" min-width="80"></el-table-column>
					<el-table-column prop="balance" label="联营企业" min-width="80"></el-table-column>
					<el-table-column prop="allianceOrderNum" label="联盟企业" min-width="120"></el-table-column>
					<el-table-column prop="orderNum" label="联合运营商" min-width="120"></el-table-column>
					<el-table-column prop="lottery" label="区域运营商" min-width="80"></el-table-column>
					<el-table-column prop="lotteryNum" label="省级管理" min-width="80"></el-table-column>
					<el-table-column prop="balance" label="成高成" min-width="80"></el-table-column>
					<el-table-column prop="balance" label="平台公司" min-width="80"></el-table-column>
				</el-table>-->
			</div>
		</el-card>
	</div>
</template>
<!--2019-01-13 13:53:02
130****4184
160.00
日照市中医医院
9.60
9.60
4960.84
48.00
64.00
4.80
4.80
4.80
4.80
4.80
4.80-->
<script>
export default {
	data () {
		return {
			showAfterRenderClass: false,
			dataTable: [{
	          date: '2019-01-13 13:53:02',
	          mobile: '130****4184',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          allianceOrderPrice: '5454',
	          
	        }, 
	        {
	          date: '2019-01-13 13:53:02',
	          mobile: '130****4184',
	          allianceOrderPrice: '5454',
	          
	        },
	        {
	          date: '2019-01-13 13:53:02',
	          mobile: '130****4184',
	          allianceOrderPrice: '5454',
            }],
		}
	},
//	components: {
//      QRCode
//	},
//	beforeRouteEnter (to, from, next){
//      next(vm => {
//          vm.getSellerList()
//      })
//  },
	updated () {
	  /**
	   * 用于隐藏固定高度时显示不必要的scrollX的定时器
	   * 这是el-table初次渲染时宽度计算的bug，可在渲染后通过重新赋予overflow: auto调整
	   */
	  const handleScrollX = setInterval(() => {
	    // 检测是否已经生成table节点，如果不是就每隔0.5s检测一次
	    // 只有生成了真实节点才能够通过修改overflow属性让浏览器重新计算
	    if (this.$refs.configurationTable) {
	      this.showAfterRenderClass = true
	      clearInterval(handleScrollX)
	    }
	  }, 500)
  	},
	methods: {
		// 给表单的表头添加背景颜色
        getRowClass ({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0) {
                return 'background: #3d71bf '
            } else {
                return ''
            }
        },
	}
}
</script>

<style lang="less">
.screen {
	.box-card {
        margin: 20px;
        background: #3276B1;
        /*background-image: url(../images/data-bg.png);*/
    }
    .screen-header {
    	width: 100%;
    	height: 130px;
    	.header-left {
    		float: left;
    		.logo-image {
    			width: 220px;
    			height: 100px;
    		}
    	}
    	.header-right {
    		width: 80%;
    		display: inline-block;
    		h2 {
    			text-align: center;
			    color: #00ddf7;
			    height: 0.88424437rem;
			    line-height: 0.88424437rem;
			    padding-bottom: 25px;
    		}
    		.list-div {
    			padding-left: 55px;
    			color: #f0c501;
    			font-size: 20px;
    		}
    	}
    }
    .el-table {
    	background: #3d71bf;
		border-spacing: 0;
	    border-collapse:separate;
	    overflow-x:visible;
    }
    .el-table::before {
    	z-index: -1;
    }
    .el-table thead {
    	color: #00ddf7;
    }
    .el-table tr {
    	background: #3d71bf;
    }
	.el-table th.is-leaf {
		border-bottom: none;
	}
	.el-table__row>td{
		border: none;
		color: #00f7e4;
	}
	.configurationTable .el-table__body-wrapper {
	    overflow: hidden;
	}
	.afterRenderClass {
	    .el-table__body-wrapper {
	        overflow: auto;
	    }
	}
}
</style>