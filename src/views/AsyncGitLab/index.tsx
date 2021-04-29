import { Form, Input, Icon, Checkbox, Button } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const AccountStore = namespace("account");
import Bubble from "@/components/Common/Bubble";
import style from "./index.less";
import AccountApi from "@/api/account";
import crypto from "@/utils/crypto";
import Logo from "@/components/Common/Logo";
import { AsyncGitlabAccountParams } from "@/store/models/account/types";
import gitlabLogo from "@/assets/gitlab.svg";
import logo from "@/assets/logo.png";
@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class AsyncGitLab extends Vue {
	form: any;
	btnLoading: boolean = false;
	// 记住的用于登录信息
	@AccountStore.Action("asyncGitlabAccount") asyncGitlabAccount!: Function;

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: any) => {
			if (!err) {
				const params: AsyncGitlabAccountParams = {
					userName: value.userName,
					passWord: value.passWord,
				};

				try {
					this.btnLoading = true;
					await this.asyncGitlabAccount(params);
					this.$message.success("同步成功");
					this.$router.push("/app");
				} catch (error) {
					this.$message.success("同步失败");
				}
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<div class={style.asyncGitlab}>
				<Bubble />
				<div class={style.asyncPanel}>
					<div class={style.header}>
						<img class={style.img} src={gitlabLogo} alt="" />
						<div class={style.sq}>{"----授权---->"}</div>
						<img class={style.logoImg} src={logo} />
					</div>
					<Form
						class={style.loginForm}
						onSubmit={(event: Event) => this.handleSubmit(event)}
					>
						<Form.Item>
							{getFieldDecorator("userName", {
								rules: [
									{
										required: true,
										message: "gitlab用户名不能为空",
									},
								],
							})(
								<Input size="large" type="text" name="userName">
									<Icon slot="prefix" type="user" />
								</Input>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator("passWord", {
								rules: [
									{
										required: true,
										message: "gitlab密码不能为空",
									},
								],
							})(
								<Input size="large" type="password" name="passWord">
									<Icon slot="prefix" type="lock" />
								</Input>
							)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" block size="large" html-type="submit">
								登陆
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}
export default Form.create({})(AsyncGitLab);
