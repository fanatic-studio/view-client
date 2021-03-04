import AppLayout from "@/components/Layouts/AppLayout";
import WorkLayout from "@/components/Layouts/WorkLayout";
import { RouterItem } from "./types";
export const publicRouter: Array<RouterItem> = [
	{
		path: "*",
		name: "",
		meta: { label: "首页" },
		component: () => import("@/views/NotFound"),
	},
	{
		path: "/",
		name: "",
		meta: { label: "首页" },
		redirect: "/login",
	},
	{
		name: "Login",
		path: "/login",
		meta: { label: "首页" },
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
	{
		path: "myPlan",
		icon: "",
		name: "myPlan",
		meta: {
			label: "工作计划",
		},
		component: () => import("@/views/App/Plan"),
	},
	{
		path: "myRequirement",
		icon: "",
		name: "myRequirement",
		meta: {
			label: "需求",
		},
		component: () => import("@/views/App/Requirement"),
	},
	{
		path: "myRpplication",
		icon: "",
		name: "myRpplication",
		meta: {
			label: "子项目",
		},
		component: () => import("@/views/App/Application"),
	},
	{
		path: "myMilestone",
		icon: "",
		name: "myMilestone",
		meta: {
			label: "里程碑",
		},
		component: () => import("@/views/App/Milestone"),
	},
	{
		path: "myIssues",
		icon: "",
		name: "myIssues",
		meta: {
			label: "issue",
		},
		component: () => import("@/views/App/Issues"),
	},
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
