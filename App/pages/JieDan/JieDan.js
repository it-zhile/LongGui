/**
 * Created by date on 2018/02/27
 * Function: 截单页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native';
// 导入自定义组件
import { NavTop } from '../../components/';
// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';

// 导入 tab栏 插件
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class JieDan extends Component {

  constructor(props){
    super(props);
    this.state={
      list:[
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
        {
          imgUrl:ImgUrls.home_touxiang,
          name:'广东省广州市天源股份有限公司',
          demand:'需求名称，如LOGO设计-logo更新升级等等',
          pirce:'￥999',
          date:'2018-02-09',
          describe:'需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述需求描述',
          nmb:88
        },
      ],
      waitList:[
        {date:'2017-09-01 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-02 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-03 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-04 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-05 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-06 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-07 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-08 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-09 14:22',nmb:4033398282990100,pirce:25.22},
      ],
      sellList:[
        {date:'2017-09-01 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-02 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-03 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-04 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-05 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-06 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-07 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-08 14:22',nmb:4033398282990100,pirce:25.22},
        {date:'2017-09-09 14:22',nmb:4033398282990100,pirce:25.22},
      ],

    }
  }


  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/**
         * NavTop：头部导航，头部导航的标题与返回、更多按钮事件都由父组件传递
         * title：头部导航的标题
         * goBack：返回按钮的事件
         * onMore：更多按钮的事件
         */}
        <NavTop title="截单" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
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
          {/* 待抢列表 */}
          <View style={CommonStyles.container} tabLabel="待抢列表">
            {this.renderListWait()}
          </View>
          {/* 已抢列表 */}
          <View style={CommonStyles.container} tabLabel="已抢列表">
            {this.renderListAlready()}
          </View>
          {/* 工作截单 */}
          <View style={CommonStyles.container} tabLabel="工作截单">
            {this.renderWorkList()}
          </View>
        </ScrollableTabView>
      </View>
    )
  }

  /* 待抢列表 */
  renderListWait(){
    return(
      <View style={CommonStyles.container} >
        <FlatList 
          data={this.state.sellList}
          renderItem={({item})=>{
            return (
              <View style={styles.listbox}>
                <View>
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.date}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}><Text style={styles.font12}>订单编号：</Text>{item.nmb}</Text>
                  <Text style={[styles.pirceStyle,{color:Colors.app_color,}]}><Text style={styles.font12}>￥</Text> {item.pirce}</Text>
                </View>
                <TouchableOpacity onPress={()=> alert('点击了抢单按钮！')} >
                  <Image source={ImgUrls.jiedan_qiang} style={styles.waitimg}/>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  /* 已抢列表 */
  renderListAlready(){
    return(
      <View style={CommonStyles.container} >
        <FlatList 
          data={this.state.sellList}
          renderItem={({item})=>{
            return (
              <View style={styles.listbox2}>
                <View>
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.date}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}>订单编号：{item.nmb}</Text>
                </View>
                <Text style={[styles.pirceStyle,{color: '#e04967',}]}>￥ {item.pirce}</Text>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  /* 工作截单 */
  renderWorkList(){
    return(
      <View style={[styles.container,{marginBottom:-10}]} >
        <FlatList 
          data={this.state.list}
          renderItem={({item})=>{
            return (
              <View style={{height:310,borderBottomWidth:10,borderColor:'#f4f4f4'}} >
                <View style={styles.listTop} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.img} source={item.imgUrl} />
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={styles.demandStyle}>{item.demand}</Text>
                  <View style={styles.flexStyle} >
                    <Text style={[styles.font14,]} >预算：<Text style={{color:Colors.app_color}} >{item.pirce}</Text></Text>
                    <Text style={[styles.font14,]} ><Text style={{color:'#444'}} >要求交付时间：</Text>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.listBottom} >
                  <Text style={styles.describeStyle}>需求描述：</Text>
                  <View style={{position:'relative'}}>
                    <Text style={styles.describeStyle}>{item.describe}</Text>
                    <Text style={styles.gengduo} >+ 更多</Text>
                  </View>
                  <View style={styles.flexStyle}>
                    <Text style={{fontSize:12,color:'#ccc'}}>已有{item.nmb}人抢单</Text>
                    <View style={{width:80,height:26}}>
                    <Button
                      onPress={()=>{this._qiang()}}
                      title="抢" 
                      color={Colors.app_color_yellow} 
                    />
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }

  _qiang(){
    alert('抢单成功！！！')
  }
}

const styles = StyleSheet.create({
  listbox:{
    height: 102,
    paddingLeft: 20,
    paddingRight:20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  waitimg:{
    width: 60,
    height: 60,
  },
  font12:{
    fontSize: 12,
  },
  pirceStyle:{
    fontSize: 16,
  },

  listbox2:{
    height: 90,
    paddingLeft: 20,
    paddingRight:20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },

  /* 工作截单 */
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexStyle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  listTop:{
    height:120,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth:1,
    borderColor:'#ccc',
  },
  img:{
    width:44,
    height:44,
    borderWidth:0.8,
    borderColor:'#ccc',
    borderRadius:4,
  },
  nameText:{
    marginLeft:10,
    fontSize:14,
    color:'#444'
  },
  demandStyle:{
    marginTop:6,
    marginBottom:6,
    fontSize:16,
    color:'#444',
  },
  font14:{
    fontSize:14,
    color:'#ccc',
  },
  describeStyle:{
    fontSize:14,
    lineHeight: 26,
  },
  gengduo:{
    color:'#66b7ff',
    position:'absolute',
    bottom:4,
    right:0,
  },
  listBottom:{
    height:180,
    padding: 10,
  },
 })