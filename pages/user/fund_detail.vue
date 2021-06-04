<!-- 资金明细 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.fundDetail.navTitle')"
		/>
		<mescroll-body ref="mescrollRef_d" @init="mescrollInit"
			:height="screenHeight"
			@down="downCallback" :down="downOption" :up="upOption">
			
			<scroll-view class="scroll-view" :scroll-y="true" 
				:style="{height: screenHeight + 'px'}"
				@scrolltolower="scrollFn">
				<view style="height: 1rpx;"></view>
				<view class="commission-view" v-if="tableData.length != 0">
					<view class="list-item"
						v-for="(item,index) in tableData" :key="item.Account + '_' + index">
						<view class="flex">
							<view style="width: 30%;">
								<text v-if="[1, 3].includes(item.OptType)" class="number bold red">+{{item.OptCoin}}</text>
								<text v-else class="number bold">-{{item.OptCoin}}</text>
								<text class="unit">/USDT</text>
							</view>
							<text class="status"
								:class="{'buy': item.OptType == 4, 'pay': item.OptType == 1}"
								>{{ $t('user.fundDetail.accountType')[item.OptType - 1] }}</text>
							<text class="time">{{item.CreateTime }}</text>
						</view>
						<view class="flex p-t10">
							<view>
								<text class="label">{{ $t('user.fundDetail.balance')[0] }}：</text>
								<text class="money">{{ item.PreCoin }}</text>
								<text class="unit">/USDT</text>
							</view>
							<view>
								<text class="label">{{ $t('user.fundDetail.balance')[1] }}：</text>
								<text class="money">{{ item.NxtCoin }}</text>
								<text class="unit">/USDT</text>
							</view>
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
		data() {
			return {
				upOpt: {
					bgColor: '#000E18',
					textColor: '#CED3E9',
					textLoading: 'Loading',
					textNoMore: this.$t('user.fundDetail.noData')
				},
				loadingType: 0,
				tableData:[],
				// 账户变动类型  1充值 2提现 3佣金 4购买服务
				accountTypeList: ['充值', '提现', '佣金', '购买服务'],
				dataList: [],
				TotalCount: 0,
				pageIndex: 1,
				pageSize: 15,
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
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			downCallback() {
				this.pageIndex = 1;
				this.getFundList();
				
			},
			upCallback(page) {
				console.log(page)
				this.pageIndex++;
				this.getFundList();
			},
			// 获取资金明细
			getFundList() {
				this.loadingType = 1;
				this.CsHttp.post(this.ApiConfig.User + '/BSAccountOrderListReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Page: this.pageIndex,
					Size: this.pageSize
				}, false).then(res => {
					this.TotalCount = res.TotalCount;
					if(this.pageIndex == 1) {
						this.tableData = [...res.AccountOrderList];
					} else {
						this.tableData.push(...res.AccountOrderList);
					}
					if (this.tableData.length == res.TotalCount) {
						this.loading = true;
					}
					if (res.TotalCount == 0) {
						this.loadingType = 2;
					} else {
						this.loadingType = 0;
					}
					this.mescroll.endBySize(res.AccountOrderList.length, res.TotalCount);
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
				this.getFundList();
				
			}
		},
		onShow() {
			this.pageIndex = 1;
			this.tableData = [];
			this.loading = false;
			this.getFundList();
			
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
	.commission-view {
		padding: 0 14rpx;
	}
	.list-item {
		border-radius: 8rpx;
		background-color: $uni-bg-color;
		padding: 14rpx 16rpx 20rpx 16rpx;
		margin-top: 10rpx;
		text {
			font-size: 26rpx;
			color: #333335;
		}
		.number {
			font-size: 36rpx;
			color: #04ac90;
		}
		.red {
			color: #d14b64;
		}
		.unit {
			font-size: 20rpx;
			color: $uni-text-color-grey;
		}
		.time {
			font-size: 24rpx;
			color: $uni-text-color-grey;
			white-space: nowrap;
		}
		.status {
			font-size: 24rpx;
			color: #333335;
			opacity: 0.8;
			padding: 4rpx 24rpx;
			border-radius: 8rpx;
			background-color: #e6e6ef;
		}
		.buy {
			background-color: rgba(254, 231, 216, 0.2);
			color: rgba(245, 154, 75, 0.8);
		}
		.pay {
			background-color: rgba(206, 244, 233, 0.16);
			color: #04ac90;
		}
		.label {
			font-size: 22rpx;
			color: $uni-text-color-grey;
		}
		.money {
			font-size: 30rpx;
			color: $uni-text-color;
		}
	}
	
</style>

