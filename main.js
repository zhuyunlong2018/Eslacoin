import Vue from 'vue'
import App from './App'
import store from './store'
import CsHttp from './common/cs_request.js'
import CsUtil from './common/cs_util.js'
import i18n from './locales/index.js'
import CsWebSocket from './common/cs_websocket.js'
import CsData from './common/cs_data.js'
import UniBotton from './components/uni-botton/index.vue' 
import VNavBar from './components/v-nav-bar/v-nav-bar.vue' 
import UniLoading from '@/components/uni-loading/uni-loading.vue';
import ApiConfig from './common/cs_api_config.js';
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.CsHttp = CsHttp
Vue.prototype.CsUtil = CsUtil
Vue.prototype.CsData = CsData
Vue.prototype._i18n = i18n  
Vue.prototype.ApiConfig = ApiConfig  
// 注册全局按钮组件
Vue.component('uni-botton', UniBotton);
Vue.component('v-nav-bar', VNavBar);
Vue.component('uni-loading', UniLoading);
//建立一个websocket全局连接 
let lobbyConn = new CsWebSocket()
lobbyConn.startConnect(ApiConfig.WebsocketUrl, 'SEND_LOBBY_WS_MSG_EVENT', 'RECV_LOBBY_WS_MSG_EVENT', 'LobbyWebSocket')

App.mpType = 'app'
const app = new Vue({
	store,
	i18n,
    ...App
})
app.$mount()
