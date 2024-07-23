// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import StartPage from '../components/StartPage.vue';
import QuestionPage from '../components/QuestionPage.vue';
import ResultPage from '../components/ResultPage.vue';

const routes = [
    { path: '/', component: StartPage },
    { path: '/question', component: QuestionPage },
    { path: '/result', component: ResultPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
