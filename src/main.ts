import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import router from '@/router/index'
import 'virtual:windi.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue'
import { createPinia } from 'pinia'
import { message } from 'ant-design-vue';
const app = createApp(App)
app.config.globalProperties.$message = message;
app.use(router).use(Antd).use(createPinia()).mount('#app')