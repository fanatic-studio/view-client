import { GetterTree } from "vuex";
import { ApplicationState } from "./types";

const getters: GetterTree<ApplicationState, any> = {
	//-- app
	applicationList: (state) => state.applicationList,
	applicationListCount: (state) => state.applicationListCount,
	currEditApplication: (state) => state.currEditApplication,

	//--update
	currApplicationUpdateList: (state) => state.currApplicationUpdateList,
	currApplicationUpdateListCount: (state) =>
		state.currApplicationUpdateListCount,
	currEditApplicationUpdate: (state) => state.currEditApplicationUpdate,

	//--version
	currApplicationVersionList: (state) => state.currApplicationVersionList,
	currApplicationVersionListCount: (state) =>
		state.currApplicationVersionListCount,
	currEditApplicationVersion: (state) => state.currEditApplicationVersion,

	//--welcome
	currApplicationWelcomeList: (state) => state.currApplicationWelcomeList,
	currApplicationWelcomeListCount: (state) =>
		state.currApplicationWelcomeListCount,
	currEditApplicationWelcome: (state) => state.currEditApplicationWelcome,
};

export default getters;
