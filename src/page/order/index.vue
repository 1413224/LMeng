<template>
  <div class="order">
    <div class="nub-top">
      <div class="right-div">
        <p>符合搜索条件的订单总数</p>
        <p class="r-num">{{ totalNums }}</p>
      </div>
      <div
        class="right-div"
        style="border: none;"
      >
        <p>符合搜索条件的订单总额</p>
        <p class="r-num">{{ totalMoney }}</p>
      </div>
      <h2>订单管理</h2>
    </div>
    <el-card class="box-card">
      <el-form
        label-width="80px"
        label-position="left"
      >
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="status"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付方式">
              <el-select
                v-model="payType"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in payTypeOptions"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="enOpen">
            <el-col :span="8">
              <el-form-item label="关键字">
                <el-input
                  clearable
                  v-model="keyword"
                  placeholder="订单号或手机号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="时间类型">
                <el-select v-model="timeType">
                  <el-option
                    v-for="item in timeTypeOptions"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="timeSlot"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  style="width: 54%;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="8">
            <el-button
              type="primary"
              @click="onSearch()"
            >查询</el-button>
            <el-button @click="resetting">重置</el-button>
            <el-button
              type="text"
              v-if="!enOpen"
              @click="enOpen=!enOpen"
            >展开 <i class="el-icon-arrow-down"></i></el-button>
            <el-button
              type="text"
              v-else
              @click="enOpen=!enOpen"
            >收起 <i class="el-icon-arrow-up"></i></el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="order-th">
        <el-col :span="9" style="text-align: left; padding-left: 20px;">商品</el-col>
        <el-col :span="3">买家</el-col>
        <el-col :span="3">支付/配送</el-col>
        <el-col :span="3">订单金额</el-col>
        <el-col :span="3">操作</el-col>
        <el-col :span="3">状态</el-col>
      </el-row>
      <el-row class="order-tbody" v-for="item in orderData" :key="item.orderSn">
        <!-- 表格行头 -->
        <el-col class="order-tr">
          <el-tag
            size="mini"
            v-if="item.type == 1"
          >线下门店</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 2"
            type="danger"
          >实物商品</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 3"
            type="warning"
          >共享服务</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 4"
            type="info"
          >点餐</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 5"
            type="info"
          >酒店</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 6"
            type="info"
          >门票</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 7"
            type="info"
          >游戏</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 8"
            type="info"
          >手机充值</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 9"
            type="info"
          >电影票</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 10"
            type="info"
          >演出票</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 11"
            type="info"
          >加油卡</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 12"
            type="success"
          >收钱吧</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 13"
            type="danger"
          >线下餐饮</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 14"
          >即时消费</el-tag>
          <el-tag
            size="mini"
            v-if="item.type == 15"
          >线上点餐</el-tag>
          <span class="bold">{{item.createTime | formatDate}}</span>
          <span>订单编号: {{item.orderSn}}</span>
          <div class="right">
            <el-button
              type="text"
              @click="getSellerMessage(item.orderSn)"
              v-has="'remark-order'"
            >备注</el-button>
            <template v-if="item.status == 0">
              <el-button
                type="text"
                class="gray"
                @click="openPriceVisible(item.goodsInfo, item.orderSn)"
                v-has="'price-order'"
              >订单改价</el-button>
              <el-button
                type="text"
                class="gray"
                @click="modifyFreight(item.orderSn)"
                v-has="'logistics-order'"
              >物流改价</el-button>
              <el-button
                type="text"
                class="gray"
                @click="closeOrder(item.orderSn)"
                v-has="'close-order'"
              >关闭订单</el-button>
            </template>
            <template v-if="item.status == 10">
              <!-- <el-button v-if="item.dispatchType == 4" type="text" class="gray" @click="getSellerMessage(item.orderSn)">通知取货</el-button>
							<el-button v-if="item.dispatchType == 5" type="text" class="gray" @click="getSellerMessage(item.orderSn)">确认配送</el-button> -->
              <el-button
                v-if="item.payway == 3"
                type="text"
                class="gray"
                @click="closeOrder(item.orderSn)"
                v-has="'close-order'"
              >关闭订单</el-button>
            </template>
            <template v-if="item.status == 20">
            	<el-button
                type="text"
                class="gray"
                @click="getOrderExpressInfo(item.orderSn)"
                v-has="'edit-order'"
              >查看物流</el-button>
              <el-button
                type="text"
                class="gray"
                @click="modifyExpressInfo(item)"
                v-has="'edit-order'"
              >修改物流</el-button>
              <el-button
                type="text"
                class="gray"
                @click="cancelShipments(item.orderSn)"
                v-has="'cancel-order'"
              >取消发货</el-button>
            </template>
            <el-button
              v-if="item.userDel == 2"
              type="text"
              class="gray"
              @click="deleteOrder(item.orderSn)"
              v-has="'del-order'"
            >彻底删除</el-button>
          </div>
        </el-col>
        <el-col class="order-td" :style="'height:'+item.goodsInfo.length*100+'px;'" >
          <!-- 商品 -->
          <el-col :span="9">
            <template v-for="(goods, index) in item.goodsInfo">
              <div class="td-shop" :key="goods.goodsId" v-if="index<5" >
                <img v-if="goods.goodsLogo&&goods.goodsLogo.original" :src="goods.goodsLogo.original" alt="" class="image">
                <img v-else src="../../assets/images/goods_default.png" alt="" class="image" >
                <el-popover placement="top-start" trigger="hover" class="name" >
                  <div style="line-height: 30px;">
                    {{goods.goodsName}}
                  </div>
                  <div slot="reference">
                    {{goods.goodsName}}
                    <template v-if="item.type == 3">
                      <p>设备编号: {{goods.equipNumber}}</p>
                      <p>时长: {{goods.workTime | formatSecs}}</p>
                    </template>
                  </div>
                </el-popover>
                <div class="price">
                  <!-- <p>123</p> -->
                  <p>× {{goods.number}}</p>
                </div>
              </div>
            </template>
            <div class="td-shop" v-if="item.goodsInfo.length>5" style="padding: 4px 0;" >
              <div class="more">
                <el-button type="text" class="gray" @click="orderDetail(item.orderSn)">查看更多商品<i class="el-icon-arrow-right"></i></el-button>
              </div>
            </div>
            <div class="td-shop" v-if="!item.goodsInfo||item.goodsInfo.length<1" >
              <img src="../../assets/images/goods_default.png" alt="" class="image" >
            </div>
          </el-col>
          <!-- 买家 -->
          <el-col :span="3" class="td-div" >
            <span v-if="item.mobile">{{item.mobile}}<br />{{item.nickname}}<br />{{item.realname}}</span>
            <span v-else style="color: #ccc;" >匿名订单</span>
          </el-col>
          <!-- 配送/支付 -->
          <el-col :span="3" class="td-div" >
            <p v-if="item.payType == 0">无第三方支付</p>
            <p v-if="item.payType == 1">微信</p>
            <p v-if="item.payType == 2">支付宝 </p>
            <p v-if="item.payType == 3">网银支付</p>
            <p v-if="item.payType == 4">快捷支付</p>
            <p v-if="item.payType == 50">其他</p>
            <div style="padding-top: 10px;">
              <p v-if="item.dispatchType == 1">线下购买</p>
              <p v-if="item.dispatchType == 2">普通快递</p>
              <p v-if="item.dispatchType == 3">线上发货 </p>
              <p v-if="item.dispatchType == 4">门店自提</p>
              <p v-if="item.dispatchType == 5">同城配送</p>
              <p v-if="item.dispatchType == 6">无需发货</p>
            </div>
          </el-col>
          <!-- 订单金额 -->
          <el-col :span="3" class="td-div" >
            <span>￥ {{item.actualPrice}}</span>
          </el-col>
          <!-- 操作 -->
          <el-col :span="3" class="td-div"  >
            <el-button type="text" size="mini" @click="orderDetail(item.orderSn)" v-has="'order-detail'">订单详情</el-button>
          </el-col>
          <!-- 状态 -->
          <el-col :span="3" class="td-div">
            <el-tag
              type="info"
              size="mini"
              v-if="item.status == 0"
            >待付款</el-tag>
            <el-tag
              type="warning"
              size="mini"
              v-if="item.status == 10"
            >待发货</el-tag>
            <el-tag
              type=""
              size="mini"
              v-if="item.status == 20"
            >已发货 </el-tag>
            <el-tag
              type=""
              size="mini"
              v-if="item.status == 30"
            >待取货</el-tag>
            <el-tag
              type=""
              size="mini"
              v-if="item.status == 40"
            >待使用</el-tag>
            <el-tag
              type="warning"
              size="mini"
              v-if="item.status == 50"
            >待处理</el-tag>
            <el-tag
              type=""
              size="mini"
              v-if="item.status == 60"
            >使用中</el-tag>
            <el-tag
              type="success"
              size="mini"
              v-if="item.status == 70"
            >已完成</el-tag>
            <el-tag
              type="danger"
              size="mini"
              v-if="item.status == 80"
            >订单异常 </el-tag>
            <el-tag
              type="info"
              size="mini"
              v-if="item.status == 130"
            >订单超时</el-tag>
            <el-tag
              type="info"
              size="mini"
              v-if="item.status == 140"
            >已取消</el-tag>
            <el-tag
              type="info"
              size="mini"
              v-if="item.status == 150"
            >已关闭</el-tag>
            <div style="padding-top: 10px;">
              <el-button
                v-if="item.status == 0 && item.payway == 2"
                type="text"
                size="mini"
                v-has="'pay-order'"
              >确认付款</el-button>
              <el-button
                v-if="item.status == 10 && item.dispatchType == 2"
                type="text"
                size="mini"
                @click="showShipments(item.orderSn)"
                v-has="'confirme-order'"
              >确认发货</el-button>
              <!-- <el-button v-if="item.status == 20" type="text" size="mini">确认收货</el-button> -->
            </div>
          </el-col>
        </el-col>
      </el-row>
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
        class="flex_center"
      >
        <span style="text-align: center;">{{curPage}}/{{pages}}</span>
      </el-pagination>
    </el-card>
    <el-dialog
      title="订单发货"
      :visible.sync="isShipments"
      width="700px"
      close-on-press-escape
    >
      <el-form
        :model="form"
        ref="form"
        :rules="ruleForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item
          label="快递公司："
          prop="expressCompanyId"
        >
          <!-- <el-select
            v-model="form.expressCompanyId"
            clearable
            placeholder="请选择快递公司"
            style="width: 90%;"
          >
            <el-option
              v-for="item in expressCompanyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <el-select
            v-model="form.expressCompanyId"
            filterable
            remote
            style="width: 90%;"
            reserve-keyword
            placeholder="请输入关键词"
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
        <el-form-item
          label="快递单号 ："
          prop="expressSn"
        >
          <el-input
            type="text"
            v-model="form.expressSn"
            placeholder="请输入快递单号"
            style="width: 90%;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel-btn"
          @click="isShipments = false"
        >取 消</el-button>
        <el-button
          class="confirm-btn"
          type="primary"
          @click="shipments('form')"
        >{{form.orderSn?'确认修改':'确认发货'}}</el-button>
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
				  <el-steps direction="vertical" :active="1" finish-status="success">
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
    <el-dialog
      title="订单备注"
      :visible.sync="sellerVisible"
      width="700px"
      close-on-press-escape
    >
      <el-form>
        <el-form-item>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3}"
            placeholder="请输入内容"
            v-model="sellerMessage"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel-btn"
          @click="sellerVisible = false"
        >取 消</el-button>
        <el-button
          class="confirm-btn"
          type="primary"
          @click="modifySellerMessage"
        >确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="订单改价"
      :visible.sync="priceVisible"
      width="900px"
      close-on-press-escape
    >
      <el-table
        :data="orderGoodsInfo"
        style="width: 100%"
      >
        <el-table-column
          min-width="180"
          label="商品"
          prop="goodsName"
        ></el-table-column>
        <el-table-column
          min-width="120"
          label="单价"
          prop="piecePrice"
        ></el-table-column>
        <el-table-column
          min-width="120"
          label="数量"
          prop="number"
        ></el-table-column>
        <el-table-column
          min-width="120"
          label="小计"
        >
          <template slot-scope="scope">
            {{scope.row.piecePrice*scope.row.number}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          label="应付价格"
          prop="actualPrice"
        ></el-table-column>
        <el-table-column
          min-width="160"
          label="改价"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              placeholder="改价金额"
              @keyup.native="scope.row.price=formatDoublePlus(scope.row.price, scope.row.actualPrice)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel-btn"
          @click="priceVisible = false"
        >取 消</el-button>
        <el-button
          class="confirm-btn"
          type="primary"
          @click="modifyGoodsPrice(orderGoodsInfo)"
        >确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCancelShipments: false,
      isShipments: false,
      logistics: false,
      goods: [],
      enOpen: false,
      totalMoney: 0,
      totalNums: 0,
      status: -1,
      statusOptions: [
        {
          key: "所有",
          value: -1
        },
        {
          key: "待付款",
          value: 0
        },
        {
          key: "待发货",
          value: 10
        },
        {
          key: "已发货",
          value: 20
        },
        {
          key: "待取货",
          value: 30
        },
        {
          key: "待使用",
          value: 40
        },
        {
          key: "待处理",
          value: 50
        },
        {
          key: "使用中",
          value: 60
        },
        {
          key: "已完成",
          value: 70
        },
        {
          key: "订单异常",
          value: 80
        },
        {
          key: "订单超时",
          value: 130
        },
        {
          key: "已取消",
          value: 140
        },
        {
          key: "已关闭",
          value: 150
        }
      ],
      payType: -1,
      payTypeOptions: [
        {
          key: "全部",
          value: -1
        },
        {
          key: "无第三方支付",
          value: 0
        },
        {
          key: "微信",
          value: 1
        },
        {
          key: "支付宝",
          value: 2
        },
        {
          key: "网银支付",
          value: 3
        },
        {
          key: "快捷支付",
          value: 4
        },
        {
          key: "其他",
          value: 50
        }
      ],
      timeType: 1,
      timeTypeOptions: [
        {
          key: "下单时间",
          value: 1
        },
        {
          key: "付款时间",
          value: 2
        },
        {
          key: "完成时间",
          value: 3
        }
      ],
      keyword: "",
      timeSlot: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderSn: "",
      curPage: 1,
      pageSize: 10,
      orderData: [],
      expressCompanyList: [],
      form: {
        expressCompanyId: "",
        expressSn: ""
      },
      ruleForm: {
        expressCompanyId: [
          {
            required: true,
            message: "请选择快递公司",
            trigger: ["blur", "change"]
          }
        ],
        expressSn: [
          {
            required: true,
            message: "请输入快递单号",
            trigger: ["blur", "change"]
          }
        ]
      },
      search: {
        status: -1,
        payType: -1,
        keyword: "",
        timeType: 1,
        startTime: "",
        endTime: "",
        userDel: -1
      },
      userDel: -1,
      userDelOptions: [
        {
          value: -1,
          label: "所有"
        },
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "回收站"
        },
        {
          value: 2,
          label: "彻底删除"
        }
      ],
      sellerVisible: false,
      sellerMessage: "",
      sellerOrderSn: "",
      pages: 1,
      priceVisible: false,
      orderGoodsInfo: [],
      expressItem: [],
      list: [],
      loading: false,
      item: []
    };
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
        vm.getOrderList()
    })
  },
  methods: {
    resetting() {
      let vm = this;
      vm.status = -1;
      vm.payType = -1;
      vm.keyword = "";
      vm.timeType = 1;
      vm.timeSlot = [];
      vm.userDel = -1;
      vm.search = {
        status: -1,
        payType: -1,
        keyword: "",
        timeType: 1,
        startTime: "",
        endTime: "",
        userDel: -1
      };
      vm.curPage = 1;
      vm.$refs.paging.lastEmittedPage = 1;
      vm.getOrderList();
    },
    onSearch() {
      let vm = this;
      vm.search = {
        // 进行搜索条件缓存
        status: vm.status,
        payType: vm.payType,
        keyword: vm.keyword,
        timeType: vm.timeType,
        startTime: parseInt(vm.timeSlot[0] / 1000) || "",
        endTime: parseInt(vm.timeSlot[1] / 1000) + 86399 || "",
        userDel: vm.userDel
      };
      vm.curPage = 1;
      vm.$refs.paging.lastEmittedPage = 1;
      vm.getOrderList();
    },
    handleSize(sizeVal) {
      this.pageSize = sizeVal;
      this.curPage = 1;
      this.$refs.paging.lastEmittedPage = 1;
      this.getOrderList();
    },
    handleCurrent(currentVal) {
      this.curPage = currentVal;
      this.getOrderList();
    },
    //删除订单
    deleteOrder(orderSn) {
      let vm = this;
      vm.$confirm("确定删除该订单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.$post(vm.$api.order.deleteOrder, {
            accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
            orderSn: orderSn
          }).then(resp => {
            vm.$message({
              message: "该订单已删除",
              type: "success"
            });
            vm.getOrderList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    //关闭订单
    closeOrder(orderSn) {
      let vm = this;
      vm.$confirm("确定关闭该订单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.$post(vm.$api.order.closeOrder, {
            accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
            orderSn: orderSn
          }).then(resp => {
            vm.$message({
              message: "该订单已关闭",
              type: "success"
            });
            vm.getOrderList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消关闭"
          });
        });
    },
    //取消发货
    cancelShipments(orderSn) {
      let vm = this;
      vm.$prompt("请输入取消发货原因", "取消发货", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "请输入取消发货原因"
      })
        .then(({ value }) => {
          vm.$post(vm.$api.order.cancelShipments, {
            accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
            orderSn: orderSn,
            cancelSendReason: value
          }).then(resp => {
            vm.$message({
              message: "已取消发货",
              type: "success"
            });
            vm.getOrderList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 修改订单物流信息
    modifyExpressInfo({ orderSn, expressName, expressSn,expressId }) {
      let vm = this;
      vm.orderSn = orderSn;
      vm.$get(vm.$api.order.expressCompany, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        curPage: 1,
        pageSize: 50
      }).then(resp => {
        vm.expressCompanyList = resp.list;
        // let temp = vm.expressCompanyList.find(obj => obj.name == expressName);
        let temp = {
						name:expressName,
						id:expressId
        }
				vm.expressCompanyList.push(temp)
        vm.form = {
          expressCompanyId: temp ? temp.id : "",
          expressSn: expressSn,
          orderSn: orderSn
        };
        vm.isShipments = true;
        vm.getOrderDetail();
      });
    },
    // 查看订单物流信息
    getOrderExpressInfo(orderSn) {
      let vm = this;
//    vm.logistics = true;
      let param = {
      	accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
      	orderSn: orderSn
      }
      vm.$get(vm.$api.order.getOrderExpressInfo, param).then(resp => {
        vm.item = resp
      	vm.expressItem = resp.expressInfo
      	vm.logistics = true;
//					let ftime = item.ftime.split(',')
//					item.ftime = ftime.map(val => {
//      		return {
//      			minute: val,
//      			year: year
//      		}
//        })
//					console.log(item.ftime)
     });
    },
    //订单发货
    showShipments(orderSn) {
      let vm = this;
      vm.orderSn = orderSn;
      vm.$get(vm.$api.order.expressCompany, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        curPage: 1,
        pageSize: 30
      }).then(resp => {
        vm.expressCompanyList = resp.list;
        vm.loading = false
        vm.form = {
          expressCompanyId: "",
          expressSn: ""
        };
        vm.isShipments = true
      })
    },
    expressCompany(keyword) {
			let vm = this
			vm.loading = true
			let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']],
				keyword: keyword,
				curPage: 1,
				pageSize: 30,
				loading: true
			}
			vm.$get(vm.$api.order.expressCompany, param).then(resp => {
				vm.expressCompanyList = resp.list
				vm.loading = false
			})
		},
    shipments(ref) {
      let vm = this;
      vm.$refs[ref].validate(valid => {
        if (valid) {
          let tempurl = vm.form.orderSn
            ? vm.$api.order.modifyExpressInfo
            : vm.$api.order.shipments;
          vm.$post(tempurl, {
            accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
            orderSn: vm.orderSn,
            expressCompanyId: vm.form.expressCompanyId,
            expressSn: vm.form.expressSn
          }).then(resp => {
            vm.isShipments = false;
            vm.$message({
              message: "操作成功",
              type: "success"
            });
            vm.getOrderList();
          });
        }
      });
    },
    //跳转订单详情
    orderDetail(orderSn) {
      this.$router.push({
        path: "/order-detail",
        query: {
          orderSn: orderSn
        }
      });
    },
    //获取订单列表
    getOrderList() {
      let vm = this;
      let param = Object.assign({}, vm.search, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        curPage: vm.curPage,
        pageSize: vm.pageSize
      });
      vm.$get(vm.$api.order.getOrderList, param).then(resp => {
        vm.orderData = resp.list;
        vm.totalNums = resp.totalNums;
        vm.totalMoney = resp.totalMoney;
        vm.pages = resp.pages || 1;
      });
    },
    //获取订单备注
    getSellerMessage(orderSn) {
      let vm = this;
      vm.$get(vm.$api.order.getSellerMessage, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        orderSn: orderSn
      }).then(resp => {
        vm.sellerMessage = resp.sellerMessage;
        vm.sellerOrderSn = orderSn;
        vm.sellerVisible = true;
      });
    },
    //修改订单备注
    modifySellerMessage() {
      let vm = this;
      vm.$post(vm.$api.order.modifySellerMessage, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        orderSn: vm.sellerOrderSn,
        message: vm.sellerMessage
      }).then(resp => {
        vm.sellerVisible = false;
        vm.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    //修改订单运费
    modifyFreight(orderSn) {
      let vm = this;
      vm.$prompt("请输入订单运费", "修改订单运费", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(-|\+)?\d+\.?\d{0,2}$/,
        inputErrorMessage: "请输入修改金额, 如: 0.00"
      })
        .then(({ value }) => {
          vm.$post(vm.$api.order.modifyFreight, {
            accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
            orderSn: orderSn,
            freight: value
          }).then(resp => {
            vm.$message({
              message: "修改成功",
              type: "success"
            });
            vm.getOrderList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 打开订单改价窗口
    openPriceVisible(goodsInfo, orderSn) {
      let vm = this;
      vm.orderSn = orderSn;
      vm.orderGoodsInfo = goodsInfo.map(obj => {
        return {
          itemId: obj.itemId,
          price: "",
          goodsName: obj.goodsName,
          piecePrice: obj.piecePrice,
          number: obj.number,
          actualPrice: obj.actualPrice
        };
      });
      vm.priceVisible = true;
    },
    //修改订单商品价格
    modifyGoodsPrice(orderGoodsInfo) {
      let vm = this;
      vm.priceVisible = false;
      vm.$post(vm.$api.order.modifyGoodsPrice, {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        orderSn: vm.orderSn,
        orderGoodsInfo: orderGoodsInfo
      }).then(resp => {
        vm.$message({
          message: "修改成功",
          type: "success"
        });
        // vm.getOrderGoodsList()
        vm.getOrderDetail();
      });
    }
  }
};
</script>

<style lang="less">
.order {
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
  .page {
    text-align: center;
    margin: 10px auto 0;
  }
  .border {
    border-top: 2px solid #ebeef5;
  }
  .order-th {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #909399;
    background-color: #f8f8f8;
    text-align: center;
    margin-top: 20px;
  }
  .order-tbody {
    margin: 20px 0;
    border: 1px solid #e5e5e5;
    .order-tr {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #909399;
      background-color: #f8f8f8;
      padding: 0 20px;
      .bold {
        font-weight: bold;
        padding: 0 10px;
      }
      .right {
        font-size: 12px;
        float: right;
      }
      .gray {
        color: #303133;
      }
    }
    .order-td {
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      max-height: 550px;
      min-height: 100px;
      color: #666;
      .td-div {
        border-left: 1px solid #e5e5e5;
        height: 100%;
        padding: 20px 0;
      }
      .td-shop {
        text-align: left;
        padding: 20px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        .image {
          float: left;
          height: 60px;
          width: 60px;
          margin-left: 20px;
        }
        .name {
          flex: 1;
          height: 60px;
          line-height: 20px;
          padding: 0 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .price {
          text-align: right;
          padding-right: 20px;
        }
        .more {
          text-align: center;
          width: 100%;
          .gray {
            color: #909399;
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .flex_center {
    padding-top: 20px;
    display: flex;
    justify-content: center;
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
/*  	width: 500px;*/
  	height: 123px;
    padding-right: 20px;
  }
  .el-step__head.is-finish {
  	color: #000;
  	border-color: #000;
  }
  .el-step__title {
  	font-size: 20px;
  	color: #000;
  }
  .el-step__description {
  	color: #b8b9bb;
  }
  .el-step__title is-finish {
  	font-size: 20px;
  	color: #000;
  }
  .el-step__description is-finish {
  	color: #b8b9bb;
  }
  .el-step__icon is-text {
  	color: #868383;
  }
  .el-step__head.is-process {
    color: #303133;
    border-color: #9a9a9a;
  }
  .el-step {
  	height: 123px;
  }
}
</style>