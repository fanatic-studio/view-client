import { IssuesData } from '@/store/models/issues/types';
import { ProjectMemberMode, ProjectMode } from '@/store/models/project/types';
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
const ProjectStore = namespace('project');
const RequirementStore = namespace('requirement');
const ApplicationStore = namespace('application');
const MilestoneStore = namespace('milestone');
const IssuesStore = namespace('issues');
import { IssuesPriority, IssuesType } from '../IssuesData';
import style from './index.less';
import { MilestoneMode } from '@/store/models/milestone/types';
import { ApplicationMode } from '@/store/models/application/types';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class IssuesAdd extends Vue {
	@ProjectStore.Action('getProjectMemberLis') getProjectMemberLis!: Function;
	@ProjectStore.Getter('projectList') projectList!: Array<ProjectMode>;

	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;

	@RequirementStore.Action('getRequirementList') getRequirementList!: Function;
	@RequirementStore.Getter('requirementList') requirementList!: Array<
		RequirementMode
	>;

	@ApplicationStore.Action('getApplicationList') getApplicationList!: Function;
	@ApplicationStore.Getter('applicationList') applicationList!: Array<
		ApplicationMode
	>;

	@MilestoneStore.Action('getMilestoneList') getMilestoneList!: Function;
	@MilestoneStore.Getter('milestoneList') milestoneList!: Array<MilestoneMode>;

	@IssuesStore.Action('addIssues') addIssues!: Function;

	@Prop({ default: true }) private allMode!: boolean;

	form: any;
	btnLoading: boolean = false;

	async created() {
		const milestoneParams = {
			pageIndex: 1,
			pageSize: 10,
			status: 'doing',
		};
		await this.getMilestoneList(milestoneParams);
		const appParams = {
			pageIndex: 1,
			pageSize: 10,
		};
		await this.getApplicationList(appParams);
	}

	protected mounted() {}

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
				this.btnLoading = false;
				const params: IssuesData = {
					requirementId: value.requirementId,
					milestoneId: value.milestoneId,
					appId: value.appId,
					type: value.type,
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					startAt: moment(value.startAt).format(),
					endAt: moment(value.endAt).format(),
					extendA: value.extendA,
					extendB: value.extendB,
					priority: value.priority,
					status: value.status,
				};
				await this.addIssues(params);
				this.btnLoading = true;
				this.updateMilsList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="4">
						<Form.Item label="Issue??????">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Issue??????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="type"
									placeholder="?????????Issue??????"
								>
									{this.renderType()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="4">
						<Form.Item label="Issue?????????">
							{getFieldDecorator('priority', {
								rules: [
									{
										required: true,
										message: 'Issue?????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="priority"
									placeholder="Issue?????????"
								>
									{this.renderPriority()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="16">
						<Form.Item label="Issue??????">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: 'Issue??????????????????',
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="????????????Issue??????"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Issue??????">
					{getFieldDecorator('desc', {
						rules: [
							{
								required: true,
								message: 'Issue??????????????????',
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="?????????????????????issues"
						></Input>
					)}
				</Form.Item>
				<Form.Item label="Issue??????">
					{getFieldDecorator('content', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: 'Issue??????????????????',
							},
						],
					})(
						<mavon-editor
							name="content"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="??????Issue?????????????????????Issue???????????????"
						/>
					)}
				</Form.Item>
				<Row gutter={8}>
					{/* <Col span="8">
						<Form.Item label="Issue">
							{getFieldDecorator("extendA", {
								rules: [
									{
										required: true,
										message: "Issue??????????????????",
									},
								],
							})(
								<Input
									type="text"
									name="extendA"
									placeholder="????????????Issue??????"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="Issue??????">
							{getFieldDecorator("extendB", {
								rules: [
									{
										required: true,
										message: "Issue??????????????????",
									},
								],
							})(
								<Input
									type="text"
									name="extendB"
									placeholder="????????????Issue??????"
								></Input>
							)}
						</Form.Item>
					</Col>*/}
				</Row>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="Issue?????????">
							{getFieldDecorator('assignee', {
								rules: [
									{
										required: true,
										message: 'Issue?????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="?????????Issue?????????"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue????????????">
							{getFieldDecorator('requirementId', {
								rules: [
									{
										required: true,
										message: 'Issue????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="requirementId"
									placeholder="?????????Issue????????????"
								>
									{this.renderRequirementList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue???????????????">
							{getFieldDecorator('milestoneId', {
								rules: [
									{
										required: true,
										message: 'Issue???????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="milestoneId"
									placeholder="?????????Issue???????????????"
								>
									{this.renderMilestoneList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue????????????">
							{getFieldDecorator('appId', {
								rules: [
									{
										required: true,
										message: 'Issue????????????',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="appId"
									placeholder="?????????Issue????????????"
								>
									{this.renderApplicationListList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="Issue????????????">
							{getFieldDecorator('startAt', {
								rules: [
									{
										required: false,
										message: 'Issue????????????',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="??????Issue????????????"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="Issue????????????">
							{getFieldDecorator('endAt', {
								rules: [
									{
										required: false,
										message: 'Issue????????????',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="??????Issue????????????"
									name="endAt"
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
						??????Issue
					</Button>
				</Form.Item>
			</Form>
		);
	}

	renderType() {
		return IssuesType.map((item) => {
			return (
				<Select.Option key={item.key} value={item.key}>
					{item.label}
				</Select.Option>
			);
		});
	}

	renderPriority() {
		return IssuesPriority.map((item) => {
			return <Select.Option key={item.key}>{item.label}</Select.Option>;
		});
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

	renderRequirementList() {
		return this.requirementList.map((item) => {
			return (
				<Select.Option key={item.requirementId} value={item.requirementId}>
					{item.name}
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

	renderApplicationListList() {
		return this.applicationList.map((item) => {
			return (
				<Select.Option key={item.appId} value={item.appId}>
					{item.cName}
				</Select.Option>
			);
		});
	}
}
export default Form.create({
	props: {
		allMode: Boolean,
	},
})(IssuesAdd);
