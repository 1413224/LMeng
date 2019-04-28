<template>
    <div class="equipment">
        <!-- <div class="nub-top">
            <h2>设备管理</h2>
        </div> -->
        <div class="nub-top" style="height: 80px;">
            <div class="right-div">
                <p>符合条件的设备总数</p>
                <p class="num">{{ totalNums }}</p>
            </div>
            <h2>设备管理</h2>
        </div>
        <!-- 搜索表单 -->
        <el-card class="box-card">
            <el-row :gutter="40">
                <el-form label-width="80px" label-position="left">
                    <el-col :span="8">
                        <el-form-item label="状态 : " style="padding-left: 10px;">
                            <el-select v-model="status" placeholder="请选择" style="width: 100%;">
                                <el-option :key="-1" label="所有" :value="-1"></el-option>
                                <el-option :key="1" label="空闲" :value="1"></el-option>
                                <el-option :key="2" label="忙" :value="2"></el-option>
                                <el-option :key="3" label="维修" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="设备编号 : ">
                            <el-input v-model="equipNumbers" placeholder="搜索设备编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-button @click="resetting">重置</el-button>
                    </el-col>
                </el-form>
            </el-row>
            <!-- 表格数据 -->
            <el-table :data="equipmentData" style="width: 100%">
                <el-table-column prop="equipNumber" label="设备编号" min-width="120"></el-table-column>
                <el-table-column prop="goodsName" label="设备名称" min-width="120"></el-table-column>
                <el-table-column label="设备图片" min-width="120">
                    <template slot-scope="scope">
                        <img style="width: 50px;" :src="scope.row.goodsLogo.original" />
                    </template>
                </el-table-column>
                <el-table-column prop="sellNums" label="订单数量" min-width="120"></el-table-column>
                <el-table-column prop="sellTotal" label="订单总额" min-width="120"></el-table-column>
                <el-table-column label="状态" min-width="80">
                    <template slot-scope="scope">
                        <el-tag type="info" size="medium" v-if="scope.row.status == 1">空闲</el-tag>
                        <el-tag type="success" size="medium" v-if="scope.row.status == 2">忙</el-tag>
                        <el-tag type="warning" size="medium" v-if="scope.row.status == 3">维修 </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="签约状态" min-width="80">
                    <template slot-scope="scope">
                        <el-tag type="info" size="medium" v-if="scope.row.signedStatus == 0">未签约</el-tag>
                        <el-tag type="success" size="medium" v-if="scope.row.signedStatus == 1">签约中</el-tag>
                        <el-tag type="success" size="medium" v-if="scope.row.signedStatus == 2">已过期 </el-tag>
                        <el-tag type="danger" size="medium" v-if="scope.row.signedStatus == 3">签约中 </el-tag>
                        <el-tag type="danger" size="medium" v-if="scope.row.signedStatus == 4">已作废 </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination ref="paging" @size-change="handleSize" @current-change="handleCurrent" :current-page.sync="curPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" layout="sizes, prev, slot, next" prev-text="上一页" next-text="下一页" :total="totalNums" class="flex_center">
                <span style="text-align: center;">{{curPage}}/{{pages}}</span>
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      status: -1,
      equipNumbers: '',
      equipmentData: [],
      curPage: 1,
      pages: 1,
      pageSize: 10,
      totalNums: 0,
      search: {
        status: -1,
        equipNumbers: ''
      }
    }
  },
    beforeRouteEnter (to, from, next){
        next(vm => {
            vm.getEquipmentList()
        })
    },
  methods: {
    resetting() {
      let vm = this
      vm.status = -1
      vm.equipNumbers = ''
      vm.search = {
        status: -1,
        equipNumbers: ''
      }
      vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
      vm.getEquipmentList()
    },
    onSearch() {
      let vm = this
      vm.equipmentData = []
      vm.totalNums = 0
      vm.search = {
        // 进行搜索条件缓存l
        status: vm.status,
        equipNumber: vm.equipNumbers
      }
      vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
      vm.getEquipmentList()
    },
    handleSize(sizeVal) {
      this.pageSize = sizeVal
      this.curPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.getEquipmentList()
    },
    handleCurrent(currentVal) {
      this.curPage = currentVal
      this.getEquipmentList()
    },
    getEquipmentList() {
      let vm = this
      let param = Object.assign({}, vm.search, {
        accountId: localStorage['userId' + sessionStorage['roleTypeId']],
        curPage: vm.curPage,
        pageSize: vm.pageSize
      })
      vm.$get(vm.$api.equipment.getEquipmentList, param).then(resp => {
        // console.log(resp)
        vm.equipmentData = resp.lists.list
        vm.totalNums = resp.lists.totalNums
        vm.pages = resp.lists.pages || 1
      })
    }
  }
}
</script>
<style lang="less">
.equipment {
  .form-flex {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
  }
  .box-card {
    margin: 20px;
  }
  .flex_center {
    padding-top: 20px;
    display: flex;
    justify-content: center;
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

