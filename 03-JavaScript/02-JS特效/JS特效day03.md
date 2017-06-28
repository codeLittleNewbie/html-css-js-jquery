### JS特效day03
#### client家族
- clientTop
	- 返回元素的上边框
- clientLeft
	- 返回元素的左边框
- clientWidth
  	- document.body.clientWidth -> 当前浏览器可视页面宽度
- clientHeight
 	- document.body.clientHeight -> 当前浏览器可视页面高度
 
##### client兼容性处理(获取屏幕可是区域)

```js
function client(){
	if(window.innerWidth){
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	}
	else if(document.compatMode == "backCompat"){
		return {
			width : document.body.clientWidth,
			height : document.body.clientHeight
		}
	}
	else if(document.compatMode == "CSS1Compat"){
		return {
			widht : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
```

#### offset,scroll,client家族区别(元素调用 不是body调用)
- `left` 和 `top` 分析
	- offsetLeft : 元素距离document左边距离
	- scrollLeft : 屏幕向右滚动后被遮盖的宽度
	- clientLeft : 元素左边框

	- offsetTop : 元素距离document上面距离
	- scrollTop : 屏幕向下滚动后被遮盖的高度
	- clientTop : 元素的上边框

- `width` 和 `height`分析
	- offsetWidth : content+padding+border宽度
	- scrollWidth : content+padding宽度
	- clientWidth : content+padding宽度
	
	- offsetHeight : content+padding+border高度
	- scrollHeight : content+padding高度
	- clientHeight : content+padding高度

#### 常用窗口事件 `onresize`
- 当用户改变浏览器尺寸时便会调用此方法
- 该方法通常用于自适应页面布局,屏幕适配

- 补充:获取当前分辨率
	- window.screen.width
	- window.screen.height

#### JS的事件传递机制(冒泡机制)
- JS采用事件冒泡机制,当事件发生在子元素时,子元素接受完事件后,父元素也能接受到改事件,body,document,直到window停止

##### 阻止事件冒泡
- 场景:当我点击了按钮,不想让事件被其他元素接受到

```js
// 按钮点击
btn.onclick = function(event){
	var myEvent = event || window.event;
	if (myEvent || myEvent.stopPropagation){
		myEvent.stopPropagation();
	}
	else if(myEvent.cancleBubble){
		myEvent.cancleBubble = ture;
	}
	
}
```
##### 获取当前事件触发对象
- 场景:当一个事件被执行时需要获取这个事件由谁触发

```js
// html
<button id="leftBtn">左按钮<>
<button id="rightBtn">右按钮<>


// 监听body的点击事件
document.body.onclick = function(event){
	var myEvent = event || window.event;
	
	// 获取事件target属性
	var target = myEvent.target || myEvent.srcElement;
	
	// 通过target获取id
	if(target.id == "leftBtn"){
		// 左按钮被点击
	}
	else if(target.id == "rightBtn"){
		// 右按钮被点击
	}
}
```

##### document.selection 获取用户选中内容
- document.section,不是w3c标准,只是一些主流浏览器提供的API
- 作用:获取用户选中文本

```js
// 兼容性写法
var selectedText = "";
if(window.getSelection){
	selectedText = window.getSection().toString();
}
else if(document.selection){
	selectedText = document.selection.creatRange().text;
}
```

##### 取消用户选中效果
- 作用:取消用户选中文字效果
- 兼容性写法:

```js
window.getSelection ? window.getSelection.empty() : document.selection.removeAllRange();
```

#### window的使用
- 所有全局的变量都是window的属性
- 所有全局的函数都是window的方法
- window的动态跳转
	- window.location.href = "http://url";