<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.customer.navTitle')"
		/>
		<view class="customer-service-main">
			<button class="service-btn">{{ $t('user.customer.btn') }}</button>
			<view class="kefu-list p-t20">
				<view class="item flex" 
					v-for="(item, index) in serviceList" :key="'service_' + index">
					<text class="label">{{ item.ServiceType }}：{{ item.ServiceId }}</text>
					<text class="value" @click="copyWX(item.ServiceId)">{{ $t('user.customer.copy') }}</text>
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
				serviceList: [],
				timeFn: null
			}
		},
		onShow() {
			this.getServiceList();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取客服信息
			getServiceList() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetOfficialServiceReq', {}).then(res => {
					console.log(res)
					this.serviceList = [...res.OfficialServices];
				})
			},
			// 复制微信号
			copyWX (data) {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data,
					})
					// #endif
					// #ifdef H5
					let text = document.createElement('textarea');
					document.body.appendChild(text);
					text.value = data;
					text.select();
					document.execCommand('copy');
					text.remove();
					uni.showToast({
						title: "内容已复制",
						icon: 'success',
						duration: 1000
					})
					// #endif
				}, 200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.customer-service-main {
		padding: 24rpx 28rpx 10rpx;
		.service-btn {
			background: $uni-bg-color;
			height: 98rpx;
			line-height: 98rpx;
			border-radius: 8rpx;
			color: #ffffff;
			font-size: 32rpx;
		}


		
	}
	.item {
		margin-top: 20rpx;
		background-color: $uni-bg-color;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		font-size: 26rpx;
		color: #12c1bb;
		.label {
			color: $uni-text-color;
			padding-left: 20rpx;
			position: relative;
			&::after {
				content: ' ';
				width: 8rpx;
				height: 8rpx;
				background-color: #ced3e9;
				opacity: 0.4;
				position: absolute;
				top: 36rpx;
				left: 0;
				border-radius: 50%;
			}
		}
	}
	
</style>
