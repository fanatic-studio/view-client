import PlanApi from "@/api/plan";
import { ActionTree } from "vuex";
import {
	AddPlanItemParams,
	AddPlanParams,
	ListPlanItemParams,
	ListPlanParams,
	PlanItemData,
	PlanData,
	PlanState,
	UpdatePlanItemParams,
	UpdatePlanParams,
	GetPlanParams,
} from "./types";

const actions: ActionTree<PlanState, any> = {
	async getPlanList(store) {
		const date = new Date();
		const params: ListPlanParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: 1,
			pageSize: 12,
			year: date.getFullYear(),
		};
		if (store.state.planType === "month") {
			params.month = date.getMonth() + 1;
		}
		try {
			console.log("getPlanList - params", params);

			const result = await PlanApi.ListPlan(params);
			store.commit("SET_PLAN_LIST", result.list);
			store.commit("SET_PLAN_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addPlan(store, p: PlanData) {
		const date = new Date();
		const params: AddPlanParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			year: date.getFullYear(),
			month: p.month,
		};
		try {
			console.log("addPlan - params", params);
			const result = await PlanApi.AddPlan(params);
			console.log("addPlan - result", result);
		} catch (error) {}
	},
	async updatePlan(store, p: UpdatePlanParams) {
		const params: UpdatePlanParams = {
			planId: store.state.currEditPlan.planId,
			name: p.name,
			desc: p.desc,
			content: p.content,
			assignee: p.assignee,
			month: p.month,
		};
		try {
			console.log("updatePlan - params", params);
			const result = await PlanApi.UpdatePlan(params);
			store.commit("SET_EDIT_PLAN", result.data);
		} catch (error) {}
	},
	updateEditPlan(store, p: any) {
		store.commit("SET_EDIT_PLAN", p);
	},
	updatePlanType(store, p: any) {
		store.commit("SET_PLAN_TYPE", p);
	},
	async getMonthPlan(store, p: PlanData) {
		const date = new Date();
		const params: GetPlanParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			year: date.getFullYear(),
			month: date.getMonth() + 1,
		};
		try {
			console.log("getPlan - params", params);
			const result = await PlanApi.GetMonthPlan(params);
			console.log("getPlan - result", result);
			store.commit("SET_MONTH_PLAN", result);
			return true;
		} catch (error) {
			return false;
		}
	},
	// -----------plan item
	async getPlanItemList(store, p: any) {
		const params: ListPlanItemParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			pageIndex: p.pageIndex,
			pageSize: p.pageSize,
			// status: p.status
		};
		try {
			const result = await PlanApi.ListPlanItem(params);
			store.commit("SET_PLAN_ITEM_LIST", result.list);
			store.commit("SET_PLAN_ITEM_LIST_COUNT", result.count);
		} catch (error) {}
	},
	async addPlanItem(store, p: PlanItemData) {
		const params: AddPlanItemParams = {
			teamId: store.rootState.team.teamId,
			projectId: store.rootState.project.projectId,
			planId: store.rootState.plan.currEditPlan.planId,
			type: p.type,
			name: p.name,
			desc: p.desc,
			// content: p.content,
			assignee: p.assignee,
			week: p.week,
			// report: p.report
		};
		try {
			console.log("addPlan - params", params);
			const result = await PlanApi.AddPlanItem(params);
			console.log("addPlan - result", result);
		} catch (error) {}
	},
	async updatePlanItem(store, p: UpdatePlanItemParams) {
		const params: UpdatePlanItemParams = {
			planItemId: store.rootState.plan.currEditPlanItem.planItemId,
			name: p.name,
			desc: p.desc,
			assignee: p.assignee,
			week: p.week,
			milestoneId: p.milestoneId,
			status: p.status,
		};
		try {
			console.log("updatePlan - params", params);
			const result = await PlanApi.UpdatePlanItem(params);
			store.commit("SET_EDIT_PLAN_ITEM", result.data);
		} catch (error) {}
	},
	updateEditPlanItem(store, p: any) {
		store.commit("SET_EDIT_PLAN_ITEM", p);
	},
};

export default actions;
