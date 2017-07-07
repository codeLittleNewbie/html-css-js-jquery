### jQuery-Ajax注意点
#### 1.cookie的常用使用(封装)
- 最多只能存放4kb大小
- 默认生命周期为session(可以手动修改 -> `expires`)
	- 即浏览器关闭便消失

```js
// 添加数据
function setCookie(key,value,timer){
    if (timer){
        var date = new Date();
        // 获取时间
        date.setDate(date.getDate() + timer);
        document.cookie = key + "=" + value + ";expires=" + date;
    }else {
        document.cookie = key + "=" + vlaue;
    }
}

// 获取数据
function getCookie(key){
    var arr = document.cookie.split("; ");
    for (var i=0;i<arr.length;i++){
        var item = arr[i].split("=");
        if (item.indexOf(key) != -1){
            return item[1];
        }
    }
}

// 删除数据
function removeCookie(key){
    setCookie(key,"",-1);
}


setCookie("name","lwq",1);
console.log(getCookie("name"));
removeCookie("name");
```

#### 2.sessionStorage
- 可以存储2-5m大小
- 生命周期也是session(没有属性修改)
- 这是`window`方法

```js
// 设置缓存
window.sessionStorage.setItem("name","lwq");
window.sessionStorage.setItem("age",23);

// 获取缓存
console.log(window.sessionStorage.getItem("name"));;

// 修改缓存
window.sessionStorage.setItem("name","lyh");


// 删除缓存
window.sessionStorage.removeItem("name");

// 清除所有缓存
window.sessionStorage.clear();
```

#### 3.localStorage
- 与`sessionStroage`用法一致
- 可以存储20m大小文件
- 不删除就不会被销毁
- 这是`document`的方法

#### 4.hash
- 通常用于加载当前页
- 设置了hash值之后,会默认存放到本地
	- 生命周期为session
	- 会在url后面直接凭借# + `hash`值
- 使用时需要先截取字符串

```js
// 设置hash
window.location.hash = 3;

// 再次加载页面时,hash值便会拼接到url上,可以直接获取
// 获取hash值
var hash = window.location.hash.subString(1);
```

#### 4.store.legacy.js框架
- 当我们需要存储一些复杂数据类型时考虑使用
- 手动使用原生在存储对象的时候会出一些小bug
	- 比如获取值时出错

- 如果只是单纯的字符串保存我们可以直接使用我们封装好的`cookie`

```js
// store current user
store.set("user",{name : "lwq"});

// get current user
store.get("user");

// remove current user
store.remove("user");

// clear all keys
store.clear();

// loop over all stored value
// 这种方式遍历最后一个key默认为itemArray
// value为是一个数组,这个数组中装有所有的缓存对象
store.each(function(value, key){
	console.log(key + "=" + value);
})

// get all storage
store.get("itemArray");
```