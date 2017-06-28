### Mac自带的本地服务器的使用
##### 1.打开terminal,开启Apache:

```objc
// 开启Apache
sudo apachectl start

// 重启Apache
sudo apachetl restart

// 关闭apache
sudo apachetl stop
```
##### 2. 点击Finder,然后Command+Shift+G,前往如下路径(mac下Apache服务器的文件路径)
-  `/Library/WebServer/Documents`
![](/Users/W-Q/Pictures/md图片/1728487-09972e4f7db10ed2.png)

	- 回车会提示输入密码，也就是你电脑的密码，[http://127.0.0.1/]()测试一下，成功则如下图：![](/Users/W-Q/Pictures/md图片/1728487-5f39f519a3aa731a.png)
	- 在步骤1中只输入一个[http://127.0.0.1]()其实默认打开的是`index.html.en`(html是一个网页文件)，该文件的内容就是在步骤1中测试时浏览器所显示的内容，下面我会附上`index.html`中的内容。此时如果我在浏览器的网址框输入的是[http://127.0.0.1/PoweredByMacOSX.gif](), 浏览器就便会显示PoweredByMacOSX.gif图片
	- 如果没有正常显示，提示说没有权限时，单击该文件，然后Command+i在末尾设置权限即可。


##### 3.上面提到了html和图片，那么如何使该服务器返回json数据(其他类型同理)呢
- 创建一个纯文本文档test(名字能够随意起)
- 将JSON数据串复制到里面，然后将.txt扩展名去掉
- 保存后将这个文件放到服务器路径下

##### 4、接下来用浏览器访问http://127.0.0.1/test

- 你在浏览器中访问时中文可能会出现乱码，但在项目中请求回来，打印在控制台的是正常的。

- PS:使用过后，记得关闭服务器，要不然会一直消耗你电脑内存，后果你懂的。