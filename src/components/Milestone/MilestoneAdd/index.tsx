import {
	AddMilestoneParams,
	MilestoneMode,
} from "@/store/models/milestone/types";
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
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
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
class MilestoneAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@MilestoneStore.Action("addMilestone") addMilestone!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;

	form: any;
	btnLoading: boolean = false;

	async created() {}

	protected mounted() {}

	@Emit()
	updateMilsList() {
		this.$emit("updateMilsList");
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: AddMilestoneParams = {
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					startAt: moment(value.startAt).format(),
					onlineAt: moment(value.startonlineAtAt).format(),
				};
				this.btnLoading = true;
				await this.addMilestone(params);
				this.btnLoading = false;
				this.updateMilsList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="里程碑名称">
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
				<Form.Item label="里程碑说明">
					{getFieldDecorator("desc", {
						rules: [
							{
								required: true,
								message: "里程碑说明不能为空",
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="选择输入里程碑说明"
						></Input>
					)}
				</Form.Item>
				<Form.Item label="里程碑内容">
					{getFieldDecorator("content", {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "里程碑内容不能为空",
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="输入里程碑内容，简短描述里程碑内容的目标"
						/>
					)}
				</Form.Item>
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
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="里程碑开始时间">
							{getFieldDecorator("startAt", {
								rules: [
									{
										required: false,
										message: "需求开始时间",
									},
								],
							})(
								<DatePicker
									style={{ width: "100%" }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择需求开始时间"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="里程碑上线时间">
							{getFieldDecorator("onlineAt", {
								rules: [
									{
										required: false,
										message: "需求上线时间",
									},
								],
							})(
								<DatePicker
									style={{ width: "100%" }}
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
						新增里程碑
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
}
export default Form.create({
	props: {
		allMode: Boolean,
	},
})(MilestoneAdd);
