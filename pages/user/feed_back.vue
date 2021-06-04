<!-- 反馈建议 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.feedBack.navTitle')"
		/>
		<view class="feed-back">
			<textarea v-model="textareaValue" 
				placeholder-class='textarea'
				:placeholder="$t('user.feedBack.placeholder')"></textarea>
			<button @click="submitBtn" 
				:class="!textareaValue ? 'disabled' : ''"
				:disabled="!textareaValue"
				type="primary">{{ $t('user.feedBack.btnText') }}</button>
		</view>
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				textareaValue: '',
			}
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			submitBtn() {
				if (!this.textareaValue) {
					uni.showToast({
						title: this.$t('user.feedBack.tipsTexts')[0],
						icon: 'none',
						duration: 1000
					})
					return false;
				}
				this.CsHttp.post(this.ApiConfig.User + '/BSUserProposalReq', {
					Info: this.textareaValue,
					UserId: uni.getStorageSync('UserData').UserId
				}, false).then(res => {
					console.log(res)
					if (res.Code == 0) {
						uni.hideToast();
						uni.showToast({
							title: this.$t('user.feedBack.tipsTexts')[1],
							duration: 1000,
							icon: 'none'
						});
						this.textareaValue = '';
					} else {
						uni.showModal({
							content: res.Msg,
							showCancel: false,
						});
					}
					
				})
				console.log(this.textareaValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feed-back {
		padding: 20rpx 30rpx 0;
	}
	textarea {
		background-color: $uni-bg-color;
		padding: 16rpx 22rpx;
		border-radius: 12rpx;
		height: 640rpx;
		box-sizing: border-box;
		width: 100%;
		font-size: 28rpx;
		color: $uni-text-color;
	}
	.textarea {
		font-size: 28rpx;
		color: $uni-text-color;
	}
	.disabled {
		// opacity: 0.66;
	}
	button {
		margin-top: 120rpx;
		width: 580rpx;
		height: 98rpx;
		line-height: 98rpx;
		border-radius: 12rpx;
		font-size: 36rpx;
		color: #ffffff;
		background-color: #2aa3b1 !important;
	}
</style>
