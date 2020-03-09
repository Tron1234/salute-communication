<template>
	<view class="fixed settingsBox" :style="{height:windowHeight+'px'}">
		<nav-bar></nav-bar>
		<scroll-view scroll-y :style="{height:windowContentHeight+'px'}">
			<view class="flexHorCenter" style="width:100%">
				<view class="flexVerCenter settings">
					<!-- 主题色 -->
					<view class="flexColum" style="width: 100%;background-color: #fcfcfc;z-index: 2;">
						<view class="flexVerCenter setting" @tap="showMainColors">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-themecolor" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.themeColor')}}</text>
							</view>
							<view class="flexVerCenter">
								<view class="displayMainColorBox" :style="{border: '2px solid '+mainColor}">
									<view class="displayMainColor" :style="{backgroundColor:mainColor}"></view>
								</view>
								<my-icons class="mainColorGoIcon" :class="{showMainColorsBox:isShowMainColorsBox}" type="go" size="14" color="#d3d3d3" />
							</view>
						</view>
					</view>

					<view class="otherSettingsBox mainColorGoIcon" :class="{showOtherSettingsBox:isShowMainColorsBox}">
						<!-- 从上滑下的颜色选择器 -->
						<scroll-view class="mainColorsBox mainColorGoIcon" :class="{showColorsBox:isShowMainColorsBox}" scroll-x>
							<view class="flexRow">
								<view v-for="(item,index) in getAllMainColor" :key="index" class="mainColors" :style="{backgroundColor:!chooseMainColor[getChooseMainColor[index]]?item:'', border:chooseMainColor[getChooseMainColor[index]]?'2px solid '+item:'',marginLeft:0!=index?maincolorInterval:''}"
								 @tap="changeThemeColor(index)">
									<view class="mainColorInside" :style="{backgroundColor:chooseMainColor[getChooseMainColor[index]]?item:''}" />
								</view>
							</view>
						</scroll-view>
						<!-- 语言 -->
						<!-- #ifndef MP -->
						<view class="flexVerCenter setting">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-language" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.language')}}</text>
							</view>
							<view class="flexRow">
								<picker class="cacheNumStyle" :range="languages" range-key="name" @change="changeLanguage">{{language}}</picker>
								<my-icons type="go" size="14" color="#d3d3d3" />
							</view>
						</view>
						<!-- #endif -->
						<!-- 通知 -->
						<view style="width: 100%;">
							<view class="flexVerCenter setting">
								<view class="flexVerCenter">
									<my-icons class="settingIcon" type="settings-notice" size="22" color="#959595" />
									<text class="settingTitle">{{$t('profile.settings.notice')}}</text>
								</view>
								<!-- toggle控制所有通知 -->
								<switch checked :color="mainColor" :checked="allowControlledNotice" @change="allNoticeSwtich" />
							</view>

							<view class="setting_notice_detail">
								<view class="flexVerCenter setting notice_detail">
									<view class="flexVerCenter">
										<text class="settingTitle">{{$t('profile.settings.robotNotice')}}</text>
									</view>
									<!-- toggle控制所有通知 -->
									<switch checked :color="mainColor" :disabled="!allowControllNotice" :checked="allowControllNotice" @change="robotNoticeSwtich" />
								</view>
								<view class="flexVerCenter setting notice_detail">
									<view class="flexVerCenter">
										<text class="settingTitle">{{$t('profile.settings.articleNotice')}}</text>
									</view>
									<!-- toggle控制所有通知 -->
									<switch checked :color="mainColor" :disabled="!allowControllNotice" :checked="allowControllNotice" @change="articleNoticeSwtich" />
								</view>
								<view class="flexVerCenter setting notice_detail">
									<view class="flexVerCenter">
										<text class="settingTitle">{{$t('profile.settings.treatNotice')}}</text>
									</view>
									<!-- toggle控制所有通知 -->
									<switch checked :color="mainColor" :disabled="!allowControllNotice" :checked="allowControllNotice" @change="treatNoticeSwtich" />
								</view>
							</view>

						</view>
						<!-- 清空缓存 -->
						<view class="flexVerCenter setting">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-caching" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.clearCaching')}}</text>
							</view>
							<view @tap="clearCache">
								<text class="cacheNumStyle">{{cacheNum}}</text>
								<my-icons type="go" size="14" color="#d3d3d3" />
							</view>
						</view>
						<!-- 帮助 -->
						<view class="flexVerCenter setting">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-help" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.help')}}</text>
							</view>
							<my-icons type="go" size="14" color="#d3d3d3" />
						</view>
						<!-- 关于 -->
						<view class="flexVerCenter setting">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-about" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.about')}}</text>
							</view>
							<my-icons type="go" size="14" color="#d3d3d3" />
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import myIcons from "common/my-icons/my-icons";
	import navBar from 'content/profile/settings/navBar'
	import * as colorTypes from 'store/mainColor-types.js'
	import * as types from 'store/mutations-types'
	import lang from 'lang'
	export default {
		name: '',
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				tempCache: uni.getStorageInfoSync().currentSize,
				languages: this.$store.state.languages,
				language: lang.getLanguageTitle(),
				allowControllNotice: true, //允许总控制通知
				allowRebotNotice: true,
				allowArticleNotice: true,
				allowTreatNotice: true,
				allowControlledNotice: true, //通过下面三个按钮控制总通知
				isShowMainColorsBox: false
			}
		},
		methods: {
			changeThemeColor(index) {
				this.$store.commit(types.CHANGETHEMECOLOR, this.getAllMainColorName[index]);
				this.$store.commit(types.CHANGEMAINCOLOR);
			},
			clearCache() {
				try {
					uni.clearStorageSync();
					this.tempCache = uni.getStorageInfoSync().currentSize;
				} catch (e) {
					console.log(e)
				}
			},
			changeLanguage(e) {
				lang.i18n.locale = this.languages[e.detail.value].lang;
				this.language = lang.getLanguageTitle()
			},
			//通知总开关
			allNoticeSwtich(e) {
				this.allowControllNotice = e.detail.value;
				this.allowControlledNotice = e.detail.value;
				this.allowRebotNotice = e.detail.value;
				this.allowArticleNotice = e.detail.value;
				this.allowTreatNotice = e.detail.value;
			},
			//机器人通知开关
			robotNoticeSwtich(e) {
				this.allowRebotNotice = e.detail.value;
				if (!this.allowRebotNotice && !this.allowArticleNotice && !this.allowTreatNotice) {
					this.allowControllNotice = e.detail.value;
					this.allowControlledNotice = e.detail.value;
				}
			},
			//文章通知开关
			articleNoticeSwtich(e) {
				this.allowArticleNotice = e.detail.value;
				if (!this.allowRebotNotice && !this.allowArticleNotice && !this.allowTreatNotice) {
					this.allowControllNotice = e.detail.value;
					this.allowControlledNotice = e.detail.value;
				}
			},
			//治疗通知开关
			treatNoticeSwtich(e) {
				this.allowTreatNotice = e.detail.value;
				if (!this.allowRebotNotice && !this.allowArticleNotice && !this.allowTreatNotice) {
					this.allowControllNotice = e.detail.value;
					this.allowControlledNotice = e.detail.value;
				}
			},
			showMainColors() {
				this.isShowMainColorsBox = !this.isShowMainColorsBox;
			}
		},
		computed: {
			windowContentHeight() {
				return this.windowHeight - (uni.getSystemInfoSync().statusBarHeight + 44)
			},
			cacheNum() {
				let cacheNum = this.tempCache;
				if (cacheNum > 1000) {
					cacheNum = (cacheNum / 1024).toFixed(1) + 'MB';
				} else if (cacheNum >= 0) {
					cacheNum = cacheNum + 'KB';
				}
				return cacheNum;
			},
			getAllMainColor() {
				let allMainColor = [];
				for (let key in colorTypes) {
					if (key.endsWith("HEXCOLOR")) {
						allMainColor.push(colorTypes[key]);
					}
				}
				return allMainColor;
			},
			getAllMainColorName() {
				let allMainColor = [];
				for (let key in colorTypes) {
					if (!key.endsWith("HEXCOLOR")) {
						allMainColor.push(colorTypes[key]);
					}
				}
				return allMainColor;
			},
			getChooseMainColor() {
				let chooseMainColors = [];
				for (let key in this.chooseMainColor) {
					chooseMainColors.push(key);
				}
				return chooseMainColors;
			},
			maincolorInterval() {
				return (uni.getSystemInfoSync().windowWidth * 0.9 * 0.84 - 40 * 4) / 3 + 'px';
			},
			mainColor() {
				return this.$store.getters.getHexColor;
			},
			chooseMainColor() {
				return this.$store.state.chooseMainColor;
			}
		},
		components: {
			navBar,
			myIcons
		}
	}
</script>

<style scoped>
	.settingsBox {
		color: #505050;
		background-color: #fcfcfc;
	}

	.settings {
		width: 90%;
		flex-direction: column;
	}

	.setting {
		width: 100%;
		padding: 3% 0;
		border-bottom: 1px solid #efefef;
		justify-content: space-between;
	}

	.settingIcon {
		margin-right: 40rpx;
	}

	.settingTitle {
		font-size: 36rpx;
	}

	.setting_notice_detail {
		margin-left: 12%;
	}

	.notice_detail {
		border-bottom: 1px solid #f0f0f0;
	}

	.cacheNumStyle {
		font-size: 34rpx;
		color: #bababa;
		margin-right: 20rpx;
	}

	.mainColorsBox {
		width: 88%;
		height: 80rpx;
		margin-left: 12%;
		padding: 3% 0;
		border-bottom: 1px solid #efefef;
		opacity: 0;
	}

	.mainColors {
		box-sizing: border-box;
		min-width: 80rpx;
		max-width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		padding: 4rpx;
	}

	.mainColorInside {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.showMainColorsBox {
		transform: rotate(90deg);
	}

	.displayMainColorBox {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		padding: 4rpx;
		margin-right: 20rpx;
	}

	.displayMainColor {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.mainColorGoIcon {
		transition: all 0.2s ease-in-out;
	}

	.otherSettingsBox {
		width: 90%;
		position: absolute;
		top: -22rpx;
	}

	.showOtherSettingsBox {
		top: 100rpx;
	}

	.showColorsBox {
		opacity: 1;
	}
</style>
