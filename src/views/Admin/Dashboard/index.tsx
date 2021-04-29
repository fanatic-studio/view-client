import { Card, Col, Drawer, Layout, Row } from "ant-design-vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
import { AllIssuesData, IssuesData } from "@/store/models/issues/types";
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
	@IssuesStore.Getter("allIssuesList") allIssuesList!: Array<AllIssuesData>;
	@IssuesStore.Action("getAllIssueList") getAllIssueList!: Function;
	@IssuesStore.Action("updateIssues") updateIssues!: Function;
	@IssuesStore.Action("updateEditIssues") updateEditIssues!: Function;
	@AccountStore.Action("getAccountInfo") __getAccountInfo!: Function;

	myToDoIssuesList: Array<IssuesData> = [];
	myDoingIssuesList: Array<IssuesData> = [];
	myDoneIssues: Array<IssuesData> = [];
	issueInfoDrawer: boolean = false;

	allIssuesDragList: Array<any> = [];

	async created() {
		await this.getAllIssueList();
	}

	@Watch("allIssuesList", { immediate: true, deep: true })
	watchMyIssuesList() {
		console.log("allIssuesList", this.allIssuesList);
		this.updateDnDIssuesList();
	}

	mounted() {}

	updateDnDIssuesList() {
		this.allIssuesDragList = [];
		this.allIssuesList.map((item) => {
			let todo: Array<IssuesData> = [];
			let doing: Array<IssuesData> = [];
			let done: Array<IssuesData> = [];
			item.issuesList.map((issue) => {
				if (issue.status === "doing") {
					doing.push(issue);
				} else if (issue.status == "done") {
					done.push(issue);
				} else if (issue.status == "todo") {
					todo.push(issue);
				}
			});
			this.allIssuesDragList.push({
				accountId: item.accountId,
				nickName: item.nickName,
				role: item.role,
				todo: todo,
				doing: doing,
				done: done,
			});
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

	render() {
		return <div class={style.dashboard}>{this.renderList()}</div>;
	}

	renderList() {
		return this.allIssuesDragList.map((item) => {
			return (
				<Card
					title={item.nickName}
					bordered={false}
					bodyStyle={{ padding: "16px 0" }}
				>
					{this.renderIssuesList(item.todo, item.doing, item.done)}
				</Card>
			);
		});
	}

	protected renderIssuesList(
		todo: Array<IssuesData>,
		doing: Array<IssuesData>,
		done: Array<IssuesData>
	) {
		return (
			<div>
				<Row gutter={8}>
					<Col span="8">
						<Card title="todo">
							<draggable
								list={todo}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "todo");
								}}
							>
								{this.renderItem(todo)}
							</draggable>
						</Card>
					</Col>
					<Col span="8">
						<Card title="doing">
							<draggable
								list={doing}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "doing");
								}}
							>
								{this.renderItem(doing)}
							</draggable>
						</Card>
					</Col>
					<Col span="8">
						<Card title="done">
							<draggable
								list={done}
								group="people"
								on-change={async (item: any) => {
									await this.issueListChange(item, "done");
								}}
							>
								{this.renderItem(done)}
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
