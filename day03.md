## day03
- 行内式>页内式>外链式

```js
// 行内式
<div style="width:100px;height=100px;background:red;"></div>

// 业内式
div{
	width:100px;
	height:100px;
	background:red;
}
<div></div>

// 外链式
<link rel"stylesheet" type="text/css" href="css.css">

// css文件
div{
	width:100px;
	heigh:100px
	background:red;
}
```

## important的作用
- 作用:提升属性等级
- 快捷键,写在属性值分号前面,`!+tab`

```js
div{
	width:100px !important;
}
```

## 定时器
- window.setInterval("code",时长(ms));
	- 有一个返回值:ID
	- 此方法会一直循环执行
	- code也可以是function
- window.setTimeout("code",时长(ms));
	- 有一个返回值:ID
	- 此方法只会执行一次
	- code也可以是function

```js
// 此代码会没五秒进行一次调用
window.setInterval(function(){
	console.log("----");
},5000);

// 此代码5秒后会调用一次
window.setTimeout(function(){
	console.log("-----");
},5000);
```
- 在js中一般的变量被创建出来就会占用内存,在没有使用时候就会被自动销毁掉,但是定时器不会被系统销毁,所以需要我们手动来销毁

```js
// ()内填写我们设置定时器时返回的一个ID值
window.clearInterval("t")

// ()内填写我们设置定时器时返回的一个ID值
window.clearTimeout("t")
```
