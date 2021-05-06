import { Module } from "vuex";
import { ApplicationState } from "./types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const createState = (): ApplicationState => ({
	applicationList: [],
	applicationListCount: 0,
	currEditApplication: {},
	currApplicationUpdateListCount: 0,
	currApplicationUpdateList: [],
	currEditApplicationUpdate: {},
	currApplicationVersionListCount: 0,
	currApplicationVersionList: [],
	currEditApplicationVersion: {},
	currApplicationWelcomeListCount: 0,
	currApplicationWelcomeList: [],
	currEditApplicationWelcome: {},
});

const namespaced: boolean = true;

const app: Module<ApplicationState, any> = {
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
