import Router, { RawLocation } from 'vue-router';
import Vue from 'vue';

import routes from './router.config';

Vue.use(Router);

const originalPush = Router.prototype.push as any;

Router.prototype.push = function push(location: RawLocation) {
	return originalPush.call(this, location).catch((err: any) => err);
};
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes(),
});
