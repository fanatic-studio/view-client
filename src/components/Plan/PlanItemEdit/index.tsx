import { RequirementData } from "@/store/models/requirement/types";
import {
	Form,
	Input,
	Icon,
	Checkbox,
	Button,
	Steps,
	Row,
	Col,
	Tag,
	Tooltip,
	Select,
	DatePicker,
} from "ant-design-vue";
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ProjectStore = namespace("project");
const PlanStore = namespace("plan");
const MilestoneStore = namespace("milestone");
import moment from "moment";
import style from "./index.less";
import { ProjectMemberMode } from "@/store/models/project/types";
import { PlanData, PlanItemData } from "@/store/models/plan/types";
import { MilestoneMode } from "@/store/models/milestone/types";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class PlanItemEdit extends Vue {
	@PlanStore.Action("updatePlanItem") __updatePlanItem!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter("milestoneList") __milestoneList!: Array<
		MilestoneMode
	>;
	@PlanStore.Getter("currEditPlanItem")
	__currEditPlanItem!: PlanItemData;
	form: any;
	btnLoading: boolean = false;

	@Watch("__currEditPlanItem", { immediate: true, deep: true })
	watchCurrEditPlan() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				type: this.__currEditPlanItem.type,
				name: this.__currEditPlanItem.name,
				desc: this.__currEditPlanItem.desc,
				assignee: this.__currEditPlanItem.assignee,
				milestoneId: this.__currEditPlanItem.milestoneId,
				week: moment().week(this.__currEditPlanItem.week),
			});
		});
	}

	@Emit()
	updatePlanList() {
		this.$emit("updatePlanList");
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: PlanItemData = {
					name: value.name,
					desc: value.desc,
					type: value.type,
					assignee: value.assignee,
					milestoneId: value.milestoneId,
					week: parseInt(moment(value.week).format("W")),
				};
				this.btnLoading = true;
				await this.__updatePlanItem(params);
				this.btnLoading = false;
				this.updatePlanList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="类型：">
							{getFieldDecorator("type", {
								rules: [
									{
										required: true,
										message: "类型：",
									},
								],
							})(
								<Select disabled name="type" placeholder="请选择">
									<Select.Option key="development" value="development">
										研发计划
									</Select.Option>
									<Select.Option key="operation" value="operation">
										运营计划
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="18">
						<Form.Item label="周工作计划名称">
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "周工作计划不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="选择输入工作计划"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="周数">
							{getFieldDecorator("week", {
								rules: [
									{
										required: true,
										message: "工作计划周数",
									},
								],
							})(
								<DatePicker.WeekPicker
									name="week"
									style={{ width: "100%" }}
									placeholder="请选择第几周"
								/>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="需求负责人">
							{getFieldDecorator("assignee", {
								rules: [
									{
										required: true,
										message: "需求负责人",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="请选择需求负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="关联里程碑">
					{getFieldDecorator("milestoneId", {
						rules: [
							{
								required: true,
								message: "需求负责人",
							},
						],
					})(
						<Select
							show-search
							allowClear
							name="milestoneId"
							placeholder="关联里程碑"
						>
							{this.renderMilestoneList()}
						</Select>
					)}
				</Form.Item>

				<Form.Item label="工作计划内容">
					{getFieldDecorator("desc", {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "工作计划内容不能为空",
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="输入工作计划内容，简短描述工作计划内容的目标"
						/>
					)}
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						block
						size="large"
						html-type="submit"
						loading={this.btnLoading}
					>
						更新
					</Button>
				</Form.Item>
			</Form>
		);
	}

	renderUserList() {
		return this.projectMemberList.map((item) => {
			return (
				<Select.Option key={item.accountId} value={item.accountId}>
					{item.nickName}
				</Select.Option>
			);
		});
	}
	renderWeek() {
		const weekData = [
			{
				key: 1,
				value: "第1周",
			},
			{
				key: 2,
				value: "第2周",
			},
			{
				key: 3,
				value: "第3周",
			},
			{
				key: 4,
				value: "第4周",
			},
			{
				key: 5,
				value: "第5周",
			},
		];
		return weekData.map((item) => {
			return (
				<Select.Option key={item.key} value={item.value}>
					{item.value}
				</Select.Option>
			);
		});
	}
	renderMilestoneList() {
		return this.__milestoneList.map((item) => {
			return (
				<Select.Option key={item.milestoneId} value={item.milestoneId}>
					{item.name}
				</Select.Option>
			);
		});
	}
}
export default Form.create({})(PlanItemEdit);
