import {
	AddApplicationParams,
	AddApplicationResponse,
	GetApplicationParams,
	GetApplicationResponse,
	ListApplicationParams,
	ListApplicationResponse,
	UpdateApplicationParams,
	UpdateApplicationResponse,
	AddApplicationUpdateParams,
	AddApplicationUpdateResponse,
	GetApplicationUpdateParams,
	GetApplicationUpdateResponse,
	UpdateApplicationUpdateParams,
	UpdateApplicationUpdateResponse,
	ListApplicationUpdateParams,
	ListApplicationUpdateResponse,
	CheckApplicationUpdateParams,
	CheckApplicationUpdateResponse,
	AddApplicationVersionParams,
	AddApplicationVersionResponse,
	GetApplicationVersionParams,
	GetApplicationVersionResponse,
	ListApplicationVersionParams,
	ListApplicationVersionResponse,
	UpdateApplicationVersionParams,
	UpdateApplicationVersionResponse,
} from "@/store/models/application/types";
import HttpRequest from "@/utils/network/HttpRequest";

export enum API {
	Add_Application = "/api/v1/app/add",
	Get_Application = "/api/v1/app/get",
	List_Application = "/api/v1/app/list",
	Update_Application = "/api/v1/app/update",

	Add_Application_Update = "/api/v1/app/update/add",
	Get_Application_Update = "/api/v1/app/update/get",
	List_Application_Update = "/api/v1/app/update/list",
	Update_Application_Update = "/api/v1/app/update/update",
	Update_Application_Check = "/api/client/duration",

	Add_Application_Version = "/api/v1/app/version/add",
	Get_Application_Version = "/api/v1/app/version/get",
	List_Application_Version = "/api/v1/app/version/list",
	Update_Application_Version = "/api/v1/app/version/update",
}

export default class ApplicationApi {
	public static async AddApplication(
		params: AddApplicationParams
	): Promise<AddApplicationResponse> {
		return await HttpRequest.postData(API.Add_Application, params);
	}

	public static async GetApplication(
		params: GetApplicationParams
	): Promise<GetApplicationResponse> {
		return await HttpRequest.getData(API.Get_Application, params);
	}

	public static async ListApplication(
		params: ListApplicationParams
	): Promise<ListApplicationResponse> {
		return await HttpRequest.getData(API.List_Application, params);
	}

	public static async UpdateApplication(
		params: UpdateApplicationParams
	): Promise<UpdateApplicationResponse> {
		return await HttpRequest.postData(API.Update_Application, params);
	}

	// update
	public static async AddApplicationUpdate(
		params: AddApplicationUpdateParams
	): Promise<AddApplicationUpdateResponse> {
		return await HttpRequest.postData(API.Add_Application_Update, params);
	}

	public static async GetApplicationUpdate(
		params: GetApplicationUpdateParams
	): Promise<GetApplicationUpdateResponse> {
		return await HttpRequest.getData(API.Get_Application_Update, params);
	}

	public static async ListApplicationUpdate(
		params: ListApplicationUpdateParams
	): Promise<ListApplicationUpdateResponse> {
		return await HttpRequest.getData(API.List_Application_Update, params);
	}

	public static async UpdateApplicationUpdate(
		params: UpdateApplicationUpdateParams
	): Promise<UpdateApplicationUpdateResponse> {
		return await HttpRequest.postData(API.Update_Application_Update, params);
	}
	public static async CheckApplicationUpdate(
		params: CheckApplicationUpdateParams
	): Promise<CheckApplicationUpdateResponse> {
		return await HttpRequest.postData(API.Update_Application_Check, params);
	}

	//version
	public static async AddApplicationVersion(
		params: AddApplicationVersionParams
	): Promise<AddApplicationVersionResponse> {
		return await HttpRequest.postData(API.Add_Application_Version, params);
	}

	public static async GetApplicationVersion(
		params: GetApplicationVersionParams
	): Promise<GetApplicationVersionResponse> {
		return await HttpRequest.getData(API.Get_Application_Version, params);
	}

	public static async ListApplicationVersion(
		params: ListApplicationVersionParams
	): Promise<ListApplicationVersionResponse> {
		return await HttpRequest.getData(API.List_Application_Version, params);
	}

	public static async UpdateApplicationVersion(
		params: UpdateApplicationVersionParams
	): Promise<UpdateApplicationVersionResponse> {
		return await HttpRequest.postData(API.Update_Application_Version, params);
	}
}
