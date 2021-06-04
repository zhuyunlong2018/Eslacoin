<template>
	<view class="root">
		<uni-status-bar backgroundColor='#000E18' :fixed='true' />
		<view class="user-view">
			<view class="row">
			<!-- 用户信息 -->
				<view class="user-row flex">
					<view class="flex flex-start" @click="menuItemClick('/pages/user/user_detail')">
						<image class="user-img btn-1" :src="userInfo.HeadImage" ></image>
						<view class="user-info no-wrap">
							<view class="flex">
								<text class="user-name no-wrap">{{ userInfo.Nickname }}</text>
							</view>
							<view class="">
								<text class="user-id no-wrap">{{ userInfo.Account }}</text>
							</view>
						</view>
					</view>
					<LanguageChange :language.sync='language' :isChangeBg="true" />
				</view>
			</view>
		</view>
		
		<!-- 账户信息 -->
		<view class="account-info">
			<view class="flex">
				<text class="text font-12">{{ $t('user.user.account') }}</text>
				<view class="flex flex-start">
					<text class="btn btn-1" @click="openPage('/pages/user/buy_service')">{{ $t('user.user.status')[ServiceTime > 0 ? 0 : 1] }}</text>
				</view>
				
			</view>
			<view class="flex p-t20">
				<text class="number bold">{{ userInfo.Coin.toFixed(2) }}</text>
				<view class="text-right">
					<image class="image-service"
						v-if="userInfo.ServiceType == 0"
						@click="onMenuClick('/pages/user/buy_service')"
						src="@/static/service/mfb_2.png"></image>
					<image class="image-service"
						v-else-if="userInfo.ServiceType == 1"
						@click="onMenuClick('/pages/user/buy_service')"
						src="@/static/service/jcb_2.png"></image>
					<image class="image-service"
						v-else-if="userInfo.ServiceType == 2"
						@click="onMenuClick('/pages/user/buy_service')"
						src="@/static/service/gjb_2.png"></image>
					<image class="image-service"
						v-else-if="userInfo.ServiceType == 3"
						@click="onMenuClick('/pages/user/buy_service')"
						src="@/static/service/zyb_2.png"></image>
					<view class="text font-12" style="color: #F2ECEA" v-if="userInfo.ServiceType != 0">
						{{ $t('user.user.time') + timeValue }}
					</view>
				</view>
				
			</view>
			<view class="flex p-t30 m-t20">
				<view>
					<text class="cny">≈{{ userInfo.Cny }}</text>
					<text class="unit">/CNY</text>
				</view>
				<view class="flex">
					<view class="flex flex-start" style="color: #f59a4b;"
						@click="openPage('/pages/user/user_pay')">
						<text class="iconfont iconchongbi" style="font-size: 44rpx;padding-right: 6rpx;"></text>
						<text class="font-13">{{ $t('user.user.btnTexts')[0] }}</text>
					</view>
					<view class="flex flex-start m-l60" style="color: #08CBE1;"
						@click="openPage('/pages/user/fund_detail')">
						<text class="iconfont iconmingxi" style="font-size: 44rpx;padding-right: 6rpx;"></text>
						<text class="font-13">{{ $t('user.user.btnTexts')[1] }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="menu-view">
			<view class="w100p border-box item flex" v-for="(item, index) in menuList"
				:key="item.link + index" @click="menuItemClick(item.link)">
					<view class="letf">
						<text class="iconfont" :style="{color: item.color}" :class="item.icon"></text>
						<text class="title">{{ $t('user.user.menuList')[index] }}</text>
					</view>
					<view class="right">
						<text class="iconfont icongengduo icon"></text>
					</view>
			</view>
			<!-- 退出按钮 -->
			<view class="sign-out-btn" @click="menuItemClick('/pages/login/login')">{{ $t('user.user.signOut') }}</view>
			
		</view>
		
		<uni-loading :isShowLoading.sync='isShowLoading' :isTabBarHeight='true' :isNavHeight='false' />
	</view>
</template>


<script>
	import LanguageChange from '@/components/languageChange/languageChange.vue';
	export default {
		components: {
			LanguageChange
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				userInfo: {
					Nickname:'',
					Account:'',
					Coin: 0
				},
				timeValue: '',
				timeFn: null,
				timePrams: {
					ss: null,
					t: null,
					h: null,
					m: null,
					s: null
				},
				// 菜单列表
				menuList: [
					{
						title: 'API接入',
						link: '/pages/apikey/apikey',
						icon: 'iconapijieru',
						color: '#12C197'
					},{
						title: '邀请赚钱',
						link: '/pages/popularize/poster',
						icon: 'iconyaoqingzhuangqian',
						color: '#F59A4B'
					},{
						title: '帮助教程',
						link: '/pages/home/help',
						icon: 'iconbangzhujiaocheng',
						color: '#19BED8'
					},{
						title: '官方社群',
						link: '/pages/user/community',
						icon: 'iconguanfangshequn',
						color: '#04AC90'
					},{
						title: '官方公告',
						link: '/pages/user/notice',
						icon: 'iconguanfanggonggao',
						color: '#0A8DFF'
					},{
						title: '反馈意见',
						link: '/pages/user/feed_back',
						icon: 'iconfankuijianyi',
						color: '#0A8DFF'
					},{
						title: '关于我们',
						link: '/pages/user/about_us',
						icon: 'iconguanyuwomen',
						color: '#0A8DFF'
					},{
						title: '检查更新',
						link: '',
						icon: 'iconjianchagengxin',
						color: '#0A8DFF'
					}
				],
				ServiceTime: '',
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				// 语言
				language: '',
				isShowLoading: false
			}
		},

		onLoad() {
			this.isShowLoading = true;
		},
		onShow() {
			this.language = uni.getStorageSync('language');
			this.$store.dispatch('CHECK_LOGIN').then(res => {
				if (res) {
					this.getAccountInfo();
				}
			});
		},
		onHide() {
			this.isShowLoading = false;
			clearInterval(this.timeFn);
		},
		onUnload() {
			this.isShowLoading = false;
			clearInterval(this.timeFn);
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 菜单栏点击
			menuItemClick(url = '') {
				// 判断是否退出登录
				if (url.indexOf('login/login') !== -1) {
					console.log('退出登录')
					this.$store.dispatch('LOG_OUT').then(res => {
						uni.reLaunch({
							url
						})
					});
					return false;
				}
				uni.navigateTo({
					url
				})
			},
			openPage(url) {
				uni.navigateTo({
					url
				});
			},
			// 获取账户信息
			getAccountInfo () {
				this.CsHttp.post(this.ApiConfig.User + '/BSQueryUserInfoReq', {
					UserId: uni.getStorageSync('UserData').UserId,
				}).then(res => {
					console.log(res)
					this.userInfo = res.UserData;
					this.userInfo.Cny = (res.UserData.Coin * 6.7).toFixed(2);
					this.ServiceTime = res.UserData.ServiceTime;
					uni.setStorageSync('UserData', res.UserData);
					// 判断到期时间是否为 0
					if (this.ServiceTime <= 0 || !this.ServiceTime) {
						this.timeValue = this.$t('user.user.status')[2];
					} else {
						this.handleTime(this.ServiceTime);	
					}
					this.$nextTick(() => {
						this.isShowLoading = false;
					})
				})
			},
			// 处理倒计时
			handleTime (time = '2022/3/23 08:08:08') {
				this.timePrams.ss = time - parseInt(new Date().getTime() / 1000);
				if (this.timePrams.ss <= 0) {
					this.timeValue = this.$t('user.user.status')[3];
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
						this.timeValue = this.$t('user.user.status')[3];
						clearInterval(this.timeFn);
					}
				}, 1000)
			}
			
		},

	}
</script>
<style>
	page {
		background-color: #000E18;
	}
</style>
<style lang="scss">
	.regular, view, text {
		font-family: 'regular';
	}
	.user-view {
		height: 88rpx;
		padding: 20rpx 40rpx 15rpx 30rpx;
	}
	.row {
		border-radius: 14rpx;
	}
	.user-row {
		.user-img {
			width: 75rpx;
			height: 75rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			&::after {
				border-radius: 50%;
				border: 1px solid rgba(206, 211, 233, 0.28);
			}
		}
		.user-info {
			width: calc(100% - 85rpx);
		}
		.user-name {
			font-size: 30rpx;
			color: #ffffff;
			
		}
		.user-id {
			font-size: 24rpx;
			color: #ffffff;
		}
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
	
	.account-info {
		position: relative;
		z-index: 9;
		background-image: url(../../static/user/wd_zy_bgdi.png);
		background-repeat: no-repeat;
		background-size: cover;
		height: 258rpx;
		margin: 0 20rpx 20rpx;
		border-radius: 20rpx;
		padding: 30rpx 30rpx 20rpx;
		.text {
			color: $uni-text-color;
		}
		.image-service {
			width: 104rpx;
			height: 37rpx;
		}
		.btn {
			height: 54rpx;
			line-height: 54rpx;
			width: 160rpx;
			text-align: center;
			border-radius: 8rpx;
			background-color: rgba(255, 255, 255, 0.03);
			font-size: 28rpx;
			color: #F2ECEA;
			&::after {
				border: 1px solid $uni-text-color;
			}
		}
		.number {
			font-size: 54rpx;
			color: #ffffff;
		}
		.cny {
			font-size: 36rpx;
			color: $uni-text-color;
		}
		.unit {
			font-size: 24rpx;
			color: $uni-text-color;
		}
		image {
			height: 44rpx;
			width: 44rpx;
			margin-right: 6rpx;
		}
	}
	
	.menu-view {
		padding: 0 28rpx 20rpx;
		}

		.item {
			background-color: #0D1A2C;
			border-radius: 8rpx;
			height: 90rpx;
			margin-top: 10rpx;
			padding-right: 16rpx;
			.letf {
				display: flex;
				align-items: center;

				.img {
					width: 72rpx;
					height: 72rpx;
				}

				.title {
					margin-left: 8rpx;
					font-size: 28rpx;
					color: $uni-text-color;
				}
			}
			.iconfont {
				font-size: 70rpx;
			}
			.icon {
				font-size: 20rpx;
				color: $uni-text-color;
			}
		}

	.sign-out-btn {
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background-color: #20324a;
		border-radius: 8rpx;
		color: $uni-text-color;
		width: 580rpx;
		font-size: 32rpx;
		margin: 80rpx auto 40rpx;
	}
</style>
