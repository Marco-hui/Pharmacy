<template>
    <div>
        <table class="users_table">
            <thead class="pro">
                <th v-for="(val,key) in tableTh[0]" v-if="cols.indexOf(key) > -1" class="admins" >{{dict[lanType][key] || key}}</th>
                <th>
                    <input type="button" value="添加管理员" @click="showAdd=!showAdd" />
                </th>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in tableData" :key="'c'+idx" :id="obj._id" class="upShow_box" style="position:relative" >
                    <td v-for="(val,key) in obj"  v-if="cols.indexOf(key) > -1" :key="'d'+key">{{val}}</td>
                    </td>
                    <td>
                        <input type="button" value="修改密码" @click="upadmin(obj)" />
                        <input type="button" value="删除" @click="readmin(obj)" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="add_box" v-if="showAdd" >
            <input type="text" v-model="addAdmin.name" />
            <input type="text" v-model="addAdmin.pass" />
            <input type="button" value="确定" @click="addadmin" />
        </div>
        <div class="re_box" v-if="showup" >
            <input type="text" v-model="addAdmin.uppass" placeholder="请输入新密码" />
            <input type="button" value="确定" @click="upadmin2" />
        </div>
        <div class="page">
            <span v-for="idx in pageNum" @click="page(idx-1)">{{idx}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './admins.css'
    import http from '../../utils/httpClient.js'

    export default{
        data(){
            return {
                tableTh:[],
                tableData: [],
                show: false,
                cols: ['name','pass'],
                lanType: 'cn',
                dict: {},
                pageNum: '',
                showAdd: false,
                showup: false,
                addAdmin:{
                    name: '',
                    pass: '',
                    uppass: '',
                    upid: ''
                }
            }
        },
        methods:{
            addadmin2(){
                this.showAdd = true;
                // console.log(this.addAdmin.name)
                http.post('addAdmin',{name:this.addAdmin.name,pass:this.addAdmin.pass}).then((res)=>{
                    window.alert('添加管理员成功！')
                    http.get('getadmins').then((res) => {
                        // console.log(res)
                        res = res.data.data
                        // console.log(res)
                        this.tableTh = res;
                        this.tableData = res.slice(0,10);
                        this.pageNum = Math.ceil(res.length/10);
                        this.show = false;
                        this.showAdd = false;
                        // console.log(this.tableTh)
                    })
                })
            },
            upadmin(obj){
                this.showup = !this.showup;
                this.addAdmin.upid = obj._id;
            },
            upadmin2(){               
                // console.log(this.addAdmin.upid,this.addAdmin.uppass)
                http.post('updateAdmin',{_id:this.addAdmin.upid,pass:this.addAdmin.uppass}).then((res)=>{
                    // console.log(666)
                    http.get('getadmins').then((res) => {
                        window.alert('密码修改成功！')
                        // console.log(res)
                        res = res.data.data
                        // console.log(res)
                        this.tableTh = res;
                        this.tableData = res.slice(0,10);
                        this.pageNum = Math.ceil(res.length/10);
                        this.show = false;
                        this.showup = false;
                        // console.log(this.tableTh)
                    })
                })
            },
            readmin(obj){
                this.show = true;
                http.post('removeAdmin',{_id:obj._id}).then((res) => {
                    // console.log(res)
                    http.get('getadmins').then((res) => {
                        // console.log(res)
                        res = res.data.data
                        // console.log(res)
                        this.tableTh = res;
                        this.tableData = res.slice(0,10);
                        this.pageNum = Math.ceil(res.length/10);
                        this.show = false;
                        // console.log(this.tableTh)
                    })
                })
            }
        },
        mounted(){
            http.get('http://localhost:8080/src/common/dicID.txt').then((res) => {
                    this.dict = res.data
                    // console.log(this.dict)
                });
            http.get('getadmins').then((res) => {
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