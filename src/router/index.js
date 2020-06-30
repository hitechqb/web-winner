import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from 'src/layouts/MainLayout'
import PageProduct from 'src/pages/PageProducts'
import Order from 'src/pages/PageOrderDetail'
import Invoice from 'src/pages/PageInvoice'
import Demo from 'src/pages/PageDemo'
import Docs from 'src/pages/PageDocument'
import Page404 from 'src/pages/Error404'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const BASE_PATH = '/';
export const  RouterName = {
  HOME:'home',
  ORDER:'order',
  INVOICE:'invoice',
  DEMO:'demo',
  DOCS:'docs',
};


export default function (/* { store, ssrContext } */) {
  const router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    base: BASE_PATH,
    publicPath: '/web-app-demo/',
    mode: 'history',
    routes: [
      {
        path: '',
        component: Main,
        children: [
          {
            path: '',
            name: RouterName.HOME,
            component: PageProduct
          },
          {
            path: BASE_PATH+RouterName.ORDER,
            name: RouterName.ORDER,
            component: Order
          },
          {
            path: BASE_PATH+RouterName.INVOICE,
            name: RouterName.INVOICE,
            component: Invoice
          },
          {
            path: BASE_PATH+RouterName.DEMO,
            name: RouterName.DEMO,
            component: Demo
          },
          {
            path: BASE_PATH+RouterName.DOCS,
            name: RouterName.DOCS,
            component: Docs
          },
        ],
      },
      {
        path: '*',
        component: Page404,
      }
    ]

    // routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    // base: process.env.VUE_ROUTER_BASE
  });

  return router
}
