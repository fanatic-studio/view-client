import {
	AddTeamParams,
	AddTeamResponse,
	GetTeamParams,
	GetTeamResponse,
	ListTeamParams,
	ListTeamResponse,
	UpdateTeamParams,
	UpdateTeamResponse,
} from "@/store/models/Team/types";
import HttpRequest from "@/utils/network/HttpRequest";

export enum API {
	Add_Team = "/api/v1/team/add",
	Get_Team = "/api/v1/team/get",
	List_Team = "/api/v1/team/list",
	Update_Team = "/api/v1/team/update",
}

export default class TeamApi {
	public static async AddTeam(params: AddTeamParams): Promise<AddTeamResponse> {
		return await HttpRequest.postData(API.Add_Team);
	}

	public static async GetTeam(params: GetTeamParams): Promise<GetTeamResponse> {
		return await HttpRequest.getData(API.Get_Team, params);
	}

	public static async ListTeam(): Promise<ListTeamResponse> {
		return await HttpRequest.getData(API.List_Team);
	}

	public static async UpdateTeam(
		params: UpdateTeamParams
	): Promise<UpdateTeamResponse> {
		return await HttpRequest.postData(API.Update_Team, params);
	}
}
