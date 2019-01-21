<template>
  <div class="subscribe-dialog-view">
    <cube-popup ref="popup" @mask-click="hide">
      <div class="share-dialog-wrapper">
        <img src="../../assets/img/share.jpg">
        <span class="close" @click="hide"><i class="cubeic-close"></i></span>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
import wx from 'weixin-js-sdk'       //引入wx sdk
export default {
  name: 'gongzonghao-dialog',
  mounted () {
    this.show(),
    this.share()
  },
  methods: {
    show () {
      this.$refs.popup.show()
      this.$emit('show')
    },
    hide () {
      this.$refs.popup.hide()
      this.$emit('hide')
      Message.error('您已取消分享')
      //跳转到首页
      setTimeout(() => {
          //分享后跳转 
          window.location.href = "http://questions.hhfff.cn"
      }, 3000)
    },
    share(){
            //也不知道为什么，分享 必须要刷新下页面才行，所以做以下判断
            let shan_share_fresh = sessionStorage.getItem('shan_share_fresh')
            if (!shan_share_fresh) {
                sessionStorage.setItem('shan_share_fresh',1)
                location.reload()
            }
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
                            "onMenuShareTimeline",    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                            "onMenuShareAppMessage",  //分享给朋友或群
			            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    //---------微信处理验证成功或失败信息--------------
                    //处理验证失败的信息
                    wx.ready(function () {
                        wx.onMenuShareTimeline({ 
                            title: '小善答题', // 分享标题
                            link: 'http://questions.hhfff.cn/share/gongzonghaoPicture', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://118.24.61.194:8089/share.jpg', // 分享图标
                            success: function () {
                            // 设置成功
                                sessionStorage.removeItem('shan_share_fresh')
                                console.log("分享到朋友圈成功返回的信息为:", res);
                                Message.success('分享到朋友圈成功');
                                let wechatopenid = localStorage.getItem('shan_wechat_oauth_openid');
                                let postUrl = "http://www.hhfff.cn/api/addUserDatiNum"
                                axios.post(postUrl, {
                                    openid:wechatopenid
                                  })
                                  .then(function (response) {
                                    console.log(response);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                });
                                //增加答题次数
                                setTimeout(() => {
                                    //分享后跳转 
                                    window.location.href = "http://questions.hhfff.cn"
                                }, 3000)
                                //直接跳转到首页
                            },
                            // cancel: function () {  //微信不给你机会判断用户到底有没有分享
                        });
                        wx.onMenuShareAppMessage({
                            title: '小善答题', // 分享标题
                            desc: '小善,专注女性保养', // 分享描述
                            link: 'http://questions.hhfff.cn/share/gongzonghaoPicture', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://118.24.61.194:8089/share.jpg', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                              // 用户点击了分享后执行的回调函数
                                sessionStorage.removeItem('shan_share_fresh')
                                console.log("分享到朋友成功返回的信息为:", res);
                                Message.success('分享给朋友成功');
                                let wechatopenid = localStorage.getItem('shan_wechat_oauth_openid');
                                let postUrl = "http://www.hhfff.cn/api/addUserDatiNum"
                                axios.post(postUrl, {
                                    openid:wechatopenid
                                  })
                                  .then(function (response) {
                                    console.log(response);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                });
                                //增加答题次数
                                setTimeout(() => {
                                    //分享后跳转 
                                    window.location.href = "http://questions.hhfff.cn"
                                }, 3000)  
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

<style lang="stylus">
  .share-dialog-wrapper
    position: relative
    box-sizing: border-box
    max-width: 360px
    margin: 0 25px
    padding: 38px 20px 20px 20px
    background-color: #F6F6F6
    border-radius: 4px
    .close
      position: absolute
      top 8px
      left 28px
      font-size: 28px
      color: #A2A8AF
    .title
      font-size: 17px
      color: #222C36
    img
      height: 180px
      margin: 8px 0 5px 0
    .desc
      line-height: 20px
      font-size: 13px
      color: #C0C8D1
    .button
      display: inline-block
      width: 230px
      padding: 14px
      border-radius: 4px
      font-size: 15px
</style>

