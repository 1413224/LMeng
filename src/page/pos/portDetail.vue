<template>
	<div class="port-detail">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>所有符合搜索条件的端口总数 </p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>【{{pid}}】终端列表</h2>
		</div>
		<div class="cont clear">
			<div class="card" @click="openPortVisible" v-has="'@port-detail'" v-if="totalNum != totalNums">
				<div class="add_port">
                    <div class="icon_btn">
                        <i class="el-icon-circle-plus-outline" style="font-size: 40px;"></i>
                        <p>添加新端口</p>
                    </div>
               </div>
            </div>
			<div class="card" v-for="(item, index) in items" :key="item.info">
				<div class="top">
					<div class="right">
						<p class="card-title">编号： {{item.endNo}}</p>
						<p class="label">状态：  {{item.status==1 ? '可用' : '不可用'}}</p>
					</div>
				</div>
				<div class="switch-btn card-btn">
					<el-switch
					  @change="updateAppidEndstatus(item.status, item.endNo, index)"
					  v-has="'edit-port-detail'"
					  v-model="item.status"
					  :active-value="1"
					  :inactive-value="0"
					  active-text="可用">
					</el-switch>
				</div>
			</div>
		</div>
		<el-dialog title="添加新的端口" :visible.sync="portVisible" width="600px">
			<el-form label-width="120px" :model="info" :rules="rules" ref="info" label-position="left">
				<el-form-item label="端口编号：" prop="endNo">
					<el-input v-model="info.endNo" placeholder="请输入端口编号"></el-input>
				</el-form-item>
				<el-form-item label="端口状态">
				    <el-radio-group v-model="info.status">
					    <el-radio :label="1">可用</el-radio>
					    <el-radio :label="0">不可用</el-radio>
				    </el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button @click="portVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAppidEnd">确 定</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
export default {
    data () {
        return {
        	totalNum:'',
        	totalNums: 0,
            info: {
                status: 1,
                endNo: "", 
            },
            rules: {
            	endNo: [{ message: '请输入终端序号', trigger: 'blur' }]
            },
            items: [],
            pid: '',
            portVisible: false,
        }
    },
    methods: {
        getAppidEndList () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
				appId: vm.pid,
				pageSize: 100,
				curPage: 1
			}
			vm.$get(vm.$api.pos.getAppidEndList, param).then(resp => {
				console.log(resp)
				vm.items = resp.list
				vm.totalNums = resp.totalNums
			})
        },
        updateAppidEndstatus(status, endNo, index) {
			let vm = this
			let conftext = '是否修改为不可用的状态?'
			if (status) {
				conftext = '是否修改为可用的状态?'
			}
	        vm.$confirm(conftext, '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	let param = {
	                accountId: localStorage['userId' + sessionStorage['roleTypeId']],
	                status: status,
	                appId: vm.pid,
	                endNo: endNo
	            };
	            vm.$post(vm.$api.pos.updateAppidEndstatus, param).then(resp => {
					vm.$message({
						type: 'success',
						message: '状态切换成功!'
					});
	            });
	        }).catch(() => {
	        	vm.items[index].status = +!status
				vm.$message({
					type: 'info',
					message: '已取消改变终端状态'
				});          
	        });
	    },
        openPortVisible() {
			let vm = this
			vm.info = {
				endNo: '',
				status: 1
			}
			vm.portVisible = true
		},
		addAppidEnd() {
			let vm = this
			this.$refs['info'].validate((valid) => {
				if (valid) {
					let param = {
						accountId: localStorage['userId' + sessionStorage['roleTypeId']],
						status: vm.info.status,
		                appId: vm.pid,
		                endNo: vm.info.endNo
					}
					vm.$post(vm.$api.pos.addAppidEnd, param).then(resp => {
						
						vm.getAppidEndList()
						vm.$message.success('保存成功')
						vm.portVisible = false
					})
				} else {
                    return false
                }
			})
		},
    },
    created () {
    	this.pid = this.$route.query.pid
    	this.totalNum=this.$route.query.totalNum
    	console.log(this.num)
    	this.getAppidEndList()
    }
}
</script>

<style lang="less">
.port-detail {
	.nub-top {
		height: 50px;
		.top-left {
			float: left;
		}
	}
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
	.cont {
		margin: 10px;
		.card {
			width: 266px;
			height: 174px;
			float: left;
			box-shadow:0px 2px 8px 1px rgba(0,0,0,0.09);
			border-radius:2px;
			border:1px solid rgba(232,232,232,1);
			background-color: #fff;
			margin: 10px;
			.add_port {
	            height: 50px;
			    line-height: 30px;
			    text-align: center;
			    margin: 50px;
			    color: #9c9a9a;
			    cursor: pointer;
	        }
			.top {
				height: 110px;
				line-height: 24px;
				padding: 24px 0 0 24px;
				border-bottom: 1px solid #E8E8E8;
				.card-icon {
					width: 24px;
					height: 24px;
					float: left;
					color: #fff;
					text-align: center;
					margin-right: 20px;
					background-color: #4b74ff;
					border-radius:50px;
					border:1px solid #e0dada;
				}
				.right {
					float: left;
					.card-title {
						font-size: 18px;
						font-weight: 500;
						color: rgba(0, 0, 0, 0.85);
						padding-bottom: 15px;
						font-weight: 600;
					}
				}
			}
			.switch-btn {
				height: 40px;
				line-height: 40px;
				/*text-align: center;*/
			}
			.card-btn {
				width: 100%;
				color: #595959;
				background: rgba(247, 249, 250, 1);
			}
		}
	}
	.el-switch {
		padding-left: 24px;
	}
}
</style>