//测试阶段临时定义数据

module.exports = {
	//现货给的默认参数  保守 稳健 激进
	TaskDefaultData: [
		[{
				BuyCoinFirst: 30,
				SellRatio: 3,
				SellRatioFd: 1,
				LossRatio: 10,
				TriggerNum: 100,
				TriggerCondition: 1,
				TriggerPriceMin: 0,
				TriggerPriceMax: 999999,
				Replish: [{
						Sort: 1,
						Decline: 1,
						BuyCoin: 20
					},
					{
						Sort: 2,
						Decline: 1,
						BuyCoin: 30
					}
				]
			},
			{
				BuyCoinFirst: 50,
				SellRatio: 4,
				SellRatioFd: 1,
				LossRatio: 10,
				TriggerNum: 300,
				TriggerCondition: 1,
				TriggerPriceMin: 0,
				TriggerPriceMax: 999999,
				Replish: [{
						Sort: 1,
						Decline: 1,
						BuyCoin: 30
					},
					{
						Sort: 2,
						Decline: 1,
						BuyCoin: 40
					}
				]
			}, {
				BuyCoinFirst: 100,
				SellRatio: 5,
				SellRatioFd: 1,
				LossRatio: 10,
				TriggerNum: -1,
				TriggerCondition: 1,
				TriggerPriceMin: 0,
				TriggerPriceMax: 999999,
				Replish: [{
						Sort: 1,
						Decline: 1,
						BuyCoin: 50
					},
					{
						Sort: 2,
						Decline: 1,
						BuyCoin: 60
					}
				]
			}
		],
		[{
				BuyCoinOnce: 30,
				SellRatio: 3,
				LossRatio: 3,
				GridsNum: 20,
				TriggerNum: 100,
				TriggerPriceMinRatio: 0.1,
				TriggerPriceMaxRatio: 0.1,
			},
			{
				BuyCoinOnce: 50,
				SellRatio: 4,
				LossRatio: 4,
				GridsNum: 20,
				TriggerNum: 300,
				TriggerPriceMinRatio: 0.1,
				TriggerPriceMaxRatio: 0.1,
			}, {
				BuyCoinOnce: 100,
				SellRatio: 5,
				LossRatio: 5,
				GridsNum: 20,
				TriggerNum: -1,
				TriggerPriceMinRatio: 0.1,
				TriggerPriceMaxRatio: 0.1,
			}
		],
		[{
			BuyRatio: '',
			SellRatio: '',
			SellRatioFd: '',
			LossRatio: '',
			TriggerNum: 100,
			FirstBuyTrend: ['5min'], //首次建仓参考趋势 1min 5min 15min 30min 60min 4hour 1day 1week  组装数据["1min","5min"]
			FirstBuyDirection: 1, //首次建仓模式 1顺势建仓 2反向建仓
			WinCoolTime: 60, //止盈后冷却时间 单位:秒
			WinBuyTrend: ['5min'], //止盈后建仓参考趋势
			WinBuyRefer: 2, //止盈后建仓参考 1上次方向 2时间趋势
			WinBuyDirection: 1, //止盈后建仓模式 1顺势建仓 2反向建仓
			LossCoolTime: 5, //止损后冷却时间 单位:秒
			LossBuyRefer:1, //止损后建仓参考 1上次方向 2时间趋势
			LossBuyTrend: [], //止损后建仓参考趋势
			LossBuyDirection: 2, //止损后建仓模式 1顺势建仓 2反向建仓
			StopMinCoin: '', //资产低于多少后停止任务
			StopMaxCoin: '', //资产高于多少后停止任务
			Replish: []
		}],
		[{
			BuyDirection: 'buy',
			SellRatio: '',
			LossRatio: '',
			TriggerPriceMin: '',
			TriggerPriceMax: '',
			TriggerNum: 100,
			GridsNum: '',
		}],
		[{
			BuyDirection: 'buy',
			BuyCountFirst: '',
			SellRatio: '',
			SellRatioFd: '',
			LossRatio: '',
			TriggerPriceMin: 0,
			TriggerPriceMax: 999999,
			TriggerCondition: 1,
			TriggerNum: 100,
			Replish: [],
		}]
	],

	//四种机器人类型需要的参数
	TaskParam: [
		[{
				name: 'BuyCoinFirst',
				type: 'float'
			},
			{
				name: 'SellRatio',
				type: 'float'
			},
			{
				name: 'SellRatioFd',
				type: 'float'
			},
			{
				name: 'LossRatio',
				type: 'float'
			},
			{
				name: 'TriggerPriceMin',
				type: 'float'
			},
			{
				name: 'TriggerPriceMax',
				type: 'float'
			},
			{
				name: 'TriggerNum',
				type: 'int'
			},
			{
				name: 'TriggerCondition',
				type: 'int'
			},
			{
				name: 'Replish',
				type: 'json'
			}
		],
		[{
				name: 'BuyCoinOnce',
				type: 'float'
			},
			{
				name: 'SellRatio',
				type: 'float'
			},
			{
				name: 'LossRatio',
				type: 'float'
			},
			{
				name: 'TriggerPriceMin',
				type: 'float'
			},
			{
				name: 'TriggerPriceMax',
				type: 'float'
			},
			{
				name: 'GridsNum',
				type: 'int'
			},
			{
				name: 'TriggerNum',
				type: 'int'
			},
			{
				name: 'MaxActiveCount',
				type: 'int'
			}
		],
		[{
				name: 'BuyRatio',
				type: 'float'
			}, {
				name: 'SellRatio',
				type: 'float'
			}, {
				name: 'SellRatioFd',
				type: 'float'
			}, {
				name: 'LossRatio',
				type: 'float'
			}, {
				name: 'TriggerNum',
				type: 'int'
			},
			{
				name: 'Lever',
				type: 'int'
			},
			{
				name: 'FirstBuyTrend',
				type: 'json'
			},
			{
				name: 'FirstBuyDirection',
				type: 'int'
			},
			{
				name: 'WinCoolTime',
				type: 'int'
			},
			{
				name: 'WinBuyTrend',
				type: 'json'
			},
			{
				name: 'WinBuyRefer',
				type: 'int'
			},
			{
				name: 'WinBuyDirection',
				type: 'int'
			},
			{
				name: 'LossCoolTime',
				type: 'int'
			},
			{
				name: 'LossBuyRefer',
				type: 'int'
			},
			{
				name: 'LossBuyTrend',
				type: 'json'
			},
			{
				name: 'LossBuyDirection',
				type: 'int'
			},
			{
				name: 'Replish',
				type: 'json'
			},
			{
				name: 'StopMinCoin',
				type: 'float'
			},
			{
				name: 'StopMaxCoin',
				type: 'float'
			},
		],
		[{
				name: 'BuyCount',
				type: 'float'
			},
			{
				name: 'SellRatio',
				type: 'float'
			},
			{
				name: 'LossRatio',
				type: 'float'
			},
			{
				name: 'GridsNum',
				type: 'int'
			},
			{
				name: 'BuyDirection',
				type: 'string'
			},
			{
				name: 'Lever',
				type: 'int'
			},
			{
				name: 'TriggerPriceMin',
				type: 'float'
			},
			{
				name: 'TriggerPriceMax',
				type: 'float'
			},
			{
				name: 'TriggerNum',
				type: 'int'
			},
			{
				name: 'MaxActiveCount',
				type: 'int'
			}
		],
		[{
				name: 'BuyCountFirst',
				type: 'float'
			},
			{
				name: 'BuyDirection',
				type: 'string'
			},
			{
				name: 'SellRatio',
				type: 'float'
			},
			{
				name: 'SellRatioFd',
				type: 'float'
			},
			{
				name: 'LossRatio',
				type: 'float'
			},
			{
				name: 'TriggerPriceMin',
				type: 'float'
			},
			{
				name: 'TriggerPriceMax',
				type: 'float'
			},
			{
				name: 'TriggerCondition',
				type: 'int'
			},
			{
				name: 'TriggerNum',
				type: 'int'
			},
			{
				name: 'Lever',
				type: 'int'
			},
			{
				name: 'Replish',
				type: 'json'
			}
		],
	],
	TaskTypeUrl: ['DataUrl', 'XhDcaUrl', 'XhWgUrl', 'HyZnUrl', 'HyWgUrl', 'HyDcaUrl'],
	CoinLogArr: ['aave', 'ada', 'algo', 'atom', 'avax', 'bat', 'bch', 'bsv', 'btc', 'btcb', 'eth', 'btg', 'btt',
		'busd', 'cake', 'chz', 'comp', 'cro', 'dai', 'dash', 'dcr', 'doge', 'dot', 'enj', 'eos', 'etc', 'fil',
		'ftt', 'hbar', 'hot', 'ht', 'klay', 'ksm', 'leo', 'ltc', 'link', 'luna', 'mana', 'matic', 'miota',
		'mkr', 'neo', 'nexo', 'ont', 'qtum', 'rune', 'slo', 'snx', 'stx', 'sushi', 'tel', 'tfuel', 'theta',
		'trx', 'uni', 'usdc', 'usdt', 'ust', 'vet', 'waves', 'wbtc', 'xem', 'xlm', 'xmr', 'xrp', 'xtz', 'zec',
		'zil'
	]
}
