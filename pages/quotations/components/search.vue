<!-- 搜索框组件 -->
<template>
	<view class="search-view"
		v-show="isShowSearch"
		@click="$emit('update:isShowSearch', false)"
		:style="{'top': `calc(88rpx + ${statusBarHeight}px)`}">
		<view class="flex search" @click.stop="">
			<view class="up-pre">
				<text class="iconfont iconsearch"></text>
				<input class="input"
					placeholder-class="placeholder"
					:placeholder="$t('quotations.home.placeholder')"
					maxlength="20"
					type="text" v-model.trim="searchValue" />
			</view>
			<text @click="onSearchBtn" class="btn">{{ $t('quotations.home.btn') }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否显示搜索框
			isShowSearch: {
				type: Boolean,
				default: false
			},
			searchVal: {
				type: String,
				default: ''
			}
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				timeFn: null
			};
		},
		computed: {
			searchValue: {
				get() {
					return this.searchVal;
				},
				set(val) {
					this.$emit('update:searchVal', val);
				}
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 点击搜索按钮
			onSearchBtn() {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					this.$emit('update:isShowSearch', false);
					this.$emit('searchBtn', this.searchVal);
					clearTimeout(this.timeFn);
				}, 200)
			}
		}
	}
</script>

<style lang="scss">
.search-view {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(5, 10, 29, 0.57);
	.search {
		height: 120rpx;
		background-color: #15253A;
		border-radius: 0rpx 0rpx 24rpx 24rpx;
		padding: 0 30rpx;
	}
	.up-pre {
		width: calc(100% - 180rpx);
	}
	.iconsearch {
		position: absolute;
		color: $uni-text-color-grey;
		font-size: 46rpx;
		left: -4rpx;
		top: 6rpx;
	}
	.input {
		height: 60rpx;
		background-color: rgba(93, 118, 152, 0.6);
		border-radius: 6rpx;
		font-size: 30rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
		color: $uni-text-color;
		width: 100%;
	}
	.placeholder {
		color: $uni-text-color-grey;
		font-size: 28rpx;
	}
	.btn {
		width: 140rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #2aa3b1;
		border-radius: 6rpx;
		font-size: 28rpx;
		color: #ffffff;
	}
}
</style>
