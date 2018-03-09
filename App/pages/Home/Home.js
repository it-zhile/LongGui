/**
 * Created by date on 2018/02/27
 * Function: 首页
 * Desc:
 */
// 导入 react 与 Component 用来创建组件
import React, { Component } from 'react';
// 导入 react-native 用来使用 ReactNative 里的内置组件
import { Platfrom, Dimensions, StyleSheet, View, Text, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
// 导入轮播图插件
import Swiper from 'react-native-swiper';
// 导入 toast 插件
import Toast, {DURATION} from 'react-native-easy-toast'

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
   * 注意：这里的占位数据不能写null否则网请求回来的数据赋值后在render里调用会报错
   */
  constructor(props) {
    super(props);
    this.state = {
      swriperList:[],
      imgList:[],
      fenleiList:[
        {title:'女装',img:ImgUrls.home_guang_01},
        {title:'酒水',img:ImgUrls.home_guang_02},
        {title:'茶叶',img:ImgUrls.home_guang_03},
        {title:'陶瓷',img:ImgUrls.home_guang_04},
      ],
      chuangList:[
        { 
          title:'餐饮食品',
          data:[]
        },
      ],
      chuangData:[],
    };
  }

  /**
   * 生命周期 componentDidMount 
   * componentDidMount() 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，
   * componentDidMount() 方法中的子组件在父组件之前执行 
   * 从这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
   */
  componentWillMount() { 
    // 获取轮播图数据
    this._getImgList();
    // 闯一闯推荐列表数据处理
    // this._chuangList();
    // 获取行业
    this._getIndustry();
    // this._chuangList();
    this._getInfo();
  }

  /**
   * render(){}：渲染的内容，所有要显示的内容必须放在 render 函数内
   * return()：如果只有一个标签可以不用()，多个标签必需使用否则报错
   * View：相当于 html 里的 div 标签
   */
  render(){
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {/* 头部 */}
        { this.renderHeader() }
        {/* 滚动视图 */}
        <ScrollView>
          {/* 轮播图 */}
          { this.renderSwiper() }
          {/* 首页逛一逛、闯一闯入口 */}
          <View style={styles.gcEntry}>
            <ImgButton onPress={()=>{ this._navigate('HomeChuang') }} style={styles.gcImg} source={ImgUrls.home_chuang} />
            <ImgButton onPress={()=>{ this._navigate('HomeGuang') }}  style={styles.gcImg} source={ImgUrls.home_guang} />
          </View>
          {/* 逛一逛标题 */}
          { this.renderTitle('逛一逛推荐',()=> this._navigate('HomeTaste'),'换口味 〉') }
          {/* 分类 */}
          { this.renderFenLei() }
          {/* 闯一闯标题 */}
          { this.renderTitle('闯一闯推荐',()=> this._navigate('HomeChuang'),'更多 〉') }
          {/* 闯一闯列表内容 */}
          { this.renderList() }
        </ScrollView>
        <Toast ref="toast" opacity={0.7} position="center" textStyle={{fontWeight: '700',color:'#fff'}}/>
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
            onFocus={()=>{this._navigate('Search')}}
          />
          <Image source={ ImgUrls.icon_search } style={ styles.iconSearch } /> 
        </View>
        <ImgButton onPress={()=>{ this._navigate('Scanner') }} source={ ImgUrls.icon_scanner} style={styles.iconScanner} />
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
            { this.state.swriperList.map((item,i)=>{
              return <ImgButton key={i} onPress={()=>{this.refs.toast.show('点击了第'+(i+1)+'张图片！')}} source={{uri:item.imageUrl}} style={styles.swiperImg} />
            })}
        </Swiper>
      </View>
    )
  }

  /**
   * renderTitle(title){ return() } 渲染标题函数
   *  - title：接收传递进来的内容作为标题文本
   *  - onpress：接收传递进来的事件
   */
  renderTitle(title,onpress,text){
    return (
      <View style={styles.TitleBox}>
        <View style={styles.title} >
          <View style={[styles.TitleBoxIcon,{borderTopLeftRadius: 2,borderBottomLeftRadius: 2,}]}></View>
          <Text style={styles.TitleText}>{title}</Text>
          <View style={[styles.TitleBoxIcon,{borderTopRightRadius: 2,borderBottomRightRadius: 2,}]}></View>
        </View>
        <View style={styles.TitleBoxRight} >
          <TextButton onPress={ onpress } style={styles.TitleRightText} text={text}/>
        </View>
      </View>
    )
  }

  /**
   * renderfenLei(){ return()} 渲染分类函数
   */
  renderFenLei(){
    return (
      <View style={styles.fenleiBox}>
        <View style={[styles.fenleiTopBottom,CommonStyles.borderBottom1,CommonStyles.borderColor_ccc]} >
          <View style={{flex:1}}>
            <ImgButton
              onPress={()=>{this._getTasteInfo()}} 
              style={styles.fenleiImg} 
              source={this.state.fenleiList[0].img} />
          </View>
          <View style={[CommonStyles.borderLeft1,CommonStyles.borderColor_ccc,{flex:1}]}>
            <ImgButton 
              style={styles.fenleiImg} 
              source={this.state.fenleiList[1].img} />
          </View>
        </View>
        <View style={styles.fenleiTopBottom} >
          <View style={{flex:1}}>
            <ImgButton 
              style={styles.fenleiImg} 
              source={this.state.fenleiList[2].img} />
          </View>
          <View style={[CommonStyles.borderLeft1,CommonStyles.borderColor_ccc,{flex:1}]}>
            <ImgButton 
              style={styles.fenleiImg} 
              source={this.state.fenleiList[3].img} />
          </View>
        </View>
      </View>
    )
  }

  /**
   * renderList(imgList){ return() }  渲染闯一闯列表内容函数
   * FlatList：列表组件
   *  - data 类型（Array）：要循环的数据，data属性目前只支持普通数组
   *  - renderItem 类型（Function）: 根据行数据 data 渲染每一行的组件
   *  - keyExtractor={(item, index) => index}：此函数用于为给定的item生成一个不重复的key
   *     - Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
   *     - 若不指定此函数，则默认抽取item.key作为key值。
   *     - 若item.key也不存在，则使用数组下标。 
   */
  renderList(){
    return (
      <View style={styles.listbox}>
      { this.state.chuangList.map((item,i)=>{
        return(
          <View key={i} style={styles.listItem}>
          <View style={styles.listItemLeft} >
            <Text style={styles.listItemLeftText}>{item.title}</Text>
          </View>
          <View style={styles.listItemRight}>
            { this.state.chuangData.map((info,i)=>{
              return(
                <TouchableOpacity key={i} style={styles.listItemRightItem}>
                  <Image style={styles.listImg} source={{uri:info.logoImage}} />
                  <Text numberOfLines={3} sytle={styles.listItemRightText}>{info.organizationName}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        )
      })}
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
  /**
   * 获取轮播图数据 
   */
  _getImgList(){
    fetch(Contants.API+'GET/'+'api/v1/advertisingContent/get?appId=10000',{ method: 'GET'})
    .then((response)=> response.json())
    .then((responseJson)=>{
      this.setState({
        swriperList: responseJson.data.gyg,
        imgList: responseJson.data.cyc,
      })
    })
    .catch((error) => {
      console.error("轮播图与闯一闯列表数据请求失败！！！");
    })
  }
  /**
   * 接收 HomeTaste 页面传递的数据
   */
  _getTasteInfo(){
    const { params } = this.props.navigation.state;
    if(params){
      alert(params.info)
    }
  }

    /**
   * 带参数的get请求封装
   */
  _getData(url,params,data){
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    
    fetch(url, { method: 'GET'})
    .then((response)=> response.json())
    .then((responseJson)=>{
      responseJson.data.organizationList.map((item)=>{
        data.push(item)
      })
    });
  }

  /**
   * 获取行业 - 带参数的get请求
   */
  _getIndustry(){
    let params = {
      "appId": "10000",
    };
    let url = 'GET/'+'api/common/industryByOrganization';
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
    }
    fetch(Contants.API+url)
    .then((response)=> response.json())
    .then((responseJson)=>{
      var list = []
      responseJson.data.map((item,i)=>{
        list.push({title:item.name,data:[]})
        // this._getData('http://192.168.1.145:8200/api/organization/listOrganization?appId=10000',item,list.data)
      })
      this.setState({
        chuangList:list,
      })
      console.log(responseJson.data)
    });
  }

  _getInfo(){
    let params = {"code": "A01","name": "线下零售","id": "A01","appId": 10000}
    let url = Contants.API+'POST/api/organization/listOrganization'
    fetch(url, { method: 'post',body:JSON.stringify(params)})
    .then((response)=> response.json())
    .then((responseJson)=>{
      this.setState({
        chuangData:responseJson.data,
      })
      console.log(responseJson)
    });
  }


  /**
   * 闯一闯推荐列表数据处理
   * 循环判断chuangList的每项data数据
   * 如果data数据小于4条就加上缺少的数据凑够4条
   * 如果data数据大于4条就减去多余数据保证数据只有4条
   */
  _chuangList(){
    var list = this.state.chuangList;
    for(var i = 0 ; i < list.length; i++){
      if(list[i].data.length<4){
        for(var k = 0 ; k < 5-list[i].data.length; k++){
          list[i].data.push({name:'虚位以待',icon:ImgUrls.home_picture_null})
        }
      }else if(list[i].data.length>4){
          list[i].data.splice(4)
      }
    }
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




  /* 首页逛一逛、闯一闯入口 */
  gcEntry:{
    height: 130,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white_fff,
  },
  gcImg:{
    width: 175,
    height:120,
  },



  /* 逛一逛标题 */
  TitleBox:{
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.white_fff,
    position: 'relative',
  },
  title:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  TitleText:{
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 16,
    color: '#474747',
  },
  TitleBoxIcon:{
    width: 14,
    height: 4,
    backgroundColor: '#474747',
  },
  TitleBoxRight:{
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -8,
  },
  TitleRightText:{
    color: Colors.app_color,
    fontSize: 12,
  },



  /* 分类 */
  fenleiBox:{
    height: 216,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#f1f1f1',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white_fff,
  },
  fenleiTopBottom:{
    flex: 1,
    flexDirection: 'row',
  },
  fenleiImg:{
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
  },



  /* 闯一闯列表内容 */
  cList:{
    flex: 1,
  },
  CLImgbox:{
    flex: 1,
    height: 130,
    borderBottomWidth: 10,
    borderColor: '#ccc',
    justifyContent:'center',
    alignItems: 'center',
  },
  CLImg:{
    width: '100%',
    height: '100%',
    resizeMode:'stretch',
    backgroundColor:'blue',
  },

  listbox:{
    flex:1,
  },
  listItem:{
    height: 160,
    backgroundColor:'#f1f1f1',
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  listItemLeft:{
    width: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#20c5d3',
    paddingTop: 15,
  },
  listItemLeftText:{
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  listItemRight:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  listItemRightItem:{
    width: '50%',
    height: '50%',
    borderWidth: 0.5,
    borderColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 70,
  },
  listImg:{
    width: 50,
    height: 50,
    marginRight: 10,
  },
  listItemRightText:{
  }

})