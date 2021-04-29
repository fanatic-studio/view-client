import { MutationTree } from 'vuex';

import { ApplicationState } from './types';

const mutations: MutationTree<ApplicationState> = {
    SET_APPLICATION_LIST(state, applicationList) {
        state.applicationList = applicationList;
    },
    SET_APPLICATION_LIST_COUNT(state, count) {
        state.applicationListCount = count;
    },
    SET_EDIT_APPLICATION(state, application) {
        state.currEditApplication = application;
    }
};

export default mutations;
