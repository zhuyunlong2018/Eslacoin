<template>
	<view class="uni-popup-detail">
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">停止机器人</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="title-view flex">
			<view class="title w50p flex flex-center" :class="{'title-view-active':OrderType==1}"
				@click="changeOrderType(1)">
				<text class=" font-16 color-dark font-bold">市价卖出</text>
			</view>
			<view class="title w50p flex flex-center" :class="{'title-view-active':OrderType==2}"
				@click="changeOrderType(2)">
				<text class="  font-16 color-dark font-bold">限价卖出</text>
			</view>
		</view>

		<view class="uni-detail-info flex flex-column flex-start">
			<view class="w100p flex flex-start" style="height: 76rpx;">
				<view class="logo-view p-lr10">
					<image class="nav-icon-right" :src="'../../static/coin/'+CoinLogo+'.png'"> </image>
				</view>
				<text class="font-18 font-bold color-light">{{TaskData.Symbol.replace("USDT","")}}</text>
				<text class="font-18 color-light" v-show="TaskData.TaskType<3">/USDT</text>
				<text class="font-18 p-l10" v-show="TaskData.TaskType>2"
					:class="PositionData.Direction=='buy'?'color-win':'color-lose'">{{PositionData.Lever}}X{{PositionData.Direction=='buy'?'多':'空'}}</text>

			</view>
			<view class="item flex">
				<text class="font-12 color-dark">当前盈利 (USDT)</text>
				<text class="font-14 "
					:class="PositionData.CurProfit>0?'color-win':'color-lose'">{{PositionData.CurProfit.toFixed(2)}} ({{(PositionData.CurProfitRatio*100).toFixed(2)}}%)</text>
			</view>
			<view class="item flex">
				<text class="font-12 color-dark">开仓价格 (USDT)</text>
				<text class="font-14 color-light">{{PositionData.AvgPrice.toFixed(4)}}</text>
			</view>
			<view class="item flex" :class="{'border-no':OrderType==2}">
				<text class="font-12 color-dark">当前价格 (USDT)</text>
				<text class="font-14 color-light">{{PositionData.CurPrice.toFixed(4)}}</text>
			</view>
			<view class="item flex" v-show="OrderType==1">
				<text class="font-12 color-dark">平仓价格 (USDT)</text>
				<text class="font-14 color-light">市价</text>
			</view>

			<view class="edit-view flex" :class="{'active':FocusInput=='editCount'}" v-show="OrderType==2">
				<text class="font-12 color-dark">平仓价格 (USDT)</text>
				<input style="width: 22%;" class=" text-left color-light font-15" type="number"
					@focus="(e)=>focus1(e,'editCount')" @blur="(e)=>blur1(e,'editCount')" placeholder="请输入价格"
					placeholder-class="color-dark" v-model="LimitPrice"></input>
			</view>
		</view>
		<view class="button-view">
			<button class="calBtn" @click="sendStopTaskReq(1)">直接停止</button>
			<button class="sureBtn" @click="sendStopTaskReq(2)">卖出后停止</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupStop',
		props: {
			TaskData: {
				type: Object,
			}
		},
		inject: ['popup'],
		data() {
			return {
				LimitPrice: '',
				FocusInput: '',
				OrderType: 1, //1市价 2限价
				PositionData: {
					AccVolum: 0, //开仓数量
					AvgPrice: 0, //开仓均价
					CurPrice: 0, //当前市价
					TotalWgCount: 0, //网格个数
					TotalBcCount: 0, //补仓次数
					TotalExcCount: 0, //执行次数
					CurWgCount: 0, //网格个数
					CurBcCount: 0, //补仓次数
					CurExcCount: 0, //执行次数
					BzCoin: 0, //保证金
					AccCoin: 0, //持仓总价值
					CurProfit: 0, //当前盈利额
					CurProfitRatio: 0, //当前盈利率
					Lever: 0,
					Direction: 'buy',
					UpdateTime: ''
				},
			}
		},

		created() {
			this.getSymbolPosition()

		},
		computed: {
			//币种logo
			CoinLogo() {
				let coin = this.TaskData.Symbol.replace("USDT", "").toLowerCase();
				return this.CsData.CoinLogArr.indexOf(coin) == -1 ? '0' : coin
			},
		},
		methods: {
			focus1: function(e, v) {
				this.FocusInput = v
			},
			blur1: function(e, v) {
				this.FocusInput = ''
			},
			//
			changeOrderType(type) {
				this.OrderType = type
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			//获取币种持仓信息
			getSymbolPosition() {
				let self = this
				let TaskType = self.TaskData.TaskType
				let Domain = this.CsData.TaskTypeUrl[this.TaskData.TaskType]
				let url1 = this.ApiConfig[Domain] + '/BSGetTaskPositionReq'
				this.CsHttp.post(url1, {
					TaskId: self.TaskData.TaskId,
				}).then(res => {
					if (res.Code == 0) {
						self.PositionData.AccVolum = res.AccVolum; //账户持仓量
						self.PositionData.AvgPrice = res.AvgPrice; //持仓均价
						self.PositionData.CurPrice = res.CurPrice; //当前市场价
						self.PositionData.CurProfitRatio = res.CurProfitRatio; //当前盈利率
						self.PositionData.CurProfit = res.CurProfit; //当前盈利额
						self.PositionData.CurExcCount = res.CurExcCount; //当前执行次数
						self.PositionData.TotalExcCount = res.TotalExcCount; //配置总执行次数 -1循环 >0对应次数
						self.PositionData.UpdateTime = res.UpdateTime
						if (TaskType == 1) {
							self.PositionData.CurBcCount = res.CurBcCount; //当前补仓次数
							self.PositionData.TotalBcCount = res.TotalBcCount; //当前补仓次数
							self.PositionData.AccCoin = res.AccCoin; //持仓总价值
						} else if (TaskType == 2) {
							self.PositionData.CurWgCount = res.CurWgCount; //网格
							self.PositionData.TotalWgCount = res.TotalWgCount; //网格
							self.PositionData.AccCoin = res.AccCoin; //持仓总价值
						} else if (TaskType == 3) {
							self.PositionData.CurBcCount = res.CurBcCount; //补仓次数
							self.PositionData.TotalBcCount = res.TotalBcCount; //当前补仓次数
							self.PositionData.BzCoin = res.BzCoin; //保证金
							self.PositionData.Lever = res.Lever
							self.PositionData.Direction = res.Direction
						} else if (TaskType == 4) {
							self.PositionData.CurWgCount = res.CurWgCount; //网格
							self.PositionData.TotalWgCount = res.TotalWgCount; //网格
							self.PositionData.BzCoin = res.BzCoin; //保证金
							self.PositionData.Lever = res.Lever
							self.PositionData.Direction = res.Direction
						} else if (TaskType == 5) {
							self.PositionData.CurBcCount = res.CurBcCount; //补仓次数
							self.PositionData.TotalBcCount = res.TotalBcCount; //当前补仓次数
							self.PositionData.BzCoin = res.BzCoin; //保证金
							self.PositionData.Lever = res.Lever
							self.PositionData.Direction = res.Direction
						}
						console.log('币种持仓信息', res)
					}
				}).catch(err => {
					console.log(err)
				});
			},
			//暂停任务的消息
			sendStopTaskReq(type) {
				if (this.OrderType == 2 && this.LimitPrice == '') {
					uni.showToast({
						title: '请输入价格',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.OrderType == 1) {
					this.LimitPrice = this.PositionData.CurPrice
				}
				let PostData = {
					TaskId: this.TaskData.TaskId,
					State: 0, //0暂停 1启用
					OptType: type, //暂停机器人时参与判定 1直接停止 2挂单停止
					OrderType: this.OrderType, //挂单类型 1市价 2限价
					LimitPrice: parseFloat(this.LimitPrice) //限价价格
				}
				let self = this;

				let Domain = self.CsData.TaskTypeUrl[this.TaskData.TaskType]
				let url = self.ApiConfig[Domain] + '/BSSetTaskStateReq';
				self.CsHttp.post(url, PostData).then(ackMsg => {
					console.log('收到更新任务的回复:' + JSON.stringify(ackMsg))
					if (ackMsg.Code == 0) {
						// uni.showModal({
						// 	content: '已停止机器人',
						// 	showCancel: false,
						// })
						uni.showToast({
							title: '更新成功',
							duration: 2000
						});
						self.TaskData.State = 0
						self.$emit('remove',0);
						self.popup.close()
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;
	}

	.color-dark {
		color: #989FB3;
	}

	.color-light {
		color: #F2ECEA;
	}

	.color-win {
		color: #05DE35;
	}

	.color-lose {
		color: #FF3B00;
	}

	.uni-detail-title {
		height: 96rpx;
		background-color: #1e2a40;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		width: 100%;
		border-bottom: 1rpx solid #1f304a;
	}

	.title-view {
		width: 100%;
		height: 64rpx;
		box-sizing: border-box;
		padding: 0 28rpx;
		background-color: #121D2E;
		border-bottom: 1rpx solid #23344A;

		.font-w600 {
			font-weight: 600;
		}

		.font-w500 {
			font-weight: 500;
		}

		.title {
			line-height: 62rpx;
			border-bottom: 4rpx solid #20324A;
		}

		&-active {

			border-bottom: 4rpx solid #14E1F4 !important;

			text {
				color: #14E1F4;
			}
		}
	}

	.uni-detail-info {
		width: 100%;
		// height: 500rpx;
		box-sizing: border-box;
		padding: 0 28rpx;

		.item {
			width: 100%;
			height: 76rpx;
			border-bottom: 1rpx solid #324968;
		}

		.border-no {
			border-bottom: 0;
		}


		.edit-view {
			width: 100%;
			height: 76rpx;
			border: 1rpx solid #324968;
			//text-align: center;
		}

		.active {
			border-color: #3EFFF8 !important;
		}
	}


	.button-view {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 160rpx;
		margin-bottom: 100rpx;

		.sureBtn {
			width: 288rpx;
			height: 80rpx;
			background-color: #2aa3b1;
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			line-height: 80rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}

		.calBtn {
			width: 288rpx;
			height: 80rpx;
			background-color: #475E7D;
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			line-height: 80rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}
	}
</style>
