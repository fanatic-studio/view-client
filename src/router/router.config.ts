import AppLayout from "@/components/Layouts/AppLayout";
import WorkLayout from "@/components/Layouts/WorkLayout";
import { RouterItem } from "./types";
export const publicRouter: Array<RouterItem> = [
	{
		name: "NotFound",
		path: "*",
		meta: { label: "404" },
		redirect: "/notFound",
	},
	{
		name: "NotFound",
		path: "/notFound",
		meta: { label: "404" },
		component: () => import("@/views/NotFound"),
	},
	{
		name: "Home",
		path: "/",
		meta: { label: "首页" },
		redirect: "/login",
	},
	{
		name: "Login",
		path: "/login",
		meta: { label: "登录页" },
		component: () => import("@/views/Login"),
	},
	{
		name: "AsyncGitLab",
		path: "/asyncGitLab",
		meta: { label: "同步Gitlab信息" },
		component: () => import("@/views/AsyncGitLab"),
	},
];

export const workRouter: Array<RouterItem> = [
	
];

export const appRouter: Array<RouterItem> = [
	{
		path: "/app",
		icon: "",
		name: "app",
		meta: {
			label: "工作台",
		},
		redirect: "/app/workPlace",
		component: AppLayout,
		children: [
			{
				path: "workPlace",
				icon: "",
				name: "workPlace",
				meta: {
					label: "工作台",
				},
				component: () => import("@/views/App/WorkPlace"),
			},
			{
				path: "/work",
				icon: "",
				name: "work",
				redirect: "/work/myPlan",
				meta: {
					label: "work",
				},
				component: WorkLayout,
				children: [...workRouter],
			},
			{
				path: "workDetail",
				icon: "",
				name: "workDetail",
				meta: {
					label: "订单详情",
				},
				component: () => import("@/views/App/WorkDetail"),
			},
		],
	},
];

export const adminRouter: Array<RouterItem> = [
	{
		path: "/admin",
		icon: "",
		name: "admin",
		meta: {
			label: "工作台",
		},
		redirect: "/admin/dashboard",
		component: AppLayout,
		children: [
			{
				path: "dashboard",
				icon: "",
				name: "dashboard",
				meta: {
					label: "工作台",
				},
				component: () => import("@/views/Admin/Dashboard"),
			},
		],
	},
];
export const routes = [...publicRouter, ...appRouter, ...adminRouter];
