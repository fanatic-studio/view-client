import { RequirementData } from '@/store/models/requirement/types';
import {
	Alert,
	Avatar,
	Button,
	Card,
	Icon,
	Tag,
	Tooltip,
} from 'ant-design-vue';
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import moment from 'moment';
import style from './index.less';
import { ProgressRateList } from '../RequirementData';
import { namespace } from 'vuex-class';
import { AccountInfo } from '@/store/models/account/types';
const AccountStore = namespace('account');
@Component
export default class RequirementItem extends Vue {
	@AccountStore.Getter('accountInfo') accountInfo!: AccountInfo;
	@Prop(Object) readonly item!: RequirementData;

	@Emit()
	itemEditClick() {
		this.$emit('itemEditClick', this.item);
	}
	@Emit()
	itemInfoClick() {
		this.$emit('itemInfoClick', this.item);
	}

	progressName(e: number) {
		let label = '';
		ProgressRateList.map((item) => {
			if (item.progress === e) {
				console.log('item.progress', e, item.label);
				label = item.label;
			}
		});
		return label;
	}

	render() {
		return (
			<div class={style.requirementItem}>
				<div class={style.itemContent}>
					<div>
						<div class={style.baseInfo}>
							{this.renderType()}
							<div class={style.title}>{this.item.name}</div>
							<div class={style.desc}>{this.item.desc}</div>
							<Tag>{this.progressName(this.item.progressRate)}</Tag>
						</div>
						<div class={style.otherInfo}>
							<div class={style.otherInfoItem}>{this.renderPriority()}</div>
							<div class={style.otherInfoItem}>
								<Tooltip placement="top">
									<div slot="title">里程碑</div>
									<Tag>
										<Icon class={style.otherInfoItemIcon} type="clock-circle" />
										{this.item.milestoneData.milestoneName}
									</Tag>
								</Tooltip>
							</div>
							<div class={style.otherInfoItem}>
								<Tooltip placement="top">
									<div slot="title">开始时间</div>
									<Tag>
										<Icon class={style.otherInfoItemIcon} type="check-square" />
										{moment(this.item.startAt).format('YYYY-MM-DD HH:mm:ss')}
									</Tag>
								</Tooltip>
								<Tooltip placement="top">
									<div slot="title">上线时间</div>
									<Tag>
										<Icon class={style.otherInfoItemIcon} type="check-square" />
										{moment(this.item.onlineAt).format('YYYY-MM-DD HH:mm:ss')}
									</Tag>
								</Tooltip>
							</div>
						</div>
					</div>
					<div class={style.requirementItemAssignee}>
						{this.renderAssignee()}
						{this.renderFrontAssignee()}
						{this.renderServerAssignee()}
						{this.renderUiAssignee()}
					</div>
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

	renderType() {
		if (this.item.type === 'product') {
			return (
				<Tag class={style.requirementTag} color="#2db7f5">
					产品需求
				</Tag>
			);
		}
		if (this.item.type === 'operation') {
			return (
				<Tag class={style.requirementTag} color="#87d068">
					运营需求
				</Tag>
			);
		}
	}
	renderPriority() {
		if (this.item.priority === 'p1') {
			return (
				<Tag class={style.requirementTag} color="red">
					P1
				</Tag>
			);
		}
		if (this.item.priority === 'p2') {
			return (
				<Tag class={style.requirementTag} color="blue">
					P2
				</Tag>
			);
		}
		if (this.item.priority === 'p3') {
			return (
				<Tag class={style.requirementTag} color="orange">
					P3
				</Tag>
			);
		}
	}

	renderMilestone() {}
	renderAssignee() {
		if (this.item.assigneeData.accountId !== '') {
			return (
				<Tooltip placement="top">
					<div slot="title">负责人：{this.item.assigneeData.nickName}</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						{this.item.assigneeData.nickName}
					</Avatar>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip placement="top">
					<div slot="title">负责人：未指派</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						?
					</Avatar>
				</Tooltip>
			);
		}
	}
	renderFrontAssignee() {
		if (this.item.frontAssigneeData.accountId !== '') {
			return (
				<Tooltip placement="top">
					<div slot="title">
						前端负责人：{this.item.frontAssigneeData.nickName}
					</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						{this.item.frontAssigneeData.nickName}
					</Avatar>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip placement="top">
					<div slot="title">前端负责人：未指派</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						?
					</Avatar>
				</Tooltip>
			);
		}
	}
	renderServerAssignee() {
		if (this.item.serverAssigneeData.accountId !== '') {
			return (
				<Tooltip placement="top">
					<div slot="title">
						后端负责人：{this.item.serverAssigneeData.nickName}
					</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						{this.item.serverAssigneeData.nickName}
					</Avatar>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip placement="top">
					<div slot="title">后端负责人：未指派</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						?
					</Avatar>
				</Tooltip>
			);
		}
	}
	renderUiAssignee() {
		if (this.item.uiAssigneeData.accountId !== '') {
			return (
				<Tooltip placement="top">
					<div slot="title">UI负责人：{this.item.uiAssigneeData.nickName}</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						{this.item.uiAssigneeData.nickName}
					</Avatar>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip placement="top">
					<div slot="title">UI负责人：未指派</div>
					<Avatar class={style.requirementItemAssigneeItem} size="large">
						?
					</Avatar>
				</Tooltip>
			);
		}
	}

	renderInfoButon() {
		if (this.item.status !== 'done') {
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
