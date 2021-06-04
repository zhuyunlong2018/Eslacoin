<!-- API 管理页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('home.apiManage.navTitle')"
		/>
		<view class="banner">
			<image class="banner-img" src="@/static/home/sy_api_banner1.png" mode=""></image>
		</view>
		
		<!-- tab切换栏 -->
		<view class="tab-bar m-t10 flex">
			<view class="tab-item bold-8"
				:class="tabType == 1 ? 'actived' : ''"
				@click="changeTabType(1)">未绑定交易所</view>
			<view class="tab-item bold-8"
				:class="tabType == 2 ? 'actived' : ''"
				@click="changeTabType(2)">已绑定交易所</view>
		</view>
		<!-- 未绑定交易所 -->
		<view class="item-view" v-show="tabType == 1">
			<view class="item flex" 
				 @click="onSelApiClick(item)"
				v-for="(item, index) in list"
				v-show="!item.AccessKey"
				:key="'apikey_' + index">
				<view class="left">
					<image class="logo" :src="item.imgUrl"></image>
					<text class="title no-wrap">{{ $t('home.apiManage.list')[index] }}</text>
				</view>
				<view class="right flex">
					<text class="iconfont icon iconjiantou"></text>
				</view>
			</view>
		</view>
		<!-- 已绑定交易所 -->
		<view class="item-view" v-show="tabType == 2">
			<view class="item flex" 
				v-for="(item, index) in bindApiList"
				:class="item.IsActive == 1 ? 'actived' : ''"
				:key="'apikey_' + index">
				<view class="left">
					<image class="logo" v-if="item.Echannel == 1" src="../../static/icon/qh_hb_logo.png"></image>
					<image class="logo" v-if="item.Echannel == 2" src="../../static/icon/qh_ba_logo.png"></image>
					<image class="logo" v-if="item.Echannel == 3" src="../../static/icon/qh_bte_logo.png"></image>
					<text class="title no-wrap">{{ $t('home.apiManage.list')[item.Echannel - 1] }}</text>
				</view>
				<view class="right flex">
					<view class="flex">
						<text class="text p-r10">{{ $t('home.apiManage.btns')[0] }}</text>
						<view class="round round-green flex flex-center" @click="defaultBtn(item)">
							<text class="iconfont icon_gou"></text>
						</view>
					</view>
					<view class="round round-red flex flex-center" @click="deleteApi(item, item.Echannel - 1)">
						<text class="iconfont icon_delete"></text>
					</view>
					
				</view>
			</view>
			<view class="no-data" v-if="bindApiList.length == 0">暂无绑定的交易所</view>
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
				list: [],
				apiKeyList: [
					{
						Echannel: 1,
						Name: '火币交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_hb_logo.png'
					},
					{
						Echannel: 2,
						Name: '币安交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_ba_logo.png'
					},
					{
						Echannel: 3,
						Name: '比特儿交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_bte_logo.png'
					}
				],
				// 绑定的API列表
				bindApiList: [],
				// Echannel int  //渠道交易所1火币2币安3比特儿
				// 判断是否启用
				Echannel: null,
				tabType: 1, // 1 - 支持的交易所 2 - 已绑定的交易所
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		onShow() {
			this.getApiKeyList();
		},
		methods: {
			// 切换tab类型
			changeTabType(val) {
				this.tabType = val;
			},
			// 获取用户 apikey 列表
			getApiKeyList() {
				// this.list = [];
				this.Echannel = null;
				this.CsHttp.post(this.ApiConfig.User + '/BSGetUserApiKeyListReq', {
					UserId: uni.getStorageSync('UserData').UserId
				}).then(res => {
					console.log(res);
					this.bindApiList = [...res.UserApiKeyDataList];
					let obj = res.UserApiKeyDataList.find(vals => vals.IsActive == 1);
					if (obj) {
						this.Echannel = obj.Echannel;
						uni.setStorageSync('echannel', obj.Echannel);
					} else {
						this.Echannel = null;
						uni.setStorageSync('echannel', null);
					}
					let bingKey = res.UserApiKeyDataList.map(item => item.Echannel);
					this.apiKeyList.forEach((item, index) => {
						let vs = res.UserApiKeyDataList.find(vals => vals.Echannel == item.Echannel);
						if(vs) {
							item.AccessKey = vs.AccessKey;
						}
					});
					this.list = JSON.parse(JSON.stringify(this.apiKeyList));
					
				})
			},
			// 删除APi
			deleteApi(item, index) {
				uni.showModal({
					content: this.$t('home.apiManage.tips')[index + 2],
					confirmText: this.$t('common.confirm'),
					cancelText: this.$t('common.cancel'),
					success: (res) => {
						if (res.confirm) {
							this.CsHttp.post(this.ApiConfig.User + '/BSDeleteApiKeyReq', {
								UserId: uni.getStorageSync('UserData').UserId,
								Echannel: item.Echannel
							}).then(res => {
								uni.showToast({
									title: this.$t('home.apiManage.tips')[5],
									icon: 'none',
									duration: 1000
								});
								setTimeout(() => {
									this.getApiKeyList();
								}, 1000)
							})
						}
					}
				})
			},
			// 点击默认按钮
			defaultBtn (item) {
			
				this.CsHttp.post(this.ApiConfig.User + '/BSChangeApiChannelReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Echannel: item.Echannel
				}, false).then(res => {
					uni.showToast({
						title: this.$t('home.apiManage.tips')[1],
						icon: 'none',
						duration: 1000
					})
					this.getApiKeyList();
				})
			},
			
			//点击选择渠道
			onSelApiClick(item){
				// 判断是否绑定 apikey
				if (!item.AccessKey) {
					uni.navigateTo({
						url: `/pages/apikey/create_apikey?Echannel=${ item.Echannel }`
					})
				} else {
					uni.hideToast();
					uni.showToast({
						title: '您已绑定该交易所',
						icon: 'none',
						duration: 1500
					})
				}
			}
		},	
	}
</script>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.banner {
		width: 100%;
		height: 250rpx;
		.banner-img {
			width: 100%;
			height: 100%;
		}
	}
	.seltitle{
		width: 100%;
		height: 80rpx;
		color: $uni-color-primary;
		background-color: #182134;
		text-align: center;
		line-height: 80rpx;
		margin-top: 6rpx;
		font-size: 28rpx;
	}
	.tab-bar {
		height: 84rpx;
		padding: 0 88rpx;
		background-color: $uni-bg-color;
		.tab-item {
			color: $uni-text-color-grey;
			font-size: 32rpx;
			padding-bottom: 6rpx;
			border-bottom: 4rpx solid transparent;
		}
		.actived {
			color: #13A1A1;
			border-bottom: 4rpx solid #13A1A1;
		}
	}
	.item-view{
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		padding: 0 14rpx;
		.item{
			border: 1rpx solid transparent;
			background-color: $uni-bg-color;
			border-radius: 6rpx;
			height: 96rpx;
			line-height: 96rpx;
			margin-bottom: 20rpx;
			padding: 0 14rpx;
			.left{
				display: flex;
				align-items: center;
				.logo{
					width: 48rpx;
					height: 48rpx;
				}
				.title{
					font-size: 32rpx;
					margin-left: 20rpx;
					color: $uni-text-color;
				}
			}
			
			.button {
				width: 126rpx;
				height: 44rpx;
				line-height: 44rpx;
				border-radius: 6rpx;
				color: #05a786;
				text-align: center;
				font-size: 24rpx;
				margin-left: 20rpx;
				border: 2rpx solid #23c5a4;
			}
			.default {
				background-color: #04ac90;
				color: #ffffff;
				border: 2rpx solid #04ac90;
			}
			.del {
				border: 2rpx solid #d14b64;
				color: #d14b64;
			}
			.stateno{
				font-size: 32rpx;
				color: $uni-color-primary;
				margin-right: 30rpx;
			}
			.stateyes{
				font-size: 28rpx;
				color: $uni-text-color-grey;
				margin-right: 30rpx;
				
			}
			.text {
				font-size: 24rpx;
				margin-top: 4rpx;
				color: #51657d;
			}
			.icon {
				font-size: 44rpx;
				color: $uni-text-color;
			}
		}
		.round {
			width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
			background-color: #32415e;
			color: #6f87a4;
			.iconfont {
				font-size: 18rpx;
			}
		}
		.round-red {
			background-color: rgba(209, 75, 100, 0.44);
			color: #d14b64;
			margin-left: 36rpx;
		}
		.actived {
			.text {
				color: $uni-text-color;
			}
			.round-green {
				background-color: #0d9591;
				color: #d4e1f1;
			}
			.use {
				position: absolute;
				left: 0;
				top: 0;
				height: 30rpx;
				line-height: 30rpx;
				background-color: $uni-color-primary;
				border-radius: 6rpx 0 12rpx 0;
				font-size: 22rpx;
				padding-right: 10rpx;
				color: #ffffff;
			}
			.default {
				background-color: #475e7d;
				border: 1rpx solid #475e7d;
				color: $uni-text-color;
			}
		}
	}
</style>