### JS特效day05
#### 旋转木马
- 点击某个大元素判断是否点击了内部的小元素 --> 运用target.id

```js
document.body.click = function(event){
	var myEvent = event  || window.event;
	var target = myEvent.target || myEvent.srcElement;
	if (target.id == "leftBtn"){
		// 点击了左边的按钮
	}
	else if(target.id == "rightBtn");
}
```
- 数组的复习
	- arr.shift() : 删除数组中的第一个元素
	- arr.unshift(obj) : 将元素添加为数组的第一个元素
	- arr.push(obj) : 将元素添加为数组的最后一个元素
	- arr.pop() : 删除数组中最后一个元素

		- 删除方法会将`删除的元素作为返回值`返回给你
		- 添加元素方法会将`最新数组长度返回`给你
- 案例中使用到的方法
	- json.unshift(json.pop()); 删除最后一个添加到第一个
	- json.push((json.shift)); 删除第一个添加到最后你一个

#### 网易轮播图
 - 监听左右按钮点击(点击右侧按钮来实例)
 	- 让自身缓动离开页面到右侧
 	- 将下一张需要显示的图片提前移动到左侧
 	- 将下一张图片缓动从左侧出现在页面中
 	- 判断索引越界问题 
	
 	```js
 	// 点击右侧按钮示例
 	if(currentIndex > allList.length - 1){
 		currentIndex = 0;
 	}
 	```
 	- 排他
 	
 	```js
 	// 方案一 性能上不好,两次遍历太耗性能
 	for(var i=0;i<allList.length;i++){
 		for(var i=0,i<allList.length;i++){
 			allList[i].className = "control_icon";
 			allList[current].className = "control_icon current";
 		}
 	}
 	
 	// 高级排他
 	for(var i=0;i<allList[i].length;i++){
 		var lastNum = 0;
 		(function(index){
 			allList[i].onclick = functino(){
 				  allList[lastNum].className = "";
 					  allList[index].className = "current";
 			}
 		})(i)
 	}
 	```
- 点击底部按钮
	- 判断当前点击位置处于之前位置左侧还是右侧

	```js
	for(var i=0;i<olList.length;i++){
		olList[i].onclick = function(){
			if(this.index > currentIndex){
				// 点击了右边
				// 当前图片缓动移开屏幕到左侧
				// 下一张图片提前放到右侧
				// 下一张图片从右侧缓动出现在屏幕上
				
				// 改变当前索引
				currentIndex = this.index;
			}
			else if(this.index < currentIndex){
				// 点击了左边
			}
		}
	}
	```
- 自动轮播
	
	```js
	timer = setInterval(function(){
		// 1.做鼠标点击左侧按钮一样的步骤
		// 2.排他
	},1000);
	
	// 鼠标over停止定时器
	box.onmouseover = function(){
		clearInterval(timer);
	}
	
	// 鼠标out开启定时器
	box.onmousetout = function(){
		timer = setInterval(function(){},1000);
	}
	```
	
#### Tab选项卡
- 小技巧
	- 当我们做Tab选项卡时,over时出现边框,out时取消边框,所以li的宽度计算会让我们感到头疼
	- 这个时候我们可以先给所有的li设置统一的左右padding,当我们hover时,设置被hover的那个li的border
	- 然后将被hover的li的padding清零,此时,所有的li长度都是一致的
	- 如果两侧边框不需要,我们可以让ul左移1px,在设置最大盒子的overflow:hidden;
  4x