<template>
	<view class="uni-popup-detail">
		<view class="uni-detail-title flex">
			<view class="w30p"></view>
			<text class="color-light font-21">添加补仓</text>
			<view class="w30p text-right" @click="close()">
				<text class="iconfont iconguanbianniu color-light font-21 p-r20"></text>
			</view>
		</view>
		<view class="uni-detail-info flex flex-column flex-start">
			<view class="w100p flex flex-start m-t20">
				<view class="title-view flex flex-end">
					<text class="font-18 color-orange p-r10">{{DeclineName}}:</text>
				</view>
				<view class="edit-view flex" :class="{'active':FocusInput=='editDecline'}">
					<input class=" text-left color-light font-15" type="number" @focus="(e)=>focus1(e,'editDecline')"
						@blur="(e)=>blur1(e,'editDecline')" placeholder="" v-model="Decline"></input>
					<text class="font-12 color-dark p-r10">%</text>
				</view>
			</view>
			<view class="w100p flex flex-end" style="height: 76rpx;">
				<text class="p-l10 font-14" style="color: #804953;" v-if="TaskType==1">提示：数值为前次补仓价格的跌幅</text>
				<text class="p-l10 font-14" style="color: #804953;" v-else>提示：亏损比例根据当前持仓保证金比例计算</text>
			</view>
			<view class="w100p flex flex-start">
				<view class="title-view flex flex-end">
					<text class="font-18 color-orange p-r10">{{CountName}}:</text>
				</view>
				<view class="edit-view flex" :class="{'active':FocusInput=='editCount'}">
					<input class=" text-left color-light font-15" type="number" @focus="(e)=>focus1(e,'editCount')"
						@blur="(e)=>blur1(e,'editCount')" placeholder="" v-model="Count"></input>
					<text class="font-12 color-dark p-r10" v-if="TaskType==1">USDT</text>
					<text class="font-12 color-dark p-r10" v-else-if="TaskType==3">%</text>
					<text class="font-12 color-dark p-r10" v-else-if="TaskType==5">{{Symbol}}</text>
				</view>
			</view>
		</view>
		<view class="button-view">
			<button class="calBtn" @click="close()">取消</button>
			<button class="sureBtn" @click="submit()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupTrend',
		props: {
			TaskType: {
				type: Number,
				default: 1
			},
			Symbol: {
				type: String,
				default: ''
			}
		},
		inject: ['popup'],
		data() {
			return {
				Decline: '',
				Count: '',
				FocusInput: ''
			}
		},

		created() {

		},
		computed: {
			DeclineName() {
				if (this.TaskType == 1) {
					return '补仓跌幅'
				} else if (this.TaskType == 3) {
					return '亏损率'
				} else if (this.TaskType == 5) {
					return '亏损率'
				} else {
					return '触发条件'
				}
			},
			CountName(){
				if (this.TaskType == 1) {
					return '补仓金额'
				} else if (this.TaskType == 3) {
					return '补仓比例'
				} else if (this.TaskType == 5) {
					return '补仓数量'
				} else {
					return '补仓比例'
				}
			}
		},
		methods: {
			focus1: function(e, v) {
				this.FocusInput = v
			},
			blur1: function(e, v) {
				this.FocusInput = ''
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			},
			//queren
			submit() {
				if (this.Decline == '' || this.Count == '') {
					uni.showToast({
						title: '不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				this.$emit('update', parseFloat(this.Decline), parseFloat(this.Count))
				this.popup.close()
			},
		}
	}
</script>
<style lang="scss" scoped>
	.color-dark {
		color: #6f87a4;
	}

	.color-light {
		color: #ced3e9;
	}

	.color-green {
		color: #12c1bb;
	}

	.uni-popup-detail {
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #182134;
	}

	.uni-detail-title {
		height: 96rpx;
		background-color: #1e2a40;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		width: 100%;
		border-bottom: 1rpx solid #1f304a;
	}

	.uni-detail-info {
		width: 722rpx;
		height: 500rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
		margin-top: 10rpx;

		.title-view {
			width: 30%;
		}

		.edit-view {
			width: 434rpx;
			height: 74rpx;
			border: 1rpx solid #3C4F6A;
			text-align: center;
		}

		.active {
			border-color: #3EFFF8 !important;
		}
	}


	.button-view {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 160rpx;

		.sureBtn {
			width: 288rpx;
			height: 80rpx;
			background-color: #2aa3b1;
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			line-height: 80rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}

		.calBtn {
			width: 288rpx;
			height: 80rpx;
			background-color: #475E7D;
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			line-height: 80rpx;
			letter-spacing: 0px;
			color: #ffffff;

			&::after {
				border: none;
			}
		}
	}
</style>
