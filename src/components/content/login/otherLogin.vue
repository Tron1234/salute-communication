<template>
  <view class="othersLogin flexVerCenter">
    <view>{{$t('login.otherLoginText')}}</view>
    <view class="othersLoginButton">
      <my-icons type="weibo-login" size="50" color="#707070" @tap="weiboLogin"/>
      <my-icons type="QQ-login" size="50" color="#707070" @tap="qqLogin"/>
      <my-icons type="wechat-login" size="50" color="#707070" @tap="wechatLogin"/>
    </view>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'otherLogin',
    components:{
      myIcons
    },
    methods: {
      //微博登录
      weiboLogin() {
        let _this = this;
        uni.getProvider({
          service: 'oauth',
          success(res) {
            if (~res.provider.indexOf('sinaweibo')) {
              uni.login({
                provider: 'sinaweibo',
                success(loginRes) {
                  let authResult = loginRes.authResult;
                  new Promise((resolve, reject) => {
                    uni.request({
                      url: 'https://api.weibo.com/2/users/show.json',
                      data: {
                        access_token: authResult.access_token,
                        uid: authResult.uid
                      },
                      success(res) {
                        resolve(res.data);
                      },
                      fail() {
                        reject();
                      }
                    })
                  }).then(res => {
                    //将获取的数据保存至后台数据库
                    return new Promise((resolve,reject)=>{
                      //昵称 res.screen_name  
                      //性别 res.gender 性别，m：男、f：女、n：未知      前端要控制男1女0  
                      //头像 res.profile_image_url
                      
                      /* uni.request({
                        url: '',
                        data: {
                          
                        },
                        success(res) {
                          resolve(res.data);
                        },
                        fail() {
                          reject();
                        }
                      }) */
                    }).then(res=>{
                      
                    },()=>{
                      _this.error.timeOut();
                    })
                  }, () => {
                    _this.error.timeOut();
                  })
                },
                fail() {
                  //登录失败
                  _this.error.failLogin();
                }
              });
            }
          },
          fail() {
            //接口失效
            _this.error.interFailure();
          }
        });
      },
      //QQ登录
      qqLogin() {
        let _this = this;
        uni.getProvider({
          service: 'oauth',
          success(res) {
            if (~res.provider.indexOf('qq')) {
              uni.login({
                provider: 'qq',
                success(loginRes) {
                  let authResult = loginRes.authResult;
                  //通过Access_Token获取client_id和openid
                  new Promise((resolve, reject) => {
                    uni.request({
                      url: 'https://graph.qq.com/oauth2.0/me',
                      data: {
                        access_token: authResult.access_token
                      },
                      success(res) {
                        authResult.client_id = _this.utils.getClientId(res.data);
                        resolve(authResult);
                      },
                      fail() {
                        reject();
                      }
                    })
                  }).then(res => {
                    return new Promise((resolve, reject) => {
                      uni.request({
                        url: 'https://graph.qq.com/user/get_user_info',
                        data: {
                          access_token: res.access_token,
                          oauth_consumer_key: res.client_id,
                          openid: res.openid
                        },
                        success(res) {
                          resolve(res.data);
                        },
                        fail() {
                          reject();
                        }
                      });
                    }).then(res => {
                      //将获取的数据保存至后台数据库
                      return new Promise((resolve,reject)=>{
                        //昵称 res.nickname  性别 res.gender '男女' 前端控制男1女0  头像 res.figureurl_qq_1
                        
                        /* uni.request({
                          url: '',
                          data: {
                            
                          },
                          success(res) {
                            resolve(res.data);
                          },
                          fail() {
                            reject();
                          }
                        }) */
                      }).then(res=>{
                        
                      },()=>{
                        _this.error.timeOut();
                      })
                    }, () => {
                      _this.error.timeOut();
                    });
                  }, () => {
                    _this.error.timeOut();
                  });
                },
                fail() {
                  //登录失败
                  _this.error.failLogin();
                }
              });
            }
          },
          fail() {
            //接口失效
            _this.error.interFailure();
          }
        });
      },
      //微信登录
      wechatLogin() {
        let _this = this;
        uni.getProvider({
          service: 'oauth',
          success: function(res) {
            if (~res.provider.indexOf('weixin')) {
              uni.login({
                provider: 'weixin',
                success: function(loginRes) {
                  let authResult = loginRes.authResult;
                  new Promise((resolve,reject)=>{
                    uni.request({
                      url:'https://api.weixin.qq.com/sns/userinfo',
                      data:{
                        access_token:authResult.access_token,
                        openid:authResult.openid
                      },
                      success(res){
                        resolve(res.data);
                      },
                      fail(){
                        reject();
                      }
                    })
                  }).then(res=>{
                    return new Promise((resolve,reject)=>{
                      //昵称 res.nickname
                      //性别 res.sex  普通用户性别，1 为男性，2 为女性  前端控制男1女0  
                      //头像 res.headimgurl
                      
                      /* uni.request({
                        url: '',
                        data: {
                          
                        },
                        success(res) {
                          resolve(res.data);
                        },
                        fail() {
                          reject();
                        }
                      }) */
                    }).then(res=>{
                      
                    },()=>{
                      _this.error.timeOut();
                    })
                  },()=>{
                    _this.error.timeOut();
                  })
                },fail(){
                  //登录失败
                  _this.error.failLogin();
                }
              });
            }
          },fail(){
            //接口失效
            _this.error.interFailure();
          }
        });
      }
    }
  }
</script>

<style scoped>
  .othersLogin {
    padding: 20rpx 40rpx 10rpx 40rpx;
    background-color: #f5f7f9;
    border-radius: 140rpx 140rpx 0 0;
    color: #777;
    font-size: 30rpx;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .othersLoginButton {
    margin-top: 4rpx;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>
