import HttpRequest from "@/utils/network/HttpRequest";
import {
	AddProjectResponse,
	GetProjectParams,
	GetProjectResponse,
	ListProjectMemberParams,
	ListProjectMemberResponse,
	ListProjectParams,
	ListProjectResponse,
	UpdateProjectMemberParams,
	UpdateProjectMemberResponse,
	UpdateProjectParams,
	UpdateProjectResponse,
} from "@/store/models/project/types";
export enum API {
	Add_Project = "/api/v1/project/add",
	Get_Project = "/api/v1/project/get",
	List_Project = "/api/v1/project/list",
	My_List_Project = "/api/v1/project/my_list",
	Update_Project = "/api/v1/project/update",

	Add_Project_Member = "/api/v1/project_member/add",
	Get_Project_Member = "/api/v1/project_member/get",
	List_Project_Member = "/api/v1/project_member/list",
	Update_Project_Member = "/api/v1/project_member/update",
}

export default class ProjectApi {
	public static async AddProject(): Promise<AddProjectResponse> {
		return await HttpRequest.postData(API.Add_Project);
	}

	public static async GetProject(
		params: GetProjectParams
	): Promise<GetProjectResponse> {
		return await HttpRequest.getData(API.Get_Project, params);
	}

	public static async ListProject(
		params: ListProjectParams
	): Promise<ListProjectResponse> {
		return await HttpRequest.getData(API.List_Project, params);
	}

	public static async MyListProject(
		params: ListProjectParams
	): Promise<ListProjectResponse> {
		return await HttpRequest.getData(API.My_List_Project, params);
	}

	public static async UpdateProject(
		params: UpdateProjectParams
	): Promise<UpdateProjectResponse> {
		return await HttpRequest.postData(API.Update_Project, params);
	}

	public static async AddProjectMember(): Promise<AddProjectResponse> {
		return await HttpRequest.postData(API.Add_Project_Member);
	}

	public static async GetProjectMember(
		params: GetProjectParams
	): Promise<GetProjectResponse> {
		return await HttpRequest.getData(API.Get_Project_Member, params);
	}

	public static async ListProjectMember(
		params: ListProjectMemberParams
	): Promise<ListProjectMemberResponse> {
		return await HttpRequest.getData(API.List_Project_Member, params);
	}

	public static async UpdateProjectMember(
		params: UpdateProjectMemberParams
	): Promise<UpdateProjectMemberResponse> {
		return await HttpRequest.postData(API.Update_Project_Member, params);
	}
}
