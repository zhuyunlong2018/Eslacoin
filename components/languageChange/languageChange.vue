<!-- 语言切换组件 -->
<template>
	<view class="language-change">
		<view class="language-view btn-1" :class="isChangeBg ? 'user' : ''">
			<view class="view flex">
				<text class="text" @click="changeLanguageFn('zh_CN')">中</text>
				<text class="text" @click="changeLanguageFn('en')">EN</text>
			</view>
			<view class="checked up-pab" :class="changeLanguage == 'en' ? 'right-0' : 'left-0'">
				{{ changeLanguage == 'en' ? 'EN' : '中' }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			language: {
				type: String,
				default: 'zh_CN'
			},
			isChangeBg: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			changeLanguage: {
				get() {
					return this.language
				},
				set(val) {
					this.$emit('update:language', val)
				}
			}
		},
		methods: {
			changeLanguageFn(val) {
				if (this.changeLanguage == val) return false;
				uni.setStorageSync('language', val);
				this.changeLanguage = val;
				this.$i18n.locale = val;
				for(let i = 0; i < 5; i++) {
					uni.setTabBarItem({
						index: i,
						text: this.$t('tabs')[i]
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.language-view {
		.view {
			background-color: #172840;
			border-radius: 25rpx;
			font-size: 18rpx;
			color: #41506a;
			box-sizing: border-box;
		}
		.text {
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			position: relative;
			z-index: 1;
		}
		position: relative;
		&::after {
			border: 1px solid #172840;
			border-radius: 50rpx;
		}
		.checked {
			background-color: #466DEC;
			width: 40rpx;
			font-size: 18rpx;
			border-radius: 50%;
			line-height: 40rpx;
			text-align: center;
			height: 40rpx;
			z-index: 1;
			top: 0;
			color: #D8E3F1;
		}
		.left-0 {
			left: 0;
		}
		.right-0 {
			right: 0;
		}
	}
	.user {
		.view{
			background-color: #172840;
			color: #41506A;
		}
		&::after {
			border: 1px solid #172840;
		}
		.checked {
			background-color: #5B6585;
			color: #9DB1C9;
		}
	}
</style>
