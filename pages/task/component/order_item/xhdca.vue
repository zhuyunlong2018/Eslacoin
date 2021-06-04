<!-- 高频交易-任务详情页 -->
<template>
	<view class="root">
		<view class="content-item flex">
			<view class="left flex flex-start">
				<text class="font-18 font-bold color-light">{{item.Symbol.replace("USDT","")}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
			<view class="center flex flex-start">
				<text class="font-12 color-dark">数量:</text>
				<text class="font-15 color-light p-l10">{{item.BuyCount}}</text>
			</view>
			<view class="right flex flex-end">
				<text class="state" :class="'IsActiveState'+item.IsActive">{{IsActiveText}}</text>
			</view>
		</view>
		<view class="content-item flex ">
			<view class="left flex flex-start">
				<text class="font-13 color-dark">{{item.CreateTime.slice(5,16)}}</text>
			</view>
			<view class="center flex flex-start">
				<text class="font-12 color-dark">均价:</text>
				<text class="font-15 color-orange p-l10" >{{item.BuyPriceUnit.toFixed(4)}}</text>
			</view>
			<view class="right flex flex-end">
				<button plain="true" @click="onTaskDataClick()">详情</button>
			</view>
		</view>

		<uni-popup ref="popup" type="dca">
			<uni-popup-dca :OrderInfo="item" :TaskType="TaskType"></uni-popup-dca>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		name: 'OrderItemXhDca',
		props: {
			item: {
				type: Object,
				default: {
					TaskId: '',
					Symbol: '',
					TaskName: '',
					BuyCoinOnce: 0,
					SellRatio: 0,
					LossRatio: 0,
					TriggerNum: 0,
					MaxActiveCount: -1,
					TriggerPriceMax: 999999,
					TriggerPriceMin: 0,
					State: 1,
					SellState: 0,
					CreateTime: '',
					BuyOrderCount: 0,
					FinishOrderCount: 0,
					Profit: 0,
					TotalProfit: 0,
					Remark: '',
				}
			}
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
                  TaskType:1
			}
		},

		computed: {

			//订单卖单字段  0未委托1已委托2已止盈3已撤单
			IsActiveText() {
				switch (this.item.IsActive) {
				
					case 1:
						return '进行中';
						break;
					case 0:
						return '已完成';
						break;
					default:
						return '未知'
				}
			},
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			onTaskDataClick() {
				this.$refs.popup.open()
			},
		},
	}
</script>

<style lang="scss">
	@import "../../task.scss";

	.root {
		border-radius: 6rpx;
		width: 100%;
		height: 120rpx;
		padding: 0 14rpx 0 20rpx;
		box-sizing: border-box;

		.content-item {
			width: 690rpx;
			height: 60rpx;

			.left {
				width: 30%;
			}

			.center {
				width: 45%;
			}

			.right {
				width: 25%;
			}

			button {
				width: 120rpx;
				height: 40rpx;
				border-radius: 8rpx;
				border: solid 2rpx #12c1bb;
				font-size: 24rpx;
				line-height: 37rpx;
				letter-spacing: 0px;
				color: #12c1bb;
				margin: 0;
				padding: 0;

				&::after {
					border: none;
				}
			}

		
			.IsActiveState1 {
				background-color: rgba(112, 222, 190, 0.1);
				color: #09b195;
			}
			.IsActiveState0 {
				background-color: rgba(112, 145, 222, 0.18);
				color: #249efb;
			}

		}
	}
</style>
