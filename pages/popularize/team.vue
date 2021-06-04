<!-- 邀请赚钱页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('invite.home.navTitle')"
		/>
		<view class="main-view up-pre p-t20">
			<view class="me-info">
				<view class="head-view flex align-start">
					<view>
						<view class="flex flex-start">
							<text class="text w130rpx">{{ $t('invite.home.labels')[0] }}：</text>
							<image src="@/static/icon/wd_wdff_icon.png"></image>
							<text class="text color-yellow">VIP{{ Vip }}</text>
						</view>
						<view class="flex flex-start p-t10">
							<text class="text w130rpx">{{ $t('invite.home.labels')[1] }}：</text>
							<text class="text yq-code">{{ InviteCode }}</text>
						</view>
						<view class="flex flex-start p-t10">
							<text class="text w130rpx">{{ $t('invite.home.labels')[2] }}：</text>
							<text class="number">{{ CurCommission }}</text>
							<text class="unit">/USDT</text>
						</view>
					</view>
					<view @click="onPosterClick()" class="button">{{ $t('invite.home.btns')[0] }}</view>
				</view>
				<!-- 佣金栏 -->
				<view class="brokerage-col btn-t-1 flex">
					<view class="today-item">
						<view class="">
							<text class="dot red"></text>
							<text class="label">{{ $t('invite.home.labels')[3] }}</text>
							<text class="unit">/USDT</text>
						</view>
						<view class="left">
							<text class="number bold">{{ TodayCommission }}</text>
							<text class="unit bold">/USDT</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="count-item">
						<view class="">
							<text class="dot"></text>
							<text class="label">{{ $t('invite.home.labels')[4] }}</text>
							<text class="unit">/USDT</text>
						</view>
						<view class="right">
							<text class="number bold">{{ TotalCommission }}</text>
							<text class="unit bold">/USDT</text>
						</view>
					</view>
				</view>
			</view>
			<view class="flex btn-col">
				<view @click="onCommissionClick()" class="button">{{ $t('invite.home.btns')[1] }}</view>
				<view @click="onExchangeClick()" class="button apply">{{ $t('invite.home.btns')[2] }}</view>
			</view>
			<!-- <view class="detail">
				<text>邀请详情</text>
			</view> -->
			<view class="team-view">
				<view class="flex number-col">
					<view>
						{{ $t('invite.home.titles')[0] }}：<text class="number">{{ DirectCount }}</text>人
					</view>
					<view>
						{{ $t('invite.home.titles')[1] }}：<text class="number">{{ TeamCount }}</text>人
					</view>
				</view>
				<view class="team">
					<view class="team-list flex"
						v-for="(item, index) in tableData" :key="item.Account + '_' + index">
						<text>{{ item.Account }}</text>
						<text class="time">{{ item.Time }}</text>
					</view>
					<view v-if="tableData.length == 0" class="no-data">{{ $t('invite.home.noData') }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				// 我的邀请码
				InviteCode: '',
				// 我的佣金可提现总金额
				CurCommission: '',
				// 累计总佣金
				TotalCommission: '',
				// 今日总佣金
				TodayCommission: '',
				// 直推人数
				DirectCount: 0,
				// 团队人数
				TeamCount: 0,
				tableData: [],
				Vip: uni.getStorageSync('UserData').Vip
			}
		},
		onShow() {
			this.getData();
		},
		created() {
			this.getLowerList();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取佣金明细
			getLowerList() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetLowerListReq', { 
					UserId: uni.getStorageSync('UserData').UserId,
					Page: 1,
					Size: 20
				}).then(res => {
						console.log(res)
						this.tableData = res.LowerDataList;
				})
			},
			// 获取邀请数据
			getData() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetUserTeamInfoReq', {
					UserId: uni.getStorageSync('UserData').UserId
				}).then(res => {
					// console.log(res);
					this.CurCommission = res.CurCommission;
					this.TotalCommission = res.TotalCommission;
					this.TodayCommission  = res.TodayCommission ;
					this.InviteCode = res.InviteCode;
					this.DirectCount = res.DirectCount;
					this.TeamCount = res.TeamCount;
				}).catch(err => {})
			},
			onCommissionClick() {
				uni.navigateTo({
					url: '/pages/popularize/commission'
				})
			},
			onPosterClick() {
				uni.navigateTo({
					url: `/pages/popularize/poster?code=${ this.InviteCode }`
				})
			},
			onExchangeClick() {
				uni.navigateTo({
					url: '/pages/popularize/exchange'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.root {
		
		text{
			font-size: 30rpx;
			color: $uni-text-color-grey;
		}
		.text {
			font-size: 26rpx;
			// color: $uni-text-color;
		}
		.color-yellow {
			color: #f59a4b;
		}
	}
	.me-info {
		// background-color: #ffffff;
		margin: 0 20rpx;
		background-color: #1B2B41;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 5rpx 0 rgba(33, 65, 127, 0.18);
		
	}
		.head-view {
			padding: 24rpx;
			image  {
				width: 40rpx;
				height: 40rpx;
			}
			.w130rpx {
				min-width: 135rpx;
			}
			.button {
				background-color: #2aa3b1;
				border-radius: 6rpx;
				color: #ffffff;
				height: 50rpx;
				line-height: 50rpx;
				min-width: 140rpx;
				padding: 0 10rpx;
				text-align: center;
				font-size: 22rpx;
			}
			.yq-code {
				color: $uni-text-color;
			}
			.unit{
				font-size: 24rpx;
				color: $uni-color-primary;
			}
			.number {
				font-size: 28rpx;
				color: $uni-color-primary;
			}
		}
		
		.brokerage-col {
			padding: 20rpx 20rpx 26rpx;
			&::after {
				border-top: 1px solid #0b131e;
				width: calc(200% - 40rpx);
				left: calc(-50% + 20rpx);
			}
			.line {
				width: 4rpx;
				height: 58rpx;
				background-color: #d4d8e5;
				border-radius: 2rpx;
			}
			.dot {
				vertical-align: middle;
				display: inline-block;
				width: 8rpx;
				height: 8rpx;
				background-color: #f59a4b;
				border-radius: 50%;
				margin-right: 4rpx;
			}
			.red {
				background-color: $uni-color-primary;
			}
			.label {
				font-size: 26rpx;
				color: $uni-text-color-grey;
			}
			.unit {
				font-size: 20rpx;
			}
			.left {
				.number {
					font-size: 42rpx;
					color: $uni-text-color-red;
				}
				.unit {
					font-size: 26rpx;
					color: $uni-text-color-red;
				}
			}
			.left {
				.number {
					font-size: 42rpx;
					color: $uni-text-color;
				}
				.unit {
					font-size: 26rpx;
					color: $uni-text-color;
				}
			}
			.right {
				.number {
					font-size: 42rpx;
					color: $uni-text-color;
				}
				.unit {
					font-size: 26rpx;
					color: $uni-text-color;
				}
			}
		}
		
		.btn-col {
			padding: 60rpx;
			.button {
				height: 78rpx;
				line-height: 78rpx;
				width: 280rpx;
				text-align: center;
				border-radius: 6rpx;
				color: #2aa3b1;
				font-size: 28rpx;
				border: 2rpx solid #2aa3b1;
			}
			.apply {
				border: 2rpx solid #3577d9;
				color: #3577d9;
			}
		}
		
		.detail {
			margin: 10rpx 14rpx 0;
			background-color: #ffffff;
			border-radius: 6rpx;
			padding: 14rpx;
			text {
				// border-left: 4rpx solid #4487ff;
				font-size: 36rpx;
				color: #333335;
				padding-left: 10rpx;
				position: relative;
				&::after {
					content: ' ';
					position: absolute;
					width: 6rpx;
					height: 30rpx;
					background-color: #4487ff;
					left: 0;
					top: 14rpx;
				}
			}
		}
		
		.team-view{
			// padding: 6rpx 14rpx;
			.number-col {
				background-color: $uni-bg-color;
				font-size: 30rpx;
				color: $uni-color-primary;
				height: 66rpx;
				line-height: 66rpx;
				padding: 0 36rpx;
				// border-radius: 6rpx;
				.number {
					color: $uni-color-primary;
				}
			}
			.team {
				padding: 0 14rpx;
			}
			.team-list{
				margin-top: 10rpx;
				padding: 0 24rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: $uni-bg-color;
				font-size: 30rpx;
				text {
					color: $uni-text-color;
				}
				.time {
					font-size: 24rpx;
				}
			}
		}
	
</style>
