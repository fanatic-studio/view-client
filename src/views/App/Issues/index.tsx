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
const IssuesStore = namespace("issues");
import RequirementHeader from "@/components/Requirement/RequirementHeader";
import { IssuesData } from "@/store/models/issues/types";
import IssuesListItem from "@/components/Issues/IssuesListItem";
import IssuesAdd from "@/components/Issues/IssuesAdd";
import IssuesEdit from "@/components/Issues/IssuesEdit";
import IssuesInfo from "@/components/Issues/IssuesInfo";

@Component
export default class Issues extends Vue {
	@IssuesStore.Getter("issuesList") issuesList!: Array<IssuesData>;
	@IssuesStore.Getter("issuesListCount") issuesListCount!: number;
	@IssuesStore.Action("getIssuesList") __getIssuesList!: Function;
	@IssuesStore.Action("updateEditIssues") updateEditIssues!: Function;

	addModal: boolean = false;
	issueEditDrawer: boolean = false;
	issueInfoDrawer: boolean = false;
	pageIndex: number = 1;
	pageSize: number = 8;
	issueStatus: string = "doing";

	async created() {
		await this.getIssuesList();
	}

	addModalHandle() {
		this.addModal = !this.addModal;
	}

	issueEditClick(item: IssuesData) {
		this.updateEditIssues(item);
		this.issueEditDrawer = !this.issueEditDrawer;
	}
	issueInfoClick(item: IssuesData) {
		this.updateEditIssues(item);
		this.issueInfoDrawer = !this.issueInfoDrawer;
	}

	async tabClick(e: string) {
		this.issueStatus = e;
		await this.getIssuesList();
	}

	async updateIssuesList() {
		console.log("更新issues 列表");

		await this.getIssuesList();
	}

	async getIssuesList() {
		const params = {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			status: this.issueStatus,
		};
		console.log("params", params);

		await this.__getIssuesList(params);
	}

	protected render() {
		return (
			<div class={style.requirement}>
				<Tabs
					slot="content"
					class={style.reqTabs}
					defaultActiveKey="doing"
					tabBarStyle={{
						padding: "0 24px",
					}}
					on-tabClick={this.tabClick}
				>
					<Tabs.TabPane key="doing" tab="进行中"></Tabs.TabPane>
					<Tabs.TabPane key="todo" tab="未开始"></Tabs.TabPane>
					<Tabs.TabPane key="done" tab="已完成"></Tabs.TabPane>
					<Tabs.TabPane key="all" tab="所有"></Tabs.TabPane>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addModalHandle}
					>
						添加Issue
					</Button>
				</Tabs>
				<div class={style.requirementContent}>
					{this.renderIssuesList()}
					<Pagination
						class={style.requirementContentPagination}
						pageSize={this.pageSize}
						total={this.issuesListCount}
						show-less-items
						on-change={async (page: any) => {
							this.pageIndex = page;
							console.log(page);
							await this.getIssuesList();
						}}
					/>
				</div>
				<Modal
					title="新增Issue"
					visible={this.addModal}
					width={800}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addModalHandle}
					maskClosable={false}
					footer={null}
				>
					<IssuesAdd on-updateIssuesList={this.updateIssuesList} />
				</Modal>
				<Drawer
					title="编辑"
					visible={this.issueEditDrawer}
					on-close={() => {
						this.issueEditDrawer = !this.issueEditDrawer;
					}}
					width={800}
				>
					<IssuesEdit on-updateNotice={this.updateIssuesList} />
				</Drawer>
				<Drawer
					title="详情"
					visible={this.issueInfoDrawer}
					on-close={() => {
						this.issueInfoDrawer = !this.issueInfoDrawer;
					}}
					width={1000}
				>
					<IssuesInfo />
				</Drawer>
			</div>
		);
	}

	protected renderIssuesList() {
		return this.issuesList.map((item, index) => {
			return (
				<IssuesListItem
					item={item}
					on-itemEditClick={this.issueEditClick}
					on-itemInfoClick={this.issueInfoClick}
				/>
			);
		});
	}
}
