<template>
	<view class="root">
		<uni-nav-bar left-icon="arrowleft" title="测试导航栏" right-icon="scan" @clickLeft="sendHttpReq()" />
		<text class="textbtn" @click="sendHttpReq()">发送Http请求</text>
		<text class="textbtn" @click="sendWebSocketReq()">发送WebSocket请求</text>
		<zcomponent :titleText="zConmText"></zcomponent>
		<text class="textbtn" @click="setLoginState(!getLoginState)">点击设置登录状态={{getLoginState}}</text>
		<button @click="openUniPopUi">打开UNI弹窗</button>
		<uni-popup ref="uniPopUi" type="bottom">底部弹出 Popup</uni-popup>
		<button @click="openSelfCompPopUi">打开组件自定义弹窗</button>
		<aui-popui ref="auiPopUi" title="组件-属性传递提示消息"></aui-popui>
		<button @click="openSelfPopUi">打开自定义弹窗</button>
		<zpopui ref="zpopui" title="属性传递提示消息"></zpopui>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations} from 'vuex'
	import zcomponent from '@/pages/ztest/zcomponent.vue'
	import zpopui from '@/pages/ztest/zpopui.vue'
	
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				zConmText: '传递组件标题',
				zTipText: '传递提示信息到自定义弹框',
			}
		},

		//*******************************************************************
		// 组件
		//*******************************************************************
		components:{
			zcomponent,zpopui,
		},
		
		//*******************************************************************
		// 计算
		//*******************************************************************
		computed: {
			...mapGetters(['getLoginState']),
		},
		
		//*******************************************************************
		// 监控
		//*******************************************************************
		watch: {
			zTipText: function(){
				console.log('数值变化了' + this.zTipText)
			}
		},
		
		//*******************************************************************
		// 加载
		//*******************************************************************
		onLoad(){
			console.log('ZTEST onLoad')
			uni.$on('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
		},

		//*******************************************************************
		// 显示
		//*******************************************************************
		onShow(){
			console.log('ZTEST onShow')
		},
		
		//*******************************************************************
		// 隐藏
		//*******************************************************************
		onHide(){
			console.log('ZTEST onHide')
		},
		
		//*******************************************************************
		// 卸载
		//*******************************************************************
		onUnload(){
			console.log('ZTEST onUnload')
			uni.$off('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//大厅WebSocket消息监听
			onLobbyMsgEvent(recvData){
				console.log('收到Lobby消息数据:' + JSON.stringify(recvData))
				//注册账号的回复
				if(recvData.CSRegisterAccountAck){
					console.log('账号注册:' + recvData.CSRegisterAccountAck.ErrMsg)
				}
			},
			
			//发送http请求
			sendHttpReq(){
				let sendMsg = {}
				this.CsHttp.get('/getRecommendGoods', sendMsg, false).then(res=>{
					console.log('收到获取的首页数据:' + JSON.stringify(res))
				})
			},
			
			//发送WebSocket请求
			sendWebSocketReq(){
				let sendMsg = {
					CSRegisterAccountReq: {
						RecommendId: '0',
						Account: 'abc123',
						Password: '123456',
						AccountType: 'NORMAL',
						Channel: 'inner',
						Device: 'IOS'
					}
				}
				uni.$emit('SEND_LOBBY_WS_MSG_EVENT', JSON.stringify(sendMsg))
			},
			
			//设置登录状态函数
			...mapMutations(['setLoginState']),
			
			//打开uni的popui弹窗
			openUniPopUi(){
				this.$refs.uniPopUi.open()
			},
			
			//打开组件popui弹窗
			openSelfCompPopUi(){
				this.zTipText = 'zTipText' + (100000 + Math.floor(Math.random()*899999))
				this.$refs.auiPopUi.showPopUi(this.zTipText)
			},
			
			//打开popui弹窗
			openSelfPopUi(){
				// this.zTipText = 'zTipText' + (100000 + Math.floor(Math.random()*899999))
				// this.$refs.zpopui.showPopUi(this.zTipText)		
				this.onUpdateTaskClick()
			},
			
			//创建任务按钮点击
			onCreateTaskClick(){
				let repList = [];
				repList.push({Sort: 1,Decline: 3.0, BjCoin: 10});
				repList.push({Sort: 2,Decline: 3.0, BjCoin: 20});
				repList.push({Sort: 3,Decline: 3.0, BjCoin: 30});
				
				let BSCreateTaskReq = {
					TaskName: '策略套利',
					TaskType: 2,
					Symbol: 'xrpusdt',
					BjCoin: parseFloat(10+''),
					SellRatio: parseFloat(3.0+''),
					SellRatioFd: parseInt(1.0+''),
					TriggerCoinMin: parseFloat(0+''),
					TriggerCoinMax: parseFloat(999999+''),
					TriggerNum: parseInt(5+''),
					State: 0,
					ReplishJson: JSON.stringify(repList),
				}
				this.CsHttp.post('http://127.0.0.1:21213/BSCreateTaskReq', BSCreateTaskReq, true).then(ackMsg=>{
					console.log('收到创建新任务的回复:' + JSON.stringify(ackMsg))
				})
			},
			
			//更新任务按钮点击
			onUpdateTaskClick(){
				let repList = [];
				repList.push({Sort: 1,Decline: 3.0, BjCoin: 20});
				repList.push({Sort: 2,Decline: 3.0, BjCoin: 30});
				repList.push({Sort: 3,Decline: 3.0, BjCoin: 40});
				let BSUpdateTaskReq = {
					TaskId: 82,
					BjCoin: parseFloat(10+''),
					SellRatio: parseFloat(3.0+''),
					SellRatioFd: parseInt(1.0+''),
					TriggerCoinMin: parseFloat(0+''),
					TriggerCoinMax: parseFloat(999999+''),
					TriggerNum: parseInt(10+''),
					State: 2,
					ReplishJson: JSON.stringify(repList),
				}
				this.CsHttp.post('http://127.0.0.1:21213/BSUpdateTaskReq', BSUpdateTaskReq, true).then(ackMsg=>{
					console.log('收到更新任务的回复:' + JSON.stringify(ackMsg))
				})
			},
			
			//获取任务按钮点击
			onBSGetTaskListReq(){
				
				this.CsHttp.post('http://127.0.0.1:21213/BSGetTaskListReq', {}, true).then(ackMsg=>{
					console.log('收到获取任务列表的回复:' + JSON.stringify(ackMsg))
				})
			},
			
			//获取订单按钮点击
			onBSGetOrderListReq(){
				let BSGetOrderListReq = {
					TaskId: 1,
					TaskIndex: 1,
				}
				this.CsHttp.post('http://127.0.0.1:21213/BSGetOrderListReq', BSGetOrderListReq, true).then(ackMsg=>{
					console.log('收到获取任务列表的回复:' + JSON.stringify(ackMsg))
				})
			}
		},
	}
</script>

<style lang="scss">
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	.textbtn{
		margin-top: 5rpx;
		background-color: #cacaff;	
	}
</style>