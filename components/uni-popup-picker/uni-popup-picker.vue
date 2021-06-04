<template>
	<view class="uni-popup-detail">
		<view class="uni-picker-title flex">
			<text class="uni-title color-light p-l20" @click="close(1)">取消</text>
			<text class="uni-title color-light p-r20" @click="close(2)">确认</text>
		</view>
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :mask-style="maskStyle" :value="value"
			@change="bindChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in PickerItems" :key="index">{{item}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupPicker',
		props: {
			PickerItems: {
				type: Array,
			},
			PickerIndex: {
				type: Number,
			}
		},
		data() {

			return {
				title: 'picker-view',
				index: this.PickerIndex,
				value: [this.PickerIndex],
				visible: true,
				indicatorStyle: 'height: 50rpx;',
				maskStyle: 'height:0'

			}
		},

		inject: ['popup'],

		created() {

		},
		computed: {

		},
		methods: {
			bindChange: function(e) {
				const val = e.detail.value
				this.index = val[0]
			},

			/**
			 * 关闭窗口 通知父组件修改参数
			 */
			close(type) {
				if (type == 2) {
					this.$emit('update', this.index)
				}
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.picker-view {
		width: 750rpx;
		height: 400rpx;
		margin-top: 20rpx;
		background-color: #1e2a40;
	}

	.item {
		height: 50rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
	}

	.uni-popup-detail {
		background-color: #1e2a40;
		border-radius: 16rpx 16rpx 0 0;

		.uni-picker-title {
			width: 100%;
			height: 80rpx;
			background-color: #20324A;
			border-radius: 16rpx 16rpx 0 0;
		}
	}
</style>
