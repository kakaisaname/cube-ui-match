export default {
	addNum({ commit, state }, id) {  //id就为topic_answer_id ，为每题的选项id
		//点击下一题，记录答案id，判断是否是最后一题，如果不是则跳转下一题
		commit('REMBER_ANSWER', id);
		if (state.itemNum < state.itemDetail.length) { //如果state中的题目数小于总数据条数，就进入下一题
			commit('ADD_ITEMNUM', 1);
		}
	},
	//初始化信息
	initializeData({ commit }) {
		commit('INITIALIZE_DATA');
	},

	//将选中的答案存入state
	storeSelected({ commit },selected) {
		commit('STORE_SELECTED',selected);
	},

	//将获取的问题存入state
	storeQuestion({ commit },questions) {
		commit('STORE_QUESTIONS',questions)
	}
}