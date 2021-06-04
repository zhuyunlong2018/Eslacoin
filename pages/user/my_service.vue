<!-- 我的服务 -->
<template>
	<view class="root">
		<v-nav-bar
			title="我的服务"
		/>
		<view class="account-money" @click="refreshBtn">
			<view class="refresh-btn">
				<text class="iconfont icon-refresh"></text>
				<text>刷新</text>
			</view>
			<view class="title">账户余额：</view>
			<view class="number">
				<text class="money">{{ Coin }}</text>
				<text class="unit">USDT</text>
			</view>
			<view class="btn-col flex">
				<button @click="openPage('/pages/user/user_pay')">充币</button>
				<button @click="openPage('/pages/user/fund_detail')">明细</button>
			</view>
		</view>
		<view class="status-col">
			<view class="status-name">币币自动套利系统</view>
			<view class="status" :class="{'no': ServiceTime <= 0}">状态：{{ status }}</view>
			<view class="time" v-if="status == '已开通'">到期时间：{{ time }}</view>
		</view>
		<button class="btn" @click="onKaiTongClick(0)" type="primary">
			{{ ServiceTime > 0 ? '续费' : '开通' }}</button>

	</view>
</template>

<script>
	import { formatDate } from '@/common/cs_util.js';
	export default {
		data() {
			return {
				Coin: 0,
				ServiceTime: '',
				status: '',
				time: ''
			}
		},
		onShow() {
			this.getAccountInfo();
			
		},
		methods: {
			// 页面跳转
			openPage(url) {
				uni.navigateTo({
					url
				})
			},
			onKaiTongClick(arg) {
				let urlArr = [ 
					'/pages/user/buy_service',
					'/pages/user/buy_service',
				]
				uni.navigateTo({
					url: urlArr[arg]
				})
			},
			// 点击刷新按钮
			refreshBtn () {
				this.CsHttp.post(this.ApiConfig.User + '/BSUpdateRechargeReq', {
					UserId: uni.getStorageSync('UserData').UserId,
				}).then(res => {
					// console.log(res)
				})
				this.getAccountInfo();
			},
			// 获取账户信息
			getAccountInfo () {
				this.CsHttp.post(this.ApiConfig.User + '/BSQueryUserInfoReq', {
					UserId: uni.getStorageSync('UserData').UserId
				}).then(res => {
					console.log(res)
					this.Coin = res.UserData.Coin;
					this.ServiceTime = res.UserData.ServiceTime;
					uni.setStorageSync('UserData', res.UserData);
					if (this.ServiceTime <= 0) {
						this.status = '未开通';
					} else {
						if (this.ServiceTime - parseInt(new Date().getTime() / 1000) > 0) {
							this.time = formatDate(this.ServiceTime * 1000);
							this.status = '已开通';
						} else {
							this.status = '已到期';
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root {
		// padding-top: 20rpx;
	}
	.account-money {
		background: url(../../static/bg/zhye_ye_img.png) no-repeat;
		background-size: cover;
		padding: 0 40rpx;
		height: 342rpx;
		margin: 10rpx;
		position: relative;
		.refresh-btn {
			color: #ffffff;
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			font-size: 24rpx;
			.icon-refresh {
				font-size: 24rpx;
				margin-right: 4rpx;
			}
		}
		.title {
			color: #d2dbff;
			padding-top: 30rpx;
			font-size: 26rpx;
		}
		.number {
			margin-top: 30rpx;
			color: #ffffff;
			.money {
				font-size: 74rpx;
			}
			.unit {
				font-size: 36rpx;
				padding-left: 10rpx;
			}
		}
		.btn-col {
			margin-top: 30rpx;
			button {
				width: 268rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: rgba(255, 255, 255, 0.07);
				font-size: 28rpx;
				color: #ffffff;
				position: relative;
				&::after {
					content: ' ';
					position: absolute;
					border: 2px solid rgba(255, 255, 255, 0.29);
					width: 200%;
					height: 200%;
					border-radius: 20rpx;
					box-sizing: border-box;
					transform: scale(0.5);
					left: 0;
					top: 0;
				}
			}
		}
	}
	.status-col {
		padding: 24rpx;
		background-color: #e7ebf9;
		border-radius: 12rpx;
		margin: 75rpx 28rpx 180rpx;
		text-align: center;
		.status-name {
			font-size: 36rpx;
			color: #333335;
		}
		.status {
			padding-top: 6rpx;
			color: #05a786;
			font-size: 32rpx;
		}
		.time {
			padding-top: 6rpx;
			color: #05a786;
			font-size: 26rpx;
		}
		.no {
			padding-top: 20rpx;
			font-size: 28rpx;
			color: #686868;
		}
	}
	.btn {
		width: 580rpx;
		height: 98rpx;
		line-height: 98rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		background: linear-gradient(90deg, #488cff 0%, #4b76ff 100%);
		box-shadow: 0 5rpx 4rpx 0 rgba(22, 66, 241, 0.15);
		border-radius: 49rpx;
	}
</style>
