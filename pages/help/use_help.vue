<!-- APP使用帮助页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('help.use.navTitle')"
		/>
		<view class="item">
			<view class="title">{{ $t('help.use.titles')[0] }}</view>
			<view class="label flex flex-start">
				<text>1.</text>
				<text class="p-l10">{{ $t('help.use.texts')[0] }}</text>
			</view>
			<view>
				<view class="text">
					{{ $t('help.use.texts')[1] }}
				</view>
				<image style="width: 100%; height: 536rpx;" src="../../static/course/sy_jc_sysm_1.png"></image>
			</view>
			<view class="label">
				<view class="label flex flex-start align-start">
					<text>2.</text>
					<text class="p-l10">{{ $t('help.use.texts')[2] }}</text>
				</view>
			</view>
			<view>
				<view class="text">
					 {{ $t('help.use.texts')[3] }}
				</view>
				<image style="width: 596rpx; height: 500rpx;" src="../../static/course/sy_jc_sysm_2.png"></image>
			</view>
		</view>
		<view class="item">
			<view class="title">{{ $t('help.use.titles')[1] }}</view>
			<view class="label flex flex-start">
				<text>1.</text>
				<text class="p-l10">{{ $t('help.use.texts')[4] }}</text>
			</view>
			<view>
				<view class="text">
					{{ $t('help.use.texts')[5] }}
				</view>
				<image style="width: 375rpx; height: 536rpx;" src="../../static/course/sy_jc_sysm_3.png"></image>
			</view>
			<view class="label flex flex-start align-start">
				<text>2.</text>
				<text class="p-l10">{{ $t('help.use.texts')[6] }}</text>
			</view>
			<view>
				<view class="text">
					 {{ $t('help.use.texts')[7] }}
				</view>
				<image style="width: 396rpx; height: 488rpx;" src="../../static/course/sy_jc_sysm_4.png"></image>
			</view>
		</view>
		<view class="item">
			<view class="title">{{ $t('help.use.titles')[2] }}</view>
			<view class="text yellow p-b20">
				{{ $t('help.use.texts')[8] }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {}
</script>

<style lang="scss">
.item {
	padding: 20rpx 28rpx 0 28rpx;
}
.title {
	font-size: 32rpx;
	color: $uni-color-primary;
	padding-bottom: 10rpx;
}
.label {
	font-size: 28rpx;
	color: $uni-text-color;
	font-weight: 600;
}
.text {
	font-size: 28rpx;
	color: $uni-text-color;
	text-indent: 60rpx;
	padding-bottom: 10rpx;
}
image {
	padding-bottom: 10rpx;
}
.yellow {
	color: $uni-color-yellow;
}
.p-b20 {
	padding-bottom: 20rpx;
}
</style>
