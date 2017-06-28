### JS特效day04
#### 复习Math函数
- Math.abs -> 绝对值
- Math.ceil -> 向上取整
- Math.floor -> 向下取整
- Math.round -> 四舍五入
- Math.random -> 随机数(0,1)

#### 缓动动画原理
- begin = begin + (end - begin) / 缓动系数;
- 基本缓动动画

```js
function buffer(obj,target){
	// 1.清除定时器
	clearInterval(obj.timer);
	
	// 2.开启定时器
	obj.timer = setInterval(function(){
		// 2.1计算速度
		var speed = (targe - obj.offsetLeft) / 20;
	   speed = target > obj.offsetLeft ? Math.ceil(speed) : Math.floor(speed);
		
		// 2.2给元素赋值
		obj.style.left = obj.offsetLeft + speed + "px";
		
		// 2.3清除定时器
		if(target == obj.offsetLeft){
			cleanInterval(obj.timer);
		}
	},20); 
}
```

#### js访问css样式
- 获取行内样式
	- `element.style.width`
	- `element.style[width]`
	- 案例区分点语法与`[]`取值的区别
		- 点语法不能使用变量
		- `[]`可以使用

	```js
	// 点语法
	var h = "height";
	box.style.h = 200 + "px";   // 报错,不存在h属性
	
	// []
	var h = "height";
	box.style[h] = 200 + "px";  // 赋值成功
	
	```
	
- 获取`页内`-`外链`样式
	- IE和Opera
		- `window.getComputerStyle(obj,伪类)[attr];`
	- Chrome和Firefox
		- `obj.currentStyle(attr);`
	- 兼容写法



	```js
	// 获取页内-外链样式
	function getCssStyleAtrr(obj,attr){
		if(window.getComputerStyle){
			return getComputerStyle(obj,null)[attr];
		}
		else if(obj.currentStyle){
			return obj.currentStyle()[attr];
		}
	}
	```
	
#### JSON的遍历
- for in关键字

```js
for(var key in json){
	console.log(key)              // key
	console.log(json[key]);		  // value
}
```

#### 回调函数
- 场景:当某个操作需要在另一个操作完成之后才执行,那么就需要用到回调函数
	- 例如缓动动画
	- 发送请求
- 回调什么时候调用
	- 动画结束的时候调用
	- 动画什么时候结束
	- 清除定时器的时候调用
	- 定时器清除时调用回调函数

	```js
	if(fun){
		fun();
	}
	```

#### 完整版的缓动动画

```js
// 缓动动画
function buffer(obj,json,fun){
	// 1.清除定时器
	clearInterval(obj.timer);
	
	// 1.1定义常量
	var flag = false;
	var begin = 0;
	var target = 0;
	
	// 2.开启定时器
	obj.timer = setInterval(function(){
		// 2.1遍历json
		for(var key in json){
			// 2.2获取初始值
			if(key == "scrollTop"){
				begin = parseInt(parseInt(getCssStyleAttr(obj,key)) * 100) || 0;
				target = json[key];
			}
			else if(key == "opacity"){
				begin = parseInt(getCssStyleAtrr(obj,key));
				target = parseInt(parseInt(json[key] * 100));
			}
			else {
				begin = parseInt(getCssStyleAtrr(obj,key));
				target = parseInt(json[key]);
			}
			// 2.3计算速度
			var speed = (target - begin) / 20;
			speed = target > begin ? Math.ceil[speed] : Math.floor[speed];
			
			// 2.4赋值
			if(key == "scrollTop"){
				obj.style.scrollTop = begin + speed;
			}
			else if(key == "opacity"){
				obj.style.opacity = (begin + speed) / 100;
				obj.style.filter = 'alpha(opacity='+ (begin + speed) +')';
			}
			else if(key == "zIndex"){
				obj.style.zIndex = json[key];
			}
			else {
				obj.style[key] = begin + speed + "px";
			}
			if (begin == target){
				flag = ture;
			}
		}
		// 3.清除定时器
		if(flag){
			clearInterval(obj.timer);
				
			// 设置回调
			if(fun){
				fun();
			}
		}
	},20);
}

// 获取样式表
function getCssStyleAtrr(obj,attr){
		if(window.getComputerStyle){
			return getComputerStyle(obj,null)[attr];
		}
		else if(obj.currentStyle){
			return obj.currentStyle()[attr];
		}
	}
```

#### audio的一些方法
- play() -> 开始播放音频
- curremtTime = 0 -> 让音乐下次播放从0开始,多次触发时使用