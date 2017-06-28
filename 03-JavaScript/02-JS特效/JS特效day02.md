### JS特效day02
#### 作业拖动注册
- 获取鼠标在header中的位置
	
	```js
	// 获取当前鼠标位置
	var pageX = event.pageX;
	var pageY = event.pageY;
	
	// 获取元素距离左上距离
   var leftVaule = element.offsetLeft;
   var topVaule = element.offsetTop;
   
   // 获取鼠标在元素中的位置
   var x = pageX - leftVaule;
   var y = pageY - topVaule;
   
   // 修改header定位属性即可
	```
	
#### 商品滚动特效
- 核心技术点
	- 通过内容自动计算滚动条长度
		- 滚动条的长度 / 盒子的长度 = 盒子的长度 / 内容的长度 

  		- 滚动条长度 = (盒子的宽度 / 内容的宽度) * 盒子的宽度

  	- 拖动滚动条,求内容要走距离
  		- 内容走的距离 /  滚动条走的距离 =（内容的长度 - 盒子的长度） /  (盒子长度 - 滚动条的长度) 
 		- 	内容走的距离 = （内容的长度 - 盒子的长度） / (盒子长度 - 滚动条的长度) * 滚动条走的距离
	
####内置对象document
- document是window的一部分,可通过window.document获取文档对象
- document可以从脚本中对HTML页面中元素直接访问
	- document.title -> 获取标题
	- document.head -> 获取头部
	- document.body -> 获取身体
	- document.documentElement -> 获取整个html
	
	- document.compatMode -> 标准兼容模式
		- document.compatMode == "backCompat" -> 标准兼容模式关闭
			- 此时获取屏幕宽度需要通过document.body.clientWidth获取
		- document.compatMode == "CSS1Compat" -> 标准兼容模式开启
			- 此时获取屏幕宽度需要通过document.documentElement.clientWidht获取

####scroll家族
- scrollWidth
	- 如果是body调用,那代表的是网页正文宽
	- 如果是元素调用,那代表的是不包括border的元素宽度
	- 但是我们一般是不会去使用scrollWidth的
- scrollHeight : 与scrollWidth相一致
- scrollTop
	- 在滚动条滚动后,超出当前屏幕高度即为scrollTop值
	- 开发中scroll家族最常用的属性
- scrollLeft : 与scrollTop值一致

- scrollTo(x,y) : 滚动到当前页面的具体坐标上
	- x : 相对于document的左上角的x值
		- x值通常为0
	- y : 相对于document的最上角的y值

##### 处理scroll家族浏览器适配问题

```js
function scroll(){
	if(window.pageYoffset){
		return : {
			left : window.pageXoffset,
			top : window,pageYoffset
		}
	}
	// 标准兼容模式关闭
	else if(document.compatMode == "backCompat") {
		return : {
			left : document.body.scrollLeft,
			top : document.body.scrollTop
		}
	}
	// 标准兼容模式打开
	else if(document.compatMode == "CSS1Compat"){
		return {
			left : document.documentElement.scrollLeft,
			top : document.documentElement,scrollTop
		}
	}
}
```

#### json复习
- json是一个特殊的数据类型,(dictionary)
- 在js中我们称json为对象,通过键值对的形式来存储数值
		
```js
var json = {
	name : "lwq",
	age : 23,
	height : 1.78
}

// 通过键来获取内部对应的值
console.log(json.name);
```

#### 顶部导航吸顶
- vertical-align : top; -> 清除图片间距
- 设置图片百分比可以进行屏幕适配,拖拽屏幕图片随着变化

#### 侧边浮动广告
- 思路:记录当前scrollTop,让浮动广告scrollTo(0,currentTop),做缓动动画即可
