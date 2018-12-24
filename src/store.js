import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	selected:[],  //  
	answerid:[],  //用户选中的答案id 
    level: '第一周', //活动周数
    itemNum: 1, // 第几题,默认是第一题
    // allTime: 0, //总共用时
    itemDetail: [],
  },
  mutations,
  actions
});
