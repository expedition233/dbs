import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import LoginForm from "../components/LoginForm"
import Register from "../components/Register"
import ProductList from "../components/ProductList"
import ProductDetail from "../components/ProductDetail"
import OrderPage from "../components/OrderPage"
import Personal from "../components/Personal"
import Tickets from '../components/Tickets'
import MessageList from "../components/MessageList"
import Message from "../components/Message"
import OnSale from "../components/OnSale"
import AdminProductDetail from "../components/AdminProductDetail"
import AdminLogin from "../components/AdminLogin"
import AdminProductList from "../components/AdminProductList"
import UpdateProfile from "../components/UpdateProfile"
import Shoppingcart from "../components/Shoppingcart"
import vuex from "../store"
// import { Message } from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            name: "login",
            path: "/login",
            component: Login,
        },
        {
            name: "register",
            path: "/register",
            component: Register,
        },
        {
            name: "loginForm",
            path: "/loginForm",
            component: LoginForm,
        },
        {
            path: "/ProductList",
            component: ProductList,
        },
        {
            name: "ProductDetail",
            path: "/ProductDetail/:goodStr",
            component: ProductDetail,
        },
        {
            name: "orderPage",
            path: "/orderPage",
            component: OrderPage,
        },
        {
            path: "/personal",
            component: Personal,
        },
        {
            name: "Tickets",
            path: "/tickets",
            component: Tickets,
        },
        {
            path: "/MessageList",
            component: MessageList,
        },
        {
            name:"Message",
            path: "/Message/:toUserId",
            component: Message,
        },
        {
            path: "/onSale",
            component: OnSale,
        },
        {
            path: "/adminLogin",
            component: AdminLogin
        },
        {
            path: "/adminProductList",
            component: AdminProductList
        },
        {
            name: "AdminProductDetail",
            path: "/AdminProductDetail/:goodStr",
            component: AdminProductDetail
        },
        {
            path: "/updateProfile",
            component: UpdateProfile
        },
        {
            path: "/Shoppingcart",
            component: Shoppingcart
        },
    ]
});
// router.beforeEach(
//     (to,from,next) => {
//         if (to.name !== "login"){
//             // console.log(vuex.state.user.id)
//             if ("id" in vuex.state.user){
//                 console.log(vuex.state.user)
//                 next();
//             }else{
//                 console.log("not login")
//                 next("/login")
//             }
            
//         }
//     }
// )
export default router;