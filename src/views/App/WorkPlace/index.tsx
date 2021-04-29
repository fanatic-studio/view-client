import { Card, Col, Drawer, Layout, Row, List, Slider, Button } from "ant-design-vue";
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
	orderData: OrderData = { unOrderTotalPrice: 76.24, orderTotalPrice: 0, unCount: 0, count: 0,refundTotalPrice:0 };
	leftItem: Array<any> = [{ itemTitle: "待支付", itemSelecte: true }, { itemTitle: "已支付", itemSelecte: false }, { itemTitle: "待退款", itemSelecte: false }]

	async created() {
		await this.getDataInfo();
		await this.getOrderList();
	}

	mounted() { }

	async getOrderList() {
		try {
			let params = {
				pageNum: 1,
				pageSize: 3,
				orderStatus: this.orderStatus
			}
			const result = await OrderApi.GetOrderList(params);
			this.myToDoIssuesList = result.records;
			console.log("result", result);

		} catch (error) {
			this.$message.error(error.msg);
		}
	}

	async getDataInfo() {
		try {
			const result = await OrderApi.GetOrderInfo({});
			this.orderData = result;
		} catch (error) {
			this.$message.error(error.msg);
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
					<Card bodyStyle={this.bodyStyle} bordered={false}>
						<div class={style.projectContent}>
							<span class={style.projectContentLeft}>任务大厅</span>
							<Button onClick={async () => {
								await this.getDataInfo();
								await this.getOrderList();
							}}>刷新</Button>
						</div>
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
					<div onClick={async () => {
						this.leftItem[0].itemSelecte = true;
						this.leftItem[1].itemSelecte = false;
						this.leftItem[2].itemSelecte = false;
						this.orderStatus = 39;
						await this.getOrderList();
					}}>
						<Row class={this.leftItem[0].itemSelecte ? style.leftItem : style.leftItemNormal} >
							{this.leftItem[0].itemTitle}
						</Row>
					</div>
					<div onClick={async () => {
						this.leftItem[1].itemSelecte = true;
						this.leftItem[0].itemSelecte = false;
						this.leftItem[2].itemSelecte = false;
						this.orderStatus = 40;
						await this.getOrderList();
					}}>
						<Row class={this.leftItem[1].itemSelecte ? style.leftItem : style.leftItemNormal} >
							{this.leftItem[1].itemTitle}
						</Row>
					</div>
					<div onClick={async () => {
						this.leftItem[2].itemSelecte = true;
						this.leftItem[0].itemSelecte = false;
						this.leftItem[1].itemSelecte = false;
						this.orderStatus = 60;
						await this.getOrderList();
					}}>
						<Row class={this.leftItem[2].itemSelecte ? style.leftItem : style.leftItemNormal} >
							{this.leftItem[2].itemTitle}
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
						<div class={
							style.rightItemContent2
						}>
							<span class={style.sortStyle2}>#{item.rowNum}</span>
							<div class={style.verStyle}>
								<span class={style.sortStyle}>{item.nickName}</span>
								<span>{item.phone}</span>
							</div>
							<div class={style.verStyle}>
								<span class={style.moneyStyle}>¥ {item.orderTotalPrice}</span>
								<span>{this.orderStatus === 39 ? item.createTime : item.payTime}</span>
							</div>
							<div class={item.refundPrice > 0 ? style.verStyle : style.verStyle2}>
								<span class={style.moneyStyle}>{this.orderStatus === 60 ? "待退款" : "已退款"}</span>
								<span>¥ {item.refundPrice}</span>
							</div>
						</div>

						<Button class={style.payBtn} onClick={() => {
							localStore.setItem("orderItem", item)
							this.$router.push({ path: "workDetail", query: { refundCode: item.refundCode, refundPrice: item.refundPrice } })
						}}>{this.orderStatus === 39 ? "支付" : this.orderStatus === 40 ? "查看" : "退款"}</Button>
					</div>
				</div>
			);
		});
	}
}
