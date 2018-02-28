/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
// 导入 react 与 Component 用来创建组件
import React, { Component } from 'react';
// 导入 react-native 用来使用 ReactNative 里的内置组件
import { Platfrom, Dimensions, StyleSheet, View, Text, Image, TextInput } from 'react-native';

// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入公用组件
import { ImgButton, TextButton } from '../../common/';

// 获取屏幕宽度
const {width} = Dimensions.get('window');

/**
 * 创建并返回一个名为 Home 的组件
 */
export default class Home extends Component {

  /**
   * constructor(props){}：
   * super(props)：
   * this.state：
   */
  constructor(props) {
    super(props);
    this.state = { };
  }

  /**
   * render(){}：渲染的内容，所有要显示的内容必须放在 render 函数内
   * return()：如果只有一个标签可以不用()，多个标签必需使用否则报错
   * View：相当于 html 里的 div 标签
   */
  render(){
    return (
      <View style={{flex:1,backgroundColor:'pink'}}>
        {/* 头部 */}
        { this.renderHeader() }
      </View>
    )
  }

  /**
   * renderHeader(){ return() } 渲染头部函数
   * Image：图片组件
   *  - source：图片的地址路径，本地图片需使用 require() 方法来引入图片路径 source={require('../image/01.jpg')}
   * ImgButton：自定义可点击的 Image 公用组件
   *  - onPress 类型（function）：点击事件
   * TextInput：输入框组件
   *  - placeholder 类型（string）：默认显示文本，如果没有任何文字输入，会显示此占位字符串。
   *  - placeholderTextColor 类型（string）：占位字符串显示的文字颜色
   *  - underlineColorAndroid 类型（string）：文本框的下划线颜色，如要去掉将此属性设为透明 transparent 
   */
  renderHeader(){
    return(
      <View style={styles.header} >
        <ImgButton onPress={()=>{ alert('点击了头像')}} source={ ImgUrls.home_touxiang } style={styles.touxiang} />
        <View style={styles.search}>
          <TextInput
            style={styles.ipt}
            placeholder="请输入您要搜索的内容"
            placeholderTextColor="#ccc"
            underlineColorAndroid="transparent" 
          />
          <Image source={ ImgUrls.home_search } style={ styles.iconSearch } /> 
        </View>
        <ImgButton onPress={()=>{ alert('点击了扫码按钮')} } source={ ImgUrls.home_scanner} style={styles.iconScanner} />
      </View>
    )
  }


}

/**
 * StyleSheet.create({})：创建多个样式对象
 */ 
const styles = StyleSheet.create({ 
  /* 头部样式 */
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
  search:{
    width: 260,
    height: 26,
    position: 'relative',
  },
  ipt:{
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 0,
    paddingLeft: 24,
  },
  iconSearch:{
    width: 16,
    height: 16,
    tintColor: '#ccc',
    position: 'absolute',
    left: 4,
    top: '50%',
    marginTop: -8,
  },
  iconScanner:{
    width: 24,
    height: 24,
    tintColor: '#fff',
  }
})