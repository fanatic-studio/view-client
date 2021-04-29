import { IResponse } from "..";

// State
export interface MilestoneState {
	milestoneList: Array<MilestoneMode>;
	milestoneListCount: number;
	currEditMilestone: any;
}

export interface MilestoneMode {
	id?: number;
	teamId?: string;
	projectId?: string;
	accountId?: string;
	milestoneId?: string;
	gitLabMilestoneId?: number;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	assigneeData: any;
	issueList: Array<any>;
	startAt: string;
	onlineAt: string;
	issuesProgress: IssuesProgress;
	status?: string;
}

export interface IssuesProgress {
	done: number;
	total: number;
}

// Milestone
export interface AddMilestoneParams {
	teamId?: string;
	projectId?: string;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	startAt: string;
	onlineAt: string;
}
export interface AddMilestoneResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		milestoneId: string;
		gitLabMilestoneId: number;
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

export interface GetMilestoneParams {
	milestoneId: string;
}
export interface GetMilestoneResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		milestoneId: string;
		gitLabMilestoneId: number;
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

export interface UpdateMilestoneParams {
	milestoneId: string;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	startAt: string;
	onlineAt: string;
	status: string;
}
export interface UpdateMilestoneResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		milestoneId: string;
		gitLabMilestoneId: number;
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

export interface ListMilestoneParams {
	teamId: string;
	projectId: string;
	pageIndex: number;
	pageSize: number;
	status: string;
}

export interface ListMilestoneResponse {
	list: Array<MilestoneMode>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}
