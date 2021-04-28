import { Avatar, Card, Icon, Tag, Tooltip } from "ant-design-vue";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import style from "./index.less";
import { ApplicationMode } from "@/store/models/application/types";

@Component
export default class ApplicationUpdateEdit extends Vue {
	@Prop(Object) readonly item!: ApplicationMode;
	render() {
		return (
			<Card class={style.applicationItem} hoverable style="">
				<div class={style.baseInfo} slot="cover">
					<div class={style.title}>
						<div class={style.cName}>{this.item.cName}</div>
						<Tag>{this.item.name}</Tag>
						<Tag>{this.renderAppType(this.item.appType)}</Tag>
					</div>
					<div class={style.desc}>{this.item.desc}</div>
					<div class={style.ontherInfo}>
						<div class={style.assignee}>
							<Tooltip placement="top">
								<div slot="title">负责人：</div>
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							</Tooltip>
						</div>
						<div class={style.version}>
							<Tooltip placement="top">
								<div slot="title">版本号</div>
								<Tag>1.0 - 20200101</Tag>
							</Tooltip>
						</div>
					</div>
				</div>
			</Card>
		);
	}

	renderAppType(appType: string) {
		if (appType === "native") {
			return "原生";
		}
	}
}
