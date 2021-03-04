import { RequirementData } from "@/store/models/requirement/types";
import {
	Alert,
	Avatar,
	Button,
	Card,
	Icon,
	Progress,
	Tag,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import moment from "moment";
import style from "./index.less";
import { IssuesData } from "@/store/models/issues/types";
import { IssuesPriority, IssuesStatus, IssuesType } from "../IssuesData";
import { namespace } from "vuex-class";
import { AccountInfo } from "@/store/models/account/types";
const AccountStore = namespace("account");

@Component
export default class IssuesDragItem extends Vue {
	@AccountStore.Getter("accountInfo") accountInfo!: AccountInfo;
	@Prop(Object) readonly item!: IssuesData;
	@Prop({ default: true }) readonly showBtns!: boolean;
	@Prop({ default: true }) readonly showDesc!: boolean;

	@Emit()
	itemEditClick() {
		this.$emit("itemEditClick", this.item);
	}
	@Emit()
	itemInfoClick() {
		this.$emit("itemInfoClick", this.item);
	}

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

	getIssueStatus(e: string) {
		let statusLabel = "";
		let stastuColor = "";
		IssuesStatus.map((item) => {
			if (item.key === e) {
				statusLabel = item.label;
				stastuColor = item.color;
			}
		});

		return { statusLabel, stastuColor };
	}

	render() {
		return (
			<Card.Grid class={style.IssuesDragItem} on-click={this.itemInfoClick}>
				<Tooltip placement="top">
					<div slot="title">负责人</div>
					<Avatar size="large">{this.item.assigneeData.nickName}</Avatar>
				</Tooltip>
				<div class={style.item}>
					<div class={style.left}>
						<div class={style.baseInfo}>
							{this.renderStatus()}
							<Tag> {this.getIssueType(this.item.type)}</Tag>
							<Tag> {this.getPriority(this.item.priority)}</Tag>
							<div class={style.title}>{this.item.name}</div>
						</div>
						<div>
							<Tooltip placement="top">
								<div slot="title">工程</div>
								<Tag>
									<Icon type="appstore" />
									{this.item.appData.cName}
								</Tag>
							</Tooltip>
							<Tooltip placement="top">
								<div slot="title">里程碑</div>
								<Tag>
									<Icon class={style.otherInfoItemIcon} type="clock-circle" />
									{this.item.milestoneData.name}
								</Tag>
							</Tooltip>
							<Tooltip placement="top">
								<div slot="title">需求</div>
								<Tag>
									<Icon type="snippets" />
									{this.item.requirementData.name}
								</Tag>
							</Tooltip>
							<Tooltip placement="top">
								<div slot="title">创建者</div>
								<Tag>
									<Icon class={style.otherInfoItemIcon} type="user" />
									{this.item.ownerData.nickName}
								</Tag>
							</Tooltip>
							<Tooltip placement="top">
								<div slot="title">结束时间</div>
								<Tag>
									<Icon type="calendar" />
									{moment(this.item.endAt).format("YYYY-MM-DD HH:mm:ss")}
								</Tag>
							</Tooltip>
						</div>
					</div>
				</div>
			</Card.Grid>
		);
	}

	renderStatus() {
		let statusData = this.getIssueStatus(this.item.status);

		return <Tag color={statusData.stastuColor}> {statusData.statusLabel}</Tag>;
	}

	renderDesc() {
		if (this.showDesc) {
			return <div class={style.desc}>{this.item.desc}</div>;
		}
	}
}
