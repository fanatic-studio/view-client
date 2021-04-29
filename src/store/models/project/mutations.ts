import { MutationTree } from "vuex";

import { ProjectState } from "./types";

const mutations: MutationTree<ProjectState> = {
	SET_PROJECT_LIST(state, projectList) {
		state.projectList = projectList;
	},
	SET_MY_PROJECT_LIST(state, projectList) {
		state.myProjectList = projectList;
	},
	SET_PROJECT_MEMBER_LIST(state, projectMemberList) {
		state.projectMemberList = projectMemberList;
	},
	SET_CURR_PROJECT(state, project) {
		state.currProject = project;
	},
	SET_PROJECT_ID(state, projectId) {
		state.projectId = projectId;
	},
};

export default mutations;
