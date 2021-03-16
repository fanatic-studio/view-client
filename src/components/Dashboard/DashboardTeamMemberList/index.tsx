import { Card } from 'ant-design-vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import style from './index.less';
import { namespace } from 'vuex-class';
import { ProjectMemberMode } from '@/store/models/project/types';
const ProjectStore = namespace('project');
@Component
export default class DashboardTeamMemberList extends Vue {
	@ProjectStore.Action('getProjectMemberLis') getProjectMemberLis!: Function;
	@ProjectStore.Getter('projectMemberList') projectMemberList!: Array<
		ProjectMemberMode
	>;
	bodyStyle = {
		padding: '0',
	};
	protected render() {
		return (
			<Card
				class={style.workTeamMemberList}
				bodyStyle={this.bodyStyle}
				title="团队成员排名"
			>
				<div slot="extra">issue数排名</div>
				{this.renderMemberList()}
			</Card>
		);
	}

	renderMemberList() {
		return this.projectMemberList.map((item) => {
			return (
				<Card.Grid class={style.content}>
					<div>{item.nickName}</div>
				</Card.Grid>
			);
		});
	}
}
