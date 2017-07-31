# ReactNative美团项目（二）

## 1.个人中心登录

#### 1.完善登录界面布局：

布局：

```
    render(){
        return(
            <View style={{flex: 1}}>
                <OrderBar leftName='登录' hasArrow={true} navigator={this.props.navigator}></OrderBar>
                
                
                <View style={styles.container}>
                    {/*logo*/}
                    <Image source={{uri:'header_icon'}} style={styles.ImageStyle}></Image>
                    {/*输入用户名和密码*/}
                    <View style={{marginTop:20}}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder='输入用户名'
                            style={styles.text1Input}>
                        </TextInput>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder='输入密码'
                            secureTextEntry={true}
                            style={styles.text1Input}>
                        </TextInput>
                    </View>

                    {/*登录按钮*/}
                    <View>
                        <Text style={styles.loginStyle}>登录</Text>
                    </View>

                    {/*设计*/}
                    <View style={styles.viewSettingStyle}>
                        <Text style={styles.textOutLogin} >无法登录</Text>
                        <Text style={[styles.textOutLogin,{textAlign:'right'}]} >新用户</Text>
                    </View>

                    {/*其它登录方式*/}
                    <View style={styles.viewOtherStyle}>
                        <Text>其他登录方式</Text>
                        <Image source={{uri:'share_ic_base_share_qq'}} style={styles.loginImage}></Image>
                        <Image source={{uri:'share_ic_base_share_sina_weibo'}} style={styles.loginImage}></Image>
                        <Image source={{uri:'share_ic_base_share_weixin'}} style={styles.loginImage}></Image>
                    </View>
                </View>
                
                
                
            </View>
        )
    }
```

样式：

```
const styles = StyleSheet.create({

    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center'
    },
    ImageStyle: {
        width: 90,
        height: 90,
        marginTop:40,
        borderRadius:50,
    },
    text1Input: {
        borderWidth: 0,
        borderColor: 'gray',
        width: windowWidth - 20,
        height: 30,
        padding: 0,
        marginTop: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius:6,
    },
    loginStyle: {
        width: windowWidth - 20,
        height: 30,
        borderWidth: 0,
        backgroundColor: '#49A0F8',
        marginTop:20,
        borderRadius:5,
        color:'white',
        fontSize:14,
        textAlign:'center',
        paddingTop:6,
    },
    viewSettingStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        width:windowWidth-20
    },
    textOutLogin:{
        color:'#49A0F8',
        flex:1,
    },
    viewOtherStyle:{
        width:windowWidth-20,
        height:40,
        position:'absolute',
        bottom:20,
        //主轴方向为水平
        flexDirection:'row',
        //它里面的内容垂直居中
        alignItems:'center'
    },
    loginImage: {
        width: 35,
        height: 35,
        marginLeft: 8,
    },
    
    
});
```

执行效果：

![](51-1.png)





#### 5.完善点击登录界面的跳转

##### 1.解决登录卡顿的问题

![](52-1.png)

##### 2.给登录界面添加背景

![](53-1.png)

##### 3.修改导航器Navigator的写法

在index.android.js中添加Navigator

![](54-1.png)

4.修改MaimPage界面的导航器写法

![](55-1.png)

修改后的效果：

![](56-1.png)



## 2.实现登录功能

### 1.获取用户名和密码

使用oChangeText函数获取

![](1.png)

把获取的信息保存到状态机中

![](2.png)

点击登录的时候从状机获取用信息

![](3.png)

### 2.点击登录

http://47.93.30.78:8080/MeiTuan/login

参数：username=xiaomage&password=1123456

```
fetch(http://47.93.30.78:8080/MeiTuan/login?username=xiaomage&password=1123456, {
  
})
.then( (response)=>response.json()  )
.then( (responseJson)=> {
  console.log(responseJson);
})
```

![](4.png)

### 3.提示登录结果

安装**react-native-root-toast**

![](5.png)

引入react-native-root-toast

![](6.png)

使用Toast

```
   /**
     * 冒吐司
     * @param str
     */
    showToast(str){
        // Add a Toast on screen.
        let toast = Toast.show(str, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }
```

![](7.png)

执行效果：

![](8.png)

### 4.数据回传

在LoginPage界面回传数据到MinePage个人中心界面

```
if(this.props.getUser){
  this.props.getUser(responseJson);
}
```

![](9.png)



### 5.个人中心页接收回传数据

在MinePage界面接收回传的数据   ,   并刷新界面

![](10.png)

````
//获取回传的数据user
getUser(user){
  //注意这里要定义全局变量中的_this
  _this.setState({
     //刷新界面的状态机
  })
},


//定义全局变量_this
constructor(props){
  super(props);
  _this=this;
}
````

执行效果：

![](11.png)

### 6.禁止重复登录

在状态机中定义一个userId属性默认值等于‘ ’

![](12.png)



## 3.实现逛一逛功能

### 1.WebView介绍

```
 <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
```

 **automaticallyAdjustContentInsets** 布尔型

当为真时，当滚动视图到达内容底部时，反弹，如果内容比滚动视图是大，那么滚动视图沿着轴滚动方向反弹。当为假时，禁用所有反弹，即使 `alwaysBounce *` 道具为真。默认值为 true。

**source {uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}, number** [#](http://reactnative.cn/docs/0.45/webview.html#source)

在WebView中载入一段静态的html代码或是一个url（还可以附带一些header选项）。

**android  domStorageEnabled  bool** 

仅限Android平台。指定是否开启DOM本地存储。

**ios decelerationRate ScrollView.propTypes.decelerationRate** 

指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如`"normal"`和`"fast"`，分别对应`UIScrollViewDecelerationRateNormal` 和`UIScrollViewDecelerationRateFast`。

- Normal（正常速度）: 0.998
- Fast（较快速度）: 0.9 (iOS WebView的默认值)

**android  javaScriptEnabled  bool** [#](http://reactnative.cn/docs/0.45/webview.html#javascriptenabled)

仅限Android平台。iOS平台JavaScript是默认开启的。

**scalesPageToFit   bool** 

设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。

**startInLoadingState   bool** 

强制WebView在第一次加载时先显示loading视图。默认为true。

### 2.集成WebView代码：

```
http://i.meituan.com/topic/scene/1?cevent=imt%2Fhomepage%2Fhomeguide4
```

![](13.png)

执行效果：

![](14.png)



## 4.首页的功能的实现

### 1.进行网络请求获取数据

```
http://47.93.30.78:8080/MeiTuan/home
```

![](15.png)

按Ctrl+M查看获取到的数据：

![](16.png)



### 2.把数据存到状态机State中

#### 1.定义状态机

![](17.png)

#### 2.把数据存到状态机State

![](18.png)

### 3.实现头部分类展示

#### 1.添加头部布局

```
{/*实现头部,并把categorys数据传过去 */}
<HomeTop categorys={this.state.categorys}></HomeTop>
```

![](19.png)

#### 2.实现HomeTop组件

里面有一个横向的 ScrollView  ,

```
horizontal={true} // 水平方向滚动
showsHorizontalScrollIndicator={false} //隐藏横向滚动的指示器
pagingEnabled={true}//实现水平上分页
```

![](20.png)

执行效果：

![](21.png)



#### 3.给HomePage每一页添加数据

![](22.png)

页面渲染函数：

this.props.categorys 接收传过来的categorys数据,  如果接收到的数据为空直接返回

![](23.png)

上面对应的样式：

![](24.png)

其它的一些属性：

![](25.png)

执行的效果：

![](26.png)



#### 4.添加底部的指示器

![](27.png)

底部指示器的函数:

```
var color=this.state.currentPage==i?'#06C1AE':'#dddddd';
```

![](28.png)

底部指示器的样式：

![](29.png)

执行效果：

![](30.png)



#### 5.指示器关联页面的滑动

监听页面的滑动，并算出滑动到第几页：

```
  //监听页面滚动，当页面滚动结束时调用
  onMomentumScrollEnd={ (e)=>this.pageEnd(e) }

 //获取到scrollView偏移左边的距离：
 var currentX=event.nativeEvent.contentOffset.x;
 //计算出当前的页面
 var page=Math.round(currentX/windowWidth);
```

![](31.png)

### 4.实现中间内容展示（上）

#### 1.引用中间内容的组件

![](32.png)

#### 2.中间内容组件的实现

```
//接收上一个组件传过来的数据items，如果为空直接返回
var items= this.props.items;
        if(items.length<=0)
            return;
                    
/*每一个item右边的分界线,如果是最后一个Item就给#FFFFFF白色*/
var color= (i== (items.length-1) )?'#FFFFFF':'#dddddd';
```

![](33.png)

改布局对应的样式：

![](34.png)

执行的效果：

![](35.png)

#### 3.添加点击事件

![](50.png)



### 5.实现中间内容展示（下）

![](36.png)

执行的效果：

![](37.png)





### 6.实现猜你喜欢列表展示

#### 1.引入猜你喜欢底部的布局

![](38.png)

#### 2.底部布局组件的定义

![](39.png)

```
   /***状态机*/
    constructor(props){
        super(props);
        //定义数据源
        var ds=new ListView.DataSource( {rowHasChanged:(r1,r2)=>r1!==r2 } );
        this.state={
            dataSource:ds,
        }
    }
    
    render() {
        /**如果没有数据，直接返回空view*/
        if(this.props.goods.length<=0)
            return(
             <View></View>
            )
        // alert(this.props.goods[0].storeName);
        /**如果有数据就重置一下状态机 , 目的是更新数据源*/
        this.state={
            dataSource:this.state.dataSource.cloneWithRows(this.props.goods),
        }
        /**如果有数据*/
        return (
            <ListView
                //使用数据源
                dataSource={this.state.dataSource}
                //渲染每一行（rowData 是每一行的数据）
                renderRow={(rowData) => this.renderRows(rowData)}
                //禁止滑动
                scrollEnabled={true}
            >
            </ListView>
        )
    }
```

##### 1.渲染每一行

![](40.png)

组件对应的样式

![](41.png)

执行效果：

![](42.png)

#### 3.完善组件中的布局

##### **1.修改布局样式**

![](44.png)

执行效果：

![](43.png)

##### **2.修改布局中文字**

![](45.png)

##### **3.修改布局中的文字样式：**

![](46.png)

注意文字中使用了：

paddingTop属性来对齐

color:   #9d9d9d         #06C1AE

![](47.png)

执行效果：

![](48.png)

##### **4.处理ListView的点击事件**

![](49.png)













