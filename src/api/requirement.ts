import HttpRequest from '@/utils/network/HttpRequest';
import {
    AddRequirementParams,
    AddRequirementResponse,
    GetRequirementParams,
    GetRequirementResponse,
    ListRequirementParams,
    ListRequirementResponse,
    UpdateRequirementParams,
    UpdateRequirementResponse
} from '@/store/models/requirement/types';
export enum API {
    Add_Requirement = '/api/v1/requirement/add',
    Get_Requirement = '/api/v1/requirement/get',
    List_Requirement = '/api/v1/requirement/list',
    Update_Requirement = '/api/v1/requirement/update'
}

export default class RequirementApi {
    public static async AddRequirement(params: AddRequirementParams): Promise<AddRequirementResponse> {
        return await HttpRequest.postData(API.Add_Requirement, params);
    }

    public static async GetRequirement(params: GetRequirementParams): Promise<GetRequirementResponse> {
        return await HttpRequest.getData(API.Get_Requirement, params);
    }

    public static async ListRequirement(params: ListRequirementParams): Promise<ListRequirementResponse> {
        return await HttpRequest.getData(API.List_Requirement, params);
    }

    public static async UpdateRequirement(params: UpdateRequirementParams): Promise<UpdateRequirementResponse> {
        return await HttpRequest.postData(API.Update_Requirement, params);
    }
}
