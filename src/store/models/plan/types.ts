import { IResponse } from "..";

// State
export interface PlanState {
	planType: string;
	planList: Array<PlanData>;
	planListCount: number;
	currEditPlan: any;
	planItemList: Array<PlanItemData>;
	planItemListCount: number;
	currEditPlanItem: any;
	currMonthPlan: any;
}

export interface PlanData {
	id?: number;
	teamId?: string;
	projectId?: string;
	accountId?: string;
	planId?: string;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	assigneeData?: any;
	year?: string;
	month: string;
	development?: Array<PlanItemData>;
	operation?: Array<PlanItemData>;
	report?: string;
	status?: string;
}

// Plan
export interface AddPlanParams {
	teamId: string;
	projectId: string;
	name: string;
	desc: string;
	content: string;
	year: number;
	assignee: string;
	month: string;
}
export interface AddPlanResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planId: string;
		gitLabPlanId: number;
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

export interface GetPlanParams {
	planId?: string;
	teamId?: string;
	projectId?: string;
	year: number;
	month: number;
}
export interface GetPlanResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planId: string;
		gitLabPlanId: number;
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

export interface UpdatePlanParams {
	planId: string;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	month: string;
}
export interface UpdatePlanResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planId: string;
		gitLabPlanId: number;
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

export interface ListPlanParams {
	teamId: string;
	projectId: string;
	pageIndex: number;
	pageSize: number;
	year: number;
	month?: number;
	status?: string;
}

export interface ListPlanResponse {
	list: Array<PlanData>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}

// ----------- plan item

export interface PlanItemData {
	id?: number;
	teamId?: string;
	projectId?: string;
	accountId?: string;
	planItemId?: string;
	type: string;
	name: string;
	desc: string;
	assignee: string;
	milestoneId?: string;
	milestoneData?: any;
	week: number;
	report?: string;
	status?: string;
}

// PlanItem
export interface AddPlanItemParams {
	teamId: string;
	projectId: string;
	planId: string;
	type: string;
	name: string;
	desc: string;
	content?: string;
	assignee: string;
	week: number;
}
export interface AddPlanItemResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planItemId: string;
		gitLabPlanItemId: number;
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

export interface GetPlanItemParams {
	planItemId: string;
}
export interface GetPlanItemResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planItemId: string;
		gitLabPlanItemId: number;
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

export interface UpdatePlanItemParams {
	planItemId: string;
	name: string;
	desc: string;
	assignee: string;
	week: string;
	milestoneId: string;
	status: string;
}
export interface UpdatePlanItemResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		planItemId: string;
		assignee: string;
		name: string;
		desc: string;
		week: string;
		status: string;
	};
}

export interface ListPlanItemParams {
	teamId: string;
	projectId: string;
	pageIndex: number;
	pageSize: number;
	status?: string;
}

export interface ListPlanItemResponse {
	list: Array<PlanItemData>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}
