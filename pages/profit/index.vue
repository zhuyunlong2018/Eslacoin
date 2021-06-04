<!-- 收益页 -->
<template>
	<view class="root">
		<uni-status-bar backgroundColor='#000E18' :fixed='true' />
		<!-- 账户资产信息 -->
		<swiper class="swiper">
		    <swiper-item v-for="(item, index) in apiList" :key="'profit_' + index">
		        <view class="account-info">
					<view class="flex">
						<view class="label">
							<text>
								{{ $t('profit.home.assets')[0] }}
							</text>
							<text class="iconfont eye iconyanjing up-pre"
								v-if="item.Code != 5"
								@click="isShowMoney=false"
								v-show="isShowMoney"
								style="font-size: 16rpx;top: -4rpx;"></text>
							<text class="iconfont eye iconyanjingguan"
								v-if="item.Code != 5"
								@click="isShowMoney=true"
								v-show="!isShowMoney"
								></text>
						</view>
						<view class="flex flex-start" v-if="item.Echannel == 1">
							<view v-if="item.Code == 5" class="flex flex-start invalid-api">
								<text class="iconfont icon icontishi"></text>
								<text class="name font-13">API已失效</text>
							</view>
							<image class="img" src="../../static/icon/qh_hb_logo.png" mode=""></image>
							<text class="name font-16">HuoBi</text>
						</view>
						<view class="flex flex-start" v-else-if="item.Echannel == 2">
							<view v-if="item.Code == 5" class="flex flex-start invalid-api">
								<text class="iconfont icon icontishi"></text>
								<text class="name font-13">API已失效</text>
							</view>
							<image class="img" src="../../static/icon/qh_ba_logo.png" mode=""></image>
							<text class="name font-16">Binance</text>
						</view>
						<view class="flex flex-start" v-else-if="item.Echannel == 3">
							<view v-if="item.Code == 5" class="flex flex-start invalid-api">
								<text class="iconfont icon icontishi"></text>
								<text class="name font-13">API已失效</text>
							</view>
							<image class="img" src="../../static/icon/qh_bte_logo.png" mode=""></image>
							<text class="name font-16">Biter</text>
						</view>
						<view class="flex flex-start" v-else-if="!Echannel">
							<image class="img" src="../../static/icon/wd_zy_wbd.png" mode=""></image>
							<text class="name font-13">{{ $t('profit.home.noApi') }}</text>
						</view>
					</view>
		        	<view class="flex p-t10 p-b10">
		        		<view>
		        			<view class="p-t20" v-show="isShowMoney && item.Code != 5">
		        				<text class="number font-27 bold">{{ item.TotalUsdt }}</text>
		        				<text class="unit p-l10">/USDT</text>
		        			</view>
							<view v-show="!isShowMoney || item.Code == 5" class="p-t20">
								<text class="number bold font-27 up-pre t-10">********</text>
								<text class="unit p-l10 p-t10">/USDT</text>
							</view>
		        		</view>
						<view class="p-t20">
							<text  @click="openPage" class="iconfont add-api icontianjia"></text>
						</view>
		        	</view>
		        	<view class="flex p-t20">
		        		<view>
		        			<view class="label p-b10">{{ $t('profit.home.assets')[1] }}</view>
		        			<view v-show="isShowMoney && item.Code != 5">
		        				<text class="reduce bold yellow font-18">{{ item.XhUsdt }}</text>
		        				<text class="unit">/USDT</text>
		        			</view>
							<view v-show="!isShowMoney || item.Code == 5" class="">
								<text class="reduce bold yellow up-pre t-5 font-18">********</text>
								<text class="unit p-l10">/USDT</text>
							</view>
		        		</view>
		        		<view class="">
		        			<view class="label text-right p-b10">{{ $t('profit.home.assets')[2] }}</view>
		        			<view v-show="isShowMoney && item.Code != 5" class="text-right">
		        				<text class="reduce bold yellow font-18">{{ item.HyUsdt }}</text>
		        				<text class="unit">/USDT</text>
		        			</view>
							<view v-show="!isShowMoney || item.Code == 5" class="text-right">
								<text class="reduce yellow bold up-pre t-5 font-18">********</text>
								<text class="unit p-l10">/USDT</text>
							</view>
		        		</view>
		        	</view>
		        </view>
		    </swiper-item>
			<swiper-item v-if="apiList.length == 0">
				<view class="account-info flex flex-center no-api">
					<view class="no-api-item" @click="openPage">
						<text class="iconfont icontianjia"></text>
						<text class="font-16 p-l10">{{ $t('profit.home.bindApi') }}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		
		<view class="content">
			<!-- 收益统计 -->
			<view class="profit-statistic profit">
				<view class="title-col flex">
					<text class="font-16">{{ $t('profit.home.statistics')[0] }}</text>
				</view>
				<view class="brokerage-col flex btn-t-2">
					<view class="today-item w40p">
						<view class="">
							<text class="dot red"></text>
							<text class="label">{{ $t('profit.home.statistics')[1] }}</text>
							<text class="unit font-11">/USDT</text>
						</view>
						<view class="p-t10">
							<text class="number bold">{{ coinRiseInfo.TotalProfit.toFixed(2) }}</text>
						</view>
						<view class="p-t10">
							<text class="bold font-14">{{ coinRiseInfo.TotalOrderCount }}</text>
							<text class="unit font-12">/{{ $t('profit.home.statistics')[3] }}</text>
						</view>
					</view>
					<view class="line"></view>
					<view class="count-item w40p">
						<view class="">
							<text class="dot"></text>
							<text class="label">{{ $t('profit.home.statistics')[2] }}</text>
							<text class="unit font-11">/USDT</text>
						</view>
						<view class="p-t10">
							<text class="number bold">{{ coinRiseInfo.TodayProfit.toFixed(2) }}</text>
						</view>
						<view class="p-t10">
							<text class="bold font-14">{{ coinRiseInfo.TodayOrderCount }}</text>
							<text class="unit font-12">/{{ $t('profit.home.statistics')[3] }}</text>
						</view>
					</view>
				</view>
				<view class="coin-info btn-t-2">
					<view class="flex info">
						<view class="w30p text-center">
							<view class="label">
								<text class="bold">{{ $t('common.date')[3] }}</text>
								<text class="unit bold">/USDT</text>
							</view>
							<view class="number bold rise p-t16" v-if="coinRiseInfo.YesterdayProfit >= 0">+{{ coinRiseInfo.YesterdayProfit.toFixed(2) }}</view>
							<view class="number bold fall p-t16" v-else>{{ coinRiseInfo.YesterdayProfit.toFixed(2) }}</view>
							<view class="p-t10 flex flex-center" v-if="coinRiseInfo.YesterdayProfitRatio >= 0">
								<text class="up"></text>
								<text class="font-14 rise p-l10">+{{ coinRiseInfo.YesterdayProfitRatio.toFixed(2) }}%</text>
							</view>
							<view class="p-t10 flex flex-center" v-else>
								<text class="down"></text>
								<text class="font-14 fall p-l10">{{ coinRiseInfo.YesterdayProfitRatio.toFixed(2) }}%</text>
							</view>
						</view>
						<view class="w30p text-center">
							<view class="label">
								<text class="bold">{{ $t('common.date')[1] }}</text>
								<text class="unit bold">/USDT</text>
							</view>
							<view class="number bold rise p-t16" v-if="coinRiseInfo.WeekProfit >= 0">+{{ coinRiseInfo.WeekProfit.toFixed(2) }}</view>
							<view class="number bold fall p-t16" v-else>{{ coinRiseInfo.WeekProfit.toFixed(2) }}</view>
							<view class="p-t10 flex flex-center" v-if="coinRiseInfo.WeekProfit >= 0">
								<text class="up"></text>
								<text class="font-14 rise p-l10">+{{ coinRiseInfo.WeekProfitRatio.toFixed(2) }}%</text>
							</view>
							<view class="p-t10 flex flex-center" v-else>
								<text class="down"></text>
								<text class="font-14 fall p-l10">{{ coinRiseInfo.WeekProfitRatio.toFixed(2) }}%</text>
							</view>
						</view>
						<view class="w30p text-center">
							<view class="label">
								<text class="bold">{{ $t('common.date')[2] }}</text>
								<text class="unit bold">/USDT</text>
							</view>
							<view class="number bold rise p-t16" v-if="coinRiseInfo.MonthProfit >= 0">+{{ coinRiseInfo.MonthProfit.toFixed(2) }}</view>
							<view class="number bold fall p-t16" v-else>{{ coinRiseInfo.MonthProfit.toFixed(2) }}</view>
							<view class="p-t10 flex flex-center" v-if="coinRiseInfo.MonthProfit >= 0">
								<text class="up"></text>
								<text class="font-14 rise p-l10">+{{ coinRiseInfo.MonthProfitRatio.toFixed(2) }}%</text>
							</view>
							<view class="p-t10 flex flex-center" v-else>
								<text class="down"></text>
								<text class="font-14 fall p-l10">{{ coinRiseInfo.MonthProfitRatio.toFixed(2) }}%</text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<!-- 收益曲线图 -->
			<view class="profit-statistic m-t14">
				<view class="title-col tab flex">
					<text class="font-16">{{ $t('profit.home.chart')[0] }}</text>
					<view class="radio-group flex">
					</view>
				</view>
				<view class="echarts m-t20 btn-t-2">
					<!-- 行情表 -->
					<mapEcharts 
						echartsType="area"
						:echartsHight='420'
						borderRadius='6'
						backgroundColor='#0D1A2C'
						:echartsData="echartsData" />
				</view>
			</view>
		</view>
		
		<uni-loading :isShowLoading.sync='isShowLoading' :isTabBarHeight='true' :isNavHeight='false' />
	</view>
</template>

<script>
	import mapEcharts from '../../components/mapEccharts/mapEccharts.vue';
	export default {
		components: {
			mapEcharts
		},
		onLoad() {
			this.isShowLoading = true;
		},
		onShow() {
			this.$store.dispatch('CHECK_LOGIN').then(async res => {
				if (res) {
					let res = await this.$store.dispatch('GET_API', true);
					if (res.list.length == 0) {
						this.Echannel = null;
					} else {
						this.list = [];
						this.Echannel = res.Echannel;
						// 循环获取多渠道账户资金
						for(let i = 0; i < res.list.length; i++) {
							await this.getAccountBalances(res.list[i], i == res.list.length -1);
						}
					}
					console.log(res)
					await this.getCoinRiseInfo();
					this.getProfit();
				}
			});
			
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				checkedType: 'day',
				dateList: [
					{
						name: '日',
						type: 'day'
					},
					{
						name: '周',
						type: 'week'
					}
				],
				// 收益曲线图
				echartsData: {
					categories: [],
					series: [{
						data: [],
						color: '#12c1bb',
						name: '收益',
					}]
				},
				// 收益柱状图
				columnEchartsData: {
					categories: [],
					series: [{
						data: [],
						color: '#04ac90',
						name: '收益',
						textSize: 1,
						textColor: '#1d293e'
					}]
				},
				// 收益信息
				coinRiseInfo: {
					YesterdayProfit: 0,
					WeekProfit: 0,
					MonthProfit: 0,
					TodayProfit: 0,
					TotalProfit: 0,
					YesterdayProfitRatio: 0,
					WeekProfitRatio: 0,
					MonthProfitRatio: 0
				},
				// 账户资产信息
				accountBalancesInfo: {
					HyUsdt: '********',
					TotalUsdt: '********',
					XhUsdt: '********'
				},
				Echannel: '',
				// 绑定的 API 列表
				apiList: [],
				list: [],
				timeFn: null,
				// 交易类型
				tradeType: 'xh',
				// 日期选择类型
				dateChangeType: 1, // 1 - 今天； 2 - 昨天； 3 - 近7天； 4 - 累计
				// 是否显示金额
				isShowMoney: true,
				isShowLoading: false
			};
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 切换交易类型
			changeTradeType(val) {
				this.tradeType = val;
				this.dateChangeType = 1;
			},
			// 切换日期
			changeDateType(val) {
				this.dateChangeType = val;
				this.getProfit();
			},
			openPage() {
				uni.navigateTo({
					url: '/pages/apikey/apikey'
				})
			},
			// 获取账户渠道资金
			getAccountBalances(item, tr) {
				return new Promise((reslove) => {
					this.CsHttp.post(this.ApiConfig.User + '/BSGetEchannelAccountBalanceReq', {
						UserId: uni.getStorageSync('UserData').UserId,
						Echannel: item.Echannel
					}).then(res => {
						this.list.push(Object.assign(item, res));
						this.list.sort((pre, next) => { return pre.Echannel - next.Echannel });
						if (tr) {
							//先放默认渠道
							for(let i=0; i<this.list.length; i++){
								if(this.list[i].IsActive == 1){
									var cpItem = Object.assign({}, this.list[i]);
									this.apiList.push(cpItem);
								}
							}
							//再放其他渠道
							for(let i=0; i<this.list.length; i++){
								if(this.list[i].IsActive == 0){
									var cpItem = Object.assign({}, this.list[i]);
									this.apiList.push(cpItem);
								}
							}
						}
						reslove();
					})
				})
				
			},
			// 获取收益统计
			getProfit() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetUserProfitLinesReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Echannel: this.Echannel
				}).then(res => {
					let date = [];
					let data = [];
					let list = [];
					res.UserProfitLineDataList.reverse().forEach((item, index) => {
						date.push(item.Date);
						data.push(item.Profit == 0 ? 0 : Number(item.Profit).toFixed(2));
						list.push({
							value: item.Profit == 0 ? 0 : Number(item.Profit).toFixed(2),
							color: item.Profit >= 0 ? '#04ac90' : '#d14b64'
						})
					})
					// 判断收益统计图的类型
					if (this.dateChangeType == 1) {
						// 今天
						this.columnEchartsData.categories = [...date.slice(date.length - 1, date.length)];
						this.columnEchartsData.series[0].data = [this.coinRiseInfo.TodayProfit == 0 ? this.coinRiseInfo.TodayProfit : this.coinRiseInfo.TodayProfit.toFixed(2)];
					} else if (this.dateChangeType == 2) {
						// 昨天
						this.columnEchartsData.categories = [...date.slice(date.length - 2, date.length - 1)];
						this.columnEchartsData.series[0].data = [...list.slice(list.length - 2, list.length - 1)];
					} else if (this.dateChangeType == 3) {
						// 近7天
						this.columnEchartsData.categories = [...date.slice(date.length - 7, date.length)];
						this.columnEchartsData.series[0].data = [...list.slice(list.length - 7, list.length)];
					} else {
						// 累计
						this.columnEchartsData.categories = [...date];
						this.columnEchartsData.series[0].data = [...list];
					}
					this.echartsData.categories = [...date];
					this.echartsData.series[0].data = [...data];
					this.echartsData.series[0].name = this.$t('profit.home.tip');
					this.$nextTick(() => {
						this.isShowLoading = false;
					})
					console.log(res)
				})
			},
			// 获取币近期涨幅信息
			async getCoinRiseInfo () {
				let res = await this.CsHttp.post(this.ApiConfig.User + '/BSGetUserProfitRecordReq', {
					UserId: uni.getStorageSync('UserData').UserId
				});
				this.coinRiseInfo = res;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #000E18;
	}

	.swiper {
		height: 370rpx;
	}
	.t-10 {
		top: 20rpx;
	}
	.t-5 {
		top: 10rpx;
	}

.account-info {
	margin: 30rpx 6rpx 10rpx;
	padding: 36rpx 40rpx 28rpx;
	height: 320rpx;
	box-sizing: border-box;
	background: url(../../static/user/wd_zy_di.png);
	background-size: cover;
	box-shadow: 0 3px 6px 0 rgba(5, 12, 22, 0.51);
	border-radius: 12rpx;

	.img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}
	.eye {
		font-size: 24rpx;
		margin-left: 20rpx;
	}
	.add-api {
		font-size: 36rpx;
		color: #A0B7D2;
	}
	.name {
		color: $uni-text-color;
		padding-left: 6rpx;
	}
	.label {
		color: $uni-text-color;
		font-size: 26rpx;
	}
	.number {
		color: #ffffff;
	}
	.unit {
		font-size: 24rpx;
		color: $uni-text-color;
	}
	.btn-t-2::after, .btn-t-2::before {
		width: calc(200% - 56rpx);
		left: calc(-50% + 28rpx);
	}
	.add {
		color: #04ac90;
	}
	.reduce {
		color: #d14b64;
	}
	.yellow {
		color: #f59a4b;
	}
}
// 失效 api 样式
.invalid-api {
	background-color: rgba(138, 56, 70, 0.51);
	border-radius: 8rpx;
	height: 42rpx;
	padding: 0 10rpx;
	margin-right: 10rpx;
	.icon {
		color: #FF6197;
		font-size: 22rpx;
	}
	.name {
		color: #FF6197;
	}
}
.no-api {
	background: url(../../static/user/wd_zy_di.png);
	background-size: cover;
	.iconfont {
		color: $uni-text-color;
	}
	.no-api-item {
		color: #ADB3CF;
		
	}
}
.content {
	padding: 10rpx 14rpx 20rpx;
	.title-col {
		height: 80rpx;
		color: $uni-text-color;
		padding-left: 10rpx;
	}
	.brokerage-col {
		padding: 10rpx 20rpx 20rpx;
		&::after {
			border-top: 1px solid #1C314D;
		}
		&::before {
			border-top: 1px solid #070D17;
		}
		text {
			color: $uni-text-color;
		}
		.w40p {
			width: 45%;
			text-align: center;
			white-space: nowrap;
		}
		.line {
			width: 4rpx;
			height: 58rpx;
			background-color: #243751;
			border-radius: 2rpx;
		}
		.dot {
			vertical-align: middle;
			display: inline-block;
			width: 8rpx;
			height: 8rpx;
			background-color: #f59a4b;
			border-radius: 50%;
			margin-right: 6rpx;
		}
		.red {
			background-color: $uni-color-primary;
		}
		.label {
			font-size: 26rpx;
			color: $uni-text-color-grey;
		}
		.unit {
			color: $uni-text-color-grey;
		}
		.number {
			font-size: 38rpx;
			// color: $uni-text-color;
		}
	}
	
}
.coin-info {
		padding: 8rpx 20rpx 24rpx;
		.p-t16 {
			padding-top: 16rpx;
		}
		.label {
			color: $uni-text-color-grey;
			font-size: 28rpx;
		}
		.unit {
			font-size: 22rpx;
			color: $uni-text-color-grey;
		}
		.number {
			font-size: 36rpx;
		}
		.fall {
			color: #FF1943;
		}
		.rise {
			color: #08E17B;
		}
		.up {
			border-bottom: 10rpx solid #08E17B;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-radius: 10rpx;
		}
		.down {
			border-top: 10rpx solid #FF1943;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-radius: 10rpx;
		}
		.col {
			padding: 16rpx;
			color: $uni-text-color-grey;
			font-size: 28rpx;
			.unit {
				color: $uni-text-color-grey;
			}
		}
	}

.date-change {
	height: 60rpx;
	padding: 0 10rpx;
	.date-item {
		font-size: 26rpx;
		color: #889eb9;
		margin-right: 50rpx;
		padding-bottom: 6rpx;
		border-bottom: 4rpx solid transparent;
		
	}
	.number {
		font-size: 32rpx;
		color: $uni-text-color;
	}
	.unit {
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}
	.date-actived {
		border-bottom: 4rpx solid #3efff8;
		color: #3efff8;
	}
}	

.profit{
	
	padding: 0 14rpx;
}

.tags {
	height: 84rpx;
	padding-left: 20rpx;
	padding-right: 10rpx;
	.tag {
		display: inline-block;
		margin-right: 30rpx;
		width: 164rpx;
		height: 54rpx;
		line-height: 54rpx;
		background-color: #2c405b;
		border-radius: 6rpx;
		text-align: center;
		font-size: 28rpx;
		color: $uni-text-color;
	}
	.actived {
		color: #ffffff;
		background-color: #2aa3b1;
	}
	.value {
		font-size: 36rpx;
		color: #04ac90;
	}
	.color-red {
		color: #d14b64;
	}
	.unit {
		font-size: 22rpx;
		color: $uni-text-color-grey;
	}
}
.m-t14 {
	margin-top: 14rpx;
}
.profit-statistic {
	padding: 0 14rpx;
	border-radius: 8rpx;
	background-color: #0D1A2C;
	.radio-group {
		width: 240rpx;
		padding-right: 44rpx;
	}
	.radio {
		width: 106rpx;
		height: 44rpx;
		line-height: 44rpx;
		background-color: #2c405b;
		border-radius: 6rpx;
		text-align: center;
		color: $uni-text-color;
		font-size: 24rpx;
	}
	.actived {
		background-color: #2aa3b1;
		color: #ffffff;
	}
	.echarts::after, {
		top: -20rpx;
	}
	 .echarts::before {
		 top: -18rpx;
	 }
	
}
</style>
