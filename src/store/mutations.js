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
	//给tabBar女孩设置颜色对应的图片和国际化的语言
	[types.CHANGETABBARGIRLMAINCOLOR](state) {
		let rebotName = "";
		if (name != '') {
			rebotName = name;
		} else {
			rebotName = lang.i18n.t(`tabBar.${state.tabBarName[0]}`)
		}
		for (let i = 0; i < state.tabBarName.length; i++) {
			if (i == 0) {
				uni.setTabBarItem({
					index: i,
					text: rebotName,
					iconPath: `/static/img/common/tabBar/${state.tabBarNameGirl[i]}.png`,
					selectedIconPath: `/static/img/${state.mainColor}/tabBar/${state.tabBarNameGirl[i]}_active.png`
				})
			} else {
				uni.setTabBarItem({
					index: i,
					text: lang.i18n.t(`tabBar.${state.tabBarNameGirl[i]}`),
					iconPath: `/static/img/common/tabBar/${state.tabBarNameGirl[i]}.png`,
					selectedIconPath: `/static/img/${state.mainColor}/tabBar/${state.tabBarNameGirl[i]}_active.png`
				})
			}
		}
	},
	//给tabBar男孩设置颜色对应的图片和国际化的语言
	[types.CHANGETABBARBOYMAINCOLOR](state, name) {
		let rebotName = "";
		if (name != '') {
			rebotName = name;
		} else {
			rebotName = lang.i18n.t(`tabBar.${state.tabBarName[0]}`)
		}
		for (let i = 0; i < state.tabBarName.length; i++) {
			if (i == 0) {
				uni.setTabBarItem({
					index: i,
					text: rebotName,
					iconPath: `/static/img/common/tabBar/${state.tabBarNameBoy[i]}.png`,
					selectedIconPath: `/static/img/${state.mainColor}/tabBar/${state.tabBarNameBoy[i]}_active.png`
				})
			} else {
				uni.setTabBarItem({
					index: i,
					text: lang.i18n.t(`tabBar.${state.tabBarNameBoy[i]}`),
					iconPath: `/static/img/common/tabBar/${state.tabBarNameBoy[i]}.png`,
					selectedIconPath: `/static/img/${state.mainColor}/tabBar/${state.tabBarNameBoy[i]}_active.png`
				})
			}
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
	},
	[types.CHANGETHEMECOLOR](state, color) {
		state.mainColor = color;
	}
}
