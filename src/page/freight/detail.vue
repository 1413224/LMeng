<template>
	<div class="freight-add">
		<div class="nub-top">
			<h2>运费详情</h2>
		</div>
		<el-card class="goods-card">
      <el-form :model="info" :rules="rules" ref="freightData" label-width="140px" style="max-width: 1200px;">
        <el-form-item label="排序：">
          <el-input v-model="info.displayOrder" @keyup.native="info.displayOrder=info.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
        </el-form-item>
        <el-form-item label="运费模板名称：" prop="name">
        	<el-input v-model.trim="info.name" placeholder="请输入运费模板名称"></el-input>
        </el-form-item>
        <el-form-item label="物流公司" prop="expressId">
					<el-select
  				  v-model="info.expressId"
  				  filterable
  				  remote
  				  reserve-keyword
  				  placeholder="请输入关键词（可搜索）"
  				  :remote-method="expressCompany"
  				  :loading="loading">
  				  <el-option
  				    v-for="item in options"
  				    :key="item.id"
  				    :label="item.name"
  				    :value="item.id">
  				  </el-option>
  				</el-select>
				</el-form-item>
        <el-form-item label="计费方式：">
          <el-radio-group  v-model="info.type">
            <el-radio :label="0">按重量计费</el-radio>
            <el-radio :label="1">按件计费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否默认：" prop="isDefault">
          <el-radio-group  v-model="info.isDefault">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
				<el-form-item label="配送区域："> 
					<table class="region-form">
            <thead style="text-align: -webkit-match-parent;" >
            	<tr v-if="info.type == 0">
                <th style="height:40px;width:200px;">运送到</th>
                <th class="show_h" style="width: 110px;">首重(克)</th>
                <th class="show_h" style="width: 110px;">首费(元)</th>
                <th class="show_h" style="width: 110px;">续重(克)</th>
                <th class="show_h" style="width: 110px;">续费(元)</th>
                <th style="width:80px;">管理</th>
            	</tr>
							<tr v-if="info.type == 1">
                <th style="height:40px;width:200px;">运送到</th>
                <th class="show_n" style="width: 110px;" >首件(个)</th>
                <th class="show_n" style="width: 110px;" >运费(元)</th>
                <th class="show_n" style="width: 110px;" >续件(个)</th>
                <th class="show_n" style="width: 110px;" >续费(元)</th>
                <th style="width:80px;">管理</th>
            	</tr>
            </thead>
            <tbody>
            	<tr v-if="info.type == 0">
                <td style="width:200px;">全国 [默认运费]</td>
                <td style="width: 110px;">
									<el-input @keyup.native="info.firstWeight=info.firstWeight.toString().replace(/[^\d]/g, '')" v-model="info.firstWeight" :class="info.firstWeight === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.firstPrice=formatDouble(info.firstPrice)" v-model="info.firstPrice" :class="info.firstPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.secondWeight=info.secondWeight.toString().replace(/[^\d]/g, '')" v-model="info.secondWeight" :class="(info.secondWeight === '' || info.secondWeight == '' ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.secondPrice=formatDouble(info.secondPrice)" v-model="info.secondPrice" :class="info.secondPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td></td>
            	</tr>
							<tr v-if="info.type == 0" v-for="(itme,index) in allareas" :key="index">
                <td style="width:200px;">
									<!-- <div style="display:flex;">
										<p style="width:200px;line-height: 1;overflow: hidden;cursor: pointer;text-overflow: ellipsis;white-space: nowrap;">{{itme.areaNames}}</p>
							 			<p style="color: #4B74FF;cursor: pointer;line-height: 1;" @click="showDialogVisible(index)">编辑</p>
										<img style="width:30px;height:30px;" @click="showDialogVisible(index)" src="../../assets/images/bianji@2x.png" alt="">
									</div> -->
									<div style="display:flex;" class="picture">
									 	<p style="width:165px;line-height: 1;overflow: hidden;cursor: pointer;text-overflow: ellipsis;white-space: nowrap;">{{itme.areaNames}}</p>
							 			<img style="width:30px;height:30px;" @click="showDialogVisible(index)" src="../../assets/images/bianji@2x.png" alt="">
								 </div>
								</td>
                <td style="width: 110px;">
									<el-input @keyup.native="itme.firstWeight=itme.firstWeight.toString().replace(/[^\d]/g, '')" v-model="itme.firstWeight" :class="itme.firstWeight === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.firstPrice=formatDouble(itme.firstPrice)" v-model="itme.firstPrice" :class="itme.firstPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondWeight=itme.secondWeight.toString().replace(/[^\d]/g, '')" v-model="itme.secondWeight" :class="(itme.secondWeight === '' || itme.secondWeight == '' ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td > 
									<el-input @keyup.native="itme.secondPrice=formatDouble(itme.secondPrice)" v-model="itme.secondPrice" :class="itme.secondPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                 <td>
									<img style="width:30px;height:30px;display:block;margin:8px 0px 0px 8px;border-radius: 50%;" @click="deleteRegion(index)" src="../../assets/images/shanchu@2x.png" alt="">
								</td>
            	</tr>
							<tr v-if="info.type == 1">
                <td style="width:200px;" >全国 [默认运费]</td>
                <td style="width: 110px;">
									<el-input @keyup.native="info.firstNum = info.firstNum.toString().replace(/[^\d]/g, '')" v-model="info.firstNum" :class="info.firstNum === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.firstNumPrice = formatDouble(info.firstNumPrice)" v-model="info.firstNumPrice" :class="info.firstNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.secondNum=info.secondNum.toString().replace(/[^\d]/g, '')" v-model="info.secondNum" :class="(info.secondNum === '' || info.secondNum == 0 ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="info.secondNumPrice = formatDouble(info.secondNumPrice)" v-model="info.secondNumPrice" :class="info.secondNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td></td>
            	</tr>
							<tr v-if="info.type == 1" v-for="(itme,index) in allareas" :key="index" >
               <td style="width:200px;">
								 <div style="display:flex;" class="picture">
									 	<p style="width:165px;line-height: 1;overflow: hidden;cursor: pointer;text-overflow: ellipsis;white-space: nowrap;">{{itme.areaNames}}</p>
							 			<img style="width:30px;height:30px;" @click="showDialogVisible(index)" src="../../assets/images/bianji@2x.png" alt="">
								 </div>
							 </td>
                <td style="width: 110px;">
									<el-input @keyup.native="itme.firstNum=itme.firstNum.toString().replace(/[^\d]/g, '')" v-model="itme.firstNum" :class="itme.firstNum === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.firstNumPrice = formatDouble(itme.firstNumPrice)" v-model="itme.firstNumPrice" :class="itme.firstNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondNum=itme.secondNum.toString().replace(/[^\d]/g, '')" v-model="itme.secondNum" :class="(itme.secondNum === '' || itme.secondNum == 0) && tips  ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondNumPrice = formatDouble(itme.secondNumPrice)" v-model="itme.secondNumPrice" :class="itme.secondNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td>	<img style="width:30px;height:30px;display:block;margin:8px 0px 0px 8px;border-radius: 50%;" @click="deleteRegion(index)" src="../../assets/images/shanchu@2x.png" alt=""></td>
            	</tr>
          	</tbody>
        	</table>
					<div>
						<el-button type="success" icon="el-icon-plus" size="small" @click="showDialogVisible()">新增配送区域</el-button>
					</div>
					<div>
						<el-tag type="info" v-if="info.type == 0">
							根据重量来计算运费，当物品不足《首重重量》时，按照《首重费用》计算，超过部分按照《续重重量》和《续重费用》乘积来计算
						</el-tag>
						<el-tag type="info" v-if="info.type == 1">
							根据件数来计算运费，当物品不足《首件数量》时，按照《首件费用》计算，超过部分按照《续件重量》和《续件费用》乘积来计算
						</el-tag>
					</div>
				</el-form-item>
        <div style="margin-left: 20px;margin-bottom: 100px;">
            <p style="border-bottom: 1px dashed rgb(241, 213, 213); padding-bottom: 20px;">特殊区域设置</p>
            <div style="padding-top: 20px;">
              <el-form-item label="类型：">
		          	<div>
									<el-radio-group  v-model="info.specialAreaType">
		              	<el-radio :label="0">不配送区域 </el-radio>
		              	<el-radio :label="1">只配送区域 </el-radio>
		            	</el-radio-group>
								</div> 
		          </el-form-item>
							<el-form-item :label="info.specialAreaType==0?'不配送区域：': '只配送区域：' ">
								<div style="width:300px; line-height:1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 6px;">{{allregion.names}}</div>
								<div>
									<el-button v-if="allregion.names ==='' || allregion.names==null" type="success" icon="el-icon-plus" size="small" @click="choiceRegion()">选择地区</el-button>
									<el-button v-else type="success" size="small" @click="choiceRegion()">编辑</el-button>
								</div>
		          </el-form-item>
							<el-form-item label="状态： ">
								<el-radio-group  v-model="info.status">
		              	<el-radio :label="0">禁用 </el-radio>
		              	<el-radio :label="1">可用</el-radio>
		            </el-radio-group>
		          </el-form-item>
            </div>
        </div>
        <div class="center-align">
				    <el-button type="primary" @click="addTemplate('freightData')">保存</el-button>
				    <router-link to="/freight">
							<el-button>返回列表</el-button>
						</router-link>
				</div>
      </el-form>
		</el-card>
		<el-dialog
		    title="选择区域"
		    :visible.sync="dialogVisible"
		    width="720px"
		    :before-close="handleClose">
		    <div class="border">
		    	<checkbox-area ref="checkboxArea"></checkbox-area>
				</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addArea">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		    title="选择区域"
		    :visible.sync="distributionArea"
		    width="720px"
		    :before-close="handleClose">
		    <div class="border">
		    	<checkbox-area ref="deliveryRegion"></checkbox-area>
				</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="distributionArea = false">取 消</el-button>
		    <el-button type="primary" @click="saveArea">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import cSpec from '@/components/base/specifications'
import checkboxArea from '@/components/base/checkboxArea'
export default {
	data () {
		return {
			info:[],
			options: [],
			specialAreaIds:[],
		  value:'',
			dialogVisible: false,
			distributionArea:false,
			showPicture:false,
			freightData: {
				name: '',
				displayOrder: 0,
				type: 1,
				firstWeight: '',
				firstPrice: '',
				secondWeight: '',
				secondPrice: '',
				firstNum: '',
				firstNumPrice: '',
				secondNum: '',
				secondNumPrice: '',
				specialAreaType: 0,
				isDefault: 0,
				status: 1,
				expressId:''
			},
			rules: {
        name: [{ required: true, message: '请输入运费模板名称', trigger: 'blur' }],
        expressId: [{ required: true, message: '请输入物流公司', trigger: 'blur' }],
      },
			allareas: [],
			allregion:{},
			index: '',
			ids:'',
			loading: false,
		}
	},
	computed: {
		thWidth() {
			let sum = this.tableTh.length + this.valueData.length
			return {
				width: 100 / sum + '%'
			}
		}
	},
	components: {
		cSpec,
		checkboxArea
	},
	methods: {
		optionsValue(value){
			console.log(value)
		},
		addTemplate (freightData) {
			let vm = this
			this.$refs[freightData].validate((valid) => {
        if (valid) {
          if(vm.info.type === 0){
						let temp = true
						if(vm.info.firstWeight === "" || vm.info.firstPrice === "" || vm.info.secondWeight === "" || vm.info.secondWeight == 0 || vm.info.secondPrice === ""){
							vm.tips = true 
							if(vm.tips){
								vm.$message({
      				  	message: '请完善信息,以及续重不能为0',
      				  	type: 'warning'
								})
							}
							temp = false
							return 
						}
						if(vm.allareas){
							vm.allareas.forEach((value,index)=>{
								if(value.firstWeight === "" || value.firstPrice === "" || value.secondWeight === "" || value.secondWeight == 0 || value.secondPrice === ""){
									vm.tips = true
									if(vm.tips){
										vm.$message({
      						 	message: '请完善信息,以及续重不能为0',
      						 	type: 'warning'
										})
									}
									temp = false
									return 
								}
							})
						}
						if(temp){
							vm.public()
						}
					}
					if(vm.info.type===1){
						let temp = true
						if(vm.info.firstNum === "" || vm.info.firstNumPrice === "" || vm.info.secondNum === "" || vm.info.secondNum == 0 || vm.info.secondNumPrice === ""){
							vm.tips = true
							if(vm.tips){
								vm.$message({
      				  	message: '请完善信息,以及续件不能为0',
      				  	type: 'warning'
								})
							}
							temp = false
							return
						}
						console.log(vm.allareas)
						if(vm.allareas.length > 0){
							vm.allareas.forEach(value=>{
								if(value.firstNum === "" || value.firstNumPrice === "" || value.secondNum === "" || value.secondNum == 0 || value.secondNumPrice === ""){
									vm.tips = true
									if(vm.tips){
										vm.$message({
      						 	message: '请完善信息,以及续件不能为0',
      						 	type: 'warning'
										})
									}
									temp = false
									return 
								}
							})
						}
						if (temp) {
							vm.public()
						}
					}
        } else {
          return false;
        }
			});
		},
		choiceRegion(index = ''){
			let vm = this 
			vm.distributionArea = true
			this.index = index
			let ontest = []
			ontest = this.allregion.ids
			this.$nextTick(() => {
				this.$refs.deliveryRegion.setData(ontest)
			})
		},
		showDialogVisible(index = ''){
			this.dialogVisible = true
			this.index = index
			let ontest = []
			let test = []
			this.allareas.forEach((item, i) => {
				if (index === i) {
					ontest = ontest.concat(item.areaIds)
				} else {
					test = test.concat(item.areaIds)
				}
			})
			this.$nextTick(() => {
				this.$refs.checkboxArea.setData(ontest, test)
			})
		},
		// 添加区域事件
		addArea(){
			let vm = this
			let areas = this.$refs.checkboxArea.getData()
			if (vm.index === '') {
				if(areas.ids.length > 0 || areas.names.length > 0 ){
					let temp = {
						areaIds: areas.ids,
						areaNames: areas.names.join(';'),
						firstWeight: 1000, // 首重
						secondWeight :1000, // 续重 
						firstPrice :'', // 首重价格
						secondPrice :'', // 续重价格
						firstNum :1, // 首件
						secondNum :1, //  续件
						firstNumPrice :'', // 首件价格
						secondNumPrice :'',// 续件价格
					}
					vm.allareas.push(temp)
				}else{
					vm.allareas = []
				}
			} else {
				if(areas.ids.length > 0 || areas.names.length > 0 ){
					console.log(1111)
					vm.allareas[vm.index] = Object.assign({}, vm.allareas[vm.index], {
						areaIds: areas.ids,
						areaNames: areas.names.join(';'),
					})
				}else{
					this.allareas.splice(vm.index,1)
				}
			}
			vm.dialogVisible = false
		},
		saveArea(){
			this.allregion = this.$refs.deliveryRegion.getData()
			this.allregion.names = this.allregion.names.join(',')
			this.distributionArea = false
		},
		remoteMethod(query) {
      if (query !== '') {
				this.loading = true;
				this.keyword = query
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
				}, 200);
      } else {
        this.options = [];
      }
    },
		getTemplateInfo(){
			let vm = this 
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				id : this.ids
			}
			vm.$get(vm.$api.freight.getTemplateInfo,param).then(resp=>{
				vm.info = resp
				vm.allareas = JSON.parse(resp.areas)
				vm.info.firstWeight = resp.firstWeight == 0 ? '0' : resp.firstWeight
				vm.info.firstPrice = resp.firstPrice == 0 ? '0' : resp.firstPrice
				vm.info.secondWeight = resp.secondWeight == 0 ? '0' : resp.secondWeight
				vm.info.secondPrice = resp.secondPrice == 0 ? '0' : resp.secondPrice
				vm.info.firstNum = resp.firstNum == 0 ? '0' : resp.firstNum
				vm.info.firstNumPrice = resp.firstNumPrice == 0 ? '0' : resp.firstNumPrice
				vm.info.secondNum = resp.secondNum == 0 ? '0' : resp.secondNum
				vm.info.secondNumPrice = resp.secondNumPrice == 0 ? '0' : resp.secondNumPrice
				vm.info.specialAreaType = resp.specialAreaType
				vm.allareas.map(obj=>{
					obj.areaIds = obj.areaIds.split(',')
					obj.firstNum = obj.firstNum == obj.firstNum ? '0' : obj.firstNum
					obj.firstNumPrice = obj.firstNumPrice == 0 ? '0' : obj.firstNumPrice
					obj.firstPrice = obj.firstPrice == 0 ? '0' : obj.firstPrice
					obj.firstWeight = obj.firstWeight == 0 ? '0' : obj.firstWeight
					obj.secondNum = obj.secondNum == 0 ? '0' : obj.secondNum
					obj.secondNumPrice = obj.secondNumPrice == 0 ? '0' : obj.secondNumPrice
					obj.secondPrice = obj.secondPrice == 0 ? '0' : obj.secondPrice
					obj.secondWeight = obj.secondWeight == 0 ? '0' : obj.secondWeight
				})
				vm.allregion.ids = resp.specialAreaIds.split(',')
				vm.allregion.names = resp.specialAreaNames
				let temp = {
					id:vm.info.expressId,
					name:vm.info.expressName
				}
				vm.options.push(temp)
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
				vm.options = resp.list
				vm.loading = false
			})
		},
		public(){
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				id:vm.ids,
				name: vm.info.name,
				expressId: vm.info.expressId,
				displayOrder:vm.info.displayOrder,
				type: vm.info.type,
				firstWeight: vm.info.firstWeight,
				secondWeight: vm.info.secondWeight,
				firstPrice: vm.info.firstPrice,
				secondPrice: vm.info.secondPrice,
				firstNum: vm.info.firstNum,
				secondNum: vm.info.secondNum,
				firstNumPrice: vm.info.firstNumPrice,
				secondNumPrice: vm.info.secondNumPrice,
				specialAreaType:vm.info.specialAreaType,
				isDefault: vm.info.isDefault,
				status: vm.info.status,
			}
			let temp = this.allareas.map(obj => {
				obj.areaIds = obj.areaIds.join(',')
				delete obj.areaNames
				return obj
			})
			param.areas = temp.length == 0 ? "" : JSON.stringify(temp) 
			param.specialAreaIds = this.allregion.ids ? this.allregion.ids.join(',') : ''
			vm.$post(vm.$api.freight.modifyTemplate, param).then(resp => {
        this.$message({
					type: 'success',
					message: '保存成功!'
				})
				this.$router.push('/freight')
			})
		},
		// 删除区域
		deleteRegion(index){
			this.allareas.splice(index,1)
		}
	},
	created(){
		this.ids = this.$route.query.gid
		this.getTemplateInfo()
		this.expressCompany()
	}
}
</script>

<style lang="less">
.freight-add {
	font-size: 18px;
	.goods-card {
		margin: 20px;
		.region-form{
			.red-border {
				.el-input__inner{
					border-color: red;
				}
			}
		}
		.picture{
			height: 30px;
			img{
				display: none;
			}
		}
		.picture:hover{
			img{
				display: block;
				border-radius: 50%;
			}
		}
	}
	.left-margin {
		margin-left: 25px;
	}
	.border {
		height: 470px;
		padding-top: 10px;
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
	}
	.free-card {
		height: 200px;
		.right {
			float: right;
			padding-top: 10px;
			.r-top {
				height: 100px;
				border: #000000;
				.delivery {
					float: left;
				}
				.r-info {
					width: 900px;
					float: left;
				}
			}
		}
	}
	.center-align {
		text-align: right;
	}
}
</style>