<template>
	<view class="root">
		<v-nav-bar title="选择交易对" :isRightImg="false" />
		<view class="title-view">
			<image class="" :src="'../../static/icon/'+EchannelLogo +'.png'" mode=""></image>
			<text class="font-15 color-light p-l10">{{EchannelName}}平台币种</text>
		</view>
		<view class="search-view flex ">
			<view class="search-view-small flex flex-start m-l30">
				<text class="iconfont iconsousuo color-dark p-l10"></text>
				<input type="text" class="color-light" value="" v-model="SearchData" placeholder-class="color-dark" placeholder="请输入币代码" />
			</view>
			<view class="search">搜索</view>
		</view>
		<view class="center-view flex flex-column">
			<view class="item flex" v-for="(item, index) in SymbolList" :key="item.Symbol" @click="onSymbolClick(item)">
				<view class="flex">
					<image :src="'../../static/coin/'+getCoinLogo(item.Symbol)+'.png'" mode=""></image>
					<text class="font-18 font-bold color-light">{{item.Symbol.replace("USDT","")}}</text>
					<text class="font-11 color-dark">/USDT</text>
				</view>
				<view class="choose">选择</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				TaskType: 1,
				Echannel: 1,
				SearchData: '',
				BaseArr:[{
					Symbol: 'BTCUSDT',
					BjType: 'BTC',
					JcType: 'USDT'
				}],
				SymbolList: [],
			}
		},
		onLoad(option) {
			if (option.Echannel) {
				console.log('symbol ONLOAD 收到平台', option.Echannel)
				this.Echannel = parseInt(option.Echannel)
			}
			if (option.TaskType) {
				console.log('symbol ONLOAD 收到玩法类型', option.TaskType)
				this.TaskType = option.TaskType
			}
			this.sendQuerySymbolListReq()
		},
		computed: {
			//平台名字
			EchannelName() {
				switch (this.Echannel) {
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
				switch (this.Echannel) {
					case 1:
						return 'qh_hb_logo';
					case 2:
						return 'qh_ba_logo';
					case 3:
						return 'qh_bte_logo';
					default:
						return '错误'
				}
			}
		},

		watch: {
			SearchData: function(val, oldVal) {
				console.log('侦听搜索数据变化', val, oldVal)
				this.searchSymbol()
			}
		},
		//*******************************************************************
		// 显示
		//*******************************************************************
		onShow() {
			//全局变量中获取交易对 
			//this.SymbolList = getApp().globalData.SymbolList
			//this.SymbolList = this.CsData.SymbolList
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//币种logo
			getCoinLogo(Symbol) {
				let coin = Symbol.replace("USDT", "").toLowerCase();
				return  this.CsData.CoinLogArr.indexOf(coin)==-1?'0':coin
			},
			onSymbolClick(item) {
				console.log('选择的交易对:' + item.Symbol)
				uni.$emit('Sympol', item)
				uni.navigateBack({})
			},
			searchSymbol(){
				let search = this.SearchData.toUpperCase()
				if(search.trim()==''){
					this.SymbolList = this.BaseArr.slice(0,15);
					return;
				}
				let arr = this.BaseArr
				let res = arr.filter(function(item,index){
					if(item.Symbol.indexOf(search) != -1){
						return item
					}
				})
				this.SymbolList = res
			},
			//查询交易对
			sendQuerySymbolListReq() {
				this.loading = true;
				let url = this.ApiConfig.DataUrl + '/BSGetHUSymbolListReq'
				if (this.TaskType < 3) {
					url = this.ApiConfig.DataUrl + '/BSGetXHSymbolListReq'
				}
				let data = {
					Echannel: this.Echannel
				}
				this.CsHttp.post(url, data, true).then(ackMsg => {
					console.log('收到获取交易对列表的回复')
					if (this.TaskType < 3) {
						this.BaseArr = ackMsg.XHSymbolDataList;
						this.SymbolList = this.BaseArr.slice(0,15);
					} else {
						this.BaseArr = ackMsg.HUSymbolDataList;
						this.SymbolList = this.BaseArr.slice(0,15);
					}
					this.loading = false;
				}).catch(err => {
					this.loading = false;
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "task.scss";

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.placeholder {
		font-size: 28rpx;
		color: #6f87a4;
	}

	.title-view {
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		margin-top: 20rpx;
		height: 77rpx;
		background-color: #20324a;

		image {
			width: 61rpx;
			height: 61rpx;
			border-radius: 50%;
		}
	}

	.search-view {
		width: 750rpx;
		height: 88rpx;
		background-color: #1a253a;

		&-small {
			width: 524rpx;
			height: 60rpx;
			background-color: #263953;
			border-radius: 6rpx;

			input {
				font-size: 30rpx;
				text-align: left;
				padding-left: 10rpx;
				line-height: 60rpx;
			}
		}

		.search {
			width: 140rpx;
			height: 60rpx;
			margin-right: 28rpx;
			background-color: #2aa3b1;
			border-radius: 6rpx;
			text-align: center;
			font-size: 28rpx;
			line-height: 60rpx;
			letter-spacing: 0rpx;
			color: #ffffff;
		}
	}

	.center-view {
		width: 100%;

		.item {
			width: 722rpx;
			height: 102rpx;
			background-color: #1a253a;
			border-radius: 6px;
			margin-top: 12rpx;

			image {
				width: 64rpx;
				height: 64rpx;
				margin-left: 19rpx;
				margin-right: 10rpx;
			}

			.choose {
				margin-right: 14rpx;
				width: 120rpx;
				height: 40rpx;
				background-color: #04ac90;
				border-radius: 6rpx;
				font-size: 24rpx;
				line-height: 40rpx;
						text-align: center;
				color: #ffffff;
			}
		}
	}
</style>
