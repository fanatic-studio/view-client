import { MutationTree } from 'vuex';

import { AccountState } from './types';

const mutations: MutationTree<AccountState> = {
	SET_ACCOUNT_INFO(state, info) {
		state.accountInfo = info;
	},
	SET_ACCOUNTID(state, info) {
		state.accountId = info;
	},
};

export default mutations;
