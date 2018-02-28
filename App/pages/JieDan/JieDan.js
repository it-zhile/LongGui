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
        {/* 头部导航 */}
        <NavTop title="截单" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ })