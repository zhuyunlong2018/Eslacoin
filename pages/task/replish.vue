<template>
	<view class="root">
		<v-nav-bar title="补仓策略" />
		<view class="top-view flex back-color-hui">
			<text class="color-green  m-l30" v-if="TaskType==1">提示:数值为前次补仓价格的跌幅</text>
			<text class="color-green  m-l30" v-else-if="TaskType==3">亏损率：当前总持仓的亏损率 \n 资金比：当前合约账户剩余可用资金的比例</text>
			<text class="color-green  m-l30" v-else-if="TaskType==5">亏损率：当前总持仓的亏损率</text>
		</view>
		<view class="content-view flex flex-column">
			<view class="content-view-item flex  back-color-hui" v-for="item,index in ReplishData" :key="index">

				<text class="times color-light">第{{index+1}}次</text>
				<view class="die">
					<text class="color-dark font-12">{{TaskType==1?'跌幅':'亏损率'}}:</text>
					<text class="font-15 color-light p-lr10">{{item.Decline}}</text>
					<text class="color-dark font-12">%</text>
				</view>

				<view class="count" v-if="TaskType==1">
					<text class="color-dark font-12">金额</text>
					<text class="font-15 color-orange p-lr10">{{item.BuyCoin}}</text>
					<text class="color-dark font-10">/USDT</text>
				</view>
				<view class="count" v-else-if="TaskType==3">
					<text class="color-dark font-12">资金比</text>
					<text class="font-15 color-orange p-lr10">{{item.BuyRatio}}</text>
					<text class="color-dark font-10">%</text>
				</view>
				<view class="count" v-else>
					<text class="color-dark font-12">数量</text>
					<text class="font-15 color-orange p-lr10">{{item.BuyCount}}</text>
					<text class="color-dark font-10">{{Symbol}}</text>
				</view>
				<view class="button-view flex">
					<button class="delbtn" plain="true" @click="delReplish(index)">删除</button>
				</view>

			</view>
		</view>
		<view class="add-bottom-view flex flex-center back-color-hui">
			<button @click="onAddClick" plain="true">+添加一个补仓</button>
		</view>

		<view class="confirm-bottom-view">
			<button type="primary" @click="confirmReplish()">确认</button>
		</view>
		<uni-popup ref="replish" type="replish">
			<uni-popup-replish v-on:update="addReplish" :TaskType="TaskType":Symbol="Symbol"></uni-popup-replish>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				TaskType: 1,
				Symbol:'',
				ReplishData: [], // 列表
			}
		},

		//*******************************************************************
		// 加载
		//*******************************************************************
		onLoad(option) {
			//如果是编辑界面则从缓存中获取数据
			let ReplishData = uni.getStorageSync('ReplishData')
			console.log('补仓页面onLoad  得到缓存的补仓数据', ReplishData)
			if (ReplishData) {
				this.ReplishData = ReplishData
			}
			if (option.TaskType) {
				this.TaskType = parseInt(option.TaskType)
			}
			if (option.Symbol) {
				this.Symbol = option.Symbol.replace("USDT", "")
			}
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {

			onAddClick() {
				this.$refs.replish.open()
			},
			//增加记录
			addReplish(val1,val2) {
				console.log(val1,val2)
				let len = this.ReplishData.length
				if (this.TaskType == 1) {
					this.ReplishData.push({
						Decline: val1,
						BuyCoin: val2
					})
				} else if(this.TaskType == 3) {
					this.ReplishData.push({
						Decline: val1,
						BuyRatio: val2
					})
				}else if(this.TaskType == 5) {
					this.ReplishData.push({
						Decline: val1,
						BuyCount: val2
					})
				}
			},
			//删除
			delReplish(index) {
				this.ReplishData.splice(index, 1);
			},
			//提交
			confirmReplish() {
				let len = this.ReplishData.length
				for (let i = 0; i < len; i++) {
					this.ReplishData[i].Sort = i + 1
					this.ReplishData[i].Decline = parseFloat(this.ReplishData[i].Decline)
					if (this.TaskType == 1) {
						this.ReplishData[i].BuyCoin = parseFloat(this.ReplishData[i].BuyCoin)
					} else if(this.TaskType == 3) {
						this.ReplishData[i].BuyRatio = parseFloat(this.ReplishData[i].BuyRatio)
					}else if(this.TaskType == 5){
						this.ReplishData[i].BuyCount = parseFloat(this.ReplishData[i].BuyCount)
					}
				}
				console.log('提交的补仓数据', this.ReplishData);
				uni.$emit('ReplishData', this.ReplishData)
				uni.navigateBack({})
			}
		},
	}
</script>

<style lang="scss">
	@import "task.scss";

	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			font-size: 26rpx;
		}
	}

	.top-view {
		width: 100%;
		height: 80rpx;
	}

	.content-view {
		width: 100%;

		.content-view-item {
			width: 100%;
			margin-top: 20rpx;
			height: 90rpx;

			.times {
				width: 15%;
				padding-left: 31rpx;
				position: relative;

				&::after {
					content: ' ';
					position: absolute;
					width: 3rpx;
					height: 24rpx;
					border-radius: 3rpx;
					background-color: #12c1bb;
					left: 20rpx;
					top: 8rpx;
				}
			}

			.die {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 35%;

				input {
					width: 60rpx;
					text-align: center;
				}
			}

			.count {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 35%;

				input {
					width: 100rpx;
					text-align: center;
				}
			}

			.button-view {
				width: 20%;

				.delbtn {
					width: 126rpx;
					height: 44rpx;
					border-radius: 6rpx;
					border: solid 2rpx #d14b64;
					font-size: 24rpx;
					line-height: 40rpx;
					letter-spacing: 0px;
					color: #d14b64;
				}
			}
		}
	}

	.add-bottom-view {
		width: 100%;
		height: 90rpx;
		margin-top: 20rpx;

		button {
			width: 268rpx;
			height: 58rpx;
			background-color: rgba(18, 193, 187, 0.1);
			border-radius: 8rpx;
			border: solid 2rpx #12c1bb;
			font-size: 28rpx;
			line-height: 50rpx;
			color: #12c1bb;

			&::after {
				border: none;
			}
		}
	}

	.confirm-bottom-view {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 200rpx;

		button {
			width: 580rpx;
			height: 98rpx;
			background-color: #2aa3b1;
			border-radius: 12rpx;
			line-height: 98rpx;
			font-size: 36rpx;
			color: #ffffff;
			;
		}
	}
</style>
