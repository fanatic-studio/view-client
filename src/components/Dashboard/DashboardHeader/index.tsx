import { timeFix, welcome } from '@/utils/util';
import { Avatar, Statistic } from 'ant-design-vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import styles from './index.less';
import { namespace } from 'vuex-class';
import { AccountInfo } from '@/store/models/account/types';
const AccountStore = namespace('account');
@Component
export default class DashboardHeader extends Vue {
	@AccountStore.Getter('accountInfo') accountInfo!: AccountInfo;
	protected render() {
		return (
			<div class={styles.pageHeaderContent}>
				<div class={styles.left}>
					<div class={styles.avatar}>
						<Avatar size="large">
							{this.accountInfo.accountData.nickName}
						</Avatar>
					</div>
					<div class={styles.content}>
						<div class={styles.contentTitle}>
							{timeFix()}，{this.accountInfo.accountData.nickName}
							<span class={styles.welcomeText}>，{welcome()}</span>
						</div>
						<div>可见C端</div>
					</div>
				</div>
				<div class={styles.right}>
					{/* <div class={styles.statItem}>
						<Statistic title="项目数" value="56" />
					</div>
					<div class={styles.statItem}>
						<Statistic title="团队内排名" value="8" suffix="/ 24" />
					</div>
					<div class={styles.statItem}>
						<Statistic title="项目访问" value="2223" />
					</div> */}
				</div>
			</div>
		);
	}
}
