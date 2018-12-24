<template>
  	<div>
    	<div class="your_scores_container">
            <header class="your_scores"><span class="score_num">{{score}}</span><span class="fenshu">分！</span></header>
            <div class="result_tip">{{scoreTips}}</div>
        </div>
        <div class="share_button" @click="showCover"></div>
        <!-- <div class="share_code">
            <header class="share_header">关注葡萄之家，获取答案。</header>
            <img src="../../assets/images/4-4.png" height="212" width="212" class="code_img"> 
        </div> -->
        <div class="share_cover" v-show="showHide" @click="showCover">
            <img src="~@/assets/images/5-2.png" class="share_img">
        </div>
  	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'score',
    data(){ //初始化数据 -------
        return {    
            showHide: false, //是否显示提示
            score: 0, //分数
            scoreTips:'', //分数提示
            // rightAnswer: [2, 7, 12, 13, 18], //正确答案  这个不应该写死,应该是获取数据时存入state中了的
            scoreTipsArr:['你也太锈了吧，零分也考得出来','答对一题，加油','答对两题，Double Kill ！','答对三题，Trible Kill！',
            '答对4题，Quadra kill','Penta Kill!','你已经无人能挡了','你快超神了','恭喜你,超神','9杀，接近完美','完美答题'],
        }
    },
    computed: mapState(['answerid','selected']),  //将state中的answerid数组拿过来
	created(){
        this.computedScore(); 
        this.getScoreTip();
        document.body.style.backgroundImage = '~@/assets/img/4-1.jpg';  //设置背景图
    },
    methods: {
        //计算分数
        computedScore(){
            this.answerid.forEach((item, index) => {
                if (item == this.selected[index]) {
                    this.score += 10;  //每次加10分
                }
            })
        },
        //是否显示分享提示  ***
        showCover: function (){
            this.showHide = !this.showHide;
        },
        //根据分数显示提示
        getScoreTip: function (){
          let index = Math.ceil(this.score/10);
          this.scoreTips = this.scoreTipsArr[index];
        }
    },
}

</script>

<style lang="less">
    body{
        background: url(~@/assets/images/1-1.jpg) no-repeat;
        // background: url(../../assets/images/4-1.jpg);
        padding-top: 1.2rem;
    }
    .your_scores_container{
        width: 9.7rem;
        height: 9.1rem;
        background: url(~@/assets/images/4-2.png) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto 0;
        position: relative;
        .your_scores{
            position: absolute;
            width: 100%;
            text-indent: 3.3rem;
            top: 4.7rem;
            font-size: 1.4rem;
            font-weight: 900;
            -webkit-text-stroke: 0.05rem #412318;
            font-family: 'Microsoft YaHei';
            .score_num{
                font-family: Tahoma,Helvetica,Arial;
                color: #a51d31;
            }
            .fenshu{
                color: #a51d31;
            }
        }
        .result_tip{
            position: absolute;
            top: 7rem;
            width: 9rem;
            left: 0.6rem;
            color: #3e2415;
            font-size: 0.65rem;
            text-align: center;
        }
    }
    .share_button{
        width: 6.025rem;
        height: 2.4rem;
        margin: 0.8rem auto 0;
        background: url(~@/assets/images/4-3.png) no-repeat 0.4rem 0;
        background-size: 5.825rem 100%;
    }
    .share_code{
        width: 5.3rem;
        margin: 1.5rem auto 0;
        .share_header{
            color: #664718;
            font-size: 0.475rem;
            font-family: 'Microsoft YaHei';
            width: 7rem;
            font-weight: 500;
        }
        .code_img{
            height: 5.3rem;
            width: 5.3rem;
            margin-top: 0.5rem;
        }
    }
    .share_cover{
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background: url(~@/assets/images/5-1.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.92;
    }
    .share_img{
        height: 10.975rem;
        width: 11.95rem;
        position: fixed;
        top: 0.5rem;
        left: 50%;
        margin-left: -5.975rem;
    }
</style>
