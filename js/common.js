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

lyb.tap = function(objDom,callback){
	if(typeof objDom != 'object'){
		return false;
	}
	// 1，不能滑动
	// 2，响应需要在一定时间完成

	var isMove = false;//记录是否滑动过
	var startTime = 0;
	objDom.addEventListener('touchstart', function(e){
		console.time('end');//计时开始的一个声明 end
		startTime = Date.now();//取到当前时间
	});
	objDom.addEventListener('touchmove', function(e){
		isMove = true;
	});
	objDom.addEventListener('touchend', function(e){
		console.timeEnd('end');
		if(!isMove && (Date.now() - startTime) < 150){
			callback && callback(e);
		}

		// 重置
		isMove = false;
		startTime = 0;
	})
}