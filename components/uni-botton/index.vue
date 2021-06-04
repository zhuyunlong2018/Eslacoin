<!-- 公用 botton 按钮组件 -->
<template>
	<button 
		class="btn"
		:style="{'margin-top': marginTop + 'rpx', 'background': isDisabled ? 'rgba(42, 163, 177, 0.34)' : backgroundColor}"
		:type="btnType"
		@click="btnClick">{{ btnText }}</button>
</template>

<script>
	export default {
		name:"uni-botton",
		props:{
			btnText: {
				type: String,
				default: '登录'
			},
			isDisabled: {
				type: Boolean,
				default: false
			},
			btnType: {
				type: String,
				default: 'default'
			},
			marginTop: {
				type: [Number, String],
				default: 110
			},
			backgroundColor: {
				type: String,
				default: '#19A9B9'
			}
			
		},
		data() {
			return {
				preventTimer: null
			};
		},
		methods: {
			// 点击事件
			btnClick() {
				if (this.isDisabled) return false;
				clearTimeout(this.preventTimer);
				this.preventTimer = setTimeout(() => {
					this.$emit("click")
				}, 200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		height: 98rpx;
		background: #2aa3b1;
		border-radius: 12rpx;
		text-align: center;
		line-height: 98rpx;
		color: #ffffff;
		font-size: 36rpx;
	}
</style>
