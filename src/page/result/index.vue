<template>
  <div class="result">
    <div class="nub-top" style="height: 80px;">
      <h2>周末抽奖结果</h2>
			<div class="right">
        <div class="right-div">
          <p>累计中奖人数</p>
          <p class="num">{{ lotteryNums }}</p>
        </div>
        <div class="right-div">
          <p>累计中奖金额</p>
          <p class="num">{{ lotteryBonus }}</p>
        </div>
        <div class="right-div">
          <p>符合条件的抽奖结果总数</p>
          <p class="num">{{ totalNums }}</p>
        </div>
			</div>
		</div>
    <el-card class="box-card">
      <el-row :gutter="40">
				<el-form label-width="80px" label-position="left">
					<el-col :span="8">
						<el-form-item label="抽奖时间 : " style="padding-left: 10px;">
              <el-date-picker
                v-model="timeSlot"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                style="width: 100%;">
              </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
            <el-form-item label="金额区间 : " style="padding-left:10px;">
							<div class="input-half">
                <el-col :span="11">
            		<el-input v-model="minBonus" placeholder="最小" @keyup.native="minBonus=formatDouble(minBonus)"></el-input>
                </el-col>
                <el-col :span="2" style="text-align: center;">-</el-col>
                <el-col :span="11">
            		<el-input v-model="maxBonus" placeholder="最大" @keyup.native="maxBonus=formatDouble(maxBonus)"></el-input>
                </el-col>
              </div>
            </el-form-item>
          </el-col>
					<el-col :span="8">
						<el-button type="primary" @click="onSearch">查询</el-button>
						<el-button @click="resetting">重置</el-button>
					</el-col>
				</el-form>
			</el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="期数" min-width="50"></el-table-column>
        <el-table-column prop="allianceNums" label="本店中奖人员" width="150"></el-table-column>
        <el-table-column prop="oneNumber" label="一等奖(人)" min-width="90"></el-table-column>
        <el-table-column prop="twoNumber" label="二等奖(人)" min-width="90"></el-table-column>
        <el-table-column prop="threeNumber" label="三等奖(人)" min-width="90"></el-table-column>
        <el-table-column prop="fourNumber" label="幸运奖(人)" min-width="90"></el-table-column>
        <el-table-column label="开奖时间" min-width="90">
          <template slot-scope="scope">
            <div style="width: 90px;">{{scope.row.lotteryTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="allianceBonus" label="本店本期中奖金额" min-width="105"></el-table-column>
        <el-table-column label="操作" min-width="90">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="onExport(scope.row.lotteryId,scope.row.lotteryTitle)">导出</el-button> -->
            <!-- <el-tooltip class="item" effect="dark" content="导出"  placement="top">
              <el-button
              size="mini"
              type="success"
              icon="el-icon-download"
              plain
              @click="onExport(scope.row.lotteryId,scope.row.lotteryTitle)"></el-button>
						</el-tooltip> -->
            <!-- <el-button type="text" @click="goDetail(scope.row.lotteryId)">查看详情</el-button> -->
            <el-tooltip class="item" effect="dark" content="详情"  placement="top">
              <el-button
              size="mini"
              type="primary"
              icon="el-icon-document"
              plain
              @click="goDetail(scope.row.lotteryId)"></el-button>
						</el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
  data(){
    return {
      enState:false,
      status:-1,
      items:[],
      timeSlot: [],
      minMoney:'',
      maxMoney:'',
      totalNums:0,
      lotteryNums:0,
      lotteryBonus:0,
      curPage: 1,
      pageSize: 10,
      pages: 1,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      minBonus:'',
      maxBonus:'',
      search: {
        startTime: '',
        endTime: '',
        minBonus:'',
        maxBonus:'',
        keyword:'',
        status:-1
      },
      tableData: [],
      statusOptions:[{
        value:-1,
        key: '所有',
      },{
        value: 20,
        key: '待抽奖',
      },{
        value: 40,
        key: '运算中',
      },{
        value: 50,
        key: '待开奖',
      },{
        value: 60,
        key: '开奖中',
      },{
        value: 70,
        key: '已开奖',
      },{
        value: 80,
        key: '抽奖已关闭',
      }]
    }
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
        vm.getLotteryList()
    })
  },
  methods: {
    // 搜索
    onSearch () {
			let vm = this
			vm.items = []
      vm.search = { // 进行搜索条件缓存
        startTime: parseInt(Date.parse(vm.timeSlot[0]) / 1000) || '',
        endTime: parseInt(Date.parse(vm.timeSlot[1]) / 1000)  || '',
        minBonus:vm.minBonus,
        maxBonus:vm.maxBonus,
        keyword:vm.keyword,
        status:vm.status
			}
			vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
      this.getLotteryList()
    },
    // 重置
    resetting() {
      let vm = this
      vm.items = []
      vm.timeSlot = []
      vm.minBonus = ''
      vm.maxBonus = ''
      vm.keyword = ''
      vm.status = -1
      vm.search = {
        startTime: '',
        endTime: '',
        minBonus:'',
        maxBonus:'',
        keyword:'',
        status:-1
      }
      vm.curPage = 1
      vm.$refs.paging.lastEmittedPage = 1
      this.getLotteryList()
    },
    handleSize(sizeVal) {
      this.pageSize = sizeVal
      this.curPage = 1
      this.$refs.paging.lastEmittedPage = 1
      this.getLotteryList()
    },
    handleCurrent(currentVal) {
      this.curPage = currentVal
      this.getLotteryList()
    },
    // 获取列表
    getLotteryList(){
      let vm = this 
      let param = Object.assign({},vm.search,{
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        curPage: vm.curPage,
        pageSize: vm.pageSize
      })
      vm.$get(vm.$api.result.getLotteryList,param).then(resp => {
        vm.lotteryNums = resp.lotteryNums
        vm.lotteryBonus = resp.lotteryBonus
        vm.totalNums = resp.pageBean.totalNums
        vm.pages = resp.pageBean.pages || 1;
        vm.tableData = resp.pageBean.list
        for (var i = 0; i < vm.tableData.length; i++) {
          for (var j = 0; j < vm.tableData[i].awardInfo.length; j++) {
            vm.tableData[i].oneNumber = vm.tableData[i].awardInfo[0] ? vm.tableData[i].awardInfo[0].number : 0
            vm.tableData[i].twoNumber = vm.tableData[i].awardInfo[1] ? vm.tableData[i].awardInfo[1].number : 0
            vm.tableData[i].threeNumber = vm.tableData[i].awardInfo[2] ? vm.tableData[i].awardInfo[2].number : 0
            vm.tableData[i].fourNumber = vm.tableData[i].awardInfo[3] ? vm.tableData[i].awardInfo[3].number : 0
          }
        }
      })
    },
    // 跳转详情
    goDetail(lotteryId){
      this.$router.push({path:'/result-detail',query: {pid:lotteryId}})
    },
    // 导出
     onExport (lotteryId,lotteryTitle) {
      let vm = this
      let param = {
        accountId: localStorage["userId" + sessionStorage["roleTypeId"]],
        lotteryId: lotteryId,
        excelType: 'xls',
        responseType: 'blob'
      }
      // let url = window.winConst.baseURL + vm.$api.result.exportLotteryInfoById
      // window.open(`${url}`)
      vm.$get(vm.$api.result.exportLotteryInfoById,param).then(resp=>{
        vm.download(resp,lotteryTitle)
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
      let url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.ms-excel,charset=UTF-8"}))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', nowDate +'抽奖结果.xls')
      document.body.appendChild(link)
      console.log(link)
      link.click()
    }
  }
}
</script>
<style lang="scss" scoped>
.result{
  .nub-top{
    display: flex;
    justify-content: space-between;
    .right{
      display: flex;
      .right-div {
        color: rgba(0, 0, 0, 0.45);
        padding: 0 20px;
        text-align: center;
        margin: 10px;
        border-left: 2px solid #ccc;
        .num {
          font-size: 32px;
          color: #000;
        }
      }
      .right-div:nth-child(1){
        border:none;
      }
    }
  }
  .box-card{
     margin: 20px;
     .input-half {
      div {
        padding: 0!important;
        margin: 0;
      }
    }
  }
  .flex_center {
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
}
</style>


