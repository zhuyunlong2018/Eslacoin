<template>
	<view class="root">
		<v-nav-bar :title="EditName" />
		<view class="add-view flex flex-column">
			<view class="content-view flex flex-column">
				<view class="step">
					<view class="title-view">
						<text class="color-light" v-if="EditType=='add'">{{$t('robot.edit.stepOne')+':'}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='add'">{{$t('robot.edit.choose')+$t('robot.edit.tradeChannel')}}</text>
						<text class="color-light"
							v-if="EditType=='edit'">{{$t('robot.edit.choose')+$t('robot.edit.tradeChannel')}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='edit'">{{'('+$t('robot.edit.cannotEdit')+')'}}</text>
					</view>
					<view class="line"></view>
					<view class="inview">
						<text class="color-dark font-13 p-lr14">{{$t('robot.edit.tradeChannel')}}</text>
						<view class="jiaoyidui flex flex-end " @click="chooseEchannel()">
							<image class="logo" :src="'../../static/icon/'+EchannelLogo+'.png'" mode=""></image>
							<text class="font-15 color-light p-l10">{{EchannelName}}</text>
							<text class="iconfont icongengduo color-light"
								style="font-size: 24rpx;margin-top: 2rpx;"></text>
						</view>
					</view>
				</view>
				<view class="step">
					<view class="title-view">
						<text class="color-light" v-if="EditType=='add'">{{$t('robot.edit.stepTwo')+':'}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='add'">{{$t('robot.edit.choose')+$t('robot.edit.playTradeType')}}</text>
						<text class="color-light"
							v-if="EditType=='edit'">{{$t('robot.edit.choose')+$t('robot.edit.playTradeType')}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='edit'">{{'('+$t('robot.edit.cannotEdit')+')'}}</text>
					</view>
					<view class="line"></view>
					<view class="inview">
						<text class="color-dark font-13 p-lr14">{{$t('robot.edit.playType')}}</text>
						<view class="jiaoyidui flex ">
							<view class="flex flex-start  color-light p-l10  text-left" style="width: 60%;"
								@click="openPicker('PlayType')">
								<text class="color-light font-15 p-r10">{{PlayTypeName}} </text>
								<text class="iconfont iconsanjiaoxing color-light"></text>
							</view>
							<view class="flex " @click="getAccountBalance">
								<text class="iconfont iconzhanghuxinxi color-finish" style="font-size: 38rpx;"></text>
								<text class="font-13  color-finish">账户信息</text>
							</view>
						</view>
					</view>
					<view class="inview">
						<text class="color-dark font-13 p-lr14">{{$t('robot.edit.symbol')}}</text>
						<view class="jiaoyidui flex">
							<view style="width: 60%;" @click="onOpenSelSymbolClick()">
								<text class="color-light font-15 p-l10">{{TaskData.Symbol}}</text>
							</view>
							<view class="flex " @click="goToQuotations">
								<text class="iconfont iconshichanghangqing color-orange"
									style="font-size: 38rpx;"></text>
								<text class="color-orange font-13 ">查看价格</text>
							</view>

						</view>
					</view>
					<view class="inview">
						<text class="color-dark font-13 p-lr14">{{$t('robot.edit.tradeType')}}</text>
						<view class="jiaoyidui flex">
							<view style="width: 60%;" class="flex flex-start  color-light p-l10  text-left"
								@click="openPicker('TradeType')">
								<text class="color-light font-15 p-r10">{{TradeTypeName}} </text>
								<text class="iconfont iconsanjiaoxing color-light"></text>
							</view>
							<text class="wen iconfont iconwenhao" @click="showTextClick(TradeTypeHelp)"></text>
						</view>
					</view>
				</view>
				<view class="step flex flex-column">
					<view class="title-view w100p flex flex-start p-l30 ">
						<text class="color-light" v-if="EditType=='add'">{{$t('robot.edit.stepThree')+':'}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='add'">{{$t('robot.edit.setting')+$t('robot.edit.parameters')}}</text>
						<text class="color-light"
							v-if="EditType=='edit'">{{$t('robot.edit.setting')+$t('robot.edit.parameters')}}</text>
						<text class="color-green p-l10"
							v-if="EditType=='edit'">{{'('+$t('robot.edit.canEdit')+')'}}</text>
					</view>
					<view class="line" style="margin-bottom: 20rpx;"></view>
					<view class="choose-param-view flex" v-show="showRecommendCustom">
						<button :class="ParamType!=0?'choosed':'noChoosed'"
							@click="setParamType(1)">{{$t('robot.edit.recommend')+$t('robot.edit.parameters')}}</button>
						<button :class="ParamType==0?'choosed':'noChoosed'"
							@click="setParamType(0)">{{$t('robot.edit.custom')+$t('robot.edit.parameters')}}</button>
					</view>
					<view v-show="ParamType!=0">
						<view class="param-view flex" :class="{'actived': ParamType==1}" @click="setParamType(1)">
							<view class="image-view flex flex-center">
								<image src="../../static/task/jqr_jqrtx_bsx.png" mode=""></image>
							</view>
							<view class="param-content flex flex-column align-start">
								<text class="font-16 color-light p-lr10">{{$t('robot.edit.conservative')}}</text>
								<text class="font-13 color-dark p-lr10">低风险，波动小，追求收益平稳增长</text>
								<view class="">
									<text class="font-13 color-dark p-lr10">参考收益率：</text>
									<text class="font-13 color-orange p-lr10">20%-40%</text>
								</view>

							</view>
							<view class="select" v-show="ParamType==1">已选择·</view>
						</view>
						<view class="param-view flex" :class="{'actived': ParamType==2}" @click="setParamType(2)">
							<view class="image-view flex flex-center">
								<image src="../../static/task/jqr_jqrtx_wjx.png" mode=""></image>
							</view>
							<view class="param-content flex flex-column align-start">
								<text class="font-16 color-light p-lr10">{{$t('robot.edit.robust')}}</text>
								<text class="font-13 color-dark p-lr10">中风险，波动适中，追求收益与风险平衡</text>
								<view class="">
									<text class="font-13 color-dark p-lr10">参考收益率：</text>
									<text class="font-13 color-orange p-lr10">40%-80%</text>
								</view>
							</view>
							<view class="select" v-show="ParamType==2">已选择·</view>
						</view>
						<view class="param-view  flex" :class="{'actived': ParamType==3}" @click="setParamType(3)">
							<view class="image-view flex flex-center">
								<image src="../../static/task/jqr_jqrtx_jjx.png" mode=""></image>
							</view>
							<view class="param-content flex flex-column align-start">
								<text class="font-16 color-light p-lr10">{{$t('robot.edit.radical')}}</text>
								<text class="font-13 color-dark p-lr10">高风险，波动大，追求高收益</text>
								<view class="">
									<text class="font-13 color-dark p-lr10">参考收益率：</text>
									<text class="font-13 color-orange p-lr10">80%-200%</text>
								</view>
							</view>
							<view class="select" v-show="ParamType==3">已选择·</view>
						</view>
					</view>
					<!-- 自定义设置参数 -->
					<view v-show="ParamType==0">
						<EditXhDca :TaskData="TaskData" v-if="TaskType==1"></EditXhDca>
						<EditXhWg :TaskData="TaskData" v-if="TaskType==2"></EditXhWg>
						<EditHyZn :TaskData="TaskData" v-if="TaskType==3"></EditHyZn>
						<EditHyWg :TaskData="TaskData" v-if="TaskType==4"></EditHyWg>
						<EditHyDca :TaskData="TaskData" v-if="TaskType==5"></EditHyDca>
					</view>
				</view>
				<ParamList :TaskData="TaskData" :TaskType="TaskType" :ParamType="ParamType" v-show="ParamType!==0">
				</ParamList>
			</view>
		</view>

		<view class="button-view flex flex-center">
			<button class="createbtn" @click="onCreateTaskClick()" v-if="EditType=='add'">创建机器人</button>
			<button class="updatebtn" @click="onUpdateBtnClick()" v-if="EditType=='edit'">确认修改</button>
			<button class="delbtn" @click="onDeleteBtnClick()" v-if="EditType=='edit'">删除机器人</button>
		</view>

		<uni-popup ref="popup" type="center">
			<uni-popup-tip type="info" :message="Tips"></uni-popup-tip>
		</uni-popup>

		<uni-popup ref="coin" type="coin">
			<uni-popup-coin :Echannel="TaskData.Echannel" :TaskType="TaskType"></uni-popup-coin>
		</uni-popup>
		<uni-popup ref="price" type="price">
			<uni-popup-price :Echannel="TaskData.Echannel" :TaskType="TaskType" :Symbol="TaskData.Symbol">
			</uni-popup-price>
		</uni-popup>
		<uni-popup ref="picker" type="picker">
			<uni-popup-picker v-on:update="updatePickerValue" :PickerItems="PickerItems" :PickerIndex="PickerIndex">
			</uni-popup-picker>
		</uni-popup>

	</view>
</template>

<script>
	const TradeTypeArr1 = ['DCA交易', '网格交易']
	const TradeTypeArr2 = ['智能多空', '网格交易', 'DCA交易']
	const PlayTypeArr = ['现货', 'USDT永续合约']
	const UserId = uni.getStorageSync('UserData').UserId
	const TASK_TYPE_XHDCA = 1
	const InitTaskData = {
		TaskId: '',
		UserId: UserId,
		Echannel: 1, //1火币2币安3比特儿
		TaskName: '机器人1号',
		Symbol: 'BTCUSDT',
		Lever: 1, //杠杆倍数
		BuyDirection: 'buy', // '开仓方向 buy买入开多 sell卖出开空',
		BuyCount: '', //每单购买数量
		BuyCoinFirst: '', //现货DCA交易
		BuyCountFirst: '', //合约DCA首次
		BuyCoinOnce: '', //现货网格
		BuyRatio: '', //建仓资金比例
		SellRatio: '', //止盈率
		SellRatioFd: '', //浮动止盈
		LossRatio: '', //亏损止损率
		TriggerPriceMin: '', //触发最低价
		TriggerPriceMax: '', //触发最高价
		GridsNum: '', //网格个数
		TriggerNum: 100, //触发交易次数 -1表示无限次
		TriggerCondition: 1, //触发条件 1立即买入 2按价格区间
		MaxActiveCount: -1, //同时创建的最大订单量 -1不控制 >0 对应次数
		State: 1, //状态 0暂停 1启用 2已完成 3已删除
		FirstBuyTrend: ['5min'], //首次建仓参考趋势 1min 5min 15min 30min 60min 4hour 1day 1week  组装数据["1min","5min"]
		FirstBuyDirection: 1, //首次建仓模式 1顺势建仓 2反向建仓
		WinCoolTime: 60, //止盈后冷却时间 单位:秒
		WinBuyTrend: ['5min'], //止盈后建仓参考趋势
		WinBuyRefer: 2, //止盈后建仓参考 1上次方向 2时间趋势
		WinBuyDirection: 1, //止盈后建仓模式 1顺势建仓 2反向建仓
		LossCoolTime: 5, //止损后冷却时间 单位:秒
		LossBuyTrend: [], //止损后建仓参考趋势
		LossBuyRefer: 1, //止损后建仓参考 1上次方向 2时间趋势
		LossBuyDirection: 2, //止损后建仓模式 1顺势建仓 2反向建仓
		StopMinCoin: '', //资产低于多少后停止任务
		StopMaxCoin: '', //资产高于多少后停止任务
		Replish: [], //补仓数据 提交的时候转为json字符串
		PricePrecision: 2, //价格精度
	}


	import ParamList from './component/param_list.vue';
	import EditXhDca from './component/edit/xhdca.vue';
	import EditXhWg from './component/edit/xhwg.vue';
	import EditHyZn from './component/edit/hyzn.vue';
	import EditHyWg from './component/edit/hywg.vue';
	import EditHyDca from './component/edit/hydca.vue';
	export default {
		name: 'Edit',
		components: {
			ParamList,
			EditXhDca,
			EditXhWg,
			EditHyZn,
			EditHyWg,
			EditHyDca
		},

		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {

			return {
				ParamType: 1, //1保守  2稳健  3激进  0自定义 
				TaskType: 1, //1现货DCA交易 2现货网格 3 USDT合约智能多空 4USDT合约网格 5USDT DCA交易
				TaskData: InitTaskData,
				PickerItems: PlayTypeArr,
				PickerIndex: 0, //pick选择项
				PickerType: 'playType', //picker类型
				Tips: '',
				EditType: 'add', //编辑是edit
				CurPrice: 10000,
			}
		},

		//*******************************************************************
		// 获取交易对设置全局变量
		//*******************************************************************
		onLoad(option) {
			let self = this
			console.log('机器人edit页面打开,注册监听器,接收参数')
			if (option.EditType) {
				self.EditType = option.EditType
				self.ParamType = 0 //设置为自定义参数
			}
			if (option.TaskType) {
				console.log('编辑界面收到玩法类型', option.TaskType)
				self.TaskType = parseInt(option.TaskType)
			}

			//如果是编辑界面则从缓存中获取数据
			let tempTaskData = uni.getStorageSync('EditTaskData')
			console.log('edit onload 获取缓存的编辑数据', tempTaskData)
			if (tempTaskData) {
				let jsonStr = ['Replish', 'FirstBuyTrend', 'LossBuyTrend', 'WinBuyTrend'];
				for (let key in tempTaskData) {
					if (jsonStr.includes(key)) {
						if (tempTaskData[key]) {
							self.TaskData[key] = JSON.parse(tempTaskData[key])
						} else {
							self.TaskData[key] = []
						}
					} else {
						self.TaskData[key] = tempTaskData[key]
					}
				}
			}

			//监听选择的交易对
			uni.$on('Sympol', function(data) {
				console.log('监听到事件来自 Sympol ，携带参数为：' + data.Symbol);
				self.TaskData.Symbol = data.Symbol
				self.TaskData.PricePrecision = data.PricePrecision //价格精度
				if (self.TaskType > 2) { //合约
					self.sendQueryHUSymbolLever()
					self.TaskData.BuyCount = data.MinOrderValue //设置最小购买量
				}

				//合约网格查询当前币种的价格
				if (self.TaskType == 4 || self.TaskType == 2) {
					self.sendQueryEchannelSymbolPrice()
				}
			})
			//监听选择玩耍的渠道
			uni.$on('Echannel', function(data) {
				console.log('监听到事件来自 Echannel ，携带参数为：' + data.Echannel);
				self.TaskData.Echannel = data.Echannel
				if (self.TaskType > 2) {
					self.sendQueryHUSymbolLever()
				}
				//网格查询当前币种的价格
				if (self.TaskType == 4 || self.TaskType == 2) {
					self.sendQueryEchannelSymbolPrice()
				}
			})

			//监听补仓策略渠道
			uni.$on('ReplishData', function(data) {
				console.log('监听到事件来自 Replish ，携带参数为：', data);
				self.TaskData.Replish = data
			})

			//如果是新增界面 判断是否绑定默认了 币平台
			if (self.EditType == 'add') {
				self.$store.dispatch('GET_API').then(res => {
					if (res) {
						//获取账户资产
						self.TaskData.Echannel = res
						console.log('绑定并默认的渠道是', res)
					}
				})
				self.TaskData.TaskName = '机器人1号'
				self.TaskData.Symbol = 'BTCUSDT'
				//首次进入设置默认参数 现货DCA
				self.setDefaultParam(1, 1)

			}
		},

		//*******************************************************************
		// 页面销毁,移除监听
		//*******************************************************************
		onUnload() {
			uni.$off(['Sympol', 'Echannel', 'ReplishData'])
			uni.removeStorageSync('EditTaskData')
			uni.removeStorageSync('ReplishData')
			console.log('页面销毁,移除监听,移除缓存')
		},
		//*******************************************************************
		// 计算属性
		//*******************************************************************
		computed: {
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
			//标记显示选择框
			showRecommendCustom() {
				//新增并且是现货的时候才显示推荐自定义切换
				if (this.EditType == 'add' && (this.TaskType == 1 || this.TaskType == 2)) {
					return true
				} else {
					return false
				}
			},
			PlayTypeName() {
				switch (this.TaskType) {
					case 1:
					case 2:
						return '现货';
						break;
					case 3:
					case 4:
					case 5:
						return 'USDT永续合约';
						break;
					default:
						return '';
				}
			},
			TradeTypeName() {
				switch (this.TaskType) {
					case 1:
					case 5:
						return 'DCA交易';
						break;
					case 2:
					case 4:
						return '网格交易';
						break;
					case 3:
						return '智能多空';
						break;
					default:
						return '';
				}
			},

			//页面标题
			EditName() {
				return this.EditType == 'edit' ? '修改机器人' : '创建机器人'
			},

			//平台名字
			EchannelName() {
				switch (this.TaskData.Echannel) {
					case 1:
						return '火币';
					case 2:
						return '币安';
					case 3:
						return '比特儿';
					default:
						return '错误'
				}
			},
			EchannelLogo() {
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

			//玩法选择
			PlayTypeIndex: {
				// getter
				get: function() {
					console.log('玩法类型get')
					switch (this.TaskType) {
						case 3:
						case 4:
						case 5:
							return 1;
							break;
						default:
							return 0;
					}
				},
				// setter
				set: function(newValue) {
					console.log('玩法类型', newValue)
					if (newValue == 1) {
						this.TaskType = 4
						this.ParamType = 0
						this.TaskData.Symbol = 'BTC'
						this.TradeTypeArr = TradeTypeArr2
						this.sendQueryHUSymbolLever()
					} else {
						this.TaskType = 1
						this.TaskData.Symbol = 'BTCUSDT'
						this.TradeTypeArr = TradeTypeArr1
					}
				}
			},
			// //交易类型选择
			TradeTypeIndex: {
				// getter
				get: function() {
					console.log('交易类型')
					switch (this.TaskType) {
						case 1:
						case 3:
							return 0;
							break;
						case 2:
						case 4:
							return 1;
							break;
						default:
							return 2;
					}
				},
				// setter
				set: function(newValue) {
					console.log('交易类型', newValue)
					if (newValue == 0) { //网格交易
						if (this.PlayTypeIndex == 1) {
							this.TaskType = 3
						} else {
							this.TaskType = 1
						}
					} else if (newValue == 1) {
						if (this.PlayTypeIndex == 1) {
							this.TaskType = 4
						} else {
							this.TaskType = 2
						}
					} else {
						this.TaskType = 5
					}
				}
			},


			//交易类型帮助文字
			TradeTypeHelp() {
				switch (this.TaskType) {
					case 1:
						return 'DCA交易：按市场价实时建仓，下跌后持续补仓拉低持仓成本，达到止盈率后所有仓位一起止盈。';
						break;
					case 2:
						return '网格交易：按照设置的价格区间分批次建仓，每单达到盈利率后马上止盈。';
						break;
					case 3:
						return '智能多空：根据时间趋势或上次开仓结果，自动进行下一轮开仓方向选择进行建仓。'
						break;
					case 4:
						return '网格交易：按照设置的价格区间分批次建仓，每单达到盈利率后马上止盈。'
						break;
					case 5:
						return 'DCA交易：按市场价实时建仓，下跌后持续补仓拉低持仓成本，达到止盈率后所有仓位一起止盈。'
						break;
					default:
						return '';
				}
			},
		},
		//*******************************************************************
		// 侦听器
		//*******************************************************************
		watch: {
			//侦听机器人类型的变化
			TaskType: function(val, oldVal) {
				if (this.EditType == 'edit') {
					return
				}
				console.log('侦听到任务类型变化')
				//查询交易对实时价格
				if (val == 4 || val == 2) {
					this.sendQueryEchannelSymbolPrice()
				} else {
					this.setDefaultParam(val, this.ParamType)
				}
			},
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//设置默认参数 现货能设置 合约设置为空
			setDefaultParam(TaskType, ParamType) {
				if (this.EditType == 'edit') {
					return;
				}
				//如果是现货自定义 默认保守型 
				if (ParamType == 0) {
					ParamType = 1
				}
				console.log('设置推荐参数')
				let self = this
				//切换推荐的参数
				let tempData = self.CsData.TaskDefaultData[TaskType - 1][ParamType - 1]
				Object.keys(tempData).forEach(function(key) {
					//合约网格的 每单间隔价和 触发价格
					switch (key) {
						case 'TriggerPriceMinRatio':
							self.TaskData.TriggerPriceMin = (self.CurPrice * (1 - tempData[key])).toFixed(self
								.TaskData.PricePrecision);
							break;
						case 'TriggerPriceMaxRatio':
							self.TaskData.TriggerPriceMax = (self.CurPrice * (1 + tempData[key])).toFixed(self
								.TaskData.PricePrecision);
							break;
						default:
							self.TaskData[key] = tempData[key]
					}
				})
			},

			//获取币种合约的倍数
			sendQueryHUSymbolLever() {
				let url = this.ApiConfig.User + '/BSGetHUSymbolLeverReq'
				this.CsHttp.post(url, {
					UserId: UserId,
					Echannel: this.TaskData.Echannel,
					Symbol: this.TaskData.Symbol
				}).then(res => {
					if (res.Code == 0) {
						this.TaskData.Lever = parseInt(res.Lever);
						console.log('获取到杠杆倍数', this.TaskData.Lever)
					}
				}).catch(err => {
					console.log(err)
				});
			},
			//获取渠道交易对实时价格
			sendQueryEchannelSymbolPrice() {
				let url = this.ApiConfig.DataUrl + '/BSGetEchannelSymbolPriceReq'
				let Symbol = this.TaskData.Symbol
				if (this.TaskType == 4) {
					Symbol = Symbol.replace("USDT", "")
				}
				let data = {
					Echannel: this.TaskData.Echannel,
					PlayType: this.PlayTypeIndex + 1,
					Symbol: Symbol
				}
				this.CsHttp.post(url, data).then(res => {
					console.log(res)
					if (res.Code == 0) {
						this.CurPrice = parseFloat(res.Price);
						console.log('获取到', this.TaskData.Symbol, '最新价格', this.CurPrice)
						//切换推荐的参数
						this.setDefaultParam(this.TaskType, this.ParamType)

					}
				}).catch(err => {
					console.log(err)
				});
			},
			//设置0保守型1稳健型2激进型 
			setParamType(type) {
				this.ParamType = type
				this.setDefaultParam(this.TaskType, type)
			},

			//打开账户信息的弹窗
			getAccountBalance() {
				this.$refs.coin.open()
			},
			//弹窗说明文字
			showTextClick(text) {
				this.Tips = text
				this.$refs.popup.open()
			},
			//查看价格
			goToQuotations() {
				this.$refs.price.open()
			},


			//打开选择币种弹窗
			onOpenSelSymbolClick() {
				if (this.EditType == 'edit') {
					return;
				}
				uni.navigateTo({
					url: '/pages/task/selsymbol?Echannel=' + this.TaskData.Echannel + '&TaskType=' + this.TaskType
				})
			},

			//选择平台
			chooseEchannel() {
				if (this.EditType == 'edit') {
					return;
				}
				uni.navigateTo({
					url: '/pages/task/echannel'
				})
			},

			//打开自定义picker
			openPicker(type) {
				this.PickerType = type
				switch (type) {
					case 'PlayType':
						if (this.EditType == 'edit') {
							return
						}
						this.PickerItems = PlayTypeArr
						this.PickerIndex = this.PlayTypeIndex
						break;
					case 'TradeType':
						if (this.EditType == 'edit') {
							return
						}
						if (this.TaskType < 3) {
							this.PickerItems = TradeTypeArr1
						} else {
							this.PickerItems = TradeTypeArr2
						}
						this.PickerIndex = this.TradeTypeIndex
						break;
					default:
						console.log(type)
				}
				this.$refs.picker.open()
			},

			//更改picker的选择
			updatePickerValue(val) {
				switch (this.PickerType) {
					case 'PlayType':
						this.PlayTypeIndex = val
						break;
					case 'TradeType':
						this.TradeTypeIndex = val
						break;
					default:
						console.log(val)
				}
			},

			//更新任务按钮点击
			onUpdateBtnClick() {
				let PostData = {
					TaskId: this.TaskData.TaskId,
					TaskName: this.TaskData.TaskName,
					State: parseInt(this.TaskData.State),
				}
				let self = this
				PostData = self.checkParam(PostData)
				if (PostData === false) {
					return;
				}
				uni.showModal({
					title: '修改',
					content: '已确认参数并立即修改机器人?',
					success: function(res) {
						if (res.confirm) {
							self.sendUpdateTask(PostData)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			//修改机器人
			sendUpdateTask(PostData) {
				let Domain = this.CsData.TaskTypeUrl[this.TaskType]
				console.log('更新携带数据', Domain, PostData);

				let url = this.ApiConfig[Domain] + '/BSUpdateTaskReq'
				this.CsHttp.post(url, PostData).then(ackMsg => {
					console.log('收到更新机器人的回复:' + JSON.stringify(ackMsg))
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					setTimeout(function() {
						uni.navigateBack()
					}, 2000);
				})
			},

			//创建任务按钮点击
			onCreateTaskClick() {
				let PostData = {
					UserId: parseInt(this.TaskData.UserId),
					Echannel: parseInt(this.TaskData.Echannel),
					Symbol: this.TaskData.Symbol,
					TaskName: this.TaskData.TaskName,
					State: parseInt(this.TaskData.State),
				}
				let self = this
				PostData = self.checkParam(PostData)
				if (PostData === false) {
					return;
				}
				uni.showModal({
					title: '创建',
					content: '已确认参数并立即创建机器人?',
					success: function(res) {
						if (res.confirm) {
							self.sendCreateTask(PostData)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//创建任务
			sendCreateTask(PostData) {
				//根据taskType 来
				let Domain = this.CsData.TaskTypeUrl[this.TaskType]
				console.log('创建机器人提交参数', Domain, PostData);
				// return;
				let url = this.ApiConfig[Domain] + '/BSCreateTaskReq'
				this.CsHttp.post(url, PostData).then(ackMsg => {
					console.log('收到创建新任务的回复:' + JSON.stringify(ackMsg))
					if (ackMsg.Code == 0) {
						uni.showToast({
							title: '创建成功',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/task/index'
							})
						}, 2000);
					} else {
						uni.showModal({
							content: ackMsg.Msg,
							showCancel: false,
						})
					}
				})
			},

			//检查并筛选提交的参数
			checkParam(PostData) {
				if (this.TaskData.TaskName.length > 8) {
					uni.showToast({
						title: '机器人名字太长',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.TaskType == 2 || this.TaskType == 4) {
					if (parseFloat(this.TaskData.TriggerPriceMax) - parseFloat(this.TaskData.TriggerPriceMin) <= 0) {
						uni.showToast({
							title: '触发价格错误',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
					if (this.TaskData.GridsNum > 50) {
						uni.showToast({
							title: '不能超过50个网格',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
					if (!this.TaskData.MaxActiveCount) {
						uni.showToast({
							title: '最大挂单数错误',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
					if (this.TaskData.MaxActiveCount > this.TaskData.GridsNum) {
						uni.showToast({
							title: '最大挂单数不能超过网格数' + this.TaskData.GridsNum,
							icon: 'none',
							duration: 2000
						});
						return false;
					}
				}
				let self = this;
				let TaskParamType = this.CsData.TaskParam[this.TaskType - 1];
				let check = TaskParamType.every(function(item, index, array) {
					let data = self.TaskData[item.name];

					//console.log('参数', data, 'item=', item, array);
					if (item.type == 'int') {
						data = parseInt(data)
						PostData[item.name] = data
						return !isNaN(data)
					} else if (item.type == 'float') {
						data = parseFloat(data)
						PostData[item.name] = data
						return !isNaN(data)
					} else if (item.type == 'json') { //补仓策略
						if (data.length !== 0) {
							PostData[item.name] = JSON.stringify(data)
						} else {
							PostData[item.name] = ''
						}
						return true
					} else {
						PostData[item.name] = data
						return data !== "";
					}
				})
				if (check === false) {
					uni.showToast({
						title: '请检查参数',
						icon: 'none',
						duration: 2000
					});
					return false;
				};
				return PostData
			},


			sendBSDeleteTaskReq() {
				let BSDeleteTaskReq = {
					TaskId: this.TaskData.TaskId,
				}
				let Domain = this.CsData.TaskTypeUrl[this.TaskType - 1]
				this.CsHttp.post('/BSDeleteTaskReq', BSDeleteTaskReq, false, Domain).then(ackMsg => {
					console.log('收到删除任务的回复:' + JSON.stringify(ackMsg))
					uni.showModal({
						content: '删除成功',
						showCancel: false,
						success(item) {
							uni.navigateBack({
								delta: 2
							});
						}
					})
				})
			},
			// 删除任务
			onDeleteBtnClick() {
				let self = this
				uni.showModal({
					title: '删除',
					content: '删除机器人不可恢复，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							self.sendBSDeleteTaskReq()
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	@import "task.scss";

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.line {
		width: 694rpx;
		margin-left: 14rpx;
		border-bottom: 1rpx solid #0b111c;
		border-top: 1rpx solid #1f304a;
	}

	.button-view {
		width: 100%;
		height: 160rpx;

		button {
			width: 220rpx;
			height: 80rpx;
			border-radius: 12rpx;
			font-size: 36rpx;
			line-height: 98rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}

		.updatebtn {
			width: 300rpx;
			height: 98rpx;
			background-color: #2aa3b1;
		}

		.createbtn {
			width: 580rpx;
			height: 98rpx;
			background-color: #2aa3b1;

		}

		.delbtn {
			width: 300rpx;
			height: 98rpx;
			background-color: #d14b64;
		}
	}

	.add-view {
		width: calc(100% - 28rpx);
		box-sizing: border-box;
		margin-top: 14rpx;
		border-radius: 12rpx;

		.content-view {
			width: 722rpx;

			.step {
				width: 100%;
				border-radius: 6rpx;
				margin-top: 20rpx;
				background-color: #1a253a;

				.title-view {
					height: 70rpx;
					margin: 0 20rpx 0 20rpx;

					text {
						font-size: 32rpx;
						line-height: 70rpx;
						letter-spacing: 0rpx;
					}
				}

				.choose-param-view {
					width: 694rpx;
					height: 90rpx;
					background-color: #2a3751;
					margin-bottom: 24rpx;
					border-radius: 8rpx;

					button {
						width: 328rpx;
						height: 70rpx;
						box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(67, 88, 143, 0.33);
						border-radius: 8rpx;
						font-size: 28rpx;
						line-height: 70rpx;
						letter-spacing: 0rpx;

						&::after {
							border: none;
						}

					}

					.choosed {
						background-color: #2aa3b1;
						color: #eeffff;
					}

					.noChoosed {
						background-color: #3c4a6a;
						color: #889eb9;
					}
				}

				.inview {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 100rpx;

					.logo {
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}

					.jiaoyidui {
						width: 553rpx;
						height: 64rpx;
						background-color: #232f46;
						padding: 0 10rpx;
						box-sizing: border-box;
						border-radius: 4rpx;
						margin-right: 14rpx;
					}
				}



				.param-view {
					margin-left: 14rpx;
					margin-top: 14rpx;
					width: 694rpx;
					height: 130rpx;
					background-color: #26354a;
					border-radius: 4rpx;
					border: solid 2rpx #26354a;

					.image-view {
						width: 130rpx;
						height: 130rpx;

						image {
							width: 98rpx;
							height: 98rpx;
						}
					}

					.param-content {
						width: 564rpx;
					}
				}

				.actived {
					background-color: #253c4d;
					border: 2rpx solid #12c1bb;
					position: relative;

					.select {
						position: absolute;
						right: 0;
						top: 0;
						height: 30rpx;
						line-height: 30rpx;
						padding-left: 10rpx;
						background-color: $uni-color-primary;
						border-radius: 0 4rpx 0 12rpx;
						font-size: 22rpx;
						padding-right: 10rpx;
						color: #ffffff;
					}
				}
			}

			.border-no {
				border-bottom: 0rpx solid #cbd1de;
			}
		}
	}
</style>
