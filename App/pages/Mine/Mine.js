/**
 * Created by date on 2018/02/27
 * Function: 个人中心页面
 * Desc:
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';

// 导入静态资源
import { ImgUrls, Colors, CommonStyles, Contants } from '../../assets/';
import { NavTop } from '../../components/';

export default class Mine extends Component {

  constructor(props){
    super(props);
    this.state={
      fenleiList:[
        {title:'数据钱包',iconUrl:ImgUrls.mine_fenlei_01},
        {title:'现金钱包',iconUrl:ImgUrls.mine_fenlei_02},
        {title:'我的收藏',iconUrl:ImgUrls.mine_fenlei_03},
        {title:'地址管理',iconUrl:ImgUrls.mine_fenlei_04},
        {title:'品牌管理',iconUrl:ImgUrls.mine_fenlei_05},
      ],
      list1:{
        title:'销售订单',
        itemArr:[
          {itemTitle:'待付款',itemIconUrl:ImgUrls.mine_icon_02},
          {itemTitle:'待发货',itemIconUrl:ImgUrls.mine_icon_01},
          {itemTitle:'已发货',itemIconUrl:ImgUrls.mine_icon_10},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'退货',itemIconUrl:ImgUrls.mine_icon_09},
        ],
      },
      list2:{
        title:'消费订单',
        itemArr:[
          {itemTitle:'待付款',itemIconUrl:ImgUrls.mine_icon_02},
          {itemTitle:'待发货',itemIconUrl:ImgUrls.mine_icon_01},
          {itemTitle:'待收货',itemIconUrl:ImgUrls.mine_icon_06},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'退货',itemIconUrl:ImgUrls.mine_icon_09},
        ],
      },
      list3:{
        title:'工作订单',
        itemArr:[
          {itemTitle:'待确认',itemIconUrl:ImgUrls.mine_icon_05},
          {itemTitle:'待交付',itemIconUrl:ImgUrls.mine_icon_07},
          {itemTitle:'待结算',itemIconUrl:ImgUrls.mine_icon_03},
          {itemTitle:'待评价',itemIconUrl:ImgUrls.mine_icon_04},
          {itemTitle:'申诉',itemIconUrl:ImgUrls.mine_icon_08},
        ],
      },
    }
  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* 头部导航 */}
        <NavTop title="个人中心" goBack={()=>{this.props.navigation.goBack()}} onMore={()=>{alert('点击了更多按钮！')}} />
        <ScrollView>
          {/* 头像区域 */}
          {this.renderHeader(this.state.fenleiList)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list1)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list2)}
          {/* 列表区域-销售订单 */}
          {this.renderList(this.state.list3)}
        </ScrollView>
      </View>
    )
  }

  /**
   * renderHeader(fenleiList){ return() } 创建头像区域函数
   * ImageBackground：背景图片组件
   * fenleiList.map((item,i)=>{return()})：简单理解，可以认为是forEah的加强版本，除了可以遍历数组，还扩充了其他功能。
   *  - 主要解决的问题：是通过一组数据映射为另一组数据
   *  - 返回值：原数组映射后的新数组
   *  - item：遍历对象的内容
   *  - i：遍历的次数
   *  - arr：原数组
   */ 
  renderHeader(fenleiList){
    return(
      <View style={{height:360,backgroundColor:'#fff',}}>
        <ImageBackground style={[styles.bgcImg]} source={ImgUrls.mine_bcgcolor_red}>
          <Image style={styles.touxiang} source={ImgUrls.home_touxiang} />
          <Text style={styles.nameStyle} >AmberSong</Text>
          <Text style={styles.entryStyle} >进入我的创业圈</Text>
          <View style={styles.cardStyle}>
            <Image style={{width:174,height:106,}} source={ImgUrls.mine_card} />
            <Image style={{width:174,height:106,}} source={ImgUrls.mine_shopping} />
          </View>
        </ImageBackground>
        <View style={styles.fenleiStyle} >
          {fenleiList.map((item,i,arr)=>{
            return (
              <TouchableOpacity key={i} onPress={()=>{this.onAlert()}} >
                <View style={{alignItems:'center'}}>
                  <Image style={styles.fenleiImg} source={item.iconUrl} />
                  <Text style={styles.fenleiText} >{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
  /**
   * renderList(){ return() } 渲染列表区域函数
   */ 
  renderList(list){
    return(
      <View style={styles.listStyle} >
        <View style={styles.listTop} >
          <Text>{list.title}</Text>
          <TouchableOpacity onPress={()=>{this.onAlert()}} >
            <Text>全部订单 ></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listBottom} >
          {list.itemArr.map((item,i)=>{
            return (
              <TouchableOpacity key={i} style={styles.listItem} onPress={()=>{this.onAlert()}} >
                <Image style={styles.listImg} source={item.itemIconUrl} />
                <Text style={styles.listText} >{item.itemTitle}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }


  onAlert(){
    alert('点击了按钮！')
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  /* 头像区域 */
  bgcImg:{
    height: 240,
    width:'100%',
    alignItems:'center',
  },
  touxiang:{
    width:98,
    height:98,
    borderRadius:49,
    marginTop: 20,
  },
  nameStyle:{
    marginTop:10,
    marginBottom:6,
    fontSize: 18,
    color: '#fff',
  },
  entryStyle:{
    fontSize: 12,
    color:'#fff',
  },
  cardStyle:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    position:'relative',
    marginTop:10,
  },
  fenleiStyle:{
    flex:1,
    marginTop:40,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  fenleiImg:{
    width:28,
    height:28,
    marginTop:10,
    marginBottom:8
  },
  fenleiText:{
    fontSize:12,
    color:'#5d5d5d'
  },
  /* 列表区域 */
  listStyle:{
    height:126,
    borderTopWidth:10,
    borderColor:'#f0f0f0',
    paddingLeft:10,
    paddingRight:10,
  },
  listTop:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  listImg:{
    width:26,
    height:26,
    marginTop: 4,
  },
  listText:{
    fontSize:12,
    color:'#5d5d5d',
    marginTop: 10,
  },
  listBottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  listItem:{
    alignItems:'center',
  }
})