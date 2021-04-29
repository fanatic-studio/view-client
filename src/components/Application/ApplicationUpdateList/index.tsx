import {
	Alert,
	Avatar,
	Button,
	Card,
	Divider,
	Icon,
	Modal,
	Table,
	Tabs,
	Tag,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import styles from "./index.less";
import {
	ApplicationMode,
	ApplicationUpdateMode,
	ListApplicationUpdateParams,
} from "@/store/models/application/types";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import ApplicationUpdateAdd from "@/components/Application/ApplicationUpdateAdd";
import ApplicationUpdateEdit from "@/components/Application/ApplicationUpdateEdit";
@Component
export default class ApplicationUpdateList extends Vue {
	@ApplicationStore.Getter("currApplicationUpdateList")
	currApplicationUpdateList!: Array<ApplicationUpdateMode>;
	@ApplicationStore.Getter("currApplicationUpdateListCount")
	currApplicationUpdateListCount!: number;
	@ApplicationStore.Action("getApplicationUpdateList")
	getApplicationUpdateList!: Function;
	@ApplicationStore.Action("updateEditApplicationUpdate")
	updateEditApplicationUpdate!: Function;
	@ApplicationStore.Action("checkApplicationUpdate")
	checkApplicationUpdate!: Function;

	@Prop(Object) readonly item!: ApplicationMode;

	addUpdateModal: boolean = false;
	editUpdateModal: boolean = false;
	editorApplicationUpdateItem!: ApplicationUpdateMode;
	updateListColumns: Array<any> = [
		{
			dataIndex: "title",
			key: "title",
			title: "更新名称",
		},
		{
			title: "更新版本",
			dataIndex: "version",
			width: "300",
			key: "version",
			customRender: this.rednerVersion,
		},
		{
			title: "适合平台",
			dataIndex: "platform",
			key: "platform",
			customRender: this.rednerPlatfrom,
		},
		{
			title: "DEBUG版本",
			dataIndex: "debug",
			key: "debug",
			customRender: this.rednerDebug,
		},

		{
			title: "更新模式",
			dataIndex: "updateMode",
			key: "updateMode",
			customRender: this.rednerUpdateMode,
		},
		{
			title: "重启模式",
			dataIndex: "reboot",
			key: "reboot",
			customRender: this.rednerReboot,
		},
		{
			title: "缓存处理",
			dataIndex: "clearCache",
			key: "clearCache",
			customRender: this.rednerUpdateAction,
		},
		// {
		// 	title: "已更新数量",
		// 	dataIndex: "debug",
		// 	key: "debug",
		// },
		{
			title: "启用状态",
			dataIndex: "valid",
			key: "valid",
			customRender: this.rednerValid,
		},
		// {
		// 	title: "状态",
		// 	dataIndex: "status",
		// 	key: "status",
		// 	customRender: this.rednerStatus,
		// },
		{
			title: "操作",
			customRender: this.renderAction,
		},
	];

	currentPage: number = 1;
	pageSize: number = 5;
	async created() {
		await this.__getApplicationUpdateList();
	}

	private addUpdateModalHandle() {
		this.addUpdateModal = !this.addUpdateModal;
	}
	private editUpdateModalHandle() {
		this.editUpdateModal = !this.editUpdateModal;
	}

	private async pageChange(e: any) {
		console.log("e", e);
		this.currentPage = e;
		await this.__getApplicationUpdateList();
	}

	private async __getApplicationUpdateList() {
		const params = {
			pageIndex: this.currentPage,
			pageSize: this.pageSize,
		};
		console.log("params", params);

		await this.getApplicationUpdateList(params);
	}

	private async checkAppUpdate() {
		const res = await this.checkApplicationUpdate();
		if (res.uplists.length > 0) {
			this.$notification.open({
				message: "发现新的热更新",
				duration: 10,
				description: this.renderCheckAppUpdateTips(res.uplists[0]),
				icon: <Icon type="smile" style="color: #108ee9" />,
			});
		}
	}

	render() {
		return (
			<div class={styles.applicationUpdateList}>
				<div class={styles.buttonGroups}>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addUpdateModalHandle}
					>
						添加热更新
					</Button>
					<Button
						slot="tabBarExtraContent"
						type="danger"
						style={{ marginLeft: "8px" }}
						on-click={this.checkAppUpdate}
					>
						热更新测试
					</Button>
				</div>

				<Table
					rowKey="id"
					columns={this.updateListColumns}
					data-source={this.currApplicationUpdateList}
					pagination={{
						pageSize: this.pageSize,
						current: this.currentPage,
						total: this.currApplicationUpdateListCount,
						onChange: this.pageChange,
						showTotal: (total: number) => `总共${total}条`,
					}}
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
					<ApplicationUpdateAdd
						on-emitUpdateApplicationUpdateList={async () => {
							this.addUpdateModal = !this.addUpdateModal;
							await this.__getApplicationUpdateList();
						}}
					/>
				</Modal>
				<Modal
					title="编辑热更新"
					visible={this.editUpdateModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.editUpdateModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationUpdateEdit
						on-emitUpdateApplicationUpdateList={async () => {
							this.editUpdateModal = !this.editUpdateModal;
							await this.__getApplicationUpdateList();
						}}
					/>
				</Modal>
			</div>
		);
	}

	renderAppType(appType: string) {
		if (appType === "native") {
			return "原生";
		}
	}

	private rednerVersion(text: any, record: any, index: number) {
		const verson: Array<string> = record.version.split(",");
		return verson.map((item) => {
			return <Tag color="blue">{item}</Tag>;
		});
	}

	private rednerPlatfrom(text: any, record: any, index: number) {
		let platform = record.platform.split(",");
		if (platform.length > 1) {
			return (
				<div>
					<Icon type="android" theme="filled" style={{ color: "#2def0a" }} />
					<Icon type="apple" theme="filled" />
				</div>
			);
		} else {
			if (platform[0] === "ios") {
				return <Icon type="apple" />;
			}
			if (platform[0] === "android") {
				return <Icon type="android" style={{ color: "#2def0a" }} />;
			}
		}
	}
	private rednerDebug(text: any, record: any, index: number) {
		if (record.debug === "0") {
			return <Tag color="blue">排除Debug</Tag>;
		}
		if (record.debug === "1") {
			return <Tag color="orange">包含Debug</Tag>;
		}
		if (record.debug === "2") {
			return <Tag color="red">仅限Debug</Tag>;
		}
	}

	private rednerReboot(text: any, record: any, index: number) {
		if (record.reboot === "0") {
			return <Tag color="blue">静默</Tag>;
		}
		if (record.reboot === "1") {
			return <Tag color="orange">自动重启</Tag>;
		}
		if (record.reboot === "2") {
			return (
				<div>
					<div>提示重启</div>
					<div>重启title：{record.rebootTitle}</div>
					<div>重启说明：{record.rebootMessage}</div>
					<div>
						确认按钮行为:{record.rebootConfirmReboot === "0" ? "静默" : "重启"}
					</div>
				</div>
			);
		}
	}

	private rednerUpdateMode(text: any, record: any, index: number) {
		if (record.updateMode === "0") {
			return <Tag color="blue">自动触发</Tag>;
		}
		if (record.updateMode === "1") {
			return <Tag color="orange">客户端触发</Tag>;
		}
	}

	private rednerUpdateAction(text: any, record: any, index: number) {
		if (record.clearCache === "0") {
			return <Tag color="blue">保留缓存</Tag>;
		}
		if (record.clearCache === "1") {
			return <Tag color="red">清除缓存</Tag>;
		}
	}

	private rednerValid(text: any, record: any, index: number) {
		if (record.valid === "1") {
			return <Tag color="blue">启用</Tag>;
		}
		if (record.valid === "0") {
			return <Tag color="orange">暂停</Tag>;
		}
		if (record.valid === "2") {
			return <Tag color="red">撤回</Tag>;
		}
	}

	private rednerStatus(text: any, record: any, index: number) {
		if (record.status === "0") {
			return <Tag color="blue">正常</Tag>;
		}
		if (record.status === "1") {
			return <Tag color="red">删除</Tag>;
		}
	}

	private renderAction(text: any, record: any, index: number) {
		return (
			<div class={styles.actionButton}>
				<Button
					type="primary"
					size="small"
					on-click={() => {
						this.updateEditApplicationUpdate(record);
						this.editUpdateModalHandle();
					}}
				>
					编辑
				</Button>
				<Button type="danger" size="small">
					删除
				</Button>
			</div>
		);
	}

	private renderCheckAppUpdateTips(updateData: any) {
		return (
			<Alert type="info">
				<div slot="message">
					<div>
						重启类型
						{this.rednerReboot(
							null,
							{
								reboot: updateData.reboot,
								rebootTitle: updateData.reboot_info.title,
								rebootMessage: updateData.reboot_info.message,
								rebootConfirmReboot: updateData.reboot_info.confirm_reboot,
							},
							0
						)}
					</div>
					<div>
						是否清楚缓存
						{this.rednerUpdateAction(
							null,
							{ clearCache: updateData.clear_cache },
							0
						)}
					</div>
				</div>
			</Alert>
		);
	}
}
