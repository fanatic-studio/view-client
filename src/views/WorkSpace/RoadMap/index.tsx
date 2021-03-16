import { Component, Vue, Watch } from 'vue-property-decorator';
import styles from './index.less';
import Gantt from '@viewdesign/v-gantt';
import { namespace } from 'vuex-class';
import { MilestoneMode } from '@/store/models/milestone/types';
import { team } from '@/mock/home';
import moment from 'moment';
import { RoadMapData, RoadMapDataItem } from './types';
const MilestoneStore = namespace('milestone');
@Component
export default class Plan extends Vue {
	@MilestoneStore.Getter('milestoneList') __milestoneList!: Array<
		MilestoneMode
	>;
	@MilestoneStore.Getter('milestoneListCount') milestoneListCount!: number;
	@MilestoneStore.Action('getMilestoneList') __getMilestoneList!: Function;

	dataList: Array<any> = [];
	@Watch('__milestoneList')
	watchMilestoneList() {
		this.dataList = this.genDataList(this.__milestoneList);
	}

	updateData(e: any) {
		console.log('e', e);
		// this.dataList = e;
	}

	genDataList(props: Array<MilestoneMode>) {
		let list: Array<RoadMapData> = [];
		props.map((item, index) => {
			let d: RoadMapData = {
				id: item.milestoneId,
				name: item.name,
			};
			d.children = [];
			if (item.issueList && item.issueList.length > 0) {
				let c: Array<RoadMapDataItem> = [
					{
						id: item.milestoneId + '1',
						name: item.name,
						date: moment(item.onlineAt).format('YYYY-MM-DD'),
						done: false,
					},
				];
				item.issueList.map((item) => {
					c.push({
						id: item.issuesId,
						name: item.name,
						progress: item.progress,
						startDate: moment(item.startAt).format('YYYY-MM-DD'),
						endDate: moment(item.endAt).format('YYYY-MM-DD'),
					});
				});

				d.children = c;
			}

			list.push(d);
		});
		console.log('list', list);

		return list;
	}

	render() {
		return (
			<div class={styles.roadMap}>
				<Gantt
					style="height: 800px;"
					data={this.dataList}
					on={{ ['update:data']: this.updateData }}
					scopedSlots={{
						treeItemTitle: (itemData: any) => {
							return <div>{itemData.itemData.name}</div>;
						},
					}}
				></Gantt>
			</div>
		);
	}
}
