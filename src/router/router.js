import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Login.vue';
import NotFound from '../components/NotFound.vue';
import Hello from '../components/Hello.vue';
import Main from '../components/Main.vue';
import Evaluations from '../components/Evaluations.vue';

const routes = [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/hello',
    component: Hello,
  },
  {
    path: '/main',
    component: Main,
  },
  {
    path: '/evaluations',
    component: Evaluations,
  },
  {
    path: '/:pathMatch(.*)*', 
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Лог для проверки маршрутов
console.log('Router initialized:', routes);

export default router;