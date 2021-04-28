import ApplicationApi from "@/api/application";
import { ActionTree } from "vuex";
import {
	AddApplicationParams,
	ListApplicationParams,
	ApplicationMode,
	ApplicationState,
	UpdateApplicationParams,
	ListApplicationUpdateParams,
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

	async getApplicationUpdateLsit(store, p: UpdateApplicationParams) {
		try {
			let params: ListApplicationUpdateParams = {
				applicationId: store.state.currEditApplication.applicationId,
			};
			const result = await ApplicationApi.ListApplicationUpdate(params);
			store.commit("SET_APPLICATION_UPDATE_LIST", result.list);
		} catch (error) {}
	},
};

export default actions;
