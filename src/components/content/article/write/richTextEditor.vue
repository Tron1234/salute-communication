<template>
  <view class="writeContentBox" :style="{bottom:editorBottom}">
    <view class="writeContent">
      <editor id="editor" class="editorContent" :placeholder="$t('article.write.editorPlaceholder')" show-img-size
        show-img-toolbar show-img-resize @ready="onEditorReady" @input="editorInput" @focus="editorFocus" @blur="editorBlur"
        @statuschange="editorStatuschange"></editor>
      <!-- 富文本编辑按钮-->
    </view>
    <view class="editorBtnBox" :style="{bottom:isIOS?keyboardHeight+'px':0,visibility:isShowEditorBtns?'visible':'hidden'}">
      <view class="flexVerCenter editorBtns" :style="{width:editorBtnsWidth}">
        <my-icons v-for="(item,index) in editorBtns" :key="index" :type="item.parentNode" size="22" color="#000"
          @touchend.stop="changeEditorBtns(index)" />
      </view>
      <view class="editorChildPoint" :style="{left:leftPoint+'px'}" v-if="parentIndex<4"></view>
      <scroll-view class="editorChildBtns" v-if="parentIndex<4" :style="{width:editorBtnsWidth}" scroll-x>
        <view class="flexVerCenter">
          <my-icons v-if="parentIndex<3" :style="{marginRight:index!=(editorBtns[parentIndex].childNode.length-1)?childNodeWidth+'px':0}"
            v-for="(item,index) in editorBtns[parentIndex].childNode" :key="index" :type="item.name" :size="getSize(parentIndex,index)"
            :color="item.status?mainColor:'#000'" @touchend.stop="setContentStyle(parentIndex,index)" />
          <view class="flexVerCenter editorColorBox" v-if="parentIndex==3">
            <view class="flexCenter editorColorItemBox" :style="{marginRight:index!=(fontColors.length-1)?childNodeWidth+'px':0,backgroundColor:item.status?'':item.color,border:item.status?('1px solid'+item.color):''}"
              v-for="(item,index) in fontColors" :key="index" @touchend.stop="changeColor(index)">
              <view class="flexCenter editorColorItem" :style="{backgroundColor:item.status?item.color:''}">A</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  let keyboardHeight;
  import editorMore from '@/static/js/editorBtns'
  import myIcons from "common/my-icons/my-icons"
  export default {
    name: 'richTextEditor',
    data() {
      return {
        windowWidth: uni.getSystemInfoSync().windowWidth,
        parentIndex: 0,
        editorBottom: 96 + 'rpx', //初始离底部边距100rpx
        isShowEditorBtns: false,
        editorBtns: editorMore.editorBtns,
        fontColors: editorMore.fontColor,
        keyboardHeight: 0, //键盘的高度
        isIOS: false, //平台是否是ios
        editorCtx: '',
        leftPoint: 4
      }
    },
    components: {
      myIcons
    },
    methods: {
      onEditorReady() {
        uni.createSelectorQuery().in(this).select('#editor').context((res) => {
          this.editorCtx = res.context;
          let articleDraft = uni.getStorageSync('articleDraft');
          if (articleDraft != '' && articleDraft != null && articleDraft != undefined) {
            this.editorCtx.setContents({
              html: articleDraft.content.html,
              delta: articleDraft.content.delta
            })
            this.$emit('getContent', articleDraft.content);
          }
        }).exec()
      },
      changeEditorBtns(index) {
        let _this = this;
        this.leftPoint = 4;
        this.parentIndex = 0;
        if (index < 4) {
          this.leftPoint = 4 + index * (this.childNodeWidth + 21);
          this.parentIndex = index;
        } else if (index == 4) {
          //插入图片
          uni.chooseImage({
            count: 3, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            success: function(res) {
              let tempPaths = res.tempFilePaths;
              for (let i in tempPaths) {
                _this.editorCtx.insertImage({
                  src: tempPaths[i],
                  alt: '暂无图片'
                });
              }
            }
          });
        } else if (index == 5) {
          this.editorCtx.undo();
        } else if (index == 6) {
          this.editorCtx.redo();
        }
      },
      //editor聚焦
      editorFocus() {
        this.isShowEditorBtns = true;
        this.$emit('editorHeight', keyboardHeight + 70);
        this.editorBottom = 0;
      },
      //editor聚焦
      editorBlur() {
        this.isShowEditorBtns = false;
        this.$emit('editorHeight', 0);
        this.editorBottom = 96 + 'rpx';
      },
      editorInput(e) {
        this.$emit('getContent', e.detail);
      },
      editorStatuschange(e) {
        let tempSaveStatus = [];
        let formats = e.detail;
        let style = editorMore.editorBtnStyle;
        //处理除颜色外的样式
        for (let parentIndex in style) {
          for (let childIndex in style[parentIndex]) {
            for (let key in formats) {
              if (style[parentIndex][childIndex].name == key && style[parentIndex][childIndex].value == formats[key]) {
                tempSaveStatus.push({
                  parent: parentIndex,
                  child: childIndex
                });
              }
            }
            this.$set(this.editorBtns[parentIndex].childNode[childIndex], 'status', false);
          }
        }
        for (let item of tempSaveStatus) {
          this.$set(this.editorBtns[item.parent].childNode[item.child], 'status', true);
        }
        tempSaveStatus = [];
        //处理颜色样式
        for (let i in this.fontColors) {
          if (this.fontColors[i].color.toLowerCase() == formats.color) {
            this.$set(this.fontColors[i], 'status', true);
          } else {
            this.$set(this.fontColors[i], 'status', false);
          }
        }
      },
      //给富文本内容设置样式
      setContentStyle(parentIndex, index) {
        let style = editorMore.editorBtnStyle;
        if (parentIndex == 1 && index == 5) {
          this.editorCtx.insertDivider();
        } else {
          this.editorCtx.format(style[parentIndex][index].name, style[parentIndex][index].value);
        }
        if (parentIndex == 0 && index > 3) {
          if (this.editorBtns[parentIndex].childNode[index].status) {
            this.editorCtx.format('header', '');
          }
        }
      },
      //改变字体颜色
      changeColor(index) {
        if (this.fontColors[index].status) {
          this.editorCtx.format('color', '#000');
        } else {
          this.editorCtx.format('color', this.fontColors[index].color);
        }
      },
      getSize(parent, child) {
        let size = 22;
        if (parent == 0 && child < 4) {
          size = 20;
        } else if (parent == 0 && child == 4) {
          size = 22;
        } else if (parent == 0 && child == 5) {
          size = 20;
        } else if (parent == 0 && child == 6) {
          size = 18;
        } else if (parent == 0 && child == 7) {
          size = 16;
        }
        return size;
      }
    },
    computed: {
      editorBtnsWidth() {
        return (this.windowWidth - 30) + 'px';
      },
      childNodeWidth() {
        return parseFloat((this.windowWidth - 40 - 7 * 20) / 6);
      },
			mainColor(){
				return this.$store.getters.getHexColor;
			}
    },
    created() {
      const platform = uni.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.isIOS = isIOS;
      uni.onKeyboardHeightChange(res => {
        if (res.height > 0) {
          // #ifndef MP
          this.keyboardHeight = 0;
          // #endif
          // #ifdef MP
          this.keyboardHeight = res.height;
          // #endif
          keyboardHeight = res.height;
        }
      })
    }
  }
</script>

<style scoped>
  .writeContentBox {
    position: absolute;
    left: 0;
    right: 0;
    top: 104rpx;
    padding: 20rpx 0;
  }

  .writeContent {
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }

  .editorContent {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: auto;
    min-height: auto;
    font-size: 20px;
  }

  .editorBtnBox {
    position: fixed;
    bottom: 0;
    /* #ifdef MP */
    height: 120rpx;
    /* #endif */
    /* #ifndef MP */
    height: 130rpx;
    /* #endif */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rpx 0;
    border-top: 1px solid #dfdfdf;
  }

  .editorChildBtns {
    box-sizing: border-box;
    padding: 10rpx 10rpx 0 10rpx;
    border-radius: 8rpx;
    background-color: #e8e8e8;
  }

  .editorBtns {
    justify-content: space-between;
    /* #ifdef MP */
    padding-bottom: 2rpx;
    /* #endif */
  }

  .childNode {
    margin-right: 60rpx;
  }

  .editorColorBox {
    flex-direction: row;
    padding: 2rpx 0 10rpx 0;
  }

  .editorColorItemBox {
    box-sizing: border-box;
    width: 80rpx;
    /* #ifndef MP */
    height: 44rpx;
    /* #endif */
    /* #ifdef MP */
    height: 42rpx;
    /* #endif */
    border-radius: 12rpx;
    padding: 2rpx;
  }

  .editorColorItem {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
    color: #000;
    font-size: 28rpx;
  }

  .editorChildPoint {
    width: 28rpx;
    height: 28rpx;
    background-color: #e8e8e8;
    transform: rotate(45deg);
    position: absolute;
    /* #ifdef MP */
    top: 27px;
    /* #endif */
    /* #ifndef MP */
    top: 32px;
    /* #endif */
    transition: all 0.3s ease-in-out;
  }
</style>
