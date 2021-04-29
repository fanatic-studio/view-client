import {
	AddApplicationParams,
	AddApplicationResponse,
	GetApplicationParams,
	GetApplicationResponse,
	ListApplicationParams,
	ListApplicationResponse,
	UpdateApplicationParams,
	UpdateApplicationResponse,
} from "@/store/models/application/types";
import HttpRequest from "@/utils/network/HttpRequest";

export enum API {
	Add_Application = "/api/v1/app/add",
	Get_Application = "/api/v1/app/get",
	List_Application = "/api/v1/app/list",
	Update_Application = "/api/v1/app/update",
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
}
