<template>
    <div class="shop-goods-detail">
        <div class="nub-top">
            <h2>商品详情</h2>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="shop-back" v-if="tips && (info.checkStatus === 0 || info.checkStatus === 2)">
                <div>
                    <i class="el-icon-warning"></i>
                    <span v-if="info.checkStatus === 0">该商品已经提交审核信息，如要修改信息，请到审核页进行修改</span>
                    <span v-else>该商品审核受理中，不可修改信息</span>
                    <i class="el-icon-error error" @click="tips=false"></i>
                </div>
            </div>
            <el-tab-pane class="good-info" label="基本信息" name="first">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <el-form :model="base" :rules="baseRules" ref="baseForm" label-width="140px" style="max-width: 800px;">
                        <el-form-item label="排序：">
                            <el-input v-model="base.displayOrder" @keyup.native="base.displayOrder=base.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称：" prop="goodsName">
                            <el-input v-model="base.goodsName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="简称：">
                            <el-input v-model="base.shortName" placeholder="请输入简称"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名称：">
                            <el-input v-model="base.englishName" placeholder="请输入英文名称"></el-input>
                        </el-form-item>
                        <el-form-item label="关键字：">
                            <el-input v-model="base.keyword" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="商品logo：" prop="logoImgId">
                            <el-upload id="logo-upload" class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequest">
                                <div v-if="imageUrl" class="avatar">
                                    <img :src="imageUrl" class="image">
                                </div>
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="商品图册：">
                            <div class="flex-start">
                                <el-upload list-type="picture-card" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :before-upload="beforeUpload" :http-request="imgRequestArr" :on-remove="onRemove" :file-list="base.thumbImgIds">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item label="商品组">
                            <el-select v-model="base.groupIds" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="getGroupList" :loading="loading" style="width: 100%;">
                                <el-option v-for="item in groupOptions" :key="item.groupId" :label="item.groupName" :value="item.groupId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品分类：" prop="cateIds">
                            <c-goods-class v-model="base.cateIds"></c-goods-class>
                        </el-form-item>
                        <el-form-item label="商品品牌：" prop="brandId">
                            <el-select v-model="base.brandId" filterable remote clearable reserve-keyword placeholder="请输入关键词并选择" :remote-method="getGoodsBrand" :loading="loading" style="width: 100%;">
                                <el-option v-for="item in optionsBrand" :key="item.brandId" :label="item.name" :value="item.brandId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品单位：">
                            <el-input v-model="base.unit" placeholder="请输入商品单位"></el-input>
                        </el-form-item>
                        <el-form-item label="原产地：">
                            <c-area v-model="base.originAreaParentIds" :initval="initArea"></c-area>
                        </el-form-item>
                        <el-form-item label="已出售数：" prop="salesNum">
                            <el-input v-model="base.salesNum" placeholder="请输入已出售数(含虚拟出售数)"></el-input>
                        </el-form-item>
                        <el-form-item label="是否显示销量：" prop="showSale">
                            <el-radio-group v-model="base.showSale">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="支持货到付款：" prop="isCod">
		                    <el-radio-group v-model="base.isCod">
		                        <el-radio :label="1">是</el-radio>
		                        <el-radio :label="0">否</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-form-item label="支持分期：" prop="isHirePurchase">
		                    <el-radio-group v-model="base.isHirePurchase">
		                        <el-radio :label="1">是</el-radio>
		                        <el-radio :label="0">否</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-form-item label="支持批发：" prop="isWholesale">
		                    <el-radio-group v-model="base.isWholesale">
		                        <el-radio :label="1">是</el-radio>
		                        <el-radio :label="0">否</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-form-item label="支持上门自提：" prop="isVerify">
		                    <el-radio-group v-model="base.isVerify">
		                        <el-radio :label="1">是</el-radio>
		                        <el-radio :label="0">否</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-form-item label="物流模式：" prop="dispatchType">
		                    <el-radio-group v-model="base.dispatchType">
		                        <el-radio :label="1">线下购买</el-radio>
		                        <el-radio :label="2">普通快递</el-radio>
		                        <el-radio :label="3">不支持快递</el-radio>
		                        <el-radio :label="4">线上发货</el-radio>
		                        <el-radio :label="5">无需发货</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-form-item label="支持同城配送：" prop="isAreaDispatch">
		                    <el-radio-group v-model="base.isAreaDispatch">
		                        <el-radio :label="1">是</el-radio>
		                        <el-radio :label="0">否</el-radio>
		                    </el-radio-group>
		                </el-form-item> -->
                        <el-form-item label="运费计算类型：" prop="delimoduleType">
                            <el-radio-group v-model="base.delimoduleType">
                                <el-radio :label="1">统一邮费</el-radio>
                                <el-radio :label="2">运费模板</el-radio>
                                <el-radio :label="3">包邮-统一邮费</el-radio>
                                <el-radio :label="4">包邮-运费模板</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="base.delimoduleType == 1 || base.delimoduleType == 3" label="统一邮费：" prop="freightFee">
                            <el-input v-model="base.freightFee" placeholder="请输入邮费"></el-input>
                        </el-form-item>
                        <el-form-item v-else label="运费模板：" prop="delimoduleId">
                            <el-select v-model="base.delimoduleId" placeholder="请选择">
                                <el-option v-for="item in delimoduleOptions" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="付款模式：" prop="payway">
		                    <el-radio-group v-model="base.payway">
		                        <el-radio :label="1">线下支付</el-radio>
		                        <el-radio :label="2">线上普通交易</el-radio>
		                    </el-radio-group>
		                </el-form-item> -->
                        <!-- <el-form-item label="库存计数：" prop="countType">
		                    <el-radio-group v-model="base.countType">
		                        <el-radio :label="1">拍下减库存</el-radio>
		                        <el-radio :label="2">付款减库存</el-radio>
		                        <el-radio :label="3">永不减库存</el-radio>
		                    </el-radio-group>
		                </el-form-item> -->
                        <el-form-item label="支付截止时间：">
                            <el-input v-model="base.payDeadlineTime" @keyup.native="base.payDeadlineTime=base.payDeadlineTime.toString().replace(/[^\d]/g, '')" placeholder="请输入数值">
                                <template slot="append">分钟</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="third" class="good-info">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>商品规格</span>
                    </div>
                    <el-row class="goods-row">
                        <c-spec :up-deta="spec" @getSkuData="getSkuData" :obtain="obtain"></c-spec>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="产业联盟" name="second" class="good-info">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>产业联盟信息</span>
                    </div>
                    <el-row>
                        <el-form label-width="140px" :model="alliance" :rules="allianceRules">
                            <el-form-item label="是否支持开发票 :" prop="isInvoice">
                                <el-radio v-model="alliance.isInvoice" :label="1">是</el-radio>
                                <el-radio v-model="alliance.isInvoice" :label="0">否</el-radio>
                            </el-form-item>
                            <el-form-item label="退货时间方式 :" prop="returnDeadlineType">
                                <el-radio v-model="alliance.returnDeadlineType" :label="0">和企业一致</el-radio>
                                <el-radio v-model="alliance.returnDeadlineType" :label="1">自定义设置</el-radio>
                            </el-form-item>
                            <el-form-item label="退货时间 :" prop="returnDeadline">
                                <span v-if="!alliance.returnDeadlineType">{{info.returnDeadline | formatSecs}}</span>
                                <template v-else>
                                    <el-input v-model="alliance.returnDeadline" placeholder="格式: 天-时-分,如: 3-5 (3天5小时0分)" class="cy-input"></el-input>
                                    <span>{{dateDay}}</span>
                                </template>
                            </el-form-item>
                            <el-form-item label="税率方式 :" prop="taxRateType">
                                <el-radio v-model="alliance.taxRateType" :label="0">和企业一致</el-radio>
                                <el-radio v-model="alliance.taxRateType" :label="1">自定义设置</el-radio>
                            </el-form-item>
                            <el-form-item label="税率 :" prop="taxRate">
                                <span v-if="!alliance.taxRateType">{{info.taxRate}}</span>
                                <el-input v-else v-model="alliance.taxRate" placeholder="税费比例，0-1之间,如：0.05" class="cy-input"></el-input>
                            </el-form-item>
                            <el-form-item label="服务费率方式 :" prop="serviceRateType">
                                <el-radio v-model="alliance.serviceRateType" :label="0">和企业一致</el-radio>
                                <el-radio v-model="alliance.serviceRateType" :label="1">自定义设置</el-radio>
                            </el-form-item>
                            <el-form-item label="服务费率 :" prop="serviceRate">
                                <span v-if="!alliance.serviceRateType">{{info.serviceRate}}</span>
                                <el-input v-else v-model="alliance.serviceRate" placeholder="服务费率比例，0-1之间,如：0.05" class="cy-input"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="fourth">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>商品参数</span>
                    </div>
                    <el-row class="goods-row long-span">
                        <el-form style="max-width: 800px;">
                            <el-form-item v-for="(item, index) in goodsParam" :key="index">
                                <el-col :span="8">
                                    <el-input v-model="item.name" placeholder="参数名"></el-input>
                                </el-col>
                                <el-col :span="2" class="font-center">-</el-col>
                                <el-col :span="14" class="goods-param">
                                    <el-badge value="×" class="item goods-badge" @click.native="delGoodsParamItem(index)">
                                    </el-badge>
                                    <el-input v-model="item.value[0]" placeholder="参数值"></el-input>
                                </el-col>
                            </el-form-item>
                            <div class="add-goods-param" @click="addGoodsParamItem">
                                <i class="el-icon-circle-plus-outline"></i>
                                添加参数
                            </div>
                        </el-form>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="five">
                <el-card class="goods-card">
                    <c-ueditor ref="editor" v-model="info.detail"></c-ueditor>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <div class="shop-footer">
            <el-button type="primary" size="small" class="footer-btn" @click="correcting">保存信息</el-button>
        </div>
        <el-dialog title="编辑" :visible.sync="infoVisible" width="500px">
            <el-form>
                <el-form-item label="请选择审核通过后的操作">
                    <el-col :offset="2">
                        <el-radio v-model="alliance.opType" :label="2">审核通过后立即上架</el-radio>
                    </el-col>
                    <el-col :offset="2">
                        <el-radio v-model="alliance.opType" :label="3">审核通过后需手动上架</el-radio>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="infoVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGoodsInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import cArea from '@/components/base/cArea'
import cGoodsClass from '@/components/base/cGoodsClass'
import cSpec from '@/components/base/cSpec'
import {
  validatePositiveIntegerZero,
  validateMoney
} from '@/assets/js/elValidate'
import cUeditor from '@/components/base/cUeditor'
export default {
  data() {
    var _this = this
    var validateReturnDeadline = (rule, value, callback) => {
      if (_this.alliance.returnDeadlineType) {
        if (value === '') {
          callback(new Error('请输入退货时间'))
        } else {
          let re = /^(\d+)((-(20|21|22|23|[0-1]\d|\d))|(-(20|21|22|23|[0-1]\d|\d)-([0-5][0-9]|\d)))?$/
          if (re.test(value)) {
            callback()
          } else {
            callback(new Error('格式有误，请输入正确的格式 000-23-59'))
          }
        }
      } else {
        callback()
      }
    }
    var validateTaxRate = (rule, value, callback) => {
      if (_this.alliance.taxRateType) {
        if (value === '') {
          callback(new Error('请输入税率'))
        } else {
          if (0 < +value && +value < 1) {
            callback()
          } else {
            callback(new Error('格式有误，请输入0-1之间,如：0.05'))
          }
        }
      } else {
        callback()
      }
    }
    var validateServiceRate = (rule, value, callback) => {
      if (_this.alliance.serviceRateType) {
        if (value === '') {
          callback(new Error('请输入服务费率'))
        } else {
          if (0 < +value && +value < 1) {
            callback()
          } else {
            callback(new Error('格式有误，请输入0-1之间,如：0.05'))
          }
        }
      } else {
        callback()
      }
    }
    return {
      gid: '',
      activeName: 'first',
      info: {
        cateList: [],
        logo: [],
        list: [],
        detail: '',
        displayOrder: 0,
        goodsName: '',
        shortName: '',
        englishName: '',
        keyword: '',
        cateIds: [],
        brandId: '',
        originAreaParentIds: [],
        salesNum: 0,
        showSale: 1,
        isCod: 1,
        isHirePurchase: 1,
        isWholesale: 1,
        isVerify: 1,
        dispatchType: 1,
        isAreaDispatch: 1,
        delimoduleType: 1,
        countType: 1,
        payDeadlineTime: 180,
        logoImgId: '',
        thumbImgIds: [],
        statusType: 0,
        soldoutTime: '',
        payway: 2,
        unit: '',
        groupIds: [],
        freightFee: '0',
        delimoduleId: ''
      },
      sortVisible: false,
      sort: '',
      brandVisible: false,
      brand: {
        brand: '',
        type: ''
      },
      baseVisible: false,
      base: {
        displayOrder: 0,
        goodsName: '',
        shortName: '',
        englishName: '',
        keyword: '',
        cateIds: [],
        brandId: '',
        originAreaParentIds: [],
        salesNum: '0',
        showSale: 1,
        isCod: 1,
        isHirePurchase: 1,
        isWholesale: 1,
        isVerify: 1,
        dispatchType: 1,
        isAreaDispatch: 1,
        delimoduleType: 1,
        countType: 1,
        payDeadlineTime: 30,
        logoImgId: '',
        thumbImgIds: [],
        statusType: 0,
        soldoutTime: '',
        payway: 2,
        unit: '',
        groupIds: [],
        freightFee: '0',
        delimoduleId: ''
      },
      baseRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        cateIds: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        groupIds: [
          { required: true, message: '请选择商品组', trigger: 'change' }
        ],
        brandId: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
        logoImgId: [
          { required: true, message: '请上传logo', trigger: 'change' }
        ],
        salesNum: [
          {
            required: true,
            validator: validatePositiveIntegerZero,
            trigger: 'blur'
          }
        ],
        showSale: [
          { required: true, message: '请选择是否显示销量', trigger: 'change' }
        ],
        isCod: [
          {
            required: true,
            message: '请选择是否支持货到付款',
            trigger: 'change'
          }
        ],
        isHirePurchase: [
          { required: true, message: '请选择是否支持分期', trigger: 'change' }
        ],
        isWholesale: [
          { required: true, message: '请选择是否支持批发', trigger: 'change' }
        ],
        isVerify: [
          {
            required: true,
            message: '请选择是否支持上门自提',
            trigger: 'change'
          }
        ],
        dispatchType: [
          { required: true, message: '请选择物流模式', trigger: 'change' }
        ],
        isAreaDispatch: [
          {
            required: true,
            message: '请选择是否支持同城配送',
            trigger: 'change'
          }
        ],
        delimoduleType: [
          { required: true, message: '请选择运费计算类型', trigger: 'change' }
        ],
        countType: [
          { required: true, message: '请选择库存计数', trigger: 'change' }
        ],
        payway: [
          { required: true, message: '请选择付款模式', trigger: 'change' }
        ],
        freightFee: [
          { required: true, validator: validateMoney, trigger: 'blur' }
        ],
        delimoduleId: [
          { required: true, message: '请选择运费模板', trigger: 'change' }
        ]
      },
      imageUrl: '',
      goodsParam: [],
      initCateIds: true,
      initArea: true,
      groupOptions: [],
      loading: false,
      alliance: {
        isInvoice: 0,
        returnDeadlineType: 0,
        returnDeadline: '',
        taxRateType: 0,
        taxRate: '',
        serviceRateType: 0,
        serviceRate: '',
        opType: 2
      },
      allianceRules: {
        isInvoice: [
          { required: true, message: '请选择是否支持开发票', trigger: 'change' }
        ],
        returnDeadlineType: [
          { required: true, message: '请选择退货时间方式', trigger: 'change' }
        ],
        taxRateType: [
          { required: true, message: '请选择税率方式', trigger: 'change' }
        ],
        serviceRateType: [
          { required: true, message: '请选择服务费率方式', trigger: 'change' }
        ],
        returnDeadline: [
          { required: true, validator: validateReturnDeadline, trigger: 'blur' }
        ],
        taxRate: [
          { required: true, validator: validateTaxRate, trigger: 'blur' }
        ],
        serviceRate: [
          { required: true, validator: validateServiceRate, trigger: 'blur' }
        ]
      },
      spec: {
        skuAttribute: [],
        skuList: []
      },
      tips: true,
      imgSign: [],
      obtain: false,
      skuData: {},

      cateIds: [],
      brandId: '',
      optionsBrand: [],
      optionsCate: [],
      loading: false,
      tempDeadline: '',
      tempTaxRate: '',
      tempServiceRate: '',
      commonSetting: {},
      props: {
        label: 'name',
        value: 'categoryId'
      },
      pickerSoldout: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000
        }
      },
      pickerOpenSoldout: {
        disabledDate(time) {
          return time.getTime() < _this.base.putawayTime
        }
      },
      infoVisible: false
    }
  },
  computed: {
    dateDay() {
      let vm = this
      if (!vm.alliance.returnDeadline) return ''
      let re = /^(\d+)((-(20|21|22|23|[0-1]\d|\d))|(-(20|21|22|23|[0-1]\d|\d)-([0-5][0-9]|\d)))?$/
      if (re.test(vm.alliance.returnDeadline)) {
        let temp = (vm.alliance.returnDeadline + '').split('-')
        return `时间为: ${temp[0]} 天 ${temp[1] || 0} 时 ${temp[2] || 0} 分`
      } else {
        return '格式有误，请输入正确的格式 000-23-59'
      }
    }
  },
  components: {
    cUeditor,
    cArea,
    cGoodsClass,
    cSpec
  },
  methods: {
    getGoodsDetail(id) {
      let vm = this
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        goodsId: id
      }
      vm.$get(vm.$api.shop.getGoodsInfoById, param).then(resp => {
        // vm.info = resp
        vm.openBaseVisible()
        vm.goodsParam = resp.attribute.map(obj => {
          return {
            name: obj.attributeName,
            value: [obj.attributeValue]
          }
        })
        vm.alliance = {
          isInvoice: resp.isInvoice,
          returnDeadlineType: resp.returnDeadlineType,
          returnDeadline: vm.formatDead(resp.returnDeadline),
          taxRateType: resp.taxRateType,
          taxRate: resp.taxRate,
          serviceRateType: resp.serviceRateType,
          serviceRate: resp.serviceRate,
          opType: 1
        }
        vm.spec = {
          skuAttribute: resp.skuAttribute,
          skuList: resp.skuList
        }
      })
    },
    formatDead(value) {
      if (!value || value < 1) return ''
      let D = Math.floor(value / 3600 / 24)
      let h = Math.floor(value / 3600) % 24
      let m = Math.floor(value / 60) % 60
      let t = D
      if (h || m) {
        t = t + '-' + h
      }
      if (m) {
        t = t + '-' + m
      }
      return t
    },
    openBaseVisible() {
      let vm = this
      // vm.getGoodsBrand()
      vm.base = {
        displayOrder: vm.info.displayOrder,
        goodsName: vm.info.goodsName,
        shortName: vm.info.shortName,
        englishName: vm.info.englishName,
        keyword: vm.info.keyword,
        cateIds: vm.info.cateInfo
          ? vm.info.cateInfo.map(obj => obj.cateId)
          : [],
        brandId: vm.info.brandId,
        originAreaParentIds: vm.info.originAreaInfo
          ? vm.info.originAreaInfo.map(obj => obj.areaId)
          : [],
        salesNum: vm.info.salesNum,
        showSale: vm.info.showSale,
        isCod: vm.info.isCod,
        isHirePurchase: vm.info.isHirePurchase,
        isWholesale: vm.info.isWholesale,
        isVerify: vm.info.isVerify,
        dispatchType: vm.info.dispatchType,
        isAreaDispatch: vm.info.isAreaDispatch,
        delimoduleType: vm.info.delimoduleType,
        countType: vm.info.countType,
        payDeadlineTime: vm.info.payDeadlineTime / 60,
        logoImgId: '',
        thumbImgIds: [],
        payway: vm.info.payway,
        unit: vm.info.unit,
        statusType: 0,
        groupIds: vm.info.goodsGroup
          ? vm.info.goodsGroup.map(obj => obj.groupId)
          : [],
        freightFee: vm.info.freightFee,
        delimoduleId: vm.info.delimoduleId
      }
      vm.initCateIds = vm.base.cateIds
      vm.initArea = vm.base.originAreaParentIds
      if (vm.info.goodsGroup && vm.info.goodsGroup.length > 0) {
        if (vm.groupOptions && vm.groupOptions.length > 0) {
          let groupOptionsSrc = JSON.stringify(vm.groupOptions)
          vm.groupOptions = vm.info.goodsGroup
          vm.$nextTick(() => {
            // 进入缓存，重新渲染''值
            vm.groupOptions = JSON.parse(groupOptionsSrc)
          })
        } else {
          vm.groupOptions = vm.info.goodsGroup
        }
      }
      try {
        vm.imageUrl = vm.info.logo.original || ''
        vm.base.logoImgId = vm.info.logo.imageId || ''
        for (let item of vm.info.thumb) {
          vm.base.thumbImgIds.push({
            name: item.imageId,
            url: item.original
          })
        }
      } catch (error) {}
    },
    imgRequest(obj) {
      // 图片上传
      let vm = this
      let temp = {
        file: obj.file,
        type: 'goods',
        name: 'logo-upload'
      }
      this.$post(vm.$api.share.upImage, temp).then(resp => {
        vm.imageUrl = URL.createObjectURL(obj.file)
        vm.base.logoImgId = resp.fileId
      })
    },
    imgRequestArr(obj) {
      // 图册上传
      let vm = this
      let temp = {
        file: obj.file,
        type: 'goods',
        name: 'more-upload'
      }
      this.$post(vm.$api.share.upImage, temp)
        .then(resp => {
          let item = {
            name: resp.fileId,
            url: resp.fileUrl
          }
          vm.base.thumbImgIds.push(item)
        })
        .catch(err => {
          vm.base.thumbImgIds = JSON.parse(JSON.stringify(vm.base.thumbImgIds)) // 上传失败时清除本地的图片缓存
        })
    },
    onRemove(file, fileList) {
      let vm = this
      let name = file.name
      for (let i in vm.base.thumbImgIds) {
        if (vm.base.thumbImgIds[i].name === name) {
          vm.base.thumbImgIds.splice(i, 1)
          return
        }
      }
    },
    beforeUpload(file) {
      // 基于elementUi图片上传拦截过滤器
      const isIMG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isIMG) {
        this.$message.error('上传图片只能jpg、jpeg、gif、png')
      }
      if (!isLt10M) {
        this.$message.error('上传图片不能大小超过10M！')
      }
      return isIMG && isLt10M
    },
    getGoodsBrand(query) {
      let vm = this
      vm.loading = true
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        keyword: query,
        type: 1,
        curPage: 1,
        pageSize: 100,
        loading: true
      }
      vm
        .$get(vm.$api.pos.getGoodsBrand, param)
        .then(resp => {
          vm.optionsBrand = resp.list
          vm.loading = false
        })
        .catch(() => {
          vm.loading = false
        })
    },
    delGoodsParamItem(index) {
      this.goodsParam.splice(index, 1)
    },
    addGoodsParamItem() {
      this.goodsParam.push({
        name: '',
        value: ['']
      })
    },
    editGoodsParamsInfoById() {
      let vm = this
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        goodsId: vm.gid,
        params: JSON.stringify(
          vm.goodsParam.map((obj, index) => {
            obj.displayOrder = index
            return obj
          })
        )
      }
      vm.$post(vm.$api.shop.editGoodsParamsInfoById, param).then(resp => {
        vm.getGoodsDetail(vm.gid)
        vm.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    changePutawayTime() {
      let vm = this
      if (vm.base.soldoutTime && vm.base.putawayTime > vm.base.soldoutTime) {
        vm.base.soldoutTime = ''
      }
    },
    getGroupList(query) {
      let vm = this
      vm.loading = true
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        curPage: 1,
        pageSize: 100,
        enabled: -1,
        keyword: query
      }
      vm.$get(vm.$api.shop.getGroupList, param).then(resp => {
        vm.groupOptions = resp ? resp.list : []
        vm.loading = false
      })
    },
    getSkuData(val) {
      this.skuData = val
    },
    addGoodsInfo() {
      let vm = this
      let editor = vm.$refs.editor.getUEContent()
      let param = Object.assign({}, vm.base, vm.alliance, vm.skuData, {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        goodsId: vm.gid,
        params: JSON.stringify(
          vm.goodsParam.map((obj, index) => {
            // 商品参数
            obj.displayOrder = index
            return obj
          })
        ),
        detail: editor.contnet, // 商品详情
        detailImgIds: editor.imgId
      })
      // 基本信息
      param.payDeadlineTime = param.payDeadlineTime * 60
      param.cateId = param.cateIds[param.cateIds.length - 1]
      param.cateIds = param.cateIds.join(',')
      param.originAreaParentIds = param.originAreaParentIds.join(',')
      param.thumbImgIds = param.thumbImgIds
        .map(obj => {
          return obj.name
        })
        .join(',')
      param.groupIds = param.groupIds.join(',')
      param.soldoutTime = param.soldoutTime / 1000
      param.openSoldoutTime = param.soldoutTime ? 1 : 0
      param.putawayTime = param.putawayTime / 1000
      // 产业联盟
      if (param.returnDeadline) {
        let temp = param.returnDeadline.toString().split('-')
        temp[0] = temp[0] || 0
        temp[1] = temp[1] || 0
        temp[2] = temp[2] || 0
        param.returnDeadline =
          temp[0] * 3600 * 24 + temp[1] * 3600 + temp[2] * 60
      }
      vm.$post(vm.$api.shop.addGoodsInfo, param).then(resp => {
        vm.$message({
          message: '保存成功',
          type: 'success'
        })
        vm.$router.go(-1)
      })
    },
    specValidate() {
      let vm = this
      vm.obtain = !vm.obtain // 控制子组件，令返回this.skuData数据
      vm.$nextTick(function() {
        // 等待 dom 节点完成改变
        if (!vm.skuData) {
          vm.activeName = 'third'
          if (vm.skuData === 0) {
            this.$confirm('该商品存在规格的售价设置为0，是否免费?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                vm.infoVisible = true
              })
              .catch(() => {
                vm.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
          } else {
            return
          }
        } else {
          vm.infoVisible = true
        }
      })
    },
    correcting() {
      let vm = this
      vm.$refs['baseForm'].validate(valid => {
        if (valid) {
          vm.specValidate()
        } else {
          vm.activeName = 'first'
          vm.$message({
            message: '请完善基本信息',
            type: 'info'
          })
          return false
        }
      })
    },
    getCommonSetting() {
      let vm = this
      let param = {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']]
      }
      vm.$get(vm.$api.setting.getCommonSetting, param).then(resp => {
        vm.info.returnDeadline = resp.returnDeadline
        vm.info.taxRate = resp.taxRate
        vm.info.serviceRate = resp.serviceRate
        vm.alliance.returnDeadline = vm.formatDead(resp.returnDeadline)
        vm.alliance.taxRate = resp.taxRate
        vm.alliance.serviceRate = resp.serviceRate
      })
    },
    // 获取运费模板列表 
    getTemplateList() {
      let vm = this
      let param = Object.assign({}, vm.search, {
          accountId: localStorage['userId' + sessionStorage['roleTypeId']],
          curPage: 1,
          pageSize: 1000,
          status: 1
      })
      vm.$get(vm.$api.freight.getTemplateList, param).then(resp => {
          vm.delimoduleOptions = resp.list
      })
    },
  },
  created() {
    let vm = this
    vm.getGroupList()
    vm.getTemplateList()
    vm.getCommonSetting()
    vm.getGoodsBrand()
  },
  mounted() {
    let vm = this
    if (vm.$route.params && JSON.stringify(vm.$route.params) != '{}') {
      vm.info = Object.assign({}, vm.info, vm.$route.params)
      console.log(vm.info)
      vm.openBaseVisible()
      vm.goodsParam = vm.info.attribute.map(obj => {
        return {
          name: obj.attributeName,
          value: [obj.attributeValue]
        }
      })
      vm.spec = {
        skuAttribute: vm.info.skuAttribute,
        skuList: vm.info.skuList
      }
    } else {
      vm.initArea = [] // 为了加载区域数据
    }
  }
}
</script>

<style lang="less">
.shop-goods-detail {
  font-size: 18px;
  .goods-card {
    margin: 20px;
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0;
  }
  .shop-back {
    background-color: rgba(75, 116, 255, 0.3);
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding: 0 30px;
    color: #4b74ff;
    .error {
      margin-top: 6px;
      float: right;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .font-center {
    text-align: center;
  }
  .goods-param {
    position: relative;
    .goods-badge {
      position: absolute;
      right: -10px;
      top: -16px;
      z-index: 100;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .add-goods-param {
    color: #ccc;
    height: 40px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .cy-input {
    max-width: 350px;
  }
  .el-tabs__nav-scroll {
    background-color: #fff;
    padding: 0 30px;
  }
  .text-but {
    padding-left: 50px;
  }
  .img_flex {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .image-div {
      width: 100px;
      height: 50px;
      background-color: #f5f6fa;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      .image {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    background-color: #f5f6fa;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    line-height: 100px;
    vertical-align: top;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
  .flex-center {
    text-align: center;
    padding-bottom: 30px;
  }
  .shop-footer {
    height: 60px;
    width: 100%;
    z-index: 2019;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    box-shadow: 0px -2px 10px 0px rgba(115, 134, 173, 0.2);
    .footer-btn {
      float: right;
      margin: 14px 30px 0 0;
    }
  }
}
</style>
