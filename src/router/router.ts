import { createRouter, createWebHistory } from 'vue-router';
import QuestionPage from '../components/QuestionPage.vue';
import ResultPage from '../components/ResultPage.vue';

const routes = [
    { path: '/', component: QuestionPage },
    { path: '/result', component: ResultPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
