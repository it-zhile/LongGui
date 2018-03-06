/**
 * Created by date on 2018/03/02
 * Function: 逛一逛页面 
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
import { HeaderSearch } from '../../components/';
import { ImgButton } from '../../common/';
// 导入 tab栏 插件
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

export default class HomeGuang extends Component{

  constructor(props){
    super(props);
    this.state = {
      list: [],           // 全部数据
      womenList: [],      // 女装数据
      menList: [],        // 男装数据
      teaList: [],        // 茶叶数据
      liquorList: [],     // 酒类数据
      appliancesList: [], // 小家电数据
      
    }
  }

  /**
   * 生命周期 componentDidMount 
   * componentDidMount() 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，
   * componentDidMount() 方法中的子组件在父组件之前执行 
   * 从这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
   */
  componentDidMount() { 
    this._getList();
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:"#fff"}} >
        {/* 头部搜索 */}
        <HeaderSearch 
          onPress={()=>{this._navigate('Mine')}}
          onFocus={()=>{this._navigate('Search')}}
        />
        {
          /*
           * ScrollableTabView：tab 栏插件 
           *  - initialPage：初始化时被选中的Tab下标，默认是0（即第一页）。
           *  - locked：是否能拖动视图，默认为false（表示可以拖动）
           *  - tabBarActiveTextColor：选中时标签栏文本的颜色，默认为navy
           *  - tabBarInactiveTextColor：未选中时标签栏文本的颜色，默认为black
           *  - tabBarTextStyle：标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
           *  - tabBarUnderlineStyle：默认选项卡栏下划线的样式。
           *  - renderTabBar：TabBar的样式，系统提供了两种分别是 DefaultTabBar 和 ScrollableTabBar 。
           *     - DefaultTabBar：Tab会平分在水平方向的空间（默认）
           *     - ScrollableTabBar：Tab可以超过屏幕范围，滚动可以显示。
           */
        }
        <ScrollableTabView
          initialPage={0}
          locked={false}
          tabBarActiveTextColor={Colors.app_color}
          tabBarInactiveTextColor='#ccc'
          tabBarTextStyle={{fontSize:14,}}   
          tabBarUnderlineStyle={{backgroundColor:Colors.app_color}}  
          renderTabBar={() => <ScrollableTabBar />} >
          {/* 云端仓储 */}
          <View style={CommonStyles.container} tabLabel="云端仓储">
            { this.renderList(this.state.list) }
          </View>
          {/* 女装 */}
          <View style={CommonStyles.container} tabLabel="女装">
            { this.renderList(this.state.womenList) }
          </View>
          {/* 男装 */}
          <View style={CommonStyles.container} tabLabel="男装">
            { this.renderList(this.state.menList) }
          </View>
          {/* 茶叶 */}
          <View style={CommonStyles.container} tabLabel="茶叶">
            { this.renderList(this.state.teaList) }
          </View>
          {/* 酒类 */}
          <View style={CommonStyles.container} tabLabel="酒类">
            { this.renderList(this.state.liquorList) }
          </View>
          {/* 小家电 */}
          <View style={CommonStyles.container} tabLabel="小家电">
            { this.renderList(this.state.appliancesList) }
          </View>

        </ScrollableTabView>
      </View>
    )
  }

    /**
   * renderList(){return()} 渲染列表函数 
   */
  renderList(list){
    return(
      <ScrollView>
        { list.map((item,i,arr)=>{
          return(
            <View key={i} style={styles.list} >
              <ImgButton source={{uri:item.img}} style={styles.icon} />
              <View style={styles.listRight} >
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <View style={styles.zhuan} >
                  <Text style={{fontSize: 10,fontWeight:"700"}} >消费·赚<Text style={{color:Colors.app_color_yellow}}>￥{item.price_xiaofei}</Text></Text>
                  <Text style={{fontSize: 10,fontWeight:"700"}} >推广·赚<Text style={{color:Colors.app_color_yellow}}>￥{item.price_tuiguang}</Text></Text>
                  <Text style={{fontSize: 10,fontWeight:"700"}} >代理·赚<Text style={{color:Colors.app_color_yellow}}>￥{item.price_daili}</Text></Text>
                </View>
                <View style={styles.listBottom} >
                  <Text style={{color:Colors.app_color,fontSize:18}} >￥{item.price}</Text>
                  <TouchableOpacity onPress={()=>{this._changeStates(item.ID)}} style={item.states?styles.btn:styles.btn2} >
                    <Text style={item.states?styles.btnText:styles.btnText2} >{item.states?'上架':'下架'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    )
  }

  _navigate(screen){
    const {navigate} = this.props.navigation;
    navigate(screen)
  }
  /** 获取数据 */
  _getList(){
    fetch(Contants.API+"GET/api/guang",{ method:'GET'})
    .then((response)=> response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      var arr1 = [];
      var arr2 = [];
      var arr3 = [];
      var arr4 = [];
      var arr5 = [];
      responseJson.data.map((item)=>{
        if(item.typeID === 1){
          arr1.push(item)
        }else if(item.typeID === 2){
          arr2.push(item)
        }else if(item.typeID === 3){
          arr3.push(item)
        }else if(item.typeID === 4){
          arr4.push(item)
        }else if(item.typeID === 5){
          arr5.push(item)
        }
      })
      this.setState({
        list: responseJson.data,
        womenList: arr1,
        menList: arr2,
        teaList: arr3,
        liquorList: arr4,
        appliancesList: arr5,
      })
    })
  }

  /**
   * _changeStates(ID){} 改变上下架状态
   *  1.0 将当前点击的ID值入
   *  2.0 存储要遍历的数据
   *  3.0 遍历数据判断每项的ID是不相等全传入的ID
   *  4.0 如果相等则对当前项的states值进行取反
   *  5.0 将改变后的list数据重新赋值到state状态的原数据 
   */
  _changeStates(ID){
    var list = this.state.list;
    list.map((item)=>{
      if(item.ID === ID){
        item.states = !item.states
        return
      }
    })
    this.setState({
      list:list
    })
  }

}

const styles = StyleSheet.create({
  /* 列表样式 */
  list:{
    height: 132,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLeft:{
    width: 110,
    height: 110,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    width: 110,
    height: 110,
    resizeMode: 'stretch',
  },
  listRight:{
    flex: 1,
    height: 100,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name:{
    fontSize: 16,
    lineHeight: 26,
  },
  zhuan:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listBottom:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn:{
    width: 78,
    height: 27,
    borderWidth: 1,
    borderColor: Colors.app_color_yellow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText:{
    color: Colors.app_color_yellow,
  },
  btn2:{
    width: 78,
    height: 27,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText2:{
    color: '#ccc',
  },
})