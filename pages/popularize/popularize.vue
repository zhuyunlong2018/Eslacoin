<!-- 邀请主页 -->
<template>
	<view class="root">
		<view class="top-view flex" >
			<view class="top-view-item">
				<view>
					<text class="text">今日佣金分成</text>
					<text class="unit">/USDT</text>
				</view>
				<view>
					<text class="number">{{ todayNumbe }}</text>
					<text class="unit-left">/USDT</text>
				</view>
				
			</view>
			<view class="top-view-item right">
				<view>
					<text class="text">累计佣金分成</text>
					<text class="unit">/USDT</text>
				</view>
				<view>
					<text class="number">{{ countNumber }}</text>
					<text class="unit-right">/USDT</text>
				</view>
			</view>
		</view>
		
		<view class="button-view">
			<image src="../../static/invitation/wd_yqzy_image_jryq.png"
				 @click="onJoinClick"></image>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower='scrollFn'>
			<view class="list-view">
				<view class="no-data" v-if="tableData.length == 0">暂无数据</view>
				<view class="list-item flex" 
					:class="index > 0 ?'m-t10' : ''"
					v-for="(item,index) in tableData" :key="index">
					<text class="phone" style="width: 15%;">{{item.Account}}</text>
					<view class="text-center" style="width: 40%;">
						<text class="phone">邀请奖励：</text>
						<text class="number">{{item.Coin}}</text>
						<text class="unit">/USDT</text>
					</view>
					<text class="time">{{item.Time}}</text>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import uniList from '@/components/uni-list/uni-list.vue';
	export default {
		components: {
			uniList
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				todayNumbe: '0',
				countNumber: '0',
				tableData:[],
				// 存储数据
				dataList: [],
				pageIndex: 1,
				pageSize: 15,
				loading: false
			}
		},
		computed: {
			...mapState({
				statusBarHeight: state => state.statusBarHeight
			})
		},
		onShow() {
			this.pageIndex = 1;
			this.loading = false;
			this.getData();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取邀请数据
			getData () {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetTotalTeamInfoReq', {}).then(res => {
					console.log(res)
					this.todayNumbe = res.TodayTotalCoin;
					this.countNumber = res.AllTotalCoin;
					// this.dataList = [...res.LowerDataList]
					this.tableData = [...res.LowerDataList.splice(0, 20)];
					// if (this.dataList.length == this.tableData.length) {
					// 	this.loading = true;
					// }
				}).catch(err => {})
			},
			scrollFn(res) {
				
			},
			onJoinClick(){
				uni.navigateTo({
					url:'/pages/popularize/team'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #e7ebf9;
	}
	.root {
		
		text{
			font-size: 25rpx;
			color: #626262;
		}
	}
	.top-view{
		padding: 25rpx 25rpx 55rpx 25rpx;
		height: 100rpx;
		background: linear-gradient(225deg, #5e7eff 0%, #3a60f6 100%);
		position: relative;
		.top-view-item{
			position: absolute;
			bottom: -80rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding: 9rpx;
			width: calc(50% - 35rpx);
			box-sizing: border-box;
			border-radius: 16rpx;
			height: 160rpx;
			background-color: #ffffff;
			box-shadow: 0 2rpx 5rpx 0 rgba(17, 58, 217, 0.27)
		}
		.right {
			// background-color: #f2f7ff;
			right: 25rpx;
			.number {
				color: #291ff5;
			}
			.text::after { 
				background-color: #291ff5;
			}
		}
		.number {
			font-size: 42rpx;
			color: #f35050;
		}
		.unit {
			font-size: 20rpx;
			color: #686868;
		}
		.unit-left {
			font-size: 26rpx;
			color: #f35050;
		}
		.unit-right {
			font-size: 26rpx;
			color: #291ff5;
		}
		.text {
			padding-left: 20rpx;
			font-size: 26rpx;
			color: #333335;
			position: relative;
			&::after {
				content: ' ';
				position: absolute;
				width: 8rpx;
				height: 8rpx;
				background-color: #f35050;
				border-radius: 50%;
				top: 16rpx;
				left: 5rpx;
			}
		}
		
	}
	.button-view {
		padding: 125rpx 28rpx 10rpx;
		background-color: #ffffff;
		image {
			width: 100%;
			height: 160rpx;
		}
	}
	.list-view {
		// height: calc(100vh - 550rpx);
		background-color: #e7ebf9;
		// box-sizing: border-box;
		padding: 20rpx 14rpx;
		// border-top: 16rpx solid #f4f6fa;
		// padding: 0 28rpx 20rpx;
		.list-item{
			background-color: #ffffff;
			padding: 18rpx;
			border-radius: 6rpx;
		}
		.unit {
			font-size: 20rpx;
			color: #838385;
		}
		.phone {
			font-size: 26rpx;
			color: #333335;
		}
		.number {
			font-size: 30rpx;
			color: #291ff5;
		}
		.time {
			text-align: center;
			font-size: 24rpx;
			color: #333335;
		}
	}
	.scroll-view {
		max-height: calc(100vh - 485rpx);
	}
</style>
