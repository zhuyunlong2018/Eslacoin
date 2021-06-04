<!-- 机器人详情页 -->
<template>
	<view class="root">
		<v-nav-bar :title="$t('home.robotDetail.navTitle')"/>
		<!-- 机器人信息 -->
		<view class="robot-info info p-b20">
			<view class="title">{{ $t('home.robotDetail.titles')[0] }}</view>
			<view class="flex btn-t-1 p-t20 p-b20 p-l20">
				<view class="flex flex-start">
					<image class="img" src="../../static/user/gywm_logo.png" mode=""></image>
					<view class="p-l10">
						<view class="name p-b10">用户名字</view>
						<view>
							<text class="label">{{ $t('home.robotDetail.labels')[1] }}：</text>
							<text class="value">3日</text>
						</view>
					</view>
				</view>
				<view class="p-r20">
					<view class="flex p-b10">
						<text class="label">{{ $t('home.robotDetail.labels')[0] }}：</text>
						<view class="ranking flex flex-center">
							<image class="icon" src="../../static/icon/sy_pm.png" mode=""></image>
							<text>第1名</text>
						</view>
					</view>
					<view class="flex">
						<text class="label">{{ $t('home.robotDetail.labels')[2] }}：</text>
						<view>
							<text class="coin">123.22</text>
							<text class="unit">/USDT</text>
						</view>
					</view>
				</view>
			</view>
			<view class="p-b10 flex flex-end p-r20">
				<image class="icon" src="../../static/icon/sy_jqrxq_.png" mode=""></image>
				<text class="time font-13">{{ $t('home.robotDetail.labels')[3] }}：2021-10-20 18:15:51</text>
			</view>
		</view>
		<!-- 机器人参数 -->
		<view class="robot-params info">
			<view class="title">{{ $t('home.robotDetail.titles')[1] }}</view>
			<!-- <view class="coin-name btn-t-1 flex">
				<view>
					<text class="symbol">TRX</text>
					<text class="font-10">/USDT</text>
				</view>
				<view class="flex">
					<image class="img" src="../../static/icon/qh_hb_logo.png" mode=""></image>
					<text class="name font-15 p-l10">火币</text>
				</view>
			</view> -->
			<view class="p-lr28 btn-t-1">
				<view class="flex p-t20 p-b20">
						<view class="flex">
							<text class="label">{{ $t('home.robotDetail.labels')[12] }}：</text>
							<text class="value">TRX/USDT</text>
						</view>
						<view class="flex w40p">
							<text class="label">{{ $t('home.robotDetail.labels')[13] }}：</text>
							<view class="flex">
								<image class="img" src="../../static/icon/qh_hb_logo.png" mode=""></image>
								<text class="name font-15 p-l10">火币</text>
							</view>
						</view>
				</view>
				<view class="flex p-t20 p-b20">
						<view class="flex">
							<text class="label">{{ $t('home.robotDetail.labels')[4] }}：</text>
							<text class="value">现货</text>
						</view>
						<view class="flex w40p">
							<text class="label">{{ $t('home.robotDetail.labels')[5] }}：</text>
							<text class="value">高频交易</text>
						</view>
				</view>
				<view class="flex p-t20 p-b20">
						<view class="flex">
							<text class="label">{{ $t('home.robotDetail.labels')[6] }}：</text>
							<view class="value">
								<text>20</text>
								<text class="font-11">/USDT</text>
							</view>
						</view>
						<view class="flex w40p">
							<text class="label">{{ $t('home.robotDetail.labels')[7] }}：</text>
							<text class="value">3%</text>
						</view>
				</view>
				<view class="flex p-t20 p-b20">
						<view class="flex">
							<text class="label">{{ $t('home.robotDetail.labels')[8] }}：</text>
							<view class="value">
								<text>20</text>
								<text class="font-11">分钟</text>
							</view>
						</view>
						<view class="flex w40p">
							<text class="label">{{ $t('home.robotDetail.labels')[9] }}：</text>
							<text class="value">100次</text>
						</view>
					</view>
					<view class="flex p-t20 p-b20">
						<view class="flex">
							<text class="label">{{ $t('home.robotDetail.labels')[10] }}：</text>
							<view class="value">
								<text class="price">20</text>
								<text class="unit price">/USDT</text>
								<text class="p-lr10">-</text>
								<text class="price">100</text>
								<text class="unit price">/USDT</text>
							</view>
						</view>
					</view>
					<view class="flex p-t20 p-b20">
						<view class="flex p-b20">
							<text class="label">{{ $t('home.robotDetail.labels')[11] }}：</text>
							<text class="value">小米炒币机</text>
						</view>
					</view>
			</view>
		</view>
			
		<!-- 确认按钮 -->
		<view class="btn">
			<uni-botton 
				@click="openPage('/pages/task/edit')"
				:btnText="$t('home.robotDetail.btn')" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			openPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
.info {
	margin: 20rpx 14rpx;
	border-radius: 12rpx;
	background-color: #202b41;
	.title {
		font-size: 32rpx;
		color: $uni-text-color;
		height: 72rpx;
		line-height: 72rpx;
		padding-left: 28rpx;
		position: relative;
		&::after {
			content: ' ';
			position: absolute;
			width: 6rpx;
			height: 25rpx;
			background-color: #12c1bb;
			left: 14rpx;
			top: 26rpx;
		}
	}
	.btn-t-1::after {
		border-top: 1px solid #2b384d;
	}
	.img {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
	}
	.name, .value {
		white-space: nowrap;
		color: $uni-text-color;
		font-size: 28rpx;
	}
	.label {
		white-space: nowrap;
		color: $uni-text-color-grey;
		font-size: 28rpx;
	}
	.ranking {
		width: 120rpx;
		height: 40rpx;
		background-color: rgba(254, 231, 216, 0.2);
		border-radius: 6rpx;
		color: rgba(245, 154, 75, 0.8);
		font-size: 24rpx;
		.icon {
			width: 24rpx;
			height: 20rpx;
			padding-top: 4rpx;
		}
	}
	.coin {
		font-size: 36rpx;
		color: #04ac90;
	}
	.unit {
		font-size: 22rpx;
		color: $uni-text-color-grey;
	}
	.icon {
		width: 24rpx;
		height: 24rpx;
		padding-right: 6rpx;
	}
	.time {
		color: #596778;
	}
}
.robot-params {
	background-color: transparent;
	margin: 20rpx 0;
	.title {
		margin: 0 14rpx;
	}
	.coin-name {
		padding: 20rpx 28rpx;
		text {
			color: $uni-text-color;
		}
		.symbol {
			font-size: 42rpx;
		}
	}
	.btn-t-1::after {
		border-top: 1px solid #0b131e;
	}
	.img {
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
	}
	.value {
		font-size: 30rpx;
	}
	.price {
		color: #f59a4b;
	}
	.w40p {
		width: 45%;
	}
}
.btn {
	padding: 0 70rpx;
}
</style>
