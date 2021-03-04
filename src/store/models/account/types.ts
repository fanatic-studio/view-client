import { IResponse } from "..";

export interface loginInfo {
	username?: string;
	password: string;
	token?: string;
}
export interface AccountState {
	state: number;
	rememberMe: boolean;
	loginInfo: loginInfo;
	rememberLoginInfo: loginInfo;
	accountInfo: AccountInfo;
	accountId: string;
}

export interface AccountInfo {
	accountData: AccountData;
	roleIds: Array<number>;
	roles: Array<any>;
	postIds: Array<number>;
	posts: Array<any>;
}

export interface AccountData {
	accountId: string;
	roleId: number;
	nickName: string;
}

export interface LoginParams {
	username: string;
	password: string;
	code?: string;
	uuid?: string;
}

export interface LoginResponse extends IResponse {
	data: {
		expire: string;
		token: string;
	};
}

export interface GetCaptchaParams {
	phone: number;
}
export interface GetCaptchaResponse {
	data: string;
	id: string;
}

export interface GetAccountInfoResponse {
	accountData: any;
	roleIds: Array<number>;
	roles: Array<any>;
	postIds: Array<number>;
	posts: Array<any>;
}

export interface AsyncGitlabAccountParams {
	userName: string;
	passWord: string;
}

export interface AsyncGitlabAccountResponse extends IResponse {
	data: {};
}
