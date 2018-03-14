<template>
	<div class="lcpop">
		<div class="cover">
		</div>
		<div class="lcmsg">
			<h1>{{msgFather}}</h1>	
			<span class="lcx" @click="quit">&times;</span>
			<button class="lcbtn" @click="quit">确定</button>
		</div>

	</div>
</template>
<script>
	import './pop.scss'
	export default {
		props:['msgFather'],
		data(){
			return {
				// txt
			}
		},
		methods:{
			quit(){
				this.$store.state.common.showpop=false
			}
		}


	}
</script>