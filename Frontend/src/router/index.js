import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// Lazy load the Admin view
const Admin = () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue');

const routes = [
  { 
    path: '/', 
    component: Home, 
    name: 'Home',
    meta: { title: 'Home Page' } // Meta information for the route
  },
  { 
    path: '/admin', 
    component: Admin, 
    name: 'Admin',
    meta: { title: 'Admin Page' } // Meta information for the route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Error handling for the router
router.onError((error) => {
  console.error('Router error:', error);
  // Provide user-friendly error message or fallback
  alert('An error occurred while navigating. Please try again.');
});

// Global navigation guard for setting the document title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  next();
});

export default router;
