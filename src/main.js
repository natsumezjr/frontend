import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from './App.vue'
import router from './router'



const pinia = createPinia()
const app = createApp(App)

// 注册 Router
app.use(router)

// 注册 Pinia
app.use(pinia)

// 使用 Element Plus，并设置语言
app.use(ElementPlus, {
    locale: zhCn,
  });

// 挂载应用
app.mount('#app');
console.log('Vue App is mounted!');
