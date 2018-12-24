//在vue 中，只有mutation 才能改变state,因为只有mutation 才能改变state, 所以处理函数自动会获得一个默认参数 state
// action去commit 一个mutation, 它要指定去commit哪个mutation, 所以mutation至少需要一个名字，commit mutation 之后，
//要做什么事情，那就需要给它指定一个处理函数， 类型(名字) + 处理函数就构成了mutation
const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const REMBER_TIME = 'REMBER_TIME'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const STORE_SELECTED = 'STORE_SELECTED'
const STORE_QUESTIONS = 'STORE_QUESTIONS'
export default {
	//点击进入下一题  *************
	[ADD_ITEMNUM](state, num) {
		state.itemNum += num;
	},
	//记录答案  *****************************将选中的topic_answer_id存入answerid数组中
	[REMBER_ANSWER](state, id) {
		state.answerid.push(id);
	},
	/*
	记录做题时间   （这个暂时没必要）
	 */
	[REMBER_TIME](state) {
		state.timer = setInterval(() => {
			state.allTime++;
		}, 1000)
	},
	/*
	初始化信息，
	 */
	[INITIALIZE_DATA](state) {
		state.itemNum = 1;
		state.allTime = 0;
		state.answerid = [];
		state.selected = [];
		state.itemDetail = [];
	},

	//将选中的答案存入selected  **
	[STORE_SELECTED](state,selected) {
		state.selected = selected;
	},

	//将获取的问题存入state
	[STORE_QUESTIONS](state,questions) {
		state.itemDetail = questions;
	}
}