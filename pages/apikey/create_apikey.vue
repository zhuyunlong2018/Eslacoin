<template>
	<view class="root">
		<uni-nav-bar 
			:title="Echannel == 1 ? $t('home.addApi.navTitles')[0] : Echannel == 2 ? $t('home.addApi.navTitles')[1] : $t('home.addApi.navTitles')[2]"
			backgroundColor="#162237"
			color="#ced3e9"
			@clickRight="openPage(Echannel == 1 ? 'hb' : Echannel == 2 ? 'ba' : 'ba')">
			<image slot='left' class="nav-icon-left" src="../../static/icon/dl_but_fh_btn.png"></image>
			<view class="nav-right-btn" slot='right'>{{ $t('home.addApi.navRight') }}</view>
		</uni-nav-bar>
		<view class="banner">
			<image class="banner-img" src="@/static/home/sy_api_banner2.png" mode=""></image>
		</view>
		<view class="opt-view">
			
			<view class="sm-title flex flex-start align-start p-b30">
				<text>1、</text>
				<text>
					{{ Echannel == 1 ? $t('home.addApi.texts')[0] : Echannel == 2 ? $t('home.addApi.texts')[1] : $t('home.addApi.texts')[2] }}
				</text>
			</view>
			<view class="sm-title flex flex-start">
				<text>2、</text>
				<text>{{ $t('home.addApi.texts')[3] }}</text>
			</view>
		</view>
		<view class="content-view">
			<view class="input-view" :class="focusInput == 'access' ? 'focus-input' : ''">
				<input class="input" placeholder="Access Key" 
					placeholder-class="placeholder"
					@blur="focusInputFn()"
					@focus="focusInputFn('access')"
					v-model="accessKey"></input>
			</view>
			<view class="input-view" :class="focusInput == 'secret' ? 'focus-input' : ''">
				<input class="input" placeholder="Secret Key" 
					placeholder-class="placeholder"
					@blur="focusInputFn()"
					@focus="focusInputFn('secret')"
					v-model="secretKey"></input>
			</view>
		</view>

		<view class="button-view">
			<view class="apiopt-btn">
				<uni-botton :btnText="$t('home.addApi.btn')"
					@click="onApiOptBtnClick()" :marginTop="168"></uni-botton>
			</view>
			<view class="tips-view">
				<image src="../../static/home/sy_tstb_icon.png" mode=""></image>
				<text>{{ $t('home.addApi.texts')[4] }}</text>
			</view>
		</view>
		<view class="footer-view">
			<text>
				{{ $t('home.addApi.texts')[5] }}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.Echannel = Number(option.Echannel);
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				accessKey: '',
				secretKey: '',
				Echannel: '',
				focusInput: ''
			}
		},
		
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			focusInputFn(val) {
				this.focusInput = val ? val : '';
			},
			//导入Api的按钮点击
			onApiOptBtnClick() {
				if (!this.accessKey) {
					uni.showToast({
						title: `${ this.$t('home.addApi.tips')[0] } Access Key`,
						icon: 'none',
						duration: 1000
					})
					return false;
				}
				if (!this.secretKey) {
					uni.showToast({
						title: `${ this.$t('home.addApi.tips')[0] } Secret Key`,
						icon: 'none',
						duration: 1000
					})
					return false;
				}
				let BSSetApiKeyReq = {
					UserId: uni.getStorageSync('UserData').UserId,
					Echannel: this.Echannel,
					AccessKey: this.accessKey,
					SecretKey: this.secretKey,
				}
				this.CsHttp.post(this.ApiConfig.User + '/BSSetApiKeyReq', BSSetApiKeyReq, true).then(ackMsg => {
					console.log('收到设置交易所ApiKey的回复:' + JSON.stringify(ackMsg))
					if (ackMsg.Code == 0) {
						uni.showToast({
							title: this.$t('home.addApi.tips')[1],
							icon: 'none',
							duration: 2000
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 2000)
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						});
					}
					
				})
			},
			// 打开教程页
			openPage(type) {
				console.log(type)
				uni.navigateTo({
					url: `/pages/help/add_course?type=${type}`
				})
			}
		},
	}
</script>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.banner {
		width: 100%;
		height: 250rpx;
		.banner-img {
			width: 100%;
			height: 100%;
		}
	}
	.opt-view {
		width: 100%;
		padding: 20rpx 20rpx 20rpx 0;
		background-color: #182134;
		margin-top: 6rpx;
		.sm-title {
			padding-left: 50rpx;
			box-sizing: border-box;
			width: 100%;
			text-align: left;
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 39rpx;
			letter-spacing: 0px;
			color: $uni-text-color-grey;
			position: relative;
			&::after {
				content: ' ';
				position: absolute;
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				margin-right: 6rpx;
				left: 36rpx;
				top: 16rpx;
				background-color: #12c1bb;
				opacity: 0.4;
			}
		}
	}

	.content-view {
		display: flex;
		flex-direction: column;
		align-items: center;

		.input-view {
			display: flex;
			align-items: center;
			margin-top: 50rpx;
			width: 694rpx;
			height: 98rpx;
			border-radius: 8rpx;
			background-color: #182134;
			border: 2rpx solid #20324a;
			.placeholder {
				font-size: 28rpx;
				color: $uni-text-color-grey;
			}
			.title {
				margin-left: 20rpx;
				font-size: 28rpx;
			}

			.input {
				width: 694rpx;
				height: 98rpx;
				font-size: 28rpx;
				text-align: center;
				color: $uni-color-primary;
			}
		}
		.focus-input {
			border: 2rpx solid #12c1bb;
		}
	}

	.button-view {
		display: flex;
		flex-direction: column;
		align-items: center;

		.apiopt-btn {
			width: 580rpx;
		}

		.tips-view {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			margin-top: 40rpx;
			padding: 0 120rpx;

			text {
				margin-left: 10rpx;
				font-size: 26rpx;
				color: #d14b64;
				width: calc(100% - 33rpx);
			}

			image {
				padding-top: 8rpx;
				width: 23rpx;
				height: 23rpx;
			}
		}
	}

	.footer-view {
		margin-top: 90rpx;
		padding: 20rpx 30rpx;
		text {
			font-size: 24rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 45rpx;
			letter-spacing: 0px;
			color: $uni-text-color-grey;
		}
	}
	.nav-right-btn {
		font-size: 28rpx;
		color: #2aa3b1;
		height: 40rpx;
		line-height: 40rpx;
		width: 98rpx;
		text-align: center;
		border: 1rpx solid #2aa3b1;
		border-radius: 6rpx;
	}
</style>
