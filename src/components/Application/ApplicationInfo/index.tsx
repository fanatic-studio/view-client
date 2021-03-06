import { RequirementData } from '@/store/models/requirement/types';
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
} from 'ant-design-vue';
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const ProjectStore = namespace('project');
const ApplicationStore = namespace('application');
import moment from 'moment';
import style from './index.less';
import { ProjectMemberMode } from '@/store/models/project/types';
import { ApplicationMode } from '@/store/models/application/types';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class ApplicationInfo extends Vue {
	@ApplicationStore.Action('updateApplication') updateApplication!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	@ApplicationStore.Getter('currEditApplication')
	currEditApplication!: ApplicationMode;
	form: any;
	btnLoading: boolean = false;

	@Watch('currEditApplication', { immediate: true, deep: true })
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
		this.$emit('updateMilsList');
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
					<div>??????Issues</div>
				</Col>
			</Row>
		);
	}
	protected renderForm() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="???????????????">
					{getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: '???????????????????????????',
							},
						],
					})(<Input type="text" name="name"></Input>)}
				</Form.Item>
				<Form.Item label="???????????????">
					{getFieldDecorator('desc', {
						rules: [
							{
								required: true,
								message: '???????????????????????????',
							},
						],
					})(<Input type="text" name="desc"></Input>)}
				</Form.Item>
				<Form.Item label="???????????????">
					{getFieldDecorator('content', {
						rules: [
							{
								required: true,
								message: '???????????????????????????',
							},
						],
					})(
						<Input.TextArea
							rows={6}
							name="content"
							placeholder="??????????????????????????????????????????????????????????????????"
						></Input.TextArea>
					)}
				</Form.Item>
				<Form.Item label="???????????????">
					{getFieldDecorator('assignee', {
						rules: [
							{
								required: true,
								message: '???????????????',
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
						<Form.Item label="??????????????????">
							{getFieldDecorator('startAt', {
								rules: [
									{
										required: true,
										message: '??????????????????',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="????????????????????????"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="??????????????????">
							{getFieldDecorator('onlineAt', {
								rules: [
									{
										required: true,
										message: '??????????????????',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									placeholder="????????????????????????"
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
						??????
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
