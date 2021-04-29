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

	async getApplicationUpdateList(store, p: UpdateApplicationParams) {
		try {
			let params: ListApplicationUpdateParams = {
				appId: store.state.currEditApplication.appId,
			};
			console.log("params", params);

			const result = await ApplicationApi.ListApplicationUpdate(params);
			store.commit("SET_APPLICATION_UPDATE_LIST", result.list);
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
};

export default actions;
