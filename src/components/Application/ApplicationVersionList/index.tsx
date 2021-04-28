import { Avatar, Card, Icon, Table, Tag, Tooltip } from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import style from "./index.less";
import { ApplicationMode } from "@/store/models/application/types";

@Component
export default class ApplicationVersionList extends Vue {
	@Prop(Object) readonly item!: ApplicationMode;

	versionListColumns: Array<any> = [
		{
			dataIndex: "name",
			key: "name",
			slots: { title: "customTitle" },
			scopedSlots: { customRender: "name" },
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];
	versionListData: Array<any> = [];
	render() {
		return (
			<Table
				columns={this.versionListColumns}
				data-source={this.versionListData}
			></Table>
		);
	}

	renderAppType(appType: string) {
		if (appType === "native") {
			return "原生";
		}
	}
}
