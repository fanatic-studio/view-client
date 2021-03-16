import { Component, Vue } from 'vue-property-decorator';
import { Layout } from 'ant-design-vue';
import { Logo, RightBox } from '@/components';

import styles from './index.less';

@Component
export default class DashLayout extends Vue {
	protected render() {
		return (
			<Layout class={styles.appLayout}>
				<Layout.Header class={styles.header}>
					<Logo theme="lightDash" />
					<RightBox />
				</Layout.Header>
				<Layout.Content class={styles.content}>
					<transition mode="out-in" name="slide">
						<router-view />
					</transition>
				</Layout.Content>
			</Layout>
		);
	}
}
