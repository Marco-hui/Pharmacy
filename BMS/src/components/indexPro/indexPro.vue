<template lang="html">
  <div class="products_box">
    <table class="indexProducts">
        <thead>
            <!-- <th> -->
                <!-- <input type="checkbox" /> -->
            <!-- </th> -->
            <th v-for="(val,key) in tableTh[0]" v-if="cols.indexOf(key) > -1" class="indexpro">{{dict[lanType][key] || key}}</th>
            <th>操作</th>
        </thead>
        <tbody>
            <tr v-for="(obj,idx) in tableData">
                <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1" :id="dataId" >{{val}}</td>
                <td>
                    <input type="button" value="修改" @click="updata(obj)"/>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="add" v-if="showAdd">
        <!-- <add :add='addNum'></add> -->
        <div v-for="(val,idx) in addNum" >
            <input type="text" v-for="(val,key) in addObj[0]" />
        </div>
    </div>
    <div class="page">
        <span v-for="(val,idx) in pageNum" @click="page(idx)">{{idx+1}}</span>
    </div>
    <div class="search">
        <input type="text" placeholder="请输入想要搜索的内容" class="val_sre" />
        <input type="button" value="搜索" @click="sreach" class="btn_sre" />
    </div>
    <spinner v-if="show"></spinner>
  </div>
</template>

<script>
// import '../products/products.css'
import './indexPro.css'
// import http from 'axios'
import spinner from '../spinner/spinner.vue'
import http from '../../utils/httpClient.js'
import $ from 'jquery'

export default {
    data() {
        return {
            tableTh:'',
            tableData: '',
            show: false,
            cols: ['proname','size','price','oprice','store','proof','factory','server'],
            lanType: 'cn',
            dict: {},
            pageNum: '',
            pageIdx: '',
            showAdd: true,
            addObj: [{
                proname: '',
                size: '',
                price: '',
                oprice: '',
                store: '',
                proof: '',
                factory: '',
                server: ''
            }],
            addNum: 0,
            dataId: ''
        }
    },
    components: {
        spinner
    },
    methods: {
        updata(obj){
            this.$router.push({name:'updataIndex',query: {obj}})
        },
        addN(){
            this.addNum++;
            var addO = {
                proname: '',
                size: '',
                price: '',
                oprice: '',
                store: '',
                proof: '',
                factory: '',
                server: ''
            }
            this.addObj.push(addO)
            // console.log(this.addObj)
        },
        addR(){
            this.addNum = 0;
            // console.log(this.addObj[0])
        },
        page(idx){
            this.pageIdx = idx;
            // http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
            //     res = res.data.data.slice(0,60)
            //     this.tableData = res.slice(idx*10,idx*10+10);
            //     this.show = false;
            // })
            http.get('admingetpro').then((res) => {
                res = res.data.data.slice(0,60)
                this.tableData = res.slice(idx*10,idx*10+10);
                this.show = false;
            });
        },
        sreach(){
            // console.log($('.search .val_sre')[0].value)
            if($('.search .val_sre')[0].value == '' ){
                window.alert('请输入内容再点击搜索!')
            }else{
                this.show = true;
                var search_val = $('.search .val_sre')[0].value;
                console.log(search_val)
                http.get('indexfuzzy',{field:search_val}).then((res) => {
                    // console.log(res.data.data.length)
                    if(res.data.data.length == 0 ){
                        window.alert('抱歉，查无此商品！')
                        this.show = false;
                    }else{
                        this.tableData = res.data.data.slice(0,10);
                        this.pageNum = Math.ceil(res.data.data.length/10);
                        this.show = false;                       
                    }
                })     
            }
        }
    },
    mounted(){
        this.show = true;
        http.get('http://localhost:8080/src/common/dictionary.txt').then((res) => {
<<<<<<< HEAD
                this.dict = res.data
            });
        // http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
        //         res = res.data.data.slice(0,60)
        //         this.tableTh = res;
        //         this.tableData = res.slice(0,10);
        //         this.pageNum = Math.floor(res.length/10);
        //         this.show = false;
        //         console.log(res)
        //     })
        http.get('admingetpro').then((res) => {
=======
            this.dict = res.data
        });
        http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
>>>>>>> adc8f23382efaf2a8cf0638dca0e62f71aaa16b2
            res = res.data.data.slice(0,60)
            this.tableTh = res;
            this.tableData = res.slice(0,10);
            this.pageNum = Math.floor(res.length/10);
            this.show = false;
<<<<<<< HEAD
        });
=======
        })
>>>>>>> adc8f23382efaf2a8cf0638dca0e62f71aaa16b2
    }
}
</script>