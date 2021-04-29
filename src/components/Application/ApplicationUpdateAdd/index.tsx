import {
	AddApplicationParams,
	AddApplicationUpdateParams,
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
	Checkbox,
	Radio,
} from "ant-design-vue";
import moment from "moment";
moment.locale("zh-cn");
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import style from "./index.less";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class ApplicationUpdateAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@ApplicationStore.Action("addApplicationUpdate")
	addApplicationUpdate!: Function;

	form: any;
	btnLoading: boolean = false;
	planformOptions: Array<any> = [
		{ label: "iOS", value: "ios" },
		{ label: "Android", value: "android" },
	];

	debugOptions: Array<any> = [
		{ label: "排除", value: 0 },
		{ label: "包含", value: 1 },
		{ label: "仅DEBUG", value: 2 },
	];

	updateModeOptions: Array<any> = [
		{ label: "自动触发", value: 0 },
		{ label: "客户端触发", value: 1 },
	];

	rebootOptions: Array<any> = [
		{ label: "静默", value: 0 },
		{ label: "自动重启", value: 1 },
		{ label: "提示重启", value: 2 },
	];

	validOptions: Array<any> = [
		{ label: "启用", value: 1 },
		{ label: "暂停", value: 0 },
		{ label: "撤回", value: 2 },
	];
	clearCacheOptions: Array<any> = [
		{ label: "保留缓存", value: 0 },
		{ label: "清除缓存", value: 1 },
	];

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
				const params: AddApplicationUpdateParams = {
					title: value.title,
					version: value.version,
					platform: value.platform,
					reboot: value.reboot,
					rebootTitle: value.rebootTitle,
					rebootMessage: value.rebootMessage,
					rebootConfirmReboot: value.rebootConfirmReboot,
					fileUrl: value.fileUrl,
					fileSize: value.fileSize,
					valid: value.valid,
					updateMode: value.updateMode,
					clearCache: value.clearCache,
					debug: value.debug,
				};
				await this.addApplicationUpdate(params);
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
						<Form.Item label="热更新名称">
							{getFieldDecorator("title", {
								rules: [
									{
										required: true,
										message: "热更新名称",
									},
								],
							})(
								<Input
									type="text"
									name="title"
									placeholder="输入热更新名称"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="更新平台">
							{getFieldDecorator("platform", {
								initialValue: ["ios", "android"],
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Checkbox.Group
									name="platform"
									options={this.planformOptions}
								></Checkbox.Group>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="DEBUG版本">
							{getFieldDecorator("debug", {
								initialValue: 0,
								rules: [
									{
										required: true,
										message: "请确定Debug类型",
									},
								],
							})(
								<Radio.Group
									name="debug"
									options={this.debugOptions}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="热更新版本">
					{getFieldDecorator("version", {
						rules: [
							{
								required: true,
								message: "更新版本不能为空",
							},
						],
					})(
						<div>
							<Select
								show-search
								allowClear
								name="version"
								placeholder="请选择更新版本（如果对多个版本进行更新请选择多个）"
							>
								{/* <Select.Option key="native">前端-原生</Select.Option>
							<Select.Option key="h5">前端-H5</Select.Option>
							<Select.Option key="xcx">前端-小程序</Select.Option>
							<Select.Option key="web">前端-后台</Select.Option>
							<Select.Option key="java">后端-JAVA</Select.Option>
							<Select.Option key="go">后端-Go</Select.Option>
							<Select.Option key="ai">ai</Select.Option> */}
							</Select>
							<div>
								iOS为Build编译版本号，安卓为versionCode应用版本号。（注：多个版本半角逗号分隔，如：12,13）
							</div>
						</div>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="启用状态">
							{getFieldDecorator("updateMode", {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: "请选择更新模式",
									},
								],
							})(
								<Radio.Group
									name="updateMode"
									options={this.validOptions}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="更新模式">
							{getFieldDecorator("updateMode", {
								initialValue: 0,
								rules: [
									{
										required: true,
										message: "请选择更新模式",
									},
								],
							})(
								<Radio.Group
									name="updateMode"
									options={this.updateModeOptions}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="更新完成后-重启">
							{getFieldDecorator("reboot", {
								initialValue: 0,
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Radio.Group
									name="reboot"
									options={this.rebootOptions}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="更新完成后-缓存处理">
							{getFieldDecorator("clear_cache", {
								initialValue: 0,
								rules: [
									{
										required: true,
										message: "请确定clear_cache类型",
									},
								],
							})(
								<Radio.Group
									name="clear_cache"
									options={this.clearCacheOptions}
								></Radio.Group>
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
						新增工程
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
export default Form.create({
	props: {
		allMode: Boolean,
	},
})(ApplicationUpdateAdd);
