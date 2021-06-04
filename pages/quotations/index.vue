<!-- 市场行情页 -->
<template>
	<view class="root">
		<!-- tab 栏 -->
		<view class="tab-bar flex" :style="{'padding-top': statusBarHeight + 'px'}">
			<view class="flex items">
				<text class="tab-bar-item bold-8"
					:class="{actived: item.type == activedType}"
					@click="onClickTab(item.type, index)"
					v-for="(item, index) in tabBarList"
					:key="'quotations_' + index">{{ $t('quotations.home.tabs')[index] }}</text>
			</view>
			<!-- 搜索按钮 -->
			<image class="icon" 
				@click="isShowSearch = !isShowSearch"
				src="../../static/icon/hq_ss.png" mode=""></image>
		</view>
		<!-- 自选排序 -->
		<view class="sort-col flex"
			v-if="tablelData[activedType].length != 0 && activedType == 'zx'">
			<view class="w140r flex flex-start">
				<text class="text">{{ $t('quotations.home.listHeader')[0] }}</text>
				<view class="up-pre p-l10">
					<text class="up up-pab" 
						@click="onClickSortBtn('name_up')"
						:class="{'sort': selfSortStatus == 'name_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('name_down')"
						:class="{'sort': selfSortStatus == 'name_down'}"></text>
				</view>
			</view>
			<view class=" flex flex-start w110r">
				<text class="text">{{ $t('quotations.home.listHeader')[1] }}</text>
				<view class="up-pre p-l10">
					<text class="up up-pab" 
						@click="onClickSortBtn('price_up')"
						:class="{'sort': selfSortStatus == 'price_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('price_down')"
						:class="{'sort': selfSortStatus == 'price_down'}"></text>
				</view>
			</view>
			<view class=" flex flex-end w80r">
				<text class="text">{{ $t('quotations.home.listHeader')[2] }}</text>
				<view class="up-pre p-l10 p-r30">
					<text class="up up-pab" 
						@click="onClickSortBtn('rise_up')"
						:class="{'sort': selfSortStatus == 'rise_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('rise_down')"
						:class="{'sort': selfSortStatus == 'rise_down'}"></text>
				</view>
			</view>
		</view>
		<!-- 当自选币对列表为空时，提供占位符，解决滚动区域高度异常问题 -->
		<view v-if="tablelData[activedType].length == 0 && activedType == 'zx'" style="height: 60rpx;"></view>
		<!-- 市值 -->
		<view class="sort-col flex" v-if="['market'].includes(activedType)">
			<view class="w140r flex flex-start">
				<text class="text">{{ $t('quotations.home.listHeader')[3] }}</text>
			</view>
			<view class=" flex flex-start w110r">
				<text class="text">{{ $t('quotations.home.listHeader')[1] }}(CNY)</text>
			</view>
			<view class=" flex flex-end w80r">
				<text class="text">{{ $t('quotations.home.listHeader')[2] }}</text>
			</view>
		</view>
		<!-- 交易所 -->
		<view class="sort-col flex " v-if="activedType == 'exchange'">
			<view class="w110r flex flex-start">
				<text class="text">{{ $t('quotations.home.listHeader')[5] }}</text>
			</view>
			<view class=" flex flex-start w110r">
				<text class="text">{{ $t('quotations.home.listHeader')[6] }}</text>
				<view class="up-pre p-l10">
					<text class="up up-pab" 
						@click="onClickSortBtn('exchange_up')"
						:class="{'sort': selfSortStatus == 'exchange_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('exchange_down')"
						:class="{'sort': selfSortStatus == 'exchange_down'}"></text>
				</view>
			</view>
			<view class=" flex flex-end w80r">
				<text class="text">ExRank</text>
				<image class="icon" src="../../static/icon/hq_wh.png" mode=""></image>
			</view>
		</view>
		<!-- 合约 -->
		<view class="sort-col flex " v-if="activedType == 'contract'">
			<view class="w110r flex flex-start">
				<text class="text">{{ $t('quotations.home.listHeader')[7] }}</text>
			</view>
			<view class=" flex flex-start w110r">
				<text class="text">{{ $t('quotations.home.listHeader')[8] }}</text>
				<view class="up-pre p-l10">
					<text class="up up-pab" 
						@click="onClickSortBtn('contract_up')"
						:class="{'sort': selfSortStatus == 'contract_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('contract_down')"
						:class="{'sort': selfSortStatus == 'contract_down'}"></text>
				</view>
			</view>
			<view class=" flex flex-end w80r">
				<text class="text">ExRank</text>
				<image class="icon" src="../../static/icon/hq_wh.png" mode=""></image>
			</view>
		</view>
		<!-- 热搜榜 -->
		<view class="sort-col flex" v-if="activedType == 'hot'">
			<view class="w110r flex flex-start">
				<text class="text">{{ $t('quotations.home.listHeader')[9] }}</text>
			</view>
			<view class=" flex flex-start w110r">
				<text class="text">{{ $t('quotations.home.listHeader')[8] }}</text>
				<view class="up-pre p-l10">
					<text class="up up-pab" 
						@click="onClickSortBtn('contract_up')"
						:class="{'sort': selfSortStatus == 'contract_up'}"></text>
					<text class="down up-pab" 
						@click="onClickSortBtn('contract_down')"
						:class="{'sort': selfSortStatus == 'contract_down'}"></text>
				</view>
			</view>
			<view class=" flex flex-end w80r">
				<text class="text">{{ $t('quotations.home.listHeader')[10] }}</text>
			</view>
		</view>
	
		<!-- 内容栏 -->
		<view class="content" style="overflow: hidden;">
			<mescroll-body :ref="'mescrollRef_'"
				:height="ovHeight" @init="mescrollInit" @down="downCallback" :down="downOption" :up="upOption">
			
				<view class="" style="transition: all .3s;overflow: visible;white-space: nowrap;"
					:style="{transform: transformXx, width: '100%',height: `${ovHeight}px`}" >
					<!-- 自选组件 -->
					<Self 
						:tablelData="tablelData.zx"
						:ovHeight='ovHeight'
						:isLoading='isLoading.zx'
						:upOpt="upOpt"
						:recommendCoinList="recommendCoinList"
						@scrolltolowerFn='scrolltolowerFn'
						@checkedCoinFn='checkedCoinFn'
						@addSelfChoose='addSelfChoose'
						/>
					<!-- 市值组件 -->
					<Market 
						:tablelData="tablelData.market"
						:ovHeight='ovHeight'
						:isLoading='isLoading.market'
						:upOpt="upOpt"
						@scrolltolowerFn='scrolltolowerFn'/>
					<!-- 交易所组件 -->
					<Exchange 
						:tablelData="tablelData.exchange"
						:ovHeight='ovHeight'
						:isLoading='isLoading.exchange'
						:upOpt="upOpt"
						@scrolltolowerFn='scrolltolowerFn'/>
					<!-- 合约组件 -->
					<Contract 
						:tablelData="tablelData.contract"
						:ovHeight='ovHeight'
						:isLoading='isLoading.contract'
						:upOpt="upOpt"
						@scrolltolowerFn='scrolltolowerFn'/>
					<!-- 热搜组件 -->
					<Hot 
						:tablelData="tablelData.hot"
						:ovHeight='ovHeight'
						:isLoading='isLoading.hot'
						:upOpt="upOpt"
						@scrolltolowerFn='scrolltolowerFn'/>
				</view>
			
			</mescroll-body>
		</view>
		
		<!-- 搜索框 -->
		<Search :isShowSearch.sync="isShowSearch" 
			:searchVal.sync="SearchVal"
			@searchBtn="(val) => { searchBtn('btn', val) }" />
	</view>
</template>

<script>
	import APiConfigUrl from '@/common/cs_api_config.js';
	import { formatMoney } from '@/common/cs_util.js';
	import Search from './components/search.vue';
	import { mapState } from 'vuex';
	import MescrollMixin from "@/components/uni-scroll/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/uni-scroll/mescroll-body/mescroll-body.vue";
	import Self from './components/self.vue';
	import Market from './components/market.vue';
	import Exchange from './components/exchange.vue';
	import Contract from './components/contract.vue';
	import Hot from './components/hot.vue';
	export default {
		components: {
			Search,
			MescrollBody,
			Self,
			Market,
			Exchange,
			Contract,
			Hot
		},
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					auto: false
				},
				upOption: {
					use: false
				},
				upOpt: {
					bgColor: '#121D2E',
					textColor: '#CED3E9',
					textLoading: 'Loading',
					textNoMore: '暂无数据'
				},
				// 是否是加载中
				isLoading: {
					zx: 0,
					market: 0,
					exchange: 0,
					contract: 0,
					hot: 0,
				},
				activedType: 'market',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				tabBarList: [
					{
						type: 'zx',
						name: '自选'
					},
					{
						name: '市值',
						type: 'market'
					},
					{
						name: '交易所',
						type: 'exchange'
					},
					{
						name: '合约',
						type: 'contract'
					},
					{
						name: '热搜榜',
						type: 'hot'
					}
				],
				// 滚动区域高度
				ovHeight: 300,
				// 可视区域高度
				windowHeight: 0,
				SearchVal: '',
				Page: 1,
				Size: 20,
				loading: false,
				TotalCount: {
					zx: 0,
					market: 0,
					exchange: 0,
					contract: 0,
					hot: 0
				},
				ScrollTop: 0,
				tablelData: {
					zx: [],
					market: [
						{
							PriceChangePer: 0,
							Price: 0,
							Deal: 0,
							CnyMoney: 0
						}
					],
					exchange: [],
					contract: [],
					hot: []
				},
				// 存储获取到的币种数据
				symbolDataList: {
					zx: [],
					market: [],
					exchange: [],
					contract: [],
					hot: []
				},
				// 存储推荐币种
				recommendCoinList: [{recommend: true}],
				timeFn: null,
				// 自选排序状态
				selfSortStatus: '',
				// 平台渠道值
				selEchannel: 1, // 1 - 火币，2 - 币安
				// 换算人民币比例
				UsdtCnyRate: null,
				// 是否显示搜索栏
				isShowSearch: false,
				// 是否接收消息
				isReceiveInfo: false,
				timeFn: null,
				current: 1,
				screenWidth: uni.getStorageSync('screenWidth')
			};
		},
		//*******************************************************************
		// 自适应高度
		//*******************************************************************
		onReady() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					self.windowHeight = res.windowHeight;
					self.scrollHeight();
				}
			})
		},
		computed: {
			...mapState({
				isCancelSelfChoose: (state) => state.isCancelSelfChoose
			}),
			transformXx(){
			    let currentTab = this.current;
			    return `translate3d(-${currentTab*100}%, 0px, 0px)`
			}
		},
		watch: {
			// 监听用户是否取消自选，取消的话重新获取自选数据
			isCancelSelfChoose() {
				if (this.isCancelSelfChoose && this.activedType == 'zx') {
					this.getSymbolData();
				}
			}
		},
		onLoad() {
			this.tablelData[this.activedType] = [];
			this.recommendCoinList = [];
			this.$store.dispatch('CHECK_LOGIN').then(res => {
				if (res) {
					uni.$on('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent);
					this.timeFn = setInterval(() => {
						if (this.isReceiveInfo) return false;
						this.sendMessage();
					}, 1000);
					this.isLoading[this.activedType] = 1;
					this.getSymbolData();
				}
			});
			
		},
		onShow() {
			this.isShowSearch = false;
			// this.getSymbolData();
			this.$store.dispatch('GET_API').then(res => {
				console.log(res)
			})
		},
		onHide() {
			if (this.mescroll) {
				this.mescroll.endSuccess();
			}
			uni.hideLoading();
		},
		onUnload(){
			uni.hideLoading();
			if (this.timeFn) {
				this.isReceiveInfo = true;
				clearInterval(this.timeFn);
				this.timeFn = null;
			}
			uni.$off('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 下拉刷新获取币对列表
			downCallback() {
				this.getSymbolData();
			},
			// 发送消息
			sendMessage() {
				let Message = {
					CSNeedPriceChangeReq:{
						NeedPrice: true,
						NeedKSymbol: "",
						NeedKInterval: "",
					}
				}
				uni.$emit('SEND_LOBBY_WS_MSG_EVENT', JSON.stringify(Message));
			},
			//大厅WebSocket消息监听
			onLobbyMsgEvent(recvData){
				// console.log(recvData)
				if (this.timeFn) {
					this.isReceiveInfo = true;
					clearInterval(this.timeFn);
					this.timeFn = null;
				}
				if (!recvData.SymbolPriceUpdateNtf) return false;
				let list = recvData.SymbolPriceUpdateNtf.SymbolUpdateEvents;
				// 判断tab栏
				if (['zx', 'market'].includes(this.activedType)) {
					// 自选、市值
					this.tablelData[this.activedType].forEach(item => {
						let obj = list.find(vals => { return vals.Symbol == item.Symbol });
						if (obj) {
							item.PriceChangePer = obj.PriceChangePer.toFixed(2);
							item.Price = obj.Price;
							item.CnyMoney = (this.UsdtCnyRate * obj.Price).toFixed(2);
							// 判断价格是否包含小数点
							if (String(item.Price).indexOf('.') != -1 && String(item.Price).split('.').length > 1) {
								item.Price = String(item.Price).split('.')[1].length > 4 ? item.Price.toFixed(4) : item.Price;
							}
						}
					})
				} else if (this.activedType == 'hot') {
					// 热搜
					this.tablelData[this.activedType].forEach(item => {
						let obj = list.find(vals => { return vals.Symbol == item.Symbol });
						if (obj) {
							item.PriceChangePer = obj.PriceChangePer.toFixed(2);
						}
					})
				}
			},
			// 处理自选推荐币种选择
			checkedCoinFn(index) {
				this.recommendCoinList[index].recommend = !this.recommendCoinList[index].recommend;
			},
			// 添加自选
			addSelfChoose() {
				let list = this.recommendCoinList.filter(items => items.recommend == true);
				if (list.length == 0) {
					uni.hideToast();
					uni.showToast({
						title: this.$t('quotations.home.tips')[0],
						duration: 1500,
						icon: 'none'
					})
					return false;
				}
				this.CsHttp.post(this.ApiConfig.KUrl + '/AddSelfChooseReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Echannel: Number(this.Echannel),
					Symbol: list.map(item => item.Symbol + 'USDT'),
				}).then(res => {
					uni.showToast({
						title: this.$t('quotations.home.tips')[1],
						icon: 'none',
						duration: 1500
					})
					setTimeout(() => {
						this.getSymbolData();
					}, 1500)
				})
			},
			// 点击tab栏
			onClickTab(type, val) {
				if (this.activedType == type) return false;
				this.selEchannel = null;
				this.selfSortStatus = '';
				this.isShowSearch = false;
				this.SearchVal = '';
				this.current = val;
				this.activedType = type;
				if (this.tablelData[this.activedType].length == 0) {
					this.isLoading[this.activedType] = 1;
					this.getSymbolData();
				}
				
			},
			// 点击排序按钮
			onClickSortBtn (status) {
				console.log(status)
				if (this.selfSortStatus == status) return false;
				this.selfSortStatus = status;
				this.isLoading[this.activedType] = 0;
				this.getSymbolData();
			},
			// 滚动事件
			scrolltolowerFn() {
				if (this.loading || this.tablelData[this.activedType].length >= this.TotalCount[this.activedType]) return false;
				this.loading = true;
				this.isLoading[this.activedType] = 1;
				this.Page++;
				let timeFn = setTimeout(() => {
					this.tablelData[this.activedType].push(...this.symbolDataList[this.activedType].slice((this.Page - 1) * this.Size, this.Page * this.Size));
					this.$nextTick(() => {
						this.loading = false;
						clearTimeout(timeFn);
						this.isLoading[this.activedType] = 0;
					})
				}, 500)
			},
			// 设置滚动条
			scrollFn(e) {
				if (this.ScrollTop == 0) {
					this.ScrollTop = e.detail.scrollTop;
				}
			},
			// 点击搜索按钮
			searchBtn (type = 'btn', val) {
				console.log(val)
				this.SearchVal = val;
				if (type == 'input') {
					if (!this.SearchVal) {
						if (this.timeFn) {
							clearTimeout(this.timeFn);
						}
						this.timeFn = setTimeout(() => {
							this.getSymbolData();
						}, 200)
					}
					return false;
				}
				this.getSymbolData();
			},
			
			// 获取币种数据
			getSymbolData() {
				this.loading = false;
				this.Page = 1;
				this.ScrollTop = 0;
				// 判断tab栏
				if (this.activedType == 'zx') {
					// 自选
					this.CsHttp.post(this.ApiConfig.KUrl + '/BsGetAllSymbolsReq', {
						UserId: uni.getStorageSync('UserData').UserId
					}).then(res => {
						if (!res) return false;
						this.UsdtCnyRate = res.UsdtCnyRate.toFixed(4);
						uni.setStorageSync('UsdtCnyRate', this.UsdtCnyRate);
						res.SymbolData.forEach(item => {
							item.Symbol = item.Symbol.replace('USDT', '');
							item.Money = item.VolumeUsdt.toFixed(2);
							item.Deal = formatMoney(item.VolumeUsdt);
							item.CnyMoney = (res.UsdtCnyRate * item.Price).toFixed(2);
							// 判断价格是否包含小数点
							if (String(item.Price).indexOf('.') != -1) {
								item.Price = String(item.Price).split('.')[1].length > 4 ? item.Price.toFixed(4) : item.Price;
							}
						})
						this.$store.dispatch('SET_SELF_CHOOSE', false);
						this.symbolDataList[this.activedType] = JSON.parse(JSON.stringify(this.handleSymbolData(res.SymbolData)));
						this.tablelData[this.activedType] = [...this.symbolDataList[this.activedType].slice(0, 20)];
						this.TotalCount[this.activedType] = this.symbolDataList[this.activedType].length;
						this.mescroll.endSuccess();
						this.isLoading[this.activedType] = 0;
						console.log(res)
					})
				} else if (['market', 'hot'].includes(this.activedType)) {
					// 市值、热搜榜
					this.CsHttp.post(this.ApiConfig.KUrl + '/BsGetAllCryptoReq', {
						SortType: this.activedType == 'market' ? 1 : 2
					}).then(res => {
						console.log(res)
						if (!res) return false;
						this.UsdtCnyRate = res.UsdtCnyRate.toFixed(4);
						uni.setStorageSync('UsdtCnyRate', this.UsdtCnyRate);
						res.CryptoData.forEach(item => {
							item.Money = item.MarketCapCny;
							item.PriceChangePer = item.PercentChange24h;
							item.Price = item.PriceUsd;
							item.Deal = formatMoney(item.MarketCapUsd);
							item.CnyMoney = item.PriceCny.toFixed(2);
							// 判断价格是否包含小数点
							if (String(item.Price).indexOf('.') != -1) {
								item.Price = String(item.Price).split('.')[1].length > 4 ? item.Price.toFixed(4) : item.Price;
							}
						})
						this.symbolDataList[this.activedType] = JSON.parse(JSON.stringify(this.handleSymbolData(res.CryptoData)));
						this.tablelData[this.activedType] = [...this.symbolDataList[this.activedType].slice(0, 20)];
						this.TotalCount[this.activedType] = this.symbolDataList[this.activedType].length;
						this.mescroll.endSuccess();
						this.isLoading[this.activedType] = 0;
					})
				} else {
					// 交易所、合约
					this.CsHttp.post(this.ApiConfig.KUrl + '/BsGetAllExchangesReq', {
						SortType: this.activedType == 'exchange' ? 1 : 2
					}).then(res => {
						console.log(res)
						res.ExchangeData.forEach(item => {
							item.Name = item.NameEn;
							item.Price = formatMoney(item.VolumeUsd);
							item.CnyMoney = formatMoney(item.VolumeCny);
						})
						this.symbolDataList[this.activedType] = JSON.parse(JSON.stringify(this.handleSymbolData(res.ExchangeData)));
						this.tablelData[this.activedType] = [...this.symbolDataList[this.activedType].slice(0, 20)];
						this.TotalCount[this.activedType] = this.symbolDataList[this.activedType].length;
						this.mescroll.endSuccess();
						this.isLoading[this.activedType] = 0;
					})
				}
	
			},
			// 处理币种数据
			handleSymbolData(list) {
				let arr = [];
				if (this.SearchVal) {
					list = list.filter(item => {
						return (item.Name && item.Name.indexOf(this.SearchVal) != -1) || (item.Symbol && item.Symbol.indexOf(this.SearchVal) != -1)
					})
				}
				// 判断当前 tab 栏类型
				if (this.activedType == 'zx') {
					// 自选平台
					let data = list.filter(item => item.SelfChoose == true);
					// 判断是否存在自选
					if (data.length == 0) {
						let recList = [...list.slice(0, 6)];
						recList.forEach(item => { item.recommend = true; })
						this.recommendCoinList = [...recList];
					}
					// 判断是否排序
					switch(this.selfSortStatus) {
						case '':
							arr = [...data];
							break;
						case 'name_up':
							// 名称升序
							arr = [...data.sort((pre, next) => { return pre.Symbol.charCodeAt(0) - next.Symbol.charCodeAt(0) })];
							break;
						case 'name_down':
							// 名称降序
							arr = [...data.sort((pre, next) => { return next.Symbol.charCodeAt(0) - pre.Symbol.charCodeAt(0) })];
							break;
						case 'price_up':
							// 价格升序
							arr = [...data.sort((pre, next) => { return pre.Price - next.Price })];
							break;
						case 'price_down':
							// 价格降序
							arr = [...data.sort((pre, next) => { return next.Price - pre.Price })];
							break;
						case 'rise_up':
							// 涨幅升序
							arr = [...data.sort((pre, next) => { return pre.PriceChangePer - next.PriceChangePer })];
							break;
						case 'rise_down':
							// 涨幅降序
							arr = [...data.sort((pre, next) => { return next.PriceChangePer - pre.PriceChangePer })];
							break;
					}
				} else if(this.activedType == 'market') {
					// 市值
					arr = JSON.parse(JSON.stringify(list));
				} else if(this.activedType == 'exchange') {
					// 交易所
					// 判断是否排序
					switch(this.selfSortStatus) {
						case '':
							arr = JSON.parse(JSON.stringify(list));
							break;
						case 'exchange_up':
							arr = [...list.sort((pre, next) => { return pre.VolumeUsd - next.VolumeUsd })];
							break;
						case 'exchange_down':
							arr = [...list.sort((pre, next) => { return next.VolumeUsd - pre.VolumeUsd })];
							break;
					}
				} else if(this.activedType == 'contract') {
					// 合约
					switch(this.selfSortStatus) {
						case '':
							arr = JSON.parse(JSON.stringify(list));
							break;
						case 'contract_up':
							arr = [...list.sort((pre, next) => { return pre.VolumeUsd - next.VolumeUsd })];
							break;
						case 'contract_down':
							arr = [...list.sort((pre, next) => { return next.VolumeUsd - pre.VolumeUsd })];
							break;
					}
				} else if(this.activedType == 'hot') {
					// 热搜榜
					arr = JSON.parse(JSON.stringify(list));
				}
				return arr;
			},
			// 计算滚动区域高度
			scrollHeight() {
				let ovTop = uni.createSelectorQuery().select(".content-row");
				ovTop.boundingClientRect(data => {
					this.ovHeight = this.windowHeight - data.top
				}).exec()
			},
			// 打开页面
			openPage (item) {
				if (['exchange', 'contract'].includes(this.activedType)) return false;
				uni.setStorageSync('self', item.SelfChoose);
				uni.navigateTo({
					url: `/pages/quotations/quotations_detail?sym=${ item.Symbol }`
				})
			} 
		}
	}
</script>
<style>
	page {
		background-color: #121D2E;
	}	
</style>
<style lang="scss" scoped>
	
.tab-bar {
	padding-left: 28rpx;
	padding-right: 28rpx;
	height: 88rpx;
	background-color: $uni-bg-color;
	.items {
		width: calc(100% - 84rpx);
	}
	.tab-bar-item {
		font-size: 34rpx;
		color: $uni-text-color-grey;
		height: 80rpx;
		line-height: 80rpx;
		white-space: nowrap;
		padding: 0 10rpx 4rpx;
	}
	.actived {
		color: #14E1F4;
	}
	.icon {
		width: 64rpx;
		height: 64rpx;
	}
}
.search-col {
	padding-left: 28rpx;
	padding-right: 28rpx;
	height: 92rpx;
	background-color: #081323;
	input {
		width: 75%;
		background-color: #eff3f8;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		border-radius: 40rpx;
		color: #8c9fad;
		padding-left: 16rpx;
	}
	.search-btn {
		height: 60rpx;
		line-height: 60rpx;
		width: 140rpx;
		text-align: center;
		font-size: 28rpx;
		color: $uni-text-color-blue;
		&::after {
			border: 1px solid $uni-text-color-blue;
			border-radius: 60rpx;
		}
	}
}

.ranking-list {
	height: 80rpx;
	padding: 0 28rpx;
	background-color: #232f46;
	.item {
		font-size: 36rpx;
		color: $uni-text-color-grey;
		padding-right: 60rpx;
	}
	.ranking_actived {
		color: $uni-color-primary;
	}
}
.sort-col {
	background-color: #182134;
	height: 60rpx;
	padding: 0 28rpx;
	color: #475E7B;
	font-size: 24rpx;
	.w140r {
		width: 280rpx;
	}
	.w110r {
		width: 220rpx;
	}
	.w80r {
		width: 170rpx;
	}
	.up {
		display: block;
		border-bottom: 10rpx solid #475E7D;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-radius: 10rpx;
		top: -12rpx;
	}
	.down {
		display: block;
		border-top: 10rpx solid #475E7D;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-radius: 10rpx;
		top: 4rpx;
	}
	.sort {
		border-bottom-color: #14E1F4;
		border-top-color: #14E1F4;
	}
	.icon {
		width: 50rpx;
		height: 50rpx;
	}
}
.row {
	height: 72rpx;
	padding: 0 28rpx;
	.col {
		width: 100%;
		border-radius: 8rpx;
		height: 50rpx;
		.bar {
			height: 50rpx;
			line-height: 50rpx;
			width: 200rpx;
			text-align: center;
			color: #737b95;
			font-size: 26rpx;
		}
		.line {
			width: 2rpx;
			height: 12rpx;
			margin: 0 12rpx;
			background-color: #6d707b;
		}
		.atv {
			background-color: #3f6fe1;
			
			color: #ffffff;
			box-shadow: 0 2rpx 4rpx 0 rgba(67, 88, 143, 0.33);
			border-radius: 8rpx;
		}
	}
}
.thead {
	height: 46rpx;
	font-size: 24rpx;
	color: #737b95;
	padding-left: 28rpx;
	padding-right: 28rpx;
}
.text {
	white-space: nowrap;
}

.w30px {
	width: 50rpx;
}
</style>
