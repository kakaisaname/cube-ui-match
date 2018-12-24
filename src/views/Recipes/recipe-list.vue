<template>
  <div class="match-list">
    <cube-scroll
      ref="scroll"
      :data="recipeList" 
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul class="match-inner">
        <li v-for="(item, index) in recipeList" :key="index" class="match-item" @click="lookDetails(item.url)">
          <!-- <a href="http://www.baidu.com">   -->
            <img :src="item.picUrl" alt="" class="item-img">
            <div class="item-info">
                <p class="item-title">{{ item.title }}</p>
                <p class="item-desc">{{ item.desc }}</p>
                <!-- <cube-button :light="true" :inline="true" class="item-button">查看详情</cube-button> -->
            </div>
          <!-- </a> -->
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
import list from '@/common/data/recipe-list'
const UP = 'up'
const DOWN = 'down'
// 处理数据
const getRecipeList = (source) => {
  return list[source]
}

export default {
  name: 'match-list',
  props: {
    source: {
      type: String,
      default: 'start'
    }
  },
  data () {
    return {
      recipeList: getRecipeList(this.source),
      options: {
        scrollbar: {
          fade: true
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多的比赛啦'
          }
        },
        click: false
      }
    }
  },
  watch: {
    source () {
      this.recipeList = getRecipeList(this.source)
    }
  },
  created () {
    this.subscribeDialog = this.$createSubscribeDialog()
  },
  methods: {
    subscribe () {
      this.subscribeDialog.show()
    },
    onPullingDown () {
      this.loadMatch('down')
    },
    onPullingUp () {
      this.loadMatch('up')
    },
    loadMatch (type) {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          let match = []
          for (let index = 5; index > 0; index--) {
            match.push(this.recipeList[index])
          }
          if (type === DOWN) {
            this.recipeList.unshift(...match)
          } else if (type === UP) {
            this.recipeList = this.recipeList.concat(match)
          }
        } else {
          this.$refs.scroll.forceUpdate()
          if (type === UP) {
            setTimeout(() => {
              this.$refs.scroll.scroll.scrollBy(0, 64, 800)
            }, 1000)
          }
        }
      }, 1000)
    },
    lookDetails (url) {
        window.location.href = url
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/mixin.styl';
.match-list
  height: 100%
  background-color: #E2E5EA
  .match-inner
    background-color: #FFFFFF
    .match-item
    //   height:30px;  
      border-bottom: 1px solid #E4E4E4
      padding: 10px 0
      display: flex
      justify-content: space-around
      .item-img       //图片的宽和高
        display: inline-block
        height: 47px
        margin-bottom: 7px
      .item-info
        flex 1  //1自动撑开
        padding .1rem
        min-width 0  //min-width 属性为给定元素设置最小宽度。它可以阻止 width 属性的应用值小于 min-width 的值。
        .item-title
            line-height 20px
            font-size 12px;
            ellipsis()
        .item-desc
            line-height 15px
            font-size 10px
            color #ccc
            ellipsis()
        // .item-button
            // float left
            // line-height 10px
            // margin-top 2px
            // background #ff9300
            // padding 0 2px      //上下0  左右.1rem
            // border-radius 3px  //3像素  相当于0.06
            // color   #fff
</style>
