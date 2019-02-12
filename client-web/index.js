import Vue from 'vue';

import App from './App';
import "./themes";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
