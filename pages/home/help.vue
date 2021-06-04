<!-- 帮助教程页 -->
<template>
	<view class="root">
		<v-nav-bar :title="$t('help.home.navTitle')"/>
		<view class="help-view">
			<view class="item flex flex-start align-start" v-for="(item, index) in helpList" @click="openPage(item.link)" :key="'help_' + index">
				<view class="flex flex-start">
					<text class="dot"></text>
					<text class="p-l10">{{ index + 1 }}、</text>
				</view>
				<text>{{ $t('help.home.menus')[index] }}</text>
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
				helpList: [
					{
						link: '/pages/help/question',
						title: '炒币软件APP常见问题解答'
					},
					{
						link: '/pages/help/use_help',
						title: '炒币软件APP使用帮助'
					},
					{
						link: '/pages/help/add_course?type=hb',
						title: '火币API添加教程'
					},
					{
						link: '/pages/help/add_course?type=ba',
						title: '币安API添加教程'
					},
					{
						link: '/pages/help/task_explain?type=gp',
						title: '高频交易的盈利原理和使用方法'
					},
					{
						link: '/pages/help/task_explain?type=wg',
						title: '策略套利的盈利原理和使用方法'
					},
					{
						link: '/pages/help/contract?type=wg'
					}, 
					{
						link: '/pages/help/contract?type=zn'
					}
				]
			}
		},
		methods: {
			// 跳转页面
			openPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">

	.help-view {
		padding-top: 20rpx;
		.item {
			padding: 30rpx 0 30rpx 40rpx;
			background-color: $uni-bg-color;
			font-size: 28rpx;
			color: $uni-color-primary;
			position: relative;
			margin-bottom: 20rpx;
			.dot {
				height: 8rpx;
				width: 8rpx;
				background-color: $uni-color-primary;
				border-radius: 50%;
				opacity: 0.4;
			}
		}
	}
</style>
