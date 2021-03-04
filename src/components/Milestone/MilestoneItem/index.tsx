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
import { MilestoneMode } from "@/store/models/milestone/types";
import { namespace } from "vuex-class";
import { AccountInfo } from "@/store/models/account/types";
const AccountStore = namespace("account");
@Component
export default class MilestoneItem extends Vue {
	@AccountStore.Getter("accountInfo") accountInfo!: AccountInfo;
	@Prop(Object) readonly item!: MilestoneMode;

	@Emit()
	itemEditClick() {
		this.$emit("itemEditClick", this.item);
	}
	@Emit()
	itemInfoClick() {
		this.$emit("itemInfoClick", this.item);
	}

	render() {
		return (
			<div class={style.milestoneItem}>
				<div class={style.left}>
					<Avatar size="large">{this.item.assigneeData.nickName}</Avatar>
					<div class={style.content}>
						<div class={style.milsBashInfo}>
							<div class={style.title}>{this.item.name}</div>
							<div class={style.desc}>{this.item.desc}</div>
						</div>
						<div class={style.timeInfoItem}>
							<Tooltip placement="top">
								<div slot="title">开始时间</div>
								<Tag>
									<Icon class={style.otherInfoItemIcon} type="check-square" />
									{moment(this.item.startAt).format("YYYY-MM-DD HH:mm:ss")}
								</Tag>
							</Tooltip>
							<Tooltip placement="top">
								<div slot="title">上线时间</div>
								<Tag>
									<Icon class={style.otherInfoItemIcon} type="check-square" />
									{moment(this.item.onlineAt).format("YYYY-MM-DD HH:mm:ss")}
								</Tag>
							</Tooltip>
						</div>
					</div>
					<div class={style.milsProgressItem}>{this.renderProgress()}</div>
				</div>
				<div class={style.right}>
					<Button type="link" on-click={this.itemInfoClick}>
						详情
					</Button>
					{this.renderInfoButon()}
				</div>
			</div>
		);
	}
	renderProgress() {
		const d = this.item.issuesProgress.done / this.item.issuesProgress.total;
		const p = Math.round(d * 100);
		return <Progress percent={p} status="active" />;
	}
	renderInfoButon() {
		if (this.item.status !== "done") {
			if (
				this.accountInfo.accountData.roleId === 1 ||
				this.accountInfo.accountData.accountId === this.item.accountId ||
				this.accountInfo.accountData.accountId === this.item.assignee
			) {
				return (
					<Button type="link" on-click={this.itemEditClick}>
						编辑
					</Button>
				);
			}
		}
	}
}
