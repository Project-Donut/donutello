import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css';

const app = createApp(App)
app.use(PrimeVue);
app.use("FileUpload", FileUpload);

app.mount('#app')
