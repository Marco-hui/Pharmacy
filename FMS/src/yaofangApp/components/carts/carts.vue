<template>
	<div class="lccontain">
		<header class="carheader">
			<a href="javascript:history.go(-1)">
				<img src="../login/img/top_left.png" class="iconarror">
			</a>	
			<span>需求清单</span>
			<img src="./img/home.png" class="iconhome" @click="show=!show">
		</header>
		<div class="footertop" v-if="show">
			<lcfootertop></lcfootertop>
		</div>
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
			<div v-if="user!=null && this.dataset.length==0" class="empty">
				<img src="./img/shopping80.png">
				<p>需求清单空空如也，快去逛逛吧</p>
				<!-- <p>或者
					<router-link to="/login">登录</router-link>查看你的需求清单
				</p> -->
				<span>
					<input type="button" value="去逛逛">
				</span>
			</div>
			
			<div class="have" v-if="user!=null && this.dataset.length>0">
				<!-- <div class="top">
					<input type="checkbox" class="allcheck" >
					<span>
						<img src="./img/hospital.jpg">
						药房网
					</span>	
				</div> -->
				<ul class="main_car">
					<li v-for="(obj,idx) in dataset" >

						<input type="checkbox" @click="selectTr(dataset[idx]._id,idx)" v-if="trs.indexOf(dataset[idx]._id) > -1" checked key="'a'+idx">
                        <!-- <input type="checkbox" v-else key="'b'+idx"> -->
						<input type="checkbox" @click="selectTr(dataset[idx]._id,idx)" v-else key="'b'+idx">
						<!-- 传参数 -->
						<router-link to="/">
							<img :src="'../../../../' + dataset[idx].imgurl ">
						</router-link>
						<div class="list-detail">
							<!-- 传参数去到详情页 -->
							<router-link to="/">
								{{dataset[idx].proname}}
							</router-link>
							<p>{{dataset[idx].size}}</p>
							<div class="det-under">
								<em>￥{{dataset[idx].price}}</em>
								<ul>
									<li class="jian" @click="jian(idx)">-</li>
									<li class="num">
										<input type="text" :value="dataset[idx].qty" @change="newQty(idx)" ref='newqty'>
									</li>
									<li class="jia" @click="jia(idx)">+</li>
								</ul>
							</div>
							<div class="editarea">
								<!-- <strong class="edit" @click="edit=!edit" v-if="edit" key="'a'+idx">完成</strong>
								<strong class="edit" @click="edit=!edit" v-if="!edit" key="'b'+idx">编辑</strong>
								<strong class="del" v-if="edit" key="'c'+idx">删除</strong> -->

								<!-- <strong class="edit" key="'a'+idx" ref="'yes'+idx" >完成</strong>
								<strong class="edit" key="'b'+idx" @click="edit(idx)" ref="'edit'+idx">编辑</strong> -->
								<strong class="del" key="'c'+idx" ref="'no'+idx" @click="del(dataset[idx]._id)">删除</strong>
							</div>					
						</div>		
					</li>	

				</ul>

			</div>
		</section>
		<footer class="settlement">
			<div>
				<!-- <input type="checkbox" @click="selectAll"> -->
				<input type="checkbox" @click="selectAll" v-if="trs.length==dataset.length" checked key="'all1'">
				<input type="checkbox" @click="selectAll" v-else key="'all2'" ref="gou">
				
				<span>全选</span>
			</div>
			<div class="sumarea">
				<p>合计：
				{{total}}元</p>
				<!-- <p>总额0.00元 已减</p> -->
			</div>
			<span class="nextstep">
				<input type="button" :value="'下一步('+trs.length+')'" @click="generateorder(trs)">
			</span>
			
		</footer>
		
	</div>
</template>
<script>
	import './carts.scss'
	import http from '../../utils/httpclient.js'
	import $ from '../../common/jquery-3.2.1.min.js'
	import router from '../../router/rounter.js'
	import lcfootertop from '../home/footer.vue'
	export default {
		components:{
			lcfootertop
		},
		data(){
			return {
				// have: false,
				user: '',
				dataset:[],
				trs: [],
				total: '0.00',
				trsidx: [],
				show: false
			}
		},
		methods:{
			del(_idx){
				console.log(_idx)
				var r=confirm("你确定要清空该条购物记录")
				if(r==true){
					http.post('removepro',{_id: _idx}).then(res=>{
						if(res.data.status==true){
							console.log(this.dataset.indexOf(_idx))
							this.dataset.splice(this.dataset.indexOf(_idx), 1);
						}
					})
					window.alert('已删除')
				}else{

				}	    
			},
			jian(_idx){
				// this.$refs.newqty.value--;
				this.dataset[_idx].qty--
				if(this.dataset[_idx].qty<=1){this.dataset[_idx].qty=1}
				http.post('changeqty',{"_id": this.dataset[_idx]._id,qty: this.dataset[_idx].qty*1}).then(res=>{
					if(res.data.status){
						this.sumPrice()
					}
				})
			},
			jia(_idx){
				this.dataset[_idx].qty++
				http.post('changeqty',{"_id": this.dataset[_idx]._id,qty: this.dataset[_idx].qty*1}).then(res=>{
					if(res.data.status){
						this.sumPrice()
					}
				})
			},
			newQty(_idx){
				this.dataset[_idx].qty=this.$refs.newqty[_idx].value
				http.post('changeqty',{'_id': this.dataset[_idx]._id, qty: this.dataset[_idx].qty*1}).then(res=>{
					if(res.data.status==true){
						this.sumPrice()	
					}
				})

			},
			selectTr(_idx,idxnum){
				if(this.trs.indexOf(_idx) > -1){
					this.trs.splice(this.trs.indexOf(_idx), 1);
					this.trsidx.splice(this.trsidx.indexOf(idxnum), 1)
				}else{
					this.trs.push(_idx);
					this.trsidx.push(idxnum);
				}
				this.sumPrice()
			},
			selectAll(){
				if(this.trs.length==this.dataset.length){
					this.trs=[];
					this.trsidx=[];
					this.sumPrice()
				}else{
					this.trs=[];
					this.trsidx=[]
					for(var i=0;i<this.dataset.length;i++){
						this.trs.push(this.dataset[i]._id);
						this.trsidx.push(i)
					}
					this.sumPrice()
				}
			},
			generateorder(_trs){
				if(_trs.length==0){
					window.alert('请选择商品')
				}else{
					var arrpros=[]
					for(var i=0;i<this.trsidx.length;i++){
						arrpros.push({
							"_id": this.dataset[i]._id,
							"imgurl": this.dataset[i].imgurl,
							"qty": this.dataset[i].qty
						})
					}
					var order={
						username: this.user,
						total: this.total,
						status: 0,
						pros: JSON.stringify(arrpros),	
					}
					http.post('createorder',order).then(res=>{
						router.push('/order')
						console.log(res)

						// if(res.data.data.nModified==1){
						// 	window.alert('新的订单')
						// 	router.push('/order')
						// }else{
						// 	router.push('/order')
						// 	window.alert('订单已存在')
						// }
					})			
				}

			},
			sumPrice(){
				this.total= 0
				for(var i=0;i<this.trs.length;i++){
					for(var j=0;j<this.dataset.length;j++){
						if(this.dataset[j]._id.indexOf(this.trs[i])>-1){
							this.total+=this.dataset[j].qty*this.dataset[j].price
						}
					}
				}
			// this.total=parseInt(this.total)
			this.total=this.total.toFixed(2)
			}
		},
		mounted(){
			this.user=window.sessionStorage.getItem('username')
			http.get('getcar',{username: this.user}).then(res=>{
				this.dataset=res.data
			})
			console.log(this.$refs.gou)

			
			
		}
	}
</script>