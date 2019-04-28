<template>
  <div class="administration">
    <div class="nub-top" style="height: 80px;">
			<!-- <div class="right-div">
				<p>符合条件的分类管理总数</p>
				<p class="num">{{ totalNums }}</p>
			</div> -->
			<h2>分类管理</h2>
		</div>
    <el-card class="box-card">
			<el-form label-width="80px" label-position="left">
			    <el-row :gutter="40">
            <el-col :span="8">
						    <el-form-item label="状态 : ">
						    	<el-select v-model="status" clearable placeholder="全部" style="width: 100%;">
                    <el-option label="全部" :value="2"></el-option>
						    		<el-option label="可用" :value="1"></el-option>
						    		<el-option label="禁用" :value="0"></el-option>
						    	</el-select>
						    </el-form-item>
					    </el-col>
            <el-col :span="8">
						  <el-form-item label="搜索 : ">
							  <el-input v-model="keyword" placeholder="搜索"></el-input>
						  </el-form-item>
					  </el-col>
					  <el-col :span="8">
						  <el-button type="primary" @click="onSearch">查询</el-button>
						  <el-button @click="resetting">重置</el-button>
					  </el-col>
			    </el-row>
			</el-form>
			<div style="padding: 10px;">
        <el-button type="primary" size="small" @click="topLevelClass = true">添加顶级分类</el-button>
      </div>
			<!-- 表格数据 -->
			<div class="border">
				<div style="font-size: 14px;padding: 10px 0;border-bottom: 2px solid #ebeef5;">
					<span style="margin-left:50px;">名称</span>
					<span style="margin-left:400px;">状态</span>
					<span style="margin-left:100px;">操作</span>
				</div>
				<div class="block">
					<el-tree
						:data="arrData"
						:props="props"
						:load="loadNode"
						lazy
						show-checkbox
						node-key="id"
						@check-change="handleCheckChange"
						:expand-on-click-node="false">
						<span class="custom-tree-node" slot-scope="{ node, data }">
  					  <span class="span">{{ node.label }}</span>
  					  <span style="width: 240px;display: flex;justify-content: space-between;">
								<span>
									<el-tag v-if="data.status==1" size="mini" class="mouse-hand" type="success" @click.native="openConfirm(data, '是否将此商品禁用?', 0, changeCategoryStatusById)">可用</el-tag>
									<el-tag v-else size="mini" class="mouse-hand" type="info" @click.native="openConfirm(data, '是否将此商品启用?', 1, changeCategoryStatusById)">禁用</el-tag>
								</span>
								<span>
									<el-tooltip v-if="data.level!=4" class="item" effect="dark" content="添加子分类" placement="top">
										<el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" plain @click="() => append(data)"></el-button>
									</el-tooltip>
									<el-tooltip class="item" effect="dark" content="编辑" placement="top">
										<el-button size="mini" type="primary" icon="el-icon-edit-outline" plain @click="() => getNode(node)"></el-button>
									</el-tooltip>
									<el-tooltip class="item" effect="dark" content="删除" placement="top">
										<el-button size="mini" type="danger" icon="el-icon-delete" plain @click="() => remove(node, data)"></el-button>
									</el-tooltip>
								</span>
  					  </span>
  					</span>
					</el-tree>
  			</div>
			</div>
		</el-card>
		<!-- 添加子级分类 -->
		<el-dialog
		  title="添加子分类"
		  :visible.sync="dialogVisible"
		  width="700px"
		  :before-close="handleClose">
			<div class="add-subclass">
				<el-form :model="subForm" :rules="rules" ref="subForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="上级分类：">
				    <el-input v-model="subForm.superior" disabled></el-input>
				  </el-form-item>
					<el-form-item label="排序：">
				    <el-input v-model="subForm.displayOrder" @keyup.native="subForm.displayOrder=subForm.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
				  </el-form-item>
					<el-form-item label="分类名称：" prop="name">
				    <el-input v-model="subForm.name"></el-input>
				  </el-form-item>
					<el-form-item label="描述：" >
				    <el-input v-model="subForm.description"></el-input>
				  </el-form-item>
					<el-form-item label="分类logo：">
            <el-upload id="logo-upload" class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequest">
              <div v-if="imageUrl" class="avatar">
                <img :src="imageUrl" class="image">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
					<el-form-item label="显示状态：">
						<el-radio-group  v-model="subForm.status">
		          <el-radio :label="1">是</el-radio>
		          <el-radio :label="0">否</el-radio>
		        </el-radio-group>
				  </el-form-item>
				  <el-form-item >
				    <el-button type="primary" @click="addSubForm('subForm')">立即创建</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 添加顶级分类 -->
		<el-dialog
		  title="添加顶级分类"
		  :visible.sync="topLevelClass"
		  width="700px"
		  :before-close="handleClose">
			<div class="add-subclass">
				<el-form :model="topLevelForm" :rules="topLevelRules" ref="topLevelForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="上级分类：">
				    <el-input v-model="topLevelForm.superior" disabled></el-input>
				  </el-form-item>
					<el-form-item label="排序：">
				    <el-input v-model="topLevelForm.displayOrder" @keyup.native="topLevelForm.displayOrder=topLevelForm.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
				  </el-form-item>
					<el-form-item label="分类名称：" prop="name">
				    <el-input v-model="topLevelForm.name"></el-input>
				  </el-form-item>
					<el-form-item label="描述：" >
				    <el-input v-model="topLevelForm.description"></el-input>
				  </el-form-item>
					<el-form-item label="分类logo：">
            <el-upload id="logo-upload" class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequest">
              <div v-if="imageUrl" class="avatar">
                <img :src="imageUrl" class="image">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
					<el-form-item label="显示状态：">
						<el-radio-group  v-model="topLevelForm.status">
		          <el-radio :label="1">是</el-radio>
		          <el-radio :label="0">否</el-radio>
		        </el-radio-group>
				  </el-form-item>
				  <el-form-item >
				    <el-button type="primary" @click="addTopLevelClassIfication('topLevelForm')">立即创建</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 编辑分类信息 -->
		<el-dialog
		  title="编辑分类"
		  :visible.sync="editClassIfication"
		  width="700px"
		  :before-close="handleClose">
			<div class="add-subclass">
				<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="上级分类：">
				    <el-input v-model="editForm.superior " disabled></el-input>
				  </el-form-item>
					<el-form-item label="排序：">
				    <el-input v-model="editForm.displayOrder" @keyup.native="editForm.displayOrder=editForm.displayOrder.toString().replace(/[^\d]/g, '')" placeholder="请输入0-9字符组成的数值"></el-input>
				  </el-form-item>
					<el-form-item label="分类名称：" prop="name">
				    <el-input v-model="editForm.name"></el-input>
				  </el-form-item>
					<el-form-item label="描述：" >
				    <el-input v-model="editForm.description"></el-input>
				  </el-form-item>
					<el-form-item label="分类logo：">
            <el-upload id="logo-upload" class="avatar-uploader" action="http://47.104.187.243:18666/datacenter/v1/fileupload/image" :show-file-list="false" :before-upload="beforeUpload" :http-request="imgRequest">
              <div v-if="imageUrl" class="avatar">
                <img :src="imageUrl" class="image">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
					<el-form-item label="显示状态：">
						<el-radio-group  v-model="editForm.status">
		          <el-radio :label="1">是</el-radio>
		          <el-radio :label="0">否</el-radio>
		        </el-radio-group>
				  </el-form-item>
				  <el-form-item >
				    <el-button type="primary" @click="sureClassIfication('editForm')">保存</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
  </div>
</template>
<script>
export default {
	data(){
		return{
			// totalNums:0,
			keyword:'',
			arrData:[],
			// 子分类
			dialogVisible: false,
			// 顶分类
			topLevelClass:false,
			// 编辑分类
			editClassIfication:false,
			// 子级表格
			subForm: {
				name: '',
				displayOrder:'',
				superior:'',
				description:'',
				status:1,
				logoId:'',
			},
			status:2,
			search: { // 进行搜索条件缓存
				keyword:'',
				status: 2,
			},
			// 顶级表格
			topLevelForm:{
				name: '',
				displayOrder:'',
				superior:'顶级分类',
				description:'',
				status:1,
				logoId:'',
			},
			// 编辑表格
			editForm:{},
			imageUrl:'',
			props: {
        label: 'name',
        children: 'zones'
      },
			rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
			},
			topLevelRules:{
				name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
			},
			editRules:{
				name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
			},
			parentId:'',
			isShow : true,
			editCateId:'',
			imageId:'',
			parentIds:''
		}
	},
	methods: {
		onSearch () {
			let vm = this
			vm.arrData = []
			vm.search = { // 进行搜索条件缓存
				keyword:vm.keyword,
				status:vm.status,
			}
			vm.getCategoryList()
		},
		resetting () {
			let vm = this
			vm.status = 2,
      vm.keyword = ''
			vm.arrData = []
			vm.search = {
				status:2,
				keyword:'',
			}
			vm.getCategoryList()
    },
		loadNode(node, resolve) {
			let vm = this
      if (node.level > 3){
				return resolve([])
			} 
			var hasChild;
			if (node.data.name) {
				hasChild = true
      } else {
				hasChild = false
			}
			let subClassification = []
      if (hasChild) {
      	let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					type: 3,
					cateId: node.data.id,
					loading: true
				}
				vm.$get(vm.$api.buy.getCategoryList,param).then(resp => {
					resp.forEach(value=>{
						let temp = {
							level:value.level,
							id:value.cateId,
							name:value.name,
							status:value.status
						}
						subClassification.push(temp)
					})
					resolve(subClassification);
				}).catch(err => {
					resolve([])
				})
      } else {
				resolve([])
			}
    },
		append(data) {
			let vm = this 
			vm.dialogVisible = true
			vm.parentId = data.id
			vm.subForm.superior = data.name
			vm.subForm = {
				superior:data.name,
				name: '',
				displayOrder:'',
				description:'',
				status:1,
				logoId:'',
			}
		},
		openConfirm(id,text,value,callback){
			this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
				callback(id,value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
		},
		changeCategoryStatusById(item,value){
			let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
        cateId: item.id,
        status: value
			}
			vm.$post(vm.$api.buy.changeCategoryStatusById, param).then(resp => {
				item.status = value
				this.$message({
					type: 'success',
					message: '操作成功!'
				})
			})
		},
		// 编辑子分类
		getNode(data){
			let vm = this 
			vm.editCateId = data.data.id
			vm.parentIds = data.level == 1 ? "" : data.parent.data.id
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				cateId:data.data.id
			}
			vm.$get(vm.$api.buy.getCategoryInfoById,param).then(resp=>{
				vm.editForm = resp 
				vm.editForm.superior =  vm.editForm.parentInfo == null ? '顶级分类' : vm.editForm.parentInfo.name
				vm.imageUrl =  vm.editForm.logoUrl ?  vm.editForm.logoUrl.original : "" 
				vm.imageId = vm.editForm.logoUrl ?  vm.editForm.logoUrl.imageId : "" 
			})
			vm.editClassIfication = true
		},
		// 编辑提交
		sureClassIfication(formName){
			let vm = this
			this.$refs[formName].validate((valid) => {
        if (valid) {
					let param = {
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						cateId:vm.editCateId,
						type: 3,
						name:vm.editForm.name,
						description:vm.editForm.description,
						code:vm.editForm.code,
						displayOrder:vm.editForm.displayOrder,
						parentId:vm.parentIds,
						status:vm.editForm.status,
					}
					param.logoId = vm.imageId
					vm.$post(vm.$api.buy.editCategoryInfoById,param).then(resp => {
						vm.editClassIfication = false
						vm.$message({
          		message: '保存成功',
          		type: 'success'
						})
						this.getCategoryList()
					})
        } else {
          return false
        }
      })
		},
		// 删除子分类
    remove(node, data) {
			this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
				let vm = this
				let param = {
					accountId: localStorage['userId'+sessionStorage['roleTypeId']],
					cateId:data.id
				}
				vm.$post(vm.$api.buy.delCategory,param).then(resp=>{
					vm.$message({
          	type: 'success',
          	message: '删除成功!'
					});
					this.getCategoryList()
				})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
		// 添加子分类
		addSubForm(formName){
			console.log(this.subForm)
			let vm = this
			this.$refs[formName].validate((valid) => {
        if (valid) {
					// addCategory
					let param = Object.assign({},vm.subForm,{
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						type: 3,
						parentId: vm.parentId
					})
					vm.$post(vm.$api.buy.addCategory,param).then(resp => {
						vm.dialogVisible = false
						vm.$message({
          		message: '保存成功',
          		type: 'success'
						})
						this.getCategoryList()
					})
        } else {
          return false;
        }
      });
		},
		// 添加顶级分类
		addTopLevelClassIfication(formName){
			let vm = this
			this.$refs[formName].validate((valid) => {
        if (valid) {
					let param = Object.assign({},vm.topLevelForm,{
						accountId: localStorage['userId'+sessionStorage['roleTypeId']],
						type: 3,
					})
					vm.$post(vm.$api.buy.addCategory,param).then(resp => {
						vm.topLevelClass = false
						vm.$message({
          		message: '保存成功',
          		type: 'success'
						})
						this.getCategoryList()
					})
        } else {
          return false;
        }
      });
		},
		getCategoryList(){
      let vm = this
			let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				level:1,
        type: 3,
			})
      vm.$get(vm.$api.buy.getCategoryList,param).then(resp=>{
				let arr = []
				resp.forEach(value => {
					let temp = {
						id:value.cateId,
						name:value.name,
						level:value.level,
						status:value.status
					}
					arr.push(temp)
				})
				vm.arrData = arr
      })
		},
		// 图片上传
		imgRequest(obj) {
      // 图片上传
      let vm = this
      let temp = {
        file: obj.file,
        type: 'common',
        name: 'logo-upload'
      }
      this.$post(vm.$api.share.upImage, temp).then(resp => {
        vm.imageUrl = URL.createObjectURL(obj.file)
				vm.subForm.logoId = resp.fileId
				vm.topLevelForm.logoId = resp.fileId
				vm.imageId = resp.fileId
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
	},
	created () {
		this.getCategoryList()
	}
}
</script>
<style lang="scss">
.administration{
  .nub-top {
		height: 50px;
    .right-div {
		  float: right;
		  color: rgba(0, 0, 0, 0.45);
		  text-align: center;
		  padding: 0 20px;
		  margin: 10px;
		  border-left: 1px solid #ccc;
		  .num {
		  	font-size: 32px;
		  	color: #000;
		  }
	  }
	}
  .box-card{
    margin: 20px;
    .border {
		  border-top: 2px solid #ebeef5;
			color: #606266;
			.block{
				padding: 20px;
				.el-tree{
					width: 700px;
					.el-tree-node{
						padding: 11px 0px 2px 0px;
						.custom-tree-node{
							width: 100%;
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
	  }
  }
	.add-subclass{
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
	}
}
</style>


