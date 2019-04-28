<template>
	<div class="table">
		<div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>符合条件的桌台数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>桌台管理</h2>
		</div>
		<el-card class="box-card">
			<el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
				        <el-form-item label="桌台号 : ">
	                		<el-input v-model="keyword" placeholder="搜索桌台号"></el-input>
	              		</el-form-item>
			        </el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
			<div>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
	                <!--<div class="port-card add_port" @click="openAlert">
	                    <div class="icon_btn">
	                        <i class="el-icon-circle-plus-outline" style="font-size: 40px;"></i>
	                        <p>添加新端口</p>
	                    </div>
	                </div>-->
	            </el-col>
	            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-for="(item, index) in tableData" :key="index">
	                <div class="port-card">
	                    <div class="card_left">
	                        <p>编号</p>
	                        <p class="font_large">{{index < 9 ? '0' + (index + 1) : index + 1}}</p>
	                    </div>
	                    <div class="card_right">
	                        <p><span>桌台号:</span>{{item.code}}</p>
	                        <p style="padding-top: 30px;"><span>餐品分类名称:</span>{{item.name}}</p>
	                    </div>
	                </div>
	            </el-col>
			</div>
			<div class="message-div" v-if="tableData.length==0" >
				暂无桌台信息
			</div>
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
				class="flex_center">
        		<span style="text-align: center;">{{curPage}}/{{pages}}</span>
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			curPage: 1,
			pageSize: 10,
			pages: 1,
			totalNums: 0,
			keyword: '',
			tableData: [],
			search: {
			    keyword: ''
			},  
		}
	},
	methods: {
	    resetting() {
	      let vm = this
	      vm.keyword = ''
	      vm.search = {
	        keyword: ''
	      }
	      vm.curPage = 1
	      vm.getTableList()
	    },
	    onSearch() {
	      let vm = this
	      vm.search = {
	        // 进行搜索条件缓存
	        keyword: vm.keyword
	      }
	      vm.curPage = 1
	      vm.getTableList()
	    },
	    handleSize(sizeVal) {
	      this.pageSize = sizeVal
	      this.curPage = 1
	      this.getTableList()
	    },
	    handleCurrent(currentVal) {
	      this.curPage = currentVal
	      this.getTableList()
	    },
	    getTableList() {
	      let vm = this
	      let param = Object.assign({}, vm.search, {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
		        curPage: vm.curPage,
		        pageSize: vm.pageSize
	      })
	      vm.$get(vm.$api.restaurant.getTableList, param).then(resp => {
		        vm.tableData = resp.list
		        vm.totalNums = resp.totalNums
		        vm.pages = resp.pages || 1
	      })
	    }
	  },
	  created() {
	    this.getTableList()
	  }
}
</script>

<style lang="less">
.table {
	.box-card {
	    margin: 20px;
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
	.port-card {
        margin: 10px;
        height: 170px;
        line-height: 30px;
        position: relative;
        background-color: #fff;
        min-width: 350px;
        border: 1px solid #e6e3e3;
        .card_left {
            float: left;
            height: 100%;
            width: 76px;
            background-color: #4B74FF;
            text-align: center;
            color: #fff;
            line-height:  60px;
            .font_large {
                font-size: 32px;
            }
        }
        .card_right {
        	font-size: 22px;
            float: left;
            padding: 30px 15px 0 30px;
            .state_back {
                width: 55px;
                height: 32px;
                line-height: 32px;
                color: #fff;
                padding-left: 25px;
                position: absolute;
                top: 15px;
                right: 0px;
                border-radius:100px 0px 0px 100px;
            }
            span {
                width: 160px;
                padding-right: 35px;
                color: #666666;
                display: inline-block;
            }
        }
        .el-button {
    	    position: absolute;
		    top: 105px;
		    right: 20px;
        }
        .icon_btn {
            color: #90A2C7;
            text-align: center;
            padding-top: 48px;
        }
    }
    .add_port {
        &:hover {
            cursor:pointer;		
        }
    }
    .message-div {
    	font-size: 24px;
    	color: #848181;
    	text-align: center;
    	margin-top: 30px;
    }
    .flex_center {
    	width: 100%;
	    padding-top: 20px;
	    display: flex;
	    justify-content: center;
	}
}
</style>