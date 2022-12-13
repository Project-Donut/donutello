import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const app = createApp(App)
app.use(PrimeVue);
app.component("FileUpload", FileUpload);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.mount('#app');
