<template>
<div class="users">
    <span class="header" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" >{{key}}</span>
    <div class="import">
        <div v-for="(val,idx) in addNum" class="import2">
            <input type="text" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" class="val"/>
        </div>
    </div>
    <div class="operations">
        <span><input type="button" value="添加" @click="add"/></span>
        <span><input type="button" value="取消" @click="remove"/></span>
        <span><input type="button" value="确定" @click="updata"/></span>
    </div>
    <spinner v-if="show"></spinner>
</div>
</template>

<script>
import './users.css'
import http from 'axios'
import spinner from '../spinner/spinner.vue'
import $ from 'jquery'

export default {
    data() {
        return {
           usersData: [
                {
                proname: '',
                size: '',
                price: '',
                oprice: '',
                store: '',
                proof: '',
                factory: '',
                server: ''
                }
           ],
           header: '',
           show: false,
           cols: ['proname','size','price','oprice','imgurl','store','proof','factory','server','category','category_id'],
           addNum: 1,
           arrAdd: [],
        }
    },
    components: {
        spinner
    },
    methods:{
        add(){
            this.addNum++;
            // console.log(this.cols.length)
        },
        updata(){
            // console.log(66)
            var $arrInput = $('.import2').find('input')
            var $obj = {
                proname: '',
                size: '',
                price: '',
                oprice: '',
                store: '',
                proof: '',
                factory: '',
                server: '',
                category: '',
                category_id: ''
            }
            for(var i =0;i<$arrInput.length;i++){
                // this.arrAdd.push();
                // for(var key in $obj){
                //     $obj[key] = $arrInput[i].value
                // }
                console.log($arrInput[i].value)
            }
            console.log(this.arrAdd)
        },
        remove(){
            this.addNum = 1;
        }
    },
    mounted(){
        this.show = true;
        http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
                res = res.data.data.slice(60)
                // console.log(res[0])
                this.header = res[0];
                // console.log(this.header)
                this.show = false;
            })
    }
};
</script>