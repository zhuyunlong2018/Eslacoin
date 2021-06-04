<!-- 合约说明页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="title"
		/>
		<!-- 网格交易说明 -->
		<view v-if="type == 'wg'">
			<view class="item">
				<view class="title">{{ $t('help.contract.wgTitles')[0] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[0] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[1] }}
					</view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[2] }}
					</view>
					<image style="height: 474rpx;" src="../../static/course/sy_jc_hywg_1.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[3] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[4] }}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">{{ $t('help.contract.wgTitles')[1] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[5] }}</text>
				</view>
				<view>
					<image style="width: 505rpx;height: 660rpx;" src="../../static/course/sy_jc_hywg_2.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.1</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[6] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[7] }}
					</view>
					<image style="width: 620rpx; height: 1226rpx;" src="../../static/course/sy_jc_hywg_3.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.2</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[8] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[9] }}
					</view>
					<image style="width: 688rpx; height: 1033rpx;" src="../../static/course/sy_jc_hywg_4.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>3.</text>
					<text class="p-l10">{{ $t('help.contract.wgTexts')[10] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.wgTexts')[11] }}
					</view>
					<image style="width: 640rpx; height: 660rpx;" src="../../static/course/sy_jc_hywg_5.png"></image>
				</view>
			</view>
			<view class="text item p-b20">
				  {{ $t('help.contract.wgTexts')[12] }}
			</view>
		</view>
		<!-- 智能多空说明 -->
		<view v-if="type == 'zn'">
			<view class="item">
				<view class="title">{{ $t('help.contract.znTitles')[0] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[0] }}</text>
				</view>
				<view>
					<view class="text">
						 {{ $t('help.contract.znTexts')[1] }}
					</view>
					<view class="text">
						 {{ $t('help.contract.znTexts')[2] }}
					</view>
					<view class="text">
						 {{ $t('help.contract.znTexts')[3] }}
					</view>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[4] }}</text>
				</view>
				<view>
					<view class="text">
						  {{ $t('help.contract.znTexts')[5] }}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">{{ $t('help.contract.znTitles')[1] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[6] }}</text>
				</view>
				<view>
					<image style="width: 510rpx;height: 660rpx;" src="../../static/course/sy_jc_zndk_1.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.1</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[7] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.znTexts')[8] }}
					</view>
					<image style="width: 610rpx;height: 1150rpx;" src="../../static/course/sy_jc_zndk_2.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.2</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[9] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.contract.znTexts')[10] }}
					</view>
					<image style="height: 600rpx;width: 610rpx;" src="../../static/course/sy_jc_zndk_3.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>3.</text>
					<text class="p-l10">{{ $t('help.contract.znTexts')[11] }}</text>
				</view>
				<view>
					<view class="text">
						  {{ $t('help.contract.znTexts')[12] }}
					</view>
					<image style="width: 660rpx; height: 660rpx;" src="../../static/course/sy_jc_zndk_4.png"></image>
				</view>
			</view>
			<view class="text item p-b20">
				  {{ $t('help.contract.znTexts')[13] }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				type: ''
				
			};
		},
		onLoad(option) {
			this.type = option.type;
			this.title = option.type == 'wg' ? this.$t('help.contract.navTitles')[0] : this.$t('help.contract.navTitles')[1]
		}
	}
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
	width: 100%;
	padding-bottom: 10rpx;
}
.p-b20 {
	padding-bottom: 20rpx;
}
</style>
