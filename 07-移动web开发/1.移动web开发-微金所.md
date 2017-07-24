# wei-jin-suo
use bootstrap build wei-jin-suo demo..

## 1.搭建Bootstrap页面骨架及项目结构

```
├ /wei-jin-suo/ ················· 我们所在目录
└┬ /js/ ························· 我们自己的js文件
 ├ /css/ ························ 我们自己的css文件
 ├ /img/ ························ 使用到的图片文件
 ├ /font/ ······················· 使用到的字体文件
 ├ /lib/ ························ 从第三方下载回来的库[只用不改]
 ├ /favicon/ ···················· 网站图标
 └ /index.html/ ················· 入口文件
```

### 1.1.预定编码规范
#### 1.1.1.HTML约定
- 在head中引入必要的CSS文件,优先引用第三方的CSS文件,方便我们自己的样式覆盖
- 在body中引入必要的JS文件,优先引用第三方的JS文件,注意JS文件之间的依赖关系,比如`bootstrap`需要依赖`jQuery`,此时需要先引用`jQuery`,再应用`bootstrap`

##### 1.1.2.CSS约定
- 除了公共级别样式,其余样式全部添加`模块前缀`
	- 比如:当前处于`banner`模块,给这个模块最外层添加一个盒子,设置一个`id`或者`class`,所有的子元素都需要通过这个`id`或者`class`开始搜寻
- 尽量使用直接子代选择器,少用间接子代选择器,避免`错杀`

### 1.2.HTML文档结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>我是页面标题</title>
</head>
<body>

</body>
</html>
```
### 1.3.Viewport设置

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
```
> 在html中插入视口的快捷方式 __meta:vp__

### 1.4.浏览器兼容模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```
> 快捷键 __meta:compat__

### 1.5.站点图标(favicon)

```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

link:favicon
```
> 快捷键 __meta:favicon__ 将图片路径放入href中即可

### 1.6.引入相应的第三方文件

```html
<!--导入bootstrap样式-->
<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
<!--再导入自己的样式-->
<link rel="stylesheet" href="css/base.css">
...
<!--bootstrap是一个机遇jQuery的库,所以要先导入jQuery-->
<script src="lib/jquery/jquery-3.2.1.min.js"></script>
<script src="lib/bootstrap/js/bootstrap.js"></script>
<!--最后导入自己的js文件-->
<script src="js/main.js"></script>
```

### 1.7.在我们默认的样式表设置默认字体

```css
body{
  font-family: "Helvetica Neue", 
                Helvetica, 
                Microsoft Yahei, 
                Hiragino Sans GB, 
                WenQuanYi Micro Hei, 
                sans-serif;
}
```

### 1.8.完成页面空结构的划分
> 先划分好页面中的大容器,然后再具体看每一个容器中的具体情况

```html
<body>
	<!-- 头部区域 -->
	<header></header>
	<!-- /头部区域 -->
 	<!-- 广告轮播 -->
	<section></section>
	<!-- /广告轮播 -->
	<!-- 特色介绍 -->
	<section></section>
	<!-- /特色介绍 -->
	<!-- 立即预约 -->
	<section></section>
	<!-- /立即预约 -->
	<!-- 产品推荐 -->
	<section></section>
	<!-- /产品推荐 -->
	<!-- 新闻列表 -->
	<section></section>
	<!-- /新闻列表 -->
	<!-- 合作伙伴 -->
 	<section></section>
 	<!-- /合作伙伴 -->
	<!-- 脚注区域 -->
	<footer></footer>
	<!-- /脚注区域 -->
</body>
```

## 3.构建顶部通栏

```html
	<div class="topbar"></div>
```
### 3.1.container类
- 用于定义一个固定宽度且居中的版心

```html
<div class="topbar">
	<div class="container">
		<!--
			在此处的代码会显示在一个固定宽度且居中的容器中(版心)
			该容器的宽度会随着屏幕宽度变化而变化
		-->
	</div>
</div>
```

### 3.2.栅格系统
- `bootstrap`中定义了一套响应式的网络系统
- 其使用方式就是讲一个容器划分为12列
- 然后通过`col-xx-xx`类名控制每一列的屏占比

#### 3.2.1.row类
- 每一个`container`默认有15px的左右内边距
- `row类的一个作用就是通过左右-15px屏蔽掉这个边距
- 但是内部的`col-xx-xx`是有这个默认的15左右内边距的

```html
<div class="container">
	<div class="row"></div>
</div>
```

#### 3.2.2.col-xx-xx类
- col-xs-[屏占比] : 在超小的屏幕下显示多少分(总共12份)
- col-sm-[屏占比] : 在小屏幕下显示多少份
- col-md-[屏占比] : 在中等屏幕下显示多少份
- col-lg-[屏占比] : 在大屏幕下展示几份
- __xs__ : 超小屏幕(<768px)
- __sm__ : 小屏幕 -> 平板(>=768px)
- __md__ : 中等屏幕 -> 桌面显示器(>=992px)
- __lg__ : 大屏幕 -> 大桌面显示器(>=1200px)

```html
<div class="container">
    <div class="row">
        <div class="col-md-2 text-center">col-md-2</div>
        <div class="col-md-5 text-center">col-md-5</div>
        <div class="col-md-2 text-center">col-md-2</div>
        <div class="col-md-3 text-center">col-md-3</div>
    </div>
</div>
```
> 此处顶部通栏被划分为四列 __text-center__ 的作用是让内部文本居中显示

### 3.3.字体图标

```css
@font-face{
	font-family:"520it";
	url('../font/MiFie-Web-Font.eot') format('embedded-opentype'), 
	url('../font/MiFie-Web-Font.svg') format('svg'), 
	url('../font/MiFie-Web-Font.ttf') format('truetype'), 
	url('../font/MiFie-Web-Font.woff') format('woff');
}

[class*="icon-"],
[class^=" icon-"]{
	/*因为我们通常使用i标签作为字体图标容器,默认斜体,去除斜体*/
	/*注意上面选择器中的空格*/
	/*我们使用的名为520it的字体就是上面@font-face声明的字体*/
	font-family : "520it";
	font-style : normal;
}

i.icon-mobilephone::before{
	content : "\e908";
}
```

```html
<div class="container">
    <div class="row">
		<div class="col-md-2 text-center">
			<i class="icon-mobilephone">
			<span>手机微金所</span>
			/* 👇使用的是bootstrap子代的字体图标 */
			<i class="glyphicon glyphicon-chevron-down"></i>
		</div>
    </div>
</div>
```

#### 字体文件格式
- eot : embedded-opentype
- svg : svg
- ttf : truetype
- woff : woff

### 3.4.hover图片展示

- [http://blog.koalite.com/bbg/]()
- 可以通过界面生成一个新的按钮样式

### 3.6.小屏幕隐藏

```html
<div class="topbar hidden-xs hidden-sm"></div>
```
> 或者

```html
<div class="topbar visible-md visible-lg"></div>
```
- __hidden-xx__ : 在某种屏幕下隐藏
- __visible-xx__ : 在某种屏幕下显示

### 3.7.Bootstrap的扩展
- 通过对`bootstrap`文档对导航条样式的设置发现,其实存在一个类似主题的概念
- `navbar-default` : 默认样式
- `navbar-inverse` : 反转颜色样式
- 所以我们可以通过自定义一套完整的风格
	- navbar-self

```css
// 先将navbar-default的所有样式拷贝过来
// 然后将default替换成自己的样式
// 再对其做出修改,实现自定义样式
navbar-self{
	...
}
```

### 4.轮播图
#### 4.1.Bootstrap JS插件使用
> 对于Bootstrap的JS插件,我们只需要将文档实例中的代码黏贴到我们的代码中,然后做出相应的样式调整

#### 4.1.1.Bootstrap中轮播图插件叫做Carousel`旋转木马`
	- 英  `[,kærə'sel; -'zel]`   美  `['kærə'sɛl]`

#### 4.2.由于轮播图片超宽造成的影响
- 美工为了在不同的屏幕下更好的展示会将图片做的两边非常宽,但是我们大多数情况的页面宽度都无法满足这样的图片宽度
- 而且Bootstrap的样式中默认将图片的width设置为100%;
- 造成图片的缩放
- 想在一个较小的屏幕下展示一个超宽的图片,并让图片居中显示
	- 两种方法
	- 使用背景定位:`background-position:center center`
	- 使用img元素绝对定位:	`position:absolute left:-50% top:-50%`

#### 4.2.1.background的使用
- 将容器的高度固定(410px)
- 将轮播图改为背景显示
- 由于图片的高度可能不是410px
- 所以需要设置css3中的background-size:contian
	- cover : 等比例缩放,当较小边适应容器为止
	- contain : 等比例缩放,当较大边适应容器宽度为止

###### cover

<div style="width: 400px;height: 200px;border:1px dashed #c0c0c0;background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxOWU5ZmNjZDAgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE5ZTlmY2NkMCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS4xIj4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+');background-repeat:no-repeat;background-size: cover;"></div>

###### contain

<div style="width: 400px;height: 200px;border:1px dashed #c0c0c0;background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxOWU5ZmNjZDAgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE5ZTlmY2NkMCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS4xIj4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+');background-repeat:no-repeat;background-size: contain;"></div>

### 4.3.图片响应式
- 目的
	- 各种终端都需要正常显示图片
	- 移动端应该使用更小(体积)的图片
- 实现方式
	- 当缩放到一定宽度时添加img标签(在标签中添加data-sm-image="小图路径",data-bm-image="大图路径")
	- 通过JS监听屏幕resize事件,获取当前屏幕宽度
	- 判断当前屏幕如果小于某个值之后(<768px)
	- 通过自定义属性获取img标签src,并创建img标签追加到标签内容
	- img标签会直接覆盖掉之前设置的背景,当屏幕恢复时empty情况img标签
	
```js
$(window).on("resize",function(){
	// 二选一
	var screenW = window.innerWidth;
	var screenW = $(window).width;
	
	// 记录当前屏幕大小
	var isSmallScreen = screenW < 768;
	
	$('#main_ad > .carousel-inner > .item').each(function(index,item){
	   // 获取当前是否显示小图
		var imgSrc = isSmallScreen ? $(item).data().bmImage : $(item).data().smImage;
		
		if (isSmallScreen){
			// 设置img
			var img = "<img src='" + $(item).data().imageSm + "'>";
			$(item).html(img);
		}else{
			// 设置背景
			$(item).css({
				"background" : "url('+ imgSrc +') center center / cover no-repeat" 
			};
			
			// 可以在这里设置固定高度
			// 但是偏向与在css使用媒体查询来完成
			$(item).height(410);
		}
	}
	// 自动触发一次
}).trigger("resize");
	
```

### 5.5.小图片不使用背景图片的原因
- 小图吐过继续使用背景的话,当屏幕特别小的时候,效果很差(记住,小屏幕就应该是用小图片!!!且使用img标签)
- 

```js
if (isSmallScreen){
	// 设置img
	var img = "<img src='" + $(item).data().imageSm + "'>";
	$(item).html(img);
}
```
- 如果是小图片的话就不需要设置固定410px的高度了
- 让其跟随屏幕缩放就可以了

```css
@media (min-width : 768px){
	#main_ad > .carousel-inner > .item {
		height : 410px
	}
}
```

### 6.1.tooltip插件
- 注意，bootstrap中的tooltip插件必须通过js方式初始化

### 6.2.选项卡标签横向滚动

1. 要给ul加一个容器，这个容器有横向滚动条
2. 动态设置ul的宽度，宽度是根据内容大小决定的
  `width= sum (li.width)`

```
						   ---------------------
							-by codeLitterNewBie
									- 15.7.21 (1)
									- 15.7.22 (2)
									- 15.7.24 (3)
```