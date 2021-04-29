import { MutationTree } from 'vuex';

import { MilestoneState } from './types';

const mutations: MutationTree<MilestoneState> = {
    SET_MILESTONES_LIST(state, milestoneList) {
        state.milestoneList = milestoneList;
    },
    SET_MILESTONES_LIST_COUNT(state, count) {
        state.milestoneListCount = count;
    },
    SET_EDIT_MILESTONES(state, milestone) {
        state.currEditMilestone = milestone;
    }
};

export default mutations;
