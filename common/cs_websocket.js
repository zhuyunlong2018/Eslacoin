import Vue from 'vue'

var CsWebSocket = function() {
	
	this.startConnect = false 			//是否开始连接了
	this.connected = false				//是否已经连接了
	this.connecting = false				//是否正在尝试连接
	this.socketTask = false				//websocket的返回控制类
	this.connUrl = ''					//连接地址
	this.sendHeartInterval = null		//发送心跳的定时器
	this.checkHeartInterval = null		//检测心跳超时的定时器
	this.ckMaxTimes = 3					//最大超时检测心跳次数
	this.curMisTimes = 0				//当前心跳检测超时的次数
	this.sendMsgEventName = ''			//发送消息的全局监听事件
	this.recvMsgEventName = ''			//接收到消息的全局通知事件
	this.connName = ''					//连接的日志打印名称
	this.stopCheck = false				//停止心跳检测


	//******************************************************************
	//开始连接注册心跳检测
	//******************************************************************
	this.startConnect = function(coUrl, smeName, rmeName, coName){
		let self = this
		self.connUrl = coUrl
		self.sendMsgEventName = smeName
		self.recvMsgEventName = rmeName
		self.connName = coName
		if(self.sendHeartInterval && self.checkHeartInterval){
			clearInterval(self.sendHeartInterval)
			clearInterval(self.checkHeartInterval)
		}
		self.connect()
		//注册全局监听以事件方式发送消息
		uni.$on(self.sendMsgEventName, (sendData) => {
			console.log(sendData)
			self.send(sendData)
		})
		if(self.stopCheck == true){
			return
		}
		//定时发送心跳消息
		self.sendHeartInterval = setInterval(() => {
			if(self.startConnect == false || self.socketTask == false || self.connecting == true){
				return
			}
			let sendData = {
				PingReq:{
					MsgId: 'PingReq'
				}
			}
			self.send(JSON.stringify(sendData))
		}, 2000)
		//检测心跳超时消息
		self.checkHeartInterval = setInterval(() => {
			if(self.startConnect == false){
				return
			}
			self.curMisTimes ++
			if(self.curMisTimes > self.ckMaxTimes){
				console.log(self.connName + '开始重连')
				self.curMisTimes = 0
				self.connect()
			}
		}, 2000)
	}
	
	
	//******************************************************************
	//连接的具体处理
	//******************************************************************
	this.connect = function() {
		let self = this
		if (self.connected || self.connecting) {
			console.log(self.connName + '已经连接或正在连接中')
			return false
		}
		self.connecting = true
		self.socketTask = uni.connectSocket({
			url: self.connUrl,
			data() {
				return {
					msg: 'Hello'
				}
			},
			// #ifdef MP
			header: {
				'content-type': 'application/json'
			},
			// #endif
			// #ifdef MP-WEIXIN
			method: 'GET',
			// #endif
			success(res) {
				// 这里是接口调用成功的回调，不是连接成功的回调，请注意
				console.log(self.connName + '开始连接:' + self.connUrl)
			},
			fail(err) {
				// 这里是接口调用失败的回调，不是连接失败的回调，请注意
				console.error(self.connName + '连接调用接口失败:' + self.connUrl + JSON.stringify(err))
			}
		})
		self.socketTask.onOpen((res) => {
			self.connecting = false
			self.connected = true
			self.startConnect = true
			console.log(self.connName + '连接成功:' + self.connUrl, JSON.stringify(res))
		})
		self.socketTask.onError((err) => {
			self.connecting = false
			self.connected = false
			console.error(self.connName + '连接出错:' + self.connUrl, JSON.stringify(err))
		})
		self.socketTask.onMessage((res) => {
			let recvData = res.data
			let recvStu = {}
			if(typeof recvData == 'string'){
				recvStu = recvData
			}else{
				let recvStr = decodeURIComponent(escape(String.fromCodePoint.apply(null, new Uint8Array(recvData))))
				recvStu = JSON.parse(recvStr)
			}
			if(recvStu.PingAck){
				self.curMisTimes = 0
				return
			}
			uni.$emit(self.recvMsgEventName, recvStu)
		})
		self.socketTask.onClose((res) => {
			self.connected = false
			self.startRecive = false
			self.socketTask = false
			console.log(self.connName + '连接关闭' + self.connUrl, JSON.stringify(res))
		})
	}
	
	
	//******************************************************************
	//发送消息(注册了发送监听事件)
	//******************************************************************
	this.send = function(sendData) {
		let self = this
		if(self.socketTask == null || self.connected == false){
			console.error(self.connName + '发送数据失败:当前未连接成功' + JSON.stringify(sendData))
			return
		}
		self.socketTask.send({
			data: sendData,
			success(res) {
				let stcData = JSON.parse(sendData)
				if (stcData.PingReq){
					return
				}
				console.log(self.connName + '发送数据成功:' + JSON.stringify(sendData))
			},
			fail(err) {
				console.error(self.connName + '发送数据失败:' + JSON.stringify(err))
			}
		})
	}
	
	
	//******************************************************************
	//关闭连接
	//******************************************************************
	this.close = function() {
		let self = this
		if (self.socketTask && self.socketTask.close) {
			self.socketTask.close()
			if(self.sendHeartInterval && self.checkHeartInterval){
				clearInterval(self.sendHeartInterval)
				clearInterval(self.checkHeartInterval)
			}
		}
	}
}

module.exports = CsWebSocket