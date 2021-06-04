<!-- 注册用户 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('login.register.navTitle')"
			backgroundColor="transparent"
		/>
		<view class="login-view">
			<view class="input-view">
				<!-- 下拉选框组件 -->
				<PhoneNumber :phoneNumber.sync='phoneNumber' leftWidth="0" />
				<input placeholder-class="placeholder"
					:placeholder="$t('common.placeholder')[0]" 
					:maxlength="11" class="p-l120" type="number" v-model.trim="account"></input>
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
						{{ !disabledBtn ? $t('common.btns')[0] : sendLoading ? $t('common.btns')[2] : `${timeNumber}s${ $t('common.btns')[1] }` }}
					</text>
				</view>
			</view>
			
			<view class="input-view">
				<input class="invite" placeholder-class="placeholder" 
					:maxlength="8"
					:placeholder="$t('common.placeholder')[3]" 
					 v-model.trim="inviteCode"></input>
			</view>
		</view>
		<view style="padding: 0 85rpx;">
			<uni-botton
				:btnText="$t('login.register.btn')"
				@click='onRegisterBtnClick'
				/>
		</view>
		
		<view class="agree-view flex flex-center">
				<view class="radio" @tap="isCheckedAgreement = !isCheckedAgreement">
					<image v-show="!isCheckedAgreement" 
						src="@/static/login/dl_xz_normal.png"></image>
					<image v-show="isCheckedAgreement" 
						src="@/static/login/dl_xz_selected.png"></image>
				</view>
				<text>{{ $t('login.register.texts')[0] }}</text> 
				<text class="a-text" @click="openPage">《{{ $t('login.register.texts')[1] }}》</text>
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
				inviteCode:'',
				// 是否禁用按钮
				disabledBtn: false,
				// 轮询函数
				setIntervalFn: null,
				// 倒计时
				timeNumber: 59,
				phoneNumber: '+86',
				// 是否勾选协议
				isCheckedAgreement: false,
				sendLoading: false
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
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
					this.sendLoading = true;
					this.CsHttp.post(this.ApiConfig.User + '/BSPhoneCodeReq', {
						PhoneNumber: this.account,
						OptType: 0
					}).then(res => {
						console.log(res)
					this.sendLoading = false;
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
						this.sendLoading = false;
					})
					
				}
			},
			
			//注册账号按钮登录
			onRegisterBtnClick() {
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
				if (!this.isCheckedAgreement) {
					uni.showToast({
						title: this.$t('login.register.tips')[0],
						icon: 'none',
						duration: 1000
					})
					return false;
				}
				let BSRegisterAccountReq = {
					RecommendId: Number(this.inviteCode.trim()),
					Account: this.account.trim(),
					Password: this.password,
					PhoneCode: this.PhoneCode,
					AccountType: 'NORMAL',
					Channel: 'inner',
					Device: 'WEB'
				}
				this.CsHttp.post(this.ApiConfig.User + '/BSRegisterAccountReq', BSRegisterAccountReq, false).then(ackMsg => {
					console.log('收到账号注册的回复:' + JSON.stringify(ackMsg))
					if (ackMsg.Code == 0) {
						clearInterval(this.setIntervalFn);
						this.disabledBtn = false;
						this.timeNumber = 59;
						uni.showModal({
							content: this.$t('login.register.tips')[1],
							showCancel: false,
							success() {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}
						})
					} else {
						uni.clearStorageSync()
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						})
					}
				})
			},
			openPage() {
				uni.navigateTo({
					url: '/pages/login/exemption_clause'
				})
			},
		},
		onShow() {
			if (this.disabledBtn) {
				clearInterval(this.setIntervalFn);
				this.countdownFn();
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
				font-size: 28rpx;
				height: 80rpx;
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
					background-color: #838385;
					left: 120rpx;
					top: 32rpx;
				}
			}
			.catpcha-input {
				width: 250rpx;
			}
			
			.capture {
				width: 200rpx;
				white-space: nowrap;
				text-align: right;
				color: $uni-color-primary;
			}
	
			.invite {
				padding-left: 10rpx;
				&::before {
					width: 0;
				}
			}
		}
	}
	.code-col {
		.catpcha-input {
			width: 200rpx !important;
		}
		.capture {
			height: 80rpx;
			line-height: 80rpx;
			text-align: right;
			width: 180rpx;
			color: $uni-color-primary;
		}
	}
	
	.p-l120 {
		padding-left: 130rpx !important;
	}

	.agree-view {
		margin-top: 16rpx;
		font-size: 28rpx;
		color: $uni-text-color;
		.radio {
			padding-top: 6rpx;
		}
		image {
			width: 24rpx;
			height: 24rpx;
			margin-right: 8rpx;
		}
		.a-text {
			color: $uni-color-primary;
		}
	}
</style>
