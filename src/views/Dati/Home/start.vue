<template>
    <section class="home_container">
    	<header class="top_tips">
    		<span class="num_tip">{{level}}</span>
    	</header>
    	<div>
    		<div class="home_logo item_container_style"></div>
    		<router-link to="dati/item" class="start button_style"></router-link>
    	</div>
  	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'start',
    data () {
        return {
            'level':'第一周'
        }
    }
}
</script>

<style lang="less">
.home_container{
		height: 100%;
		width: 100%;
		background: url(~@/assets/images/1-1.jpg) no-repeat;  //所有页面背景图都为这个
		background-size: 100% 100%;
}	
	//本项目使用默认字号（16px）
	//3.25rem * 16 = 52px
	.top_tips{
		position: absolute; //生成绝对定位的元素，元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
		height: 7.35rem;    //高度
		width: 3.25rem;		//图片宽度
		top: -1.3rem;	    //向上减1.3rem 相当于height: 6.05rem;			
		right: 1.6rem;		//相对于右边界的距离
		background: url(~@/assets/images/WechatIMG2.png) no-repeat; //背景图
		background-size: 100% 100%; //规定背景图像的尺寸
		z-index: 10;
		.num_tip{
			position: absolute;  //必须为absolute，相对于top_tips来说
			left: 0.48rem;   	//距离图片左边0.48rem
			bottom: 1.1rem;	    //距离图片底部1.1rem	
			height: 0.7rem;		//距离top_tips底部的高度（也可以不要，设置bottom: 1rem;）	
			width: 2.5rem;		//文字宽度
			font-size: 0.6rem;	
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center; //文字居中
		}
	}
	.item_container_style{
		height: 11.625rem;    //图片的高度
		width: 13.15rem;	  //13.15rem 距离左边为13.15rem 
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;  		 //向下4.1rem
		left: 1rem;			 //距离左边1rem
	}
	.home_logo{
		background-image: url(~@/assets/images/1-2.png); //背景图片
		background-size: 13.142rem 100%;  //13.142rem 距离左边为13.142rem
		background-position: right center;  //定位
	}
	.button_style{
        display: block;
        height: 2.1rem; //按钮的高度
        width: 4.35rem;	//按钮宽度
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%; 			//正中间
        margin-left: -2.4rem; //向左靠点
        background-repeat: no-repeat;
    }
    .start{
        background-image: url(~@/assets/images/1-4.png);  //开始按钮图片
    }
</style>


