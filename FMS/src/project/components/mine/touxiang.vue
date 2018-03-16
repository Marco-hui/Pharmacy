<template>
	<div class="lccontain">
		<header class="lcheader">
			<a href="javascript:history.go(-1)">
				<img src="../login/img/top_left.png">	
			</a>
			<span>设置头像</span>
		</header>
		<main class="lcform">
			<form id= "uploadForm">  
			      <input type="text" name="username" v-model="username" style="display:none"/> 
			      <p>上传文件： <input type="file" name="head"/></p>  
			      <input type="button" value="上传" id="btn" @click="uploadfile"/>  
			</form>  
		</main>
	</div>
</template>
<script>
	import './touxiang.scss'
	import http from '../../utils/httpclient.js'
	import $ from 'jquery'
	import router from '../../router/router.js'
	export default {
		data(){
			return {
				username:''
			}
		},
		mounted(){
			this.username = window.sessionStorage.getItem('username')
		},
		methods:{
			uploadfile(){
	             var formData = new FormData($( "#uploadForm" )[0]);  
	             $.ajax({  
	                  url: 'http://10.3.136.179:1010/uploadfile' ,  
	                  type: 'POST',  
	                  data: formData,  
	                  async: false,  
	                  cache: false,  
	                  contentType: false,  
	                  processData: false, 
	                  success: function (res) {  
	                      if(res.status==true){
	                      	window.alert('上传成功')
	                      	router.push('/mine')
	                      }
	                  }
	             })
			}
		}
	}
</script>