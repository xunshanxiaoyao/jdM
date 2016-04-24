window.onload=function(){
	search();
	banner();
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
	});
}