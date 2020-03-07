import * as colorTypes from 'store/mainColor-types.js'
export default{
  //获取颜色Hex的值
  getHexColor(state){
    let HexColor;
    for(let key in colorTypes){
      if(key.indexOf(state.mainColor.toUpperCase())!=-1&&key.endsWith("HEXCOLOR")){
        HexColor=colorTypes[key];
        break;
      }
    }
    return HexColor;
  }
}