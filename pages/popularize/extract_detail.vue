<!-- 提币明细页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('invite.extractDetail.navTitle')"
		/>
		<mescroll-body ref="mescrollRef_d" @init="mescrollInit" 
			:height='screenHeight'
			@down="downCallback" :down="downOption" :up="upOption">
		
		<scroll-view class="scroll-view" :scroll-y="true"
			:style="{height: screenHeight + 'px'}"
			@scrolltolower="scrollFn">
			<view  style="height: 1rpx;"></view>
			<view class="detail-list" v-if="extractDetailList.length != 0">
				<view class="detail-item" 
					:class="index > 0 ? 'm-t10' : ''"
					v-for="(item, index) in extractDetailList"
					:key="index">
					<view class="flex">
						<view class="no-wrap">
							<text class="label">{{ $t('invite.extractDetail.labels')[0] }}：</text>
							<text class="value number">{{ item.Coin }}</text>
							<text class="unit">/USDT</text>
						</view>
						<view class="no-wrap">
							<text class="label">{{ $t('invite.extractDetail.labels')[1] }}：</text>
							<text class="status success" v-if="item.State == 1">{{ $t('invite.extractDetail.status')[0] }}</text>
							<text class="status apply" v-if="item.State == 2">{{ $t('invite.extractDetail.status')[1] }}</text>
							<text class="status examine" v-if="item.State == 3">{{ $t('invite.extractDetail.status')[2] }}</text>
						</view>
					</view>
					<view class="flex flex-start p-t20">
						<text class="label">{{ $t('invite.extractDetail.labels')[2] }}：</text>
						<text class="value">
							{{ item.AddrType == 1 ? 'TRC20-USDT' : 'ERC20-USDT' }}
						</text>
					</view>
					<view class="flex flex-start p-t20">
						<text class="label">{{ $t('invite.extractDetail.labels')[3] }}：</text>
						<text class="time">{{ item.CreateTime }}</text>
					</view>
					<view class="flex flex-start align-start p-t20">
						<text class="label" style="padding-top: 6rpx;">{{ $t('invite.extractDetail.labels')[4] }}：</text>
						<text class="value address">{{ item.Address }}</text>
					</view>
					<view class="flex flex-start p-t20">
						<text class="label">{{ $t('invite.extractDetail.labels')[5] }}：</text>
						<text class="value">{{ item.OrderId }}</text>
					</view>
				</view>
			</view>
			<MescrollUp :option="upOpt" v-show="loadingType != 0" :type="loadingType" />
		</scroll-view>
	
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/uni-scroll/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/uni-scroll/mescroll-body/mescroll-body.vue";
	import MescrollUp from "@/components/uni-scroll/mescroll-uni/components/mescroll-up.vue";
	export default {
		components: {
			MescrollBody,
			MescrollUp
		},
		mixins: [MescrollMixin],
		//*******************************************************************
		// 数据
		//*******************************************************************
		data () {
			return {
				upOpt: {
					bgColor: '#000E18',
					textColor: '#CED3E9',
					textLoading: 'Loading',
					textNoMore: this.$t('invite.extractDetail.noData')
				},
				loadingType: 0,
				// 提取明细列表
				extractDetailList: [],
				TotalCount: 0,
				pageIndex: 1,
				pageSize: 6,
				loading: false,
				screenHeight: uni.getStorageSync('screenHeight'),
				downOption: {
					auto: false
				},
				upOption: {
					auto: false,
					use: false,
					page: {
						size: 10
					},
					noMoreSize: 5,
					textNoMore: '暂无数据',
					empty: {
						tip: '暂无数据'
					}
				},
			};
		},
		onShow() {
			this.pageIndex = 1;
			this.extractDetailList = [];
			this.loading = false;
			this.getDetailList();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			downCallback() {
				this.pageIndex = 1;
				this.getDetailList();
				
			},
			upCallback(page) {
				console.log(page)
				this.pageIndex++;
				this.getDetailList();
			},
			// 获取提取明细列表
			getDetailList () {
				this.loadingType = 1;
				this.CsHttp.post(this.ApiConfig.User + '/BSCashOrderListReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Page: this.pageIndex,
					Size: this.pageSize
				}, false).then(res => {
					this.TotalCount = res.TotalCount;
					if(this.pageIndex == 1) {
						this.extractDetailList = [...res.CashOrderList];
					} else {
						this.extractDetailList.push(...res.CashOrderList);
					}
					if (this.extractDetailList.length == res.TotalCount) {
						this.loading = true;
					}
					if (res.TotalCount == 0) {
						this.loadingType = 2;
					} else {
						this.loadingType = 0;
					}
					this.mescroll.endBySize(res.CashOrderList.length, res.TotalCount);
					
				}).catch(err => {
					this.pageIndex--;
					this.loading = false;
				})
			},
			scrollFn() {
				if (this.loading) return false;
				this.loading = true;
				this.pageIndex++;
				this.getDetailList();
			}
		}
	}
</script>

<style lang="scss">
	
.detail-list {
	padding: 10rpx 28rpx;
}
.scroll-view {
	// height: 100vh;
}
.detail-item {
	background-color: $uni-bg-color;
	border-radius: 14rpx;
	padding: 18rpx 15rpx 25rpx;
	.label {
		font-size: 26rpx;
		color: $uni-text-color-grey;
		white-space: nowrap;
	}
	.value {
		font-size: 26rpx;
		color: $uni-text-color;
	}
	.number {
		font-size: 30rpx;
		color: $uni-color-primary;
	}
	.unit {
		font-size: 20rpx;
		color: $uni-text-color-grey;
		padding-left: 5rpx;
	}
	.time {
		font-size: 24rpx;
		color: $uni-text-color;
	}
	.status {
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 8rpx;
		background-color: rgba(42, 163, 177, 0.18);
		font-size: 24rpx;
		color: rgba(42, 163, 177, 0.8);
		padding: 0 24rpx;
	}
	.address {
		font-size: 28rpx;
		background-color: #131d2c;
		position: relative;
		word-break: break-word;
		padding: 6rpx 9rpx;
		color: #c4aa95;
		width: 100%;
	}
}
</style>
