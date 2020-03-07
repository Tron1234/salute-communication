<template>
	<view class="relative" :style="{height:windowHeight+'px'}">
		<uni-status-bar />
		<!-- #ifndef MP -->
		<picker class="fixed languageBox" :range="languages" range-key="name" @change="changeLanguage">Language</picker>
		<!-- #endif -->
		<view class="relative loginTop">
			<text class="absoulte loginText" :class="[boldTextStyle]" decode>{{$t('login.loginTitle')}}</text>
			<view class="flexHorCenter" style="margin-left: 140rpx;">
				<img class="imgWidth" src="~img/common/login/login.gif">
			</view>
		</view>
		<input-login />
		<!-- #ifndef MP -->
		<other-login />
		<!-- #endif-->
	</view>
</template>

<script>
	import uniStatusBar from "common/navBar/uni-status-bar/uni-status-bar";
	import inputLogin from 'content/login/inputLogin'
	import otherLogin from 'content/login/otherLogin'
	import lang from 'lang'
	export default {
		name: 'login',
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				color: this.$store.state.chooseMainColor,
				languages:this.$store.state.languages
			}
		},
		components: {
			inputLogin,
			otherLogin,
			uniStatusBar
		},
		computed: {
			boldTextStyle() {
				let temp = ['boldTextStyle_orange', 'boldTextStyle_blue', 'boldTextStyle_green', 'boldTextStyle_pink'];
				return this.utils.mainColorStyle(this.color, temp);
			}
		},
		methods: {
			// #ifndef MP
			changeLanguage(e) {
				lang.i18n.locale = this.languages[e.detail.value].lang;
			}
			// #endif
		}
	}
</script>

<style scoped>
	.loginTop {
		margin-top: 70rpx;
		z-index: 1;
	}

	.loginText {
		top: -50rpx;
		left: 60rpx;
		z-index: 2;
	}

	.languageBox {
		top: 60rpx;
		right: 30rpx;
		color: #707070;
		border: 1px solid #a0a0a0;
		border-radius: 10rpx;
		padding: 4rpx 8rpx;
		font-size: 30rpx;
		z-index: 2;
	}
</style>
