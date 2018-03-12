<template>
<div>
  <table class="users">
        <thead>
            <th v-for="(val,key) in usersData[0]">{{key}}</th>
        </thead>
        <tbody>
            <tr v-for="(obj,idx) in usersData">
                <td v-for="(val,idx) in obj">{{val}}</td>
                <td><input type="button" value="添加" @click="add"/></td>
                <td><input type="button" value="修改" @click="updata"/></td>
                <td><input type="button" value="删除" @click="remove"/></td>
            </tr>
        </tbody>
    </table>
    <spinner v-if="show"></spinner>
</div>
</template>
<script>

import http from 'axios'
import spinner from '../spinner/spinner.vue'

export default {
    data() {
        return {
           usersData: [{
                注册时间: '2018-3-3',
                姓名: 'joe',
                性别: '男'
            }, {
                注册时间: '2018-3-3',
                姓名: 'joe',
                性别: '男'
            }, {
                注册时间: '2018-3-3',
                姓名: 'joe',
                性别: '男'
            }, {
                注册时间: '2018-3-3',
                姓名: 'joe',
                性别: '男'
            }],
            show: false
        };
    },
    components: {
        spinner
    },
    methods:{
        remove(){
            console.log(666)
        },
        add(){
            console.log(666)
        },
        updata(){
            console.log(666)
        }
    },
    mounted(){
        this.show = true;
        http.get('http://10.3.136.179:1010/admingetpro').then((res) => {
                this.tableData = res.data.data;
                this.show = false;
            })
    }
};
</script>