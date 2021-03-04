import { Card, Col, Drawer, Layout, Row } from "ant-design-vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
import { IssuesData } from "@/store/models/issues/types";
const IssuesStore = namespace("issues");
const AccountStore = namespace("account");
import draggable from "vuedraggable";
import IssuesDragItem from "@/components/Issues/IssuesDragItem";
import IssuesInfo from "@/components/Issues/IssuesInfo";
@Component({
	components: {
		draggable,
	},
})
export default class Dashboard extends Vue {
	@IssuesStore.Getter("myIssuesList") myIssuesList!: Array<IssuesData>;
	@IssuesStore.Action("getMyIssuesList") getMyIssuesList!: Function;
	@IssuesStore.Action("updateIssues") updateIssues!: Function;
	@IssuesStore.Action("updateEditIssues") updateEditIssues!: Function;
	@AccountStore.Action("getAccountInfo") __getAccountInfo!: Function;

	myToDoIssuesList: Array<IssuesData> = [];
	myDoingIssuesList: Array<IssuesData> = [];
	myDoneIssues: Array<IssuesData> = [];
	issueInfoDrawer: boolean = false;

	async created() {
		await this.getMyIssuesList();
	}

	@Watch("myIssuesList", { immediate: true, deep: true })
	watchMyIssuesList() {
		console.log("__myIssuesList", this.myIssuesList);
		this.updateDnDIssuesList();
	}

	mounted() {}

	updateDnDIssuesList() {
		this.myToDoIssuesList = [];
		this.myDoingIssuesList = [];
		this.myDoneIssues = [];
		this.myIssuesList.map((item) => {
			if (item.status === "doing") {
				this.myDoingIssuesList.push(item);
			} else if (item.status == "done") {
				this.myDoneIssues.push(item);
			} else if (item.status == "todo") {
				this.myToDoIssuesList.push(item);
			}
		});
	}

	async issueListChange(
		issue: {
			added?: { element: IssuesData };
			removed?: { element: IssuesData };
		},
		type: string
	) {
		console.log("issue", issue);
		if (issue.added) {
			this.updateEditIssues(issue.added.element);
			const params = {
				status: type,
			};
			await this.updateIssues(params);
		}
		if (issue.removed) {
		}
	}

	issuesInfoShow(issue: IssuesData) {
		this.updateEditIssues(issue);
		this.issueInfoDrawer = !this.issueInfoDrawer;
	}

	protected render() {
		return (
			<div class={style.dashboard}>
				<Row gutter={8}>
					<Col span="8">
						<Card title="todo">
							<draggable
								list={this.myToDoIssuesList}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "todo");
								}}
							>
								{this.renderItem(this.myToDoIssuesList)}
							</draggable>
						</Card>
					</Col>
					<Col span="8">
						<Card title="doing">
							<draggable
								list={this.myDoingIssuesList}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "doing");
								}}
							>
								{this.renderItem(this.myDoingIssuesList)}
							</draggable>
						</Card>
					</Col>
					<Col span="8">
						<Card title="done">
							<draggable
								list={this.myDoneIssues}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "done");
								}}
							>
								{this.renderItem(this.myDoneIssues)}
							</draggable>
						</Card>
					</Col>
				</Row>
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

	renderItem(itemList: Array<IssuesData>) {
		return itemList.map((item) => {
			return (
				<IssuesDragItem item={item} on-itemInfoClick={this.issuesInfoShow} />
			);
		});
	}
}
