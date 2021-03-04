import { Avatar, Card, Steps, Tag, Tooltip } from "ant-design-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
import { MyProjectData, ProjectMode } from "@/store/models/project/types";
import { PlanData, PlanItemData } from "@/store/models/plan/types";
const ProjectStore = namespace("project");
@Component
export default class WorkProjectCard extends Vue {
	@ProjectStore.Action("getMyProjectList") getMyProjectList!: Function;
	@ProjectStore.Getter("myProjectList") myProjectList!: Array<MyProjectData>;
	@ProjectStore.Action("updateCurrProject") updateCurrProject!: Function;

	loading: boolean = false;
	async created() {
		const mpjParams = {
			pageIndex: 1,
			pageSize: 10,
		};
		await this.getMyProjectList(mpjParams);
	}

	projectItemClick(item: MyProjectData) {
		this.updateCurrProject(item.project);
		this.$router.push("/work");
	}
	protected render() {
		return (
			<Card
				class={style.workProjectCard}
				loading={this.loading}
				bordered={false}
				title="进行中的项目"
				bodyStyle={{ padding: "0" }}
			>
				{this.renderProjectList()}
			</Card>
		);
	}

	renderProjectList() {
		return this.myProjectList.map((item) => {
			return (
				<Card.Grid
					class={style.projectCardGrid}
					on-click={() => {
						this.projectItemClick(item);
					}}
				>
					<Card bordered={false} bodyStyle={{ padding: "0" }}>
						<Card.Meta>
							<div slot="title" class={style.cardTitle}>
								<Avatar size="small">{item.project.name}</Avatar>
								<a>{item.project.cName}</a>
							</div>
							<div slot="description" class={style.cardDescription}>
								{item.project.desc}
							</div>
						</Card.Meta>
						<div class={style.projectItem}>
							{this.renderPlan(item.plan)}
							{this.renderPlanItem(item.planItem)}
						</div>
					</Card>
				</Card.Grid>
			);
		});
	}

	renderPlan(item: PlanData) {
		return (
			<Tooltip
				placement="right"
				overlayStyle={{ width: "400px", maxWidth: "400px" }}
			>
				<div slot="title">
					<div>{item.desc}</div>
					<mavon-editor
						value={item.content}
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
				</div>
				<div>
					<Tag color="purple">{`${item.year}年${item.month}月`}</Tag>
					{item.name}
				</div>
			</Tooltip>
		);
	}

	renderPlanItem(item: Array<PlanItemData>) {
		return item.map((item) => {
			return (
				<Tooltip
					placement="bottom"
					overlayStyle={{ width: "400px", maxWidth: "400px" }}
				>
					<div slot="title">
						<mavon-editor
							value={item.desc}
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
					</div>
					<div>
						<Tag color="orange">{`第${item.week}周`}</Tag>
						{this.renderPlanItemType(item.type)}
						{item.name}
					</div>
				</Tooltip>
			);
		});
	}
	renderPlanItemType(type: string) {
		if (type === "development") {
			return <Tag color="blue">研发</Tag>;
		}
		if (type === "operation") {
			return <Tag color="green">运营</Tag>;
		}
	}
}
