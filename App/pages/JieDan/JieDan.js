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
import axios from 'axios';

export default class JieDan extends Component {

  constructor(props){
    super(props);
    this.state={
      workList:[
          {
            "organizationName": "山岩有市公岩中公岩中岩展发市堂堂市发易贸展展限贸岩易展市易发堂市山贸司",
            "activityName": "站设设设网网站网设网站计设站站站网",
            "orderCount": 27,
            "activityDescribe": "细上及平空到期育气通养直器。却知道知体性场参第利半国眼复市铁。放照中变流小生因都合土他教京。",
            "organizationId": "640000198706082032",
            "activityId": "460000199702087558",
            "activityPrice": 488.99,
            "createTime": 1510020109000,
            "logo": "http://dummyimage.com/400x400/bcf279/FFF.png&text=公司LOGO",
            "startTime": 1509984000000,
            "endTime": 1534435199000,
            "cutOffStatus": 0,
            "workOrderDeliverDate": "2018-05-31 23:59:59"
        }
      ],
      waitList:[
        {cutOffTime:'2017-09-09 14:22',orderNo:4033398282990100,dividendMoney:25.22},
      ],
      sellList:[
        {cutOffTime:'2017-09-09 14:22',orderNo:4033398282990100,dividendMoney:25.22},
      ],

    }
  }

  componentDidMount(){
    this._getWaitList();
    this._getSellList();
    this._getWorkList();
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
          data={this.state.waitList}
          renderItem={({item})=>{
            return (
              <View style={styles.listbox}>
                <View>
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.cutOffTime}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}><Text style={styles.font12}>订单编号：</Text>{item.orderNo}</Text>
                  <Text style={[styles.pirceStyle,{color:Colors.app_color,}]}><Text style={styles.font12}>￥</Text> {item.dividendMoney}</Text>
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
                  <Text style={{fontSize:12,color:'#b0b0b0'}}>订单时间：{item.cutOffTime}</Text>
                  <Text style={[styles.pirceStyle,{marginTop: 4,marginBottom:4,}]}>订单编号：{item.orderNo}</Text>
                </View>
                <View style={{width:60}}>
                  <Text style={[styles.pirceStyle,{color: '#e04967',}]}>￥{item.dividendMoney}</Text>
                </View>
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
          data={this.state.workList}
          renderItem={({item})=>{
            return (
              <View style={{height:310,borderBottomWidth:10,borderColor:'#f4f4f4'}} >
                <View style={styles.listTop} >
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.img} source={{uri:item.logo}} />
                    <Text style={[styles.nameText,{width:"80%"}]} numberOfLines={1}>{item.organizationName}</Text>
                  </View>
                  <Text style={styles.demandStyle} numberOfLines={1}>{item.activityName}</Text>
                  <View style={styles.flexStyle} >
                    <Text style={[styles.font14,]} >预算：<Text style={{color:Colors.app_color}} >{item.activityPrice}</Text></Text>
                    <Text style={[styles.font14,]} ><Text style={{color:'#444'}} >要求交付时间：</Text>{item.endTime}</Text>
                  </View>
                </View>
                <View style={styles.listBottom} >
                  <Text style={styles.describeStyle}>需求描述：</Text>
                  <View style={{position:'relative',height: 100}}>
                    <Text style={styles.describeStyle} numberOfLines={3}>{item.activityDescribe}</Text>
                    <Text style={styles.gengduo} >+ 更多</Text>
                  </View>
                  <View style={styles.flexStyle}>
                    <Text style={{fontSize:12,color:'#ccc'}}>已有{item.orderCount}人抢单</Text>
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

  /**
   * 获取待抢列表数据 
   */
  _getWaitList(){
    // let url = "http://192.168.1.145:8200/api/cutOff/list"
    let url = Contants.API+'GET/api/cutOff/list'
    let params = {
      appId:10000,
      data:'%7B"time":"","userId":"17d5b069e48b4e0981c5230b6fe48d1e"%7D'
    }
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    fetch(url)
    .then((response)=> response.json())
    .then((resJson)=>{
      resJson.data.map((item,i)=>{
        item.cutOffTime = new Date(item.cutOffTime).toLocaleString().replace(/年|月/g, "-").replace(/\//g, "-").replace(/日|下午|上午/g, ""); 
      })
      this.setState({
        waitList:resJson.data
      })
    })
    .catch((error)=>{
      console.log('获取待抢列表数据失败！')
    })
  }
  
  /**
   * 获取已经抢列表数据
   */
  _getSellList(){
    // let url = "http://192.168.1.145:8200/api/cutOff/cutOrderList"
    let url = Contants.API+'GET/api/cutOff/cutOrderList'
    let params = {
      appId:10000,
      data:'%7B"time":"","type":"S_10004","userId":"17d5b069e48b4e0981c5230b6fe48d1e"%7D'
    }
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    fetch(url)
    .then((response)=> response.json())
    .then((resJson)=>{
      resJson.data.map((item,i)=>{
        item.cutOffTime = new Date(item.cutOffTime).toLocaleString().replace(/年|月/g, "-").replace(/\//g, "-").replace(/日|下午|上午/g, ""); 
      })
      this.setState({
        sellList:resJson.data
      })
    })
    .catch((error)=>{
      console.log('获取已经抢列表数据失败！')
    })
  }

  /**
   * 获取工作截单列表数据 
   */
  _getWorkList(){
    // let url = "http://192.168.1.145:8200/api/workOrder/demandListUser";
    let url = Contants.API+'GET/api/workOrder/demandListUser';
    let params = {
      appId:10000,
      data: '%7B"userId":"17d5b069e48b4e0981c5230b6fe48d1e","pageNum":1%7D'
    }
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    fetch(url)
    .then((response)=> response.json())
    .then((resJson)=>{
      resJson.data.list.map((item,i)=>{
        item.endTime = new Date(item.endTime).toLocaleString().replace(/年|月/g, "-").replace(/\//g, "-").replace(/日|下午|上午/g, ""); 
      })
      this.setState({
        workList:resJson.data.list,
      })
      console.log(resJson.data.list)
    })
    .catch((error)=>{
      console.log('获取工作截单数据失败！')
    })
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