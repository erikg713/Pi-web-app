import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// Lazy load the Admin view
const Admin = () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue');

const routes = [
  { 
    path: '/', 
    component: Home, 
    name: 'Home' 
  },
  { 
    path: '/admin', 
    component: Admin, 
    name: 'Admin' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Error handling for the router
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;
