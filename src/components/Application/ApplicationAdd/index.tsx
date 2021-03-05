import {
	AddApplicationParams,
	ApplicationMode,
} from "@/store/models/application/types";
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
const ApplicationStore = namespace("application");
import style from "./index.less";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class ApplicationAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@ApplicationStore.Action("addApplication") addApplication!: Function;
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
				this.btnLoading = true;
				const params: AddApplicationParams = {
					appType: value.appType,
					name: value.name,
					cName: value.cName,
					desc: value.desc,
					assignee: value.assignee,
					package: value.package,
				};
				await this.addApplication(params);
				this.updateMilsList();
				this.btnLoading = false;
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="8">
						<Form.Item label="工程类型">
							{getFieldDecorator("appType", {
								rules: [
									{
										required: true,
										message: "工程类型不能为空",
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="appType"
									placeholder="请输入工程类型"
								>
									<Select.Option key="native">前端-原生</Select.Option>
									<Select.Option key="h5">前端-H5</Select.Option>
									<Select.Option key="xcx">前端-小程序</Select.Option>
									<Select.Option key="web">前端-后台</Select.Option>
									<Select.Option key="java">后端-JAVA</Select.Option>
									<Select.Option key="go">后端-Go</Select.Option>
									<Select.Option key="ai">ai</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="工程名称">
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="选择输入工程名称，必须是英文，作为git仓库名称"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="包名">
							{getFieldDecorator("package", {
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="package"
									placeholder="选择输入工程名称"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="工程名称">
					{getFieldDecorator("cName", {
						rules: [
							{
								required: true,
								message: "工程名称不能为空",
							},
						],
					})(
						<Input
							type="text"
							name="cName"
							placeholder="选择输入工程名称"
						></Input>
					)}
				</Form.Item>
				<Form.Item label="工程说明">
					{getFieldDecorator("desc", {
						rules: [
							{
								required: true,
								message: "工程说明不能为空",
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="选择输入工程说明"
						></Input>
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
				<Form.Item>
					<Button
						type="primary"
						block
						size="large"
						html-type="submit"
						loading={this.btnLoading}
					>
						新增工程
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
})(ApplicationAdd);
