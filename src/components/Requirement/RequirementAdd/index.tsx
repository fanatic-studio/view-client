import { MilestoneMode } from "@/store/models/milestone/types";
import { ProjectMemberMode } from "@/store/models/project/types";
import { RequirementMode } from "@/store/models/requirement/types";
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
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const RequirementStore = namespace("requirement");
const ProjectStore = namespace("project");
const MilestoneStore = namespace("milestone");
import style from "./index.less";

@Component({
	components: {
		"a-date-picker": DatePicker,
	},
	props: {
		form: {
			type: Object,
		},
	},
})
class RequirementAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@RequirementStore.Action("addRequirement") addRequirement!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter("milestoneList") milestoneList!: Array<MilestoneMode>;

	form: any;
	btnLoading: boolean = false;

	async created() {}

	protected mounted() {}

	@Emit()
	updateRList() {
		this.$emit("updateRList");
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: RequirementMode = {
					type: value.type,
					priority: value.priority,
					name: value.name,
					desc: value.desc,
					competitorAnalysisUrl: value.competitorAnalysisUrl,
					requirementDocUrl: value.requirementDocUrl,
					requirementUiUrl: value.requirementUiUrl,
					requirementCodeUrl: value.requirementCodeUrl,
					assignee: value.assignee,
					frontAssignee: value.frontAssignee,
					serverAssignee: value.serverAssignee,
					uiAssignee: value.uiAssignee,
					milestoneId: value.milestoneId,
					startAt: moment(value.startAt).format(),
					onlineAt: moment(value.startonlineAtAt).format(),
				};
				this.btnLoading = true;
				await this.addRequirement(params);
				this.btnLoading = false;
				this.updateRList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="5">
						<Form.Item label="需求类型">
							{getFieldDecorator("type", {
								rules: [
									{
										required: true,
										message: "需求类型不能为空",
									},
								],
							})(
								<Select name="type" placeholder="选择需求类型">
									<Select.Option key="product" value="product">
										产品需求
									</Select.Option>
									<Select.Option key="operation" value="operation">
										运营需求
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="5">
						<Form.Item label="需求优先级">
							{getFieldDecorator("priority", {
								rules: [
									{
										required: false,
										message: "需求优先级不能为空",
									},
								],
							})(
								<Select name="priority" placeholder="选择需求优先级">
									<Select.Option key="p1" value="p1">
										p1
									</Select.Option>
									<Select.Option key="p2" value="p2">
										p2
									</Select.Option>
									<Select.Option key="p3" value="p3">
										p3
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="14">
						<Form.Item label="需求名称">
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "需求名称不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="选择输入需求名称"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="需求说明">
					{getFieldDecorator("desc", {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "需求说明不能为空",
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="选择输入需求说明，简短描述需求来源和目的"
						/>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="竞品分析">
							{getFieldDecorator("competitorAnalysisUrl", {
								rules: [
									{
										required: false,
										message: "竞品分析",
									},
								],
							})(
								<Input
									type="text"
									name="competitorAnalysisUrl"
									placeholder="请输入竞品分析url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="需求文档">
							{getFieldDecorator("requirementDocUrl", {
								rules: [
									{
										required: false,
										message: "需求文档",
									},
								],
							})(
								<Input
									type="text"
									name="requirementDocUrl"
									placeholder="请输入需求文档url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="UI设计稿(蓝湖)">
							{getFieldDecorator("requirementUiUrl", {
								rules: [
									{
										required: false,
										message: "UI设计稿(蓝湖)",
									},
								],
							})(
								<Input
									type="text"
									name="requirementUiUrl"
									placeholder="请输入蓝湖url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="程序设计文档">
							{getFieldDecorator("requirementCodeUrl", {
								rules: [
									{
										required: false,
										message: "程序设计文档",
									},
								],
							})(
								<Input
									type="text"
									name="requirementCodeUrl"
									placeholder="请输入程序设计url"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="6">
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
					<Col span="6">
						<Form.Item label="前端负责人">
							{getFieldDecorator("frontAssignee", {
								rules: [
									{
										required: false,
										message: "前端负责人",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="frontAssignee"
									placeholder="请选择前端负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="后端负责人">
							{getFieldDecorator("serverAssignee", {
								rules: [
									{
										required: false,
										message: "后端负责人",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="serverAssignee"
									placeholder="请选择后端负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="UI负责人">
							{getFieldDecorator("uiAssignee", {
								rules: [
									{
										required: false,
										message: "UI负责人",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="uiAssignee"
									placeholder="请选择ui负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="8">
						<Form.Item label="所属里程碑">
							{getFieldDecorator("milestoneId", {
								rules: [
									{
										required: false,
										message: "所属里程碑",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="milestoneId"
									placeholder="请选择所属里程碑"
								>
									{this.renderMilestoneList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="需求开始时间">
							{getFieldDecorator("startAt", {
								rules: [
									{
										required: false,
										message: "需求开始时间",
									},
								],
							})(
								<DatePicker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择需求开始时间"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="需求上线时间">
							{getFieldDecorator("onlineAt", {
								rules: [
									{
										required: false,
										message: "需求上线时间",
									},
								],
							})(
								<DatePicker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择需求上线时间"
									name="onlineAt"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Button
						type="primary"
						block
						size="large"
						html-type="submit"
						loading={this.btnLoading}
					>
						新增需求
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
	renderMilestoneList() {
		return this.milestoneList.map((item) => {
			return (
				<Select.Option key={item.milestoneId} value={item.milestoneId}>
					{item.name}
				</Select.Option>
			);
		});
	}
}
export default Form.create({
	props: {
		allMode: Boolean,
	},
})(RequirementAdd);
