<script>
	export default {
		globalData: {
		},
		onLaunch: function() {
		
			this.$store.dispatch('GET_SYSTEM_INFO');
			
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			for(let i = 0; i < 5; i++) {
				uni.setTabBarItem({
					index: i,
					text: this.$t('tabs')[i]
				})
			}
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 添加公用css */
	@import url("./common/css/common.css");
	@import url("./static/iconfont/iconfont.css");

	page {
		background-color: #000E18;
	}

	/*每个页面公共css */
	/*去掉垂直滚动条的显示*/
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
