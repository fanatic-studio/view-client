import {
	AddApplicationParams,
	AddApplicationUpdateParams,
	ApplicationMode,
	ApplicationUpdateMode,
	UpdateApplicationUpdateParams,
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
	Switch,
} from "ant-design-vue";
import moment from "moment";
moment.locale("zh-cn");
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
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
class ApplicationWelcomeSetting extends Vue {
	@ApplicationStore.Action("updateApplicationUpdate")
	updateApplicationUpdate!: Function;

	@ApplicationStore.Getter("currEditApplicationUpdate")
	currEditApplicationUpdate!: ApplicationUpdateMode;

	@Emit()
	private emitUpdateApplicationUpdateList() {
		this.$emit("emitUpdateApplicationUpdateList");
	}

	@Watch("currEditApplicationUpdate", { immediate: true, deep: true })
	watchCurrEditApplicationUpdate(
		newValue: ApplicationUpdateMode,
		oldValue: ApplicationUpdateMode
	) {
		console.log("newValue", newValue);

		this.$nextTick(() => {
			this.form.setFieldsValue({
				title: this.currEditApplicationUpdate.title,
				version: this.currEditApplicationUpdate.version,
				platform: this.currEditApplicationUpdate.platform.split(","),
				reboot: this.currEditApplicationUpdate.reboot,
				fileUrl: this.currEditApplicationUpdate.fileUrl,
				valid: this.currEditApplicationUpdate.valid,
				updateMode: this.currEditApplicationUpdate.updateMode,
				clearCache: this.currEditApplicationUpdate.clearCache,
				debug: this.currEditApplicationUpdate.debug,
			});
			this.rebootTipsMode = this.currEditApplicationUpdate.reboot;
		});
	}

	form: any;
	btnLoading: boolean = false;
	planformOptions: Array<any> = [
		{ label: "iOS", value: "ios" },
		{ label: "Android", value: "android" },
	];

	debugOptions: Array<any> = [
		{ label: "排除", value: "0" },
		{ label: "包含", value: "1" },
		{ label: "仅DEBUG", value: "2" },
	];

	updateModeOptions: Array<any> = [
		{ label: "自动触发", value: "0" },
		{ label: "客户端触发", value: "1" },
	];

	rebootOptions: Array<any> = [
		{ label: "静默", value: "0" },
		{ label: "自动重启", value: "1" },
		{ label: "提示重启", value: "2" },
	];

	validOptions: Array<any> = [
		{ label: "启用", value: "1" },
		{ label: "暂停", value: "0" },
		{ label: "撤回", value: "2" },
	];
	clearCacheOptions: Array<any> = [
		{ label: "保留缓存", value: "0" },
		{ label: "清除缓存", value: "1" },
	];

	rebootConfirmRebootOptions = [
		{ label: "静默", value: "0" },
		{ label: "重启", value: "1" },
	];

	async created() {}

	debugTipsMode = "0";
	debugChange(e: any) {
		this.debugTipsMode = e.target.value;
	}
	debugTips() {
		console.log("debugTipsMode", this.debugTipsMode);

		if (this.debugTipsMode === "0") {
			return "DEBUG版本无法收到此更新包。";
		}
		if (this.debugTipsMode === "1") {
			return "DEBUG版本可以收到此更新包。";
		}
		if (this.debugTipsMode === "2") {
			return "只有DEBUG版本可以收到此更新包（一般用于测试）。";
		}
	}

	validTipsMode = "1";
	validChange(e: any) {
		this.validTipsMode = e.target.value;
	}
	validTips() {
		console.log("validTipsMode", this.validTipsMode);

		if (this.validTipsMode === "0") {
			return "暂停更新，用户收不到此更新，已更新的用户不影响。";
		}
		if (this.validTipsMode === "1") {
			return "开启更新，所有用户都会收到此更新。";
		}
		if (this.validTipsMode === "2") {
			return "回滚更新，用户收不到此更新，已更新的用户将撤回此更新。";
		}
	}

	updateModeTipsMode = "0";
	updateModeChange(e: any) {
		this.updateModeTipsMode = e.target.value;
	}
	updateModeTips() {
		if (this.updateModeTipsMode === "0") {
			return "自动触发，APP自动检测更新。";
		}
		if (this.updateModeTipsMode === "1") {
			return "仅客户触发，通过执行方法 seui.checkUpdate() 触发更新。";
		}
	}

	rebootTipsMode = "0";
	rebootChange(e: any) {
		this.rebootTipsMode = e.target.value;
	}
	rebootTips() {
		if (this.rebootTipsMode === "0") {
			return "更新完后没有任何提示，更新内容一般在用户下次使用app时生效。";
		}
		if (this.rebootTipsMode === "1") {
			return "更新完所有包后app自动重启，更新内容即刻生效。";
		}
		if (this.rebootTipsMode === "2") {
			return "更新完此包后提示设置内容，根据用户自己选择。";
		}
	}

	clearCacheTipsMode = "0";
	clearCacheChange(e: any) {
		this.clearCacheTipsMode = e.target.value;
	}
	clearCacheTips() {
		if (this.clearCacheTipsMode === "0") {
			return "更新完后没有任何提示，更新内容一般在用户下次使用app时生效。";
		}
		if (this.clearCacheTipsMode === "1") {
			return "更新完所有包后app自动重启，更新内容即刻生效。";
		}
		if (this.clearCacheTipsMode === "2") {
			return "更新完此包后提示设置内容，根据用户自己选择。";
		}
	}

	private async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				this.btnLoading = true;
				const params: UpdateApplicationUpdateParams = {
					updateId: this.currEditApplicationUpdate.updateId,
					title: value.title,
					version: value.version,
					platform: value.platform.toString(),
					reboot: value.reboot,
					rebootTitle: value.rebootTitle,
					rebootMessage: value.rebootMessage,
					rebootConfirmReboot: value.rebootConfirmReboot,
					fileUrl: value.fileUrl,
					valid: value.valid,
					updateMode: value.updateMode,
					clearCache: value.clearCache,
					debug: value.debug,
				};
				await this.updateApplicationUpdate(params);
				this.emitUpdateApplicationUpdateList();
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
						<Form.Item label="DEBUG版本" help={this.debugTips()}>
							{getFieldDecorator("debug", {
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
									on-change={this.debugChange}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					label="热更新版本"
					help="iOS为Build编译版本号，安卓为versionCode应用版本号。（注：多个版本半角逗号分隔，如：12,13）"
				>
					{getFieldDecorator("version", {
						rules: [
							{
								required: true,
								message: "更新版本不能为空",
							},
						],
					})(
						<Select
							show-search
							allowClear
							name="version"
							placeholder="请选择更新版本（如果对多个版本进行更新请选择多个）"
						>
							<Select.Option key="native">前端-原生</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="更新包URL">
					{getFieldDecorator("fileUrl", {
						rules: [
							{
								required: true,
								message: "更新包URL",
							},
						],
					})(
						<Input
							type="text"
							name="fileUrl"
							placeholder="输入更新包URL"
						></Input>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="启用状态" help={this.validTips()}>
							{getFieldDecorator("valid", {
								rules: [
									{
										required: true,
										message: "请选择更新模式",
									},
								],
							})(
								<Radio.Group
									name="valid"
									options={this.validOptions}
									on-change={this.validChange}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="更新模式" help={this.updateModeTips()}>
							{getFieldDecorator("updateMode", {
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
									on-change={this.updateModeChange}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="更新完成后-重启" help={this.rebootTips()}>
							{getFieldDecorator("reboot", {
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
									on-change={this.rebootChange}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="更新完成后-缓存处理" help={this.clearCacheTips()}>
							{getFieldDecorator("clearCache", {
								rules: [
									{
										required: true,
										message: "请确定clearCache类型",
									},
								],
							})(
								<Radio.Group
									name="clearCache"
									options={this.clearCacheOptions}
									on-change={this.clearCacheChange}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
				{this.renderRebootConform()}
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

	renderVersion() {
		return {
			/* <Select.Option key="h5">前端-H5</Select.Option>
		<Select.Option key="xcx">前端-小程序</Select.Option>
		<Select.Option key="web">前端-后台</Select.Option>
		<Select.Option key="java">后端-JAVA</Select.Option>
		<Select.Option key="go">后端-Go</Select.Option>
		<Select.Option key="ai">ai</Select.Option> */
		};
	}

	renderRebootConform() {
		const { getFieldDecorator } = this.form;
		if (this.rebootTipsMode === "2") {
			return (
				<Row gutter={8}>
					<Col span="16">
						<Form.Item label="重启提示标题">
							{getFieldDecorator("rebootTitle", {
								initialValue: this.currEditApplicationUpdate.rebootTitle,
								rules: [
									{
										required: true,
										message: "请选择更新模式",
									},
								],
							})(
								<Input
									type="text"
									name="rebootTitle"
									placeholder="输入热更新重启提示标题"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="16">
						<Form.Item label="更新模式">
							{getFieldDecorator("rebootMessage", {
								initialValue: this.currEditApplicationUpdate.rebootTitle,
								rules: [
									{
										required: true,
										message: "请选择更新模式",
									},
								],
							})(
								<Input.TextArea
									type="text"
									name="rebootMessage"
									placeholder="输入热更新重启提示说明"
								></Input.TextArea>
							)}
						</Form.Item>
					</Col>
					<Col span="16">
						<Form.Item label="点击确定行为">
							{getFieldDecorator("rebootConfirmReboot", {
								initialValue: this.currEditApplicationUpdate
									.rebootConfirmReboot,
								rules: [
									{
										required: true,
										message: "点击确定行为",
									},
								],
							})(
								<Radio.Group
									name="rebootConfirmReboot"
									options={this.rebootConfirmRebootOptions}
								></Radio.Group>
							)}
						</Form.Item>
					</Col>
				</Row>
			);
		}
	}
}
export default Form.create({})(ApplicationWelcomeSetting);
