<template>
	<view class="fixed settingsBox" :style="{height:windowHeight+'px'}">
		<nav-bar></nav-bar>
		<scroll-view scroll-y :style="{height:windowContentHeight+'px'}">
			<view class="flexHorCenter" style="width:100%">
				<view class="flexVerCenter settings">
					<!-- 主题色 -->
					<view style="width: 100%;">
						<view class="flexVerCenter setting">
							<view class="flexVerCenter">
								<my-icons class="settingIcon" type="settings-themecolor" size="22" color="#959595" />
								<text class="settingTitle">{{$t('profile.settings.themeColor')}}</text>
							</view>
							<view>
								<my-icons type="go" size="14" color="#d3d3d3" />
							</view>
						</view>
						<!-- 从上滑下的颜色选择器 -->
						<view>

						</view>
					</view>
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
							<switch checked :color="mainColor" @change="allNoticeSwtich"/>
						</view>

						<view class="setting_notice_detail">
							<view class="flexVerCenter setting notice_detail">
								<view class="flexVerCenter">
									<text class="settingTitle">{{$t('profile.settings.robotNotice')}}</text>
								</view>
								<!-- toggle控制所有通知 -->
								<switch checked :color="mainColor" @change="robotNoticeSwtich"/>
							</view>
							<view class="flexVerCenter setting notice_detail">
								<view class="flexVerCenter">
									<text class="settingTitle">{{$t('profile.settings.articleNotice')}}</text>
								</view>
								<!-- toggle控制所有通知 -->
								<switch checked :color="mainColor" @change="articleNoticeSwtich"/>
							</view>
							<view class="flexVerCenter setting notice_detail">
								<view class="flexVerCenter">
									<text class="settingTitle">{{$t('profile.settings.treatNotice')}}</text>
								</view>
								<!-- toggle控制所有通知 -->
								<switch checked :color="mainColor" @change="treatNoticeSwtich"/>
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
		</scroll-view>
	</view>
</template>

<script>
	import myIcons from "common/my-icons/my-icons";
	import navBar from 'content/profile/settings/navBar'
	import lang from 'lang'
	export default {
		name: '',
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				mainColor: this.$store.getters.getHexColor,
				tempCache: uni.getStorageInfoSync().currentSize,
				languages: this.$store.state.languages,
				language: lang.getLanguageTitle(),
			}
		},
		methods: {
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
			allNoticeSwtich(e){
				console.log(e.detail.value)
			},
			//机器人通知开关
			robotNoticeSwtich(e){
				console.log(e.detail.value)
			},
			//文章通知开关
			articleNoticeSwtich(e){
				console.log(e.detail.value)
			},
			//治疗通知开关
			treatNoticeSwtich(e){
				console.log(e.detail.value)
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
</style>
