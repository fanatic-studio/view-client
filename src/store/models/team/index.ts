import { Module } from "vuex";
import { TeamState } from "./types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const createState = (): TeamState => ({
	teamId: "187ffe4378f042f2b40da22b2e67c21f", // 线上
	currTeam: {},
	teamList: [],
	teamMemberList: [],
});

const namespaced: boolean = true;

const app: Module<TeamState, any> = {
	namespaced,
	state: createState(),
	mutations: {
		// 绑定vuex的路由需要具备清除方法
		// 绑定路由页面缓存的页面需要具备还原状态的方法
		...mutations,
	},
	actions,
	getters,
};

export default app;
