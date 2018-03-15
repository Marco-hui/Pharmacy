<template>
<div class="users">
    <router-link to="/products" class="back" >返回</router-link>
    <span class="header" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" >{{key}}</span>
    <div class="import">
        <div v-for="(val,idx) in addNum" class="import2">
            <!-- <input type="text" v-for="(val,key) in header"  v-if="cols.indexOf(key) > -1" class="val"/> -->
            <form id= "uploadForm">
                <input type="text" v-model="usersData[0].proname"/>
                <input type="text" v-model="usersData[0].size"/>
                <input type="number" v-model="usersData[0].price"/>
                <input type="number" v-model="usersData[0].oprice"/>
                <input type="file" name="goodsimg" />
                <input type="text" v-model="usersData[0].store"/>
                <input type="text" v-model="usersData[0].proof"/>
                <input type="text" v-model="usersData[0].factory"/>
                <input type="text" v-model="usersData[0].server"/>
                <input type="text" v-model="usersData[0].category"/>
                <input type="text" v-model="usersData[0].category_id"/>          
            </form>
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
// import http from 'axios'
import spinner from '../spinner/spinner.vue'
import $ from 'jquery'
import http from '../../utils/httpClient.js'

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
            // console.log(JSON.stringify(this.usersData[0]))
            var formData = new FormData($("#uploadForm" )[0]); 
                var upObj = this.usersData[0]
                $.ajax({  
                     url: 'http://10.3.136.179:1010/uploadgoodsimg' ,  
                     type: 'POST',  
                     data: formData,  
                     async: false,  
                     cache: false,  
                     contentType: false,  
                     processData: false, 
                     success: function (res) {  
                         upObj.imgurl = res.data
                         // console.log(upObj)
                     }
                }); 
                // console.log(this.usersData)
            http.post('addProduct',{data:JSON.stringify(this.usersData[0])}).then((res) => {
                window.alert('添加商品成功!')
                this.$router.push({name:'products'})
            })
        },
        remove(){
            this.addNum = 1;
        }
    },
    mounted(){
        this.show = true;
        http.get('admingetpro').then((res) => {
                res = res.data.data.slice(60)
                // console.log(res[0])
                this.header = res[0];
                // console.log(this.header)
                this.show = false;
            })
    }
};
</script>