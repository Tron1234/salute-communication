import * as error from './errorToast'

function checkMobile(num) {
  let mobileReg = /^(13|14|15|17|18)[0-9]{8}[0-9]$/;
  if (!mobileReg.test(num)) {
    error.phoneError();
    return false;
  }
  return true;
}

function checkPassword(pwd) {
  let passwordReg =
    /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![A-Z\W_!@#$%^&*`~()-+=+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$/;
  if (!passwordReg.test(pwd)) {
    error.passwordError();
    return false;
  }
  return true;
}

function getClientId(text) {
  let regex = /\"(.+?)\"/g;
  let options = text.match(regex)
  let result = options[1].substring(1, options[1].length - 1);
  return result;
}

function mainColorStyle(chooseMainColor,temp) {
  let index = 0;
  for (let i in chooseMainColor) {
    if (chooseMainColor[i]) {
      return temp[index];
    }
    index++;
  }
}

export {
  checkMobile,
  checkPassword,
  getClientId,
  mainColorStyle
}
