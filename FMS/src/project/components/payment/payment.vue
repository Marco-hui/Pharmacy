<template>
	<div class="lccontain">
		<header class="carheader">
			<a href="javascript:history.go(-1)">
				<img src="../login/img/top_left.png" class="iconarror">
			</a>
			<span>支付</span>
			<img src="../carts/img/home.png" class="iconhome" @click="show=!show">
		</header>
		<!-- home footervue部分 -->
		<div class="footertop" v-if="show">
			<hkfoot></hkfoot>
		</div>

		<div class="lcordinfo">
			<p>提交成功</p>
			<p>应付保证金 <em>￥{{$route.params.price}}</em> </p>
			<p>欢迎您再次选择我们假药网~~</p>
		</div>
		<div class="tixing">
			<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的顾客：为给您提供优质、方便的服务，我们将把相关需求信息推送到最佳选择门店。受门店委托，我们对以上需求信息药品代收等价值备货保证金。需求信息提交后，最佳选择门店将为您提供销售及药学服务。请准备好处方，以备查验，如无处方，我们有权终止服务。</span>
		</div>
	</div>
</template>
<script>
	import './payment.scss'
	import hkfoot from '../home/foot/index_foot.vue'
	export default {
		data(){
			return {
				show: false
			}
		},
		components:{
			hkfoot
		}
	}

</script>