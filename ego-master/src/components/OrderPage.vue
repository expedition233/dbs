<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>
    <div class="header">
      <div class="textBox">确认订单</div>
    </div>
    <div class="buyerInfo">
      <div class="avatarBox">
        <img class="avatar" :src="`http://47.100.226.180:3000/common/download?name=` + user.userPtUrl" alt="" />
      </div>
      <div class="userInfo">
        <div class="userContainer">
          <div class="userName">{{user.userName}}</div>
          <div class="phone">{{user.id}}</div>
        </div>
        <div class="address">
            {{user.userAd}}
        </div>
      </div>
    </div>
    <div class="orderInfo">
        <div class="sellerInfo">
            <!-- <div class="avatarBox">
              <img :src="`http://47.100.226.180:3000/common/download?name=` + seller.userPtUrl" alt="">
            </div> -->
            <div class="sellerName">
                Ego卖家
            </div>
            <div class="sellerId">
                #{{this.$route.params.good.sellerId}}
            </div>
        </div>
        <div class="productInfo">
            <div class="productPic">
                <img :src="`http://47.100.226.180:3000/common/download?name=` + good.goodPtUrl" alt="pic">
            </div>
            <div class="productContainer">
                <div class="productName">
                    {{good.goodName}}
                </div>
                <div class="productIntroduction">
                    #{{good.goodInfo}}
                </div>
            </div>
            <div class="priceContainer">
                ￥{{good.goodPrice}}
            </div>
        </div>
        <div class="total">
            <div class="totalTextBox">
                合计 : 
            </div>
            <div class="totalPrice">
                ￥{{good.goodPrice}}
            </div>
        </div>
    </div>
    <el-button type="submitOrder" round @click="createTicket">提交订单</el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "OrderPage",
  data() {
    return {
      seller: {},
    };
  },
  computed: {
    ...mapState(["user"]),
    good(){
      return this.$route.params.good;
    }
  },
  methods: {
    createTicket(){
      this.$http({
        method: "post",
        url: "/trade",
        data: {
          goodId: this.good.id,
          sellerId: this.good.sellerId,
          buyerId: this.user.id,
        }
      }).then(
        (res) => {
          console.log(res.data);
          this.$router.push("/personal");
        },
        (err) => {
          console.log(err.message);
        }
      )
    }
  },
  mounted(){
    this.$http({
      method: "get",
      url: `/user/${this.$router.params.good.sellerId}`,
    }).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    )
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background: rgb(248, 248, 248); */
  background: url("../assets/productDetailBg.png") no-repeat;
  background-size: 100% 100%;
  /* justify-content: center; */
  align-items: center;
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
.header {
  /* border: 1px salmon solid; */
  height: 10%;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.textBox {
  /* border: 1px salmon solid; */
  font-size: 20px;
}
.buyerInfo {
  display: flex;
  width: 50%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 20px;
  color: rgb(49, 49, 49);
  background: rgb(226, 226, 226);
  border-radius: 30px;
  opacity:0.9;
}
.avatarBox {
  width: 80px;
  height: 80px;
  /* border: 1px saddlebrown solid; */
  padding-top: 10px;
}
.avatarBox img {
  /* border: 1px saddlebrown solid !important; */
  margin-top: -10%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50%;
}
.userInfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
    /* border: 1px saddlebrown solid !important; */
    margin-left: 3%;
    align-self: center;
}
.userContainer{
    display: flex;
}
.userName{
    margin-right: 20px;
}
.orderInfo {
  margin-top: 30px;
  width: 50%;
  /* border: 1px salmon solid; */
  padding: 1%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: rgb(49, 49, 49);
  background: rgb(226, 226, 226);
  opacity:0.9;
}
.sellerInfo{
    display: flex;
    /* border: 1px saddlebrown solid; */
    width: 80%;
    align-items: center;
    color: rgb(92, 92, 92);
}
.sellerInfo .avatarBox{
    width: 50px;
    height: 50px;
    margin-right: 30px;
}
.productInfo{
    width: 90%;
    margin-top: 20px;
    display: flex;
}
.productPic{
    height: 150px;
    width: 150px;
    margin-right: 30px;
}
.productPic img{
    height: 100%;
    width: 100%;
    object-fit: fill;
    border-radius: 10%;
}
.productContainer{
    width: 60%;
}
.productName{
    margin-bottom: 10px;
}
.priceContainer{
    font-size: 30px;
}
.total{
    margin-top: 40px;
    display: flex;
    width: 90%;
    
}
.totalTextBox{
    font-size: 28px;
    width: calc(60% + 230px);
    /* border: 1px saddlebrown solid; */
}
.totalPrice{
    font-size: 30px;
    color: rgba(255, 82, 0, 1);
}
.el-button--submitOrder{
    font-size: 20px ;
  /* font-weight:100 !important; */
  font-family: sans-serif;
  color: #fff !important;
  background: rgba(255, 82, 0, 1) ;
  border: 0px ;
  position: fixed;
  bottom: 5%;
  left: 42.5%;
  width: 15%;
  height: 8%;
  border-radius: 30px ;
}
.el-button--submitOrder:hover {
  background-color: rgb(255,118,0);
}
</style>