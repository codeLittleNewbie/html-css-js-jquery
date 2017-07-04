## ajax封装jsonp的内部实现


```js
function ajax(obj){
	// 判断当前返回值是否为jsonp
	if (obj.dataType == "jsonp"){
		// 生成属性名
		var attrName = "jQuery" + new Date().getTimer();
	
		// 判断用户是否有传入jsonpCallback
		if (obj.jsonpCallback){
			attrName = obj.jsonpCallback;
		}
		
		// 给window添加一个以jQuery开头+一串数字的方法
		window[attrName] = function (data){
			// 内部调用对象的success方法
			obj.success(data);
		}
		
		// 生成一个script标签
		// var scriptDom = document.createElement("script");
		var scriptDom = $("<script></script>");
		
		// 给script标签设置src属性
		if (data.jsonp){
            scriptDom.attr("src",url + "?"+ data.jsonp +"=" + attrName);
        }else {
            scriptDom.attr("src",url + "?_jsonp=" + attrName);
        }
		
		// 将script标签追加到body的后面
		scriptDom.appendTo($("body"));
		
		// 返回false
		return false;
	}
}	
```