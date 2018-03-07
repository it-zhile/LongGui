/**
 * Created by date on 2018/03/07
 * Function: 换口味页面
 * Dese: 首页逛一逛推荐换口味点击跳转到此页面
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
// 导入 toast 插件
import Toast, {DURATION} from 'react-native-easy-toast'

import { TextButton } from '../../common/';
import {  ImgUrls, Colors } from '../../assets/';

export default class HomeTaste extends Component{

  constructor(props){
    super(props);
    this.state = {
      dataList:{
        index:0,  // 选中分类的数量
        data:[    // 分类数据
          {id:0,title:'女装',flag:false,img:ImgUrls.home_guang_01},
          {id:1,title:'酒水',flag:false,img:ImgUrls.home_guang_02},
          {id:2,title:'茶叶',flag:false,img:ImgUrls.home_guang_03},
          {id:3,title:'陶瓷',flag:false,img:ImgUrls.home_guang_04},
          {id:4,title:'食品',flag:false,img:ImgUrls.home_guang_05},
          {id:5,title:'饮料',flag:false,img:ImgUrls.home_guang_06},
        ]
      }
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#fff',padding:10,}}>
        <View style={styles.topText}>
           <Text style={{fontSize:16,fontWeight:'700'}}>请选择</Text><Text>已选择 {this.state.dataList.index}/4</Text>
        </View>
        <View style={styles.content}>
          { this.state.dataList.data.map((item,i)=>{
            return  <TextButton
                      key={i} 
                      touchStyle={item.flag?[styles.box,styles.borderColorRed]:[styles.box,styles.borderColorGary]} 
                      onPress={ ()=>{this._onSelect(item.id,item.title,i)} } 
                      style={ item.flag?styles.textColorRed:styles.textColorGary } 
                      text={item.title} 
                    />
          })}
        </View>
        <TextButton onPress={()=>{this._onPush('Home')}} touchStyle={styles.btn} style={styles.btnText} text="确 定" />
        <Toast ref="toast" opacity={0.7} position="center" textStyle={{fontWeight: '700',color:'#fff'}}/>
      </View>
    )
  }

  /**
   * 点击分类后选中当前项
   */
  _onSelect(id,title,i){
    var list = this.state.dataList;
    list.data.map((item,i)=>{
      if(item.id === id){
        if(item.flag == false && list.index < 4){
          list.index++
          item.flag = !item.flag;
        }else if(item.flag == true){
          list.index--
          item.flag = !item.flag;
        }else{
          this.refs.toast.show('最多只能选择4个分类！')
        }
        return
      }
    })
    this.setState({
      dataList:list
    })
  }
  /**
   * 点击确认按后获取选中的数据传递给 Home 首页
   */
  _onPush(screen){
    var list = this.state.dataList;
    var info = [];
    list.data.map((item,i)=>{
      if(item.flag === true){
        info.push(item.title);
      }
    })
    alert('选择了'+list.index+'个分类，分别为:'+info)
    const { navigate } = this.props.navigation;
    navigate(screen,{info:info})
  }


}

const styles = StyleSheet.create({
  topText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  content:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box:{
    width: '25%',
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderColorGary:{
    borderColor: '#777',
  },
  textColorGary:{
    color: '#777',
  },
  borderColorRed:{
    borderColor: Colors.app_color,
    backgroundColor: '#fff',
  },
  textColorRed:{
    color: Colors.app_color,
  },
  btn:{
    backgroundColor: Colors.app_color_yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    borderRadius: 6,
  },
  btnText:{
    color: '#fff',
  }

})