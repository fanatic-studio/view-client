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
const ApplicationStore = namespace("application");
import moment from "moment";
import style from "./index.less";
import { ProjectMemberMode } from "@/store/models/project/types";
import { ApplicationMode } from "@/store/models/application/types";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class ApplicationInfo extends Vue {
	@ApplicationStore.Action("updateApplication") updateApplication!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;
	@ApplicationStore.Getter("currEditApplication")
	currEditApplication!: ApplicationMode;
	form: any;
	btnLoading: boolean = false;

	@Watch("currEditApplication", { immediate: true, deep: true })
	watchcurrEditApplication() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				appType: this.currEditApplication.appType,
				name: this.currEditApplication.name,
				cName: this.currEditApplication.cName,
				desc: this.currEditApplication.desc,
				assignee: this.currEditApplication.assignee,
				welcomeJump: this.currEditApplication.welcomeJump,
				welcomeImage: this.currEditApplication.welcomeImage,
				welcomeLimitE: this.currEditApplication.welcomeLimitE,
				welcomeLimitS: this.currEditApplication.welcomeLimitS,
				welcomeSkip: this.currEditApplication.welcomeSkip,
				welcomeWait: this.currEditApplication.welcomeWait,
				version: this.currEditApplication.version,
				versionName: this.currEditApplication.versionName,
				platform: this.currEditApplication.platform,
				package: this.currEditApplication.package,
				debug: this.currEditApplication.debug,
			});
		});
	}

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
				const params: any = {
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					startAt: moment(value.startAt).format(),
					onlineAt: moment(value.startonlineAtAt).format(),
				};
				await this.updateApplication(params);
				this.btnLoading = false;
				this.updateMilsList();
			}
		});
	}

	protected render() {
		return (
			<Row gutter={8}>
				<Col span="12">{this.renderForm()}</Col>
				<Col span="12">
					<div>需求Issues</div>
				</Col>
			</Row>
		);
	}
	protected renderForm() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="里程碑名称">
					{getFieldDecorator("name", {
						rules: [
							{
								required: true,
								message: "里程碑名称不能为空",
							},
						],
					})(<Input type="text" name="name"></Input>)}
				</Form.Item>
				<Form.Item label="里程碑说明">
					{getFieldDecorator("desc", {
						rules: [
							{
								required: true,
								message: "里程碑说明不能为空",
							},
						],
					})(<Input type="text" name="desc"></Input>)}
				</Form.Item>
				<Form.Item label="里程碑内容">
					{getFieldDecorator("content", {
						rules: [
							{
								required: true,
								message: "里程碑内容不能为空",
							},
						],
					})(
						<Input.TextArea
							rows={6}
							name="content"
							placeholder="输入里程碑内容，描述里程碑内容需要达到的目的"
						></Input.TextArea>
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
						<Select show-search allowClear name="assignee">
							{this.renderUserList()}
						</Select>
					)}
				</Form.Item>

				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="需求开始时间">
							{getFieldDecorator("startAt", {
								rules: [
									{
										required: true,
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
						<Form.Item label="需求上线时间">
							{getFieldDecorator("onlineAt", {
								rules: [
									{
										required: true,
										message: "需求上线时间",
									},
								],
							})(
								<DatePicker
									style={{ width: "100%" }}
									show-time
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
}
export default Form.create({})(ApplicationInfo);
