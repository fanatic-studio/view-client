import { Component, Vue, Prop } from "vue-property-decorator";
import style from "./index.less";
import logo from "@/assets/logo.png";

@Component
export default class Logo extends Vue {
	@Prop(Boolean) readonly headLogo!: boolean;

	iconClick() {
		this.$emit("iconClick");
	}
	render() {
		return (
			<div
				class={this.headLogo ? style.headerLogo : style.logo}
				on-click={this.iconClick}
			>
				<img class={style.logoImg} src={logo} />
				<h1 class={style.title}>可见中转站</h1>
			</div>
		);
	}
}
