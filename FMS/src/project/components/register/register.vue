<template>
	<div class="lccontain">
		<header class="lcheader">
			<a href="javascript:history.go(-1)">
				<img src="../login/img/top_left.png">
			</a>
			<span>注册</span>	
		</header>
		<section class="lcsection" id="lcsection-reg">
			<ul>
				<li>
					<img src="./img/code.png" class="iconcode">
					<input type="text" placeholder="请输入验证码" ref="num1" v-model="numCode" @change="change1" @focus="icondel1=true" @blur="icondel1=false">
					<img src="../login/img/close02.png" class="iconclose1" v-if="numCode.length>0&&icondel1==true" @click="numCode='';$refs.num1.focus()">
					<span class="vcode" @click="gaincode" ref="code">{{vCode}}</span>
				</li>
				<li>
					<img src="./img/shouji.png" class="iconshouji">
					<input type="text" placeholder="请输入手机号" ref="num2" v-model="phonenum" @change="change2" @focus="icondel2=true" @blur="icondel2=false;">
					<img src="../login/img/close02.png" class="iconclose2" v-if="phonenum.length>0&&icondel2==true" @click="phonenum='';$refs.num2.focus()">
					<span class="sjcode" @click="gainnum">获取验证码</span>
				</li>
				<li>
					<img src="./img/Mail1.png" class="iconmail">
					<input type="text" placeholder="请输入短信验证码" ref="num3" v-model="msgcode1" @change="change3" @focus="icondel3=true" @blur="icondel3=false;">
					<img src="../login/img/close02.png" class="iconclose" v-if="msgcode1.length>0&&icondel3==true" @click="msgcode1='';$refs.num3.focus()">
				</li>
				<li>
					<img src="./img/mima2.png" class="iconmima2">
					<input type="password" placeholder="输入密码" v-model="password1">
					<!-- <img src="../login/img/so2.png" class="iconso" @click="change" ref="changepic"> -->
				</li>
				<li>
					<img src="../login/img/Lock.png" class="iconlock">
					<input type="password" placeholder="确认密码" v-model="password2" @change="checkpsw">
					<!-- <img src="../login/img/so.png" class="iconso" @click="change"> -->
				</li>
			</ul>
			<div class="reg">
				<!-- <router-link to="/login">完成</router-link>	 -->
					<input type="button" value="完成" @click="finish">
				
			</div>
			<p class="checkbox">
				<span>
					<input type="checkbox" checked ref="gou">
					同意协议并注册 
					<em>仁和药房网用户注册协议</em>
				</span>
			</p>
			
		</section>
		<footer class="lcfooter">
	
		</footer>
		<div class="lcpop1" v-if="$store.state.common.showpop">
			<lcpop :msgFather="txt" :quitor="bol">
				
			</lcpop>		
		</div>

	</div>
</template>
<script>
	import './register.css'
	import router from '../../router/router.js'
	import http from '../../utils/httpclient.js'
	import lcpop from '../pop/pop.vue'
	import $ from '../../common/jquery-3.2.1.min.js'
	export default {
		data(){
			return {
				numCode: '',
				phonenum: '',
				vCode: '',
				msgcode: '',
				msgcode1: '',
				password1: '',
				password2: '',
				icondel1: false,
				icondel2: false,
				icondel3: false,
				txt:'',
				bol: false
			}
		},
		components:{
			lcpop
		},
		methods:{
			gainnum(){
				this.msgcode= this.$store.state.common.numCode()
				this.$store.state.common.showpop=true
				this.txt= '您的手机验证码为：' + this.msgcode
				setTimeout(function(){
					this.$refs.num3.focus()	
				}.bind(this),2500)
				// window.alert('您的手机验证码为：'+this.msgcode)	
			},
			gaincode(){
				this.vCode=this.$store.state.common.yanzhengma()
			},
			// change(){
			// 	console.log(event.target)
			// 	event.target.src=='http://localhost:8080/dist/so2.png?36f09538f323ae7c90b4b3c5e4e75174' ? event.target.src='http://localhost:8080/dist/so.png?fa60a9d5c0a559a36f7571e1d2f6aafb' : event.target.src='http://localhost:8080/dist/so2.png?36f09538f323ae7c90b4b3c5e4e75174'
			// 	// event.target.
			// 	this.$refs.changetype.type=='password'? this.$refs.changetype.type='text' : this.$refs.changetype.type= 'password'
			// 	// this.showcode=!this.showcode
			// 	// this.showeye=!this.showeye
			// },
			change1(){
				if(this.vCode.toLowerCase()==this.numCode.toLowerCase()){
					return true
				}else{
					return false
				}
			},
			change2(){
				var result=true;
				if(/^1[34578]\d{9}$/.test(this.phonenum)){
					http.get('login',{username:this.phonenum}).then(res=>{
						if(res.data.status){
							this.$store.state.common.showpop=true
							this.txt="该手机号已被注册"
							!result
						}else{
							result
						}
					})
					return result
				}else{
					this.$store.state.common.showpop=true
					this.txt="手机号码格式不正确"
					return false
				}
			},
			change3(){
				if(this.msgcode==this.msgcode1){
					return true
				}else{
					return false
				}

			},
			checkpsw(){
				if(this.password1==this.password2){
					return true
				}else{
					return false
				}
			},
			finish(){
				if( (this.change1())  && (this.change2()) && (this.change3()) && this.checkpsw() && (this.$refs.gou.checked) ){
					console.log('符合')
					http.post('register',{username: this.phonenum,password: this.password2}).then(res=>{
						if(res.status){
							router.push('/login')
						}
					})

				}else{
					this.$store.state.common.showpop=true
					this.txt="信息填写有误,请核对修改！！"
				}
			}

		},
		mounted(){
			this.vCode=this.$store.state.common.yanzhengma()
		}
	}
</script>