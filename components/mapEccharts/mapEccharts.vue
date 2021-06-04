<!-- echarts 图表组件 -->
<template>
	<view :style="{height: echartsHight + 'rpx', backgroundColor: backgroundColor, borderRadius: borderRadius + 'rpx'}">
		<qiunDataCharts 
			:type="echartsType" 
			:ontouch="true" 
			:canvas2d="true" 
			:canvasId="canvasId" 
			:animation="false"
			class="echarts"
			:style="{height: (echartsHight - 30) + 'rpx'}"
			v-if="echartsData.categories.length > 0"
			:chartData="echartsData" />
	</view>
	
</template>

<script>
	import qiunDataCharts from '../echarts/components/qiun-data-charts/qiun-data-charts.vue';
	export default {
		//*******************************************************************
		// 数据
		//*******************************************************************
		data() {
			return {
				data: [],
				chartData: {
					categories: [],
					series:[
						{
							"name":"上证指数",
							"data": []
						},
					],
				},
			
			};
		},
		components: {
			qiunDataCharts
		},
		props: {
			echartsData: {
				type: Object,
				default: () => {
					return {
						categories: [],
						series: [{
							data: []
						}]
					}
				}
			},
			echartsType: {
				type: String,
				default: 'candle'
			},
			echartsHight: {
				type: Number,
				default: 670
			},
			canvasId: {
				type: String,
				default: 'klineid'
			},
			backgroundColor: {
				type: String,
				default: 'transparent'
			},
			borderRadius: {
				type: [String, Number],
				default: 0
			},
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.echarts {
	padding-top: 10rpx;
}
</style>
