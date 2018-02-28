/**
 * Creactd by date on 2018/02/28
 * Function: 可点击的 Image 组件
 * Desc:
 */
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

export default class ImgButton extends Component{
  render(){
    return (
      <TouchableOpacity onPress={ this.props.onPress } >
        <Image style={ this.props.style } source={ this.props.source} >
          { this.props.children }
        </Image>
      </TouchableOpacity>
    )
  }
}