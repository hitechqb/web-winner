import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import demo from './module-demo'
import products from './module-products'
import orders from './module-orders'
import customers from './module-customer'
import invoices from './module-invoice'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      demo,
      products,
      orders,
      customers,
      invoices,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
