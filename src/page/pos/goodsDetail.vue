<template>
    <div class="goods-detail">
        <div class="nub-top">
			<h2>商品详情</h2>
		</div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="good-info" label="基本信息" name="first">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>排序</span><span style="color: rgba(0, 0, 0, 0.45); width: auto; font-size: 16px; padding-left: 40px;">说明：商品排序越大越靠前</span>
                        <el-button style="float: right;" size="mini" type="primary" @click="openSortVisible">编辑</el-button>
                    </div>
                    <div class="goods-row">
                        <!-- <p style="color: rgba(0, 0, 0, 0.45);">说明：商品排序越大越靠前</p> -->
                        <p>
                            <span>商品序号:</span>
                            {{info.displayOrder}}
                        </p>
                    </div>
                </el-card>
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <el-row class="goods-row">
                        <el-col :span="8"><span>商品名称:</span>{{info.goodsName}}</el-col>
                        <el-col :span="8"><span>标准商品:</span>{{info.isStdGoods ? '标准库商品' : '非标准库商品'}}</el-col>
                        <el-col :span="8"><span>国家条形码:</span>{{info.barcode}}</el-col>
                        <el-col :span="8"><span>商品单位:</span>{{info.unit}}</el-col>
                        <el-col :span="8"><span>商品简称:</span>{{info.shortName}}</el-col>
                        <el-col :span="8"><span>商品价格:</span>{{info.minPrice == info.maxPrice ? info.minPrice : info.minPrice + ' - ' + info.maxPrice}}</el-col>
                        <el-col :span="8"><span>创建时间:</span>{{info.createTime | formatSecs}}</el-col>
                        <el-col :span="8"><span>销量:</span>{{info.salesRealNum}}</el-col>
                        <el-col :span="8"><span>累计关注量:</span>{{info.concern}}</el-col>
                    </el-row>
                </el-card>
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>商品信息</span>
                        <el-button v-if="!info.isStdGoods" style="float: right;" size="mini" type="primary" @click="openBrandVisible">编辑</el-button>
                    </div>
                    <el-row class="goods-row">
                        <el-col :span="8">
                            <span>商品品牌:</span>{{info.brandName}}
                        </el-col>
                        <el-col :span="16">
                            <span>商品分类:</span>
                            <template v-for="item in info.cateList">
                            	<!--{{index != 0 ? '/' : ''}}-->
                                 {{item.cateName}} 
                            </template>
                            <!-- {{info.cateList.cateName || ''}} -->
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>商品图片</span>
                        <el-button style="float: right;" size="mini" type="primary" @click="openImageVisible">编辑</el-button>
                    </div>
                    <div class="goods-row">
                        <div class="img_flex">
                            <span>商品宣传图:</span>
                            <div class="image-div" v-if="info.img">
                                <img v-if="info.img.original" :src="info.img.original" alt="" class="image">
                            </div>    
                        </div>
                        <div class="img_flex">
                            <span>商品图册: </span>
                            <div class="img_flex" style="max-width: 850px;">
                                <div class="image-div" v-for="(item, index) in info.list" :key="index">
                                    <img v-if="item.original" :src="item.original" alt="" class="image">
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="产业联盟" name="second" class="good-info">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>产业联盟信息</span>
                        <el-button style="float: right;" size="mini" type="primary" @click="openAllianceVisible">编辑</el-button>
                    </div>
                    <el-row class="goods-row long-span">
                        <el-col :span="24"><span>是否支持开发票:</span>{{info.isInvoice ? '是' : '否'}}</el-col>
                        <el-col :span="8"><span>退货时间方式:</span>{{info.returnDeadlineType ? '自定义设置' : '和企业一致'}}</el-col>
                        <el-col :span="16"><span>退货时间:</span>{{info.returnDeadline | formatSecs}}</el-col>
                        <el-col :span="8"><span>税率方式:</span>{{info.taxRateType ? '自定义设置' : '和企业一致'}}</el-col>
                        <el-col :span="16"><span>税率:</span>{{info.taxRate}}</el-col>
                        <el-col :span="8"><span>服务费率方式:</span>{{info.serviceRateType ? '自定义设置' : '和企业一致'}}</el-col>
                        <el-col :span="16"><span>服务费率:</span>{{info.serviceRate}}</el-col>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品规格" name="third" class="good-info" v-if="info.isSku">
                <el-card class="goods-card">
                    <div slot="header" class="clearfix">
                        <span>商品规格</span>
                    </div>
                    <el-row class="goods-row">
                        <el-col :span="8"><span>商家code:</span>{{info.skuList.code}}</el-col>
                        <el-col :span="8"><span>条形码:</span>{{info.skuList.barcode}}</el-col>
                        <el-col :span="8"><span>重量:</span>{{info.skuList.weight}}</el-col>
                        <el-col :span="8"><span>销售价:</span>{{info.skuList.price}}</el-col>
                        <el-col :span="8"><span>原价:</span>{{info.skuList.orginPrice}}</el-col>
                    </el-row>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="fourth">
                <el-card class="goods-card">
                    <el-button icon="fa fa-save" style="font-size: 16px;" size="small" type="primary" @click="updateDetailByid">保存</el-button>
                    <c-ueditor ref="editor"></c-ueditor>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            title="编辑"
            :visible.sync="sortVisible"
            width="500px">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="排序：">
                    <el-input v-model="sort" @keyup.native="sort=sort.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值" @focus="focus($event)"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sortVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDisplayOrderByid(sort)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑"
            :visible.sync="brandVisible"
            width="500px">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="商品品牌 : " style="padding-left:10px;">
                    <el-select
                        v-model="brandId"
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
                <el-form-item label="商品分类 : " style="padding-left:10px;">
                    <c-goods-class v-model="cateIds" :initval="initCateIds"></c-goods-class>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="brandVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBrandIdByid">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑"
            :visible.sync="imageVisible"
            width="800px">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="宣传图：">
                    <el-upload
                        id="logo-upload"
                        class="avatar-uploader"
                        action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :http-request="imgRequest">
                        <div v-if="image.imageUrl" class="avatar">
                            <img :src="image.imageUrl" class="image">
                        </div>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="图册：">
                    <div class="flex-start">
                        <el-upload
                            list-type="picture-card"
                            action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
                            :before-upload="beforeUpload"
                            :http-request="imgRequestArr"
                            :on-remove="onRemove"
                            :file-list="image.list">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="imageVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateThumbByid">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑"
            :visible.sync="allianceVisible"
            width="500px">
            <el-form label-width="120px" label-position="left">
                <el-form-item label="是否支持开发票 :">
                    <el-radio v-model="alliance.isInvoice" :label="1" border>是</el-radio>
                    <el-radio v-model="alliance.isInvoice" :label="0" border>否</el-radio>
                </el-form-item>
                <el-form-item label="退货时间方式 :">
                    <el-radio v-model="alliance.returnDeadlineType" :label="0" border>和企业一致</el-radio>
                    <el-radio v-model="alliance.returnDeadlineType" :label="1" border>自定义设置</el-radio>
                </el-form-item>
                <el-form-item label="退货时间 :">
                    <span v-if="!alliance.returnDeadlineType">{{alliance.returnDeadline | formatSecs}}</span>
                    <el-input v-else v-model="tempDeadline" placeholder="格式: 天-时-分,如: 3-5 (3天5小时0分)" @focus="focus($event)"></el-input>
                </el-form-item>
                <el-form-item label="税率方式 :">
                    <el-radio v-model="alliance.taxRateType" :label="0" border>和企业一致</el-radio>
                    <el-radio v-model="alliance.taxRateType" :label="1" border>自定义设置</el-radio>
                </el-form-item>
                <el-form-item label="税率 :">
                    <span v-if="!alliance.taxRateType">{{alliance.taxRate}}</span>
                    <el-input v-else v-model="tempTaxRate" placeholder="税费比例，0-1之间,如：0.05" @focus="focus($event)"></el-input>
                </el-form-item>
                <el-form-item label="服务费率方式 :">
                    <el-radio v-model="alliance.serviceRateType" :label="0" border>和企业一致</el-radio>
                    <el-radio v-model="alliance.serviceRateType" :label="1" border>自定义设置</el-radio>
                </el-form-item>
                <el-form-item label="服务费率 :">
                    <span v-if="!alliance.serviceRateType">{{alliance.serviceRate}}</span>
                    <el-input v-else v-model="tempServiceRate" placeholder="服务费率比例，0-1之间,如：0.05" @focus="focus($event)"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allianceVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAllianceByid">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import cGoodsClass from '@/components/base/cGoodsClass'
import cUeditor from '@/components/base/cUeditor'
export default {
    data () {
        return {
            gid: '',
            activeName: 'first',
            info: {
                cateList: [],
                img: [],
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
            imageVisible: false,
            image: {
                imgId: '',
                imageUrl: '',
                list: []
            },
            cateIds: [],
            brandId: '',
            optionsBrand: [],
            loading: false,
            allianceVisible: false,
            alliance: {
                isInvoice: 0,
                returnDeadlineType: 0,
                returnDeadline: '',
                taxRateType: 0,
                taxRate: '',
                serviceRateType: 0,
                serviceRate: ''
            },
            tempDeadline: '',
            tempTaxRate: '',
            tempServiceRate: '',
            commonSetting: {},
            imgSign: [],
            initCateIds: true,
        }
    },
    components: {
        cGoodsClass,
        cUeditor
    },
    methods: {
        getImgSign (val) {
            this.imgSign.push(val)
        },
        updateDetailByid (obj) {
            let vm = this
            let editor = vm.$refs.editor.getUEContent()
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,
                detail: editor.contnet,
                detailImgIds: editor.imgId
			}
			vm.$post(vm.$api.pos.updateDetailByid, param).then(resp => {
                vm.$message({
                    message: '保存成功',
                    type: 'success'
                })
			})
        },
        getGoodsDetail (id) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				goodsId: id,
			}
			vm.$get(vm.$api.pos.getGoodsDetail, param).then(resp => {
                vm.info = resp
                vm.$refs.editor.setUEContent(resp.detail)
			})
        },
        updateDisplayOrderByid (sort) {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,
                displayOrder: sort
			}
			vm.$post(vm.$api.pos.updateDisplayOrderByid, param).then(resp => {
                vm.info.displayOrder = sort
                vm.$message({
                    message: '保存成功',
                    type: 'success'
                })
                vm.sortVisible = false
			})
        },
        updateBrandIdByid () {
            let vm = this
			let paramCate = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,
                cateId: vm.cateIds[vm.cateIds.length-1]
            }
            let paramBrand = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,
                brandId: vm.brandId
            }
            Promise.all([vm.$post(vm.$api.pos.updateCateIdByid, paramCate), vm.$post(vm.$api.pos.updateBrandIdByid, paramBrand)]).then(resp => {
                // vm.info.displayOrder = sort
                vm.getGoodsDetail(vm.gid)
                vm.$message({
                    message: '保存成功',
                    type: 'success'
                })
                vm.brandVisible = false
			})
        },
        updateThumbByid () {
            let vm = this
            let listIds = ''
            for (let i in vm.image.list) {
                listIds += vm.image.list[i].name + ','
            }
            if (vm.image.imgId && listIds) {
                listIds = listIds.substring(0, listIds.length - 1)
            } else {
                this.$message({
                    type: 'error',
                    message: '请上传宣传图和图册至少一张'
                })
                return
            }
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,
                imgId: vm.image.imgId,
                listIds: listIds
			}
			vm.$post(vm.$api.pos.updateThumbByid, param).then(resp => {
                vm.getGoodsDetail(vm.gid)
                vm.$message({
                    message: '保存成功',
                    type: 'success'
                })
                vm.imageVisible = false
			})
        },
        updateAllianceByid () {
            let vm = this
            vm.alliance
			let param = Object.assign({}, vm.alliance, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                goodsId: vm.gid,         
            })
            if (param.returnDeadlineType) {
                let temp = vm.tempDeadline.split('-')
                temp[0] = temp[0] | 0
                temp[1] = temp[1] | 0
                temp[2] = temp[2] | 0
                param.returnDeadline = temp[0]*3600*24 + temp[1]*3600 + temp[2]*60
            }
            if (param.taxRateType) {
                param.taxRate = vm.tempTaxRate
            }
            if (param.serviceRateType) {
                param.serviceRate = vm.tempServiceRate
            }
			vm.$post(vm.$api.pos.updateAllianceByid, param).then(resp => {
                vm.getGoodsDetail(vm.gid)
                vm.$message({
                    message: '保存成功',
                    type: 'success'
                })
                vm.allianceVisible = false
			})
        },
        openSortVisible () {
            let vm = this
            vm.sort = vm.info.displayOrder || '0'
            vm.sortVisible = true
        },
        openImageVisible () {
            let vm = this
            vm.image = {
                imageUrl: '',
                imgId: '',
                list: []
            }

            try {
                vm.image.imageUrl = vm.info.img.original || ''
                vm.image.imgId = vm.info.img.imageId || ''
                for (let item of vm.info.list) {
                    vm.image.list.push({
                        name: item.imageId,
                        url: item.original
                    })
                }
            } catch (error) {
            }
            vm.imageVisible = true
        },
        openBrandVisible () {
            let vm = this
            vm.getGoodsBrand()
            vm.brandVisible =true
            vm.$nextTick(()=>{
                vm.brandId = vm.info.brandId
                try { // 处理数据null
                    vm.initCateIds = vm.info.cateList.map(obj => obj.cateId) || []
                } catch (error) {
                    vm.initCateIds = []
                }
            })
        },
        openAllianceVisible () {
            let vm = this
            vm.alliance = {
                isInvoice: vm.info.isInvoice,
                returnDeadlineType: vm.info.returnDeadlineType,
                returnDeadline: vm.commonSetting.returnDeadline,
                taxRateType: vm.info.taxRateType,
                taxRate: vm.commonSetting.taxRate,
                serviceRateType: vm.info.serviceRateType,
                serviceRate: vm.commonSetting.serviceRate
            }
            vm.allianceVisible = true
        },
		focus(event) {
			event.currentTarget.select()
        },
        imgRequest (obj) { // 图片上传
            let vm = this
            let temp = {
                file: obj.file,
                type: 'goods',
                name: 'logo-upload'
            }
            this.$post(vm.$api.share.upImage, temp).then(resp => {
                vm.image.imageUrl = URL.createObjectURL(obj.file)
                vm.image.imgId = resp.fileId
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
                vm.image.list.push(item)
            }).catch(err => {
                vm.image.list = JSON.parse(JSON.stringify(vm.image.list)) // 上传失败时清除本地的图片缓存
            })
        },
        onRemove (file, fileList) {
            let vm = this
            let name = file.name
            for (let i in vm.image.list) {
                if (vm.image.list[i].name === name) {
                    vm.image.list.splice(i, 1)
                    return
                }
            }
        },
        beforeUpload (file) { // 基于elementUi图片上传拦截过滤器
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
        getCommonSetting () {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			}
			vm.$get(vm.$api.setting.getCommonSetting, param).then(resp => {
                vm.commonSetting = resp
			})
		}
    },
    created () {
//  	console.log(this.image)
        this.gid = this.$route.query.gid
        if (this.gid) {
            this.getGoodsDetail(this.gid)
            this.getCommonSetting()
        } else {
            this.$message({
                type: 'error',
                message: '错误的访问'
            })
        }
    },
}
</script>

<style lang="less">
.goods-detail {
    font-size: 18px;
    .goods-card {
        margin: 10px 20px 20px;
    }
    .goods-row {
        font-size: 16px;
        line-height: 40px;
        span {
            display: inline-block;
            width: 100px;
        }
    }
    .long-span {
        span {
            display: inline-block;
            width: 120px;
        }
    }
    .el-tabs__nav-scroll {
        background-color: #fff;
        padding: 0 30px;
    }
    .text-but {
        // font-size: 18px;
        padding-left: 50px;
    }
    // .good-info {
    //     span {
    //         display: inline-block;
    //         width: 100px;
    //     }
    //     .long-span {
    //         span {
    //             display: inline-block;
    //             width: 120px;
    //         }
    //     }
    // }
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
}
</style>
