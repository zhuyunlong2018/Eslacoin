<template>
	<view class="uni-popup-detail">
		 
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">挂单分析表</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="uni-detail-info flex flex-column flex-start">
			<view class="line line1 flex">
				<view class="item1">
					<text>编号</text>
				</view>
				<view class="item2">
					<text>起始价</text>
				</view>
				<view class="item3">
					<text>结束价</text>
				</view>
				<view class="item4">
					<text>成交量</text>
				</view>
			</view>

			<scroll-view class="order-view" :scroll-y="true">
				<view class="line flex" v-for="item,index in Lists" :key="index">
					<view class="item1">
						<text>{{index+1}}</text>
					</view>
					<view class="item2">
						<text>{{item.StartPrice}}</text>
					</view>
					<view class="item3">
						<text>{{item.EndPrice}}</text>
					</view>
					<view class="item4">
						<text>{{item.Count}}</text>
					</view>

				</view>
			</scroll-view>

		</view>

	</view>
</template>

<script>
	export default {
		name: 'UniPopupGdfx',
		props: {
			GdFxParam: {
				PricePrecision:Number,//价格精度
				TaskType: Number,
				TriggerPriceMin: Number, //触发最低价 合约网格
				TriggerPriceMax: Number, //触发最高价 合约网格
				GridsNum: Number, //网格个数
				BuyDirection: String,
				Count: Number, //购买量
			}
		},
		inject: ['popup'],
		data() {
			return {
				Lists: []
			}
		},

		created() {
			this.createLists()
		},
		computed: {},
		methods: {
			//生成表单数据
			createLists() {
				let self = this
				let count = self.GdFxParam.GridsNum
				let IntervalPrice = (self.GdFxParam.TriggerPriceMax-self.GdFxParam.TriggerPriceMin)/count
				 
				for (let i = 0; i < count; i++) {
					let start = 0;
					let end = 0;
					if (self.GdFxParam.TaskType == 4 && self.GdFxParam.BuyDirection == 'sell') {
						start = (self.GdFxParam.TriggerPriceMax - IntervalPrice * i).toFixed(self.GdFxParam.PricePrecision)
						end =  (self.GdFxParam.TriggerPriceMax - IntervalPrice * (i + 1)).toFixed(self.GdFxParam.PricePrecision)
					} else {
						start =  (self.GdFxParam.TriggerPriceMin + IntervalPrice * i).toFixed(self.GdFxParam.PricePrecision)
						end =  (self.GdFxParam.TriggerPriceMin + IntervalPrice * (i + 1)).toFixed(self.GdFxParam.PricePrecision)
					}
					self.Lists.push({
						StartPrice: start,
						EndPrice: end,
						Count: self.GdFxParam.Count
					})
				}

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



	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;

		.f42 {
			font-size: 42rpx;
			line-height: 75rpx;
		}

		.state {
			width: 120rpx;
			height: 40rpx;
			border-radius: 8rpx;
			text-align: center;
			font-size: 24rpx;
			padding: 0 10rpx;
			line-height: 40rpx;
		}

		.state0 {
			background-color: #faf0eb;
			color: #fe7d41;
		}

		.state1 {
			// background-color: #e6f6f2;
			// color: #0ac593;
			background-color: #faf0eb;
			color: #fe7d41;
		}

		.state2 {
			background-color: rgba(22, 106, 255, 0.08);
			color: #12c1bb;
		}

		.state3 {
			background-color: #faf0eb;
			color: #fe7d41;
		}
	}
	.uni-detail-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		width: 100%;
		// border-bottom: 1rpx solid #e2e2e3;

		.uni-detail-title-text {
			font-size: 32rpx;
			line-height: 40rpx;
			color: #666;
		}
	}


	.uni-detail-info {
		/* #ifndef APP-NVUE */
		/* #endif */
		height: 804rpx;
		width: 690rpx;
		margin-top: 5rpx;

		.item1 {
			text-align: center;
			width: 20%;
		}

		.item2 {
			text-align: center;
			width: 20%;
		}

		.item3 {
			text-align: center;
			width: 20%;
		}

		.item4 {
			text-align: center;
			width: 20%;
		}

		.order-view {
			width: 720rpx;
			height: 700rpx;

			.line {
				width: 100%;
				height: 56rpx;
				background-color: #243048;
				margin-top: 20rpx;

				text {
					font-size: 28rpx;
					color: #ced3e9
				}



			}
		}



		.line1 {
			width: 720rpx;
			height: 46rpx;
			background-color: #243048;

			text {
				font-size: 24rpx;
				color: #6f87a4
			}
		}
	}
</style>
