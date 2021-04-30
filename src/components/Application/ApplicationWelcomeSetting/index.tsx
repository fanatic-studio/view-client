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

		this.$nextTick(() => {});
	}

	form: any;
	btnLoading: boolean = false;
	welcomeSkipOptions: Array<any> = [
		{ label: "显示跳过", value: "0" },
		{ label: "隐藏跳过", value: "1" },
	];
	welcomeWaiteOptions: Array<any> = [
		{ label: "0.5s", value: "500" },
		{ label: "1s", value: "1000" },
		{ label: "1.5s", value: "1500" },
		{ label: "2s", value: "2000" },
		{ label: "2.5s", value: "2500" },
		{ label: "3s", value: "3000" },
	];

	async created() {}

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
					<Col span="12">
						<Form.Item
							label="闪屏广告图"
							help="闪屏广告图片：留空则不显示闪屏广告。"
						>
							{getFieldDecorator("welcome_image", {
								rules: [
									{
										required: true,
										message: "闪屏广告图",
									},
								],
							})(
								<Input
									type="text"
									name="welcome_image"
									placeholder="输入闪屏广告图URL"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item
							label="闪屏显示时间"
							help="打开应用时显示APP闪屏广告的时间，留空默认：2秒。"
						>
							{getFieldDecorator("welcome_wait", {
								rules: [
									{
										required: true,
										message: "闪屏显示时间",
									},
								],
							})(
								// <Input
								// 	type="text"
								// 	name="welcome_wait"
								// 	placeholder="输入热更新名称"
								// ></Input>
								<Select
									name="welcome_wait"
									placeholder="请选择闪屏显示时间，一般都是3s"
								>
									{this.renderWelcomeWaitTime()}
								</Select>
							)}
						</Form.Item>
						<Form.Item label="闪屏跳过按钮">
							{getFieldDecorator("welcome_skip", {
								initialValue: "0",
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Radio.Group
									name="welcome_skip"
									options={this.welcomeSkipOptions}
								></Radio.Group>
							)}
						</Form.Item>
						<Form.Item
							label="闪屏点击打开"
							help="点击闪屏广告时打开的js页面路径，如：ad.js(完整page下的路径)或https://abc.com/ad.js。"
						>
							{getFieldDecorator("welcome_jump", {
								rules: [
									{
										required: true,
										message: "热更新名称",
									},
								],
							})(
								<Input
									type="text"
									name="welcome_jump"
									placeholder="输入热更新名称"
								></Input>
							)}
						</Form.Item>
						<Form.Item
							label="闪屏有效时限"
							help="设置闪屏广告在指定时间范围内显示。"
						>
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
	protected renderWelcomeWaitTime() {
		return this.welcomeWaiteOptions.map((item) => {
			return <Select.Option key={item.value}>{item.label}</Select.Option>;
		});
	}
}
export default Form.create({})(ApplicationWelcomeSetting);
