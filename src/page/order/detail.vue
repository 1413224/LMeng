<template>
	<!-- 订单详情 -->
	<div class="order_detail">
		<div class="nub-top">
			<h2>订单详情</h2>
		</div>
		<el-card class="box-card">
			<el-row>
				<el-col :span="6" class="order-tit">
					<h1 v-if="info.status == 0" style="color: #909399;">待付款</h1>
					<h1 v-if="info.status == 10" style="color: #E6A23C;">待发货</h1>
					<h1 v-if="info.status == 20" style="color: #4B74FF;">已发货</h1>
					<h1 v-if="info.status == 30" style="color: #4B74FF;">待取货</h1>
					<h1 v-if="info.status == 40" style="color: #4B74FF;">待使用</h1>
					<h1 v-if="info.status == 50" style="color: #E6A23C;">待处理</h1>
					<h1 v-if="info.status == 60" style="color: #4B74FF;">使用中</h1>
					<h1 v-if="info.status == 70" style="color: #67C23A;">已完成</h1>
					<h1 v-if="info.status == 80" style="color: #F56C6C;">订单异常</h1>
					<h1 v-if="info.status == 130" style="color: #909399;">订单超时</h1>
					<h1 v-if="info.status == 140" style="color: #909399;">已取消</h1>
					<h1 v-if="info.status == 150" style="color: #909399;">已关闭</h1>
					<p style="padding-top: 5px;">订单类型：
						<span v-if="info.type == 1">线下门店</span>
						<span v-if="info.type == 2">实物商品</span>
						<span v-if="info.type == 3">共享服务</span>
						<span v-if="info.type == 4">点餐</span>
						<span v-if="info.type == 5">酒店</span>
						<span v-if="info.type == 6">门票</span>
						<span v-if="info.type == 7">游戏</span>
						<span v-if="info.type == 8">手机充值</span>
						<span v-if="info.type == 9">电影票</span>
						<span v-if="info.type == 10">演出票</span>
						<span v-if="info.type == 11">加油卡</span>
						<span v-if="info.type == 12">收钱吧</span>
						<span v-if="info.type == 13">线下餐饮</span>
						<span v-if="info.type == 14">即时消费</span>
						<span v-if="info.type == 14">线上点餐</span>
					</p>
					<p>订单来源：
						<span v-if="info.sourceType == 1">POS</span>
						<span v-if="info.sourceType == 2">Wechat</span>
						<span v-if="info.sourceType == 3">IOS </span>
						<span v-if="info.sourceType == 4">Android </span>
						<span v-if="info.sourceType == 5">Wap </span>
						<span v-if="info.sourceType == 6">PC</span>
					</p>
				</el-col>
				<el-col :span="18" style="border-left: 1px solid #e5e5e5;">
					<el-steps :active="stepVal" align-center>
						<el-step title="买家下单" :description="info.createTime | formatDate('')"></el-step>
						<el-step title="买家付款" :description="info.payTime | formatDate('')"></el-step>
						<el-step title="卖家发货" v-if="info.type != 1 && info.type != 12 && info.type != 13" :description="info.sendTime | formatDate('')"></el-step>
						<el-step v-if="info.status != 80 && info.status != 140 && info.status != 150" title="订单完成" :description="info.finishTime | formatDate('')"></el-step>
						<el-step v-if="info.status == 80" title="订单异常"></el-step>
						<el-step v-if="info.status == 140" title="已取消"></el-step>
						<el-step v-if="info.status == 150" title="已关闭" :description="info.cancelTime | formatDate('')"></el-step>
					</el-steps>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header">
				<span>订单信息</span>
			</div>
			<div class="row-height">
				<el-row>
					<el-col class="border-right" :span="12">
						<el-col><span>订单编号：</span>{{info.orderSn}}</el-col>
						<el-col>付款方式：
							<span v-if="info.payType == 0">无第三方支付</span>
							<span v-if="info.payType == 1">微信</span>
							<span v-if="info.payType == 2">支付宝 </span>
							<span v-if="info.payType == 3">网银支付 </span>
							<span v-if="info.payType == 4">快捷支付 </span>
							<span v-if="info.payType == 50">其他</span>
						</el-col>
						<el-col><span>配送方式：</span>
							<span v-if="info.dispatchType == 1">线下购买</span>
							<span v-if="info.dispatchType == 2">普通快递</span>
							<span v-if="info.dispatchType == 3">线上发货 </span>
							<span v-if="info.dispatchType == 4">门店自提</span>
							<span v-if="info.dispatchType == 5">同城配送</span>
							<span v-if="info.dispatchType == 6">无需发货</span>
						</el-col>
						<el-col><span>平台来源：</span>{{info.platformInfo&&info.platformInfo.platformName ? info.platformInfo.platformName : ''}}</el-col>
						<el-col>买家：
							<el-popover
								placement="top-start"
								trigger="hover"
								v-if="info.mobile">
								<div style="line-height: 30px;">
									<img v-if="info.userLogo&&info.userLogo.original" :src="info.userLogo.original" alt="" style="height: 60px;">
									<p>会员手机: 
										<span v-if="info.mobile">{{info.mobile}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
									<p>会员昵称: 
										<span v-if="info.nickname">{{info.nickname}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
									<p>会员姓名: 
										<span v-if="info.realname">{{info.realname}}</span>
										<span v-else style="color: #ccc">未设置</span>
									</p>
								</div>
								<span slot="reference" style="color: #4B74FF;">{{info.mobile}} <i class="el-icon-question"></i></span>
							</el-popover>
							<span v-else style="color: #ccc;">匿名订单</span>
						</el-col>
						<el-col v-if="addressInfo.mobile">收货人：{{addressInfo.address}}, {{addressInfo.name}}, {{addressInfo.mobile}}</el-col>
						<!-- <el-col>
							<el-col :span="3">订单备注：</el-col>
							<el-col :span="16">
								<p style="word-break: break-all;height: 100px;">{{sellerMessage || '暂无订单备注'}}</p>
							</el-col>
							<el-col :span="4">
								<el-button style="float: right;" round size="mini" type="success" @click="modifySellerMessage">修改订单备注</el-button>
							</el-col>
						</el-col> -->
						<!-- <el-col>
							<el-col :span="3">收货地址：</el-col>
							<el-col :span="16">
								<p style="word-break: break-all;height: 100px;">{{addressInfo.address}}</p>
							</el-col>
							<el-col :span="4">
								<el-button style="float: right;" round size="mini" type="success" @click="showArea = true">修改收货地址</el-button>
							</el-col>
						</el-col> -->
					</el-col>
					<el-col style="padding-left: 20px;box-sizing: border-box;" :span="12">
						<el-col>
							<span>买家备注：</span>
							<span v-if="info.message">{{info.message}}</span>
							<span v-else style="color: #ccc;">无</span>
						</el-col>
						<template v-if="info.expressSn">
							<el-col>
								<span>快递公司：</span>
								<span>{{info.expressName || '暂无快递公司'}}</span>
							</el-col>
							<el-col>
								<span>快递单号：</span>
								<span>{{info.expressSn}}</span>
							</el-col>
							<el-col>
								<span>发货时间：</span>
								<span>{{info.sendTime | formatDate}}</span>
							</el-col>
						</template>
						<div v-if="info.abnormalReason"><span>异常原因：</span> {{info.abnormalReason}}</div>
						<div v-if="info.cancelReason">
							<span>取消原因：</span> 
							{{info.cancelReason == 1 ? '订单不能按预计时间送达' : info.cancelReason == 2 ? '操作有误（商品、地址等选错）' : '重复下单'}}
						</div>
						<div>
							<el-button v-if="info.status == 0 && info.payway == 2" type="primary" size="mini" v-has="'pay-order'">确认付款</el-button>
							<el-button v-if="info.status == 10 && info.dispatchType == 2" type="primary" size="mini" @click="showShipments" v-has="'confirme-order'">确认发货</el-button>
							<!-- <el-button v-if="info.status == 20" type="primary" size="mini">确认收货</el-button> -->
							<template v-if="info.status == 0">
								<el-button type="text" @click="openPriceVisible" v-has="'price-order'">订单改价</el-button>
								<el-button v-if="info.type == 2" type="text" @click="modifyFreight" v-has="'logistics-order'">物流改价</el-button>
								<el-button type="text" @click="closeOrder" v-has="'close-order'">关闭订单</el-button>
							</template>
							<template v-if="info.status == 10">
								<!-- <el-button v-if="info.dispatchType == 4" type="text" @click="getSellerMessage(info.orderSn)">通知取货</el-button>
								<el-button v-if="info.dispatchType == 5" type="text" @click="getSellerMessage(info.orderSn)">确认配送</el-button> -->
								<el-button v-if="info.payway == 3" type="text" @click="closeOrder" v-has="'close-order'">关闭订单</el-button>
							</template>
							<template v-if="info.status == 20">
								<el-button type="text" @click="getOrderExpressInfo()">查看物流</el-button>
								<el-button type="text" @click="modifyExpressInfo" v-has="'edit-order'">修改物流</el-button>
								<el-button type="text" @click="cancelShipments" v-has="'cancel-order'">取消发货</el-button>
							</template>
							<el-button v-if="info.userDel == 2" type="text" @click="deleteOrder" v-has="'del-order'">彻底删除</el-button>
							<el-button type="text" @click="getSellerMessage"  v-has="'remark-order'">备注</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header">
				<span>商品信息</span>
			</div>
			<div>
				<el-table :data="info.goodsInfo" style="width: 100%">
					<el-table-column min-width="220" label="商品标题">
						<template slot-scope="scope">
							<img class="image" v-if="scope.row.goodsLogo&&scope.row.goodsLogo.original" :src="scope.row.goodsLogo.original" />
							<img class="image" v-else src="../../assets/images/goods_default.png" alt="">
							<div class="image-name">{{scope.row.goodsName}}</div>
						</template>
					</el-table-column>
					<el-table-column min-width="150" label="规格/编码/条码">
						<template slot-scope="scope">
							<p v-if="scope.row.skuName">{{scope.row.skuName}}</p>
							<p v-else class="gray">无</p>
							<p v-if="scope.row.code">{{scope.row.code}}</p>
							<p v-else class="gray">无</p>
							<p v-if="scope.row.barcode">{{scope.row.barcode}}</p>
							<p v-else class="gray">无</p>
						</template>
					</el-table-column>
					<el-table-column min-width="100" prop="number" label="数量"></el-table-column>
					<el-table-column min-width="120" label="价格">
						<template slot-scope="scope">
							<el-popover
								placement="top-start"
								trigger="hover">
								<div style="line-height: 30px;">
									<p>商品原价: ￥ {{scope.row.pieceOriginPrice}}</p>
									<p>商品售价: ￥ {{scope.row.piecePrice}}</p>
									<p>商品总价: ￥ {{scope.row.piecePrice*scope.row.number}}</p>
									<p>优惠价格: ￥ {{scope.row.discountPrice}}</p>
									<p v-if="scope.row.sellerChangePrice>0">商家改价: ￥ {{scope.row.sellerChangePrice}}</p>
									<p v-if="scope.row.sellerChangePrice<0">商家改价: -￥ {{-scope.row.sellerChangePrice}}</p>
									<p>应付价格: ￥ {{scope.row.actualPrice}}</p>
								</div>
								<div slot="reference">￥ {{scope.row.piecePrice}}</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column min-width="150" label="奖励">
						<template slot-scope="scope">
							<p v-if="scope.row.rewardBalance" style="color: #F56C6C;"><el-tag type="danger" size="mini">通用积分</el-tag> {{scope.row.rewardBalance}}</p>
							<p v-else class="gray">无</p>
							<p v-if="scope.row.rewardPoints" style="color: #4B74FF;"><el-tag size="mini">信用积分</el-tag> {{scope.row.rewardPoints}}</p>
							<p v-else class="gray">无</p>
						</template>
					</el-table-column>
					<el-table-column min-width="100" fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button v-if="info.status == 0" type="text" size="mini" @click="openGoodsPrice(scope.row.itemId)"  v-has="'price-order'" style="color: #606266;">修改价格</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="foot-info">
					<div class="back-div">
						<p>￥ {{info.goodsPriceTotal}}</p>
						<p>-￥ {{info.goodsDiscountPriceTotal}}</p>
						<p v-if="info.type != 1 && info.type != 12 && info.type != 13">￥ {{info.freight}}</p>
						<p v-if="info.goodsChangePriceTotal>0">￥ {{info.goodsChangePriceTotal}}</p>
						<p v-if="info.goodsChangePriceTotal<0"> -￥ {{-info.goodsChangePriceTotal}}</p>
						<p class="r b">￥ {{info.goodsActualPriceTotal}}</p>
						<p v-if="+info.points"> -￥ {{info.points}}</p>
						<p class="small" v-if="+info.taxFee">￥ {{info.taxFee}}</p>
						<p class="small">{{payment}}</p>
					</div>
					<div class="back-div">
						<p>商品总额:</p>
						<p>优惠金额:</p>
						<p v-if="info.type != 1 && info.type != 12 && info.type != 13">运费总额:</p>
						<p v-if="+info.goodsChangePriceTotal">商家改价:</p>
						<p class="r">应付总额:</p>
						<p v-if="+info.points">信用积分:</p>
						<p class="small" v-if="+info.taxFee">含税费:</p>
						<p class="small">支付方式:</p>
					</div>
				</div>
			</div>
		</el-card>
		<el-dialog title="修改收货地址" :visible.sync="showArea" width="700px" close-on-press-escape>
			<el-form :model="form" ref="form" :rules="ruleForm" label-width="120px" label-position="left">
				<el-form-item label="选择城市：" prop="area">
					<c-area v-model="form.area"></c-area>
				</el-form-item>
				<el-form-item label="收货人名称：" prop="name">
					<el-input type="text" v-model="form.name" placeholder="请填写收货人名称"></el-input>
				</el-form-item>
				<el-form-item label="收货人手机 ：" prop="mobile">
					<el-input type="text" v-model="form.mobile" placeholder="请填写收货人手机"></el-input>
				</el-form-item>
				<el-form-item label="地址 ：" prop="address">
					<el-input type="text" v-model="form.address" placeholder="请填写收货人详细地址"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="cancel-btn" @click="showArea = false">取 消</el-button>
				<el-button class="confirm-btn" type="primary" @click="modifyAddressInfo('form')">确认修改</el-button>
			</span>
		</el-dialog>
		<el-dialog title="订单备注" :visible.sync="sellerVisible" width="700px" close-on-press-escape>
			<el-form>
				<el-form-item>
					<el-input
						type="textarea"
						:autosize="{ minRows: 3}"
						placeholder="请输入内容"
						v-model="sellerMessage">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="cancel-btn" @click="sellerVisible = false">取 消</el-button>
				<el-button class="confirm-btn" type="primary" @click="modifySellerMessage">确认</el-button>
			</span>
		</el-dialog>
		<el-dialog title="订单发货" :visible.sync="isShipments" width="700px" close-on-press-escape>
			<el-form :model="form" ref="form" :rules="ruleForm" label-width="100px" label-position="left">
				<el-form-item label="快递公司：" prop="expressCompanyId">
					<!-- <el-select v-model="form.expressCompanyId" clearable placeholder="请选择快递公司" style="width: 90%;">
						<el-option v-for="item in expressCompanyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select> -->
					<el-select
  				  v-model="form.expressCompanyId"
  				  filterable
  				  remote
						style="width: 90%;"
  				  reserve-keyword
  				  placeholder="请输入关键词（可搜索）"
  				  :remote-method="expressCompany"
  				  :loading="loading">
  				  <el-option
  				    v-for="item in expressCompanyList"
  				    :key="item.id"
  				    :label="item.name"
  				    :value="item.id">
  				  </el-option>
  				</el-select>
				</el-form-item>
				<el-form-item label="快递单号 ：" prop="expressSn">
					<el-input type="text" v-model="form.expressSn" placeholder="请输入快递单号" style="width: 90%;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button class="cancel-btn" @click="isShipments = false">取 消</el-button>
				<el-button class="confirm-btn" type="primary" @click="shipments('form')">{{form.orderSn?'确认修改':'确认发货'}}</el-button>
			</span>
		</el-dialog>
		<el-dialog title="订单改价" :visible.sync="priceVisible" width="900px" close-on-press-escape>
			<el-table :data="orderGoodsInfo" style="width: 100%">
				<el-table-column min-width="180" label="商品" prop="goodsName"></el-table-column>
				<el-table-column min-width="120" label="单价" prop="piecePrice"></el-table-column>
				<el-table-column min-width="120" label="数量" prop="number"></el-table-column>
				<el-table-column min-width="120" label="小计">
					<template slot-scope="scope">
						{{scope.row.piecePrice*scope.row.number}}
					</template>
				</el-table-column>
				<el-table-column min-width="120" label="应付价格" prop="actualPrice"></el-table-column>
				<el-table-column min-width="160" label="改价">
					<template slot-scope="scope">
						<el-input v-model="scope.row.price" placeholder="改价金额" @keyup.native="scope.row.price=formatDoublePlus(scope.row.price, scope.row.actualPrice)"></el-input>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button class="cancel-btn" @click="priceVisible = false">取 消</el-button>
				<el-button class="confirm-btn" type="primary" @click="modifyGoodsPrice(orderGoodsInfo)">确认修改</el-button>
			</span>
		</el-dialog>
		<el-dialog
	      title="物流详情"
	      :visible.sync="logistics"   
	      width="700px"
	      close-on-press-escape
	    >
	    	<div class="box-header">
	    		<img v-if="item.logo" :src="item.logo.original" class="wuliu-image">
	      	<span class="header-left">{{item.expressName}}</span>
	      	<span>物流单号：{{item.expressSn}}</span>
	      </div>
	      <div class="steps-box">
	      	<div class="step-div">
					  <el-steps direction="vertical" :active="1">
					    <el-step v-for="(item, index) in expressItem" :key="index" :title="item.ftime" description="">
					    	 <i class="fa fa-cart-arrow-down" slot="icon"></i>
					    </el-step>
					  </el-steps>
					</div>
					<div class="step-right" v-for="(item, index) in expressItem" :key="index">
						<span :style="index<1?'font-size:20px;':''">{{item.context}}</span>
					</div>
	      </div>
	      <span
	        slot="footer"
	        class="dialog-footer"
	      >
	        <el-button
	          class="confirm-btn"
	          type="primary"
	          @click="logistics = false"
	        >关闭</el-button>
	      </span>
	    </el-dialog>
	</div>
</template>

<script>
	import cArea from '@/components/base/cArea'
	export default {
		components: {
			cArea
		},
		data() {
			return {
				loading: false,
				addressInfo: {},
				stepVal: 0,
				info: {},
				sellerMessage: '',
				goodsInfo: [],
				address: [],
				showArea: false,
				form: {
					area: [],
					address: '',
					name: '',
					mobile: '',
				},
				ruleForm: {
					area: [{
						required: true,
						message: '请选择城市',
						trigger: ['blur', 'change']
					}],
					address: [{
						required: true,
						message: '请填写收货人详细地址',
						trigger: ['blur', 'change']
					}],
					name: [{
						required: true,
						message: '请填写收货人名称',
						trigger: ['blur', 'change']
					}],
					mobile: [{
						required: true,
						pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/,
						message: '请填写正确的收货人手机',
						trigger: ['blur', 'change']
					}],
				},
				sellerVisible: false,
				orderSn: '',
				isShipments: false,
				expressCompanyList: [],
				form: {
					expressCompanyId: '',
					expressSn: '',
				},
				ruleForm: {
					expressCompanyId: [{
						required: true,
						message: '请选择快递公司',
						trigger: ['blur', 'change']
					}],
					expressSn: [{
						required: true,
						message: '请输入快递单号',
						trigger: ['blur', 'change']
					}],
				},
				priceVisible: false,
				orderGoodsInfo: [],
				expressItem: [],
				item: [],
				logistics: false,
			}
		},
		computed: {
			payment () {
				let vm = this
				let temp = []
				let type = {
					1: '微信支付',
					2: '支付宝支付',
					3: '网银支付',
					4: '快捷支付',
					50: '其他支付',					
				}
				if (+vm.info.balance) {
					temp.push(vm.info.balance+'通用积分')
				}
				if (+vm.info.enterprisePrice) {
					temp.push(vm.info.enterprisePrice+'企业通用积分')
				}
				if (+vm.info.points) {
					temp.push(vm.info.points+'信用积分')
				}
				if (vm.info.payType && +vm.info.payPrice) {
					temp.push(vm.info.payPrice + type[vm.info.payType])
				}
				return temp.join('+')
			}
		},
		created() {
			this.orderSn = this.$route.query.orderSn
			this.getOrderDetail()
			// this.getOrderGoodsList()
		},
		methods: {
			//修改收货地址
			modifyAddressInfo(form) {
				let vm = this
				vm.$refs[form].validate((valid) => {
					if(valid) {
						vm.$post(vm.$api.order.modifyAddressInfo, {
							accountId: localStorage['userId'+sessionStorage['roleTypeId']],
							orderSn: vm.orderSn,
							name: vm.form.name,
							mobile: vm.form.mobile,
							address: vm.form.address,
							countryId: vm.form.area[0],
							provinceId: vm.form.area[1],
							cityId: vm.form.area[2],
							areaId: vm.form.area[3],
						}).then(resp => {
							vm.showArea = false
							vm.$message({
								message: '修改成功',
								type: 'success'
							})
							vm.getOrderDetail()
						})
					}
				})
			},
			//获取订单商品列表
			// getOrderGoodsList() {
			// 	let vm = this
			// 	vm.$get(vm.$api.order.getOrderGoodsList, {
			// 		accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			// 		orderSn: vm.orderSn,
			// 		curPage: 1,
			// 		pageSize: 2000,
			// 	}).then(resp => {
			// 		vm.goodsInfo = resp.list.list
			// 	})
			// },
			// 打开订单改价窗口
			openPriceVisible () {
				let vm = this
				vm.orderGoodsInfo = vm.info.goodsInfo.map(obj => {
					return {
						itemId: obj.itemId,
						price: '',
						goodsName: obj.goodsName,
						piecePrice: obj.piecePrice,
						number: obj.number,
						actualPrice: obj.actualPrice
					}
				})
				vm.priceVisible = true
			},
			// 修改表格商品改价
			openGoodsPrice (itemId) {
				let vm = this
				vm.$prompt('请输入商品价格', '修改商品价格', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^(-|\+)?\d+\.?\d{0,2}$/,
					inputErrorMessage: '请输入修改金额, 如: 0.00'
				}).then(({value}) => {
					let orderGoodsInfo = [{
						'itemId': itemId,
						'price': value
					}]
					vm.modifyGoodsPrice(orderGoodsInfo)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消操作'
					})
				})
			},
			//修改订单商品价格
			modifyGoodsPrice(orderGoodsInfo) {
				let vm = this
				vm.priceVisible = false
				vm.$post(vm.$api.order.modifyGoodsPrice, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					orderSn: vm.orderSn,
					orderGoodsInfo: orderGoodsInfo
				}).then(resp => {
					vm.$message({
						message: '修改成功',
						type: 'success'
					})
					// vm.getOrderGoodsList()
					vm.getOrderDetail()
				})
			},
			//修改订单运费
			modifyFreight() {
				let vm = this
				vm.$prompt('请输入订单运费', '修改订单运费', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^(-|\+)?\d+\.?\d{0,2}$/,
					inputErrorMessage: '请输入修改金额, 如: 0.00'
				}).then(({
					value
				}) => {
					vm.$post(vm.$api.order.modifyFreight, {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						orderSn: vm.orderSn,
						freight: value
					}).then(resp => {
						vm.$message({
							message: '修改成功',
							type: 'success'
						})
						vm.getOrderDetail()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消操作'
					})
				})
			},
			//获取订单详情
			getOrderDetail() {
				let vm = this
				vm.$get(vm.$api.order.getOrderDetail, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					orderSn: vm.orderSn
				}).then(resp => {
					if(resp) {
						vm.info = resp
						if(vm.info.status == 0) {
							vm.stepVal = 1
						} else if(vm.info.status == 10) {
							vm.stepVal = 2
						} else if(vm.info.status == 20 || vm.info.status == 30 || vm.info.status == 40 || vm.info.status == 50 || vm.info.status == 60) {
							vm.stepVal = 3
						} else if(vm.info.status == 70 || vm.info.status == 80 || vm.info.status == 140 || vm.info.status == 150) {
							vm.stepVal = 4
						}
						vm.addressInfo = vm.info.addressInfo ? JSON.parse(vm.info.addressInfo) : ''
					}
				})
			},
			//获取订单备注
			getSellerMessage() {
				let vm = this
				vm.$get(vm.$api.order.getSellerMessage, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					orderSn: vm.orderSn
				}).then(resp => {
					vm.sellerMessage = resp.sellerMessage
					vm.sellerVisible = true
				})
			},
			//修改订单备注
			modifySellerMessage() {
				let vm = this
				vm.$post(vm.$api.order.modifySellerMessage, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					orderSn: vm.orderSn,
					message: vm.sellerMessage
				}).then(resp => {
					vm.sellerVisible = false
					vm.$message({
						message: '修改成功',
						type: 'success'
					})
				})
			},
			// 修改订单物流信息
			modifyExpressInfo () {
				console.log(123)
				let vm = this
				vm.$get(vm.$api.order.expressCompany, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					curPage: 1,
					pageSize: 30,
				}).then(resp => {
					vm.expressCompanyList = resp.list
					console.log(resp)
					// let temp = vm.expressCompanyList.find(obj => obj.name == vm.info.expressName)
					let temp = {
						name:vm.info.expressName,
						id:vm.info.expressId
					}
					vm.expressCompanyList.push(temp)
					vm.form = {
						expressCompanyId: temp ? temp.id : '',
						expressSn: vm.info.expressSn,
						orderSn: vm.orderSn
					}
					vm.isShipments = true
					this.getOrderDetail()
				})
			},
			expressCompany(keyword) {
				let vm = this
				vm.loading = true
				let param = {
					accountId: localStorage['userId' + sessionStorage['roleTypeId']],
					keyword: keyword,
					curPage: 1,
					pageSize: 40,
					loading: true
				}
				vm.$get(vm.$api.order.expressCompany, param).then(resp => {
					vm.expressCompanyList = resp.list
					vm.loading = false
				})
			},
			//订单发货
			showShipments() {
				let vm = this
				vm.$get(vm.$api.order.expressCompany, {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					curPage: 1,
					pageSize: 10,
				}).then(resp => {
					vm.expressCompanyList = resp.list
					vm.form = {
						expressCompanyId: '',
						expressSn: ''
					}
					vm.isShipments = true
				})
			},
			shipments(ref) {
				let vm = this
				vm.$refs[ref].validate((valid) => {
					if(valid) {
						let tempurl = vm.form.orderSn ? vm.$api.order.modifyExpressInfo : vm.$api.order.shipments
						vm.$post(tempurl, {
							accountId: localStorage['userId'+sessionStorage['roleTypeId']],
							orderSn: vm.orderSn,
							expressCompanyId: vm.form.expressCompanyId,
							expressSn: vm.form.expressSn
						}).then(resp => {
							vm.isShipments = false
							vm.$message({
								message: '操作成功',
								type: 'success'
							})
							vm.getOrderDetail()
						})
					}
				})
			},
			//取消发货
			cancelShipments() {
				let vm = this
				vm.$prompt('请输入取消发货原因', '取消发货', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '请输入取消发货原因'
				}).then(({
					value
				}) => {
					vm.$post(vm.$api.order.cancelShipments, {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						orderSn: vm.orderSn,
						cancelSendReason: value
					}).then(resp => {
						vm.$message({
							message: '已取消发货',
							type: 'success'
						})
						vm.getOrderDetail()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消操作'
					})
				})
			},
			//关闭订单
			closeOrder() {
				let vm = this
				vm.$confirm('确定关闭该订单吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					vm.$post(vm.$api.order.closeOrder, {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						orderSn: vm.orderSn
					}).then(resp => {
						vm.$message({
							message: '该订单已关闭',
							type: 'success'
						})
						vm.getOrderDetail()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消关闭'
					})
				})
			},
			//删除订单
			deleteOrder() {
				let vm = this
				vm.$confirm('确定删除该订单吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					vm.$post(vm.$api.order.deleteOrder, {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						orderSn: vm.orderSn
					}).then(resp => {
						vm.$message({
							message: '该订单已删除',
							type: 'success'
						})
						vm.getOrderList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					})
				})
			},
			// 查看订单物流信息
		    getOrderExpressInfo() {
		      let vm = this;
		      let param = {
		      	accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
		      	orderSn: vm.orderSn
		      }
		      vm.$get(vm.$api.order.getOrderExpressInfo, param).then(resp => {
						vm.item = resp
		      	vm.expressItem = resp.expressInfo
		      	vm.logistics = true;
		      });
		    },
		}
	}
</script>

<style lang="less">
	.order_detail {
		font-size: 14px;
		.w-b {
			height: 40px;
			overflow: hidden;
		}
		.border-right {
			border-right: 1px solid #e4e4e4;
		}
		.el-step__title.is-process {
			font-weight: normal;
		}
		.el-step__title {
			font-size: 14px;
		}
		.box-card {
			margin: 10px;
		}
		.row-height {
			line-height: 40px;
		}
		.foot-info {
			line-height: 30px;
			// padding: 20px;
			text-align: right;
			.back-div {
				float: right;
				padding: 20px;
			}
			.r {
				color: #F56C6C;
			}
			.b {
				font-weight: 600;
				font-size: 20px;
			}
			.small {
				font-size: 12px;
				color: #909399;
			}
		}
		.el-step__title.is-finish {
			color: #000;
		}
		.el-step__description.is-finish {
			color: #909399;
		}
		.el-step.is-horizontal .el-step__line {
			height: 4px;
		}
		// .el-step__head.is-finish {
		// 	height: 4px;
		// }
		.el-step__line-inner {
			border-width: 2px!important;
		}
		.order-tit {
			text-align: center;
			color: #909399;
			line-height: 25px;
			font-size: 12px;
		}
		.image {
			height: 60px;
			width: 60px;
			display: block;
			float: left;
		}
		.image-name {
			height: 60px;
			line-height: 20px;
			padding: 0 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
		.gray {
			color: #ccc;
		}
		.box-header {
		  	width: 100%;
		  	font-size: 18px;
		  	border-top: 1px solid #e2e0e0;
		  	.wuliu-image {
		  		width: 50px;
		  		height: 50px;
		  		padding-top: 25px;
		  		padding-left: 25px;
		  		padding-right: 120px;
		  	}
		  	.header-left {
			    font-size: 18px;
			    padding-left: 25px;
			    padding-right: 100px;
		  	}
		  }
		  .steps-box {
		  /*	height: 500px;*/
		  	padding-top: 30px;
		  	padding-left: 25px;
		  }
		  .step-div {
		  	width: 200px;
		  /*	height: 300px;*/
		  	float: left;
		  }
		  .step-right {
		  	width: 500px;
		  	height: 123px;
		    padding-right: 20px;
		  }
		  .el-step {
		  	height: 123px;
		  }
	}
</style>