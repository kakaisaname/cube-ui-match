<template>
    <div>
        fenciang
    </div>    
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
export default {
    name:'share',
    created () {
        //获取微信配置
        this.share()
    },
    methods: {
        share(){
            //获取页面URL
            let url = window.location.href
            let requestUrl = "http://www.hhfff.cn/api/getWxConfig"
            axios.get(requestUrl,{
                params: {
                    url: url
                }
            })
            .then((response) => {
                //判断是否获取成功
                console.log(response)
            })
            .catch((error) => {
                Message.success('分享功能，系统正在维护中。。。')
                return false
            })
        }
    }
}
</script>



