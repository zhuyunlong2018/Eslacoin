<template>
	<view class="root">
		<v-nav-bar title="选择交易渠道" />
		<view class="title-view flex">
			<view class="w50p flex flex-center" @click="changeIndex(0)">
				<text class=" title font-16 color-dark " :class="{'title-view-active':chooseIndex==0}">已绑定交易所</text>
			</view>
			<view class="w50p flex flex-center"  @click="changeIndex(1)">
				<text class=" title font-16 color-dark" :class="{'title-view-active':chooseIndex==1}">未绑定交易所</text>
			</view>
		</view>
		<view class="item-view flex flex-column">
			<view v-if="showLists.length == 0" class="color-dark font-13">暂无数据</view>
			<view class="item" v-for="(item, index) in showLists" :class="{'actived': item.isOpen}":key="'apikey_' + index">
				<view class="flex">
					<view class="left">
						<image class="logo" :src="item.imgUrl"></image>
						<text class="title">{{ item.Name }}</text>
					</view>
					<text class="font-14" :class="item.isBing?'color-green':'color-dark'">{{ item.isBing ? '已绑定' : '未绑定' }}</text>
					<view class="right flex">
						<text v-if="item.isBing" class="button1" @click="onSelApiClick(item)">选择</text>
						<text v-else class="button2" @click="goBanding(item)">去绑定</text>
					</view>
				</view>
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
				chooseIndex:0,
				list: [{
					isOpen: false,
					isBing: false
				}],
				apiKeyList: [{
						Echannel: 1,
						Name: '火币交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_hb_logo.png'
					},
					{
						Echannel: 2,
						Name: '币安交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_ba_logo.png'
					},
					{
						Echannel: 3,
						Name: '比特儿交易所',
						isBing: false,
						isOpen: false,
						imgUrl: '../../static/icon/qh_bte_logo.png'
					}
				],
				showLists:[],
				bingLists:[],
				noLists:[],
				// Echannel int  //渠道交易所1火币2币安3比特儿
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		onShow() {
			//this.showLists=[],
			this.bingLists=[],
			this.noLists=[],
			this.getApiKeyList();
		},
		methods: {
			// 获取用户 apikey 列表
			getApiKeyList() {
				// this.list = [];
				let url = this.ApiConfig.User +  '/BSGetUserApiKeyListReq'
				this.CsHttp.post(url, {
					UserId: uni.getStorageSync('UserData').UserId
				}).then(res => {
					// console.log(res);
					let bingKey = res.UserApiKeyDataList.map(item => item.Echannel);
					//let obj = res.UserApiKeyDataList.find(vals => vals.IsActive == 1)
					this.apiKeyList.forEach((item, index) => {
						if (bingKey.includes(item.Echannel)) {
							item.isBing = true;
							this.bingLists.push(item)
						} else {
							item.isBing = false;
							this.noLists.push(item)
						}
						
						// 判断是否启用
						// if (obj && item.Echannel == obj.Echannel) {
						// 	item.isOpen = obj.IsActive == 1 ? true : false;
						// } else {
						// 	item.isOpen = false;
						// }
					})
					// console.log(this.bingLists)
					// console.log(this.noLists)
					if(this.bingLists.length==0){
						this.chooseIndex=1
						this.showLists = this.noLists
					}else{
						this.chooseIndex=0
						this.showLists = this.bingLists
					}
				})
			},
			changeIndex(index){
				this.chooseIndex = index
				if(index==1){
					this.showLists = this.noLists
				}else{
					this.showLists = this.bingLists
				}
			},
			//状态按钮切换
			goBanding(item) {
				// 判断是否绑定 apikey
				this.chooseIndex=0
                this.showLists = this.bingLists
				uni.navigateTo({
					url: `/pages/apikey/create_apikey?Echannel=${ item.Echannel }`
				})

			},
			onSelApiClick(item) {
				console.log('选择的平台:', item)
				uni.$emit('Echannel', item)
				uni.navigateBack({})
			}
		},
	}
</script>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title-view{
		width: 100%;
		height: 84rpx;
		background-color: #20324A;
		.title{
			line-height: 60rpx;
			border-bottom: 4rpx solid #20324A;
		}
		&-active{
			color: #12C1BB;
			border-bottom: 4rpx solid #12C1BB !important;
		}
	}

 

	.item-view {
		margin-top: 20rpx;
		padding: 0 14rpx;

		.item {
			border: 1rpx solid transparent;
			background-color: #1a253a;
			border-radius: 6rpx;
			width: 722rpx;
			height: 128rpx;
			line-height: 128rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			padding: 0 14rpx;

			.left {
				display: flex;
				align-items: center;
				width: 40%;

				.logo {
					width: 48rpx;
					height: 48rpx;
				}

				.title {
					font-size: 32rpx;
					margin-left: 20rpx;
					color: $uni-text-color;
				}
			}

			.button1 {
				width: 126rpx;
				height: 44rpx;
				line-height: 44rpx;
				border-radius: 6rpx;
				color: #05a786;
				text-align: center;
				font-size: 24rpx;
				margin-left: 20rpx;
				border: 2rpx solid #23c5a4;
			}
			.button2 {
				width: 126rpx;
				height: 44rpx;
				line-height: 44rpx;
				border-radius: 6rpx;
				color: #ffffff;
				background-color: #12c1bb;
				text-align: center;
				font-size: 24rpx;
				margin-left: 20rpx;
				&::after{
					border: none;
				}
			}
 
		

			
		}

		// .actived {
		// 	border: 1rpx solid #12c1bb;
		// 	background-color: #293e57;
		// }
	}
</style>
