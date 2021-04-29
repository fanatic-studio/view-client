import IssuesApi from "@/api/issues";
import { ActionTree } from "vuex";
import {
	AddIssuesParams,
	ListIssuesParams,
	IssuesData,
	IssuesState,
	UpdateIssuesParams,
	GetIssuesParams,
	GetAllIssuesParams,
} from "./types";

const actions: ActionTree<IssuesState, any> = {
	async getIssuesList(store, p: ListIssuesParams) {
		const params: ListIssuesParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: p.pageIndex,
			pageSize: p.pageSize,
			status: p.status,
		};
		try {
			const result = await IssuesApi.ListIssues(params);
			store.commit("SET_ISSUES_LIST", result.list);
			store.commit("SET_ISSUES_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async getMyIssuesList(store, p: ListIssuesParams) {
		const params: ListIssuesParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			assignee: store.rootState.account.accountId,
			pageIndex: 1,
			pageSize: 100,
		};
		try {
			const result = await IssuesApi.ListIssues(params);
			store.commit("SET_MY_ISSUES_LIST", result.list);
		} catch (error) {}
	},
	async getAllIssueList(store) {
		const params: GetAllIssuesParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: 1,
			pageSize: 100,
		};
		try {
			const result = await IssuesApi.GetAllIssues(params);
			store.commit("SET_All_ISSUES_LIST", result.list);
			return result;
		} catch (error) {
			return error;
		}
	},
	async addIssues(store, p: AddIssuesParams) {
		const params: AddIssuesParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			requirementId: p.requirementId,
			milestoneId: p.milestoneId,
			appId: p.appId,
			type: p.type,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			startAt: p.startAt,
			endAt: p.endAt,
			extendA: p.extendA,
			extendB: p.extendB,
			priority: p.priority,
		};
		try {
			console.log("addIssues - params", params);
			const result = await IssuesApi.AddIssues(params);
			console.log("addIssues - result", result);
		} catch (error) {}
	},
	async updateIssues(store, p: UpdateIssuesParams) {
		const params: UpdateIssuesParams = {
			issuesId: store.state.currEditIssues.issuesId,
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			requirementId: p.requirementId,
			milestoneId: p.milestoneId,
			appId: p.appId,
			type: p.type,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			startAt: p.startAt,
			endAt: p.endAt,
			extendA: p.extendA,
			extendB: p.extendB,
			priority: p.priority,
			status: p.status,
		};
		try {
			console.log("updateIssues - params", params);
			const result = await IssuesApi.UpdateIssues(params);
			store.commit("SET_EDIT_ISSUES", result.data);
		} catch (error) {}
	},
	updateEditIssues(store, p: any) {
		store.commit("SET_EDIT_ISSUES", p);
	},
	async getIssues(store) {
		const params: GetIssuesParams = {
			issuesId: store.state.currEditIssues.issuesId,
		};
		try {
			const result = await IssuesApi.GetIssues(params);
			return result;
		} catch (error) {
			return error;
		}
	},
};

export default actions;
