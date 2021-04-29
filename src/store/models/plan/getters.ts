import { GetterTree } from "vuex";
import { PlanState } from "./types";

const getters: GetterTree<PlanState, any> = {
	planList: (state) => state.planList,
	planListCount: (state) => state.planListCount,
	currEditPlan: (state) => state.currEditPlan,
	planType: (state) => state.planType,
	planItemList: (state) => state.planItemList,
	planItemListCount: (state) => state.planItemListCount,
	currEditPlanItem: (state) => state.currEditPlanItem,
	currMonthPlan: (state) => state.currMonthPlan,
};

export default getters;
