import HttpRequest from '@/utils/network/HttpRequest';
import {
    AddMilestoneParams,
    AddMilestoneResponse,
    GetMilestoneParams,
    GetMilestoneResponse,
    ListMilestoneParams,
    ListMilestoneResponse,
    UpdateMilestoneParams,
    UpdateMilestoneResponse
} from '@/store/models/milestone/types';
export enum API {
    Add_Milestone = '/api/v1/milestone/add',
    Get_Milestone = '/api/v1/milestone/get',
    List_Milestone = '/api/v1/milestone/list',
    Update_Milestone = '/api/v1/milestone/update'
}

export default class MilestoneApi {
    public static async AddMilestone(params: AddMilestoneParams): Promise<AddMilestoneResponse> {
        return await HttpRequest.postData(API.Add_Milestone, params);
    }

    public static async GetMilestone(params: GetMilestoneParams): Promise<GetMilestoneResponse> {
        return await HttpRequest.getData(API.Get_Milestone, params);
    }

    public static async ListMilestone(params: ListMilestoneParams): Promise<ListMilestoneResponse> {
        return await HttpRequest.getData(API.List_Milestone, params);
    }

    public static async UpdateMilestone(params: UpdateMilestoneParams): Promise<UpdateMilestoneResponse> {
        return await HttpRequest.postData(API.Update_Milestone, params);
    }
}
