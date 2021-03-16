import { GetterTree } from 'vuex';
import { AccountState } from './types';

const getters: GetterTree<AccountState, any> = {
	accountInfo: (state) => state.accountInfo,
};

export default getters;
