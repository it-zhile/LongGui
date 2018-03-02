# 隆归APP开发笔记
> 隆归APP为电商型APP项目，使用 ReactNative 版本为 0.51.0
>
> GitHub：https://github.com/it-zhile/longgui.git



## 初始化项目

- 初始化项目指定 ReactNative 版本为 0.51.0
```
$ react-native init LongGuiApp --verbose --version 0.51.0
```

- 将手机调到 `开发模式` 并启用 `USB调试` ，使用数据线与电脑连接

- cd 项目根目录 LongGuiApp 执行命令 react-native run-android 打包项目到手机上
```
$ react-native run-android
```

- 通过 `摇一摇` 打开 `开发选项菜单` 选择 `Dev setting => Debug Server host & port for device`

- 设置手机和电脑在同一个局域网的 `IP地址` 加 `8081` 端口

- 执行命令 react-native start 或 npm start 启动服务

- 使用 npm start 命令启动服务需在浏览器输入 http://localhost:8081/index.bundle?platform=android 等到能显示 js 说明服务启动完毕。



## 项目结构基础改造

在根目录下新建： `App目录` =>  `assets`、`common`、`components`、`pages` 目录
```json
┌── __tests__		// 测试文件夹，执行命令 “npm test”会调用此文件夹
├── android			// Android的原生开发目录，可以用Android Studio打开进行原生开发。
├── App				/* 项目开发源文件目录 */
│	 ├── assets	    /* 静态资源目录 */
│	 ├── common		/* 通用组件目录 */
│	 ├── components	/* 组件目录 */
│	 ├── pages  	/* 页面组件目录 */
│	 └── index.js	/* 项目入口文件目录 */  
├── ios				// Ios的原生开发目录，可以用Xcode打开进行原生开发。
├── node_modules
├── .babelrc		// Babel的配置文件,可以将ES6代码转为ES5代码
├── .buckconfig		// buck的配置文件是Facebook推出的一款高效率的App项目构建工具。
├── .flowconfig		// Flow是Facebook旗下一个为js进行静态类型检测的检测工具
├── .gitattributes	// git属性文件设定一些项目特殊的属性。
├── .gitignore		// 用来配置git提交需要忽略的文件。
├── .watchmanconfig	// 用于监控bug文件和文件变化，并且可以出发指定的操作。
├── App.js			// 页面根组件
├── app.json		// 配置了name 和 displayName
├── index.js		// Android 和 Ios 入口文件
├── package.json	// 项目所需要的各种模块，以及项目的配置信息
└── yarn.lock		// Yarn是一个由Facebook创建的新JavaScript包管理器
```


## React Native 组件的使用

### View组件(div标签)

> `View`是一个支持Flexbox布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。不论在什么平台上，`View`都会直接对应一个平台的原生视图，无论它是`UIView`、`<div>`还是`android.view.View`。
>
> <https://reactnative.cn/docs/0.51/view.html#content>

简单来说就是相当于 `Flexbox布局` 的 `div标签` 。

### Text组件(文字)

> 一个用于显示文本的React组件，并且它也支持嵌套、样式，以及触摸处理。
>
> <https://reactnative.cn/docs/0.51/text.html#content>

**文字左右垂直居中：**

```
将文字使用 <View> 标签 包裹使用使用此标签的 justifyContent:'center' 与 alignItmes:'center' 让 Text组件 的文字左右垂直居中
```

### TextInput组件(输入框)

> TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。
>
> <https://reactnative.cn/docs/0.51/textinput.html#content>

TextInput 为一个单标签

```
<TextInput
  style={styles.ipt}
  placeholder="请输入您要搜索的内容"
  placeholderTextColor="#ccc"
  underlineColorAndroid="transparent" 
/>
```

#### 属性

- **style** `类型（object）`
  - 样式，本组件继承了所有Text的样式
- **placeholder** `类型（string）` 
  - 默认显示文本，如果没有任何文字输入，会显示此占位字符串。
- **placeholderTextColor**：`类型（string）` 
  - 占位字符串显示的文字颜色
- `android` **underlineColorAndroid** `类型（string）` 
  - 文本框的下划线颜色(译注：如果要去掉文本框的边框，请将此属性设为透明transparent)。

#### 方法

- **isFocused(): boolean** 
  - 返回值表明当前输入框是否获得了焦点。


- **clear()** 
  - 清空输入框的内容。



### Image组件(图片)

> 一个用于显示多种不同类型图片的React组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。详细用法参阅[图片文档](https://reactnative.cn/docs/0.51/images.html)。
>
> <https://reactnative.cn/docs/0.51/image.html#content>

Image图片组件需要给定宽度否则不会显示，常用属性有 source，resizeMode

- **source**：用来设置组件的图片路径
- **resizeMode**：决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小
  - `cover`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。**译注**：这样图片完全覆盖甚至超出容器，容器中不留任何空白。
  - `contain`: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。**译注**：这样图片完全被包裹在容器中，容器中可能留有空白
  - `stretch`: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
  - `repeat`: 重复平铺图片直到填满容器。图片会维持原始尺寸。仅iOS可用。
  - `center`: 居中不拉伸。

**注意：引用本地图片需使用 require() 方法来引入图片路径 source={require('../image/01.jpg')}**



## react-navigation 导航器

> ReactNative中文网：https://reactnative.cn/docs/0.51/navigation.html#content

### 安装导航器

使用 yarn 或者 npm 安装 react-navigation 导航器

```json
$ yarn add react-navigation
$ npm install react-navigation -S
```

### 使用 StackNavigator 与 TabNavigator

在 index.js 程序主入口文件中使用导航器并配置底部导航

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 程序主入口
 * Desc: 在这里做一些全局配置，比如全局 Navigator 配置，全局变量初始化等。
 */
import React, { Component } from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
// 导入导航器
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Constants } from './assets/';
// 导入4个程序主页面
import Home from './pages/Home/Home';
import JieDan from './pages/JieDan/JieDan';
import ShopCart from './pages/ShopCart/ShopCart';
import Mine from './pages/Mine/Mine';

/**
 * StyleSheet.create：创建样式对象
 * Platform.OS：用来判断运行平台是否为 ios
 */
const styles = StyleSheet.create({
  icon:{
    width: Platform.OS === 'ios' ? 30 : 24,
    height: Platform.OS === 'ios' ? 30 : 24,
  }
})

/**
 * TabRouteConfigs：tab导航栏的路由配置
 * Home：每项Tab的路由名称
 * screen：对应的路由页面
 * navigationOptions：对应页面中配置导航选项
 * tabBarLabel：Tab导航栏中显示的标题
 * tabBarIcon：Tab的icon组件，根据 ({focused: boolean, tintColor: string})=>{ return() } 方法来返回一个icon组件
 * focused：为一个布尔值用来判断当前栏选中状态
 * tintColor：用来设置选中时的icon图标颜色
 */
const TabRouteConfigs = {
  Home:{
    screen:Home,
    navigationOptions:{
      tabBarLabel:'首页',
      tabBarIcon:({focused,tintColor})=>(
        <Image 
          source = { focused ? ImgUrls.tabbar_home_active : ImgUrls.tabbar_home }
          style={[styles.icon,{tintColor:tintColor}]}
        />
      ) 
    }
  },
  JieDan:{
    screen:JieDan,
    navigationOptions:{
      tabBarLabel:'截单',
      tabBarIcon:({focused,tintColor})=>(
        <Image 
          source = { focused ? ImgUrls.tabbar_jiedan_active : ImgUrls.tabbar_jiedan }
          style={[styles.icon,{tintColor:tintColor}]}
        />
      )
    }
  },
  ShopCart:{
    screen:ShopCart,
    navigationOptions:{
      tabBarLabel:'购物车',
      tabBarIcon:({focused,tintColor})=>(
        <Image 
          source = { focused ? ImgUrls.tabbar_shopcart_active : ImgUrls.tabbar_shopcart }
          style={[styles.icon,{tintColor:tintColor}]}
        />
      )
    }
  },
  Mine:{
    screen:Mine,
    navigationOptions:{
      tabBarLabel:'我的',
      tabBarIcon:({focused,tintColor})=>(
        <Image 
          source = { focused ? ImgUrls.tabbar_mine_active : ImgUrls.tabbar_mine }
          style={[styles.icon,{tintColor:tintColor}]}
        />
      ) 
    }
  },
}

/**
 * TabNavigatorConfig：Tab 选项卡样式等相关配置
 * initialRouteName：设置初始屏为 home 页面
 * tabBarComponent：tab栏类型为底部tabbar导航
 * tabBarPosition：tab栏定位为底部
 * swipeEnabled：是否可以滑动切换Tab选项卡
 * animationEnabled：点击Tab选项卡切换界面是否需要动画
 * lazy：是否懒加载页面
 * tabBarOptions：Tab栏配置属性
 * activeTintColor：选中的文字颜色
 * labelStyle：选项标签的文本样式
 */
const TabNavigatorConfigs = {
  initialRouteName: 'Home',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor:Colors.app_color,
    labelStyle: {
      fontSize: 12,
    },
  },
}
const Tab = TabNavigator(TabRouteConfigs,TabNavigatorConfigs);

/**
 * StackRouteConfigs：各个页面跳转路由配置
 * Tab：每项Tab的路由名称
 * screen：对应的路由页面
 */
const StackRouteConfigs = {
  Tab: { screen: Tab },
};
/**
 * StackNavigatorConfig：导航器配置
 * headerMode：
 */
const StackNavigatorConfigs = {
  headerMode: 'none',
};
const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs);

export default Navigator;
```

在 `pages` 目录下新建 4个程序的主页面 `Home` 、`JieDan` 、`ShopCart` 、`Mine` ，以 Home 为例：

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
 import React, { Component } from 'react';
 import { StyleSheet, View, Text, Image, } from 'react-native';

 export default class Home extends Component {
   render(){
     return (
       <View>
         <Text> 首页 </Text>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({ })
```



## 创建公用组件 - ImgButton 

> 在 `common` 文件夹下新建 `ImgButton.js` 文件

在项目中经常会使用到可以点击的 Image 图片，我们自己创建一个 ImgButton 来复用

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 可点击的 Image 组件
 * Desc:
 */
import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native';

export default class ImageButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    style={this.props.style}
                    source={this.props.source}
                >
                    {this.props.children}
                </Image>
            </TouchableOpacity>
        )
    }
}
```



## 创建公用组件 - TextButton

> 在 `common` 文件夹下新建 `TextButton.js` 文件

在项目中经常会使用到可以点击的 Text 文字，创建一个 TextButton 来复用

```jsx
/**
 * Creactd by date on 2018/02/28
 * Function: 可点击的 Text 组件
 * Desc:
 */
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default class TextButton extends Component{
  render(){
    return (
      <TouchableOpacity onPress={ this.props.onPress } >
        <Text style={ this.props.style } >{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}
```



## 创建 Home 首页头部

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
// 导入 react 与 Component 用来创建组件
import React, { Component } from 'react';
// 导入 react-native 用来使用 ReactNative 里的内置组件
import { Platfrom, Dimensions, StyleSheet, View, Text, Image, TextInput } from 'react-native';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入公用组件
import { ImgButton, TextButton } from '../../common/';
// 获取屏幕宽度
const {width} = Dimensions.get('window');
/**  创建并返回一个名为 Home 的组件 */
export default class Home extends Component {
  /**
   * constructor(props){}：
   * super(props)：
   * this.state：
   */
  constructor(props) {
    super(props);
    this.state = { };
  }
  /**
   * render(){}：渲染的内容，所有要显示的内容必须放在 render 函数内
   * return()：如果只有一个标签可以不用()，多个标签必需使用否则报错
   * View：相当于 html 里的 div 标签
   */
  render(){
    return (
      <View style={{flex:1,backgroundColor:'pink'}}>
        {/* 头部 */}
        { this.renderHeader() }
      </View>
    )
  }
  /**
   * renderHeader(){ return() } 渲染头部函数
   * Image：图片组件
   *  - source：图片的地址路径，本地图片需使用 require() 方法来引入图片路径 source={require('../image/01.jpg')}
   * ImgButton：自定义可点击的 Image 公用组件
   *  - onPress 类型（function）：点击事件
   * TextInput：输入框组件
   *  - placeholder 类型（string）：默认显示文本，如果没有任何文字输入，会显示此占位字符串。
   *  - placeholderTextColor 类型（string）：占位字符串显示的文字颜色
   *  - underlineColorAndroid 类型（string）：文本框的下划线颜色，如要去掉将此属性设为透明 transparent 
   */
  renderHeader(){
    return(
      <View style={styles.header} >
        <ImgButton onPress={()=>{ this._navigate('Mine') }} source={ ImgUrls.home_touxiang } style={styles.touxiang} />
        <View style={styles.search}>
          <TextInput
            style={styles.ipt}
            placeholder="请输入您要搜索的内容"
            placeholderTextColor="#ccc"
            underlineColorAndroid="transparent" 
          />
          <Image source={ ImgUrls.home_search } style={ styles.iconSearch } /> 
        </View>
        <ImgButton onPress={()=>{ this._navigate('Scanner') }} source={ ImgUrls.home_scanner} style={styles.iconScanner} />
      </View>
    )
  }
  /**
   * 页面跳转事件
   * 通过 this.props.navigation 接收从主入口 index.js 里传递过来的 navigation 属性用来跳转页面
   */
  _navigate(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
}
/**
 * StyleSheet.create({})：创建多个样式对象
 */ 
const styles = StyleSheet.create({ 
  /* 头部样式 */
  header:{
    height: 40,
    backgroundColor: Colors.app_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  touxiang:{
    width: 30,
    height: 30,
    borderRadius: 17,
  },
  search:{
    width: 260,
    height: 26,
    position: 'relative',
  },
  ipt:{
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 0,
    paddingLeft: 24,
  },
  iconSearch:{
    width: 16,
    height: 16,
    tintColor: '#ccc',
    position: 'absolute',
    left: 4,
    top: '50%',
    marginTop: -8,
  },
  iconScanner:{
    width: 24,
    height: 24,
    tintColor: '#fff',
  }
})
```



## react-native-camera 相机插件

> GitHub：https://github.com/react-native-community/react-native-camera

### 安装 react-native-camera

执行命令

```
$ npm install react-native-camera --save
$ react-native link react-native-camera
```

`react-native link react-native-camera` 一股情况下都会自动在Android内部配置相关设置

如果 `link` 失败可以手动配置

### 使用 RNCamera

> GitHub RNCamera示例： <https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md>

只需 `import { RNCamera } from 'react-native-camera'; ` 模块中取出 `<RNCamera/>` 标签即可。

### Android配置相机插件

正常情况下根据上面的步骤就可以直接使用 `react-native-camera` 插件了但是运行项目后会报错

```
undefined is not an object (evaluating 'CameraManager.Aspect')
```

具体是什么原因造成的目前还不清楚，但是通过修改 android 平台里的代码再通过 android studio 重新安装可正常调用相机

- 打开 `android` => `gradle` => `wrapper` =>  `gradle-wrapper.properties文件` 修改 `gradle` 版本号为 `4.1`

```json
distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip
```

- 打开 `android` => `build.gradle文件` 添加并修改 `gradle` 版本号：

```json
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            url "$rootDir/../node_modules/react-native/android"
        }
        maven { 
            url "https://jitpack.io" 
        }
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.0' // 修改为 3.0.0

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        maven { 
            url "https://jitpack.io" 
        }
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
}

```

- 打开 `android` => `app` => `build.gradle文件` 修改：

```json
android {
    compileSdkVersion 27
    buildToolsVersion "27.0.2" // 修改为 27.0.2

    defaultConfig {
        applicationId "com.longguiapp"
        minSdkVersion 16
        targetSdkVersion 27   // 修改为 27
        versionCode 1
    ······
}
······
dependencies {
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:27.+" // 修改为 27.+
    compile "com.facebook.react:react-native:+"  // From node_modules
}
```

- 打开 `android` => `app` => `src` => `main` => `AndroidManifest.xml文件` 修改 `android:targetSdkVersion` 为 `"27"`

```xml
<uses-sdk
    android:minSdkVersion="16"
    android:targetSdkVersion="27" /> // 修改为27
```

### 自定义扫码公共组件

> 在 `common` 文件夹下新建 `Scanner.js` 文件

使用 react-native-camera 相机插件自定义一个扫码组件

```jsx
/**
 * Created by date on 2018/02/28
 * Function: 扫码组件
 * Desc: 使用 react-native-camera 插件创建自定义扫码组件
 */
import React,{ Component } from 'react';
import { View, Text, } from 'react-native';

// import { RNCamera } from 'react-native-camera';

export default class Scanner extends Component{
  render(){
    return(
      <View>
        <Text>扫码组件</Text>
      </View>
    )
  }
}
```



## react-native-swiper 轮播图插件

> GitHub：https://github.com/leecade/react-native-swiper

### 安装 react-native-swiper

```
$ npm i react-native-swiper --save
```

### 使用 react-native-swiper

在 Home 首页使用 react-native-swiper 创建轮播图

**注意：**使用 **轮播图组件** 时如果 **导航器** 开启了 **滑动切换** 与 **切换动画** 轮播图内的 **图片会不显示**

```jsx
// 导入轮播图插件
import Swiper from 'react-native-swiper';
······
export default class Home extends Component {
  render(){
    return (
      <View style={{flex:1,backgroundColor:'pink'}}>
        {/* 头部 */}
        { this.renderHeader() }
        {/* 轮播图 */}
        { this.renderSwiper() }
      </View>
    )
  }
  ······
  /**
   * renderSwiper(){ return } 渲染轮播图函数
   * Swiper：轮播图组件
   *  - height 类型（number）：组件高度
   *  - loop 类型（boole）：如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
   *  - autoplay 类型（boole）：自动轮播
   *  - autoplayTimeout 类型（number）:每隔4秒切换
   *  - horizontal 类型（number）：轮播图的滑动方向，水平方向，为false可设置为竖直方向
   *  - paginationStyle 类型（object）：小圆点整体的样式
   *  - showsButtons 类型（boole）：左右控制按钮，为false时不显示控制按钮
   *  - showsPagination 类型（boole）：是否显示小圆点，为false不显示下方圆点
   *  - dot 类型（组件）：未选中的圆点样式
   *  - activeDot 类型（组件）：选中的圆点样式
   * 注意：使用轮播图组件时如果导航器开启了滑动切换与切换动画轮播图内的图片会不显示
   */
  renderSwiper(){
    return (
      <View style={{height:160  }}>
        <Swiper
            height={160}
            loop={true}
            autoplay={true}
            autoplayTimeout={4}
            horizontal={true}
            paginationStyle={{bottom: 10}}
            showsButtons={false}
            showsPagination={true}
            dot={<View style={{
                backgroundColor: 'rgba(255,255,255,.4)',
                width: 6,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}
            activeDot={<View style={{
                backgroundColor: 'rgba(255,255,255,.8)',
                width: 14,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}>
            <ImgButton onPress={()=>{alert('点击了图1')}} source={ImgUrls.home_swiper_01} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图2')}} source={ImgUrls.home_swiper_02} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图3')}} source={ImgUrls.home_swiper_03} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图4')}} source={ImgUrls.home_swiper_04} style={styles.swiperImg} />
        </Swiper>
      </View>
    )
  }
  ······
｝
  
const styles = StyleSheet.create({ 
  ······
  /* 轮播图样式 */
  swiperImg:{
    width:'100%',
    height: 160,
    resizeMode :'stretch',
  },
  
})
```

### 属性

   * height 类型（number）：组件高度
   * loop 类型（boole）：如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
   * autoplay 类型（boole）：自动轮播
   * autoplayTimeout 类型（number）:每隔4秒切换
   * horizontal 类型（number）：轮播图的滑动方向，水平方向，为false可设置为竖直方向
   * paginationStyle 类型（object）：小圆点整体的样式
   * showsButtons 类型（boole）：左右控制按钮，为false时不显示控制按钮
   * showsPagination 类型（boole）：是否显示小圆点，为false不显示下方圆点
   * dot 类型（组件）：未选中的圆点样式
   * activeDot 类型（组件）：选中的圆点样式



## Home 首页静态页面完成

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
// 导入 react 与 Component 用来创建组件
import React, { Component } from 'react';
// 导入 react-native 用来使用 ReactNative 里的内置组件
import { Platfrom, Dimensions, StyleSheet, View, Text, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
// 导入轮播图插件
import Swiper from 'react-native-swiper';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入公用组件
import { ImgButton, TextButton } from '../../common/';
// 获取屏幕宽度
const {width} = Dimensions.get('window');
/* 创建并返回一个名为 Home 的组件 */
export default class Home extends Component {
  /**
   * constructor(props){}：
   * super(props)：
   * this.state：
   */
  constructor(props) {
    super(props);
    this.state = { 
      imgList:[ 
        {imageUrl:ImgUrls.home_picture_01},
        {imageUrl:ImgUrls.home_picture_02},
        {imageUrl:ImgUrls.home_picture_03},
        {imageUrl:ImgUrls.home_picture_04},
      ]
    };
  }
  /**
   * render(){}：渲染的内容，所有要显示的内容必须放在 render 函数内
   * return()：如果只有一个标签可以不用()，多个标签必需使用否则报错
   * View：相当于 html 里的 div 标签
   */
  render(){
    return (
      <View style={{flex:1,backgroundColor:'pink'}}>
        {/* 头部 */}
        { this.renderHeader() }
        {/* 滚动视图 */}
        <ScrollView style={{marginBottom: -10,}}>
          {/* 轮播图 */}
          { this.renderSwiper() }
          {/* 首页逛一逛、闯一闯入口 */}
          <View style={styles.gcEntry}>
            <ImgButton style={styles.gcImg} source={ImgUrls.home_chuang} />
            <ImgButton style={styles.gcImg} source={ImgUrls.home_guang} />
          </View>
          {/* 逛一逛标题 */}
          {this.renderTitle('逛一逛',()=>{ alert('点击了逛一逛标题的更多！')})}
          {/* 分类 */}
          { this.renderFenLei() }
          {/* 闯一闯标题 */}
          {this.renderTitle('闯一闯',()=>{ alert('点击了闯一闯更多！')})}
          {/* 闯一闯列表内容 */}
          {this.renderList(this.state.imgList)}
        </ScrollView>
      </View>
    )
  }
  /**
   * renderHeader(){ return() } 渲染头部函数
   * Image：图片组件
   *  - source：图片的地址路径，本地图片需使用 require() 方法来引入图片路径 source={require('../image/01.jpg')}
   * ImgButton：自定义可点击的 Image 公用组件
   *  - onPress 类型（function）：点击事件
   * TextInput：输入框组件
   *  - placeholder 类型（string）：默认显示文本，如果没有任何文字输入，会显示此占位字符串。
   *  - placeholderTextColor 类型（string）：占位字符串显示的文字颜色
   *  - underlineColorAndroid 类型（string）：文本框的下划线颜色，如要去掉将此属性设为透明 transparent 
   */
  renderHeader(){
    return(
      <View style={styles.header} >
        <ImgButton onPress={()=>{ this._navigate('Mine') }} source={ ImgUrls.home_touxiang } style={styles.touxiang} />
        <View style={styles.search}>
          <TextInput
            style={styles.ipt}
            placeholder="请输入您要搜索的内容"
            placeholderTextColor="#ccc"
            underlineColorAndroid="transparent" 
          />
          <Image source={ ImgUrls.home_search } style={ styles.iconSearch } /> 
        </View>
        <ImgButton onPress={()=>{ this._navigate('Scanner') }} source={ ImgUrls.home_scanner} style={styles.iconScanner} />
      </View>
    )
  }
  /**
   * renderSwiper(){ return } 渲染轮播图函数
   * Swiper：轮播图组件
   *  - height 类型（number）：组件高度
   *  - loop 类型（boole）：如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
   *  - autoplay 类型（boole）：自动轮播
   *  - autoplayTimeout 类型（number）:每隔4秒切换
   *  - horizontal 类型（number）：轮播图的滑动方向，水平方向，为false可设置为竖直方向
   *  - paginationStyle 类型（object）：小圆点整体的样式
   *  - showsButtons 类型（boole）：左右控制按钮，为false时不显示控制按钮
   *  - showsPagination 类型（boole）：是否显示小圆点，为false不显示下方圆点
   *  - dot 类型（组件）：未选中的圆点样式
   *  - activeDot 类型（组件）：选中的圆点样式
   * 注意：使用轮播图组件时如果导航器开启了滑动切换与切换动画轮播图内的图片会不显示
   */
  renderSwiper(){
    return (
      <View style={{height:160  }}>
        <Swiper
            height={160}
            loop={true}
            autoplay={true}
            autoplayTimeout={4}
            horizontal={true}
            paginationStyle={{bottom: 10}}
            showsButtons={false}
            showsPagination={true}
            dot={<View style={{
                backgroundColor: 'rgba(255,255,255,.4)',
                width: 6,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}
            activeDot={<View style={{
                backgroundColor: 'rgba(255,255,255,.8)',
                width: 14,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}>
            <ImgButton onPress={()=>{alert('点击了图1')}} source={ImgUrls.home_swiper_01} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图2')}} source={ImgUrls.home_swiper_02} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图3')}} source={ImgUrls.home_swiper_03} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图4')}} source={ImgUrls.home_swiper_04} style={styles.swiperImg} />
        </Swiper>
      </View>
    )
  }
  /**
   * renderTitle(title){ return() } 渲染标题函数
   *  - title：接收传递进来的内容作为标题文本
   *  - onpress：接收传递进来的事件
   */
  renderTitle(title,onpress){
    return (
      <View style={styles.TitleBox}>
        <View style={styles.title} >
          <View style={[styles.TitleBoxIcon,{borderTopLeftRadius: 2,borderBottomLeftRadius: 2,}]}></View>
          <Text style={styles.TitleText}>{title}</Text>
          <View style={[styles.TitleBoxIcon,{borderTopRightRadius: 2,borderBottomRightRadius: 2,}]}></View>
        </View>
        <View style={styles.TitleBoxRight} >
          <TextButton onPress={ onpress } style={styles.TitleRightText} text="更多 >"/>
        </View>
      </View>
    )
  }
  /**
   * renderfenLei(){ return()} 渲染分类函数
   */
  renderFenLei(){
    return (
      <View style={styles.fenleiBox}>
        <View style={[styles.fenleiTopBottom,CommonStyles.borderBottom1,CommonStyles.borderColor_ccc]} >
          <View style={{flex:1}}>
            <ImgButton style={styles.fenleiImg} source={ImgUrls.home_guang_01} />
          </View>
          <View style={[CommonStyles.borderLeft1,CommonStyles.borderColor_ccc,{flex:1}]}>
            <ImgButton style={styles.fenleiImg} source={ImgUrls.home_guang_02} />
          </View>
        </View>
        <View style={styles.fenleiTopBottom} >
          <View style={{flex:1}}>
            <ImgButton style={styles.fenleiImg} source={ImgUrls.home_guang_03} />
          </View>
          <View style={[CommonStyles.borderLeft1,CommonStyles.borderColor_ccc,{flex:1}]}>
            <ImgButton style={styles.fenleiImg} source={ImgUrls.home_guang_04} />
          </View>
        </View>
      </View>
    )
  }
  /**
   * renderList(imgList){ return() }  渲染闯一闯列表内容函数
   * FlatList：列表组件
   *  - data 类型（Array）：要循环的数据，data属性目前只支持普通数组
   *  - renderItem 类型（Function）: 根据行数据 data 渲染每一行的组件
   *  - keyExtractor={(item, index) => index}：此函数用于为给定的item生成一个不重复的key
   *     - Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
   *     - 若不指定此函数，则默认抽取item.key作为key值。
   *     - 若item.key也不存在，则使用数组下标。 
   */
  renderList(imgList){
    return (
       <FlatList
        data={imgList}
        renderItem={({item}) => {
          return (
            <View style={styles.CLImgbox}>
              <Image style={styles.CLImg}  source={item.imageUrl} />
            </View>
          ) 
        }}
        keyExtractor={(item,index) => index}
      />
    )
  }
  /**
   * 页面跳转事件
   * 通过 this.props.navigation 接收从主入口 index.js 里传递过来的 navigation 属性用来跳转页面
   */
  _navigate(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
}
/**
 * StyleSheet.create({})：创建多个样式对象
 */ 
const styles = StyleSheet.create({ 
  /* 头部样式 */
  header:{
    height: 40,
    backgroundColor: Colors.app_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  touxiang:{
    width: 30,
    height: 30,
    borderRadius: 17,
  },
  search:{
    width: 260,
    height: 26,
    position: 'relative',
  },
  ipt:{
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 0,
    paddingLeft: 24,
  },
  iconSearch:{
    width: 16,
    height: 16,
    tintColor: '#ccc',
    position: 'absolute',
    left: 4,
    top: '50%',
    marginTop: -8,
  },
  iconScanner:{
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  /* 轮播图样式 */
  swiperImg:{
    width:'100%',
    height: 160,
    resizeMode :'stretch',
  },
  /* 首页逛一逛、闯一闯入口 */
  gcEntry:{
    height: 130,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white_fff,
  },
  gcImg:{
    width: 175,
    height:120,
  },
  /* 逛一逛标题 */
  TitleBox:{
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.white_fff,
    position: 'relative',
  },
  title:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  TitleText:{
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 16,
    color: '#474747',
  },
  TitleBoxIcon:{
    width: 14,
    height: 4,
    backgroundColor: '#474747',
  },
  TitleBoxRight:{
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -8,
  },
  TitleRightText:{
    color: Colors.app_color,
    fontSize: 12,
  },
  /* 分类 */
  fenleiBox:{
    height: 216,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#f1f1f1',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white_fff,
  },
  fenleiTopBottom:{
    flex: 1,
    flexDirection: 'row',
  },
  fenleiImg:{
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
  },
  /* 闯一闯列表内容 */
  cList:{
    flex: 1,
  },
  CLImgbox:{
    flex: 1,
    height: 130,
    borderBottomWidth: 10,
    borderColor: '#ccc',
    // backgroundColor: '#00ff',
    justifyContent:'center',
    alignItems: 'center',
  },
  CLImg:{
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
    backgroundColor:'blue',
  },
})
```



## 自定义组件 - NavTop 头部导航

在 `components` 文件夹下新建 `NavTop.js` 自定义组件：

```jsx
/**
 * Created by date on 2018/02/28
 * Function：自定义头部导航组件
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ImgUrls, Colors } from '../assets/';

export default class NavTop extends Component{
  render(){
    return(
      <View style={styles.navtop}>
        <TouchableOpacity onPress={ this.props.goBack }>
          <Image style={styles.icon} source={ ImgUrls.common_back } />
        </TouchableOpacity>
        <Text style={styles.title}> {this.props.title} </Text>
        <TouchableOpacity onPress={ this.props.onMore }>
          <Image style={styles.icon} source={ ImgUrls.common_more } />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navtop:{
    height: 40,
    backgroundColor: Colors.app_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon:{
    width: 20,
    height: 20,
    tintColor: Colors.white_fff,
  },
  title:{
    fontSize: 18,
    color: Colors.white_fff,
  }
})
```

分别在 JieDan、ShopCart、Mine 三个主页面复用，以截单页面为例：

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 截单页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

// 导入自定义组件
import { NavTop } from '../../components/';

export default class JieDan extends Component {
  render(){
    return (
      <View style={{flex:1,backgroundColor:'pink'}}>
        {/**
         * NavTop：头部导航，头部导航的标题与返回、更多按钮事件都由父组件传递
         * title：头部导航的标题
         * goBack：返回按钮的事件
         * onMore：更多按钮的事件
         */}
        <NavTop 
          title="截单" 
          goBack={()=>{this.props.navigation.goBack()}} 
          onMore={()=>{alert('点击了更多按钮！')}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ })
```



## react-native-scrollable-tab-view Tab栏插件

> GitHub：https://github.com/skv-headless/react-native-scrollable-tab-view

### 安装 react-native-scrollable-tab-view 

```
$ npm install react-native-scrollable-tab-view --save
```

### 使用 react-native-scrollable-tab-view 

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 截单页面
 * Desc:
 */
······
// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';
export default class JieDan extends Component {
  ······
  render(){
    return (
		······
        {/* tab 栏 */}
        <ScrollableTabView
          locked={false}
          tabBarActiveTextColor={Colors.app_color} // 选中时标签栏文本的颜色，默认为navy
          tabBarInactiveTextColor='#ccc'           // 未选中时标签栏文本的颜色，默认为black
          tabBarTextStyle={// 标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
            {fontSize:14,paddingTop:10,}
          }    
          tabBarUnderlineStyle={{ // 默认选项卡栏下划线的样式。
            backgroundColor:Colors.app_color,
          }}                    
          >
          {/* 待抢列表 */}
          <View style={CommonStyles.container} tabLabel="待抢列表">
            {this.renderListWait()}
          </View>
          {/* 已抢列表 */}
          <View style={CommonStyles.container} tabLabel="已抢列表">
            {this.renderListAlready()}
          </View>
          {/* 工作截单 */}
          <View style={CommonStyles.container} tabLabel="工作截单">
            {this.renderWorkList()}
          </View>
        </ScrollableTabView>
      </View>
    )
  }
 ······
```



## JieDan 截单静态页面完成

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 截单页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
// 导入自定义组件
import { NavTop } from '../../components/';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';

// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class JieDan extends Component {

  constructor(props){
    super(props);
    this.state={
      list:[
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
      ],
      waitList:[
        {date:'2017-09-01 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-02 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-03 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-04 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-05 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-06 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-07 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-08 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-09 14:22',nmb:4033398282990100,pirce:25.22},
      ],
      sellList:[
        {date:'2017-09-01 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-02 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-03 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-04 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-05 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-06 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-07 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-08 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-09 14:22',nmb:4033398282990100,pirce:25.22},
      ],

    }
  }


  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/**
         * NavTop：头部导航，头部导航的标题与返回、更多按钮事件都由父组件传递
         * title：头部导航的标题
         * goBack：返回按钮的事件
         * onMore：更多按钮的事件
         */}
        <NavTop title="截单" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
        {/* tab 栏 */}
        <ScrollableTabView
          locked={false}
          tabBarActiveTextColor={Colors.app_color} // 选中时标签栏文本的颜色，默认为navy
          tabBarInactiveTextColor='#ccc'           // 未选中时标签栏文本的颜色，默认为black
          tabBarTextStyle={// 标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
            {fontSize:14,paddingTop:10,}
          }    
          tabBarUnderlineStyle={{ // 默认选项卡栏下划线的样式。
            backgroundColor:Colors.app_color,
          }}                    
          >
          {/* 待抢列表 */}
          <View style={CommonStyles.container} tabLabel="待抢列表">
            {this.renderListWait()}
          </View>
          {/* 已抢列表 */}
          <View style={CommonStyles.container} tabLabel="已抢列表">
            {this.renderListAlready()}
          </View>
          {/* 工作截单 */}
          <View style={CommonStyles.container} tabLabel="工作截单">
            {this.renderWorkList()}
          </View>
        </ScrollableTabView>
      </View>
    )
  }

  /* 待抢列表 */
  renderListWait(){
    return(
      <View style={CommonStyles.container} >
        <FlatList 
          data={this.state.sellList}
          renderItem={({item})=>{
            return (
              <View style={styles.listbox}>
                <View>
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.date}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}><Text style={styles.font12}>订单编号：</Text>{item.nmb}</Text>
                  <Text style={[styles.pirceStyle,{color:Colors.app_color,}]}><Text style={styles.font12}>￥</Text> {item.pirce}</Text>
                </View>
                <TouchableOpacity onPress={()=> alert('点击了抢单按钮！')} >
                  <Image source={ImgUrls.jiedan_qiang} style={styles.waitimg}/>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  /* 已抢列表 */
  renderListAlready(){
    return(
      <View style={CommonStyles.container} >
        <FlatList 
          data={this.state.sellList}
          renderItem={({item})=>{
            return (
              <View style={styles.listbox2}>
                <View>
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.date}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}>订单编号：{item.nmb}</Text>
                </View>
                <Text style={[styles.pirceStyle,{color: '#e04967',}]}>￥ {item.pirce}</Text>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  /* 工作截单 */
  renderWorkList(){
    return(
      <View style={[styles.container,{marginBottom:-10}]} >
        <FlatList 
          data={this.state.list}
          renderItem={({item})=>{
            return (
              <View style={{height:310,borderBottomWidth:10,borderColor:'#f4f4f4'}} >
                <View style={styles.listTop} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.img} source={item.imgUrl} />
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={styles.demandStyle}>{item.demand}</Text>
                  <View style={styles.flexStyle} >
                    <Text style={[styles.font14,]} >预算：<Text style={{color:Colors.app_color}} >{item.pirce}</Text></Text>
                    <Text style={[styles.font14,]} ><Text style={{color:'#444'}} >要求交付时间：</Text>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.listBottom} >
                  <Text style={styles.describeStyle}>需求描述：</Text>
                  <View style={{position:'relative'}}>
                    <Text style={styles.describeStyle}>{item.describe}</Text>
                    <Text style={styles.gengduo} >+ 更多</Text>
                  </View>
                  <View style={styles.flexStyle}>
                    <Text style={{fontSize:12,color:'#ccc'}}>已有{item.nmb}人抢单</Text>
                    <View style={{width:80,height:26}}>
                    <Button
                      onPress={()=>{this._qiang()}}
                      title="抢" 
                      color={Colors.app_color_yellow} 
                    />
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  _qiang(){
    alert('抢单成功！！！')
  }
}

const styles = StyleSheet.create({
  listbox:{
    height: 102,
    paddingLeft: 20,
    paddingRight:20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  waitimg:{
    width: 60,
    height: 60,
  },
  font12:{
    fontSize: 12,
  },
  pirceStyle:{
    fontSize: 16,
  },

  listbox2:{
    height: 90,
    paddingLeft: 20,
    paddingRight:20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },

  /* 工作截单 */
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexStyle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  listTop:{
    height:120,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth:1,
    borderColor:'#ccc',
  },
  img:{
    width:44,
    height:44,
    borderWidth:0.8,
    borderColor:'#ccc',
    borderRadius:4,
  },
  nameText:{
    marginLeft:10,
    fontSize:14,
    color:'#444'
  },
  demandStyle:{
    marginTop:6,
    marginBottom:6,
    fontSize:16,
    color:'#444',
  },
  font14:{
    fontSize:14,
    color:'#ccc',
  },
  describeStyle:{
    fontSize:14,
    lineHeight: 26,
  },
  gengduo:{
    color:'#66b7ff',
    position:'absolute',
    bottom:4,
    right:0,
  },
  listBottom:{
    height:180,
    padding: 10,
  },
 })
```

 

## React Native修改APP名称与图标

> 不管是修改 app 名称还是图标，都需重新生成新的 debug版，最重要的一步是删除 `android` => `app` 目录下 `build` 目录，否则安装报错。

### 修改 APP 名称

**找到读取 app_name 的地方**

- 进入 `android` => `app` => `src` => `main` => `AndroidManifest.xml` 文件
- 找到 `android:label=”@string/app_name”` 这个对应的就是APP的名称。
  - @string类似于定义好的变量，直接调取即可。

**修改app的名称**

- 进入 `android` => `app` => `src` => `main` => `res` => `valuse` => `strings.xml`  文件，修改即可：

```xml
<resources>
    <string name="app_name">你的APP名称</string>
</resources>
```

### 修改 APP 的图标

**找到读取 app 图标的地方**

- 进入目录 `android` => `app` => `src` => `main` => `AndroidManifest.xml` 文件
- 找到 `android:icon=”@mipmap/ic_launcher”` 这里的 `ic_launcher` 就是默认的图标名称
  - 这里也是从其他地方引用的，因此需要在被引用的地方修改

**修改 app 图标** 

- 进入目录 `android` => `app` => `src` => `main` => `res` => `mipmap–xxx` 文件夹
  - **注意：**这里可能是 `mipmap-xxx`，也可能是 `drawable-xxx` ，我这里是 `mipmap`，只需要保持一致即可
  - 如果是 `mipmap-xxx`，则 `android:icon=”@mipmap/ic_launcher”` 
  - 如果是 `drawable-xxx`，则 `android:icon=”@drawable/ic_launcher”`


- 这里面的图标大小都不一样，但是名字是一样的
- 图标大小分为 `48x48` ，`72x72` ， `96x96` ， `144x144` 适配安卓不同机型

只需要将图标放入这四个文件夹里面，在读取 `app` 图标的地方修改引用地址名称既可修改 `app` 图标

### 重新生成新的 debug

- 进入 `android` => `app` 目录下，删除掉 `build` 目录 
- 重新执行 `react-native run-android`
- 生成新的 `debug版` 安装到模拟器上，就能看到修改后的 APP名字 和 图标 了

**注意：以上不管是修改 app 名称还是图标都需重新生成新的 debug版，最重要的一步是删除 build 目录**



## ShopCart 购物车静态页面完成

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 购物车页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
// 导航静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入公用组件
import { NavTop } from '../../components/';
export default class ShopCart extends Component {
  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* 头部导航 */}
        <NavTop 
          title="购物车" 
          goBack={()=>{this.props.navigation.goBack()}} 
          onMore={()=>{alert('点击了更多按钮！')}} />
        {/* 空购物车 */}
        <View style={styles.box} >
          <Image style={styles.shopCartImg} source={ImgUrls.shopcart_nullshopcart} />
          <Text style={styles.nullShop}>购物车空空如也~</Text>
          <View style={styles.btn}>
            <Button 
              title='去逛一逛'
              color={Colors.app_color_yellow}
              onPress={()=>{alert('点击了按钮！')}}
            />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  box:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  shopCartImg:{
    width:90,
    height:100,
    marginRight: 10,
  },
  nullShop:{
    fontSize:14,
    color:'#ccc',
    margin: 20,
  },
  btn:{
    width: 128,
    height: 32,
  }
})
```



## Mine 个人中心静态页面完成

```jsx
/**
 * Created by date on 2018/02/27
 * Function: 个人中心页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
import { NavTop } from '../../components/';
export default class Mine extends Component {
  constructor(props){
    super(props);
    this.state={
      fenleiList:[
        {title:'数据钱包',iconUrl:ImgUrls.mine_fenlei_01},
        {title:'现金钱包',iconUrl:ImgUrls.mine_fenlei_02},
        {title:'我的收藏',iconUrl:ImgUrls.mine_fenlei_03},
        {title:'地址管理',iconUrl:ImgUrls.mine_fenlei_04},
        {title:'品牌管理',iconUrl:ImgUrls.mine_fenlei_05},
      ],
      list1:{
        title:'销售订单',
        itemArr:[
          {itemTitle:'待付款',itemIconUrl:ImgUrls.mine_icon_02},
          {itemTitle:'待发货',itemIconUrl:ImgUrls.mine_icon_01},
          {itemTitle:'已发货',itemIconUrl:ImgUrls.mine_icon_10},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'退货',itemIconUrl:ImgUrls.mine_icon_09},
        ],
      },
      list2:{
        title:'消费订单',
        itemArr:[
          {itemTitle:'待付款',itemIconUrl:ImgUrls.mine_icon_02},
          {itemTitle:'待发货',itemIconUrl:ImgUrls.mine_icon_01},
          {itemTitle:'待收货',itemIconUrl:ImgUrls.mine_icon_06},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'退货',itemIconUrl:ImgUrls.mine_icon_09},
        ],
      },
      list3:{
        title:'工作订单',
        itemArr:[
          {itemTitle:'待确认',itemIconUrl:ImgUrls.mine_icon_05},
          {itemTitle:'待交付',itemIconUrl:ImgUrls.mine_icon_07},
          {itemTitle:'待结算',itemIconUrl:ImgUrls.mine_icon_03},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'申诉',itemIconUrl:ImgUrls.mine_icon_08},
        ],
      },
    }
  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* 头部导航 */}
        <NavTop title="个人中心" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
        <ScrollView>
          {/* 头像区域 */}
          {this.renderHeader(this.state.fenleiList)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list1)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list2)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list3)}
        </ScrollView>
      </View>
    )
  }
  /**
   * renderHeader(fenleiList){ return() } 创建头像区域函数
   * ImageBackground：背景图片组件
   * fenleiList.map((item,i)=>{return()})：简单理解，可以认为是forEah的加强版本，除了可以遍历数组，还扩充了其他功能。
   *  - 主要解决的问题：是通过一组数据映射为另一组数据
   *  - 返回值：原数组映射后的新数组
   *  - item：遍历对象的内容
   *  - i：遍历的次数
   *  - arr：原数组
   */ 
  renderHeader(fenleiList){
    return(
      <View style={{height:360,backgroundColor:'#fff',}}>
        <ImageBackground style={[styles.bgcImg]} source={ImgUrls.mine_bcgcolor_red}>
          <Image style={styles.touxiang} source={ImgUrls.home_touxiang} />
          <Text style={styles.nameStyle} >AmberSong</Text>
          <Text style={styles.entryStyle} >进入我的创业圈</Text>
          <View style={styles.cardStyle}>
            <Image style={{width:174,height:106,}} source={ImgUrls.mine_card} />
            <Image style={{width:174,height:106,}} source={ImgUrls.mine_shopping} />
          </View>
        </ImageBackground>
        <View style={styles.fenleiStyle} >
          {fenleiList.map((item,i,arr)=>{
            return (
              <TouchableOpacity key={i} onPress={()=>{this.onAlert()}} >
                <View style={{alignItems:'center'}}>
                  <Image style={styles.fenleiImg} source={item.iconUrl} />
                  <Text style={styles.fenleiText} >{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
  /**
   * renderList(){ return() } 渲染列表区域函数
   */ 
  renderList(list){
    return(
      <View style={styles.listStyle} >
        <View style={styles.listTop} >
          <Text>{list.title}</Text>
          <TouchableOpacity onPress={()=>{this.onAlert()}} >
            <Text>全部订单 ></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listBottom} >
          {list.itemArr.map((item,i)=>{
            return (
              <TouchableOpacity key={i} style={styles.listItem} onPress={()=>{this.onAlert()}} >
                <Image style={styles.listImg} source={item.itemIconUrl} />
                <Text style={styles.listText} >{item.itemTitle}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  onAlert(){
    alert('点击了按钮！')
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  /* 头像区域 */
  bgcImg:{
    height: 240,
    width:'100%',
    alignItems:'center',
  },
  touxiang:{
    width:98,
    height:98,
    borderRadius:49,
    marginTop: 20,
  },
  nameStyle:{
    marginTop:10,
    marginBottom:6,
    fontSize: 18,
    color: '#fff',
  },
  entryStyle:{
    fontSize: 12,
    color:'#fff',
  },
  cardStyle:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    position:'relative',
    marginTop:10,
  },
  fenleiStyle:{
    flex:1,
    marginTop:40,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  fenleiImg:{
    width:28,
    height:28,
    marginTop:10,
    marginBottom:8
  },
  fenleiText:{
    fontSize:12,
    color:'#5d5d5d'
  },
  /* 列表区域 */
  listStyle:{
    height:126,
    borderTopWidth:10,
    borderColor:'#f0f0f0',
    paddingLeft:10,
    paddingRight:10,
  },
  listTop:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  listImg:{
    width:26,
    height:26,
    marginTop: 4,
  },
  listText:{
    fontSize:12,
    color:'#5d5d5d',
    marginTop: 10,
  },
  listBottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  listItem:{
    alignItems:'center',
  }
})
```



## 创建自定义组件 HeaderSearch

在 `components` 下新建 `HeaderSearch.js` 文件

```jsx
/**
 * Created by date on 2018/03/01
 * Function: 头部搜索组件
 * Desc:
 */
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import { ImgUrls, Colors, CommonStyles, Contants} from '../assets/';
import { ImgButton } from '../common/';
// 获取设备屏幕宽度
const {width} = Dimensions.get('window');
export default class HeaderSearch extends Component{
  render(){
    return(
      <View style={styles.header}>
        <ImgButton onPress={this.props.onPress} source={ImgUrls.home_touxiang} style={styles.touxiang} />
        <View style={styles.searchBox}>
          <TextInput
            style={styles.ipt}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent" 
            onFocus={this.props.onFocus}
          />
          <Image source={ ImgUrls.home_search } style={ styles.iconSearch } /> 
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    height: 40,
    backgroundColor: Colors.app_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  touxiang:{
    width: 30,
    height: 30,
    borderRadius: 17,
  },
  searchBox:{
    flex: 1,
    height: 26,
    alignItems: 'center',
  },
  ipt:{
    width: '90%',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 0,
    paddingLeft: 10,
  },
  iconSearch:{
    width: 16,
    height: 16,
    tintColor: '#fff',
    position: 'absolute',
    right: '7%',
    top: '50%',
    marginTop: -8,
  },
})
```



## HomeChuang 闯一闯页面完成

在 pages 目录下新建 HomeChuang.js 文件，此页面为首页点击闯一闯后跳转的子页面

```jsx
/**
 * Created by date on 2018/03/01
 * Funciton: 闯一闯页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入自定义组件
import { HeaderSearch } from '../../components/';
// 导入公用组件
import { ImgButton } from '../../common/';
// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';
export default class HomeChuang extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[],          // 页面全部数据
      cateList:[],      // 食品数据
      grouponList:[],   // 团购数据
      educationList:[], // 教育数据
      trainList:[],     // 培训数据
    }
  }
  /**
   * 生命周期 componentDidMount 
   * componentDidMount() 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，
   * componentDidMount() 方法中的子组件在父组件之前执行 
   * 从这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
   */
  componentDidMount() { 
    this._getList();
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:"#fff"}}>
        {/* 头部搜索 */}
        <HeaderSearch 
          onPress={()=>{this._navigate('Mine')}}
          onFocus={()=>{this._navigate('ShopCart')}}
        />
        {/* tab 栏 */}
        <ScrollableTabView
          locked={false}
          tabBarActiveTextColor={Colors.app_color} // 选中时标签栏文本的颜色，默认为navy
          tabBarInactiveTextColor='#ccc'           // 未选中时标签栏文本的颜色，默认为black
          tabBarTextStyle={// 标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
            {fontSize:14,paddingTop:10,}
          }    
          tabBarUnderlineStyle={{ // 默认选项卡栏下划线的样式。
            backgroundColor:Colors.app_color,
          }}                    
          >
          {/* 全部企业 */}
          <View style={CommonStyles.container} tabLabel="全部企业">
            { this.renderList(this.state.list) }
          </View>
          {/* 食品 */}
          <View style={CommonStyles.container} tabLabel="食品">
            { this.renderList(this.state.cateList)}
          </View>
          {/* 团购 */}
          <View style={CommonStyles.container} tabLabel="团购">
            { this.renderList(this.state.grouponList)}
          </View>
          {/* 教育 */}
          <View style={CommonStyles.container} tabLabel="教育">
            { this.renderList(this.state.educationList)}
          </View>
          {/* 培训 */}
          <View style={CommonStyles.container} tabLabel="培训">
            { this.renderList(this.state.trainList)}
          </View>
        </ScrollableTabView>
      </View>
    )
  }
  /**
   * renderList(){return()} 渲染列表函数 
   */
  renderList(list){
    return(
      <View>
        <ScrollView>
          { list.map((item,i,arr)=>{
            return(
              <View key={i} style={styles.list} >
                <View style={styles.listLeft} >
                  <ImgButton source={{uri:item.img}} style={styles.icon} />
                </View>
                <View style={styles.listRight} >
                  <Text style={styles.name} numberOFLines={1} >{item.name}</Text>
                  <Text style={styles.intro} numberOfLines={2}>{item.intro}</Text>
                  <View style={styles.listBottom} >
                    <Text style={{fontSize: 12,}} >代码费:<Text style={{color:Colors.app_color,fontSize:16}} >￥{item.price}/年</Text></Text>
                    <TouchableOpacity style={styles.btn} >
                      <Text style={styles.btnText} >购入代理</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
  /**
   * _navigate(screen){} 页面跳转事件
   */
  _navigate(screen){
    const {navigate} = this.props.navigation;
    navigate(screen);
  }
  /**
   * _getList(){} 发送请求获取数据
   */
  _getList(){
    fetch(Contants.MockAai+"GET/api/chuang",{ method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        responseJson.data.map((item)=>{
          if(item.typeID === 1){
            arr1.push(item)
          }else if(item.typeID === 2){
            arr2.push(item)
          }else if(item.typeID === 3){
            arr3.push(item)
          }else if(item.typeID === 4){
            arr4.push(item)
          }
        })
        this.setState({
          list:responseJson.data,
          cateList:arr1,
          grouponList:arr2,
          educationList:arr3,
          trainList:arr4,
        });
        console.log(this.state.list);
        console.log(this.state.cateList);
        console.log(this.state.grouponList);
        console.log(this.state.educationList);
        console.log(this.state.trainList);
      })
      .catch((error) => {
        console.error("闯一闯页面请求失败！！！");
      }
    );
  }
}
const styles = StyleSheet.create({
  /* 列表样式 */
  list:{
    height: 132,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLeft:{
    width: 110,
    height: 110,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    width: 80,
    height: 80,
    resizeMode: 'stretch',
  },
  listRight:{
    flex: 1,
    height: 110,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name:{
    fontSize: 16,
  },
  intro:{
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 10,
  },
  listBottom:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn:{
    width: 78,
    height: 27,
    borderWidth: 1,
    borderColor: Colors.app_color_yellow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.app_color_yellow,
  }
})
```
