<!-- 申请提币页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('invite.exchange.navTitle')"
		/>
		<view class="text-view flex">
			<text >{{ $t('invite.exchange.labels')[0] }}:</text>
			<text class="text">USDT-TRC20</text>
		</view>
		<view class="content">
			<view class="main-view p-t20">
				
				<view class="input-view btn-b-1">
					<view>
						<text class="label">{{ $t('invite.exchange.labels')[1] }}：</text>
					</view>
					<view class="flex">
						<input :placeholder="$t('invite.exchange.placeholder')[0]"
							v-model.trim="params.Address"
							class="w100p"
							placeholder-class="address">
					</view>
				</view>
				<view class="input-view btn-b-1">
					<view>
						<text class="label">{{ $t('invite.exchange.labels')[2] }}：</text>
					</view>
					<view class="flex align-end">
						<input type="number" :placeholder="$t('invite.exchange.placeholder')[1]" 
							v-model.trim="params.Coin"
							@blur="inputBur"
							placeholder-class="address">
						<text class="unit">USDT</text>
					</view>
				</view>
				<view class="input-view">
					<view>
						<text class="label">{{ $t('invite.exchange.labels')[3] }}：</text>
					</view>
					<view class="flex align-end">
						<text class="number">{{ params.ServiceFee }}</text>
						<text class="unit">USDT</text>
					</view>
				</view>
				<view class="input-view btn-b-1 code">
					<view>
						<text class="label">{{ $t('invite.exchange.labels')[4] }}：</text>
					</view>
					<view class="flex align-end">
						<input v-model="params.PhoneCode" 
							:placeholder="$t('invite.exchange.placeholder')[2]"
							placeholder-class="address"
							style="width: 350rpx;" type="number" />
						<button :disabled="disabledBtn" @click="getCodeBtn"
							class="btn-code"
							type="primary" size="mini">
							{{ !disabledBtn ? $t('invite.exchange.code')[0] : `${timeNumber}s${$t('invite.exchange.code')[1]}` }}
						</button>
					</view>
				
				</view>
				<view class="button-view">
					<uni-botton @click="submitBtn"
						:isDisabled="!params.Address || !params.Coin || !params.PhoneCode"
						:btnText="$t('invite.exchange.btns')[0]"></uni-botton>
					<button type="primary" class="detail-btn" @click="openPage">{{ $t('invite.exchange.btns')[1] }}</button>
				</view>
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
				params: {
					// 地址类型 1：TRC20-USDT 2：ERC20-USDT
					AddrType: 1,
					Address: '', // 提货地址
					Coin: '', // 提货额度
					ServiceFee: 0, // 手续费
					PhoneCode: ''
				},
				
				// 是否禁用按钮
				disabledBtn: false,
				// 轮询函数
				setIntervalFn: null,
				// 倒计时
				timeNumber: 59
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 根据提货地址类型获取提货地址
			getAddress(AddrType = 1) {
				this.CsHttp.post(this.ApiConfig.User + '/BSQueryUsdtAddressReq', { 
						UserId: uni.getStorageSync('UserData').UserId,
						AddrType
					}).then(res => {
					this.params.Address = res.Address;
				})
			},
			// 输入框失去焦点
			inputBur() {
				this.params.ServiceFee = (this.params.Coin * 2) / 100; 
			},
			// 获取验证码按钮
			getCodeBtn() {
				if (!this.disabledBtn) {
					this.disabledBtn = true;
					this.CsHttp.post(this.ApiConfig.User + '/BSPhoneCodeReq', {
						PhoneNumber: uni.getStorageSync('UserData').Account,
						OptType: 1
					}).then(res => {
						console.log(res)
						if (res.Code == 0) {
							uni.showToast({
							    title: this.$t('invite.exchange.tips')[4],
								icon: 'none',
							    duration: 1000
							});
							this.setIntervalFn = setInterval(() => {
								if (this.timeNumber == 0) {
									this.disabledBtn = false;
									this.timeNumber = 59;
									clearInterval(this.setIntervalFn);
								}
								this.timeNumber--;
							}, 1000)
						} else {
							this.disabledBtn = false;
							uni.showModal({
								content: res.Msg,
								showCancel: false,
							});
						}
						
					}).catch(err => {
						this.disabledBtn = false;
					})
					
				}
			},
			// 提交申请按钮
			submitBtn() {
				// 判断用户输入地址
				if (!this.params.Address) {
					uni.showToast({
					    title: this.$t('invite.exchange.tips')[0],
						icon: 'none',
					    duration: 1000
					});
					return false;
				} else {
					if (!/^[a-zA-Z\d]+$/.test(this.params.Address)) {
						uni.showToast({
						    title: this.$t('invite.exchange.tips')[1],
							icon: 'none',
						    duration: 1000
						});
						return false;
					}
				}
				// 判断用户是否输入数量
				if(!this.params.Coin) {
					uni.showToast({
					    title: this.$t('invite.exchange.tips')[2],
						icon: 'none',
					    duration: 1000
					});
					return false;
				} else {
					if(this.params.Coin < 100) {
						uni.showToast({
						    title: this.$t('invite.exchange.tips')[3],
							icon: 'none',
						    duration: 1000
						});
						return false;
					}
				}
					
				if (!this.params.PhoneCode) {
					uni.showToast({
					    title: this.$t('invite.exchange.placeholder')[2],
						icon: 'none',
					    duration: 1000
					});
					return false;
				}
				let params = JSON.parse(JSON.stringify(this.params));
				params.Coin = +params.Coin;
				params.UserId = uni.getStorageSync('UserData').UserId;
				// 提交申请
				this.CsHttp.post(this.ApiConfig.User + '/BSCashOutReq', params, false).then(res => {
					console.log(res);
					if (res.Code == 0) {
						uni.showToast({
						    title: this.$t('invite.exchange.tips')[5],
							icon: 'none',
						    duration: 1000
						});
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/popularize/extract_detail'
							})
						}, 1000)
					} else {
						uni.showModal({
							content: res.Msg,
							showCancel: false,
						});
					}
					
				})
			},
			openPage() {
				uni.navigateTo({
					url: '/pages/popularize/extract_detail'
				})
			}
		},
		onHide() {
			clearInterval(this.setIntervalFn);
		},
		onUnload() {
			clearInterval(this.setIntervalFn);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 28rpx;
		text{
			font-size: 30rpx;
			color: $uni-text-color-grey;
		}
	}
	.text-view{
		background-color: #1A253A;
		font-size: 32rpx;
		height: 66rpx;
		color: $uni-text-color;
		line-height: 66rpx;
		padding: 0 28rpx;
		.text {
			font-size: 30rpx;
			color: $uni-color-primary;
		}
	}
	.main-view{
		font-size: 26rpx;
		text {
			color: $uni-text-color;
		}
		
	}
	.input-view {
		padding-top: 40rpx;
		padding-bottom: 5rpx;
		.label {
			font-size: 36rpx;
			color: $uni-text-color;
		}
		
		input, .number {
			margin-top: 24rpx;
			font-size: 30rpx;
			color: $uni-text-color;
			width: 70%;
		}
		.unit {
			font-size: 22rpx;
			color: $uni-text-color-grey;
		}
		
		.btn-code {
			color: $uni-color-primary;
			font-size: 28rpx;
			background-color: transparent;
			border: 0;
			margin: 0;
			padding: 0;
			line-height: 1.6;
			&::after {
				border: none;
			}
		}
	}
	.btn-b-1::after {
		border-bottom: 1px solid #26334e;
	}
	.code::after {
		border-bottom: 1px solid #0b131e;
	}
	.button-view{
		margin: 144rpx 90rpx;
		.detail-btn {
			margin-top: 40rpx;
			color: #2aa3b1;
			background-color: transparent;
			border: 2rpx solid #2aa3b1;
		}
	}
	.w100p {
		width: 100% !important;
	}
	.address {
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}
</style>
