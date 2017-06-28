## css属性
#### 文字属性
- font-style:文字的样式
	- normal -> 快捷键:fsn
	- itailc -> 快捷键:fsi
- font-width:文字粗细
	- bold(粗体) -> 快捷键:fwb
	- bolder(比粗体还粗) -> 快捷键:fwb
	- lighter(细线):默认就是细线 -> 快捷键:fwl
	- 具体数值:多少px -> 快捷键:fw20
- font-size:文字大小
	- 任意数值px
	- font-size:20px; -> 快捷键:fs20
- font-family:文字字体
	- 如果是中文需要添加""
	- font-family:"微软雅黑";
	- 注意点:
		- 可以设置备选字体 font-family:"微软雅黑","宋体";
		- 如果需要单独设置中文和英文字体,那么需要吧英文字体放在前面
		- 企业开发中常用的字体
			- 中文:宋体/黑体/微软雅黑
			- 英文:"Times New Roman"/"Arial"
		- 注意点:
			- 英文字体不一定就是英文字体
			- 宋体:SimSun
			- 黑体:SimHei
			- 微软雅黑:Microsoft YaHei
		- 缩写:font:style width size family
		- 例如:font:italic bolder 12px SimSun
			- 这个缩写格式用的不多,但是还是要了解一下
			- size family一定要写,style width可以不写
#### 文本属性
- text-decoration:文本装饰属性
	- none:什么都没有,通常用于去除超链接的下划线
	- underline:下划线
	- line-through:删除线
	- overline:上划线
- text-align:文本水平对齐属性
	- left:左对齐
	- right:右对齐
	- center:居中
- text-indent:文本缩进属性
	- 像素px
	- 文字em

#### 文字颜色
- 作用:设置文字颜色
- 格式:
	- rgba:`color:rgba(0,0,0,0.3);`
	- rgb:`color:rgb(0,0,0);`
	- 16进制:`color:#cccccc;`
	- 英文单词:`color:red;`

