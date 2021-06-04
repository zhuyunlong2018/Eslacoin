<!-- 网格交易和高频交易说明页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="title"
		/>
		<!-- 网格交易 -->
		<view v-if="type == 'wg'">
			<view class="item">
				<view class="title">{{ $t('help.explain.wgTitles')[0] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[0] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[1] }}
					</view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[2] }}
					</view>
					<image style="height: 823rpx;" src="../../static/course/sy_jc_cltlsm_1.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[3] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[4] }}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">{{ $t('help.explain.wgTitles')[1] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[5] }}</text>
				</view>
				<view>
					<image style="width: 505rpx;height: 660rpx;" src="../../static/course/sy_jc_cltlsm_2.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.1</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[6] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[7] }}
					</view>
					<image style="width: 608rpx; height: 1187rpx;" src="../../static/course/sy_jc_cltlsm_3.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.2</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[8] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[9] }}
					</view>
					<image style="width: 680rpx; height: 1033rpx;" src="../../static/course/sy_jc_cltlsm_4.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>3.</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[10] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[11] }}
					</view>
					<image style="width: 640rpx; height: 660rpx;" src="../../static/course/sy_jc_cltlsm_5.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>4.</text>
					<text class="p-l10">{{ $t('help.explain.wgTexts')[12] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.wgTexts')[13] }}
					</view>
					<image style="width: 680rpx;height: 658rpx;" src="../../static/course/sy_jc_cltlsm_6.png"></image>
				</view>
			</view>
			<view class="text item p-b20">
				  {{ $t('help.explain.wgTexts')[14] }}
			</view>
		</view>
		<!-- 高频交易 -->
		<view v-if="type == 'gp'">
			<view class="item">
				<view class="title">{{ $t('help.explain.gpTitles')[0] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[0] }}</text>
				</view>
				<view>
					<view class="text">
						 {{ $t('help.explain.gpTexts')[1] }}
					</view>
					<view class="text">
						 {{ $t('help.explain.gpTexts')[2] }}
					</view>
					<image style="height: 368rpx;" src="../../static/course/sy_jc_gpjysm_1.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[3] }}</text>
				</view>
				<view>
					<view class="text">
						  {{ $t('help.explain.gpTexts')[4] }}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">{{ $t('help.explain.gpTitles')[1] }}</view>
				<view class="label flex flex-start align-start">
					<text>1.</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[5] }}</text>
				</view>
				<view>
					<image style="width: 478rpx;height: 660rpx;" src="../../static/course/sy_jc_gpjysm_2.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.1</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[6] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.gpTexts')[7] }}
					</view>
					<image style="height: 1180rpx;" src="../../static/course/sy_jc_gpjysm_3.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>2.2</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[8] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.gpTexts')[9] }}
					</view>
					<image style="height: 1110rpx;" src="../../static/course/sy_jc_gpjysm_4.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>3.</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[10] }}</text>
				</view>
				<view>
					<view class="text">
						  {{ $t('help.explain.gpTexts')[11] }}
					</view>
					<image style="width: 640rpx; height: 660rpx;" src="../../static/course/sy_jc_gpjysm_5.png"></image>
				</view>
				<view class="label flex flex-start align-start">
					<text>4.</text>
					<text class="p-l10">{{ $t('help.explain.gpTexts')[12] }}</text>
				</view>
				<view>
					<view class="text">
						{{ $t('help.explain.gpTexts')[13] }}
					</view>
					<image style="width: 678rpx;height: 658rpx;" src="../../static/course/sy_jc_gpjysm_6.png"></image>
				</view>
			</view>
			<view class="text item p-b20">
				  {{ $t('help.explain.gpTexts')[14] }}
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
			this.title = option.type == 'gp' ? this.$t('help.explain.navTitles')[0] : this.$t('help.explain.navTitles')[1]
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
