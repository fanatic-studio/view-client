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
import WorkPlaceHeader from "@/components/WorkPlace/WorkPlaceHeader";
import WorkProjectCard from "@/components/WorkPlace/WorkProjectCard";
@Component({
	components: {
		draggable,
	},
})
export default class WorkPlace extends Vue {
	

	myToDoIssuesList: Array<IssuesData> = [];
	myDoingIssuesList: Array<IssuesData> = [];
	myDoneIssues: Array<IssuesData> = [];
	issueInfoDrawer: boolean = false;

	async created() {
	}

	@Watch("myIssuesList", { immediate: true, deep: true })
	

	mounted() {}

	

	bodyStyle = {
		padding: "8px 0 0 0 ",
		background: "#f0f2f5",
	};

	protected render() {
		return (
			<div class={style.workPlace}>
				<WorkPlaceHeader />
				<WorkProjectCard />
				<div class={style.content}>
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
					<Card title="todo" bodyStyle={{ padding: "0" }}>
						<draggable
							list={this.myToDoIssuesList}
							group="people"
							on-change={async (item: any) => {
								
							}}
						>
							{this.renderItem(this.myToDoIssuesList)}
						</draggable>
					</Card>
				</Col>
				<Col span="8">
					<Card title="doing" bodyStyle={{ padding: "0" }}>
						<draggable
							list={this.myDoingIssuesList}
							group="people"
							on-change={async (item: any) => {
								
							}}
						>
							{this.renderItem(this.myDoingIssuesList)}
						</draggable>
					</Card>
				</Col>
				<Col span="8">
					<Card title="done" bodyStyle={{ padding: "0" }}>
						<draggable
							list={this.myDoneIssues}
							group="people"
							on-change={async (item: any) => {
								
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
				<IssuesDragItem item={item} on-itemInfoClick={true} />
			);
		});
	}
}
