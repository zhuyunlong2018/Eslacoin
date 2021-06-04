<!-- 行情详情页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="navTitle"
			backgroundColor="#0D1A2C"
		/>
		<view class="number-col">
			<view class="flex">
				<view class="left">
					<text class="number bold-8">{{ quotationsDetail.Price }}</text>
				</view>
				<view class="right">
					<text class="text">{{ $t('quotations.detail.high') }}</text>
					<text>{{ quotationsDetail.High }}</text>
				</view>
			</view>
			<view class="flex">
				<view class="left">
					<text class="text bold">≈{{ quotationsDetail.CnyMoney }}CNY</text>
					<text class="green" v-if="quotationsDetail.PriceChangePer >= 0">+{{ quotationsDetail.PriceChangePer }}%</text>
					<text class="red" v-else>{{ quotationsDetail.PriceChangePer }}%</text>
				</view>
				<view class="right">
					<text class="text">{{ $t('quotations.detail.low') }}</text>
					<text>{{ quotationsDetail.Low }}</text>
				</view>
			</view>
		</view>
		<!-- 时间切换 -->
		<view class="tab-bar">
			<scroll-view scroll-x="true">
				<view class="flex">
					<view class="bar"
						v-for="(item, index) in timeList"
						:class="{'actived': item.value == Interval, 'm-l40': index > 0}"
						@click="timeChange(item)"
						:key="'time_' + index">{{ item.name + $t('common.times')[item.idx] }}</view>
				</view>
			</scroll-view>
			
		</view>
		
		
		<!-- 行情表 -->
		<mapEcharts :echartsData="echartsData" backgroundColor="#0d1a2c" />
		
		<view class="tab-col flex">
			<view class="tab-col-item"
				v-for="(item, index) in tabBarList"
				:class="{'actived': tabCheckedStatus == item.type}"
				@click="tabCheckedStatus = item.type"
				:key="'quotation_' + index">{{ $t('quotations.detail.tabs')[index] }}</view>
		</view>
		<!-- 全球行情 -->
		<view class="list" v-if="tabCheckedStatus == 'world'">
			<view class="list-item flex"
				v-for="(item, index) in coinList"
				:class="index > 0 ? 'btn-t-2' : ''"
				:key="'coin_' + index">
				<view class="left flex flex-start">
					<image :src="item.Logo"></image>
					<view>
						<text class="name">{{ item.Name }}</text>
						<text class="unit">{{ item.Symbol }}</text>
					</view>
				</view>
				<view class="right" v-if="item.ChangePercent >= 0">+{{ item.ChangePercent }}%</view>
				<view class="right red" v-else>{{ item.ChangePercent }}%</view>
			</view>
		</view>
		<!-- 流入流出 -->
		<view class="in-out" v-if="tabCheckedStatus == 'inOut'">
			<view class="flex">
				<view>
					<text class="text">{{ $t('quotations.detail.texts')[0] }}</text>
					<text class="text green">{{ inOut.in }}%</text>
				</view>
				<view class="text-right">
					<text class="text red">{{ inOut.out }}%</text>
					<text class="text">{{ $t('quotations.detail.texts')[1] }}</text>
				</view>
			</view>
			<view class="flex proportion-col">
				<view class="left" :style="{'width': inOut.in + '%'}">
					<text></text>
				</view>
				<view class="right" :style="{'width': `calc(100% - ${inOut.in}%)`}">
					<text></text>
				</view>
			</view>
			<view class="text text-center">{{ $t('quotations.detail.texts')[2] }}</view>
		</view>
		<!-- 多空比例 -->
		<view class="in-out" v-if="tabCheckedStatus == 'proportion'">
			<view class="flex">
				<view>
					<text class="text">{{ $t('quotations.detail.texts')[3] }}</text>
					<text class="text green">{{ proportion.many }}%</text>
				</view>
				<view class="text-right">
					<text class="text red">{{ proportion.empty }}%</text>
					<text class="text">{{ $t('quotations.detail.texts')[4] }}</text>
				</view>
			</view>
			<view class="flex proportion-col">
				<view class="left" :style="{'width': proportion.many + '%'}">
					<text></text>
				</view>
				<view class="right" :style="{'width': `calc(100% - ${proportion.many}%)`}">
					<text></text>
				</view>
			</view>
			<view class="text text-center">{{ $t('quotations.detail.texts')[5] }}</view>
		</view>
		<!-- 币种信息 -->
		<view class="currency-info" v-if="tabCheckedStatus == 'info'">
			<view class="title btn-b-1 bold">{{ coinInfo.Symbol }}</view>
			<view class="item flex btn-b-1">
				<text class="label">{{ coinInfo.Symbol }}</text>
				<text class="value">{{ coinInfo.OnlineTime }}</text>
			</view>
			<view class="item flex btn-b-1">
				<text class="label">{{ $t('quotations.detail.labels')[0] }}</text>
				<text class="value">{{ coinInfo.Supply }}</text>
			</view>
			<view class="item flex align-start btn-b-1">
				<text class="label">{{ $t('quotations.detail.labels')[3] }}</text>
				<text class="value">{{ coinInfo.WhitePaper }}</text>
			</view>
			<!-- 简介 -->
			<view class="title">{{ $t('quotations.detail.labels')[4] }}</view>
			<view class="text" v-html="coinInfo.Description"></view>
		</view>
		<!-- 补偿底部遮挡区域 -->
		<view style="height: 120rpx;"></view>
		<!-- 底部按钮 -->
		<view class="btn-col btn-t-1 flex">
			<view class="button green" @click="openPage('/pages/task/edit')">{{ $t('quotations.detail.btns')[0] }}</view>
			<view class="button red" @click="settingBtn">{{ $t('quotations.detail.btns')[1] }}</view>
			<view class="button add" v-if="!SelfChoose" @click="addSelfHandle('add')">+{{ $t('quotations.detail.btns')[2] }}</view>
			<view class="button" @click="addSelfHandle('del')" v-else>{{ $t('quotations.detail.btns')[3] }}</view>
		</view>
		<!-- 弹出层 -->
		<view class="picker"
			v-show="isShowPicker"
			:style="{top: `calc(${statusBarHeight + 44}px + 200rpx)`}">
			<view class="content flex">
				<view class="bar">分时</view>
				<view class="bar">1分</view>
				<view class="bar">5分</view>
				<view class="bar">30分</view>
				<view class="bar">1月</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mapEcharts from '../../components/mapEccharts/mapEccharts.vue';
	export default {
		components: {
			mapEcharts
		},
		onLoad(opt) {
			console.log(opt)
			this.navTitle = opt.sym.indexOf('USDT') != -1 ? opt.sym.replace('USDT', '/USDT') : opt.sym + '/USDT';
			this.Symbol = opt.sym.indexOf('USDT') != -1 ? opt.sym : opt.sym + 'USDT';
			uni.$on('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent);
			this.sendMessage();
		},
		onShow() {
			this.SelfChoose = uni.getStorageSync('self');
			this.getKList();
			this.getCoinList();
		},
		onUnload() {
			clearInterval(this.timeFn);
			this.timeFn = null;
			uni.$off('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
		},
		onHide() {
			clearInterval(this.timeFn);
			this.timeFn = null;
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				navTitle: "",
				// 是否自选
				SelfChoose: false,
				// tab 切换列表
				tabBarList: [
					{
						name: '全球行情',
						type: 'world'
					},
					{
						name: '流入流出',
						type: 'inOut'
					},
					{
						name: '多空比例',
						type: 'proportion'
					},
					{
						name: '币种信息',
						type: 'info'
					}
				],
				// tab 栏选中状态
				tabCheckedStatus: 'world',
				// 时间切换列表
				timeList: [
					{
						name: '1',
						value: '1min',
						idx: 0
					},
					{
						name: '5',
						value: '5min',
						idx: 0
					},
					{
						name: '15',
						value: '15min',
						idx: 0
					},
					{
						name: '30',
						value: '30min',
						idx: 0
					},
					{
						name: '1',
						value: '60min',
						idx: 1
					},
					{
						name: '4',
						value: '4hour',
						idx: 1
					},
					{
						name: '1',
						value: '1day',
						idx: 2
					},
					{
						name: '1',
						value: '1week',
						idx: 3
					},
					{
						name: '1',
						value: '1mon',
						idx: 4
					},
				],
				echartsData: {
					categories: [],
					series: [{
						data: []
					}]
				},
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				isShowPicker: false,
				Echannel: uni.getStorageSync('echannel') || 2,
				Interval: '15min', // 时间周期
				Symbol: '',
				// 行情详情
				quotationsDetail: {
					High: '',
					Low: '',
					Price: '',
					VolumeUsdt: '',
					Volume: '',
					PriceChange: '',
					PriceChangePer: '',
					CnyMoney: null
				},
				// 人民币换算率
				UsdtCnyRate: uni.getStorageSync('UsdtCnyRate'),
				// 全球行情 币列表
				coinList: [],
				// 流入流出
				inOut: {},
				// 多空比例
				proportion: {},
				// 币种信息
				coinInfo: {},
				// 时间函数
				timeFn: null
			};
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			sendMessage() {
				let Message = {
					CSNeedPriceChangeReq:{
						NeedPrice: true,
						NeedKSymbol: this.Symbol.replace('USDT', ''),
						NeedKInterval: this.Interval
					}
				}
				uni.$emit('SEND_LOBBY_WS_MSG_EVENT', JSON.stringify(Message));
			},
			//大厅WebSocket消息监听
			onLobbyMsgEvent(recvData){
				if (recvData.SymbolKUpdateNtf) {
					let Kline = recvData.SymbolKUpdateNtf.Kline;
					// 判断当前币种是否存在K线
					if (this.echartsData.categories.length != 0) {
						// 判断是否是更新最后一根
						if (recvData.SymbolKUpdateNtf.IsFinal) {
							// 判断最后一根 K 线价格是否有无改变， 无变化则不更新 K 线图
							if (Kline.OpenTimeStr == this.echartsData.categories[this.echartsData.categories.length - 1]) {
								return false;
							}
							// 新增加一根
							this.echartsData.categories.splice(0, 1).push(Kline.OpenTimeStr);
							let list = [...this.echartsData.series[0].data];
							list.splice(0, 1).push([Kline.Open, Kline.Close, Kline.Low, Kline.High]);
							this.echartsData.series = [{
								data: [...list]
							}]
						} else {
							// 更新最后一根
							if (Kline.Close == this.quotationsDetail.Price) {
								return false;
							}
							this.echartsData.categories.splice(49, 1, Kline.OpenTimeStr);
							this.echartsData.series[0].data.splice(49, 1, [Kline.Open, Kline.Close, Kline.Low, Kline.High]);
						
						}
					}
					// 重新取值
					this.quotationsDetail.Price = Kline.Close;
					this.quotationsDetail.PriceChangePer = recvData.SymbolKUpdateNtf.PriceChangePer.toFixed(2);
					this.quotationsDetail.High = recvData.SymbolKUpdateNtf.High;
					this.quotationsDetail.Low = recvData.SymbolKUpdateNtf.Low;
					this.quotationsDetail.CnyMoney = (this.UsdtCnyRate * Kline.Close).toFixed(2);
				}
			},
			// 时间切换
			timeChange(item) {
				this.Interval = item.value;
				this.isShowPicker = false;
				clearInterval(this.timeFn);
				this.timeFn = null;
				this.sendMessage();
				this.getKList();
			},
			// 用户添加/取消自选
			addSelfHandle(type = 'add') {
				// 判断是否添加自选
				if (type == 'add') {
					// 添加自选
					this.CsHttp.post(this.ApiConfig.KUrl + '/AddSelfChooseReq', {
						UserId: uni.getStorageSync('UserData').UserId,
						Echannel: Number(this.Echannel),
						Symbol: [this.Symbol],
					}).then(res => {
						uni.showToast({
							title: this.$t('quotations.detail.tips')[0],
							icon: 'none',
							duration: 1000
						})
						uni.setStorageSync('self', true);
						this.SelfChoose = true;
					})
				} else {
					// 取消自选
					this.CsHttp.post(this.ApiConfig.KUrl + '/DeleteSelfChooseReq', {
						UserId: uni.getStorageSync('UserData').UserId,
						Echannel: Number(this.Echannel),
						Symbol: [this.Symbol],
					}).then(res => {
						uni.showToast({
							title: this.$t('quotations.detail.tips')[1],
							icon: 'none',
							duration: 1000
						})
						this.$store.dispatch('SET_SELF_CHOOSE', true);
						uni.setStorageSync('self', false);
						this.SelfChoose = false;
					})
				}
			},
			// 获取 K 线图
			getKList () {
				this.CsHttp.post(this.ApiConfig.KUrl + '/BsGetKlineReq', {
					Echannel: Number(this.Echannel),
					Symbol: this.Symbol,
					Interval: this.Interval
				}).then(res => {
					for(let key in this.quotationsDetail) {
						this.quotationsDetail[key] = res[key];
					}
					this.quotationsDetail.CnyMoney = (this.UsdtCnyRate * res.Price).toFixed(2);
					// 处理数据
					this.echartsData.categories = [];
					this.echartsData.series[0].data = [];
					let dataList = [];
					// 先处理 K 线图数据排序，再取最后 50 条数据，再通过 forEach 函数处理数据
					res.Klines.sort((pre, next) => { return pre.OpenTime - next.OpenTime }).splice(res.Klines.length - 50, res.Klines.length).forEach(item => {
						this.echartsData.categories.push(item.OpenTimeStr);
						dataList.push([item.Open, item.Close, item.Low, item.High])
					})
					this.echartsData.series = [{
						data: dataList
					}]
					
				}).catch(err => {
					console.log(err)
					clearInterval(this.timeFn);
					this.timeFn = null;
				})
				
			},
			// 获取全球行情币数据
			getCoinList() {
				this.CsHttp.post(this.ApiConfig.KUrl + '/BsCryptoInfoReq', {
					Symbol: this.Symbol.replace('USDT', '')
				}).then(res => {
					console.log(res)
					res.MarketPairs.forEach(item => {
						item.Name = item.PairName.split('/')[0];
						item.Symbol = '/' + item.PairName.split('/')[1];
					})
					this.coinList = res.MarketPairs;
					this.inOut = {
						in: (res.FundFlowData.MainInPro * 100 + res.FundFlowData.RetailInPro * 100) / 100,
						out: (res.FundFlowData.MainOutPro * 100 + res.FundFlowData.RetailOutPro * 100) / 100
					};
					this.coinInfo.Description = res.Description;
					this.coinInfo.OnlineTime = res.OnlineTime;
					this.coinInfo.WhitePaper = res.WhitePaper;
					this.coinInfo.Supply = res.Supply;
					this.coinInfo.Symbol = res.Symbol;
					// 处理多空比例数据
					if (res.LongShort == 0) {
						this.proportion.many = 50;
						this.proportion.empty = 50;
					} else {
						this.proportion.many = res.LongShort *100;
						this.proportion.empty = 100 - res.LongShort * 100;
					}
					
				})
			},
			// 点击设置按钮
			settingBtn() {
				uni.hideToast();
				uni.showToast({
					title: '功能未开放',
					icon: 'none',
					duration: 1000
				})
			},
			// 打开页面
			openPage (url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
.number-col{
	height: 150rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	background-color: #0A1626;
	.number {
		font-size: 62rpx;
		color: #FF1943;
	}
	.left {
		
		.text {
			font-size: 28rpx;
			color: $uni-text-color-grey;
		}
		.green {
			font-size: 30rpx;
			padding-left: 12rpx;
			color: #08E17B;
		}
		.red {
			font-size: 30rpx;
			padding-left: 12rpx;
			color: #FF1943;
		}
	}
	.right {
		font-size: 26rpx;
		color: $uni-text-color;
		.text {
			color: $uni-text-color-grey;
			padding-right: 20rpx;
		}
	}
}
.tab-bar {
	padding: 0 28rpx;
	height: 50rpx;
	font-size: 24rpx;
	background-color: #0A1626;
	color: #8e9eab;
	white-space: nowrap;
	.m-l40 {
		margin-left: 40rpx;
	}
	.actived {
		color: #14E1F4;
		padding-bottom: 4rpx;
		border-bottom: 4rpx solid #14E1F4;
	}
}

.tab-col {
	padding: 0 28rpx;
	font-size: 28rpx;
	font-weight: 700;
	background-color: #101E33;
	color: $uni-text-color-grey;
	.tab-col-item {
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border-bottom: 4rpx solid transparent;
	}
	.actived {
		color: #14E1F4;
		font-size: 28rpx;
		border-bottom: 4rpx solid #14E1F4;
	}
}
.list {
	background-color: #0D1A2C;
	padding: 0 28rpx;
	.list-item {
		height: 118rpx;
		&::after {
			border-top: 1px solid #1f304a;
		}
		&::before {
			border-top: 1px solid #0B111C;
		}
	}
	.left {
		image {
			height: 44rpx;
			width: 44rpx;
			background-color: #ffffff;
			margin-right: 20rpx;
			border-radius: 50%;
		}
	}
	.right {
		height: 68rpx;
		line-height: 68rpx;
		width: 166rpx;
		text-align: center;
		border-radius: 8rpx;
		background-color: #03ad90;
		color: #ffffff;
		font-size: 32rpx;
	}
	.red {
		background-color: #d14b64;
	}
	.name {
		font-size: 28rpx;
		color: $uni-text-color;
	}
	.unit {
		font-size: 22rpx;
		color: $uni-text-color-grey;
	}
}
.in-out {
	margin: 20rpx 28rpx;
	background-color: #1B2B41;
	border-radius: 8rpx;
	padding: 30rpx 20rpx;
	box-sizing: border-box;
	.proportion-col {
		padding-top: 10rpx;
		padding-bottom: 20rpx;
		view {
			height: 30rpx;
			position: relative;
		}
		.left {
			background-color: #04ac90;
			border-top-left-radius: 32rpx;
			border-bottom-left-radius: 32rpx;
			text {
				position: absolute;
				top: 0;
				right: 0;
				display: inline-block;
				border-bottom: 16rpx solid #1a253a;
				border-right: 8rpx solid #1a253a;
				border-left: 8rpx solid transparent;
				border-top: 16rpx solid transparent;
			}
		}
		.right {
			background-color: #d14b64;
			border-top-right-radius: 32rpx;
			border-bottom-right-radius: 32rpx;
			text {
				position: absolute;
				top: 0;
				left: 0;
				display: inline-block;
				border-top: 16rpx solid #1a253a;
				border-left: 8rpx solid #1a253a;
				border-right: 8rpx solid transparent;
				border-bottom: 16rpx solid transparent;
			}
		}
		
	}
	.text {
		color: $uni-text-color;
		font-size: 26rpx;
	}
	.green {
		color: #04ac90;
		padding-left: 10rpx;
	}
	.red {
		padding-right: 10rpx;
		color: #d14b64;
	}
}
.currency-info {
	padding: 0 28rpx;
	font-size: 26rpx;
	.title {
		font-size: 36rpx;
		color: $uni-text-color;
		height: 80rpx;
		line-height: 80rpx;
	}
	.btn-b-1::after {
		border-bottom: 1px solid #1f304a;
	}
	.item {
		padding: 16rpx 0;
		.label {
			white-space: nowrap;
			color: $uni-text-color-grey;
		}
		.value {
			text-align: right;
			color: $uni-text-color;
			width: calc(100% - 180rpx);
			word-break: break-all;
		}
	}
	.text {
		color: $uni-text-color;
		padding-bottom: 10rpx;
	}
}
.btn-col {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	background-color: #15253B;
	padding: 0 28rpx;
	&::after {
		border-top: 1px solid #273650;
	}
	.button {
		height: 80rpx;
		line-height: 80rpx;
		width: 30%;
		text-align: center;
		border-radius: 12rpx;
		color: $uni-color-primary;
		border: 2rpx solid $uni-color-primary;
		font-size: 28rpx;
		box-sizing: border-box;
		white-space: nowrap;
		box-shadow: 0 2rpx 4rpx 0 rgba(13, 29, 58, 0.27);
	}
	.add {
		background-color: #12c1bb;
		color: #ffffff;
		border: none;
	}
	.red {
		background-color: #d14b64;
		color: #ffffff;
		border: none;
	}
	.green {
		background-color: #04ac90;
		color: #ffffff;
		border: none;
	}
}
.picker {
	position: fixed;
	z-index: 9;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(4, 4, 4, 0.25);
	.content {
		height: 94rpx;
		background-color: #f4f5f6;
		border-radius: 0 0 24rpx 24rpx;
		padding: 0 28rpx;
	}
	.bar {
		width: 98rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 8rpx;
		background-color: #dde2e6;
		font-size: 24rpx;
		text-align: center;
		color: #8c9fad;
	}
}
</style>
