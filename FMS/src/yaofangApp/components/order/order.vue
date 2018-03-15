<template>
	<div class="lccontian lcbg">
		<header class="lcheader">
			<img src="../login/img/top_left.png" @click="history.go(-1)">
			<span>生成订单</span>	
		</header><!-- /header -->
		<div class="lclist">
			<ul class="lcgoods clearfix">
				<li>
					<img src="./img/e960b443a25a561b5a827a0ff8289c3f4c7470ec.jpg">
					<span>x <em>1</em></span>
				</li>
				<li>
					<img src="./img/e960b443a25a561b5a827a0ff8289c3f4c7470ec.jpg">
					<span>x <em>4</em></span>
				</li>
			</ul>	
			<div>
				<span>···共<i>2</i>种类</span>				
			</div>
		</div>
		<footer class="ordersettlement">
			<!-- <div class="sumarea">
				<p>合计：0.00元</p>
				<p>总额0.00元 已减0.00元</p>
			</div> -->
			<p><em>实付款：￥ 553.7</em></p>
			<span class="nextstep">
				<input type="button" value="立即付款">
			</span>
			
		</footer>
		
	</div>
</template>
<script>
	import './order.scss'
	export default {}

</script>