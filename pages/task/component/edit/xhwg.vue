<template>
	<view class="root">
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editBuyCoinOnce'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark">每单购买额：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" @focus="(e)=>focus1(e,'editBuyCoinOnce')"
				@blur="(e)=>blur1(e,'editBuyCoinOnce')" type="number" v-model="TaskData.BuyCoinOnce"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">USDT</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('每次开单购买总金额。')"></text>
			</view>
		</view>

		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editSellRatio'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">每单止盈率：</text>
			</view>
			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editSellRatio')" @blur="(e)=>blur1(e,'editSellRatio')"
				v-model="TaskData.SellRatio"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('每单达到该盈利率后止盈。')"></text>
			</view>
		</view>

		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editLossRatio'}">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">每单止损率：</text>
			</view>

			<input class="edit-view-center text-left color-light font-15" type="number"
				@focus="(e)=>focus1(e,'editLossRatio')" @blur="(e)=>blur1(e,'editLossRatio')"
				v-model="TaskData.LossRatio"></input>
			<view class="edit-view-right flex flex-end">
				<text class="font-13 color-dark">%</text>
				<text class="wen iconfont iconwenhao" @click="showTextClick('每单达到该亏损率后止损。')"></text>
			</view>
		</view>

		<view class="edit-view" style="border:none;width: 696rpx;">
			<view class="edit-view-left">
				<text class="font-13 color-dark ">网格价格：</text>
			</view>
			<view class=" flex small-input" style="width: 208rpx;"
				:class="{'small-input-active':FocusInput=='editTriggerPriceMin'}">
				<input class="text-center color-orange font-15" type="number"
					@focus="(e)=>focus1(e,'editTriggerPriceMin')" @blur="(e)=>blur1(e,'editTriggerPriceMin')"
					v-model="TaskData.TriggerPriceMin"></input>
			</view>
			<text class="font-18 color-light">-</text>
			<view class=" flex small-input p-r10" :class="{'small-input-active':FocusInput=='editTriggerPriceMax'}">
				<input style="width:70%;" class="text-center color-orange font-15" type="number"
					@focus="(e)=>focus1(e,'editTriggerPriceMax')" @blur="(e)=>blur1(e,'editTriggerPriceMax')"
					v-model="TaskData.TriggerPriceMax"></input>
				<text class="wen iconfont iconwenhao " @click="showTextClick('网格建仓的价格区间，交易对价格在该区间内才会被触发执行。')"></text>
			</view>
		</view>

		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editGridsNum'}">
			<view class="edit-view-left" style="width:40%;">
				<text class="font-13 color-dark ">网格个数：</text>
			</view>

			<input class="text-center color-light font-15" type="number" @focus="(e)=>focus1(e,'editGridsNum')"
				@blur="(e)=>blur1(e,'editGridsNum')" v-model="TaskData.GridsNum"></input>
			<view class="flex flex-end p-r10" style="width:40%;">
				<button class="setfd" @click="onBgfxClick()">表格分析</button>
				<text class="wen iconfont iconwenhao"
					@click="showTextClick('按照网格个数均分网格区间价格，按价格区间值进行分批建仓。')">
				</text>
			</view>
		</view>
		<view class="edit-view" :class="{'edit-view-active':FocusInput=='editMaxActiveCount'}">
			<view class="edit-view-left" style="width: 35%;">
				<text class="font-13 color-dark ">最大同时挂单：</text>
			</view>
			<view class="edit-view-center text-center color-light font-15">
				<switch :checked='TaskData.MaxActiveCount!==-1' color="#2aa3b1" style="transform:scale(0.8);"
					@change="changeMaxActiveCount"></switch>
			</view>
		
			<view class="flex flex-end text-right p-r10" style="width: 30%;">
				<input class=" font-13 color-light text-center" :disabled="TaskData.MaxActiveCount==-1"
					style="width: 50%;" type="number" @focus="(e)=>focus1(e,'editMaxActiveCount')"
					@blur="(e)=>blur1(e,'editMaxActiveCount')" v-model="MaxActiveCountShow"></input>
				<!-- <text class="font-15 color-light" v-show="TaskData.MaxActiveCount==-1">不控制</text> -->
				<text class="wen iconfont iconwenhao"
					@click="showTextClick('最大同时挂单的数量，可限制同时最大持仓量。')">
				</text>
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

		<uni-popup ref="gdfx" type="gdfx">
			<uni-popup-gdfx :GdFxParam="GdFxParam"></uni-popup-gdfx>
		</uni-popup>
		<uni-popup ref="popup" type="center">
			<uni-popup-tip type="info" :message="Tips"></uni-popup-tip>
		</uni-popup>
			

	</view>
</template>

<script>
	// import Wen from '../wen.vue';
	export default {
		components: {
			//Wen
		},
		name: 'InputTest',
		props: {
			TaskData: {
				type: Object
			}
		},

		data() {
			return {
				FocusInput: '',
				GdFxParam: {
					TaskType: 2,
					PricePrecision: 2, //价格精度
					TriggerPriceMin: 0, //触发最低价 合约网格
					TriggerPriceMax: 0, //触发最高价 合约网格
					GridsNum: 20, //网格个数
					BuyDirection: 'buy',
					Count: 1,
				},
				Tips: '',
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
			//合约网格最大单数显示
			MaxActiveCountShow: {
				// getter
				get: function() {
					if (this.TaskData.MaxActiveCount == -1) {
						if (this.TaskData.GridsNum) {
							return parseInt(this.TaskData.GridsNum)
						} else {
							return ''
						}

					} else {
						return this.TaskData.MaxActiveCount
					}
				},
				// setter
				set: function(newValue) {
					if (newValue) {
						this.TaskData.MaxActiveCount = parseInt(newValue)

					}
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
			//最大同时挂单
			changeMaxActiveCount: function(e) {
				if (e.detail.value == true) {
					this.TaskData.MaxActiveCount = this.TaskData.GridsNum
				} else {
					this.TaskData.MaxActiveCount = -1
				}
			},
			//网格交易的表格分析
			onBgfxClick() {
				this.GdFxParam = {
					TaskType: parseInt(this.TaskType),
					TriggerPriceMin: parseFloat(this.TaskData.TriggerPriceMin), //触发最低价 合约网格
					TriggerPriceMax: parseFloat(this.TaskData.TriggerPriceMax), //触发最高价 合约网格
					GridsNum: parseInt(this.TaskData.GridsNum), //每单间隔价格
					PricePrecision: parseInt(this.TaskData.PricePrecision) //精度小数点几位
				}

				this.GdFxParam.Count = parseFloat(this.TaskData.BuyCoinOnce)
				this.$refs.gdfx.open()
			},
			//状态按钮切换
			onStateSwtChange: function(e) {
				if (e.detail.value == true) {
					this.TaskData.State = 1
				} else {
					this.TaskData.State = 0
				}
			},
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
</style>
