<template lang="html">
  <div>
    <table class="products">
        <thead>
            <th v-for="(val,key) in tableData[0]" v-if="cols.indexOf(key) > -1">{{dict[lanType][key] || key}}</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="(obj,idx) in tableData">
                <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1">{{val}}</td>
                <td>
                    <input type="button" value="添加" @click="add"/>
                    <input type="button" value="修改" @click="updata(obj._id)"/>
                    <input type="button" value="删除" @click="remove(obj._id,idx)"/>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="page">
        <span v-for="(val,idx) in pageNum" @click="page(idx)">{{idx+1}}</span>
    </div>
    <spinner v-if="show"></spinner>
  </div>
</template>

<script>
import './products.css'
import http from 'axios'
import spinner from '../spinner/spinner.vue'

export default {
    data() {
        return {
            tableData: '',
            show: false,
            cols: ['proname','size','price','oprice','store','proof','factory','server'],
            lanType: 'cn',
            dict: {},
            pageNum: '',
            pageIdx: ''
        }
    },
    components: {
        spinner
    },
    methods: {
        remove(_idx,idx){
            this.tableData.splice(idx,1)
        },
        add(){
            console.log(666)
        },
        updata(){
            console.log(666)
        },
        page(idx){
            this.pageIdx = idx;
        }
    },
    mounted(){
        this.show = true;
        http.get('http://localhost:8080/src/common/dictionary.txt').then((res) => {
                this.dict = res.data
            })
        http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
                this.tableData = res.data.data;
                this.pageNum = Math.floor(this.tableData.length/6);
                this.show = false;
            })
    }
}
</script>