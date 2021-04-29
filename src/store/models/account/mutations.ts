import { MutationTree } from "vuex";

import { AccountState } from "./types";

const mutations: MutationTree<AccountState> = {
	// 切换是否记住密码
	TOGGLE_REMREBER_ME(state, checked) {
		state.rememberMe = checked;
	},
	//记住密码
	REMEMBER_LOGIN_PARAMS(state, info) {
		state.rememberLoginInfo = info;
	},
	// 设置登录信息
	SET_LOGIN_INFO(state, info) {
		// 根据权限=生成菜单
		// 设置登录信息
		localStorage.setItem("AccountToken", info.token);
		state.loginInfo = {
			...info,
		};
	},
	SET_ACCOUNT_INFO(state, info) {
		state.accountInfo = info;
	},
	SET_ACCOUNTID(state, info) {
		state.accountId = info;
	},
};

export default mutations;
