/**
 * Created by date on 2018/02/27
 * Function: 个人中心页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

import { NavTop } from '../../components/';

export default class Mine extends Component {
  render(){
    return (
      <View style={{flex:1,backgroundColor:'yellow'}}>
        {/* 头部导航 */}
        <NavTop title="个人中心" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ })