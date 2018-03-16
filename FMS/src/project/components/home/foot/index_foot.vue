<template>
    <div id="footer">
        <ul>
            <li><router-link to='/' class="on"><i class="iconfont icon-tubiao-"></i><span>首页</span></router-link></li>
            <li><router-link to='/sort' class="on"><i class="iconfont icon-yaopin"></i><span>找药</span></router-link></li>
            <li><router-link to='/carts' class="on"><i class="iconfont icon-gouwuche"></i><span>需求清单</span></router-link></li>
            <li><router-link to='/mine' class="on"><i class="iconfont icon-weibiaoti-_huabanfuben"></i><span>我的</span></router-link></li>

        </ul>
    </div>
</template>
<style type="text/css">
    .active{
        background:red;
    }
</style>
<script>
    import '../../../font_493gddw3ht0ozuxr/iconfont.css';
    import './index_foot.css'
    export default {
  //       data () {
  //   return {
  //    list: ['苹果', '香蕉', '菠萝', '芒果'],
  //     ind: ''
  //   }
  // },
  // methods: {
  //   changeBgc: function (index) {
  //     this.ind = index
  //   }
  // }



    }
</script>
