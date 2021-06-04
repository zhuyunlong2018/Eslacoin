<!-- 佣金明细页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('invite.commission.navTitle')"
		/>
		<view class="thead flex">
			<text style="width: 20%;">{{ $t('invite.commission.labels')[0] }}</text>
			<text class="text-center" style="width: 30%;">{{ $t('invite.commission.labels')[1] }}</text>
			<text class="text-right" style="width: 40%;">{{ $t('invite.commission.labels')[2] }}</text>
		</view>
		<view :style="{height: `calc(${screenHeight}px - 66rpx)`, 'overflow-y': 'auto',}">
		<mescroll-body ref="mescrollRef_d" @init="mescrollInit"
			:height="screenHeight"
			@down="downCallback" :down="downOption" :up="upOption">
		
		<scroll-view class="scroll-view p-t10" :scroll-y="true" 
			:style="{height: `calc(${screenHeight}px - 66rpx`}"
			@scrolltolower="scrollFn">
			<view style="height: 1rpx;"></view>
			<view class="commission-view" v-if="tableData.length != 0">
				<view class="list-item flex" :class="{'m-t10': index > 0 }"
					v-for="(item,index) in tableData" :key="item.Account + '_' + index">
					<text style="width: 20%;">{{item.Account}}</text>
					<view class="text-center" style="width: 30%;">
						<text class="number">{{item.Coin}}</text>
						<text class="unit">/USDT</text>
					</view>
					<text class="time text-right" style="width: 40%;">{{item.Time}}</text>
				</view>
			</view>
			<MescrollUp :option="upOpt" v-show="loadingType != 0" :type="loadingType" />
		</scroll-view>
		
		</mescroll-body>
		</view>
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
					textNoMore: this.$t('invite.commission.noData')
				},
				loadingType: 0,
				tableData:[],
				pageIndex: 1,
				pageSize: 30,
				TotalCount: 0,
				loading: false,
				screenHeight: uni.getStorageSync('screenHeight'),
				downOption: {
					auto: false
				},
				upOption: {
					auto: false,
					use: false,
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
				this.getLowerList();
				
			},
			upCallback(page) {
				console.log(page)
				this.pageIndex++;
				this.getLowerList();
			},
			// 获取佣金明细
			getLowerList() {
				this.loadingType = 1;
				this.CsHttp.post(this.ApiConfig.User + '/BSGetLowerListReq', {
					UserId: uni.getStorageSync('UserData').UserId,
					Page: this.pageIndex,
					Size: this.pageSize
				}, false).then(res => {
						console.log(res)
					this.TotalCount = res.TotalCount;
					if(this.pageIndex == 1) {
						this.tableData = [...res.LowerDataList];
					} else {
						this.tableData.push(...res.LowerDataList);
					}
					if (this.tableData.length == res.TotalCount) {
						this.loading = true;
					}
					if (res.TotalCount == 0) {
						this.loadingType = 2;
					} else {
						this.loadingType = 0;
					}
					this.mescroll.endBySize(res.LowerDataList.length, res.TotalCount);
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
				this.getLowerList();
			}
		},
		onShow() {
			this.pageIndex = 1;
			this.tableData = [];
			this.loading = false;
			this.getLowerList();
			
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.root {
		text{
			font-size: 26rpx;
			color: $uni-text-color-grey;
		}
	}
	.thead {
		background-color: #1A253A;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 6rpx;
		padding: 0 30rpx;
	}
	.scroll-view {
		box-sizing: border-box;
	}
	.commission-view {
		padding: 0 14rpx;
	}
	.list-item {
		height: 60rpx;
		line-height: 60rpx;
		background-color: $uni-bg-color;
		padding: 0 14rpx;
		text {
			font-size: 26rpx;
			color: $uni-text-color;
		}
		.number {
			color: $uni-color-primary;
			font-size: 30rpx;
		}
		.unit {
			font-size: 20rpx;
			color: $uni-text-color-grey;
		}
		.time {
			font-size: 24rpx;
			color: $uni-text-color;
		}
	}
</style>
