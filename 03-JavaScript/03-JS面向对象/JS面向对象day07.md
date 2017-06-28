### JS面向对象day07
#### 1.工厂模式复习
- 1.提供一个工厂构造函数
- 2.设置这个构造函数的原型对象的共享方法
- 3.设置这个构造函数的静态方法用于提供不同的接口
- 4.提供一个工厂方法
	- 4.1.// 4.1.检验构造函数中是否存在接口函数用于创建这个产品,如果不存在,抛出异常
	- 4.2.设置这个接口函数的原型对象为工厂函数的原型对象
	- 4.3.实例化构造函数
	- 4.4.返回实例化对象
- 将结果返回

```js
// 1.提供一个构造函数
function PhoneMake(){}

// 2.设置这个父构造函数的原型对象的共享方法
PhoneMake.prototype.logDes = function (){
	console.log(this.des);
}

// 3.设置接口函数
PhoneMake.iphone = function (){
	this.des = "我是iphone,我被生产出来了";
}
PhoneMake.vivo = function (){
	this.des = "我是vivo,我被生产出来了";
}
PhoneMake.oppo = function (){
	this.des = "我是oppo,我被生产出来了";
}

// 4.设置一个工厂函数用于创建同类型不同产品
PhoneMake.factor = function (phoneName){
	// 4.1.检验构造函数中是否存在接口函数用于创建这个产品
	try{
		if (PhoneMake[phoneName] == undefined){
				throw "不支持生产";
		}
	}
	catch (error){
		console.log(error);
		return false;
	}
	
	// 4.2.来到这个地方说明有对应接口
	// 4.2.设置接口函数的原型对象为父构造函数的原型对象
	PhoneMake[phoneName].prototype = PhoneMake.prototype;
	
	// 4.3.实例化接口函数
	var phone = new PhoneMake[phoneName]();
	
	// 4.4.将对象返回
	return phone;
}

PhoneMake.factor("iphone").logDes(); // 我是iphone,我被生产出来了
PhoneMake.factor("vivo").logDes(); // 我是vivo,我被生产出来了
PhoneMake.factor("--"); // 不支持生产
```

#### 单例模式(惰性函数)
- 1.提供一个构造函数
- 2.内部创建一个私有变量instance
- 3.自我更新函数
- 4.在自我更新函数内判断instance是否有值,如果有,直接返回
- 5.如果没有,那么将this赋值给instance
- 6.设置构造函数的原型对象为this的原型对象
- 7.如果需要设置person的静态成员,请在这个地方设置

```js
// 1.提供一个构造函数
function Person(){
	// 2.内部创建一个私有变量instance
	var instance;
	
	// 3.自我更新函数
	Person = function (){
		// 4.在自我更新函数内判断instance是否有值,如果有,直接返回
		if (instance != undefined){
			return instance;
		}
	}
	
	// 5.如果没有,那么将this赋值给instance
	instance = this;
	
	// 6.设置构造函数的原型对象为this的原型对象
	Person.prototype = Object.getPrototypeOf(this);
	
	// 7.如果需要设置person的静态成员,请在这个地方设置
	Person.des = "des"; 
	
	// 8.设置this的属性和方法
	this.name = "lwq";
	this.eat = function (){
		console.log(this.name);
	}
	
}

Person.prototype.logDes = function (){
	console.log("0--0");
}

var p1 = new Person();
var p2 = new Person();

p2.logDes(); // "0--0"
console.log(Person.des); // des
console.log(p1 == p2); // true
p2.eat(); // "lwq"
```

#### 单例模式(全局变量-即使函数)
- 1.创建一个全局构造函数变量(变量开头大写)
- 2.创建一个即时函数
- 3.在即时函数内创建一个变量instance
- 4.给全局构造函数变量赋值
	- 4.1.内部判断instance是否有值,如果有,直接返回instance
	- 4.2.如果没有,将this赋值给instance
	- 4.3.设置this的属性和方法

```js
// 1.创建一个全局构造函数变量(变量开头大写)
var People;

// 2.创建一个即时函数
(function(){

	// 3.在即时函数内创建一个变量instance
	var instance;
	
	// // 4.给全局构造函数变量赋值
	People = function(){
		// 4.1.内部判断instance是否有值,如果有,直接返回instance
		if (instance != undefined){
			return instance;
		}
		
		// 4.2.如果没有,将this赋值给instance
		instance = this;
		
		// 4.3.设置this的属性和方法
		this.name = "lwq";
		this.eat = function (){
			console.log(this.name);
		}
	}
})();

var p1 = new People();
var p2 = new People();

console.log(p1 == p2);
```

#### 观察者模式
- 1.提供一个父发布者
	- 1.1.内部拥有添加观察者方法
	- 1.2.移除观察者方法
	- 1.3.发布消息方法
- 2.提供一个函数,用于拷贝父发布者的内容
	- 2.1.校验传入是否为对象了,如果不是抛出异常
	- 2.2.遍历被拷贝者内容,只拷贝方法
	- 2.3.创建需要拷贝着的users对象
- 3.提供一个观察者
- 4.创建一个空对象,调用拷贝函数,成为子发布者
- 5.将观察者添加到观察者数组中
- 6.发布消息

```js
// 1.提供一个父发布者
var Person = {
	// 1.1.内部拥有添加观察者方法
	addUser : function (fn,type){
		type = type || "eat";
		try{
			if (typeof fn != "function"){
				throw "不支持";
			}
		}
		catch (error){
			console.log(error);
			return false;
		}
		
		if (this.users[type] != undefined){
			this.users[type] = [];
			
			if (this[type] != undefined){
				this[type] = function (){
					this.publish(type);
				}
			}
			this.user[type].push(fn);
		}
	},
	// 1.2.移除观察者方法
	removeUser : function (fn,type){
		type = type || "eat";
		for (var i=0;i<this.users[type].length;i++){
			if (this.users[type][i] == fn){
				this.users[type].splice(i,1);
			}
		}
	},
	// 1.3.发布消息方法
	publish : function (type){
		type = type || "eat";
		for (var i=0;i<this.users[type].length;i++){
			this.users[type][i]();
		}
	}
}

// 2.提供一个函数,用于拷贝父发布者的内容
function copyPerson(obj){
	// 2.1.校验传入是否为对象了,如果不是抛出异常(这边就不抛了)
	if(typeof obj != "object"){
		return false
	}
	
	// 2.2.遍历被拷贝者内容,只拷贝方法
	var attrs = Object.keys(people);
	for (var i=0;i<attrs.length;i++){
		obj[attrs[i]] = people[attrs[i]];
	}
	
	// 2.3.创建需要拷贝着的users对象
	obj.users = {};
}

// 3.提供一个观察者
var observe1 = {
	eat : function (){
		console.log("吃饭啦!!!");
	},
	run : function (){
		console.log("跑跑跑");
	}
}

// 4.创建一个空对象,调用拷贝函数,成为子发布者
var publishSon = {};
copyPerson(publishSon);

// 5.将观察者添加到观察者数组中
publishSon.addUser(observe1.eat,"eat");
publishSon.addUser(observe1.run,"run");

// 6.发布消息
publishSon.publish("eat"); // 吃饭啦!!!
publishSon.eat();			// 吃饭啦!!!
publishSon.run();			// 跑跑跑
```

#### 备忘录模式(函数结构缓存)
- 1.提供一个构造函数
- 2.在构造函数添加一个静态方法cache
- 3.判断这个变量是否有值,如果有,直接返回
- 4.如果没有,执行耗时操作
- 5.将耗时操作结果保存在cache中
- 6.返回耗时操作结果

```js
// 1.提供一个构造函数
function count(parameter){
	// 在构造函数添加一个静态方法cache
	count.cache = count.cache || {};
	
	// 3.判断这个变量是否有值,如果有,直接返回
	if (count.cache[parameter] != undefined){
		console.log("有缓存数据,直接返回");
		return count.cache[parameter];
	}
	
	// 4.如果没有,执行耗时操作
	var moreTime = parameter + "嘿嘿";
	
	// 5.将耗时操作结果保存在cache中
	count.cache[parameter] = moreTime;
	
	// 6.返回耗时操作结果
	console.log("没有缓存数据");
	return moreTime;
}

var p1 = count("!!");	// 没有缓存数据
var p2 = count("!!");	// 有缓存数据,直接返回
console.log(p1 == p2); // true
```

#### 命名空间模式