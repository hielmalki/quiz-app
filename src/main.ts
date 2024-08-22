import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useQuizStore } from "./store/store";
import keycloak from './keycloak';

// Font Awesome Icons zur Bibliothek hinzufügen
library.add(faArrowLeft, faAngleLeft);

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(pinia);

const quizStore = useQuizStore();
quizStore.loadQuestions().then(() => {
    app.mount('#app');
});

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    if (!authenticated) {
        window.location.reload();
    } else {
        const app = createApp(App);
        app.use(router);
        app.provide('$keycloak', keycloak);
        app.mount('#app');
    }
}).catch(() => {
    console.log('Failed to initialize Keycloak');
});
