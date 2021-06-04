<!-- 自定义导航栏组件 -->
<template>
	<uni-nav-bar :title="title" :color="color" :backgroundColor='backgroundColor' :border="border">
		<image slot='left' class="nav-icon-left" src="../../static/icon/dl_but_fh_btn.png"></image>
		<image v-if="isRightImg && Echannel == 1" slot='right' class="nav-icon-right" src="../../static/icon/qh_hb_logo.png"></image>
		<image v-if="isRightImg && Echannel == 2" slot='right' class="nav-icon-right" src="../../static/icon/qh_ba_logo.png"></image>
		<image v-if="isRightImg && Echannel == 3" slot='right' class="nav-icon-right" src="../../static/icon/qh_bte_logo.png"></image>
		<image v-if="isServiceImg" slot='right' 
			@click="openPage('/pages/user/customer_service')"
			class="nav-icon-right" src="../../static/icon/sy_kf.png"></image>
	</uni-nav-bar>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			isRightImg: {
				type: Boolean,
				default: false
			},
			isServiceImg: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: "#ced3e9"
			},
			backgroundColor: {
				type: String,
				default: "#0D1A2C"
			},
			border: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				Echannel: null // 渠道交易所1火币2币安3比特儿
			}
		},
		created() {
			this.getApi();
		},
		methods: {
			// 获取用户当前绑定的 API 渠道
			getApi() {
				if(!this.isRightImg) return false;
				this.$store.dispatch('GET_API').then(res => {
					this.Echannel = res;
				})
			},
			// 打开页面
			openPage(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>