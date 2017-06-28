### 获取scrollTop的兼容方法
- pageXoffset != null
- document.compatMode == `"backcompat"` 标准兼容模式关闭
	- document.body.scrollTop
- document.compatMode == `"CSS1compat"` 标准兼容模式开启
	- document.documentElement.scrollTop

```js
// 封装scrollTop方法
function scroll() {
	// 判断是否为最新浏览器
	if (window.pageXoffset != null){
		return {
			left : window.pageXoffset,
			top : window.pageYoffset
		}
	}
	
	// 判断标准兼容模式是否打开(关闭)
	else if (document.compatMode == "backCompat"){
		return {
			left : document.body.scrollTop,
			top : document.body.scrollTop
		}
	}
	
	// 标准兼容模式打开
	else if (document.compatMode == "CSS1compat"){
		return {
			left : document.documentElement.scrollTop,
			top : document.documentElement.scrollTop
		}
	}
}
```
