<template>
    <div class="separate">
        <div class="nub-top">
			<h2>分润详情</h2>
		</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>本店会员分润机制</span>
            </div>
			<div class="alert">
				<div class="spot"></div>
				<div>产业联盟分润</div>
				<div class="spot danger"></div>
				<div class="danger-font">产业联盟减免分润</div>
            </div>
			<table class="table-por">
				<tr class="table-flex">
					<th class="profit">分润机制</th>
					<th class="status">状态</th>
					<th v-for="item in roleInfo" :key="item.code" class="item">{{item.name}}</th>
				</tr>
				<tr class="table-flex" v-for="(separateItem, index) in separateData" :key="index">
					<td class="profit column">
						<span>{{separateItem.name}}</span>
						<p>{{separateItem.startTime}}</p>
						<p>~</p>
						<p>{{separateItem.endTime}}</p>
					</td>
					<td class="status">
						<el-tag v-if="separateItem.status == 0" type="info">未生效</el-tag>
						<el-tag v-else-if="separateItem.status == 1" type="success">生效中</el-tag>
						<el-tag v-else type="danger">已过期</el-tag>
					</td>
					<td v-for="item in roleInfo" :key="item.code" class="item">
						<span v-if="keyValue(separateItem.allowChains, item.code)" class="success">{{keyValue(separateItem.allowChains, item.code).rate}}</span>
						<span v-if="keyValue(separateItem.freeChains, item.code)" class="danger">{{keyValue(separateItem.freeChains, item.code).rate}}</span>
					</td>
				</tr>
			</table>
        </el-card>
        <el-card class="box-card">
			<div slot="header" class="clearfix">
                <span>非本店会员分润机制</span>
            </div>
			<div class="alert">
				<div class="spot"></div>
				<div>产业联盟分润</div>
				<div class="spot danger"></div>
				<div class="danger-font">产业联盟减免分润</div>
            </div>
			<table class="table-por">
				<tr class="table-flex">
					<th class="profit">分润机制</th>
					<th class="status">状态</th>
					<th v-for="item in roleInfo" :key="item.code" class="item">{{item.name}}</th>
				</tr>
				<tr class="table-flex" v-for="(separateItem, index) in noseparateData" :key="index">
					<td class="profit column">
						<span>{{separateItem.name}}</span>
						<p>{{separateItem.startTime}}</p>
						<p>~</p>
						<p>{{separateItem.endTime}}</p>
					</td>
					<td class="status">
						<el-tag v-if="separateItem.status == 0" type="info">未生效</el-tag>
						<el-tag v-else-if="separateItem.status == 1" type="success">生效中</el-tag>
						<el-tag v-else type="danger">已过期</el-tag>
					</td>
					<td v-for="item in roleInfo" :key="item.code" class="item">
						<span v-if="keyValue(separateItem.allowChains, item.code)" class="success">{{keyValue(separateItem.allowChains, item.code).rate}}</span>
						<span v-if="keyValue(separateItem.freeChains, item.code)" class="danger">{{keyValue(separateItem.freeChains, item.code).rate}}</span>
					</td>
				</tr>
			</table>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
        	separateData: [],
        	noseparateData: [],
            pid: '',
			info: {},
			roleInfo: []
        }
    },
    methods: {
        getEspecialChain () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			}
			vm.$get(vm.$api.setting.getEspecialChain, param).then(resp => {
				vm.separateData = resp.memberChain
				vm.noseparateData = resp.nonMemberChain
			})
		},
		getAllianceRoleInfo () {
            let vm = this
			let param = {
				accountId: localStorage['userId'+sessionStorage['roleTypeId']],
			}
			vm.$get(vm.$api.setting.getAllianceRoleInfo, param).then(resp => {
				vm.roleInfo = resp
			})
		},
		keyValue (arr, key) {
			let temp = arr.find(obj => {
				return obj.code == key
			})
			return temp
		},
		// hasCharacterFrom (key) {
		// 	return character => character.env === key;
		// }
    },
    created () {
		this.getAllianceRoleInfo()
    	this.getEspecialChain();
//      this.pid = this.$route.query.pid
//      if (this.pid) {
//          this.getEspecialChain(this.pid)
//      } else {
//          this.$message({
//              type: 'error',
//              message: '错误的访问'
//          })
//      }
    }
}
</script>

<style lang="less">
.separate {
    font-size: 16px;
    .box-card {
        margin: 20px;
    }
    .separate-cont {
        line-height: 40px;
        span {
            display: inline-block;
            width: 120px;
        }
	}
	.table-por {
		width: 100%;
		tr {
			padding: 10px 0;
			border-bottom: 1px solid #ebeef5;
		}
		.table-flex {
			display:flex;
			.item {
				flex: 1;
				display:flex;
				justify-content: center;
				align-items: center;
				.success {
					color: #67C23A;
				}
				.danger {
					color: #F56C6C;
				}
			}
			.status {
				width: 70px;
				display:flex;
				justify-content: center;
				align-items: center;
			}
			.profit {
				width: 100px;
				display:flex;
				justify-content: center;
				align-items: center;
			}
			.column {
				flex-direction: column;
			}
		}
	}
	.alert {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #67C23A;
		.spot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: #67C23A;
			margin: 0 10px 0 20px;
		}
		.danger {
			background-color: #F56C6C;
		}
		.danger-font {
			color: #F56C6C;
		}
	}
}
</style>

