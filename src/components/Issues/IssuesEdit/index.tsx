import {
	RequirementData,
	RequirementMode,
} from '@/store/models/requirement/types';
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
const RequirementStore = namespace('requirement');
const ApplicationStore = namespace('application');
const MilestoneStore = namespace('milestone');
const IssuesStore = namespace('issues');
import moment from 'moment';
import style from './index.less';
import { IssuesPriority, IssuesType } from '../IssuesData';
import { ProjectMemberMode, ProjectMode } from '@/store/models/project/types';
import { IssuesData } from '@/store/models/issues/types';
import { MilestoneMode } from '@/store/models/milestone/types';
import { ApplicationMode } from '@/store/models/application/types';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class IssuesEdit extends Vue {
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
	@IssuesStore.Action('updateIssues') updateIssues!: Function;
	@IssuesStore.Getter('currEditIssues') currEditIssues!: IssuesData;
	form: any;
	issuesStatus: string = '';
	btnLoading: boolean = false;

	@Watch('currEditIssues', { immediate: true, deep: true })
	watchcurrEditIssues() {
		this.issuesStatus = this.currEditIssues.status;
		this.$nextTick(() => {
			this.form.setFieldsValue({
				requirementId: this.currEditIssues.requirementId,
				milestoneId: this.currEditIssues.milestoneId,
				appId: this.currEditIssues.appId,
				type: this.currEditIssues.type,
				name: this.currEditIssues.name,
				desc: this.currEditIssues.desc,
				content: this.currEditIssues.content,
				assignee: this.currEditIssues.assignee,
				startAt: moment(this.currEditIssues.startAt),
				endAt: moment(this.currEditIssues.endAt),
				// extendA: this.currEditIssues.extendA,
				// extendB: this.currEditIssues.extendB,
				priority: this.currEditIssues.priority,
			});
		});
	}

	@Emit()
	updateNotice() {
		this.$emit('updateNotice');
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
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
					// extendA: value.extendA,
					// extendB: value.extendB,
					priority: value.priority,
					status: this.issuesStatus,
				};
				this.btnLoading = true;
				await this.updateIssues(params);
				this.btnLoading = false;
				this.updateNotice();
			}
		});
	}

	async issueStatus(e: string) {
		console.log('完成任务');
		let params = {
			appId: this.currEditIssues.appId,
			status: e,
		};
		await this.updateIssues(params);
		this.updateNotice();
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="4">
						<Form.Item label="Issue类型">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: 'Issue类型',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="type"
									placeholder="请选择Issue类型"
								>
									{this.renderType()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="4">
						<Form.Item label="Issue优先级">
							{getFieldDecorator('priority', {
								rules: [
									{
										required: true,
										message: 'Issue优先级',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="priority"
									placeholder="Issue优先级"
								>
									{this.renderPriority()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="16">
						<Form.Item label="Issue名称">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: 'Issue名称不能为空',
									},
								],
							})(
								<Input
									type="text"
									name="name"
									placeholder="选择输入Issue名称"
								></Input>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Issue概述">
					{getFieldDecorator('desc', {
						rules: [
							{
								required: true,
								message: 'Issue概述不能为空',
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="请用一句话概括issues"
						></Input>
					)}
				</Form.Item>
				<Form.Item label="Issue说明">
					{getFieldDecorator('content', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: 'Issue说明不能为空',
							},
						],
					})(
						<mavon-editor
							name="content"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="输入Issue说明，简短描述Issue说明的目标"
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
										message: "Issue说明不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="extendA"
									placeholder="选择输入Issue说明"
								></Input>
							)}
						</Form.Item>
					</Col>
					<Col span="8">
						<Form.Item label="Issue说明">
							{getFieldDecorator("extendB", {
								rules: [
									{
										required: true,
										message: "Issue说明不能为空",
									},
								],
							})(
								<Input
									type="text"
									name="extendB"
									placeholder="选择输入Issue说明"
								></Input>
							)}
						</Form.Item>
					</Col>*/}
				</Row>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="Issue负责人">
							{getFieldDecorator('assignee', {
								rules: [
									{
										required: true,
										message: 'Issue负责人',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="请选择Issue负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue所属需求">
							{getFieldDecorator('requirementId', {
								rules: [
									{
										required: true,
										message: 'Issue所属需求',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="requirementId"
									placeholder="请选择Issue所属需求"
								>
									{this.renderRequirementList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue所属里程碑">
							{getFieldDecorator('milestoneId', {
								rules: [
									{
										required: true,
										message: 'Issue所属里程碑',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="milestoneId"
									placeholder="请选择Issue所属里程碑"
								>
									{this.renderMilestoneList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="Issue所属工程">
							{getFieldDecorator('appId', {
								rules: [
									{
										required: true,
										message: 'Issue所属工程',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="appId"
									placeholder="请选择Issue所属工程"
								>
									{this.renderApplicationListList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="Issue开始时间">
							{getFieldDecorator('startAt', {
								rules: [
									{
										required: false,
										message: 'Issue开始时间',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择Issue开始时间"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="Issue上线时间">
							{getFieldDecorator('endAt', {
								rules: [
									{
										required: false,
										message: 'Issue上线时间',
									},
								],
							})(
								<DatePicker
									style={{ width: '100%' }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择Issue上线时间"
									name="endAt"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item>
					<Button
						type="primary"
						style={{ marginRight: '16px' }}
						size="large"
						html-type="submit"
						loading={this.btnLoading}
					>
						更新
					</Button>
					{this.renderControlBtn()}
				</Form.Item>
			</Form>
		);
	}

	renderType() {
		return IssuesType.map((item) => {
			return <Select.Option key={item.key}>{item.label}</Select.Option>;
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
				<Select.Option key={item.accountId}>{item.nickName}</Select.Option>
			);
		});
	}

	renderRequirementList() {
		return this.requirementList.map((item) => {
			return (
				<Select.Option key={item.requirementId}>{item.name}</Select.Option>
			);
		});
	}

	renderMilestoneList() {
		return this.milestoneList.map((item) => {
			return <Select.Option key={item.milestoneId}>{item.name}</Select.Option>;
		});
	}

	renderApplicationListList() {
		return this.applicationList.map((item) => {
			return <Select.Option key={item.appId}>{item.cName}</Select.Option>;
		});
	}
	renderControlBtn() {
		if (this.currEditIssues.status === 'todo') {
			return (
				<Button
					size="large"
					on-click={() => {
						this.issueStatus('doing');
					}}
				>
					开始
				</Button>
			);
		} else if (this.currEditIssues.status === 'doing') {
			return (
				<Button
					size="large"
					on-click={() => {
						this.issueStatus('done');
					}}
				>
					完成
				</Button>
			);
		} else {
			return {};
		}
	}
}
export default Form.create({})(IssuesEdit);
