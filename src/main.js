import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.directive('ripple', Ripple);
app.mount('#app')
