import { GetterTree } from "vuex";
import { IssuesState } from "./types";

const getters: GetterTree<IssuesState, any> = {
	issuesList: (state) => state.issuesList,
	issuesListCount: (state) => state.issuesListCount,
	currEditIssues: (state) => state.currEditIssues,
	myIssuesList: (state) => state.myIssuesList,
	allIssuesList: (state) => state.allIssuesList,
};

export default getters;
