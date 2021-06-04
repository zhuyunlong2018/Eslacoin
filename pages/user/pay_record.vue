<!-- 充值记录页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.payRecord.navTitle')"
		/>
		
		<mescroll-body ref="mescrollRef_d"
			:height="screenHeight"
			 @init="mescrollInit" @down="downCallback" :down="downOption" :up="upOption">
		
			<scroll-view class="scroll-view" :scroll-y="true" 
				:style="{height: screenHeight + 'px'}"
				@scrolltolower="scrollFn">
				<view style="height: 1rpx;"></view>
				<view class="commission-view" v-if="tableData.length != 0">
					<view class="list-item"
						v-for="(item,index) in tableData" :key="'record_' + index">
						<view class="flex">
							<view>
								<text class="number bold">+{{item.Coin}}</text>
								<text class="unit">/USDT</text>
							</view>
							<text class="status no-pay" v-if="item.State == 2">{{ $t('user.payRecord.ststus'[1]) }}</text>
							<text class="status" v-if="item.State == 1">{{ $t('user.payRecord.ststus')[0] }}</text>
							<text class="time">{{item.CreateTime }}</text>
						</view>
						<view class="flex flex-start align-start">
							<text class="label no-wrap">{{ $t('user.payRecord.address') }}：</text>
							<view @click="copyBtn(item.FromAddress)" class="text m-t10">{{ item.FromAddress }}</view>
						</view>
						<view class="flex flex-start align-start">
							<text class="label no-wrap">{{ $t('user.payRecord.id') }}：</text>
							<view @click="copyBtn(item.TxId)" class="text m-t10">{{ item.TxId }}</view>
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
		data() {
			return {
				upOpt: {
					bgColor: '#000E18',
					textColor: '#CED3E9',
					textLoading: 'Loading',
					textNoMore: this.$t('user.payRecord.noData')
				},
				loadingType: 0,
				tableData:[],
				TotalCount: 0,
				pageIndex: 1,
				pageSize: 10,
				loading: false,
				screenHeight: uni.getStorageSync('screenHeight'),
				timeFn: null,
				downOption: {
					auto: false
				},
				upOption: {
					auto: false,
					page: {
						size: 10
					},
					noMoreSize: 5,
					textNoMore: '暂无数据',
					empty: {
						tip: '暂无数据'
					}
				},
			}
		},
		methods: {
			downCallback() {
				this.pageIndex = 1;
				this.getPayList();
				
			},
			upCallback(page) {
				this.pageIndex++;
				this.getPayList();
			},
			// 获取充值明细
			getPayList() {
				this.loadingType = 1;
				this.CsHttp.post(this.ApiConfig.User + '/BSRechargeOrderListReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Page: this.pageIndex,
					Size: this.pageSize
				}, false).then(res => {
					this.TotalCount = res.TotalCount;
					if(this.pageIndex == 1) {
						this.tableData = [...res.RechargeOrderList];
					} else {
						this.tableData.push(...res.RechargeOrderList);
					}
					if (this.tableData.length == res.TotalCount) {
						this.loading = true;
					}
					if (res.TotalCount == 0) {
						this.loadingType = 2;
					} else {
						this.loadingType = 0;
					}
					this.mescroll.endBySize(res.RechargeOrderList.length, res.TotalCount);
					
				}).catch(err => {
					this.pageIndex--;
					this.loading = false;
				})
			},
			// 区域滚动事件
			scrollFn (ev) {
				if (this.loading) return false;
				this.loading = true;
				this.pageIndex++;
				this.getPayList();
				
			},
			copyBtn(data) {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data,
					})
					// #endif
					// #ifdef H5
					let text = document.createElement('textarea');
					document.body.appendChild(text);
					text.value = data;
					text.select();
					document.execCommand('copy');
					text.remove();
					uni.showToast({
						title: "内容已复制",
						icon: 'success',
						duration: 1000
					})
					// #endif
				}, 200)
			}
		},
		onShow() {
			this.pageIndex = 1;
			this.tableData = [];
			this.loading = false;
			this.getPayList();
			
		}
	}
</script>

<style lang="scss">
	
	.root {
		text{
			font-size: 25rpx;
			color: #626262;
		}
	}
	.thead {
		background-color: #efefef;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 30rpx;
	}
	.scroll-view {
	}
	.commission-view {
		padding: 0 14rpx;
	}
	.list-item {
		
		background-color: $uni-bg-color;
		padding: 15rpx;
		margin-top: 10rpx;
		border-radius: 6rpx;
		text {
			font-size: 26rpx;
			color: $uni-text-color;
		}
		.number {
			color: #d14b64;
			font-size: 36rpx;
		}
		.unit {
			font-size: 20rpx;
			color: $uni-text-color-grey;
		}
		.time {
			font-size: 24rpx;
			white-space: nowrap;
		}
		.status {
			font-size: 24rpx;
			color: #2aa3b1;
			background-color: rgba(10, 197, 147, 0.08);
			opacity: 0.8;
			padding: 4rpx 24rpx;
			border-radius: 8rpx;
		}
		.no-pay {
			color: #f35050;
			background-color: rgba(243, 80, 80, 0.08);
		}
		.label {
			font-size: 24rpx;
			padding-top: 16rpx;
			width: 150rpx;
		}
		.text {
			font-size: 24rpx;
			color: $uni-text-color-grey;
			padding: 10rpx;
			width: calc(100% - 150rpx);
			background-color: #182134;
			border-radius: 6rpx;
			word-break: break-all;
		}
	}
	
</style>


