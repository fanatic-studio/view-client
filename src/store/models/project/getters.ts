import { GetterTree } from 'vuex';
import { ProjectState } from './types';

const getters: GetterTree<ProjectState, any> = {
	projectList: (state) => state.projectList,
	myProjectList: (state) => state.myProjectList,
	projectMemberList: (state) => state.projectMemberList,
};

export default getters;
