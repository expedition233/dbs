<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.push('/ProductList')"></i>
    </div>

    <div class="header">
      <div class="textBox1">个人主页</div>
    </div>

    <div class="avatarBox">
      <div class="user_avatar">
        <img class="avatar" :src="`http://47.100.226.180:3000/common/download?name=` + user.userPtUrl" alt="" />
      </div>
      <!-- <div class="dashline"></div> -->
    </div>

    <div class="userInfoContainer">
      <div class="userInfo">
        <div class="username">用户名:&nbsp;&nbsp;{{userName}}</div>
        <div class="address">默认地址:&nbsp;&nbsp;{{userAd}}</div>
      </div>
    </div>

    <div class="buttonContainer">
      <div class="buttons">
        <button class="onSaleBtn" @click="$router.push(`/onSale`)">上架商品</button>
        <button class="changeInfoBtn" @click="$router.push(`/updateProfile`)">更改信息</button>
      </div>
    </div>

    <div class="recordContainer">
      <div class="records">
        <div class="recordsHeader">
          <div class="textBox">交易记录</div>
          <a class="textBox" style="margin-right: 20px" @click="goTickets"
            >更多</a
          >
        </div>
        <div class="record" v-for="item in this.ticketList.slice(0,2)" :key="item.id">
          <div class="imgBox">
            <img class="productPic" :src=" `http://47.100.226.180:3000/common/download?name=` + item.goodPtUrl" alt="no pic" />
          </div>
          <div class="infoBox">
            <div class="productName" style="font-size: 18px;">{{item.goodName}}</div>
            <div class="productInfo" style="color:rgb(111, 111, 111)">{{item.goodInfo}}</div>
          </div>
          <div class="priceBox">￥{{item.goodPrice}}</div>
          <div class="isBuy" v-text="item.isBuy === true ? '买': '卖'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Personal",
  data(){
    return{
      ticketList: [],
    }
  },
  computed:{
    ...mapState(['user']),
    userAd(){
      // console.log(this.user.userAd === null)
      return this.user.userAd === null ? "你还没有地址快去设置吧" : this.user.userAd;
    },
    userName(){
      return this.user.userNickName === null ? this.user.userName : this.user.userNickName;
    },
    isBuy(flag){
      return flag === true ? "买": "卖"
    }
  },
  methods: {
    goTickets(){
      this.$router.push({
        name: 'Tickets',
        params: {
          tickets: this.ticketList
        }
      })
    }
  }
  ,
  mounted(){
    this.$http({
      method: "get",
      url: `/user/${this.user.id}`,
    }).then(
      (res) => {
        console.log( "data from /user/${this.user.id}", res.data);
        let ticketList = res.data.data.buyers;
        console.log("this.ticketList:", this.ticketList)
        for (let i = 0; i < ticketList.length; i++){
          this.$http({
            method: "get",
            url: `/good/${ticketList[i].goodId}`,
          }).then(
            (res) => {
              console.log("res:" , res);
              let data = res.data.data;
              data.isBuy = true;
              this.ticketList.push(data);
            }
          )
        }
        ticketList = res.data.data.sellers;
        for (let i = 0; i < ticketList.length; i++){
          this.$http({
            method: "get",
            url: `/good/${ticketList[i].goodId}`,
          }).then(
            (res) => {
              console.log("res:" , res);
              let data = res.data.data;
              data.isBuy = false;
              this.ticketList.push(data);
            }
          )
        }

        console.log("this.ticketList (after):", this.ticketList)
      },
      (err) => {
        console.log(err.message);
      }
    )
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(111, 111, 111);
}
a:hover{
  cursor: pointer;
}
.container {
  /* display: flex; */
  width: 100%;
  /* height: 100%; */
  background: url("../assets/productDetailBg.png") no-repeat;
  background-size: 100% 100%;
  background-attachment:fixed;
}
.header {
  /* border: 1px salmon solid; */
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-bottom: 30px;
}
.textBox {
  /* border: 1px salmon solid; */
  align-self: center;
  font-size: 18px;
  /* font-weight: 500; */
  margin-top: 0%;
  margin-left: 30px;
}
.textBox1{
  margin-top: 2%;
  margin-left: 30px;
}
.iconWrap {
  height: 100px;
  width: 100px;
  /* border: 1px saddlebrown solid; */
  /* margin-left: 3%; */
  position: absolute;
  top: 0%;
  left: 1%;
  font-size: 30px;
  color: rgb(111, 111, 111);
  text-align: center;
  line-height: 100px;
}
.avatarBox {
  margin-top: -1%;
  display: flex;
  /* justify-content: center; */
  /* border: rgb(73, 79, 61) 2px solid; */
}
.dashline {
  height: 1px;
  width: 80%;
  background: rgb(81, 81, 81);
  align-self: center;
}
.user_avatar {
  /* border: yellowgreen 2px solid; */
  margin-top: 15px;
  position: relative;
  left: 46.5%;
  /* width: 20%; */
  display: flex;
  justify-content: center;
}
.avatar {
  position: relative;
  left: 8%;
  height: 100px;
  width: 100px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  align-self: center;
}
.userInfoContainer, .buttonContainer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.buttonContainer{
  margin-top: 25px;
}
.userInfo,
.records,
.buttons {
  width: 50%;
  opacity:0.85;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 15px;
  /* font-weight: medium; */
  color: rgb(87, 87, 87);
  background: rgb(240, 240, 240);
  border-radius: 30px;
}
.records{
  margin-bottom:2%;
}
.buttons{
  display: flex;
}
button:hover {
  background-color: rgb(255,118,0);
}
.onSaleBtn, .changeInfoBtn{
  background: rgba(255, 82, 0, 1);
  color: rgb(255, 255, 255);
  border: 0px;
  font-size: 15px;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  transition: background-color 0.5s;
  outline: none;
  margin-right: 20px;
  margin-left: 20px;
}
.recordsHeader {
  display: flex;
  justify-content: space-between;
}
.username {
  margin-left: 50px;
  margin-bottom: 20px;
}
.address {
  margin-left: 30px;
}
.recordContainer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.productPic {
  height: 100px;
  width: 100px;
  border-radius: 20px;
  /* box-shadow:whitesmoke 10px; */
}
.record {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.imgBox,
.infoBox,
.priceBox {
  position: relative;
}
.imgBox {
  left: 5%;
}
.infoBox {
  margin-left: auto;
  margin-right: auto;
  /* border: 1px saddlebrown solid; */
  width: 200px;
}
.priceBox {
  font-size: 20px;
  left: -3%;
  color: rgba(255, 82, 0, 1);
}
.isBuy{
  position: absolute;
  right: 35%;
  color: rgba(255, 82, 0, 1);
  font-size: 20px;
  /* top: 50%; */
}
</style>