import { Vue, Component } from 'vue-property-decorator';
import { Spin } from 'ant-design-vue';

@Component
export default class Loading extends Vue {
	render() {
		return (
			<Spin style={{ height: '100%' }} size="large">
				<div style={{ height: 'inherit' }}></div>
			</Spin>
		);
	}
}
