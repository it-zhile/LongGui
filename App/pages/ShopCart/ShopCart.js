/**
 * Created by date on 2018/02/27
 * Function: 购物车页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';

import { NavTop } from '../../components/';

export default class ShopCart extends Component {
  render(){
    return (
      <View style={{flex:1,backgroundColor:'yellowgreen'}}>
        {/* 头部导航 */}
        <NavTop title="购物车" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ })