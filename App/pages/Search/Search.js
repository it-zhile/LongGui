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

  constructor(props){
    super(props);
    this.state = {
      list:['猪蹄','茶叶','小家电','女装','茶叶','小家电','女装','茶叶','小家电','女装',]
    }
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor:'#fff'}} >
        {/* 头部搜索栏 */}
        { this.renderSearch() }
        {/* 内容区域 */}
        <View style={styles.content} >
          {/* 历史/清空 */}
          <View style={styles.topBox}>
            <Text style={{fontSize: 14}} >搜索历史</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={()=>{alert('点击了清空按钮')}} >
              <Image source={ ImgUrls.icon_delete} style={styles.iconDelete}/>
              <Text style={{fontSize: 14,paddingLeft: 2,}} >清空</Text>
            </TouchableOpacity>
          </View>
          {/* 搜索记录 */}
          <View style={styles.record}>
            { this.state.list.map((item,i)=>{
              return(
                <View key={i} style={styles.box} >
                  <TouchableOpacity onPress={()=>{alert('按钮内容为'+item)}}  style={styles.textBox}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
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
    paddingLeft: 26,
  },
  iconSearch:{
    width: 16,
    height: 16,
    tintColor: '#fff',
    position: 'absolute',
    left: '7%',
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
  content:{
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  /* 历史/清空 */
  topBox:{
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteBtn:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDelete:{
    width: 15,
    height: 15,
    tintColor: '#777',
  },
  /** 搜索记录 */
  record:{
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  box:{
    width: '25%',
    height: 27,
    marginBottom: 10,
    alignItems: 'center',
  },
  textBox:{
    width: 76,
    height: 27,
    borderWidth: 1,
    borderColor: '#777',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})