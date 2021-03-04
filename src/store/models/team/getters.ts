import { GetterTree } from "vuex";
import { TeamState } from "./types";

const getters: GetterTree<TeamState, any> = {
	teamList: (state) => state.teamList,
	teamMemberList: (state) => state.teamMemberList,
};

export default getters;
