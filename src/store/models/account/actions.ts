import AccountApi from "@/api/account";
// import cookie from "@/utils/cookie";
import crypto from "@/utils/crypto";
import { StoreResult } from "@/utils/util";
import { ActionTree } from "vuex";

import {
	AccountState,
	GetAccountInfoResponse,
	LoginParams,
	LoginResponse,
} from "./types";

const actions: ActionTree<AccountState, any> = {
	// 记住密码
	toggleRmemberMe({ commit }, checked: boolean) {
		commit("TOGGLE_REMREBER_ME", checked);
	},
	async getCode() {
		const res = await AccountApi.GetImageCode();
		return res;
	},
	// 登录
	async login(store, params: LoginParams) {
		try {
			const resultData: LoginResponse = await AccountApi.AccountLogin(params);
			store.commit("SET_LOGIN_INFO", {
				...resultData.data,
			});
			// 密码加密后缓存到本地
			if (params.username && params.password) {
				if (store.state.rememberMe) {
					store.commit("REMEMBER_LOGIN_PARAMS", {
						username: params.username,
						password: crypto.encrypt(params.password),
					});
				} else {
					store.commit("REMEMBER_LOGIN_PARAMS", {
						username: params.username,
					});
				}
			}
			return true;
		} catch (error) {
			console.log("login - error", error);
			return false;
		}
		// const res = await loginApi.login(params)
		// if (typeof res === 'string' || !res) return res || '未查询到登录数据'
	},
	// 退出登录
	async logout(store) {
		const resultData = await AccountApi.AccountLogout();
		store.commit("SET_LOGIN_INFO", {});
		store.commit("SET_ACCOUNT_INFO", {
			accountData: {
				accountId: "",
				roleId: 0,
				nickName: "",
			},
			roleIds: [],
			roles: [],
			postIds: [],
			posts: [],
		});
		return true;
	},
	async asyncGitlabAccount(store, p: any) {
		try {
			const result = await AccountApi.AsyncGitlabAccount(p);
			console.log("result", result);
		} catch (error) {}
	},
	async getAccountInfo(store) {
		try {
			const resultData: GetAccountInfoResponse = await AccountApi.GetAccountInfo();
			console.log("resultData", resultData);

			store.commit("SET_ACCOUNT_INFO", resultData);
			store.commit("SET_ACCOUNTID", resultData.accountData.accountId);
			return resultData;
		} catch (error) {
			return error;
		}
	},
};

export default actions;
