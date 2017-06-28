## css三大模块
### 过渡模块
- 过渡模块三要素
	- 有需要过渡的属性
	- 需要告诉系统什么属性需要过渡
	- 需要告诉系统过渡时长是多少
		- 告诉系统的意思就是在需要过渡效果的元素那个中添加transition属性

- 过渡模块属性
	- 过渡属性 transition-property:
	- 过渡时长 transition-during:
	- 过渡速率 transition-timing-function:
	- 过渡延迟 transition-delay:
- 过渡属性连写
	- transition:property during timing-function deley;
	- 只要满足三要素即可,所以后面两个属性可以不写
- 注意点:
	- 过渡模块需要人为手动来触发,这需要结合之前的伪类选择器来实现
	- 多个属性同时需要设置过渡效果时可以将一个完整的transition连写格式以,形式拼接到后面即可
	- 如果需要所有的属性都需要过渡效果,可以简写为transition:all 3s;
- 格式:

```html
div{
	width:50px;
	height:50px;
	background-color:red;
	transition:width 2s, height 2s, background-color 1s;
}

<!--当鼠标悬停在div上时,会产生以下过渡效果-->
div:hover{
	width:100px
	height:200px
	background-color:green;
}
```
### 2D转换模块
- 每一个标签/元素都有transform属性,形变属性
	- 一个transform有三个取值:
		- translate:平移
		- rotate:旋转 单位是deg
		- scale:缩放
- 形变中心点默认为元素中心点,这个中心点是可以修改的
	- transfoem-origin:水平 垂直
	- 这个取值可以是具体像素/%/方位名词
- 旋转默认是以Z轴旋转的,这个旋转轴也是可以修改的
	- translate:rotateX(45deg):指定旋转轴为X轴
	- translate:rotateY(45deg):指定旋转轴为Y轴
- 注意点:
	- translate也是一个属性,因此这个属性也可以添加过渡效果,具体用法与width,height这些属性用法一致
	- 如果同时需要进行多个形变属性,使用空格隔开,之前过渡的时候用逗号,注意区别
	- 2D转换模块会修改坐标系,旋转之后轴就变掉了

```html
div{
	width:50px;
	height:50px;
	background-color:red;
	<!--transition-property:translate;-->
	<!--transition-during:2s;-->
	transition:translate 2s;
}

div:hover{
	translate:rotateX(45deg) translate(200px, 100px) scale(1.2, 0.5);
}
```
#### 透视属性:近大远小
- perspective:设置了这个属性之后会出现近大远小效果
	- 注意点:
		- 这个属性需要设置在需要近大远小元素的父元素上
		- 取值越大越远
		
### 盒子阴影和文字阴影
- 盒子阴影
	- box-shadow:水平偏移 垂直偏移 模糊度 阴影扩展 阴影 颜色 内外阴影;
	- 注意点:
		- 盒子的阴影分为内外阴影, 默认情况下就是外阴影
		- 快速添加阴影只需要编写三个参数即可
		- box-shadow:水平偏移 垂直偏移 模糊度
		- 默认情况阴影颜色与盒子内容颜色一致
- 文字阴影
	- text-shadow:水平偏移 垂直偏移 模糊度 阴影颜色;
		
### 动画模块
- 动画与过渡一样都是给元素添加动画
- 动画不需要手动触发,过渡需要手动触发
- 动画与过渡模块一样都需要三要素才能展示动画效果
	- 动画名称
	- 动画时长
	- 需要做动画的属性是什么
-  动画属性:
	- animation-name:动画名称
	- animation-during:动画时长
	- animation-timing-fuction:动画速率 
		- linear
		- ease
		- ease-in
		- ease-out
		- ease-in-out
	- animation-delay:动画延迟
	- animation-direction:是否需要返回动画
		- normal:默认值,不需要
		- alternate:需要
	- animation-iteration-count:动画次数
		- iteration:迭代
		- 具体数值
		- infinite:无限制
	- animation-play-state:动画状态
		- running:运行
		- paused:暂停
		- 这个属性只能给添加了动画属性的元素设置
	- animation-fill-mode:动画的填充模式
		- 这个属性适用于在通过百分比来创建动画
		- forwards:让动画在结束时保持在最后一针
		- backwards:让动画在等待阶段保持第一针
		- both:等待阶段保持第一针,结束阶段保持最后一针
		
```html
div{
	width:100px;
	height:100px
	background-color:red;
	animation:sport 3s linear 2s infinite alternate;
}
<!--第一种格式常用语变换不多的动画-->
@keyframes sport {
	from{
		margin-left:10px;
	}
	to{
		margin-left:100px;
	}
}
<!--第二种格式如果动画节点,那么可以使用以下格式-->
<!--百分比等比例书写,不然动画不流畅-->
@keyframes sport {
	0%{
		margin-left:10px;
	}
	50%{
		margin-left:100px;
	}
	100%{
		margin-left:200px;
	}
}
```

### 3D转换模块
- 只要给父元素添加一个transform:preserve-3d;就可以让子元素带有3D效果
- 为了让这个3D效果更加明显可以给父元素添加透视属性perspective
- 正方形的注意点
	- 在形变过程中先旋转再平移
	- 旋转角度依次从0-360就可以使得正方形内容不会颠倒
	- 需要变换为长方体,只需要在正方体的基础上,缩放上后下前四个面即可,图片会随着scale属性而缩放
	
	