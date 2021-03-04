import RequirementApi from "@/api/requirement";
import { ActionTree } from "vuex";
import {
	AddRequirementParams,
	ListRequirementParams,
	RequirementMode,
	RequirementState,
	UpdateRequirementParams,
} from "./types";

const actions: ActionTree<RequirementState, any> = {
	async getRequirementList(store, p: any) {
		const params: ListRequirementParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: p.index,
			pageSize: p.size,
			status: p.status,
		};
		try {
			const result = await RequirementApi.ListRequirement(params);

			store.commit("SET_REQUIREMENT_LIST", result.list);
			store.commit("SET_REQUIREMENT_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addRequirement(store, p: RequirementMode) {
		const params: AddRequirementParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			name: p.name,
			type: p.type,
			desc: p.desc,
			priority: p.priority,
			assignee: p.assignee,
			startAt: p.startAt,
			onlineAt: p.onlineAt,
			frontAssignee: p.frontAssignee,
			serverAssignee: p.serverAssignee,
			uiAssignee: p.uiAssignee,
		};
		try {
			console.log("AddRequirement - params", params);
			const result = await RequirementApi.AddRequirement(params);
			store.commit("SET_CURR_ADD_REQUIREMENT", result);
		} catch (error) {}
	},
	async updateRequirement(store, p: UpdateRequirementParams) {
		const params: UpdateRequirementParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			requirementId: store.state.currEditRequirement.requirementId,
			type: p.type,
			priority: p.priority,
			name: p.name,
			desc: p.desc,
			competitorAnalysisUrl: p.competitorAnalysisUrl,
			requirementDocUrl: p.requirementDocUrl,
			requirementUiUrl: p.requirementUiUrl,
			requirementCodeUrl: p.requirementCodeUrl,
			assignee: p.assignee,
			frontAssignee: p.frontAssignee,
			serverAssignee: p.serverAssignee,
			uiAssignee: p.uiAssignee,
			milestoneId: p.milestoneId,
			progressRate: p.progressRate,
			startAt: p.startAt,
			onlineAt: p.onlineAt,
			status: p.status,
		};
		try {
			console.log("updateRequirement - params", params);
			const result = await RequirementApi.UpdateRequirement(params);
			store.commit("SET_EDIT_REQUIREMENT", result.data);
		} catch (error) {}
	},
	updateEditRequirement(store, p: any) {
		store.commit("SET_EDIT_REQUIREMENT", p);
	},
};

export default actions;
