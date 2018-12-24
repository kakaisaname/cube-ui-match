<template>
  	<div class="home_container">
    	<itemlist></itemlist>
  	</div>
</template>

<script>
import itemlist from './itemlist'

export default {
	name: 'itemlist',
  	components: {
   		itemlist
  	},
  	created(){
      //进入题目页面，开始计时
  		this.$store.commit('REMBER_TIME');
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
</style>
