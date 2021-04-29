import MilestoneApi from "@/api/milestone";
import { ActionTree } from "vuex";
import {
	AddMilestoneParams,
	ListMilestoneParams,
	MilestoneMode,
	MilestoneState,
	UpdateMilestoneParams,
} from "./types";

const actions: ActionTree<MilestoneState, any> = {
	async getMilestoneList(store, p: ListMilestoneParams) {
		const params: ListMilestoneParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: p.pageIndex,
			pageSize: p.pageSize,
			status: p.status,
		};
		try {
			const result = await MilestoneApi.ListMilestone(params);
			store.commit("SET_MILESTONES_LIST", result.list);
			store.commit("SET_MILESTONES_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addMilestone(store, p: MilestoneMode) {
		const params: AddMilestoneParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			startAt: p.startAt,
			onlineAt: p.onlineAt,
		};
		try {
			console.log("addMilestone - params", params);
			const result = await MilestoneApi.AddMilestone(params);
			console.log("addMilestone - result", result);
		} catch (error) {}
	},
	async updateMilestone(store, p: UpdateMilestoneParams) {
		const params: UpdateMilestoneParams = {
			milestoneId: store.state.currEditMilestone.milestoneId,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			startAt: p.startAt,
			onlineAt: p.onlineAt,
			status: p.status,
		};
		try {
			console.log("updateMilestone - params", params);
			const result = await MilestoneApi.UpdateMilestone(params);
			store.commit("SET_EDIT_MILESTONES", result.data);
		} catch (error) {}
	},
	updateEditMilestone(store, p: any) {
		store.commit("SET_EDIT_MILESTONES", p);
	},
};

export default actions;
