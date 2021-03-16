import { PlanData } from '@/store/models/plan/types';
import { ProjectMemberMode } from '@/store/models/project/types';
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
import { MonthPicker } from 'ant-design-vue/types/date-picker/month-picker';
import moment from 'moment';
moment.locale('zh-cn');
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const ProjectStore = namespace('project');
const PlanStore = namespace('plan');
import style from './index.less';

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class PlanAdd extends Vue {
	@Prop({ default: true }) private allMode!: boolean;

	@PlanStore.Action('addPlan') addPlan!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;

	form: any;
	btnLoading: boolean = false;

	async created() {}

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
				const params: PlanData = {
					name: value.name,
					desc: value.desc,
					content: value.content,
					assignee: value.assignee,
					month: moment(value.month).format('M'),
				};
				this.btnLoading = true;
				const res = await this.addPlan(params);
				if (res) {
					this.$message.success('创建成功');
				} else {
					this.$message.error('创建失败');
				}
				this.btnLoading = false;
				this.updateMilsList();
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

				<Form.Item label="工作计划概述">
					{getFieldDecorator('desc', {
						initialValue: '',
						rules: [
							{
								required: true,
								message: '工作计划内容不能为空',
							},
						],
					})(
						<Input
							type="text"
							name="desc"
							placeholder="请输入工作概述，总结本月工作要点"
						></Input>
					)}
				</Form.Item>
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
						新增工作计划
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
export default Form.create({
	props: {
		allMode: Boolean,
	},
})(PlanAdd);
