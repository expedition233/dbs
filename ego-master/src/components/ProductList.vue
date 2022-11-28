<template>
  <div id="ProductList">
    <el-container>
      <el-header height="20%">
        <div class="imgBox">
          <img class="logo" src="../assets/logo.png" alt="" />
        </div>
        <div class="searchBox">
          <i class="el-icon-search icon"></i>
          <input type="text" placeholder="search" v-model="searchText"/>
          <button class="searchBtn"  @click="search">搜索</button>
        </div>
        <div class="user_avatar">
          <img
            class="avatar"
            :src="
              `http://47.100.226.180:3000/common/download?name=` + user.userPtUrl
            "
            alt=""
            @click="$router.push('/personal')"
          />
        </div>
      </el-header>
      <el-container>
        <el-aside width="17%">
          <el-menu class="el-menu-vertical-demo" default-active="2">
            <el-menu-item index="2" @click="Switch(`all`)">
              <i
                class="el-icon-menu"
                style="font-size: 20px; margin-right: 10px"
              ></i>
              <span slot="title">所有商品</span>
            </el-menu-item>
            <el-menu-item index="3" @click="Switch('shoes')">
              <span slot="title">鞋类</span>
            </el-menu-item>
            <el-menu-item index="4" @click="Switch('clothes')">
              <span slot="title">服饰</span>
            </el-menu-item>
            <el-menu-item index="5" @click="Switch('digitals')">
              <span slot="title">数码</span>
            </el-menu-item>
            <el-menu-item index="6" @click="Switch('makeups')">
              <span slot="title">护肤彩妆</span>
            </el-menu-item>
            <el-menu-item index="7" @click="Switch('bags')">
              <span slot="title">箱包</span>
            </el-menu-item>
            <el-menu-item index="8" @click="Switch('watches')">
              <span slot="title">手表</span>
            </el-menu-item>
            <el-menu-item index="9" @click="Switch('decorates')">
              <span slot="title">潮流配饰</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="productBoxContainer">
            <div
              class="productBox"
              v-for="item in this.productList"
              :key="item.id"
            >
              <div class="productImgBox">
                <img
                  :src="
                    `http://47.100.226.180:3000/common/download?name=` +
                    item.goodPtUrl
                  "
                  alt="no pic"
                />
                <!-- <img :src=" `http://ego.vipgz4.91tunnel.com/common/download?name=` + productList[0].goodPtUrl" alt="no pic"> -->
              </div>
              <div class="detailBox">
                <div class="type">
                  <router-link :to="`/ProductDetail/${JSON.stringify(item)}`">{{
                    item.goodName
                  }}</router-link>
                </div>
                <div class="price">￥{{ item.goodPrice }}</div>
              </div>
            </div>
          </div>
          <div class="pageContainer">
            <div class="pages">
              <span
                v-for="index in this.pages"
                :key="index"
                @click="paging(index)"
                :class="index === curPage ? 'curPage' : 'notCurPage'"
                >{{ index }}</span
              >
            </div>
          </div>
        </el-main>
        <el-aside width="17%">
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item
              index="2"
              class="personal_item"
              @click="$router.push('/personal')"
            >
              <i
                class="el-icon-user"
                style="font-size: 20px; margin-left: -83px"
              ></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item
              index="3"
              class="personal_item"
              @click="$router.push('/Shoppingcart')"
            >
              <i
                class="el-icon-s-order"
                style="font-size: 20px; margin-left: -83px"
              ></i>
              <span slot="title">购物车</span>
            </el-menu-item>
            <el-menu-item
              index="4"
              class="personal_item"
              @click="$router.push('/messageList')"
            >
              <i
                class="el-icon-chat-line-round"
                style="font-size: 20px; margin-left: -83px"
              ></i>
              <span slot="title">我的消息</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ProductList",
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      categoryPage: {
        all: "1",
        shoes: "1",
        clothes: "1",
        digitals: "1",
        makeups: "1",
        bags: "1",
        watches: "1",
        decorates: "1",
      },
      searchText: "",
      switcher: "",
      curCategory: "",
      curPage: 1,
      pages: 0,
      productList: [],
      allList: [],
      shoesList: [],
      clothesList: [],
      digitalsList: [],
      makeupsList: [],
      bagsList: [],
      watchesList: [],
      decoratesList: [],
    };
  },
  methods: {
    search() {
      console.log("search")
      if (this.searchText !== "") {
        this.curPage = 1;
        this.$http({
          method: "get",
          url: "/good/page/" + this.curPage + "/8",
          params: {
            name: this.searchText
          }
        }).then(
          res => {
            this.productList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.productList.length; i++) {
              if (this.productList[i].isPassed != 1) {
                tempList.push(this.productList[i]);
              }
            }

            this.productList = tempList;
          }
        )
      } else {
        this.productList = this.allList
      }
    },
    Switch(str) {
      this.switcher = str;
      this.curPage = 1;
      console.log("switcher:", this.switcher);
      this.handleSwitch();
    },
    getPage(total) {
      total = parseInt(total);
      let ret = total / 8;
      if (Math.floor(ret) < ret) {
        ret = Math.floor(ret) + 1;
      }
      if (ret <= 0) {
        ret = 1;
      }
      return ret;
    },
    paging(num) {
      this.curPage = num;
      let params = {};
      if (this.curCategory !== "all") {
        params = {
          categoryName: this.curCategory,
        };
      }
      this.$http({
        method: "get",
        url: "/good/page/" + this.curPage.toString() + "/8",
        params,
      }).then((res) => {
        console.log(res.data.data.records);
        this.productList = res.data.data.records;
        var tempList = [];

        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].isPassed != 1) {
            tempList.push(this.productList[i]);
          }
        }

        this.productList = tempList;
      });
    },
    handleSwitch() {
      if (this.switcher === "clothes") {
        if (this.clothesList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "服饰",
            },
          }).then((res) => {
            console.log("switch to clothes:", res);
            this.clothesList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.clothesList.length; i++) {
              if (this.clothesList[i].isPassed != 1) {
                tempList.push(this.clothesList[i]);
              }
            }

            this.clothesList = tempList;

            this.productList = this.clothesList;
            this.curCategory = "服饰";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.clothes = this.pages;
          });
        }
        this.productList = this.clothesList;
      } else if (this.switcher === "shoes") {
        if (this.shoesList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "鞋包",
            },
          }).then((res) => {
            console.log("switch to shoesList:", res);
            this.shoesList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.shoesList.length; i++) {
              if (this.shoesList[i].isPassed != 1) {
                tempList.push(this.shoesList[i]);
              }
            }

            this.shoesList = tempList;

            this.productList = this.shoesList;
            this.curCategory = "鞋包";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.shoes = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.shoes.toString());
        this.productList = this.shoesList;
      } else if (this.switcher === "digitals") {
        if (this.digitalsList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "数码",
            },
          }).then((res) => {
            console.log("switch to digitalsList:", res);
            this.digitalsList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.digitalsList.length; i++) {
              if (this.digitalsList[i].isPassed != 1) {
                tempList.push(this.digitalsList[i]);
              }
            }

            this.digitalsList = tempList;

            this.productList = this.digitalsList;
            this.curCategory = "数码";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.digitals = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.digitals.toString());
        this.productList = this.digitalsList;
      } else if (this.switcher === "makeups") {
        if (this.makeupsList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "美妆",
            },
          }).then((res) => {
            console.log("switch to makeupsList:", res);
            this.makeupsList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.makeupsList.length; i++) {
              if (this.makeupsList[i].isPassed != 1) {
                tempList.push(this.makeupsList[i]);
              }
            }

            this.makeupsList = tempList;

            this.productList = this.makeupsList;
            this.curCategory = "美妆";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.makeups = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.makeups.toString());
        this.productList = this.makeupsList;
      } else if (this.switcher === "bags") {
        if (this.bagsList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "箱包",
            },
          }).then((res) => {
            console.log("switch to digitalsList:", res);
            this.bagsList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.bagsList.length; i++) {
              if (this.bagsList[i].isPassed != 1) {
                tempList.push(this.bagsList[i]);
              }
            }

            this.bagsList = tempList;

            this.productList = this.bagsList;
            this.curCategory = "箱包";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.bags = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.bags.toString());
        this.productList = this.bagsList;
      } else if (this.switcher === "watches") {
        if (this.watchesList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "手表",
            },
          }).then((res) => {
            console.log("switch to watchesList:", res);
            this.watchesList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.watchesList.length; i++) {
              if (this.watchesList[i].isPassed != 1) {
                tempList.push(this.watchesList[i]);
              }
            }

            this.watchesList = tempList;

            this.productList = this.watchesList;
            this.curCategory = "手表";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.watches = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.watches.toString());
        this.productList = this.watchesList;
      } else if (this.switcher === "decorates") {
        if (this.decoratesList.length === 0) {
          this.$http({
            method: "get",
            url: "good/page/" + this.curPage.toString() + "/8",
            params: {
              categoryName: "配饰",
            },
          }).then((res) => {
            console.log("switch to decoratesList:", res);
            this.decoratesList = res.data.data.records;
            var tempList = [];

            for (let i = 0; i < this.decoratesList.length; i++) {
              if (this.decoratesList[i].isPassed != 1) {
                tempList.push(this.decoratesList[i]);
              }
            }

            this.decoratesList = tempList;

            this.productList = this.decoratesList;
            this.curCategory = "配饰";
            this.pages = this.getPage(res.data.data.total);
            this.categoryPage.decorates = this.pages;
          });
        }
        this.pages = this.getPage(this.categoryPage.decorates.toString());
        this.productList = this.decoratesList;
      } else {
        var tempList = [];

        for (let i = 0; i < this.allList.length; i++) {
          if (this.allList[i].isPassed != 1) {
            tempList.push(this.allList[i]);
          }
        }

        this.allList = tempList;
        this.productList = this.allList;
        this.curCategory = "all";
        this.curPage = 1;
        this.pages = this.categoryPage.all;
      }
    },
  },
  beforeCreate() {
    this.$http({
      method: "get",
      url: "/good/page/1/8",
    }).then(
      (res) => {
        if (res.data.code === 1) {
          console.log("res:", res);
          this.allList = res.data.data.records;
          this.productList = res.data.data.records;
          this.pages = this.getPage(res.data.data.total);
          this.categoryPage.all = this.pages;

          var tempList = [];

          for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].isPassed != 1) {
              tempList.push(this.productList[i]);
            }
          }

          this.productList = tempList;
        } else {
          console.log("加载商品失败");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>

<style scoped>
#ProductList {
  height: 100%;
  width: 100%;
  /* background-image: url("../assets/ProductList.png"); */
  background-size: 100% 100%;
  /* background: rgb(189, 127, 127); */
}
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  width: 100%;
  background-color: rgb(248, 248, 248);
  /* color: #333; */
  align-content: center;
  justify-content: space-between;
  /* border-bottom: rgb(165, 165, 165) 1px solid; */
}
.logo {
  margin-top: 5%;
  top: 50%;
  left: 50%;
  /* height: 50%; */
  /* height: 50%; */
  /* border: 1px yellow solid; */
  object-fit: contain;
}
.imgBox {
  height: 100%;
  width: 13.5%;
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  /* display: inline-block; */
  /* vertical-align: middle; */
  /* text-align: center; */
  justify-content: center;
  /* border: 1px yellow solid; */
  margin-left: 5%;
}
.searchBox {
  /* border: yellowgreen 2px solid; */
  margin-top:3%;
  width: 30%;
  height: 60%;
  margin-left: -2%;
}
.searchBtn{
  outline: none;
  position: absolute;
  right: 30%;
  top: 11%;
  height: 35px;
  width: 80px;
  border: 0px;
  background: rgba(255, 82, 0, 1);
  color: rgb(255, 255, 255);
  border-radius: 15px;
  font-size: 15px;
}
.icon {
  position: absolute;
  font-size: 100%;
  top: 12.4%;
  left: 35.5%;
  z-index:1;
  color: rgb(159, 159, 159);
}
input {
  position: relative;
  top: 44%;
  width: 98%;
  height: 35%;
  border-radius: 20px;
  background: rgb(248, 248, 248);
  border: 2px solid rgb(255,118,0);
  outline: none;
  font-size: 15px;
  text-indent: 13%;
}
.user_avatar {
  position: relative;
  left: 0%;
  /* border: yellowgreen 2px solid; */
  width: 20%;
  display: flex;
  justify-content: center;
}
.avatar:hover {
  cursor: pointer;
}
.avatar {
  /* position: relative; */
  left: 8%;
  height: 80px;
  width: 80px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  align-self: center;
}
.el-aside {
  background-color: rgb(248, 248, 248);
  /* color: #333; */
  text-align: center;
  line-height: 200px;
  /* border: rgb(255,118,0) 1px solid; */
  /* border-right: rgb(165, 165, 165) 1px solid; */
  /* border-left: rgb(165, 165, 165) 1px solid; */
}
/* .el-menu {
  background: rgba(0, 0, 0, 0);
} */
.el-menu-item {
  margin-top: -5px;
  /* margin-left: -15px; */
  font-size: 1.0em;
  background-color: rgb(248, 248, 248);
}
.el-menu-item:hover {
  color: rgb(255,118,0);
  background-color: rgba(3, 19, 33, 0) !important;
}
.el-menu-item.is-active {
  color: rgb(255,118,0);
  background-color: rgba(3, 19, 33, 0) !important;
}
.el-main {
  /* background-color: rgb(236, 230, 220); */
  margin: 0%;
  padding: 0%;
  background-color: rgb(248, 248, 248);
  /* color: #333; */
  /* text-align: center; */
  /* line-height: 160px; */
  height: 100%;
  padding-top: 1%;
  /* padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 2%;
  padding-right: 2%; */
}
.productBoxContainer {
  padding: 3%;
  padding-top: 0%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  height: 89%;
}
.productBox {
  width: 23%;
  height: 42%;
  margin-left: 1%;
  margin-bottom: 3%;
  /* background: rgb(228, 228, 228); */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
}
.productImgBox {
  height: 80%;
}
.productImgBox img {
  height: 100%;
  width: 100%;
}
.type {
  margin-top: 5%;
}
.price {
  color: rgb(147, 145, 145);
  font-size: larger;
  margin-top: 3%;
}
.pageContainer {
  display: flex;
  justify-content: center;
}
.pages .notCurPage {
  margin-left: 5px;
  text-decoration: #333 underline;
  cursor: pointer;
}
.curPage {
  margin-left: 5px;
  text-decoration: none;
}
</style>