<!-- 引导页 -->
<template>
	<view class="root">
		<swiper class="swiper"
			v-if="!launchFlag"
			indicator-color='rgba(206, 211, 233, 0.23)'
			indicator-active-color="#a6b5cb"
			:indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="../../static/guide/qdy_ch_1.png" mode=""></image>
					<view class="info">
						<view class="title">
							{{ $t('guide.titles')[0] }}
						</view>
						<view class="text">
							{{ $t('guide.texts')[0] }}
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="../../static/guide/qdy_ch_2.png" mode=""></image>
					<view class="info p-lr70">
						<view class="title">
							{{ $t('guide.titles')[1] }}
						</view>
						<view class="text">
							{{ $t('guide.texts')[1] }}
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="../../static/guide/qdy_ch_3.png" mode=""></image>
					<view class="info p-lr70">
						<view class="title">
							{{ $t('guide.titles')[2] }}
						</view>
						<view class="text">
							{{ $t('guide.texts')[2] }}
						</view>
						<view 
							:style="{'margin-top': language == 'en' ? '8%' : '20%'}"
							@click="openHome" class="btn">{{ $t('guide.btn') }}</view>
					</view>
					
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeFn: null,
				language: uni.getStorageSync('language'),
				launchFlag: uni.getStorageSync('launchFlag')
			};
		},
		onLoad() {
			// 判断是否是首次启动 fasle - 是首次启动  true - 不是首次启动
			let launchFlag = uni.getStorageSync('launchFlag');
			if (launchFlag) {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}
		},
		methods: {
			// 打开首页
			openHome () {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					uni.setStorageSync('launchFlag', true);
					uni.reLaunch({
						url: '/pages/home/home'
					})
				}, 200)
			}
		}
	}
</script>

<style lang="scss" scoped>
.root {
	background-image: linear-gradient(0, #242e45 0%, #233049 50%, #192235 100%);
	height: 100Vh;
	width: 100%;
}
.swiper {
	height: 100%;
	width: 100%;
	
	.img {
		width: 750rpx;
		height: 1624rpx;
	}
}
.swiper-item {
	height: 100%;
	width: 100%;
	position: relative;
}
.info {
	position: absolute;
	left: 0;
	right: 0;
	top: 63%;
	padding: 0 30rpx;
	text-align: center;
	.title {
		font-size: 46rpx;
		color: $uni-text-color;
		padding-bottom: 14rpx;
	}
	.text {
		font-size: 36rpx;
		color: #849cb9;
	}
	.btn {
		width: 264rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		color: #849cb9;
		margin: 20% auto 0;
		font-size: 36rpx;
		border-radius: 8rpx;
		border: 2rpx solid #849cb9;
	}
}
.p-lr70 {
	padding: 0 65rpx;
}
	
</style>
