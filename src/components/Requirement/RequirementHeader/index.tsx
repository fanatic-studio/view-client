import { Component, Prop, Vue } from 'vue-property-decorator';
import style from './index.less';
@Component
export default class RequirementHeader extends Vue {
	protected render() {
		return (
			<div class={style.requirementHeader}>
				<div>本月计划</div>
				<div>本周计划</div>
				{this.$slots.content}
			</div>
		);
	}
}
