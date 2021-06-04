<template>
	<view class="uni-popup-message flex">
	
			
			<view class="flex flex-start">
				<image class="logo" :src="'../../static/coin/'+SymbolLogo+'.png'" mode=""></image>
				<text class="color-light font-18 p-l10">{{Symbol}}</text>
			</view>
		
		<view class="">
			<text class="color-orange" style="font-size: 42rpx;">{{CurPrice}}</text>
			<text class="color-orange font-12">/USDT</text>
		</view>
		<view class="flex flex-start">
			<image class="logo" :src="'../../static/icon/'+EchannelLogo+'.png'" mode=""></image>
			<text class="font-14 color-light p-l10">{{EchannelName}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-消息提示
	 * @description 弹出层-消息提示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} message 消息提示文字
	 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
	 */

	export default {
		name: 'UniPopupTip',
		props: {
			/**
			 * 主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'success'
			},

			Echannel: Number,
			TaskType: Number,
			Symbol: {
				type: String,
				default: 'BTC'
			},

			/**
			 * 显示时间，设置为 0 则不会自动关闭
			 */
			duration: {
				type: Number,
				default: 5000
			}
		},
		inject: ['popup'],
		data() {
			return {
				CurPrice: 0
			}
		},
		created() {
			this.popup.childrenMsg = this
			this.sendQueryPrice()
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

			SymbolLogo() {
				//币种logo
				let coin = this.Symbol.replace("USDT", "").toLowerCase();
				return this.CsData.CoinLogArr.indexOf(coin) == -1 ? '0' : coin
			}
		},
		methods: {
			//获取现货 合约账户  总余额  可用资产
			sendQueryPrice() {
				let url = this.ApiConfig.DataUrl +'/BSGetEchannelSymbolPriceReq'
				let Symbol = this.Symbol
				let PlayType = 1
				if (this.TaskType > 2) {
					Symbol = Symbol.replace("USDT", "")
					PlayType = 2
				}

				let data = {
					Echannel: this.Echannel,
					PlayType: PlayType,
					Symbol: Symbol
				}
				this.CsHttp.post(url, data).then(res => {
					console.log(res)
					if (res.Code == 0) {
						this.CurPrice = parseFloat(res.Price);
					}
				}).catch(err => {
					console.log(err)
				});
			},
			open() {
				if (this.duration === 0) return
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.popup.close()
				}, this.duration)
			},
			close() {
				clearTimeout(this.popuptimer)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-message {
		
		padding: 10px 15px;
		border-color: #eee;
		border-style: solid;
		border-width: 1px;
			width: 673rpx;
			height: 124rpx;
			background-color: #20324a;
			box-shadow: 0rpx 4rpx 5rpx 0rpx 
				#0c1320;
			border-radius: 8rpx;
			border: solid 1rpx #334761;
		margin: 0 30rpx;
		box-sizing: border-box;
	}

	.logo {
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
	}
</style>
