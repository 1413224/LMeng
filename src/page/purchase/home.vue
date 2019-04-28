<template>
  <div class="purchase-home">
    <y-header></y-header>
    <el-card class="box-card">
      <!-- 轮播图  -->
      <div class="block">
        <el-carousel height="500px" arrow='never'>
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 展示条 -->
      <el-row>
        <el-col :span="6">
          <div class="home-img">
            <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg"
              alt=""
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/4/489673079577637073.png"
              alt=""
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg"
              alt=""
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/4/489673079577637073.png"
              alt=""
            >
          </div>
        </el-col>
      </el-row>
      <!-- 热门商品 -->
      <div class="commodity">
        <div class="commodity-title">
          <h2>热门商品</h2>
        </div>
        <div class="commodity-content">
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img src="https://i.loli.net/2018/07/13/5b48a7f468bf2.png" alt="">
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px" @click="purchaseDetail">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://i.loli.net/2018/07/13/5b48a7f46be51.png"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 官方精选 -->
      <div class="selected">
        <div class="selected-title">
          <h2>官方精选</h2>
        </div>
        <div class="selected-content">
          <div
            data-v-4af9704d=""
            data-v-26571f4f=""
            class="imgbanner"
          ><img
              data-v-4af9704d=""
              data-v-26571f4f=""
              data-src="https://resource.smartisan.com/resource/a/acillouceng1220856.jpg"
              src="https://resource.smartisan.com/resource/a/acillouceng1220856.jpg"
              lazy="loaded"
            >
            <a
              data-v-4af9704d=""
              data-v-26571f4f=""
              class="cover-link"
            ></a>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
          <div class="good-item">
            <div>
              <div class="good-img">
                <a>
                  <img
                    src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                    alt=""
                  >
                </a>
              </div>
              <h6 class="good-title">Smartisan 明信片</h6>
              <h3 class="sub-title ellipsis">优质卡纸、包装精致、色彩饱满</h3>
              <div class="good-price pr">
                <div class="ds pa">
                  <el-button style="padding:8px 15px; margin:0 5px">查看详情</el-button>
                  <el-button
                    type="primary"
                    style="padding:8px 8px; margin:0 5px"
                  >加入购物车</el-button>
                </div>
                <p><span style="font-size:14px">￥</span>123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 展示条 -->
      <el-row>
        <el-col :span="6">
          <div class="home-img">
            <a href="javascript:void(0);">
              <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg"
              alt=""
            >
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <a href="javascript:void(0);">
              <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/4/489673079577637073.png"
              alt=""
            >
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <a href="javascript:void(0);">
              <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/6/610400yijiuhuanxin.jpg"
              alt=""
            >
            </a>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="home-img">
            <a href="javascript:void(0);">
              <img
              style="width:100%;"
              src="https://resource.smartisan.com/resource/4/489673079577637073.png"
              alt=""
            >
            </a>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import YHeader from '@/components/header/header.vue'
export default {
  data() {
    return {};
  },
  methods: {
    purchaseDetail(){
      this.$router.push({
        path:'/purchase-detail'
      })
    }
  },
  components: {
    YHeader
  }
}
</script>
<style lang="scss" scoped>
.purchase-home {
  .box-card {
    margin: 20px;
    .block {
      margin-bottom: 20px;
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .home-img {
      border: 1px solid #efefef;
      transition: all 0.5s;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 1px 1px 20px #999;
      }
    }
    .commodity {
      margin-top: 20px;
      border: 1px solid #dcdcdc;
      overflow: hidden;
      border-radius: 8px;
      .commodity-title {
        height: 60px;
        line-height: 60px;
        background: linear-gradient(#fbfbfb, #ececec);
        padding-left: 30px;
        border-bottom: 1px solid #dcdcdc;
        h2 {
          font-size: 18px;
          font-weight: 400;
          color: #626262;
          display: inline-block;
        }
      }
      .commodity-content {
        .good-item {
          float: left;
          background: #fff;
          width: 50%;
          transition: all 0.5s;
          height: 430px;
          // border: 1px solid #efefef;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 1px 1px 20px #999;
            .good-price p {
              display: none;
            }
            .ds {
              display: flex;
            }
          }
          .ds {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            display: none;
          }
          .good-img {
            height: 100%;
            width: 100%;
            img {
              width: 206px;
              display: block;
              margin: 50px auto 10px;
            }
          }
          .good-price {
            margin: 15px 0;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #d44d44;
            font-family: Arial;
            font-size: 18px;
            font-weight: 700;
          }
          .good-title {
            line-height: 1.2;
            font-size: 16px;
            color: #424242;
            margin: 0 auto;
            padding: 0 14px;
            text-align: center;
            overflow: hidden;
          }
          h3 {
            text-align: center;
            line-height: 1.2;
            font-size: 12px;
            color: #d0d0d0;
            padding: 10px;
          }
        }
      }
    }
    .selected {
      margin: 20px 0px;
      border: 1px solid #dcdcdc;
      overflow: hidden;
      border-radius: 8px;
      .selected-title {
        height: 60px;
        line-height: 60px;
        background: linear-gradient(#fbfbfb, #ececec);
        padding-left: 30px;
        border-bottom: 1px solid #dcdcdc;
        h2 {
          font-size: 18px;
          font-weight: 400;
          color: #626262;
          display: inline-block;
        }
      }
      .selected-content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .imgbanner {
          width: 50%;
          height: 430px;
          transition: all 0.5s;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 1px 1px 20px #999;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .good-item {
          float: left;
          background: #fff;
          width: 25%;
          transition: all 0.5s;
          height: 430px;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 1px 1px 20px #999;
            .good-price p {
              display: none;
            }
            .ds {
              display: flex;
            }
          }
          .ds {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            display: none;
          }
          .good-img {
            height: 100%;
            width: 100%;
            img {
              width: 206px;
              display: block;
              margin: 50px auto 10px;
            }
          }
          .good-price {
            margin: 15px 0;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #d44d44;
            font-family: Arial;
            font-size: 18px;
            font-weight: 700;
          }
          .good-title {
            line-height: 1.2;
            font-size: 16px;
            color: #424242;
            margin: 0 auto;
            padding: 0 14px;
            text-align: center;
            overflow: hidden;
          }
          h3 {
            text-align: center;
            line-height: 1.2;
            font-size: 12px;
            color: #d0d0d0;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>


