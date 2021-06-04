<!-- 自选组件 -->
<template>
	<scroll-view
		:scroll-y="true"
		style="display: inline-block;width: 100%;"
		:style="{height: `${ovHeight}px`}"
		@scrolltolower="scrolltolowerFn"
		class="content-row">
		
		<view class="list" style="width: 100%;">
			
			<!-- 暂无自选币种 -->
			<view class="recommend-coin"
				v-if="tablelData.length == 0 && isLoading == 0">
				<view class="tip">{{ $t('quotations.home.texts')[2] }}</view>
				<view class="flex flex-wrap" style="height: 400rpx;">
					<view class="item flex btn-b-1" v-for="(item, index) in recommendCoinList" :key="'coin_' + index">
						<view class="left">
							<view>
								<text class="symbol bold">{{ item.Symbol }}</text>
							</view>
							<view class="unit">{{ item.Symbol }}/USDT</view>
						</view>
						<view class="right">
							<text class="iconfont icon icon_gou"
								@click="checkedCoinFn(index)"
								:class="item.recommend ? 'icon-actived' : ''"></text>
						</view>
					</view>
				</view>
				<view class="p-l30 p-r30">
					<uni-botton @click="addSelfChoose" :btnText="$t('quotations.home.texts')[3]" :marginTop="260" />
				</view>
			</view>
			
			<view class="list-item flex" 
				v-for="(item, index) in tablelData"
				:key="'$_list_self_' + index"
				:class="index > 0 ? 'btn-t-2' : ''"
				@click="openPage(item)">
				<view class="left w140r flex flex-start">
					<image :src="item.Icon || '../../static/icon/other.png'" class="img hq-img"></image>
					<view class="left-value">
						<view>
							<text class="name bold">{{ item.Symbol }}</text>
							<text class="unit">/USDT</text>
						</view>
						<view class="text">24H{{ $t('quotations.home.texts')[0] }} ￥{{ item.Deal }}</view>
					</view>
				</view>
				
				<view class="center">
					<view class="number bold">{{ item.Price }}</view>
					<view class="text">￥{{ item.CnyMoney }}</view>
				</view>
				
				<view class="right flex bold">
					<text class="rate" :class="{'red': item.PriceChangePer < 0}">
						{{ item.PriceChangePer < 0 ? '' : '+' }}{{ item.PriceChangePer }}%</text>
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
			},
			// 自选推荐币种
			recommendCoinList: {
				type: Array,
				default: () => {
					return []
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
			checkedCoinFn(index) {
				this.$emit('checkedCoinFn', index);
			},
			addSelfChoose() {
				this.$emit('addSelfChoose');
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
	.unit {
		font-size: 22rpx;
		font-weight: 700;
		color: #475E7B;
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
	.rate {
		height: 66rpx;
		line-height: 66rpx;
		background-color: #04AC90;
		color: #ffffff;
		width: 164rpx;
		text-align: center;
		font-size: 28rpx;
		border-radius: 8rpx;
	}
	.red {
		background-color: #d14b64;
	}
	.right {
		color: $uni-text-color;
	}
	
	.w140r {
		width: 280rpx;
	}
	
}
.recommend-coin {
	padding: 0 28rpx;
	.tip {
		font-size: 36rpx;
		color: $uni-text-color;
		padding: 40rpx 0;
		text-align: center;
	}
	.item {
		width: 47%;
		height: 124rpx;
		&::after {
			border-bottom: 1px solid #1f304a;
		}
		.symbol {
			font-size: 32rpx;
			color: $uni-text-color;
		}
		.name {
			font-size: 22rpx;
			color: #3f536b;
		}
		.unit {
			font-size: 26rpx;
			color: $uni-text-color-grey;
		}
		.icon {
			color: #6f87a4;
			font-size: 24rpx;
		}
		.icon-actived {
			color: $uni-color-primary;
		}
	}
}

</style>
