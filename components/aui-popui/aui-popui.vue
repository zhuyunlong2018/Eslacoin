<template>
	<view class="root" v-if="showPopup">
		<view class="mask"></view>
		<view class="center_view">
			<text>{{title}}</text>
			<view class="text_view">
				<text>{{info}}</text>
			</view>
			<text @click="oncloseClick()">确认</text>
		</view>
	</view>
</template>

<script>
	export default {
		
		//*******************************************************************
		// 属性
		//*******************************************************************
		props:{
			title: '',
		},
		
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				showPopup: false,
				info: '',
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			showPopUi(info){
				this.info = info
				this.showPopup = true
			},
			
			oncloseClick(){
				this.showPopup = false
			}
		},
		
	}
</script>

<style lang="scss">
	.root{
		position: fixed;
		z-index: 1000; 
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
	}
	.center_view{
		width: 100%;
		height: 400rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.text_view{
		width: 60%;
		height: 250rpx;
		background-color: #7ce7ff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>