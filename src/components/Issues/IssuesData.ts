export const IssuesType = [
	{
		key: "product",
		label: "产品需求",
	},
	{
		key: "operation",
		label: "运营需求",
	},
	{
		key: "ui",
		label: "UI设计",
	},
	{
		key: "client",
		label: "前端开发",
	},
	{
		key: "server",
		label: "后端开发",
	},
	{
		key: "clientBug",
		label: "后端BUG",
	},
	{
		key: "serverBug",
		label: "后端BUG",
	},
];

export const IssuesPriority = [
	{
		key: "P1",
		label: "P1",
	},
	{
		key: "P2",
		label: "P2",
	},
	{
		key: "P3",
		label: "P3",
	},
];

export const IssuesStatus = [
	{
		key: "todo",
		label: "未开始",
		color: "orange",
	},
	{
		key: "doing",
		label: "进行中",
		color: "green",
	},
	{
		key: "done",
		label: "已完成",
		color: "blue",
	},
	{
		key: "all",
		label: "全部",
		color: "",
	},
];

export default {
	IssuesType,
	IssuesPriority,
	IssuesStatus,
};
