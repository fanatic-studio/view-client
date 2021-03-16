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
	Timeline,
	Tooltip,
} from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
import style from './index.less';
import { namespace } from 'vuex-class';
const PlanStore = namespace('plan');
import { PlanItemData, PlanData } from '@/store/models/plan/types';
import PlanInfo from '@/components/Plan/PlanInfo';
import PlanAdd from '@/components/Plan/PlanAdd';
import PlanEdit from '@/components/Plan/PlanEdit';
import PlanItemAdd from '@/components/Plan/PlanItemAdd';
import PlanItemEdit from '@/components/Plan/PlanItemEdit';

@Component
export default class PlanList extends Vue {
	@PlanStore.Getter('planList') __planList!: Array<PlanData>;
	@PlanStore.Getter('planListCount') __planListCount!: number;
	@PlanStore.Getter('planType') __planType!: string;
	@PlanStore.Action('getPlanList') __getPlanList!: Function;
	@PlanStore.Action('updateEditPlan') __updateEditPlan!: Function;
	@PlanStore.Action('updatePlanType') __updatePlanType!: Function;
	@PlanStore.Getter('planItemList') __planItemList!: Array<PlanItemData>;
	@PlanStore.Getter('planItemListCount') __planItemListCount!: number;
	@PlanStore.Action('getPlanItemList') __getPlanItemList!: Function;
	@PlanStore.Action('updateEditPlanItem') __updateEditPlanItem!: Function;

	addPlanModal: boolean = false;
	addPlanItemModal: boolean = false;
	addPlanItemType: string = '';
	controlDrawer: boolean = false;
	planItemEditDrawer: boolean = false;
	pageIndex: number = 1;
	pageSize: number = 12;

	async created() {
		await this.__getPlanList();
	}

	addPlanModalHandle() {
		this.addPlanModal = !this.addPlanModal;
	}

	planItemAddHandler(type: string, item: any) {
		this.addPlanItemType = type;
		this.__updateEditPlan(item);
		this.addPlanItemModal = !this.addPlanItemModal;
	}

	planItemEditHandler(item: PlanItemData) {
		this.__updateEditPlanItem(item);
		this.planItemEditDrawer = !this.planItemEditDrawer;
	}

	planClick(item: PlanData) {
		console.log('item', item);
		this.__updateEditPlan(item);
		this.controlDrawer = !this.controlDrawer;
	}

	async tabClick(e: string) {
		this.__updatePlanType(e);
		await this.__getPlanList();
	}

	async updatePlanList() {
		await this.__getPlanList();
	}

	protected render() {
		return (
			<div class={style.plan}>
				<Tabs
					slot="content"
					defaultActiveKey="month"
					class={style.reqTabs}
					tabBarStyle={{
						padding: '0 24px',
						backgroundColor: '#fff',
					}}
					on-tabClick={this.tabClick}
				>
					<Tabs.TabPane key="all" tab="全年"></Tabs.TabPane>
					<Tabs.TabPane key="month" tab="当月"></Tabs.TabPane>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addPlanModalHandle}
					>
						添加工作计划
					</Button>
				</Tabs>
				<div class={style.planContent}>
					<Timeline>{this.renderPlaList()}</Timeline>
				</div>
				<Modal
					title="新增工作计划"
					visible={this.addPlanModal}
					width={800}
					dialog-style={{ top: '20px' }}
					on-cancel={this.addPlanModalHandle}
					maskClosable={false}
					footer={null}
				>
					<PlanAdd on-updatePlanList={this.updatePlanList} />
				</Modal>
				<Modal
					title="新增周工作计划"
					visible={this.addPlanItemModal}
					width={800}
					dialog-style={{ top: '20px' }}
					on-cancel={() => {
						this.addPlanItemModal = !this.addPlanItemModal;
					}}
					maskClosable={false}
					footer={null}
				>
					<PlanItemAdd
						planItemType={this.addPlanItemType}
						on-updatePlanList={this.updatePlanList}
					/>
				</Modal>
				<Drawer
					title="工作计划信息"
					visible={this.controlDrawer}
					on-close={() => {
						this.controlDrawer = !this.controlDrawer;
					}}
					width={1100}
				>
					<PlanEdit on-updatePlanList={this.updatePlanList} />
				</Drawer>
				<Drawer
					title="本周工作计划"
					visible={this.planItemEditDrawer}
					on-close={() => {
						this.planItemEditDrawer = !this.planItemEditDrawer;
					}}
					width={1100}
				>
					<PlanItemEdit on-updatePlanList={this.updatePlanList} />
				</Drawer>
			</div>
		);
	}

	protected renderPlaList() {
		return this.__planList.map((item, index) => {
			return (
				<Timeline.Item>
					<PlanInfo
						item={item}
						on-planClick={this.planClick}
						on-planItemAddClick={this.planItemAddHandler}
						on-planItemEditClick={this.planItemEditHandler}
					/>
				</Timeline.Item>
			);
		});
	}
}
