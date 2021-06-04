<!-- 高频交易-任务详情页 -->
<template>
	<view class="root">
		<v-nav-bar title="机器人详情" :isRightImg="false" />
		<view class="top-view">
			<DetailXhDca v-if="TaskType==1" :TaskData="TaskData"></DetailXhDca>
			<DetailXhWg v-if="TaskType==2" :TaskData="TaskData"></DetailXhWg>
			<DetailHyZn v-if="TaskType==3" :TaskData="TaskData"></DetailHyZn>
			<DetailHyWg v-if="TaskType==4" :TaskData="TaskData"></DetailHyWg>
			<DetailHyDca v-if="TaskType==5" :TaskData="TaskData"></DetailHyDca>
			<view class="line"> </view>
			<view class="opt-view flex ">
				<button class="stopbtn" :class="{'detail-status': TaskData.State == 3}" :disabled="TaskData.State == 3"
					@click="onUpdateBtnClick()">修改</button>
				<button class="updatebtn" :class="{'detail-status': TaskData.State == 3}"
					:disabled="TaskData.State == 3" @click="onStopBtnClick()">{{stbtnText}}</button>
				<button class="closebtn" :class="{'detail-status': TaskData.State == 3}" :disabled="TaskData.State == 3"
					@click="onDeleteBtnClick()">删除</button>
			</view>
		</view>

		<!-- DCA和智能多空没有筛选订单 -->
		<view class="bt-view flex flex-center back-color-hui " v-if="TaskType==2||TaskType==4">
			<view class="btn-col w100p flex">
				<view class="it font-13 color-dark" :class="{'actived': TradeType==1}">
					<text @click="onTradeTypeClick(1)">进行中订单</text>
				</view>
				<view class="sp"></view>
				<view class="it font-13 color-dark" :class="{'actived': TradeType==2}">
					<text @click="onTradeTypeClick(2)">已完成订单</text>
				</view>
				<view class="sp"></view>
				<view class="it font-13 color-dark" :class="{'actived': TradeType==3}">
					<text @click="onTradeTypeClick(3)">未完成订单</text>
				</view>
			</view>
		</view>
		<scroll-view class="order-view" :scroll-y="true" :style="{height:ovHeight+'px'}" @scrolltolower="scrolltolowerFn">
			<view style="height: 1rpx;"></view>
			<view v-if="OrderList.length == 0 && loading" class="no-data">暂无订单</view>
			<view class="order-item flex flex-column back-color-hui" v-for="(item,index) in OrderList"
				:key="item.OrderId">
				<OrderItemXhDca v-if="TaskType==1" :item="item"></OrderItemXhDca>
				<OrderItemXhWg v-if="TaskType==2" :item="item"></OrderItemXhWg>
				<OrderItemHyZn v-if="TaskType==3" :item="item"></OrderItemHyZn>
				<OrderItemHyWg v-if="TaskType==4" :item="item"></OrderItemHyWg>
				<OrderItemHyDca v-if="TaskType==5" :item="item"></OrderItemHyDca>
			</view>
		</scroll-view>
		<uni-popup ref="stop" type="stop">
			<uni-popup-stop :TaskData="TaskData" @remove="remove"></uni-popup-stop>
		</uni-popup>
	</view>
</template>

<script>
	import DetailXhDca from './component/detail/xhdca.vue';
	import DetailXhWg from './component/detail/xhwg.vue';
	import DetailHyZn from './component/detail/hyzn.vue';
	import DetailHyWg from './component/detail/hywg.vue';
	import DetailHyDca from './component/detail/hydca.vue';
	import OrderItemXhWg from './component/order_item/xhwg.vue';
	import OrderItemHyWg from './component/order_item/hywg.vue';
	import OrderItemXhDca from './component/order_item/xhdca.vue';
	import OrderItemHyDca from './component/order_item/hydca.vue';
	import OrderItemHyZn from './component/order_item/hyzn.vue';
	export default {
		components: {
			DetailXhDca,
			DetailXhWg,
			DetailHyZn,
			DetailHyWg,
			DetailHyDca,
			OrderItemXhWg,
			OrderItemHyWg,
			OrderItemXhDca,
			OrderItemHyDca,
			OrderItemHyZn
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				TaskData: {
					TaskId: '',
					TaskName: '',
					Symbol: '',
					Echannel: '',
					BuyCoinOnce: 0,
					BuyCount: 0,
					BuyCountFirst: 0,
					SellRatio: 0,
					SellRatioFd: 0,
					LossRatio: 0,
					TriggerPriceMin: 0,
					TriggerPriceMax: 0,
					TriggerNum: 0,
					FirstBuyTrend: [], //首次建仓参考趋势 1min 5min 15min 30min 60min 4hour 1day 1week  组装数据["1min","5min"]
					FirstBuyDirection: 1, //首次建仓模式 1顺势建仓 2反向建仓
					WinCoolTime: 60, //止盈后冷却时间 单位:秒
					WinBuyTrend: [], //止盈后建仓参考趋势
					WinBuyRefer: 2, //止盈后建仓参考 1上次方向 2时间趋势
					WinBuyDirection: 1, //止盈后建仓模式 1顺势建仓 2反向建仓
					LossCoolTime: 5, //止损后冷却时间 单位:秒
					LossBuyTrend: [], //止损后建仓参考趋势
					LossBuyRefer: 1, //止损后建仓参考 1上次方向 2时间趋势
					LossBuyDirection: 2, //止损后建仓模式 1顺势建仓 2反向建仓
					StopMinCoin: '', //资产低于多少后停止任务
					StopMaxCoin: '', //资产高于多少后停止任务
					State: 1,
					CreateTime: '',
					BuyOrderCount: 0,
					ProfitOrderCount: 0,
					TriggerCondition: 1,
					Profit: 0,
					Remark: '',
				},
				TaskType: 0, //任务类型
				TradeType: 1, //1:进行中订单 2:已完成订单 3:未完成订单
				Page: 1,
				size: 10,
				loading: false,
				TotalCount: 0,
				OrderList: [], //订单列表
				ovHeight: 300,
			}
		},

		//*******************************************************************
		// 加载
		//*******************************************************************
		onLoad(option) {
			console.log('调用了 onLoad：', option)
			if (option.TaskId) {
				this.TaskData.TaskId = option.TaskId //接收传过来的任务ID
			}
			if (option.TaskType) {
				this.TaskType = parseInt(option.TaskType) //接收传过来的任务类型
			}
		},
		onShow() {
			if (this.TaskData.TaskId != '') {
				this.Page = 1;
				this.sendQueryTaskDetailReq()
				this.sendQueryOrderListReq()
			}
		},
		//*******************************************************************
		// 自适应高度
		//*******************************************************************
		onReady() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					let ovTop = uni.createSelectorQuery().select(".order-view");
					ovTop.boundingClientRect(data => {
						self.ovHeight = res.windowHeight - data.top
					}).exec()
				}

			})
		},

		computed: {
			//任务状态字段
			stateText() {
				if (this.TaskData.State == 0) {
					return '已停止'
				} else if (this.TaskData.State == 1) {
					return '运行中'
				} else if (this.TaskData.State == 2) {
					return '已完成'
				} else if (this.TaskData.State == 3) {
					return '已删除'
				} else {
					return '未知'
				}
			},
			EchannelName() {
				switch (this.TaskData.Echannel) {
					case 1:
						return '火币';
						break;
					case 2:
						return '币安';
						break;
					case 3:
						return '比特儿';
						break;
				}
			},
			//按钮字段
			stbtnText() {
				if ([0, 2, 3].includes(this.TaskData.State)) {
					return '启动'
				} else if (this.TaskData.State == 1) {
					return '暂停'
				} else {
					return '未知'
				}
			},

		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {

			//修改按钮
			onUpdateBtnClick() {
				let self = this
				uni.setStorageSync('EditTaskData', self.TaskData)
				if (self.TaskData.TaskId != '') {
					uni.navigateTo({
						url: '/pages/task/edit?EditType=edit&TaskType=' + self.TaskType
					})
				}
			},
			remove(){
				
			},

			//发送暂停或启动任务的消息
			sendStartTaskReq(st) {
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
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						})
					}
				})
			},

			//启动或暂停按钮点击
			onStopBtnClick() {
				let self = this
				if (self.TaskData.State == 1) { //暂停
					console.log('点击修改状态按钮', this.TaskData)
					this.$refs.stop.open()
				} else {
					
					uni.showModal({
						title: '开启',
						content: '确认要开启任务吗？',
						success: function(res) {
							if (res.confirm) {
								self.sendStartTaskReq()
							}
						}
					})
				}
			},

			sendBSDeleteTaskReq() {
				let BSDeleteTaskReq = {
					TaskId: this.TaskData.TaskId,
				}
				let Domain = this.CsData.TaskTypeUrl[this.TaskType]
				let url = this.ApiConfig[Domain] + '/BSDeleteTaskReq';
				this.CsHttp.post(url, BSDeleteTaskReq).then(ackMsg => {
					console.log('收到删除任务的回复:' + JSON.stringify(ackMsg))
					// uni.showModal({
					// 	content: '删除成功',
					// 	showCancel: false,
					// 	success(item) {
					// 		uni.navigateBack();
					// 	}
					// })
					uni.showToast({
						title: '删除成功',
						duration: 2000
					});
					setTimeout(function() {
						uni.navigateBack()
					}, 2000);
				})
			},
			// 删除任务
			onDeleteBtnClick() {
				console.log('删除任务点击')
				let self = this
				uni.showModal({
					title: '删除',
					content: '删除任务不可恢复，确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							self.sendBSDeleteTaskReq()
						}
					}
				})
			},

			//切换交易类型
			onTradeTypeClick(index) {
				this.TradeType = index;
				this.Page = 1;
				this.OrderList = [];
				this.sendQueryOrderListReq();
			},
			//查询任务详情
			sendQueryTaskDetailReq(type) {
				let BSGetOrderListReq = {
					TaskId: this.TaskData.TaskId,
				}
				let Domain = this.CsData.TaskTypeUrl[this.TaskType]
				let url = this.ApiConfig[Domain] + '/BSGetTaskDetailReq';
				this.CsHttp.post(url, BSGetOrderListReq).then(ackMsg => {
					if (ackMsg.Code == 0) {
						this.TaskData = ackMsg
					}
				})
			},

			// 页面滚动事件
			scrolltolowerFn() {
				if (this.loading) return false;
				this.Page++;
				this.sendQueryOrderListReq();
			},
			//查询订单
			sendQueryOrderListReq() {
				this.loading = true;
				let BSGetOrderListReq = {
					TaskId: this.TaskData.TaskId,
					Page: this.Page,
					Size: this.size
				}
				//合约
				if (this.TaskType == 2 || this.TaskType == 4) {
					BSGetOrderListReq.Type = this.TradeType
				}
				let Domain = this.CsData.TaskTypeUrl[this.TaskType]
				let url = this.ApiConfig[Domain] + '/BSGetOrderListReq';
				this.CsHttp.post(url, BSGetOrderListReq, true).then(ackMsg => {
					this.TotalCount = ackMsg.TotalCount;
					if (this.Page == 1) {
						this.OrderList = [...ackMsg.OrderDataList];
					} else {
						this.OrderList.push(...ackMsg.OrderDataList);
					}
					this.loading = false;
					if (this.OrderList.length == this.TotalCount) {
						this.loading = true;
					}
				}).catch(err => {
					this.Page--;
					this.loading = false;
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "task.scss";

	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.line {
		width: 694rpx;
		margin-left: 20rpx;
		border-bottom: 1rpx solid #0b111c;
		border-top: 1rpx solid #1f304a;
	}

	.content {
		border-radius: 8rpx;
		margin: 0 14rpx;
	}

	.top-view {
		width: 722rpx;
		background-color: #1a253a;
		border-radius: 6px;

		.opt-view {
			width: 100%;
			height: 122rpx;
			box-sizing: border-box;
			padding: 0 14rpx;

			button {
				width: 220rpx;
				height: 80rpx;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 80rpx;
				letter-spacing: 0px;
				color: #ffffff;
				margin: 0;

				&::after {
					border: none;
				}
			}

			.updatebtn {
				background-color: #2aa3b1;
			}

			.stopbtn {
				background-color: #04ac90;
			}

			.closebtn {
				background-color: #d14b64;
			}

			.detail-status {
				opacity: 0.5;
			}
		}
	}



	.bt-view {
		border-radius: 6rpx;
		width: 722rpx;
		height: 80rpx;
		margin-top: 20rpx;
		padding: 0 14rpx;
		box-sizing: border-box;

		.btn-col {
			height: 50rpx;
			background-color: #323d56;
			border-radius: 8rpx;
		}

		.sp {
			width: 2rpx;
			height: 12rpx;
			margin: 0 15rpx;
			background-color: #c7c2c2;
		}

		.it {
			text-align: center;
			height: 50rpx;
			line-height: 50rpx;
			// color: #686868;
			width: 30%;
			// font-size: 26rpx;

		}

		.actived {
			font-size: 28rpx;
			color: #ffffff;
			border-radius: 8rpx;
			background-color: #2aa3b1;
		}
	}




	.order-view {
		width: calc(100% - 28rpx);
		margin: 0 14rpx;
		// background-color: #ebebeb;


		.order-item {
			border-radius: 6rpx;
			width: 100%;
			height: 120rpx;
			margin-top: 10rpx;

			.content-item {

				width: 690rpx;
				height: 60rpx;

				.left {
					width: 250rpx;
				}

				.center {
					width: 320rpx;
				}

				.right {
					width: 120rpx;
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

					&::after {
						border: none;
					}
				}
			}
		}
	}
</style>
