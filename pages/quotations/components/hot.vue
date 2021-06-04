<!-- 热搜组件 -->
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
				:key="'$_list_hot_' + index"
				:class="index > 0 ? 'btn-t-2' : ''"
				@click="openPage(item)">
				
				<!-- 热搜榜 -->
				<view class="left">
					<view class="flex flex-start">
						<text class="serial">{{ index + 1 }}</text>
						<view style="width: calc(100% - 50rpx);" class="no-wrap">
							<text class="name bold">{{ item.Symbol }}</text>
						</view>
					</view>
					<view class="text flex flex-start">
						<view style="width: 40rpx;" class="flex flex-center">
							<text v-if="item.RankChange < 0" class="down iconfont iconxiadie"></text>
							<text v-else class="up iconfont iconshangzhang"></text>
							<text style="color: #d14b64;" v-if="item.RankChange < 0">{{ String(item.RankChange).replace('-', '') }}</text>
							<text style="color: #04ac90;" v-else>{{ item.RankChange }}</text>
						</view>
						<text class="p-l10">{{ item.Name }}</text>
					</view>
				</view>
				
				<view class="center">
					<view class="number bold">{{ item.Deal }}</view>
					<view class="green"
						:class="{'red': item.PriceChangePer < 0}">
						{{ item.PriceChangePer < 0 ? '' : '+' }}{{ item.PriceChangePer }}%
					</view>
				</view>
				<!-- 热度 -->
				<uni-heat :heatValue="item.Hot" />
			</view>
		</view>
		
		<MescrollUp :option="upOpt" v-show="isLoading != 0" :type="isLoading" />
	
		
	</scroll-view>
	
</template>

<script>
	import MescrollUp from "@/components/uni-scroll/mescroll-uni/components/mescroll-up.vue";
	import UniHeat from '@/components/uni-heat/uni-heat.vue';
	export default {
		components: {
			MescrollUp,
			UniHeat
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
	.serial {
		width: 44rpx;
		height: 44rpx;
		background-color: #d14b64;
		border-radius: 4rpx;
		font-size: 26rpx;
		text-align: center;
		color: #ffffff;
		line-height: 44rpx;
		margin-right: 6rpx;
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
		.green {
			font-size: 24rpx;
			padding-top: 10rpx;
			color: $uni-color-primary;
		}
		.red {
			font-size: 24rpx;
			padding-top: 10rpx;
			color: #d14b64;
			background-color: transparent;
		}
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
	.red {
		background-color: #d14b64;
	}
	.right {
		color: $uni-text-color;
	}

	.up {
		color: #04ac90;
		font-size: 16rpx;
		margin-top: -2rpx;
	}
	.down {
		color: $uni-text-color-red;
		font-size: 16rpx;
		margin-top: -2rpx;
	}
	.w140r {
		width: 280rpx;
	}
	
}

</style>
