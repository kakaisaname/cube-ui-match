<template>
  	<section class="home_container">
		<div class="clock">
			{{buttonName}}
		</div>
    	<header class="top_tips">
    		<span class="num_tip">题目{{itemNum}}</span>
    	</header>
    	<div> <!--进入题目页面-->
    		<div class="item_back item_container_style">
    			<div class="item_list_container" v-if="itemDetail.length >0"> <!--获取题目的数量-->
				<div class="item_title">{{itemDetail[itemNum-1].name}} </div> <!--获取题目的标题-->
    				<ul id="ulItem">
    					<li  v-for="(item, index) of itemDetail[itemNum-1].answer" :key="index" @click="choosed(index,item.answer_id)" class="item_list">
    						<!-- <span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span> -->
							<button class="option_detail">{{item.answer}}</button>
    					</li>
    				</ul>
					<!-- <cube-radio-group v-model="selected" :options="options"/> -->
					<!-- <cube-button  class="button"  icon="cubeic-right">rrrrrrrrrrrrrrrrrrrrrr</cube-button>
					<cube-button  class="button">Primary Button</cube-button>
					<cube-button  class="button">Primary Button</cube-button>
					<cube-button  class="button">Primary Button</cube-button> -->
    			</div>
    		</div>
			<!--如果小于总页数-->
    		<span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetailLength" id="next"></span>

    		<span class="button_style" v-else @click="submitAnswer" id="next"></span>
    	</div>
		<!-- <p class="tip-eg">
			<cube-tip
				ref="tip2"
				:direction="direction"
				:style="tipStyle"
				@close="close"
				@click="clickHandler">
				<div>答题时间到</div>
			</cube-tip>
		</p> -->
  	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { subjects } from "@/api/getData"
import axios from "axios";
import { Message } from 'element-ui';
export default {
	name: 'itemlist',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引 拿来给加样式表示选中了has_choosed
			choosedId:null, //选中答案id
			countdown:null,	//倒计时时间
			timerc: null,	//计时器
			buttonName:'',	//倒计时文字显示内容
			timecome:false,	
			answerid: null,    //正确答案数组
			falseNum:0,  	//答题错误的次数
			direction: '',
			tipStyle: ''
		}
	},
  	computed: {
		  ...mapState([  //必须要有3个点
			  'itemNum', //第几题
			  'level', //第几周
			  'itemDetail', //题目详情
			  'timer', //计时器
			//   'answerid'
			  ]),
		  itemDetailLength:function() {
			  return this.itemDetail.length
		  }
	},
	mounted () {
		// this.timedown();
		//后端获取题目
		this.falseNum = 0;
		this.getSubjects();
		this.timedown();
	},
  	methods: {
		  //answerid 为正确答案
  		...mapActions([   //执行添加答案,初始化数据，添加选中答案，获取的所有问题等操作
  			'addNum', 'initializeData','storeSelected','storeQuestion'
		  ]),
		  timedown(){ //倒计时方法 会执行一次
			this.countdown = 10;
			this.buttonName = "倒计时(" + this.countdown + ")";
			this.timerc = setInterval(() => {
				this.countdown--;
				this.buttonName = "倒计时(" + this.countdown + ")";
				if (this.countdown ==0) {
					clearInterval(this.timerc);
					this.buttonName = '';
					this.close();         //答题时间递减结束，给出答题时间到，退出
					return false;
				}		
			}, 1000)	
		  },
		  
		 close() { //关闭提示后，跳转到答题首页
		 	 Message.success('答题时间到');
			 this.$router.push('/');
		},
  		//点击下一题
  		nextItem(){
			//将li的class 
			let list = document.getElementById('ulItem');
			list.childNodes[0].childNodes[0].className="option_detail"; 
			list.childNodes[1].childNodes[0].className="option_detail"; 
			list.childNodes[2].childNodes[0].className="option_detail"; 
			list.childNodes[3].childNodes[0].className="option_detail"; 
			//判断时间到了没
			if (this.timecome == false) {  //false   没到
				clearInterval(this.timerc);
				//执行timedown方法
				 this.timedown()
				//  	//保存答案, 题目索引加一，跳到下一题
				this.addNum(this.choosedId)
			} else {					  //到了
				return false;
			}
  		},
  		//索引0-3对应答案A-B  ***************** 返回有多少个选项，就显示几个选项A、B、C、D
	  	chooseType: type => {
	  		switch(type){
	  			case 0: return 'A';
	  			case 1: return 'B';
	  			case 2: return 'C';
	  			case 3: return 'D';
	  		}
	  	},
	  	//选中的答案信息
	  	choosed(type,id){
			//答题时间到  显示提示信息  
			if (this.timecome == true) {
				this.close();
				return false;
			}  
			//判断错误的题目的个数 达到3个后显示错误信息  
			if (this.falseNum == 3) {
				this.clearInterval(this.timerc)
				this.buttonName = ''
				this.shareDialog.show()
				return false
			}
			//如果是  
			let list = document.getElementById('ulItem');
			this.choosedId = id;	//选中题目的id
			// console.log(this.answerid.indexOf(id))
			//1、判断答案是不是正确的，正确的显示下一题
			if ( this.answerid.indexOf(id) !=-1) {
				list.childNodes[type].childNodes[0].className="option_detail_true";				
				//获取点击的button
				setTimeout(()=>{
					document.getElementById("next").click();
				},300)
				//跳到下一题
			} else {
				list.childNodes[type].childNodes[0].className="option_detail_false";
				//2、判断有没有错了3题 错了就要去支付
				this.falseNum++;
				if (this.falseNum == 3) {
					this.buttonName = ''
					//时间就不要再走了,不然又要跳转到首页
					clearInterval(this.timerc)
					//跳转支付或者分享  弹出一个弹窗 分享和购买按钮   同时答题时间的弹出去掉
					this.shareDialog.show()
				} else if (this.falseNum != 3) {
					// let list = document.getElementById('ulItem');
					// list.removeChild(list.childNodes[0]);
					//3、没错到3题，继续答题 显示错误答案
					setTimeout(()=>{
						document.getElementById("next").click();
					},300)
				}
			}
			//2、不正确，显示错误的答案（不显示正确的答案）
	  		// this.choosedNum = type; //type 选中答案索引
	  	},
	  	//到达最后一题，交卷，请空定时器，跳转分数页面
	  	submitAnswer(){
			//   if (this.falseNum == 3) {
			// 	  this.showTip();
			//   }
			  this.addNum(this.choosedId)
			  setTimeout(()=>{
					clearInterval(this.timerc)
					this.$router.push('/dati/score')  //跳转到score路由
			   },300)	  
		  },
		 //获取题目 
		 getSubjects(){
			const URL= 'http://www.hhfff.cn/api/getSubjects' 
			//发送请求
            axios.get(URL)
            .then(res=>{
					const data = res.data;
					const selected = data.data.selected;
					if (data.status == true) {
						//将selected和题目存入state中,其实没必要了
						this.storeSelected(selected);
						this.answerid = selected;
						//将题目也存入state中
						let questions = data.data.res;
						questions.forEach(element => {
							element.answer = JSON.parse(element.answer);
						});
						this.storeQuestion(questions);
						
					} else {
						this.$message.error('暂时还没有题目,请尽情期待');
						return false;
					}
                }
            )
            .catch(error=>{
                	this.$message.error('添加题目失败');
                	return false;
                }
            )        
		 },
		 itemDetailLen() {
			  return this.itemDetail
				// return 5;
		  },
	},
	created(){
		//初始化信息
		this.initializeData(); //初始化信息 state.itemNum = 1;state.allTime = 0;state.answerid = [];
			// document.body.style.backgroundImage = '@/assets/img/4-1.jpg';
    	this.shareDialog = this.$createShareDialog()
    	// this.subscribeDialog = this.$createSubscribeDialog()

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
	.clock{
		color: white;
		padding-top: 10%;
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
	.item_back{	//背景图
		background-image: url(~@/assets/images/2-1.png);
		background-size: 100% 100%;
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
    .next_item{  //下一题
		top: 0%;
    	// background-image: url(~@/assets/images/2-2.png);
    }
	// .submit_item{ //提交按钮
		// top: 25rem;
    	// background-image: url(~@/assets/images/3-1.png);
    // }
    .item_list_container{
    	// position: absolute;
    	height: 7.0rem;
    	width: 18.0rem;
    	top: 2.4rem;
		// left: 3rem;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 15px;
		color: #fff;
		line-height: 0.7rem;
		left: 13%;
		float: left;
		position: relative;  //相对于item_list_container来定位
		margin-top: 5%;
		padding-bottom: 2%;
	}
	.item_list{
		font-size: 2.5rem;  //增加选项间上下距离
		margin-top: 0.4rem;
		width: 20rem;
		float: left;
		span{
			display: inline-block;
			font-size: 0.6rem;
			color: #fff;
			vertical-align: middle;
		}
		.option_style{   //选项 小圆圈 单选按钮
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}
		.has_choosed{
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}
		.option_detail{
			left: 4%;
			font-size: 20px;
			width: 10rem;
			padding-top: 0.11rem;
			border-radius: 20px;
			background-color: white;
			color: cyan;
			font-weight: bold;
			margin-bottom: 30px;
			width: 70%;
			height: 50px;
			border:1px solid rgb(54, 65, 69);
			position: relative;
		}
		.option_detail_false{
			left: 4%;
			font-size: 20px;
			width: 10rem;
			padding-top: 0.11rem;
			border-radius: 20px;
			background-color: violet;
			color:white;
			font-weight: bold;
			margin-bottom: 30px;
			width: 70%;
			height: 50px;
			border:1px solid rgb(54, 65, 69);
			position: relative;
		}
		.option_detail_true{
			left: 4%;
			font-size: 20px;
			width: 10rem;
			padding-top: 0.11rem;
			border-radius: 20px;
			background-color: green;
			color:white;
			font-weight: bold;
			margin-bottom: 30px;
			width: 70%;
			height: 50px;
			border:1px solid rgb(54, 65, 69);
			position: relative;
		}
	}
	.cube-radio-group{
		background-color: rgb(54, 65, 69)
	}
	.cube-btn{
		padding-top: 20px;
		margin: 15px 0;
	}
</style>
