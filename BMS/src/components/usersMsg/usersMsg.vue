<template>
    <div>
        <table class="users_table">
            <thead class="pro">
                <th v-for="(val,key) in tableTh[0]" v-if="cols.indexOf(key) > -1">{{dict[lanType][key] || key}}</th>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in tableData" :key="'c'+idx" :id="obj._id" class="upShow_box" style="position:relative" >
                    <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1" :id="dataId" :key="'d'+key">{{val}}</td>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="page">
            <span v-for="idx in pageNum" @click="page(idx-1)">{{idx}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './usersMsg.css'
    import http from '../../utils/httpClient.js'

    export default{
        data(){
            return {
                tableTh:[],
                tableData: [],
                show: false,
                cols: ['coupon','credits','headurl','password','username','wallet'],
                lanType: 'cn',
                dict: {},
                pageNum: '',
            }
        },
        mounted(){
            http.get('http://localhost:8080/src/common/dictionaryIndex.txt').then((res) => {
                    this.dict = res.data
                    console.log(this.dict)
                });
            http.get('getusers').then((res) => {
                // console.log(res)
                res = res.data.data
                // console.log(res)
                this.tableTh = res;
                this.tableData = res.slice(0,10);
                this.pageNum = Math.ceil(res.length/10);
                this.show = false;
                // console.log(this.tableTh)
            })
        }
    }
</script>