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
// 导入公用组件
import { Scanner } from './common/';

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
  Scanner: { screen: Scanner },
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