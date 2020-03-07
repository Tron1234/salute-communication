<template>
  <view class="fixed" :style="{height:windowHeight+'px'}">
    <nav-bar @openPopup="openPopup" @openMenu="openMenu" :index="index" />
    <scroll-view class="scrollContent" :style="{top:scrollTop,backgroundColor:chooseFontBg.backgroundColor}" scroll-y>
      <view class="articleBox">
        <view class="articleTitle" :style="{color:chooseFontBg.title}">标题标题标题标题标题标题标题</view>
        <view :style="{color:chooseFontBg.content,fontSize:fontSize}">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
      </view>
      <view class="commentBox">
        <text decode class="commentBox_title" :style="{color:chooseFontBg.title}">
          {{$t('article.content.commentTitle')}}
        </text>
        <!-- 评论最外层的盒子-->
        <view class="commentBox_contentBox">
          <!-- 每一个评论盒子-->
          <view class="flexVerCenter commentBox_contentAndReply">
            <!-- 每一个评论和回复的内容-->
            <view class="flexVerCenter commentBox_content">
              <!-- 每一个评论者的头像-->
              <view class="flexHorCenter commentBox_avatarBox">
                <img class="everyComment_avatar" src="~img/common/article/avatar.png" />
              </view>
              <!-- 每一个评论者评论的内容-->
              <view class="flexVerCenter commentBox_everyComment">
                <!-- 评论者名称和评论时间-->
                <view class="flexVerCenter everyComment_nameAndTime" :style="{color:chooseFontBg.title}">
                  <text>Doyle Grande</text>
                  <text>10:05 am</text>
                </view>
                <!-- 评论者评论的内容-->
                <view class="everyComment_content" :style="{color:chooseFontBg.content,fontSize:fontCommentSize}">
                  评论内容评论内容评论内容评论内容评论内容评论内容评论内容
                </view>
                <view class="flexVerCenter everyComment_commentIcons">
                  <view data-isArticle="false" @tap="openReport">
                    <my-icons class="commentIcon" style="position: relative;top: -2rpx;" type="report" size="19"
                      :color="chooseFontBg.content" />
                  </view>
                  <view data-isArticle="false" @tap="openComment">
                    <my-icons class="commentIcon" type="comment" size="20" :color="chooseFontBg.content" />
                  </view>
                  <view>
                    <my-icons class="commentIcon commentIcon_specialIcon" :type="isCommentLike?'like_actived':'like'"
                      size="24" :color="isCommentLike?'#FF3366':chooseFontBg.content" @tap="tapCommentLike" />
                  </view>
                </view>
              </view>
            </view>
            <!-- 评论的回复-->
            <view class="commentBox_reply">
              <view>
                <!-- 循环回复-->
                <view class="flexVerCenter commentBox_content">
                  <!-- 每一个评论者的头像-->
                  <view class="flexHorCenter commentBox_avatarBox">
                    <img class="everyComment_avatar" src="~img/common/article/avatar.png" />
                  </view>
                  <!-- 每一个评论者评论的内容-->
                  <view class="flexVerCenter commentBox_everyComment">
                    <!-- 评论者名称和评论时间-->
                    <view class="flexVerCenter everyComment_nameAndTime" :style="{color:chooseFontBg.title}">
                      <text>Doyle Grande</text>
                      <text>10:05 am</text>
                    </view>
                    <!-- 评论者评论的内容-->
                    <view class="everyComment_content" :style="{color:chooseFontBg.content,fontSize:fontCommentSize}">
                      评论内容评论内容评论内容评论内容评论内容评论内容评论内容
                    </view>
                    <view class="flexVerCenter everyComment_commentIcons">
                      <view data-isArticle="false" @tap="openReport">
                        <my-icons class="commentIcon" style="position: relative;top: -2rpx;" type="report" size="19"
                          :color="chooseFontBg.content" />
                      </view>
                      <view data-isArticle="false" @tap="openComment">
                        <my-icons class="commentIcon" type="comment" size="20" :color="chooseFontBg.content"/>
                      </view>
                      <view>
                        <my-icons class="commentIcon commentIcon_specialIcon" :type="isCommentLike?'like_actived':'like'"
                          size="24" :color="isCommentLike?'#FF3366':chooseFontBg.content" @tap="tapCommentLike" />
                      </view>
                    </view>
                  </view>
                </view>

              </view>
            </view>
          </view>

        </view>
      </view>
    </scroll-view>
    <view class="flexVerCenter commentInputBox" :style="{boxShadow:commentShadow,backgroundColor:chooseFontBg.backgroundColor,width:(windowWidth-18)+'px'}">
      <my-icons type="share" size="26" :color="chooseFontBg.content" @tap="articleShare" />
      <view class="flexVerCenter commentInput_contentBtn" :style="{color:chooseFontBg.content}" data-isArticle="true" @tap="openComment">{{$t('article.content.commentBtn')}}</view>
      <view class="flexVerCenter commentInput_iconBox" @tap="tapLike">
        <view class="commentInput_likeNum" :style="{color:isLike?'#FF3366':chooseFontBg.content}" v-show="likeNum>0">{{likeNum}}</view>
        <my-icons class="commentInput_icon" :class="isLike?'commentInput_icon_actived':''" :type="isLike?'like_actived':'like'"
          size="28" :color="isLike?'#FF3366':chooseFontBg.content" />
      </view>
    </view>
    <!-- 背景颜色更改弹出层-->
    <uni-popup ref="popup" type="bottom" backgroundColor="transparent">
      <view class="popupBox">
        <view>
          <view class="popupTitle">{{$t('article.content.backgroundColorTitle')}}</view>
          <scroll-view scroll-x>
            <view class="flexVerCenter scrollColor">
              <view class="chooseColor" :class="item.isChoose?'isChoose':''" :style="{backgroundColor:item.backgroundColor}"
                v-for="(item,index) in fontBg.fontStyles" :key="index" @tap="chooseColor(index)" />
            </view>
          </scroll-view>
        </view>
        <view style="margin-top: 20rpx;">
          <view class="popupTitle">{{$t('article.content.fontSize')}}</view>
          <!-- 字号大小滑动-->
          <view class="flexCenter sliderBox">
            <my-icons type="font-style" :size="fontBg.fontSize[0]" color="#fff" />
            <slider class="sliderFont" backgroundColor="#fff" activeColor="#FF3366" block-color="#FF3366" :min="fontBg.fontSize[0]"
              :max="fontBg.fontSize[fontBg.fontSize.length-1]" step="5" :value="fontBg.fontSize[1]" block-size="20"
              @changing="sliderSize" @change="sliderSize" />
            <my-icons type="font-style" :size="fontBg.fontSize[fontBg.fontSize.length-1]" color="#fff" />
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- 菜单的弹出层-->
    <uni-popup ref="menu" type="menu" backgroundColor="transparent">
      <view class="menuBox" :style="{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.title}">
        <view class="arrows" :style="{backgroundColor:chooseFontBg.backgroundColor}"></view>
        <view class="flexVerCenter menuItem" :style="{borderBottom:menuItemBorder}" @tap="articleShare">
          <my-icons class="menuIcon" type="share" size="20" color="#FF3366" />{{$t('article.content.share')}}</view>
        <view class="flexVerCenter menuItem" :style="{borderBottom:menuItemBorder}" @tap="articleCollect">
          <my-icons class="menuIcon" :type="isCollected?'collected':'collect'" size="18" color="#FF3366" />{{isCollected?$t('article.content.collected'):$t('article.content.collect')}}</view>
        <view class="flexVerCenter menuItem" data-isArticle="true" @tap="openReport">
          <my-icons class="menuIcon" type="report" size="20" color="#FF3366" />{{$t('article.content.report')}}</view>
      </view>
    </uni-popup>
    <!-- 分享的弹出层-->
    <uni-popup ref="share" type="bottom">
      <view class="flexVerCenter shareBox">
        <view class="flexVerCenter shareBox_Icon" :style="{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.title}">
          <view class="flexVerCenter shareIcon" @tap="wechatShare">
            <my-icons type="wechat-share" size="40" color="#04BE02" />
            {{$t('article.content.wechatShare')}}
          </view>
          <view class="flexVerCenter shareIcon" @tap="friendsShare">
            <my-icons type="friends-share" size="40" color="#04BE02" />
            {{$t('article.content.friendsShare')}}
          </view>
          <view class="flexVerCenter shareIcon" @tap="QQShare">
            <my-icons type="QQ-share" size="40" color="#3AA7FE" />
            {{$t('article.content.QQShare')}}
          </view>
          <view class="flexVerCenter shareIcon" @tap="weiboShare">
            <my-icons type="weibo-share" size="40" color="#E6162D" />
            {{$t('article.content.weiboShare')}}
          </view>
          <view class="flexVerCenter shareIcon" @tap="moreShare">
            <my-icons type="more-share" size="40" color="#8A8A8A" />
            {{$t('article.content.moreShare')}}
          </view>
        </view>
        <view class="shareBox_cancel" :style="{backgroundColor:chooseFontBg.backgroundColor}" @tap="closeShare">{{$t('cancel')}}</view>
      </view>
    </uni-popup>
    <!-- 举报的弹出层-->
    <uni-popup ref="report" type="center">
      <view class="flexVerCenter reportBox" :style="{width:windowWidth*0.85+'px'}">
        <view class="flexVerCenter reportBox reportContent" :style="{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.title}">
          <view class="flexVerCenter reportCategory">
            <view class="reportItem" :class="[item.status?'reportItemActived':'']" :style="item.status?'':{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.title}"
              v-for="(item,index) in reportCategorys" :key="index" @tap="reportChoose(index)">{{item.title}}</view>
          </view>
          <view class="reportTextarea">
            <textarea class="reportTextarea_input" :placeholder="$t('article.content.reportPlaceholder')"
              :placeholder-class="reportTextarea_placeholder" :style="{width:(windowWidth*0.85-32)+'px',backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.content}" />
            </view>
          </view>
        <view class="flexVerCenter reportBtnBox">
          <view class="reportBtn" :style="{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.content}" @tap="reportCancel">
            {{$t('cancel')}}
          </view>
          <view class="reportBtn" :style="{backgroundColor:chooseFontBg.backgroundColor}" @tap="reportSubmit">
            {{$t('submit')}}
          </view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="comment" type="bottom" @change="changeComment">
      <view class="flexVerCenter commentInput" :style="{backgroundColor:chooseFontBg.backgroundColor,color:chooseFontBg.content}">
        <textarea class="commentInput_textarea" v-model="commentValue" :focus="isOpenComment" :placeholder="$t('article.content.commentInputPlaceholder')" @focus="getTextareaFocus"/>
        <view class="flexVerCenter commentSubmitBox">
          <my-icons class="commentSubmitBox_icon" type="expression" size="26" :color="chooseFontBg.content" @tap="openEmoji"/>
          <view class="commentSubmitBox_publish">{{$t('publish')}}</view>
        </view>
      </view>
      <swiper v-show="isShowEmoji" class="emojiSlider" circular :style="{backgroundColor:chooseFontBg.backgroundColor}" >
          <swiper-item v-for="(item, key) in emojiData" :key="key" class="emojiSlider-emoji" :class="[key==(emojiData.length-1)?'emojiSlider-lastbox':'']">
              <text v-for="(emoji, index) in item" :key="index" @click="selemoji(emoji)" class="emojiSlider-icon">{{ emoji }}</text>
          </swiper-item>
      </swiper>
    </uni-popup>
  </view>
</template>

<script>
  import emoji from "@/static/js/emoji";
  import myIcons from "common/my-icons/my-icons";
  import fontBg from '@/static/js/fontBackground';
  import navBar from 'content/article/content/navBar';
  import uniPopup from "common/popup/uni-popup/uni-popup";
  export default {
    name: 'content',
    data() {
      return {
        fontBg,
        tempIndex: 0,
        likeNum:15,
        isLike:false, //点赞状态
        isCommentLike:false,
        isArticleSubmit:true, //判断是否是有关文章提交
        fontSize: fontBg.fontSize[1] + 'px',
        fontCommentSize: fontBg.fontSize[1]-5 + 'px',
        isCollected: false, //收藏状态
        isOpenComment:false,  //focus状态
        isShowEmoji:false,  //是否展开表情状态
        reportCategorys:this.$t('article.content.reportCategorys'),
        windowHeight: uni.getSystemInfoSync().windowHeight,
        windowWidth: uni.getSystemInfoSync().windowWidth,
        reportCategory:[],
        chooseFontBg: {}, //fontBackground中用户选择的配色方式
        emojiData:[],  //表情数组
        commentValue:''
      }
    },
    components: {
      navBar,
      uniPopup,
      myIcons
    },
    methods: {
      //打开背景颜色弹框
      openPopup() {
        this.$refs.popup.open();
      },
      //打开菜单弹框
      openMenu() {
        this.$refs.menu.open();
      },
      //打开分享弹框
      articleShare() {
        this.$refs.share.open();
      },
      //关闭分享弹框
      closeShare() {
        this.$refs.share.close();
      },
      //打开收藏弹框
      articleCollect() {
        let _this = this;
        //更改文章收藏状态
        this.isCollected = !this.isCollected;
        //更改文章收藏状态的请求
        if (this.isCollected) {
          //请求成功后弹出提示
          uni.showToast({
            title: _this.$t('article.content.collectedTip'), //已收藏
            icon: 'success',
            mask: true,
            duration: 1000
          })
        } else {
          //请求成功后弹出提示
          uni.showToast({
            title: _this.$t('article.content.cancelCollectTip'), //取消收藏
            icon: 'success',
            mask: true,
            duration: 1000
          })
        }
        //关闭菜单弹框
        this.$refs.menu.close();
      },
      //打开举报弹框
      openReport(e) {
        this.$refs.report.open();
        if('true'==e.currentTarget.dataset.isarticle){
          this.isArticleSubmit=true;
        }else if('false'==e.currentTarget.dataset.isarticle){
          this.isArticleSubmit=false;
        }
        console.log(this.isArticleSubmit);
      },
      //获取举报类型的index
      reportChoose(index){
        let reportCategory=this.reportCategorys[index];
        if(reportCategory.status){
          this.$set(reportCategory, 'status', false);
          for(let i in this.reportCategory){
            if(this.reportCategory[i]==index){
              this.reportCategory.splice(i,1);
              break;
            }
          }
          //console.log(this.reportCategory);
        }else{
          this.$set(reportCategory,  'status', true);
          this.reportCategory.push(index);
          //console.log(this.reportCategory);
        }
      },
      //关闭举报弹框
      reportCancel(){
        this.$refs.report.close();
      },
      //提交举报
      reportSubmit(){
        
      },
      //改变背景颜色
      chooseColor(index) {
        //保存用户选中的文章颜色索引
        uni.setStorage({
          key: 'articleColor',
          data: index
        });
        this.tempIndex = index;
        //给当前选中的背景颜色赋值
        let fontStyles = this.fontBg.fontStyles;
        for (let i in fontStyles) {
          if (i == index) {
            this.chooseFontBg = fontStyles[i];
            this.$set(fontStyles[i], 'isChoose', true);
          } else {
            this.$set(fontStyles[i], 'isChoose', false);
          }
        }
      },
      //通过滑块更改字体大小
      sliderSize(e) {
        this.fontSize = e.detail.value + 'px';
        this.fontCommentSize = (e.detail.value - 5) +'px';
      },
      //微信分享
      wechatShare() {
        let _this = this;
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 1,
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          success: function(res) {
            uni.showToast({
              title: _this.$t('article.content.shareSuccess'),
              icon: 'success',
              mask: true,
              duration: 1000
            })
          }
        })
      },
      //朋友圈分享
      friendsShare() {
        let _this = this;
        uni.share({
          provider: "weixin",
          scene: "WXSenceTimeline",
          type: 1,
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          success: function(res) {
            uni.showToast({
              title: _this.$t('article.content.shareSuccess'),
              icon: 'success',
              mask: true,
              duration: 1000
            })
          }
        });
      },
      //QQ分享
      QQShare() {
        let _this = this;
        uni.share({
          provider: "qq",
          type: 1,
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          success: function(res) {
            uni.showToast({
              title: _this.$t('article.content.shareSuccess'),
              icon: 'success',
              mask: true,
              duration: 1000
            })
          }
        });
      },
      //微博分享
      weiboShare() {
        let _this = this;
        uni.share({
          provider: "sinaweibo",
          type: 1,
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          success: function(res) {
            uni.showToast({
              title: _this.$t('article.content.shareSuccess'),
              icon: 'success',
              mask: true,
              duration: 1000
            })
          }
        });
      },
      //更多分享
      moreShare() {
        let _this = this;
        plus.share.sendWithSystem({
          type: "text",
          content: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！"
        }, () => {
          uni.showToast({
            title: _this.$t('article.content.shareSuccess'),
            icon: 'success',
            mask: true,
            duration: 1000
          })
        });
      },
      //文章点赞
      tapLike(){
        this.isLike=!this.isLike;
        //震动
        if(this.isLike){
          uni.vibrateShort();
          setTimeout(()=>{
            this.likeNum++;
          },250);
        }else{
          this.likeNum--;
        }
      },
      //打开评论输入框
      openComment(e){
        this.$refs.comment.open();//popup打开事件
        if('true'==e.currentTarget.dataset.isarticle){
          this.isArticleSubmit=true;
        }else if('false'==e.currentTarget.dataset.isarticle){
          this.isArticleSubmit=false;
        }
      },
      //改变评论框状态
      changeComment(e){
        this.isOpenComment=e.show;
        if(e.show){
          this.isShowEmoji=false;
        }
        //console.log(this.isOpenComment);
      },
      //打开emoji表情
      openEmoji(){
        this.isShowEmoji=!this.isShowEmoji;
        if(this.isShowEmoji){
          uni.hideKeyboard();
        }else{
          this.isOpenComment=true;
        }
      },
      //手动获取焦点隐藏emoji
      getTextareaFocus(){
        if(this.isShowEmoji&&this.isOpenComment){
          this.isShowEmoji=false;
        }
      },
      // 将emoji写在textarea上
      selemoji(m) {
        this.commentValue+=m;
      },
      //评论点赞
      tapCommentLike(){
        this.isCommentLike = !this.isCommentLike;
      }
    },
    computed: {
      index: {
        set(index) {
          index = 0;
        },
        get() {
          return this.tempIndex;
        }
      },
      scrollTop() {
        return (uni.getSystemInfoSync().statusBarHeight + 44) + 'px';
      },
      menuItemBorder() {
        return '1px solid' + this.chooseFontBg.content;
      },
      commentShadow(){
        return '0px -2rpx 40rpx ' + this.chooseFontBg.boxShadow;
      }
    },
    onLoad(){
      let page = Math.ceil(emoji.length/21);
          for (let i = 0; i < page; i++) {
          this.emojiData[i] = [];
          for (let k = 0; k < 21; k++) {
              emoji[i*21+k]?this.emojiData[i].push(
              emoji[i*21+k]
              ):''
          }
      } 
    },
    onShow() {
      let index = uni.getStorageSync('articleColor');
      if (index == '' || index == null) {
        index = 0;
      }
      this.tempIndex = index;
      //给当前选中的背景颜色赋值
      let fontStyles = this.fontBg.fontStyles;
      for (let i in fontStyles) {
        if (i == index) {
          this.chooseFontBg = fontStyles[i];
          this.$set(fontStyles[i], 'isChoose', true);
        } else {
          this.$set(fontStyles[i], 'isChoose', false);
        }
      }
    },
    /* #ifdef MP*/
    onShareAppMessage(res) {
      if (res.from === 'menu') {
        return {
          title: '自定义分享标题',
          path: '/pages/article/content/content'
        }
      }
    }
    /* #endif */
  }
</script>

<style scoped>
  .popupBox {
    border-radius: 24rpx 24rpx 0 0;
    background-color: #646464;
    padding: 20rpx;
    color: #fff;
  }

  .chooseColor {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .scrollColor {
    width: 100%;
    justify-content: space-evenly;
  }

  .isChoose {
    border: 4px solid #FF3366;
  }

  .popupTitle {
    margin-bottom: 16rpx;
  }

  .sliderBox {
    margin: 0 20rpx;
  }

  .sliderFont {
    width: 90%;
    margin: 0 30rpx;
  }

  .scrollContent {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100rpx;
    padding: 20rpx 0;
  }

  .articleBox {
    margin: 0rpx 30rpx;
  }

  .articleTitle {
    font-weight: bold;
    font-size: 60rpx;
    margin-bottom: 20rpx;
  }

  .menuBox {
    position: relative;
    border-radius: 12rpx;
    box-shadow: 0px 0px 4px #b0b0b0;
  }

  .menuItem {
    width: 220rpx;
    padding: 14rpx 0;
    font-size: 32rpx;
  }

  .menuIcon {
    margin: 0 16rpx 0 14rpx;
    position: relative;
    top: 2rpx;
  }

  .arrows {
    position: absolute;
    top: -16rpx;
    right: 14rpx;
    width: 36rpx;
    height: 36rpx;
    transform: rotate(45deg);
    box-shadow: -2px -2px 2px #bfbfbf;
    border-radius: 8rpx;
  }

  .shareBox {
    padding: 0 20rpx;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 30rpx;
  }

  .shareBox_Icon {
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    font-size: 30rpx;
    box-shadow: 0px 0px 4px #b0b0b0;
  }

  .shareIcon {
    flex-direction: column;
    margin: 26rpx 20rpx;
  }

  .shareBox_cancel {
    width: 100%;
    border-radius: 20rpx;
    text-align: center;
    padding: 16rpx 0;
    color: #FF3366;
    box-shadow: 0px 0px 4px #b0b0b0;
  }

  .reportBox {
    flex-direction: column;
    justify-content: space-around;
  }

  .reportContent {
    padding: 20rpx;
    border-radius: 20rpx;
    box-shadow: 0px 0px 4px #b0b0b0;
    margin-bottom: 20rpx;
  }
  .reportCategory{
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20rpx;
  }
  .reportTextarea{
    border-radius: 8rpx;
    box-shadow: 0px 0px 4px #b0b0b0;
    padding:12rpx;
  }
  .reportTextarea_input{
    height: 250rpx;
  }
  .reportBtnBox{
    width: 100%;
    justify-content: space-between;
  }
  .reportBtn{
    width: 45%;
    border-radius: 20rpx;
    text-align: center;
    padding: 12rpx 0;
    color: #FF3366;
    box-shadow: 0px 0px 4px #b0b0b0;
  }
  .reportItem{
    padding: 10rpx;
    margin: 10rpx;
    border-radius: 8rpx;
    box-shadow: 0px 0px 4px #b3b3b3;
  }
  .reportItemActived{
    background-color: #FF3366;
    color: #fff;
  }
  .reportTextarea_placeholder{
    color: #d8d8d8;
  }
  .commentInputBox{
    justify-content: space-between;
    height: 60rpx;
    padding: 20rpx;
    position: absolute;
    bottom: 0;
  }
  .commentInput_iconBox{
    position: relative;
    padding: 6rpx;
    flex-direction: column;
    justify-content: space-around;
    font-size: 24rpx;
  }
  .commentInput_likeNum{
    position: absolute;
    top: -34rpx;
    right: 14rpx;
  }
  .commentInput_icon{
    position: absolute;
    top: -4rpx;
    right: 0;
  }
  .commentInput_icon_actived{
    animation: likeActived 0.4s ease-in-out;
  }
  @keyframes likeActived{
    0%{top: -4rpx;}
    50%{top: -18rpx;}
    100%{top: -4rpx;}
  }
  .commentInput_contentBtn{
    width: 70%;
    padding: 20rpx;
    margin-right: 70rpx;
    font-size: 30rpx;
  }
  .commentInput{
    height: 260rpx;
    flex-direction: column;
    justify-content: space-around;
    font-size: 34rpx;
    border-radius: 16rpx 16rpx 0 0 ;
  }
  .commentInput_textarea{
    width: 90%;
    margin: 30rpx 26rpx 14rpx 26rpx;
  }
  .commentSubmitBox{
    width: 92%;
    justify-content: space-between;
    margin-bottom:26rpx;
  }
  .commentSubmitBox_publish{
    color: #fff;
    background-color: #FF3366;
    padding: 8rpx 30rpx;
    border-radius: 20rpx;
  }
  .commentSubmitBox_icon{
    position: relative;
    top: 4rpx;
  }
  /* 引用emoji样式*/
  .emojiSlider {
      width: 100%;
      height: 320rpx;
  }
  .emojiSlider-emoji {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:center;
  }
  .emojiSlider-icon {
      width: 13%;
      text-align: center;
      padding: 10.5px 0;
  }
  /* 设置最后一列左靠齐 */
  .emojiSlider-lastbox{
      justify-content: flex-start;
      margin-left: 40rpx;
  }
  /* 结束 引用emoji样式*/
  .commentBox{
    margin:20rpx 30rpx;
  }
  .commentBox_title{
    display: block;
    font-size: 36rpx;
    padding-bottom: 16rpx;
    border-bottom: 1px solid #CFCFCF;
  }
  .commentBox_contentAndReply{
    flex-direction: column;
  }
  .commentBox_contentBox{
    padding: 30rpx 0 20rpx 0;
  }
  .commentBox_content{
    margin-bottom: 20rpx;
    flex-direction: row;
  }
  .commentBox_avatarBox{
    align-self: flex-start;
    padding: 0 16rpx;
  }
  .commentBox_everyComment{
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
  }
  .everyComment_nameAndTime{
    justify-content: space-between;
    width: 100%;
    /* #ifdef MP */
    margin: 10rpx 0 20rpx 0;
    /* #endif */
    /* #ifndef MP */
    margin: 6rpx 0 14rpx 0;
    /* #endif */
    font-size: 34rpx;
  }
  .everyComment_avatar{
      width: 60rpx;
      height:60rpx;
  }
  .everyComment_content{
    align-self: flex-start;
    padding-bottom: 10rpx;
  }
  .everyComment_commentIcons{
    width: 100%;
    justify-content: flex-end;
    border-bottom: 1px solid #CFCFCF;
  }
  .commentIcon{
    margin: 0 10rpx;
  }
  /* #ifdef MP */
  .commentIcon_specialIcon{
    position: relative;
    top: -2rpx;
  }
  /* #endif */
  .commentBox_reply{
    margin-left: 76rpx;
  }
</style>
