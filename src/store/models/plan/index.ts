import { Module } from 'vuex';
import { PlanState } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const createState = (): PlanState => ({
	planType: 'month',
	planList: [],
	planListCount: 0,
	currEditPlan: {},
	planItemList: [],
	planItemListCount: 0,
	currEditPlanItem: {},
	currMonthPlan: {},
});

const namespaced: boolean = true;

const app: Module<PlanState, any> = {
	namespaced,
	state: createState(),
	mutations: {
		// 绑定vuex的路由需要具备清除方法
		// 绑定路由页面缓存的页面需要具备还原状态的方法
		...mutations,
	},
	actions,
	getters,
};

export default app;
