import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import * as colorTypes from 'store/mainColor-types.js'
Vue.use(Vuex);

const state = {
  //ORANGE,BLUE
  mainColor: colorTypes.ORANGE,
  chooseMainColor: {
    isOrange: true,
    isBlue: false,
    isGreen: false,
    isPink: false
  },
  tabBarName: ['chat', 'article', 'treatment', 'profile'],
  languages: [{
    lang:'zh_CN',
    name:'简体中文'
  }, {
    lang:'en_US',
    name:'English'
  }],
  articleCategorys:['最新热文','心里科普','婚恋情感','家庭关系','人际社交','学习烦恼']
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store;
