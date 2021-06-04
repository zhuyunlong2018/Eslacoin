<template>
	<view class="root">
		<view class="hello-view">
			<view class="dl_logo">
				<image src="@/static/login/dl_logo.png" mode=""></image>
				<view class="text">{{ $t('login.login.text') }}</view>
			</view>

		</view>
		<view class="content">
			<view class="login-view">
				<view class="input-view">
					<image class="icon" src="@/static/login/dl_icon_yh.png"></image>
					<!-- 下拉选框组件 -->
					<PhoneNumber :phoneNumber.sync='phoneNumber' leftWidth="60" />
					<input placeholder-class="placeholder" type="number" 
						class="account" 
						:placeholder="$t('login.login.placeholder')[0]" 
						v-model.trim="account"></input>
				</view>
				<view class="input-view">
					<image class="icon" src="@/static/login/dl_icon_mm.png"></image>
					<input class="invite" :password="true" 
						:placeholder="$t('login.login.placeholder')[1]" 
						placeholder-class="placeholder"
						v-model="password"></input>
				</view>
				<view class="forget text-right"><text @tap="forgetPwd">{{ $t('login.login.btns')[0] }}?</text></view>
			</view>
			<uni-botton
				:btnText="$t('login.login.btns')[1]"
				@click='loginAccount'
				marginTop="140"
				/>
			<view @tap="goToReg" class="btn register-btn">
				<text>{{ $t('login.login.btns')[2] }}</text>
			</view>
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
				// 序号
				phoneNumber: '+86'
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {

			//账号方式登录
			loginAccount() {
				
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
				this.$store.dispatch('LOGIN', {
					Account: this.account.trim(),
					Password: this.password,
					AccountType: 'NORMAL',
					Channel: 'inner',
					Device: 'WEB'
				}).then(res => {
					uni.switchTab({
						url: '/pages/home/home'
					})
				})
				
			},
			//去注册
			goToReg() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			//忘记密码
			forgetPwd() {
				uni.navigateTo({
					url: '/pages/login/forget_pwd'
				})
			}
		},

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
	.hello-view {
		height: 465rpx;
		margin-bottom: 20rpx;
		text-align: center;
		.dl_logo {
			margin: 0 auto;
			padding-top: 110rpx;
			image {
				width: 178rpx;
				height: 194rpx;
			}
			.text {
				font-size: 36rpx;
				color: $uni-text-color;
				word-break: break-word;
				padding: 20rpx 40rpx;
			}
		}
	}
	.content {
		padding: 0 86rpx;
	}
	.login-view {

		.placeholder {
			color: #6f87a4;
			font-size: 28rpx;
		}

		text {
			font-size: 26rpx;
		}

		.input-view {
			position: relative;
			margin-top: 55rpx;
			width: 100%;
			height: 80rpx;
			background-color: rgba(54, 67, 88, 0.5);
			border-radius: 4rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			.icon {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				left: 20rpx;
				top: 22rpx;
			}
			input {
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				box-sizing: border-box;
				padding-left: 60rpx;
				color: $uni-text-color;
				&:focus {
					border-bottom-color: #166aff !important;
				}
			}
			.account {
				padding-left: 170rpx;
				position: relative;
				&::before {
					content: ' ';
					position: absolute;
					height: 16rpx;
					width: 2rpx;
					background-color: #6f87a4;
					left: 155rpx;
					top: 32rpx;
				}
			}
			.invite {
				margin-left: 0;
			}
		}

		.forget {
			padding-top: 22rpx;
			font-size: 26rpx;
			color: #12c1bb;
			padding-right: 20rpx;
		}
	}
	.btn {
		height: 98rpx;
		border-radius: 12rpx;
		text-align: center;
		line-height: 98rpx;
		font-size: 36rpx;
	}
	.register-btn {
		margin-top: 54rpx;
		border: 2rpx solid #2aa3b1;
		color: #2aa3b1;
	}
</style>
