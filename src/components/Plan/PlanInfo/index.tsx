import {
	Avatar,
	Card,
	Col,
	Collapse,
	Icon,
	Row,
	Tag,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import style from "./index.less";
import { PlanItemData, PlanData } from "@/store/models/plan/types";

@Component
export default class PlanInfo extends Vue {
	@Prop(Object) readonly item!: PlanData;

	@Emit()
	planClick() {
		this.$emit("planClick", this.item);
	}

	@Emit()
	planItemAddClick(e: string) {
		this.$emit("planItemAddClick", e, this.item);
	}

	@Emit()
	planItemEditClick(item: PlanItemData) {
		this.$emit("planItemEditClick", item);
	}

	goMilestone() {
		this.$router.push("myMilestone");
	}

	customStyle = {
		border: 0,
	};

	render() {
		return (
			<div class={style.planItem}>
				<Row gutter={8} class={style.contentInfo}>
					<Col span="8">
						<Card bodyStyle={{ padding: "0" }}>
							<div class={style.baseInfo} slot="title">
								<div class={style.header}>
									<div>
										<Tag clss="timeinfo">
											{this.item.year}年{this.item.month}月
										</Tag>
									</div>
									<div class={style.title}>{this.item.name}</div>
									<Tooltip placement="top">
										<div slot="title">
											负责人：{this.item.assigneeData.nickName}
										</div>
										<Avatar size="small">
											{this.item.assigneeData.nickName}
										</Avatar>
									</Tooltip>
								</div>
								<div class={style.desc}>{this.item.desc}</div>
							</div>
							<Icon type="form" slot="extra" on-click={this.planClick} />
							<Collapse
								class={style.planItemCollapse}
								expandIconPosition="right"
								defaultActiveKey="desc"
							>
								<Collapse.Panel
									key="desc"
									header="本月工作计划内容"
									style={this.customStyle}
								>
									<mavon-editor
										class={style.mavonEditorPreview}
										value={this.item.content}
										style={{ zIndex: 1, cursor: "pointer" }}
										previewBackground="#ffffff"
										defaultOpen="preview"
										boxShadow={false}
										editable={false}
										subfield={false}
										toolbarsFlag={false}
									></mavon-editor>
								</Collapse.Panel>
								<Collapse.Panel
									key="report"
									header="本月工作计划总结"
									style={this.customStyle}
								>
									<mavon-editor
										class={style.mavonEditorPreview}
										value={this.item.report}
										style={{ zIndex: 1, cursor: "pointer" }}
										previewBackground="#ffffff"
										defaultOpen="preview"
										boxShadow={false}
										editable={false}
										subfield={false}
										toolbarsFlag={false}
									></mavon-editor>
								</Collapse.Panel>
							</Collapse>
						</Card>
					</Col>
					<Col span="8">
						<Card title="每周研发计划" bodyStyle={{ padding: "0" }}>
							<Icon
								type="plus-circle"
								slot="extra"
								on-click={() => {
									this.planItemAddClick("development");
								}}
							/>

							<Collapse
								class={style.planItemCollapse}
								expandIconPosition="right"
							>
								{this.renderPlanItem(this.item.development)}
							</Collapse>
						</Card>
					</Col>
					<Col span="8">
						<Card title="每周运营计划" bodyStyle={{ padding: "0" }}>
							<Icon
								type="plus-circle"
								slot="extra"
								on-click={() => {
									this.planItemAddClick("operation");
								}}
							/>
							<Collapse
								class={style.planItemCollapse}
								expandIconPosition="right"
							>
								{this.renderPlanItem(this.item.operation)}
							</Collapse>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}

	renderPlanItem(planitemList: Array<PlanItemData> | undefined) {
		if (planitemList && planitemList.length > 0)
			return planitemList.map((item) => {
				return (
					<Collapse.Panel
						key={item.planItemId}
						header={item.name}
						style={this.customStyle}
					>
						<Icon
							type="form"
							slot="extra"
							on-click={() => {
								this.planItemEditClick(item);
							}}
						/>
						<mavon-editor
							value={item.desc}
							class={style.mavonEditorPreview}
							style={{ zIndex: 1, cursor: "pointer" }}
							previewBackground="#ffffff"
							defaultOpen="preview"
							boxShadow={false}
							boxShadowStyle="0 2px 12px 0 rgba(0, 0, 0, 0)"
							editable={false}
							subfield={false}
							toolbarsFlag={false}
						></mavon-editor>

						<Tooltip
							placement="top"
							overlayStyle={{ width: "400px", maxWidth: "400px" }}
						>
							<div slot="title">
								<div>{item.milestoneData.desc}</div>
								<mavon-editor
									value={item.milestoneData.content}
									class={style.mavonEditorTooltipPreview}
									style={{
										zIndex: 1,
										cursor: "pointer",
										background: "unset",
										color: "#fff",
									}}
									previewBackground=""
									defaultOpen="preview"
									boxShadow={false}
									boxShadowStyle="0 2px 12px 0 rgba(0, 0, 0, 0)"
									editable={false}
									subfield={false}
									toolbarsFlag={false}
								></mavon-editor>
								{/* <div>{item.milestoneData.content}</div> */}
							</div>
							<Tag on-click={this.goMilestone}>{item.milestoneData.name}</Tag>
						</Tooltip>
					</Collapse.Panel>
				);
			});
	}
}
