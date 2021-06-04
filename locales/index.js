import Vue from 'vue';
import VueI18n from '../common/vue-i18n.js';
import ZH_CN from './zh_CN.js';
import EN from './en.js'

Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: uni.getStorageSync('language') || 'zh_CN',
	messages: {
		'zh_CN': ZH_CN,
		'en': EN
	}
})

export default i18n;