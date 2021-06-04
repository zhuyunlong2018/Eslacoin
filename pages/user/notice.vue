<!-- 公告列表页 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.notice.navTitle')"
		/>
		<view class="content p-t10">
			<view class="no-data" v-if="noticeList.length == 0">{{ $t('user.notice.noData') }}</view>
			<view class="item"
				v-for="(item, index) in noticeList"
				:key="'notice_list_' + index"
				@click="openPage(item)"
				:class="index > 0 ? 'm-t10' : ''">
				<view class="title text-overflow font-16">
					{{item.Title}}
				</view>
				<view class="time p-t10 text-right font-13">{{item.Time}}</view>
			</view>
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
				noticeList: []
			};
		},
		onShow() {
			this.getNoticeList();
		},
		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			// 打开页面
			openPage(item) {
				uni.setStorageSync('noticeDetail', item);
				uni.navigateTo({
					url: '/pages/user/notice_detail'
				})
			},
			// 获取公告列表
			getNoticeList() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetOfficialNoticeReq', {}).then(res => {
					console.log(res)
					this.noticeList = res.OfficialNotices;
				})
			}
		}
	}
</script>

<style lang="scss">
.item {
	padding: 10rpx 28rpx;
	background-color: $uni-bg-color;
	.title {
		color: $uni-text-color;
	}
	.time {
		color: $uni-text-color-grey;
	}
}
</style>
