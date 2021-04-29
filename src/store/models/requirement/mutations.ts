import { MutationTree } from 'vuex';

import { RequirementState } from './types';

const mutations: MutationTree<RequirementState> = {
    SET_EDIT_REQUIREMENT(state, requirement) {
        state.currEditRequirement = requirement;
    },

    SET_REQUIREMENT_LIST(state, requirementList) {
        state.requirementList = requirementList;
    },

    SET_REQUIREMENT_LIST_COUNT(state, count) {
        state.requirementListCount = count;
    },

    SET_CURR_ADD_REQUIREMENT(state, p) {
        state.currAddRequirement = p;
    }
};

export default mutations;
