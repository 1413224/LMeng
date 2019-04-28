<template>
	<div class="home">
		<div class="nub-top" style="height: 70px;">
			<div class="top-left">
				<div class="user-img">
					<img v-if="info.enterpriseLogo" :src="info.enterpriseLogo.original" class="Logo-image">
				</div>
				<div class="user-cont">
					<h2 style="display: inline-block; margin-top:15px;">{{getData()}}{{info.name}}!</h2>
					<!-- <p style="padding-top: 10px;color: rgba(0, 0, 0, 0.45);">{{info.name}}</p> -->
				</div>
			</div>
			<div class="top-right">
				<div class="right-div">
					<p>上次登录</p>
					<p class="num">{{info.lastTime | formatDate}}</p>
				</div>
				<div class="right-div" style="border-left: 1px solid #fff;">
					<p>累计加盟时间</p>
					<p class="num">{{info.joinTime}}</p>
				</div>
			</div>
		</div>
		<div class="card news">
			<span class="news-title">商家快报</span>
			<span>今日注册会员数：{{news.memberNums?news.memberNums:'0'}}人</span>
			<span>今日销售额：{{news.orderPrice?news.orderPrice:'0'}}元</span>
			<span>今日销售次数：{{news.orderNums?news.orderNums : '0'}}次</span>
			<span>今日产业联盟收益：{{news.profitTotal?news.profitTotal : '0'}}元</span>
			<!--<span>今日客单价：{{news.unitPrice?news.unitPrice : '0'}}元</span>-->
		</div>
		<div class="card">
			<el-row :gutter="20">
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="item-card">
						<div class="card-top">
							<div>
								<img src="../assets/images/icon/home-icon5.png"/>
								<span class="item-title">产业联盟收益</span>
								<!--<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<i class="el-icon-info" style="color: #91948c;float: right;padding-right: 20px;"></i>
								</el-tooltip>-->
							</div>
							<div class="item-cont">
								<span class="item-span">￥</span>
								<p>{{info.profitTotal?info.profitTotal:'0'}}</p>
							</div>
						</div>
						<div class="card-btn">
							<div class="item-cont check">
								<span @click="goRouter('/income')" v-has="'income'">点击查看</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="item-card">
						<div class="card-top">
							<div>
								<img src="../assets/images/icon/home-icon6.png"/>
								<span class="item-title">云商城出售商品总数</span>
								<!--<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<i class="el-icon-info" style="color: #91948c;float: right;padding-right: 20px;"></i>
								</el-tooltip>-->
							</div>
							<div class="item-cont">
								<p class="item-name">{{info.goodsNums?info.goodsNums:'0'}}</p>
								<span class="item-company">件</span>
							</div>
						</div>
						<div class="card-btn">
							<div class="item-cont check">
								<span @click="goRouter('/shop')" v-has="'shop'">点击查看</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="item-card">
						<div class="card-top">
							<div>
								<img src="../assets/images/icon/home-icon7.png"/>
								<span class="item-title">推荐会员总数</span>
								<!--<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<i class="el-icon-info" style="color: #91948c;float: right;padding-right: 20px;"></i>
								</el-tooltip>-->
							</div>
							<div class="item-cont">
								<p class="item-name">{{info.memberNums?info.memberNums:'0'}}</p>
								<span class="item-company">位</span>
							</div>
						</div>
						<div class="card-btn">
							<div class="item-cont check">
								<span @click="goRouter('/member')" v-has="'member'">点击查看</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6" class="card-box">
					<div class="item-card">
						<div class="card-top">
							<div>
								<img src="../assets/images/icon/home-icon8.png"/>
								<span class="item-title">待发货订单数</span>
								<!--<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
									<i class="el-icon-info" style="color: #91948c;float: right;padding-right: 20px;"></i>
								</el-tooltip>-->
							</div>
							<div class="item-cont">
								<p class="item-name">{{info.waitSendOrderNums?info.waitSendOrderNums:'0'}}</p>
								<span class="item-company">条</span>
							</div>
						</div>
						<div class="card-btn">
							<div class="item-cont check">
								<span @click="goRouter('/order')" v-has="'order'">点击查看</span>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="home-box">
			<el-row :gutter="20">
				<el-col :span="24" :xl="16" class="box-div same-div" style="background: #f0f2f5;position: relative;margin-bottom: 20px;">
					<el-card>
						<el-tabs v-model="type" @tab-click="getStatisticsInfo" style="font-size: 14px;">
							<el-tab-pane label="销售额" name="2">销售额</el-tab-pane>
							<el-tab-pane label="订单数" name="1">订单数</el-tab-pane>
							<el-tab-pane label="会员" name="3">会员数</el-tab-pane>
							<el-tab-pane label="收益" name="4">收益</el-tab-pane>
							<el-tab-pane label="客单价" name="5">客单价</el-tab-pane>
						</el-tabs>
						<div class="coordinate">
							<el-radio-group v-model="timeType" @change="getStatisticsInfo">
								<el-radio label="1" name="1">今日</el-radio>
								<el-radio label="2" name="2">昨日</el-radio>
								<el-radio label="3" name="3">最近七日</el-radio>
								<el-radio label="4" name="4">本月</el-radio>
								<el-radio label="6" name="6">近一月</el-radio>
								<el-radio label="5" name="5">本年</el-radio>
							</el-radio-group>
						</div>
						<el-col :span="24">
							<div id="main" :style="{width:'100%',height:'493px'}"></div>
						</el-col>
					</el-card>
				</el-col>
				<el-col :span="12" :xl="8" style="position: relative;margin-bottom: 20px;">
					<el-card class="same-div">
						<div class="list-title">
							<span v-if="businessType == 1">商家VIP排名</span>
							<span v-if="businessType == 2">商品销量排名</span>
							<div class="box-right header">
								<el-radio-group  v-model="businessType">
									<el-radio label="1" name="1" @change="getUserOrderRankings()">商家VIP</el-radio>
									<el-radio label="2" name="2" @change="getGoodsRankings()">商品销量</el-radio>
								</el-radio-group>
							</div>
						</div>
						<!--<div class="table-top">
							<span>排名</span>
							<span style="padding-left: 25px;padding-right: 25px;flex: 1;">会员手机号</span>
							<span>累计订单数</span>
							<span>累计订单金额</span>
						</div>-->
						<div v-if="businessType == 1">
					  		<el-table :data="orderData" style="width: 100%">
								<el-table-column label="排名" width="65">
									<template slot-scope="scope">
										<div class="back-list" :style="scope.$index<3?'background-color:#4B74FF;':'color:rgba(0,0,0,0.65);background-color:#D8DFF0;'">
											{{scope.$index+1}}
										</div> 
						            </template>
								</el-table-column>
								<el-table-column prop="mobile" label="会员手机号" min-width="80">
									<template slot-scope="scope">
										<el-popover
							                placement="top-start"
							                trigger="hover">
							                <div style="line-height: 30px;">
							                  <p>会员昵称: 
							                    <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                  <p>会员手机号: 
							                    <span v-if="scope.row.mobile">{{scope.row.mobile}}</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                  <p>累计订单数: 
							                    <span v-if="scope.row.orderNum">{{scope.row.orderNum}}笔</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                  <p>累计订单金额: 
							                    <span v-if="scope.row.orderPrice">{{scope.row.orderPrice}}元</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                </div>
							                <div slot="reference">{{scope.row.mobile}}</div>
							          </el-popover>
									</template>
								</el-table-column>
								<el-table-column prop="orderNum" label="累计订单数(笔)" min-width="80"></el-table-column>
								<el-table-column prop="orderPrice" label="累计订单金额(元)" min-width="80"></el-table-column>
							</el-table>
						</div>
						<div v-if="businessType == 2">
						  	<el-table :data="salesData" style="width: 100%">
								<el-table-column label="排名" width="80">
									<template slot-scope="scope">
										<div class="back-list" :style="scope.$index<3?'background-color:#4B74FF;':'color:rgba(0,0,0,0.65);background-color:#D8DFF0;'">
											{{scope.$index+1}}
										</div> 
						            </template>
								</el-table-column>
								<el-table-column prop="goodsName" label="商品名称" min-width="120">
									<template slot-scope="scope">
										<el-popover
							                placement="top-start"
							                trigger="hover">
							                <div style="line-height: 30px;">
							                  <p>商品名称: 
							                    <span v-if="scope.row.goodsName">{{scope.row.goodsName}}</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                  <p>商品销量数量: 
							                    <span v-if="scope.row.salesRealNum">{{scope.row.salesRealNum}}</span>
							                    <span v-else style="color: #ccc">未设置</span>
							                  </p>
							                </div>
							                <div slot="reference" class="ellipsis">{{scope.row.goodsName}}</div>
							           </el-popover>
									</template>
								</el-table-column>
								<el-table-column prop="salesRealNum" label="商品销量数量" width="130"></el-table-column>
							</el-table>
						</div>
						<!-- <div class="div-images"  v-if="items.length == 0">
							<img class="null-images" src="../assets/images/home-icon-null.png" />
							<p>暂无商品累计销量排名</p>
						</div> -->
					</el-card>
				</el-col>
				<el-col :span="12" :xl="6" class="same-div" style="margin-bottom: 20px;">
					<el-card class="list-div height">
						<div class="list-title">
							<span>实时交易数据</span>
						</div>
						<el-table :data="incomeData" style="width: 100%; height: 520px;">
							<el-table-column prop="mobile" label="消费者" min-width="110"></el-table-column>
							<el-table-column label="消费时间" min-width="160">
								<template slot-scope="scope">
									{{scope.row.finishTime | formatDate}}
							    </template>
							</el-table-column>
							<el-table-column prop="actualPrice" label="消费金额" min-width="80"></el-table-column>
						</el-table>
					</el-card>
				</el-col>
				<el-col :span="24" :xl="18" class="box-div same-div" style="background: #f0f2f5;position: relative;">
					<el-card class="list-div height">
						<el-row>
							<div class="table-header">
								<div style="float: left;">CGC联盟VIP会员排行榜</div>
								<el-select @change="onSearch"
											v-model="rankType" 
											size="mini" style="width: 140px; margin-left: 25px;">
					                <el-option
					                  v-for="item in typeOptions"
					                  :key="item.value"
					                  :label="item.label"
					                  :value="item.value"
					                  >
					                </el-option>
				              </el-select>
							</div>
							<div class="box-header">
								<el-radio-group v-model="areaType" @change="getPlatformUserOrderRankings()">
									<el-radio label="1" name="1">本店</el-radio>
									<el-radio label="2" name="2">本区</el-radio>
									<el-radio label="3" name="3">本市</el-radio>
									<el-radio label="4" name="4">联盟</el-radio>
								</el-radio-group>
							</div>
							<el-table :data="memberData" style="width: 100%">
								<el-table-column label="排名" width="65">
									<template slot-scope="scope">
										<div class="back-list" :style="scope.$index<3?'background-color:#4B74FF;':'color:rgba(0,0,0,0.65);background-color:#D8DFF0;'">
											{{scope.$index+1}}
										</div> 
						            </template>
								</el-table-column>
								<el-table-column prop="mobile" label="消费者" min-width="100"></el-table-column>
								<el-table-column prop="allianceOrderPrice" label="本店消费金额 (元)" min-width="120"></el-table-column>
								<el-table-column prop="orderPrice" label="联盟消费总额 (元)" min-width="120"></el-table-column>
								<el-table-column prop="allianceOrderNum" label="本店消费次数" min-width="120"></el-table-column>
								<el-table-column prop="orderNum" label="联盟消费次数" min-width="120"></el-table-column>
								<el-table-column prop="lottery" label="中奖金额" min-width="80"></el-table-column>
								<el-table-column prop="lotteryNum" label="中奖次数" min-width="80"></el-table-column>
								<el-table-column prop="balance" label="通用积分" min-width="80"></el-table-column>
							</el-table>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'
export default {
	data() {
		return {
			news: {},
			info: {},
			type: '2',
			realTimeType:'1',
			timeType: '1',
			businessType: '1',
			areaType: '1',
			items: [],
			myChart: '',
			greet: '',
			search: {
		        rankType: 1,
		    },
		    rankType: 1,
			typeOptions: [
	        {
	          value: 1,
	          label: '注册时间排序'
	        },
	        {
	          value: 2,
	          label: '通用积分排序'
	        },
	        {
	          value: 3,
	          label: '信用积分排序'
	        },
	        {
	          value: 4,
	          label: '订单数目排序'
	        },
	        {
	          value: 5,
	          label: '订单金额排序'
	        },
	        {
	          value: 6,
	          label: '中奖金额排序'
	        },
	        {
	          value: 7,
	          label: '中奖次数排序'
	        },
	        {
	          value: 8,
	          label: '消费时间排序'
	        }
	      ],
	      incomeData: [],
	      memberData: [],
	      orderData: [],
	      salesData: []
		}
	},
	components: {

	},
	methods: {
		resetting() {
	      let vm = this
	      vm.sortType = 1
	      vm.search = {
	        rankType: 1,
	      }
	      vm.curPage = 1
	      vm.getPlatformUserOrderRankings()
	    },
	    onSearch() {
	      let vm = this
	      vm.search = {
	        // 进行搜索条件缓存
	        rankType: vm.rankType
	      }
	      vm.curPage = 1
	      vm.getPlatformUserOrderRankings()
//	     alert(9)
	    },
		// handleClick(e) {
		// 	// this.timeType = "1";
		// 	this.getStatisticsInfo()
		// },
		setEchart() {
			let vm = this
			this.myChart = echarts.init(document.getElementById('main'));
			// 绘制图表
			//			alert(0)
			this.myChart.setOption({
			    title: {
			        text: '本日订单趋势图',
			        left:'center',
			        textStyle:{
				        //文字颜色
				        color:'#000',
				        //字体风格,'normal','italic','oblique'
				        fontStyle:'normal',
				        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
				        fontWeight:'bold',
				        //字体系列
				        fontFamily:'sans-serif',
				        //字体大小
				　　　　       fontSize:16
				    }
			    },
				tooltip: {
					trigger: 'axis'
				},
				textStyle: {
					color: '#90A2C7', //值的具体的颜色
				},
				xAxis: {
					data: [],
					axisLine: { //坐标线
						lineStyle: {
							type: 'solid',
							color: '#d8d8d8', //轴线的颜色
							width: '1' //坐标线的宽度
						}
					},
					axisTick: { //刻度
						show: false //不显示刻度线
					},
					axisLabel: {
						textStyle: {
							color: '#909399', //坐标值的具体的颜色
						}
					},
					splitLine: {
						show: false //去掉分割线
					}
				},
				yAxis: {
					name: '', //轴的名字，默认位置在y轴上方显示
					max: 1000, //最大刻度
					type: 'value',
					axisLine: { //线
//						show: false
						lineStyle: {
							type: 'solid',
							color: '#d8d8d8', //轴线的颜色
							width: '1' //坐标线的宽度
						}
					},
					axisLabel: {
						textStyle: {
							color: '#909399', //坐标值的具体的颜色
						}
					},
					axisTick: { //刻度
//						show: false
					},
                  	minInterval: 1,//标值的最小间隔
					splitLine: {
						lineStyle: {
							color: ['#f6f6f6'], //分割线的颜色
						}
					}
				},
				grid: {  
				    left: '3%',  
				    right: '5%',  
				    bottom: '3%',  
				    containLabel: true  
				},
				series: [{
					name: '销量',
					type: 'line',
					data: [],
					barCategoryGap : '50%',
					//			        barWidth: 30,
					itemStyle: {
						normal: {
							color: '#4B74FF',
							label : {
								show: true,
								position: 'insideRight',
						        formatter: function (params) {
						            if (params.yData > 0) {
						                return params.yData;
						            } else {
						                return '';
						            }
						        },
							}
						}
					},
                    markPoint: {
                        symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
                        symbolSize: function(val){
                            return [vm.textSize(vm.returnFloat(val),"12px").width+5,40]
                        },
                        symbolOffset: ['25%', '-70%'],
                        symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
                        label:{
                            position: "insideTop",
                            distance: 7,
							color: '#fff',
							formatter: function (data){
                                return vm.returnFloat(data.value)
                            }
                       },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
		                data: [
		                    {type: 'average', name: '平均值'}
		                ]
		            }
				}],
				toolbox : {
					left:"87%",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
				    top:"top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
				    right:"auto",                               //组件离容器右侧的距离,'20%'
				    bottom:"auto",                              //组件离容器下侧的距离,'20%'
				    width:"auto",                               //图例宽度
				    height:"auto",
					show : true,
					feature : {
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true,
							title : '保存为图片',
							type : 'png',
							lang : [ '点击保存' ]
						}
					},
					top:20, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
					iconStyle:{
						normal:{
							textPosition:'left'
						},
						emphasis:{
							color: '#4B74FF',
							textPosition:'top'
						}
					},
				},
			});
//				window.addEventListener("resize", function() {
//					option.myChart.resize();
//				});
		},
		getBasicInfo() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			}
			vm.$get(vm.$api.home.getBasicInfo, param).then(resp => {
				vm.info = resp
				vm.getData()
				
			})
		},
		getStatisticsInfo() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				type: vm.type,
				timeType: vm.timeType
			}
			vm.$get(vm.$api.home.getStatisticsInfo, param).then(resp => {
				var xData = [];
				var yData = [];
				var echartTitle = ''
				var seriesName = ''
				let maxVal = 0
				let activeName = ''
				for(var i = 0; i < resp.length; i++) {
					xData.push(resp[i].key)
					yData.push(resp[i].value)
					if(parseInt(resp[i].value) > maxVal) {
						maxVal = parseInt(resp[i].value)
					}
				}
				if (vm.type == 1) {
					activeName = '单位： 笔'
					echartTitle = '订单数趋势图'
					seriesName = '订单数(笔)'
				} else if(vm.type == 2){
					activeName = '单位： 元'
					echartTitle = '销售额'
					seriesName = '销售额(元)'
				} else if(vm.type == 3){
					activeName = '单位： 位'
					echartTitle = '新增会员趋势图'
					seriesName = '新增会员(位)'
				} else if(vm.type == 4){
					activeName = '单位： 元'
					echartTitle = '收益趋势图'
					seriesName = '收益(元)'
				} else {
					activeName = '单位： 元'
					echartTitle = '客单价趋势图'
					seriesName = '客单价(元)'
				} 
				maxVal = vm.getPeakValue(maxVal)
//				vm.setEchart()
				this.myChart.setOption({
					title: {
				        text: echartTitle,
				    },
					xAxis: {
						data: xData
					},
					yAxis: {
						max: maxVal, //最大刻度
						name: activeName,
					},
					series: [{
						// 根据名字对应到相应的系列
						name: seriesName,
						data: yData,
						markPoint : {//数据全是markPoint
    	                	data : [{type: "max", name: '最大值'},{type: "min", name: '最小值'},],
						},
	                    markLine: {
				            data: [{type: 'average', name: '平均值'}],
				        },
					}],
				});
			})
		},
		getGoodsRankings() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				pageSize: 10,
				curPage: 1
			}
			vm.$get(vm.$api.home.getGoodsRankings, param).then(resp => {
				vm.salesData = resp.list
			})
		},
		getPeakValue(val) {
			let temp = Math.pow(10, (parseInt(val) + '').length)
			if(val < temp * 1 / 5) {
				return temp * 1 / 5
			} else if(val < temp * 2 / 5) {
				return temp * 2 / 5
			} else if(val < temp * 1 / 2) {
				return temp * 1 / 2
			} else if(val < temp * 3 / 5) {
				return temp * 3 / 5
			} else if(val < temp * 4 / 5) {
				return temp * 4 / 5
			} else {
				return temp
			}
		},
		goRouter (path) {
			this.$router.push({path: path});
		},
		getData () {
			let day = new Date()
			let hr = day.getHours()
			if (hr < 6) {
				return "清晨好，"
			} else if (hr < 9) {
				return "早上好，"
			} else if (hr < 11) {
				return "上午好，"
			} else if (hr < 13) {
				return "中午好，"
			} else if (hr < 17) {
				return "下午好，"
			} else if (hr < 19) {
				return "傍晚好，"
			} else {
				return "晚上好，"
			}
		},
		getStoreReport() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			}
			vm.$get(vm.$api.home.getStoreReport, param).then(resp => {
				vm.news = resp
			})
		},
		getUserOrderRankings() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				pageSize: 10,
				curPage: 1
			}
			vm.$get(vm.$api.home.getUserOrderRankings, param).then(resp => {
				vm.orderData = resp.list
			})
		},
		getRealTimeOrderList() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				type: vm.realTimeType,
				pageSize: 10,
				curPage: 1
			}
			vm.$get(vm.$api.home.getRealTimeOrderList, param).then(resp => {
				vm.incomeData = resp.list
			})
		},
		getPlatformUserOrderRankings() {
			let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				type: vm.areaType,
				pageSize: 10,
				curPage: 1
			})
			vm.$get(vm.$api.home.getPlatformUserOrderRankings, param).then(resp => {
				vm.memberData = resp.list
			})
		},
		textSize(text,fontSize) {
	        var span = document.createElement("span");
	        var result = {
	            "width": span.offsetWidth,
	            "height": span.offsetHeight
			};
	        span.style.visibility = "hidden";
	        span.style.fontSize = fontSize || "14px";
	        document.body.appendChild(span);
	
	        if (typeof span.textContent != "undefined")
	            span.textContent = text || "国";
	        else span.innerText = text || "国";
	
	        result.width = span.offsetWidth - result.width + 10;
	        result.height = span.offsetHeight - result.height;
	        span.parentNode.removeChild(span);
	        return result;
		},
		returnFloat(value){
			value = Math.round(parseFloat(value)*100)/100
			let xsd = value.toString().split(".")
			if(xsd.length==1){
				value = value.toString()+".00"
				return value
			}
			if(xsd.length>1){
				if(xsd[1].length<2){
					value = value.toString()+"0"
				}
				return value
			}
		}
	},
	created() {
		this.getBasicInfo()
		this.getStatisticsInfo()
//		this.getGoodsRankings()
		this.getStoreReport()
		this.getUserOrderRankings()
		this.getRealTimeOrderList()
		this.getPlatformUserOrderRankings()
	},
	mounted() {
		this.setEchart()
	}
}
</script>

<style lang="less">
.home {
	.top-left {
		float: left;
		.user-img {
			width: 72px;
			height: 72px;
			display: block;
			float: left;
			margin-right: 25px;
			background-size: cover;
			.Logo-image {
				width: 72px;
				height: 72px;
				border-radius: 50%;
			}
		}
		.user-cont {
			float: left;
		}
	}
	.top-right {
		float: right;
		.right-div {
			float: right;
			color: rgba(0, 0, 0, 0.45);
			text-align: center;
			padding: 0 20px;
			border-left: 1px solid #ccc;
			.num {
				font-size: 20px;
				color: #000;
				padding-top: 15px;
			}
		}
	}
	.backg {
		background-color: #F0F2F5;
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.item-card {
		height: 150px;
		box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.09);
		border-radius: 2px;
		background-color: #fff;
		padding: 10px;
		padding-left: 0;
		margin-left: 0;
		.card-top {
			height: 105px;
			margin: 10px;
			padding-left: 20px;
			border-bottom: 1px solid rgba(232, 232, 232, 1);
			img {
				width: 24px;
				height: 24px;
				padding-right: 10px;
				float: left;
			}
			.item-title {
				font-size: 16px;
				color: RGBA(0, 0, 0, 0.45);
			}
			.item-cont {
				padding-top: 25px;
				padding-bottom: 8px;
				font-size: 26px;
				.item-span {
					font-size: 26px;
					float: left;
					display: block;
					padding-right: 5px;
				}
				.item-name {
					display: block;
					float: left;
				}
				.item-company {
					color: rgba(0, 0, 0, 0.45);
					float: left;
				    display: block;
				    font-size: 12px;
				    margin-left: 10px;
				    margin-top: 10px;
				}
			}
			.icon {
				color: #fff;
				width: 24px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				background-color: #FFBF00;
				border-radius: 50%;
				margin-right: 16px;
				float: left;
			}
			.green {
				background-color: #5BD171;
			}
		}
		.check {
			float: right;
			padding-right: 20px;
			cursor: pointer;
			color: rgba(0,0,0,0.65);
			font-size: 14px;
		}
	}
	.card {
		margin: 0 20px;
		.card-box {
			/*margin-right: 20px;*/
			margin-top: 20px;
		}
	}
	.home-box {
		margin: 20px;
		padding-top: 20px;
		background-color: RGBA(240, 242, 245, 1);
		padding-bottom: 0;
		margin-top: 0;
		margin-bottom: 0;
		.box-div {
			background-color: #fff;
		}
		.coordinate {
			position: absolute;
		    top: 18px;
		    right: 45px;
		    height: 29px;
		    border-bottom: 2px solid #e4e7ed;
		    padding-top: 12px;
			.el-radio__input {
				display: none;
			}
		}
		.box-right {
			position: absolute;
			top: 5px;
			right: 15px;
			height: 26px;
			/*border-bottom: 2px solid #e4e7ed;*/
			padding-top: 12px;
			.el-radio__input {
				display: none;
			}
		}
		.list-div {
			height: 580px;
			.cell{
				>div{
					width: 20px;
					height: 20px;
					background-color: rgb(24, 144, 255);
					line-height: 20px;
					text-align: center;
					color: #fff;
					font-size: 12px;
					border-radius: 50%;
				}
			}
		}
		.table-top {
			padding-top: 15px;
			color: #909399;
			font-size: 16px;
    		font-weight: 500;
		}
		.list-title {
			font-size: 18px;
			padding-bottom: 18px;
			border-bottom: 2px solid rgba(233, 233, 233, 1);
			background-color: #fff;
			/*margin-bottom: 20px;*/
		}
		.div-images {
			padding-top: 100px;
		    text-align: center;
		    margin: 65px;
		    .null-images {
		    	width: 200px;
		    	height: 200px;
		    	padding-bottom: 40px;
		    	background-size: cover;
		    }
		}
		.list {
			width: 100%;
			height: 40px;
			display: flex;
			justify-content: flex-start;
			line-height: 40px;
			.list-cont {
				width: 20px;
				height: 20px;
				color: #fff;
				font-size: 12px;
				text-align: center;
				line-height: 20px;
				background-color: #F0F2F5;
				border-radius: 50%;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				margin: 10px;
			}
			.list-item {
				flex: 1;
				color:rgba(0,0,0,0.65);
				padding-left: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.list-right {
				width: 110px;
				color:rgba(0,0,0,0.65);
				text-align: right;
			}
		}
	}
	.el-tabs__item {
		font-size: 16px;
	}
	.news {
		height: 60px;
		line-height: 60px;
		background: #fff;
		margin-top: 20px;
		color: #606266;
		span {
			display: inline-block;
			padding: 0 20px;
		}
		.news-title {
			font-size: 20px;
			color: #4B74FF;
			border-right: 2px solid rgb(241, 222, 222);
			height: 30px;
			line-height: 30px;
			margin-top: 15px;
		}
	}
	
	.header {
		margin-top: 5px;
		margin-right: 40px;
		padding-bottom: 15px;
	}
	.box-header {
		position: absolute;
		top: 5px;
		right: 15px;
		height: 26px;
		padding-top: 0;
		padding-bottom: 3px;
		.el-radio__input {
			display: none;
		}
	}
	.table-header {
		height: 41px;
		font-size: 18px;
		border-bottom: 2px solid rgba(233, 233, 233, 1);
	}
	.height {
		padding-top: 0;
	}
	.same-div {
		height: 580px;
	}
	.back-list {
		width: 20px;
		height: 20px;
		color: #fff;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
		background-color: #F0F2F5;
		border-radius: 50%;
	}
	.cell{
		>div{
			width: 20px;
			height: 20px;
			background-color: rgb(24, 144, 255);
			line-height: 20px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			border-radius: 50%;
		}
	}
	.ellipsis {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>