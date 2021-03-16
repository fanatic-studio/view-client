import { Module } from 'vuex';
import { ProjectState } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const createState = (): ProjectState => ({
	projectId: '',
	projectList: [],
	myProjectList: [],
	currProject: {},
	projectMemberList: [],
});

const namespaced: boolean = true;

const app: Module<ProjectState, any> = {
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
