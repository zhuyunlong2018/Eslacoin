<!-- 火币API添加教程页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('help.course.navTitle')"
		/>
		<view class="row" v-if="pageType == 'hb'">
			<view class="flex flex-start">
				<view class="title-col flex flex-start">
					<text class="number bold">1</text>
					<text class="name">{{ $t('help.course.hbTitles') }}</text>
				</view>
			</view>
			<view class="text">
				{{ $t('help.course.hbTexts')[0] }}<text class="yellow">www.huobipro.com</text>
				{{ $t('help.course.hbTexts')[1] }}
				<text class="yellow">www.huobi.be</text>
				{{ $t('help.course.hbTexts')[2] }}
			</view>
		</view>
		<view class="row" v-if="pageType == 'ba'">
			<view class="flex flex-start">
				<view class="title-col flex flex-start">
					<text class="number bold">1</text>
					<text class="name">{{ $t('help.course.baTitles') }}</text>
				</view>
			</view>
			<view class="text">
				{{ $t('help.course.baTexts')[0] }}<text class="yellow">www.binancezh.com</text>
				{{ $t('help.course.baTexts')[1] }}
			</view>
		</view>
		<view class="row" v-for="(item, index) in courseList"
			:key="'course_' + index">
			<view class="flex flex-start">
				<view class="title-col flex flex-start">
					<text class="number bold">{{ index + 2 }}</text>
					<text class="name">{{ $t('help.course.titles')[index] }}</text>
				</view>
			</view>
			<view class="text">
				{{ item.text }}
			</view>
			<view :style="{height: item.imgHeight + 'rpx'}">
				<image :src="item.imgUrl"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageType: 'hb',
				courseList: [],
				hbList: [
					{
						text: this.$t('help.course.hbTexts')[3],
						imgUrl: '../../static/course/sy_api_hbjc_.png',
						title: '点击登录',
						imgHeight: '349'
					},
					{
						text: this.$t('help.course.hbTexts')[4],
						imgUrl: '../../static/course/sy_apisq_hbjc_1.png',
						title: '找到API管理',
						imgHeight: '302'
					},
					{
						text: this.$t('help.course.hbTexts')[5],
						imgUrl: '../../static/course/sy_apisq_hbjc_3.png',
						title: '创建API',
						imgHeight: '526'
					},
					{
						text: '',
						imgUrl: '../../static/course/sy_apisq_hbjc_4.png',
						title: '完成安全验证',
						imgHeight: '475'
					},
					{
						text: this.$t('help.course.hbTexts')[6],
						imgUrl: '../../static/course/sy_apisq_hbjc_5.png',
						title: '完成绑定',
						imgHeight: '746'
					}
				],
				baList: [
					{
						text: this.$t('help.course.baTexts')[2],
						imgUrl: '../../static/course/sy_api_bajc_1.png',
						title: '点击登录',
						imgHeight: '350'
					},
					{
						text: this.$t('help.course.baTexts')[3],
						imgUrl: '../../static/course/sy_api_bajc_2.png',
						title: '找到API管理',
						imgHeight: '361'
					},
					{
						text: this.$t('help.course.baTexts')[4],
						imgUrl: '../../static/course/sy_api_bajc_3.png',
						title: '创建API',
						imgHeight: '365'
					},
					{
						text: this.$t('help.course.baTexts')[5],
						imgUrl: '../../static/course/sy_api_bajc_4.png',
						title: '完成安全验证',
						imgHeight: '445'
					},
					{
						text: this.$t('help.course.baTexts')[6],
						imgUrl: '../../static/course/sy_api_bajc_5.png',
						title: '完成绑定',
						imgHeight: '377'
					}
				]
			};
		},
		onLoad(option) {
			this.pageType = option.type;
			this.courseList = this.pageType == 'hb' ? this.hbList : this.baList;
		}
	}
</script>

<style lang="scss">
	.row {
		padding: 28rpx;
	}
	.title-col {
		padding-bottom: 10rpx;
		border-bottom: 2rpx solid $uni-color-primary;
		.number {
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			width: 44rpx;
			border-radius: 6rpx;
			background-color: $uni-color-primary;
			font-size: 36rpx;
			color: #ffffff;
		}
		.name {
			font-size: 32rpx;
			color: $uni-color-primary;
			font-weight: bold;
			padding-left: 20rpx;
		}
	}
	.text {
		font-size: 26rpx;
		color: $uni-text-color;
		padding-top: 16rpx;
		padding-bottom: 10rpx;
		text-indent: 60rpx;
	}
	.yellow {
		color: $uni-color-yellow;
	}
	image {
		width: 100%;
		height: 100%;
	}
</style>
