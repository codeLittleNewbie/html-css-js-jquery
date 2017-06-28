### JS面向对象day04
#### 1.原型链绘图
- 1.所有的构造函数都是由Function创建出来的
- 2.所有构造函数的.__proto__指向的都是空函数
- 3.空函数的.__proto__指向的是Object的原型对象
- 4.Object的原型对象是由Object创建出来的
- 5.自定义构造函数的原型对象是由Object创建出来的
- 6.系统构造函数的原型对象是由自己创建出来的

####2.静态成员和实例成员和原型成员
- 静态成员 : 构造函数添加的方法和属性
- 实例成员 : 构造函数实例化对象内的方法和属性
- 原型成员 : 构造函数实例化对象.__proto__指向对象的属性和方法

####3.Object的静态成员
- 1.`Object.assign()` : 属性拷贝
    - 参数一 : 需要拷贝的对象
    - 参数二 : 依次被拷贝的对象

- 2.`Object.create()` : 创建一个新对象,并设置设置对象的原型成员
    - 参数 : 新创建对象的原型对象

- 3.`Object.constructor` : 是对象.__proto__指向的原型对象内的属性,这个属性默认指向的是构造函数本身

- 4.`Object.getOwnPropertyDescriptor()` : 获取当前对象属性的描述信息
    - 参数一 : 被获取属性的对象
    - 参数二 : 被获取属性的对象的属性

- 5.`Object.defineProperty()` : 设置当前对象的属性的描述信息
    - 参数一 : 需要设置属性描述信息的对象
    - 参数二 : 需要设置属性描述信息的对象的属性
    - 参数三 : 属性的描述信息
    	- configurable : 可配置的 -> 可否删除属性和犯法
    	- enumerable : 可数的 -> 可否被遍历
    	- writable : 可写的 -> 可否被修改
- 6.`Object.getOwnPropertyNames()` : 获取对象所有实例属性
	- 6.1.for..in : 获取对象的实例属性 + 原型属性
  	- 6.2.hasOwnProperty() : 判断对象是否拥有某一个属性
    	- 即使设置了对象属性的(enumerable : false)也可以被获取出来
	
- 7.`Object.keys` : 获取对象所有实例属性
    - 即使设置了对象属性的(enumerable : false)那么就不可以被获取出来

- 8.`Object.preventExtensions` : 设置对象不可扩展属状态-> 不能添加新属性和方法

- 9.`Object.seal` : 设置对象密封状态 -> 不能添加和删除新属性和方法

- 10.`Object.freeze` : 设置对象冻结状态 -> 除了能够遍历属性,什么都不能做

- 11.`Object.isExtensible` : 判断对象是否处于不可扩展状态

- 12.`Object.sealed` : 判断对象是否处于密封状态

- 13.`Object.frozen` : 判断对象是否处于密封状态

#### 4.Function构造函数的使用
- 定义
- 表达式
   - 命名构造函数
   - 匿名构造函数
- Function构造函数
  - Function构造函数只能传递string
  - 一个参数为函数体
  - 多个参数,最后一个参数为函数体

#### 5.Function构造函数过长问题
- JS模板
   - `<script type="text/template">...<script>`

#### 6.隐藏参数(arguments,this)length
- arguments是一个类似数组的特殊的函数(arguments)
    - 系统会默认将函数传入的实参赋值给arguments
    - arguments内有一个callee属性,默认指向该函数,常用语递归,调用
      - 递归 : 自己调用自己,且有返回值
- this
    - 作为对象调用方法是 : this指向的方法调用者(该对象)
    - 作为普通函数调用 : this指向window
    - 作为构造函数中调用 : this指向新创建出来的对象
    - call和apply : this指向第一参数
  
#### 7.callee 和 caller
- callee : arguments内有一个callee属性,默认指向该函数,常用语递归,调用
     - 递归 : 自己调用自己,且有返回值
- caller : Function的属性,只有在函数调用函数时,这个属性才有值,且指向调用函数的那个函数本身
     - 语法 : 函数名.caller

#### 8.Function小应用(数组去重和求最大值)
- 数组去重 :
     - 1.创建一个空数组
     - 2.遍历arguments内属性
     - 3.判断当前属性在数组中是否已经存在(arr.indexOf() == -1)
     - 4.将属性添加到数组中
     - 5.返回数组
- 求最大值
     - 1.创建一个变量max赋值为arguments[0]
     - 2.遍历arguments内属性
     - 3.判断当前属性是否大于max
     - 4.如果大于,那么max = arguments[i]
     - 5.返回max
         
#### 9.this丢失
- this丢失 : 通过不同方式调用时,函数内的this指向发生了改变
     - 解决this丢失(通过即时调用函数)
     
   ```js
   // 老师做法
   var a = (function(document){
               return function(){
                 return document.apply(document,arguments)
                       }
                 })(document.getElementById)
   a("box");
     
                  
   // 我自己的做法
   function getDiv(id){
           return (function(func){
              return func.call(document,id);
                   })(document.getElementById)
               }
    getDiv("box");
    
       
#### 10.eval简单介绍
- eval :
  - 可以将JSON转为对象,也可以将对象转为JSON
  - eval参数必须是表达式才能正确的转换
  - 但是,由于JS是词法作用域,在编写代码的时候已经确定了变量的作用于,但是eval函数会修改掉变量作用域

  ```js
      var a = 3;
      eval("var a = 4");
      console.log(a) // 4
  ```
- eval与Function的区别
   - eval不需要调用
   - Function需要调用
   - 都可以将JSON转换为JS代码
   - eval可以将JS代码转化为JSON

#### 11.Object和Function的关系
- 都是对方的实例对象
- 所有的对象都是Object创建出来的
 
#### 12.with的简单实用
- with : 可以将对象作用域引申到{}中,减少代码量
  - 对象内部存在的属性可以省略前缀修改
  - 对象内部不存在的属性不可以省略前缀添加
  - this指向的是window
  - 严格模式下with不能使用
   
- 使用即时调用函数来实现with效果

```js
var div = document.getElementById("box");
   (function(t){
     t.background = "red";
     t.width = "100px";
     t.height = "100px";
    })(div.style)
```
#### 11.私有变量和函数
- 私有变量和函数 : 在构造函数内部新创建出来的对象和方法
- 特权函数 : 在构造函数实例化对象中可以范文到私有变量和函数的方法