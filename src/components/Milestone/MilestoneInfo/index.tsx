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
	Alert,
} from "ant-design-vue";
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ProjectStore = namespace("project");
const MilestoneStore = namespace("milestone");
import moment from "moment";
import style from "./index.less";
import { ProjectMemberMode } from "@/store/models/project/types";
import { MilestoneMode } from "@/store/models/milestone/types";
import { IssuesData } from "@/store/models/issues/types";
import IssuesListItem from "@/components/Issues/IssuesListItem";

@Component
export default class MilestoneInfo extends Vue {
	@MilestoneStore.Action("updateMilestone") updateMilestone!: Function;
	@ProjectStore.Getter("projectMemberList") projectMemberList!: Array<
		ProjectMemberMode
	>;
	@MilestoneStore.Getter("currEditMilestone")
	currEditMilestone!: MilestoneMode;

	createIssues() {
		this.$router.push("/work/myIssues");
	}

	protected render() {
		return (
			<Row gutter={8}>
				<Col span="12">
					<Card title={this.currEditMilestone.name}>{this.renderForm()}</Card>
				</Col>
				<Col span="12">
					<Card title="需求拆分Issues">
						<Button type="link" slot="extra" on-click={this.createIssues}>
							添加issue
						</Button>
						{this.renderIssuesList(this.currEditMilestone.issueList)}
					</Card>
				</Col>
			</Row>
		);
	}
	protected renderForm() {
		return (
			<div class={style.milestoneInfo}>
				<Alert class={style.desc} message={this.currEditMilestone.desc}></Alert>
				<div>
					<mavon-editor
						value={this.currEditMilestone.content}
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
						<div slot="title">负责人</div>
						<Tag>
							<Icon class={style.otherInfoItemIcon} type="user" />
							{this.currEditMilestone.assigneeData.nickName}
						</Tag>
					</Tooltip>
					<Tooltip placement="top">
						<div slot="title">结束时间</div>
						<Tag>
							<Icon type="calendar" />
							{moment(this.currEditMilestone.onlineAt).format(
								"YYYY-MM-DD HH:mm:ss"
							)}
						</Tag>
					</Tooltip>
				</div>
			</div>
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
			return <IssuesListItem item={item} showBtns={false} showDesc={false} />;
		});
	}
}
