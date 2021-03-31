import HttpRequest from "@/utils/network/HttpRequest";

export enum API {
	ORDER_LIST = "/packingRecycleOrderInfo/unPayPage",
    ORDER_INFO = "/packingDeviceInfo/getDailyStatistics",
    ORDER_DETAIL = "/packingRecycleOrderInfo/detail",
    CANCEL_ORDER = "/packingRecycleOrderInfo/cancleOrder",
    ORDER_PAY = "/userCardInfo/order/pay"
}

export default class IssuesApi {
	public static async GetOrderList(
		params: any
	): Promise<any> {
		return await HttpRequest.getData(API.ORDER_LIST, params);
	}

    public static async GetOrderInfo(
		params: any
	): Promise<any> {
		return await HttpRequest.getData(API.ORDER_INFO, params);
	}

    public static async GetOrderDetail(
		params: any
	): Promise<any> {
		return await HttpRequest.getData(API.ORDER_DETAIL, params);
	}

    public static async CancelOrder(
		params: any
	): Promise<any> {
		return await HttpRequest.postData(API.CANCEL_ORDER, params);
	}

    public static async OrderPay(
		params: any
	): Promise<any> {
		return await HttpRequest.postData(API.ORDER_PAY, params);
	}
}
