import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// const app = createApp(App)

// app.use(ElementPlus)
createApp(App).use(router).mount('#app')
// createApp(App).use(router).use(ElementPlus).mount('#app')
