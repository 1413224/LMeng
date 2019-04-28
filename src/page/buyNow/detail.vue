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
		                    <el-upload
		                        id="logo-upload"
		                        class="avatar-uploader"
		                        action=""
		                        :show-file-list="false"
		                        :before-upload="beforeUpload"
		                        :http-request="imgRequest">
		                        <div v-if="imageUrl" class="avatar">
		                            <img :src="imageUrl" class="image">
		                        </div>
		                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		                    </el-upload>
		                </el-form-item>
		                <el-form-item label="商品图册：">
		                    <div class="flex-start">
		                        <el-upload
		                            list-type="picture-card"
		                            action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
		                            :before-upload="beforeUpload"
		                            :http-request="imgRequestArr"
		                            :on-remove="onRemove"
		                            :file-list="base.thumbImgIds">
		                            <i class="el-icon-plus"></i>
		                        </el-upload>
		                    </div>
		                </el-form-item>
		                <el-form-item label="联盟商品分类：" prop="cateIds">
                            <c-goods-class v-model="base.cateIds" :initval="initCateIds"></c-goods-class>
                        </el-form-item>
                        <el-form-item label="商家商品分类：" prop="allianceGoodsCateIds">
                            <c-buy-class v-model="base.allianceGoodsCateIds" :initval="initAllianceGoodsCateIds"></c-buy-class>
                        </el-form-item>
		                <el-form-item label="商品品牌：" prop="brandId">
		                    <el-select
		                        v-model="base.brandId"
		                        filterable
		                        remote
		                        clearable
		                        reserve-keyword
		                        placeholder="请输入关键词并选择"
		                        :remote-method="getGoodsBrand"
		                        :loading="loading"
		                        style="width: 100%;">
		                            <el-option
		                                v-for="item in optionsBrand"
		                                :key="item.brandId"
		                                :label="item.name"
		                                :value="item.brandId">
		                            </el-option>
		                    </el-select>
		                </el-form-item>
		                <el-form-item label="商品单位：">
		                    <el-input v-model="base.unit" placeholder="请输入商品单位"></el-input>
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
                            <el-form-item label="税率方式 :" prop="taxRateType">
                                <el-radio v-model="alliance.taxRateType" :label="0">和企业一致</el-radio>
                                <el-radio v-model="alliance.taxRateType" :label="1">自定义设置</el-radio>
                            </el-form-item>
                            <el-form-item label="税率 :" prop="taxRate">
                                <span v-if="!alliance.taxRateType">{{Common.taxRate}}</span>
                                <el-input v-else v-model="alliance.taxRate" placeholder="税费比例，0-1之间,如：0.05" class="cy-input"></el-input>
                            </el-form-item>
                            <el-form-item label="服务费率方式 :" prop="serviceRateType">
                                <el-radio v-model="alliance.serviceRateType" :label="0">和企业一致</el-radio>
                                <el-radio v-model="alliance.serviceRateType" :label="1">自定义设置</el-radio>
                            </el-form-item>
                            <el-form-item label="服务费率 :" prop="serviceRate">
                                <span v-if="!alliance.serviceRateType">{{Common.serviceRate}}</span>
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
                    <c-ueditor ref="editor"></c-ueditor>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <div class="shop-footer">
            <el-button v-if="info.checkStatus === 0 || info.checkStatus === 2" type="warning" size="small" class="footer-btn" @click="goAuditing(gid)" v-has="'shop-auditing-contrast'">查看审核信息</el-button>
            <el-button v-else type="primary" size="small" class="footer-btn" @click="correcting">保存信息</el-button>
        </div>
        <el-dialog
            title="编辑"
            :visible.sync="infoVisible"
            width="700px">
            <el-form v-if="allianceVisible" :model="alliance" ref="dateForm">
                <el-form-item label="本次修改内容需要进行审核，请选择审核期间和审核通过的操作">
                    <template v-if="info.status == 1">
                        <el-col :offset="2">
                            <el-radio v-model="alliance.opType" :label="1">继续销售，审核通过后自动变更为新的设置</el-radio>
                        </el-col>
                        <el-col :offset="2">
                            <el-radio v-model="alliance.opType" :label="2">审核期间下架该商品，审核通过后立即上架</el-radio>
                        </el-col>
                        <el-col :offset="2">
                            <el-radio v-model="alliance.opType" :label="3">审核期间下架该商品，审核通过后需手动上架</el-radio>
                        </el-col>
                    </template>
                    <template v-else>
                        <el-col :offset="2">
                        <el-radio v-model="alliance.opType" :label="2">审核通过后立即上架</el-radio>
                        </el-col>
                        <el-col :offset="2">
                            <el-radio v-model="alliance.opType" :label="3">审核通过后需手动上架</el-radio>
                        </el-col>
                    </template>
                </el-form-item>
            </el-form>
            <el-form v-else :model="base" :rules="baseRules" ref="dateForm" label-width="140px">
                <template v-if="info.status == 1">
                    <el-form-item label="上架时间：">
                        <span>{{info.putawayTime | formatDate}}</span>
                        <span v-if="info.soldoutTime"> 至 {{info.soldoutTime | formatDate}}</span>
                    </el-form-item>
                    <el-form-item label="下架选择：" prop="statusType">
                        <el-radio-group v-model="base.statusType">
                            <el-radio :label="0">继续售卖</el-radio>
                            <el-radio :label="1">暂不售卖，放入仓库</el-radio>
                            <el-radio :label="2">自定义下架时间</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="base.statusType == 2" label="下架时间：" prop="soldoutTime">
                        <el-date-picker
                            v-model="base.soldoutTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="timestamp"
                            :picker-options="pickerSoldout">
                        </el-date-picker>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="原定上架时间：">
                        <span v-if="info.putawayTime">{{info.putawayTime | formatDate}}</span>
                        <span v-if="info.soldoutTime"> 至 {{info.soldoutTime | formatDate}}</span>
                    </el-form-item>
                    <el-form-item label="上架选择：" prop="statusType">
                        <el-radio-group v-model="base.statusType">
                            <el-radio :label="0">暂不售卖</el-radio>
                            <el-radio :label="1">立即上架</el-radio>
                            <el-radio :label="2">自定义上下架时间</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="base.statusType == 2" label="上架时间：" prop="putawayTime">
                        <el-date-picker
                            v-model="base.putawayTime"
                            type="datetime"
                            @change="changePutawayTime"
                            placeholder="选择日期时间"
                            value-format="timestamp"
                            :picker-options="pickerSoldout">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="base.statusType == 2" label="下架时间：">
                        <el-date-picker
                            v-model="base.soldoutTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="timestamp"
                            :picker-options="pickerOpenSoldout"
                            :disabled="!base.putawayTime">
                        </el-date-picker>
                        <span>非必填，不填时表示不设置自动下架</span>
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="infoVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGoodsInfoById">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import cGoodsClass from '@/components/base/cGoodsClass'
import cBuyClass from '@/components/base/cBuyClass'
import cSpec from '@/components/base/cSpec'
import {validatePositiveIntegerZero, validateMoney} from '@/assets/js/elValidate'
// import UeditorConfig from '../custom/components/ueditor/config'
import cUeditor from '@/components/base/cUeditor'

export default {
    data () {
        var _this = this;
        var validateTaxRate = (rule, value, callback) => {
            if (_this.alliance.taxRateType) {
                if (value === '') {
                    callback(new Error('请输入税率'))
                } else {
                    if(0 < (+value) && (+value) < 1) {
                        callback()
                    } else {
                        callback(new Error('格式有误，请输入0-1之间,如：0.05'))
                    }
                }
            } else {
                callback()
            }
        };
        var validateServiceRate = (rule, value, callback) => {
            if (_this.alliance.serviceRateType) {
                if (value === '') {
                    callback(new Error('请输入服务费率'))
                } else {
                    if(0 < (+value) && (+value) < 1) {
                        callback()
                    } else {
                        callback(new Error('格式有误，请输入0-1之间,如：0.05'))
                    }
                }
            } else {
                callback()
            }
        };
        return {
            gid: '',
            activeName: 'first',
            info: {
                cateList: [],
                logo: [],
                list: [],
                detail: ''
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
                allianceGoodsCateIds: [],
                brandId: '',
                salesNum: '',
                showSale: '',
                isCod: '',
                isHirePurchase: '',
                isWholesale: '',
                isVerify: '',
                dispatchType: '',
                isAreaDispatch: '',
                delimoduleType: '',
                countType: '',
                payDeadlineTime: '',
                logoImgId: '',
                thumbImgIds: [],
                statusType: '',
                soldoutTime: '',
                payway: '',
                unit: '',
                groupIds: [],
                freightFee: '',
                delimoduleId: ''
            },
            baseRules: {
                goodsName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                cateIds: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
                allianceGoodsCateIds: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
                groupIds: [{ required: true, message: '请选择商品组', trigger: 'change' }],
                brandId: [{ required: true, message: '请选择商品品牌', trigger: 'change' }],
                logoImgId: [{ required: true, message: '请上传logo', trigger: 'change' }],
                salesNum: [{ required: true, validator: validatePositiveIntegerZero, trigger: 'blur' }],
                showSale: [{ required: true, message: '请选择是否显示销量', trigger: 'change' }],
                isCod: [{ required: true, message: '请选择是否支持货到付款', trigger: 'change' }],
                isHirePurchase: [{ required: true, message: '请选择是否支持分期', trigger: 'change' }],
                isWholesale: [{ required: true, message: '请选择是否支持批发', trigger: 'change' }],
                isVerify: [{ required: true, message: '请选择是否支持上门自提', trigger: 'change' }],
                dispatchType: [{ required: true, message: '请选择物流模式', trigger: 'change' }],
                isAreaDispatch: [{ required: true, message: '请选择是否支持同城配送', trigger: 'change' }],
                delimoduleType: [{ required: true, message: '请选择运费计算类型', trigger: 'change' }],
                countType: [{ required: true, message: '请选择库存计数', trigger: 'change' }],
                payway: [{ required: true, message: '请选择付款模式', trigger: 'change' }],
                freightFee: [{ required: true, validator: validateMoney, trigger: 'blur' }],
                delimoduleId: [{ required: true, message: '请选择运费模板', trigger: 'change' }],
                soldoutTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
                putawayTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
            },
            imageUrl: '',
            goodsParam: [],
            initCateIds: true,
            initAllianceGoodsCateIds: true,
            groupOptions: [],
            loading: false,
            alliance: {
                isInvoice: 0,
                taxRateType: 0,
                taxRate: '',
                serviceRateType: 0,
                serviceRate: '',
                opType: 1
            },
            allianceRules: {
                isInvoice: [{ required: true, message: '请选择是否支持开发票', trigger: 'change' }],
                taxRateType: [{ required: true, message: '请选择税率方式', trigger: 'change' }],
                serviceRateType: [{ required: true, message: '请选择服务费率方式', trigger: 'change' }],
                taxRate: [{ required: true, validator: validateTaxRate, trigger: 'blur' }],
                serviceRate: [{ required: true, validator: validateServiceRate, trigger: 'blur' }],
            },
            allianceVisible: false,
            infoVisible: false,
            spec: {
                skuAttribute: [],
                skuList: []
            },
            tips: true,
            // imgSign: [],
            obtain: false,
            skuData: {},
            delimoduleOptions: [],
            cateIds: [],
            allianceGoodsCateIds: [],
            brandId: '',
            optionsBrand: [],
            optionsCate: [],
            loading: false,
            tempDeadline: '',
            tempTaxRate: '',
            tempServiceRate: '',
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
            Common: {}
        }
    },
    components: {
        cUeditor,
        cGoodsClass,
        cSpec,
        cBuyClass
    },
    methods: {
        getGoodsDetail (id) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				goodsId: id,
			}
			vm.$get(vm.$api.buy.getGoodsInfoById, param).then(resp => {
                vm.info = resp
                vm.$refs.editor.setUEContent(resp.detail)
                vm.getCommonSetting()
                vm.openBaseVisible()
                vm.goodsParam = resp.attribute.map(obj => {
                    return {
                        name: obj.attributeName,
                        value: [obj.attributeValue]
                    }
                })
                vm.alliance = {
                    isInvoice: resp.isInvoice,
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
        formatDead (value) {
            if (!value || value < 1) return ''
            let D = Math.floor(value/3600/24)
            let h = Math.floor(value/3600) % 24
            let m = Math.floor(value/60) % 60
            let t = D
            if (h || m) {
                t = t + '-' + h
            }
            if (m) {
                t = t + '-' + m
            }
            return t
        },
        openBaseVisible () {
            let vm = this
            vm.getGoodsBrand()
            vm.base = {
                displayOrder: vm.info.displayOrder,
                goodsName: vm.info.goodsName,
                shortName: vm.info.shortName,
                englishName: vm.info.englishName,
                keyword: vm.info.keyword,
                cateIds: vm.info.cateInfo ? vm.info.cateInfo.map(obj => obj.cateId) : [],
                allianceGoodsCateIds: vm.info.cateInfo ? vm.info.allianceGoodsCateInfo.map(obj => obj.cateId) : [],
                brandId: vm.info.brandId,
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
                payDeadlineTime: vm.info.payDeadlineTime/60,
                logoImgId: '',
                thumbImgIds: [],
                payway: vm.info.payway,
                unit: vm.info.unit,
                statusType: 0,
                groupIds: vm.info.goodsGroup ? vm.info.goodsGroup.map(obj => obj.groupId) : [],
                freightFee: vm.info.freightFee || '0',
                delimoduleId: vm.info.delimoduleId
            }
            vm.initCateIds = vm.base.cateIds
            vm.initAllianceGoodsCateIds = vm.base.allianceGoodsCateIds
            if (vm.info.goodsGroup&&vm.info.goodsGroup.length>0) {
                if (vm.groupOptions&&vm.groupOptions.length>0) {
                    let groupOptionsSrc = JSON.stringify(vm.groupOptions)
                    vm.groupOptions = vm.info.goodsGroup
                    vm.$nextTick(() => { // 进入缓存，重新渲染''值
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
            } catch (error) {
            }
        },
        imgRequest (obj) { // 图片上传
            let vm = this
            let temp = {
                file: obj.file,
                type: 'goods',
                name: 'logo-upload'
            }
            console.log(2, new Date())
            this.$post(vm.$api.share.upImage, temp).then(resp => {
                vm.imageUrl = URL.createObjectURL(obj.file)
                vm.base.logoImgId = resp.fileId
                console.log(3, new Date())
            })
        },
        imgRequestArr (obj) { // 图册上传
            let vm = this
            let temp = {
                file: obj.file,
                type: 'goods',
                name: 'more-upload'
            }
            this.$post(vm.$api.share.upImage, temp).then(resp => {
                let item = {
                    name: resp.fileId,
                    url: resp.fileUrl
                }
                vm.base.thumbImgIds.push(item)
            }).catch(err => {
                vm.base.thumbImgIds = JSON.parse(JSON.stringify(vm.base.thumbImgIds)) // 上传失败时清除本地的图片缓存
            })
        },
        onRemove (file, fileList) {
            let vm = this
            let name = file.name
            for (let i in vm.base.thumbImgIds) {
                if (vm.base.thumbImgIds[i].name === name) {
                    vm.base.thumbImgIds.splice(i, 1)
                    return
                }
            }
        },
        beforeUpload (file) { // 基于elementUi图片上传拦截过滤器
            console.log(1, new Date())
            const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isIMG) {
                this.$message.error('上传图片只能jpg、jpeg、gif、png')
            }
            if (!isLt10M) {
                this.$message.error('上传图片不能大小超过10M！')
            }
            return isIMG && isLt10M
        },
        getGoodsBrand (query) {
            let vm = this
            vm.loading = true
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                keyword: query,
                type: 1,
				curPage: 1,
                pageSize: 100,
                loading: true
			}
			vm.$get(vm.$api.pos.getGoodsBrand, param).then(resp => {
                vm.optionsBrand = resp.list
                vm.loading = false
			}).catch(() => {
                vm.loading = false
            })
        },
        delGoodsParamItem (index) {
            this.goodsParam.splice(index, 1)
        },
        addGoodsParamItem () {
            this.goodsParam.push({
                name: '',
                value: ['']
            })
        },
        changePutawayTime () {
            let vm = this
            if(vm.base.soldoutTime && vm.base.putawayTime > vm.base.soldoutTime) {
                vm.base.soldoutTime = ''
            }
        },
        getSkuData (val) {
            this.skuData = val
        },
        editGoodsInfoById () {
            let vm = this
            vm.$refs['dateForm'].validate((valid) => {
                if (valid) {
                    let editor = vm.$refs.editor.getUEContent()
                    let param = Object.assign({}, vm.base, vm.alliance, vm.skuData, {
                        accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                        goodsId: vm.gid,
                        params: JSON.stringify(vm.goodsParam.map((obj, index) => { // 商品参数
                            obj.displayOrder = index
                            return obj
                        })),
                        detail: editor.contnet, // 商品详情
                        detailImgIds: editor.imgId
                    })
                    // 基本信息
                    param.payDeadlineTime = param.payDeadlineTime*60
                    param.cateId = param.cateIds[param.cateIds.length-1]
                    param.cateIds = param.cateIds.join(',')
                    param.allianceGoodsCateId = param.allianceGoodsCateIds[param.allianceGoodsCateIds.length - 1]
                    param.allianceGoodsCateIds = param.allianceGoodsCateIds.join(',')
                    param.thumbImgIds = param.thumbImgIds.map(obj => {
                        return obj.name
                    }).join(',')
                    param.groupIds = param.groupIds.join(',')
                    param.soldoutTime = param.soldoutTime/1000
                    param.openSoldoutTime = param.soldoutTime ? 1 : 0
                    param.putawayTime = param.putawayTime/1000
                    vm.$post(vm.$api.buy.editGoodsInfoById, param).then(resp => {
                        vm.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        vm.$router.go(-1)
                    })
                } else {
                    false
                }
            })
        },
        specValidate () {
            let vm = this
            vm.obtain = !vm.obtain // 控制子组件，令返回this.skuData数据
            vm.$nextTick(function () { // 等待 dom 节点完成改变
                if(!vm.skuData) {
                    vm.activeName = 'third'
                    if (vm.skuData === 0) {
                        this.$confirm('该商品存在规格的售价设置为0，是否免费?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.infoVisible = true
                        }).catch(() => {
                            vm.$message({
                                type: 'info',
                                message: '已取消'
                            });          
                        });
                    } else {
                        return
                    }
                } else {
                    vm.infoVisible = true
                }
            })
        },
        correcting () {
            let vm = this
            vm.$refs['baseForm'].validate((valid) => {
                if (valid) {
                    if (vm.alliance.isInvoice==vm.info.isInvoice&&vm.alliance.taxRateType==vm.info.taxRateType&&vm.alliance.taxRate==vm.info.taxRate&&vm.alliance.serviceRateType==vm.info.serviceRateType&&vm.alliance.serviceRate==vm.info.serviceRate) {
                        if (vm.info.status == 1) {
                            vm.alliance.opType = 1
                        } else {
                            vm.alliance.opType = 2
                        }
                        vm.allianceVisible = false
                        vm.specValidate()
                    } else {
                        vm.allianceVisible = true
                        vm.specValidate()
                    }
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
        goAuditing (id) {
            this.$router.push({ path: 'buy-now-contrast', query: { gid: id }})
        },
        getCommonSetting () {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$get(vm.$api.setting.getCommonSetting, param).then(resp => {
                vm.Common.taxRate = resp.taxRate
                vm.Common.serviceRate = resp.serviceRate
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
    created () {
        this.getTemplateList()
        this.gid = this.$route.query.gid
        if (this.gid) {
            this.getGoodsDetail(this.gid)
        } else {
            this.$message({
                type: 'error',
                message: '错误的访问'
            })
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
        background-color: rgba(75,116,255,0.3);
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        padding: 0 30px;
        color: #4B74FF;
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
            background-color: #F5F6FA;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
            .image {
                width:auto;
                height:auto;
                max-width:100%;
                max-height:100%;
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
        border-color: #409EFF;
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
        background-color: #F5F6FA;
        display: flex;
        justify-content: center;
        align-items: center;
        .image {
            width:auto;
            height:auto;
            max-width:100%;
            max-height:100%;
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
    .shop-footer{
        height: 60px; 
        width: 100%;
        z-index: 2019;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0;
        box-shadow: 0px -2px 10px 0px rgba(115,134,173,0.2);
        .footer-btn {
            float: right;
            margin: 14px 30px 0 0;
        }
    }
}
</style>
