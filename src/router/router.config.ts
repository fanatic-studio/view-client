import { BasicLayout, RouterLayout } from '@/layouts';
import defaultHomeKey from '@/config/default.homeKey';
import DashLayout from '@/layouts/DashLayout';
export default () => [
	// 私有路由
	{
		id: 'basic-layout',
		name: 'basic-layout',
		path: '/',
		redirect: 'dashbord',
		component: BasicLayout,
		/** 路由从此处开始配置 id与name需要与path保持一致
        菜单会根以下的层级进行自动生成
        i18国际化映射将会根据id值自src/locale里面的相应语言配置文字
        若路由配置具备module属性，代表该路由绑定了名为该属性的状态库，tab页在执行关闭时，会自动清空该状态库内所有状态
        注：module: [] 可以指定多个状态库的名字
    **/
		children: [
			{
				id: defaultHomeKey,
				name: defaultHomeKey,
				path: defaultHomeKey,
				icon: defaultHomeKey,
				component: () => import('@/views/WorkSpace/Home'),
			},
			{
				id: 'plan',
				name: 'plan',
				path: 'plan',
				icon: 'form',
				component: RouterLayout,
				children: [
					{
						id: 'planList',
						name: 'planList',
						path: 'planList',
						icon: 'build',
						component: () => import('@/views/WorkSpace/Plan/PlanList'),
					},
					{
						id: 'roadMap',
						name: 'roadMap',
						path: 'roadMap',
						icon: 'build',
						component: () => import('@/views/WorkSpace/RoadMap'),
					},
					{
						id: 'roadMapMemberList',
						name: 'roadMapMemberList',
						path: 'roadMapMemberList',
						icon: 'build',
						component: () => import('@/views/WorkSpace/RoadMapMemberList'),
					},
				],
			},
			{
				id: 'requirement',
				name: 'requirement',
				path: 'requirement',
				icon: 'form',
				component: RouterLayout,
				children: [
					{
						id: 'requirementList',
						name: 'requirementList',
						path: 'requirementList',
						icon: 'build',
						component: () =>
							import('@/views/WorkSpace/Requirement/RequirementList'),
					},
					{
						id: 'requirementAdd',
						name: 'requirementAdd',
						path: 'requirementAdd',
						icon: 'block',
						component: () =>
							import('@/views/WorkSpace/Requirement/RequirementAdd'),
					},
					{
						id: 'requirementEdit',
						name: 'requirementEdit',
						path: 'requirementEdit',
						icon: 'sliders',
						component: () =>
							import('@/views/WorkSpace/Requirement/RequirementEdit'),
					},
				],
			},
			{
				id: 'milestone',
				name: 'milestone',
				path: 'milestone',
				icon: 'form',
				component: RouterLayout,
				children: [
					{
						id: 'milestoneList',
						name: 'milestoneList',
						icon: 'build',
						path: 'milestoneList',
						component: () =>
							import('@/views/WorkSpace/Milestone/MilestoneList'),
					},
					{
						id: 'milestoneAdd',
						name: 'milestoneAdd',
						icon: 'block',
						path: 'milestoneAdd',
						component: () => import('@/views/WorkSpace/Milestone/MilestoneAdd'),
					},
					{
						id: 'milestoneEdit',
						name: 'milestoneEdit',
						icon: 'sliders',
						path: 'milestoneEdit',
						component: () =>
							import('@/views/WorkSpace/Milestone/MilestoneEdit'),
					},
				],
			},
			{
				id: 'issues',
				name: 'issues',
				path: 'issues',
				icon: 'form',
				component: RouterLayout,
				children: [
					{
						id: 'issuesList',
						name: 'issuesList',
						path: 'issuesList',
						icon: 'build',
						component: () => import('@/views/WorkSpace/Issues/IssuesList'),
					},
					{
						id: 'issuesAdd',
						name: 'issuesAdd',
						path: 'issuesAdd',
						icon: 'block',
						component: () => import('@/views/WorkSpace/Issues/IssuesAdd'),
					},
					{
						id: 'issuesEdit',
						name: 'issuesEdit',
						path: 'issuesEdit',
						icon: 'sliders',
						component: () => import('@/views/WorkSpace/Issues/IssuesEdit'),
					},
				],
			},
			{
				id: 'project',
				name: 'project',
				path: 'project',
				icon: 'form',
				component: RouterLayout,
				children: [
					{
						id: 'projectList',
						name: 'projectList',
						path: 'projectList',
						icon: 'build',
						component: () =>
							import('@/views/WorkSpace/Application/ApplicationList'),
					},
					{
						id: 'projectAdd',
						name: 'projectAdd',
						path: 'projectAdd',
						icon: 'block',
						component: () =>
							import('@/views/WorkSpace/Application/ApplicationAdd'),
					},
					{
						id: 'projectEdit',
						name: 'projectEdit',
						path: 'projectEdit',
						icon: 'sliders',
						component: () =>
							import('@/views/WorkSpace/Application/ApplicationEdit'),
					},
				],
			},
			// {
			// 	id: 'guide',
			// 	name: 'guide',
			// 	path: 'guide',
			// 	icon: 'compass',
			// 	component: RouterLayout,
			// 	children: [
			// 		{
			// 			id: 'pageLoading',
			// 			name: 'pageLoading',
			// 			path: 'pageLoading',
			// 			icon: 'loading',
			// 			component: () => import('@/views/WorkSpace/Guide/RouterLoading'),
			// 		},
			// 		{
			// 			id: 'localStore',
			// 			name: 'localStore',
			// 			path: 'localStore',
			// 			icon: 'database',
			// 			component: RouterLayout,
			// 			children: [
			// 				{
			// 					id: 'systemLocalStore',
			// 					name: 'systemLocalStore',
			// 					path: 'systemLocalStore',
			// 					component: () =>
			// 						import('@/views/WorkSpace/Guide/LocalStore/SystemLocalStore'),
			// 				},
			// 				{
			// 					id: 'routerLocalStore',
			// 					name: 'routerLocalStore',
			// 					path: 'routerLocalStore',
			// 					module: ['routerStore'],
			// 					component: () =>
			// 						import('@/views/WorkSpace/Guide/LocalStore/RouterLocalStore'),
			// 				},
			// 			],
			// 		},
			// 	],
			// },
		],
	},
	{
		id: 'dashbord-lyaout',
		name: 'dashbord-lyaout',
		path: '/',
		component: DashLayout,
		children: [
			{
				id: 'dashbord',
				name: 'dashbord',
				path: 'dashbord',
				alias: '/',
				component: () => import('@/views/Dashboard'),
			},
		],
	},
	{
		id: 'asyncGitLab',
		name: 'asyncGitLab',
		path: '/asyncGitLab',
		component: () => import('@/views/Public/AsyncGitlab'),
	},
	// 公有路由
	{
		id: 'login',
		name: 'login',
		public: true,
		path: '/login',
		component: () => import('@/views/Public/Login'),
	},
	{
		id: 'notfound',
		name: 'notfound',
		public: true,
		path: '/*',
		component: () => import('@/views/Public/NotFound'),
	},
];
