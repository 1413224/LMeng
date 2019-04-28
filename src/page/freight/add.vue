<template>
	<div class="freight-add">
		<div class="nub-top">
			<h2>增加运费模板</h2>
		</div>
		<el-card class="goods-card">
      <el-form :model="freightData" :rules="rules" ref="freightData" label-width="140px" style="max-width: 1200px;">
        <el-form-item label="排序：">
          <el-input v-model="freightData.displayOrder" @keyup.native="freightData.displayOrder=freightData.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
        </el-form-item>
        <el-form-item label="运费模板名称：" prop="name">
        	<el-input v-model.trim="freightData.name" placeholder="请输入运费模板名称"></el-input>
        </el-form-item>
        <el-form-item label="物流公司" prop="expressId">
						<el-select
  				  v-model="freightData.expressId"
						clearable
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
          <el-radio-group  v-model="freightData.type">
            <el-radio :label="0">按重量计费</el-radio>
            <el-radio :label="1">按件计费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否默认：" prop="isDefault">
          <el-radio-group  v-model="freightData.isDefault">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
				<el-form-item label="配送区域："> 
					<table class="region-form">
            <thead style="text-align: -webkit-match-parent;" >
            	<tr v-if="freightData.type == 0">
                <th style="height:40px;width:200px;">运送到</th>
                <th class="show_h" style="width: 110px;">首重(克)</th>
                <th class="show_h" style="width: 110px;">首费(元)</th>
                <th class="show_h" style="width: 110px;">续重(克)</th>
                <th class="show_h" style="width: 110px;">续费(元)</th>
                <th style="width:80px;"></th>
            	</tr>
							<tr v-if="freightData.type == 1">
                <th style="height:40px;width:200px;">运送到</th>
                <th class="show_n" style="width: 110px;" >首件(个)</th>
                <th class="show_n" style="width: 110px;" >运费(元)</th>
                <th class="show_n" style="width: 110px;" >续件(个)</th>
                <th class="show_n" style="width: 110px;" >续费(元)</th>
                <th style="width:80px;"></th>
            	</tr>
            </thead>
            <tbody>
            	<tr v-if="freightData.type == 0">
                <td style="width:200px;">全国 [默认运费]</td>
                <td style="width: 110px;">
									<el-input @keyup.native="freightData.firstWeight=freightData.firstWeight.toString().replace(/[^\d]/g, '')" v-model="freightData.firstWeight" :class="freightData.firstWeight === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.firstPrice=formatDouble(freightData.firstPrice)" v-model="freightData.firstPrice" :class="freightData.firstPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.secondWeight=freightData.secondWeight.toString().replace(/[^\d]/g, '')" v-model="freightData.secondWeight" :class="(freightData.secondWeight === '' || freightData.secondWeight == 0 ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.secondPrice=formatDouble(freightData.secondPrice)" v-model="freightData.secondPrice" :class="freightData.secondPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td></td>
            	</tr>
							<tr v-if="freightData.type == 0" v-for="(itme,index) in allareas" :key="index">
                <!-- <td style="width:200px;"><p style="line-height: 1;">{{itme.names}} <span style="color: #4B74FF;cursor: pointer;" @click="showRegion(itme)">编辑</span></p></td> -->
								<td style="width:200px;">
									<!-- <p style="width:200px;line-height: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{itme.names}}</p>
							 		<p style="color: #4B74FF;cursor: pointer;line-height: 1;" @click="showDialogVisible(index)">编辑</p> -->
									<div style="display:flex;" class="picture">
									 	<p style="width:165px;line-height: 1;overflow: hidden;cursor: pointer;text-overflow: ellipsis;white-space: nowrap;">{{itme.names}}</p>
							 			<img style="width:30px;height:30px;" @click="showDialogVisible(index)" src="../../assets/images/bianji@2x.png" alt="">
								 	</div>
								</td>
                <td style="width: 110px;">
									<el-input @keyup.native="itme.firstWeight=itme.firstWeight.toString().replace(/[^\d]/g, '')" v-model="itme.firstWeight" :class="itme.firstWeight === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.firstPrice=formatDouble(itme.firstPrice)"  v-model="itme.firstPrice" :class="itme.firstPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondWeight=itme.secondWeight.toString().replace(/[^\d]/g, '')" v-model="itme.secondWeight" :class="(itme.secondWeight === '' || itme.secondWeight == 0 ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondPrice=formatDouble(itme.secondPrice)"  v-model="itme.secondPrice" :class="itme.secondPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td>	<img style="width:30px;height:30px;display:block;margin:8px 0px 0px 8px;border-radius: 50%;" @click="deleteRegion(index)" src="../../assets/images/shanchu@2x.png" alt=""></td>
            	</tr>
							<tr v-if="freightData.type == 1">
                <td style="width:200px;" >全国 [默认运费]</td>
                <td style="width: 110px;">
									<el-input @keyup.native="freightData.firstNum=freightData.firstNum.toString().replace(/[^\d]/g, '')" v-model="freightData.firstNum" :class="freightData.firstNum === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.firstNumPrice=formatDouble(freightData.firstNumPrice)" v-model="freightData.firstNumPrice" :class="freightData.firstNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.secondNum=freightData.secondNum.toString().replace(/[^\d]/g, '')" v-model="freightData.secondNum" :class="(freightData.secondNum === '' || freightData.secondNum == 0 ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="freightData.secondNumPrice=formatDouble(freightData.secondNumPrice)" v-model="freightData.secondNumPrice" :class="freightData.secondNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td></td>
            	</tr>
							<tr v-if="freightData.type == 1" v-for="(itme,index) in allareas" :key="index" >
               <!-- <td style="width:200px;"><p style="line-height: 1;">{{itme.names}} <span style="color: #4B74FF;cursor: pointer;" @click="showDialogVisible(index)">编辑</span></p></td> -->
							 <td style="width:200px;">
								 <div style="display:flex;" class="picture">
									 	<p style="width:165px;line-height: 1;overflow: hidden;cursor: pointer;text-overflow: ellipsis;white-space: nowrap;">{{itme.names}}</p>
							 			<img style="width:30px;height:30px;" @click="showDialogVisible(index)" src="../../assets/images/bianji@2x.png" alt="">
								 </div>
							 </td>
                <td style="width: 110px;">
									<el-input  @keyup.native="itme.firstNum=itme.firstNum.toString().replace(/[^\d]/g, '')" v-model="itme.firstNum" :class="itme.firstNum === '' && tips ? 'red-border' : ''" ></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.firstNumPrice=formatDouble(itme.firstNumPrice)" v-model="itme.firstNumPrice" :class="itme.firstNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondNum=itme.secondNum.toString().replace(/[^\d]/g, '')" v-model="itme.secondNum" :class="(itme.secondNum === '' || itme.secondNum == 0 ) && tips ? 'red-border' : ''"></el-input>
								</td>
                <td >
									<el-input @keyup.native="itme.secondNumPrice=formatDouble(itme.secondNumPrice)" v-model="itme.secondNumPrice" :class="itme.secondNumPrice === '' && tips ? 'red-border' : ''"></el-input>
								</td>
                <td>	<img style="width:30px;height:30px;display:block;margin:8px 0px 0px 8px;border-radius: 50%;" @click="deleteRegion(index)" src="../../assets/images/shanchu@2x.png" alt=""></td>
            	</tr>
          	</tbody>
        	</table>
					<div>
						<el-button type="success" icon="el-icon-plus" size="small" @click="showDialogVisible()">新增配送区域</el-button>
					</div>
					<div>
						<el-tag type="info" v-if="freightData.type == 0">
							根据重量来计算运费，当物品不足《首重重量》时，按照《首重费用》计算，超过部分按照《续重重量》和《续重费用》乘积来计算
						</el-tag>
						<el-tag type="info" v-if="freightData.type == 1">
							根据件数来计算运费，当物品不足《首件数量》时，按照《首件费用》计算，超过部分按照《续件重量》和《续件费用》乘积来计算
						</el-tag>
					</div>
				</el-form-item>
        <div style="margin-left: 20px;margin-bottom: 100px;">
            <p style="border-bottom: 1px dashed rgb(241, 213, 213); padding-bottom: 20px;">特殊区域设置</p>
            <div style="padding-top: 20px;">
              <el-form-item label="类型：">
		          	<div>
									<el-radio-group  v-model="freightData.specialAreaType">
		              	<el-radio :label="0">不配送区域 </el-radio>
		              	<el-radio :label="1">只配送区域 </el-radio>
		            	</el-radio-group>
								</div> 
		          </el-form-item>
							<el-form-item :label="freightData.specialAreaType == 0?'不配送区域：': '只配送区域：' ">
								<div style="width:300px; line-height:1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 6px;">{{allregion.names}}</div>
								<div>
									<el-button v-if="allregion.names ===''" type="success" icon="el-icon-plus" size="small" @click="choiceRegion()">选择地区</el-button>
									<el-button v-else type="success" size="small" @click="choiceRegion()">编辑</el-button>
								</div>
		          </el-form-item>
							<el-form-item label="状态： ">
								<el-radio-group  v-model="freightData.status">
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
			tips: false,
			options: [],
			specialAreaIds:[],
		  value:'',
			dialogVisible: false,
			distributionArea:false,
			freightData: {
				name: '',
				displayOrder: 0,
				type: 1,
				firstWeight: 1000,
				firstPrice: '',
				secondWeight: 1000,
				secondPrice: '',
				firstNum: 1,
				firstNumPrice: '',
				secondNum: 1,
				secondNumPrice: '',
				specialAreaType: 0,
				isDefault: 0,
				status: 1,
			},
			rules: {
        name: [{ required: true, message: '请输入运费模板名称', trigger: 'blur' }],
        expressId: [{ required: true, message: '请输入物流公司', trigger: 'blur' }],
      },
			allareas: [],
			allregion:{
				ids:'',
				names:''
			},
			index: '',
      list: [],
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
		remoteMethod(query) {
      if (query !== '') {
				this.loading = true
				this.keyword = query
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
				}, 200)
      } else {
        this.options = []
      }
    },
		addTemplate (freightData) {
			let vm = this
			this.$refs[freightData].validate((valid) => {
        if (valid) {
					if(vm.freightData.type === 0){
						let temp = true
						if(vm.freightData.firstWeight === "" || vm.freightData.firstPrice === "" || vm.freightData.secondWeight === "" || vm.freightData.secondWeight == 0 || vm.freightData.secondPrice === ""){
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
								if(value.firstWeight === "" || value.firstPrice === "" || value.secondWeight === "" || value.secondWeight == 0 ||  value.secondPrice === ""){
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
							vm.info()
						}
					}
					if(vm.freightData.type==1){
						let temp = true
						if(vm.freightData.firstNum === "" || vm.freightData.firstNumPrice === "" || vm.freightData.secondNum === "" || vm.freightData.secondNum == 0 || vm.freightData.secondNumPrice === ""){
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
							vm.info()
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
		showRegion(value,index){
			let vm = this 
			vm.dialogVisible = true
		},
		// 添加区域事件
		addArea(){
			let vm = this
			let areas = this.$refs.checkboxArea.getData()
			if (vm.index === '') {
				if(areas.ids.length > 0 || areas.names.length > 0){
					let temp = {
						areaIds: areas.ids,
						names: areas.names.join(';'),
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
				vm.options = resp.list
				vm.loading = false
			})
		},
		deleteRegion(index){
			this.allareas.splice(index,1)
		},
		info(){
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				name: vm.freightData.name,
				expressId: vm.freightData.expressId,
				displayOrder:vm.freightData.displayOrder,
				type: vm.freightData.type,
				firstWeight: vm.freightData.firstWeight,
				secondWeight: vm.freightData.secondWeight,
				firstPrice: vm.freightData.firstPrice,
				secondPrice: vm.freightData.secondPrice,
				firstNum: vm.freightData.firstNum,
				secondNum: vm.freightData.secondNum,
				firstNumPrice: vm.freightData.firstNumPrice,
				secondNumPrice: vm.freightData.secondNumPrice,
				specialAreaType:vm.freightData.specialAreaType,
				isDefault: vm.freightData.isDefault,
				status: vm.freightData.status,
			}
			let temp = this.allareas.map(obj => {
				obj.areaIds = obj.areaIds.join(',')
				delete obj.names
				return obj
			})
			param.areas = temp.length == 0 ? "" : JSON.stringify(temp) 
			console.log(this.allregion)
			param.specialAreaIds = this.allregion.ids ? this.allregion.ids.join(',') : ''
			vm.$post(vm.$api.freight.addTemplate, param).then(resp => {
				this.$message({
					type: 'success',
					message: '保存成功!'
				})
				this.$router.push('/freight')
			})
		}
	},
	created(){
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
}
</style>