### jQuery-Ajax注意点
#### 1.jQuery发送网络请求

```js
$.ajax({
	url : https://sp0.baidu.com,
	type : "GET",
	dataType : "jsonp",
	jsonp : "",
	jsonpCallback : "",
	beforSend : function (){},
	data : {},
	success : function (){},
	error : function (){}
})
```

#### 2.artTempleta的基本使用
- 使用步骤
	- 导入jQuery框架
	- 导入artTemplate框架
	- 创建一个type:text/html的script标签
		- 在内部使用artTempleta语法写好标签
	- 使用template函数
		- 参数一 : script标签的id
		- 参数二 : 需要传入的数据
			- 如果没有传入数据,那么返回值为一个被渲染的函数
- 简单语法
	- `{{if}} {{/if}}` : 判断语句
	- `{{each obj as value index}} {{/each}}` : 循环语句
		- 等价于{{each obj}}{{/each}}
			- 不写参数可以直接使用$value
		- 可以遍历对象也可以遍历数组
	- 注意点 : 一定需要通过key的形式,才能访问到内部的值

```js
<script type="text/html" id="test">
	{{if key}}
		<ul>
			{{each key as value index}}
				<li>value[index]</li>
			{{/each}}
		</ul>
	{{/if}}
</script>

$(function (){
	var obj = {name : "lwq",age : 23};
	var a = {key : {obj}}
	
	// 注意了,这个时候传入的a在模板里面是拿不到的
	// 需要给a再包一层对象
	var html = template("test",a);
	document.body.innerHTML(html);
})
```

#### 3.原生跨域问题的解决方案
- 跨域是什么意思
	- 当前端工程师加载非本文件所在域名下的文件时,就会产生跨域问题
	- 系统默认的请求是拒绝访问的
- 原生处理方案
	- 当需要发请求跨域数据时
	- 在body的最后面追加一个`script`标签
	- 设置其src属性为对应的url
	- 拼接`jsonp`|`jsonpCallback`,需要与后台程序员协商
	- 声明一个全局方法,名字与jsonpCallback一致,接受一个参数
	- 数据加载回来的时候就会掉用这个已经写的方法

```js
function jsonp = function(){
	console.log("Hello,World");
}

btn.onclick = function (){
	var script = document.createElement("script");
	script.setAttribute("src",url);
	document.body.appendChild(script);
}
// 当我点击按钮的时候就会在body的默认追加一个script标签,
// 然后根据src地址发送一个网络请求
// 请求回来的数据大致长的这个样子
// jsonp(data);
```

#### 4.jQuery.ajax的跨域问题

```js
$.ajax({
	url : url,
	type : "",
	data : {},
	dataType : "jsonp",
	// 会给url后追加一个参数,key为abc,value为abc
	jsonp : abc,
	jsonpCallback : abc,
	success : function (){}
})
```
- 内部实现过程
	- 在另外一个md文件中

#### 5.面试题 : 解决跨域访问的三种方式
- iframe : 设置iframe的src属性,起到跨域访问
- jsonp : 追加一个script标签,设置src属性
- 服务器端解决 : `header("Access-Control-Allow-Origin");`
	- 但是一般不会这么做
	
	
##### 主流的做法就是通过jsonp的形式来解决跨域访问问题
- 1.首先与后台约定传入参数的key
- 2.jQuery内设置jsonp这个键值对就可以了
- 3.这个key对应的值是一个以jQuery开头+随机数字的字符串
- 4.通过这个字符串给window创建一个方法,接受一个参数,内部做对这个参数处理的代码
- 5.后台获取到这个key之后,会以这个开头带括号,且将数据放在括号中的形式返回
- 6.返回之后就会调用我们给window绑定的那个方法