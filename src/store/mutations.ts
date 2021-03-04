import { Vue } from 'vue-property-decorator';
import { MutationTree } from 'vuex';

import { RootState, localStoreType } from './types';
import enableRouterLocalStore from '@/utils/enableRouterLocalStore';
import localStore from '@/localStore';

const mutations: MutationTree<RootState> = {
    // 修改当前语言
    TOGGLE_LANGUAGE(state: any, lan) {
        state.language.current = Vue.prototype.$currentLanguage = lan;
    },
    // 修改主题
    TOGGLE_THEME(state, theme) {
        state.theme = theme;
    },
    // 修改主题色
    TOGGLE_THEME_COLOR(state, themeColor) {
        state.themeColor = themeColor;
    },
    // 切换本地数据持久化
    TOGGLE_LOCAL_STORE(state: any, type: localStoreType) {
        state[type] = !state[type];
        // 页面数据本地持久化
        if (type === 'routerLocalStore') {
            if (state[type]) {
                window._enableRouterLocalStore = enableRouterLocalStore(this as any);
            } else if (window._enableRouterLocalStore && typeof window._enableRouterLocalStore === 'function') {
                window._enableRouterLocalStore();
                window._enableRouterLocalStore = null;
                localStore.clear();
            }
        }
    }
};

export default mutations;
