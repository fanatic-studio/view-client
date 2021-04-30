import { MutationTree } from "vuex";

import { ApplicationState } from "./types";

const mutations: MutationTree<ApplicationState> = {
	SET_APPLICATION_LIST(state, applicationList) {
		state.applicationList = applicationList;
	},
	SET_APPLICATION_LIST_COUNT(state, count) {
		state.applicationListCount = count;
	},
	SET_EDIT_APPLICATION(state, application) {
		state.currEditApplication = application;
	},
	SET_APPLICATION_UPDATE_LIST(state, updateList) {
		state.currApplicationUpdateList = updateList;
	},
	SET_APPLICATION_UPDATE_LIST_COUNT(state, count) {
		state.currApplicationUpdateListCount = count;
	},
	SET_EDIT_APPLICATION_UPDATE(state, applicationUpdate) {
		state.currEditApplicationUpdate = applicationUpdate;
	},
	SET_APPLICATION_VERSION_LIST(state, versionList) {
		state.currApplicationVersionList = versionList;
	},
	SET_APPLICATION_VERSION_LIST_COUNT(state, count) {
		state.currApplicationVersionListCount = count;
	},
	SET_EDIT_APPLICATION_VERSION(state, applicationVersion) {
		state.currEditApplicationVersion = applicationVersion;
	},
};

export default mutations;
