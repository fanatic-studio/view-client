export const ProgressRateList = [
	{
		progress: 0,
		label: "需求设计",
		desc: "需求确立和文档编写阶段",
	},
	{
		progress: 1,
		label: "需求评审",
		desc: "需求评审阶段",
	},
	{
		progress: 2,
		label: "研发设计",
		desc: "(技术+UI)设计阶段",
	},
	{
		progress: 3,
		label: "研发评审",
		desc: "(技术+UI)评审阶段",
	},
	{
		progress: 4,
		label: "研发",
		desc: "code每个issue不能超过4个小时",
	},
	{
		progress: 5,
		label: "需求验收",
		desc: "需求提出者验收开发产物",
	},
	{
		progress: 6,
		label: "测试",
		desc: "自动化+人工测试",
	},
	{
		progress: 7,
		label: "线上测试",
		desc: "代码合并到preprod并在线上测试环境测试",
	},
	{
		progress: 8,
		label: "完成",
		desc: "等待版本发布",
	},
];

export const RequirementType = [
	{
		key: "product",
		label: "产品需求",
	},
	{
		key: "operation",
		label: "运营需求",
	},
];

export const RequirementPriority = [
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

export const RequirementStatus = [
	{
		key: "todo",
		label: "未开始",
	},
	{
		key: "doing",
		label: "进行中",
	},
	{
		key: "done",
		label: "已完成",
	},
	{
		key: "all",
		label: "全部",
	},
];
export default {
	ProgressRateList,
	RequirementType,
	RequirementPriority,
	RequirementStatus,
};
