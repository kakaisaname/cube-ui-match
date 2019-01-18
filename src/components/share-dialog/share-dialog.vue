<template>
  <div class="subscribe-dialog-view">
    <cube-popup ref="popup" @mask-click="hide">
      <div class="share-dialog-wrapper">
        <span class="close" @click="hide"><i class="cubeic-close"></i></span>
        <!-- <div class="title">分享3人</div> -->
        <img src="../subscribe-dialog/subscribe.png">
        <p class="desc">你已经答错了3道题,请分享3人或者购买复活</p>
        <div class="button">
            <cube-button class="share" @click="share">分享</cube-button>
            <cube-button class="relive" @click="relive">复活</cube-button>
        </div>
      </div>
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: 'share-dialog',
  methods: {
    show () {
      this.$refs.popup.show()
      this.$emit('show')
    },
    hide () {  //关闭弹框，直接跳转到首页
      // this.$refs.popup.hide()
      // this.$emit('hide')
      this.$router.push('/');
    },
    share () {
      this.$refs.popup.hide()
      //这只是一张分享图片  **后期可能去掉
      // this.gongzonghaoDialog.show()
      

    },
    relive() {
      this.$refs.popup.hide()
      this.$createToast({
        type: 'correct',
        txt: '开启成功',
        time: 1000
      }).show()
    }
  },
  created () {
      this.gongzonghaoDialog = this.$createGongzonghaoDialog();
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
      top: 8px
      right: 8px
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
      .share
        float left
        width 45%
        background-color #5B8FDC
      .relive
        float right
        width 45%
        background-color #5B8FDC 
</style>

