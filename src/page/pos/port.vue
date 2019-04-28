<template>
    <div class="port" ref="port">
        <!-- <div class="nub-top">
			<h2>收银系统端口</h2>
		</div> -->
        <div class="nub-top" style="height: 80px;">
			<div class="right-div">
				<p>收银系统端口总数</p>
				<p class="num">{{ totalNums }}</p>
			</div>
			<h2>收银系统端口</h2>
		</div>
        <el-row class="row">
        	<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
                <div class="port-card add_port" @click="openAlert">
                    <div class="icon_btn">
                        <i class="el-icon-circle-plus-outline" style="font-size: 40px;"></i>
                        <p>添加新端口</p>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" v-for="(item, index) in portData" :key="index">
                <div class="port-card">
                    <div class="card_left">
                        <p>编号</p>
                        <p class="font_large">{{index < 9 ? '0' + (index + 1) : index + 1}}</p>
                    </div>
                    <div class="card_right">
                        <div class="state_back" :style="item.status ? 'background-color:#00DB83;' : 'background-color:#FF5365;'">
                            {{item.status ? '可用' : '禁用'}}
                        </div>
                        <p><span>端口号</span>{{item.appId}}</p>
                        <p><span>已开通端口数量</span>{{item.num}}</p>
                        <p><span>可开通端口数量</span>{{item.totalNum}}</p>
                        <p><span>创建时间</span>{{item.createTime | formatDate}}</p>
                    </div>
                    <div class="datail">
                    	<el-tooltip class="item" effect="dark" content="详情" placement="top" v-has="'port-detail'">
							<el-button
							type="primary"
							size="small"
							style="font-size: 26px;"
							icon="el-icon-document"
							plain
							@click="goDetail(item.appId,item.totalNum)"></el-button>
						</el-tooltip>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            colSpan: 6,
            curPage: 1,
            pageSize: 100,
            portData: [],
            totalNums: 0
        }
    },
    methods: {
        getAppidList () {
            let vm = this
			let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']],
                curPage: vm.curPage,
                pageSize: vm.pageSize
			}
			vm.$get(vm.$api.pos.getAppidList, param).then(resp => {
                vm.portData = resp.list
                vm.totalNums = resp.totalNums
			})
        },
        dynamicRow () {
            let wid = this.$refs['port'].clientWidth
            if (wid < 1500) {
                this.colSpan = 8
            }
        },
        openAlert() {
            let vm = this
            let param = {
                accountId: localStorage['userId'+sessionStorage['roleTypeId']]
            }
            vm.$get(vm.$api.setting.getContactInfo, param).then(resp => {
                vm.$alert(resp.contact, resp.name, {
                    dangerouslyUseHTMLString: true
                });
            })
        },
        goDetail (id,totalNum) {
			this.$router.push({ path: 'port-detail', query: { pid: id ,totalNum:totalNum}})
		}
    },
    mounted () {
        this.dynamicRow()
        this.getAppidList()
    }
}
</script>

<style lang="less">
.port {
    .row {
        padding: 10px;
    }
    .port-card {
        margin: 10px;
        height: 170px;
        line-height: 30px;
        position: relative;
        background-color: #fff;
        min-width: 350px;
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
            float: left;
            padding: 30px 15px 0px;
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
                width: 140px;
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
</style>


