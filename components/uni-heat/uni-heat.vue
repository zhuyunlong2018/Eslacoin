<!-- 火热程度 -->
<template>
	<view class="uni-heat flex flex-end">
		<view class="icon flex" v-for="(item, index) in heatNumber" :key="'heat_' + index">
			<image v-if="heatValue > index" class="img" src="../../static/icon/hq_rs1.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 热度长度
			heatNumber: {
				type: Number,
				default: 3
			},
			// 热度值
			heatValue: {
				type: Number,
				default: 2
			},
		}
	}
</script>

<style lang="scss" scoped>
.uni-heat {
    flex-direction: row-reverse;
	.icon {
		width: 24rpx;
		height: 30rpx;
		background-image: url(../../static/icon/hq_rs2.png);
		background-size: cover;
		margin-left: 10rpx;
	}
	.img {
		width: 24rpx;
		height: 30rpx;
	}
}
</style>
