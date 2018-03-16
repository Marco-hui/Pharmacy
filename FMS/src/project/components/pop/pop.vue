<template>
	<div class="lcpop">
		<div class="cover">
		</div>
		<div class="lcmsg">
			<h1>{{msgFather}}</h1>	
			<span class="lcx" @click="quxiao">&times;</span>
			<button class="lcbtn" @click="sure" v-if="quitor==false">确定</button>
			<button class="lcbtn" @click="quit" v-if="quitor==true">确定退出</button>
			<button class="lcbtn" @click="shanchu" v-if="del==true">确定</button>
		</div>

	</div>
</template>
<script>
	import './pop.scss'
	export default {
		props:['msgFather','quitor','del','delnum'],
		data(){
			return {
				// delnum: 
			}
		},
		methods:{
			quxiao(){
				this.$store.state.common.showpop = false
				this.$store.state.common.quxiao = true
			},
			sure(){
				this.$store.state.common.showpop = false	
				this.$store.state.common.queding = true	
			},
			quit(){
				window.location.reload()
				this.$store.state.common.showpop=false
				if(window.sessionStorage.getItem('infotoken') != null && window.sessionStorage.getItem('username') != null){
					window.sessionStorage.removeItem('infotoken')
					window.sessionStorage.removeItem('username')

				}
			},
			shanchu(){
				// window.location.reload()
				this.$store.state.common.showpop=false
				this.$store.state.common.queding = true
				this.$emit('showset',this.delnum)
			}
		}


	}
</script>