<!--商品详情-->
<template>
  <div class="purchase-detail">
    <!-- <el-card class="box-card"> -->
    <div class="store-content">
      <div class="gray-box">
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="thumbnail">
              <ul>
                <li v-for="(item,i) in detailList" :key="i" :class="{'alone': alone == i}" @mouseenter="alones(item.img,i)">
                  <!-- <img v-lazy="item" :alt="product.productName"> -->
                  <img :src="item.img" alt="" >
                </li>
              </ul>
            </div>
            <div class="thumb">
              <div class="big">
                <!-- <img src="https://i.loli.net/2018/07/13/5b48ac7766d98.png"> -->
                <img :src="img">
              </div>
            </div>
          </div>
        </div>
        <!--右边-->
        <div class="banner">
          <div class="sku-custom-title">
            <h4>支付测试商品 IPhone X 全面屏 全面绽放</h4>
            <h6>
              <span>此仅为支付测试商品 拍下不会发货</span>
              <span class="price">￥49.00</span>
              <!-- <em>¥</em><i>{{product.salePrice.toFixed(2)}}</i> -->
            </h6>
          </div>
          <div class="num">
            <span class="params-name">数量</span>
            <!-- <buy-num @edit-num="editNum" :limit="Number(product.limitNum)"></buy-num> -->
            <el-input-number
              v-model="num3"
              :step="1"
              :min="1"
              :max="10"
              @change="handleChange"
            ></el-input-number>
          </div>
          <div class="buy">
            <div class="shopping">
              <span>加入购物车</span>
            </div>
            <div class="purchase">
              <span>现在购买</span>
            </div>
            <!-- <y-button
                text="加入购物车"
                @btnClick="addCart(product.productId,product.salePrice,product.productName,product.productImageBig)"
                classStyle="main-btn"
                style="width: 145px;height: 50px;line-height: 48px"
              ></y-button>
              <y-button
                text="现在购买"
                @btnClick="checkout(product.productId)"
                style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"
              ></y-button> -->
          </div>
        </div>
      </div>
      <!--产品信息-->
      <div class="product">
        <!-- <y-shelf title="产品信息">
            <div slot="content">
              <div class="img-item" >
                <div class="img-item" v-if="productMsg" >
                <div v-html="productMsg">{{ productMsg }}</div>
              </div>
              <div class="no-info" v-else>
                <img src="/static/images/no-data.png">
                <br>
                该商品暂无内容数据
              </div>
            </div>
          </y-shelf> -->
        <div class="product-title">
          <p>产品信息</p>
        </div>
        <div class="product-content">
          <div style="text-align:center;">
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t7843/137/3005340945/124833/dc7c71f2/59b8ccd1N2bffd055.jpg"
              alt=""
            >
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t8764/314/1380452846/296346/d62490e2/59b8ccd1N96ce760d.jpg"
              alt=""
            >
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t8710/275/1373463301/363710/ebf00bff/59b8ccbaN2d563f74.jpg"
              alt=""
            >
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t8632/330/1390725687/229853/e56f9e1b/59b8ccd1N7b8b6bdb.jpg"
              alt=""
            >
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t9115/290/1376678976/488369/591760dc/59b8ccc6N1563a61b.jpg"
              alt=""
            >
            <img
              src="https://img30.360buyimg.com/popWaterMark/jfs/t7390/232/3008585906/285016/56cbb12/59b8ccd4Nc8434af8.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <!-- </el-card> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      img:'',
      alone:0,
      num3: 1,
      detailList:[{
        id:1,
        img:'https://i.loli.net/2018/07/13/5b48ac7766d98.png'
      },
      {
        id:2,
        img:'https://i.loli.net/2018/07/13/5b48ac9135c5f.png'
      },
      {
        id:3,
        img:'https://i.loli.net/2018/07/13/5b48ac9c2be6c.png'
      },
      {
        id:4,
        img:'https://i.loli.net/2018/07/13/5b48aca99c8b6.png'
      },
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    alones(value ,index){
      this.alone = index
      this.img = value
    }
  },
  created () {
		this.alones(this.detailList[0].img,0)
	}
};
// import { productDet, addCart } from '/api/goods'
// import { mapMutations, mapState } from 'vuex'
// import YShelf from '/components/shelf'
// import BuyNum from '/components/buynum'
// import YButton from '/components/YButton'
// import { getStore } from '/utils/storage'
// export default {
//   data () {
//     return {
//       productMsg: {},
//       small: [],
//       big: '',
//       product: {
//         salePrice: 0
//       },
//       productNum: 1,
//       userId: ''
//     }
//   },
//   computed: {
//     ...mapState(['login', 'showMoveImg', 'showCart'])
//   },
//   methods: {
//     ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
//     _productDet (productId) {
//       productDet({params: {productId}}).then(res => {
//         let result = res.result
//         this.product = result
//         this.productMsg = result.detail || ''
//         this.small = result.productImageSmall
//         this.big = this.small[0]
//       })
//     },
//     addCart (id, price, name, img) {
//       if (!this.showMoveImg) {     // 动画是否在运动
//         if (this.login) { // 登录了 直接存在用户名下
//           addCart({userId: this.userId, productId: id, productNum: this.productNum}).then(res => {
//             // 并不重新请求数据
//             this.ADD_CART({
//               productId: id,
//               salePrice: price,
//               productName: name,
//               productImg: img,
//               productNum: this.productNum
//             })
//           })
//         } else { // 未登录 vuex
//           this.ADD_CART({
//             productId: id,
//             salePrice: price,
//             productName: name,
//             productImg: img,
//             productNum: this.productNum
//           })
//         }
//         // 加入购物车动画
//         var dom = event.target
//         // 获取点击的坐标
//         let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
//         let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
//         // 需要触发
//         this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
//         if (!this.showCart) {
//           this.SHOW_CART({showCart: true})
//         }
//       }
//     },
//     checkout (productId) {
//       this.$router.push({path: '/checkout', query: {productId, num: this.productNum}})
//     },
//     editNum (num) {
//       this.productNum = num
//     }
//   },
//   components: {
//     YShelf, BuyNum, YButton
//   },
//   created () {
//     let id = this.$route.query.productId
//     this._productDet(id)
//     this.userId = getStore('userId')
//   }
// }
</script>
<style lang="scss" >
.purchase-detail {
  padding: 30px;
  max-width: 1220px;
  margin: 0 auto;
  .store-content {
    clear: both;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
    .gray-box {
      display: flex;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      .gallery-wrapper {
        .gallery {
          display: flex;
          width: 540px;
          .thumbnail {
            li:first-child {
              margin-top: 0px;
            }
            li {
              width: 80px;
              margin-top: 10px;
              padding: 12px;
              border: 1px solid #f0f0f0;
              border: 1px solid rgba(0, 0, 0, 0.06);
              border-radius: 5px;
              cursor: pointer;
              &.on {
                padding: 10px;
                border: 3px solid #ccc;
                border: 3px solid rgba(0, 0, 0, 0.2);
              }
              img {
                display: block;
                width: 100%;
              }
              &.alone{
                border-color: rgba(0, 0, 0, 0.2);
              }
            }
          }
          .thumb {
            .big {
              margin-left: 20px;
            }
            img {
              display: block;
              width: 440px;
            }
          }
        }
      }
      // 右边
      .banner {
        width: 450px;
        margin: 100px 0px 0px 30px;
        .sku-custom-title {
          overflow: hidden;
          padding: 8px 8px 18px 10px;
          position: relative;
          h4 {
            font-size: 24px;
            line-height: 1.25;
            color: #000;
            margin-bottom: 13px;
            font-weight: 400;
            font-family: -webkit-pictograph;
          }
          h6 {
            font-size: 14px;
            color: #bdbdbd;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #d44d44;
              font-size: 24px;
            }
          }
        }
        .params-name {
          padding-right: 20px;
          font-size: 14px;
          color: #8d8d8d;
          line-height: 36px;
        }
        .num {
          padding: 29px 0 8px 10px;
          border-top: 1px solid #ebebeb;
          display: flex;
          align-items: center;
        }
        .buy {
          position: relative;
          border-top: 1px solid #ebebeb;
          padding: 30px 0 0 10px;
          margin: auto;
          .shopping,
          .purchase {
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 4px;
            font-size: 12px;
            float: left;
          }
          .shopping {
            border: 1px solid #5c81e3;
            background-color: #678ee7;
            color: #fff;
          }
          .shopping:hover {
            background-color: rgb(84, 117, 200);
            cursor: pointer;
          }
          .purchase {
            border: 1px solid #e1e1e1;
            background-color: #f9f9f9;
            color: #646464;
            margin-left: 10px;
          }
          .purchase:hover {
            background-color: rgb(241, 241, 241);
            cursor: pointer;
          }
        }
      }
    }
  }
  .product {
    margin-top: 30px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    .product-title {
      height: 60px;
      line-height: 60px;
      background: linear-gradient(#fbfbfb, #ececec);
      padding-left: 30px;
      border-bottom: 1px solid #dcdcdc;
      border-radius: 8px 8px 0px 0px;
      > p {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
      }
    }
    .product-content {
      border-radius: 0px 0px 8px 8px;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
  }
  .el-input__inner {
    border: none;
  }
}
</style>
