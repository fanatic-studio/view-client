import { Form, Input, Icon, Checkbox, Button } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
const AccountStore = namespace('account');
const TeamStore = namespace('team');
import Bubble from '@/components/Basic/Bubble';
import style from './index.less';
import crypto from '@/utils/crypto';
import Logo from '@/components/Basic/Logo';
import { LoginParams } from '@/store/models/account/types';
@Component({
	props: {
		form: {
			type: Object,
		},
	},
})
class Login extends Vue {
	form: any;
	btnLoading: boolean = false;
	codeUrl: string = '';
	uuid!: string;

	// 是否记住密码
	@State((state) => state.rememberMe) rememberMeChecked!: boolean;
	@Action('toggleRmemberMe') toggleRmemberMe: Function;
	@Action('getCode') getCode!: Function;

	// 记住的用于登录信息
	@State((state) => state.rememberLoginInfo) rememberLoginInfo!: {
		username: string;
		password: string;
	};

	@Action('login') login!: Function;
	@AccountStore.Action('getAccountInfo') __getAccountInfo!: Function;

	// @TeamStore.Getter('teamList') teamList: any;
	// @TeamStore.Action('getTeamList') getTeamList!: Function;
	// @TeamStore.Action('updateCurrTeam') updateCurrTeam!: Function;

	async created() {
		await this.getVCode();
		// await this.getTeamList();
	}

	protected mounted() {
		let { username, password } = this.rememberLoginInfo || {
			username: '',
			password: '',
		};
		if (username !== '') {
			this.form.setFieldsValue({
				username: username,
			});
		}
		if (this.rememberMeChecked) {
			try {
				const passwordS = crypto.decrypt(password);
				this.form.setFieldsValue({
					password: passwordS,
				});
			} catch (e) {
				console.error(e);
			}
		}
	}

	rememberMe(e: { target: { checked: boolean } }) {
		this.toggleRmemberMe(e.target.checked);
		if (!e.target.checked) {
			this.form.setFieldsValue({
				password: '',
			});
		}
	}

	async getVCode() {
		let res = await this.getCode();
		this.codeUrl = res.data;
		this.uuid = res.id;
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: LoginParams) => {
			if (!err) {
				const postData: LoginParams = {
					username: value.username,
					password: value.password,
					code: value.code,
				};
				postData.uuid = this.uuid;
				this.btnLoading = true;
				const res = await this.login(postData);
				if (res) {
					const resultData = await this.__getAccountInfo();
					this.btnLoading = false;
					this.$message.success('登陆成功');
					if (
						resultData.accountData &&
						resultData.accountData.gitLabAccountId === 0
					) {
						this.$router.push('/asyncGitLab');
					} else {
						this.$router.push('/dashbord');
					}
				} else {
					this.btnLoading = false;
					this.getVCode();
					this.$message.error('账号或密码错误');
				}
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<div class={style.login}>
				<Bubble />
				<div class={style.loginPanel}>
					<Logo canClick={false} theme="lightDash" />
					<Form
						class={style.loginForm}
						onSubmit={(event: Event) => this.handleSubmit(event)}
					>
						<Form.Item>
							{getFieldDecorator('username', {
								rules: [
									{
										required: true,
										message: '用户名不能为空',
									},
								],
							})(
								<Input
									size="large"
									type="text"
									name="username"
									placeholder="请输入用户名"
								>
									<Icon slot="prefix" type="user" />
								</Input>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '密码不能为空',
									},
								],
							})(
								<Input
									size="large"
									type="password"
									name="password"
									placeholder="请输入密码"
								>
									<Icon slot="prefix" type="lock" />
								</Input>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('code', {
								rules: [
									{
										required: true,
										message: '验证码不能为空',
									},
								],
							})(
								<div class={style.inputCode}>
									<Input
										size="large"
										type="text"
										name="code"
										placeholder="请输入验证码"
									>
										<Icon slot="prefix" type="lock" />
									</Input>
									<img
										class={style.codeImg}
										src={this.codeUrl}
										onClick={() => {
											this.getVCode();
										}}
									></img>
								</div>
							)}
						</Form.Item>
						<Form.Item>
							<Checkbox
								checked={this.rememberMeChecked}
								onChange={this.rememberMe}
							>
								记住密码
							</Checkbox>
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
export default Form.create({})(Login);
