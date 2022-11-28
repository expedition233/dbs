import axios from "axios";

const instance = axios;

//instance.defaults.baseURL = "http://localhost:8888/api";
//instance.defaults.baseURL = "http://101.132.17.89:3000";
instance.defaults.baseURL = "http://47.100.226.180:3000/";

instance.defaults.withCredentials = true;

export default instance;
