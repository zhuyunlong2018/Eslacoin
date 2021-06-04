<template>
	<view class="root">
		<text class="textbtn" @click="onTitleClick()">{{titleText}}</text>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 属性
		//*******************************************************************
		props:{
			titleText: '',
		},
		
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			onTitleClick(){
				uni.showModal({
					content: '点击了组件标题 + ' + this.titleText,
					showCancel: false,
				})
			},
		},
	}
</script>

<style lang="scss">
	.root {
	
	}
	.textbtn{
		background-color: #cacaff;
		margin-top: 5rpx;
	}
</style>