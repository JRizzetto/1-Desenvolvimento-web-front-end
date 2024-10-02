import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

const app = createApp(App);

// Use VueAxios with axios
app.use(VueAxios, axios);

// Mount the app
app.mount('#app');



