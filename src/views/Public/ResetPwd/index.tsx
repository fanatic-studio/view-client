import { Component, Vue } from 'vue-property-decorator';
import styles from './index.less';

@Component
export default class Issues extends Vue {
	protected render() {
		return (
			<div>
				<div>{this.$route.path}</div>
			</div>
		);
	}
}
