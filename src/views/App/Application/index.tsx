import {
	Alert,
	Avatar,
	Button,
	Card,
	Col,
	Drawer,
	List,
	Modal,
	Pagination,
	Row,
	Switch,
	Tabs,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import RequirementHeader from "@/components/Requirement/RequirementHeader";
import { ApplicationMode } from "@/store/models/application/types";
import ApplicationItem from "@/components/Application/ApplicationItem";
import ApplicationAdd from "@/components/Application/ApplicationAdd";
import ApplicationInfo from "@/components/Application/ApplicationInfo";
import ApplicationVersionList from "@/components/Application/ApplicationVersionList";
import ApplicationUpdateList from "@/components/Application/ApplicationUpdateList";

@Component
export default class Application extends Vue {
	@ApplicationStore.Getter("applicationList") applicationList!: Array<
		ApplicationMode
	>;
	@ApplicationStore.Getter("applicationListCount")
	applicationListCount!: number;
	@ApplicationStore.Action("getApplicationList") getApplicationList!: Function;
	@ApplicationStore.Action("updateEditApplication")
	updateEditApplication!: Function;

	addModal: boolean = false;
	controlDrawer: boolean = false;
	versionControlDrawer: boolean = false;
	updateControlDrawer: boolean = false;
	pageIndex: number = 1;
	pageSize: number = 10;

	async created() {
		await this.getAppLsit();
	}

	addModalHandle() {
		this.addModal = !this.addModal;
	}

	AppItemClick(item: ApplicationMode) {
		console.log("item", item);

		this.updateEditApplication(item);
		this.controlDrawer = !this.controlDrawer;
	}

	applicationVersionClick(item: ApplicationMode) {
		this.updateEditApplication(item);
		this.versionControlDrawer = !this.versionControlDrawer;
	}
	applicationUpdateClick(item: ApplicationMode) {
		this.updateEditApplication(item);
		this.updateControlDrawer = !this.updateControlDrawer;
	}

	async tabClick(e: string) {
		await this.getAppLsit(e);
	}

	async updateAppList() {
		await this.getAppLsit();
	}

	async getAppLsit(status?: string) {
		const params = {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			status: "",
		};
		if (status) {
			params.status = status;
		}
		await this.getApplicationList(params);
	}

	protected render() {
		return (
			<div class={style.application}>
				<Tabs
					slot="content"
					class={style.reqTabs}
					tabBarStyle={{
						padding: "0 24px",
					}}
					on-tabClick={this.tabClick}
				>
					<Tabs.TabPane key="all" tab="所有"></Tabs.TabPane>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addModalHandle}
					>
						添加工程
					</Button>
				</Tabs>
				<div class={style.applicationContent}>{this.renderAppList()}</div>
				<Modal
					title="新增工程"
					visible={this.addModal}
					width={800}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationAdd on-updateAppList={this.updateAppList} />
				</Modal>
				<Drawer
					title="工程信息"
					visible={this.controlDrawer}
					on-close={() => {
						this.controlDrawer = !this.controlDrawer;
					}}
					width={800}
				>
					<ApplicationInfo on-updateAppList={this.updateAppList} />
				</Drawer>
				<Drawer
					title="版本列表"
					visible={this.versionControlDrawer}
					on-close={() => {
						this.versionControlDrawer = !this.versionControlDrawer;
					}}
					width={1000}
				>
					<ApplicationVersionList on-updateAppList={this.updateAppList} />
				</Drawer>
				<Drawer
					title="热更新列表"
					visible={this.updateControlDrawer}
					on-close={() => {
						this.updateControlDrawer = !this.updateControlDrawer;
					}}
					width={1100}
				>
					<ApplicationUpdateList on-updateAppList={this.updateAppList} />
				</Drawer>
			</div>
		);
	}

	protected renderAppList() {
		return this.applicationList.map((item, index) => {
			return (
				<ApplicationItem
					item={item}
					on-itemClick={this.AppItemClick}
					on-applicationVersionClick={this.applicationVersionClick}
					on-applicationUpdateClick={this.applicationUpdateClick}
				/>
			);
		});
	}
}
