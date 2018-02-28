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

```

```

