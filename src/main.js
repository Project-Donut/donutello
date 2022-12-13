import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css';
import './style.css';
import './prime_override.css';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DropDown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

const app = createApp(App)
app.use(PrimeVue);
app.component("FileUpload", FileUpload);

app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("DropDown", DropDown);
app.component("InputText", InputText);

app.mount('#app');
