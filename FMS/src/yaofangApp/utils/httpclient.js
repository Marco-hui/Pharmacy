// axios ajax 请求插件
import axios from 'axios'
//api接口服务器待修改
const baseUrl = 'http://10.3.136.179:1010'
import router from '../router/rounter.js'

export default {
	// socket(_wsurl){
	// 	var url = _wsurl && _wsurl.startsWith('ws') ? _wsurl : `${base_wsurl}/${_wsurl}`;
	// 	var ws = new WebSocket(url);
	// 	return ws;
	// },
	get(_url,_params){
		var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
		return new Promise((resolve, reject) => {
			axios({
				url: url,
				params: _params || {},
				headers: {Authorization: window.localStorage.getItem('infotoken')},
				transformRequest: [function (data) {
					let ret = ''
					for (let it in data) {
					  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
                    return ret
				  }]
			}).then(res=>{
				if(!res.data.status && res.data.error == "unauthorized"){
					router.push('login');
					return false;
				}
				resolve(res)
			}).catch(error=>{
				reject(error)
			})
		})
	},
	post(_url,_params){
		var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
		return new Promise((resolve, reject) => {
			axios({
				url: url,
				method: 'post',
				data: _params || {},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: window.localStorage.getItem('infotoken')
				},
				transformRequest: [function (data) {
					let ret = ''
					for (let it in data) {
					  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
                    return ret
				  }]
            }).then(res => {
				if(!res.data.status && res.data.error == "unauthorized"){
					// console.log(router)
					router.push('login');
					return false;
				}				
                resolve(res)
            }).catch(error => {
				
            	reject(error)
            })
		})

	}
}