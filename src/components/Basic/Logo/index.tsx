import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import styles from './index.less';
import logo from '@/assets/logo.png';
import AppConfig from '@/config/app.config';

@Component
export default class Logo extends Vue {
	@Prop(String) readonly theme!: string;
	@Prop(String) readonly type!: string;
	@Prop({ type: Boolean, default: true }) readonly canClick!: boolean;

	iconClick() {
		if (this.canClick) {
			this.$router.push({
				name: 'dashbord',
			});
		}
	}
	render() {
		return this.type === 'menu' ? (
			<div
				class={`${styles.menuLogo} ${styles[this.theme]}`}
				on-click={this.iconClick}
			>
				<img src={logo} />
				<h1>{AppConfig.NAME}</h1>
			</div>
		) : (
			<div
				class={`${styles.topLogo} ${styles[this.theme]}`}
				on-click={this.iconClick}
			>
				<img src={logo} />
				<h1>{AppConfig.NAME}</h1>
			</div>
		);
	}
}
