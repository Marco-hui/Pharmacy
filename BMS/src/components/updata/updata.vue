<template>
    <div class="updata">
        <div class="updata_l"></div>
        <div class="updata_r"></div>
        <p class="upBtn" @click="updata" >确定</p>
    </div>
</template>

<script>
    import $ from 'jquery'
    import './updata.css'
    import http from 'axios'

    export default{
        data(){
            return {
                upObj:{
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
                },                
                upId:''
            }
        },
        methods:{
            updata(){
                console.log(this.upId)
                var $length = $('.updata_r input').length
                // console.log($('.updata_r input')[1].className)
                for(var i=0;i<$length;i++){
                    for(var key in this.upObj){
                        if(key == $('.updata_r input')[i].className){
                            this.upObj[key] = $('.updata_r input')[i].value
                        }
                    }
                }
                // console.log(JSON.stringify(this.upObjPra.upObj))
                // console.log(this.$route.query.obj)
                http({
                    method: 'post',
                    url: 'http://10.3.136.179:1010/updateProduct',
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
                            id:this.upId,data:JSON.stringify(this.upObj)
                        }
                    }).then((res) => {
                        window.alert('修改成功！')
                })
            }
        },
        mounted(){
            // console.log(this.$route.query.obj.removeAttr('_id'))
            this.upId = this.$route.query.obj._id
            delete this.$route.query.obj._id
            delete this.$route.query.obj.id
            // console.log(this.$route.query.obj)
            var obj = this.$route.query.obj
            for(var key in obj){
                var $input = $('<input type="text"/>')
                $input.addClass(key)
                $input.val(obj[key])
                $input.appendTo($('.updata_r'))
            }
            for(var key in obj){
                var $p = $('<p/>')
                $p.html(key)
                $p.appendTo($('.updata_l'))
            }
            // console.log(this.upId)
        }
    }
</script>