## history对象
- forward("number" | "url"):前进到一个新的网页
- back()
- go()

## location对象
-  该对象包含客户端当前的URL信息,主要的用处是可以重新加载当前页面,还可以指定或者设置新的URL地址
-  常见用途
	
	```js

	// 定时刷新本页面,这个方法调用之后会重新刷新一下本页面
	location.reload();
	
	// 定时跳转,这个方式调用之后会跳转至href的url中去
	location.href="url";
	```
	
## navigator对象
- userAgent: 返回user-agent的头部
	- 就是可以判断当前浏览器是什么类型,safari,chrome,Firefox..
![](/Users/W-Q/Desktop/截图/Snip20170525_1.png)

## screen对象
- width:屏幕宽度
- height:屏幕高度
	- 是屏幕的宽高,Mac上不是分辨率
- availWidth:可用屏幕宽度
- availHeight:`屏幕高度` 减去 `browser的导航栏高度`