/**
 * Created by date on 2018/03/01
 * Funciton: 闯一闯页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入自定义组件
import { HeaderSearch } from '../../components/';

export default class HomeChuang extends Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:"pink"}}>
        <HeaderSearch onPress={()=>{this._navigate('Mine')}} />
      </View>
    )
  }

  _navigate(screen){
    const {navigate} = this.props.navigation;
    navigate(screen);
  }
}

const styles = StyleSheet.create({

})