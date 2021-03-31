import style from "./index.less";
import {Card, Button, Col, Row, Modal} from "ant-design-vue"
import { Component, Vue, Watch } from "vue-property-decorator";
import WorkPlaceHeader from "@/components/WorkPlace/WorkPlaceHeader";

import OrderApi from "@/api/order"
import { OrderData } from "@/store/models/order/types";
import localStore from '@/localStore';
import imgSrc from '@/assets/order_detail.png'
import comSrc from '@/assets/complete.png'


@Component({
	components: {
		
	},
})

export default class OrderDetail extends Vue {
    LODOP:any;
    public pointResult:any = {};
    orderData: OrderData = {unOrderTotalPrice: 76.24, orderTotalPrice: 0, unCount: 0, count: 0};
    simpleItem: any = {}
    orderDetailInfo: any = {
        list: [{item: []}, {item: []}]
    }

    isModalVisible: Boolean = false
    modalTitle: string = "确认支付"

    async created() {
        await this.getDataInfo();
        await this.getOrderDetail();
    }

    // 获取今日订单信息
    async getDataInfo() {
		try {
			const result = await OrderApi.GetOrderInfo({});
			this.orderData = result;
			console.log('---------GetOrderInfo', result);
		} catch (error) {
			
			console.log('---------GetOrderInfo error', error);
		}
	}

    // 获取订单详情
    async getOrderDetail() {
		try {
            const orderItem:any = await localStore.getItem("orderItem")
            this.simpleItem = orderItem;
            let params = {
                recycleOrderCode: orderItem.recycleOrderCode,
                userCode: orderItem.userCode
            }
			const result = await OrderApi.GetOrderDetail(params);
			this.orderDetailInfo = result;
			console.log('---------GetOrderDetail', result);
		} catch (error) {
			console.log('---------GetOrderDetail error', error);
		}
	}

    // 取消订单
    async cancelOrder() {
        try {
            const orderItem:any = await localStore.getItem("orderItem")
            this.simpleItem = orderItem;
            let params = {
                recycleOrderCode: orderItem.recycleOrderCode,
            }
			const result = await OrderApi.CancelOrder(params);
			this.orderDetailInfo = result;
			console.log('---------CancelOrder', result);
            this.$message.success('取消订单成功');
            this.$router.go(-1)
		} catch (error) {
			console.log('---------CancelOrder error', error);
            this.$message.error(error.msg ? error.msg : "请求失败");
		}
    }

    // 完成订单
    async completeOrder() {
        try {
            const orderItem:any = await localStore.getItem("orderItem")
            this.simpleItem = orderItem;
            let params = {
                packingStationCode: '001',
                recycleOrderCode: orderItem.recycleOrderCode,
                orderPayType: 30,
                orderReceiptData: "",
            };
			const result = await OrderApi.OrderPay(params);
			this.$message.success('支付已完成');
            this.$router.go(-1)
			console.log('---------OrderPay', result);
		} catch (error) {
			console.log('---------OrderPay error', error);
            this.$message.error(error.msg ? error.msg : "请求失败");
		}
    }

    async handleOk() {
        this.isModalVisible = false
        if (this.modalTitle === "确认支付？") {
            await this.completeOrder()
        } else {
            await this.cancelOrder()
        }
    }

    handleCancel() {
        this.isModalVisible = false
    }

    protected render() {
        return (
            <div class={style.orderDetail}>
                <WorkPlaceHeader orderData={this.orderData} />
                <div class={style.titleDiv}>
                    <img class={style.logoImg} src={imgSrc} />
                    <span>货物信息</span>
                </div>
                {this.orderDetailView()}
                <Modal title={this.modalTitle} visible={this.isModalVisible} onOk={async ()=> {
                    await this.handleOk()
                }} onCancel={() => {
                    this.handleCancel()
                }}>请确认无误并继续您的操作</Modal>
            </div>
        )  
    }

    orderDetailView() {
        return (
            <div class={style.orderDetailContent}>
                <Col span="14">
                    {this.bangList(this.orderDetailInfo.list)}
				</Col>
				<Col class={style.orderListRight} span="10">
                    {this.rightInfo()}
				</Col>
            </div>
        )
    }

    bangList(list: Array<any>) {
        return list.map((item) => {
            return (
                <Card bordered={false} class={style.leftTopCard} title={item.deviceName}>
                    {this.goodsList(item.item)}
                </Card>
            )
        })
    }

    goodsList(list: Array<any>) {
        return list.map((item) => {
            return (
                <div class={style.goodsItem}>
                    <span class={style.goodsItemLeft}>{item.itemName}({item.itemPrice}/kg)</span>
                    <span class={style.goodsItemLeft}>{item.itemWeight}kg</span>
                    <span class={style.goodsItemRight}>{item.itemTotalPrice}元</span>
                </div>
            )
        })
    }

    rightInfo() {
        return (
            <div>
                <Card bordered={false}>
                <div class={style.topUserInfo}>
                    <span class={style.sortStyle}>#{this.orderDetailInfo.rowNum}</span>
                    <div class={style.topUserInfoCenter}>
                        <span class={style.sortStyle}>{this.orderDetailInfo.nickName}</span>
                        <span class={style.phoneStyle}>{this.orderDetailInfo.phoneNum}</span>
                    </div>
                    <span class={style.phoneStyle}>普通卡</span>
                </div>
                <div class={style.botLogo}>
                    <img class={style.logoImg} src={comSrc} />
                    <span>结算单</span>
                </div>
                <div class={style.priceItems}>
                    <span class={style.priceItemsLeft}>称重</span>
                    <span class={style.priceItemsRight}>{this.orderDetailInfo.totalRecyclePrice}元</span>
                </div>
                <div class={style.priceItems}>
                    <span class={style.priceItemsLeft}>VIP加成</span>
                    <span class={style.priceItemsRight}>{this.orderDetailInfo.totalVipPrice}元</span>
                </div>
                <div class={style.priceItems}>
                    <span class={style.priceItemsLeft}>活动加成</span>
                    <span class={style.priceItemsRight}>{this.orderDetailInfo.activityPrice}元</span>
                </div>
                <div class={style.resultPay}>
                    <span class={style.priceItemsLeft}>{this.orderDetailInfo.orderStatus === 39 ? "需支付" : "已支付"}</span>
                    <span class={style.resultPayPrice}>{this.orderDetailInfo.totalPrice}元</span>
                </div>
                <div class={style.actionBtn}>
                    <Button class={style.cancelBtn} onClick={(event: Event) => {
                        this.modalTitle = "确认取消订单？"
                        this.isModalVisible = true;
                        // await this.cancelOrder()
                    }}>取消支付</Button>
                    <Button class={style.confirmBtn} onClick={(event: Event) => {
                        this.modalTitle = "确认支付？"
                        this.isModalVisible = true;
                        // await this.completeOrder()
                    }}>确认支付</Button>
                    <iframe src="" frameborder="0"></iframe>
                </div>
            </Card>
            </div>
        )
    }
}