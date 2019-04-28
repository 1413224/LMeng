<template>
  <div class="purchase-settlement"> 
    <div class="harvest">
      <div class="harvest-titel">
        <p>收货信息</p>
      </div>
      <div class="harvest-content">
        <el-row style="width:100%;">
          <el-col :span="6" >
            <div class="grid-content bg-purple">
              <div class="details" :class="{'active': 1 == active}" @click="check_show(1)">
                <svg v-if="active==1" viewBox="0 0 1473 1024" width="17.34375" height="12" style="position: absolute; top:25px;right:10px;">
                  <path 
                    d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                    fill="#6A8FE5" p-id="1025">
                  </path>
                </svg>
                <p>收货人 : 某某某</p>
                <p>收获地址 ：某某某某某某某某某某某某某某某</p>
                <p>手机号码 : 12365478936</p>
                <div class="operation">
                  <span class="update-btn" style="font-size:12px">修改</span>
                  <span class="delete-btn" style="font-size:12px">删除</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content bg-purple">
              <div class="details" :class="{'active': 2 == active}" @click="check_show(2)">
                <svg v-if="active==2" viewBox="0 0 1473 1024" width="17.34375" height="12" style="position: absolute; top:25px;right:10px;">
                  <path 
                    d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                    fill="#6A8FE5" p-id="1025">
                  </path>
                </svg>
                <p>收货人 : 某某某</p>
                <p>收获地址 ：某某某某某某某某某某某某某某某</p>
                <p>手机号码 : 12365478936</p>
                <div class="operation">
                  <span class="update-btn" style="font-size:12px">修改</span>
                  <span class="delete-btn" style="font-size:12px">删除</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="grid-content bg-purple">
              <div class="details" :class="{'active': 3 == active}" @click="check_show(3)">
                 <svg v-if="active==3" viewBox="0 0 1473 1024" width="17.34375" height="12" style="position: absolute; top:25px;right:10px;">
                  <path 
                    d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                    fill="#6A8FE5" p-id="1025">
                  </path>
                </svg>
                <p>收货人 : 某某某</p>
                <p>收获地址 ：某某某某某某某某某某某某某某某</p>
                <p>手机号码 : 12365478936</p>
                <div class="operation">
                  <span class="update-btn" style="font-size:12px">修改</span>
                  <span class="delete-btn" style="font-size:12px" @click="deleteBtn">删除</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="address" @click="showAddress">
                <i class="fa fa-user-plus"></i>
                <p>新增地址</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="detailed">
      <div class="detailed-title">
        <p>购物清单</p>
      </div>
      <div class="detailed-content">
        <el-row style="height:38px;line-height: 38px;background:#eee;">
          <el-col :span="12" style="font-size: 14px; padding-left:50px;"><div class="grid-content bg-purple">商品信息</div></el-col>
          <el-col :span="4" style="font-size: 14px; text-align: center;" ><div class="grid-content bg-purple-light">单价</div></el-col>
          <el-col :span="4" style="font-size: 14px; text-align: center;" ><div class="grid-content bg-purple">数量</div></el-col>
          <el-col :span="4" style="font-size: 14px; text-align: center;" ><div class="grid-content bg-purple-light">小计</div></el-col>
        </el-row>
        <el-row style="height:140px;">
          <el-col :span="12" style="padding-left:60px;">
            <div class="grid-content bg-purple">
              <div class="det-con-inform">
                <img style="cursor:pointer;" src="https://resource.smartisan.com/resource/804edf579887b3e1fae4e20a379be5b5.png" alt="T恤 任天堂发售“红白机" title="T恤 任天堂发售“红白机">
                <p style="cursor:pointer;">Smartisan T恤 任天堂发售“红白机”</p>
              </div>
            </div>
          </el-col>
          <el-col :span="4" style="text-align: center;" ><div class="grid-content bg-purple-light"><p style="margin:60px 0px;">¥ 149</p></div></el-col>
          <el-col :span="4" style="text-align: center;" ><div class="grid-content bg-purple"><p style="margin:60px 0px;">1</p></div></el-col>
          <el-col :span="4" style="text-align: center;" ><div class="grid-content bg-purple-light"><p style="margin:60px 0px;">¥ 149</p></div></el-col>
        </el-row>
      </div>
      <div class="detailed-footer">
        <div class="footer-lf">
          <p>应付总额：<span style="font-size: 24px;color: #d44d44;font-weight: 700;">￥597</span></p>
        </div>
        <div class="footer-rg">
          <el-button type="primary">提交订单</el-button>
        </div>
      </div>
    </div>
    <!-- 添加地址 -->
      <el-dialog
        title="新增收货地址"
        :visible.sync="showDddress"
        width="30%"
        :before-close="handleClose">
        <el-form :model="address" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="收件人" prop="name">
            <el-input v-model="address.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="address.mobile"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <c-area @getAreaArr="getAreaArr"  :empty="empty"></c-area>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailed">
            <el-input v-model="address.detailed"></el-input>
          </el-form-item>
          <div class="operation">
            <el-button @click="showDddress = false">取 消</el-button>
            <el-button type="primary" @click="showDddress = false">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
import cArea from '@/components/base/cArea'
export default {
  data(){
    return{
      showDddress:false,
      areaArr:[],
      active:0,
      empty:false,
      initArea: true,
      address:{
        name  : '',
        mobile  : '',
        originAreaParentIds : [],
        detailed:''
      },
      rules: {
        name: [
          { required: true, message: '请输入收件人', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入收件人电话号', trigger: 'blur' },
        ],
        detailed:[
          {required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
    }
  },
  components:{
		cArea
	},
  methods: {
    deleteBtn(e){
      console.log(e)
    },
    showAddress(){
      this.showDddress = true
    },
    check_show(index){
      this.active = index
    },
    getAreaArr (arr) {
      this.areaArr = arr
		},
  },
  created () {
		this.check_show(1)
	}
}
</script>
<style lang="scss" scoped>
.purchase-settlement{
  margin: 20px 20px;
  .harvest{
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    .harvest-titel{
      height: 60px;
      line-height: 60px;
      background: linear-gradient(#fbfbfb, #ececec);
      padding-left: 30px;
      border-bottom: 1px solid #dcdcdc;
      border-radius: 8px 8px 0px 0px;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #333;
        display: inline-block;
      }
    }
    .harvest-content{
      padding: 20px 0px 20px 20px;
      background-color: #fff;
      border-radius: 0px 0px 8px 8px ;
      .details{
        margin-bottom: 20px;
        font-size: 14px;
        color: #626262;
        height: 180px;
        cursor: pointer;
        border: 1px solid #e5e5e5; 
        transition: all .5s ease;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        margin-right: 20px;
        background-color: #fafafa;
        > p{
          line-height: 26px;
        }
        &:hover {
          background: #F2F2F2;
          .operation {
            display:block;
            width: 100%;
            position: absolute;
            display: flex;
            left: 0px;
            bottom: 0px;
            height: 27px;
            align-items: center;
            border-top: 1px solid #dcdcdc;
            background-color: #fff;
            span{
              flex: 1;
              text-align: center;
              height: 27px;
              line-height: 27px;
              &:hover{
              background-color: #F2F2F2;
            }
            }
            span:nth-child(1){
              border-right: 1px solid #dcdcdc;
            }
          }
        }
        .operation{
          display:none;
        }
        &.active{
          border-color: #6a8fe5;
          background: #fff;
        }
      }
      .address{
        height: 180px;
        border: 1px solid #e5e5e5; 
        border-radius: 4px;
        position: relative;
        margin-right: 20px;
        .fa-user-plus{
          font-size: 24px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        > p {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%,-70%);
        }
      }
      .address:hover{
        background-color: rgb(242, 242, 242);
      }
    }
  }
  .detailed{
    color: #838383;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    margin-top:40px; 
    .detailed-title{
      height: 60px;
      line-height: 60px;
      background: linear-gradient(#fbfbfb, #ececec);
      padding-left: 30px;
      border-bottom: 1px solid #dcdcdc;
      border-radius: 8px 8px 0px 0px;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #333;
        display: inline-block;
      }
    }
    .detailed-content{
      background-color: #fff;
      .det-con-inform{
        display: flex;
        align-items: center;
        margin: 30px 0px;
        img{
          width: 78px;
          height: 78px;
          border: 1px solid #dcdcdc;
          margin-right: 30px;
        }
      }
    }
    .detailed-footer{
      height: 90px;
      width: 100%;
      border-top: 1px solid #dcdcdc;
      border-radius: 0px 0px 8px 8px ;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .footer-lf{
      }
      .footer-rg{
        margin: 0px 30px;
      }
    }
  }
  .operation{
    display: flex;
    justify-content: flex-end;
  }
}
</style>


