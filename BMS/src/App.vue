<template>
    <div>
        <router-view></router-view>
        <spinner></spinner>
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