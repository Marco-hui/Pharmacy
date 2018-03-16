var state={
	yanzhengma(){
	    var code='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    var res='';
	    for(var i=0;i<4;i++){
	        var idx=parseInt(Math.random()*String(code).length);
	        res+=code[idx];
	    }
	    return res;
	},
	numCode(){
		var res = '';
		for(var i=0;i<4;i++){
			res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
		}
		return res;
	},
	showpop: false,	
	quxiao: false,
	queding: false
};
export default {state}