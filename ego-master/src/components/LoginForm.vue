<template>
  <div id="LoginForm">
    <div class="inputBox">
      <img src="../assets/logo.png" alt="" />
      <div class="inputContainer1">
        账号：<input type="text" v-model="username" />
      </div>
      <div class="inputContainer2">
        密码：<input type="password" v-model="pwd" />
      </div>
      <button @click="login" class="loginBtn">Log in</button>
      <button @click="$router.push('/register')" class="registerBtn">Register</button>
      <span class="errorMsg1" style="color: red" v-show="errorFlag === 1"
        >用户名或密码不能为空</span
      >
      <span class="errorMsg2" style="color: red" v-show="errorFlag === 2"
        >用户名或密码不正确</span
      >
      <span class="errorMsg2" style="color: red" v-show="errorFlag === 3">{{
        errMsg
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      pwd: "",
      errorFlag: 0,
      errMsg: "",
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["saveUser", "saveSse", "addUnreadMsgCount", 'saveSseMessage']),
    login() {
      if (this.username === "" || this.pwd === "") {
        this.errorFlag = 1;
      } else {
        this.$http({
          method: "post",
          url: "/user/login",
          data: {
            userName: this.username,
            password: this.pwd,
          },
        }).then(
          (res) => {
            // console.log(res.data);
            if (res.data.code == 1) {
              this.saveUser(res.data.data);
              //create and save SSE object
              if ('EventSource' in window){
                var sse = new EventSource("/api/sse/"+ res.data.data.id + "/connect/" );
                sse.onopen = (e) => {
                  console.log("SSE connected!!!!!");
                  this.saveSse(sse)
                };
                sse.onerror = (e) => {
                  console.log("SSE error!!!!!");
                };
                sse.onmessage = (e) => {
                  // console.log("message from sse!!!!!2222");
                  console.log("message from sse!!!!!",  JSON.parse(e.data));
                  this.saveSseMessage(JSON.parse(e.data).data);
                  //vuex中的未读消息加1
                  this.addUnreadMsgCount();
                }
              }



              // console.log("this.user",this.user);
              this.$router.push("/ProductList")
            } else {
              this.errorFlag = 3;
              this.errMsg = res.data.msg;
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
#LoginForm {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: url("../assets/LoginFormBg.jpg") no-repeat;
  background-size: 100% 100%;
  /* border: 1px blue solid; */
}
.inputBox {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 6.5%;
  border-radius: 40px;
  width: 42.5%;
  height: 55%;
  background: rgba(255, 255, 255, 0.5);
  /* border: 1px salmon solid; */
}
.inputContainer1 {
  margin-top: -15%;
  width: 60%;
  height: 5%;
  /* border: 1px solid saddlebrown; */
  font: 1em sans-serif;
  font-weight: bolder;
  font-size: 0.3em;
  color: rgb(97, 97, 97);
}
.inputContainer2 {
  margin-top: -15%;
  height: 5%;
  width: 60%;
  /* border: 1px solid saddlebrown; */
  font: 1em sans-serif;
  font-weight: bolder;
  font-size: 0.3em;
  color: rgb(97, 97, 97);
}
img {
  margin-top: -15%;
}
input {
  width: 80%;
  height: 150%;
  background: rgb(235, 235, 235);
  border: 0px;
  border-radius: 8%/50%;
  outline: none;
  font-size: 15px;
  text-indent: 10px;
}
button {
  position: fixed;
  top: 75%;
  background: rgba(255, 82, 0, 1);
  color: rgb(255, 255, 255);
  border: 0px;
  font-weight: bolder;
  font-size: 1.0em;
  width: 10%;
  height: 5%;
  border-radius: 30px;
  transition: background-color 0.5s;
  outline: none;
}
button:hover {
  background-color: rgb(255,118,0);
}
.registerBtn {
  left: 39%;
}
.loginBtn {
  left: 51%;
}
.errorMsg1 {
  position: fixed;
  top: 90%;
}
.errorMsg2 {
  position: fixed;
  top: 90%;
}
</style>