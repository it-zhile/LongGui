/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
// 导入 react 与 Component 用来创建组件
import React, { Component } from 'react';
// 导入 react-native 用来使用 ReactNative 里的内置组件
import { Platfrom, Dimensions, StyleSheet, View, Text, Image, TextInput } from 'react-native';
// 导入轮播图插件
import Swiper from 'react-native-swiper';

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
        {/* 轮播图 */}
        { this.renderSwiper() }
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
        <ImgButton onPress={()=>{ this._navigate('Mine') }} source={ ImgUrls.home_touxiang } style={styles.touxiang} />
        <View style={styles.search}>
          <TextInput
            style={styles.ipt}
            placeholder="请输入您要搜索的内容"
            placeholderTextColor="#ccc"
            underlineColorAndroid="transparent" 
          />
          <Image source={ ImgUrls.home_search } style={ styles.iconSearch } /> 
        </View>
        <ImgButton onPress={()=>{ this._navigate('Scanner') }} source={ ImgUrls.home_scanner} style={styles.iconScanner} />
      </View>
    )
  }

  /**
   * renderSwiper(){ return } 渲染轮播图函数
   * Swiper：轮播图组件
   *  - height 类型（number）：组件高度
   *  - loop 类型（boole）：如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
   *  - autoplay 类型（boole）：自动轮播
   *  - autoplayTimeout 类型（number）:每隔4秒切换
   *  - horizontal 类型（number）：轮播图的滑动方向，水平方向，为false可设置为竖直方向
   *  - paginationStyle 类型（object）：小圆点整体的样式
   *  - showsButtons 类型（boole）：左右控制按钮，为false时不显示控制按钮
   *  - showsPagination 类型（boole）：是否显示小圆点，为false不显示下方圆点
   *  - dot 类型（组件）：未选中的圆点样式
   *  - activeDot 类型（组件）：选中的圆点样式
   * 注意：使用轮播图组件时如果导航器开启了滑动切换与切换动画轮播图内的图片会不显示
   */
  renderSwiper(){
    return (
      <View style={{height:160  }}>
        <Swiper
            height={160}
            loop={true}
            autoplay={true}
            autoplayTimeout={4}
            horizontal={true}
            paginationStyle={{bottom: 10}}
            showsButtons={false}
            showsPagination={true}
            dot={<View style={{
                backgroundColor: 'rgba(255,255,255,.4)',
                width: 6,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}
            activeDot={<View style={{
                backgroundColor: 'rgba(255,255,255,.8)',
                width: 14,
                height: 6,
                borderRadius: 3,
                marginLeft: 2,
                marginRight: 2,
            }}/>}>
            <ImgButton onPress={()=>{alert('点击了图1')}} source={ImgUrls.home_swiper_01} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图2')}} source={ImgUrls.home_swiper_02} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图3')}} source={ImgUrls.home_swiper_03} style={styles.swiperImg} />
            <ImgButton onPress={()=>{alert('点击了图4')}} source={ImgUrls.home_swiper_04} style={styles.swiperImg} />
        </Swiper>
      </View>
    )
  }






  /**
   * 页面跳转事件
   * 通过 this.props.navigation 接收从主入口 index.js 里传递过来的 navigation 属性用来跳转页面
   */
  _navigate(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
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
  },



  /* 轮播图样式 */
  swiperImg:{
    width:'100%',
    height: 160,
    resizeMode :'stretch',
  },




})