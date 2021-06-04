import Vue from 'vue'
import Vuex from 'vuex'
import I18n from '../locales/index.js'

import CsHttp from '../common/cs_request.js';
import ApiConfig from '../common/cs_api_config.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginState: false,
		userInfo: {},
		statusBarHeight: 0,
		isCancelSelfChoose: false
	},
	mutations: {
		setLoginState(state, lst) {
			state.loginState = lst
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		setStatusBarHeight(state, val) {
			state.statusBarHeight = val;
		},
		setSelfChoose(state, val) {
			state.isCancelSelfChoose = val;
		}
	},
	getters: {
		getLoginState(state) {
			return state.loginState
		}
	},
	actions: {
		// 退出登录
		LOG_OUT({ commit, state }) {
			return new Promise((reslove, reject) => {
				uni.showModal({
					content: I18n.t('user.info.exitText'),
					cancelText: I18n.t('common.cancel'),
					confirmText: I18n.t('common.confirm'),
					success(res) {
						if(res.confirm) {
							uni.setStorageSync('UserData', null);
							uni.setStorageSync('Authorization', '');
							commit('setLoginState', false);
							commit('setUserInfo', null);
							reslove();
						}
					}
				})
			})
		},
		// 登录
		LOGIN({commit}, data) {
			return new Promise((reslove, reject) => {
				CsHttp.post(ApiConfig.User + '/BSLoginAccountReq', data, true).then(res => {
					console.log('收到账号登录的回复:' + JSON.stringify(res));
					if (res.Code == 0) {
						store.dispatch('GET_SYSTEM_INFO');
						uni.setStorageSync('UserData', res.UserData);
						uni.setStorageSync('TaskServerDataList', res.TaskServerDataList);
						uni.setStorageSync('Authorization', res.UserData.Token);
						uni.removeStorageSync('echannel');
						commit('setLoginState', true);
						commit('setUserInfo', res.UserData);
						reslove(res)
					} else {
						uni.clearStorageSync()
						uni.showModal({
							content: res.Msg,
							showCancel: false,
						});
						reject(res)
					}
				})
			})
		},
		// 检查用户是否登录
		CHECK_LOGIN({commit, state}) {
			return new Promise((reslove, reject) => {
				let token = uni.getStorageSync('Authorization');
				if (!token) {
					uni.reLaunch({url:'/pages/login/login'});
					reslove(false);
				} else{
					reslove(true);
				}
			})
			
		},
		// 获取系统信息
		GET_SYSTEM_INFO ({ commit, state }) {
			if(!uni.getStorageSync('statusBarHeight')) {
				return new Promise(reslove => {
					uni.getSystemInfo({
						success(res) {
							console.log(res)
							// 存储可视化区域高度
							let screenHeight = res.windowHeight - res.statusBarHeight - 44;
							uni.setStorageSync('screenHeight', screenHeight);
							uni.setStorageSync('statusBarHeight', res.statusBarHeight);
							uni.setStorageSync('screenWidth', res.screenWidth);
							// 首次进入APP，根据系统设置语言设置语言 并存储系统设置语言
							if (!uni.getStorageSync('language')) {
								uni.setStorageSync('language', res.language == 'zh-CN' ? 'zh_CN' : 'en');
								I18n.locale = res.language == 'zh-CN' ? 'zh_CN' : 'en';
							}
							commit('setStatusBarHeight', res.statusBarHeight);
							reslove(screenHeight);
						}
					})
				})
				
			}
			
		},
		// 获取用户绑定API
		GET_API({ commit, state }, isRequset = false) {
			let Echannel = uni.getStorageSync('echannel');
			return new Promise(async (reslove, reject) => {
				if (isRequset) {
					let res = await CsHttp.post(ApiConfig.User + '/BSGetUserApiKeyListReq', {
						UserId: uni.getStorageSync('UserData').UserId
					});
					let ec = null;
					// 判断是否绑定并使用API
					if (res.UserApiKeyDataList && res.UserApiKeyDataList.find(item => { return item.IsActive == 1 && item.AccessKey })) {
						res.UserApiKeyDataList.forEach(item => {
							if (item.IsActive == 1) {
								ec = item.Echannel;
							}
						})
					}
					reslove({
						list: res.UserApiKeyDataList.filter(item => item.AccessKey),
						Echannel: ec
					})
				} else {
					if (Echannel) {
						reslove(Echannel)
					} else {
						let res = await CsHttp.post(ApiConfig.User + '/BSGetUserApiKeyListReq', {
							UserId: uni.getStorageSync('UserData').UserId
						});
						// 判断是否绑定并使用API
						if (res.UserApiKeyDataList && res.UserApiKeyDataList.find(item => { return item.IsActive == 1 && item.AccessKey })) {
							res.UserApiKeyDataList.forEach(item => {
								if (item.IsActive == 1) {
									uni.setStorageSync('echannel', item.Echannel);
									reslove(item.Echannel)
								}
							})
						} else {
							uni.setStorageSync('echannel', '');
							reslove('')
						}
						
					}
				}
			})
			
			
		},
		// 重置是否自选值
		SET_SELF_CHOOSE({commit}, val) {
			commit('setSelfChoose', val);
		}
	}
})

export default store
