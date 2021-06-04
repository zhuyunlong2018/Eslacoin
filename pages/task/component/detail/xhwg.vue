<!-- 高频交易-任务详情页 -->
<template>
	<view class="root">
		<view class="item1 flex">
			<view class="">
				<text class="f42 font-bold color-light">{{TaskData.Symbol.replace("USDT","")}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
			<view class="flex ">
				<text class="font-13 color-dark">状态:</text>
				<view class="flex m-l30">
					<text class="state" :class="'state'+TaskData.State">{{stateText}}</text>
				</view>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">玩法:</text>
				<text class="font-15 color-light p-lr10">现货-网格交易</text>
			</view>
			<view class="flex ">
				<text class="font-13 color-dark">交易渠道:</text>
				<view class="flex p-lr10">
					<text class="font-15 color-light">{{EchannelName}}</text>
				</view>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">每单购买额:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.BuyCoinOnce}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
			<view class="left ">
				<text class="font-13 color-dark">每单止盈率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.SellRatio}}%</text>
			</view>

		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">每单止损率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossRatio}}%</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">网格价格:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.TriggerPriceMin}}-{{TaskData.TriggerPriceMax}}</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">网格个数:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.GridsNum}}</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">最大挂单:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.MaxActiveCount==-1?'不控制':TaskData.MaxActiveCount}}</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">交易次数:</text>
				<text
					class="font-15 color-light p-lr10">{{TaskData.TriggerNum==-1?'无限次':TaskData.TriggerNum+'次'}}</text>
			</view>
			<view class="">
				<text class="font-13 color-light">{{TaskData.CreateTime}}</text>
			</view>
		</view>
		<view class="item5 flex">
			<view class="">
				<text class="font-13 color-dark">总开单:</text>
				<text class="font-15 color-green p-lr10">{{TaskData.BuyOrderCount}}</text>
			</view>
			<!-- <view class="">
				<text class="font-13 color-dark">进行中:</text>
				<text class="font-15 color-green p-lr10">{{TaskData.BuyOrderCount}}</text>
			</view> -->
			<view class="">
				<text class="font-13 color-dark">已完成:</text>
				<text class="font-15 color-green p-lr10">{{TaskData.ProfitOrderCount}}</text>
			</view>
			<view class="">
				<text class="font-13 color-dark">总盈利:</text>
				<text class="font-15  p-lr10" :class="TaskData.Profit>0?'color-green':'color-danger'">{{TaskData.Profit.toFixed(4)}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
		</view>
		<view class="" v-show="TaskData.Remark!=''">
			<text class="color-danger font-13 p-l10">备注:{{TaskData.Remark}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DetailXhWg',
		props: {
			TaskData: {
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
					GridsNum: 0,
					TriggerPriceMax: 999999,
					TriggerPriceMin: 0,
					State: 1,
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

			}
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

		},
	}
</script>

<style lang="scss">
	@import "../../task.scss";

	.root {
		width: 100%;
		padding: 0 14rpx 0 20rpx;
		box-sizing: border-box;

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

		.item1 {
				width: 100%;
			height: 75rpx;
		}

		.item2 {
			width: 100%;
			height: 56rpx;
		}

		.item5 {
				width: 100%;
			height: 67rpx;
		}
	}
</style>
