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
			<view class="flex w100p" style="height: 80rpx;">
				<view class="w33p">
					<text class="font-bold color-light font-21">{{OrderInfo.Symbol.replace("USDT","")}}</text>
					<text class="font-10 color-dark">/USDT</text>
				</view>
				<view class="w33p flex flex-center">
					<text class="font-13 color-light">{{OrderInfo.CreateTime.slice(5,16)}}</text>
				</view>
				<view class="w33p flex flex-end">
					<text class="state " :class="'IsActiveState'+OrderInfo.IsActive">{{totalState}}</text>
				</view>
			</view>
			<view class="flex w100p" style="height: 120rpx;">
				<view class="w33p h75 flex flex-column align-start ">
					<text class="font-12 color-dark">持仓数量/{{OrderInfo.Symbol.replace("USDT","")}}</text>
					<text class="font-16 color-light">{{OrderInfo.BuyCount.toFixed(4)}}</text>
				</view>
				<view class="w33p h75 flex flex-column">
					<text class="font-12 color-dark">持仓均价/USDT</text>
					<text class="font-16 color-light">{{OrderInfo.BuyPriceUnit.toFixed(4)}}</text>
				</view>
				<view class="w33p h75 flex flex-column align-end">
					<text class="font-12 color-dark">持仓总价/USDT</text>
					<text class="font-16 color-light">{{OrderInfo.BuyPriceTotal.toFixed(4)}}</text>
				</view>
			</view>
			<view class="flex flex-start w100p" style="height: 120rpx;" v-if="OrderInfo.IsActive==0">
				<view class="w33p h75 flex flex-column align-start">
					<text class="font-12 color-dark">盈利额/USDT</text>
					<text class="font-16 color-green">{{OrderInfo.Profit.toFixed(2)}}</text>
				</view>
				<view class="w33p h75 flex flex-column">
					<text class="font-12 color-dark">盈利率</text>
					<text class="font-16 color-light">{{(OrderInfo.ProfitRatio*100).toFixed(2)}}%</text>
				</view>
			</view>
			<view class="flex flex-start w100p" style="height: 120rpx;" v-else>
				<view class="w33p h75 flex flex-column align-start">
					<text class="font-12 color-dark">预估止盈价/USDT</text>
					<text class="font-16 color-green">{{OrderInfo.EmwinPrice.toFixed(4)}}</text>
				</view>
				<view class="w33p h75 flex flex-column">
					<text class="font-12 color-dark">预估止损价/USDT</text>
					<text class="font-16 color-light">{{OrderInfo.EmlosPrice.toFixed(4)}}</text>
				</view>
			</view>

		</view>
		<view class="trade-log-title flex flex-start">
			<text class="font-18 color-green" style="padding-left: 28rpx;">交易日志</text>
		</view>
		<scroll-view class="flex flex-column content-view" style="width: 100%;height: 500rpx;" :scroll-y="true">
			<view class="uni-detail-content" v-for="(item,index) in TradeData " :key="index">
				<view class="uni-detail-content-item">
					<view class="h75 flex flex-column align-start " style="width: 30%;">
						<text class="font-12 color-dark">交易单价/USDT</text>
						<text class="font-15 color-orange">{{item.TradePirceUnit.toFixed(4)}}</text>
					</view>
					<view class="h75 flex flex-column align-start" style="width: 25%;">
						<text class="font-12 color-dark">交易量/{{OrderInfo.Symbol.replace("USDT","")}}</text>
						<text class="font-15 color-light">{{item.TradeCount.toFixed(4)}}</text>
					</view>
					<view class="h75 flex flex-column align-start" style="width: 30%;">
						<text class="font-12 color-dark">交易时间</text>
						<text class="font-15 color-light">{{item.CreateTime.slice(5,16)}}</text>
					</view>
					<view class="flex flex-end" style="width: 15%;">
						<text class=" TradeState "
							:class="'TradeState'+item.TradeType">{{getTradeTypeStr(item.TradeType)}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="button-view">
			<button type="default" @click="close">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupXhZnDetail',
		props: {
			OrderInfo: {
				type: Object,
				default: {
					OrderId: '', //本地使用的订单唯一标记id
					TaskId: '', //任务id
					Round: 0, //任务轮数 从1开始
					//Echannel int  //订单渠道1火币2币安
					Symbol: '', //币种交易对
					EmwinPrice: 0, //预估止盈价
					EmlosPrice: 0, //预估止损价
					BuyCount: 0, //交易额度
					BuyPriceUnit: 0, //购买成交单价
					BuyPriceTotal: 0, //购买成交总价
					BuyFees: 0, //购买产生的手续费用
					SellCount: 0, //出售数量
					SellPriceUnit: 0, //出售单价
					SellPriceTotal: 0, //出售总价
					SellFees: 0, //出售产生的手续费
					Profit: 0, //盈利额
					ProfitRatio: 0, //盈利率K
					TransactionLog: '', //交易日志(交易订单记录) []*msg.TradeData
					IsActive: 0, //是否继续监控这条执行订单 0:已完成 1:进行中
					Remark: '' //备注信息
				}
			},
			TaskType: {
				type: Number,
				default: 1
			}
		},
		inject: ['popup'],
		data() {
			return {
				TradeData: []
			}
		},

		created() {
			if(this.OrderInfo.TransactionLog){
				this.TradeData = JSON.parse(this.OrderInfo.TransactionLog).reverse()
			}
		},
		computed: {
			//任务交易状态
			TradeTypeStr() {
				//购买单状态 0未委托1已委托2已成交3已撤单
				let state = this.OrderInfo.BuyState;
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
				let state = this.OrderInfo.IsActive;
				let str = '';
				switch (state) {

					case 1:
						str = '进行中';
						break;
					case 0:
						str = '已完成';
						break;
					default:
						str = '错误'
				}
				return str;
			},
		},
		methods: {
			getTradeTypeStr(state) {
				let str = '';
				switch (state) {
					case 1:
						str = '建仓';
						break;
					case 2:
						str = '补仓';
						break;
					case 3:
						str = '止盈';
						break;
					case 4:
						str = '止损';
						break;
					default:
						str = '错误'
				}
				return str;
			},
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

	.IsActiveState1 {
		background-color: rgba(112, 222, 190, 0.1);
		color: #09b195;
	}

	.IsActiveState0 {
		background-color: rgba(112, 145, 222, 0.18);
		color: #249efb;
	}

	.TradeState {
		width: 92rpx;
		height: 61rpx;
		border-radius: 6rpx;
		text-align: center;
		font-size: 24rpx;
		line-height: 60rpx;
	}

	.TradeState1 {
		background-color: rgba(112, 222, 190, 0.1);
		color: #09b195;
	}

	.TradeState2 {
		background-color: rgba(112, 145, 222, 0.18);
		color: #249efb;
	}

	.TradeState3 {
		background-color: rgba(112, 145, 222, 0.18);
		color: #249efb;
	}

	.TradeState4 {
		background-color: rgba(248, 100, 100, 0.11);
		color: #d14b64;
	}

	.h75 {
		height: 75%;
	}

	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;

		.uni-detail-title {
			height: 96rpx;
			background-color: #1e2a40;
			border-radius: 16rpx 16rpx 0rpx 0rpx;
			width: 100%;
			border-bottom: 1rpx solid #1f304a;
		}
	}

	.trade-log-title {
		width: 750rpx;
		height: 66rpx;
		background-color: #20324a;
	}



	.uni-detail-info {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;

		// height: 104rpx;
		width: 100%;
		margin-top: 5rpx;
		background-color: #1a253a;
		box-sizing: border-box;
		padding: 0 28rpx;
	}
	.content-view{
		box-sizing: border-box;
		padding: 0 14rpx;
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
				height: 108rpx;
				box-sizing: border-box;
				padding: 0 14rpx;
				border-radius: 6rpx;
				background-color: #20324a;
		
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
