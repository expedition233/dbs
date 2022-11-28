<template>
    <div class="container">
      <div class="iconWrap">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      </div>
  
      <div class="header">
        <div class="textBox">购物车</div>
      </div>
  
      <div class="recordContainer">
        <div class="records">
          <div
            class="record"
            v-for="(item) in this.cartList"
            :key="item.id"
          >
            <!-- <input
            type="checkbox"
            class="custom-control-input"
            :id="item.id"
            :checked="state"
            @change="stateChange"
            /> -->
            <div class="imgBox">
              <img class="productPic" :src=" `http://47.100.226.180:3000/common/download?name=` + item.goodPtUrl" alt="no pic" />
            </div>
            <div class="infoBox">
              <div class="productName" style="font-size: 20px;">{{item.goodName}}</div>
              <div class="productInfo" style="color:rgb(111, 111, 111)">{{item.goodInfo}}</div>
            </div>
            <div class="priceBox">￥{{item.goodPrice}}</div>
            <!-- <div class="isBuy" v-text="item.isBuy === true ? '买': '卖'"></div> -->
            <el-button round type="getit" @click="getit">get it</el-button>
            
          </div>
        </div>
        <el-button round type="clean" @click="clean">clean</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  export default {
    name: "Shoppingcart",
    data() {
      return {
        cartList: [],
        // state: {
        //     default: false,
        //     type: Boolean,
        // },
      };
    },
    computed: {
      ...mapState(['user']),
    },
    mounted() {
        console.log("no params")
        this.$http({
          method: "get",
          url: `/shoppingCart/list`,
        }).then(
          (res) => {
            // console.log("buyers" , res.data.data.buyers);
            let cartList = res.data.data;
            console.log("cartList:", this.cartList);
            // console.log("res:" , res);
            for (let i = 0; i < cartList.length; i++){
                this.$http({
                    method: "get",
                    url: `/good/${cartList[i].goodId}`,
                }).then(
                    (res) => {
                    console.log("res:" , res);
                    let data = res.data.data;
                    this.cartList.push(data);
                    }
                )
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      
    },
    methods: {
      getit(){
        this.$router.push({
          name: "orderPage",
          seller: {},
          params: {
            good: this.cartList
          },
        })
      },
      clean(){
        this.$http({
        method: "delete",
        url: "/shoppingCart/clean",
        data: {
          
        },
      }).then(
        (res) => {
          console.log(res.data);
          alert("删除成功");
          // setTimeout(() => {
          //     this.$router.push("/login");
          // }, 500);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
        // 复选框发生改变，调用这个事件
        // stateChange(e) {
        // // console.log(e);
        // const newState = e.target.checked;
        // // console.log(this.id);
        // // 触发自定义事件（子传父）
        // this.$emit('state-change', { id: this.id, value: newState})
        // }
    },
  };
  </script>
  
  <style scoped>
  a {
    text-decoration: none;
    color: rgb(111, 111, 111);
  }
  .container {
    /* display: flex; */
    width: 100%;
    height: 100%;
    background: url("../assets/productDetailBg.png") no-repeat;
    background-size: 100% 100%;
    /* background-attachment:fixed; */
  }
  .header {
    /* border: 1px salmon solid; */
    height: 10%;
    text-align: center;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* margin-bottom: 30px; */
  }
  .textBox {
    /* border: 1px salmon solid; */
    align-self: center;
    font-size: 18px;
    /* font-weight: 500; */
    margin-top: 0%;
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
  
  .records {
    width: 50%;
    /* border: 1px salmon solid; */
    padding: 1%;
    font-size: 25px;
    /* font-weight: medium; */
    color: rgb(37, 37, 37);
    background: rgb(240, 240, 240);
    border-radius: 30px;
    margin-bottom:2%;
    opacity:0.9;
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
  .textBox {
    margin-top:20px;
    margin-left: 30px;
  }
  .productPic {
    height: 100px;
    width: 100px;
    border-radius: 20px;
    /* box-shadow:whitesmoke 10px; */
  }
  .record {
    margin-top: 50px;
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
    /* border: 1px saddlebrown solid; */
    width: 200px;
    font-size: 18px;
    margin-left:80px;
    margin-right: auto;
    /* border: 1px saddlebrown solid; */
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

  .el-button--getit{
  position: relative;;
  color: #fff !important;
  bottom: 7%;
  left: -3%;
  width: 8%;
  height: 8%;
  border:0px;
  font-size: 15px;
  background: rgba(255, 82, 0, 1);
  font-weight: 100;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
}
.el-button--getit:hover {
  background-color: rgb(255,118,0);
}
  </style>