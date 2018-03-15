<template>
    <div>
        <router-view></router-view>
<<<<<<< HEAD
        <spinner v-show="false"></spinner>
=======
        <!-- <spinner></spinner> -->
>>>>>>> a22708a27bbf0dff5452ec6caf7353fcdb6754cb
    </div>
</template>

<script type="text/javascript">
    import spinner from "./components/spinner/spinner.vue"
    export default{
        components:{
            spinner
        }
    }
</script>