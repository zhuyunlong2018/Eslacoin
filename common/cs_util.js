/** 
 * 公共方法的封装
 */

import I18n from '../locales/index.js'
// 一维数组转多维数组
export function exarrTransTwo(arr, num) {
	const newArr = [];
	while (arr.length > 0) {
		newArr.push(arr.splice(0, num));
	}
	return newArr;
}

// 金额格式化
export function formatMoney(money) {
	if (!money) return 0;
	// 判断金额是否大于 1 万亿
	if (money >= 1000000000000) {
		return (money / 1000000000000).toFixed(2) + I18n.t('common.money')[2];
	} else if (money >= 100000000) {
		return (money / 100000000).toFixed(2) + I18n.t('common.money')[1];
	} else {
		return (money / 10000).toFixed(2) + I18n.t('common.money')[0];
	}
}

// 格式化时间
export function formatDate(time) {
	let t = new Date(time);
	let y = t.getFullYear();
	let m = t.getMonth() + 1;
	let d = t.getDate();
	let hh = t.getHours();
	let mm = t.getMinutes();
	return `${y}-${m >= 10 ? m : '0' + m}-${d >= 10 ? d : '0' + d} ${ hh >= 10 ? hh : '0' + hh }:${ mm >= 10 ? mm : '0' + mm }`
}

// 验证手机号格式
export function verificationPhone(phone) {
	if (!phone) return false;
	return /^1[3-9]\d{9}$/.test(phone) || /^([6|9])\d{7}$/.test(phone);
}

// 验证密码格式
export function verificationPassword(pw) {
	if (!pw) return false;
	return /^[0-9a-zA-Z]{6,12}$/.test(pw);
}

// 验证验证码格式
export function verificationCode(code) {
	if (!code) return false;
	return /^\d{4,6}$/.test(code);
}