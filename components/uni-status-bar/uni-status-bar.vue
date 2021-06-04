<template>
	<view>
		<view :style="{ height: statusBarHeight, background: backgroundColor }" 
			:class="fixed ? 'uni-status--fixed' : ''"
			class="uni-status-bar">
			<slot />
		</view>
		<view class="uni-status__placeholder" 
			v-if="fixed"
			:style="{ height: statusBarHeight }"></view>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		name: 'UniStatusBar',
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			backgroundColor: {
				type: String,
				default: 'transparent'
			}
		},
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		width: 750rpx;
		height: 20px;
		// height: var(--status-bar-height);
	}
	.uni-status--fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;
	}
	.uni-status__placeholder {
		width: 100%;
	}
</style>
