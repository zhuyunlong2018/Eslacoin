<!-- 用户充值页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.userPay.navTitle')"
		/>
		<view class="content">
			<view class="qr-code-row">
				<view class="title bold">USDT-TRC20</view>
				<view class="qr-code">
					<tkiQrCode
						ref="tkiQrCode"
						class="code"
						:val="Address" 
						:size="290"
						:loadMake='true' />
				</view>
				<view class="address">{{ Address }}</view>
				<view class="copy-btn" @click="copyAddr(Address)">
					{{ $t('user.userPay.copy') }}
				</view>
			</view>
			<view class="finish-btn record" @click="openPage('/pages/user/pay_record')">{{ $t('user.userPay.record') }}</view>
			<view class="explain">
				<text>{{ $t('user.userPay.tips')[0] }}：</text>
				<view class="text">
					<text>{{ $t('user.userPay.tips')[1] }}</text>
				</view>
				<view class="text">
					<text>{{ $t('user.userPay.tips')[2] }}</text>
					
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import tkiQrCode from '../../components/tki-qrcode/tki-qrcode.vue';
	export default {
		components: {
			tkiQrCode
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				Address: '',
				timeFn: null
			}
		},
		onLoad() {
			this.getAddress();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取用户地址
			getAddress(AddrType = 1) {
				this.CsHttp.post(this.ApiConfig.User + '/BSQueryUsdtAddressReq', { 
						UserId: uni.getStorageSync('UserData').UserId,
						AddrType 
					}).then(res => {
					this.Address = res.Address;
					this.$nextTick(() => {
						this.$refs.tkiQrCode._makeCode()
					})
				})
			},
			// 复制地址
			copyAddr (data = 'test') {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data,
					})
					// #endif
					// #ifdef H5
					let text = document.createElement('textarea');
					document.body.appendChild(text);
					text.value = data;
					text.select();
					document.execCommand('copy');
					text.remove();
					uni.showToast({
						title: "内容已复制",
						icon: 'success',
						duration: 1000
					})
					// #endif
				}, 200)
			},
			openPage(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.content {
		padding: 28rpx;
	}
	.qr-code-row {
		background-color: $uni-bg-color;
		padding-bottom: 50rpx;
		border-radius: 12rpx;
		.title {
			border-radius: 12rpx 13rpx 0 0;
			height: 66rpx;
			line-height: 66rpx;
			padding: 0 30rpx;
			background-color: #182134;
			font-size: 30rpx;
			color: $uni-color-primary;
			position: relative;
			&::after {
				position: absolute;
				content: ' ';
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				background-color: $uni-color-primary;
				left: 15rpx;
				top: 31rpx;
			}
		}
		.qr-code {
			padding: 90rpx 0 60rpx 0;
			text-align: center;
			image {
				width: 290rpx;
				height: 290rpx;
			}
		}
		.code {
			width: 290rpx;
			height: 290rpx;
			padding: 14rpx;
			margin: 0 auto;
			background-color: #f9f9f9;
		}
		.address {
			color: $uni-text-color-grey;
			font-size: 28rpx;
			padding: 15rpx 55rpx 15rpx 15rpx;
			background-color: rgba(19, 26, 42, 0.6);
			border-radius: 10rpx;
			word-break: break-all;
			margin: 0 22rpx;
		}
		.copy-btn {
			width: 300rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #2aa3b1;
			border-radius: 12rpx;
			font-size: 36rpx;
			color: #ffffff;
			text-align: center;
			margin: 40rpx auto 0;
		}
	}
	.finish-btn {
		width: 580rpx;
		height: 98rpx;
		line-height: 98rpx;
		margin: 60rpx auto;
		text-align: center;
		border-radius: 12rpx;
	}
	.record {
		font-size: 36rpx;
		background-image: none;
		color: $uni-color-primary;
		box-shadow: none;
		border: 2rpx solid $uni-color-primary;
	}
	.explain {
		font-size: 26rpx;
		color: $uni-text-color-grey;
		.text {
			text-indent: 40rpx;
		}
	}
</style>
