<template>
	<div class="pay-index">
		<div class="nub-top">
			<h2>收钱码</h2>
		</div>
		<el-card class="pay-card">
			<div slot="header" class="clearfix">
				<span style="padding-right: 20px;">收钱码信息</span>
				<el-switch v-model="info.openCgcPay" :active-text="tex" :active-value="1" :inactive-value="0" @change="editStatus" v-has="'up-cgc_pay'">
				</el-switch>
				<el-button v-if="info.openCgcPay" style="float: right;" size="mini" type="primary" @click="openCodeVisible" v-has="'edit-cgc_pay'">编辑</el-button>
			</div>
			<el-row class="goods-row" v-if="info.openCgcPay">
				<el-col :span="24"><p>品牌名称:</p>{{info.brandName}}</el-col>
				<el-col :span="24"><p>商品名称:</p>{{info.goodsName}}</el-col>
				<el-col :span="24"><p>商品的简称:</p>{{info.shortName}}</el-col>
				<el-col :span="24"><p>商品单位:</p>{{info.unit}}</el-col>
				<el-col :span="24">
					<p>商品分类:</p>
					<template v-for="(item, index) in info.cateList">
						{{index ? '/' : ''}} {{item.cateName}}
					</template>
				</el-col>
				<el-col :span="24" class="img_flex">
					<p>商品宣传图:</p>
					<div class="image-div" v-if="info.img">
						<img v-if="info.img.original && info.img" :src="info.img.original" alt="" class="image">
					</div>
				</el-col>
				<el-col :span="24"><p>商家收钱码:</p>{{info.cgcPayCode}}</el-col>
			</el-row>
		</el-card>
		<el-dialog title="提示" :visible.sync="codeVisible" width="50%">
			<el-form ref="edit" :model="edit" label-width="100px">
				<el-form-item label="商品单位">
					<el-input v-model="edit.unit"></el-input>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input v-model="edit.goodsName"></el-input>
				</el-form-item>
				<el-form-item label="商品的简称">
					<el-input v-model="edit.shortName"></el-input>
				</el-form-item>
				<el-form-item label="品牌名称">
					<el-select
                        v-model="edit.brandId"
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
				<el-form-item label="商品分类">
					<c-goods-class v-model="cateIds" :initval="initCateIds"></c-goods-class>
				</el-form-item>
				<el-form-item label="商品宣传图：">
					<el-upload 
						id="img-upload" 
						class="avatar-uploader" 
						action="http://domain.cgc999.com:8080/group1/M00/00/50/rBL0CFtxaSqAEJCGAAAya4VsZtM430.png"
					    :show-file-list="false" 
						:before-upload="beforeUpload" 
						:http-request="imgRequest">
						<div v-if="imageUrl" class="avatar">
							<img :src="imageUrl" class="image">
						</div>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="codeVisible = false">取 消</el-button>
				<el-button type="primary" @click="editInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import cGoodsClass from '@/components/base/cGoodsClass'
export default {
	data() {
		return {
			info: {
				openCgcPay: 1,
				cgcPayGoodsId: '',
				cgcPayCode: '',
				goodsName: '',
				shortName: '',
				unit: '',
				brandId: '',
				brandName: '',
				img: {},
				cateList: []
			},
			edit: {
				cateIds: '',
				brandId: '',
				goodsName: '',
				shortName: '',
				unit: '',
				logoId: ''
			},
			codeVisible: false,
			loading: false,
			cateIds: [],
			imageUrl: '',
			optionsBrand: [],
			tex:'已开启',
			initCateIds: true,
		}
	},
	components: {
		cGoodsClass
	},
	methods: {
		getInfo() {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				cardId: vm.cardId,
				curPage: vm.curPage,
				pageSize: vm.pageSize
			}
			vm.$get(vm.$api.pay.getInfo, param).then(resp => {
				vm.info = resp
				console.log(vm.info.img)
			})
		},
		editStatus(status) {
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				status: status
			}
			vm.$post(vm.$api.pay.editStatus, param).then(resp => {
				vm.$message({
					message: '操作成功',
					type: 'success'
				})
				if(status==0){
					vm.tex='已关闭'
				}else{
					vm.tex='已开启'
				}
				vm.getInfo()
			})
		},
		openCodeVisible() {
			let vm = this
			vm.getGoodsBrand()
			vm.edit = {
				cateIds: '',
				brandId: vm.info.brandId,
				goodsName: vm.info.goodsName,
				shortName: vm.info.shortName,
				unit: vm.info.unit,
				logoId: vm.info.img && vm.info.img.imageId ? vm.info.img.imageId : ''
			}
			vm.imageUrl = vm.info.img && vm.info.img.original ? vm.info.img.original : ''
			vm.cateIds = []
			vm.codeVisible = true
			vm.$nextTick(()=>{
				try {
					vm.initCateIds = vm.info.cateList.map(obj => obj.cateId)
				} catch (error) {
					vm.initCateIds = []
				}
			})
		},
		imgRequest(obj) { // 图片上传
			let vm = this
			let temp = {
				file: obj.file,
				type: 'goods',
				name: 'img-upload'
			}
			this.$post(vm.$api.share.upImage, temp).then(resp => {
				vm.imageUrl = URL.createObjectURL(obj.file)
				vm.edit.logoId = resp.fileId
			})
		},
		beforeUpload(file) { // 基于elementUi图片上传拦截过滤器
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
		editInfo () {
			let vm = this
			let param = Object.assign({}, vm.edit, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				cateIds: vm.cateIds.join(',')
			})
			vm.$post(vm.$api.pay.editInfo, param).then(resp => {
				vm.$message({
					message: '操作成功',
					type: 'success'
				})
				vm.getInfo()
				vm.codeVisible = false
			})
		}
	},
	created() {
		this.getInfo()
	}
}
</script>


<style lang="less">
.pay-index {
	.pay-card {
		margin: 20px;
	}
	.goods-row {
		font-size: 16px;
		line-height: 40px;
		p {
			display: inline-block;
			width: 100px;
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
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
				}
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
			width: auto;
			height: auto;
			max-width: 100%;
			max-height: 100%;
		}
	}
}
</style>
