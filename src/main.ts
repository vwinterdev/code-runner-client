import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import plugins from './plugins';

const app = createApp(App);
plugins.install(app);
app.mount('#app');
