import '@/assets/css/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import hljs from "highlight.js/lib/core";
import 'highlight.js/styles/atom-one-dark.css'
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/lib/common';


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

hljs.registerLanguage('javascript', javascript);

app.use(createPinia())
app.use(router)
app.use(hljsVuePlugin)

app.mount('#app')
