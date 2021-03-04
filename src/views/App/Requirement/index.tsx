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
const RequirementStore = namespace("requirement");
import {
	RequirementData,
	RequirementMode,
} from "@/store/models/requirement/types";
import RequirementItem from "@/components/Requirement/RequirementItem";
import RequirementHeader from "@/components/Requirement/RequirementHeader";
import RequirementAdd from "@/components/Requirement/RequirementAdd";
import RequirementInfo from "@/components/Requirement/RequirementInfo";
import RequirementEdit from "@/components/Requirement/RequirementEdit";

@Component
export default class Requirement extends Vue {
	@RequirementStore.Getter("requirementId") requirementId!: string;
	@RequirementStore.Getter("requirementList") requirementList!: Array<
		RequirementData
	>;
	@RequirementStore.Getter("requirementListCount")
	requirementListCount!: number;
	@RequirementStore.Action("getRequirementList")
	__getRequirementList!: Function;
	@RequirementStore.Action("updateEditRequirement")
	updateEditRequirement!: Function;

	addModal: boolean = false;
	editDrawer: boolean = false;
	infoDrawer: boolean = false;
	allMode: boolean = true;
	loadingRqList: boolean = false;
	busyRqList: boolean = false;
	pageIndex: number = 1;
	pageSize: number = 8;
	requirementListStatus: string = "doing";

	async created() {
		await this.getRequirementList();
	}

	addModalHandle() {
		this.addModal = !this.addModal;
	}

	async tabClick(e: string) {
		await this.getRequirementList(e);
	}

	async updateRList() {
		await this.getRequirementList();
		if (!this.allMode) {
			this.addModalHandle();
		}
	}

	async getRequirementList(status?: string) {
		if (status) {
			this.requirementListStatus = status;
		}
		await this.__getRequirementList({
			index: this.pageIndex,
			size: this.pageSize,
			status: this.requirementListStatus,
		});
	}

	editClick(item: RequirementItem) {
		this.updateEditRequirement(item);
		this.editDrawer = !this.editDrawer;
	}
	infoClick(item: RequirementItem) {
		this.updateEditRequirement(item);
		this.infoDrawer = !this.infoDrawer;
	}

	protected render() {
		return (
			<div class={style.requirement}>
				<Tabs
					slot="content"
					defaultActiveKey="doing"
					class={style.reqTabs}
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
						添加需求
					</Button>
				</Tabs>
				<div class={style.requirementContent}>
					{this.renderReqList()}
					<Pagination
						class={style.requirementContentPagination}
						pageSize={this.pageSize}
						total={this.requirementListCount}
						show-less-items
						on-change={async (page: any) => {
							this.pageIndex = page;
							console.log(page);
							await this.getRequirementList();
						}}
					/>
				</div>
				<Modal
					title="新增需求"
					visible={this.addModal}
					width={800}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addModalHandle}
					maskClosable={false}
					footer={null}
				>
					<RequirementAdd on-updateRList={this.updateRList} />
					<div>
						连续模式：
						<Switch
							v-model={this.allMode}
							checked-children="开"
							un-checked-children="关"
							default-checked
						/>
					</div>
				</Modal>
				<Drawer
					title="需求更新"
					visible={this.editDrawer}
					on-close={() => {
						this.editDrawer = !this.editDrawer;
					}}
					width={800}
				>
					<RequirementEdit on-updateNotice={this.updateRList} />
				</Drawer>
				<Drawer
					title="详情"
					visible={this.infoDrawer}
					on-close={() => {
						this.infoDrawer = !this.infoDrawer;
					}}
					width={500}
				>
					<RequirementInfo />
				</Drawer>
			</div>
		);
	}

	protected renderReqList() {
		return this.requirementList.map((item, index) => {
			return (
				<RequirementItem
					item={item}
					on-itemEditClick={this.editClick}
					on-itemInfoClick={this.infoClick}
				/>
			);
		});
	}
}
