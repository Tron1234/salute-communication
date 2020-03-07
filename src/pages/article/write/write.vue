<template>
  <view class="fixed" :style="{height:windowHeight+'px'}">
    <nav-bar @saveBack="cancelEditor" />
    <view class="writeArticleBox" :style="{height:articleHeight}">
      <view class="writeTitleBox">
        <input class="writeTitle" type="text" v-model="editorTitle" :placeholder="$t('article.write.inputTitlePlaceholder')"
          placeholder-class="titlePlaceholder" @input="getEditorTitle" />
      </view>
      <!-- 富文本编辑器-->
      <rich-text-editor @editorHeight="editorHeight" @getContent="getContent"></rich-text-editor>
      <!-- 提交和取消按钮-->
      <view class="flexVerCenter writeBtnBox" :class="isShowSubmit">
        <button class="writeBtn" style="background-color:#EE7664;" @tap="cancelEditor">{{$t('cancel')}}</button>
        <button class="writeBtn" style="background-color:#5CCD6B;" @tap="publishEditor">{{$t('publish')}}</button>
      </view>
    </view>
    <uni-popup ref="tipSaveDraft" type="center">
      <view class="flexVerCenter tipSaveDraftBox">
        <view class="tipSaveDraftTitle">{{$t('article.write.tipSaveDraftTitle')}}</view>
        <view class="flexVerCenter editorSubmitBtns">
          <button class="writeBtn editorSubmitBtn" style="background-color:#EE7664;" @tap="draftNoSave">{{$t('article.write.noSave')}}</button>
          <button class="writeBtn editorSubmitBtn" style="background-color:#5CCD6B;" @tap="draftSave">{{$t('article.write.save')}}</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import navBar from 'content/article/write/navBar'
  import richTextEditor from 'content/article/write/richTextEditor'
  import uniPopup from "common/popup/uni-popup/uni-popup";
  export default {
    name: 'write',
    data() {
      return {
        fixWindowHeight: uni.getSystemInfoSync().windowHeight, //高度常量不可变
        windowHeight: uni.getSystemInfoSync().windowHeight,
        editorContent: '',
        editorTitle: ''
      }
    },
    components: {
      navBar,
      richTextEditor,
      uniPopup
    },
    methods: {
      editorHeight(height) {
        this.windowHeight = this.fixWindowHeight - height;
      },
      getEditorTitle(e) {
        this.editorTitle = e.detail.value;
      },
      getContent(detail) {
        this.editorContent = detail;
      },
      //弹出是否保存框
      cancelEditor() {
        if ((this.editorContent.html != '<p><br></p>' && this.editorContent.html != null && this.editorContent.html !=
            undefined || this.editorTitle != '')) {
          this.$refs.tipSaveDraft.open();
        } else {
          uni.navigateBack();
        }
      },
      //发布文章
      publishEditor() {

      },
      //草稿不保存
      draftNoSave() {
        this.$refs.tipSaveDraft.close();
        uni.removeStorage({
          key: 'articleDraft',
          complete() {
            uni.navigateBack();
          }
        })
      },
      //草稿保存
      draftSave() {
        uni.setStorage({
          key: 'articleDraft',
          data: {
            title: this.editorTitle,
            content: this.editorContent
          },
          complete() {
            uni.navigateBack();
          }
        })
      }
    },
    computed: {
      articleHeight() {
        return (this.windowHeight - (uni.getSystemInfoSync().statusBarHeight + 44)) + 'px';
      },
      isShowSubmit() {
        return this.windowHeight == this.fixWindowHeight ? '' : 'isNotShowSubmit';
      }
    },
    onLoad() {
      let articleDraft = uni.getStorageSync('articleDraft');
      if (articleDraft != '' && articleDraft != null && articleDraft != undefined) {
        this.editorTitle = articleDraft.title;
      }
    }
  }
</script>

<style scoped>
  .writeArticleBox {
    margin: 0 30rpx;
    position: relative;
  }

  .writeTitleBox {
    padding: 20rpx 0 14rpx 0;
    border-bottom: 1px solid #d8d8d8;
  }

  .titlePlaceholder {
    color: #C8C7CC;
  }

  .writeTitle {
    width: 100%;
    height: 70rpx;
    font-size: 46rpx;
  }

  .writeBtnBox {
    margin: 0 30rpx;
    position: absolute;
    bottom: 20rpx;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  .writeBtn {
    margin: 0;
    line-height: 2.2;
    padding: 0 90rpx;
    border-radius: 20rpx;
    color: #fff;
  }

  .writeBtn:after {
    border: none;
  }

  .isNotShowSubmit {
    visibility: hidden;
  }

  .editorSubmitBtns {
    justify-content: space-around;
    margin: 16rpx 0;
  }

  .editorSubmitBtn {
    padding: 0;
    width: 160rpx;
    margin: 0 20rpx;
  }

  .tipSaveDraftBox {
    flex-direction: column;
    padding: 30rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }

  .tipSaveDraftTitle {
    margin: 12rpx 0;
    font-size: 44rpx;
  }
</style>
