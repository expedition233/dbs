<template>
  <div class="container">
    <div class="mainContainer">
      <!-- <div class="header">
        <div class="imgBox">
          <img src="../assets/logo.png" alt="logo" />
        </div>
        <div class="dashLine"></div> 
      </div> -->
      <div class="main">
        <div class="iconWrap">
          <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
        </div>
        <!-- <el-button type="subscribe" round>+ subscribe</el-button> -->
        <div class="carouselBox">
          <el-carousel indicator-position="outside" type="card" height="350px">
            <el-carousel-item v-for="item in 4" :key="item">
              <img
                class="carouselItem" 
                :src=" `http://47.100.226.180:3000/common/download?name=` + good.goodPtUrl"
                alt=""
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="dashLine2"></div>
        <div class="productInfo">
          <div class="InfoContainer">
            <div class="productName">
              {{ good.goodName }}
            </div>
            <div class="productIntroduction">
              #{{ good.goodInfo }}
            </div>
          </div>
          <div class="productPrice">
            ￥{{ good.goodPrice }}
          </div>
          <el-button round type="getit" @click="forbid">下架</el-button>
        </div>
      </div>
    </div>
    <!-- <div class="aside">
      <div class="avatarBox">
        <img :src="`http://47.100.226.180:3000/common/download?name=` + user.userPtUrl" alt="avatar" />
      </div>
    </div> -->
    <!-- <div :name="this.good.goodPtUrl"></div> -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "AdminProductDetail",
  data() {
    return {
      productName: "云朵吊灯 玻璃材质灯具",
      productIntroduction: "九层新 可刀",
      productPrice: "88",
    };
  },
  methods: {
    forbid(){
      let data = this.good;
      data.isPassed = 1;
      console.log(data)
      this.$http({
        method: 'put',
        url: "/good",
        data: data
      }).then(
        res => {
          console.log(res)
          alert("下架商品成功");
          this.$router.push("/adminProductList");
       }
      )
    }
  }
  ,
  computed: {
    good(){
      return JSON.parse(this.$route.params.goodStr)
    },
    ...mapState(['user']),
  },
  mounted(){
    console.log(this.good)
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background: url("../assets/productDetailBg.png") no-repeat;
    background-size: 100% 100%;
}
.mainContainer {
  width: 85%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 11%;
  /* background: rgb(240, 240, 240); */
  display: flex;
  flex-direction: column;
}
.imgBox {
  width: 15%;
  /* border: 1px saddlebrown solid; */
  margin-left: 5%;
}
.imgBox img {
  width: 100%;
  object-fit: fill;
}
.dashLine {
  height: 2px;
  width: 90%;
  background: rgb(196, 196, 196);
  align-self: center;
  margin-left: 14%;
}
.main {
  width: 100%;
  height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: rgb(210, 210, 210); */
}
.iconWrap {
  height: 50px;
  width: 50px;
  /* border: 1px saddlebrown solid; */
  /* margin-left: 3%; */
  position: absolute;
  top: 0%;
  left: 3%;
  font-size: 30px;
  color: rgb(111, 111, 111);
  text-align: center;
  line-height: 100px;
}
.el-button--subscribe {
  position: absolute;
  top: 1%;
  left: 13%;
  font-size: large !important;
  /* font-weight:100 !important; */
  font-family: sans-serif;
  color: #fff !important;
  background: rgba(255, 82, 0, 1) !important;
  border: 0px !important;
}
.carouselBox {
  margin-top: 8%;
  width: 70%;
  /* height: 90%; */
  /* border: #475669 1px solid; */
  margin-left: 20%;
  /* position: absolute; */
  /* top: 5%;
    left: 15%; */
}
.carouselItem {
  object-fit: fill;
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 100px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.dashLine2 {
  /* position: absolute;
    top: 80%; */
    height: 1px;
  width: 70%;
  background: rgb(196, 196, 196);
  align-self: center;
  margin-left: 20%;
}
.productInfo {
  /* border: saddlebrown 1px solid; */
  margin-left: 20%;
  display: flex;
  width: 70%;
  font-size: 20px;
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "San Francisco UI", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  justify-content: space-between;
}
.productName{
  margin-top: 5%;
  font-weight:bold;
  color: #fdfdfd;
}
.productIntroduction{
    margin-top: 5%;
    color: #8b8b8b;
}
.productPrice{
    font-weight: lighter;
    font-size: 50px;

}
.el-button--getit{
  position: fixed;
  color: #fff !important;
  bottom: 7%;
  left: 78%;
  width: 10%;
  height: 10%;
  border:0px;
  font-size: 30px;
  background: rgba(255, 82, 0, 1);
  font-weight: 100;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
}
.el-button--getit:hover {
  background-color: rgb(255,118,0);
}
/* .aside {
  width: 15%;
  display: flex;
  justify-content: center;
}
.avatarBox {
  width: 120px;
  border: 1px saddlebrown solid;
  padding-top: 10px;
}
.avatarBox img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
} */
</style>