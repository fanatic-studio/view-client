import { MilestoneMode } from '@/store/models/milestone/types';
import { ProjectMemberMode } from '@/store/models/project/types';
import { RequirementMode } from '@/store/models/requirement/types';
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
} from 'ant-design-vue';
import moment from 'moment';
moment.locale('zh-cn');
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const RequirementStore = namespace('requirement');
const ProjectStore = namespace('project');
const MilestoneStore = namespace('milestone');
import style from './index.less';

@Component({
	components: {
		'a-date-picker': DatePicker,
	},
	props: {
		form: {
			type: Object,
		},
	},
})
class RequirementAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@RequirementStore.Action('addRequirement') addRequirement!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter('milestoneList') milestoneList!: Array<MilestoneMode>;

	form: any;
	btnLoading: boolean = false;

	async created() {}

	protected mounted() {}

	@Emit()
	updateRList() {
		this.$emit('updateRList');
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
						<Form.Item label="????????????">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: '????????????????????????',
									},
								],
							})(
								<Select name="type" placeholder="??????????????????">
									<Select.Option key="product" value="product">
										????????????
									</Select.Option>
									<Select.Option key="operation" value="operation">
										????????????
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="5">
						<Form.Item label="???????????????">
							{getFieldDecorator('priority', {
								rules: [
									{
										required: false,
										message: '???????????????????????????',
									},
								],
							})(
								<Select name="priority" placeholder="?????????????????????">
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
						<Form.Item label="????????????">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: '????????????????????????',
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="????????????????????????"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="????????????">
					{getFieldDecorator('desc', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: '????????????????????????',
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="????????????????????????????????????????????????????????????"
						/>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="????????????">
							{getFieldDecorator('competitorAnalysisUrl', {
								rules: [
									{
										required: false,
										message: '????????????',
									},
								],
							})(
								<Input
									type="text"
									name="competitorAnalysisUrl"
									placeholder="?????????????????????url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="????????????">
							{getFieldDecorator('requirementDocUrl', {
								rules: [
									{
										required: false,
										message: '????????????',
									},
								],
							})(
								<Input
									type="text"
									name="requirementDocUrl"
									placeholder="?????????????????????url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="UI?????????(??????)">
							{getFieldDecorator('requirementUiUrl', {
								rules: [
									{
										required: false,
										message: 'UI?????????(??????)',
									},
								],
							})(
								<Input
									type="text"
									name="requirementUiUrl"
									placeholder="???????????????url"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="??????????????????">
							{getFieldDecorator('requirementCodeUrl', {
								rules: [
									{
										required: false,
										message: '??????????????????',
									},
								],
							})(
								<Input
									type="text"
									name="requirementCodeUrl"
									placeholder="?????????????????????url"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="???????????????">
							{getFieldDecorator('assignee', {
								rules: [
									{
										required: true,
										message: '???????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="????????????????????????"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="???????????????">
							{getFieldDecorator('frontAssignee', {
								rules: [
									{
										required: false,
										message: '???????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="frontAssignee"
									placeholder="????????????????????????"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="???????????????">
							{getFieldDecorator('serverAssignee', {
								rules: [
									{
										required: false,
										message: '???????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="serverAssignee"
									placeholder="????????????????????????"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="UI?????????">
							{getFieldDecorator('uiAssignee', {
								rules: [
									{
										required: false,
										message: 'UI?????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="uiAssignee"
									placeholder="?????????ui?????????"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="8">
						<Form.Item label="???????????????">
							{getFieldDecorator('milestoneId', {
								rules: [
									{
										required: false,
										message: '???????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="milestoneId"
									placeholder="????????????????????????"
								>
									{this.renderMilestoneList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="??????????????????">
							{getFieldDecorator('startAt', {
								rules: [
									{
										required: false,
										message: '??????????????????',
									},
								],
							})(
								<DatePicker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="????????????????????????"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="??????????????????">
							{getFieldDecorator('onlineAt', {
								rules: [
									{
										required: false,
										message: '??????????????????',
									},
								],
							})(
								<DatePicker
									show-time
									format="YYYY-MM-DD HH:mm:ss"
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
						????????????
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
