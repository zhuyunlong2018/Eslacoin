<!-- 高频交易-任务详情页 -->
<template>
	<view class="root">
		<view class="item1 flex">
			<view class="">
				<text class="f42 font-bold color-light">{{TaskData.Symbol.replace("USDT","")}}</text>
				<text class="font-15 color-light">{{TaskData.Lever}}X</text>
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
				<text class="font-15 color-light p-lr10">合约-智能多空</text>
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
				<text class="font-13 color-dark">首开仓方向:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.FirstBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
			</view>
			<view class="left ">
				<text class="font-13 color-dark">首单资金比:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.BuyRatio}}%</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">盈利止盈率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.SellRatio}}%</text>
			</view>
			<view class="left ">
				<text class="font-13 color-dark">回调止盈率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.SellRatioFd}}%</text>
			</view>
		</view>
		<view class="item2 flex">

			<view class="left ">
				<text class="font-13 color-dark">亏损止损率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossRatio}}%</text>
			</view>
			<view class="right flex flex-start">
				<text class="font-13 color-dark">补仓策略:</text>
				<view v-html="replishText"></view>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left flex flex-start">
				<text class="font-13 color-dark">止盈后冷却时间:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.WinCoolTime}}秒</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">止损后冷却时间:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossCoolTime}}秒</text>
			
			</view>
		</view>
		<view class="item2 flex">
			<view class="left flex flex-start">
				<text class="font-13 color-dark">止盈后开仓参照:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.WinBuyRefer==1?'上次方向':'时间趋势'}}</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">止损后开仓参照:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossBuyRefer==1?'上次方向':'时间趋势'}}</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left flex flex-start">
				<text class="font-13 color-dark">止盈后建仓模式:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.WinBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">止损后建仓模式:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
			</view>
		</view>

		<view class="item5 flex">
			<view class="">
				<text class="font-13 color-light">{{TaskData.CreateTime.slice(5,16)}}</text>
			</view>
			<view class="">
				<text class="font-13 color-dark">当前第</text>
				<text class="font-15 color-green p-lr10">{{TaskData.Round}}</text>
				<text class="font-13 color-dark">轮,</text>
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
		name: 'DetailHyZn',
		props: {
			TaskData: {
				type: Object,
				default: {
					TaskId: '',
					TaskName: '',
					Symbol: '',
					BuyRatio: 0, //建仓比例
					SellRatio: 0,
					SellRatioFd: 0,
					LossRatio: 0,
					TriggerNum: 0,
					State: 1,
					CreateTime: '',
					Profit: 0,
					Round: 0,
					Remark: '',
					LossRatio: 0, //亏损止损率
					FirstBuyDirection: 1, //建仓方向 1顺势建仓 2反向建仓
					WinCoolTime: 0, //止盈后冷却时间 单位:秒
					WinBuyDirection: 1, //建仓方向 1顺势建仓 2反向建仓
					LossCoolTime: 0, //止损后冷却时间 单位:秒
					LossBuyDirection: 0, //建仓方向 1顺势建仓 2反向建仓

				}
			}
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {}
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
			replishText() {
				let ReplishData = []
				if (this.TaskData.Replish) {
					ReplishData = JSON.parse(this.TaskData.Replish)
				}
				let len = ReplishData.length
				if (len == 0) {
					return '<text class="font-15 color-light">无补仓</text>'
				}
				let count = ReplishData.map(item => item.BuyRatio).reduce((a, b) => {
					return a + b
				});

				return '<text class="font-15 color-light p-l10"> ' + len +
					'</text><text class="font-12 color-dark"> 次 共</text><text class="font-15 color-light"> ' + count +
					'</text><text class="font-10 color-dark">%</text>'
			},

		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {},
	}
</script>

<style lang="scss">
	@import "../../task.scss";


	.root {
		width: 100%;
		padding: 0 14rpx 0 20rpx;
		box-sizing: border-box;

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
	}
</style>
