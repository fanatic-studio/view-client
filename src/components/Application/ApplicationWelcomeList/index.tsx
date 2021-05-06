import {
	Alert,
	Avatar,
	Button,
	Card,
	Col,
	Divider,
	Icon,
	Modal,
	Row,
	Table,
	Tabs,
	Tag,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import styles from "./index.less";
import {
	ApplicationMode,
	ApplicationWelcomeMode,
	ListApplicationWelcomeParams,
} from "@/store/models/application/types";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import ApplicationWelcomeAdd from "@/components/Application/ApplicationWelcomeAdd";
import ApplicationWelcomeEdit from "@/components/Application/ApplicationWelcomeEdit";
@Component
export default class ApplicationWelcomeList extends Vue {
	@ApplicationStore.Getter("currApplicationWelcomeList")
	currApplicationWelcomeList!: Array<ApplicationWelcomeMode>;
	@ApplicationStore.Getter("currApplicationWelcomeListCount")
	currApplicationWelcomeListCount!: number;
	@ApplicationStore.Action("getApplicationWelcomeList")
	getApplicationWelcomeList!: Function;
	@ApplicationStore.Action("updateEditApplicationWelcome")
	updateEditApplicationWelcome!: Function;
	@ApplicationStore.Action("checkApplicationWelcome")
	checkApplicationWelcome!: Function;

	@Prop(Object) readonly item!: ApplicationMode;

	addWelcomeModal: boolean = false;
	editWelcomeModal: boolean = false;
	editorApplicationWelcomeItem!: ApplicationWelcomeMode;
	updateListColumns: Array<any> = [
		{
			title: "名称",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "图片",
			dataIndex: "version",
			key: "version",
			customRender: this.rednerVersion,
		},
		{
			title: "说明",
			dataIndex: "platform",
			key: "platform",
			customRender: this.rednerPlatfrom,
		},
		{
			title: "等待时间",
			dataIndex: "debug",
			key: "debug",
			customRender: this.rednerDebug,
		},

		{
			title: "是否显示跳过",
			dataIndex: "updateMode",
			key: "updateMode",
			customRender: this.rednerWelcomeMode,
		},
		{
			title: "点击跳转",
			dataIndex: "reboot",
			key: "reboot",
			customRender: this.rednerReboot,
		},
		{
			title: "开始时间",
			dataIndex: "clearCache",
			key: "clearCache",
			customRender: this.rednerWelcomeAction,
		},
		{
			title: "结束时间",
			dataIndex: "valid",
			key: "valid",
			customRender: this.rednerValid,
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			customRender: this.rednerStatus,
		},
		{
			title: "操作",
			customRender: this.renderAction,
		},
	];

	currentPage: number = 1;
	pageSize: number = 5;
	async created() {
		await this.__getApplicationWelcomeList();
	}

	private addWelcomeModalHandle() {
		this.addWelcomeModal = !this.addWelcomeModal;
	}
	private editWelcomeModalHandle() {
		this.editWelcomeModal = !this.editWelcomeModal;
	}

	private async pageChange(e: any) {
		console.log("e", e);
		this.currentPage = e;
		await this.__getApplicationWelcomeList();
	}

	private async __getApplicationWelcomeList() {
		const params = {
			pageIndex: this.currentPage,
			pageSize: this.pageSize,
		};
		console.log("params", params);

		await this.getApplicationWelcomeList(params);
	}

	checkWelcomeBtnLoading: boolean = false;
	private async checkAppWelcome() {
		this.checkWelcomeBtnLoading = true;
		const res = await this.checkApplicationWelcome();
		this.checkWelcomeBtnLoading = false;
		if (res.uplists.length > 0) {
			this.$success({
				title: "发现热更新成功",
				content: this.renderCheckAppWelcomeTips(res.uplists[0]),
			});
		} else {
			this.$error({
				title: "当前没有可用热更新",
			});
		}
	}

	render() {
		return (
			<div class={styles.applicationWelcomeList}>
				<div class={styles.buttonGroups}>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addWelcomeModalHandle}
					>
						添加欢迎页
					</Button>
					<Button
						slot="tabBarExtraContent"
						type="danger"
						style={{ marginLeft: "8px" }}
						loading={this.checkWelcomeBtnLoading}
						on-click={this.checkAppWelcome}
					>
						测试欢迎页
					</Button>
				</div>

				<Table
					rowKey="id"
					columns={this.updateListColumns}
					data-source={this.currApplicationWelcomeList}
					pagination={{
						pageSize: this.pageSize,
						current: this.currentPage,
						total: this.currApplicationWelcomeListCount,
						onChange: this.pageChange,
						showTotal: (total: number) => `总共${total}条`,
					}}
				></Table>
				<Modal
					title="新增欢迎页"
					visible={this.addWelcomeModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addWelcomeModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationWelcomeAdd
						on-emitWelcomeApplicationWelcomeList={async () => {
							this.addWelcomeModal = !this.addWelcomeModal;
							await this.__getApplicationWelcomeList();
						}}
					/>
				</Modal>
				<Modal
					title="编辑欢迎页"
					visible={this.editWelcomeModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.editWelcomeModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationWelcomeEdit
						on-emitWelcomeApplicationWelcomeList={async () => {
							this.editWelcomeModal = !this.editWelcomeModal;
							await this.__getApplicationWelcomeList();
						}}
					/>
				</Modal>
			</div>
		);
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
				<Row>
					<Tag color="red">提示重启</Tag>
					<Card style={{ marginTop: "8px" }} title={record.rebootTitle}>
						<div>{record.rebootMessage}</div>
						<div slot="actions">
							确认按钮行为:
							{record.rebootConfirmReboot === "0" ? (
								<Tag color="blue">静默</Tag>
							) : (
								<Tag color="orange">自动重启</Tag>
							)}
						</div>
					</Card>
				</Row>
			);
		}
	}

	private rednerWelcomeMode(text: any, record: any, index: number) {
		if (record.updateMode === "0") {
			return <Tag color="blue">自动触发</Tag>;
		}
		if (record.updateMode === "1") {
			return <Tag color="orange">客户端触发</Tag>;
		}
	}

	private rednerWelcomeAction(text: any, record: any, index: number) {
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
						this.updateEditApplicationWelcome(record);
						this.editWelcomeModalHandle();
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

	private renderCheckAppWelcomeTips(updateData: any) {
		return (
			<Alert type="info">
				<div slot="message">
					<Row gutter={8}>
						<Col span="8">重启类型:</Col>
						<Col span="16">
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
						</Col>
					</Row>
					<Row gutter={8} style={{ marginTop: "8px" }}>
						<Col span="8">是否清除缓存:</Col>
						<Col span="16">
							{this.rednerWelcomeAction(
								null,
								{ clearCache: updateData.clear_cache },
								0
							)}
						</Col>
					</Row>
				</div>
			</Alert>
		);
	}
}
