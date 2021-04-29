import {
	GetCaptchaResponse,
	LoginParams,
	PhoenLoginParams,
	LoginResponse,
	GetAccountInfoResponse,
	AsyncGitlabAccountParams,
	AsyncGitlabAccountResponse,
} from '@/store/models/account/types';
import HttpRequest from '@/utils/network/HttpRequest';
export enum API {
	Login = '/login',
	ACCOUNT_GETCAPTCHA = '/api/v1/getCaptcha',
	ACCOUNT_GET = '/api/v1/account/get',
	Account_Logout = '/api/v1/logout',
	Async_Gitlab_Account = '/api/v1/account/asyncGit',
	Phone_Login = '/login/phone',
	Get_Verify_Code= '/login/verifyCode'
}

export default class AccountApi {
	public static async AccountLogin(
		params: LoginParams
	): Promise<LoginResponse> {
		return await HttpRequest.postData(API.Login, params);
	}

	// 获取验证码
	public static async GetImageCode(): Promise<GetCaptchaResponse> {
		return await HttpRequest.getData(API.ACCOUNT_GETCAPTCHA);
	}

	// 获取验证码
	public static async GetAccountInfo(): Promise<GetAccountInfoResponse> {
		return await HttpRequest.getData(API.ACCOUNT_GET);
	}

	public static async AccountLogout(): Promise<any> {
		return await HttpRequest.postData(API.Account_Logout);
	}

	public static async AsyncGitlabAccount(
		params: AsyncGitlabAccountParams
	): Promise<AsyncGitlabAccountResponse> {
		return await HttpRequest.postData(API.Async_Gitlab_Account, params);
	}

	public static async PhoneLogin(
		params: PhoenLoginParams
	): Promise<any> {
		const result = await HttpRequest.postData(API.Phone_Login, params);
		return result;
	}

	public static async getVerifyCode(
		params: any
	): Promise<any> {
		const result = await HttpRequest.postData(API.Get_Verify_Code, params);		
		return result;
	}
}
