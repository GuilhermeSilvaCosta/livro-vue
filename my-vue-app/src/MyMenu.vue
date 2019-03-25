<template>
	<div @click="onMenuClick">
		<h4>{{ title }}</h4>
		<div>
			<slot></slot>
		</div>
	</div>  
</template>
<script>
export default {    
	props: ['title'],
	methods:{
		onMenuClick : function(e){			
			this.$emit('menu-click',"emit event from menu");
		}
	}
}
</script>

