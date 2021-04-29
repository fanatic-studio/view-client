import { MutationTree } from "vuex";

import { IssuesState } from "./types";

const mutations: MutationTree<IssuesState> = {
	SET_ISSUES_LIST(state, issuesList) {
		state.issuesList = issuesList;
	},
	SET_ISSUES_LIST_COUNT(state, count) {
		state.issuesListCount = count;
	},
	SET_EDIT_ISSUES(state, issues) {
		state.currEditIssues = issues;
	},
	SET_MY_ISSUES_LIST(state, issuesList) {
		state.myIssuesList = issuesList;
	},
	SET_All_ISSUES_LIST(state, issuesList) {
		state.allIssuesList = issuesList;
	},
};

export default mutations;
