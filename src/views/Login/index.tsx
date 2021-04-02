import { Form, Input, Icon, Checkbox, Button } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class';
const AccountStore = namespace('account');
const TeamStore = namespace('team');
import style from './index.less';
import crypto from '@/utils/crypto';
import { LoginParams, PhoenLoginParams } from '@/store/models/account/types';
import AccountApi from "@/api/account"

import localStore from '@/localStore';

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
		phoneNum: string;
		verifyCode: string;
	};

	@Action('login') login!: Function;
	@Action('phoneLogin') phoneLogin!: Function
	@AccountStore.Action('getAccountInfo') __getAccountInfo!: Function;

	// @TeamStore.Getter('teamList') teamList: any;
	// @TeamStore.Action('getTeamList') getTeamList!: Function;
	// @TeamStore.Action('updateCurrTeam') updateCurrTeam!: Function;

	async created() {
		
	}

	protected mounted() {
		let { phoneNum, verifyCode } = this.rememberLoginInfo || {
			phoneNum: '',
			verifyCode: '',
		};
		if (phoneNum !== '') {
			this.form.setFieldsValue({
				phoneNum: phoneNum,
			});		
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

	async getVerifyCode(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;

		validateFields(async (err: string, value: PhoenLoginParams) => {
			// 获取验证码结果
			try {
				const result = AccountApi.getVerifyCode({
					phoneNum: value.phoneNum,
				})
				console.log('getVerifyCode ------', result);
				this.$message.success('验证码已发送');
			} catch (error) {
				this.$message.success(error.msg);
			}
		});
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		const {
			form: { validateFields },
		} = this;
		validateFields(async (err: string, value: PhoenLoginParams) => {
			if (!err) {
				const postData: PhoenLoginParams = {
					phoneNum: value.phoneNum,
					verifyCode: value.verifyCode,
					loginType: 2,
					deviceType: '3',
					source: "packing",
				};	
				try {
					let res = await AccountApi.PhoneLogin(postData)
					localStore.setItem("UserInfo", res.data);
					let token = res.data.javaToken
					console.log(token);
					localStore.setItem("AccountToken", token);
					this.$router.push('/app');
				} catch (error) {
					console.log("-----", error);
					this.$message.error(error.msg);
				}
				// let ress = await AccountApi.PhoneLogin(postData).then(res=> {
				// 	console.log("-----", res);
					
				// 	if (res.code === 200) {
						
				// 	} else {
						
				// 	}
				// })
			}
		});
	}

	protected render() {
		const { getFieldDecorator } = this.form;
		return (
			<div class={style.login}>
				{/* <Bubble /> */}
				<div class={style.loginPanel}>
					{/* <Logo canClick={false} theme="lightDash" /> */}
					<Form
						class={style.loginForm}
						onSubmit={(event: Event) => this.handleSubmit(event)}
					>
						<Form.Item>
							{getFieldDecorator('phoneNum', {
								rules: [
									{
										required: true,
										message: '手机号不能为空',
									},
								],
							})(
								<Input
									size="large"
									type="text"
									name="phoneNum"
									placeholder="请输入手机号"
								>
									<Icon slot="prefix" type="user" />
								</Input>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('verifyCode', {
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
									type="verifyCode"
									name="verifyCode"
									placeholder="请输入验证码"
								>
									<Icon slot="prefix" type="lock" />
									
								</Input>
								<button class={style.captureBtn} onClick={(event: Event) => this.getVerifyCode(event)}>获取验证码</button>
								</div>
							)}
						</Form.Item>

						<Form.Item>
							
							<Button type="primary" block size="large" html-type="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}
export default Form.create({})(Login);
