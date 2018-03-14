<template>
	<div class="lccontain">
		<header class='lcheader'>
			<a href="javascript:history.go(-1)">
				<img src="./img/top_left.png">	
			</a>
			<span>登录仁和药房网</span>
		</header>
		<section class="lcsection">
			<ul>
				<li>
					<img src="./img/user.png" class="iconuser">
					<input type="text" placeholder="请输入用户名" v-model="username" @focus="icondel=true" @blur="icondel=false" class="username" ref="focus">
					<img src="./img/close02.png" class="iconclose" v-if="icondel" @click="username='';$refs.focus.focus()">
				</li>
				<li>
					<img src="./img/Lock.png" class="iconlock">
					<input type="password" placeholder="请输入登录密码" v-model="password" @focus="showcode=true" ref="changetype">
					<img src="./img/so.png" class="iconso" v-if="showcode" @click="change" ref="changepic">
					<img src="./img/so2.png" class="iconso" v-if="!showcode&&showeye" @click="change">
				</li>
			</ul>
			<div class="login">
				<input type="button" value="登录" @click="login">
			</div>
			<p class="plus">
				<a>密码找回</a>
				<router-link to="/register">快速注册</router-link>
			</p>
			<p class="qq">
				<del class="del">----------------------------</del>
				<i>其他登录方式</i>
				<del class="del">----------------------------</del>
			</p>
			<p class="iconqq">
				<a>
					<img src="./img/fx_qq.jpg">	
				</a>
			</p>
			<em><span>QQ</span></em>

			
		</section>
		<footer class="lcfooter">
			
		</footer>
		<div class="lcpop1" v-if="$store.state.common.showpop">
			<lcpop :msgFather="txt">
				
			</lcpop>		
		</div>
	</div>
</template>
<script>
	import http from "../../utils/httpclient.js"
	import "./login.css"
	import router from "../../router/rounter.js"
	import lcpop from "../pop/pop.vue"

	export default {
		data(){
			return {
				username: '',
				password: '',
				icondel: false,
				showcode: false,
				showeye: false,
				txt: ""
			}
		},
		components:{
			lcpop
		},
		methods:{
			login(){
				
				http.get('login',{username: this.username, password: this.password}).then(res=>{
					if(res.data.status){
						router.push('/carts')
						// 把username写进vuex
						window.sessionStorage.setItem('username',this.username)
						// this.$store.state.common.username=
						// router.push({path:'carts',query:{username:this.username}})
					}else{
						this.$store.state.common.showpop=true
						this.txt='用户名与密码不匹配'
						// window.alert('用户名与密码不匹配')
					}
				})
			},
			change(){
				this.$refs.changetype.type=='password'? this.$refs.changetype.type='text' : this.$refs.changetype.type= 'password'
				this.showcode=!this.showcode
				this.showeye=!this.showeye
			}
		}
	}
</script>