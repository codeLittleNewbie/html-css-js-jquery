### JS面向对象day05
#### 1.this丢失bind解决
- `bind`
	- 参数一 : this的绑定值
	- 参数.. : 借用函数的参数(可传,可不传)
	- 返回值 : 返回绑定好this的函数

```js
// this丢失
var getDiv = document.getElementById; // this -> document
getDiv("box") // this -> window

// bind解决
var getDiv = document.getElementById.bind(document); // this -> document
getDiv("box"); // this -> document

```

#### 2.图书管理操作(面向对象)
- `splice` : 数组方法
- 作用 : 设置数组替换元素
	- 参数一 : 需要操作的数组下表
	- 参数二 : 需要同时操作对象的个数
		- 如果这个参数为0,参数三有值,那么会将参数三添加到数组中去
		- 如果这个参数为1,参数三有值,那么会将参数三替换数组index位置元素
		- 如果这个参数为1,参数三没有值,那么会数组index位置元素删除
	- 参数三 : 替换的元素

```js
// 提供一个图书管理系统的构造函数
function BookManager(){
	this.bookList = [
		{
			name : "红楼梦",
			age : 23
		},
		{
			name : "西游记",
			author : "罗贯中"
		},
		{
			name : "三国演义",
			author : "罗承恩"
		},
		{
			name : "红楼梦",
			author : "曹雪芹"
		}
	];
}

// 设置图书管理对象的原型对象
BookManager.prototype = {
	// 获取书本
	getBook : function (name){
		for (var i=0;i<this.bookList.length;i++){
			if (this.bookList[i][name] == name){
				return this.booList[i];
			}
		}
	},
	// 添加书本
	addBook : function (index,book){
		this.bookList.splice(index,0,book);
		// this.bookList.push(book);
	},
	// 设置书本
	setBook : function (index,book){
		this.bookList.splice(index,1,book);
		// var book = getBook(parameter1);
		// book.name.author = parameter2
	},
	// 移除书本
	deleteBook : function (index){
		this.bookList.splice(index,1);
		// var book = getBook(parameter1);
		// var index = this.bookList.index(book);
		// this.bookList.splice(index,1);
	}
}

var bookManager = new BookManager();
bookManager.deleteBook(2);

console.log(bookManager.bookList);

bookManager.addBook(3,{
	name : "lwq",
	age : 23
})

console.log(bookManager.bookList);
```

#### 3.严格模式
- 严格模式书写
	- "use strict";
	- 'use strict';
	- "use strict"
- 严格模式注意点
	- 变量必须使用var来修饰
	- 被var修饰的变量不能被删除
	- 对象属性名不能一致
	- 函数的参数不能一致
	- 禁止使用8进制
	- 禁止使用callee和caller
		- callee : 函数本身
		- caller : 调用函数的函数
	- 禁止使用with
	- 禁止使用arguments和eval作为标识符(变量名)
	- if语句中不得定义函数
	- 修正了this的指向,如果没有明确指定this的指向,那么为undefined
	- arguments的用法不一样

#### 4.严格模式的作用域
- script标签内
- 函数中
- 代码块(虽然不会开辟新的作用域,但是对于严格模式是适用的)
	- JS中是没有块级作用域的

- 注意点 : 
	- 1.必须写在当前作用域的最顶端
	- 2.写在script标签中,只对这个标签内的所有内容有效
	- 3.写在函数内,仅仅是对函数中的内容有效
	- 4.写在代码块中,仅仅是对代码块中的内容有效

#### 5.变量和函数提升
- JS的执行顺序 : 
	- 先将使用var声明的变量和使用function声明的函数提升到当前作用域的最顶端
	- 再执行代码

- 几种提升情况
	- 1.变量名相同,后面定义的变量会覆盖之前定义的
	- 2.函数名相同,后面定义的函数会覆盖之前定义的
	- 3.变量名和函数名相同,只会提升函数,不会提升变量
	- 4.函数表达式,只会提升变量,不会提升函数

#### 6.变量提升是分作用域的
- 变量提升只会将变量提升到当前作用域的最顶端

#### 7.变量作用域
- 当放到某一变量的值的时候,现在本作用域中查找,如果有就直接使用
- 如果没有,就在上一个作用域中查找,如果有就直接使用
- 如果没有,就继续第二步操作,指导0级作用域

#### 8.面试题小注意点
- `!"--"` --> `false`
- `var a;`  `!a` --> `ture`

#### 9.原型链注意点
- 1.所有的构造函数都是由Function构造函数创建出来
- 2.所有构造函数的.__proto__都是空函数
- 3.空函数的.__proto__是Object的原型对象
- 4.Object的原型对象是由Object创建出来的
- 5.自定义构造函数的原型对象是由Object创建出来的
- 6.Object的原型对象的constructor指向的是null
- 7.内置构造函数的原型对象是由自己创建出来的