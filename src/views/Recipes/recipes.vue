<template>
    <div id="recipes">
        <!-- <h1 class="wenzhang">沈小膳文章</h1> -->
        <div class="header">
            <cube-slide ref="slide" :data="items">
                <cube-slide-item v-for="(item, index) in items" :key="index">
                   <img :src="item.image">
                </cube-slide-item>
            </cube-slide>
            <div class="navigator">
                <ul class="nav-list">
                    <li v-for="(item, index) in tabList" :key="index"
                        @click="switchTab(index)" :class="{active: currentPage === index}">
                        {{ item.txt }}
                    </li>
                </ul>
                <i class="triangle-up" :class="{left: currentPage === 0, right: currentPage === 2}"></i>
            </div>
        </div>
        <div class="content">
            <cube-slide
                :data="tabList"
                :initialIndex="currentPage"
                :loop="false"
                :autoPlay="false"
                :threshold="0.1"
                @change="slideChange">
                <cube-slide-item v-for="(item, index) in tabList" :key="index">
                    <div class="recipe-list-wrapper">
                        <recipe-list :source="source"></recipe-list>
                    </div>
                </cube-slide-item>
                <div slot="dots"></div>
            </cube-slide>
        </div>
    </div>
</template>

<script>
import { START, STEP, THEORY } from '@/common/config/tabs'
import RecipeList from './recipe-list'
export default {
  data() {
    name:'recipes'
    return {
      currentPage: 1,
      source: 'start',
      items: [
        {
        //   image: 'http://118.24.61.194:8089/first.jpeg'
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
        //   image: 'http://118.24.61.194:8089/second.jpeg'
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
        //   image: 'http://118.24.61.194:8089/third.jpeg'
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        }
      ],
      tabList: [
        {
          txt: '开始变瘦',
        },
        {
          txt: '详细步骤',
        },
        {
          txt: '减肥原理',
        }
      ],
    }
  },
  methods: {
      switchTab (index) {
        this.currentPage = index
      },
      slideChange (index) {
        this.currentPage = index
     },
  },
  components: {
    RecipeList
  }
}
</script>

<style lang="less" scoped>
    .navigator{
        position: relative;
        padding-bottom: 12px;
        font-size: 12px;
    }
    .nav-list{
        display: flex;
        justify-content: space-around;
    }
    .nav-list li{
        text-align: center;
        height: 26px;
        line-height:26px;
    }
    .recipe-list-wrapper{
        height: 100%;
        background-color: #E2E5EA
    }
    .wenzhang{
        background-color:white;
    }
</style>

