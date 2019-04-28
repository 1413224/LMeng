<template>
  <div class="purchase-cart">
    <div class="cart-title">
      <p>购物清单</p>
    </div>
    <div class="cart-content">
      <el-table ref="multipleTable" :data="cartList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品信息" min-width="240">
          <template slot-scope="scope">
             <div class="common-information">
               <img style="width:80px;height:80px;" :src="scope.row.img" alt="" :title="scope.row.name">
              <p>{{scope.row.name}}</p>
             </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" min-width="80">
           <template slot-scope="scope">
             ￥{{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="数量" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number" @change="handleChange(scope.row)" :min="1" :max="10" label="描述文字"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column  label="小计" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">
           {{scope.row.price * scope.row.number}}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip min-width="80">
          <template slot-scope="scope"><el-button size="mini" type="danger" icon="el-icon-delete" plain @click="goDetail(scope.row.id)"></el-button></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cart-footer">
      <div class="choice">
        <el-button type="danger"  @click="openConfirm(goodsIds, '是否将选中商品删除?', delGoodsByIds)" :disabled="!goodsIds" >批量删除</el-button>
      </div>
      <div class="price">
        <div class="commodity-number">
          <p>已选择 <span style="color:#d44d44;font-size: 18px;font-weight: 700;">{{number}}</span> 件商品</p>
          <p style="color: #959595; font-weight: 400;">共计 {{totalNum}} 件商品</p>
        </div>
        <div class="commodity-price">
          <p>应付总额：<span style="color:#d44d44;font-size: 18px;font-weight: 700;">￥{{totalPrice}}</span></p>
          <p style="color: #959595; font-weight: 400;">应付总额不含运费</p>
        </div>
        <div class="settlement-price"><el-button type="primary" :disabled="!goodsIds"  @click="purchaseSettlement">现在结算</el-button></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      number:0,
      totalPrice :0,
      totalNum:0,
      goodsIds:'',
      cartList:[{
        id:1,
        name:'坚果 3 绒布国旗保护套',
        img:'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg',
        price:'79',
        number:2,
        },
        {
        id:2,
        name:'坚果 3 绒布国旗保护套',
        img:'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg',
        price:'79',
        number:2,
        subtotal:'158',
        },
        {
          id:3,
          name:'坚果 3 绒布国旗保护套',
          img:'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg',
          price:'79',
          number:2,
          subtotal:'158',
        },{
          id:4,
          name:'坚果 3 绒布国旗保护套',
          img:'https://resource.smartisan.com/resource/63ea40e5c64db1c6b1d480c48fe01272.jpg',
          price:'79',
          number:2,
          subtotal:'158',
        }
      ],
      checkbox:[] 
    }
  },
  methods: {
    goDetail(id){
      console.log(id)
    },
    purchaseSettlement(){
      this.$router.push({
        path:'/purchase-settlement'
      })
    },
    handleChange(data){
      this.cartList.map(value=>{
        if(value.id==data.id){
          value.number = data.number
        }
      })
      this.getCommoditytotal()
      this.Initialization()
    },
    handleSelectionChange(val){
      this.checkbox = val
      let temp = val.map(obj => {
        return obj.id
      })
      this.goodsIds = temp.join(',')
      this.Initialization()
    },
    getCommoditytotal(){
      this.totalNum = 0
      this.cartList.map(obj=>{
        this.totalNum +=  obj.number
      })
    },
    Initialization(){
      this.number = 0
      this.totalPrice = 0
      this.checkbox.map(obj => {
        this.number +=  obj.number
        this.totalPrice +=  obj.number * obj.price
      })
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
  },
  mounted () {
    // this.checkbox = this.cartList
    this.getCommoditytotal()
    // this.toggleSelection(this.checkbox)
  }
}
</script>
<style lang="scss">
  .purchase-cart{
    margin: 20px 20px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    .cart-title{
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
    .cart-content{
      .common-information{
          display: flex;
          align-items: center;
          img{
            cursor:pointer;
            border: 1px solid #dcdcdc;
            margin-right: 30px;
          }
          > p{
            color: #333;
            font-size: 16px;
            cursor:pointer;
          }
        }
      // .cart-th{
      //   height: 38px;
      //   line-height: 38px;
      //   color: #838383;
      //   font-size: 12px;
      //   border-bottom: 1px solid #dbdbdb;
      //   border-bottom-color: rgba(0,0,0,.08);
      //   background-color: #eee;
      // }
      // .cart-td{
      //   background-color: #fff;
      //   height: 140px;
      //   line-height: 140px;
      //   .common-information{
      //     display: flex;
      //     align-items: center;
      //     .common-img{
      //       margin: 0 30px;
      //       width: 80px;
      //       height: 80px;
      //       border: 1px solid #dcdcdc;
      //        cursor:pointer;
      //       img{
      //         width: 100%;
      //       }
      //     }
      //     > p{
      //       color: #333;
      //       font-size: 16px;
      //       cursor:pointer;
      //     }
      //   }
      //   .cart-number{
      //     width: 100px;
      //     margin: auto;
      //     .el-input-number{
      //       .el-input-number__decrease{
      //         width: 25px;
      //         height: 25px;
      //         border-radius: 50%;
      //       }
      //       .el-input-number__increase{
      //         width: 25px;
      //         height: 25px;
      //         border-radius: 50%;
      //       }
      //     }
      //   }
      //   .grid-content{
      //     .delete{
      //       width: 24px;
      //       height: 24px;
      //       margin: 58px auto;
      //       color: #c2c2c2;
      //       background: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
      //       -webkit-background-size: 100% auto;
      //       background-size: 100% auto;
      //       -moz-transition: none;
      //       -webkit-transition: none;
      //       -o-transition: none;
      //       transition: none;
      //       cursor:pointer;
      //     }
      //   }
      // }
    }
    .cart-footer{
      height: 90px;
      background: linear-gradient(#fdfdfd,#f9f9f9);
      border-top: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      padding: 0px 30px;
      .choice{
        margin: auto 0;
      }
      .price{
        display: flex;
        .commodity-number{
          margin: auto;
        }
        .commodity-price{
          border-left: 1px solid #dcdcdc;
          margin: auto 20px;
          padding-left:20px; 
        }
        .commodity-number,.commodity-price{
          text-align: right;
          font-weight: 400;
          font-size: 14px;
        }
        .settlement-price{
          margin: auto;
        }
      }
    }
    .el-input__inner {
      border: none;
      background-color: rbg(245, 247, 250);
    }
  }
</style>


