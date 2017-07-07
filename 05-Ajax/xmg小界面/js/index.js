/**
 * Created by W-Q on 2017/7/6.
 */
$(function () {
    // 获取头部top值
    var searchT = $("#search").offset().top;
    var itemArray = store.get("itemArray") || [];
    var currentIndex = null;

    // 初始化刷新界面
    refresh();

    // 滚动条处理
    $(window).on("scroll", function () {
        // 获取滚动条top值
        var top = $(window).scrollTop();

        // 判断滚动距离是否超过searchT值
        if (top > searchT) {
            $("#search").css({
                "position": "fixed",
                "top": 0,
                "box-shadow": "0 1px 3px rgba(0,0,0,0.3)"
            });

            // 设置opacity跟display是有区别的
            // - 前者依旧会占用空间
            // - 后者不会占用标准流空间
            $("#sImg").fadeIn();
            $("#returnTop").fadeIn();

        } else {
            $("#search").css({
                "position": "absolute",
                "top": searchT,
                "box-shadow": "none"
            });

            $("#sImg").fadeOut();
            $("#returnTop").fadeOut();
        }
    });

    // 返回顶部
    $("#returnTop").on("click",function () {
        $("html body").animate({
            scrollTop : 0
        },1000);
    });

    // tab栏处理
    $("#content ol li").on("click",function () {
        // 排他
        $(this).addClass("cur").siblings().removeClass("cur");

        // 获取当前li的索引值
        var index = $(this).index();

        // 内容页排他
        $("ul").eq(index).addClass("current").siblings().removeClass("current");

        refresh();
    });

    // 监听添加按钮的点击
    $("input[type=submit]").on("click", function () {
        // 获取文本框内容
        var val = $("input[type=text]").val();

        // 创建一个对象来保存li的内容
        var obj = {
            title : val,
            complete : "",
            content : "",
            time : "",
            isNotice : false
        };

        // 将对象添加到数组中
        itemArray.push(obj);

        // 刷新页面
        refresh();
    });

    // 删除按钮
    $("#content ul").on("click",".del",function () {

        // 拿到当前对象的父元素删除掉
        $(this).parents("li").slideUp(1000,function () {
            // 动画结束之后删除li
            this.remove();
        });

        // 把数组中的对象也一并删除
        // 获取当前li所对应的下标
        var index = $(this).parents("li").index();
        itemArray.splice(index,1);

        // 重新将数组存入本地
        store.set("itemArray",itemArray);
    });

    // 监听checked的点击
    $("#content ul").on("click","input",function () {
        // 获取当前在数组中的obj
        var index = $(this).parent().data().index;

        // 这个值跟手动添加的属性是刚好相反的
        // console.log($(this).parents("li").index());


        // 设置对象的complete属性
        itemArray[index].complete = $(this).is(":checked");

        // 保存对象
        store.set("itemArray",itemArray);

        // 移除当前li
        $(this).parents("li").slideUp(function () {
            // 动画结束之后删除li
            this.remove();
        });
    });

    // 详情按钮
    $("#content ul").on("click",".det",function () {
        // 弹出蒙版
        $(".mask").fadeIn();

        // 记录当前选中li的索引值
        currentIndex = $(this).parents("li").data().index;

        // 更新蒙版内容
        var obj = itemArray[currentIndex];
        $(".mask_title .title").val(obj.title);
        $(".mask_value textarea").val(obj.content);
        $(".mask_time input").val(obj.time);
    });

    // 事件模板
    $.datetimepicker.setLocale('ch');//设置中文
    $('.mask_time input').datetimepicker();//显示日期

    // 移除蒙版
    // event.stopPropagation -> 不能拦截自己发出的事件,只能拦截别人传过来的
    $(".mask").click(function () {
        $(".mask").fadeOut();
    });
    $(".mask_content").click(function (event) {
        // 阻止事件冒泡
        event.stopPropagation();
    });
    $(".mask .mask_title").on("click",".close",function () {
        $(".mask").fadeOut();
    });

    // 点击更新按钮
    $(".refreshBtn").click(function () {
        // 获取备忘内容
        var titleV = $(".mask_title .title").val();
        var contentV = $(".mask_value textarea").val();
        var timeV = $(".mask_time input").val();

        // 存储到对象中
        itemArray[currentIndex].content = contentV;
        itemArray[currentIndex].time = timeV;
        itemArray[currentIndex].title = titleV;

        // 存储到本地
        store.set("itemArray",itemArray);
        $(".mask").fadeOut();
    });

    // 刷新界面
    function refresh() {
        // 清空ul数据
        $("#content ul").empty();
        for (var i=0;i<itemArray.length;i++){
            var item = itemArray[i];

            var checked = (item.complete ? "checked" : "");

            var li = '<li data-index='+ i +'>'+
                '<input type="checkbox"'+ checked +'>' +
                '<span>'+ item.title +'</span>' +
                '<span class="det">详情</span>' +
                '<span class="del">删除</span>'+
                '</li>';

            // 判断当前任务是否已完成
            if (item.complete){
                $("#content .ulItem").eq(1).prepend(li);
            }else {
                $("#content .ulItem").eq(0).prepend(li);
            }

            // 将对象保存到本地
            store.set("itemArray",itemArray);
        }
        // 给li添加动画效果
        $("ul li").first().hide().slideDown();
    };

    // 设置定时器,定时播放音频
    setInterval(function () {
        // 获取当前时间
        var curTime = new Date().getTime();

        // 遍历数组
        for (var i=0;i<itemArray.length;i++){

            // 如果已经放入已完成事项或者已经提示过就不再提示了
            if (itemArray[i].complete || itemArray[i].isNotice) continue;

            var finallyT = new Date(itemArray[i].time).getTime();

            // 当前时间与提示时间进行对比
            if (curTime > finallyT){
                // 播放音频
                $("audio").get(0).play();

                // 设置为已提示
                itemArray[i].isNotice = true;

                // 存入本地
                store.set("itemArray",itemArray);
            }
        }
    },1000);
});