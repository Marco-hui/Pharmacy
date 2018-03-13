<template>
    <div>
        <div id="herd">
            <a herf="#">
                <img src="http://img.yaofang.cn/mobile/top_left1.jpg">
            </a>
            <input placeholder="压脉带" type="text"/>
            <img class="close" src="http://img.yaofang.cn/mobile/close02.png"/>
            <span>
                <a herf="#" style="top: 0;left:12px;color: #fff;">你好</a>
            </span>
        </div>
        <section id="sct">
            <div class="tab">
                
            </div>
        </section>
        <footer id="foot">
            <ul>
                <li class="home">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="find">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="buy">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="my">
                    <a>
                        <i></i>
                    </a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import '../css/base.css'
    import '../css/list.css'
    import http from 'axios' 
    export default {
        data(){
            return{
                dataset:[]
            }
        },
    }

</script>