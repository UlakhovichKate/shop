import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/LayoutDefault.vue'),
    children: [
      {
        path: '',
        name: 'homePage',
        component: () => import('../views/PageHome.vue'),
      },
      {
        path: 'products/:productId',
        name: 'productPage',
        component: () => import('../views/PageProduct.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../layouts/LayoutEmpty.vue'),
    children: [
      {
        path: '',
        name: 'loginPage',
        component: () => import('../views/PageLogin.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/LayoutEmpty.vue'),
    children: [
      {
        path: '',
        name: 'notFoundPage',
        component: () => import('../views/PageNotFound.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
