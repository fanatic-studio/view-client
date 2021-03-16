import { MutationTree } from 'vuex';

import { PlanState } from './types';

const mutations: MutationTree<PlanState> = {
	SET_PLAN_LIST(state, planList) {
		state.planList = planList;
	},
	SET_PLAN_LIST_COUNT(state, count) {
		state.planListCount = count;
	},
	SET_EDIT_PLAN(state, plan) {
		state.currEditPlan = plan;
	},
	SET_PLAN_TYPE(state, type) {
		state.planType = type;
	},
	SET_PLAN_ITEM_LIST(state, planItemList) {
		state.planItemList = planItemList;
	},
	SET_PLAN_ITEM_LIST_COUNT(state, count) {
		state.planItemListCount = count;
	},
	SET_EDIT_PLAN_ITEM(state, planItem) {
		state.currEditPlanItem = planItem;
	},
	SET_MONTH_PLAN(state, planItem) {
		state.currMonthPlan = planItem;
	},
};

export default mutations;
