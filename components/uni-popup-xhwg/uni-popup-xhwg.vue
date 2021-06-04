<template>
	<view class="uni-popup-detail">
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">订单详情</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="uni-detail-info">
			<view class="left">
				<view class="">
					<text class="font-bold color-light font-21">{{info.Symbol.replace("USDT","")}}</text>
					<text class="font-10 color-dark">/USDT</text>
				</view>
				<text class="font-13 color-light">{{info.BuyTime}}</text>
			</view>
			<view class="flex">
				<text class="state " :class="'sellState'+info.SellState">{{totalState}}</text>
			</view>
		</view>
		<view class="uni-detail-content">
			<view class="uni-detail-content-item" style="height: 60rpx;">
					<text class="font-13 color-dark ">建仓价格区间:</text>
					<text class="font-15 color-light p-l10">{{info.StartPrice}}-{{info.EndPrice}}</text>
			</view>
			<view class="uni-detail-content-item-title-big">
				<text class="font-13 color-light">开仓单号</text>
				<text class="font-15 color-light">{{info.BuyClientOrderId}}</text>
			</view>
			<view class="uni-detail-content-item">
				<text class="font-13 buy-time color-dark">买入</text>
				<text class="font-13 buy-price text-center color-dark">购买单价</text>
				<text class="font-13 buy-price text-center color-dark">购买数量</text>
				<text class="font-13 buy-price text-right color-dark">购买总价</text>
			</view>
			<view class="uni-detail-content-item item-long">
				<text class="font-12 buy-time color-light">{{BuyTypeName}}</text>
				<text
					class="font-15 color-green buy-price text-center">{{parseFloat(info.BuyPriceUnit).toFixed(4)}}</text>
				<text class="font-15 buy-price text-center color-light">{{parseFloat(info.BuyCount).toFixed(4)}}</text>
				<text
					class="font-15 buy-price text-right color-green">{{parseFloat(info.BuyPriceTotal).toFixed(4)}}</text>
			</view>
			<view class="line"></view>
			<view class="uni-detail-content-state-view">
				<text class="font-12 color-dark">买单状态:</text>
				<view class="flex">
					<text class=" state " :class="'state'+info.BuyState">{{buyStateStr}}</text>
				</view>
			</view>
		</view>
		<view class="uni-detail-content">
			<view class="uni-detail-content-item" style="height: 60rpx;">
				<view class="">
					<text class="font-13 color-dark ">预估止盈价:</text>
					<text class="font-15 color-light p-l10">{{info.EmwinPrice.toFixed(4)}}</text>
				</view>
				<view class="">
					<text class="font-13 color-dark ">预估止损价:</text>
					<text class="font-15 color-light p-l10">{{info.EmlosPrice.toFixed(4)}}</text>
				</view>
					
			</view>
			<view class="uni-detail-content-item-title-big">
				<text class="font-13 color-light color-light">出售订单</text>
				<text class="font-15 color-light">{{info.SellClientOrderId}}</text>
			</view>
			<view class="uni-detail-content-item">
				<text class="font-13 buy-time color-dark">卖出</text>
				<text class="font-13 buy-price text-center color-dark">出售单价</text>
				<text class="font-13 buy-price text-center color-dark">出售数量</text>
				<text class="font-13 buy-price text-right color-dark">出售总价</text>
			</view>
			<view class="uni-detail-content-item item-long">
				<text class="font-12 buy-time color-light">{{SellTypeName}}</text>
				<text
					class="font-15 buy-price text-center color-green">{{parseFloat(info.SellPriceUnit).toFixed(4)}}</text>
				<text class="font-15 buy-price text-center color-light">{{parseFloat(info.SellCount).toFixed(4)}}</text>
				<text
					class="font-15 buy-price text-right color-green">{{parseFloat(info.SellPriceTotal).toFixed(4)}}</text>
			</view>
			<view class="line"></view>
			<view class="uni-detail-content-state-view">
				<text class="font-12 color-dark">出售状态:</text>
				<view class="flex">
					<text class="state  " :class="'state'+info.SellState">{{sellStateStr}}</text>
				</view>
			</view>
		</view>
			<view class="uni-detail-bottom flex">
			<text class="font-13 color-dark">盈利额:</text>
			<view class="">
				<text class="font-15 " :class="info.Profit>0?'color-green':'color-danger'">{{parseFloat(info.Profit).toFixed(4)}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
			<text class="font-13 color-dark">盈利率</text>
			<text class="font-15 " :class="info.ProfitRatio>0?'color-green':'color-danger'">{{(info.ProfitRatio * 100).toFixed(2)}}%</text>
		</view>
		<view class="button-view">
			<button type="default" @click="close">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupXhWgDetail',
		props: {
			orderInfo: {
				type: Object
			}
		},
		inject: ['popup'],
		data() {
			return {
				info: {
					Symbol: '',
					BuyTime: '',
					SellTime: '',
					BuyPriceUnit: 0,
					BuyPriceTotal: 0,
					BuyCount: 0,
					SellPriceUnit: 0,
					SellPriceTotal: 0,
					Sellount: 0,
					BuyState: 0,
					SellState: 0,
					Profit: 0,
					ProfitRatio: 0,
					StartPrice:0,
					EndPrice:0,
					EmwinPrice:0,
					EmlosPrice:0,
					SellOrderId: '',
				}
			}
		},

		created() {
			this.info = this.orderInfo
		},
		computed: {
			//买单状态
			buyStateStr() {
				//购买单状态 0未委托1已委托2已成交3已撤单
				let state = this.info.BuyState;
				let str = '';
				switch (state) {
					case 0:
						str = '未委托';
						break;
					case 1:
						str = '已委托';
						break;
					case 2:
						str = '已成交';
						break;
					case 3:
						str = '已撤单';
						break;
					default:
						str = '错误'
				}
				return str;
			},
			totalState() {
				//出售单状态 0未委托1已委托2已成交3已撤单
				let state = this.info.SellState;
				let str = '';
				switch (state) {
					case 0:
					case 1:
						str = '进行中';
						break;
					case 2:
						if (this.info.CloseType == 1) {
							str = '已止盈';
						} else {
							str = '已止损';
						}
						break;
					case 3:
						str = '已关闭';
						break;
					default:
						str = '错误'
				}
				return str;
			},
			//卖单状态
			sellStateStr() {
				let state = this.info.SellState;
				let str = '';
				switch (state) {
					case 0:
						str = '未委托';
						break;
					case 1:
						str = '已委托';
						break;
					case 2:
						str = '已成交';
						break;
					case 3:
						str = '已撤单';
						break;
					default:
						str = '错误'
				}
				return str;
			},
			BuyTypeName() {
				let state = this.info.BuyType;
				let str = '';
				switch (state) {
					case 'buy-market':
						str = '市价购买';
						break;
					case 'buy-limit':
						str = '限价购买';
						break;
					default:
						str = ''
				}
				return str;
			},
			SellTypeName() {
				let state = this.info.SellType;
				let str = '';
				switch (state) {
					case 'sell-market':
						str = '市价出售';
						break;
					case 'sell-limit':
						str = '限价出售';
						break;
					default:
						str = ''
				}
				return str;
			}
		},
		methods: {
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.color-dark {
		color: #6f87a4;
	}

	.color-light {
		color: #ced3e9;
	}

	.color-green {
		color: #12c1bb;
	}

	.font-21 {
		font-size: 42rpx;
	}
	
	.line {
		width: 694rpx;
		margin-left: 14rpx;
		border-bottom: 1rpx solid #15202e;
		border-top: 1rpx solid #2b4364;
	}

	.state {
		width: 120rpx;
		height: 40rpx;
		border-radius: 6rpx;
		text-align: center;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.state0 {
		background-color: rgba(238, 187, 100, 0.15);
		color: #f59a4b;
	}
	.state1 {
		background-color: rgba(112, 222, 190, 0.1);
		color: #09b195;
	}

	.state2 {
		background-color: rgba(112, 145, 222, 0.18);
		color: #249efb;
	}

	.state3 {
		background-color: rgba(248, 100, 100, 0.11);
		color: #d14b64;
	}

	.sellState0 {
		background-color: rgba(112, 222, 190, 0.1);
		color: #09b195;
	}

	.sellState1 {
		background-color: rgba(112, 222, 190, 0.1);
		color: #09b195;
	}

	.sellState2 {
		background-color: rgba(112, 145, 222, 0.18);
		color: #249efb;
	}

	.sellState3 {
		background-color: rgba(248, 100, 100, 0.11);
		color: #d14b64;
	}

	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;
	}

	.uni-detail-title {
		height: 96rpx;
		background-color: #1e2a40;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		width: 100%;
		border-bottom: 1rpx solid #1f304a;
	}

	.uni-detail-info {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 104rpx;
		width: 690rpx;
		margin-top: 5rpx;
	}

	.uni-detail-content {
		width: 722rpx;
		background-color: #20324a;
		border-radius: 6rpx;
		margin-top: 20rpx;

		&-item {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 64rpx;
			box-sizing: border-box;
			padding: 0 18rpx;
			background-color: #20324a;
		}

		&-item-title-big {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 64rpx;
			padding: 0 18rpx;
			background-color: #283c57;
			border-radius: 6px 6px 0px 0px;
			box-sizing: border-box;
		}

		.item-long {
			height: 70rpx;
		}

		&-state-view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 67rpx;
			box-sizing: border-box;
			padding: 0 18rpx;
		}
	}

	.uni-detail-bottom {
		width: 722rpx;
		height: 64rpx;
		background-color: #20324a;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding: 0 18rpx;
		margin-top: 20rpx;
	}

	.button-view {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 160rpx;

		button {
			width: 580rpx;
			height: 98rpx;
			background-color: #2aa3b1;
			border-radius: 12rpx;
			text-align: center;
			font-size: 36rpx;

			line-height: 98rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}
	}

	.buy-time {
		width: 20%;
		white-space: nowrap;
	}

	.buy-price {
		width: 26%;
		white-space: nowrap;
	}
</style>
