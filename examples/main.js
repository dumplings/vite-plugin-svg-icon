import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from '../src/main'

createApp(App)
  .use(SvgIcon, { prefix: 'test-icon' })
  .mount('#app')
