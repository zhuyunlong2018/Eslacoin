<!-- 自定义加载组件 -->
<template>
	<view class="uni-page-loading"
		v-show="isShowLoading"
		:style="{top: isNavHeight ? `calc(88rpx + ${ navStatusHeighet }px)` : 0, bottom: isTabBarHeight ? '50px' : 0 }">
		<view class="content">
			<view class="text-center">
				<image class="loading-icon" src="@/static/gif/loading.gif" mode=""></image>
				<!-- <text class="icon"></text> -->
			</view>
			<!-- <view class="text">loading...</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"uni-loading",
		props: {
			// 是否计算底部 tab 栏高度
			isTabBarHeight: {
				type: Boolean,
				default: false
			},
			// 是否计算导航栏高度
			isNavHeight: {
				type: Boolean,
				default: true
			},
			// 控制 loading 显示隐藏
			isShowLoading: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			showLoading: {
				get() {
					return this.isShowLoading
				},
				set(val) {
					this.$emit('update:isShowLoading', val);
				}
			}
		},
		watch: {
			showLoading() {
				if (this.showLoading) {
					setTimeout(() => {
						this.showLoading = false;
					}, 3000)
				}
			}
		},
		data() {
			return {
				// 顶部导航状态栏高度
				navStatusHeighet: uni.getStorageSync('statusBarHeight'),
			};
		}
	}
</script>

<style lang="scss">
.uni-page-loading {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
}
.content {
	width: 200rpx;
	height: 200rpx;
	// background-color: rgba(0, 0, 0, .8);
	border-radius: 20rpx;
}
.loading-icon {
	width: 200rpx;
	height: 200rpx;
	border-radius: 10rpx;
}
.icon {
	display: inline-block;
	width: 40rpx;
	height: 40rpx;
	border: 1px solid $uni-text-color;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: uniLoading 0.6s linear infinite;
}
.text {
	padding-top: 10rpx;
	font-size: 28rpx;
	color: $uni-text-color;
}
@keyframes uniLoading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
