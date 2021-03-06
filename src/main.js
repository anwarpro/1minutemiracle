import {createApp} from 'vue'
import App from './App.vue'

import '@/assets/css/tailwind.css'
import router from './router'
import store from './store'
import {auth} from "@/firebase";

let app

auth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch('fetchUser', user)
        store.dispatch('getUser', user)
    }

    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .mount('#app')
    }
})


