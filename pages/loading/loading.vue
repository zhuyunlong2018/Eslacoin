<template>
	<view class="root">
		<image src="../../static/bg/loading.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		onShow() {
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}, 5000)
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.root {
	width: 100%;
	height: 100vh;
}
image {
	width: 100%;
	height: 100%;
}
</style>
