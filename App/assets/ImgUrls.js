/**
 * Created by date on 2018/02/28
 * Function:所有图片入口
 * Desc:将图片统一管理，避免因改变路径后导致图片引用维护困难
 */

const ImgUrls = {
  /**
   * tabbar - 底部导航 
   */
  tabbar_home:require('./images/tabbar/首页-01.png'),
  tabbar_home_active:require('./images/tabbar/首页-active.png'),
  tabbar_jiedan:require('./images/tabbar/截单-01.png'),
  tabbar_jiedan_active:require('./images/tabbar/截单-active.png'),
  tabbar_shopcart:require('./images/tabbar/购物车-01.png'),
  tabbar_shopcart_active:require('./images/tabbar/购物车-active-01.png'),
  tabbar_mine:require('./images/tabbar/个人中心-01.png'),
  tabbar_mine_active:require('./images/tabbar/个人中心-active-01.png'),

  /**
   * home - 首页 
   */
  home_touxiang:require('./images/home/touxiang01.jpg'),
  home_search:require('./images/home/放大镜-01.png'),
  home_scanner:require('./images/home/扫码-01.png'),
  
}

export default ImgUrls;