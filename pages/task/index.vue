<template>
	<view class="root">
		<view class="top-view flex" :style="{'padding-top': statusBarHeight + 'px'}">
			<view class="flex flex-start">
				<text class="title-item bold-8" :class="{'title-item-active':SearchInfo.ExcuteState === 2}" @click="onTopTabClick(2)">运行中</text>
				<text class="title-item bold-8" :class="{'title-item-active':SearchInfo.ExcuteState === 1}" @click="onTopTabClick(1)">已停止</text>
			</view>
			<view class="flex flex-end align-start" @click="showDrawer()">
				<text class="iconfont iconshaixuan color-light" style="font-size: 50rpx;padding-right: 30rpx;"></text>
			</view>
		</view>
		<scroll-view class="sep-view" scroll-x="true" scroll-left="1">
			<view id="demo0" class="scroll-view-item_H" style="width: 80rpx;">
				<view class=" flex flex-start" >
					<view class="sep-view-item-circle"> </view>
					<text class="sep-view-item-title color-dark font-15"  :class="{'sep-view-item-active':SearchInfo.TaskType==0}" style="margin-left: -14rpx;" @click="changeTaskType(0)">全部</text>
				</view>
			</view>
			<view id="demo1" class="scroll-view-item_H">
				<view class="flex flex-center ">
					<view class="sep-view-item-circle color-1"> </view>
					<text class="sep-view-item-title color-dark font-15" :class="{'sep-view-item-active':SearchInfo.TaskType==1}" @click="changeTaskType(1)">现货DCA</text>
				</view>
			</view>
			<view id="demo2" class="scroll-view-item_H">
				<view class="flex flex-center" >
					<view class="sep-view-item-circle color-2"> </view>
					<text class="sep-view-item-title color-dark font-15" :class="{'sep-view-item-active':SearchInfo.TaskType==2}" @click="changeTaskType(2)">现货网格</text>
				</view>
			</view>
			<view id="demo3" class="scroll-view-item_H">
				<view class="flex flex-center" >
					<view class="sep-view-item-circle color-3"> </view>
					<text class="sep-view-item-title color-dark font-15" :class="{'sep-view-item-active':SearchInfo.TaskType==3}" @click="changeTaskType(3)">合约多空</text>
				</view>
			</view>
			<view id="demo4" class="scroll-view-item_H ">
				<view class="flex flex-center" >
					<view class="sep-view-item-circle color-4"> </view>
					<text class="sep-view-item-title color-dark font-15" 	:class="{'sep-view-item-active':SearchInfo.TaskType==4}" @click="changeTaskType(4)">合约网格</text>
				</view>
			</view>
			<view id="demo5" class="scroll-view-item_H ">
				<view class="flex flex-center " >
					<view class="sep-view-item-circle color-5"> </view>
					<text class="sep-view-item-title color-dark font-15 " :class="{'sep-view-item-active':SearchInfo.TaskType==5}" @click="changeTaskType(5)">合约DCA</text>
				</view>
			</view>
		</scroll-view>
		<scroll-view class="order-view" :scroll-y="true" :scroll-top="scrollTop" @scrolltolower="scrolltolowerFn" @scroll='scroll' 
			:style="{height: ovHeight+'px'}">
			<view style="height: 1rpx;"></view>
			<view v-if="TaskList.length == 0 && loading" class="no-data">暂无数据</view>
			<view class="order-item flex flex-column flex-center" v-for="(item, index) in TaskList" :key="'task_' + index" >
				<TaskItem :TaskData="item" :index="index"  v-if="isAlive"   @remove="remove" ></TaskItem>
			</view>
		</scroll-view>
		<view class="create-view flex flex-column flex-center" :style="{'bottom': 50-statusBarHeight + 'px'}"  @click="onAddTaskBtnClick()" v-show="showAddBtn">
			<text class="iconfont iconchuangjian color-white" style="font-size: 64rpx;"></text>
			<text class="color-white font-14">创建</text>
		</view>
		<uni-drawer ref="showRight" mode="right" :mask-click="true" @change="drawerChange" style="opacity: 0.9;">
			<view class="drawer-view flex flex-column flex-start align-start">
				<view class="drawer-view-item flex flex-start" style="margin-top: 100rpx;">
					<text class="font-15 color-dark p-lr14">交易渠道</text>
				</view>
				<view class="drawer-view-item flex flex-start" v-for="channel,index in EchannelArr" :key="'channel'+index" @click="changeSearchInfo(index)">
					<view class="circle " :class="{'circled':SearchInfo.Echannel==index}">
						<text class="iconfont icongou circle-gou" v-show="SearchInfo.Echannel==index"></text>
					</view>
					<text class="font-18 color-light " :class="{'seleted':SearchInfo.Echannel==index}">{{channel}}</text>
				</view>
				<view class="drawer-view-item flex flex-start">
					<text class="font-15 color-dark p-lr14">玩法类型</text>
				</view>
				<view class="drawer-view-item flex flex-start"  v-for="playType,index in PlayTypeArr"  :key="'playType'+index" @click="changeSearchPlayType(index)">
					<view class="circle" :class="{'circled':SearchInfo.PlayType==index}">
						<text class="iconfont icongou circle-gou" v-show="SearchInfo.PlayType==index"></text>
					</view>
					<text class="font-18 color-light" :class="{'seleted':SearchInfo.PlayType==index}">{{playType}}</text>
				</view>
				<view class="" v-show="SearchInfo.PlayType!=0">
					<view class="drawer-view-item flex flex-start">
						<text class="font-15 color-dark p-lr14">交易类型</text>
					</view>
					<view class="drawer-view-item flex flex-start" v-show="SearchInfo.PlayType==1"
						@click="changeSearchTaskType(1)">
						<view class="circle" :class="{'circled':SearchInfo.TaskType==1}">
							<text class="iconfont icongou circle-gou" v-show="SearchInfo.TaskType==1"></text>
						</view>
						<text class="font-18 color-light" :class="{'seleted':SearchInfo.TaskType==1}">DCA交易</text>
					</view>
					<view class="drawer-view-item flex flex-start" v-show="SearchInfo.PlayType==1"
						@click="changeSearchTaskType(2)">
						<view class="circle" :class="{'circled':SearchInfo.TaskType==2}">
							<text class="iconfont icongou circle-gou" v-show="SearchInfo.TaskType==2"></text>
						</view>
						<text class="font-18 color-light" :class="{'seleted':SearchInfo.TaskType==2}">网格交易</text>
					</view>
					<view class="drawer-view-item flex flex-start" v-show="SearchInfo.PlayType==2"
						@click="changeSearchTaskType(3)">
						<view class="circle" :class="{'circled':SearchInfo.TaskType==3}">
							<text class="iconfont icongou circle-gou" v-show="SearchInfo.TaskType==3"></text>
						</view>
						<text class="font-18 color-light" :class="{'seleted':SearchInfo.TaskType==3}">智能多空</text>
					</view>
					<view class="drawer-view-item flex flex-start" v-show="SearchInfo.PlayType==2"
						@click="changeSearchTaskType(4)">
						<view class="circle" :class="{'circled':SearchInfo.TaskType==4}">
							<text class="iconfont icongou circle-gou" v-show="SearchInfo.TaskType==4"></text>
						</view>
						<text class="font-18 color-light" :class="{'seleted':SearchInfo.TaskType==4}">网格交易</text>
					</view>
					<view class="drawer-view-item flex flex-start" v-show="SearchInfo.PlayType==2"
						@click="changeSearchTaskType(5)">
						<view class="circle" :class="{'circled':SearchInfo.TaskType==5}">
							<text class="iconfont icongou circle-gou" v-show="SearchInfo.TaskType==5"></text>
						</view>
						<text class="font-18 color-light" :class="{'seleted':SearchInfo.TaskType==5}">DCA交易</text>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>
	import TaskItem from './component/task_item.vue';
	export default {
		components: {
			TaskItem
		},
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				showAddBtn:true,
				StopTaskData: {}, //
				TaskList: [],
				scrollTop: 0,
				ovHeight: 300,
				Page: 1,
				Size: 10,
				TotalCount: 0,
				loading: false,
				isAlive:true,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				SearchInfo: {
					ExcuteState: 2, // 1已停止 2运行中
					Echannel: 0, // 0全部 1火币2币安3比特儿
					PlayType: 0, //玩法类型 0全部 1现货 2USDT合约
					TaskType: 0 //策略类型 0全部 1现货DCA 2现货-网格交易 3USDT合约-智能多空 4USDT合约-网格交易 5合约DCA
				},
				EchannelArr:['全部','火币','币安','比特儿'],
				PlayTypeArr:['全部','现货','合约']
			}
		},


		//*******************************************************************
		// 页面初始化检验是否登录
		//*******************************************************************
		onLoad(option) {
			// console.log('任务ONload', taskType)
			// this.$store.dispatch('CHECK_LOGIN').then(res => {
			// 	if (res) {
			// 		this.Page = 1;
			// 		this.loading = false;
			// 		this.sendQueryTaskListReq();
			// 	}
			// });
		},
		

		//*******************************************************************
		// 显示
		//*******************************************************************
		onShow() {
			this.isAlive = true
			this.$store.dispatch('CHECK_LOGIN').then(res => {
				if (res) {
					this.Page = 1;
					this.loading = false;
					this.TaskList = []
					this.sendQueryTaskListReq();
				}
			});
		},
		onHide() {
			console.log('隐藏了,设置flag')
			this.isAlive = false
		},

		//*******************************************************************
		// 自适应高度
		//*******************************************************************
		onReady() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					console.log('系统信息',res)
					let ovTop = uni.createSelectorQuery().select(".order-view");
					ovTop.boundingClientRect(data => {
						self.ovHeight = res.windowHeight - data.top
					}).exec()
				}
			})
		},
		// computed: {
		// ...mapState({
		// 	statusBarHeight: state => state.statusBarHeight
		// })
		// },

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//打开抽屉
			showDrawer() {
				this.$refs.showRight.open();
			},
			// closeDrawer() {
			// 	this.$refs.showRight.close();
			// },
			drawerChange: function(e) {
				if (e == false) {
					// this.TaskList = []
					this.sendQueryTaskListReq()
				}
			},
			
			 //删除子组件
			    remove(n){
			        this.TaskList.splice(n,1); 
			    },
			//这里就直接写方法了
			reload(){
				// 条件渲染，让div销毁
				this.isAlive = false
				// 条件渲染，让div渲染
				this.$nextTick(()=>{
					this.isAlive = true
				})
			},

			changeSearchInfo(channel) {
				this.SearchInfo.Echannel = channel
			},
			changeSearchPlayType(type) {
				this.SearchInfo.PlayType = type
				if (type == 0) {
					this.SearchInfo.TaskType = 0
				}
			},
			changeSearchTaskType(type) {
				this.SearchInfo.TaskType = type
			},

			//切换tab点击
			onTopTabClick(index) {
				//this.TaskList = []
				this.SearchInfo.ExcuteState = index
				this.SearchInfo.Echannel = 0
				this.SearchInfo.PlayType = 0
				this.SearchInfo.TaskType = 0
				this.Page = 1;
				this.loading = false;
				this.scrollTop = 0;
				this.sendQueryTaskListReq()
			},

			//添加任务按钮点击
			onAddTaskBtnClick() {
				let url = '/pages/task/edit'
				uni.navigateTo({
					url: url
				})
			},

			//任务详情点击
			onTaskDetailClick(item) {
				//this.TaskList = []
				let url = '/pages/task/detail?TaskId=' + item.TaskId + '&TaskType=' + item.TaskType
				uni.navigateTo({
					url: url
				})
			},

			// 页面滚动事件
			scrolltolowerFn() {
				console.log('滚动触底事件')
				this.showAddBtn = false
				if (this.loading) return false;
				if(this.Page>this.TotalCount/this.Size){
					console.log('无更多数据')
					return false;
				}
				this.Page++;
				this.sendQueryTaskListReq();
			},
			scroll(e){
				 // console.log(this.ovHeight,e.detail)
				if(this.showAddBtn==false&&e.detail.scrollTop<200){
					this.showAddBtn = true
				}
				if(this.showAddBtn==true&&e.detail.scrollTop>200){
					this.showAddBtn = false
				}
			},
			//切换交易类型
			changeTaskType(type) {
				
				this.SearchInfo.TaskType = type
				if(type==0){
					this.SearchInfo.PlayType = 0
				}else if (type < 3) {
					this.SearchInfo.PlayType = 1
				} else {
					this.SearchInfo.PlayType = 2
				}
				//this.TaskList = []
				this.Page = 1;
				this.loading = false;
				this.scrollTop = 0;
				this.sendQueryTaskListReq()
			},

			//查询任务列表
			sendQueryTaskListReq() {
				this.loading = true;
				let url = this.ApiConfig.DataUrl + '/BSGetTaskListReq';
				this.CsHttp.post(url, {
					Page: this.Page,
					Size: this.Size,
					UserId: uni.getStorageSync('UserData').UserId,
					ExcuteState: this.SearchInfo.ExcuteState,
					Echannel: this.SearchInfo.Echannel, //交易渠道 0全部 1火币2币安3比特儿
					PlayType: this.SearchInfo.PlayType, //玩法类型 0全部 1现货 2USDT合约
					TaskType: this.SearchInfo.TaskType, //策略类型 0全部 1现货-高频交易 2现货-网格交易 3USDT合约-智能多空 4USDT合约-网格交易
				}, true).then(ackMsg => {
					this.TotalCount = ackMsg.TotalCount;
					if (this.Page == 1) {
						this.TaskList = [...ackMsg.TaskDataList];
					} else {
						this.TaskList.push(...ackMsg.TaskDataList);
					}
					this.loading = false;
					if (this.TaskList.length == this.TotalCount) {
						this.loading = true;
					}
				}).catch(err => {
					this.loading = false;
					this.Page--;
				})
			},

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
		background-color: #000E18;
	}

	.h75 {
		height: 75%;
	}
	.color-0{
		background-color: #ffffff;
	}

	.color-1 {
		background-color: #FF8B26;
	}
	
	.color-2 {
		background-color: #0DE5C1;
	}
	
	.color-3 {
		background-color: #2CC5FF;
	}
	
	.color-4 {
		background-color: #FC355A;
	}
	
	.color-5 {
		background-color: #EA2CFF;
	}

	.color-green {
		color: #05DE35;
	}

	.color-danger {
		color: #FF3B00;
	}

	.color-lose {
		color: #05DE35;
	}

	.color-win {
		color: #FF3B00;
	}


	.sep-view {
		white-space: nowrap;
		width: 100%;
		height: 72rpx;
		background-color: #0D1A2C;
		box-sizing: border-box;
		padding: 0 27rpx;
		display: flex;
		flex-direction: row;

		.scroll-view-item_H {
			display: inline-block;
			width: 180rpx;
			height: 100%;
	        line-height: 68rpx;

			.sep-view-item-circle {
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
			}

			.sep-view-item-title {
				
				padding-left: 8rpx;
				border-bottom: 4rpx solid #0D1A2C;
			}

			.sep-view-item-active {
				color: #CED3E9;
				border-bottom: 4rpx solid #14E1F4;
			}
		}
	}

	.drawer-view {
		width: 445rpx;
		height: 100%;
		background-color: #1e2a41;
		box-shadow: -2rpx 0rpx 4rpx 0rpx rgba(4, 11, 25, 0.1);

		&-item {
			height: 77rpx;

			.circle {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 23rpx 0 14rpx;
				width: 38rpx;
				height: 38rpx;
				background-color: #172133;
				border-radius: 50%;

				image {
					margin-top: 2rpx;
					width: 30rpx;
					height: 30rpx;
				}

				&-gou {
					font-size: 20rpx;
					color: #FFFFFF;
				}

			}

			.circled {
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				border: 7rpx solid #364867;
				background-color: #12c1bb;
			}

			.seleted {
				color: #12c1bb;
			}
		}

	}

	.line {
		width: 100%;
		height: 16rpx;
		background-color: #f4f6fa;
	}

	.top-view {
		width: 100%;
		height: 88rpx;
		background-color: #000E18;

		.title-item {
			padding: 0 28rpx;
			line-height: 88rpx;
			color: #6f87a4;
			font-size: 34rpx;
		}
		.title-item-active {
			color: #14E1F4;
		}
	}


	.order-view {
		width: 100%;
		// background-color: #ebebeb;
		//box-sizing: border-box;
		.order-item{
			box-sizing: border-box;
			padding: 0 14rpx;
			margin-top: 24rpx;
		}
	}

	.create-view {
		position: fixed;
		right: 10rpx;
		bottom: 100rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: #12c1bb;
  //       animation: mymoveIn 1s infinite;
		// animation-timing-function: ease-in-out;
		// animation-iteration-count:1;
		image {
			width: 37rpx;
			height: 45rpx
		}

	}
	@keyframes mymove {
	  from {right: 0px;}
	  to {right: -120rpx;}
	}
	@keyframes mymoveIn {
	  from {right: -120px;}
	  to {right: 0rpx;}
	}
</style>
