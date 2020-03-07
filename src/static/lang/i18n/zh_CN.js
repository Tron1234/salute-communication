const zh_CN = {
  lang: 'zh',
  loading: '加载中...',
  publish: '发布',
  submit: '提交',
  cancel: '取消',
  back: '返回',
  errorToast: {
    phoneError: '手机号码有误',
    passwordError: '密码格式错误',
    contentNotNull: '输入有误',
    timeOut: '请求超时',
    doublePasswordError: '密码不一致',
    loginFailed: '登录失败',
    interfaceFailure: '接口失效'
  },
  login: {
    loginTitle: '你&emsp;好,\n致&nbsp;聊',
    inputPhoneTitle: '手机号码',
    inputPhonePlaceholder: '请输入手机号',
    inputPasswordTitle: '密&emsp;&emsp;码',
    inputPasswordPlaceholder: '请输入密码',
    loginText: '登&emsp;录',
    otherLoginText: '第三方登录',
    forgetPassword: '忘记密码',
    register: '注&emsp;&emsp;册'
  },
  register: {
    registerText: '注&emsp;册',
    inputPhoneTitle: '手机号码',
    inputPhonePlaceholder: '请输入手机号',
    inputPasswordTitle: '密&emsp;&emsp;码',
    inputPasswordPlaceholder: '请输入密码',
    inputPasswordTip: '提示:含大、小写字母和数字',
    inputVerCodeTitle: '验&nbsp;&nbsp;证&nbsp;&nbsp;码',
    inputVerCodePlaceholder: '请输入验证码',
    inputVerCodeButton: '验证码'
  },
  forgetPassword: {
    forgetPasswordText: '忘记密码',
    inputPhoneTitle: '手机号码',
    inputPhonePlaceholder: '请输入手机号',
    inputPasswordTitle: '密&emsp;&emsp;码',
    inputPasswordPlaceholder: '请输入密码',
    inputRepasswordTitle: '确认密码',
    inputRepasswordPlaceholder: '请确认密码',
    inputPasswordTip: '提示:含大、小写字母和数字',
    inputVerCodeTitle: '验&nbsp;&nbsp;证&nbsp;&nbsp;码',
    inputVerCodePlaceholder: '请输入验证码'
  },
  article: {
    search: {
      searchPlaceholder: '搜索相关文章、视频',
      historyTitle: '搜索记录',
      clearHistory: '清空搜索记录'
    },
    content: {
      backgroundColorTitle: '背景颜色',
      fontSize: '字号',
      share: '分享',
      wechatShare: '微信',
      friendsShare: '朋友圈',
      QQShare: 'QQ',
      weiboShare: '新浪微博',
      moreShare: '更多',
      shareSuccess: '分享成功',
      collect: '收藏',
      collected: '取消收藏',
      collectedTip: '已收藏',
      cancelCollectTip: '取消收藏',
      report: '举报',
      reportCategorys: [{
        title: '广告或垃圾信息',
        status: false
      }, {
        title: '涉及敏感话题',
        status: false
      }, {
        title: '标题与内容不符',
        status: false
      }, {
        title: '视频低俗/色情',
        status: false
      }, {
        title: '抄袭或未授权转载',
        status: false
      }, {
        title: '其他',
        status: false
      }],
      reportPlaceholder: '请输入举报信息',
      commentBtn: '评论一下 !',
      commentInputPlaceholder: '写下你的评论',
      commentTitle: '评&emsp;论'
    },
    write: {
      writeTitle: '编写文章',
      inputTitlePlaceholder: '请输入标题',
      editorPlaceholder: '请输入正文',
      tipSaveDraftTitle: '是否保存为草稿',
      noSave: '不保存',
      save: '保存'
    }
  },
  profile: {
    index: {
      greetings: '祝您幸福',
			article:'我的文章',
			like:'收藏和赞',
			treatment:'我的治疗',
			message:'我的消息',
			basics:'基础信息',
			information:'个人信息',
			service:'联系客服',
			settings:'设置'
    },
		settings:{
			title:'设置',
			themeColor:'主题色',
			language:'语言',
			notice:'通知',
			robotNotice:'机器人通知',
			articleNotice:'文章通知',
			treatNotice:'治疗通知',
			clearCaching:'清空缓存',
			help:'帮助',
			about:'关于'
		}
  },
  tabBar: {
    chat: '聊天',
    article: '文章',
    treatment: '治疗',
    profile: '我的'
  }
}
export default zh_CN;
