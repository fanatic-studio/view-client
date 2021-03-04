import { IResponse } from "..";

// State
export interface IssuesState {
	issuesList: Array<IssuesData>;
	myIssuesList: Array<IssuesData>;
	allIssuesList: Array<AllIssuesData>;
	issuesListCount: number;
	currEditIssues: any;
}

export interface IssuesData {
	id?: number;
	teamId?: string;
	projectId?: string;
	requirementId: string;
	requirementData?: any;
	milestoneId: string;
	milestoneData?: any;
	appId: string;
	appData?: any;
	accountId?: string;
	ownerData?: any;
	issuesId?: string;
	gitLabIssuesId?: number;
	relatedIssues?: string;
	type: string;
	name: string;
	desc: string;
	content?: string;
	assignee: string;
	assigneeData?: any;
	startAt: string;
	endAt: string;
	extendA?: string;
	extendB?: string;
	priority: string;
	status: string;
}

export interface AllIssuesData {
	accountId: string;
	nickName: string;
	role: number;
	issuesList: Array<IssuesData>;
}
// Issues
export interface AddIssuesParams {
	teamId: string;
	projectId: string;
	requirementId?: string;
	milestoneId?: string;
	appId: string;
	type: string;
	name: string;
	desc: string;
	content?: string;
	assignee: string;
	startAt: string;
	endAt: string;
	extendA: string;
	extendB: string;
	priority?: string;
}
export interface AddIssuesResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		issuesId: string;
		gitLabIssuesId: number;
		assignee: string;
		name: string;
		desc: string;
		content: string;
		startAt: string;
		ductTime: string;
		onlineAt: string;
		status: string;
	};
}

export interface GetIssuesParams {
	issuesId: string;
}
export interface GetIssuesResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		issuesId: string;
		gitLabIssuesId: number;
		assignee: string;
		name: string;
		desc: string;
		content: string;
		startAt: string;
		ductTime: string;
		onlineAt: string;
		status: string;
	};
}

export interface UpdateIssuesParams {
	teamId: string;
	projectId: string;
	requirementId?: string;
	milestoneId?: string;
	appId: string;
	issuesId: string;
	type: string;
	name: string;
	desc: string;
	content?: string;
	assignee: string;
	startAt: string;
	endAt: string;
	extendA: string;
	extendB: string;
	priority?: string;
	status: string;
}
export interface UpdateIssuesResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		issuesId: string;
		gitLabIssuesId: number;
		assignee: string;
		name: string;
		desc: string;
		content: string;
		startAt: string;
		ductTime: string;
		onlineAt: string;
		status: string;
	};
}

export interface ListIssuesParams {
	teamId: string;
	projectId: string;
	assignee?: string;
	pageIndex: number;
	pageSize: number;
	status?: string;
}

export interface ListIssuesResponse {
	list: Array<IssuesData>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}

export interface GetAllIssuesParams {
	teamId: string;
	projectId: string;
	pageIndex: number;
	pageSize: number;
}

export interface GetAllIssuesResponse {
	list: Array<IssuesData>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}
