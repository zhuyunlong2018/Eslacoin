<template>
	<view class="root">
		<text class="textbtn" @click="sendWebSocketReq()">发送WebSocket请求</text>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations} from 'vuex'

	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {

			}
		},

		//*******************************************************************
		// 加载-进入时监听websoeket监听
		//*******************************************************************
		onLoad(){
			console.log('ZTEST onLoad')
			uni.$on('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
			this.sendWebSocketReq()
		},
		
		//*******************************************************************
		// 卸载-离开时释放websocket监听
		//*******************************************************************
		onUnload(){
			console.log('ZTEST onUnload')
			uni.$off('RECV_LOBBY_WS_MSG_EVENT', this.onLobbyMsgEvent)
		},

		//*******************************************************************
		// 方法
		//*******************************************************************
		methods: {
			//WebSocket消息监听
			onLobbyMsgEvent(recvData){
				console.log('收到Lobby消息数据:' + JSON.stringify(recvData))
				//获取K线回复数据
				if(recvData.CSGetKlineAck){
					console.log('K线数据回复:' + recvData.CSGetKlineAck.Msg)
					//处理收到的websocket消息
				}
			},
			
			//发送WebSocket请求
			sendWebSocketReq(){
				let sendMsg = {
					CSGetKlineReq: {
						Symbol: "BTC",
						Interval: "1min",
					}
				}
				uni.$emit('SEND_LOBBY_WS_MSG_EVENT', JSON.stringify(sendMsg))
			},
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