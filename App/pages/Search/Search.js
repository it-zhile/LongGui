/**
 * Created by date on 2018/03/05
 * Function: 搜索页
 * Dese:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { ImgUrls, Colors, CommonStyles, Contants} from '../../assets';
import { ImgButton, TextButton } from '../../common';

export default class Search extends Component{
  render(){
    return(
      <View style={{flex:1, backgroundColor:'pink'}} >
        {/* 头部搜索栏 */}
        { this.renderSearch() }
        <View>
          <Text>搜索历史</Text>
          <TouchableOpacity onPress={()=>{alert('点击了清空按钮')}} >
            <Image />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /** renderSearch(){ return } 渲染头部搜索栏 */
  renderSearch(){
    return(
      <View style={styles.header}>
        <ImgButton onPress={this.props.onPress} source={ImgUrls.home_touxiang} style={styles.touxiang} />
        <View style={styles.searchBox}>
          <TextInput
            style={styles.ipt}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent" 
            autoFocus={true}
            onFocus={this.props.onFocus}
          />
          <Image source={ ImgUrls.icon_search } style={ styles.iconSearch } /> 
        </View>
        <TextButton touchStyle={styles.touchBtn} onPress={()=>{alert('点击了搜索按钮')}} style={styles.textBtn} text="搜索" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /** 头部搜索栏样式 */
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
  touchBtn:{
    width: 55,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn:{
    color: Colors.app_color,
  },
})