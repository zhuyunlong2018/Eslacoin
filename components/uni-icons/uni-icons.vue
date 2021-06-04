<template>
	
 </template>

<script>
 
	export default {
		name: 'UniIcons',
		props: {
			 
		},
		 
		methods: {
			_onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	 
	.uni-icons {
		font-family: uniicons;
		text-decoration: none;
		text-align: center;
	}
</style>
