import { GetterTree } from 'vuex';
import { MilestoneState } from './types';

const getters: GetterTree<MilestoneState, any> = {
    milestoneList: (state) => state.milestoneList,
    milestoneListCount: (state) => state.milestoneListCount,
    currEditMilestone: (state) => state.currEditMilestone
};

export default getters;
