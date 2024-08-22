// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import StartPage from '../components/StartPage.vue';
import QuestionPage from '../components/QuestionPage.vue';
import ResultPage from '../components/ResultPage.vue';
import keycloak from '../keycloak';

const requireAuth = (to, from, next) => {
    if (keycloak.authenticated) {
        next();
    } else {
        keycloak.login();
    }
};

const routes = [
    { path: '/', component: StartPage, beforeEnter: requireAuth },
    { path: '/question', component: QuestionPage, beforeEnter: requireAuth },
    { path: '/result', component: ResultPage, beforeEnter: requireAuth },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
