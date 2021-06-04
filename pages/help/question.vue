<!-- APP常见问题页 -->
<template>
	<view class="root p-b20">
		<v-nav-bar
			:title="$t('help.question.navTitle')"
		/>
		<view class="item"
			v-for="(item,index) in 7"
			:key="'question_' + index">
			<view class="title flex flex-start align-start">
				<text>{{ index + 1 }}.</text>
				<text class="p-l10">{{ $t('help.question.list')[index] }}</text>
			</view>
			<view class="text">
				{{ $t('help.question.texts')[index] }}
				<text class="yellow" v-if="[0, 4].includes(index)">
					{{ $t('help.question.tips')[index == 0 ? 0 : 1] }}
				</text>
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

<style lang="scss">
.item {
	padding: 20rpx 30rpx 0;
}
.p-b20 {
	padding-bottom: 20rpx;
}
.title {
	font-size: 32rpx;
	color: $uni-color-primary;
	padding-bottom: 10rpx;
}
.text {
	text-indent: 60rpx;
	font-size: 28rpx;
	color: $uni-text-color;
}
.yellow {
	color: $uni-color-yellow;
}
</style>
