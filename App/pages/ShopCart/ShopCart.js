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
        <NavTop title="购物车" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
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