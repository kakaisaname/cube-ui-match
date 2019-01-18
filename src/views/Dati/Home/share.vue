<template>
    <div>
        fenciang
    </div>    
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
import wx from 'weixin-js-sdk'       //引入wx sdk
export default {
    name:'share',
    created () {
        //获取微信配置
        this.share()
    },
    methods: {
        share(){
            //获取页面URL
            let requestUrl = "http://www.hhfff.cn/api/getWxConfig"
            axios.get(requestUrl)
            .then((response) => {
                //判断是否获取成功
                let res = response.data
                if (res.code == '000') { //获取微信配置成功
                    let result = res.data
                    //----------微信配置信息----------------------
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                        appId: result.appId, // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature,// 必填，签名
                        jsApiList: [
                            // "updateAppMessageShareData", //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                            // "updateTimelineShareData",    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                            "onMenuShareTimeline"    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
			            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    //---------微信处理验证成功或失败信息--------------
                    //处理验证失败的信息
                    wx.ready(function () {
                        wx.onMenuShareTimeline({ 
                            title: '小善答题', // 分享标题
                            link: 'http://questions.hhfff.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://118.24.61.194:8089/share.jpg', // 分享图标
                            success: function () {
                            // 设置成功
                                console.log("分享到朋友圈成功返回的信息为:", res);
                                Message.success('分享到朋友圈成功');
                            }
                        });
                    })
                     wx.error(function (res) {
                        console.log('验证失败返回的信息:', res);
                     });
                } else if (res.code == '003') { //失败
                    Message.success('分享功能，系统正在维护中。。。')
                    return false
                }
            })
            .catch((error) => {
                Message.success('分享功能，系统正在维护中。。。')
                return false
            })
        }
    }
}
</script>



