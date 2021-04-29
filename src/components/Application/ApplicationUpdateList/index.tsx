import {
	Avatar,
	Button,
	Card,
	Icon,
	Modal,
	Table,
	Tag,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import style from "./index.less";
import {
	ApplicationMode,
	ApplicationUpdateMode,
	ListApplicationUpdateParams,
} from "@/store/models/application/types";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import ApplicationUpdateAdd from "@/components/Application/ApplicationUpdateAdd";
@Component
export default class ApplicationUpdateList extends Vue {
	@ApplicationStore.Getter("applicationUpdateList")
	applicationUpdateList!: Array<ApplicationUpdateMode>;
	@ApplicationStore.Action("getApplicationUpdateList")
	getApplicationUpdateList!: Function;
	@Prop(Object) readonly item!: ApplicationMode;

	addUpdateModal: boolean = false;

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

	async created() {
		await this.getApplicationUpdateList();
	}

	addUpdateModalHandle() {
		this.addUpdateModal = !this.addUpdateModal;
	}

	render() {
		return (
			<div>
				<Button on-click={this.addUpdateModalHandle}>添加热更新</Button>
				<Table
					columns={this.versionListColumns}
					data-source={this.versionListData}
				></Table>
				<Modal
					title="新增热更新"
					visible={this.addUpdateModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addUpdateModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationUpdateAdd />
				</Modal>
			</div>
		);
	}

	renderAppType(appType: string) {
		if (appType === "native") {
			return "原生";
		}
	}
}
