<!-- 关于我们 -->
<template>
	<view class="root"><v-nav-bar 
			:title="$t('user.about.navTitle')"
		/>
		<view class="content">
			<!-- 平台的介绍-->
			<view class="item">
				<view class="title btn-t-2 p-t20 bold">{{ $t('user.about.titles')[0] }}</view>
				<image class="img" src="../../static/user/wd_gywm_1.png" mode=""></image>
				<view class="text font-13 t p-t10">
					 {{ $t('user.about.texts')[0] }}
				</view>
				<view class="text font-13 p-b10">
					{{ $t('user.about.texts')[1] }}
				</view>
				<view class="flex align-start m-t10">
					<view class="left" :style="{'height': domHeight + 'px'}">
						<image src="../../static/user/wd_gywm_2.png" mode=""></image>
						<view class="label text-center font-14">{{ $t('user.about.labels')[0] }}</view>
						<view class="text font-11">
							{{ $t('user.about.texts')[2] }}
						</view>
					</view>
					<view class="right right-view">
						<view class="bg">
							<view class="label font-14">{{ $t('user.about.labels')[1] }}</view>
							<view class="text font-11">{{ $t('user.about.texts')[3] }}</view>
						</view>
						<view class="bg m-t8">
							<view class="label font-14">{{ $t('user.about.labels')[2] }}</view>
							<view class="text font-11">{{ $t('user.about.texts')[4] }}</view>
						</view>
						<view class="bg m-t8">
							<view class="label font-14">{{ $t('user.about.labels')[3] }}</view>
							<view class="text font-11">{{ $t('user.about.texts')[5] }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 平台的核心原则 -->
			<view class="item m-t20">
				<view class="title bold">{{ $t('user.about.titles')[1] }}</view>
				<view class="label p-t10 font-13">
					{{ $t('user.about.labels')[4] }}
				</view>
				<view class="text p-t10 font-13">
					{{ $t('user.about.texts')[6] }}
				</view>
				<view class="label p-t10 font-13">{{ $t('user.about.labels')[5] }}</view>
				<view class="text p-t10 font-13">
					{{ $t('user.about.texts')[7] }}
				</view>
				<view class="label p-t10 font-13">{{ $t('user.about.labels')[6] }}</view>
				<view class="text p-t10 font-13">
					{{ $t('user.about.texts')[8] }}
				</view>
			</view>
			
			<!-- 为何选择平台-->
			<view class="item m-t20" style="padding: 18rpx 11rpx 20rpx;">
				<view class="title bold">{{ $t('user.about.titles')[2] }}</view>
				<view class="list">
					<view class="m-t10 list-item flex align-start"
						v-for="(item, index) in list"
						:key="'about_' + index">
						<view class="left flex flex-wrap flex-center">
							<text class="icon iconfont" :class="item.icon"></text>
							<text class="w100p">{{ $t('user.about.listLabels')[index] }}</text>
						</view>
						<view class="right">
							{{ $t('user.about.listTexts')[index] }}
						</view>
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
		data () {
			return {
				domHeight: 400,
				list: [
					{
						icon: 'iconlicai'
					},
					{
						icon: 'iconhangqing'
					},
					{
						icon: 'iconcelue'
					},
					{
						icon: 'iconzidingyi'
					},
					{
						icon: 'iconzhuanye'
					},
					{
						icon: 'iconfenpei'
					}
				]
			}
		},
		onShow() {
			this.$nextTick(() => {
				let ovTop = uni.createSelectorQuery().select(".right-view");
				ovTop.boundingClientRect(data => {
					console.log(data)
					this.domHeight = data.height;
				}).exec()
			})
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 20rpx 30rpx;
	}
	.item {
		background-color: #0D1A2C;
		border-radius: 12rpx;
		padding: 2rpx 24rpx 24rpx;
		.t {
			text-indent: 60rpx;
		}
		.label {
			color: #f59a4b;
		}
		.text {
			color: $uni-text-color;
		}
		.title {
			font-size: 36rpx;
			color: $uni-color-primary;
		}
		.btn-t-2::after, .btn-t-2::before {
			width: calc(200% + 96rpx);
			left: calc(-50% - 48rpx);
		}
		.value {
			color: $uni-text-color;
		}
		.iconfont {
			font-size: 44rpx;
		}
		.img {
			width: 100%;
			height: 326rpx;
			margin-top: 10rpx;
		}
		.left {
			background-color: #273e5e;
			border-radius: 6rpx;
			width: 230rpx;
			padding: 6rpx;
			box-sizing: border-box;
			image {
				width: 218rpx;
				height: 166rpx;
			}
		}
		.right {
			width: calc(100% - 246rpx);
		}
		.bg {
			background-color: #273e5e;
			border-radius: 6rpx;
			padding: 6rpx;
			box-sizing: border-box;
		}
		.m-t8 {
			margin-top: 8rpx;
		}
	}
	.list-item {
		.left {
			width: 120rpx;
			color: #14e1f6;
			font-size: 26rpx;
			background-color: #213857;
			border-radius: 6rpx;
			text-align: center;
			padding: 14rpx 0;
			min-height: 120rpx;
			box-sizing: border-box;
			.icon {
				font-size: 42rpx;
			}
		}
		.right {
			width: calc(100% - 132rpx);
			padding: 8rpx 22rpx 20rpx;
			box-sizing: border-box;
			min-height: 120rpx;
			font-size: 26rpx;
			color: $uni-text-color;
			background-color: #213857;
			border-radius: 6rpx;
		}
	}
	
	.edition-col {
		background-color: #182134;
		text-align: center;
		padding: 30rpx;
		border-radius: 12rpx;
		.img {
			width: 132rpx;
			height: 132rpx;
		}
		.app-name {
			color: #2aa3b1;
			font-size: 36rpx;
			margin-top: 20rpx;
		}
		.app-edition {
			color: $uni-text-color;
			font-size: 26rpx;
			margin-top: 13rpx;
		}
	}
	
	.app-text {
		// text-indent: 40rpx;
		margin-top: 36rpx;
		font-size: 28rpx;
		color: $uni-text-color;
	}
</style>
