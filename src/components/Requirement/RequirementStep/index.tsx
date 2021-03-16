import { Select, Steps } from 'ant-design-vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import style from './index.less';
import { namespace } from 'vuex-class';
import { RequirementData } from '@/store/models/requirement/types';
import { ProgressRateList } from '../RequirementData';
const ProjectStore = namespace('project');
const RequirementStore = namespace('requirement');
@Component
export default class RequirementStep extends Vue {
	@RequirementStore.Action('updateRequirement') __updateRequirement!: Function;
	@RequirementStore.Getter('currEditRequirement')
	__currEditRequirement!: RequirementData;

	currRequirementStep: number = 0;

	created() {
		this.currRequirementStep = this.__currEditRequirement.progressRate;
	}

	@Watch('__currEditRequirement', { immediate: true, deep: true })
	watchCurrEditRequirement() {
		this.currRequirementStep = this.__currEditRequirement.progressRate;
	}

	async stepChange(e: string) {
		let params = {
			requirementId: this.__currEditRequirement.requirementId,
			progressRate: e,
		};
		await this.__updateRequirement(params);
	}

	protected render() {
		return (
			<div class={style.requirementStep}>
				<div>需求进度</div>
				<Steps
					v-model={this.currRequirementStep}
					direction="vertical"
					on-change={this.stepChange}
				>
					{this.renderStep()}
				</Steps>
			</div>
		);
	}

	renderStep() {
		return ProgressRateList.map((item) => {
			return (
				<Steps.Step title={item.label} description={item.desc}></Steps.Step>
			);
		});
	}
}
