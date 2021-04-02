import { timeFix, welcome } from "@/utils/util";
import { Avatar, Statistic } from "ant-design-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.less";
import { namespace } from "vuex-class";
import { AccountInfo } from "@/store/models/account/types";

import localStore from '@/localStore';
import { OrderData } from "@/store/models/order/types";
import headImg from "@/assets/headImg.png"

// const AccountStore = namespace("account");
@Component
export default class WorkPlaceHeader extends Vue {

	@Prop(Object) readonly orderData!: OrderData;
	
	userInfo: any = {}

	async created() {		
		 this.userInfo = await localStore.getItem("UserInfo");
	}
	protected render() {
		return (
			<div class={style.pageHeaderContent}>
				<div class={style.left}>
					<div class={style.avatar}>
						<img class={style.logoImg} src={headImg} />
					</div>
					<div class={style.content}>
						<div class={style.contentTitle}>
							{/* {timeFix()}，{this.accountInfo.accountData.nickName} */}
							<span class={style.welcomeText}>{welcome()}</span>
						</div>
						<div>再生资源中转站-001</div>
					</div>
				</div>
				<div class={style.right}>
					<div class={style.statItem}>
						<Statistic title="待支付" value={this.orderData.unCount} />
					</div>
					<div class={style.statItem}>
						<Statistic title="已支付" value={this.orderData.count} />
						{/* <Statistic title="已支付" value="8" suffix="/ 24" /> */}
					</div>
					<div class={style.statItem}>
						<Statistic title="交易金额" value={this.orderData.orderTotalPrice} />
					</div>
				</div>
			</div>
		);
	}
}
