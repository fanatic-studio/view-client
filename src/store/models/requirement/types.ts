import { IListParams, IResponse } from '..';

export interface RequirementState {
	requirementId: string;
	requirementListCount: number;
	requirementList: Array<RequirementMode>;
	currAddRequirement: any;
	currEditRequirement: any;
}
export interface RequirementMode {
	teamId?: string;
	projectId?: string;
	requirementId?: string;
	accountId?: string;
	type: string;
	priority: string;
	name: string;
	desc: string;
	competitorAnalysisUrl: string;
	requirementDocUrl: string;
	requirementUiUrl: string;
	requirementCodeUrl: string;
	assignee: string;
	frontAssignee: string;
	serverAssignee: string;
	uiAssignee: string;
	milestoneId: string;
	startAt: string;
	onlineAt: string;
}

export interface RequirementData {
	teamId: string;
	projectId: string;
	requirementId: string;
	accountId: string;
	type: string;
	priority: string;
	name: string;
	desc: string;
	competitorAnalysisUrl: string;
	requirementDocUrl: string;
	requirementUiUrl: string;
	requirementCodeUrl: string;
	assignee: string;
	assigneeData: assigneeRespData;
	frontAssigneeData: assigneeRespData;
	serverAssigneeData: assigneeRespData;
	uiAssigneeData: assigneeRespData;
	milestoneData: milestoneRespData;
	issueList: Array<any>;
	progressRate: number;
	startAt: string;
	onlineAt: string;
	status: string;
}

export interface milestoneRespData {
	milestoneId: string;
	milestoneName: string;
}
export interface assigneeRespData {
	accountId: string;
	nickName: string;
}

export interface AddRequirementParams {
	teamId: string;
	projectId: string;
	name: string;
	type: string;
	desc: string;
	priority: string;
	assignee: string;
	startAt: string;
	devDuration?: number;
	testDuration?: number;
	onlineAt?: string;
	frontAssignee: string;
	serverAssignee: string;
	uiAssignee: string;
}
export interface AddRequirementResponse {
	teamId: string;
	accountId: string;
	name: string;
	cName: string;
	desc: string;
	gitLabGroupId: number;
}

export interface GetRequirementParams {
	teamId: string;
}
export interface GetRequirementResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}

export interface ListRequirementParams extends IListParams {
	teamId: string;
	projectId: string;
	status?: string;
}
export interface ListRequirementResponse extends IResponse {
	list: Array<RequirementData>;
	count: number;
	pageIndex: number;
	pageSize: number;
}

export interface UpdateRequirementParams {
	teamId: string;
	projectId: string;
	requirementId: string;
	accountId?: string;
	type: string;
	priority: string;
	name: string;
	desc: string;
	competitorAnalysisUrl: string;
	requirementDocUrl: string;
	requirementUiUrl: string;
	requirementCodeUrl: string;
	assignee: string;
	frontAssignee: string;
	serverAssignee: string;
	uiAssignee: string;
	milestoneId: string;
	progressRate: string;
	startAt: string;
	onlineAt: string;
	status: string;
}
export interface UpdateRequirementResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}
