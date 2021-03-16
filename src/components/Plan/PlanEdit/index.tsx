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
import moment from 'moment';
import style from './index.less';
import { ProjectMemberMode } from '@/store/models/project/types';
import { PlanData } from '@/store/models/plan/types';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class PlanEdit extends Vue {
	@PlanStore.Action('updatePlan') updatePlan!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	@PlanStore.Getter('currEditPlan') currEditPlan!: PlanData;
	form: any;
	btnLoading: boolean = false;

	@Watch('currEditPlan', { immediate: true, deep: true })
	watchCurrEditPlan() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				name: this.currEditPlan.name,
				desc: this.currEditPlan.desc,
				content: this.currEditPlan.content,
				assignee: this.currEditPlan.assignee,
				month: moment(this.currEditPlan.month),
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
				const params: PlanData = {
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					month: moment(value.month).format('M'),
				};
				this.btnLoading = true;
				await this.updatePlan(params);
				this.btnLoading = false;
				this.updatePlanList();
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="工作计划名称">
					{getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: '工作计划不能为空',
							},
						],
					})(
						<Input
							type="text"
							name="name"
							placeholder="选择输入工作计划"
						></Input>
					)}
				</Form.Item>
				<Form.Item label="工作计划概述">
					{getFieldDecorator('desc', {
						rules: [
							{
								required: true,
								message: '工作计划概述不能为空',
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="选择输入工作计划概述"
						></Input>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="月份">
							{getFieldDecorator('month', {
								rules: [
									{
										required: true,
										message: '工作计划月份',
									},
								],
							})(
								<DatePicker.MonthPicker
									style={{ width: '100%' }}
									disabled-date={(current: any) => {
										current && current < moment().endOf('day');
									}}
									placeholder="Select Month"
								/>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="需求负责人">
							{getFieldDecorator('assignee', {
								rules: [
									{
										required: true,
										message: '需求负责人',
									},
								],
							})(
								<Select
									show-search
									allowClear
									name="assignee"
									placeholder="请选择需求负责人"
								>
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="工作计划内容">
					{getFieldDecorator('content', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: '工作计划内容不能为空',
							},
						],
					})(
						<mavon-editor
							name="content"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="输入工作计划内容，简短描述工作计划内容的目标"
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
						更新
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
export default Form.create({})(PlanEdit);
