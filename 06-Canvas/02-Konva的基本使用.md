## Konva基本API
#### Konva的基本介绍
- Konva封装canvas之后推出了一个舞台的概念
- 整个视图可以看做是一个大的舞台stage
- 舞台下面可以绘制很多个层layer
- layer下面可以有很多的组group
- group下面可以有很多的图形

#### (重点)
```js
// 第一步创建舞台
var stage = new Konva.Stage({
	// 盛装着舞台的容器
	container : "container",
	width : innerWidth,
	height : innerHeight
})

// 第二步创建图层
var layer = new Konva.Layer();
stage.add(layer);

// 第三步,可以创建组,可以直接创建图形
// 将图形添加到图层上

// 第四步,绘制图层
layer.draw();


    			Stage(舞台)                  |           +------+------+           |             |         Layer(图层)    Layer(图层)           |             |     +-----+-----+     Shape(形状)     |           |   Group(组)    Group(组)     |           |     +       +---+---+     |       |       |  Shape   Group    Shape             |             +             |           Shape
```

#### 1.Konva面向对象进度条
- 先绘制一个内矩形,再绘制一个外边框
- 通过动画让进度条加载

```js
// 将进度条封装成一个对象,外部创建对象调用绘制方法即可
// 我们可以使用创建类的形式来使用
// 使用simplyInheritance 简单继承
function ProgramBar(option){
	this._init(option);
}
ProgramBar.prototype = {
	_init : function (option){
		// 抽取需要使用到的常量
		option = option || {};
		option.x = option.x || 0;
		option.y = option.y || 0;
		option.width = option.width || 0;
		option.height = option.height || 0;
		
		// 创建一个组
		// 组的x,y值可以设置也可以不设置
		// 设置之后里面的子元素的子元素坐标基于设置的这个值发送改变
		var group =  new Konva.Group({
			x : 0,
			y : 0
		})
		
		// 绘制内矩形
		// 如果忘记了可以点击去查看需要传入的参数
		// 但是我一般不会忘记,那样子太low了
		var innerRect = new Konva.Rect({
			x : option.x,
			y : option.y,
			width : opiton.width,
			height : option.height,
			cornerRadius : 10,
			fill : "pink"
		})
		
		// 将演员添加到组上
		group.add(innerRect);
		
		// 外矩形就不绘制了
		....
		
		// 做动画使用tween || 后面通过to将其封装了
		group.to({
			// 需要改变的属性
			onFinish : function (){
				// 动画结束之后回来到这个方法
			}
		});
	}
}
```

#### 2.twwen对象(重点)
- 英文意思:两者之间 英 [twiːn] 美 [twin]
- tween是控制Konva对象进行动画的核心对象
- tween可以控制所有数字类型的属性进行动画处理
	- `x,y,rotation`
	- `width,height,radius`
	- `strokeWidth,opacity,scaleX`
- 注意点 : 参数node -> 放置的是Konva对象,但是这个对象必须是要放入层中的对象 

```js
// 创建tween对象
var tween = new Konva.Tween({
	node : rect,
	x : 100,
	opacity : .3,
	stokeWidth : 4,
	radius : 35,
	easing : Konva.Easings.StrongEaseIn,
	// 动画持续时长
	duration : 3,
	// 动画结束之后回来到这个方法
	onFinish : function (){
		console.log("动画结束啦");
	}
})
```
##### tween的控制方法
- `tween.play()` 开始动画
- `tween.pause()` 暂停动画
- `tween.reverse()` 动画逆播放
- `tween.reset()` 重置动画
- `tween.finish()` 立即结束动画


##### 动画to的使用
- to就是对tween的一层封装,简单使用
- Konva对象都可以使用to方法,组也是可以的

```js
rect.to({
	x : 100,
	duration : 3,
	onFinish : function (){}
})
```

#### 3.Animation(重点)
- Animation动画,实际上是浏览器通知开发者进行绘制,并提供当前的时间

```js
var animation = new Konva.Animation(function(frame){
	// 系统提供的frame有三个属性可以使用
	var timeDiff = frame.timeDiff; // 间隔上一帧时间
	var time = frame.time; // 动画执行的总时间
	var frameRate = frame.frameRate; // 帧率 (1000/间隔时间)
	
	// 外部传入单位时间需要绘制的帧数 / 帧率 = 每帧需要绘制的角度
	
	
	// 传入需要做动画的图层
},layer)

// 开始动画
animation.start();

// 结束动画
animation.stop();
```

#### 4.循环播放动画的实现

```js
var loopTween = new Konva.Tween({
	x : 100,
	onFinish : function (){
		// 先重置动画
		this.reset();
		// 再重新开启动画
		this.play();
	}
})
```


#### 5.循环且往返动画实现

```js
// 使用yoyo实现 -> to | tween都可以使用
var loopTween = new Konva.Tween({
	x : 100,
	yoyo : true
})

rect.to({
	x : 100,
	yoyo : true
})
```

#### 6.Konva的事件(重要)
- 使用on来绑定事件的方式与jQuery一致,但是默认点击konva对象是才会触发
- 如果需要点击舞台中的任何位置都触发对应设置,那么需要在事件之前加上`content`

```js
// 绑定click事件
stage.on("click",function(){
	console.log("只有点击了舞台上的konva对象才会触发点击事件")
})

// 绑定contentClick事件
stage.on("onClick",function(){
	console.log("点击舞台任何位置都会触发点击事件")
})
```
- `stage.off("click");`解绑事件
- `stage.fire("click")`触发事件
- `event.cancleBubble = true`取消事件冒泡

#### 7.Konva选择器

- `group.find("#id")` `ID选择器`返回一个数组,元素带有id属性为id 
	- 注意点 : 虽然返回的是一个数组,但是这个数组内部只会有一个元素
	- 讲道理这是优点坑爹的!
	- 使用`find()`方法返回的就是一个数组,不管你传入的是不是id
- `group.find(".name")` `name选择器`
	- 绑定的不是`class`,而是`name`
- `group.find("Rect")` `type选择器`

- `group.findOne(".name")`
	- 获取一个

#### 8.konva常用图形
- `Rect`
- `Circle`
- `Ring`
- `wedge`
- `Text`
- `Line`
	- `points:[10,0,10,10]`
