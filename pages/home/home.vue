<template>
	<view class="root">
		<uni-status-bar backgroundColor='#091321' :fixed='true' />
		
		<!-- 顶部按钮 -->
		<view class="status-view flex" :style="{top: `${statusBarHeight}px`}">
			<view class="left flex flex-start">
				<image class="img"  @click="onMenuClick('/pages/user/user_detail')" :src="imgUrl"></image>
				<image class="image-service" v-if="ServiceType == 0" @click="onMenuClick('/pages/user/buy_service')" src="@/static/service/mfb_2.png"></image>
				<image class="image-service" v-else-if="ServiceType == 1" @click="onMenuClick('/pages/user/buy_service')" src="@/static/service/jcb_2.png"></image>
				<image class="image-service" v-else-if="ServiceType == 2" @click="onMenuClick('/pages/user/buy_service')" src="@/static/service/gjb_2.png"></image>
				<image class="image-service" v-else-if="ServiceType == 3" @click="onMenuClick('/pages/user/buy_service')" src="@/static/service/zyb_2.png"></image>
				<text class="status" v-if="ServiceType != 0" @click="onMenuClick('/pages/user/buy_service')"> {{ timeValue }} </text>
			</view>
			<view class="right flex flex-start">
				<LanguageChange :language.sync='language' />
			</view>
		</view>
		
		<!-- 占位符 -->
		<view class="status-view-placeholder"></view>
		
		<!-- 下拉动画 -->
		<mescroll-body :ref="'mescrollRef_'" @init="mescrollInit"@down="downCallback" :down="downOption" :up="upOption">
		
		<!-- 广告图 -->
		<view class="banner-view">
			<swiper class="swiper" :autoplay="true" indicator-color='#4f567d'indicator-active-color='#ced3e9':interval="3000" :circular='true' :indicator-dots='true'>
				<swiper-item class="swiper-item">
					<image class="banner" src="@/static/home/sy_banner.png"></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image class="banner" src="@/static/home/sy_banner_2.png"></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image class="banner" src="@/static/home/sy_banner_3.png"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 公告栏 -->
		<view class="notice-view flex">
			<view class="left flex flex-start">
				<image class="icon" src="@/static/icon/sy_gg.png"></image>
				<swiper class="swiper" :autoplay="true" :interval="3000" :vertical='true'>
					<swiper-item class="swiper-item" v-for="(item, index) in noticeList" @click="onMenuClick('/pages/user/notice_detail', item)" :key="'notice_' + index">
						<text class="text">{{ item.Title + '：' + item.Text }}</text>
					</swiper-item>
				</swiper>            
			</view>
			<image class="icon" @click="onMenuClick('/pages/user/notice')" src="@/static/icon/sy_gd.png"></image>
		</view>
		
		<!-- 币涨幅信息 -->
		<view class="coin-info">
			<view class="flex info btn-t-2" v-show="coinRiseInfo.DayProfit">
				<view class="w30p text-center">
					<view class="label">
						<text class="bold">{{ $t('common.date')[0] }}</text>
						<text class="unit bold">/USDT</text>
					</view>
					<view class="number rise bold-8 p-t6" v-if="coinRiseInfo.DayProfit >= 0">+{{ formatPrice(coinRiseInfo.DayProfit) }}</view>
					<view class="number fall bold-8 p-t6" v-else>{{ formatPrice(coinRiseInfo.DayProfit) }}</view>
					<view class="p-t6 flex flex-center" v-if="coinRiseInfo.DayProfit >= 0">
						<text class="up"></text>
						<text class="font-13 rise">+{{ coinRiseInfo.DayProfitRatio }}%</text>
					</view>
					<view class="p-t6 flex flex-center" v-else>
						<text class="down"></text>
						<text class="font-13 fall">{{ coinRiseInfo.DayProfitRatio }}%</text>
					</view>
				</view>
				<view class="w30p text-center">
					<view class="label">
						<text class="bold">{{ $t('common.date')[1] }}</text>
						<text class="unit bold">/USDT</text>
					</view>
					<view class="number bold-8 rise p-t6" v-if="coinRiseInfo.WeekProfit >= 0">+{{ formatPrice(coinRiseInfo.WeekProfit) }}</view>
					<view class="number bold-8 fall p-t6" v-else>{{ formatPrice(coinRiseInfo.WeekProfit) }}</view>
					<view class="p-t6 flex flex-center" v-if="coinRiseInfo.WeekProfit >= 0">
						<text class="up"></text>
						<text class="font-13 rise">+{{ coinRiseInfo.WeekProfitRatio }}%</text>
					</view>
					<view class="p-t6 flex flex-center" v-else>
						<text class="down"></text>
						<text class="font-13 fall">{{ coinRiseInfo.WeekProfitRatio }}%</text>
					</view>
				</view>
				<view class="w30p text-center">
					<view class="label">
						<text class=" bold">{{ $t('common.date')[2] }}</text>
						<text class="unit bold">/USDT</text>
					</view>
					<view class="number bold-8 rise p-t6" v-if="coinRiseInfo.MonthProfit >= 0">+{{ formatPrice(coinRiseInfo.MonthProfit) }}</view>
					<view class="number bold-8 fall p-t6" v-else>{{ formatPrice(coinRiseInfo.MonthProfit) }}</view>
					<view class="p-t6 flex flex-center" v-if="coinRiseInfo.MonthProfit >= 0">
						<text class="up"></text>
						<text class="font-13  rise">+{{ coinRiseInfo.MonthProfitRatio }}%</text>
					</view>
					<view class="p-t6 flex flex-center" v-else>
						<text class="down"></text>
						<text class="font-13 fall">{{ coinRiseInfo.MonthProfitRatio }}%</text>
					</view>
				</view>
			</view>
			<view class="flex col btn-t-2">
				<view class="left font-12">
					<text class="dot"></text>
					{{ $t('home.home.texts')[0] }}：
					<text class="rise font-16 bold">{{ coinRiseInfo.TotalRobotCount }}</text>
					<text class="unit">/{{ $t('common.unit')[0] }}</text>
				</view>
				<view class="right font-12">
					<text class="dot"></text>
					{{ $t('home.home.texts')[1] }}：
					<text class="rise font-16 bold">{{ coinRiseInfo.TotalProfit }}</text>
					<text class="unit">/USDT</text>
				</view>
			</view>
		</view>
			
		<!-- 菜单列表 -->
		<view class="menu-view flex m-t20">
			<view class="icon-view left flex flex-wrap">
				<view class="icon-item p-b20 flex-center flex flex-wrap" @click="onMenuClick(item.link)"
					v-for="(item, index) in menuList" :key="index + '_home'">
					<!-- <view> -->
						<image class="img" :src="item.imgUrl"></image>
					<!-- </view> -->
					<view class="w100p p-t6 flex flex-center">
						<text class="font-13">{{ $t('home.home.menuListTexts')[index] }}</text>
					</view>
				</view>
			</view>
			<view class="right btn-t-1" @click="onMenuClick('/pages/task/edit')">
				<image class="image" src="../../static/home/sy_tjdt.png" mode=""></image>
				<view class="flex flex-center" style="margin-top: -30rpx;">
					<image class="icon" src="../../static/icon/sy_tj.png" mode=""></image>
					<text>{{ $t('home.home.menuListTexts')[6] }}</text>
				</view>
			</view>
		</view>
			
		<view class="content">
			<!-- tab 栏 -->
			<view class="tab-bar flex">
				<text class="tab-bar-item bold-8" :class="{actived: item.type == activedType}"
					@click="onClickTab(item.type, index)"
					v-for="(item, index) in tabBarList"
					:key="'quotations_' + index">{{ $t('home.home.tabListTexts')[index] }}</text>
			</view>
			<view class=" btn-t-2" style="height: 4rpx;"></view>
			<view class="flex head-col">
				<text class="w30px text-center">{{ $t('home.home.listHeader')[0] }}</text>
				<text class="w p-l30">{{ $t('home.home.listHeader')[1] }}</text>
				<text class="w150rpx text-center">{{ $t('home.home.listHeader')[2] }}</text>
				<text class="w160rpx text-right">{{ $t('home.home.listHeader')[3] }}</text>
			</view>
			<!-- 排行榜列表 -->
			<view class="" style="transition: all .5s;overflow: visible;white-space: nowrap;width: 100%;" :style="{transform: transformXx}" >
				<view class="ranking-list" style="display: inline-block;width: 100%;" v-for="(vals, idx) in tabBarList" :key="'quotations_list_' + idx">
					<view class="ranking-item flex"  :key="'ranking_' + index" :class="{'btn-t-2': index > 0}" v-for="(item, index) in rankRobotData[vals.key]">
						<view class="text w30px text-center">
							<text v-if="item.Sort == 1" class="iconfont iconyanhuangguan1" style="color: #EECC44;"></text>
							<text v-if="item.Sort == 2" class="iconfont iconyanhuangguan2" style="color: #59BDF8;"></text>
							<text v-if="item.Sort == 3" class="iconfont iconyanhuangguan3" style="color: #D27D6A;"></text>
							<text v-if="item.Sort > 3">{{ item.Sort }}</text>
						</view>
						<view class="flex flex-start w">
							<image :src="item.HeadImage" class="img" mode=""></image>
							<text class="text name" :class="index == 0 ? 'yellow' : ''">{{ item.TaskName }}</text>
						</view>
						<view class="w150rpx text-center">
							<view class="color-main font-13 flex flex-center">
								<text class="dot" :style="{background: tradeType[item.TaskType - 1].color}"></text>
								<text>{{ tradeType[item.TaskType - 1].name }}</text>
							</view>
							<view class="text symbol">{{ item.Symbol }}</view>
						</view>
						<view class="font-14 number bold text-right w160rpx" v-if="item.ProfitRatio >= 0">+{{ item.ProfitRatio }}%</view>
						<view class="font-14 number bold red text-right w160rpx" v-else>{{ item.ProfitRatio }}%</view>
					</view>
				</view>
			</view>
		</view>
			
		</mescroll-body>
		<uni-loading :isShowLoading.sync='isShowLoading' :isTabBarHeight='true' :isNavHeight='false' />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/uni-scroll/mescroll-uni/mescroll-mixins.js";
	import LanguageChange from '@/components/languageChange/languageChange.vue';
	import MescrollBody from "@/components/uni-scroll/mescroll-body/mescroll-body.vue";
	export default {
		components: {
			LanguageChange,
			MescrollBody
		},
		mixins: [MescrollMixin],
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				downOption: {
					auto: false
				},
				upOption: {
					use: false
				},
				imgUrl: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				// 菜单列表
				menuList: [
					{
						imgUrl: '../../static/home/sy_yqjl_icon.png',
						title: '邀请奖励',
						id: 1,
						link: '/pages/popularize/team'
					},
					{
						imgUrl: '../../static/home/sy_czxf_icon.png',
						title: '充值续费',
						id: 2,
						link: '/pages/user/buy_service'
					},
					{
						imgUrl: '../../static/home/sy_lxkf_icon.png',
						title: '联系客服',
						id: 3,
						link: '/pages/user/customer_service'
					},
					{
						imgUrl: '../../static/home/sy_api_icon.png',
						title: 'API管理',
						id: 4,
						link: '/pages/apikey/apikey'
					},
					{
						imgUrl: '../../static/home/sy_bzjc_icon.png',
						title: '帮助教程',
						id: 5,
						link: '/pages/home/help'
					},
					{
						imgUrl: '../../static/home/sy_gfsq_icon.png',
						title: '官方社区',
						id: 5,
						link: '/pages/user/community'
					},
				],
				tabBarList: [
					{
						type: 1,
						name: '本周排行榜',
						key: 'week'
					},
					{
						type: 2,
						name: '总排行榜',
						key: 'all'
					}
				],
				activedType: 1,
				// 币涨幅信息
				coinRiseInfo: {},
				// 语言
				language: '',
				// 排行榜数据
				rankRobotData: {
					week: [],
					all: []
				},
				// 公告列表
				noticeList: [],
				timeValue: '',
				timeFn: null,
				timePrams: {
					ss: null,
					t: null,
					h: null,
					m: null,
					s: null
				},
				current: 0,
				// 交易类型
				tradeType: [
					{
						name: '现货DCA',
						color: '#ff8b26',
						taskType: 1
					},
					{
						name: '现货网格',
						color: '#0de5c1',
						taskType: 2
					},
					{
						name: '合约多空',
						color: '#2cc5ff',
						taskType: 3
					},
					{
						name: '合约网格',
						color: '#fc355a',
						taskType: 4
					},
					{
						name: '合约DCA',
						color: '#ea2cff',
						taskType: 5
					},
				],
				// 是否显示自定义 loading
				isShowLoading: false,
				ServiceType: 0,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				timeoutFn: null,
				loadingData: false
			}
		},
		computed: {
			transformXx(){
			    let currentTab = this.current;
			    return `translate3d(-${currentTab*100}%, 0px, 0px)`
			}
		},
		onLoad() {
			this.isShowLoading = true;
		},
		onShow() {
			this.handleTime();
			this.getCoinRiseInfo();
			this.getRankRobotData();
			this.getNoticeList();
			this.language = uni.getStorageSync('language');
			this.imgUrl = uni.getStorageSync('UserData').HeadImage || '../../static/home/sy_logo.png';
			this.ServiceType = uni.getStorageSync('UserData').ServiceType;
			if (this.timeoutFn) {
				clearInterval(this.timeoutFn);
			}
			this.timeoutFn = setInterval(() => {
				if (this.loadingData) return false;
				this.loadingData = true;
				this.getCoinRiseInfo();
			}, 3000);
			setTimeout(() => {
			    this.isShowLoading = false;
			}, 2000);
		},
		onHide() {
			this.isShowLoading = false;
			if (this.mescroll) {
				this.mescroll.endSuccess();
			}
			if (this.timeoutFn) {
				clearInterval(this.timeoutFn);
			}
			clearInterval(this.timeFn);
		},
		onUnload() {
			this.isShowLoading = false;
			if (this.timeoutFn) {
				clearInterval(this.timeoutFn);
			}
			clearInterval(this.timeFn);
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 点击tab栏
			onClickTab(type, val) {
				this.activedType = type;
				this.current = val;
				this.getRankRobotData();
			},
			downCallback () {
				this.getCoinRiseInfo();
				this.getRankRobotData();
				this.getNoticeList();
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			// 点击菜单
			onMenuClick(url, item) {
				// 跳转页面之前检查用户是否登录
				this.$store.dispatch('CHECK_LOGIN').then(res => {
					if (res) {
						if (item) {
							uni.setStorageSync('noticeDetail', item);
						}
						uni.navigateTo({
							url
						})
					}
				})
			},
			
			// 获取币近期涨幅信息
			async getCoinRiseInfo () {
				let res = await this.CsHttp.post( this.ApiConfig.User + '/BSGetServerRecordInfoReq', {});
				this.loadingData = false;
				this.coinRiseInfo = res;
			},
			// 获取排行榜数据
			getRankRobotData() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetRankRobotListReq', {
					RankType: this.activedType
				}).then(res => {
					this.rankRobotData[this.activedType == 1 ? 'week' : 'all'] = [...res.RankRobotDataList];
					this.mescroll.endSuccess();
				})
			},
			// 获取公告列表
			async getNoticeList() {
				let res = await this.CsHttp.post(this.ApiConfig.User + '/BSGetOfficialNoticeReq', {});
				this.noticeList = res.OfficialNotices;
			},
			// 处理倒计时
			handleTime () {
				let time = uni.getStorageSync('UserData').ServiceTime;
				if (!time) {
					this.timeValue = this.$t('home.home.useStstus')[0];
					return false;
				}
				this.timePrams.ss = time - parseInt(new Date().getTime() / 1000);
				if (this.timePrams.ss <= 0) {
					this.timeValue = this.$t('home.home.useStstus')[0];
					return false;
				}
				this.timeFn = setInterval(() => {
					this.timePrams.ss--;
					this.timePrams.t = parseInt( this.timePrams.ss / 60 / 60 / 24 );
					this.timePrams.h = parseInt( (this.timePrams.ss - this.timePrams.t * 3600 * 24) / 3600 );
					this.timePrams.m = parseInt((this.timePrams.ss - this.timePrams.t * 3600 * 24 - this.timePrams.h * 3600) / 60 );
					this.timePrams.s = parseInt( this.timePrams.ss % 60 );
					this.timeValue = this.timePrams.t + this.$t('common.times')[2] + (this.timePrams.h > 9 ? this.timePrams.h : '0' + this.timePrams.h)
									+ this.$t('common.times')[1] + (this.timePrams.m > 9 ? this.timePrams.m : '0' + this.timePrams.m) 
									+ this.$t('common.times')[0] + (this.timePrams.s > 9 ? this.timePrams.s : '0' + this.timePrams.s) + this.$t('common.times')[5];
					if(this.timePrams.ss == 0) {
						this.timeValue = this.$t('home.home.useStstus')[0];
						clearInterval(this.timeFn);
					}
				}, 1000)
			},
			// 改变格式
			formatPrice(num) {
				if (!num || num == 0) {
					return 0;
				} else {
					num = num.toString().split('.')
					    let arr = num[0].split('').reverse();
					    let res = [];
					    for (var i = 0; i < arr.length; i++) {
					        if (i%3 == 0 && i!= 0){
					            res.push(',');
					        }
					        res.push(arr[i]);
					    }
					    res.reverse();
					    if (num[1]){
					        res = res.join('').concat('.'+num[1]);
					    }else{
					        res = res.join('')
					    }
					return res;
					
				}
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #000E18;
	}
	.root {
		overflow: hidden;
	}
	.p-t6 {
		padding-top: 6rpx;
	}
	.blue {
		color: #166aff;
	}
	.status-view {
		background-color: #091321;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 99;
		padding-left: 28rpx;
		padding-right: 28rpx;
		height: 88rpx;
		.img {
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
		}
		.image-service {
			width: 125rpx;
			height: 44rpx;
			margin-left: 10rpx;
		}
		.status {
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			padding: 0 14rpx;
			background-color: #2a3450;
			border-radius: 6rpx;
			font-size: 24rpx;
			color: $uni-text-color-grey;
			margin-left: 10rpx;
		}
		.icon {
			width: 50rpx;
			margin-right: 10rpx;
			height: 50rpx;
		}
	}
	.status-view-placeholder {
		height: 88rpx;
	}
	.sekuai {
		width: 8rpx;
		padding-left: 4rpx;
		background-color: #166aff;
		border-radius: 50%;
		margin-left: 14rpx;
	}
	.line {
		width: 4rpx;
		height: 40rpx;
		border-radius: 0;
	}
	.banner-view {
		background-color: #0D1A2C;
	}
	.swiper {
		height: 280rpx;
		padding: 0 28rpx;
	}
	.banner {
		width: 100%;
		box-sizing: border-box;
		height: 277rpx;
		box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.16);
	}
	// 系统公告
	.notice-view {
		height: 60rpx;
		background-color: #0D1A2C;
		padding: 0 20rpx;
		.text {
			font-size: 24rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: $uni-text-color-grey;
		}
		.icon {
			width: 50rpx;
			height: 50rpx;
		}
		.left {
			width: calc(100% - 110rpx);
		}
		.swiper {
			height: 50rpx;
			width: calc(100% - 50rpx);
		}
		.swiper-item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
	// 币涨幅信息
	.coin-info {
		padding: 2rpx 2rpx 0rpx;
		height: 240rpx;
		background-color: #0D1A2C;
		.info {
			padding: 20rpx 2rpx;
		}
		.label {
			color: #88A1BF;
			font-size: 28rpx;
		}
		.unit {
			font-size: 22rpx;
			color: $uni-text-color-grey;
		}
		.rise {
			color: #08E17B;
		}
		.number {
			font-size: 34rpx;
		}
		.fall {
			color: $uni-text-color-red;
		}
		.up {
			border-bottom: 10rpx solid #08E17B;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			border-radius: 8rpx;
		}
		.down {
			border-top: 10rpx solid $uni-text-color-red;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			border-radius: 8rpx;
		}
		.col {
			padding: 10rpx 16rpx;
			color: #F2ECEA;
			font-size: 28rpx;
			.unit {
				color: $uni-text-color-grey;
			}
			.rise {
				color: #0A8DFF;
			}
			.dot {
				display: inline-block;
				width: 8rpx;
				height: 8rpx;
				margin-bottom: 6rpx;
				margin-right: 6rpx;
				background-color: #F59A4B;
				border-radius: 50%;
			}
		}
	}
	// 菜单列表
	.menu-view {
		margin: 20rpx 0 0;
		background-color: #0D1A2C;
		height: 290rpx;
		text {
			color: #88A1BF;
			font-size: 24rpx;
		}
		.right {
			width: 240rpx;
			height: 100%;
			text-align: center;
			box-sizing: border-box;
			.image {
				width: 200rpx;
				height: 240rpx;
			}
			.icon {
				height: 44rpx;
				width: 44rpx;
			}
		}
		.btn-t-1::after {
			border: none;
			border-left: 2px dashed #2e3951;
			opacity: 0.58;
			height: 190%;
			top: -45%;
		}
		.left {
			width: calc(100% - 240rpx);
		}
		.icon-item {
			text-align: center;
			padding: 15rpx 0;
			width: 33%;
			.img {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
	
	.content {
		margin-top: 20rpx;
		background-color: #0D1A2C;
		.head-col {
			font-size: 24rpx;
			color: #475E7B;
			padding: 0 26rpx 0 30rpx;
			background-color: #0D1A2C;
			height: 40rpx;
		}
		.ranking-list {
			box-sizing: border-box;
			padding: 0 26rpx 0 30rpx;
		}
		.ranking-item {
			height: 124rpx;
			
			.text {
				color: #6F87A4;
				font-size: 28rpx;
			}
			.img {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 6rpx;
			}
			.number {
				color: #ffffff;
				display: inline-block;
				height: 66rpx;
				line-height: 66rpx;
				text-align: center;
				width: 160rpx;
				background-color: #04ac90;
				border-radius: 8rpx;
			}
			.red {
				background-color: #d14b64;
			}
			.name {
				font-size: 26rpx !important;
				width: calc(100% - 60rpx);
				white-space: nowrap;
				color: $uni-text-color;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.yellow {
				color: #BEA955;
			}
			.dot {
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				margin-right: 6rpx;
				background: #12C1A4;
			}
			.symbol {
				font-size: 22rpx;
			}
		}
		.w30px {
			width: 60rpx;
			white-space: nowrap;
			margin-right: 6rpx;
		}
		.w130rpx {
			width: 180rpx;
			white-space: nowrap;
		}
		.w160rpx {
			width: 160rpx;
		}
		.w150rpx {
			width: 240rpx;
			padding-right: 60rpx;
			box-sizing: border-box;
			white-space: nowrap;
		}
		.w {
			white-space: nowrap;
			width: calc(100% - 480rpx);
			box-sizing: border-box;
		}
	}
	.tab-bar {
		.tab-bar-item {
			width: 50%;
			font-size: 32rpx;
			text-align: center;
			white-space: nowrap;
			color: $uni-text-color-grey;
			height: 76rpx;
			line-height: 76rpx;
		}
		.actived {
			font-size: 32rpx;
			color: #14E1F4;
		}
	}
	
	.btn-t-2::after {
		border-top: 1px solid #1a2c46;
	}
	.btn-t-2::before {
		border-top: 1px solid #030810;
	}
</style>
