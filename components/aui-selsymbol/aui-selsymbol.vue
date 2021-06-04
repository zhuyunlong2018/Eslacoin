<template>
	<view class="root" v-if="showPopup">
		<view class="mask"></view>
		<view class="center-view">
			<view class="item" v-for="key in symbolList" :key="key">
				<view class="spline"></view>
				<view class="v1">
					<text class="t1">{{key}}</text>
					<text class="t2">></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 属性
		//*******************************************************************
		props:{
			
		},
		
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				showPopup: true,
				info: '',
				symbolList: ['btcusdt', 'ethusdt', 'xrpusdt', 'eosusdt', 'trxusdt', 'bchusdt', 'bsvusdt', 'dotusdt'],
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
	.center-view{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		height: 800rpx;
		background-color: #ffffff;
		.item{
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 80rpx;
			.spline{
				width: 100%;
				height: 1rpx;
				background-color: #f1f1f1;
			}
			.v1{
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 100%;
				margin-top: 25rpx;
				.t1{
					margin-left: 20rpx;
				}
				.t2{
					margin-left: 20rpx;
				}
			}
		}
	}

</style>