<!-- 修改头像 -->
<template>
	<view class="root">
		<v-nav-bar
			:title="$t('user.revise.navTitle')"
		/>
		<view class="upload-img flex">
			<image class="img" :src="imageUrl" mode=""></image>
			<view class="button" @click="uploadImage('camera')">{{ $t('user.revise.btns')[0] }}</view>
			<view class="button" @click="uploadImage('album')">{{ $t('user.revise.btns')[1] }}</view>
		</view>
		<view class="img-list flex flex-wrap">
			<view class="w25p up-pre" 
				@click="onClickImage(val, index)"
				v-for="(val, index) in ImageList" :key="'img_' + index">
				<image class="img" :src="val" mode=""></image>
				<view class="checked" v-if="checkedImageIndex == index">
					<image class="icon" src="../../static/user/wd_xgtx_tx_xz.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btn-view">
			<uni-botton 
				@click="changeImage"
				:btnText="$t('user.revise.btns')[2]"></uni-botton>
		</view>
	</view>
</template>

<script>
	import Axios from '@/common/axios.min.js';
	export default {
		onShow() {
			this.userData = uni.getStorageSync('UserData');
			this.imageUrl = this.userData.HeadImage || '../../static/home/sy_logo.png';
			this.getHeadPortrait();
		},
		data() {
			return {
				// 默认头像列表
				ImageList: [],
				// 选中的默认头像下标
				checkedImageIndex: null,
				// 存储上传头像地址
				imageUrl: '',
				userData: uni.getStorageSync('UserData')
			};
		},
		methods: {
			// 更改头像
			changeImage() {
				if (!this.imageUrl) return false;
				this.CsHttp.post(this.ApiConfig.User + '/BsChangeDefaultHeadImageReq', {
					UserId: this.userData.UserId,
					HeadImage: this.imageUrl
				}).then(res => {
					this.userData.HeadImage = res.HeadImage;
					uni.setStorageSync('UserData', this.userData);
					uni.hideToast();
					uni.showToast({
						title: this.$t('user.revise.tips')[0],
						duration: 1000,
						icon: 'none'
					})
				})
			},
			// 上传头像
			uploadImage(type = 'album') {
				let self = this;
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [type], //从相册选择
					header: {
						"Content-Type": 'multipart/form-data'
					},
				    success: (res) => {
				        console.log(res);
						const tempFilePaths = res.tempFilePaths;
						// #ifdef APP-PLUS
						uni.uploadFile({
						    url: this.ApiConfig.HeadHttp + '/BsUploadHeadImageReq', //仅为示例，非真实的接口地址
						    filePath: tempFilePaths[0],
						    name: 'FileData',
						    formData: {
								'UserId': this.userData.UserId,
								FileName: '123.jpg'
							},
						    success: (uploadFileRes) => {
						        self.imageUrl = JSON.parse(uploadFileRes.data).HeadImage;
						    },
							complete: (res) => {
								console.log(JSON.stringify(res))
							}
						});
						// #endif
						//  #ifdef H5
						let form = new FormData();
						form.append('FileData', res.tempFiles[0]);
						form.append('UserId', this.userData.UserId);
						Axios.post(this.ApiConfig.HeadHttp + '/BsUploadHeadImageReq', form).then(res => {
							 self.imageUrl = res.data.HeadImage;
						}).catch(err => {
							console.log(err)
						})
						// #endif
				    }
				});
			},
			// 点击默认头像
			onClickImage(url, index) {
				this.imageUrl = url;
				this.checkedImageIndex = index;
			},
			// 获取默认头像列表
			getHeadPortrait() {
				if (this.ImageList.length !== 0) return false;
				this.CsHttp.post(this.ApiConfig.User + '/BsDefaultHeadImageListReq', {}).then(res => {
					console.log(res)
					this.ImageList = res.ImageList;
				})
			}
		}
	}
</script>

<style lang="scss">
.upload-img {
	margin: 18rpx 28rpx;
	height: 178rpx;
	background-color: $uni-bg-color;
	border-radius: 8rpx;
	padding: 0 36rpx;
	box-sizing: border-box;
	.img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.button {
		width: 190rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #2a3e57;
		border-radius: 6rpx;
		font-size: 24rpx;
		color: $uni-text-color;
	}
}
.img-list {
	margin: 18rpx 28rpx;
	background-color: $uni-bg-color;
	border-radius: 8rpx;
	padding-bottom: 30rpx;
	height: 680rpx;
	.w25p {
		width: 25%;
		text-align: center;
		padding: 50rpx 0 10rpx;
	}
	.img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.checked {
		position: absolute;
		top: 50rpx;
		left: calc(50% - 50rpx);
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		border: 2rpx solid #3efff8;
		background-color: rgba(6, 16, 28, 0.6);
		box-sizing: border-box;
		.icon {
			width: 32rpx;
			height: 22rpx;
		}
	}
}
.btn-view {
	padding: 20rpx 60rpx;
}
</style>
