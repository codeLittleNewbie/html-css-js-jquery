### jQuery核心原型方法以及对操作DOM的相关方法处理
#### 1.工具方法处理

```js
(function (window,undefined){
	function jQuery(selector){
		return jQuery.fn.init(selector);
	}
	jQuery.fn = jQuery.prototype = {
		init : function (selector){
			//..
		}
	}
	jQuery.fn.init.prototype = jQuery.prototype;
	window.jQuery = window.$ = jQuery;
	
	// 给jQuery添加静态方法和给jQuery原型对象添加原型方法
	$.extent = jQuery.fn = function (obj){
		for (var attr in obj){
			this[attr] = obj[attr];
		}
	}
	
	// 最后将扩展的方法通过调用$或者$.fn的extent方法添加
	$.extent(obj);
})(window);
```

#### 2.jQuery的插件机制
- jQuery插件的命名规范
	- jquery.fileName.js
- 在插件文件中,只要将写好的接口方法统一放到{}中,传入值`jQuery.extent` | `jQuery.fn.extent`中

```js
 /*注释,版本,创建时间*/
 jQuery.fn.extent({
 	remove : function(){},
 	text : function(){},
 	removeProp : function(){},
 	removeAttr : funciton(){}
 })
```
### jQuery核心原型成员实现
#### 3.toArray | get方法

```js
toArray : function (){
	return [].slice.apply(this);
}
get : function(param){
	if (argument.length == 0){
		// 伪数组转数组
		return this.toArray();
	}else{
		param < 0 ? this[this.length + param] : this[param];
	}	
}
```

#### 4.eq | first | last方法

```js
eq : function (param){
	if (arguments.length == 0){
		return $();
	}else{
		return $(this.get(param));
	}
},
first : function (){
	return this.eq(0);
},
last : function (){
	return this.eq(-1);
}
```

#### 5.sort | push | splice方法

```js
sort : [].sort,
push : [].push,
splice : [].splice
```

#### 6.each | map

```js
each : function (obj,fn){
	// 1.判断obj类型
	if (this.isArray(obj) || this.isLikeArray(obj)){
		for (var i=0;i<obj.length;i++){
			if (fn.call(obj[i],i,obj[i])) break;
		}else if (this.object(obj)){
			for (var attr in obj){
				if (fn.call(obj[attr],i,obj[attr])) break;
			}
		}
	}
},
map : function (obj,fn){
	
}
```
### jQuery操作DOM相关方法处理
#### 7.empty | remove方法

```js
empty : function (){
	this.each(function (){
		this.innerHTML = "";
	})
	return this;
},
remove : function(){
	this.each(function (){
		// 方式一
		// this.remove();	
		
		// 方式二
		this.parentNode.removeChild(this);
	})
}
```

#### 8.text | html方法

```js
text : function(param){
	if (arguments.length == 0){
		var str = "";
		this.each(function (){
			str += this.innerText;
		})
	}else{
		this.each(function (){
			this.innerText = param;
		})
	}
},
html : function (param){
	if (arguments.length == 0){
		var str = "";
		this.each(function (){
			str += this.innerHTML;
		})
	}else{
		this.each(function (){
			this.innerHTML = param;
		})
	}
}
```

#### 9.appendTo | prependTo | append | prepend
- 注意点,一定要先遍历子元素,再遍历父元素

```js
appendTo : function (param){
	param = $(param);
	this.each(function (_,children){
		$.each(param, function (index,parent){
			index != 0 ? this.appendChild(children) 
			: this.appendChild(children.cloneNode(true));
		})
	}})
},
prependTo : function (param){
	param = $(param);
	this.each(funciton (_,children){
		$.each(param,function (index){
			index != 0 ? this.insertBefore(children,this.childNode[0]) 
			: this.insertBefore(children.cloneNode(true),this.childNode[0]) ;
		})
	})
},
append : function (param){
	if (arguments.length == 0){
		return $()
	}else{
		if ($.isObject(param)){
			param = $(param);
			param.appendTo(this);
		}
	}
	// 只是简单的数字,字符串
	else{
		this.each(function (){
			this.innerHTML = this.innerHTML + param;
		})
	}
},
prepend : function (param){
	if (arguments.length == 0){
		return $();
	}else{
		if(this.isObject){
			param = $(param);
			param.prependTo(this);
		}
	}else{
		this.each(function (){
			this.innerHTML = param + this.innerHTML;
		})
	}
}
```