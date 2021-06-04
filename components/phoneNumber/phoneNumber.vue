
<!-- 电话号码前的序号选择组件 -->
<template>
	<view class="phone-before-number" :style="{'left': leftWidth + 'rpx'}">
		<view class="show-text flex flex-end w100p" @click.stop="showPicker=!showPicker">
			<text class="font-14 color-main">{{ textValue }}</text>
			<text class="triangle"></text>
		</view>
		<view class="option-row" v-show="showPicker">
			<view class="option-item" 
				v-for="(item, index) in phoneNumberList" 
				:class="item == textValue ? 'actived' : ''"
				@click.stop="numberClick(item)"
				:key="item + index">{{ item }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			phoneNumber: {
				type: String,
				default: '+86',
			},
			leftWidth: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				phoneNumberList: ['+86', '+852'],
				// 是否显示选框
				showPicker: false
			};
		},
		computed: {
			textValue: {
				get () {
					return this.phoneNumber
				},
				set (val) {
					this.$emit('update:phoneNumber', val);
				}
			},
		},
		methods: {
			// 点击序号
			numberClick(val) {
				this.$emit('update:phoneNumber', val);
				this.showPicker = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone-before-number {
		width: 100rpx;
		position: absolute;
		top: 0;
		z-index: 9;
	}
	.show-text {
		height: 80rpx;
	}
	.color-main {
		color: $uni-text-color;
	}
	.triangle {
		margin-left: 10rpx;
		border-top: 8rpx solid $uni-text-color;
		border-left: 8rpx solid transparent;
		border-right: 8rpx solid transparent;
	}
	.option-row {
		border: 1rpx solid #0b131e;
		border-radius: 5rpx;
		background-color: $uni-bg-color;
		position: absolute;
		top: 80rpx;
		left: 0;
		.option-item {
			padding: 10rpx 20rpx;
			font-size: 24rpx;
			color: $uni-text-color;
		}
		.actived {
			background-color: #2aa3b1;
			color: #ffffff;
		}
	}
</style>
