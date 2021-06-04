<template>
	<view class="root up-pre">
		<v-nav-bar
			:title="$t('invite.poster.navTitle')"
		/>
		<view class="content">
			<view class="up-pre">
				<view class="poster-view">
					<image id="canbox" src="@/static/bg/wd_yqhb_image_hb.png" mode=""></image>
				</view>
				<view class="ewm-view">
					<tkiQrCode 
						ref="tkiQrCode"
						:val="InviteCode" 
						:size="234"
						@result="resultFn" />
					<view class="code">
						{{ $t('invite.poster.code') }}：{{ InviteCode }}
					</view>
				</view>
			</view>
			
			<button type="primary" @click="onSaveClick()">{{ $t('invite.poster.btn') }}</button>
			<view class="text">{{ $t('invite.poster.text') }}</view>
			<canvas class="myCanvas" canvas-id="myCanvas"
				id="myCanvas"></canvas>
		</view>
	</view>
</template>

<script>
	import tkiQrCode from '../../components/tki-qrcode/tki-qrcode.vue';
	export default {
		components: {
			tkiQrCode
		},
		data() {
			return {
				// 邀请码
				InviteCode: '',
				// 下载图片链接
				imgUrl: '',
				// 系统环境
				systemEnv: '',
				// 二维码图片地址
				qrcodeUrl: ''
			}
		},
		onLoad(option) {
			// console.log(option)
			if (option.code) {
				this.InviteCode = option.code;
				this.$nextTick(() =>{
					this.$refs.tkiQrCode._makeCode();
				})
			} else {
				this.getData();
			}
			
			
		},
		onShow() {
			// 获取系统信息
			uni.getSystemInfo({
				success: (res)=> {
					console.log(res)
					this.systemEnv = res.platform;
				}
			})
			
			
		},
		methods: {
			// 
			resultFn(res) {
				console.log(res)
				this.qrcodeUrl = res;
				this.$nextTick(() =>{
					this.getCanvas();
				})
			},
			// 获取邀请码
			getData() {
				this.CsHttp.post(this.ApiConfig.User + '/BSGetUserTeamInfoReq', {
					UserId: uni.getStorageSync('UserData').UserId
				}, false).then(res => {
					this.InviteCode = res.InviteCode;
					this.$nextTick(() =>{
						this.$refs.tkiQrCode._makeCode();
					})
				}).catch(err => {})
			},
			// 生成分享图片
			getCanvas() {
				if (['android', 'ios'].includes(this.systemEnv)){
					let testCanvas = uni.createCanvasContext('myCanvas', this);
					testCanvas.drawImage(require('@/static/bg/wd_yqhb_image_hb.png'), 0, 0, 347, 492);
					testCanvas.drawImage(this.qrcodeUrl, 115, 180, 117, 117);
					testCanvas.fillStyle="#fff";
					testCanvas.font="12px 微软雅黑";
					if (uni.getStorageSync('language') == 'en') {
						testCanvas.fillText(this.$t('invite.poster.code'), 130, 320);
						testCanvas.fillText(this.InviteCode, 145, 340);
					} else {
						testCanvas.fillText(`邀请码：${ this.InviteCode }`,120,320);
					}
					testCanvas.draw(true, () => {
						uni.canvasToTempFilePath({
							canvasId:'myCanvas',
							success: (res) => {
								uni.getImageInfo({
									src: res.tempFilePath,
									success: (re) => {
										this.imgUrl = re.path;
									}
								})
							}	
						})
					})	
				}
				
			   },
			onSaveClick() {
				if (['android', 'ios'].includes(this.systemEnv)) {
					uni.saveImageToPhotosAlbum({
						filePath: this.imgUrl,
						success: (res) => {
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 1000
							})
						}
					});
				} else {
					uni.getImageInfo({
					    src: '../../static/ewm.png',  
					    success: (image) => {
							var a = document.createElement('a');
							a.setAttribute('href',image.path);//图片地址
							a.setAttribute('download','');//下载时文件名称
							var evobj = document.createEvent('MouseEvents'); 
							evobj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,true,false,0,null)
							a.dispatchEvent(evobj)
						},
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 28rpx 28rpx;
	}

	.poster-view image {
		width: 100%;
		height: 984rpx;
	}

	.ewm-view {
		width: 235rpx;
		position: absolute;
		left: calc(50% - 116rpx);
		top: 350rpx;
		image {
			width: 235rpx;
			height: 235rpx;
		}
		.code {
			// margin-top: 5rpx;
			background-color: #232e46;
			border-radius: 8rpx;
			text-align: center;
			font-size: 24rpx;
			color: #ffffff;
			border: 1rpx solid #1d273b;
			padding: 10rpx;
		}
	}
	button {
		width: 580rpx;
		height: 98rpx;
		line-height: 98rpx;
		margin-top: 40rpx;
		font-size: 36rpx;
		border-radius: 12rpx;
		background-color: #2aa3b1 !important;
	}
	.text{
		font-size: 24rpx;
		// margin-top: 24rpx;
		color: $uni-text-color;
		text-align: center;
		padding: 40rpx 100rpx;
	}
	.myCanvas {
		width: 100%;
		height: 1110rpx;
		position: absolute;
		z-index: -9;
		top: -100vh;
		left: -100vh;
	}
</style>
