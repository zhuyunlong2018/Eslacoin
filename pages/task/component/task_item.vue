<!-- 高频交易-任务详情页 -->
<template>
	<view class="task-item-root">
		<view class="content-view flex flex-column">
			<view class="point" :class="'color-'+TaskData.TaskType"></view>
			<view class="line1 flex ">
				<view class="left flex flex-start " @click="toQuotations">
					<view class="logo-view p-r10">
						<image class="nav-icon-right" :src="'../../static/coin/'+CoinLogo+'.png'"> </image>
					</view>
					<text class="font-17 font-bold color-light">{{TaskData.Symbol.replace("USDT","")}}</text>
					<text class="font-17 font-bold color-light" v-show="TaskData.TaskType<3">/USDT</text>
					<text class="font-17 font-bold p-l10" v-show="TaskData.TaskType>2&&PositionData.Lever>0" :class="PositionData.Direction=='buy'?'color-lose':'color-danger'">{{PositionData.Lever}}X{{PositionData.Direction=='buy'?'多':'空'}}</text>
			        <text class="icon iconfont iconkline color-orange p-l10 font-15"></text>
				</view>
				<view class="center">
					<view class="type-view flex flex-center" :class="'bg-'+TaskData.TaskType">
						<text class="font-12" :class="'font-color-'+TaskData.TaskType">{{TaskTypeName}}</text>
					</view>
				</view>
				<view class="right flex flex-end">
					<text class="font-15 font-bold "  :class="PositionData.TotalProfit<=0?'color-danger':'color-green'">{{PositionData.TotalProfit.toFixed(4)}}</text>
				</view>
			</view>
			<view class="line2 flex">
				<view class="flex flex-start" @click="toQuotations">
					<view class="channel-logo-view p-lr10">
						<image class="nav-icon-right" :src="'../../static/icon/'+EchannelLogo+'.png'"> </image>
					</view>
					<text class="font-11 color-dark2">{{TaskData.TaskName.slice(0,8)}}</text>
					<text class="font-11 color-dark2 p-l10">{{PositionData.UpdateTime.slice(5,16)}}</text>
				</view>
				<view class="flex">
					<text class="font-10 color-dark">总盈亏</text>
				</view>
			</view>
		</view>
		<view class="line0"> </view>
		<view class="position-view flex" v-show="TaskData.State==1">
			<view class="position-view-left  flex flex-column align-start ">
				<text class="font-10 color-dark">{{TaskData.TaskType>2?'开仓数量':'持仓量'}}({{TaskData.Symbol}})</text>
				<text class="font-13 color-light">{{PositionData.AccVolum.toFixed(4)}}</text>
			</view>
			<view class="position-view-center  flex flex-column align-start">
				<text class="font-10 color-dark">{{TaskData.TaskType>2?'开仓均价':'持仓均价'}}</text>
				<text class="font-13 color-light">{{PositionData.AvgPrice.toFixed(4)}}</text>
			</view>
			<view class="position-view-right  flex flex-column align-end">
				<text class="font-10 color-dark">当前市价</text>
				<text class="font-13 font-bold" :class="PositionData.TotalProfit<=0?'color-danger':'color-green'">{{PositionData.CurPrice.toFixed(4)}}</text>
			</view>
		</view>
		<view class="position-view flex" v-show="TaskData.State==1">
			<view class="position-view-left  flex flex-column align-start ">
				<text class="font-10 color-dark">{{[2, 4].includes(TaskData.TaskType)?'网格个数':'补仓次数'}}</text>
				<text class="font-13 color-light">{{WgName}}</text>
			</view>
			<view class="position-view-center  flex flex-column align-start">
				<text class="font-10 color-dark">执行次数</text>
				<text
					class="font-13 color-light">{{PositionData.CurExcCount}}/{{PositionData.TotalExcCount==-1?'无限':PositionData.TotalExcCount}}</text>
			</view>
			<view class="position-view-right  flex flex-column align-end">
				<text class="font-10 color-dark">{{TaskData.TaskType>2?'保证金':'持仓总价值'}}</text>
				<text
					class="font-13 color-light">{{TaskData.TaskType>2?PositionData.BzCoin.toFixed(4):PositionData.AccCoin.toFixed(4)}}</text>
			</view>
		</view>
		<view class="text-view flex" v-show="TaskData.State==1">
			<view class="text-view-left text-left">
				<text class="font-9 color-danger" v-show="PositionData.CurProfit<0">持仓亏损: {{PositionData.CurProfit.toFixed(4)}} ({{(PositionData.CurProfitRatio*100).toFixed(2)}}%)</text>
			</view>
			<view class="text-view-right text-right">
				<text class="font-9 color-green" v-show="PositionData.CurProfit>0">持仓盈利: {{PositionData.CurProfit.toFixed(4)}} ({{(PositionData.CurProfitRatio*100).toFixed(2)}}%)</text>
			</view>
		</view>
		<view class="win-lose-view flex m-t10" v-show="TaskData.State==1">
			<view class="win-lose-item flex flex-end">
				<view class="lose-view" v-show="PositionData.CurProfit<0"
					:style="{width: Math.abs(PositionData.ProgressValue*100) + '%'}"> </view>
			</view>
			<view class="win-lose-item flex flex-start">
				<view class="win-view" v-show="PositionData.CurProfit>0"
					:style="{width: PositionData.ProgressValue*100 + '%'}"> </view>
			</view>
		</view>
		<view class="line0 " v-show="TaskData.State==1"></view>
		<view class="button-view flex">
			<button plain="true" class="stopBtn" v-if="TaskData.State == 1" @click="onStopBtnClick()">停止</button>
			<button plain="true" class="startBtn" v-else-if="[0, 2, 3].includes(TaskData.State)" @click="onStartBtnClick()">开启</button>
			<button v-else>错误</button>
			<button plain="true" class="detailBtn" @click="onTaskDetailClick()">
				详情
				<text class="icon iconfont iconxiangqing" style="font-size: 22rpx;"></text>
			</button>
		</view>
		<uni-popup ref="stop" type="stop">
			<uni-popup-stop :TaskData="TaskData"  @remove="remove"></uni-popup-stop>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'TaskItem',
		props: {
			TaskData: {
				type: Object
			},
			index:Number
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				PositionData: {
					TotalProfit: 0, //总盈利额
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
					ProgressValue:0,//进度条百分比
					Lever: 0,
					Direction: 'buy',
					UpdateTime: ''
				},
				timer: null, //定时器名称
			}
		},
		created() {
			this.getSymbolPosition()
			console.log('初始化')
		},
		mounted() {
			if (this.TaskData.State == 1) {
				const timer = setInterval(this.getSymbolPosition, 1000 * 1);  
				// 通过$once来监听定时器，在beforeDestroy钩子函数内被清除。  
				this.$once('hook:beforeDestroy', () => {  
				     clearInterval(timer);  
				})
 			}
		},
 
		computed: {
			//渠道logo
			EchannelLogo(Echannel) {
				switch (this.TaskData.Echannel) {
					case 1:
						return 'qh_hb_logo';
					case 2:
						return 'qh_ba_logo';
					case 3:
						return 'qh_bte_logo';
					default:
						return '错误'
				}
			},
			TaskTypeName() {
				switch (this.TaskData.TaskType) {
					case 1:
						return '现货DCA';
					case 2:
						return '现货网格';
					case 3:
						return '合约多空';
					case 4:
						return '合约网格';
					case 5:
						return '合约DCA';
					default:
						return '错误类型'
				}
			},
			//币种logo
			CoinLogo() {
				let coin = this.TaskData.Symbol.replace("USDT", "").toLowerCase();
				return this.CsData.CoinLogArr.indexOf(coin) == -1 ? '0' : coin
			},
			WgName() {
				if ([2, 4].includes(this.TaskData.TaskType)) {
					return this.PositionData.CurWgCount + '/' + this.PositionData.TotalWgCount
				} else {
					return this.PositionData.CurBcCount + '/' + this.PositionData.TotalBcCount
				}
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//任务详情点击
			onTaskDetailClick() {
				let url = '/pages/task/detail?TaskId=' + this.TaskData.TaskId + '&TaskType=' + this.TaskData.TaskType
				uni.navigateTo({
					url: url
				})
			},
			//跳转到行情页面
			toQuotations(){
				let url = '/pages/quotations/quotations_detail?sym='+this.TaskData.Symbol.replace("USDT","")
				uni.navigateTo({
					url: url
				})
			},
			
			remove(){
				this.$emit('remove',this.index);
			},
			//发送启动任务的消息
			sendBSUpdateTaskReq() {
				let PostData = {
					TaskId: this.TaskData.TaskId,
					State: 1, //0暂停 1启用
					OptType: 0, //暂停机器人时参与判定 1直接停止 2挂单停止
					OrderType: 0, //挂单类型 1市价 2限价
					LimitPrice: 0 //限价价格
				}

				let self = this;
				let Domain = self.CsData.TaskTypeUrl[this.TaskData.TaskType]
				let url = self.ApiConfig[Domain] + '/BSSetTaskStateReq';
				self.CsHttp.post(url, PostData).then(ackMsg => {
					console.log('收到开启任务的回复:' + JSON.stringify(ackMsg))
					if (ackMsg.Code == 0) {
						// uni.showModal({
						// 	content: '开启成功',
						// 	showCancel: false,
						// })
						uni.showToast({
							title: '开启成功',
							duration: 2000
						});
						self.TaskData.State = 1
						self.$emit('remove',self.index);
						self.getSymbolPosition()
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						})
					}
				})
			},
			//启动点击
			onStartBtnClick() {
				let self = this
				uni.showModal({
					title: '开启',
					content: '确认要开启任务吗？',
					success: function(res) {
						if (res.confirm) {
							self.sendBSUpdateTaskReq()
						}
					}
				})
			},

			//停止按钮点击
			onStopBtnClick() {
				console.log('点击停止按钮', this.TaskData)
				this.$refs.stop.open()
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
						self.PositionData.TotalProfit = res.TotalProfit; //总盈利额
						self.PositionData.AccVolum = res.AccVolum; //账户持仓量
						self.PositionData.AvgPrice = res.AvgPrice; //持仓均价
						self.PositionData.CurPrice = res.CurPrice; //当前市场价
						self.PositionData.CurProfitRatio = res.CurProfitRatio; //当前盈利率
						self.PositionData.CurProfit = res.CurProfit; //当前盈利额
						self.PositionData.CurExcCount = res.CurExcCount; //当前执行次数
						self.PositionData.ProgressValue = res.ProgressValue; //进度条
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
		},
	}
</script>

<style lang="scss">
	@import "../task.scss";

	.task-item-root {
		width: 100%;
		border-radius: 8rpx;
		padding: 0 14rpx;
		box-sizing: border-box;
		background-color: #0D1A2C;

		.color-green {
			color: #05DE35;
		}

		.color-danger {
			color: #FF3B00;
		}

		.color-lose {
			color: #05DE35;
		}

		.color-win {
			color: #FF3B00;
		}

		.color-dark {
			color: #6D7898;
		}
		.color-dark2 {
			color: #A1A8C1;
		}

		.color-1 {
			background-color: #FF8B26;
		}

		.color-2 {
			background-color: #0DE5C1;
		}

		.color-3 {
			background-color: #2CC5FF;
		}

		.color-4 {
			background-color: #FC355A;
		}

		.color-5 {
			background-color: #EA2CFF;
		}
		.font-color-1 {
			color: #FF8B26;
		}
		
		.font-color-2 {
			color: #0DE5C1;
		}
		
		.font-color-3 {
			color: #2CC5FF;
		}
		
		.font-color-4 {
			color: #FC355A;
		}
		
		.font-color-5 {
			color: #EA2CFF;
		}
		

		.bg-1 {
			background-color: rgba(238, 187, 100, 0.15);
		}

		.bg-2 {
			background-color: rgba(112, 222, 190, 0.1);
		}

		.bg-3 {
			background-color: rgba(98, 135, 222, 0.21);
		}

		.bg-4 {
			background-color: rgba(248, 100, 100, 0.15);
		}

		.bg-5 {
			background-color: rgba(152, 98, 222, 0.21);
		}

		.line0 {
			width: 694rpx;
			border-bottom: 1rpx solid #0b111c;
			border-top: 1rpx solid #1f304a;
		}

		.button-view {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			height: 83rpx;
			// background-color: #1a253a;
			border-radius: 0rpx 0rpx 8rpx 8rpx;

			.stopBtn {
				width: 459rpx;
				height: 64rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				line-height: 62rpx;
				letter-spacing: 0px;
				color: #34C1D5;
				margin: 0;
				border: 1rpx solid #2B8897;

				&::after {
					border: none;
				}
			}
			.startBtn {
				width: 459rpx;
				height: 64rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				line-height: 62rpx;
				letter-spacing: 0px;
				color: #34C1D5;
				margin: 0;
				border: 1rpx solid #2B8897;
				
				&::after {
					border: none;
				}
			}

			.detailBtn {
				width: 220rpx;
				height: 64rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				line-height: 62rpx;
				letter-spacing: 0px;
				color: #0CB98A;
				margin: 0;
				border: 1rpx solid #03826D;

				&::after {
					border: none;
				}
			}

		
		}

		.content-view {
			// width: 724rpx;
			height: 102rpx;
			box-sizing: border-box;
			// padding: 0 14rpx;
			position: relative;

			.point {
				position: absolute;
				left: -10rpx;
				top: 8rpx;
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
			}


			.line1 {
				width: 100%;
				height: 48rpx;
				margin-top: 12rpx;

				.left {
					width: 45%;
				}

				.center {
					width: 25%;
				}

				.right {
					width: 30%;
				}
			}

			.line2 {
				width: 100%;
				height: 42rpx;
			}

			.logo-view {
				width: 42rpx;

				image {
					width: 42rpx;
					height: 42rpx;
				}
			}

			.type-view {
				width: 120rpx;
				height: 40rpx;
				border-radius: 6rpx;
			}


			.channel-logo-view {
				width: 24rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
				}
			}
		}


		.position-view {
			width: 100%;
			height: 72rpx;

			&-left {
				width: 45%;
			}

			&-center {
				width: 30%;
			}

			&-right {
				width: 25%;
			}
		}

		.text-view {
			width: 100%;
			height: 30rpx;

			&-left {
				width: 50%;
			}

			&-right {
				width: 50%;
			}
		}


		.win-lose-view {
			width: 100%;
			height: 11rpx;
			background-color: #2E3F5B;
			border-radius: 2rpx;
			margin-bottom: 10rpx;

			.win-lose-item {
				width: 50%;
				height: 100%;

				.win-view {
					height: 100%;
					//width: 20%;
					background-color: #05DE35;
				}

				.lose-view {
					height: 100%;
					//width: 20%;
					background-color: #FF3B00;
				}
			}

		}

	}
</style>
