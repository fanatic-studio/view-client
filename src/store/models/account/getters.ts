import { GetterTree } from "vuex";
import { AccountState } from "./types";

const getters: GetterTree<AccountState, any> = {
	getRememberLoginInfo: (state: AccountState) => {
		if (state.rememberLoginInfo.username !== "") {
			return state.rememberLoginInfo;
		} else {
			// let c = cookie.getJsonData('rememberLoginInfo');
			// state.rememberLoginInfo = c;
			return state.rememberLoginInfo;
		}
	},
	accountInfo: (state) => state.accountInfo,
};

export default getters;
