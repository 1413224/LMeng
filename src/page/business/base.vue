<template>
	<div class="base">
		<div class="nub-top" style="height: 80px;">
			<h2>基本信息</h2>
			<!-- <div class="nub-right">
				<el-button style="float: right;" type="primary" @click="openImageVisible" v-has="'edit-base'">编辑</el-button>
			</div> -->
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>基本信息</span>
			</div>
			<el-row class="base-cont">
				
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.logo">
								<img v-if="info.logo" :src="info.logo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{info.name}}</p>
						</div>
					</div>
				</el-col>
				<el-col :span="8"><span>企业编号：</span>{{info.number}}</el-col>
				<el-col :span="8"><span>企业简称：</span>{{info.enterpriseName}}</el-col>
				<el-col :span="8"><span>企业性质：</span>{{info.nature | filterNature}}</el-col>
				<el-col :span="8" v-if="info.businessHours"><span>营业时间：</span>{{info.businessHours}}</el-col>
				<el-col :span="8" v-else><span class="gray">营业时间：</span>未设置</el-col>
				<el-col :span="8"><span>加盟时间：</span>{{info.joinTime | formatDate}}</el-col>
				<el-col :span="24"><span>工商分类：</span><i v-if="info.cateName1"></i>{{info.cateName1}}<i v-if="info.cateName2">/</i>{{info.cateName2}}<i v-if="info.cateName3">/</i>{{info.cateName3}}<i v-if="info.cateName4">/</i>{{info.cateName4}}</el-col>
				<el-col :span="24"><span>领域分类：</span>{{info.domainCateid1Name}}<i v-if="info.domainCateid2Name"> - </i>{{info.domainCateid2Name}}<i v-if="info.domainCateid3Name"> - </i>{{info.domainCateid3Name}}<i v-if="info.domainCateid4Name"> - </i>{{info.domainCateid4Name}}</el-col>
				<el-col :span="24" v-if="info.conglomerateName"><span>所属集团企业：</span>{{info.conglomerateName}}</el-col>
                <el-col :span="24" v-if="info.blocName"><span>所属连锁企业：</span>{{info.blocName}}</el-col>
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.conglomerateLogo">
								<img v-if="info.conglomerateLogo" :src="info.conglomerateLogo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{info.conglomerateName}}</p>
						</div>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.blocLogo">
								<img v-if="info.blocLogo" :src="info.blocLogo.original" alt="" class="image">
								
							</div>
							<p style="vertical-align: middle; line-height: 60px;font-size: 22px;font-weight: 700;">{{info.blocName}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card" v-if="info.remark">
			<div slot="header" class="clearfix">
				<span>企业备注</span>
			</div>
			<div v-html="info.remark"></div>
		</el-card>
		<el-card class="box-card" v-if="info.directorName">
			<div slot="header" class="clearfix">
				<span>负责人信息</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="goods-row">
						<div class="img_flex">
							<div class="image-div" v-if="info.directorAvtar">
								<img v-if="info.directorAvtar" :src="info.directorAvtar.original" alt="" class="image">
							</div>
							<p style="font-size: 22px;font-weight: 700;">{{info.directorName}}</p>
							<p>{{info.directorMobile}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>企业联系方式</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="8"><span>企业电话：</span>{{info.tel}}</el-col>
				<el-col :span="8"><span>邮编：</span>{{info.postcode}}</el-col>
				<el-col :span="8"><span>邮箱：</span>{{info.email}}</el-col>
				<el-col :span="8"><span>传真：</span>{{info.fax}}</el-col>
				<el-col :span="16"><span>官网：</span>{{info.website}}</el-col>
				<el-col :span="24">
					<span>所属区域：</span>{{info.countryName}}<i v-if="info.provinceName"> - </i>{{info.provinceName}}<i v-if="info.cityName"> - </i>{{info.cityName}}<i v-if="info.areaName"> - </i>{{info.areaName}}
					<i v-if="info.townName"> - {{info.townName}}</i>
					<i v-if="info.streetName"> - {{info.streetName}}</i>
				</el-col>
				<el-col :span="24"><span>详细地址：</span>{{info.address}}</el-col>
				<el-col :span="24"><span>经纬度：</span>({{info.lng}},{{info.lat}})</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>其他信息</span>
			</div>
			<el-row class="base-cont">
				<el-col :span="24">
					<div class="img_flex">
						<span>门头照: </span>
						<div class="img_flex" style="max-width: 850px;">
							<div class="image-div" v-for="(item, index) in info.headPics" :key="index">
								<img v-if="item" :src="item.original" alt="" class="image">
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="img_flex">
						<span>宣传图: </span>
						<div class="img_flex" style="max-width: 850px;">
							<div class="image-div" v-for="(item, index) in info.pics" :key="index">
								<img v-if="item" :src="item.original" alt="" class="image">
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="24">
					<div class="img_flex">
						<span>店内照: </span>
						<div class="img_flex" style="max-width: 850px;">
							<div class="image-div" v-for="(item, index) in info.insidePics" :key="index">
								<img v-if="item" :src="item.original" alt="" class="image">
							</div>
						</div>
					</div>
				</el-col>
				
			</el-row>
		</el-card>
		<el-dialog title="编辑" :visible.sync="imageVisible" width="800px">
			<el-form label-width="120px" :model="info" :rules="rules" ref="info" label-position="left">
				<el-form-item label="企业简称：" prop="enterpriseName">
					<el-input v-model="info.enterpriseName" placeholder="请输入企业简称"></el-input>
				</el-form-item>
				<el-form-item label="企业电话：" prop="tel">
					<el-input v-model="info.tel" placeholder="请输入企业电话"></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址: " prop="email">
					<el-input v-model="info.email" placeholder="请输入邮箱地址"></el-input>
				</el-form-item>
				<el-form-item label="邮编: ">
					<el-input v-model="info.postcode" placeholder="请输入邮编"></el-input>
				</el-form-item>
				<el-form-item label="传真: " prop="fax">
					<el-input v-model="info.fax" placeholder="请输入传真"></el-input>
				</el-form-item>
				<el-form-item label="网站: ">
					<el-input v-model="info.website" placeholder="请输入网站"></el-input>
				</el-form-item>
				<el-form-item label="备注: ">
					<el-input v-model="info.remark" placeholder="请输入传真"></el-input>
				</el-form-item>
				<el-form-item label="营业时间: ">
					<el-input v-model="info.businessHours" placeholder="请输入营业时间"></el-input>
				</el-form-item>
				<el-form-item label="宣传图册：">
					<div class="flex-start">
						<el-upload 
							list-type="picture-card"
							action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
							:before-upload="beforeUpload"
							:http-request="imgRequestArr"
							:data="{name: 'picArr'}"
							:on-success="success"
							:on-remove="onRemove"
							:file-list="picArr">
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="门头照：">
					<div class="flex-start">
						<el-upload 
							list-type="picture-card"
							action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
							:before-upload="beforeUpload"
							:http-request="imgRequestArr"
							:data="{name: 'headpicArr'}"
							:on-remove="onRemove"
							:file-list="headpicArr">
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="店内照：">
					<div class="flex-start">
						<el-upload 
							list-type="picture-card"
							action="http://47.104.187.243:18666/datacenter/v1/fileupload/image"
							:before-upload="beforeUpload"
							:http-request="imgRequestArr"
							:on-remove="onRemove"
							:data="{name: 'insidepicArr'}"
							:file-list="insidepicArr">
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button @click="imageVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyInfo('info')">确 定</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
import {validateTel} from '@/assets/js/elValidate.js'
export default {
	data() {
		return {
			info: {
				enterpriseName: '',
				logo: '',
				tel: '',
				email: '',
				postcode: '',
				fax: '',
				website: '',
				remark: '',
				businessHours: '',
				director: '',
				pics: '',
				headPics: '',
				insidePics: '',
				img: [],
			},
	        rules: { // 验证信息
                enterpriseName: [{ required: true, message: '请输入企业简称', trigger: 'blur' }],
                tel: [{ required: true, validator: validateTel, trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
                fax: [{ message: '请输入您的传真', trigger: 'blur',  
                pattern: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/}]
            },
			imageVisible: false,
			image: {
				imgId: '',
				imageUrl: '',
				pics: []
			},
			picArr: [],
			headpicArr: [],
			insidepicArr: [],
		}
	},
	methods: {
		getInfo() {
			let vm = this
			let param = {
				accountId: localStorage['userId' + sessionStorage['roleTypeId']]
			}
			vm.$get(vm.$api.business.getInfo, param).then(resp => {
				vm.info = resp
			})
		},
		modifyInfo(formName) {
			var str1 = '',
				str2 = '',
				str3 = '';
			this.picArr.forEach((v, i) => {
				str1 += `${v.name},`
			})
			this.headpicArr.forEach((v, i) => {
				str2 += `${v.name},`
			})
			this.insidepicArr.forEach((v, i) => {
				str3 += `${v.name},`
			})
			str1 = str1.replace(/,$/gi, '');
			str2 = str2.replace(/,$/gi, '');
			str3 = str3.replace(/,$/gi, '');
			let vm = this
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let param = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						enterpriseName: vm.info.enterpriseName,
						logo: vm.info.logo.imageId,
						tel: vm.info.tel,
						email: vm.info.email,
						postcode: vm.info.postcode,
						fax: vm.info.fax,
						website: vm.info.website,
						remark: vm.info.remark,
						businessHours: vm.info.businessHours,
						director: vm.info.directorId,
						pics: str1,
						headPics: str2,
						insidePics: str3,
					}
					vm.$post(vm.$api.business.modifyInfo, param).then(resp => {
						vm.getInfo()
						vm.$message.success('保存成功')
						vm.imageVisible = false
					})
				} else {
                    vm.$message('输入内容格式不对,请校正后再保存')
                    return false
                }
			})
	},
		openImageVisible() {
			this.picArr = [];
			this.headpicArr = [];
			this.insidepicArr = [];
			this.info.pics.forEach((v, i) => {
				if(v){
					this.picArr.push({
						name: v.imageId,
						url: v.original
					})
				}
			})
			this.info.headPics.forEach((v, i) => {
				if (v) {
					this.headpicArr.push({
						name: v.imageId,
						url: v.original
					})
				}
			})
			this.info.insidePics.forEach((v, i) => {
				if(v){
					this.insidepicArr.push({
					name: v.imageId,
					url: v.original
				})
				}
			})
			let vm = this
			vm.image = {
				imageUrl: '',
				imgId: '',
				pics: [],
				headPics: [],
				insidePics: []
			}
			try {
				vm.image.imageUrl = vm.info.img.original || ''
				vm.image.imgId = vm.info.img.imageId || ''
				for(let item of vm.info.pics) {
					vm.image.pics.push({
						name: item.imageId,
						url: item.original
					})
				}
			} catch(error) {}
			
			vm.imageVisible = true
		},
		imgRequest(obj) { // 图片上传
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
		imgRequestArr(obj) { // 图册上传
			let vm = this
			let temp = {
				file: obj.file,
				type: 'enterprise',
				name: 'more-upload'
			}
			this.$post(vm.$api.share.upImage, temp).then(resp => {
				let item = {
					name: resp.fileId,
					url: resp.fileUrl
				}
				vm[obj.data.name].push(item)
			}).catch(err => {
				vm[obj.data.name] = JSON.parse(JSON.stringify(vm[obj.data.name])) // 上传失败时清除本地的图片缓存
			})
		},
		onRemove(file, fileList) {
			let vm =this
			if(vm.picArr.some(obj => obj.name == file.name)) {
				vm.picArr = fileList
			} else if (vm.headpicArr.some(obj => obj.name == file.name)) {
				vm.headpicArr = fileList
			} else if (vm.insidepicArr.some(obj => obj.name == file.name)) {
				vm.insidepicArr = fileList
			}
		},
		beforeUpload(file) { // 基于elementUi图片上传拦截过滤器
			const isIMG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif')
			const isLt10M = file.size / 1024 / 1024 < 10
			if(!isIMG) {
				this.$message.error('上传图片只能jpg、jpeg、gif、png')
			}
			if(!isLt10M) {
				this.$message.error('上传图片不能大小超过10M！')
			}
			return isIMG && isLt10M
		},
	},
	filters: {
		filterNature(val) {
			switch(val) {
				case 1:
					return '有限责任公司'
				case 2:
					return '股份有限公司'
				case 3:
					return '国有独资'
				case 4:
					return '个人独资'
				case 5:
					return '合伙企业'
				case 6:
					return '个体工商户'
				case 7:
					return '外资企业'
				case 8:
					return '私营 '
				case 9:
					return '其他性质 '
				default:
					return '/'
			}
		}
	},
	created() {
		this.getInfo()
		
	}
}
</script>

<style lang="less">
	.image{
		font-size: 18px;font-weight: 600;height: 80px;
	}
.base {
	.box-card {
		margin: 20px;
	}
	.base-cont {
		line-height: 40px;
		margin-left: 40px;
		span {
			display: inline-block;
			float: left;
			margin-right: 20px;
		}
	}
	.flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.img_flex {
		.image-div {
			width: 60px;
			height: 60px;
			float: left;
			margin-right: 40px;
			margin-bottom: 20px;
			vertical-align: middle;
			.image {
				width: 60px;
				height: 60px;
				float: left;
				vertical-align: middle;
			}
		}
	}
	.el-form--label-left .el-form-item__label {
		text-align: right;
		padding-right: 25px;
	}
	.gray {
		color: #595959;
	}
}
</style>