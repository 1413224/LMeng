<template>
	<div class="data">
		<div class="nub-top" style="height: 80px;">
			<h2>数据大屏</h2>
		</div>
		<div class="box-card">
			<!--<a href="./html/data-all.html" target="_blank">-->
			<div class="data-card" @click="goDetail()">
				<div class="data-icon">
					<img src="../../../static/icon/icon3.png" class="data-image"/>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<!--</a>-->
			<div class="data-card">
				<div class="data-icon">
					<img src="../../../static/icon/icon3.png" class="data-image"/>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card">
				<div class="data-icon">
					<img src="../../../static/icon/icon3.png" class="data-image"/>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card">
				<div class="data-icon">
					<img src="../../../static/icon/icon3.png" class="data-image"/>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card big-div"">
				<div class="data-icon">
					<div>
						<img src="../../../static/icon/icon3.png" class="data-image"/>
					</div>
					<span class="show">演示</span>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card big-div"">
				<div class="data-icon">
					<div>
						<img src="../../../static/icon/icon3.png" class="data-image"/>
					</div>
					<span class="show">演示</span>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card big-div"">
				<div class="data-icon">
					<div>
						<img src="../../../static/icon/icon3.png" class="data-image"/>
					</div>
					<span class="show">演示</span>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
			<div class="data-card big-div"">
				<div class="data-icon">
					<div>
						<img src="../../../static/icon/icon3.png" class="data-image"/>
					</div>
					<span class="show">演示</span>
				</div>
				<div class="right">
					<span>总结算中心（1号主屏）</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
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
	methods: {
		goDetail () {
			this.$router.push({ path: 'screen_data'})
		}
//		orderDetail(orderSn) {
//	      this.$router.push({
//	        path: "/order-detail",
//	        query: {
//	          orderSn: orderSn
//	        }
//	      });
//	    },
	}
}
</script>

<style lang="less">
.data {
	.box-card {
        margin: 20px;
        display: flex;
	    width: 100%;
	    flex-wrap: wrap;
    }
    .data-card {
    	width: 440px;
    	height: 200px;
    	background: #fff;
    	margin-right: 20px;
    	margin-bottom: 20px;
    	display: inline-block;
    	.data-icon {
    		float: left;
    		.data-image {
    			width: 200px;
    			height: 200px;
    		}
    	}
    	.right {
    		width: 240px;
    		height: 200px;
    		float: right;
    		line-height: 200px;
    		text-align: center;
    	}
    	.show {
    		margin-top: 5px;
    		padding-left: 25px;
    		float: left;
    		display: block;
    	}
    }
    .data-card:hover{
	    box-shadow: 0px 0px 20px 8px #6fafe45e;
	    transition: all 0.3s linear;
	    -webkit-transition: all 0.3s linear;
	    -moz-transition: all 0.3s linear;
	    -webkit-box-shadow: 0px 0px 20px 8px #6fafe45e;
		cursor: pointer;
	}
    .big-div {
    	height: 240px;
    }
}
</style>