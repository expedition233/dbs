<template>
  <div class="container">
      <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>
    <div class="uploadBox">
      <div style="display: flex; width: 85%; justify-content: space-between">
        <div class="text">商品图片:</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://47.100.226.180:3000/common/upload/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" class="selBtn" 
            >选择图片</el-button
          >
          <!-- <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    > -->
          <div
            slot="tip"
            class="el-upload__tip"
            style="font-size: 10px; margin: 20px"
          >
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </div>
    <div class="infoBox">
      <div class="optContainer">
        <div class="titleBox" style="margin-top: 10px">
          商品名称:
          <input type="text" id="title" v-model="title"/>
        </div>
        <div class="detailBox" style="margin-top: 10px">
          商品描述:
          <input type="text" id="detail" v-model="detail"/>
        </div>
        <div class="priceBox" style="margin-top: 10px">
          商品价格:
          <input type="text" id="price" v-model="price"/>
        </div>
        <div class="typeBox" style="margin-top: 10px; margin-bottom: 10px">
          商品种类:
          <select name="productType" id="productType" v-model="type">
            <option value="鞋包">鞋包</option>
            <option value="美妆">美妆</option>
            <option value="服饰">服饰</option>
            <option value="箱包">箱包</option>
            <option value="配饰">配饰</option>
            <option value="数码">数码</option>
            <option value="手表">手表</option>
          </select>
        </div>
      </div>
    </div>
    <button class="submitBtn" @click="submit">提交</button>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "OnSale",
  data() {
    return {
      fileList: [],
      title: "",
      detail: "",
      type: "",
      price: "",
      ptUrl: "",
    };
  },
  computed: {
      ...mapState(["user"])
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    setPtUrl(ptUrl){
        console.log("param:",ptUrl)
        this.ptUrl = ptUrl;
        console.log("this.pturl:",this.ptUrl)
    },
    uploadSuccess(response, file, fileList){
        console.log("response:", response);
        // ptUrl = response.data;
        this.setPtUrl(response.data);
        var data = {
            goodName: this.title,
            goodPrice: this.price,
            goodInfo: this.detail,
            goodPtUrl: this.ptUrl,
            goodTypes: this.type,
            sellerId: this.user.id,
            sellerAd: this.user.userAd,
        };
        console.log("data",data)
        this.$http({
            method: "post",
            url: "/good",
            data: data,
        }).then(
            (res) => {
                console.log("axios response", res);
                alert("上架商品成功")
                this.$router.push("/personal")
            },
            (err) => {
                console.log(err);
            }
        )
    },
    submit(){
        this.$refs.upload.submit();
    }
  },
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
.uploadBox {
  width: 50%;
  /* border: 1px saddlebrown solid; */
  display: flex;
  justify-content: space-evenly;
  height: 30%;
  font: 1em sans-serif;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.753);
  margin-top: 100px;
}
.upload-demo {
  /* border: 1px saddlebrown solid; */
  position: relative;
  left: -30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  height: auto;
}
.selBtn {
  margin-top: 60px;
  margin-left: 15%;
  border: 0ch;
  width: 120px;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  background: rgba(255, 82, 0, 1);
}
button:hover {
  background-color: rgb(255,118,0);
}
.text {
  display: flex;
  align-items: center;
}

.infoBox {
  width: 50%;
  /* border: 1px seagreen solid; */
  display: flex;
  justify-content: center;
  font-size: 1em;
  margin-top: 30px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.753);
}
.optContainer {
  width: 85%;
  /* border: 1px seagreen solid;s */
}
#title,
#detail,
#price,
#productType {
  height: 25px;
  outline: 0ch;
  /* font: 1em sans-serif; */
  margin-left: 60px;
  width: 50%;
  font-size: 10px;
}
#title,
#detail,
#price {
  height: 25px;
  outline: 0ch;
  /* font: 1em sans-serif; */
  margin-left: 60px;
  width: 50%;
  font-size: 10px;
}
#productType {
  width: 100px;
  height: 30px;
  font-size: 20px;
}
.submitBtn{
  width: 150px;
  height: 50px;
  font: 1.3em sans-serif;
  font-weight: bold;
  border: 0ch;
  margin-top: 50px;
  color: rgb(255, 255, 255);
  background: rgba(255, 82, 0, 1);
  border-radius: 30px;
}
</style>