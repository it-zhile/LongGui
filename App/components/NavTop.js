/**
 * Created by date on 2018/02/28
 * Function：自定义头部导航组件
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ImgUrls, Colors } from '../assets/';

export default class NavTop extends Component{
  render(){
    return(
      <View style={styles.navtop}>
        <TouchableOpacity onPress={ this.props.goBack }>
          <Image style={styles.icon} source={ ImgUrls.icon_back } />
        </TouchableOpacity>
        <Text style={styles.title}> {this.props.title} </Text>
        <TouchableOpacity onPress={ this.props.onMore }>
          <Image style={styles.icon} source={ ImgUrls.icon_more } />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navtop:{
    height: 40,
    backgroundColor: Colors.app_color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon:{
    width: 20,
    height: 20,
    tintColor: Colors.white_fff,
  },
  title:{
    fontSize: 18,
    color: Colors.white_fff,
  }
})