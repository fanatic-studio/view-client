import { Module } from 'vuex';
import { AccountState } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const createState = (): AccountState => ({
	accountInfo: {
		accountData: {
			accountId: '',
			roleId: 0,
			nickName: '',
		},
		roleIds: [],
		roles: [],
		postIds: [],
		posts: [],
	},
	accountId: '',
});

const namespaced = true;

const app: Module<AccountState, any> = {
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
