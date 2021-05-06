import {
	AddApplicationParams,
	AddApplicationWelcomeParams,
	ApplicationMode,
	ApplicationWelcomeMode,
} from "@/store/models/application/types";
import { ProjectMemberMode } from "@/store/models/project/types";
import {
	Form,
	Input,
	Button,
	DatePicker,
	Row,
	Col,
	Select,
	Radio,
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
class ApplicationWelcomeEdit extends Vue {
	@ApplicationStore.Action("updateApplicationWelcome")
	updateApplicationWelcome!: Function;

	@ApplicationStore.Getter("currEditApplicationWelcome")
	currEditApplicationWelcome!: ApplicationWelcomeMode;

	@Emit()
	private emitWelcomeApplicationWelcomeList() {
		this.$emit("emitWelcomeApplicationWelcomeList");
	}

	@Watch("currEditApplicationWelcome", { immediate: true, deep: true })
	watchCurrEditApplicationWelcome(
		newValue: ApplicationWelcomeMode,
		oldValue: ApplicationWelcomeMode
	) {
		console.log("newValue", newValue);

		this.$nextTick(() => {
			this.form.setFieldsValue({
				title: this.currEditApplicationWelcome.title,
				desc: this.currEditApplicationWelcome.desc,
				welcomeType: this.currEditApplicationWelcome.welcomeType,
				welcomeImage: this.currEditApplicationWelcome.welcomeImage,
				welcomeWait: this.currEditApplicationWelcome.welcomeWait,
				welcomeSkip: this.currEditApplicationWelcome.welcomeSkip,
				welcomeJump: this.currEditApplicationWelcome.welcomeJump,
				welcomeTime: [
					moment
						.unix(parseInt(this.currEditApplicationWelcome.welcomeLimitE))
						.format(),
					moment
						.unix(parseInt(this.currEditApplicationWelcome.welcomeLimitS))
						.format(),
				],
			});
		});
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

	welcomeTypeOptions: Array<any> = [
		{ label: "活动", value: "activity" },
		{ label: "内容", value: "content" },
		{ label: "广告", value: "ad" },
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
				const params: AddApplicationWelcomeParams = {
					title: value.title,
					desc: value.desc,
					welcomeType: value.welcomeType,
					welcomeImage: value.welcomeImage,
					welcomeJump: value.welcomeJump,
					welcomeSkip: value.welcomeSkip,
					welcomeWait: value.welcomeWait,
					welcomeLimitE: moment(value.welcomeTime[0])
						.unix()
						.toString(),
					welcomeLimitS: moment(value.welcomeTime[1])
						.unix()
						.toString(),
				};

				console.log("params", params);
				await this.updateApplicationWelcome(params);
				// this.emitWelcomeApplicationWelcomeList();
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
						<Form.Item label="欢迎页名称">
							{getFieldDecorator("title", {
								rules: [
									{
										required: true,
										message: "欢迎页名称",
									},
								],
							})(
								<Input
									type="text"
									name="title"
									placeholder="输入欢迎页名称"
								></Input>
							)}
						</Form.Item>
						<Form.Item label="欢迎页类型">
							{getFieldDecorator("welcomeType", {
								rules: [
									{
										required: true,
										message: "欢迎页类型",
									},
								],
							})(
								<Select name="welcomeType" placeholder="请选择闪屏类型">
									{this.renderWelcomeType()}
								</Select>
							)}
						</Form.Item>
						<Form.Item label="欢迎页说明">
							{getFieldDecorator("desc", {
								rules: [
									{
										required: true,
										message: "欢迎页说明",
									},
								],
							})(
								<Input
									type="text"
									name="desc"
									placeholder="输入欢迎页说明"
								></Input>
							)}
						</Form.Item>
						<Form.Item
							label="闪屏广告图"
							help="闪屏广告图片：留空则不显示闪屏广告。"
						>
							{getFieldDecorator("welcomeImage", {
								rules: [
									{
										required: true,
										message: "闪屏广告图",
									},
								],
							})(
								<Input
									type="text"
									name="welcomeImage"
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
							{getFieldDecorator("welcomeWait", {
								initialValue: "3000",
								rules: [
									{
										required: true,
										message: "闪屏显示时间",
									},
								],
							})(
								<Select
									name="welcomeWait"
									placeholder="请选择闪屏显示时间，一般都是3s"
								>
									{this.renderWelcomeWaitTime()}
								</Select>
							)}
						</Form.Item>
						<Form.Item label="闪屏跳过按钮">
							{getFieldDecorator("welcomeSkip", {
								initialValue: "0",
								rules: [
									{
										required: true,
										message: "工程名称不能为空",
									},
								],
							})(
								<Radio.Group
									name="welcomeSkip"
									options={this.welcomeSkipOptions}
								></Radio.Group>
							)}
						</Form.Item>
						<Form.Item
							label="闪屏点击打开"
							help="点击闪屏广告时打开的js页面路径，如：ad.js(完整page下的路径)或https://abc.com/ad.js。"
						>
							{getFieldDecorator("welcomeJump", {
								rules: [
									{
										required: true,
										message: "热更新名称",
									},
								],
							})(
								<Input
									type="text"
									name="welcomeJump"
									placeholder="输入热更新名称"
								></Input>
							)}
						</Form.Item>
						<Form.Item
							label="闪屏有效时限"
							help="设置闪屏广告在指定时间范围内显示。"
						>
							{getFieldDecorator("welcomeTime", {
								rules: [
									{
										required: false,
										message: "热更新名称",
									},
								],
							})(
								<DatePicker.RangePicker
									name="welcomeTime"
									style={{ width: "100%" }}
									format="YYYY-MM-DD HH:mm:ss"
									show-time
								></DatePicker.RangePicker>
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

	protected renderWelcomeType() {
		return this.welcomeTypeOptions.map((item) => {
			return <Select.Option key={item.value}>{item.label}</Select.Option>;
		});
	}
}
export default Form.create({})(ApplicationWelcomeEdit);
