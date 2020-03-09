<template>
  <view class="relative indexBox" :style="{height:windowHeight+'px'}">
    <!-- 搜索图标-->
    <search-bar searchTo="/pages/article/search/search"></search-bar>
    <!-- #ifdef MP-->
    <view class="categoryBarBox">
      <swiper class="swiper" :current="current" previous-margin="36px" next-margin="90rpx" display-multiple-items="2"
        circular @change="changeCateBar">
        <swiper-item class="swiperItem" v-for="(item,index) in categorys" :key="index" @tap="tapCategory(index)">
          <view class="flexCenter" :class="[articleCategory,index==current?articleCategory_actived:'']">{{item}}</view>
        </swiper-item>
      </swiper>
    </view>
    <!--#endif -->
    <!-- #ifndef MP-->
    <view class="categoryBarBox" :class="categoryBarBoxShadow">
      <swiper class="swiper" :current="current" previous-margin="36px" next-margin="90rpx" display-multiple-items="2"
        circular @change="changeCateBar">
        <swiper-item class="swiperItem" v-for="(item,index) in categorys" :key="index" @tap="tapCategory(index)">
          <view class="flexCenter" :class="[articleCategory,index==current?articleCategory_actived:'']">{{item}}</view>
        </swiper-item>
      </swiper>
    </view>
    <!--#endif -->
    <swiper class="content_swiper" :style="{top:scrollTop+'px',height:(windowHeight-scrollTop)+'px'}" :current="current" circular @change="articleChange">
      <swiper-item v-for="index of categorys.length" :key="index">
        <scroll-view class="article_swiper" scroll-y @scroll="scroll">
          <!-- <block v-for="(item,index) in articleMenu" :key="index"> -->
          <view class="flexVerCenter article_box">
            <!-- 纯文字-->
            <navigator class="article_content_box" url="/pages/article/content/content">
              <view class="article_title">打赏发大水发大水</view>
              <view class="article_content">打赏发大水发大水</view>
            </navigator>
            <!-- 文字带图片-->
            <navigator class="article_content_box" url="/pages/article/content/content">
              <image class="picture_video" mode="widthFix" src="/static/img/common/article/timg.jpg" />
              <view class="article_title">电风扇广泛大使馆的</view>
            </navigator>
            <navigator class="article_content_box" url="/pages/article/content/content">
              <view class="article_title">打赏发大水发大水</view>
              <view class="article_content">打赏发大水发大水</view>
            </navigator>
            <!-- 文字带图片-->
            <navigator class="article_content_box" url="/pages/article/content/content">
              <image class="picture_video" mode="widthFix" src="/static/img/common/article/timg.jpg" />
              <view class="article_title">电风扇广泛大使馆的</view>
            </navigator>
            <!-- 视频加文字-->
            <!-- <navigator class="article_content_box" :class="[article_content_box_style]">
                  <video class="picture_video" src="" />
                  <text class="article_title"></text>
                </navigator> -->
            <!-- </block> -->
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <!-- 添加按钮-->
    <navigator class="flexCenter addArticle" url="/pages/article/write/write" :style="{backgroundColor:colorHex}">
      <my-icons class="addIcon" type="add" size="28" color="#fff"/>
    </navigator>
  </view>
</template>

<script>
  import * as types from 'store/mutations-types'
  import searchBar from 'content/article/index/searchBar'
  import myIcons from "common/my-icons/my-icons"
  let tempScroll = [];
  export default {
    name: 'article',
    data() {
      return {
        color: this.$store.state.chooseMainColor,
        categorys: this.$store.state.articleCategorys,
				windowHeight:uni.getSystemInfoSync().windowHeight,
        current: 0,
        articles: [],
        isNotScrollTop: false
      }
    },
    components: {
      searchBar,
      myIcons
    },
    methods: {
      tapCategory(index) {
        this.current = index;
      },
      changeCateBar(e) {
        //设置文章current为current
        this.current = e.detail.current;
        //判断是否显示阴影
        //#ifndef MP
        if (tempScroll[e.detail.current] != null && tempScroll[e.detail.current] != '' && tempScroll[e.detail.current] !=
          undefined) {
          if (tempScroll[e.detail.current] > 0) {
            this.isNotScrollTop = true;
          }
          if (tempScroll[e.detail.current] <= 10) {
            this.isNotScrollTop = false;
          }
        } else {
          this.isNotScrollTop = false;
        }
        //#endif
        /* uni.request({
          url: '',
          date: {
        
          },
          success(data) {
            if (data.success) {
              this.articles=
            }
          },
          fail() {
            this.error.timeOut();
          }
        }) */
      },
      articleChange(e) {
        //设置文章current为current
        this.current = e.detail.current;
        //判断是否显示阴影
        // #ifndef MP
        if (tempScroll[e.detail.current] != null && tempScroll[e.detail.current] != '' && tempScroll[e.detail.current] !=
          undefined) {
          if (tempScroll[e.detail.current] > 0) {
            this.isNotScrollTop = true;
          }
          if (tempScroll[e.detail.current] <= 10) {
            this.isNotScrollTop = false;
          }
        } else {
          this.isNotScrollTop = false;
        }
        // #endif
        /* uni.request({
          url: '',
          date: {
        
          },
          success(data) {
            if (data.success) {
              this.articles=
            }
          },
          fail() {
            this.error.timeOut();
          }
        }) */
      },
      scroll(e) {
        if (e.detail.scrollTop > 0) {
          this.isNotScrollTop = true;
        }
        if (e.detail.scrollTop <= 10) {
          this.isNotScrollTop = false;
        }
        this.$set(tempScroll, this.current, e.detail.scrollTop);
      }
    },
    computed: {
      articleCategory() {
        let temp = ['articleCategory_orange', 'articleCategory_blue', 'articleCategory_green',
          'articleCategory_pink'
        ];
        return this.utils.mainColorStyle(this.color, temp);
      },
      articleCategory_actived() {
        let temp = ['articleCategory_actived_orange', 'articleCategory_actived_blue', 'articleCategory_actived_green',
          'articleCategory_actived_pink'
        ];
        return this.utils.mainColorStyle(this.color, temp);
      },
      articleMenu: {
        set(articleMenu) {
          articleMenu = [];
        },
        get() {
          return this.articles;
        }
      },
      //#ifndef MP
      categoryBarBoxShadow() {
        return this.isNotScrollTop ? 'categoryBarBoxShadow' : '';
      },
      //#endif
      scrollTop() {
        return (uni.getSystemInfoSync().statusBarHeight + 44 + 34);
      },
			colorHex(){
				return this.$store.getters.getHexColor;
			}
    },
    onLoad() {
      this.$store.commit(types.CHANGETABBARMAINCOLOR);
      this.$store.commit(types.CHANGESELECTEDCOLOR);
    }
  }
</script>

<style scoped>
  .indexBox {
    background-color: #FCFCFC;
  }

  .article_swiper {
    height: 100%;
  }

  /* #ifndef MP*/
  .categoryBarBoxShadow {
    box-shadow: 0px 14px 10px rgba(91, 91, 91, .4);
  }
  /* #endif*/

  .swiper {
    height: 68rpx;
    color: white;
    background-color: #FCFCFC;
  }

  .swiperItem {
    display: flexbox;
    align-items: center;
  }

  .article_content_box {
    border-radius: 20rpx;
    width: 85%;
    padding: 14rpx;
    margin-bottom: 24rpx;
    color: #6b6b6b;
    background-color: #fff;
    box-shadow: 4rpx 4rpx 14rpx #d9d9d9;
    display: flex;
    flex-direction: column;
  }

  .picture_video {
    border-radius: 14rpx;
    margin-bottom: 6rpx;
    width: 95%;
    align-self: center;
  }

  .article_title {
    width: fit-content;
    font-size: 36rpx;
    padding: 4rpx 16rpx;
    border-radius: 16rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .article_content {
    width: fit-content;
    font-size: 26rpx;
    padding: 4rpx 16rpx;
    border-radius: 16rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .article_box {
    flex-direction: column;
    padding-top: 16rpx;
    background-color: #FCFCFC;
  }

  .categoryBarBox {
    position: relative;
    z-index: 2;
  }

  .content_swiper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .addArticle{
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
    position: fixed;
    right: 36rpx;
    bottom: 36rpx;
    z-index: 99;
    box-shadow: 0 2rpx 6rpx #9a9a9a;
  }
  /* #ifndef MP */
  .addIcon{
    position: relative;
    top: 4rpx;
  }
  /* #endif */
  
  /* #ifdef MP */
  .addIcon{
    position: relative;
    top: 2rpx;
    left: 2rpx;
  }
  /* #endif */
</style>
