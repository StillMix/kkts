import { createApp } from 'vue';
import './normalize.css';
import router from './router/router';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app');