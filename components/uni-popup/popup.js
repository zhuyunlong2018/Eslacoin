import message from './message.js';
// 定义 type 类型:弹出类型：top/bottom/center
const config = {
	// 顶部弹出
	top:'top',
	// 底部弹出
	bottom:'bottom',
	// 居中弹出
	center:'center',
	// 消息提示
	message:'top',
	// 对话框
	dialog:'center',
	// 分享
	share:'bottom',
	// 合约智能详情
	hyzn:'bottom',
	// DCA交易详情
	dca:'bottom',
	// 合约wangge详情
	hywg:'bottom',
	// 现货网格详情
	xhwg:'bottom',
	// 合约挂单分析
	picker:'bottom',
	// 合约挂单分析
	gdfx:'bottom',
	// 创建机器人界面打开账户信息
	coin:'bottom',
	// 时间趋势分析
	trend:'bottom',
	// 添加补仓
	replish:'bottom',
	// 停止机器人
	stop:'bottom',
	// 查询价格
	price:'center',
	// 小问号
	tip:'tip',
}

export default {
	data(){
		return {
			config:config
		}
	},
	mixins: [message]
}
