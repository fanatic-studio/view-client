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
const MilestoneStore = namespace("milestone");
import RequirementHeader from "@/components/Requirement/RequirementHeader";
import RequirementInfo from "@/components/Requirement/RequirementInfo";
import { MilestoneMode } from "@/store/models/milestone/types";
import MilestoneItem from "@/components/Milestone/MilestoneItem";
import MilestoneAdd from "@/components/Milestone/MilestoneAdd";
import MilestoneInfo from "@/components/Milestone/MilestoneInfo";
import MilestoneEdit from "@/components/Milestone/MilestoneEdit";

@Component
export default class Milestone extends Vue {
	@MilestoneStore.Getter("milestoneList") milestoneList!: Array<MilestoneMode>;
	@MilestoneStore.Getter("milestoneListCount") milestoneListCount!: number;
	@MilestoneStore.Action("getMilestoneList") __getMilestoneList!: Function;
	@MilestoneStore.Action("updateEditMilestone")
	updateEditMilestone!: Function;

	addModal: boolean = false;
	editDrawer: boolean = false;
	infoDrawer: boolean = false;
	pageIndex: number = 1;
	pageSize: number = 8;
	milestoneStatus: string = "doing";

	async created() {
		await this.getMilestoneList();
	}

	addModalHandle() {
		this.addModal = !this.addModal;
	}

	editClick(item: MilestoneMode) {
		this.updateEditMilestone(item);
		this.editDrawer = !this.editDrawer;
	}
	infoClick(item: MilestoneMode) {
		this.updateEditMilestone(item);
		this.infoDrawer = !this.infoDrawer;
	}

	async tabClick(e: string) {
		await this.getMilestoneList(e);
	}

	async updateMilsList() {
		await this.getMilestoneList();
	}

	async getMilestoneList(status?: string) {
		if (status) {
			this.milestoneStatus = status;
		}
		const params = {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			status: this.milestoneStatus,
		};
		console.log("params", params);

		await this.__getMilestoneList(params);
	}

	protected render() {
		return (
			<div class={style.milestone}>
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
						添加里程碑
					</Button>
				</Tabs>
				<div class={style.milestoneContent}>
					{this.renderMilsList()}
					<Pagination
						class={style.requirementContentPagination}
						pageSize={this.pageSize}
						total={this.milestoneListCount}
						show-less-items
						on-change={async (page: any) => {
							this.pageIndex = page;
							console.log(page);
							await this.getMilestoneList();
						}}
					/>
				</div>
				<Modal
					title="新增里程碑"
					visible={this.addModal}
					width={800}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addModalHandle}
					maskClosable={false}
					footer={null}
				>
					<MilestoneAdd on-updateMilsList={this.updateMilsList} />
				</Modal>
				<Drawer
					title="里程碑更新"
					visible={this.editDrawer}
					on-close={() => {
						this.editDrawer = !this.editDrawer;
					}}
					width={600}
				>
					<MilestoneEdit on-updateMilsList={this.updateMilsList} />
				</Drawer>
				<Drawer
					title="里程碑信息"
					visible={this.infoDrawer}
					on-close={() => {
						this.infoDrawer = !this.infoDrawer;
					}}
					width={1000}
				>
					<MilestoneInfo on-updateMilsList={this.updateMilsList} />
				</Drawer>
			</div>
		);
	}

	protected renderMilsList() {
		return this.milestoneList.map((item, index) => {
			return (
				<MilestoneItem
					item={item}
					on-itemEditClick={this.editClick}
					on-itemInfoClick={this.infoClick}
				/>
			);
		});
	}
}
