### JS面向对象day03
#### 继承的基本概念
- 即通过一定的方式实现让某个类型A获取另一个类型B的属性的方法,其中类型A称之为子类型,类型B称之为父类型或超类型
- javaScript中的继承
	- Object是所有对象的父级|父类型|超类型|:js中所有的对象都是直接或者间接继承Object
	- 继承的两种方式 : 接口继承和实现继承,在js中只支持实现继承,实现继承主要依赖原型链来完成
- javaScript中实现继承的几种方式
	- 说明:其他语言中继承通常通过类来实现,js中没有类的概念,js中的继承是某个对象继承另外一个对象,是基于对象的
	- 原型式继承
	- 原型链继承
	- 借用构造函数
	- 组合继承 : 借用构造函数 + 原型式继承
		

#### 继承的实现(属性拷贝)

```js
// 方式一:通过for..in遍历
var a = {
	name : "lwq",
	age : 23
};
var b = {};
for(var attr in a){
	b[attr] = a[attr];
}

// 方式二 : 通过Object.assign
var a = {
	name : "lwq",
	age : 23
};

var b = {};
Object.assign(b,a); 
```

#### 原型式继承

```js
function People(name,age){
	this.name = name;
	this.age = age;
	this.run = function(){
		console.log("haha");
	}
}
People.protytype = {
	des = "des";
	eat = function(){
		console.log(this.name);
	}
}
function Student(){
	
}
Student.prototype = People.Propetype;
var stu = new Student();
console.log(str.des) // des
console.log(str.eat) // name
console.log(str.name) // undefined
console.log(str.age) // undefined
console.log(str.run) // run is not a function
```
- 只能继承父元素原型对象上的属性和方法,但是没有办法继承实例属性和方法
- 公用同一份实例对象,当实例对象上保存属性为引用类型时,修改其中一份,另一份也随之发生改变

#### 原型链继承

```js
function People(){
	this.name = name;
	this.age = age;
	this.eat = function(){
		console.log(this.name);
	}
}
People.prototype = {
	run = function(){
		console.log("heihei");
	}
	this.play = "play";
}
function Student(){
	
}

Student.prototype = new People();
var stu = new Student();
console.log(stu.name); // undefined; 因为创建people的时候没有办法传参,所以导致name为undefined
console.log(stu.eat); // undefined;
console.log(str.run); // heihei
```
- 可以获取父元素中的属性,但是在创建的过程中没有办法给父元素传参,所以如果父元素使用this添加的属性和方法,子元素依旧undefined

#### Object.create
- Object的静态成员
- 创建对象并设置源性对象,返回创建好的新对象
- 处理兼容性问题

```js
var obj = {
	name : "lwq",
	age : 23
}
if (typeOf Object.create == "function"){
	var a = Object.create(obj);
}
else{
	// 1.创建一个新对象
	Function A(){
		
	}
	// 2.设置构造函数的原型对象为obj
	A.prototype = obj;
	// 3.使用这个构造函数创建对象
	var a = new A();
}

// 判断obj是否为对象a的原型对象
console.log(obj.isPrototypeOf(a));
```

#### call和apply函数
- call和apply是ES3给函数的原型对象添加的方法
	- Function.prototype.call();
	- Function.prototype.apply();

- 作用 : 借用别的对象的方法
- 如何传参
- call
	- 参数一 : 需要借助对象方法的对象
	- 参数二 : 依次为函数的参数
- apply
	- 参数一 : 需要借助对象方法的对象
	- 参数二 : 一个数组,数组元素依次为函数的参数

#### 借用构造函数继承

```js
function People(name,age){
	this.name = name;
	this.age = age;
	this.run = function(){
		console.log(this.name);
	}
}
People.prototype = {
	des : "des",
	eat : function(){
		console.log("哈");
	}
}

function Student(){
	People.call(this,"lwq",23);
}
Student.prototype = People.prototype;

var stu = new Student();
console.log(stu.name); // lwq
console.log(stu.des);  // des
```
- 解决了创建子对象时无法给父对象传值的问题,但是由于公用同一个原型对象,所以依旧有原型式的问题

#### Array.isArray
- 判断当前对象是否为一个数组,但是ie8不支持
- 兼容性写法

```js
// 判断当前是否在ie8之前浏览器,如果是
// 那么手动给Array添加一个新方法
if (typeOf Array.isArray != "function"){
	Array.isArray = function(obj){
		return Object.prototype.toString.call(obj) == "[object Array]";
	}
}
```	

####深拷贝和浅拷贝
- 浅拷贝 : 地址拷贝
	- 将父对象的所有内容拷贝一份给子对象,如果父元素中的属性是引用类型,那么拷贝过来的是地址
- 深拷贝 : 内容拷贝
	- 创建一个函数,提供两个参数,第一个参数为需要拷贝的对象,第二个参数为被拷贝的对象
	- 判断传入参数是类型是否为object,如果不是直接return false
	- 遍历被拷贝对象
	- 判断当前属性是否为实例属性,只拷贝实例属性
	- 判断实例属性值类型
		- 值类型 : 直接拷贝
		- 引用类型
			- 在判断应用类型为Object还是Array
			- Array : 创建一个空数组
			- Object : 创建一个空对象 
				- 再次调用此函数
					- arguments.callee(新创建对象,遍历出的对象)

```js
if (typeof Array.isArray != "function"){
        Array.isArray = function(obj){
            return Object.prototype.toString.call(obj) == "[object Array]";
        }
    }

    function deepCopy(obj1,obj2){
        // 1.判断传入参数类型
        if (typeof obj1 != "object" || typeof obj2 != "object"){
            return false;
        }
        // 2.遍历obj2中的所有属性
        for (var attr in obj2){
            // 2.1.判断是否为实例对象
            if (obj2.hasOwnProperty(attr)){
                // 2.2.判断属性值类型
                if (typeof obj2[attr] == "object"){
                    // 2.3.判断是否为数组
                    var obj = Array.isArray(obj2[attr]) ? [] : {};
                    // 2.4.重新调用该方法
                    arguments.callee(obj,obj2[attr]);
                }
            else{
                    // 赋值
                    obj1[attr] = obj2[attr];
                }
            }
        }
    }
```			

#### 面试题
- 当对象作为属性调用时,那么内部会自动调用这个对象的toString()方法

```js
var a = {name: 'zs'};
    var b = {};
    var c = {};

    c[a] = 'demo1'; // c['[object Object]'] = 'demo1';
    c[b] = 'demo2'; // c['[object Object]'] = 'demo2';

    console.log(c); // {'[object Object]': demo2}
    console.log(c[a]); // demo2
```

#### 基本数据类型的内部实现
- 为什么基本数据类型可以调用方法和属性
	- 因为基本数据类型内部有自己的一些实现
	- 当基本数据类型调用方法和属性时
		- 先定义一个对象与之相对应
		- 用这个对象去访问这个属性或者方法
		- 将结果返回并将这个对象销毁

		```js
		var str = "lajds";
		str.toUpperCase();
		// 内部实现
		var tempStr = new String(str);
		tempStr = tempStr.toUpperCase(str);
		// 将结果返回
		// 将对象置空
		tempStr = null;
		```
		
#### instanceOf
- 判断当前对象是否为后面对象的实例化对象
- 语法
	- obj1.instanceOf(obj2);
	
#### hasOwnProperty
- 判断对象中是否有该属性
- 语法

```js
 // 判断attr是否为obj1的实例化对象
 obj1.hasOwnProperty(attr);
 
```
	
#### isPrototyOf
- 判断对象是否为另一对象的原型对象
- 语法
	
	```js
	var obj = {
		name : "lwq",
		age : 23
	}
	var a = Object.create(obj);
	
	// 判断obj是否为对象a的原型对象
	console.log(obj.isPrototype(a));  // ture
	```

#### .__proto__
- 每一个对象都又一个.__proto__属性,默认指向该对象的原型对象
- 注意点
	- 这个__ptoto__不是ECMAScript规定的,是各大浏览器厂商为了方便程序员调试添加的这个属性,建议只在调试中使用,正式开发中不要使用(ie不支持)