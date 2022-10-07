import { createApp } from 'vue'
import App from './App.vue'

import VuePrism from 'vue-prism'
import "prismjs/themes/prism.css";

createApp(App)
    .use(VuePrism)
    .mount('#app')

