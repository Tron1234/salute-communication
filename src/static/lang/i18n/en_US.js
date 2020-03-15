const en_US = {
  lang: 'en',
  loading: 'loading...',
  publish:'Publish',
  submit:'Submit',
  cancel:'Cancel',
  back: 'Back',
  errorToast: {
    phoneError: 'Wrong Number',
    passwordError: 'Bad Format',
    contentNotNull:'Incorrect Input',
    timeOut:'Request Timeout',
    doublePasswordError:'Inconsistent Passwords',
    loginFailed:'Login Failed',
    interfaceFailure:'Interface Failure'
  },
  login: {
    loginTitle: 'Hello,\nZhi Liao!',
    inputPhoneTitle: 'Phone Number',
    inputPhonePlaceholder: 'Please enter phone number',
    inputPasswordTitle: 'Password',
    inputPasswordPlaceholder: 'Please enter the password',
    loginText: 'Sign In',
    otherLoginText: 'Others Login',
    forgetPassword: 'Forget Password',
    register: 'Sign Up'
  },
  register: {
    registerText: 'Sign Up',
    inputPhoneTitle: 'Phone Number',
    inputPhonePlaceholder: 'Please enter phone number',
    inputPasswordTitle: 'Password',
    inputPasswordPlaceholder: 'Please enter the password',
    inputPasswordTip:'Tip:Contains uppercase,lowercase letters,numbers',
    inputVerCodeTitle: 'Verification Code',
    inputVerCodePlaceholder: 'Please enter code',
    inputVerCodeButton: 'Get Code'
  },
  forgetPassword:{
    forgetPasswordText:'Forget Password',
    inputPhoneTitle: 'Phone Number',
    inputPhonePlaceholder: 'Please enter phone number',
    inputPasswordTitle: 'Password',
    inputPasswordPlaceholder: 'Please enter the password',
    inputRepasswordTitle: 'Confirm Password',
    inputRepasswordPlaceholder: 'Please confirm password',
    inputPasswordTip:'Tip:Contains uppercase,lowercase letters,numbers',
    inputVerCodeTitle: 'Verification Code',
    inputVerCodePlaceholder: 'Please enter code'
  },
  article:{
    search: {
      searchPlaceholder:'Search for related articles, videos',
      historyTitle:'Search history',
      clearHistory:'Clear history'
    },
    content:{
      backgroundColorTitle:'Background Color',
      fontSize:'Type Size',
      share:'Share',
      wechatShare:'WeChat',
      friendsShare:'Moments',
      QQShare:'QQ',
      weiboShare:'Weibo',
      moreShare:'More',
      shareSuccess:'Share Success',
      collect:'Collect',
      collected:'Cancel Collect',
      collectedTip: 'Collected',
      cancelCollectTip: 'Cancel Collect',
      report:'report',
      reportCategorys: [{
        title: 'Advertising or spam',
        status: false
      }, {
        title: 'Sensitive topics',
        status: false
      }, {
        title: 'Title does not match content',
        status: false
      }, {
        title: 'Grungy/Erotic Video',
        status: false
      }, {
        title: 'Plagiarism or unauthorized reprint',
        status: false
      }, {
        title: 'Other',
        status: false
      }],
      reportPlaceholder:'Please enter report information',
      commentBtn:'Please Comment !',
      commentInputPlaceholder:'Write your review',
      commentTitle:'Comment'
    },
    write:{
      writeTitle:'Write an article',
      inputTitlePlaceholder:'Please enter title',
      editorPlaceholder:'Please write an article',
      tipSaveDraftTitle:'Whether to save as a draft',
      noSave:'Don\'t save',
      save:'Save'
    }
  },
  profile: {
    index: {
      greetings: 'Good luck',
			article:'Article',
			like:'Likes',
			treatment:'Treat',
			message:'Message',
			basics:'basics',
			information:'Personal information',
			service:'Customer service',
			settings:'Settings'
    },
		settings:{
			title:'Settings',
			themeColor:'Theme color',
			language:'Language',
			notice:'Notice',
			robotNotice:'Rebot notice',
			articleNotice:'Article notice',
			treatNotice:'Treat notice',
			clearCaching:'Clear cache',
			help:'Help',
			about:'About'
		}
  },
  tabBar: {
    rebot: 'John',
    article: 'article',
    treatment: 'treat',
    profile: 'profile'
  }
}
export default en_US;
