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
	Timeline,
	Tooltip,
} from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import styles from "./index.less";
import {
	ApplicationMode,
	ApplicationVersionMode,
} from "@/store/models/application/types";
import { namespace } from "vuex-class";
const ApplicationStore = namespace("application");
import ApplicationVersionAdd from "@/components/Application/ApplicationVersionAdd";
import ApplicationVersionEdit from "@/components/Application/ApplicationVersionEdit";
import templateImg1 from "@/assets/image/version/1b.png";
import templateImg2 from "@/assets/image/version/2b.png";
import templateImg3 from "@/assets/image/version/3b.png";
import templateImg4 from "@/assets/image/version/4b.png";
import templateImg5 from "@/assets/image/version/5b.png";
@Component
export default class ApplicationVersionList extends Vue {
	@ApplicationStore.Getter("currApplicationVersionList")
	currApplicationVersionList!: Array<ApplicationVersionMode>;
	@ApplicationStore.Getter("currApplicationVersionListCount")
	currApplicationVersionListCount!: number;
	@ApplicationStore.Action("getApplicationVersionList")
	getApplicationVersionList!: Function;
	@ApplicationStore.Action("updateEditApplicationVersion")
	updateEditApplicationVersion!: Function;
	@ApplicationStore.Action("checkApplicationUpdate")
	checkApplicationUpdate!: Function;

	@Prop(Object) readonly item!: ApplicationMode;

	addVersionModal: boolean = false;
	editVersionModal: boolean = false;
	editorApplicationVersionItem!: ApplicationVersionMode;

	currentPage: number = 1;
	pageSize: number = 5;
	async created() {
		await this.__getApplicationVersionList();
	}

	private addVersionModalHandle() {
		this.addVersionModal = !this.addVersionModal;
	}
	private editVersionModalHandle() {
		this.editVersionModal = !this.editVersionModal;
	}

	private async pageChange(e: any) {
		console.log("e", e);
		this.currentPage = e;
		await this.__getApplicationVersionList();
	}

	private async __getApplicationVersionList() {
		const params = {
			pageIndex: this.currentPage,
			pageSize: this.pageSize,
		};
		console.log("params", params);

		await this.getApplicationVersionList(params);
	}

	checkVersionBtnLoading: boolean = false;
	private async checkAppVersion() {
		this.checkVersionBtnLoading = true;
		const res = await this.checkApplicationUpdate();
		this.checkVersionBtnLoading = false;
		if (res.uplists.length > 0) {
			this.$success({
				title: "发现热更新成功",
				content: this.renderCheckAppVersionTips(res.uplists[0]),
			});
		} else {
			this.$error({
				title: "当前没有可用热更新",
			});
		}
	}

	render() {
		return (
			<div class={styles.applicationVersionList}>
				<div class={styles.buttonGroups}>
					<Button
						slot="tabBarExtraContent"
						type="primary"
						on-click={this.addVersionModalHandle}
					>
						添加版本
					</Button>
					<Button
						slot="tabBarExtraContent"
						type="danger"
						style={{ marginLeft: "8px" }}
						loading={this.checkVersionBtnLoading}
						on-click={this.checkAppVersion}
					>
						版本发版测试
					</Button>
				</div>
				<Timeline class={styles.itemLine}>{this.renderTimeLineItem()}</Timeline>
				<Modal
					title="新增版本"
					visible={this.addVersionModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.addVersionModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationVersionAdd
						on-emitVersionApplicationVersionList={async () => {
							this.addVersionModal = !this.addVersionModal;
							await this.__getApplicationVersionList();
						}}
					/>
				</Modal>
				<Modal
					title="编辑版本"
					visible={this.editVersionModal}
					width={1000}
					dialog-style={{ top: "20px" }}
					on-cancel={this.editVersionModalHandle}
					maskClosable={false}
					footer={null}
				>
					<ApplicationVersionEdit
						on-emitVersionApplicationVersionList={async () => {
							this.editVersionModal = !this.editVersionModal;
							await this.__getApplicationVersionList();
						}}
					/>
				</Modal>
			</div>
		);
	}

	protected renderTimeLineItem() {
		return this.currApplicationVersionList.map((item) => {
			return (
				<Timeline.Item>
					<Icon slot="dot" type="tag" />
					<Card class={styles.timelineItemCard}>
						<div slot="title" class={styles.title}>
							<div class={styles.titleLeft}>
								<Tag color="blue">
									<Icon type="tag" style={{ marginRight: "4px" }} />
									{item.versionName}
								</Tag>

								<Tag color="green">
									<Icon type="appstore" style={{ marginRight: "4px" }} />
									{item.version}
								</Tag>
								<Tag color="purple">
									{item.versionName} - {item.version}
								</Tag>
								{this.rednerPlatfrom(item.platform)}
								{this.rednerDebug(item.debug)}
								{this.rednerForced(item.forced)}
							</div>
							{this.renderAction(item)}
						</div>
						<div slot="cover" class={styles.versionContent}>
							<div class={styles.versionUI}>
								{this.rendertemplateIdImg(item.templateId)}
								<div class={styles.versionInfo}>
									<div class={styles.title}>{item.title}</div>
									<mavon-editor
										class={styles.mavonEditorPreview}
										value={item.content}
										style={{
											zIndex: 1,
											cursor: "pointer",
											minWidth: "260px",
											minHeight: "120px",
										}}
										defaultOpen="preview"
										boxShadow={false}
										editable={false}
										subfield={false}
										toolbarsFlag={false}
									></mavon-editor>
								</div>
							</div>
							<div class={styles.qrcodes}>
								<div class={styles.qrcode}>
									<div>iOS下载地址</div>
									<vue-qr text={item.iOSUrl} size={200}></vue-qr>
									<div>请使用微信扫码</div>
								</div>
								<div class={styles.qrcode}>
									<div>安卓下载地址</div>
									<vue-qr text={item.androidUrl} size={200}></vue-qr>
									<div>请使用自带浏览器扫码</div>
								</div>
							</div>
						</div>
					</Card>
				</Timeline.Item>
			);
		});
	}

	private rednerPlatfrom(platformParams: string) {
		let platform = platformParams.split(",");
		if (platform.length > 1) {
			return (
				<div style={{ marginRight: "8px" }}>
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
	private rednerDebug(debug: string) {
		if (debug === "0") {
			return <Tag color="blue">排除Debug</Tag>;
		}
		if (debug === "1") {
			return <Tag color="orange">包含Debug</Tag>;
		}
		if (debug === "2") {
			return <Tag color="red">仅限Debug</Tag>;
		}
	}

	private rednerForced(forced: string) {
		if (forced === "0") {
			return <Tag color="blue">自由更新</Tag>;
		}
		if (forced === "1") {
			return <Tag color="orange">强制更新</Tag>;
		}
	}

	private renderAction(record: any) {
		return (
			<div class={styles.actionButton}>
				<Button
					type="primary"
					size="small"
					on-click={() => {
						this.updateEditApplicationVersion(record);
						this.editVersionModalHandle();
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

	private renderCheckAppVersionTips(updateData: any) {
		return (
			<Alert type="info">
				<div slot="message">
					<Row gutter={8}>
						<Col span="8">重启类型:</Col>
						<Col span="16"></Col>
					</Row>
					<Row gutter={8} style={{ marginTop: "8px" }}>
						<Col span="8">是否清除缓存:</Col>
						<Col span="16"></Col>
					</Row>
				</div>
			</Alert>
		);
	}

	protected rendertemplateIdImg(templateId: string) {
		if (templateId === "1") {
			return <img class={styles.templateImg} src={templateImg1}></img>;
		}
		if (templateId === "2") {
			return <img class={styles.templateImg} src={templateImg2}></img>;
		}
		if (templateId === "3") {
			return <img class={styles.templateImg} src={templateImg3}></img>;
		}
		if (templateId === "4") {
			return <img class={styles.templateImg} src={templateImg4}></img>;
		}
		if (templateId === "5") {
			return <img class={styles.templateImg} src={templateImg5}></img>;
		}
	}
}
