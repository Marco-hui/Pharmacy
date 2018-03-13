<template>
	<div class="lccontain">
		<header class="carheader">
			<img src="../login/img/top_left.png" class="iconarror">
			<span>需求清单</span>
			<img src="./img/home.png" class="iconhome">
		</header>
		<section class="buycar">
			<div v-if="user==null" class="empty">
				<img src="./img/shopping80.png">
				<p>需求清单空空如也，快去逛逛吧</p>
				<p>或者
					<router-link to="/login">登录</router-link>查看你的需求清单
				</p>
				<span>
					<input type="button" value="去逛逛">
				</span>
			</div>
			
			<div class="have" v-if="user!=null">
				<div class="top">
					<input type="checkbox" class="allcheck">
					<span>
						<img src="./img/hospital.jpg">
						药房网
					</span>	
				</div>
				<ul class="main_car">
					<li v-for="(obj,idx) in dataset">
						<input type="checkbox">
						<!-- 传参数 -->
						<router-link to="/">
							<img src="./img/goods1.jpg">
						</router-link>
						<div class="list-detail">
							<!-- 传参数 -->
							<router-link to="/">
								{{dataset[idx].proname}}
							</router-link>
							<p>{{dataset[idx].size}}</p>
							<div class="det-under">
								<em>￥{{dataset[idx].price}}</em>
								<ul>
									<li class="jian" @click="jian(idx)" :data-id="dataset[idx].id">-</li>
									<li class="num">
										<input type="text" :value="dataset[idx].qty" :data-id="dataset[idx].id" ref="newqty">
									</li>
									<li class="jia" @click="jia(idx)" :data-id="dataset[idx].id">+</li>
								</ul>
							</div>
							<div class="editarea">
								<!-- <strong class="edit" @click="edit=!edit" v-if="edit" key="'a'+idx">完成</strong>
								<strong class="edit" @click="edit=!edit" v-if="!edit" key="'b'+idx">编辑</strong>
								<strong class="del" v-if="edit" key="'c'+idx">删除</strong> -->

								<!-- <strong class="edit" key="'a'+idx" ref="'yes'+idx" >完成</strong>
								<strong class="edit" key="'b'+idx" @click="edit(idx)" ref="'edit'+idx">编辑</strong> -->
								<strong class="del" key="'c'+idx" ref="'no'+idx" @click="del(idx)">删除</strong>
							</div>					
						</div>		
					</li>	

				</ul>

			</div>
		</section>
		<footer class="settlement">
			<div>
				<input type="checkbox">
				<span>全选</span>
			</div>
			<div class="sumarea">
				<p>合计：0.00元</p>
				<p>总额0.00元 已减0.00元</p>
			</div>
			<span class="nextstep">
				<input type="button" value="下一步">
			</span>
			
		</footer>
		
	</div>
</template>
<script>
	import './carts.scss'
	import http from '../../utils/httpclient.js'
	import $ from '../../common/jquery-3.2.1.min.js'
	$(function(){
		console.log(44)
	})
	export default {
		data(){
			return {
				// have: false,
				user: '',
				dataset:[]
			}
		},
		methods:{
			// edit(_idx){
			// 	console.log(_idx)
			// 	// this.$refs.yes+_idx.show()
			// }
			del(_idx){
				console.log(_idx)

			},
			jian(_idx){
				console.log(_idx)
				// this.$refs.newqty.value--;
				this.dataset[_idx].qty--
				if(this.dataset[_idx].qty<=1){this.dataset[_idx].qty=1}
				http.post('changeqty',{"_id": this.dataset[_idx]._id,qty: this.dataset[_idx].qty*1}).then(res=>{
					console.log(res);
				})
				console.log(this.dataset[_idx].id)
				console.log(this.dataset[_idx].qty)

			},
			jia(_idx){
				console.log(_idx)
				this.dataset[_idx].qty++
				http.post('changeqty',{"_id": this.dataset[_idx]._id,qty: this.dataset[_idx].qty*1}).then(res=>{
					console.log(res);
				})
			}
			
		},
		mounted(){
			this.user=window.sessionStorage.getItem('username')
			http.get('getcar',{username: this.user}).then(res=>{
				console.log(res)
				this.dataset=res.data
				console.log(this.dataset[0].proname)
			})
			
		}
	}
</script>