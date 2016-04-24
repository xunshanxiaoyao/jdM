window.lyb = {};

// 封装transitionEnd事件
lyb.transitionEnd =function(objDom,callback){

	if(typeof objDom != 'object'){
		return false;
	}
	// console.log('00');
	objDom.addEventListener('transitionend', function(){
		// console.log('11');
		if(callback){
			callback();
			// console.log('22');
		}
	});
} 