import { MutationTree } from "vuex";

import { TeamState } from "./types";

const mutations: MutationTree<TeamState> = {
	SET_TEAM_LIST(state, teamList) {
		state.teamList = teamList;
	},
	SET_TEAM_MEMBER_LIST(state, teamMemberList) {
		state.teamMemberList = teamMemberList;
	},
	SET_CURR_TEAM(state, team) {
		state.currTeam = team;
	},
	SET_TEAM_ID(state, teamId) {
		state.teamId = teamId;
	},
};

export default mutations;
