//服务器地址管理配置
let ApiConfig = {};
// 运行环境类型
let evn = 'dev';
// let evn = 'test';
// let evn = 'prod';
ApiConfig = {
	// 开发环境地址
	dev: {
		Http: 'http://13.213.130.71:20303',
		WebsocketUrl: 'ws://13.213.130.71:20502',
		User: 'http://13.213.130.71:20303/user',
		DataUrl: 'http://13.213.130.71:20303/data',
		XhDcaUrl: 'http://13.213.130.71:20303/xhdca',  //现货DCA交易
		XhWgUrl: 'http://13.213.130.71:20303/xhwg',  //现货网格交易
		HyZnUrl: 'http://13.213.130.71:20303/hyusdtzn',  //合约智能多空
		HyWgUrl: 'http://13.213.130.71:20303/hyusdtwg',  //合约网格交易
		HyDcaUrl: 'http://13.213.130.71:20303/hyusdtdca',  //合约DCA交易
		KUrl: 'http://13.213.130.71:20303/news', // K线图接口
		HeadHttp: 'http://13.213.130.71:20003',
	},
	//测试环境地址
	test: {
		ApiUrl: 'http://13.213.130.71:20003', //user
		GpTaskUrl: 'http://13.213.130.71:21013',  //高频交易
		ClTaskUrl: 'http://13.213.130.71:21213',  //策略套利
	},
	// 线上环境地址
	prod: {
		ApiUrl: 'http://13.213.130.71:20003', //user
		GpTaskUrl: 'http://13.213.130.71:21013',  //高频交易
		ClTaskUrl: 'http://13.213.130.71:21213',  //策略套利
	}
}[evn];
export default ApiConfig;