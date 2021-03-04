import TeamApi from "@/api/team";
import { ActionTree } from "vuex";
import { TeamData, TeamState } from "./types";

const actions: ActionTree<TeamState, any> = {
	async getTeamList(store, p: any) {
		try {
			let res = await TeamApi.ListTeam();
			store.commit("SET_TEAM_LIST", res.list);
		} catch (error) {}
	},
	updateCurrTeam(store, team: TeamData) {
		store.commit("SET_CURR_TEAM", team);
		store.commit("SET_TEAM_ID", team.teamId);
	},
};

export default actions;
