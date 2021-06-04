<template>
	<view class="root">
		<view class="content-view">
			<view class="title-view flex">
				<text class="color-light font-16">{{ParamTypeName}}生成参数</text>
			</view>
			<view class="line"></view>
			<view class="item-view flex m-t10" v-show="TaskType==1">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">首单购买额:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{TaskData.BuyCoinFirst}}/USDT</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('首次建仓购买总金额。')"></text>
				</view>
			</view>
		
			<view class="item-view flex m-t10" v-show="TaskType==2">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">每单购买量:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{TaskData.BuyCoinOnce}}/USDT</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('首次购买的挂单金额')"></text>
				</view>
			</view>
			<view class="item-view flex">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">{{TaskType==1?'盈利止盈率':'每单止盈率'}}:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-green font-15  ">{{TaskData.SellRatio}}%</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick(TaskType==1?'总持仓达到该盈利率后止盈。':'每单达到该盈利率后止盈。')"></text>
				</view>
			</view>
			<view class="item-view flex" v-show="TaskType==1">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">回调止盈率:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{TaskData.SellRatioFd}}%</text>
					<text class="wen iconfont iconwenhao"
						@click="showTextClick('收益达到止盈率后，如果价格持续上涨，则等上涨到最高点开始回落达到该值后止盈。')"></text>
				</view>
			</view>
			<view class="item-view flex">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">{{TaskType==1?'亏损止损率':'每单止损率'}}:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{TaskData.LossRatio}}%</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick(TaskType==1?'总持仓达到该亏损率后止损。':'每单达到该亏损率后止损。')"></text>
				</view>
			</view>
			<view class="item-view flex" v-show="TaskType==1">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">补仓策略:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{ReplishText}}</text>
					<text class="wen iconfont iconwenhao"
						@click="showTextClick('补仓设置，价格下跌后会按照该策略进行补仓，从而拉低持仓均价。')"></text>
				</view>
			</view>
			<view class="item-view flex">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">交易次数:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text
						class="color-light font-15  ">{{TaskData.TriggerNum==-1?'循环':TaskData.TriggerNum+'次'}}</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('无限循环，或达到该交易次数后机器人自动停止运行。')"></text>
				</view>
			</view>
			<view class="item-view flex" v-show="TaskType==1">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">触发条件:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text
						class="color-light font-15  ">{{TaskData.TriggerCondition==1?'立即买入':'小于'+TaskData.TriggerPriceMax+'U'}}</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('机器人触发执行的条件')"></text>
				</view>
			</view>
			<view class="item-view flex" v-show="TaskType==2">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">触发价格:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text
						class="color-orange font-15  ">{{TaskData.TriggerPriceMin}}-{{TaskData.TriggerPriceMax}}</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('设置价格区间为条件时，在该价格区间内才会被触发建仓')"></text>
				</view>
			</view>
			<view class="item-view flex" v-show="TaskType==2">
				<view class="item-view-title-view">
					<text class=" title color-dark font-13 ">网格个数:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">{{TaskData.GridsNum}}</text>
					<text class="wen iconfont iconwenhao"
						@click="showTextClick('按照网格个数均分网格区间价格，按价格区间值进行分批建仓。')">
					</text>
				</view>
			</view>
			<view class="item-view flex">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">状态:</text>
				</view>
				<view class="item-view-param-view">
					<view class=""></view>
					<text class="color-light font-15  ">启用</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('机器人状态，默认为开启。')"></text>
				</view>
			</view>
			<view class="item-view flex " style="margin-bottom: 20rpx;">
				<view class="item-view-title-view">
					<text class="title color-dark font-13 ">机器人名字:</text>
				</view>
				<view class="item-view-param-view item-view-taskname-view"
					:class="{'item-view-active':FocusInput=='editTaskName2'}">
					<view class=""></view>
					<input type="text" class="color-light text-center font-15" v-model="TaskData.TaskName"
						@focus="(e)=>focus1(e,'editTaskName2')" @blur="(e)=>blur1(e,'editTaskName2')"></input>
					<text class="wen iconfont iconwenhao" @click="showTextClick('机器人备注名。')"></text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<uni-popup-tip type="info" :message="Tips"></uni-popup-tip>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'ParamList',
		props: {
			TaskData: {
				type: Object
			},
			TaskType:Number,
			ParamType:Number
		},

		data() {
			return {
				Tips:'',
				FocusInput: '',
			}
		},

		created() {
			 
		},
		computed: {
			//补仓策略的文字描述
			ReplishText() {
				let len = this.TaskData.Replish.length
				if (len == 0) {
					return '无补仓'
				}
			
					// 计算补仓总额
					let count = this.TaskData.Replish.map(item => item.BuyCoin).reduce((a, b) => {
						return Number(a) + Number(b)
					});
					return '补仓' + len + '次,共' + count + 'U'
			
			},
			//推荐参数的类型名字
			ParamTypeName() {
				switch (this.ParamType) {
					case 1:
						return '保守型';
						break;
					case 2:
						return '稳健型';
						break;
					case 3:
						return '激进型';
						break;
					default:
						return '自定义';
				}
			},
		},
		methods: {
			focus1: function(e, v) {
				this.FocusInput = v
			},
			blur1: function(e, v) {
				this.FocusInput = ''
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			//弹窗说明文字
			showTextClick(text) {
				this.Tips = text
				this.$refs.popup.open()
			},
			//queren
			submit() {
				let len = this.TaskData.length
				if (len == 0 || len % 2 == 0) {
					uni.showToast({
						title: '趋势条数必须为奇数',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				let order = ["1min", "5min", "15min", "30min", "60min", "4hour", "1day", "1week"];

				this.TaskData.sort((a, b) => {
					return order.indexOf(a) - order.indexOf(b);
				});

				this.$emit('update', this.TaskData)
				this.popup.close()
			},
			//选择
			checkItem(item) {
				let index = this.TaskData.indexOf(item.Timescale)
				if (index > -1) {
					this.TaskData.splice(index, 1)
				} else {
					this.TaskData.push(item.Timescale)
				}
				//console.log('arr=', this.TaskData)
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "../task.scss";
	.root{
		width: 100%;
		display:flex;
		
	}
	.content-view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 722rpx;
		border-radius: 6rpx;
		margin-top: 20rpx;
		background-color: #1a253a;
		box-sizing: border-box;
		padding: 0 14rpx;
		.line {
				width: 694rpx;;
				border-bottom: 1rpx solid #0b111c;
				border-top: 1rpx solid #1f304a;
		}
		.title-view {
			height: 70rpx;
		}
		.item-view {
			width: 100%;
			height: 53rpx;
			margin-bottom: 24rpx;
		
			&-title-view {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 154rpx;
			}
		
			&-param-view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 540rpx;
				height: 73rpx;
				border-bottom: 1rpx solid #20324a;
			}
			
			&-taskname-view {
				width: 538rpx;
				border: solid 1px #32445d;
			}
			&-active {
				border: solid 1rpx #3efff8;
			}
					
		}
	}
</style>
