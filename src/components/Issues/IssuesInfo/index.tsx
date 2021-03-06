import {
	RequirementData,
	RequirementMode,
} from '@/store/models/requirement/types';
import { Alert, Button, FormModel, Icon, Tag, Tooltip } from 'ant-design-vue';
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const IssuesStore = namespace('issues');
import style from './index.less';
import moment from 'moment';
import { IssuesPriority, IssuesStatus, IssuesType } from '../IssuesData';
import { IssuesData } from '@/store/models/issues/types';

@Component
export default class IssuesInfo extends Vue {
	@IssuesStore.Getter('currEditIssues') currEditIssues!: IssuesData;
	@IssuesStore.Action('getIssues') __getIssues!: Function;

	async mounted() {
		let result = await this.__getIssues();
		console.log('result', result);
	}

	issuesActivity: string = '';

	getIssueType(e: string) {
		let typeLabel = '';
		IssuesType.map((item) => {
			if (item.key === e) {
				typeLabel = item.label;
			}
		});

		return typeLabel;
	}

	getPriority(e: string) {
		let priorityLabel = '';
		IssuesPriority.map((item) => {
			if (item.key === e) {
				priorityLabel = item.label;
			}
		});

		return priorityLabel;
	}

	getIssuesStatus(e: string) {
		let statusLabel = '';
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
								cursor: 'pointer',
								background: 'unset',
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
							<div slot="title">??????</div>
							<Tag>
								<Icon type="appstore" />
								{this.currEditIssues.appData.cName}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">?????????</div>
							<Tag>
								<Icon class={style.otherInfoItemIcon} type="clock-circle" />
								{this.currEditIssues.milestoneData.name}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">??????</div>
							<Tag>
								<Icon type="snippets" />
								{this.currEditIssues.requirementData.name}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">?????????</div>
							<Tag>
								<Icon class={style.otherInfoItemIcon} type="user" />
								{this.currEditIssues.ownerData.nickName}
							</Tag>
						</Tooltip>
						<Tooltip placement="top">
							<div slot="title">????????????</div>
							<Tag>
								<Icon type="calendar" />
								{moment(this.currEditIssues.endAt).format(
									'YYYY-MM-DD HH:mm:ss'
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
								placeholder="??????..."
							/>
							<Button>??????</Button>
						</div>
					</div>
				</div>
				<div class={style.right}>
					<div>
						<div>Issue??????</div>
						<div></div>
					</div>
				</div>
			</div>
		);
		// <Form onSubmit={this.handleSubmit}>
		// 	<Row gutter={8}>
		// 		<Col span="4">
		// 			<Form.Item label="Issue?????????">
		// 				{getFieldDecorator("priority", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue?????????",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="priority"
		// 						placeholder="Issue?????????"
		// 					>
		// 						{this.renderPriority()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="16">
		// 			<Form.Item label="Issue??????">
		// 				{getFieldDecorator("name", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue??????????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="name"
		// 						placeholder="????????????Issue??????"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Form.Item label="Issue??????">
		// 		{getFieldDecorator("desc", {
		// 			rules: [
		// 				{
		// 					required: true,
		// 					message: "Issue??????????????????",
		// 				},
		// 			],
		// 		})(
		// 			<Input
		// 				type="text"
		// 				name="desc"
		// 				placeholder="?????????????????????issues"
		// 			></Input>
		// 		)}
		// 	</Form.Item>
		// 	<Form.Item label="Issue??????">
		// 		{getFieldDecorator("content", {
		// 			initialValue: "",
		// 			rules: [
		// 				{
		// 					required: true,
		// 					message: "Issue??????????????????",
		// 				},
		// 			],
		// 		})(
		// 			<mavon-editor
		// 				name="content"
		// 				boxShadow={false}
		// 				toolbarsFlag={false}
		// 				placeholder="??????Issue?????????????????????Issue???????????????"
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
		// 							message: "Issue??????????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="extendA"
		// 						placeholder="????????????Issue??????"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="8">
		// 			<Form.Item label="Issue??????">
		// 				{getFieldDecorator("extendB", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue??????????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Input
		// 						type="text"
		// 						name="extendB"
		// 						placeholder="????????????Issue??????"
		// 					></Input>
		// 				)}
		// 			</Form.Item>
		// 		</Col>*/}
		// 	</Row>
		// 	<Row gutter={8}>
		// 		<Col span="6">
		// 			<Form.Item label="Issue?????????">
		// 				{getFieldDecorator("assignee", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue?????????",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="assignee"
		// 						placeholder="?????????Issue?????????"
		// 					>
		// 						{this.renderUserList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue????????????">
		// 				{getFieldDecorator("requirementId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="requirementId"
		// 						placeholder="?????????Issue????????????"
		// 					>
		// 						{this.renderRequirementList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue???????????????">
		// 				{getFieldDecorator("milestoneId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue???????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="milestoneId"
		// 						placeholder="?????????Issue???????????????"
		// 					>
		// 						{this.renderMilestoneList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="6">
		// 			<Form.Item label="Issue????????????">
		// 				{getFieldDecorator("appId", {
		// 					rules: [
		// 						{
		// 							required: true,
		// 							message: "Issue????????????",
		// 						},
		// 					],
		// 				})(
		// 					<Select
		// 						show-search
		// 						allowClear
		// 						name="appId"
		// 						placeholder="?????????Issue????????????"
		// 					>
		// 						{this.renderApplicationListList()}
		// 					</Select>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Row gutter={8}>
		// 		<Col span="12">
		// 			<Form.Item label="Issue????????????">
		// 				{getFieldDecorator("startAt", {
		// 					rules: [
		// 						{
		// 							required: false,
		// 							message: "Issue????????????",
		// 						},
		// 					],
		// 				})(
		// 					<DatePicker
		// 						style={{ width: "100%" }}
		// 						show-time
		// 						format="YYYY-MM-DD HH:mm:ss"
		// 						placeholder="??????Issue????????????"
		// 					></DatePicker>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 		<Col span="12">
		// 			<Form.Item label="Issue????????????">
		// 				{getFieldDecorator("endAt", {
		// 					rules: [
		// 						{
		// 							required: false,
		// 							message: "Issue????????????",
		// 						},
		// 					],
		// 				})(
		// 					<DatePicker
		// 						style={{ width: "100%" }}
		// 						show-time
		// 						format="YYYY-MM-DD HH:mm:ss"
		// 						placeholder="??????Issue????????????"
		// 						name="endAt"
		// 					></DatePicker>
		// 				)}
		// 			</Form.Item>
		// 		</Col>
		// 	</Row>
		// 	<Form.Item>
		// 		<Button type="primary" block size="large" html-type="submit">
		// 			??????
		// 		</Button>
		// 	</Form.Item>
		// </Form>
		// );
	}
}
