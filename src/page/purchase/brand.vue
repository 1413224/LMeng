<template>
  <div class="goods-brand">
    <y-header></y-header>
    <el-card class="box-card">
      <div class="search-criteria">
        <div class="criteria">
          <p :class="{active:sortType===1}" @click="reset()">综合排序</p>
          <p :class="{active:sortType===2}" @click="sortByPrice(1)">价格从低到高</p>
          <p :class="{active:sortType===3}" @click="sortByPrice(-1)">价格从高到低</p>
        </div>
        <div class="search">
          <el-input class="el-input" v-model="maxPrice" placeholder="价格"></el-input>
          <span> - </span>
          <el-input class="el-input" v-model="minPrice" placeholder="价格"></el-input>
          <el-button type="primary" @click="reset">搜索</el-button>
        </div>
      </div>
      <div class="good">
        <div class="good-item">
          <div>
            <div class="good-img">
              <a>
                <img
                  src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"
                  alt="">
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
import YHeader from '@/components/header/header.vue'
export default {
  data() {
    return {
      sortType:1,
      maxPrice:'',
      minPrice:'',
      curPage: 1,
      pageSize: 10,
      pages: 1,
      totalNums: 0,
      enState: false,
    };
  },
  methods: {
    reset(){
      this.sortType = 1
    },
    sortByPrice(v){
      v === 1 ? this.sortType = 2 : this.sortType = 3
    },
    handleSize(sizeVal) {
      this.pageSize = sizeVal;
      this.curPage = 1;
      this.$refs.paging.lastEmittedPage = 1;
    },
    handleCurrent(currentVal) {
      this.curPage = currentVal;
    }
  },
  components: {
    YHeader
  }
}
</script>
<style lang="scss" scoped>
.goods-brand {
  .box-card {
    margin: 10px;
    .search-criteria{
      height: 60px;
      line-height: 60px;
      display: flex;
      .criteria{
        padding: 0 15px;
        height: 100%;
        display: flex;
        font-size: 14px;
        color: #999;
        >p{
          margin-right: 14px;
          cursor:pointer;
          &.active {
            color: #5683EA;
          }
          &:hover {
            color: #5683EA;
          }
        }
      }
      .search{
        display: flex;
        span{
          margin: 0px 10px; 
        }
        .el-input{
          width: 100px;
        }
        .el-button{
          width: 80px;
          height: 40px;
          margin: auto 20px;
        }
      }
    }
    // .search-criteria {
    //   height: 60px;
    //   line-height: 60px;
    //   > div {
    //     display: flex;
    //     align-items: center;
    //     a {
    //       padding: 0 15px;
    //       height: 100%;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       font-size: 12px;
    //       color: #999;
    //       &.active {
    //         color: #5683EA;
    //       }
    //       &:hover {
    //         color: #5683EA;
    //       }
    //     }
    //     input {
    //       width: 80px;
    //       height: 30px;
    //       border: 1px solid #ccc;
    //     }
    //     input + input {
    //       margin-left: 10px;
    //     }
    //   }
    //   .price-interval {
    //     padding: 0 15px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     input[type=number] {
    //       border: 1px solid #ccc;
    //       text-align: center;
    //       background: none;
    //       border-radius: 5px;
    //     }
    //   }
    // }
    .input-half {
      div {
          padding: 0!important;
          margin: 0;
      }
	  }
    .good {
      display: flex;
      flex-wrap: wrap;
      margin: 20px 8px;
      .good-item {
        float: left;
        background: #fff;
        width: 24.79%;
        transition: all 0.5s;
        height: 430px;
        border: 1px solid #efefef;
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
    .flex_center {
      padding-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>


