<template>
  <div class="subscribe-dialog-view">
    <!-- <cube-popup ref="popup" @mask-click="hide"> -->  
      <div class="share-dialog-wrapper">
        <p class="guanzhu">扫描下方二维码，关注公众号</p>
        <p class="wenzi">进行学习</p>  
        <img src="../../assets/img/shan.png">
      </div>
    <!-- </cube-popup> -->
  </div>
</template>

<script>
export default {
  name: 'gongzonghao-dialog',
  methods: {
    
  }
}
</script>

<style lang="stylus">
     .wenzi
       padding-bottom 30%
     .guanzhu
       padding-bottom 5%   
//   .subscribe-dialog-view
//     width: 100%;
//     height: 100%;
//     background-repeat:no-repeat;
//     background-image:url('../../assets/img/shan.png')
    // position: absolute
    // box-sizing: border-box
    // max-width: 360px
    // margin: 0 25px
    // padding: 38px 20px 20px 20px
    // background-color: #F6F6F6
    // border-radius: 4px
    // .close
    //   position: absolute
    //   top 8px
    //   left 28px
    //   font-size: 28px
    //   color: #A2A8AF
    // .title
    //   font-size: 17px
    //   color: #222C36
    // img
    //   height: 180px
    //   margin: 8px 0 5px 0
    // .desc
    //   line-height: 20px
    //   font-size: 13px
    //   color: #C0C8D1
    // .button
    //   display: inline-block
    //   width: 230px
    //   padding: 14px
    //   border-radius: 4px
    //   font-size: 15px
</style>

