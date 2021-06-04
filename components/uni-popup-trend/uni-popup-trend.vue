<template>
	<view class="uni-popup-detail">
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">趋势选择</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="uni-detail-info flex">
			<view class="item1 flex flex-start">
				<text class="color-dark font-13">时间</text>
			</view>
			<view class="item2 flex flex-start">
				<text class="color-dark font-13">开盘价</text>
			</view>
			<view class="item3 flex flex-start">
				<text class="color-dark font-13">收盘价</text>
			</view>
			<view class="item4 flex flex-center">
				<text class="color-dark font-13">趋势</text>
			</view>
			<view class="item5 flex flex-center">
				<text class="color-dark font-13">选择</text>
			</view>
		</view>
		<view class="uni-detail-content flex flex-column">
			<view class="w100p content-item flex" v-for="item,index in SymbolQushiDataList" :key="index"
				@click="checkItem(item)">
				<view class="item1">
					<text class="color-light font-14">{{item.Timescale}}</text>
				</view>
				<view class="item2">
					<text class="color-light font-14">{{item.OpenPrice}}</text>
				</view>
				<view class="item3">
					<text class=" font-14 text-center"
						:class="item.Ratio>0?'color-green':'color-danger'">{{item.ClosePrice}}</text>
				</view>
				<view class="item4 text-center">
					<text class=" font-14"
						:class="item.Ratio>0?'color-green':'color-danger'">{{item.Ratio<0?'跌':'涨'}}</text>
					<text class="icon font-10 iconfont"
						:class="item.Ratio>0?'iconshangzhang color-green':'iconxiadie color-danger'"></text>
				</view>
				<view class="item5 text-center">
					<view class="circle " :class="{'circled':TrendArr.indexOf(item.Timescale)>-1}">
						<text class="iconfont icongou circle-gou" v-show="TrendArr.indexOf(item.Timescale)>-1"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="flex flex-center m-t20">
			<text class="icon iconfont icontishi color-danger " style="font-size: 24rpx;"></text>
			<text class="p-l10 font-14 color-danger">提示:选择的趋势条数的总和必须为奇数</text>
		</view>
		<view class="button-view">
			<button type="default" @click="submit()">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupTrend',
		props: {
			Echannel: {
				type: Number,
				default: 1
			},
			Symbol: {
				type: String,
				default: ''
			},
			TrendArr: {
				type: Array
			}
		},
		inject: ['popup'],
		data() {
			return {
				SymbolQushiDataList: [],

			}
		},

		created() {
			this.getSymbolQushiList()
		},
		computed: {

		},
		methods: {
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			//queren
			submit() {
				let len = this.TrendArr.length
				if (len == 0 || len % 2 == 0) {
					uni.showToast({
						title: '趋势条数必须为奇数',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				let order = ["1min", "5min", "15min", "30min", "60min", "4hour", "1day", "1week"];

				this.TrendArr.sort((a, b) => {
					return order.indexOf(a) - order.indexOf(b);
				});

				this.$emit('update', this.TrendArr)
				this.popup.close()
			},
			//选择
			checkItem(item) {
				let index = this.TrendArr.indexOf(item.Timescale)
				if (index > -1) {
					this.TrendArr.splice(index, 1)
				} else {
					this.TrendArr.push(item.Timescale)
				}
				//console.log('arr=', this.TrendArr)
			},
			//获取交易对时间区间的趋势列表
			getSymbolQushiList() {
				let url = this.ApiConfig.HyZnUrl + '/BSGetSymbolQushiListReq'
				let Symbol = this.Symbol
				let PlayType = 1
				if (this.TaskType > 2) {
					Symbol = Symbol.replace("USDT", "")
					PlayType = 2
				}
				let data = {
					Echannel: this.Echannel,
					Symbol: this.Symbol
				}
				this.CsHttp.post(url, data).then(res => {
					console.log('res=', res)
					//if (res.Code == 0) {
					this.SymbolQushiDataList = res.SymbolQushiDataList;
					//	}
				}).catch(err => {
					console.log(err)
				});
			},
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

	.item1 {
		width: 20%;
	}

	.item2 {
		width: 28%;
	}

	.item3 {
		width: 28%;
	}

	.item4 {
		width: 12%;
	}

	.item5 {
		width: 12%;
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

		width: 722rpx;
		height: 48rpx;
		background-color: #283c57;
		box-sizing: border-box;
		padding: 0 10rpx;
		margin-top: 10rpx;
	}

	.uni-detail-content {
		width: 722rpx;
		border-radius: 6rpx;

		.content-item {
			width: 722rpx;
			height: 70rpx;
			background-color: #20324a;
			border-radius: 6rpx;
			margin-top: 10rpx;
			box-sizing: border-box;
			padding: 0 10rpx;
		}

		.circle {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 23rpx 0 14rpx;
			width: 38rpx;
			height: 38rpx;
			background-color: #364867;
			border-radius: 50%;

			&-gou {
				font-size: 20rpx;
				color: #FFFFFF;
			}

		}

		.circled {
			width: 26rpx;
			height: 26rpx;
			border-radius: 50%;
			border: 6rpx solid #364867;
			background-color: #12c1bb;
		}


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
