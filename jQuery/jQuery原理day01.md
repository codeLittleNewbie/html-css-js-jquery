### jQuery入口函数的分析
#### 1.jQuery框架基本机构分析

```js
(function(window,undefined){//....})(window)
```
- 为什么要使用闭包的形式
	- 创建一个新的作用域,避免与其他框架相冲突
- 为什么要传递window这个参数
	- 因为框架内多次用到window,由于作用域链的关系,需要到上一级才能获取到window,因此将window传递进来之后可以节省这一次检索的时间,提升性能
- 为什么要传递undefined这个参数
	- 主要是为了做兼容使用的
		- 因为在IE内undefined是可以被修改的
		- IE5是不能直接使用undefined
		- 以前使用undefined的方法
		- `window.undefined = window.undefined;`

#### 2.jQuery工厂函数的定义
- 1.声明一个jQuery构造函数,将这个构造函数的初始化(init)方法作为子构造函数作为返回值
- 2.设置这个构造函数的原型对象的属性和方法,init方法
- 3.修改init的原型对象为jQuery的原型对象
- 4.给window添加jQuery和$两个属性,并把jQuery赋值给他
- 5.给jQuery.prototype起一个别名jQuery.fn

#### 3.jQuery工厂函数的实现

```js
(function(window,undefined){
	// 1.声明一个jQuery构造函数,
	// 实例化构造函数的初始化方法作为构造函数的返回值
	var jQuery = function (seletor){
		return new jQuery.fn.init(selector);
	};	

	// 2.给jQuery.prototype起一个别名jQuery.fn
	jQuery.fn = jQuery.prototype;
	
	// 3.设置这个构造函数的原型对象的属性和方法,init方法
	jQuery.prototype = {
		init : function(selector){
			// 初始化操作
		}
	}
	
	// 4.修改init的原型对象为jQuery的原型对象
	jQuery.fn.init.prototype = jQuery.prototype;
	
	// 5.给window添加jQuery和$两个属性,并把jQuery赋值给他
	window.$ = window.jQuery = jQuery;

})(window);
```

#### 5.抽取工具类

```js
var tools = {
	// 是否为对象
	isObject : function(obj){
		return typeof obj == "object";
	},
	// 是否为window
	isWindow : function(obj){
		return obj == window.window;
	},
	// 是否为字符串
	isString : function(str){
		return typeof str == "string";
	},
	// 是否为DOM代码块
	isHTML : function (str){
		return str.charAt(0) == "<" $$ str.charAt(str.length - 1) == ">";
	},
	// 替换
	replace : function(str){
		return str.replace(\^/s+|/s+&\g,"");
	},
	// 是否为数组
	isArray : function (arr){
		if (Array.isArray){
			return Array.isArray;
		}else
		{
			return Array.prototype.toString.call(selector) == "[object Array]";
		}
	},
	// 是否为伪数组
	isLikeArray : function(arr){
		return tools.isObject(arr) 
			&& !this.isWindow(arr)
			&& "length" in arr
			&& (arr.length - 1) in arr
	}
}
```

#### 4.条件判断为假
- `false` | `0` | `undefined` | `null` | `NaN`

```js
if (!selector){
	return this;
}
```

#### 5.字符串(代码块 | 选择器)

```js
// 兼容处理,先将字符串中的空格去掉
init : function(selector){
	selector = toos.replace(selector);
}

if (tools.isString(selector)){
	// 判断是否为代码块
	if (toos.isHTML(str)){
		// 创建一个DOM元素
		var dom = document.creatElement("div");
		dom.html = str;
		// 这个child也是一个伪数组,
		// 类型为[object HTMLCollection]
		var child = dom.children;
		
		// 将第一级元素添加到实例化对象中
		// 当然这个地方可以遍历这个对象,然后依次加入到this中
		// push这个方法内部会自动添加一个length属性
		Array.prototype.push.apply(this,child);
	}
	// 判断是否为选择器
	else{
		// 借用document.querySelectorAll()获取DOM元素
		// 由于上面方法获取的元素数组,是一个系统的伪数组
		// 类型为[object NodeList]
		// 可以直接放入到apply的参数二中,自定义的伪数组不行
		var obj = document.querySelectorAll(selector);
		
		// 将元素以key从0开始对应value的形式存放在实例化对象中
		Array.prototype.push.apply(this,obj);
	}
}
```

#### 6.数组 | 伪数组

```js
// 是否为数组
else if(tools.isArray(selector)){
	// 直接添加到this中
	Array.ptototype.push.apply(this,selector);
}
// 是否为伪数组
else if (tools.isLikeArray(selector))
{
	// 将伪数组转化为数组
	var likeArr = Array.prototype.slice.apply(selector);
	
	Array.prototype.push.apply(this.likeArray);
}
```

#### 7.函数作为参数
- document.readyState的几种状态
	- uninitialized : 未初始化 -> 0
	- loading : 正在载入中 -> 1
	- loaded : 载入完成 -> 2
	- interactive : 交互 -> 3
	- complete : 完成 -> 4

		- ininitialized : XML对象被产生,但没有任何文本被加载
		- loading : 加载程序进行中,但文件尚未开始解析
		- loaded : 部分文件已经加载且解析,但对象模型尚未生效
		- interactive : 仅对已加载的部分文件有效,在此情况下,对象模型是有效但是只读
		- complete : 文件已完全加载,代表加载成功

```js
ready : function (fn){
		if (document.addEventListener){
			// 写法一
			/*document.addEventListener("DOMContentLoaded",function (){
				fn();
			});*/
			
			// 写法二 把fn充当回调函数来使用
			// 给document添加一个事件监听者
			// 当DOMContentLoaded时,执行回调
			document.addEventListener("DOMContentLoaded",fn);
		}else if(document.attachEvent){
			document.attachEvent(onreadystatechange){
				if (document.readyState == "completed"){
					fn();
				}
			}
		}
}

```

#### 8.几个新方法汇总
- `replace`
	- replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
	
```js
// 用什么来替换什么,但是只会执行一次
// 需要多次执行,需要使用正则表达式
// \^/s+|/s+$\g -> 代表找到字符串中所有的最前空格和最后空格
strObject.replace(" ","");
```

- `document.querySelector`
- `document.querySelectorAll`
	- querySelector:返回的是一个DOM对象(具体的标签)
	- querySelectorAll:返回的是一个类似数组的对象[object NodeList]
- `slice(start, end)`
	- slice()可以选中数组中具体位置的元素返回
	- 被用于伪数组->数组时,如果没有传参的情况下,只会看数组中的length来返回个数,没有对应的键值对返回undefined
- `split`
	- 将字符串通过字符截取成一个字符串数组返回