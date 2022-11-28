<template>
  <div id="Login">
      <button @click="goLoginForm">Log in</button>
  </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        goLoginForm(){
            this.$router.push("/loginForm");
        }
    }
}
</script>

<style scoped>
#Login{
    position:fixed; 
    top: 0; 
    left: 0;
    /* border: 1px salmon solid; */
    width: 100%;
    height: 100%;
    background: url("../assets/login.jpg") no-repeat;
    background-size: 100% 100%;
    /* -webkit-background-size: cover !important;
    -o-background-size: cover !important; */
    background-position: center 0;
}
button{
    border-radius: 30px;
    position: fixed;
    width: 28%;
    height: 10%;
    left:10%;
    /*left: calc(50% - 28%/2);*/
    /* left: calc(50% - %/2); */
    top: 60%;
    border: 0px;
    font-weight: bolder;
    font-size: 2.5em;
    background: rgba(255, 82, 0, 1);
    color: rgb(255, 255, 255);
}
button:hover{
    width: 30%;
    left:9%;
    /*left: calc(50% - 30%/2);*/
    height: 11%;
    top: 59.5%;
    font-size: 2.75em;
}
</style>