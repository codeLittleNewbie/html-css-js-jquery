### JS特效day01
#### 自定义动画
-  星星海demo

```js
animation : change 1s "延迟时长" alternate infinite;
@keyframe change {
	// from {}
	// to {}
	
	0%{
		opacity : 0;
	}
	
	100%{
		opacity : 1;
	}
}
```

#### Undescore-min.js
- 常用方法
- 数组处理:
	- map(`arr,function(num){}`) : 将数组中的所有元素依次进行某种操作后,将结果保存到一个新的数组中去
	- each(`arr,function(num){}`) : 将数组中的所有元素依次进行某种操作后,没有返回值

	```js
	// map方法
	var arr = [3,43,21];
	var newArr =  _.map(arr,function (num){
		return num * 2;
	});
	console.log(newArr) // 6,86,42
	
	// each方法
	var arr = [3,43,21];
	_.map(arr,function (num){
		window.alert(num); // 依次打印 3,43,21
	});
	``` 
- 其他:
	- random(`0,100`) : 随机产生0-100的数,包括0与100
	
	```js
	console.log(_.random(0,20)) // [0,20];
	console.log(Math.random())  // (0,1);
	```
	
#### offset家族
- offsetWidth
	- 返回包括border,padding,content的宽度
- offsetHeight
	- 返回包括border,padding,content的高度
- `offsetTop`(最常用)
	- 如果有父元素,且父元素存在定位,那么参照元素的左上角
		- 这种情况下:返回值为元素距离父元素top的高度
		- 在滚动情况下,返回值是从元素Top到document之间距离
	- 如果没有父元素,或者说有父元素,但是父元素没有定位属性
		- 这种情况下,返回值为元素距离bodytop的高度
- offsetLeft
	- 与offsetTop一致

#### 照片墙
- 当我们用js设置元素样式时,设置的 是行内样式,`行内样式>页内样式>外链样式`
	- 因此,当我们通过设置元素className来`排他`的时候需要注意之前是否设置了类型属性,如果有,那么请加上`!importance`
- transition:translate(-50%,-50%);
	- 这个在translate中的50%代表的是移动自身元素宽高的一半

#### 天猫弹性导航
- 缓动动画(不完全版)
	- 需要解决的问题是定时器没有办法关闭,且begin永远达不到end值

```js
// 情景一 : begin < end; -> 在onmousemove/onscroll中给end赋值
// 定义常量
var begin = 0;
var end = 0;
var timer = null;
timer = window.setInterval(function(){
	// 缓动效果
	begin = begin + (end - begin) / 20;
	
	// 让元素动起来
	element.left = begin;
},20)

// 情景二 : 返回顶部
// 在onscroll中给begin赋值 begin = scroll().top;
var begin = 0;
var end = 0;
var timer = null;
timer = window.setInterval(function(){
	// 缓动效果
	begin = begin + (end - begin) / 20;
	
	// 让body动起来
	scrollTo(0,begin);
	
	// 判断当前begin是否与end相等
	if (begin == end){
		// 停止定时器
		window.clearIntervar(timer);
	}
},20)
```

#### 事件对象(event)
- `clientX`
	- 返回`当前browser`(区分pageX)左上角与鼠标位置的X距离
- `clientY`
	- 返回当前browser左上角与鼠标位置的Y距离
- screenX
	- 返回屏幕左上角与鼠标位置的X距离
- screenY
	- 返回屏幕左上角与鼠标位置的Y距离
- pageX
	- 返回document左上角与鼠标位置的X距离
- pageY
	- 返回document左上角与鼠标位置的Y距离

#### 求出鼠标在盒子内的坐标

```js
// 鼠标当前相对于browser位置
var pageX = event.pageX;
var pageY = event.pageY;

// 元素相对于browser位置
var offsetLeft = element.offsetLeft;
var offsetTop = element.offsetTop;

// 获取鼠标在盒子内的坐标
var x = offsetLeft - pageX;
var y = offsetTop - pageY;
```

#### 进度条特效
- 存在的问题,刚加载browser时没有办法获取进度
![](/Users/W-Q/Desktop/截图/Snip20170530_1.png)

#### 常用事件的区别
- `onclick`
	- 鼠标点击事件:鼠标一起一落完整过程
- `onmousedown`
	- 鼠标按下事件:鼠标按下
- `onmouseup`
	- 鼠标抬起事件:鼠标抬起
- `onmouseover`
	- 鼠标进入元素:类似于hover事件
- `onmouseout`
	- 鼠标离开元素:结束hover
- `onmousemove`
	- 鼠标在元素中移动
	- [www.baidu.com]()