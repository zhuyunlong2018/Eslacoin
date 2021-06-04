<!-- 忘记密码 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('login.forget.navTitle')"
			backgroundColor="transparent"
		/>
		<view class="login-view">
			<view class="input-view">
				<!-- 下拉选框组件 -->
				<PhoneNumber :phoneNumber.sync='phoneNumber' leftWidth="0" />
				<input placeholder-class="placeholder" class="p-l120" 
					:placeholder="$t('common.placeholder')[0]" 
					:maxlength="11" type="number" v-model.trim="account"></input>
			</view>
			<view class="input-view">
				<view class="title">{{ $t('common.labels')[0] }}</view>
				<input placeholder-class="placeholder" 
					:placeholder="$t('common.placeholder')[1]" 
					:password="true"
					:maxlength="12" v-model="password"></input>
			</view>
			<view class="input-view">
				<view class="title">{{ $t('common.labels')[1] }}</view>
				<input class="catpcha-input" placeholder-class="placeholder" 
					:maxlength="6" type="number" v-model.trim="PhoneCode"
					:placeholder="$t('common.placeholder')[2]" ></input>
				<view class="capture">
					<text @click="getCodeBtn()">
						{{ !disabledBtn ? $t('common.btns')[0] : `${timeNumber}s${$t('common.btns')[1]}` }}
					</text>
				</view>
			</view>
		</view>
		<view style="padding: 0 85rpx;">
			<uni-botton
				:btnText="$t('login.forget.btns')[0]"
				@click='onChangePwdBtnClick'
			/>
		</view>
	</view>
</template>

<script>
	import PhoneNumber from '@/components/phoneNumber/phoneNumber';
	import { verificationPhone, verificationPassword, verificationCode } from '@/common/cs_util.js';
	export default {
		components: {
			PhoneNumber
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				account: '',
				password: '',
				PhoneCode: '',
				codeStr: this.$t('login.forget.btns')[1],
				count: '',
				timer: null,
				phoneNumber: '+86',
				// 是否禁用按钮
				disabledBtn: false,
				// 轮询函数
				setIntervalFn: null,
				// 倒计时
				timeNumber: 59
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//修改密码按钮点击
			onChangePwdBtnClick() {
				if (!verificationPhone(this.account)) {
					uni.showToast({
						title: this.account ? this.$t('common.tips')[1] : this.$t('common.tips')[0],
						icon: "none",
						duration: 1000
					})
					return false;
				}
				if (!verificationPassword(this.password)) {
					uni.showToast({
						title: this.password ? this.$t('common.tips')[3] : this.$t('common.tips')[2],
						icon: "none",
						duration: 1000
					})
					return false;
				}
				if (!verificationCode(this.PhoneCode)) {
					uni.showToast({
						title: this.PhoneCode ? this.$t('common.tips')[5] : this.$t('common.tips')[4],
						icon: "none",
						duration: 1000
					})
					return false;
				}
				
				let params = {
					Account: this.account.trim(),
					Password: this.password,
					PhoneCode: this.PhoneCode
				}
				this.CsHttp.post(this.ApiConfig.User + '/BSUpdatePasswordReq', params, false).then(ackMsg => {
					console.log('收到修改密码的回复:' + JSON.stringify(ackMsg))
						this.disabledBtn = false;
						this.timeNumber = 59;
					if (ackMsg.Code == 0) {
						uni.showModal({
							content: this.$t('login.forget.tips')[0],
							showCancel: false,
							success() {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}
						})
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						});
					}
					
				})
			},
			// 获取验证码按钮
			getCodeBtn() {
				// 验证是否输入手机号码
				if (!verificationPhone(this.account)) {
					uni.showToast({
						title: this.account ? this.$t('common.tips')[1] : this.$t('common.tips')[0],
						icon: "none",
						duration: 1000
					})
					return false;
				}
				if (!this.disabledBtn) {
					this.disabledBtn = true;
					this.CsHttp.post(this.ApiConfig.User + '/BSPhoneCodeReq', {
						PhoneNumber: this.account,
						OptType: 1
					}).then(res => {
						console.log(res)
						if (res.Code == 0) {
							uni.showToast({
							    title: this.$t('common.tips')[6],
								icon: 'none',
							    duration: 1000
							});
							this.setIntervalFn = setInterval(() => {
								if (this.timeNumber == 0) {
									clearInterval(this.setIntervalFn);
									this.disabledBtn = false;
									this.timeNumber = 59;
								}
								this.timeNumber--;
							}, 1000)
						} else {
							this.disabledBtn = false;
							uni.showModal({
								content: res.Msg,
								showCancel: false,
							});
						}
					}).catch(err => {
						this.disabledBtn = false;
					})
					
				}
			},
			
			//获取验证码
			getCode() {
				console.log('点击获取验证码')
				const TIME_COUNT = 60;
				//计时器工作中不能发送请求
				if (!this.timer) {
					this.count = TIME_COUNT;
					let BSRegisterAccountReq = {
						RecommendId: '0',
						Account: this.account.trim(),
						Password: this.password,
						AccountType: 'NORMAL',
						Channel: 'inner',
						Device: 'WEB'
					}
					let vm = this;
					vm.codeStr = '短信发送中'
					//发送短信
					this.CsHttp.post(this.ApiConfig.User + '/BSRegisterAccountReq', BSRegisterAccountReq, false).then(ackMsg => {
						console.log('收到发短信的回复:' + JSON.stringify(ackMsg))
						if (ackMsg.Code == 0) {
							uni.showToast({
							    title: this.$t('login.forget.tips')[0],
							    duration: 2000
							});
							vm.timer = setInterval(() => {
								if (vm.count > 0 && vm.count <= TIME_COUNT) {
									vm.count--;
									vm.codeStr = vm.count+'s后重试'
								} else {
									clearInterval(vm.timer);
									vm.timer = null;
									vm.codeStr = '重新获取'
								}
							}, 1000)
						} else {
							uni.clearStorageSync()
							uni.showToast({
								title: ackMsg.Msg,
								icon:'none',
								duration: 2000
							})
							vm.codeStr = this.$t('login.forget.btns')[1]
						}
					})
				}
			}
		},
		onHide() {
			clearInterval(this.setIntervalFn);
		},
		onUnload() {
			clearInterval(this.setIntervalFn);
		}
	}
</script>
<style>
	page {
		background: linear-gradient(179deg, #000E18 0%, #0D1A2C 32%, #000E18 100%);
	}
</style>
<style lang="scss" scoped>
	.root {
		height: 100vh;
	}
	
	.login-view {
		padding: 55rpx 85rpx;
		box-sizing: border-box;
		.placeholder {
			color: #6f87a4;
			font-size: 28rpx;
		}

		text {
			font-size: 28rpx;
		}

		.input-view {
			position: relative;
			display: flex;
			align-items: center;
			margin-bottom: 55rpx;
			padding: 0 10rpx;
			background-color: rgba(54, 67, 88, 0.5);
			border-radius: 4rpx;

			.title {
				text-align-last: justify;
				text-align: justify;
				text-justify: distribute-all-lines;
				width: 90rpx;
				height: 80rpx;
				font-size: 28rpx;
				color: $uni-text-color;
				line-height: 80rpx;
			}
			input {
				width: 400rpx;
				height: 80rpx;
				padding-left: 40rpx;
				font-size: 24rpx;
				color: $uni-text-color;
				&::before {
					content: ' ';
					position: absolute;
					height: 16rpx;
					width: 2rpx;
					background-color: #6f87a4;
					left: 120rpx;
					top: 32rpx;
				}
			}

			.catpcha-input {
				width: 250rpx;
			}

			.capture {
				width: 200rpx;
				text-align: right;
				color: $uni-color-primary;
			}
		}
	}

	.p-l120 {
		padding-left: 130rpx !important;
	}
</style>
