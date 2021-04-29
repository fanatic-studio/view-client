import Vue from 'vue';
import { ActionTree } from 'vuex';

import themeColor from '@/config/themeColor';
import defaultThemeColor from '@/style/defaultThemeColor';

import { theme, tabItem, RootState, deviceType, languageType, routesInfoMap, localStoreType } from './types';

const actions: ActionTree<RootState, any> = {
    // 切换全局语言
    toggleLanguage({ commit }, lan: languageType) {
        commit('TOGGLE_LANGUAGE', lan);
    },
    // 修改全局主题
    toggleGlobalTheme({ commit }, theme: theme) {
        commit('TOGGLE_THEME', theme);
    },
    // 修改主题色
    toggleThemeColor({ commit }, themeColor: { key: string; color: string }) {
        commit('TOGGLE_THEME_COLOR', themeColor.key);
    },
    // 切换客户端的类型，响应式布局
    toggleDeviceType({ commit }, deviceType: deviceType) {
        commit('TOGGLE_DEVICETYPE', deviceType);
    },
    // 切换本地数据持久化
    toogleLocalStore({ commit }, type: localStoreType) {
        commit('TOGGLE_LOCAL_STORE', type);
    },
    // 清空所有本地数据
    clearAllLocalStore({ commit }, payload: { vm: { setDefaultThemeColor: Function }; tabList: Array<tabItem>; routesInfoMap: routesInfoMap }) {
        // 默认系统数据
        commit('RESET_LOCAL_STORE');
        // 还原系统默认主题色
        const colorInfo: { key: string; color: string } | undefined = themeColor.find((item) => item.color === defaultThemeColor);
        if (payload.vm.setDefaultThemeColor) payload.vm.setDefaultThemeColor(colorInfo, false);
        // 清空tab以及路由数据
        commit('CLEAR_TAB', payload.vm);
        if (payload.tabList && payload.tabList.length > 1) {
            payload.tabList.forEach((item) => {
                const { module } = payload.routesInfoMap[item.id];
                if (module) module.forEach((moduleName) => commit(`${moduleName}/CLEAR_STORE`));
            });
        }
    }
};

export default actions;
