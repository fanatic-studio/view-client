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
	Card,
} from 'ant-design-vue';
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const ProjectStore = namespace('project');
const MilestoneStore = namespace('milestone');
import moment from 'moment';
import style from './index.less';
import { ProjectMemberMode } from '@/store/models/project/types';
import { MilestoneMode } from '@/store/models/milestone/types';
import { IssuesData } from '@/store/models/issues/types';
import IssuesListItem from '@/components/Issues/IssuesListItem';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class MilestoneEdit extends Vue {
	@MilestoneStore.Action('updateMilestone') updateMilestone!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter('currEditMilestone')
	currEditMilestone!: MilestoneMode;
	btnLoading: boolean = false;
	form: any;

	@Watch('currEditMilestone', { immediate: true, deep: true })
	watchcurrEditMilestone() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				name: this.currEditMilestone.name,
				desc: this.currEditMilestone.desc,
				content: this.currEditMilestone.content,
				assignee: this.currEditMilestone.assignee,
				startAt: moment(this.currEditMilestone.startAt),
				onlineAt: moment(this.currEditMilestone.onlineAt),
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
				const params: any = {
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					startAt: moment(value.startAt).format(),
					onlineAt: moment(value.startonlineAtAt).format(),
				};
				this.btnLoading = true;
				await this.updateMilestone(params);
				this.btnLoading = false;
				this.updateNotice();
			}
		});
	}

	createIssues() {
		this.$router.push('/work/myIssues');
	}
	protected render() {
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
						initialValue: '',
						rules: [
							{
								required: true,
								message: '???????????????????????????',
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
						style={{ marginRight: '16px' }}
						type="primary"
						size="large"
						html-type="submit"
						loading={this.btnLoading}
					>
						??????
					</Button>
					{this.renderControlBtn()}
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

	renderIssuesList(issueList: Array<IssuesData>) {
		return issueList.map((item) => {
			return <IssuesListItem item={item} />;
		});
	}

	async statusUpdateHandler(e: string) {
		console.log('????????????');
		let params = {
			status: e,
		};
		await this.updateMilestone(params);
		this.updateNotice();
	}

	renderControlBtn() {
		if (this.currEditMilestone.status === 'todo') {
			return (
				<Button
					size="large"
					on-click={() => {
						this.statusUpdateHandler('doing');
					}}
				>
					??????
				</Button>
			);
		} else if (this.currEditMilestone.status === 'doing') {
			return (
				<Button
					size="large"
					on-click={() => {
						this.statusUpdateHandler('done');
					}}
				>
					??????
				</Button>
			);
		} else if (this.currEditMilestone.status === 'done') {
			return (
				<Button
					size="large"
					on-click={() => {
						this.statusUpdateHandler('doing');
					}}
				>
					??????
				</Button>
			);
		}
	}
}
export default Form.create({})(MilestoneEdit);
