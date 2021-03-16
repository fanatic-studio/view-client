import { IResponse } from '..';
import { ApplicationMode } from '../application/types';
import { PlanData, PlanItemData } from '../plan/types';

export interface ProjectState {
	projectId: string;
	projectList: ProjectData[];
	myProjectList: MyProjectData[];
	currProject: object;
	projectMemberList: any[];
}

export interface ProjectData {
	teamId: string;
	projectId: string;
	accountId: string;
	name: string;
	cName: string;
	desc: string;
	status: string;
}

export interface MyProjectData {
	project: ProjectData;
	plan: PlanData;
	planItem: Array<PlanItemData>;
}

// Project
export interface GetProjectParams {
	teamId: string;
}

export interface GetProjectResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}

export interface AddProjectResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}

export interface ProjectMode {
	projectId: string;
	accountId: string;
	teamId: string;
	name: string;
	cName: string;
	desc: string;
	children: Array<ApplicationMode>;
}

export interface GetProjectParams {
	teamId: string;
	accountId: string;
}

export interface ListProjectParams {
	teamId: string;
	pageIndex: number;
	pageSize: number;
	year?: number;
	month?: number;
	week?: number;
	status?: string;
}

export interface ListProjectResponse {
	list: Array<ProjectMode>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}

export interface UpdateProjectParams {
	teamId: string;
	accountId: string;
}

export interface UpdateProjectResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
	};
}

// -----------Project_Member
export interface ProjectMemberMode {
	projectId: string;
	accountId: string;
	nickName: string;
	phone: string;
	roleId: number;
	salt: string;
	avatar: string;
	sex: string;
	email: string;
	deptId: number;
	postId: number;
	dataScope: string;
	roleName: string;
	deptName: string;
	teamId: string;
	name: string;
	cName: string;
	desc: string;
	children: Array<ApplicationMode>;
}
export interface AddProjectMemberParams {
	teamId: string;
	accountId: string;
}
export interface AddProjectMemberResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}

export interface GetProjectMemberParams {
	teamId: string;
	accountId: string;
}
export interface GetProjectMemberResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
		name: string;
		cName: string;
		desc: string;
		gitLabGroupId: number;
	};
}

export interface ListProjectMemberParams {
	teamId: string;
	projectId: string;
}

export interface ListProjectMemberResponse {
	list: Array<ProjectMemberMode>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}

export interface UpdateProjectMemberParams {
	teamId: string;
	accountId: string;
}

export interface UpdateProjectMemberResponse extends IResponse {
	data: {
		teamId: string;
		accountId: string;
	};
}
