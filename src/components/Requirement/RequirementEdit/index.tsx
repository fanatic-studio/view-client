import { RequirementData } from "@/store/models/requirement/types";
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
} from "ant-design-vue";
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ProjectStore = namespace("project");
const RequirementStore = namespace("requirement");
const MilestoneStore = namespace("milestone");
import moment from "moment";
import style from "./index.less";
import { ProjectMemberMode } from "@/store/models/project/types";
import { MilestoneMode } from "@/store/models/milestone/types";
import RequirementStep from "../RequirementStep";
import { IssuesData } from "@/store/models/issues/types";
import IssuesListItem from "@/components/Issues/IssuesListItem";

@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class RequirementEdit extends Vue {
	@RequirementStore.Action("updateRequirement") updateRequirement!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;
	@RequirementStore.Getter("currEditRequirement")
	currEditRequirement!: RequirementData;
	@MilestoneStore.Getter("milestoneList") milestoneList!: Array<MilestoneMode>;
	form: any;
	btnLoading: boolean = false;

	@Watch("currEditRequirement", { immediate: true, deep: true })
	watchCurrEditRequirement() {
		this.$nextTick(() => {
			this.form.setFieldsValue({
				type: this.currEditRequirement.type,
				priority: this.currEditRequirement.priority,
				name: this.currEditRequirement.name,
				desc: this.currEditRequirement.desc,
				competitorAnalysisUrl: this.currEditRequirement.competitorAnalysisUrl,
				requirementDocUrl: this.currEditRequirement.requirementDocUrl,
				requirementUiUrl: this.currEditRequirement.requirementUiUrl,
				requirementCodeUrl: this.currEditRequirement.requirementCodeUrl,
				assignee: this.currEditRequirement.assigneeData.accountId,
				frontAssignee: this.currEditRequirement.frontAssigneeData.accountId,
				serverAssignee: this.currEditRequirement.serverAssigneeData.accountId,
				uiAssignee: this.currEditRequirement.uiAssigneeData.accountId,
				milestoneId: this.currEditRequirement.milestoneData.milestoneId,
				startAt: moment(this.currEditRequirement.startAt),
				onlineAt: moment(this.currEditRequirement.onlineAt),
			});
		});
	}

	@Emit()
	updateNotice() {
		this.$emit("updateNotice");
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: any = {
					// requirementId: this.currEditRequirement.requirementId,
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
				console.log("params", params);
				this.btnLoading = true;
				await this.updateRequirement(params);
				this.btnLoading = false;
				this.updateNotice();
			}
		});
	}

	createIssues() {
		this.$router.push("myIssues");
	}

	protected render() {
		//->->->设计评审->开发->验收->测试->preProd测试->完成
		return (
			<div class={style.requirementInfo}>
				<Row gutter={16}>
					<Col span="8">
						<RequirementStep />
					</Col>
					<Col span="16">
						<Card>{this.renderForm()}</Card>
					</Col>
				</Row>
			</div>
		);
	}
	protected renderForm() {
		const { getFieldDecorator } = this.form;
		return (
			<Form class={style.requirementAdd} onSubmit={this.handleSubmit}>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="需求类型">
							{getFieldDecorator("type", {
								rules: [
									{
										required: true,
										message: "需求类型",
									},
								],
							})(
								<Select name="type">
									<Select.Option key="product" value="product">
										产品需求
									</Select.Option>
									<Select.Option key="operation" value="operation">
										运营需求
									</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="需求优先级">
							{getFieldDecorator("priority", {
								rules: [
									{
										required: false,
										message: "需求优先级",
									},
								],
							})(
								<Select name="priority">
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
				</Row>
				<Form.Item label="需求名称">
					{getFieldDecorator("name", {
						rules: [
							{
								required: true,
								message: "需求名称不能为空",
							},
						],
					})(<Input type="text" name="name"></Input>)}
				</Form.Item>
				<Form.Item label="需求说明">
					{getFieldDecorator("desc", {
						initialValue: "",
						rules: [
							{
								required: true,
								message: "需求说明不能为空",
							},
						],
					})(
						<mavon-editor
							name="desc"
							boxShadow={false}
							toolbarsFlag={false}
							placeholder="选择输入需求说明，简短描述需求来源和目的"
						/>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="竞品分析">
							{getFieldDecorator("competitorAnalysisUrl", {
								rules: [
									{
										required: false,
										message: "竞品分析",
									},
								],
							})(<Input type="text" name="competitorAnalysisUrl"></Input>)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="需求文档">
							{getFieldDecorator("requirementDocUrl", {
								rules: [
									{
										required: false,
										message: "需求说明不能为空",
									},
								],
							})(<Input type="text" name="requirementDocUrl"></Input>)}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="UI文档">
							{getFieldDecorator("requirementUiUrl", {
								rules: [
									{
										required: false,
										message: "需求说明不能为空",
									},
								],
							})(<Input type="text" name="requirementUiUrl"></Input>)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="技术设计文档">
							{getFieldDecorator("requirementCodeUrl", {
								rules: [
									{
										required: false,
										message: "需求说明不能为空",
									},
								],
							})(<Input type="text" name="requirementCodeUrl"></Input>)}
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={8}>
					<Col span="6">
						<Form.Item label="需求负责人">
							{getFieldDecorator("assignee", {
								rules: [
									{
										required: true,
										message: "需求负责人",
									},
								],
							})(
								<Select show-search allowClear name="assignee">
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="前端负责人">
							{getFieldDecorator("frontAssignee", {
								rules: [
									{
										required: false,
										message: "前端负责人",
									},
								],
							})(
								<Select show-search allowClear name="frontAssignee">
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="后端负责人">
							{getFieldDecorator("serverAssignee", {
								rules: [
									{
										required: false,
										message: "后端负责人",
									},
								],
							})(
								<Select show-search allowClear name="serverAssignee">
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span="6">
						<Form.Item label="UI负责人">
							{getFieldDecorator("uiAssignee", {
								rules: [
									{
										required: false,
										message: "UI负责人",
									},
								],
							})(
								<Select show-search allowClear name="uiAssignee">
									{this.renderUserList()}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="里程碑">
					{getFieldDecorator("milestoneId", {
						rules: [
							{
								required: false,
								message: "里程碑",
							},
						],
					})(
						<Select show-search allowClear name="milestoneId">
							{this.renderMilestoneList()}
						</Select>
					)}
				</Form.Item>
				<Row gutter={8}>
					<Col span="12">
						<Form.Item label="需求开始时间">
							{getFieldDecorator("startAt", {
								rules: [
									{
										required: true,
										message: "需求开始时间",
									},
								],
							})(
								<DatePicker
									style={{ width: "100%" }}
									show-time
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择需求开始时间"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
					<Col span="12">
						<Form.Item label="需求上线时间">
							{getFieldDecorator("onlineAt", {
								rules: [
									{
										required: true,
										message: "需求上线时间",
									},
								],
							})(
								<DatePicker
									style={{ width: "100%" }}
									show-time
									placeholder="选择需求上线时间"
									name="onlineAt"
								></DatePicker>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item>
					<Button
						style={{ marginRight: "16px" }}
						type="primary"
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

	renderIssuesList(issueList: Array<IssuesData>) {
		return issueList.map((item) => {
			return <IssuesListItem item={item} showBtns={false} />;
		});
	}

	async statusUpdateHandler(e: string) {
		console.log("完成任务");
		let params = {
			status: e,
		};
		await this.updateRequirement(params);
		this.updateNotice();
	}

	renderControlBtn() {
		if (this.currEditRequirement.status === "todo") {
			return (
				<Button
					size="large"
					on-click={() => {
						this.statusUpdateHandler("doing");
					}}
				>
					开始
				</Button>
			);
		} else if (this.currEditRequirement.status === "doing") {
			return (
				<Button
					size="large"
					on-click={() => {
						this.statusUpdateHandler("done");
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
export default Form.create({})(RequirementEdit);
