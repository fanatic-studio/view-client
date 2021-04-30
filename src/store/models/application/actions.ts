import ApplicationApi from "@/api/application";
import { ActionTree } from "vuex";
import {
	AddApplicationParams,
	ListApplicationParams,
	ApplicationMode,
	ApplicationState,
	UpdateApplicationParams,
	ListApplicationUpdateParams,
	ApplicationUpdateMode,
	AddApplicationUpdateParams,
	UpdateApplicationUpdateParams,
	CheckApplicationUpdateParams,
	ListApplicationVersionParams,
	AddApplicationVersionParams,
	UpdateApplicationVersionParams,
	ApplicationVersionMode,
} from "./types";

const actions: ActionTree<ApplicationState, any> = {
	async getApplicationList(store) {
		const params: ListApplicationParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
		};
		try {
			const result = await ApplicationApi.ListApplication(params);
			store.commit("SET_APPLICATION_LIST", result.list);
			store.commit("SET_APPLICATION_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addApplication(store, p: ApplicationMode) {
		const params: AddApplicationParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			appType: p.appType,
			name: p.name,
			cName: p.cName,
			desc: p.desc,
			package: p.package,
			assignee: p.assignee,
		};
		try {
			console.log("addApplication - params", params);
			const result = await ApplicationApi.AddApplication(params);
			console.log("addApplication - result", result);
		} catch (error) {}
	},
	async updateApplication(store, p: UpdateApplicationParams) {
		const params: UpdateApplicationParams = {
			applicationId: store.state.currEditApplication.applicationId,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			startAt: p.startAt,
			onlineAt: p.onlineAt,
			status: p.status,
		};
		try {
			console.log("updateApplication - params", params);
			const result = await ApplicationApi.UpdateApplication(params);
			store.commit("SET_EDIT_APPLICATION", result.data);
		} catch (error) {}
	},
	updateEditApplication(store, p: any) {
		store.commit("SET_EDIT_APPLICATION", p);
	},

	async getApplicationUpdateList(store, p: ListApplicationUpdateParams) {
		try {
			let params: ListApplicationUpdateParams = {
				appId: store.state.currEditApplication.appId,
				pageIndex: p.pageIndex,
				pageSize: p.pageSize,
			};
			console.log("params", params);

			const result = await ApplicationApi.ListApplicationUpdate(params);
			store.commit("SET_APPLICATION_UPDATE_LIST", result.list);
			store.commit("SET_APPLICATION_UPDATE_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addApplicationUpdate(store, p: ApplicationUpdateMode) {
		const params: AddApplicationUpdateParams = {
			appId: store.state.currEditApplication.appId,
			title: p.title,
			package: store.state.currEditApplication.package,
			version: p.version,
			platform: p.platform,
			reboot: p.reboot,
			rebootTitle: p.rebootTitle,
			rebootMessage: p.rebootMessage,
			rebootConfirmReboot: p.rebootConfirmReboot,
			fileUrl: p.fileUrl,
			fileSize: p.fileSize,
			valid: p.valid,
			updateMode: p.updateMode,
			clearCache: p.clearCache,
			debug: p.debug,
		};
		try {
			console.log("addApplicationUpdate - params", params);
			const result = await ApplicationApi.AddApplicationUpdate(params);
			console.log("addApplication - result", result);
			return result;
		} catch (error) {}
	},
	updateEditApplicationUpdate(store, p: any) {
		console.log("123123", p);

		store.commit("SET_EDIT_APPLICATION_UPDATE", p);
	},
	async updateApplicationUpdate(store, p: UpdateApplicationUpdateParams) {
		const params: UpdateApplicationUpdateParams = {
			appId: store.state.currEditApplication.appId,
			updateId: p.updateId,
			title: p.title,
			package: store.state.currEditApplication.package,
			version: p.version,
			platform: p.platform,
			reboot: p.reboot,
			rebootTitle: p.rebootTitle,
			rebootMessage: p.rebootMessage,
			rebootConfirmReboot: p.rebootConfirmReboot,
			fileUrl: p.fileUrl,
			fileSize: p.fileSize,
			valid: p.valid,
			updateMode: p.updateMode,
			clearCache: p.clearCache,
			debug: p.debug,
		};
		try {
			console.log("updateApplication - params", params);
			const result = await ApplicationApi.UpdateApplicationUpdate(params);
			store.commit("SET_EDIT_APPLICATION_UPDATE", result.data);
		} catch (error) {}
	},
	async checkApplicationUpdate(store) {
		const params: CheckApplicationUpdateParams = {
			appId: store.state.currEditApplication.appId,
			package: store.state.currEditApplication.package,
			version: store.state.currEditApplication.version,
			platform: store.state.currEditApplication.platform,
		};
		try {
			console.log("updateApplication - params", params);
			const result = await ApplicationApi.CheckApplicationUpdate(params);
			return result.data;
		} catch (error) {}
	},
	//-------version

	async getApplicationVersionList(store, p: ListApplicationVersionParams) {
		try {
			let params: ListApplicationVersionParams = {
				appId: store.state.currEditApplication.appId,
				pageIndex: p.pageIndex,
				pageSize: p.pageSize,
			};
			console.log("params", params);

			const result = await ApplicationApi.ListApplicationVersion(params);
			store.commit("SET_APPLICATION_VERSION_LIST", result.list);
			store.commit("SET_APPLICATION_VERSION_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addApplicationVersion(store, p: ApplicationVersionMode) {
		const params: AddApplicationVersionParams = {
			appId: store.state.currEditApplication.appId,
			version: p.version,
			versionName: p.versionName,
			package: store.state.currEditApplication.package,
			title: p.title,
			content: p.content,
			platform: p.platform,
			iOSUrl: p.iOSUrl,
			androidUrl: p.androidUrl,
			templateId: p.templateId,
			forced: p.forced,
			debug: p.debug,
		};
		try {
			console.log("addApplicationVersion - params", params);
			const result = await ApplicationApi.AddApplicationVersion(params);
			console.log("addApplication - result", result);
			return result;
		} catch (error) {}
	},
	updateEditApplicationVersion(store, p: any) {
		store.commit("SET_EDIT_APPLICATION_VERSION", p);
	},
	async updateApplicationVersion(store, p: UpdateApplicationVersionParams) {
		const params: UpdateApplicationVersionParams = {
			appId: store.state.currEditApplication.appId,
			versionId: store.state.currEditApplicationVersion.versionId,
			version: p.version,
			versionName: p.versionName,
			package: store.state.currEditApplication.package,
			isPublic: p.isPublic,
			title: p.title,
			content: p.content,
			platform: p.platform,
			iOSUrl: p.iOSUrl,
			androidUrl: p.androidUrl,
			androidMode: p.androidMode,
			templateId: p.templateId,
			forced: p.forced,
			debug: p.debug,
			canCancel: p.canCancel,
			status: p.status,
		};
		try {
			console.log("updateApplication - params", params);
			const result = await ApplicationApi.UpdateApplicationVersion(params);
			store.commit("SET_EDIT_APPLICATION_VERSION", result.data);
		} catch (error) {}
	},
};

export default actions;
