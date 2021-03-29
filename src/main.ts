import Vue from "vue";
import localStore from "@/localStore";
import { message, Modal } from "ant-design-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "@/style/index.css";
import validateAuth from "@/utils/validateLogin";

Vue.use(Modal);

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);



Vue.config.productionTip = false;
// 全局message绑定
Vue.prototype.$message = message;

const initAPP = async () => {
	// 本地储存的key长度
	const len = await localStore.length().then((len) => len);
	// 开启路由页面本地缓存与继承
	const enableRouterCache = true; //store.state.routerLocalStore;
	if (enableRouterCache && len > 0) {
		// 开启缓存与本地数据持久化
		localStore.ready().then(() => {
			localStore.iterate((state, moduleName, idx) => {
				try {
					// 修正不具备状态或者不需要持久化路由在开启路由持久化配置时，抛出异常的问题
					if ((store as any)._mutations[`${moduleName}/EXTENDS_LOCAL_STORE`])
						store.commit(`${moduleName}/EXTENDS_LOCAL_STORE`, state);
				} catch (e) {
					console.error(e);
					return new Vue({
						router,
						store,
						render: (h) => h(App),
					}).$mount("#app");
				}
				if (idx === len) {
					// 读取本地库完成
					new Vue({
						router,
						store,
						render: (h) => h(App),
					}).$mount("#app");
				}
			});
		});
	} else {
		// 不开启缓存与本地数据持久化
		new Vue({
			router,
			store,
			render: (h) => h(App),
		}).$mount("#app");
	}
	// 启动监听
};
// 初始化系统
initAPP();
validateAuth(store, router);
