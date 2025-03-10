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

export default router;