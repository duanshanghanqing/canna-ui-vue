import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import packages from '../packages'
// import packages from '../dist/es'
// import '../dist/style.css'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(packages)
app.mount('#app')
