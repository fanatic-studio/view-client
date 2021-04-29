import { GetterTree } from 'vuex';
import { RequirementState } from './types';

const getters: GetterTree<RequirementState, any> = {
    requirementListCount: (state) => state.requirementListCount,
    requirementList: (state) => state.requirementList,
    requirementId: (state) => state.requirementId,
    currEditRequirement: (state) => state.currEditRequirement
};

export default getters;
