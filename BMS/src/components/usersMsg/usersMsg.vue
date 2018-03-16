<template>
    <div>
        <table class="users_table">
            <thead class="pro">
                <th v-for="(val,key) in tableTh[0]" v-if="cols.indexOf(key) > -1">{{dict[lanType][key] || key}}</th>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in tableData" :key="'c'+idx" :id="obj._id" class="upShow_box" style="position:relative" >
                    <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1" :key="'d'+key">{{val}}</td>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="users_srch_box">
            <input type="text" placeholder="请输入搜索的内容" class="users_srch" />
            <input type="button" value="搜索" @click="users_srch" class="users_srch_btn"></button>
        </div>
       
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
        methods:{
            users_srch(val){
                this.show = true;
                // console.log($('.users_srch_box .users_srch')[0].value)
                http.get('usersFuzzy',{field:$('.users_srch_box .users_srch')[0].value}).then((res) => {
                    if(res.data.data.length == 0){
                        window.alert('无搜索结果~')
                    }else{
                        // console.log(res)
                        res = res.data.data
                        // console.log(res)
                        this.tableTh = res;
                        this.tableData = res.slice(0,10);
                        this.pageNum = Math.ceil(res.length/10)
                        this.show = false;
                    }
                    // console.log(this.tableTh)
                })
            }
        },
        mounted(){
            http.get('http://localhost:8080/src/common/dictionaryIndex.txt').then((res) => {
                    this.dict = res.data
                    // console.log(this.dict)
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