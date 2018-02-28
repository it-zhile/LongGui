/**
 * Creactd by date on 2018/02/28
 * Function: 可点击的 Text 组件
 * Desc:
 */
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default class TextButton extends Component{
  render(){
    return (
      <TouchableOpacity onPress={ this.props.onPress } >
        <Text style={ this.props.style } >{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}