## Canvas基本API
#### 1.canvas的使用(重点)
- 获取canvas标签
- 获取canvas标签的上下文(getContext("2d"))
	- 如果是3d,那么参数为"webgl";

```js
// 1.获取canvas标签
var canvas = document.querySelector("canvas");

// 2.获取canvas的图形上下文
// 如果是获取3D,那么参数传入的是webgl
var ctx = canvas.getContext("2d");

// 需求 -> 画一条直线
// 3.先将画笔移动到其中一点
ctx.moveTo(x1,y1);

// 4.再将画笔移动到另外一点
ctx.lineTo(x2,y2);

// 5.设置线条样式
// 可以放入渐变对象,啥的-- 当然颜色是肯定可以放的
ctx.strokeStyle = "";
ctx.fillStyle = "";
ctx.lineWidth = 16;
ctx.lineCap = "round";

// 6.绘制路径
ctx.stroke();
ctx.fill();

// ctx.closePath() -> 闭合路径
```

#### 矩形 | 圆弧 | 文字 | 图片(重点)

```js
/* 矩形 */
/**
 * @ param x 矩形左上角坐标x值
 * @ param y 矩形左上角坐标y值
 * @ param width 矩形宽度
 * @ param height 矩形高度
 */
ctx.rect(x,y,width,height);

// 直接绘出矩形 -> 不需要调用stroke()
ctx.strokeRect(x,y,width,height);


/* 圆弧 */
/**
 * @ param x 圆心x值
 * @ param y 圆心y值
 * @ param r 半径
 * @ param beginAngle 起始弧度
 * @ param endAngle 结束弧度
 * @ param clockWise 是否逆时针,默认false
 */
ctx.arc(x,y,r,beginAngle,endAngle,clockWise)


/* 文字 */
ctx.strokeText("哈哈",x,y) // 空心文字
ctx.fillText("哈哈",x,y) // 实心文字

// 文字样式
// 必须连同字体一起传入
ctx.font = "20 '微软雅黑'";
ctx.textAlign = "end | begin | left | right";
ctx.shadowBlur = 10; // 阴影模糊度
ctx.shadowOffsetX = 3; // 字体x轴的偏移量
ctx.shadowOffsetY = 3; // 字体y轴的偏移量
ctx.shadowColor = "red"; // 字体颜色 
```

#### 图片(重点)

```js
/**
 * @ param img 需要绘制的图片
 * @ param x 图片需要绘制canvas上的x值
 * @ param y 图片需要绘制到canvas上的y值
 */
ctx.drawImage(img,x,y);

/**
 * @ param width 图片需要绘制canvas的宽度
 * @ param height 图片需要绘制到canvas的高度
 */
ctx.drawImage(img,x,y,width,height);


/**
 * @ param x0 需要截取图片的x值
 * @ param y0 需要截取图片的y值
 * @ param width0 需要截取图片的宽度
 * @ param height0 需要截取图片的高度
 * @ param x1 图片需要绘制canvas的x值
 * @ param y1 图片需要绘制到canvas的y值
 * @ param width1 图片需要绘制canvas的宽度
 * @ param height1 图片需要绘制canvas的宽度
 */
ctx.drawImage(img,x0,y0,width0,height0,x1,y1,width1,height1);
```

#### 画布绘制画布(重点)
- 在内存中创建一个canvas标签,在内存中先绘制绘制好路径,并渲染到canvas上
- 通过另外一个canvas标签的ctx(上下文)drawImage(canvas,x,y);
- 将在内存中绘制好的canvas内容画到了需要展示的canvas的山下文中
- 只需要在浏览器中渲染一次,提升性能

##### 注意点 : 参数一传入的是canvas,而不是上下文

```js
// 假设ctx1已经在内存绘制了很复杂的图形了
var ctx1 = canvas1.getContext("2d");
ctx1.strokeRect(0,0,100,200);

// 将绘制好的canvas1绘制到另外一个山下文上
ctx2.drawImage(canvas1,0,0);
```

#### 将上下文转换为base64编码保存(重点)

```js
var data64 = canvas.toDataURL(ctx);

// 使用base64编码
// 将编码设置为img标签的src属性即可
var img = new Image();
img.src = data64;
```

#### Canvas的合成属性(了解)
- `ctx.globalCompositeOperation = ""`
- 取值
	  - 1.`source-over`:这是默认值，他表示绘制的图形将画在现有画布之上
     - 2.`destination-over`:目标在源之上
     - 3.`source-atop`:源在目标上,绘制与目标重叠的区域的源,不重叠的区域透明
     - 4.`destination-atop`:目标在源上,绘制与源重叠区域的目标,不重叠的区域透明
     - 5.`source-in`:只绘制源,绘制与目标重叠区域的源,其他的都是透明的
     - 6.`destination-in`:只绘制目标,绘制与源重叠区域的目标,其他的都是透明的
     - 7.`source-out`:只绘制源,绘制与目标不重叠区域的源,其他的都是透明的
     - 8.`destination-out`:只绘制目标,绘制与源不重叠区域的目标,其他的都是透明的

    
#### Canvas的其他API(了解)

```js
// 创建线性渐变对象
var grd = ctx.createLinearGradient(200,200,400,300);
grd.addColorStop(0,'red');
grd.addColorStop(0.4,'blue');
grd.addColorStop(0.8,'yellow');
grd.addColorStop(1,'pink');
// 重点:把渐变对象赋值给填充的样式
ctx.fillStyle = grd;
ctx.fillRect(200,200,200,100);
```

```js
// 创建径向渐变对象
var rlg = ctx.createRadialGradient(300,300,0,300,300,100);
// 添加渐变的颜色
rlg.addColorStop(0,'red');
rlg.addColorStop(0.4,'blue');
rlg.addColorStop(0.8,'yellow');
rlg.addColorStop(1,'pink');

ctx.arc(300,300,100,0,2*Math.PI);
// 重点:把渐变对象赋值给填充的样式
ctx.fillStyle = rlg;
ctx.fill();
```

```js
// 4.背景图
var image = new Image();
image.src = 'images/bg.jpg';
// 图片加载完毕后
image.onload = function () {
    // 创建背景对象
    var pa = ctx.createPattern(image,'repeat');
    // 把背景对象设置为填充的样式
    ctx.fillStyle = pa;
    ctx.fillRect(200,200,400,200);
}
```


#### 上下文的变化(重点)
- `context.translate(x,y)`
- `context.rotate(30 * Math.PI / 180)` -> 接受的是弧度
- `context.scale(1.2,1.2)`

	- 注意点 : 对上下文有变化操作之后默认会开启一条新的路径`beginPath`

#### 绘制环境保存与还原(重点)
- `ctx.save()`保存当前上下文
- `ctx.restore()`恢复到最近保存的一个上下文

- 良好的习惯
	- 在绘制一个新的路径之前需要做以下操作
		- ctx.save();
		- ctx.beginPath();
		- 在这里做绘制操作
		- ctx.restore();