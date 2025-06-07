import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import Input from './components/Input.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.component('GoogleMap', GoogleMap)
app.component('Marker', Marker)
app.component('Input', Input)
app.use(Antd).mount('#app');