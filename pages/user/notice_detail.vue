<!-- 公告详情页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.noticeDetail.navTitle')"
		/>
		<view class="title p-lr28 p-t20">{{ noticeDetail.Title }}</view>
		<view class="time p-lr28 p-t10 text-right font-13">{{ noticeDetail.Time }}</view>
		<view class="label p-lr28 font-14 p-b30">{{ $t('user.noticeDetail.label') }}：</view>
		<view class="text p-lr28 font-14" v-html="noticeDetail.Text"></view>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				noticeDetail: {}
			};
		},
		onShow() {
			this.noticeDetail = uni.getStorageSync('noticeDetail');
		}
	}
</script>

<style lang="scss">
.title {
	font-size: 40rpx;
	color: $uni-color-primary;
}
.time {
	color: $uni-text-color-grey;
}
.label {
	color: $uni-text-color;
}
.text {
	color: $uni-text-color;
}
</style>
