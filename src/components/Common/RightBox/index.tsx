import { Component, Vue, Prop } from "vue-property-decorator";
import { Icon, Dropdown, Menu, Avatar } from "ant-design-vue";
import { State, Action } from "vuex-class";

import { language, loginInfo, tabItem, routesInfoMap } from "@/store/types";
import style from "./index.less";
import { namespace } from "vuex-class";
import { AccountInfo } from "@/store/models/account/types";
const AccountStore = namespace("account");
@Component
export default class RightBox extends Vue {
	@AccountStore.Getter("accountInfo") accountInfo!: AccountInfo;
	@AccountStore.Action("logout") logout!: Function;
	@Prop(String) deviceType!: string;
	@Prop(Boolean) top!: boolean;
	@Prop(String) theme!: string;
	// 当前语言信息
	@State((state) => state.language) language!: language;
	// 当前登录信息
	@State((state) => state.loginInfo) loginInfo!: loginInfo;
	// tab信息
	@State((state) => state.tabList) tabList!: Array<tabItem>;
	// 路由信息
	@State((state) => state.routesInfoMap) routesInfoMap!: routesInfoMap;
	// 切换语言
	@Action("toggleLanguage") toggleLanguage!: Function;
	// 退出登录
	private systemConfigVisible: boolean = false;
	changeLanguage = (key: string) => (): Function => this.toggleLanguage(key);
	toggleSystemConfigVisible(): void {
		this.systemConfigVisible = !this.systemConfigVisible;
	}
	// 执行退出登录操作
	async startLogout() {
		try {
			await this.logout();
		} catch (error) {}
		this.$router.push("/");
	}
	render() {
		const { language, loginInfo } = this;
		return (
			<div class={style.rightBox}>
				<Dropdown>
					<div class={style.userInfo}>
						<Avatar icon="user" />
						<div class={style.nickName}>
							{this.accountInfo.accountData.nickName}
						</div>
					</div>
					<Menu slot="overlay">
						<Menu.Item onClick={this.startLogout}>
							<Icon type="poweroff" />
							退出登录
						</Menu.Item>
					</Menu>
				</Dropdown>
				<Dropdown trigger={["click"]}>
					<Icon class={style.languageBtn} type="global" />
					<Menu slot="overlay">
						{language.list.map((item) => {
							return (
								<Menu.Item
									onClick={this.changeLanguage(item.key)}
									key={item.key}
								>
									<span class={style.menuItem}>{item.name}</span>
								</Menu.Item>
							);
						})}
					</Menu>
				</Dropdown>
				<span onClick={this.toggleSystemConfigVisible}>
					<Icon type="setting" />
				</span>
			</div>
		);
	}
}
