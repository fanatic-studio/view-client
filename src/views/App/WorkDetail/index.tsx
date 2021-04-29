import style from "./index.less";
import {Card, Button, Col, Row, Modal} from "ant-design-vue"
import { Component, Vue, Watch } from "vue-property-decorator";
import WorkPlaceHeader from "@/components/WorkPlace/WorkPlaceHeader";

import OrderApi from "@/api/order"
import { OrderData } from "@/store/models/order/types";
import localStore from '@/localStore';
import imgSrc from '@/assets/order_detail.png'
import comSrc from '@/assets/complete.png'
declare var LODOPFUNCS: any;
import {getLodop} from './LodopFuncs'
import { app, protocol, BrowserWindow } from 'electron';


@Component({
	components: {
		
	},
})

export default class OrderDetail extends Vue {
    LODOP:any;
    public pointResult:any = {};
    orderData: OrderData = {unOrderTotalPrice: 76.24, orderTotalPrice: 0, unCount: 0, count: 0,refundTotalPrice:0};
    simpleItem: any = {}
    orderDetailInfo: any = {
        list: [{item: []}, {item: []}]
    }

    isModalVisible: Boolean = false
    refundCode:any
    refundPrice:any
    isModalVisible2: Boolean = false
    modalTitle: string = "确认支付"    

    async created() {
        this.refundCode = this.$route.query.refundCode;
        this.refundPrice = this.$route.query.refundPrice;
        console.log("refundCode",this.refundCode);
        await this.getDataInfo();
        await this.getOrderDetail();
    }

    // 获取今日订单信息
    async getDataInfo() {
		try {
			const result = await OrderApi.GetOrderInfo({});
			this.orderData = result;
		} catch (error) {
			console.log('---------GetOrderInfo error', error);
		}
    }
    
    handleClick() {
        this.LODOP = getLodop();
        this.LODOP.SET_PRINT_PAGESIZE(2, '148mm', '210mm');
        let formDate = document.getElementById("form1");

        if (formDate) {
            this.LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", formDate.innerHTML);
        }
        //this.LODOP.PREVIEW();
        this.LODOP.PRINT();
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
            console.log(result);
            
			this.orderDetailInfo = result;
		} catch (error) {
            this.$message.error(error.msg);
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
            this.$message.success('取消订单成功');
            this.$router.go(-1)
		} catch (error) {
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

            var iTop = (window.screen.height-30-500)/2;       //获得窗口的垂直位置;
			var iLeft = (window.screen.width-10-400)/2;  
            window.open(`http://cs.daieco.com/h5/print/print.html?id=${orderItem.recycleOrderCode}`, "_blank", `width=400px,height=500px,top=${iTop}px,left=${iLeft}px`)
            this.$router.go(-1)
		} catch (error) {
            this.$message.error(error.msg ? error.msg : "请求失败");
		}
    }
    // 确认退款
    async completeOrder2() {
        try {
            // const orderItem:any = await localStore.getItem("orderItem")
            // this.simpleItem = orderItem;
            let params = {
                refundCode: this.refundCode,
            };
            console.log("退款params",params)
			const result = await OrderApi.OrderRefund(params);
			this.$message.success('退款已完成');
            this.$router.go(-1)
		} catch (error) {
            this.$message.error(error.msg ? error.msg : "请求失败");
		}
    }
    // 取消退款
    async cancelOrder2() {
        try {
            let params = {
                refundCode: this.refundCode,
            }
			const result = await OrderApi.CancelOrderRefund(params);
			// this.orderDetailInfo = result;
            this.$message.success('取消退款成功');
            this.$router.go(-1)
		} catch (error) {
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

    async handleOk2() {
        this.isModalVisible2 = false
        if (this.modalTitle === "确认退款？") {
            await this.completeOrder2()
        } else {
            await this.cancelOrder2()
        }
    }

    handleCancel() {
        this.isModalVisible = false
    }
    handleCancel2() {
        this.isModalVisible2 = false
    }

    protected render() {
        return (
            <div class={style.orderDetail}>
                <WorkPlaceHeader orderData={this.orderData} />
                <div class={style.titleContent}>
                    <div class={style.titleDiv}>
                        <img class={style.logoImg} src={imgSrc} />
                        <span>货物信息</span>
                    </div>
                    <Button class={style.titleContentRight} onClick={() => {
                        this.$router.go(-1)
                    }}>返回上一页</Button>
                </div>
                
                {this.orderDetailView()}
                <Modal title={this.modalTitle} visible={this.isModalVisible} onOk={async ()=> {
                    await this.handleOk()
                }} onCancel={() => {
                    this.handleCancel()
                    }}>请确认无误并继续您的操作
                </Modal>
                <Modal title={this.modalTitle} visible={this.isModalVisible2} onOk={async ()=> {
                    await this.handleOk2()
                }} onCancel={() => {
                    this.handleCancel2()
                    }}>请确认无误并继续您的操作
                </Modal>
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
                    <span class={style.goodsItemLeft}>{item.itemName} ({item.itemPrice / 2}元/斤)</span>
                    <span class={style.goodsItemLeft}>{item.itemWeight * 2}斤</span>
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
                            <span class={style.phoneStyle}>{this.userLevel()}</span>
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
                        <div class={this.orderDetailInfo.orderStatus === 60 ?style.resultPay:style.resultPay2}>
                            <span class={style.priceItemsLeft}>退款金额</span>
                            <span class={style.priceItemsRight}>{this.refundPrice}元</span>
                        </div>
                        <div class={this.refundPrice > 0 && this.orderDetailInfo.orderStatus === 40 ?style.resultPay:style.resultPay2}>
                            <span class={style.priceItemsLeft}>已退款</span>
                            <span class={style.priceItemsRight}>{this.refundPrice}元</span>
                        </div>
                        {this.actionBtn()}
                    </Card>
                </div>
            )       
    }

    userLevel() {
        if (this.orderDetailInfo.userLevel === "1") {
            return "普通卡";
        } else if (this.orderDetailInfo.userLevel === "2") {
            return "银卡";
        } else if (this.orderDetailInfo.userLevel === "3") {
            return "金卡";
        } else {
            return "普通卡";
        }
    }

    actionBtn() {
        if (this.orderDetailInfo.orderStatus === 39) {
            return (
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
                </div>
            )
        } else if(this.orderDetailInfo.orderStatus === 60) {
            return (
                <div class={style.actionBtn}>
                    <Button class={style.cancelBtn} onClick={(event: Event) => {
                        this.modalTitle = "确认取消退款？"
                        this.isModalVisible2 = true;
                    }}>取消退款</Button>
                    <Button class={style.confirmBtn} onClick={(event: Event) => {
                        this.modalTitle = "确认退款？"
                        this.isModalVisible2 = true;
                    }}>确认退款</Button>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
}