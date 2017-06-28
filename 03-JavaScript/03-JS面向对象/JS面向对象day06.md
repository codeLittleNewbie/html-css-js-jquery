### JS面向对象day06
#### 1.闭包复习
- 什么是闭包
	- 闭 : 封闭,关闭的作用域
	- 包 : 包裹
- 闭包技术
	- 外部作用域无法访问内部作用域
	- 有时候有这个需求,引出了闭包技术
	- 可以在外部作用域中获取内部作用域的私有数据
- 如何实现
	- 1.return
	- 2.闭包
		- 对return做一层包装(函数)
		
#### 2.闭包作用
- 外部作用域可以获取内部作用域的私有变量
- 设置值和获取获取值必须使用特定的接口
- 设置值的时候可以对参数做一系列校验
- 延长了变量的作用域

#### 3.闭包的获取和设置数据

```js
function people(){
	name : "lwq";
	age : 23
	
	return {
		getName : function (){
			return name;
		},
		getAge : function (){
			return age;
		},
		setName: function (newName){
			if (newName != undefined){
				name = newName;
			}
		},
		setAge : function (newAge){
			if (newAge != undefined){
				age = newAge;
			}
		}
	}
}
 
var p = people();
console.getName(p.getName());
p.setAge(25);
console.log(p.getAge());
```

#### 4.定时器和闭包的执行

```js
// 打印10次10
for (var i=0;i<10;i++){
	setTimeout(function (){
		console.log(i);
	},1000);
}

// 闭包解决
for(var i=0;i<10;i++){
	function test(i){
		setTimeout(function(){
			console.log(i);
		},1000);
	}
	test(i);
}
```

#### 5.div事件和闭包

```js
var divs = document.getElementsByTagName("div");
for (var i=0;i<divs.length;i++){
	(function (i){
		divs[i].onclick = function (){
		console.log(i);
		}
	})(i);
}
```

#### 6.函数的特殊性
- 1.函数也是对象,所以对象能做的函数也能做
- 2.对象能够动态添加属性和方法,函数也可以
- 3.对象可以充当函数的参数和返回值,函数也可以
- 4.函数可以开辟作用域
- 5.哈数可以被调用

#### 7.函数的name属性
- 如果没有书写函数名,那么变量名充当函数名
- 如果书写了函数名,那么函数名即函数名
- 默认函数名是不可以被修改与遍历的
	- enumerable : false
	- writable : false
	
```js
var a = function (){}
var b = function foo(){}
// 打印出函数名
console.log(a.name); // a
cosole.log(b.name);  // foo

// 尝试修改函数名
a.name = "lwq";

// 修改失败
cosole.log(a.name); // a

// 打印出对象name属性的描述信息
// configurable : ture 
// enumerable : false 
// writable : false
console.log(Object.getOwnPropertyDescriptor(a,"name")); 

// 修改对象的描述信息
Object.defineProperty(a,"name"{
	writable : true
})

// 再次修改name
a.name = "lwq";

// 再次打印
console.log(a.name); // lwq
```

#### 8.函数的回调(函数作为函数的参数)
- 会出现的问题:this丢失
- 将回调函数传入之后,内部调用这个回调函数时,this会丢失,所以,需要传入第二个参数,将this的指向也传入,然后修正this的指向

```js
var a = {
	name : "lwq",
	age : 23,
	des : function (){
		console.log(this.name);
	}
}

function foo(showDes,obj){
	if (typeof showDes == "string"){
		a[showDes]();
	}
	if(typeof showDes == "function"){
		showDes.call(obj);
	}
}

foo(a.des,a);
```

#### 9.函数作为返回值(计数器)
- 当一个函数内的私有数据被另一个函数引用着,那么这个对象将不会被销毁,除非,引用着他的函数销毁了

```js
var foo = (function (){
	var a = 0;
	setInterval(function(){
		a++;
	},1000);
	return function (){
		return a;
	}
})();

document.onclick = function (){
	foo();
}
```

#### 10.惰性函数
- 需要调用一次函数之后才能确定函数内部数据的函数
- 场景 : 函数有一些初始化的准备工作要做,且只需要执行一次的情况。
- 特点 : 能够更新自身的函数实现
- 注意点: 
	- 1.在函数调用前给函数添加的静态变量将会消失
	- 2.将惰性函数赋值给一个变量,那么惰性函数将不会更新
	- 3.将惰性函数赋值给一个对象的属性,那么惰性函数将不会更新
	
#### 11.即时 对象 初始化
- 不产生全局变量,获取了对象内部的数据

```js
({
	name : "lwq",
	age : 23,
	init : function (){
		console.log(this.name);
		console.log(this.age);
	}
}).init();
```

#### 12.`prototype` `.__proto__` `getPropertyOf`
- prototype:构造函数的方法,如果对象调用,返回empty
	- 内置构造函数的原型对象是由自己创建出来
	- 自定义构造函数的原型对象是由Object创建出来的
- getPrototypeOf:获取对象的原型对象,即.__proto__所指向的原型对象
	- 函数调用此方法 -> 空函数
	- 构造函数实例化对象调用此方法 -> Object的实例化对象
	- {}调用此方法 -> Object.prototype

#### 设计模式简单说明
- 设计模式(套路)
   - 为了解决在开发中遇到的一些问题而提供的方法

   - 在公司中,一个完整系统需要有一套设计模式(架构师)
   - 一个好的模式必须具备2个条件: 高内聚 低耦合

- 设计模式的来源: 建筑领域

- 设计模式4人帮: 作者： Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides ，这四位常被称为“四人帮”或“四人组”，即Gang of Four，经常出现在设计模式一类的书中的缩写GoF，指的也是这四个人。

- 常见的设计模式有23种:
   - 单例(单件)模式, 工厂模式, 观察者模式, 代理模式, 备忘录模式...

- 关于设计模式的书:
   - < 大话设计模式 > < 23种设计模式 > < 设计模式 > < JavaScript设计模式 >