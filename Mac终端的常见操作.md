### Mac终端的常见操作
##### 基本命令
- 列出文件
	- ls 默认列出当前目录下文件信息
		- ls -w 显示中文
		- ls -l 详细信息
		- ls -a 包括隐藏文件
	- cd 进入到具体的目录
	- pwd 显示当前文件路径
	- ll 显示当前文件下有多少文件

- 文件夹操作
	- mkdir fileName    创建一个文件
	- rmdir fileName		删除一个文件
 
- txt文本创建
	- 方式一
		- 打开Mac中文本编辑软件
		- 按下command + shift + T
		- command + s 保存
 
 	- 方式二
 		- 打开terminal
 		- cd到你需要创建文本的目录下
 		
 		```js
 		1.sudo vi fileName.txt
		2.按下enter,再按任意键开始输入文本内容
		3.按下esc键,光标会调到insert,也就是terminal的最下面
		4.这个时候输入:wq即可保存
 		```
 		
#### 创建文本
- touch fileName.txt  创建文本
- open fileName.txt	 打开文本
- mkdir direction   创建文件夹
- rmdir direction	删除文件夹

- cat fileName 查看文本内容

#### 其他
- macOS -> 10.12 之后没有了打开任何来源的按钮
	- `sudo spctl --master-disable`