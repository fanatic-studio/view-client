import Logo from "@/components/Common/Logo";
import RightBox from "@/components/Common/RightBox";
import { ProjectMode } from "@/store/models/project/types";
import { Icon, Layout, Menu } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const ProjectStore = namespace("project");
const MilestoneStore = namespace("milestone");
const ApplicationStore = namespace("application");
const PlanStore = namespace("plan");
import style from "./index.less";
@Component
export default class AppLayout extends Vue {
	@ProjectStore.Action("getProjectLis") getProjectLis!: Function;
	@ProjectStore.Action("getProjectMemberLis") getProjectMemberLis!: Function;
	@MilestoneStore.Action("getMilestoneList") getMilestoneList!: Function;
	@ApplicationStore.Action("getApplicationList")
	__getApplicationList!: Function;
	@ProjectStore.Getter("projectList") projectList!: Array<ProjectMode>;
	@PlanStore.Action("getMonthPlan") __getMonthPlan!: Function;

	async created() {
		const pjParams = {
			pageIndex: 1,
			pageSize: 10,
			status: "",
		};
		await this.getProjectLis(pjParams);
		const pjmParams = {
			pageIndex: 1,
			pageSize: 100,
			status: "",
		};
		await this.getProjectMemberLis(pjmParams);
		const milsParams = {
			pageIndex: 1,
			pageSize: 10,
			status: "",
		};
		await this.getMilestoneList(milsParams);
		const appParams = {
			pageIndex: 1,
			pageSize: 10,
			status: "",
		};
		await this.__getApplicationList(appParams);

		await this.__getMonthPlan({ planId: "" });
	}

	opereateMenu(): void {
		// 路由跳转
		this.$router.push("/app");
	}
	protected render() {
		return (
			<Layout class={style.appLayout}>
				<Layout.Header class={style.header}>
					<Logo on-iconClick={this.opereateMenu} />
					<RightBox />
				</Layout.Header>
				<Layout.Content class={style.content}>
					<transition mode="out-in" name="slide">
						<router-view />
					</transition>
				</Layout.Content>
			</Layout>
		);
	}

	renderProjectList() {
		if (this.projectList.length > 0) {
			return this.projectList.map((item) => {
				return (
					<Menu.Item key={item.name}>
						<Icon type="appstore"></Icon>
						<span>{item.cName}</span>
					</Menu.Item>
				);
			});
		}
	}
}
