<!-- 高频交易-任务详情页 -->
<template>
	<view class="root flex">
		<view class="item1 flex">
			<view class="name">
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
				<text class="font-15 color-light p-lr10">合约-DCA交易</text>
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
				<text class="font-13 color-dark">首单购买额:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.BuyCoinFirst}}</text>
				<text class="font-10 color-dark">/USDT</text>
			</view>
			<view class="left ">
				<text class="font-13 color-dark">盈利止盈率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.SellRatio}}%</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">回调止盈率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.SellRatioFd}}</text>
				<text class="font-13 color-dark">%</text>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">亏损止损率:</text>
				<text class="font-15 color-light p-lr10">{{TaskData.LossRatio}}</text>
				<text class="font-13 color-dark">%</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left flex flex-start">
				<text class="font-13 color-dark">补仓策略:</text>
					<view  v-html="replishText"></view>
			</view>
			<view class="right ">
				<text class="font-13 color-dark">触发条件:</text>
				<text class="font-15 color-light p-lr10">{{TriggerConditionName}}</text>
			</view>
		</view>
		<view class="item2 flex">
			<view class="left ">
				<text class="font-13 color-dark">交易次数:</text>
				<text
					class="font-15 color-light p-lr10">{{TaskData.TriggerNum==-1?'无限次':TaskData.TriggerNum+'次'}}</text>
			</view>
			<view class="">
				<text class="font-13 color-dark" v-if="TaskData.TriggerCondition==2">触发价格:</text>
				<text class="font-15 color-light p-lr10" v-if="TaskData.TriggerCondition==2">{{TaskData.TriggerPriceMin}}-{{TaskData.TriggerPriceMax}}</text>
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

		name: 'DetailHyDca',
		props: {
			TaskData: {
				type: Object,
				default: {
					TaskId: '',
					TaskName: '',
					Symbol: '',
					BuyCoinFirst: 0,
					SellRatio: 0,
					SellRatioFd: 0,
					LossRatio: 0,
					TriggerPriceMin: 0,
					TriggerPriceMax: 0,
					TriggerNum: 0,
					TriggerCondition:1,
					State: 1,
					Round:0,
					CreateTime: '',
					BuyOrderCount: 0,
					ProfitOrderCount: 0,
					Profit: 0,
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
			TriggerConditionName(){
				if(this.TaskData.TriggerCondition==1){
					return '立即买入'
				}else{
					console.log('名字',this.TaskData.TriggerPriceMax)
					return '小于'+ this.TaskData.TriggerPriceMax
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
				let count = ReplishData.map(item => item.BuyCount).reduce((a, b) => {
					return a + b
				});
				
				return '<text class="font-15 color-light p-l10"> ' + len +
					'</text><text class="font-12 color-dark"> 次 共</text><text class="font-15 color-light"> ' + count +
					'</text><text class="font-10 color-dark"> ' + this.TaskData.Symbol + '</text>'
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
	}
</style>
