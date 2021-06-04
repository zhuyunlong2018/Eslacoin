<!-- 用户信息页 -->
<template>
	<view class="root">
		<v-nav-bar 
			:title="$t('user.info.navTitle')"
		/>
		<view class="p-t20 p-lr30">
			<!-- 我的头像 -->
			<view class="item flex">
				<view class="label flex flex-start">
					<image class="img" :src="userInfo.HeadImage"></image>
					<text>{{ $t('user.info.itemTexts')[5] }}</text>
				</view>
				<view class="revise-btn flex flex-start" @click="openPage('/pages/user/revise_head')">
					<text>{{ $t('user.info.itemTexts')[6] }}</text>
					<image class="icon" src="@/static/icon/wd_yhxx_icon_jt.png"></image>
				</view>
			</view>
			<!-- 我的手机 -->
			<view class="item flex">
				<view class="label flex flex-start">
					<image src="../../static/icon/wd_yhxx_icon_sj.png"></image>
					<text>{{ $t('user.info.itemTexts')[0] }}</text>
				</view>
				<view class="">{{ userInfo.Account }}</view>
			</view>
			<!-- 登录密码 -->
			<view class="item flex">
				<view class="label flex flex-start">
					<image src="../../static/icon/wd_yhxx_icon_mm.png"></image>
					<text>{{ $t('user.info.itemTexts')[1] }}</text>
				</view>
				<view class="revise-btn flex flex-start" @click="openPage('/pages/login/forget_pwd')">
					<text>{{ $t('user.info.itemTexts')[4] }}</text>
					<image class="icon" src="@/static/icon/wd_yhxx_icon_jt.png"></image>
				</view>
			</view>
			<!-- 状态 -->
			<view class="item flex">
				<view class="label flex flex-start">
					<image src="../../static/icon/wd_yhxx_icon_zt.png"></image>
					<text>{{ $t('user.info.itemTexts')[3] }}</text>
				</view>
				<view :class="{'value': userInfo.ServiceTime <= 0}">{{ timeValue }}</view>
			</view>
		</view>
		
		<!-- 退出按钮 -->
		<view class="sign-out-btn" @click="logOutClick('/pages/login/login')">{{ $t('user.info.exit') }}</view>
		
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data () {
			return {
				userInfo: {},
				timeValue: '',
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('UserData');
			// 判断到期时间是否为 0
			if (this.userInfo.ServiceTime <= 0 || !this.userInfo.ServiceTime) {
				this.timeValue = this.$t('user.info.statusTexts')[0];
			} else {
				if (this.userInfo.ServiceTime - parseInt(new Date().getTime() / 1000) > 0) {
					this.timeValue = this.$t('user.info.statusTexts')[1];
				} else {
					this.timeValue = this.$t('user.info.statusTexts')[2];
				}
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 点击退出登录按钮
			logOutClick(url) {
				this.$store.dispatch('LOG_OUT').then(res => {
					uni.reLaunch({
						url
					})
				});
			},
			// 打开页面
			openPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root {
		// padding: 0 28rpx;
	}
	.item {
		padding-right: 10rpx;
		margin-top: 10rpx;
		height: 120rpx;
		background-color: $uni-bg-color;
		border-radius: 8px;
		font-size: 26rpx;
		color: $uni-text-color;
		image {
			width: 72rpx;
			height: 72rpx;
		}
		.img {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			margin: 0 14rpx;
		}
		.revise-btn {
			font-size: 22rpx;
			color: #12c1bb;
			padding: 7rpx 0 7rpx 25rpx;
			border-radius: 30rpx;
			.icon {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.value {
			color: $uni-text-color-grey;
		}
	}
	.sign-out-btn {
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background-color: #20324a;
		border-radius: 8rpx;
		color: $uni-text-color;
		font-size: 32rpx;
		width: 580rpx;
		margin: 400rpx auto 100rpx;
	}
</style>
