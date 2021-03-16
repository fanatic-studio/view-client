import { RequirementData } from '@/store/models/requirement/types';
import { Icon, Button, Tag, Tooltip, Alert } from 'ant-design-vue';
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const RequirementStore = namespace('requirement');
import moment from 'moment';
import style from './index.less';
import {
	ProgressRateList,
	RequirementType,
	RequirementPriority,
	RequirementStatus,
} from '../RequirementData';

@Component
export default class RequirementInfo extends Vue {
	@RequirementStore.Getter('currEditRequirement')
	currEditRequirement!: RequirementData;

	getTypeLabel(e: string) {
		let typeLabel = '';
		RequirementType.map((item) => {
			if (item.key === e) {
				typeLabel = item.label;
			}
		});

		return typeLabel;
	}

	getPriorityLabel(e: string) {
		let priorityLabel = '';
		RequirementPriority.map((item) => {
			if (item.key === e) {
				priorityLabel = item.label;
			}
		});

		return priorityLabel;
	}

	getStatusLabel(e: string) {
		let statusLabel = '';
		RequirementStatus.map((item) => {
			if (item.key === e) {
				statusLabel = item.label;
			}
		});

		return statusLabel;
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

	openDocUrl(url: string) {
		window.open(url, '_blank');
	}

	protected render() {
		return (
			<div class={style.requirementInfo}>
				<div class={style.header}>
					<Tag>{this.getTypeLabel(this.currEditRequirement.type)}</Tag>
					<Tag>{this.getPriorityLabel(this.currEditRequirement.priority)}</Tag>
					<Tag> {this.getStatusLabel(this.currEditRequirement.status)}</Tag>
					<div class={style.title}>{this.currEditRequirement.name}</div>
				</div>
				<Alert
					class={style.desc}
					message={this.currEditRequirement.desc}
				></Alert>
				<div>
					<mavon-editor
						value={this.currEditRequirement.desc}
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
						<div slot="title">里程碑</div>
						<Tag>
							<Icon class={style.otherInfoItemIcon} type="clock-circle" />
							{this.currEditRequirement.milestoneData.milestoneName}
						</Tag>
					</Tooltip>
					<Tooltip placement="top">
						<div slot="title">结束时间</div>
						<Tag>
							<Icon type="calendar" />
							{moment(this.currEditRequirement.onlineAt).format(
								'YYYY-MM-DD HH:mm:ss'
							)}
						</Tag>
					</Tooltip>
				</div>
				<Button
					type="link"
					on-click={() => {
						this.openDocUrl(this.currEditRequirement.competitorAnalysisUrl);
					}}
				>
					竞品分析文档
				</Button>
				<Button
					type="link"
					on-click={() => {
						this.openDocUrl(this.currEditRequirement.requirementDocUrl);
					}}
				>
					需求文档
				</Button>
				<Button
					type="link"
					on-click={() => {
						this.openDocUrl(this.currEditRequirement.requirementUiUrl);
					}}
				>
					UI文档
				</Button>
				<Button
					type="link"
					on-click={() => {
						this.openDocUrl(this.currEditRequirement.requirementCodeUrl);
					}}
				>
					程序文档
				</Button>
			</div>
		);
	}
}
