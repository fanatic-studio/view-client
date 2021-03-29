export default (store: any, router: { beforeEach: Function }) => {
	router.beforeEach(
		(
			newpath: { [prospName: string]: any },
			_oldpath: { [prospName: string]: any },
			next: Function
		) => {
			// if (
			// 	// 满足已登录的条件，如必须具备token
			// 	!store.state.account.loginInfo.token
			// )
			// 	return next({
			// 		name: "login",
			// 	});
			// // 自vuex取权限列表，对进入的路由进行权限验证,将未具有权限路由的请求跳转至404页面(可根据具体情况提示无权限)
			// if (newpath.name !== "login" && newpath.name !== "notfound")
			// 	return next({
			// 		name: "notfound",
			// 	});
			// if (
			// 	newpath.name !== "Login" &&
			// 	store.state.account.loginInfo.token === ""
			// ) {
			// 	return next({
			// 		path: "/login",
			// 	});
			// }
			// if (newpath.name !== "Login" && newpath.name !== "NotFound")
			// 	return next({
			// 		path: "/notfound",
			// 	});
			next();
		}
	);
};
