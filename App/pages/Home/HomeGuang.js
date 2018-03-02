/**
 * Created by date on 2018/03/02
 * Function: 逛一逛页面 
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
import { HeaderSearch } from '../../components/';
import { ImgButton } from '../../common/';
// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class HomeGuang extends Component{

  constructor(props){
    super(props);
    this.state = {
      list: [], // 全部数据
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:"yellowgreen"}} >
        {/* 头部搜索 */}
        <HeaderSearch 
          onPress={()=>{this._navigate('Mine')}}
          onFocus={()=>{this._navigate('ShopCart')}}
        />
        {/* tab 栏 */}
        <ScrollableTabView
          locked={true}
          tabBarActiveTextColor={Colors.app_color} // 选中时标签栏文本的颜色，默认为navy
          tabBarInactiveTextColor='#ccc'           // 未选中时标签栏文本的颜色，默认为black
          tabBarTextStyle={// 标签栏文本的其他样式。例：{fontFamily: 'Roboto', fontSize: 15}
            {fontSize:14,paddingTop:10,}
          }    
          tabBarUnderlineStyle={{ // 默认选项卡栏下划线的样式。
            backgroundColor:Colors.app_color,
          }}>
          {/* 云端仓储 */}
          <View style={CommonStyles.container} tabLabel="云端仓储">
          </View>
          {/* 女装 */}
          <View style={CommonStyles.container} tabLabel="女装">
          </View>
          {/* 男装 */}
          <View style={CommonStyles.container} tabLabel="男装">
          </View>
          {/* 茶叶 */}
          <View style={CommonStyles.container} tabLabel="茶叶">
          </View>
          {/* 酒类 */}
          <View style={CommonStyles.container} tabLabel="酒类">
          </View>
          {/* 小家电 */}
          <View style={CommonStyles.container} tabLabel="小家电">
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
              <View style={styles.listLeft} >
                <ImgButton source={{uri:item.img}} style={styles.icon} />
              </View>
              <View style={styles.listRight} >
                <Text style={styles.name} numberOFLines={1} >{item.name}</Text>
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
    )
  }

  _navigate(screen){
    const {navigate} = this.props.navigation;
    navigate(screen)
  }
}

const styles = StyleSheet.create({

})