<template>
<div class="users">
    <span class="header" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" >{{key}}</span>
    <div class="import">
        <div v-for="(val,idx) in addNum" class="import2">
            <!-- <input type="text" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" class="val"/> -->
            <input type="text" v-model="usersData[0].proname"/>
            <input type="text" v-model="usersData[0].size"/>
            <input type="number" v-model="usersData[0].price"/>
            <input type="number" v-model="usersData[0].oprice"/>
            <input type="text" v-model="usersData[0].imgurl"/>
            <input type="text" v-model="usersData[0].store"/>
            <input type="text" v-model="usersData[0].proof"/>
            <input type="text" v-model="usersData[0].factory"/>
            <input type="text" v-model="usersData[0].server"/>
            <input type="text" v-model="usersData[0].category"/>
            <input type="text" v-model="usersData[0].category_id"/>
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
                imgurl: '',
                store: '',
                proof: '',
                factory: '',
                server: '',
                category: '',
                category_id: ''
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
            console.log(JSON.stringify(this.usersData[0]))
            http({
                method: 'post',
                url: 'http://10.3.136.179:1010/addProduct',
                headers:{
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                transformRequest:[function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }], 
                data: {
                    data:JSON.stringify(this.usersData[0])
                }
            }).then((res) => {
                console.log(res)
            })
            // var $arrInput = $('.import2').find('input')
            // var $obj = {
            //     proname: '',
            //     size: '',
            //     price: '',
            //     oprice: '',
            //     imgurl: '',
            //     store: '',
            //     proof: '',
            //     factory: '',
            //     server: '',
            //     category: '',
            //     category_id: ''
            // }
            // for(var i =0;i<$arrInput.length;i++){
            //     // this.arrAdd.push();
            //     // for(var key in $obj){
            //     //     $obj[key] = $arrInput[i].value
            //     // }
            //     // console.log($arrInput[i].value)
            // }
            // // console.log(this.arrAdd)
            // for(var key in $obj){
            //     $obj[key] = 11
            // }
            // console.log($obj)
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