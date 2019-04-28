<template>
  <div class="result-detail">
    <div class="nub-top" style="height: 40px;">
      <h2>周末抽奖结果</h2>
			<div class="right">
        <!-- <a tyle="padding:10px 40px;" :href="url">导出</a> -->
        <!-- <el-button type="primary" style="padding:10px 40px;" @click="onExport">导出</el-button> -->
			</div>
		</div>
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
				<span style="font-weight: 700;color: rgb(76, 76, 76);">基本信息</span>
			</div>
      <el-row>
        <el-col :span="3">
          <div class="basic-detail" style="border:none;">
            <p>期数（官方）</p>
            <p style="font-size:24px;color:#336FFF;margin-top:10px;">{{info.number}}</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="basic-detail">
            <p>开奖时间</p>
            <p style="width:100px;margin-top:10px;">{{info.lotteryTime | formatDate}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="basic-detail">
            <p>本店中奖人数</p>
            <p style="font-size:24px;">{{info.allianceNums}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="basic-detail">
            <p>平台中奖人数</p>
            <p style="font-size:24px;">{{info.nums}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="basic-detail">
            <p>本店中奖金额</p>
            <p style="font-size:24px;">{{info.allianceBonus | browsingVolume}}</p>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="basic-detail">
            <p>平台中奖金额</p>
            <p style="font-size:24px;">{{info.bonus | browsingVolume}}</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 奖项信息 -->
    <el-card class="prize">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6" v-for="itme in info.awardInfo" :key="itme.awardId">
          <div class="prize-detail">
            <img v-if="itme.awardName == '一等奖'" src="../../assets/images/Bitmap@1.png" alt="">
            <img v-if="itme.awardName == '二等奖'" src="../../assets/images/Bitmap@2.png" alt="">
            <img v-if="itme.awardName == '三等奖'" src="../../assets/images/Bitmap@3.png" alt="">
            <img v-if="itme.awardName == '幸运奖'" src="../../assets/images/Bitmap@4.png" alt="">
            <div style="padding-left:10px;">
              <h4 style="font-weight:700;">{{itme.awardName}}</h4>
              <div class="number">
                <div class="store-number">
                  <p>本店中奖人数</p>
                  <p>{{itme.allianceNums}}</p>
                </div>
                <div class="platform-number">
                  <p>平台中奖人数</p>
                  <p>{{itme.number}}</p>
                </div>
              </div>
              <div class="proportion">
                <p>中奖占比</p>
                <el-progress :stroke-width="4"  :percentage="itme.numsRate*100 | browsingVolume"></el-progress>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 中奖人员 -->
    <el-card class="box-card" v-if="oneTableData.length != 0">
      <!-- <div slot="header" class="clearfix">
				<span style="font-weight: 700;color: rgb(76, 76, 76);">中奖人员</span>
			</div> -->
      <div class="reward" >
        <div style="padding:20px 0px 20px 10px;color: rgb(76, 76, 76);border-bottom: 1px solid rgb(190, 190, 190);">一等奖中奖人员</div>
        <div style="padding:20px;">
          <el-table :data="oneTableData" style="width: 100%">
            <el-table-column prop="mobile" label="会员手机号" min-width="105"></el-table-column>
            <el-table-column prop="nickname" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="bonus" label="中奖金额" min-width="90"></el-table-column>
            <el-table-column prop="subOrderPrice" label="消费金额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="subOrderPrice" label="消费总额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="消费门店" min-width="90"></el-table-column>
            <el-table-column label="消费时间" min-width="90">
              <template slot-scope="scope">
                <div style="width: 90px;">{{scope.row.orderFinishTime | formatDate}}</div>
              </template>
            </el-table-column>
            <el-table-column label="领奖时间" min-width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status != 60">暂未领奖</div>
                <div v-else style="width: 90px;">{{scope.row.getBonusTime | formatDate}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          ref="paging"
          @size-change="oneHandleSize"
          @current-change="oneHandleCurrent"
          :current-page.sync="curPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="onePageSize"
          layout="sizes, prev, slot, next"
          prev-text="上一页"
          next-text="下一页"
          :total="oneTotalNums"
          class="flex_center">
            <span style="text-align: center;">{{oneCurPage}}/{{onePages}}</span>
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card" v-if="twoTableData.length != 0">
      <div class="reward" >
        <div style="padding:20px 0px 20px 10px;color: rgb(76, 76, 76);border-bottom: 1px solid rgb(190, 190, 190);">二等奖中奖人员</div>
        <div style="padding:20px;">
          <el-table :data="twoTableData" style="width: 100%">
            <el-table-column prop="mobile" label="会员手机号" min-width="105"></el-table-column>
            <el-table-column prop="nickname" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="bonus" label="中奖金额" min-width="90"></el-table-column>
            <el-table-column prop="subOrderPrice" label="消费金额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="subOrderPrice" label="消费总额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="消费门店" min-width="90"></el-table-column>
            <el-table-column label="消费时间" min-width="90">
              <template slot-scope="scope">
                <div style="width: 90px;">{{scope.row.orderFinishTime | formatDate}}</div>
              </template>
            </el-table-column>
            <el-table-column label="领奖时间" min-width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status != 60">暂未领奖</div>
                <div v-else style="width: 90px;">{{scope.row.getBonusTime | formatDate}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          ref="paging"
          @size-change="twoHandleSize"
          @current-change="twoHandleCurrent"
          :current-page.sync="twoCurPage"
            :page-sizes="[5, 10, 20, 50]"
          :page-size="twoPageSize"
          layout="sizes, prev, slot, next"
          prev-text="上一页"
          next-text="下一页"
          :total="twoTotalNums"
          class="flex_center">
            <span style="text-align: center;">{{twoCurPage}}/{{twoPages}}</span>
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card" v-if="threeTableData.length != 0">
      <div class="reward" >
        <div style="padding:20px 0px 20px 10px;color: rgb(76, 76, 76);border-bottom: 1px solid rgb(190, 190, 190);">三等奖中奖人员</div>
        <div style="padding:20px;">
          <el-table :data="threeTableData" style="width: 100%">
            <el-table-column prop="mobile" label="会员手机号" min-width="105"></el-table-column>
            <el-table-column prop="nickname" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="bonus" label="中奖金额" min-width="90"></el-table-column>
            <el-table-column prop="subOrderPrice" label="消费金额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="subOrderPrice" label="消费总额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="消费门店" min-width="90"></el-table-column>
            <el-table-column label="消费时间" min-width="90">
              <template slot-scope="scope">
                <div style="width: 90px;">{{scope.row.orderFinishTime | formatDate}}</div>
              </template>
            </el-table-column>
            <el-table-column label="领奖时间" min-width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status != 60">暂未领奖</div>
                <div v-else style="width: 90px;">{{scope.row.getBonusTime | formatDate}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          ref="paging"
          @size-change="threeHandleSize"
          @current-change="threeHandleCurrent"
          :current-page.sync="threeCurPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="threePageSize"
          layout="sizes, prev, slot, next"
          prev-text="上一页"
          next-text="下一页"
          :total="threeTotalNums"
          class="flex_center">
            <span style="text-align: center;">{{threeCurPage}}/{{threePages}}</span>
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card" v-if="luckyTableData.length != 0">
      <div class="reward">
        <div style="padding:20px 0px 20px 10px;color: rgb(76, 76, 76);border-bottom:1px solid rgb(190, 190, 190);">幸运奖中奖人员</div>
        <div style="padding:20px;">
          <el-table :data="luckyTableData" style="width: 100%">
            <el-table-column prop="mobile" label="会员手机号" min-width="105"></el-table-column>
            <el-table-column prop="nickname" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="bonus" label="中奖金额" min-width="90"></el-table-column>
            <el-table-column prop="subOrderPrice" label="消费金额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="subOrderPrice" label="消费总额" min-width="90">
              <template slot-scope="scope">
                {{scope.row.subOrderPrice | browsingVolume}}
              </template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="消费门店" min-width="90"></el-table-column>
            <el-table-column label="消费时间" min-width="90">
              <template slot-scope="scope">
                <div style="width: 90px;">{{scope.row.orderFinishTime | formatDate}}</div>
              </template>
            </el-table-column>
            <el-table-column label="领奖时间" min-width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.status != 60">暂未领奖</div>
                <div v-else style="width: 90px;">{{scope.row.getBonusTime | formatDate}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          ref="paging"
          @size-change="luckyHandleSize"
          @current-change="luckyHandleCurrent"
          :current-page.sync="luckyCurPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="luckyPageSize"
          layout="sizes, prev, slot, next"
          prev-text="上一页"
          next-text="下一页"
          :total="luckyTotalNums"
          class="flex_center">
            <span style="text-align: center;">{{luckyCurPage}}/{{luckyPages}}</span>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      oneTableData:[],
      twoTableData:[],
      threeTableData:[],
      luckyTableData:[],
      oneTotalNums:0,
      oneCurPage: 1,
      onePageSize: 5,
      onePages: 1,
      twoTotalNums:0,
      twoCurPage: 1,
      twoPageSize: 5,
      twoPages: 1,
      threeTotalNums:0,
      threeCurPage: 1,
      threePageSize: 5,
      threePages: 1,
      luckyTotalNums:0,
      luckyCurPage: 1,
      luckyPageSize: 5,
      luckyPages: 1,
      lotteryId:'',
      info:[],
      oneAwardId:'',
      twoAwardId:'',
      threeAwardId:'',
      luckyAwardId:'',
      url:''
    }
  },
  methods: {
    oneHandleSize(sizeVal) {
      this.onePageSize = sizeVal
      this.oneCurPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.oneGetLotteryUserListById(this.oneAwardId)
    },
    oneHandleCurrent(currentVal) {
      this.oneCurPage = currentVal
      this.oneGetLotteryUserListById(this.oneAwardId)
    },
    twoHandleSize(sizeVal) {
      this.twoPageSize = sizeVal
      this.twoCurPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.twoGetLotteryUserListById(this.twoAwardId)
    },
    twoHandleCurrent(currentVal) {
      this.twoCurPage = currentVal
      this.twoGetLotteryUserListById(this.twoAwardId)
    },
    threeHandleSize(sizeVal) {
      this.threePageSize = sizeVal
      this.threeCurPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.threeGetLotteryUserListById(this.threeAwardId)
    },
    threeHandleCurrent(currentVal) {
      this.threeCurPage = currentVal
      this.threeGetLotteryUserListById(this.threeAwardId)
    },
    luckyHandleSize(sizeVal) {
      this.luckyPageSize = sizeVal
      this.luckyCurPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.luckyGetLotteryUserListById(this.luckyAwardId)
    },
    luckyHandleCurrent(currentVal) {
      this.luckyCurPage = currentVal
      this.luckyGetLotteryUserListById(this.luckyAwardId)
    },
    getLotteryInfoById(){
      let vm = this
      let param = {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        lotteryId:vm.lotteryId
      }
      vm.$get(vm.$api.result.getLotteryInfoById,param).then(resp => {
        vm.info = resp
        for (var i = 0; i < vm.info.awardInfo.length; i++) {
          vm.oneAwardId = vm.info.awardInfo[0] ? vm.info.awardInfo[0].awardId : ''
          vm.twoAwardId = vm.info.awardInfo[1] ? vm.info.awardInfo[1].awardId : ''
          vm.threeAwardId = vm.info.awardInfo[2] ? vm.info.awardInfo[2].awardId : ''
          vm.luckyAwardId = vm.info.awardInfo[3] ? vm.info.awardInfo[3].awardId :''
        }
        this.oneGetLotteryUserListById(vm.oneAwardId)
        this.twoGetLotteryUserListById(vm.twoAwardId)
        this.threeGetLotteryUserListById(vm.threeAwardId)
        this.luckyGetLotteryUserListById(vm.luckyAwardId)
      })
    },
    // 获取一等奖抽奖中奖人员信息接口
    oneGetLotteryUserListById(oneAwardId){
      let vm = this
      let param = {
        accountId:localStorage["userId" + sessionStorage["roleTypeId"]],
        lotteryId:vm.lotteryId,
        status:0,
        needNotice:-1,
        curPage:vm.oneCurPage,
        pageSize:vm.onePageSize,
        awardId:oneAwardId,
      }
      vm.$get(vm.$api.result.getLotteryUserListById,param).then(resp => {
        vm.oneTableData=resp.list
        vm.oneTotalNums = resp.totalNums
        vm.onePages = resp.pages || 1
      })
    },
    // 获取二等奖抽奖中奖人员信息接口
    twoGetLotteryUserListById(twoAwardId){
      if(twoAwardId){
        let vm = this
        let param = {
          accountId:localStorage["userId" + sessionStorage["roleTypeId"]],
          lotteryId:vm.lotteryId,
          status:0,
          needNotice:-1,
          curPage:vm.twoCurPage,
          pageSize:vm.twoPageSize,
          awardId:twoAwardId
        }
        vm.$get(vm.$api.result.getLotteryUserListById,param).then(resp => {
          vm.twoTableData = resp.list
          vm.twoTotalNums = resp.totalNums
          vm.twoPages = resp.pages || 1
        })
      }
    },
    // 获取三等奖抽奖中奖人员信息接口
    threeGetLotteryUserListById(threeAwardId){
      if(threeAwardId){
        let vm = this
        let param = {
          accountId:localStorage["userId" + sessionStorage["roleTypeId"]],
          lotteryId:vm.lotteryId,
          status:0,
          needNotice:-1,
          curPage:vm.threeCurPage,
          pageSize:vm.threePageSize,
          awardId:threeAwardId
        }
        vm.$get(vm.$api.result.getLotteryUserListById,param).then(resp => {
          vm.threeTableData = resp.list
          vm.threeTotalNums = resp.totalNums
          vm.threePages = resp.pages || 1
        })
      }
    },
    // 获取幸运奖抽奖中奖人员信息接口
    luckyGetLotteryUserListById(luckyAwardId){
      if(luckyAwardId){
        let vm = this
        let param = {
          accountId:localStorage["userId" + sessionStorage["roleTypeId"]],
          lotteryId:vm.lotteryId,
          status:0,
          needNotice:-1,
          curPage:vm.luckyCurPage,
          pageSize:vm.luckyPageSize,
          awardId:luckyAwardId
        }
        vm.$get(vm.$api.result.getLotteryUserListById,param).then(resp => {
          vm.luckyTableData = resp.list
          vm.luckyTotalNums = resp.totalNums
          vm.luckyPages = resp.pages || 1
        })
      }
    },
    onExport () {
      let vm = this
      let param = {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        lotteryId: vm.lotteryId,
        excelType: 'xls',
        responseType: 'blob'
      }
      vm.$get(vm.$api.result.exportLotteryInfoById,param).then(resp=>{
        vm.download(resp)
      })
    },
    // 下载文件
    download (data,lotteryTitle) {
      if (!data) {
        return
      }
      //获取当前时间
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      let nowDate = year + "-" + month + "-" + day;
      let url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.ms-excel"}))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', nowDate +'抽奖结果.xls')
      document.body.appendChild(link)
      link.click()
    }
  },
  created () {
    this.lotteryId = this.$route.query.pid
    this.getLotteryInfoById()
  },
  filters:{
    browsingVolume:function(value){
      value = Number(value);
      return value.toFixed(2);
    }
  },
}
</script>
<style lang="scss" scoped>
.result-detail{
  .nub-top{
    display: flex;
    justify-content: space-between;
  }
  .box-card{
    margin: 20px;
    .basic-detail{
      height: 80px;
      padding-left: 15px;
      border-left: 2px solid #E1E1E1;
      >P:nth-child(1){
        color: #666666;
      }
       >P:nth-child(2){
        color: #353535;
        font-weight: 700;
        margin-top:10px;
      }
    }
    .reward{
      // border-bottom: 2px solid rgb(190, 190, 190);
      // background-color: rgb(242, 242, 242);
      .flex_center {
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
  .prize{
    background-color: rgba(240, 242, 245, 1);
    .prize-detail{
      display: flex;
      height: 170px;
      padding: 10px;
      margin: 10px;
      background-color: #fff;
      img{
        width: 60px;
        height: 60px;
      }
      h4{
        margin-top: 15px;
      }
      .number{
        display: flex;
        margin-top: 16px;
        font-weight: 700;
        .store-number{
          >p:nth-child(1){
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
          }
          >P:nth-child(2){
            color: rgba(53, 53, 53, 1);
            font-size: 20px;
            padding: 15px 0px;
          }
        }
        .platform-number{
          margin-left: 30px;
          >p:nth-child(1){
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
          }
          >P:nth-child(2){
            color: rgba(53, 53, 53, 1);
            font-size: 20px;
            padding: 15px 0px;
          }
        }
      }
      .proportion{
        p{
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 4px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>