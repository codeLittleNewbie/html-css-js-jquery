### 原生Ajax注意点
#### 1.使用表单发送get | post请求
- get
	- 设置请求方法为`get`
	- 设置请求路径
	- 参数拼接到`ulr`后,通过?拼接,参数之间通过&连接
	- 后台通过`$_GET`获取参数

- post 
	- 设置请求方法是`post`
	- 设置请求路径
	- 参数放到请求体中
	- 后台通过`$_POST`获取参数

	- 获取get请求与post请求参数可以统一是用
		- `$_REQUEST`


```js
<form method="get | post" action="请求路径">
	<input type="text" name="username">
	<input type="password" name="password">
	<input type="subit">
<form>
```

#### 2.get | post 安全性处理
- 在处理安全问题的时候,如果有隐私数据需要传递服务器,那么需要做加密处理

- 消息摘要算法(哈希算法 | 散列计算) --> MD5 | sha256
	- 特点
		- 给定数据,进行散列计算之后,会得到一个定长的字符串
		- 加密之后得到的数据是定长的
		- 相同的明文加密之后得到的密文是一样的
		- 只要明文不同,密文一定不一样 ==> 正版校验
		- `不可逆` ==> 可以暴力破解
		- 速度快,效率高

		520it -> 加密 -> 21bfcc4c2625469d8ec6f3d710dcb0fe
		
		- `场景` : 假设前台需要传输账号密码,那么就先通过哈希算法加密一样,
		- 到后台的时候就拿到一堆密文,
		- 然后下次用户再次登录是,将获取到的密文与之前密文做匹配,如果相同,登录成功,如果不想同,则登录失败

- 对称加密算法
	- 有一个秘钥,加密和解密使用相同的秘钥
- 非对称加密算法
	- 有两个密钥,公钥用来加密,私钥用来解密
- 证书-https
	- 解决了上面所有加密算法的问题

#### 3.使用表单进行文件上传
#### 4.响应状态码
![](/Users/W-Q/Pictures/screenshot/Snip20170703_1.png)- `status code` : 状态码 + 原因短语
- 作用
	- 在我们进行接口调试的时候,可以通过状态码来初步判断当前请求的情况如何
	- 请求失败
		- (4开头)我们前端的问题 : 请求路径错误 | 参数错误(类型|个数) | 网络错误(没有网络)
		- (5开头)后台的问题 : 接口本身存在逻辑问题 | 服务器没有开启

#### 5.ajax发送get请求的基本过程

```js
// 1.创建XMLHTTPRequest对象
if (window.XMLHTTPRequest){
	var xhr = new XMLHTTPRequest();
}else{
	var xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

// 2.配置xhr对象
/**
 * @method 请求方式
 * @url 请求路径
 * @async 是否异步
 */
xhr.open("get",url,true);

// 3.发送请求
xhr.send(null);

// 4.监听readystatue的改变
xhr.onreadystatuschange = function(){
	// 判断请求是否完成
	if (xhr.readyState == 4){
		// 判断请求是否成功获取数据
		if (xhr.status == 200){
			console.log(xhr.responseText);
		}else {
			console.log("请求失败");
		}
	}
}
```#### 6.封装处理

```js
function ajax(data) {
    // 0.获取必须参数
    var method = data.type ? data.type : "get";
    var url = data.url;
    var paramStr = null;
    var paramArr = [];
    var timerout = data.timeout ? data.timeout : 1000;
    var t = new Date().getTime();
    var timer = null;

    // 1.创建XMLHTTPRequest对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 2.对参数进行处理
    if (data.data) {
        for (var attr in data.data) {
            paramArr.push(attr + "=" + data.data[attr]);
        }
        // 缓存处理
        paramArr.push("t=" + t);

        paramStr = paramArr.join("&");
    }

    // 3.配置xml对象
    if (method == "get") {
        // 对url进行编码(中文处理)
        url = encodeURI(url);

        if (paramStr) {
            url += "?" + paramStr;
        }
        xhr.open(method, url, true);
        xhr.send(null);
    } else {


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(paramStr)
    }

    // 4.监听xhr状态的改变
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // 清除定时器
                clearInterval(timer);
                data.success(xhr.responseText);

            } else {
                data.error("请求错误");
            }
        }
    };

    // 5.设置定时器
    timer = setInterval(function () {
        // 取消请求
        xhr.abort();
    }, timerout);
}
```