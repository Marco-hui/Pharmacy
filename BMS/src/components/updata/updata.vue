<template>
    <div class="updata">
        <div class="updata_l"></div>
        <div class="updata_r">
            <form id= "uploadForm">
                    
            </form>
        </div>
        <p class="upBtn" @click="updata" >确定</p>
        <router-link to="/products">返回</router-link>
    </div>
</template>

<script>
    import $ from 'jquery'
    import './updata.css'
    // import http from 'axios'
    import http from '../../utils/httpClient.js'

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
                // console.log(this.upId)
                var $length = $('.updata_r input').length
                // console.log($('.updata_r input')[1].className)
                for(var i=0;i<$length;i++){
                    for(var key in this.upObj){
                        if(key == $('.updata_r input')[i].className){
                            this.upObj[key] = $('.updata_r input')[i].value
                        }
                    }
                }
                // console.log(this.upObj)s
                var formData = new FormData($("#uploadForm" )[0]); 
                // console.log(this.upObj)
                var upObj = this.upObj
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
                // console.log(this.upObj)
                http.post('updateProduct',{id:this.upId,data:JSON.stringify(this.upObj)}).then((res) => {
                    window.alert('修改成功！')
                    this.$router.push({name:"products"})
                });
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
                $input.appendTo($('.updata_r #uploadForm'))
            }
            for(var key in obj){
                var $p = $('<p/>')
                $p.html(key)
                $p.appendTo($('.updata_l'))
            }
            $('.updata_r input')[4].type = 'file'
            $('.updata_r input')[4].name = "goodsimg"
            // console.log($('.updata_r input')[4])
        }
    }
</script>