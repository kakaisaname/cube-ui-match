<template>
  	<div class="home_container">
        <start></start>
    </div>
</template>

<script>
import start from './start'

export default {
	name: 'home',
  	components: {
  		start
	}, 
}
</script>

<style lang="less" scoped>
	.home_container{
		height: 100%;
		width: 100%;
		background: url(~@/assets/images/1-1.jpg) no-repeat;  //所有页面背景图都为这个
		background-size: 100% 100%;
	}
</style>
