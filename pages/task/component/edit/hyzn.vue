<template>
	<view class="root">
		<view class="edit-view edit-view-back">
			<view class="edit-view-left">
				<text class="font-13 color-dark">杠杆倍数：</text>
			</view>
			<view class="edit-view-center text-left color-light font-15">
				<text>{{TaskData.Lever}}X</text>
			</view>
			<view class="edit-view-right flex flex-end">
				<text class="wen iconfont iconwenhao" @click="showTextClick('交易对当前的杠杆倍数，请到对应交易渠道修改该值。')"></text>
			</view>
		</view>

		<view class="flex zn-view">
			<view class="zn-item flex flex-center" :class="{'zn-active':ZnTitleChoose==0}" style="width: 33%;"
				@click="ZnTitleChoose=0">
				<text class="font-17 color-dark zn-item-title">首次建仓</text>
			</view>
			<view class="zn-item flex flex-center" :class="{'zn-active':ZnTitleChoose==1}" style="width: 33%;"
				@click="ZnTitleChoose=1">
				<text class="font-17 color-dark zn-item-title">止盈后建仓</text>
			</view>
			<view class="zn-item flex flex-center" :class="{'zn-active':ZnTitleChoose==2}" style="width: 33%;"
				@click="ZnTitleChoose=2">
				<text class="font-17 color-dark zn-item-title">止损后建仓</text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editWinCoolTime'}" v-show="ZnTitleChoose>0">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">冷却时间：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" type="number" v-show="ZnTitleChoose==1"
				@focus="(e)=>focus1(e,'editWinCoolTime')" @blur="(e)=>blur1(e,'editWinCoolTime')"
				v-model="TaskData.WinCoolTime"></input>
			<input class="edit-view-center text-left color-light font-15" type="number" v-show="ZnTitleChoose==2"
				@focus="(e)=>focus1(e,'editWinCoolTime')" @blur="(e)=>blur1(e,'editWinCoolTime')"
				v-model="TaskData.LossCoolTime"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">秒</text>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick(ZnTitleChoose==1?'止盈后冷却时间':'止损后冷却时间')"></text>
			</view>
		</view>
		<view class="edit-view" style="border: none;" v-show="ZnTitleChoose>0">
			<view class="edit-view-left">
				<text class="font-13 color-dark">开仓参照：</text>
			</view>
			<view class="edit-view-input flex p-r10"
				style="width: 75%;height: 64rpx;background-color: #232f46;border-radius: 4rpx;">
				<view class="text-center" @click="openPicker('WinBuyRefer')" v-show="ZnTitleChoose==1">
					<text class="font-15 color-light p-l30">{{TaskData.WinBuyRefer==1?'上次建仓':'时间趋势'}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<view class="text-center" @click="openPicker('LossBuyRefer')" v-show="ZnTitleChoose==2">
					<text class="font-15 color-light p-l30">{{TaskData.LossBuyRefer==1?'上次建仓':'时间趋势'}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick(ZnTitleChoose==1?'止盈后建仓模式':'止损后建仓模式')"></text>
			</view>
		</view>
		<view class="edit-view" style="border: none;" v-show="showTrendView">
			<view class="edit-view-left">
				<text class="font-13 color-dark">时间趋势：</text>
			</view>
			<view class="edit-view-input edit-view-back flex p-r10" style="width: 75%;height: 64rpx;border-radius: 4rpx;">
				<view class="text-center" @click="openTrend()">
					<text class="font-15 color-light p-l30" v-show="ZnTitleChoose==0">{{FirstBuyTrendStr}}</text>
					<text class="font-15 color-light p-l30" v-show="ZnTitleChoose==1">{{WinBuyTrendStr}}</text>
					<text class="font-15 color-light p-l30" v-show="ZnTitleChoose==2">{{LossBuyTrendStr}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<view class="flex " >
					<text class="iconfont iconqushi color-orange" style="font-size: 18rpx;"></text>
					<text class="font-13  color-orange" @click="openTrend()">趋势选择</text>
					<text class="wen iconfont iconwenhao" @click="showTextClick('由选择时间趋势的涨跌个数作为开仓的参考条件。')"></text>
				</view>
			</view>
		</view>
		<view class="edit-view" style="border: none;">
			<view class="edit-view-left">
				<text class="font-13 color-dark">开仓方向：</text>
			</view>
			<view class="edit-view-input flex p-r10"
				style="width: 75%;height: 64rpx;background-color: #232f46;border-radius: 4rpx;">
				<view class="text-center" @click="openPicker('FirstBuyDirection')" v-show="ZnTitleChoose==0">
					<text class="font-15 color-light p-l30">{{TaskData.FirstBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<view class="text-center" @click="openPicker('WinBuyDirection')" v-show="ZnTitleChoose==1">
					<text class="font-15 color-light p-l30">{{TaskData.WinBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<view class="text-center" @click="openPicker('LossBuyDirection')" v-show="ZnTitleChoose==2">
					<text class="font-15 color-light p-l30">{{TaskData.LossBuyDirection==1?'顺势建仓':'反向建仓'}}</text>
					<text class="iconfont iconsanjiaoxing color-light"></text>
				</view>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick('按参考趋势进行顺势建仓或反向建仓')"></text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editBuyRatio'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark">首单资金比：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editBuyRatio')" @blur="(e)=>blur1(e,'editBuyRatio')"
				v-model="TaskData.BuyRatio"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('首次开仓购买占可用资金的比例。')"></text>
			</view>
		</view>


		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editSellRatio'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">盈利止盈率：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editSellRatio')" @blur="(e)=>blur1(e,'editSellRatio')"
				v-model="TaskData.SellRatio"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick('每轮达到该盈利率后止盈，该值受杠杆倍数影响较大。(例如杠杆20倍，现货价格上涨1%，则合约收益率为20%)')"></text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editSellRatioFd'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">回调止盈率：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editSellRatioFd')" @blur="(e)=>blur1(e,'editSellRatioFd')"
				v-model="TaskData.SellRatioFd"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('收益达到止盈率时，如果价格继续上涨，则等上涨到最高点开始回调该值时止盈。')"></text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editLossRatio'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">亏损止损率：</text>
			</view>

			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editLossRatio')" @blur="(e)=>blur1(e,'editLossRatio')"
				v-model="TaskData.LossRatio"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick('每单达到该亏损率后止损，该值受杠杆倍数影响较大。(例如杠杆20倍，现货价格上涨1%，则合约亏损率为20%)')"></text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editGridsNum'}">
			<view class="edit-view-left" style="width:30%;">
				<text class="font-13 color-dark ">补仓策略：</text>
			</view>
			<text class="font-13 color-orange">{{ReplishText}}</text>
			<view class="flex flex-end p-r10" style="width:30%;">
				<button class="setfd" @click="onReplishClick()">点击设置</button>
				<text class="wen iconfont iconwenhao" @click="showTextClick('补仓设置，按照设定的亏损率进行补仓，从而拉低持仓均价。')">
				</text>
			</view>
		</view>

		<view class="edit-view" style="border:none;width: 696rpx;">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">停止条件：</text>
			</view>
			<view class=" flex small-input" style="width: 208rpx;"
				:class="{'small-input-active':FocusInput=='editStopMinCoin'}">
				<input class="text-center color-orange font-15" type="number" @focus="(e)=>focus1(e,'editStopMinCoin')"
					@blur="(e)=>blur1(e,'editStopMinCoin')" v-model="TaskData.StopMinCoin"></input>
			</view>
			<text class="font-18 color-light">-</text>
			<view class=" flex small-input p-r10" :class="{'small-input-active':FocusInput=='editStopMaxCoin'}">
				<input style="width:70%;" class="text-center color-orange font-15" type="number"
					@focus="(e)=>focus1(e,'editStopMaxCoin')" @blur="(e)=>blur1(e,'editStopMaxCoin')"
					v-model="TaskData.StopMaxCoin"></input>
				<text class="wen iconfont iconwenhao " @click="showTextClick('每次平仓后，若账户资金不在该范围，则机器人停止运行。')"></text>
			</view>
		</view>
		<view class="edit-view" style="border: none;width: 696rpx;">
			<view class="edit-view-left" style="width: 150rpx;">
				<text class="font-13 color-dark ">交易次数：</text>
			</view>
			<view class="flex" style="width: 280rpx;">
				<view class="flex flex-center" @click="changeTriggerNum(-1)">
					<view class="" style="width: 50rpx;">
						<view class="flex flex-center" :class="TaskData.TriggerNum===-1?'circle-choose':'circle'">
							<text v-show="TaskData.TriggerNum===-1" class="iconfont icongou color-light"
								style="font-size: 24rpx;"></text>
						</view>
					</view>
					<text class="font-12 color-dark">循环</text>
				</view>
				<view class="flex flex-start no-wrap" @click="changeTriggerNum(TriggerNumShow)">
					<view class="" style="width: 50rpx;">
						<view class="flex flex-center" :class="TaskData.TriggerNum!==-1?'circle-choose':'circle'">
							<text v-show="TaskData.TriggerNum!==-1" class="iconfont icongou color-light"
								style="font-size: 24rpx;"></text>
						</view>
					</view>
					<text class="font-12 color-dark">自定义</text>
				</view>
			</view>
			<view class="flex small-input p-r10" :class="{'small-input-active':FocusInput=='editTriggerNum'}">
				<input class="font-13 color-light text-center" style="width: 100rpx;" type="number"
					@focus="(e)=>focus1(e,'editTriggerNum')" @blur="(e)=>blur1(e,'editTriggerNum')"
					v-model="TriggerNumShow"></input>
				<text class="font-15 color-dark" style="width: auto;">次</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('无限循环，或达到该交易次数后机器人自动停止运行。')"></text>
			</view>
		</view>

		<view class="edit-view " style="border: none;background-color: #232f46;">
			<view class="edit-view-left" style="width: 35%;">
				<text class="font-13 color-dark ">状态：</text>
			</view>
			<view class="edit-view-center text-center color-light font-15">
				<switch :checked='TaskData.State==1' color="#2aa3b1" style="transform:scale(0.8);"
					@change="onStateSwtChange"></switch>
			</view>
			<view class="edit-view-right flex flex-end" style="width: 30%;">
				<text class="font-15 color-light">{{ TaskData.State == 1 ? '启用' : '暂停' }}</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('机器人状态，默认为开启。')"></text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editTaskName'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">机器人名称：</text>
			</view>
			<view class="edit-view-center text-center color-light font-15">
				<input class="w100p text-center color-light font-15" type="text" @focus="(e)=>focus1(e,'editTaskName')"
					@blur="(e)=>blur1(e,'editTaskName')" v-model="TaskData.TaskName"></input>
			</view>
			<view class="edit-view-right flex flex-end">
				<text class="wen iconfont iconwenhao" @click="showTextClick('机器人备注名。')"></text>
			</view>
		</view>
		<uni-popup ref="trend" type="trend">
			<uni-popup-trend v-on:update="updateTrend" :Echannel="TaskData.Echannel" :TrendArr="TrendArr"
				:Symbol="TaskData.Symbol">
			</uni-popup-trend>
		</uni-popup>
		<uni-popup ref="picker" type="picker">
			<uni-popup-picker v-on:update="updatePickerValue" :PickerItems="PickerItems" :PickerIndex="PickerIndex">
			</uni-popup-picker>
		</uni-popup>
		<uni-popup ref="popup" type="center">
			<uni-popup-tip type="info" :message="Tips"></uni-popup-tip>
		</uni-popup>
	</view>
</template>

<script>
	
	export default {
		name: 'InputTest',
		props: {
			TaskData: {
				type: Object
			}
		},

		data() {
			return {
				TrendArr: [], //打开时间趋势初始值
				FocusInput: '',
				ZnTitleChoose: 0, //智能多空选择的标题 0//首次建仓 1 止盈建仓 2 止损建仓
				PickerItems: ['顺势建仓', '反向建仓'],
				PickerIndex: 0, //pick选择项
				PickerType: 'FirstBuyDirection', //picker类型
				Tips: '',
			}
		},

		created() {

		},
		computed: {
			showTrendView() {

				if (this.ZnTitleChoose == 0) {
					return true
				}
				if (this.ZnTitleChoose == 1 && this.TaskData.WinBuyRefer == 2) {
					return true
				}
				if (this.ZnTitleChoose == 2 && this.TaskData.LossBuyRefer == 2) {
					return true
				}
				return false
			},
			//补仓策略的文字描述
			ReplishText() {
				let len = this.TaskData.Replish.length
				if (len == 0) {
					return '无补仓'
				}
				// 计算补仓总额
				let count = this.TaskData.Replish.map(item => item.BuyRatio).reduce((a, b) => {
					return Number(a) + Number(b)
				});
				return '补仓' + len + '次,共' + count + '%'

			}, //交易次数 显示的数据
			TriggerNumShow: {
				// getter
				get: function() {
					if (this.TaskData.TriggerNum == -1) { //循环则显示默认
						return 100
					} else {
						return this.TaskData.TriggerNum
					}
				},
				// setter
				set: function(newValue) {
					this.TaskData.TriggerNum = newValue
				}
			},
			FirstBuyTrendStr() {
				if (this.TaskData.FirstBuyTrend.length == 0) {
					return '请选择趋势'
				} else {
					return this.TaskData.FirstBuyTrend.reduce((a, b) => {
						return a + '/' + b
					});
				}
			},
			WinBuyTrendStr() {
				if (this.TaskData.WinBuyTrend.length == 0) {
					return '请选择趋势'
				} else {
					return this.TaskData.WinBuyTrend.reduce((a, b) => {
						return a + '/' + b
					});
				}
			},
			LossBuyTrendStr() {
				if (this.TaskData.LossBuyTrend.length == 0) {
					return '请选择趋势'
				} else {
					return this.TaskData.LossBuyTrend.reduce((a, b) => {
						return a + '/' + b
					});
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
			//修改触发条件
			changeTriggerCondition(type) {
				this.TaskData.TriggerCondition = type
			},
			//切换交易次数 按钮
			changeTriggerNum(type) {
				this.TaskData.TriggerNum = type
			},
			//弹窗说明文字
			showTextClick(text) {
				this.Tips = text
				this.$refs.popup.open()
			},
			//设置 补仓
			onReplishClick() {
				//将补仓数据存到缓存 到补仓设置页面获取并展示
				uni.setStorageSync('ReplishData', this.TaskData.Replish)
				uni.navigateTo({
					url: '/pages/task/replish?TaskType=3&Symbol=' + this.TaskData.Symbol
				})
			},
			//打开时间趋势
			openTrend() {
				let arr = ['FirstBuyTrend', 'WinBuyTrend', 'LossBuyTrend']
				let name = arr[this.ZnTitleChoose]
				this.TrendArr = this.TaskData[name].slice()
				// this.TrendArr = this.TaskData.FirstBuyTrend

				console.log('打开趋势', this.TrendArr)
				this.$refs.trend.open()
			},
			//智能合约更改的时间趋势数据
			updateTrend(val) {
				console.log('时间趋势的更改', val)
				let arr = ["FirstBuyTrend", "WinBuyTrend", "LossBuyTrend"]
				let name = arr[this.ZnTitleChoose]
				this.TaskData[name] = val
				console.log(this.TaskData)
			},
			//打开自定义picker
			openPicker(type) {
				this.PickerType = type
				switch (type) {
					case 'FirstBuyDirection':
					case 'WinBuyDirection':
					case 'LossBuyDirection':
						this.PickerIndex = parseInt(this.TaskData[type]) - 1
						this.PickerItems = ['顺势建仓', '反向建仓']
						break;
					case 'WinBuyRefer':
					case 'LossBuyRefer':
						this.PickerIndex = parseInt(this.TaskData[type]) - 1
						this.PickerItems = ['上次建仓', '时间趋势']
						break;
					default:
						console.log(type)
				}
				this.$refs.picker.open()
			},
			
			//更改picker的选择
			updatePickerValue(val) {
					this.TaskData[this.PickerType] = val + 1	 
			},
			//状态按钮切换
			onStateSwtChange: function(e) {
				if (e.detail.value == true) {
					this.TaskData.State = 1
				} else {
					this.TaskData.State = 0
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../task.scss";
	@import "edit.scss";

	.root {
		width: 100%;
		display: flex;
	}
	
	.zn-view {
		width: 100%;
		height: 74rpx;
		background-color: #212d44;
		margin-bottom: 30rpx;
	
		.zn-item {
			height: 74rpx;
			border-bottom: 3rpx solid #212d44;
		}
	
		.zn-active {
			border-bottom: 3rpx solid #12c1bb;
	
			.zn-item-title {
				color: #12c1bb;
			}
		}
	}
	
</style>
