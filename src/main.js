import Vue from 'vue'
import './cube-ui'
import './cube-ui'
import './cube-ui'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Message } from 'element-ui';
import {
  /* eslint-disable no-unused-vars */
  Button,
  Loading,
  Popup,
  Toast,
  Picker,
  Scroll,
  Slide,
  createAPI
} from 'cube-ui'
import SubscribeDialog from '@/components/subscribe-dialog/subscribe-dialog'
import ShareDialog from '@/components/share-dialog/share-dialog'
// import GongzonghaoDialog from '@/components/share-dialog/gongzonghao-dialog'
createAPI(Vue, SubscribeDialog, [], true)
createAPI(Vue, ShareDialog, [], true)
// createAPI(Vue, GongzonghaoDialog, [], true)

Vue.use(Button)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Scroll)
Vue.use(Slide)
// Vue.use(Message)  去掉，不然进入答题就会有消息（空的）
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(( to, from, next ) => {
  //判断当前是否是新建的auth路由空白页面
  if (to.name == 'empty') {
    let wechatopenid = localStorage.getItem('shan_wechat_oauth_openid');
    if (typeof(wechatopenid) == "undefined" || !wechatopenid) {//如果没有token,则让它授权 
      //保存当前路由地址，授权后还会跳到此地址
      //授权请求,并跳转http://www.hhfff.cn/oauth2.php路由页面
      window.location.href = 'http://www.hhfff.cn/oauth2.php';
    } else {
      //有wechatopenid 判断是否已经答过题 写个方法 **
      let URL = 'http://www.hhfff.cn/api/addDatiUser'    
        axios.post(URL,{
            'openid':wechatopenid
        }).then((response) => {  //箭头函数，上下文穿透，才能用this.$router
            let res = response.data;
            console.log(res)
            let res_code = res.code;
            if (res_code == '000') {
                //将openid 存储在本地
                // localStorage.setItem("shan_wechat_oauth_openid",res.data.openid);
                //跳转到答题页   千万不能用 this.$router.push()  报$router is not defined
                router.push('/dati/item');
            } else if (res_code == '002' || res_code == '003') {
                //参数有误或者openid插入dati表失败，提示不能答题
                // this.$message({
                //   message: res.msg,
                //   type: 'success'
                // });
                // alert(res.msg)
                Message.success(res.msg);
                return false;
            }
        })
        .catch((error) =>{
            console.log(error);
        });
      // next();
    }
  } else {
    next();
  }
});