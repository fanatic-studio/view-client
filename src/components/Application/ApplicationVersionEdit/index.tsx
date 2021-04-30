import {
	AddApplicationParams,
	AddApplicationVersionParams,
	ApplicationMode,
	ApplicationVersionMode,
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
import styles from "./index.less";
import templateImg1 from "@/assets/image/version/1.png";
import templateImg2 from "@/assets/image/version/2.png";
import templateImg3 from "@/assets/image/version/3.png";
import templateImg4 from "@/assets/image/version/4.png";
import templateImg5 from "@/assets/image/version/5.png";
@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class ApplicationVersionEdit extends Vue {
	@ApplicationStore.Action("updateApplicationVersion")
	updateApplicationVersion!: Function;

	@ApplicationStore.Getter("currEditApplicationVersion")
	currEditApplicationVersion!: ApplicationVersionMode;

	@Emit()
	private emitVersionApplicationVersionList() {
		this.$emit("emitVersionApplicationVersionList");
	}

	@Watch("currEditApplicationVersion", { immediate: true, deep: true })
	watchCurrEditApplicationUpdate(
		newValue: ApplicationVersionMode,
		oldValue: ApplicationVersionMode
	) {
		console.log("newValue", newValue);

		this.$nextTick(() => {
			this.form.setFieldsValue({
				version: this.currEditApplicationVersion.version,
				versionName: this.currEditApplicationVersion.versionName,
				platform: this.currEditApplicationVersion.platform.split(","),
				title: this.currEditApplicationVersion.title,
				content: this.currEditApplicationVersion.content,
				iOSUrl: this.currEditApplicationVersion.iOSUrl,
				androidUrl: this.currEditApplicationVersion.androidUrl,
				templateId: this.currEditApplicationVersion.templateId,
				forced: this.currEditApplicationVersion.forced,
				debug: this.currEditApplicationVersion.debug,
			});
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

	templateIdOptions: Array<any> = [
		{ label: "模板1", value: "1" },
		{ label: "模板2", value: "2" },
		{ label: "模板3", value: "3" },
		{ label: "模板4", value: "4" },
		{ label: "模板5", value: "5" },
	];
	templateIdMode = "1";
	templateIdChange(e: any) {
		this.templateIdMode = e.target.value;
	}

	forcedOptions: Array<any> = [
		{ label: "自由更新", value: "0" },
		{ label: "强制更新", value: "1" },
	];
	forcedMode = 0;
	forcedChange(e: any) {
		this.forcedMode = e.target.value;
	}
	forcedTips() {
		if (this.forcedMode === 0) {
			return "自由更新：显示【以后再说】关闭提示按钮。";
		}
		if (this.forcedMode === 1) {
			return "强制更新：隐藏【以后再说】关闭提示按钮。";
		}
	}

	async created() {}

	protected mounted() {}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				this.btnLoading = true;
				const params: AddApplicationVersionParams = {
					version: value.version,
					versionName: value.versionName,
					platform: value.platform.toString(),
					title: value.title,
					content: value.content,
					iOSUrl: value.iOSUrl,
					androidUrl: value.androidUrl,
					templateId: value.templateId,
					forced: value.forced,
					debug: value.debug,
				};
				await this.updateApplicationVersion(params);
				this.emitVersionApplicationVersionList();
				this.btnLoading = false;
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form class={styles.applicationVersionEdit} onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item
							label="Tag名称，版本名称"
							help="大版本号规范：xx.xx.xx,热更新版本号:xx.xx.xx,热更新版本不发班"
						>
							{getFieldDecorator("versionName", {
								rules: [
									{
										required: true,
										message: "请输入Tag名称，版本名称",
									},
								],
							})(
								<Input
									type="text"
									name="version"
									placeholder="请输入Tag名称，版本名称"
								></Input>
							)}
						</Form.Item>
						<Form.Item
							label="版本号"
							help="要更新的版本号：iOS为Build编译版本号，安卓为versionCode应用版本号"
						>
							{getFieldDecorator("version", {
								rules: [
									{
										required: true,
										message: "请输入版本号，例如：20210403",
									},
								],
							})(
								<Input
									type="text"
									name="version"
									placeholder="请输入版本号，例如：20210403"
								></Input>
							)}
						</Form.Item>
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
						<Form.Item label="DEBUG版本" help={this.debugTips()}>
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
									on-change={this.debugChange}
								></Radio.Group>
							)}
						</Form.Item>
						<Form.Item label="iOSUrl">
							{getFieldDecorator("iOSUrl", {
								rules: [
									{
										required: true,
										message: "更新包URL",
									},
								],
							})(
								<Input
									type="text"
									name="iOSUrl"
									placeholder="输入苹果的更新包地址"
								></Input>
							)}
						</Form.Item>
						<Form.Item label="AndroidUrl">
							{getFieldDecorator("androidUrl", {
								rules: [
									{
										required: true,
										message: "更新包URL",
									},
								],
							})(
								<Input
									type="text"
									name="androidUrl"
									placeholder="请输入安卓的更新包地址"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="版本更新标题">
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
						<Form.Item label="版本更新内容">
							{getFieldDecorator("content", {
								rules: [
									{
										required: true,
										message: "版本更新内容不能为空",
									},
								],
							})(
								<Input.TextArea
									type="text"
									name="content"
									auto-size={{ minRows: 2, maxRows: 6 }}
									placeholder="输入版本更新内容"
								></Input.TextArea>
							)}
						</Form.Item>
						<Form.Item label="更新模板">
							{getFieldDecorator("templateId", {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: "请选择更新末班",
									},
								],
							})(
								<Radio.Group
									name="templateId"
									options={this.templateIdOptions}
									on-change={this.templateIdChange}
								></Radio.Group>
							)}
						</Form.Item>
						{this.rendertemplateIdImg()}
						<Form.Item label="强制更新" help={this.forcedTips()}>
							{getFieldDecorator("forced", {
								initialValue: 0,
								rules: [
									{
										required: true,
										message: "是否强制更新",
									},
								],
							})(
								<Radio.Group
									name="forced"
									options={this.forcedOptions}
									on-change={this.forcedChange}
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
						更新
					</Button>
				</Form.Item>
			</Form>
		);
	}

	protected rendertemplateIdImg() {
		if (this.templateIdMode === "1") {
			return <img class={styles.templateImg} src={templateImg1}></img>;
		}
		if (this.templateIdMode === "2") {
			return <img class={styles.templateImg} src={templateImg2}></img>;
		}
		if (this.templateIdMode === "3") {
			return <img class={styles.templateImg} src={templateImg3}></img>;
		}
		if (this.templateIdMode === "4") {
			return <img class={styles.templateImg} src={templateImg4}></img>;
		}
		if (this.templateIdMode === "5") {
			return <img class={styles.templateImg} src={templateImg5}></img>;
		}
	}
}
export default Form.create({})(ApplicationVersionEdit);
