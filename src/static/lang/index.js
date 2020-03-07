import zh_CN from './i18n/zh_CN'
import en_US from './i18n/en_US'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: 'zh_CN',
	messages: {
		zh_CN,
		en_US
	}
})
try {
	let lang = uni.getSystemInfoSync().language;
	if (lang == null) {
		lang = 'zh'
	} else {
		if (lang.indexOf('en') != -1) {
			i18n.locale = 'en_US'
		}
		if (lang.indexOf('zh') != -1) {
			i18n.locale = 'zh_CN'
		}
	}
} catch (e) {
	console.log('error=' + e)
}

let getLanguageTitle = function() {
	let language;
	switch (i18n.locale) {
		case 'en_US':
			language = 'English';
			break;
		case 'zh_CN':
			language = '简体中文';
			break;
	}
	return language;
}

export default {
	i18n,
	getLanguageTitle
}
