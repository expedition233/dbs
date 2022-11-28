<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>
    <div class="header">
      <div class="textBox">{{ toUser.userName }}</div>
    </div>

    <div class="recordContainer">
      <div class="records">
      
        <div class="record_wrapper" v-for="item in messages" :key="item.sendTime">
          <div class="record" :class="item.origin == user.id ? 'msg_right': 'msg_left'">
            <img :src="item.origin == user.id ? `http://47.100.226.180:3000/common/download?name=` + user.userPtUrl : `http://47.100.226.180:3000/common/download?name=` + toUser.userPtUrl " alt="" />
            <div class="text">{{item.msg}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="inputBox">
      <div class="inputContainer">
        <textarea v-model="inputText"></textarea>
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
//:class="item.origin === user.id ? 'msg_right': 'msg_left'"
import { mapState } from "vuex";
export default {
  name: "Message",
  data() {
    return {
      inputText: "",
      toUser: {
        id: "",
        userName: "",
      },
      websock: {},
      messages: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    initSocket() {
      this.websock = new WebSocket(
        `ws://47.100.226.180:3000/websocket/${this.user.id}`
      );
      // this.websock = new WebSocket(`ws://ego.vipgz4.91tunnel.com/websocket/${this.user.id}`);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    sendMessage() {
      let data = {
        origin: this.user.id,
        target: this.toUser.id,
        sendTime: Date.now().toString(),
        isRead: "0",
        msg: this.inputText,
      };
      this.messages.push(data)
      this.inputText = "";
      this.websock.send(JSON.stringify(data));
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
      let data = {
        origin: this.user.id,
        target: this.toUser.id,
        sendTime: Date.now().toString(),
        isRead: "0",
        msg: this.inputText,
      };
      console.log("data:", data);
      this.inputText = "";
      this.websock.send(JSON.stringify(data));
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误", e);
    },
    websocketonmessage: function (e) {
      let data = JSON.parse(e.data);
      this.messages = data.dataList;
      console.log(data);
    },
    websocketclose: function (e) {
      console.log("connection closed", e);
      console.log(e);
    },
  },
  beforeMount() {
    this.toUser.id = this.$route.params.toUserId;
    this.$http({
      method: "get",
      url: "/user/info/" + this.toUser.id,
    }).then(
      (res) => {
        console.log("/user/info/", res.data)
        this.toUser = res.data.data
      }
    )
    this.initSocket();
  },
};
</script>

<style scoped>
.container {
  /* display: flex; */
  width: 100%;
  height: 100%;
  background: url("../assets/productDetailBg.png") no-repeat fixed;
  background-size: 100% 100%;
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
  font-size: 20px;
  /* font-weight: 500; */
  margin-top: 0%;
  margin-left: 30px;
}
.recordContainer {
  display: flex;
  /* justify-self: center; */
  /* align-self: center; */
  justify-content: center;
  margin-top: 30px;
  height: 500px;
  /* width: 300px; */
  /* background: rgba(255, 255, 255, 0.638); */
}
.records {
  position: fixed;
  top:60px;
  width: 70%;
  height: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 30px;
  /* font-weight: medium; */
  color: rgb(87, 87, 87);
  background: rgba(240, 240, 240, 0.789);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.record {
  display: flex;
  background: rgb(255, 255, 255);
  padding: 1%;
  border-radius: 30px;
  /* display: block; */
}
.msg_left {
  float: left;
}
.msg_right {
  float: right;
}
.record img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.record .text {
  margin-left: 30px;
  /* border: 1px saddlebrown solid; */
  margin-top: 5px;
  margin-right: 20px;
  font-size: 20px;
}
.msg_right {
  flex-direction: row-reverse;
}

.inputBox {
  display: flex;
  justify-content: center;
}
.inputContainer {
  position: fixed;
  top: calc(100% - 120px);
  margin-top: 20px;
  background: rgba(91, 91, 91, 1);
  height: 50px;
  padding: 10px;
  width: 70%;
  height: 7%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.inputContainer textarea {
  width: 70%;
  height: 60%;
  font-size: 25px;
  resize: none;
  border-radius: 15px;
  padding: 5px;
  padding-top: 8px;
}
.inputContainer button {
  background: rgba(255, 82, 0, 1);
  color: rgb(255, 255, 255);
  border: 0px;
  height: 40px;
  width: 80px;
  font: 25px sans-serif;
  margin-bottom: 1px;
  margin-left: 30px;
  border-radius: 15px;
  outline: 0ch;
  font-size: 20px;
}
textarea:focus {
  outline: none;
}
.record_wrapper {
  margin-top: 15px;
}
</style>