import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Login.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    component: LoginPage,
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