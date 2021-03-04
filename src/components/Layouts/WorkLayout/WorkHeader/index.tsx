import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.less";
const PlanStore = namespace("plan");
import { namespace } from "vuex-class";
import { PlanData } from "@/store/models/plan/types";
import { Alert, Tag, Tooltip } from "ant-design-vue";

@Component
export default class WorkHeader extends Vue {
	@PlanStore.Getter("currMonthPlan") __currMonthPlan!: PlanData;

	protected render() {
		return <div class={style.workHeader}>{this.renderPageHeader()}</div>;
	}
	renderPageHeader() {
		if (this.__currMonthPlan.year) {
			return (
				<div class={style.content}>
					<div class={style.header}>
						<Tag>{`${this.__currMonthPlan.year}年${this.__currMonthPlan.month}月工作目标`}</Tag>
						<div class={style.title}>{this.__currMonthPlan.name}</div>
					</div>
					<Tooltip
						placement="bottom"
						overlayStyle={{
							width: "400px",
							maxWidth: "400px",
						}}
					>
						<div slot="title">
							<mavon-editor
								value={this.__currMonthPlan.content}
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
						<Alert
							style={{ width: "800px" }}
							banner
							message={this.__currMonthPlan.desc}
							type="info"
							show-icon
						/>
					</Tooltip>
				</div>
			);
		}
	}
}
