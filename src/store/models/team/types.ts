import { IResponse } from "..";

export interface loginInfo {
	username?: string;
	password: string;
	token?: string;
}
export interface TeamState {
	teamId: string;
	currTeam: object;
	teamList: Array<any>;
	teamMemberList: Array<any>;
}

export interface TeamData {
	id?: number;
	teamId?: string;
	accountId?: string;
	gitLabGroupId?: number;
	name: string;
	cName: string;
	desc: string;
	status?: string;
}

// Team
export interface AddTeamParams {
	name: string;
	cName: string;
	desc: string;
}
export interface AddTeamResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		accountId: string;
		gitLabGroupId: number;
		name: string;
		cName: string;
		desc: string;
		status: string;
	};
}

export interface GetTeamParams {
	teamId: string;
}
export interface GetTeamResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		accountId: string;
		gitLabGroupId: number;
		name: string;
		cName: string;
		desc: string;
		status: string;
	};
}

export interface UpdateTeamParams {
	teamId: string;
	cName: string;
	name: string;
	desc: string;
	status: string;
}
export interface UpdateTeamResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		accountId: string;
		gitLabGroupId: number;
		name: string;
		cName: string;
		desc: string;
		status: string;
	};
}

export interface ListTeamParams {}

export interface ListTeamResponse {
	list: Array<TeamData>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}
