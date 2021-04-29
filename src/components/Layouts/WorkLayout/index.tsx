import Logo from "@/components/Common/Logo";
import { Icon, Layout, Menu, Tag, Tooltip } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import { workRouter } from "@/router/router.config";
import style from "./index.less";
import { RouterItem } from "@/router/types";
import WorkHeader from "./WorkHeader";

@Component
export default class WorkLayout extends Vue {
	appMenu: any[] = [];
	menuActive: string = "myPlan";

	created() {
		this.appMenu = workRouter;
	}

	opereateMenu(menuInfo: { keyPath: Array<string>; key: string }): void {
		this.menuActive = menuInfo.key;
		this.$router.push(`/work/${menuInfo.key}`);
	}
	protected render() {
		return (
			<Layout class={style.workLayout}>
				<Layout.Sider class={style.sider} theme="light">
					{this.renderMenu()}
				</Layout.Sider>
				<Layout.Content class={style.content}>
					<WorkHeader />
					<transition mode="out-in" name="slide">
						<router-view />
					</transition>
				</Layout.Content>
			</Layout>
		);
	}

	renderMenu() {
		return (
			<Menu
				class={style.menu}
				onClick={this.opereateMenu}
				mode="inline"
				selectedKeys={[this.menuActive]}
			>
				{this.appMenu && this.appMenu.length !== 0
					? this.createMenuItem(this.appMenu)
					: null}
			</Menu>
		);
	}

	protected createMenuItem(menu: Array<RouterItem>): Array<JSX.Element> {
		return menu.map((item: RouterItem) =>
			item.children && item.children.length > 0 ? (
				<Menu.SubMenu key={item.name}>
					<span slot="title">
						{item.icon ? <Icon type={item.icon} /> : null}
						<span>{item.meta.label}</span>
					</span>
					{this.createMenuItem(item.children)}
				</Menu.SubMenu>
			) : (
				<Menu.Item title={item.name} key={item.name}>
					{item.icon ? <Icon type={item.icon} /> : null}
					<span>{item.meta.label}</span>
				</Menu.Item>
			)
		);
	}
}
