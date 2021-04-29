import { GetterTree } from "vuex";
import { ApplicationState } from "./types";

const getters: GetterTree<ApplicationState, any> = {
	applicationList: (state) => state.applicationList,
	applicationListCount: (state) => state.applicationListCount,
	currEditApplication: (state) => state.currEditApplication,
	currApplicationUpdateList: (state) => state.currApplicationUpdateList,
	currApplicationUpdateListCount: (state) =>
		state.currApplicationUpdateListCount,
	currEditApplicationUpdate: (state) => state.currEditApplicationUpdate,
};

export default getters;
