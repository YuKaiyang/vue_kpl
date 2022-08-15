import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
const testDic = {
  test: {
    hello: 'Bonjour!',
  },
}

createApp(App)
  .use(i18n, testDic)
  .mount('#app')
