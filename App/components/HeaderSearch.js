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