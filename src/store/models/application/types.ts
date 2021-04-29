import { IResponse } from "..";

// State
export interface ApplicationState {
	applicationList: Array<ApplicationMode>;
	applicationListCount: number;
	currEditApplication: any;
	currApplicationUpdateListCount: number;
	currApplicationUpdateList: Array<ApplicationUpdateMode>;
	currEditApplicationUpdate: any;
}

export interface ApplicationMode {
	id?: number;
	teamId?: string;
	projectId?: string;
	accountId?: string;
	appId?: string;
	appType: string;
	gitLabProjectId?: number;
	name: string;
	cName: string;
	desc: string;
	assignee: string;
	welcomeJump: string;
	welcomeImage: string;
	welcomeLimitE: number;
	welcomeLimitS: number;
	welcomeSkip: number;
	welcomeWait: number;
	version: string;
	versionName: string;
	platform: string;
	package: string;
	debug: number;
	launchTotal?: number;
	allInstall?: number;
	status?: string;
}

export interface ApplicationUpdateMode {
	id?: string;
	updateId?: string;
	appId?: string;
	appType: string;
	title: string;
	package: string;
	version: string;
	platform: string;
	reboot: string;
	rebootTitle: string;
	rebootMessage: string;
	rebootConfirmReboot: string;
	fileUrl: string;
	fileSize: string;
	valid: string;
	updateMode: string;
	clearCache: string;
	debug: string;
	launchTotal?: string;
	allInstall?: string;
	status?: string;
}

// Application
export interface AddApplicationParams {
	teamId?: string;
	projectId?: string;
	appType: string;
	name: string;
	cName: string;
	desc: string;
	assignee: string;
	package: string;
}
export interface AddApplicationResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface GetApplicationParams {
	applicationId: string;
}
export interface GetApplicationResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface UpdateApplicationParams {
	applicationId: string;
	name: string;
	desc: string;
	content: string;
	assignee: string;
	startAt: string;
	onlineAt: string;
	status: string;
}
export interface UpdateApplicationResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface ListApplicationParams {
	teamId: string;
	projectId: string;
}

export interface ListApplicationResponse {
	list: Array<ApplicationMode>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}

//-------
export interface AddApplicationUpdateParams {
	appId?: string;
	title: string;
	package?: string;
	version: string;
	platform: string;
	reboot: string;
	rebootTitle: string;
	rebootMessage: string;
	rebootConfirmReboot: string;
	fileUrl: string;
	fileSize?: string;
	valid: string;
	updateMode: string;
	clearCache: string;
	debug: string;
}
export interface AddApplicationUpdateResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface GetApplicationUpdateParams {
	applicationId: string;
}
export interface GetApplicationUpdateResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface UpdateApplicationUpdateParams {
	appId?: string;
	updateId?: string;
	title: string;
	package?: string;
	version: string;
	platform: string;
	reboot: string;
	rebootTitle: string;
	rebootMessage: string;
	rebootConfirmReboot: string;
	fileUrl: string;
	fileSize?: string;
	valid: string;
	updateMode: string;
	clearCache: string;
	debug: string;
}
export interface UpdateApplicationUpdateResponse extends IResponse {
	data: {
		id: number;
		teamId: string;
		projectId: string;
		accountId: string;
		applicationId: string;
		gitLabApplicationId: number;
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

export interface ListApplicationUpdateParams {
	appId: string;
	pageIndex: string;
	pageSize: string;
}

export interface ListApplicationUpdateResponse {
	list: Array<ApplicationMode>;
	count: number;
	pageIndex: number;
	pageSize: number;
	ret: number;
}
