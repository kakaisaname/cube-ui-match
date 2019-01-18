<template>
   <div>
       <!-- <p class="tip-eg">
			<cube-tip
				ref="tip2"
				:direction="direction"
				:style="tipStyle"
				@close="close"
				@click="clickHandler">
				<div>{{msg}}</div>
			</cube-tip>
		</p> -->
   </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui';
export default {
    name:'oauth',
    // data () {
    //     return {
    //         direction: '',
    //         tipStyle: '',
    //         msg:''
    //     }
    // },
    created () {
        //alert(this.$route.query.code)
        //1、获取到code
        let code = this.$route.query.code;
        //2、用code 请求服务端获取openid
            //发送请求,然后返回openid
        let URL = 'http://www.hhfff.cn/api/addDatiUser'    
        axios.post(URL,{
            'code':code
        }).then((response) => {  //箭头函数，上下文穿透，才能用this.$router
            let res = response.data;
            console.log(res)
            let res_code = res.code;
            if (res_code == '000') {
                //将openid 存储在本地
                localStorage.setItem("shan_wechat_oauth_openid",res.data.openid);
                //跳转到答题页
                this.$router.push('/dati/item');
            } else if (res_code == '002' || res_code == '003') {
                //参数有误或者openid插入dati表失败，提示不能答题
                Message.success(res.msg);
                this.$router.push('/');
                return false;
            }
        })
        .catch((error) =>{
            console.log(error);
        });
    },
    methods: {
        showTip(){ //弹出提示框
			this.direction = 'top'
      		this.$refs.tip2.show()
			this.tipStyle = 'left: 100px; top: 30px;'
			return false;
		 },close() { //关闭提示后，跳转到答题首页
		 	this.$router.push('/');
    	},
    	clickHandler() {
      		console.log('click tip area')
    	},
    }
}
</script>
