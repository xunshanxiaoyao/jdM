window.onload = function(){
	leftSwipe();
}

function leftSwipe(){
	// 1,滑动起来
	// 2，滑动超过一定距离的时候需要一个吸附的效果
	//3， 点击滑动到当前点击的元素 顶端同时改变 当前的选中元素
	// 4，在点击下的的一些元素的时候不需要定位

	// 父盒子

	var parentBox = document.getElementsByClassName('jd_category_left')[0];
	// 子盒子
	var childBox = parentBox.getElementsByTagName('ul')[0];

	// 有两个区间 滑动区间 缓冲区间

	// 父容器的高度
	var parentH = parentBox.offsetHeight;
	// 子容器的高度
	var childH = childBox.offsetHeight;

	// 定位区间  缓冲区间
	var maxPosition = 0;
	var minPosition = -(childH - parentH);

	// 缓冲的距离 
	var distance = 150;
	// 滑动区间

	var maxSwipe = maxPosition + distance;
	var minSwipe = minPosition - distance;

	// 定位

	var setTranslateY = function(translateY){
		childBox.style.transform = 'translateY('+translateY+'px)';
	}

	// 加过度
	var addTransition = function(){
		childBox.style.transition = 'all .2s ease';
	};
	//清楚过度
	var removeTransition = function(){
		childBox.style.transition = 'nonde';
	};

	// 滑动 
	var startY = 0; //开始Y坐标
	var moveY = 0 ;//滑动时侯的Y坐标
	var distanceY = 0;//滑动的距离
	//记录当前的定位
	var currY = 0;

	childBox.addEventListener('touchstart',function(e){
		startY = e.touches[0].clientY;
	});
	childBox.addEventListener('touchmove',function(e){
		moveY = e.touches[0].clientY;
		distanceY = moveY - startY;

		// 判断时候在滑动区间内 才允许滑动
		if((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe){
			removeTransition();
			setTranslateY(currY + distanceY);
		}
	});
	window.addEventListener('touchend', function(){
		console.log(currY);
		// 计算 当前滑动之后的位置
		currY = currY + distanceY;

		if(currY > maxPosition){
			currY = maxPosition;
			addTransition();
			setTranslateY(currY);
		}else if(currY < minPosition){
			currY = minPosition;
			addTransition();
			setTranslateY(currY);
		}

		// 重置记录的参数
		startY = 0;
		moveY = 0;
		distanceY = 0;
	});

	
}