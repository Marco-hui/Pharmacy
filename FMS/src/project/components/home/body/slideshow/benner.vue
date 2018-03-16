<template>
  <div id="benner">
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in items" :key="item.id">
        <a :href="item.href">
          <img :src="item.url" class="img"/>
          <!-- <span class="desc">{{item.title}}</span> -->
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  // import 'mint-ui/lib/style.css'
  import {Swipe, SwipeItem} from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import './benner.css'

  export default {
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    },
    data () {
      return {
        items: [{
          href: '#',
          url: './src/project/img/benner1.jpg'
        }, {
          href: '#',
          url: './src/project/img/benner2.jpg'
        }]
      }
    }
  }
</script>

/*<style scoped>
  img {
    width: 100%;
  }
  .mint-swipe {
    height: 4.0rem;
  }
  .desc {
    font-weight: 600;
    opacity: .9;
    padding: 5px;
    height: 20px;
    line-height: 20px;
    width: 100%;
    color: #fff;
    background-color: gray;
    position: absolute;
    bottom: 0;
  }
  .mint-swipe-indicator{
    width:28px;
    height:28px;
  }
</style>*/