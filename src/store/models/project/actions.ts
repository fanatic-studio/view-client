import ProjectApi from "@/api/project";
import moment from "moment";
import { ActionTree } from "vuex";
import {
	ListProjectMemberParams,
	ListProjectParams,
	ProjectMode,
	ProjectState,
} from "./types";

const actions: ActionTree<ProjectState, any> = {
	async getProjectLis(store, p: any) {
		const params: ListProjectParams = {
			teamId: store.rootState.team.teamId,
			pageIndex: p.pageIndex,
			pageSize: p.pageSize,
			// status: p.status
		};
		try {
			const result = await ProjectApi.ListProject(params);
			store.commit("SET_PROJECT_LIST", result.list);
		} catch (error) {}
	},
	async getProjectMemberLis(store) {
		const params: ListProjectMemberParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
		};
		try {
			const result = await ProjectApi.ListProjectMember(params);
			store.commit("SET_PROJECT_MEMBER_LIST", result.list);
		} catch (error) {}
	},
	async getMyProjectList(store, p: any) {
		const date = new Date();
		console.log("--------");

		const params: ListProjectParams = {
			teamId: store.rootState.team.teamId,
			pageIndex: p.pageIndex,
			pageSize: p.pageSize,
			year: moment().year(),
			month: moment().month() + 1,
			week: moment().week(),
		};
		try {
			const result = await ProjectApi.MyListProject(params);
			store.commit("SET_MY_PROJECT_LIST", result.list);
		} catch (error) {}
	},
	updateCurrProject(store, project: ProjectMode) {
		store.commit("SET_CURR_PROJECT", project);
		store.commit("SET_PROJECT_ID", project.projectId);
	},
};

export default actions;
