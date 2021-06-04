import Vue from 'vue'

//http请求的使用封装
export default {
	
	//**************************************************************
	// 内部调用发送http请求
	//**************************************************************
	request(url, data, method){
		console.log('发送http请求数据:' + JSON.stringify(data))
		// let header = {'Content-Type': 'application/x-www-form-urlencoded'}
		let header = {}
		let ApiAuth = uni.getStorageSync('ApiAuth')
		if(ApiAuth){
			header['ApiAuth'] = ApiAuth
		}
		return new Promise((reslove,reject)=>{
			uni.request({
				url: url,
				header: header,
				method: method,
				data: data,
			}).then(ack => {	
				let [err, res] = ack;
				if(res.statusCode === 200){
					reslove(res.data)
				}
			}).catch(err => {
				console.log('catch:', err)
			})
		})
	},
	
	
	//**************************************************************
	// 发送http的get请求
	//**************************************************************
	async get(url, data, yanci=false){
		if(yanci){
			uni.showLoading({
				title:'加载中'
			})
			setTimeout(()=>{
				uni.hideLoading()
			},3000)			
		}
		const res = await this.request(url, data, 'GET')
		if(yanci){
			setTimeout(()=>{
				uni.hideLoading()
			},200)	
		}
		return res
	},
	
	
	//**************************************************************
	// 发送http的post请求
	//**************************************************************
	async post(url, data, yanci=false){
		if(yanci){
			uni.showLoading({
				title:'加载中'
			})
			setTimeout(()=>{
				uni.hideLoading()
			},3000)			
		}
		let strData = JSON.stringify(data)
		const res = await this.request(url, strData, 'POST')
		if(yanci){
			setTimeout(()=>{
				uni.hideLoading()
			},200)
		}
		return res
	},
	
}