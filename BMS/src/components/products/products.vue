<template lang="html">
  <div class="products_box">
    <table class="products">
        <thead class="pro">
            <th>
                <input type="checkbox" @click="allChecked" checked v-if="arrDel.length == tableData.length" key="'a'"/>
                <input type="checkbox" @click="allChecked"  v-else key="'b'"/>
            </th>
            <th v-for="(val,key) in tableTh[0]" v-if="cols.indexOf(key) > -1">{{dict[lanType][key] || key}}</th>
            <th class="doSoming">
                <router-link to="/users">添加商品</router-link>
                <a href="javascript:void(0);" @click="delMore" >批量删除</a>
            </th>
        </thead>
        <tbody>
            <tr v-for="(obj,idx) in tableData" :key="'c'+idx" :id="obj._id" class="upShow_box" style="position:relative" >
                <td style="line-height:100px" >
                    <input type="checkbox" @click="checkedBtn(obj._id,idx)" v-if="arrDel.indexOf(obj._id)>-1 " checked key="'e'+idx" />
                    <input type="checkbox" @click="checkedBtn(obj._id,idx)" v-else  key="'f'+idx" />
                </td>
                <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1" :id="dataId" :key="'d'+key">{{val}}</td>
                <td>
                    <input type="button" value="修改" @click="updata(obj)"/>
                    <input type="button" value="删除" @click="remove(obj.category_id,obj._id,idx)"/>
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
        <span v-for="idx in pageNum" @click="page(idx-1)">{{idx}}</span>
    </div>
    <div class="search">
        <input type="text" placeholder="请输入想要搜索的内容"/>
    </div>
    <spinner v-if="show"></spinner>
  </div>
</template>

<script>
import './products.css'
// import http from 'axios'
import spinner from '../spinner/spinner.vue'
import $ from 'jquery'
import http from '../../utils/httpClient.js'

export default {
    data() {
        return {
            tableTh:[],
            tableData: [],
            show: false,
            cols: ['proname','size','price','oprice','store','proof','factory','server'],
            lanType: 'cn',
            dict: {},
            pageNum: '',
            pageIdx: '',
            showAdd: true,
            upObj: {
                proname: '',
                size: '',
                price: '',
                oprice: '',
                store: '',
                proof: '',
                factory: '',
                server: ''
            },
            addNum: 0,
            dataId: '',
            arrDel: [],
        }
    },
    components: {
        spinner
    },
    methods: {
        allChecked(){
            if(this.arrDel.length == this.tableData.length){
                this.arrDel = []
                // console.log(this.arrDel)
            }else{
                this.arrDel=[];
                for(var i=0;i<this.tableData.length;i++){
                    this.arrDel.push(this.tableData[i]._id)
                    // console.log(this.tableData[i]._id)
                }
                    // console.log(this.arrDel)
            }
        },
        checkedBtn(id,idx){
            var i = this.arrDel.indexOf(id);console.log(i)
            if(i < 0){
                // console.log(66) 
                this.arrDel.push(id)
            }else{
                // console.log(77)
                this.arrDel.splice(i, 1)
            }    
            // console.log(this.arrDel)
        },
        delMore(){
            // http({
            //     method: 'post',
            //     url: 'http://10.3.136.179:1010/delProduct',
            //     headers:{
            //         'Content-Type': "application/x-www-form-urlencoded"
            //     },
            //     transformRequest:[function (data) {
            //         let ret = ''
            //         for (let it in data) {
            //           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //         }
            //         return ret
            //     }], 
            //     data: {
            //         ids:JSON.stringify(this.arrDel)
            //     }
            // }).then((res) => {
            //     console.log(res)
            // })
            http.post('delProduct',{ids:JSON.stringify(this.arrDel)}).then((res) => {
                http.get('admingetpro').then((res) => {
                    res = res.data.data.slice(60)
                    this.tableTh = res;
                    this.tableData = res.slice(0,10);
                    this.pageNum = Math.ceil(res.length/10);
                    this.show = false;
                })
                window.alert('批量删除成功!')
            });
        },
        remove(c_id,_idx,idx){
            this.tableData.splice(idx,1);  
            // console.log(c_id,_idx,idx);
            // http({
            //     method: 'post',
            //     url: 'http://10.3.136.179:1010/delProduct',
            //     headers:{
            //         'Content-Type': "application/x-www-form-urlencoded"
            //     },
            //     transformRequest:[function (data) {
            //         let ret = ''
            //         for (let it in data) {
            //           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //         }
            //         return ret
            //     }], 
            //     data: {
            //         id:_idx
            //     }
            // }).then((res) => {
            //     console.log(res)
            // })
            http.post('delProduct',{id:_idx}).then((res) => {
                console.log(res)
                http.get('admingetpro').then((res) => {
                    res = res.data.data.slice(60)
                    this.tableTh = res;
                    this.tableData = res.slice(0,10);
                    this.pageNum = Math.ceil(res.length/10);
                    this.show = false;
                })
            });
        },
        // add(){
        //     for(var idx in this.addObj){
        //         if(this.addObj[idx] == ''){
        //             window.alert('请将添加的商品信息填写完整');
        //             return false;
        //         }else{
        //             // console.log(JSON.stringify(this.addObj))
        //             // http.post('http://10.3.136.179:1010/addProduct',{data:JSON.stringify(this.addObj)}).then((res) => {
        //             //     console.log(666)
        //             // })
        //             console.log(666)
        //             return false;
        //         }
        //     }
        // },
        // addN(){
        //     this.addNum++;
        //     var addO = {
        //         proname: '',
        //         size: '',
        //         price: '',
        //         oprice: '',
        //         store: '',
        //         proof: '',
        //         factory: '',
        //         server: ''
        //     }
        //     this.addObj.push(addO)
        //     // console.log(this.addObj)
        // },
        // addR(){
        //     this.addNum = 0;
        //     // console.log(this.addObj[0])
        // },
        updata(obj){
            this.$router.push({name:'updata',query: {obj}})
        },
        page(idx){
            // this.pageIdx = idx;
            http.get('admingetpro').then((res) => {
                res = res.data.data.slice(60)
                this.tableData = res.slice(idx*10,idx*10+10);
                // console.log(this.tableData);
                this.show = false;
            })
            console.log($('.page span')[3])
        }
    },
    mounted(){
        // console.log(this)
        this.show = true;
        http.get('http://localhost:8080/src/common/dictionary.txt').then((res) => {
                this.dict = res.data
            });
        http.get('admingetpro').then((res) => {
                res = res.data.data.slice(60)
                this.tableTh = res;
                this.tableData = res.slice(0,10);
                this.pageNum = Math.ceil(res.length/10);
                this.show = false;
            })
    }
}
</script>