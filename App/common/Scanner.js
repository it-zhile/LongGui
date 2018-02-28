/**
 * Created by date on 2018/02/28
 * Function: 扫码组件
 * Desc: 使用 react-native-camera 插件创建自定义扫码组件
 */
import React,{ Component } from 'react';
import { View, Text, } from 'react-native';

export default class Scanner extends Component{
  render(){
    return(
      <View>
        <Text>扫码组件</Text>
      </View>
    )
  }
}