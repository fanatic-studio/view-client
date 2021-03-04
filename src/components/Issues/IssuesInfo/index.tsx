import {
	RequirementData,
	RequirementMode,
} from "@/store/models/requirement/types";
import { Alert, Button, FormModel, Icon, Tag, Tooltip } from "ant-design-vue";
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const IssuesStore = namespace("issues");
import style from "./index.less";
import moment from "moment";
import { IssuesPriority, IssuesStatus, IssuesType } from "../IssuesData";
import { IssuesData } from "@/store/models/issues/types";

@Component
export default class IssuesInfo extends Vue {
	@IssuesStore.Getter("currEditIssues") currEditIssues!: IssuesData;
	@IssuesStore.Action("getIssues") __getIssues!: Function;

	async mounted() {
		let result = await this.__getIssues();
		console.log("result", result);
	}

	issuesActivity: string = "";

	getIssueType(e: string) {
		let typeLabel = "";
		IssuesType.map((item) => {
			if (item.key === e) {
				typeLabel = item.label;
			}
		});

		return typeLabel;
	}

	getPriority(e: string) {
		let priorityLabel = "";
		IssuesPriority.map((item) => {
			if (item.key === e) {
				priorityLabel = item.label;
			}
		});

		return priorityLabel;
	}

	getIssuesStatus(e: string) {
		let statusLabel = "";
		IssuesStatus.map((item) => {
			if (item.key === e) {
				statusLabel = item.label;
			}
		});

		return statusLabel;
	}

	protected render() {
		return (
			<div class={style.issueInfo}>
				<div class={style.left}>
					<div class={style.header}>
						<Tag>{this.getIssueType(this.currEditIssues.type)}</Tag>
						<Tag>{this.getPriority(this.currEditIssues.priority)}</Tag>
						<Tag> {this.getIssuesStatus(this.currEditIssues.status)}</Tag>
						<div class={style.title}>{this.currEditIssues.name}</div>
					</div>
					<Alert class={style.desc} message={this.currEditIssues.desc}></Alert>
					<div>
						<mavon-editor
							value={this.currEditIssues.content}
							class={style.mavonEditorTooltipPreview}
							style={{
								zIndex: 1,
								cursor: "pointer",
								background: "unset",
							}}
							previewBackground=""
							defaultOpen="preview"
							boxShadow={false}
							boxShadowStyle="0 2px 12px 0 rgba(0, 0, 0, 0)"
							editable={false}
							subfield={false}
							toolbarsFlag={false}
						></mavon-editor>
					</div>
					<div>
						<Tooltip placement="top">
							<div slot="title">工程</div>
							<Tag>
								<Icon type="appstore" />
								{this.currEditIssues.appData.cName}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">里程碑</div>
							<Tag>
								<Icon class={style.otherInfoItemIcon} type="clock-circle" />
								{this.currEditIssues.milestoneData.name}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">需求</div>
							<Tag>
								<Icon type="snippets" />
								{this.currEditIssues.requirementData.name}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">创建者</div>
							<Tag>
								<Icon class={style.otherInfoItemIcon} type="user" />
								{this.currEditIssues.ownerData.nickName}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">结束时间</div>
							<Tag>
								<Icon type="calendar" />
								{moment(this.currEditIssues.endAt).format(
									"YYYY-MM-DD HH:mm:ss"
								)}
							</Tag>
						</Tooltip>
					</div>
					<div>
						<div></div>
						<div>
							<mavon-editor
								v-model={this.issuesActivity}
								name="content"
								boxShadow={false}
								toolbarsFlag={false}
								placeholder="输入..."
							/>
							<Button>回复</Button>
						</div>
					</div>
				</div>
				<div class={style.right}>
					<div>
						<div>Issue动态</div>
						<div></div>
					</div>
				</div>
			</div>
		);
		// <Form onSubmit={this.handleSubmit}>
		// 	<Row gutter={8}>
		// 		<Col span="4">
		// 			<Form.Item label="Issue优先级">
		// 				{getFieldDecorator("priority", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue优先级",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="priority"
		// 						placeholder="Issue优先级"
		// 					>
		// 						{this.renderPriority()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="16">
		// 			<Form.Item label="Issue名称">
		// 				{getFieldDecorator("name", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue名称不能为空",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="name"
		// 						placeholder="选择输入Issue名称"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Form.Item label="Issue概述">
		// 		{getFieldDecorator("desc", {
		// 			rules: [
		// 				{
		// 					required: true,
		// 					message: "Issue概述不能为空",
		// 				},
		// 			],
		// 		})(
		// 			<Input
		// 				type="text"
		// 				name="desc"
		// 				placeholder="请用一句话概括issues"
		// 			></Input>
		// 		)}
		// 	</Form.Item>
		// 	<Form.Item label="Issue说明">
		// 		{getFieldDecorator("content", {
		// 			initialValue: "",
		// 			rules: [
		// 				{
		// 					required: true,
		// 					message: "Issue说明不能为空",
		// 				},
		// 			],
		// 		})(
		// 			<mavon-editor
		// 				name="content"
		// 				boxShadow={false}
		// 				toolbarsFlag={false}
		// 				placeholder="输入Issue说明，简短描述Issue说明的目标"
		// 			/>
		// 		)}
		// 	</Form.Item>
		// 	<Row gutter={8}>
		// 		{/* <Col span="8">
		// 			<Form.Item label="Issue">
		// 				{getFieldDecorator("extendA", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue说明不能为空",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="extendA"
		// 						placeholder="选择输入Issue说明"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="8">
		// 			<Form.Item label="Issue说明">
		// 				{getFieldDecorator("extendB", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue说明不能为空",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="extendB"
		// 						placeholder="选择输入Issue说明"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>*/}
		// 	</Row>
		// 	<Row gutter={8}>
		// 		<Col span="6">
		// 			<Form.Item label="Issue负责人">
		// 				{getFieldDecorator("assignee", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue负责人",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="assignee"
		// 						placeholder="请选择Issue负责人"
		// 					>
		// 						{this.renderUserList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue所属需求">
		// 				{getFieldDecorator("requirementId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue所属需求",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="requirementId"
		// 						placeholder="请选择Issue所属需求"
		// 					>
		// 						{this.renderRequirementList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue所属里程碑">
		// 				{getFieldDecorator("milestoneId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue所属里程碑",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="milestoneId"
		// 						placeholder="请选择Issue所属里程碑"
		// 					>
		// 						{this.renderMilestoneList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue所属工程">
		// 				{getFieldDecorator("appId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue所属工程",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="appId"
		// 						placeholder="请选择Issue所属工程"
		// 					>
		// 						{this.renderApplicationListList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Row gutter={8}>
		// 		<Col span="12">
		// 			<Form.Item label="Issue开始时间">
		// 				{getFieldDecorator("startAt", {
		// 					rules: [
		// 						{
		// 							required: false,
		// 							message: "Issue开始时间",
		// 						},
		// 					],
		// 				})(
		// 					<DatePicker
		// 						style={{ width: "100%" }}
		// 						show-time
		// 						format="YYYY-MM-DD HH:mm:ss"
		// 						placeholder="选择Issue开始时间"
		// 					></DatePicker>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="12">
		// 			<Form.Item label="Issue上线时间">
		// 				{getFieldDecorator("endAt", {
		// 					rules: [
		// 						{
		// 							required: false,
		// 							message: "Issue上线时间",
		// 						},
		// 					],
		// 				})(
		// 					<DatePicker
		// 						style={{ width: "100%" }}
		// 						show-time
		// 						format="YYYY-MM-DD HH:mm:ss"
		// 						placeholder="选择Issue上线时间"
		// 						name="endAt"
		// 					></DatePicker>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Form.Item>
		// 		<Button type="primary" block size="large" html-type="submit">
		// 			更新
		// 		</Button>
		// 	</Form.Item>
		// </Form>
		// );
	}
}
