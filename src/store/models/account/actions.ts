import AccountApi from '@/api/account';
import crypto from '@/utils/crypto';
import { ActionTree } from 'vuex';

import {
	AccountState,
	GetAccountInfoResponse,
	LoginParams,
	LoginResponse,
} from './types';

const actions: ActionTree<AccountState, any> = {
	async asyncGitlabAccount(store, p: any) {
		try {
			const result = await AccountApi.AsyncGitlabAccount(p);
			console.log('result', result);
		} catch (error) {}
	},
	async getAccountInfo(store) {
		try {
			const resultData: GetAccountInfoResponse = await AccountApi.GetAccountInfo();
			console.log('resultData', resultData);

			store.commit('SET_ACCOUNT_INFO', resultData);
			store.commit('SET_ACCOUNTID', resultData.accountData.accountId);
			return resultData;
		} catch (error) {
			return error;
		}
	},
};

export default actions;
