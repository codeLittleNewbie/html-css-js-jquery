/**
 * Created by W-Q on 2017/7/3.
 */
function ajax(data) {
    // 0.获取必须参数
    var method = data.type ? data.type : "get";
    var url = data.url;
    var paramStr = null;
    var paramArr = [];
    var timerout = data.timeout ? data.timeout : 1000;
    var t = new Date().getTime();
    var timer = null;

    // 判断当前返回值是否为jsonp
    if (data.dataType == "jsonp"){
        // 生成属性名
        var attrName = "jQuery" + new Date().getTime();

        // 判断用户是否有传入jsonpCallback
        if (data.jsonpCallback){
            attrName = data.jsonpCallback;
        }

        // 给window添加一个以jQuery开头+一串数字的方法
        window[attrName] = function (data){
            // 内部调用对象的success方法
            data.success(data);
        };

        // 生成一个script标签
        // var scriptDom = document.createElement("script");
        var scriptDom = $("<script></script>");

        // 给script标签设置src属性
        scriptDom.attr("src",url + "?cd=" + attrName);

        // 将script标签追加到body的后面
        scriptDom.appendTo($("body"));

        // 返回false
        return false;
    }

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