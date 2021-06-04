<!-- 机器人排行榜页 -->
<template>
	<view class="root">
		<v-nav-bar
			title="机器人排行榜"
		/>
		<view class="row flex">
			<view class="flex flex-start col">
				<view class="bar"
					@click="onClickTab('pt', 1)"
					:class="{'atv': selEchannel == 1}">火币</view>
				<view class="line"></view>
				<view class="bar"
					@click="onClickTab('pt', 2)"
					:class="{'atv': selEchannel == 2}">币安</view>
				<view class="line"></view>
				<view class="bar">OKex</view>
				<view class="line"></view>
				<view class="bar">比特儿</view>
			</view>
		</view>
		<view class="flex head-col">
			<text class="w30px">排名</text>
			<text class="w p-l30">用户</text>
			<text class="w150rpx">交易策略</text>
			<text class="w130rpx text-right">收益率</text>
		</view>
		<scroll-view scroll-y="true" >
			<view class="ranking-list">
				<view class="ranking-item flex" 
					:key="'ranking_' + index"
					:class="{'btn-t-1': index > 0}"
					v-for="(item, index) in 3">
					<view class="text w30px text-center">1</view>
					<view class="flex flex-start w">
						<image src="../../static/user/wd_grxx_image_tx.png" class="img" mode=""></image>
						<text class="text">名称</text>
					</view>
					<view class="w150rpx">
						<view class="color-hui font-14">USDT合约</view>
						<view class="text">BTCUSDT</view>
					</view>
					<view class="font-13 number text-right w130rpx">+1110.6%</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			onClickTab() {}
		}
	}
</script>

<style lang="scss">
.row {
	height: 72rpx;
	// line-height: 72rpx;
	padding: 0 28rpx;
	.col {
		width: 100%;
		border-radius: 8rpx;
		height: 50rpx;
		.bar {
			height: 50rpx;
			line-height: 50rpx;
			width: 200rpx;
			text-align: center;
			color: #737b95;
			font-size: 26rpx;
		}
		.line {
			width: 2rpx;
			height: 12rpx;
			margin: 0 12rpx;
			background-color: #6d707b;
		}
		.atv {
			background-color: #3f6fe1;
			
			color: #ffffff;
			box-shadow: 0 2rpx 4rpx 0 rgba(67, 88, 143, 0.33);
			border-radius: 8rpx;
		}
	}
}
</style>
