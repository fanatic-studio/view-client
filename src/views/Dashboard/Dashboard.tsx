import { Card, Col, Drawer, Layout, Row } from 'ant-design-vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import styles from './index.less';
import { namespace } from 'vuex-class';
import { IssuesData } from '@/store/models/issues/types';
const IssuesStore = namespace('issues');
const AccountStore = namespace('account');
import draggable from 'vuedraggable';
import IssuesDragItem from '@/components/Issues/IssuesDragItem';
import IssuesInfo from '@/components/Issues/IssuesInfo';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardProjectCard from '@/components/Dashboard/DashboardProjectCard';
@Component({
	components: {
		draggable,
	},
})
export default class Dashboard extends Vue {
	@IssuesStore.Getter('myIssuesList') __myIssuesList: Array<IssuesData>;
	@IssuesStore.Action('getMyIssuesList') getMyIssuesList!: Function;
	@IssuesStore.Action('updateIssues') updateIssues!: Function;
	@IssuesStore.Action('updateEditIssues') updateEditIssues!: Function;
	@AccountStore.Action('getAccountInfo') __getAccountInfo!: Function;

	myToDoIssuesList: Array<IssuesData> = [];
	myDoingIssuesList: Array<IssuesData> = [];
	myDoneIssues: Array<IssuesData> = [];
	issueInfoDrawer: boolean = false;

	async created() {
		await this.getMyIssuesList();
	}

	@Watch('myIssuesList', { immediate: true, deep: true })
	watchMyIssuesList() {
		console.log('__myIssuesList', this.__myIssuesList);
		this.updateDnDIssuesList();
	}

	mounted() {}

	updateDnDIssuesList() {
		this.myToDoIssuesList = [];
		this.myDoingIssuesList = [];
		this.myDoneIssues = [];
		if (this.__myIssuesList && this.__myIssuesList.length > 0) {
			this.__myIssuesList.map((item) => {
				if (item.status === 'doing') {
					this.myDoingIssuesList.push(item);
				} else if (item.status == 'done') {
					this.myDoneIssues.push(item);
				} else if (item.status == 'todo') {
					this.myToDoIssuesList.push(item);
				}
			});
		}
	}

	async issueListChange(
		issue: {
			added?: { element: IssuesData };
			removed?: { element: IssuesData };
		},
		type: string
	) {
		console.log('issue', issue);
		if (issue.added) {
			this.updateEditIssues(issue.added.element);
			const params = {
				status: type,
			};
			await this.updateIssues(params);
			await this.getMyIssuesList();
		}
		if (issue.removed) {
		}
	}

	issuesInfoShow(issue: IssuesData) {
		this.updateEditIssues(issue);
		this.issueInfoDrawer = !this.issueInfoDrawer;
	}

	bodyStyle = {
		padding: '8px 0 0 0 ',
		background: '#f0f2f5',
	};

	protected render() {
		return (
			<div class={styles.dashboard}>
				<DashboardHeader />
				<DashboardProjectCard />
				<div class={styles.content}>
					<Card bodyStyle={this.bodyStyle} title="任务大厅" bordered={false}>
						{this.renderIssuesList()}
					</Card>
				</div>

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

	renderIssuesList() {
		return (
			<Row gutter={8}>
				<Col span="8">
					<Card title="todo" bodyStyle={{ padding: '0' }}>
						<draggable
							list={this.myToDoIssuesList}
							group="people"
							on-change={async (item: any) => {
								await this.issueListChange(item, 'todo');
							}}
						>
							{this.renderItem(this.myToDoIssuesList)}
						</draggable>
					</Card>
				</Col>
				<Col span="8">
					<Card title="doing" bodyStyle={{ padding: '0' }}>
						<draggable
							list={this.myDoingIssuesList}
							group="people"
							on-change={async (item: any) => {
								await this.issueListChange(item, 'doing');
							}}
						>
							{this.renderItem(this.myDoingIssuesList)}
						</draggable>
					</Card>
				</Col>
				<Col span="8">
					<Card title="done" bodyStyle={{ padding: '0' }}>
						<draggable
							list={this.myDoneIssues}
							group="people"
							on-change={async (item: any) => {
								await this.issueListChange(item, 'done');
							}}
						>
							{this.renderItem(this.myDoneIssues)}
						</draggable>
					</Card>
				</Col>
			</Row>
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
