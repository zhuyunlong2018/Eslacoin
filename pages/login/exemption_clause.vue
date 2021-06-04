<!-- 免责条款页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('login.agreement.navTitle')"
			backgroundColor="transparent"
		/>
		<view class="content">
			<view class="clause-row">
				<view class="title">{{ $t('login.agreement.navTitle') }}：</view>
				<view class="text">
					1、本软件...
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>
<style>
	page {
		background: linear-gradient(180deg, #252f47 0%, #202a3e 50%, #182134 100%);
	}
</style>
<style lang="scss" scoped>
	.root {
		height: 100vh;
	}
.content {
	padding: 30rpx;
}
.clause-row {
	// background-color: rgba(244, 246, 250, 0.2);
	// border-radius: 8rpx;
	// border: 2rpx solid #f4f6fa;
	padding: 12rpx;
	.title {
		font-size: 32rpx;
		color: $uni-text-color;
	}
	.text {
		font-size: 28rpx;
		color: $uni-text-color;
		padding-top: 10rpx;
	}
}
</style>
