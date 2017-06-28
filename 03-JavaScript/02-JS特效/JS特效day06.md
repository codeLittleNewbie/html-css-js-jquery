### JS特效day06
#### 面向对象
##### this
- 出现在对象调用方法中,this指向该对象本身
- 出现在定时器中,this指向window
- 出现在创建对象过程中,this指向被创建对象

##### 通过构造函数面向对象

```js
function People(option){
	this._init(option);
}
// 通过prototype添加添加共享库方法
People.prototype = {
	// 初始化
	_init : function(option){
		var myOption = option || {};
		this.name : myOption.name;
		this.age : myOption.age;
	},
	eat : function(something){
		console.log(sonething);
	}
}

```
#### construction模式
- 高级语言普遍拥有class和instance,javascript只有构造函数,为了数据共享和抽象出通用属性,加了一个原型属性prototype
- 为了解决从原型对象生成实例的问题,javascript提供了一个构造函数(construction)模式
- 所谓的`构造函数`,其实就是一个普通的函数,但是内部调用了this变量,对构造函数使用了new关键字,就能生成实例,并且this变量会绑定在实例对象上

#### 闭包的补充
- 闭包的作用
	- 可以读取函数内部的局部变量
	- 可以让这些`变量`的值`始终保存在内存中`

	```js
	// 此时闭包的作用就是当test执行完毕之后,
	// 闭包使得javaScript的垃圾回收机制(garbage collection)
	// 不会回收a所占的内存,因为此时a正被函数b所引用着
	function test(){
		var a = 3;
		function b(){
			a++;
		}
	
		return b;
	}

	var c = test()(); // 此时a的值为4;
	```
	- 封闭作用域
- 封闭作用域:
    - 封闭作用域又称值为封闭空间，还有一个昵称叫小闭包，以及匿名函数自调。
    	- 最大目的: 全局变量私有化
    - 作用:
    	- 不污染全局空间
    	- 可以保存全局数据。
    	
    	```js
    	// 将document传入之后,就起到了保存全局数据的作用
    	// 内部调用访问的都是同一份空间
    	(function (document) {
        	var btn1 =  document.getElementById('btn');
        	var btn2 =  document.getElementById('btn');
        	var btn3 =  document.getElementById('btn');
    })(document);
    	```
    	
    	- 更新复杂变量。

#### 高级排他

```js
for(var i=0;i<ulList.lenght;i++){
	var li = ulList[i];
	var lastIndex = 0;
	(function(index){
			li.onclick = function(){
				ulList[lastIndex] = "";
				this.className = "current";
				lastIndex = index;
			}
	})(i)
}
```

#### 闭包中参数的传递
#### 函数节流

```js
window.onresize = throlle(function(){
	code;
},1000);
function throlle(fn,time){
	// 着段代码只会执行一次
	var timer = null;
	return function(){
		// 这里代码会一直调用
		cleanInterval(timer);
		
		timer = setInterval(fn,time);
	}
}
```
