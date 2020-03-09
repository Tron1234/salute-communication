<template>
	<view class="fixed indexBox" :style="{height:windowHeight+'px'}">
		<uni-status-bar />
		<view class="relative" :style="{height:windowContentHeight}">
			<text class="userNameTitle" decode>Hi，{{userName}}\n{{$t("profile.index.greetings")}}</text>
			<view class="relative userAvatarBox">
				<img class="userAvatar" src="~img/common/profile/happySun.gif">
				<img class="userAvatarCenter" src="~img/common/article/avatar.png">
				<img class="shadowCloud1" :class="{shadowCloud1_leave:cloudLeave}" src="~img/common/profile/cloud1.png">
				<img class="shadowCloud2" :class="{shadowCloud2_leave:cloudLeave}" src="~img/common/profile/cloud2.png">
			</view>
			<view class="functionBox">
				<view class="flexVerCenter funcBtnsBox">
					<view class="flexVerCenter funcBtns" style="margin-bottom: 5%;">
						<navigator class="flexCenter funcBtn" url="">
							<!-- 图标 -->
							<view class="flexCenter funcIconBox">
								<my-icons class="funcIcon" type="profile-article" size="22" :color="mainColor" />
							</view>
							<!-- 标题和数量 -->
							<view class="funcBtnsTitleBox">
								<view class="funcBtnsTitle">{{$t('profile.index.article')}}</view>
								<view class="funcBtnsTitleNum">50</view>
							</view>
						</navigator>
						<navigator class="flexCenter funcBtn" url="">
							<!-- 图标 -->
							<view class="flexCenter funcIconBox">
								<my-icons type="profile-collect" size="22" color="#FF3366" />
							</view>
							<!-- 标题和数量 -->
							<view class="funcBtnsTitleBox">
								<view class="funcBtnsTitle">{{$t('profile.index.like')}}</view>
								<view class="funcBtnsTitleNum">50</view>
							</view>
						</navigator>
					</view>

					<view class="flexVerCenter funcBtns">
						<navigator class="flexCenter funcBtn" url="">
							<!-- 图标 -->
							<view class="flexCenter funcIconBox" style="background-color: #faf3f3;">
								<my-icons class="funcIcon" type="profile-psychotherapy" size="22" color="#35be3c" />
							</view>
							<!-- 标题和数量 -->
							<view class="funcBtnsTitleBox">
								<view class="funcBtnsTitle">{{$t('profile.index.treatment')}}</view>
								<view class="funcBtnsTitleNum">50</view>
							</view>
						</navigator>
						<navigator class="flexCenter funcBtn" url="">
							<!-- 图标 -->
							<view class="flexCenter funcIconBox">
								<my-icons class="funcIcon" style="top:2rpx" type="profile-notice" size="22" color="#b41fee" />
							</view>
							<!-- 标题和数量 -->
							<view class="funcBtnsTitleBox">
								<view class="funcBtnsTitle">{{$t('profile.index.message')}}</view>
								<view class="funcBtnsTitleNum">50</view>
							</view>
						</navigator>
					</view>
				</view>

				<view class="basicBtnsBox">
					<view class="basicBtnTitle">{{$t('profile.index.basics')}}</view>
					<navigator class="flexVerCenter basicBtn" url="" hover-class="none">
						<view class="flexVerCenter">
							<my-icons class="basicIcon" type="profile-information" size="27" color="#5585d3" />
							<text class="basicTitle">{{$t('profile.index.information')}}</text>
						</view>
						<my-icons type="go" size="14" color="#d3d3d3" />
					</navigator>
					<navigator class="flexVerCenter basicBtn" url="" hover-class="none">
						<view class="flexVerCenter">
							<my-icons class="basicIcon" type="profile-service" size="27" :color="mainColor" />
							<text class="basicTitle">{{$t('profile.index.service')}}</text>
						</view>
						<my-icons type="go" size="14" color="#d3d3d3" />
					</navigator>
					<navigator class="flexVerCenter basicBtn" style="border-bottom: none;" url="/pages/profile/settings/settings"
					 hover-class="none">
						<view class="flexVerCenter">
							<my-icons class="basicIcon" type="profile-settings" size="27" color="#959595" />
							<text class="basicTitle">{{$t('profile.index.settings')}}</text>
						</view>
						<my-icons type="go" size="14" color="#d3d3d3" />
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myIcons from "common/my-icons/my-icons"
	import * as types from 'store/mutations-types'
	import uniStatusBar from "common/navBar/uni-status-bar/uni-status-bar"
	export default {
		name: 'chat',
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				userName: 'Tron',
				cloudLeave: false //云离开动画
			}
		},
		computed: {
			windowContentHeight() {
				return (this.windowHeight - uni.getSystemInfoSync().statusBarHeight) + 'px';
			},
			mainColor() {
				return this.$store.getters.getHexColor;
			}
		},
		methods: {
			changeTabbarIcon() {

			}
		},
		components: {
			uniStatusBar,
			myIcons
		},
		onShow() {
			this.$store.commit(types.CHANGETABBARMAINCOLOR);
			this.$store.commit(types.CHANGESELECTEDCOLOR);
			setTimeout(() => {
				this.cloudLeave = true;
			}, 200)
		},
		onHide() {
			this.cloudLeave = false
		}
	}
</script>

<style scoped>
	.indexBox {
		color: #505050;
		background: linear-gradient(to bottom, #e9f5ff, #fbfeff 50%, #ffffff);
	}

	.userNameTitle {
		position: absolute;
		top: 40rpx;
		left: 30rpx;
		font-size: 50rpx;
		font-weight: bold;
		z-index: 2;
	}

	.userAvatarBox {
		width: 250rpx;
		height: 250rpx;
		position: absolute;
		right: 60rpx;
		top: 66rpx;
	}

	.userAvatar {
		width: 100%;
		height: 100%;
	}

	.shadowCloud1 {
		position: absolute;
		width: 190rpx;
		height: 114rpx;
		bottom: 110rpx;
		left: 0;
	}

	.shadowCloud2 {
		position: absolute;
		width: 210rpx;
		height: 134rpx;
		bottom: 8rpx;
		right: -28rpx;
	}

	@keyframes cloudLeave1 {
		0% {
			left: 0;
			opacity: 1;
		}

		30% {
			opacity: .6;
		}

		60% {
			left: -190rpx;
			bottom: 110rpx;
			opacity: 0;
			transform: scale(1);
		}

		65% {
			left: -260rpx;
			bottom: -40rpx;
			transform: scale(0);
			opacity: 0;
		}

		100% {
			left: -260rpx;
			bottom: -40rpx;
			transform: scale(1);
			opacity: .6;
		}
	}

	@keyframes cloudLeave2 {
		0% {
			right: -28rpx;
			opacity: 1;
		}

		60% {
			opacity: .6;
		}

		100% {
			right: -210rpx;
			opacity: 0;
		}
	}

	.shadowCloud1_leave {
		animation: cloudLeave1 5s ease-in-out;
		animation-fill-mode: forwards;
	}

	.shadowCloud2_leave {
		animation: cloudLeave2 3s ease-in-out;
		animation-fill-mode: forwards;
	}

	.userAvatarCenter {
		width: 70%;
		height: 70%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -37%;
		margin-left: -34%;
	}

	.functionBox {
		position: absolute;
		bottom: 0;
		height: 70%;
		width: 90%;
		left: 0;
		right: 0;
		margin: auto;
	}

	.funcBtnsBox {
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
	}

	.funcBtns {
		width: 100%;
		justify-content: space-between;
	}

	.funcBtn {
		flex-direction: row;
		padding: 4% 0;
		width: 47.6%;
		border-radius: 16rpx;
		background-color: #fff;
		box-shadow: 0 0 30rpx #d7e2eb;
	}

	.funcIconBox {
		margin-right: 30rpx;
		width: 86rpx;
		height: 86rpx;
		background-color: #e9f6f7;
		border-radius: 50%;
	}

	.funcIcon {
		position: relative;
		top: 4rpx;
	}

	.funcBtnsTitleBox {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 40%;
	}

	.funcBtnsTitle {
		font-size: 32rpx;
		margin-bottom: 12rpx;
	}

	.funcBtnsTitleNum {
		font-size: 28rpx;
		color: #9c9c9c;
	}

	.basicBtnsBox {
		height: 45%;
		margin-top: 5%;
		padding: 3% 7%;
		border-radius: 16rpx;
		background-color: #fff;
		box-shadow: 0 0 30rpx #d9e3eb;
	}

	.basicBtnTitle {
		font-size: 36rpx;
		margin-bottom: 3%;
	}

	.basicBtn {
		flex-direction: row;
		justify-content: space-between;
		height: 28%;
		border-bottom: 1px solid #efefef;
	}

	.basicIcon {
		position: relative;
		top: 4rpx;
		margin-right: 40rpx;
	}

	.basicTitle {
		font-size: 34rpx;
	}
</style>
