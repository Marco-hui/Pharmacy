<template>
    <div id="address">
        <div id="com_header">
           <div id="com_header_nav">
                <a id='com_header_a'><img src="http://img.yaofang.cn/mobile//top_left.png" @click="com_header_a" ></a>
                <div class="menu" >
                    <img src="http://img.yaofang.cn/mobile/home.png">
                </div>
            </div>
        </div>
        <div id="locate">
            <p><label for="province">省份:</label><select name="province" id="province"></select></p>
            <p><label for="city">城市:</label><select name="city" id="city"></select></p>
            <p><label for="county">县区:</label><select name="county" id="county"></select></p>
            <textarea name="detail" id="" cols="48" rows="5" placeholder="请输入详细地址"></textarea>
            <button id="btn_yes">确定</button>
            <router-link to="/order"><button>取消</button></router-link>
        </div>
        <div id="region3">
             <hkfoot></hkfoot>
        </div>
       
    </div>
</template>

<script type="text/javascript">
    import $ from "jquery"
    import "./region3.css"
    import hkfoot from '../home/foot/index_foot.vue'
    export default{
        components:{
            hkfoot
        },methods:{
            com_header_a(){
                window.history.go(-1);
            },
        },
        mounted(){
            // 收货地，三级联动
            $.get("/src/assets/common/region.json",function(res){
                var data=res.regions;

                var province=$('#province')[0];
                var city=$('#city')[0];
                var county=$('#county')[0];
                // 生成省列表
                for(var i=0;i<data.length;i++){
                    var option_province=document.createElement('option');
                    option_province.value=data[i].name;
                    option_province.innerText=data[i].name;
                    province.appendChild(option_province);
                }

                // 根据选择的省生成相应的城市列表
                province.onclick=function(e){
                    for(var i=0;i<data.length;i++){
                        if(data[i].name == e.target.value){
                            var data_city=data[i].regions;
                            var option_city=data_city.map(function(item){
                                return `<option value="${item.name}">${item.name}</option>`
                            }).join('');
                            // 根据选择的城市生成相应的县级列表
                            city.onclick=function(evt){
                                for(var j=0;j<data_city.length;j++){
                                    if(data_city[j].name == evt.target.value){
                                        var data_county=data_city[j].regions;
                                        var option_count=data_county.map(function(items){
                                            return `<option value="${items.name}">${items.name}</option>`
                                        }).join('');
                                    }
                                }
                                county.innerHTML="<option value='请选择'>请选择</option>"+option_count;
                            }
                        }
                    }
                    city.innerHTML="<option value='请选择'>请选择</option>"+option_city;
                }
            },'json')
        }
    }
</script>