<!-- 合约组件 -->
<template>
	<scroll-view
		:scroll-y="true"
		style="display: inline-block;width: 100%;"
		:style="{height: `${ovHeight}px`}"
		@scrolltolower="scrolltolowerFn"
		class="content-row">
		
		<view class="list" style="width: 100%;">
			<!-- 暂无数据 -->
			<view class="no-data" 
				v-if="tablelData.length == 0 && isLoading == 0">
				{{ $t('quotations.home.noData') }}
			</view>
			
			<view class="list-item flex" 
				v-for="(item, index) in tablelData"
				:key="'$_list_contract_' + index"
				:class="index > 0 ? 'btn-t-2' : ''"
				@click="openPage(item)">
				
				<view class="left">
					<view class="flex flex-start">
						<image :src="item.Icon || '../../static/icon/other.png'" class="img"></image>
						<view style="width: calc(100% - 50rpx);" class="no-wrap flex">
							<text class="name text-overflow">{{ item.Name }}</text>
						</view>
					</view>
					<view class="text flex flex-start">
						<text style="width: 40rpx;" class="text-center">{{ index + 1 }}</text>
						<text class="p-l10" >
							{{ item.NumMarketPairs }}</text>
					</view>
				</view>
				
				
				<view class="center">
					<view class="number bold">{{ item.Price }}</view>
					
					<view class="text">￥{{ item.CnyMoney }}</view>
				</view>
				<!-- 进度条 -->
				<view class="right flex">
					<view class="line flex">
						<text class="bg-color" :style="{'width': item.Score * 10 + '%'}"></text>
					</view>
					<text class="w30px text-right font-18">{{ item.Score }}</text>
				</view>
			</view>
		</view>
		
		<MescrollUp :option="upOpt" v-show="isLoading != 0" :type="isLoading" />
	
		
	</scroll-view>
	
</template>

<script>
	import MescrollUp from "@/components/uni-scroll/mescroll-uni/components/mescroll-up.vue";
	export default {
		components: {
			MescrollUp
		},
		props: {
			// 滚动区域高度
			ovHeight: {
				type: Number,
				default: 400
			},
			// 是否显示上拉加载效果
			isLoading: {
				type: Number,
				default: 0
			},
			// 币对列表数据
			tablelData: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 配置上拉加载样式
			upOpt: {
				type: Object,
				default: () => {
					return {}
				}
			}
			
		},
		data() {
			return {
				
			};
		},
		methods: {
			scrolltolowerFn() {
				this.$emit('scrolltolowerFn');
			},
			// 打开页面
			openPage (item) {
				if (['exchange', 'contract'].includes(this.activedType)) return false;
				uni.setStorageSync('self', item.SelfChoose);
				uni.navigateTo({
					url: `/pages/quotations/quotations_detail?sym=${ item.Symbol }`
				})
			} 
		}
	}
</script>

<style lang="scss">
.list {
	width: 100%;
	display: inline-block;
	box-sizing: border-box;
}
.list-item {
	padding: 22rpx 28rpx;
	&::after {
		border-top: 1px solid #172840;
	}
	&::before {
		border-top: 1px solid #000000;
	}
	.name {
		font-size: 28rpx;
		font-weight: 700;
		color: $uni-text-color;
	}
	.left {
		width: 220rpx;
	}
	.img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 10rpx;
		background-color: #ffffff;
	}
	.left-value {
		width: calc(100% - 74rpx);
	}
	.center {
		width: 220rpx;
	}
	.text {
		padding-top: 10rpx;
		font-size: 22rpx;
		font-weight: 700;
		color: $uni-text-color-grey;
	}
	.number {
		font-size: 28rpx;
		color: $uni-text-color;
	}

	.right {
		color: $uni-text-color;
	}
	.line {
		width: 120rpx;
		height: 20rpx;
		border-radius: 2rpx;
		background-color: #20324a;
		color: $uni-text-color;
	}
	.bg-color {
		display: inline-block;
		height: 20rpx;
		width: 100%;
		border-radius: 2rpx 0 0 2rpx;
		background-image: linear-gradient(90deg, #19a8af 0%, #2bc6c1 100%);
	}
	.w140r {
		width: 280rpx;
	}
	
}

</style>
