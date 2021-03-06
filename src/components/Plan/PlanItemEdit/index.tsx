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
const PlanStore = namespace('plan');
const MilestoneStore = namespace('milestone');
import moment from 'moment';
import style from './index.less';
import { ProjectMemberMode } from '@/store/models/project/types';
import { PlanData, PlanItemData } from '@/store/models/plan/types';
import { MilestoneMode } from '@/store/models/milestone/types';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class PlanItemEdit extends Vue {
	@PlanStore.Action('updatePlanItem') __updatePlanItem!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter('milestoneList') __milestoneList!: Array<
		MilestoneMode
	>;
	@PlanStore.Getter('currEditPlanItem')
	__currEditPlanItem!: PlanItemData;
	form: any;
	btnLoading: boolean = false;

	@Watch('__currEditPlanItem', { immediate: true, deep: true })
	watchCurrEditPlan() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				type: this.__currEditPlanItem.type,
				name: this.__currEditPlanItem.name,
				desc: this.__currEditPlanItem.desc,
				assignee: this.__currEditPlanItem.assignee,
				milestoneId: this.__currEditPlanItem.milestoneId,
				week: moment().week(this.__currEditPlanItem.week),
			});
		});
	}

	@Emit()
	updatePlanList() {
		this.$emit('updatePlanList');
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: PlanItemData = {
					name: value.name,
					desc: value.desc,
					type: value.type,
					assignee: value.assignee,
					milestoneId: value.milestoneId,
					week: parseInt(moment(value.week).format('W')),
				};
				this.btnLoading = true;
				await this.__updatePlanItem(params);
				this.btnLoading = false;
				this.updatePlanList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="?????????">
							{getFieldDecorator('type', {
								rules: [
									{
										required: true,
										message: '?????????',
									},
								],
							})(
								<Select disabled name="type" placeholder="?????????">
									<Select.Option key="development" value="development">
										????????????
									</Select.Option>
									<Select.Option key="operation" value="operation">
										????????????
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="18">
						<Form.Item label="?????????????????????">
							{getFieldDecorator('name', {
								rules: [
									{
										required: true,
										message: '???????????????????????????',
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
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="??????">
							{getFieldDecorator('week', {
								rules: [
									{
										required: true,
										message: '??????????????????',
									},
								],
							})(
								<DatePicker.WeekPicker
									name="week"
									style={{ width: '100%' }}
									placeholder="??????????????????"
								/>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
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
				</Row>
				<Form.Item label="???????????????">
					{getFieldDecorator('milestoneId', {
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
							name="milestoneId"
							placeholder="???????????????"
						>
							{this.renderMilestoneList()}
						</Select>
					)}
				</Form.Item>

				<Form.Item label="??????????????????">
					{getFieldDecorator('desc', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: '??????????????????????????????',
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="??????????????????????????????????????????????????????????????????"
						/>
					)}
				</Form.Item>

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
	renderWeek() {
		const weekData = [
			{
				key: 1,
				value: '???1???',
			},
			{
				key: 2,
				value: '???2???',
			},
			{
				key: 3,
				value: '???3???',
			},
			{
				key: 4,
				value: '???4???',
			},
			{
				key: 5,
				value: '???5???',
			},
		];
		return weekData.map((item) => {
			return (
				<Select.Option key={item.key} value={item.value}>
					{item.value}
				</Select.Option>
			);
		});
	}
	renderMilestoneList() {
		return this.__milestoneList.map((item) => {
			return (
				<Select.Option key={item.milestoneId} value={item.milestoneId}>
					{item.name}
				</Select.Option>
			);
		});
	}
}
export default Form.create({})(PlanItemEdit);
