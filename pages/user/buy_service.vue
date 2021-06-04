<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.buyService.navTitle')"
			:isServiceImg="true"
		/>
		<!-- 选择栏 -->
		<view class="select-service">
			<view class="value flex">
				<view v-for="(item, index) in timeList"
					:key="item.type + '_' + index"
					:class="params.ServiceTimeType == item.type ? 'actived' : ''"
					@click="btnClick(item)"
					class="btn">{{ $t('user.buyService.date')[index] }}</view>
			</view>
		</view>
		<view class="content" :style="{height: `calc(100vh - 275rpx - ${statusBarHeight + 44}px)`}">
			<view class="version-list" :class="language != 'en' ? 'no-wrap' : ''">
				<!-- 专业版 -->
				<view class="item"
					@click="selectVersion(3)"
					:class="activedVersion == 3 ? 'actived-zyb btn-1' : ''">
					<view class="title-col p-lr14 flex">
						<image class="img" v-show="activedVersion != 3" src="@/static/service/zyb_2.png"></image>
						<image class="img" v-show="activedVersion == 3" src="@/static/service/zyb_1.png"></image>
						<view class="text">
							<view class="flex flex-start">
								<view v-if="price.majorBefore && price.majorBefore != price.majorReal" class="no-price p-lr4">
									<text class="font-14 bold">{{ price.majorBefore }}</text>
									<text class="font-8">/USDT</text>
								</view>
								<view class="price">
									<text class="font-23 bold">{{ price.majorReal }}</text>
									<text class="font-11">/USDT</text>
								</view>
							</view>
						</view>
					</view>
					<view class="text-col btn-t-2 flex">
						<text class="font-13">{{ $t('user.buyService.texts')[0] }}：</text>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[1] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[2] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[3] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[4] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[5] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[6] }}</text>
						</view>
					</view>
				</view>
				<!-- 高级版 -->
				<view class="item m-t20"
					@click="selectVersion(2)"
					:class="activedVersion == 2 ? 'actived-gjb btn-1' : ''">
					<view class="title-col p-lr14 flex">
						<image class="img" v-show="activedVersion != 2" src="@/static/service/gjb_2.png"></image>
						<image class="img" v-show="activedVersion == 2" src="@/static/service/gjb_1.png"></image>
						<view>
							<view class="flex flex-start">
								<view v-if="price.highBefore && price.highBefore != price.highReal" class="no-price p-lr4">
									<text class="font-14 bold">{{ price.highBefore }}</text>
									<text class="font-8">/USDT</text>
								</view>
								<view class="price">
									<text class="font-23 bold">{{ price.highReal }}</text>
									<text class="font-11">/USDT</text>
								</view>
							</view>
						</view>
					</view>
					<view class="text-col btn-t-2 flex">
						<text class="font-13">{{ $t('user.buyService.texts')[7] }}：</text>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[8] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[9] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[4] }}</text>
						</view>
					</view>
				</view>
				<!-- 基础版 -->
				<view class="item m-t20"
					@click="selectVersion(1)"
					:class="activedVersion == 1 ? 'actived-jcb btn-1' : ''">
					<view class="title-col p-lr14 flex">
						<image class="img" v-show="activedVersion != 1" src="@/static/service/jcb_2.png"></image>
						<image class="img" v-show="activedVersion == 1" src="@/static/service/jcb_1.png"></image>
						<view>
							<view class="flex flex-start">
								<view v-if="price.baseBefore && price.baseBefore != price.baseBefore" class="no-price p-lr4">
									<text class="font-14 bold">{{ price.baseBefore }}</text>
									<text class="font-8">/USDT</text>
								</view>
								<view class="price">
									<text class="font-23 bold">{{ price.baseBefore }}</text>
									<text class="font-11">/USDT</text>
								</view>
							</view>
						</view>
					</view>
					<view class="text-col btn-t-2 flex">
						<text class="font-13">{{ $t('user.buyService.texts')[10] }}：</text>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[11] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[12] }}</text>
						</view>
					</view>
					<view class="text-col flex align-start flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[13] }}</text>
						</view>
					</view>
				</view>
				<!-- 免费版 -->
				<view class="item m-t20" 
					@click="selectVersion(0)"
					:class="activedVersion == 0 ? 'actived-mfb btn-1' : ''">
					<view class="title-col p-lr14 flex">
						<image class="img" v-show="activedVersion != 0" src="@/static/service/mfb_2.png"></image>
						<image class="img" v-show="activedVersion == 0" src="@/static/service/mfb_1.png"></image>
						<view>
							<view class="price">
								<text class="font-23 bold">0</text>
								<text class="font-11">/USDT</text>
							</view>
						</view>
					</view>
					<view class="text-col btn-t-2 flex">
						<text class="font-13">{{ $t('user.buyService.texts')[14] }}：</text>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[15] }}</text>
						</view>
					</view>
					<view class="text-col flex flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[16] }}</text>
						</view>
					</view>
					<view class="text-col flex align-start flex-start">
						<view class="left">
							<text class="iconfont icon_gou icon"></text>
						</view>
						<view class="right">
							<text class="text">{{ $t('user.buyService.texts')[17] }}</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="btn-col-placeholder"></view>
		<view class="btn-col">
			<uni-botton 
				backgroundColor="#F5B14B"
				:btnText="$t('user.buyService.btns')[0]" :marginTop="0" @click="payBtn"></uni-botton>
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
				// 用户当前版本
				serviceVersion: null,
				params: {
					UserId: uni.getStorageSync('UserData').UserId,
					ServiceType: 3,  // 1基础,2高级,3专业
					ServiceTimeType: 1  // 1 - 1个月  2 - 季度  3 - 半年  4 - 1年
				},
				// 版本列表
				versionList: [],
				// 支付金额
				payMoney: 0,
				// 时长列表
				timeList: [
					{
						type: 1,
						text: '1个月',
						money: 50
					},
					{
						type: 2,
						text: '3个月',
						money: 140
					},
					{
						type: 3,
						text: '6个月',
						money: 250
					},
					{
						type: 4,
						text: '12个月',
						money: 450
					},
				],
				// 选中的版本
				activedVersion: null, // 0免费 1基础,2高级,3专业
				language: uni.getStorageSync('language'),
				// 版本价格
				price: {
					baseBefore: 0,
					baseReal: 0,
					highBefore: 0,
					highReal: 0,
					majorBefore: 0,
					majorReal: 0
				},
				statusBarHeight: uni.getStorageSync('statusBarHeight')
			}
		},
		async onLoad() {
			let res = await this.CsHttp.post(this.ApiConfig.User + '/BSQueryUserInfoReq', {
					UserId: uni.getStorageSync('UserData').UserId,
				});
			this.serviceVersion = res.UserData.ServiceType;
			this.activedVersion = res.UserData.ServiceType;
			this.getVersionList();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取版本列表
			getVersionList() {
				this.CsHttp.post(this.ApiConfig.User + '/BSServiceInfoReq', {}).then(res => {
					console.log(res)
					this.versionList = res.ServiceInfos;
					this.changePrice();
				})
			},
			// 处理价格
			changePrice() {
				let before = '', real = '';
				switch(this.params.ServiceTimeType) {
					case 1:
					// 一个月
						before = 'MonPriceBefore';
						real = 'MonPriceReal';
						break;
					case 2:
					// 三个月
						before = 'SeaPriceBefore';
						real = 'SeaPriceReal';
						break;
					case 3:
					// 半年
						before = 'HYearPriceBefore';
						real = 'HYearPriceReal';
						break;
					case 4:
					// 一年
						before = 'YearPriceBefore';
						real = 'YearPriceReal';
						break;
				}
				this.price.baseBefore = this.versionList.find(item => item.Level == 1)[before];
				this.price.baseReal = this.versionList.find(item => item.Level == 1 )[real];
				this.price.highBefore = this.versionList.find(item => item.Level == 2)[before];
				this.price.highReal = this.versionList.find(item => item.Level == 2 )[real];
				this.price.majorBefore = this.versionList.find(item => item.Level == 3)[before];
				this.price.majorReal = this.versionList.find(item => item.Level == 3)[real];
			},
			// 点击选择按钮
			btnClick (item) {
				this.params.ServiceTimeType = item.type;
				if (item.money) {
					this.payMoney = item.money;
				}
				this.activedVersion = this.serviceVersion;
				this.payMoney = 0;
				this.changePrice();
			},
			// 选择版本
			selectVersion (type) {
				// 判断选择版本是否低于已购买版本
				if (this.serviceVersion > type) {
					uni.showToast({
						title: this.$t('user.buyService.tips')[0],
						icon: 'none',
						duration: 1000
					})
					return false;
				} 
				this.activedVersion = type;
			},
			// 点击立即付款按钮
			payBtn () {
				// 判断是否是免费版
				if (this.activedVersion == 0) {
					uni.hideToast();
					uni.showToast({
						title: this.$t('user.buyService.tips')[1],
						icon: 'none',
						 duration: 1500
					})
					return false;
				}
				this.params.ServiceType = this.activedVersion;
				this.CsHttp.post(this.ApiConfig.User + '/BSBuyServiceReq', this.params, true).then(res => {
					console.log(res)
					// 判断用户是否购买服务成功
					if (res.Code == 0) {
						// 购买成功
						uni.showToast({
							title: this.$t('user.buyService.tip'),
							icon: 'none',
							duration: 1000
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					} else {
						// 购买失败并弹窗提示原因
						uni.showModal({
							content: res.Msg,
							showCancel: false,
						});
					}
					
				})
			}

		}

	}
</script>

<style lang="scss" scoped>
	
	.title-view {
		text-align: center;
		background-color: #20324a;
		height: 72rpx;
		border-radius: 8rpx;
		line-height: 72rpx;
		font-size: 26rpx;
		color: $uni-color-primary;
		margin-top: 6rpx;

	}
	
	.content {
		overflow-y: auto;
		
	}
	.select-service {
		// margin-top: 6rpx;
		padding: 18rpx 28rpx;
		background-color: #1B2B41;
		.value {
			flex-wrap: wrap;
			
		}
		.btn {
			width: calc(25% - 12rpx);
			border-radius: 8rpx;
			height: 54rpx;
			line-height: 54rpx;
			// box-sizing: border-box;
			text-align: center;
			// position: relative;
			font-size: 28rpx;
			color: #FFFFFF;
			background-color: #27828D;
			border-radius: 8rpx;
		}
		.money {
			color: #f59a4b;
		}
		.actived {
			background: #E8A035;
			color: #ffffff;
			&::after {
				border: none;
			}
		}
		.title {
			margin-top: 20rpx;
			width: 20%;
		}
	}
	.version-list {
		padding: 10rpx 14rpx;
	}
	.item {
		background-color: #1F314A;
		border-radius: 8rpx;
		padding-bottom: 20rpx;
		.label {
			font-size: 36rpx;
			color: $uni-text-color;
			height: 40rpx;
			line-height: 40rpx;
			padding-left: 20rpx;
			position: relative;
			&::after {
				content: ' ';
				position: absolute;
				top: 8rpx;
				left: 0;
				width: 4rpx;
				height: 30rpx;
				background-color: #3EFFF8;
				opacity: 0.8;
			}
		}
		.price {
			font-size: 42rpx;
			color: #F5B14B;
			text-align: center;
		}
		.no-price {
			color: #E1D0BD;
			padding-right: 20rpx;
			position: relative;
			&::after {
				content: ' ';
				position: absolute;
				top: 60%;
				left: 0;
				width: 85%;
				height: 1px;
				background-color: #E1D0BD;
			}
		}
		.pay {
			font-size: 22rpx;
			color: $uni-text-color;
			padding-bottom: 6rpx;
		}
		.title-col {
			height: 98rpx;
			.img {
				width: 145rpx;
				height: 50rpx;
			}
		}
		.text-col{
			padding: 14rpx 24rpx 6rpx;
			font-size: 26rpx;
			color: $uni-text-color;
			.icon {
				font-size: 20rpx;
				color: #f59a4b;
				margin-right: 12rpx;
			}
			.yellow {
				color: #977356;
			}
			.dot {
				width: 8rpx;
				height: 8rpx;
				margin-right: 6rpx;
				border-radius: 50%;
				background-color: #6f87a4;
			}
			.text {
				width: calc(100% - 40rpx);
			}
		}
		.btn-t-2::before {
			border-top: 1px solid #0C1624;
		}
		.btn-t-2::after {
			border-top: 1px solid #496388;
		}
	}

	.actived-zyb {
		background-color: #5537BB;
		.btn-t-2::before {
			border-top: 1px solid #382182;
		}
		.icon {
			color: $uni-text-color !important;
		}
		.btn-t-2::after {
			border-top: 1px solid #A598EB;
		}
		&::after {
			border: 1px solid #8167D9;
			border-radius: 8rpx;
		}
	}
	.actived-gjb {
		background-color: #0473D4;
		.icon, .text-col {
			color: #ffffff !important;
		}
		.btn-t-2::before {
			border-top: 1px solid #034278;
		}
		.btn-t-2::after {
			border-top: 1px solid #46A9FF;
		}
		&::after {
			border: 1px solid #68B9FF;
			border-radius: 8rpx;
		}
	}
	.actived-jcb {
		background-color: #0A9DBC;
		.icon, .text-col {
			color: #ffffff !important;
		}
		.btn-t-2::before {
			border-top: 1px solid #005465;
		}
		.btn-t-2::after {
			border-top: 1px solid #48DDFC;
		}
		&::after {
			border: 1px solid #3DD8F9;
			border-radius: 8rpx;
		}
	}
	.actived-mfb {
		background-color: #1BBEA6;
		.icon, .text-col {
			color: #ffffff !important;
		}
		.btn-t-2::before {
			border-top: 1px solid #057766;
		}
		.btn-t-2::after {
			border-top: 1px solid #37F6DA;
		}
		&::after {
			border: 1px solid #84FFED;
			border-radius: 8rpx;
		}
	}
	.btn-col-placeholder {
		height: 185rpx;
	}
	.btn-col {
		background-color: #000E18;
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 40rpx;
	}
	.m-t14 {
		margin-top: 16rpx;
	}
	.p-lr4 {
		padding-right: 4rpx;
		padding-left: 4rpx;
	}
	.p-l4 {
		padding-left: 4rpx;
	}
	.p-r4 {
		padding-right: 4rpx;
	}

</style>
