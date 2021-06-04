<template>
	<view class="uni-popup-detail">
	
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">账户信息</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="uni-detail-info flex flex-column align-start flex-start p-t10">
			<view class="flex  w100p" >
				<text class="font-14 color-dark">资产总额</text>
				<view class="flex flex-end">
					<image class="logo" :src="'../../static/icon/'+EchannelLogo+'.png'" mode=""></image>
				<text class="font-15 color-light">{{EchannelName}}</text>
				</view>
			</view>
			<view class="m-t20">
				<text class="color-light" style="font-size: 48rpx;">{{TotalUsdt}}</text>
				<text class="color-dark font-12">/USDT</text>
			</view>
			<view class="flex w100p m-t20">
				<view class="flex-column align-start"  style="width: 40%;">
					<text class="color-dark font-13">现货资产</text>
					<view class="">
						<text class="color-orange " style="font-size: 36rpx;">{{XhUsdt}}</text>
						<text class="color-dark font-12">/USDT</text>
					</view>
					
				</view>
				<view class=" flex flex-column align-start" style="width: 40%;">
					<text class="color-dark font-13 ">合约资产</text>
					<view class="">
						<text class="color-orange "  style="font-size: 36rpx;">{{HyUsdt}}</text>
						<text class="color-dark font-12">/USDT</text>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'UniPopupDetail',
		props: {
			Echannel:  Number,
			TaskType:  Number
		},
		inject: ['popup'],
		data() {
			return {
				 TotalUsdt:0,
				 XhUsdt:0,
				 HyUsdt:0
			}
		},

		created() {
			this.sendQueryAccountBalance()
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
			},
		},
		methods: {
			//获取现货 合约账户  总余额  可用资产
			sendQueryAccountBalance() {
				let url = this.ApiConfig.User+'/BSGetEchannelAccountBalanceReq'
				this.CsHttp.post(url, {
					UserId : uni.getStorageSync('UserData').UserId,
					Echannel: this.Echannel
				}).then(res => {
					if (res.Code == 0) {
						this.TotalUsdt = Number(res.TotalUsdt).toFixed(2);
						this.HyUsdt = Number(res.HyUsdt).toFixed(2);
						this.XhUsdt = Number(res.XhUsdt).toFixed(2);
					}
				}).catch(err => {
					console.log(err)
				});
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.color-dark {
		color: #6f87a4;
	}

	.color-light {
		color: #ced3e9;
	}

	.color-green {
		color: #12c1bb;
	}

	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;

		.f42 {
			font-size: 42rpx;
			line-height: 75rpx;
		}

.state {
	width: 120rpx;
	height: 40rpx;
	border-radius: 6rpx;
	text-align: center;
	font-size: 24rpx;
	line-height: 40rpx;
}
.state0 {
	background-color: rgba(248, 100, 100, 0.11);
	color: #d14b64;
}
.state1 {
	background-color: rgba(112, 222, 190, 0.1);
	color: #09b195;
}
.state2 {
	background-color: rgba(112, 145, 222, 0.18);
	color: #249efb;
}
.state3 {
	background-color: rgba(248, 100, 100, 0.11);
	color: #d14b64;
}

	}

	.uni-detail-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		width: 100%;
		background-color: #1e2a40;
		border-radius: 16px 16px 0px 0px;
		border-bottom: 1rpx solid #26334e;

	}

	.uni-detail-info {
		height: 500rpx;
		width: 690rpx;
		border-top: 1rpx solid #0b131e;;
	}
	.logo{
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
	}
</style>
