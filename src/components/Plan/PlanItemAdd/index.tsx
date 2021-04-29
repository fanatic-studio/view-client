import { PlanItemData, PlanData } from "@/store/models/plan/types";
import { ProjectMemberMode } from "@/store/models/project/types";
import {
	Form,
	Input,
	Icon,
	Button,
	DatePicker,
	InputNumber,
	Row,
	Col,
	Select,
} from "ant-design-vue";
import moment from "moment";
moment.locale("zh-cn");
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ProjectStore = namespace("project");
const PlanStore = namespace("plan");
import style from "./index.less";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class PlanItemAdd extends Vue {
	@Prop({ type: String, default: "development" }) private planItemType!: string;

	@PlanStore.Action("addPlanItem") addPlanItem!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;

	form: any;
	btnLoading: boolean = false;

	async created() {}

	@Watch("planItemType", { immediate: true, deep: true })
	watchPlanItemType() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				type: this.planItemType,
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
				console.log("value", JSON.stringify(value));

				const params: PlanItemData = {
					type: value.type,
					name: value.name,
					desc: value.desc,
					assignee: value.assignee,
					week: parseInt(moment(value.week).format("w")),
				};
				this.btnLoading = true;
				await this.addPlanItem(params);
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
										message: "工作计划月份",
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
						<Form.Item label="工作负责人">
							{getFieldDecorator("assignee", {
								rules: [
									{
										required: true,
										message: "工作负责人",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="请选择工作负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="周工作计划内容">
					{getFieldDecorator("desc", {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "周工作计划内容不能为空",
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
						></mavon-editor>
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
						新增周工作计划
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
		const week = [1, 2, 3, 4, 5];
		return week.map((item) => {
			return (
				<Select.Option key={item} value={item}>
					{`第${item} 周`}
				</Select.Option>
			);
		});
	}
}
export default Form.create({
	props: {
		planItemType: {},
	},
})(PlanItemAdd);
