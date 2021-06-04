<!-- 官方社群页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.community.navTitle')"
		/>
		<view class="list">
			<view class="item" 
				:key="'list_' + index"
				v-for="(item, index) in list">
				<view class="left">
					<view class="flex flex-start p-lr20 p-t20 p-b20 title-view">
						<image class="icon p-r10" :src="item.icon" mode=""></image>
						<text class="title">{{ $t('user.community.titles')[index] }}</text>
					</view>
					<view class="flex btn-t-2 p-lr20 p-t20 p-b20"
						v-for="(vals, idx) in item.childen"
						:key="'group_' + item.GroupType + idx">
						<text class="number">{{ vals.GroupName }}：{{ vals.GroupId }}</text>
						<view class="copy-view" @click="copyBtn(vals.GroupId)">
							<text class="icon iconfont iconfuzhi"></text>
							<text class="p-l10 p-r10">{{ $t('user.community.btn') }}</text>
							<text class="icon iconfont iconxiangyou"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getGroupList();
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				list: [],
				timeFn: null
			};
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 获取官方群
			getGroupList() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetOfficialGroupReq', {}).then(res => {
					let arr = [];
					let icon = '';
					res.OfficialGroups.forEach(item => {
						if (item.GroupType == "telegram") {
							icon = '../../static/user/wd_gfsq_tg_2.png';
						} else if (item.GroupType == "微信") {
							icon = '../../static/user/wd_gfsq_wx_2.png';
						} else if (item.GroupType == "QQ") {
							icon = '../../static/user/wd_gfsq_qq_2.png';
						} else if (item.GroupType == "Echat") {
							icon = '../../static/user/wd_gfsq_ec_2.png';
						}
						// 判断是否存在相同类型
						let idx = arr.findIndex(vals => { return vals.GroupType == item.GroupType })
						if (idx != -1 && arr.length != 0) {
							// 存在相同类型
							arr[idx].childen.push(item)
						} else {
							arr.push({
								GroupType: item.GroupType,
								childen: [item],
								icon: icon
							})
						}
					});
					this.list = [...arr];
				})
			},
			// 点击复制按钮
			copyBtn (data) {
				if (this.timeFn) {
					clearTimeout(this.timeFn);
				}
				this.timeFn = setTimeout(() => {
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data,
					})
					// #endif
					// #ifdef H5
					let text = document.createElement('textarea');
					document.body.appendChild(text);
					text.value = data;
					text.select();
					document.execCommand('copy');
					text.remove();
					uni.showToast({
						title: "内容已复制",
						icon: 'success',
						duration: 1000
					})
					// #endif
				}, 200)
				
			}
		}
	}
</script>

<style lang="scss">
.list {
	padding: 24rpx 28rpx 20rpx;
}
.item {
	border-radius: 6rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
	background-color: $uni-bg-color;
	.title-view {
		background-color: #1B2B41;
		border-radius: 6px 6px 0px 0px;
	}
	.icon {
		width: 36rpx;
		height: 36rpx;
	}
	.right {
		padding: 8rpx 8rpx 0 8rpx;
		background-color: #ffffff;
		border-radius: 4rpx;
	}
	.title {
		font-size: 32rpx;
		color: $uni-text-color;
	}
	.number {
		width: 290rpx;
		height: 48rpx;
		line-height: 48rpx;
		background-color: $uni-bg-color;
		border-radius: 4rpx;
		font-size: 24rpx;
		color: #ffffff;
	}
	.copy-view {
		color: $uni-color-primary;
		font-size: 24rpx;
		.icon {
			font-size: 24rpx;
		}
	}
}
</style>
