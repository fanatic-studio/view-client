import HttpRequest from "@/utils/network/HttpRequest";
import {
	AddPlanParams,
	AddPlanResponse,
	GetPlanParams,
	GetPlanResponse,
	ListPlanParams,
	ListPlanResponse,
	UpdatePlanParams,
	UpdatePlanResponse,
	AddPlanItemParams,
	AddPlanItemResponse,
	GetPlanItemParams,
	GetPlanItemResponse,
	ListPlanItemParams,
	ListPlanItemResponse,
	UpdatePlanItemParams,
	UpdatePlanItemResponse,
} from "@/store/models/plan/types";
export enum API {
	Add_Plan = "/api/v1/plan/add",
	Get_Plan = "/api/v1/plan/get",
	Get_Month_Plan = "/api/v1/plan/get_month",
	List_Plan = "/api/v1/plan/list",
	Update_Plan = "/api/v1/plan/update",

	Add_PlanItem = "/api/v1/plan_item/add",
	Get_PlanItem = "/api/v1/plan_item/get",
	List_PlanItem = "/api/v1/plan_item/list",
	Update_PlanItem = "/api/v1/plan_item/update",
}

export default class PlanApi {
	public static async AddPlan(params: AddPlanParams): Promise<AddPlanResponse> {
		return await HttpRequest.postData(API.Add_Plan, params);
	}

	public static async GetPlan(params: GetPlanParams): Promise<GetPlanResponse> {
		return await HttpRequest.getData(API.Get_Plan, params);
	}

	public static async GetMonthPlan(
		params: GetPlanParams
	): Promise<GetPlanResponse> {
		return await HttpRequest.getData(API.Get_Month_Plan, params);
	}

	public static async ListPlan(
		params: ListPlanParams
	): Promise<ListPlanResponse> {
		return await HttpRequest.getData(API.List_Plan, params);
	}

	public static async UpdatePlan(
		params: UpdatePlanParams
	): Promise<UpdatePlanResponse> {
		return await HttpRequest.postData(API.Update_Plan, params);
	}

	public static async AddPlanItem(
		params: AddPlanItemParams
	): Promise<AddPlanItemResponse> {
		return await HttpRequest.postData(API.Add_PlanItem, params);
	}

	public static async GetPlanItem(
		params: GetPlanItemParams
	): Promise<GetPlanItemResponse> {
		return await HttpRequest.getData(API.Get_PlanItem, params);
	}

	public static async ListPlanItem(
		params: ListPlanItemParams
	): Promise<ListPlanItemResponse> {
		return await HttpRequest.getData(API.List_PlanItem, params);
	}

	public static async UpdatePlanItem(
		params: UpdatePlanItemParams
	): Promise<UpdatePlanItemResponse> {
		return await HttpRequest.postData(API.Update_PlanItem, params);
	}
}
