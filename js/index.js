window.onload=function(){
	search();
	banner();
	secondkill();
};

// 搜索
function search(){
	// 随着页面滚动，颜色不断加深
	// 滚动到一定距离之后颜色不改变
// 搜索盒子
	var search = document.getElementsByClassName('jd_header_box')[0];
// 轮播图盒子
	var banner = document.getElementsByClassName('jd_banner')[0];
	// 高度
	var h = banner.offsetHeight;

	// 监听页面的滚动
	window.onscroll = function(){
		// 取到距离顶部的距离
		var top = document.body.scrollTop;
		// console.log(top);
		var opacity = 0;
		// 在轮播图内
		if(h > top){
			opacity = 0.85 * top/h;
		}else {
			opacity = 0.85;
		}

		search.style.background = 'rgba(201,21,35,'+opacity+')';
	}

}


// 轮播图 
function banner(){
	// 1,自己按一定的时间向左滚动
	// 2，点也会对应的做改变
	// 3，跟随手指做滑动
	// 4，滑动不足三分之一的时候需要吸附回去
	// 5，超过三分之一滚动一张

	// 轮播图盒子
	var banner = document.getElementsByClassName('jd_banner')[0];
	// 获取轮播图宽度
	var width = banner.offsetWidth;

	// 图片盒子
	var imgBox = banner.getElementsByTagName('ul')[0];

	// 点盒子
	var pointBox = banner.getElementsByTagName('ul')[1];
	// 所有点
	var points = pointBox.getElementsByTagName('li');

	// 定位 
	var setTranslateX = function(translateX){
		// 效率高
		imgBox.style.transform = 'translateX('+translateX+'px)';
		// 兼容加 webkit
	}

	// 过度
	var addTransition = function(){
		imgBox.style.transition = 'all .2s ease';
	}

	// 清除过度
	var removeTransition = function(){
		imgBox.style.transition = 'none';
	}
	// console.log(typeof imgBox);
	// 1,自己按一定的时间向左滚动 
	var index = 1;
	var timer;

	timer = setInterval(function(){
		index++;
		// 过度
		// console.log(index);
		addTransition();
       
       	setTranslateX(-index * width);
	}, 2000);

	lyb.transitionEnd(imgBox,function(){
		// console.log('transitionEnd');
		if(index >= 9){
			console.log('11');
			index = 1;

			removeTransition();

			setTranslateX(-index * width);
		}else if (index <= 0){
			index = 8;

			removeTransition();

			setTranslateX(-index * width);
		}
		// 设置当前的点
		setCurrPoint();
	});

	// 2，点也会对应的做改变
	var setCurrPoint = function(){
        /*点索引0-7*/
        /*索引的值 1-8*/
        var pointIndex = index;

        if(pointIndex >= 9){
            pointIndex = 1;
        }else if(index <= 0){
            pointIndex = 8;
        }

        pointIndex = pointIndex -1;

        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
        }

        /*加上class*/
        points[pointIndex].className = "now";
    }
    // 3，跟随手指做滑动
    var startX = 0; // 刚刚触摸屏幕的时候
    var moveX = 0; //滑动的时候X的坐标
    var distanceX = 0; //坐标改变的值
   	var isMove = false;

   	imgBox.addEventListener('touchstart',function(e){
   		// 记录起始坐标
   		startX = e.touches[0].clientX;
   	});
   	imgBox.addEventListener('touchmove',function(e){
   		// 清除定时器
   		clearInterval(timer);
   		// 滑动的时候的X坐标
   		moveX = e.touches[0].clientX;
   		distanceX = moveX - startX;
   		// 恢复动画
   		removeTransition();
   		setTranslateX(-index * width + distanceX);
   		isMove = true;
   	});

   	// 如果浏览器模拟imgBox 监听touchend 在多次滑动的时候会丢失touchend，最终冒泡到window上
   	window.addEventListener('touchend',function(){
   		// 4，滑动不足三分之一的时候需要吸附回去
	// 5，超过三分之一滚动一张
		if(Math.abs(distanceX) > 1/3 * width && isMove){
			if(distanceX > 0){
				index --;
			}else {
				index ++;
			}
			addTransition();
			setTranslateX(-index * width);
		}else {
			addTransition();
			setTranslateX(-index * width);
		}
		// 重新加上定时器
		clearInterval(timer);
		timer = setInterval(function(){
			index++;
			addTransition();

			setTranslateX(-index * width);
		}, 2000);

		// 重置初始化的值
		startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
   	});
   	// zepto touch 没有提供 move
}

// 倒计时
function secondkill(){
	// 需要一个时间
	// 倒计时
	// 时间盒子
	var time = document.getElementsByClassName('sk_time')[0];
	// 找到所有的子盒子
	var blackBox = time.getElementsByTagName('span');

	// 时间
	var timer = 8 * 60 * 60;

	var interval = setInterval(function(){
		if (timer <= 0 ) {
			clearInterval(interval);
		}
		timer --;
		// 格式化
		var h = Math.floor(timer/(60*60));
		var m = Math.floor((timer%(60*60)/60));
		var s = timer % 60;

		blackBox[0].innerHTML = Math.floor(h/10);
		blackBox[1].innerHTML = h%10;

		blackBox[3].innerHTML = Math.floor(m/10);
		blackBox[4].innerHTML = m % 10;

		blackBox[6].innerHTML = Math.floor(s/10);
		blackBox[7].innerHTML = s % 10;
	}, 1000);
}