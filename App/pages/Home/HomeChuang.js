/**
 * Created by date on 2018/03/01
 * Funciton: 闯一闯页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
// 导入自定义组件
import { HeaderSearch } from '../../components/';
// 导入公用组件
import { ImgButton } from '../../common/';

// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class HomeChuang extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[],          // 页面全部数据
      cateList:[],      // 食品数据
      grouponList:[],   // 团购数据
      educationList:[], // 教育数据
      trainList:[],     // 培训数据
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
      <View style={{flex:1,backgroundColor:"#fff"}}>
        {/* 头部搜索 */}
        <HeaderSearch 
          onPress={()=>{this._navigate('Mine')}}
          onFocus={()=>{this._navigate('Search')}}
        />
        {/* tab 栏 */}
        <ScrollableTabView
          locked={false}
          tabBarActiveTextColor={Colors.app_color} // 选中时标签栏文本的颜色，默认为navy
          tabBarInactiveTextColor='#ccc'           // 未选中时标签栏文本的颜色，默认为black
          tabBarTextStyle={// 标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
            {fontSize:14,paddingTop:10,}
          }    
          tabBarUnderlineStyle={{ // 默认选项卡栏下划线的样式。
            backgroundColor:Colors.app_color,
          }}                    
          >
          {/* 全部企业 */}
          <View style={CommonStyles.container} tabLabel="全部企业">
            { this.renderList(this.state.list) }
          </View>
          {/* 食品 */}
          <View style={CommonStyles.container} tabLabel="食品">
            { this.renderList(this.state.cateList)}
          </View>
          {/* 团购 */}
          <View style={CommonStyles.container} tabLabel="团购">
            { this.renderList(this.state.grouponList)}
          </View>
          {/* 教育 */}
          <View style={CommonStyles.container} tabLabel="教育">
            { this.renderList(this.state.educationList)}
          </View>
          {/* 培训 */}
          <View style={CommonStyles.container} tabLabel="培训">
            { this.renderList(this.state.trainList)}
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
      <View>
        <ScrollView>
          { list.map((item,i,arr)=>{
            return(
              <View key={i} style={styles.list} >
                <View style={styles.listLeft} >
                  <ImgButton source={{uri:item.img}} style={styles.icon} />
                </View>
                <View style={styles.listRight} >
                  <Text style={styles.name} numberOFLines={1}>{item.name}</Text>
                  <Text style={styles.intro} numberOfLines={2}>{item.intro}</Text>
                  <View style={styles.listBottom} >
                    <Text style={{fontSize: 12,}} >代码费:<Text style={{color:Colors.app_color,fontSize:16}} >￥{item.price}/年</Text></Text>
                    <TouchableOpacity style={styles.btn} >
                      <Text style={styles.btnText} >购入代理</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  /**
   * _navigate(screen){} 页面跳转事件
   */
  _navigate(screen){
    const {navigate} = this.props.navigation;
    navigate(screen);
  }
  /**
   * _getList(){} 发送请求获取数据
   */
  _getList(){
    fetch(Contants.MockAai+"GET/api/chuang",{ method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        responseJson.data.map((item)=>{
          if(item.typeID === 1){
            arr1.push(item)
          }else if(item.typeID === 2){
            arr2.push(item)
          }else if(item.typeID === 3){
            arr3.push(item)
          }else if(item.typeID === 4){
            arr4.push(item)
          }
        })
        this.setState({
          list:responseJson.data,
          cateList:arr1,
          grouponList:arr2,
          educationList:arr3,
          trainList:arr4,
        });
        console.log(this.state.list);
        console.log(this.state.cateList);
        console.log(this.state.grouponList);
        console.log(this.state.educationList);
        console.log(this.state.trainList);
      })
      .catch((error) => {
        console.error("闯一闯页面请求失败！！！");
      }
    );
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
    width: 80,
    height: 80,
    resizeMode: 'stretch',
  },
  listRight:{
    flex: 1,
    height: 110,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name:{
    fontSize: 16,
  },
  intro:{
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 10,
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
  }
})