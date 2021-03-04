import HttpRequest from "@/utils/network/HttpRequest";
import {
	AddIssuesParams,
	AddIssuesResponse,
	GetAllIssuesParams,
	GetAllIssuesResponse,
	GetIssuesParams,
	GetIssuesResponse,
	ListIssuesParams,
	ListIssuesResponse,
	UpdateIssuesParams,
	UpdateIssuesResponse,
} from "@/store/models/issues/types";
export enum API {
	Add_Issues = "/api/v1/issues/add",
	Get_Issues = "/api/v1/issues/get",
	Get_All_Issues = "/api/v1/issues/all_list",
	List_Issues = "/api/v1/issues/list",
	Update_Issues = "/api/v1/issues/update",
}

export default class IssuesApi {
	public static async AddIssues(
		params: AddIssuesParams
	): Promise<AddIssuesResponse> {
		return await HttpRequest.postData(API.Add_Issues, params);
	}

	public static async GetIssues(
		params: GetIssuesParams
	): Promise<GetIssuesResponse> {
		return await HttpRequest.getData(API.Get_Issues, params);
	}

	public static async ListIssues(
		params: ListIssuesParams
	): Promise<ListIssuesResponse> {
		return await HttpRequest.getData(API.List_Issues, params);
	}

	public static async UpdateIssues(
		params: UpdateIssuesParams
	): Promise<UpdateIssuesResponse> {
		return await HttpRequest.postData(API.Update_Issues, params);
	}

	public static async GetAllIssues(
		params: GetAllIssuesParams
	): Promise<GetAllIssuesResponse> {
		return await HttpRequest.getData(API.Get_All_Issues, params);
	}
}
