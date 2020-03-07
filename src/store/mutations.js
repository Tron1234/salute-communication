import lang from 'lang'
import * as types from './mutations-types'
//tabBar的名字用于下面遍历
export default {
  //给tabBar设置颜色对应的图片和国际化的语言
  [types.CHANGETABBARMAINCOLOR](state) {
    for (let i = 0; i < state.tabBarName.length; i++) {
      uni.setTabBarItem({
        index: i,
        text: lang.i18n.t(`tabBar.${state.tabBarName[i]}`),
        iconPath: `/static/img/common/tabBar/${state.tabBarName[i]}.png`,
        selectedIconPath: `/static/img/${state.mainColor}/tabBar/${state.tabBarName[i]}_active.png`
      })
    }
  },
  //给tabBar设置颜色对应的文字
  [types.CHANGESELECTEDCOLOR](state) {
    uni.setTabBarStyle({
      color: "#707070",
      selectedColor: this.getters.getHexColor,
    })
  },
  [types.CHANGEMAINCOLOR](state) {
    for (let colorAttr in state.chooseMainColor) {
      if ((colorAttr.toLowerCase()).indexOf(state.mainColor) != -1) {
        state.chooseMainColor[colorAttr] = true;
      } else {
        state.chooseMainColor[colorAttr] = false;
      }
    }
  }
}
