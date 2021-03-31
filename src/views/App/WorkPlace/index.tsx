import { Card, Col, Drawer, Layout, Row, List, Slider, Button} from "ant-design-vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
import { OrderData } from "@/store/models/order/types";
const IssuesStore = namespace("issues");
const AccountStore = namespace("account");
import draggable from "vuedraggable";
import WorkPlaceHeader from "@/components/WorkPlace/WorkPlaceHeader";
import OrderApi from "@/api/order"
import localStore from '@/localStore';

const { Header, Footer, Sider, Content } = Layout;
@Component({
	components: {
		draggable,
	},
})
export default class WorkPlace extends Vue {
	orderStatus: number = 39
	myToDoIssuesList: Array<any> = [];
	orderData: OrderData = {unOrderTotalPrice: 76.24, orderTotalPrice: 0, unCount: 0, count: 0};
	leftItem: Array<any> = [{itemTitle: "待支付", itemSelecte: true}, {itemTitle: "已支付", itemSelecte: false}]

	async created() {
		await this.getDataInfo();
		await this.getOrderList();
	}	

	mounted() {}

	async getOrderList() {
		try {
			let params = {
				orderStatus: this.orderStatus
			}
			const result = await OrderApi.GetOrderList(params);
			this.myToDoIssuesList = result.records;

			console.log('---------GetOrderList', result);
		} catch (error) {
			console.log('---------GetOrderList error', error);
		}
	}

	async getDataInfo() {
		try {
			const result = await OrderApi.GetOrderInfo({});
			this.orderData = result;
			console.log('---------GetOrderInfo', result);
		} catch (error) {
			
			console.log('---------GetOrderInfo error', error);
		}
	}

	bodyStyle = {
		padding: "8px 0 0 0 ",
		background: "#f0f2f5",
	};

	protected render() {
		return (
			<div class={style.workPlace}>
				<WorkPlaceHeader orderData={this.orderData} />
				<div class={style.content}>
					<Card bodyStyle={this.bodyStyle} title="任务大厅" bordered={false}>
						{this.renderIssuesList()}
					</Card>
				</div>
			</div>
		);
	}

	renderIssuesList() {
		return (
			<Row class={style.orderList}>
				<Col span="3">
					<div onClick={ async ()=> {
						this.leftItem[0].itemSelecte = true;
						this.leftItem[1].itemSelecte = false;
						this.orderStatus = 39;
						await this.getOrderList();
					}}>
					<Row class={this.leftItem[0].itemSelecte?style.leftItem:style.leftItemNormal} >
						{this.leftItem[0].itemTitle}
					</Row>
					</div>
					<div onClick={ async ()=> {
						this.leftItem[0].itemSelecte = false;
						this.leftItem[1].itemSelecte = true;
						this.orderStatus = 40;
						await this.getOrderList();
					}}>
					<Row class={this.leftItem[1].itemSelecte?style.leftItem:style.leftItemNormal} >
					{this.leftItem[1].itemTitle}
					</Row>
					</div>
					
				</Col>
				<Col class={style.orderListRight} span="21">
					<Row gutter={8}>
						<draggable
							list={this.myToDoIssuesList}
							group="people"
							on-change={async (item: any) => {
								
							}}
						>
							{this.renderItem(this.myToDoIssuesList)}
						</draggable>
					</Row>					
				</Col>
			</Row>
				
			
		);
	}

	renderItem(itemList: Array<any>) {
		return itemList.map((item) => {
			return (
				<div class={style.rightItem}>
					<div class={style.rightItemContent}>
						<span class={style.sortStyle}>#{item.rowNum}</span>
						<div class={style.verStyle}>
							<span class={style.sortStyle}>{item.nickName}</span>
							<span>{item.phone}</span>
						</div>
						<div class={style.verStyle}>
							<span class={style.moneyStyle}>￥{item.orderTotalPrice}</span>
							<span>{item.createTime}</span>
						</div>
						<Button class={style.payBtn} onClick={()=> {
							localStore.setItem("orderItem", item)
							this.$router.push("workDetail")
						}}>{this.orderStatus === 39 ? "支付" : "查看"}</Button>
					</div>
				</div>
			);
		});
	}
}
